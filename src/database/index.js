import {db, firebase} from "../config";
import {castIndianTime} from "../helpers/getIndianTime";
import moment from 'moment';

export const getDateFromHash = (data) => {
  return new Date(data.year, data.month - 1, data.day, data.hour, data.minute);
};

export const isNotValidDateHash = (dateHash) => {
  function isNotValidHashValue(val) {
    return isNaN(val);
  }
  return !dateHash || isNotValidHashValue(dateHash.year) || isNotValidHashValue(dateHash.month) || isNotValidHashValue(dateHash.date);
}

export const convertDateToHash = (date, {both = false, onlyTime = false} = {}) => {
  const isMoment = moment.isMoment(date);
  if(isMoment) {
    const dateObj =  {
      day: date.date(),
      month: date.month(),
      year: date.year()
    }
    const timeObj = {
      minute: date.minutes(),
      hour: date.hours()
    }
    return (
      both ? {...dateObj, ...timeObj} : onlyTime ? timeObj : dateObj
    )
  }
  if(!(date instanceof Date)) throw new Error('Argument needs to be a Date object');
  const dateObj =  {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear()
  }
  const timeObj = {
    minute: date.getMinutes(),
    hour: date.getHours()
  }
  return (
    both ? {...dateObj, ...timeObj} : onlyTime ? timeObj : dateObj
  )
};

export const formatDateDoc = (_date, dontIncMonth, withoutDate) => {
  let date = _date;
  if(moment.isMoment(date)) date = moment(date).clone();
  if(isNotValidDateHash(date)) date = convertDateToHash(date);
  if(withoutDate) return `${date.year}_${date.month + (dontIncMonth ? 0 : 1)}`;
  return `${date.year}_${date.month + (dontIncMonth ? 0 : 1)}_${date.day ?? date.date}`;
}

export const fetchScholarships = async (props = {}) => {
  const {status, limit, startAfter} = props;

  let ref = db.collection('scholarships');

  // if there is status
  if(status) {
    ref = ref.where('status', '==', status);
  }
  // if there is startAfter
  if(startAfter) {
    ref = ref.startAfter(startAfter);
  }
  // if there is startAfter
  if(limit) {
    ref = ref.limit(limit);
  }

  const querySnapshot = await ref.get();

  return querySnapshot.docs;
}


export const getMonthActiveUsers = async (ind) => {
  const ist = await castIndianTime(true);
  let momentDate = moment(ist);

  const startDate = momentDate.clone().add(-30, 'days');
  const endDate = Boolean(ind) ? momentDate.clone().add(ind, 'months').endOf('month') : momentDate.clone();

  const formattedDate = {start: formatDateDoc(startDate, null, true), end: formatDateDoc(endDate, null, true)}

  const querySnapshot = await db
    .collection('user_engagement')
    .doc('interaction_engagement')
    .collection('lecture_engagement')
    .doc(formattedDate.start)
    // .doc('2023_6')
    .collection('days')
    .get();
  // .doc(formatDateDoc(startDate))
  // .doc('2023_4_16')

  const dataMap = {};

  const docs = querySnapshot.docs;

  if(formattedDate.start !== formattedDate.end) {
    const querySnapshot = await db
      .collection('user_engagement')
      .doc('interaction_engagement')
      .collection('lecture_engagement')
      .doc(formattedDate.end)
      // .doc('2023_6')
      .collection('days')
      .get();

    const endDocs = querySnapshot.docs;

    console.log('endDocs - ', endDocs);

    docs.concat(endDocs);
  }

  console.log('docs - ', docs);

  docs.forEach(snapshot => {
    dataMap[snapshot.id] = snapshot.data();
  })

  // const dataMap = {};
  // let nextLastDate, i = 0;
  // while(!nextLastDate || (nextLastDate <= endDate)) {
  // 	const a = startDate.clone().add(i, 'days').startOf('day');
  // 	nextLastDate = startDate.clone().add(i, 'days').endOf('day');
  //
  // 	let dateString = [a.date(), a.month() + 1, a.year()].join('_');
  // 	// eslint-disable-next-line @typescript-eslint/no-loop-func
  // 	dataMap[dateString] = querySnapshot.docs.filter((item) => {
  // 		const data = item.data();
  // 		return data.sign_up_ts >= +a && data.sign_up_ts < +nextLastDate && data.grade
  // 	})
  // 	i++;
  // }

  const response = await transformActiveUsers(docs, true, startDate, endDate)

  console.log('response - ', response);

  return getActiveUsers(response);

  // return dataMap;
}


export const transformActiveUsers = async (lectureEngagementDocs, includeUIDs, startDate, endDate) => {
  const engagementMap = {};
  const activeUserMonthlyMap = {};
  const metaDataMap = {};

  lectureEngagementDocs.forEach(doc => {
    engagementMap[doc.id] = doc.data();
  })

  // const ist = await castIndianTime(true);
  // let momentDate = moment(ist);

  // const startDate = momentDate.clone().startOf('month');
  // const endDate =  momentDate.clone();

  let nextLastDate, i = 0;
  while(!nextLastDate || (nextLastDate < endDate)) {
    const a = startDate.clone().add(i, 'days').startOf('day');
    nextLastDate = startDate.clone().add(i, 'days').endOf('day');

    let dateString = formatDateDoc(a);
    if(includeUIDs) {
      let _obj = engagementMap[dateString]?.engagement_map;
      if(_obj) {
        for(let uid in _obj) {
          let obj = _obj[uid];
          const total_time_spent = ((obj.lecture_engagement?.total_time_spent ?? 0) + (obj.blaze_engagement?.total_time_spent ?? 0) + (obj.live_session_engagement?.total_time_spent ?? 0));

          const list = Object.keys(obj.lecture_engagement?.lectures_watched ?? {});

          if(uid in activeUserMonthlyMap) {
            activeUserMonthlyMap[uid] += total_time_spent;
            metaDataMap[uid].time_spent.total += total_time_spent;
            metaDataMap[uid].time_spent.lecture_engagement += obj.lecture_engagement?.total_time_spent ?? 0;
            metaDataMap[uid].time_spent.blaze_engagement += obj.blaze_engagement?.total_time_spent ?? 0;
            metaDataMap[uid].time_spent.live_session_engagement += obj.live_session_engagement?.total_time_spent ?? 0;
            metaDataMap[uid].lectures_watched_count += list.length;
            metaDataMap[uid].chapters_watched = {...(metaDataMap[uid].chapters_watched ?? {}), ...obj.lecture_engagement?.lectures_watched};
          } else {
            activeUserMonthlyMap[uid] = total_time_spent;
            metaDataMap[uid] = {
              lectures_watched_count: list.length,
              time_spent: {
                lecture_engagement: obj.lecture_engagement?.total_time_spent ?? 0,
                blaze_engagement: obj.blaze_engagement?.total_time_spent ?? 0,
                live_session_engagement: obj.live_session_engagement?.total_time_spent ?? 0,
                total: total_time_spent
              },
              chapters_watched: obj.lecture_engagement?.lectures_watched
            }
          }
        }
      }
    }
    i++;
  }

  return {monthMap: activeUserMonthlyMap, metaDataMap};
}

async function getActiveUsers(activeUserMap) {
  console.log('activeUserMap - ', activeUserMap);

  const activeUsersInMonth = Object.keys(activeUserMap.monthMap).sort(
    (a, b) => {
      if (activeUserMap.monthMap[a] < activeUserMap.monthMap[b]) return 1
      if (activeUserMap.monthMap[a] > activeUserMap.monthMap[b]) return -1
      return 0
    }
  )

  return new PaginatedList({
    doc: {
      collectionPath: "users",
      where: arr => [firebase.firestore.FieldPath.documentId(), "in", arr]
    },
    sortedListToFetch: activeUsersInMonth,
    limit: 10,
    sortFunction: (a, b) => {
      if (activeUserMap.monthMap[a.id] < activeUserMap.monthMap[b.id]) return 1
      if (activeUserMap.monthMap[a.id] > activeUserMap.monthMap[b.id]) return -1
      return 0
    },
    metaDataMap: activeUserMap.metaDataMap,
    transformItemFn: doc => {
      if(!doc.exists) return null;

      const data = doc.data()

      return {
        name: data.name,
        phone: "+" + data.phone_country_code + " " + data.phone_number,
        email: data.email,
        grade: data.grade,
        image: data.profile_url,
        uid: data.uid,
        time_spent: activeUserMap.metaDataMap[data.uid]?.time_spent.total,
        watched_count: activeUserMap.metaDataMap[data.uid]?.lectures_watched_count,
        data: data
      }
    }
  })
}

export const getLifeTimeEngagement = async (userId) => {
  // /user_engagement/daily_engagement/0pop6z39XhR3zXwSn2H7BJRE7er1/lifetime
  const snapshot = await db.collection('user_engagement')
    .doc('daily_engagement')
    .collection(userId)
    .doc('lifetime')
    .get();

  const lastYear = moment().add(-1, 'years').clone();
  const data = [];
  for(let i = 0; i < 12; i++) {
    let b = lastYear.clone().add(i, 'month');
    // {name: 'Jan', Lectures: 0, pv: 2400, amt: 2400},
    data.push({
      name: b.format('MMM'),
      Lectures: snapshot.data().monthly_engagement[formatDateDoc(b, null, true)]?.total_watched_lecture_count ?? 0
    })
  }

  return data;
}

export class PaginatedList {
  _list = []

  _prefetchedList = []

  _transformedList = []

  get list() {
    return this._list
  }

  set list(list) {
    this._list = list
  }

  get prefetchedList() {
    return this._prefetchedList
  }

  set prefetchedList(list) {
    this._prefetchedList = list
  }

  get transformedList() {
    return this._transformedList
  }

  set transformedList(list) {
    this._transformedList = list
  }

  get metaDataMap() {
    return this._metaDataMap
  }

  set metaDataMap(metaDataMap) {
    this._metaDataMap = metaDataMap
  }

  get loading() {
    return this._loading
  }

  set loading(loading) {
    this._loading = loading
  }

  get totalCount() {
    return this._totalCount
  }

  set totalCount(count) {
    this._totalCount = count
  }

  get limit() {
    return this._limit
  }

  set limit(count) {
    this._limit = count
  }

  get noMore() {
    return this._noMore
  }

  set noMore(bool) {
    this._noMore = bool
  }

  constructor({
                doc,
                sortedListToFetch,
                limit = 10,
                sortFunction,
                metaDataMap,
                transformItemFn,
                prefetchedList
              }) {
    this.doc = doc
    this.sortedListToFetch = sortedListToFetch
    this.limit = limit
    this.sortFunction = sortFunction
    this.metaDataMap = metaDataMap
    this.transformItemFn = transformItemFn
    this.prefetchedList = prefetchedList
    this.totalCount = sortedListToFetch.length
  }

  transformList() {
    if (!this.transformItemFn) return
    this.transformedList = this.list.map(this.transformItemFn)
  }

  async initialLoad() {
    const list = this.sortedListToFetch.slice(0, this.limit)

    if (list.length === 0) {
      return (this.noMore = true)
    }

    await this.fetchList(list)
  }

  async fetchList(list, pushMore = false) {
    let docs
    if (!this.prefetchedList) {
      this.loading = true
      const whereQuery = this.doc.where(list)
      const querySnapshot = await db
        .collection(this.doc.collectionPath)
        .where(...whereQuery)
        .get()

      this.loading = false
      docs = querySnapshot.docs
    } else {
      docs = list.map(id => {
        return this.prefetchedList.find(c => c.id === id)
      })
    }

    const _list = docs.sort(this.sortFunction)

    if (pushMore) {
      this.list.push(..._list)
    } else {
      this.list = _list
    }

    this.transformList()
  }

  async fetchMore() {
    if (this.noMore) {
      console.log("No more")
      return
    }
    const list = this.sortedListToFetch.slice(
      this.list.length,
      this.list.length + this.limit
    )

    if (list.length === 0) {
      return (this.noMore = true)
    }

    await this.fetchList(list, true)
  }
}


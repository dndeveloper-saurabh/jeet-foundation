import {db, firebase, rdb, storage} from "../config";
import {castIndianTime} from "../helpers/getIndianTime";
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";
import {humanizeTime} from "../helpers";

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

export const fetchScholarships = (props = {}) => {
  const {status, limit, startAfter, cb} = props;

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

  ref.onSnapshot((querySnapshot) => {
    cb(querySnapshot.docs)
  });

}


export const getMonthActiveUsers = async (ind) => {
  const ist = await castIndianTime(true);
  let momentDate = moment(ist);

  const startDate = momentDate.clone().add(-3, 'months');
  const last30DayStartDate = momentDate.clone().add(-31, 'days');
  const endDate = Boolean(ind) ? momentDate.clone().add(ind, 'months').endOf('month') : momentDate.clone();

  const formattedDate = {start: formatDateDoc(startDate, null, true), end: formatDateDoc(endDate, null, true)}

  console.log('formattedDate - ', startDate.toISOString(), endDate.toISOString());

  let dates = [];

  for(let i = 0; i >= -3; i--) {
    let _date =  momentDate.clone().add(i, 'months');
    const _formattedDate = formatDateDoc(_date, null, true);
    if(!dates.includes(_formattedDate)) dates.push(_formattedDate);
  }

  console.log('dates - ', dates);

  let docs = [];

  for(let date of dates) {
    const querySnapshot = await db
      .collection('user_engagement')
      .doc('interaction_engagement')
      .collection('lecture_engagement')
      .doc(date)
      // .doc('2023_6')
      .collection('days')
      .get();

    const endDocs = Array.from(querySnapshot.docs);

    docs = docs.concat(endDocs);
  }
  const dataMap = {};
  // const querySnapshot = await db
  //   .collection('user_engagement')
  //   .doc('interaction_engagement')
  //   .collection('lecture_engagement')
  //   .doc(formattedDate.start)
  //   // .doc('2023_6')
  //   .collection('days')
  //   .get();
  // // .doc(formatDateDoc(startDate))
  // // .doc('2023_4_16')
  //
  // const dataMap = {};
  //
  // let docs = Array.from(querySnapshot.docs);
  //
  // if(formattedDate.start !== formattedDate.end) {
  //   const querySnapshot = await db
  //     .collection('user_engagement')
  //     .doc('interaction_engagement')
  //     .collection('lecture_engagement')
  //     .doc(formattedDate.end)
  //     // .doc('2023_6')
  //     .collection('days')
  //     .get();
  //
  //   const endDocs = Array.from(querySnapshot.docs);
  //
  //   console.log('endDocs - ', endDocs);
  //
  //   docs = docs.concat(endDocs);
  // }

  docs.forEach(snapshot => {
    dataMap[snapshot.id] = snapshot.data();
  })

  console.log('docs - ', docs);

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

  const response = await transformActiveUsers(docs, true, startDate, endDate, last30DayStartDate)

  console.log('response - ', response);

  const responseForLast3Months = null;

  return getActiveUsers(response);

  // return dataMap;
}

export const transformActiveUsers = async (lectureEngagementDocs, includeUIDs, startDate, endDate, last30DayStartDate) => {
  const engagementMap = {};
  const activeUserMonthlyMap = {};
  const metaDataMap = {};

  lectureEngagementDocs.forEach(doc => {
    engagementMap[doc.id] = doc.data();
  })

  console.log('engagementMap - ', engagementMap);

  // const ist = await castIndianTime(true);
  // let momentDate = moment(ist);

  // const startDate = momentDate.clone().startOf('month');
  // const endDate =  momentDate.clone();

  const dateMap = {};

  let nextLastDate, i = 0;
  while(!nextLastDate || (nextLastDate < endDate)) {
    const a = startDate.clone().add(i, 'days').startOf('day');
    nextLastDate = startDate.clone().add(i, 'days').endOf('day');

    let dateString = formatDateDoc(a);
    if(includeUIDs) {
      let _obj = engagementMap[dateString]?.engagement_map ?? {};
      if(a >= last30DayStartDate) {
        let totalCount = Object.keys(_obj).reduce((acc, cur) => {
          const len = _obj[cur].lecture_engagement?.lectures_watched ? Object.keys(_obj[cur].lecture_engagement?.lectures_watched).length : 0;

          acc += len;

          return acc;
        }, 0);


        const todayFormattedDate = formatDateDoc(a, null);
        dateMap[todayFormattedDate] = totalCount;
      }

      if(_obj) {
        for(let uid in _obj) {
          let obj = _obj[uid];
          const total_time_spent = ((obj.lecture_engagement?.total_time_spent ?? 0) + (obj.blaze_engagement?.total_time_spent ?? 0) + (obj.live_session_engagement?.total_time_spent ?? 0));
          // const total_time_spent = ((obj.lecture_engagement?.total_time_spent ?? 0));

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

  console.log('dateMap - ', dateMap);

  return {monthMap: activeUserMonthlyMap, metaDataMap, dateMap};
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
    utilityFunctions: {
      getWatchLecturesCount: () => {
        console.log('dateMap - ', activeUserMap.dateMap);
        const totalLectures = Object.keys(activeUserMap.dateMap).reduce((acc, cur, ind) => {
          acc += activeUserMap.dateMap[cur] ?? 0;
          return acc;
        }, 0);

        return totalLectures / Object.keys(activeUserMap.dateMap).length;
      }
    },
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

export const getLifeTimeEngagement = async (userId, profileUser) => {
  // /user_engagement/daily_engagement/0pop6z39XhR3zXwSn2H7BJRE7er1/lifetime
  console.log('profileUser - ', profileUser);
  const snapshot = await db.collection('user_engagement')
    .doc('daily_engagement')
    .collection(userId)
    .doc('lifetime')
    .get();

  const signUpTs = profileUser.data.sign_up_ts;

  let lectureWatchedCount = 0;
  let timeSpent = 0;

  const lastYear = moment(signUpTs).clone();
  const data = [];
  for(let i = 0; true; i++) {
    let b = lastYear.clone().add(i, 'month');
    // {name: 'Jan', Lectures: 0, pv: 2400, amt: 2400},
    const keyData = snapshot.data()?.monthly_engagement[formatDateDoc(b, null, true)];
    data.push({
      name: b.format('MMM YYYY'),
      Lectures: keyData?.total_watched_lecture_count ?? 0,
    });

    lectureWatchedCount += keyData?.total_watched_lecture_count ?? 0;
    timeSpent += keyData?.total_spent_time ?? 0;

    if(formatDateDoc(b, false, true) === formatDateDoc(moment(), false, true)) {
      break;
    }
  }

  return {chartData: data, lectureWatchedCount, timeSpent};
}

export class PaginatedList {
  _list = []

  _prefetchedList = []

  _transformedList = []

  utilityFunctions = {};

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
                utilityFunctions,
                prefetchedList
              }) {
    this.doc = doc
    this.sortedListToFetch = sortedListToFetch
    this.limit = limit
    this.sortFunction = sortFunction
    this.metaDataMap = metaDataMap
    this.transformItemFn = transformItemFn
    this.utilityFunctions = utilityFunctions
    this.prefetchedList = prefetchedList
    this.totalCount = sortedListToFetch.length
  }

  transformList() {
    if (!this.transformItemFn) return
    this.transformedList = this.list.map(this.transformItemFn)
  }

  async initialLoad() {
    // this.sortedListToFetch.splice(0, 0, 'efZ8GIBZxCXmIzHZh6IlMUlX28A2')
    const list = this.sortedListToFetch.slice(0, this.limit)

    if (list.length < this.limit) {
      this.noMore = true;
      if(list.length === 0) return;
    }

    await this.fetchList(list)
  }

  async fetchList(list, pushMore = false) {
    let docs
    if (!this.prefetchedList) {
      this.loading = true
      const whereQuery = this.doc.where(list);
      console.log('whereQuery - ', whereQuery);
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

export const updateProfileImage = async (file, userId) => {
  let path = `users/user_profile/${userId}/${uuidv4()}.jpg`;
  let _url = null;

  await storage
    .ref()
    .child(path)
    .put(await fetch(file?.url).then((r) => r.blob()))
    .then(async (snapshot) => {
      return snapshot.ref.getDownloadURL().then((url) => (_url = url));
    });

  if (_url || "") {
    return await db
      .collection("users")
      .doc(userId)
      .set(
        {
          profile_url: _url,
        },
        { merge: true }
      )
      .then(() => [_url, true])
      .catch(() => [_url, false]);
  } else return [_url, false];
};

export const grantApplication = async (applicationId) => {
  fetch(
    "https://us-central1-avian-display-193502.cloudfunctions.net/updateScholarshipSheet",
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        column: "Approved?",
        value: "Yes",
        application_id: applicationId
      }),
    }
  )
    .then(() => console.log("rejected"))
    .catch((err) => console.log(err));

  await db
    .collection('scholarships')
    .doc(applicationId)
    .set({
      status: 'approved'
    }, {merge: true})
}

export const listenToOnlineUsers = (cb) => {
  rdb.ref('/user_state/pustack_app/active_users').on('value', (snapshot) => {
    const timeMap = snapshot.val();
    console.log('timeMap - ', timeMap);
    const sortedArr = Object.keys(timeMap).sort((a, b) => {
      if (new Date(timeMap[a].update_time) < new Date(timeMap[b].update_time)) return 1
      if (new Date(timeMap[a].update_time) > new Date(timeMap[b].update_time)) return -1
      return 0
    });

    let list = new PaginatedList({
      doc: {
        collectionPath: "users",
        where: arr => [firebase.firestore.FieldPath.documentId(), "in", arr]
      },
      sortedListToFetch: sortedArr,
      limit: 10,
      sortFunction: (a, b) => {
        return 0;
      },
      // metaDataMap: activeUserMap.metaDataMap,
      // utilityFunctions: {
      //   getWatchLecturesCount: () => {
      //     console.log('dateMap - ', activeUserMap.dateMap);
      //     const totalLectures = Object.keys(activeUserMap.dateMap).reduce((acc, cur, ind) => {
      //       acc += activeUserMap.dateMap[cur] ?? 0;
      //       return acc;
      //     }, 0);
      //
      //     return totalLectures / Object.keys(activeUserMap.dateMap).length;
      //   }
      // },
      transformItemFn: doc => {
        if(!doc.exists) return null;

        const data = doc.data()

        console.log('data - ', data.uid);

        const duration = moment() - moment(timeMap[data.uid].update_time);
        const formatted = humanizeTime(Math.round(duration / 1000));

        return {
          name: data.name,
          phone: "+" + data.phone_country_code + " " + data.phone_number,
          email: data.email,
          grade: data.grade,
          image: data.profile_url,
          uid: data.uid,
          // time_spent: activeUserMap.metaDataMap[data.uid]?.time_spent.total,
          // watched_count: activeUserMap.metaDataMap[data.uid]?.lectures_watched_count,
          online_since: +(new Date(timeMap[data.uid].update_time)),
          data: data
        }
      }
    })

    cb(list);
  })
}

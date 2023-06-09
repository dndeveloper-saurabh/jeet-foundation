import { toDate } from 'date-fns-tz';
/**
 * @deprecated
 * @returns {Date}
 */
export function getIndianTime() {
  const offset = 5.5;
  // create Date object for current location
  const d = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  const nd = new Date(utc + 3600000 * offset);

  nd.date = nd.getDate();
  nd.month = nd.getMonth();
  nd.year = nd.getFullYear();

  return nd;
}

let ist = {
  timestamp: null,
  updated_ts: null,
  on_first_load: null,
  serverISOString: null,
  INTERVAL_MS: 3000,
  interval_count: 0,
  expiration_ts: 5000,
  interval_id: null,
  /**
   * @deprecated
   * @returns {boolean}
   */
  isExpired: function() {
    let ts_now = new Date().getTime();
    return !this.timestamp || !this.updated_ts || (this.updated_ts + this.expiration_ts) < ts_now;
  },
  fetch: async function() {
    if(this.interval_id) clearInterval(this.interval_id);
    this.interval_id = setInterval(() => {
      this.interval_count++;
    }, this.INTERVAL_MS)
    const data = await fetch(
      "https://asia-east1-avian-display-193502.cloudfunctions.net/getIndiaTime",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: null,
      })
      .then(r => r.json())

    const date = new Date(data.timestamp);
    this.on_first_load = +date;
    this.serverISOString = data.isoString;
  },
  get: async function(force) {
    if(force) await this.fetch();
    if(!this.on_first_load) await this.fetch();
    /**
     * Fetching on another condition where the on_first_load is more than 15 minutes old.
     */
    if(this.interval_count * this.INTERVAL_MS > 15 * 60 * 1000) await this.fetch();
    return {
      timestamp: this.on_first_load + (this.interval_count * this.INTERVAL_MS),
      serverISOString: this.serverISOString
    };
  },
  /**
   * @deprecated
   * @param timestamp
   */
  update: function(timestamp) {
    this.updated_ts = new Date().getTime();
    this.timestamp = timestamp;
  }
}

/**
 * @description It has fully memoized and only calls the cloud function first time and then produces the time locally. More optimized than any other function
 * @returns {Promise<Date>}
 */
export async function castIndianTime(forceFetched = false) {
  const {serverISOString, timestamp} = await ist.get(forceFetched);
  const nd = new Date(timestamp);

  nd.date = nd.getDate();
  nd.month = nd.getMonth();
  nd.year = nd.getFullYear();

  /**
   *
   * @param valueInMilliseconds
   * @returns {Date}
   */
  nd.add = function(valueInMilliseconds) {
    const mill = this.getTime();
    return new Date(mill + valueInMilliseconds);
  }

  nd.serverISOString = serverISOString;

  return nd;
}

/**
 *
 * @param _date
 * @returns {{hour: number, month: number, year: number, milliSecond: number, day: number, minute: number, second: number}}
 */
export function transformDateTimeObject(_date) {
  if(!(_date instanceof Date)) throw new Error('Argument supposed to be a Date object.');

  const date = toDate(new Date(_date), {timeZone: 'Asia/Kolkata'});

  return {
    day: date.getDate(),
    hour: date.getHours(),
    milliSecond: date.getMilliseconds(),
    minute: date.getMinutes(),
    month: date.getMonth() + 1,
    second: date.getSeconds(),
    year: date.getFullYear(),
  }
}

/**
 * @description It has some memoization techniques implemented so the calls to the function "getIndianTime" are optimized
 * @param signal
 * @param refreshed
 * @returns {Promise<Date>}
 * @deprecated
 */
export async function fetchIndianTime(signal = null, refreshed = false) {
  if(!ist.isExpired() && !refreshed) {
    const nd = new Date(ist.timestamp);

    nd.date = nd.getDate();
    nd.month = nd.getMonth();
    nd.year = nd.getFullYear();
    return nd;
  }

  const data = await fetch(
    "https://asia-east1-avian-display-193502.cloudfunctions.net/getIndiaTime",
    {
      signal,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: null,
    })
    .then(r => r.json());

  ist.update(data.timestamp);

  const nd = new Date(ist.timestamp);

  nd.date = nd.getDate();
  nd.month = nd.getMonth();
  nd.year = nd.getFullYear();
  return nd;
}

export function toIndianTimeZone(date) {
  let d = new Date(date);
  let offset = -(d.getTimezoneOffset() + 330) * 60000;
  return new Date(d - offset);
}

import { last7Days } from './utils'

// refactor classes to extand a main fetch
export default class Data {
  constructor (token) {
    if (!token) {
      console.info('redirect to login page')
    }

    // move this url in a app constants object
    this.rs = 'https://portal-rumlive.rum.nccgroup-webperf.com/reports/rum/1/'
    this.token = token
  }

  get (realm, endpoint, date, filters) {
    if (!realm) {
      throw new TypeError('No realm provided 💣')
    }

    date = date || last7Days()

    endpoint = endpoint || 'loadspeedpercentile'
    filters = filters || {
      interval: '3600',
      navtiming: 'lnd',
      percentile: '50',
      period: date
    }

    const payload = {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        Authorization: `Bearer ${this.token}`,
        Realm: realm
      })
    }

    // needs refactoring () => (ac+='hello'), all the rest
    let requestUrl = Object.keys(filters).reduce((ac, filterName) => {
      ac += `${filterName}=${filters[filterName]}&`
      return ac
    }, this.rs + endpoint + '?')

    return window.fetch(requestUrl, payload).then(response => response.json())
  }
}

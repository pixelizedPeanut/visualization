export default class Data {
  constructor (token) {
    this.rs = 'https://portal-rumlive.rum.nccgroup-webperf.com/reports/rum/1/'
    this.token = token || 'd4bb950684c518eae69705ef75f3b9b2549e46c502cd8128fed5437070d5'
  }

  get (realm, endpoint, filters) {
    if (!realm) {
      throw new TypeError('No realm provided 💣')
    }

    endpoint = endpoint || 'loadspeedpercentile'
    filters = filters || {
      interval: '1800',
      navtiming: 'lnd',
      percentile: '50',
      period: `${Math.floor(new Date().getTime() / 1000 - 230000)}_${Math.floor(new Date().getTime() / 1000)}`
    }

    const payload = {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        Authorization: `Bearer ${this.token}`,
        Realm: realm
      })
    }

    let requestUrl = Object.keys(filters).reduce((ac, filterName) => {
      ac += `${filterName}=${filters[filterName]}&`
      return ac
    }, this.rs + endpoint + '?')

    return window.fetch(requestUrl, payload).then(response => response.json())
  }
}

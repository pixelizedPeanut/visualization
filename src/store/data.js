export default class Data {
  constructor(token) {
    this.rs = 'https://portal-rumlive.rum.nccgroup-webperf.com/reports/rum/1/'
    this.token = token || '89045a7e7a384341d31d7c4444810cf3c884511a41513b6490e1f54657b2'
  }

  get(realm, endpoint, filters) {
    filters = filters || {
      interval: '3600',
      navtiming: 'lnd',
      percentile: '50',
      period: `${new Date().getTime() / 1000}_${new Date().getTime() / 1000 - 230000}`
    }

    const payload = {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        Authorization: `Bearer ${this.token}`,
        Realm : realm
      })
    }

    let requestUrl = Object.keys(filters).reduce((ac, filterName) => {
      ac += `${filterName}=${filters[filterName]}&`
      return ac
    }, this.rs + endpoint + '?')

    return window.fetch(requestUrl, payload).then(response => response.json())
  }
}

export default class Realms {
  constructor (token) {
    this.url = 'https://portal-rumlive.rum.nccgroup-webperf.com/authorisation/user?service=8&u=cb86b7590b'
    this.token = token || 'd4bb950684c518eae69705ef75f3b9b2549e46c502cd8128fed5437070d5'
  }

  get () {
    return window.fetch(this.url, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        Authorization: `Bearer ${this.token}`
      })
    }).then(response => response.json()).then(res => res.realms).then(res => {
      return Object.keys(res).reduce((ac, key, i) => {
        ac[i] = res[key]
        ac[i].realm = key
        return ac
      }, [])
    })
  }
}

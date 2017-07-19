export default class Realms {
  constructor (token) {
    this.url = 'https://portal-rumlive.rum.nccgroup-webperf.com/authorisation/user?service=8&u=cb86b7590b'
    this.token = token || 'ee14c81dec6a30968a9ed14ad57199c4f9d69988188191632a83f7ca2fb8'
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

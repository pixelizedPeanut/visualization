export default class Realms {
  constructor (token) {
    this.url = 'https://portal-rumlive.rum.nccgroup-webperf.com/authorisation/user?service=8&u=cb86b7590b'
    this.token = token || '89045a7e7a384341d31d7c4444810cf3c884511a41513b6490e1f54657b2'
  }

  get () {
    return window.fetch(this.url, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        Authorization: `Bearer ${this.token}`
      })
    }).then(response => response.json()).then(res => res.realms).then(res => {
      console.log(res)
      return Object.keys(res).reduce((ac, key, i) => {
        ac[i] = res[key]
        ac[i].realm = key
        return ac
      }, [])
    })
  }
}

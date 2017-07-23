// refactor classes to extand a main fetch
export default class Realms {
  constructor (token) {
    if (!token) {
      console.info('redirect to login page')
    }

    // move this url in a app constants object
    this.url = 'https://portal-rumlive.rum.nccgroup-webperf.com/authorisation/user?service=8&u=cb86b7590b'
    this.token = token
  }

  get () {
    return window.fetch(this.url, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        Authorization: `Bearer ${this.token}`
      })
    }).then(response => response.json())
      .then(res => res.realms)
      .then(res => {
        return Object.keys(res).reduce((ac, key, i) => {
          ac[i] = res[key]
          ac[i].realm = key
          return ac
        }, [])
      })
  }
}

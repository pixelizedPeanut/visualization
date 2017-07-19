import Vue from 'vue'
import Vuex from 'vuex'
// import Data from './data'
import Realms from './realm'
import arrayStore from './array'

Vue.use(Vuex)

// const PERCENTILES = []

let realmsGenerator = new Realms()
// let data = new Data()

let realms = arrayStore('realms')

// let percentile = realms.array.reduce((ac, r) => {
//   ac[r.realm] = arrayStore(r.realm)
//   return ac
// }, {})

function setRealms (commit) {
  return realmsGenerator.get().then(res => commit(realms.types.SET, res))
}

const actions = {
  /*eslint-disable*/
  ga () {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-102848571-1', 'auto');
    ga('send', 'pageview');
  },
  /*eslint-enble*/
  /**
   * Request feeds and set the store
   * @return {Promise}
   */
  setRealms ({ commit }) {
    return setRealms(commit)
  }
}

const getters = {
  realms: (state) => state.realms.array
}

// Create the store
var store = new Vuex.Store({
  getters: getters,
  actions: actions
})

store.registerModule('realms', {
  mutations: realms.mutations,
  state: realms.state
})

export default store

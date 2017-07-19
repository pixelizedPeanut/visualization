import Vue from 'vue'
import Vuex from 'vuex'
import Data from './data'
import Realms from './realm'
import arrayStore from './array'
import hc from 'highcharts'

Vue.use(Vuex)

let realmsGenerator = new Realms()
let data = new Data()

let realms = arrayStore('realms')
let percentiles = arrayStore('percentiles')
let chart

function setRealms (commit) {
  return realmsGenerator.get().then(res => {
    commit(realms.types.SET, res)
    return res
  })
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
  setRealms ({ commit, state }) {
    return setRealms(commit)
  },

  setPercentiles ({ commit, state }) {
    return state.realms.array.map((r) => {
      return data.get(r.realm).then(res => {
        let newRecord = [{}]
        if (res.chart[0]) {
          newRecord[0].realm = r.realm
          newRecord[0].label = r.label
          newRecord[0].data = res.chart[0].data
          commit(percentiles.types.ADD, newRecord)
          if (chart) {
            chart.addSeries({
              name: r.label,
              data: res.chart[0].data
            })
          }
          return res
        }
      })
    })
  },

  render ({ state }) {
    let series = state.percentiles.array.map(i => {
      return {
        name: i.label,
        data: i.data
      }
    })

    chart = hc.chart('hc', {
      title: false,
      series: series
    })
  }
}

const getters = {
  realms: (state) => state.realms.array,
  percentiles: (state) => state.percentiles.array
}

// Create the store
let store = new Vuex.Store({
  getters: getters,
  actions: actions
})

store.registerModule('realms', {
  mutations: realms.mutations,
  state: realms.state
})

store.registerModule('percentiles', {
  mutations: percentiles.mutations,
  state: percentiles.state
})

export default store

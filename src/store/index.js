import Vue from 'vue'
import Vuex from 'vuex'
import Data from './data'
import Realms from './realm'
import arrayStore from './array'
// import Chart from './hc'
import hc from 'highcharts'

hc.setOptions({
  chart: {
    style: {
      fontFamily: 'sans-serif'
    }
  }
})

Vue.use(Vuex)

let realmsGenerator = new Realms()
let data = new Data()

let realms = arrayStore('realms')
let percentiles = arrayStore('percentiles')
let revenue = arrayStore('revenue')
let conversion = arrayStore('conversion')
let chart, chartRevenue, chartConversion

let chartDefault = {
  plotOptions: {
    series: {
      marker: {
        enabled: false
      }
    }
  },
  xAxis: {
    title: {
      text: ''
    },
    type: 'datetime',
    dateTimeLabelFormats: {
      day: '%d-%b'
    },
    crosshair: true
  }
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
   * Requests and set the store
   * @return {Promise}
   */
  setRealms ({ commit }) {
    return realmsGenerator.get().then(res => commit(realms.types.SET, res))
  },

  // change to draw percentiles and pass chart in
  setPercentiles ({ commit, state }, start, end) {
    return state.realms.array.map((r) => {
      return data.get(r.realm, null, start, end).then(res => {
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
        }
      })
    })
  },

  setMetrics ({ commit, state }, start, end) {
    return state.realms.array.map((r) => {
      return data.get(r.realm, 'conversionmetricsbytime', start, end).then(res => {
        let newRecord = [{}]
        let newRecord2 = [{}]
        if (res.results.length > 0) {
          newRecord[0].realm = r.realm
          newRecord[0].label = r.label
          newRecord[0].data = res.results.map(r => {
            return {
              x: r.key,
              y: Math.floor(r.revenuegbp / 1000)
            }
          })
          commit(revenue.types.ADD, newRecord)

          newRecord2[0].realm = r.realm
          newRecord2[0].label = r.label
          newRecord2[0].data = res.results.map(r => {
            return {
              x: r.key,
              y: r.conversion
            }
          })
          commit(conversion.types.ADD, newRecord2)

          if (chartRevenue) {
            chartRevenue.addSeries({
              name: r.label,
              data: newRecord[0].data
            })
          }

          if (chartConversion) {
            chartConversion.addSeries({
              name: r.label,
              data: newRecord2[0].data
            })
          }
        }
      })
    })
  },

  renderRevenue ({ state }, start, end) {
    let seriesC = state.conversion.array.map(i => {
      return {
        name: i.label,
        data: i.data
      }
    })

    let seriesR = state.revenue.array.map(i => {
      return {
        name: i.label,
        data: i.data
      }
    })

    chartRevenue = hc.chart('hc2', Object.assign(chartDefault, {
      yAxis: {
        title: {
          text: 'Revenue'
        },
        labels: {
          format: '{value} GBP'
        }
      },
      title: false,
      series: seriesR
    }))

    chartConversion = hc.chart('hc3', Object.assign(chartDefault, {
      yAxis: {
        title: {
          text: 'Conversion'
        },
        labels: {
          format: '{value}'
        }
      },
      title: false,
      series: seriesC
    }))
  },

  render ({ state }) {
    let series = state.percentiles.array.map(i => {
      return {
        name: i.label,
        data: i.data
      }
    })

    chart = hc.chart('hc', Object.assign(chartDefault, {
      yAxis: {
        title: {
          text: 'Page load time'
        },
        labels: {
          format: '{value}s'
        }
      },
      title: false,
      series: series
    }))
  },

  updateDate ({ commit }, start, end) {
    commit(conversion.types.SET, [])
    commit(revenue.types.SET, [])
    commit(percentiles.types.SET, [])
  }
}

const getters = {
  realms: (state) => state.realms.array,
  percentiles: (state) => state.percentiles.array,
  revenue: (state) => state.revenue.array,
  conversion: (state) => state.conversion.array
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

store.registerModule('revenue', {
  mutations: revenue.mutations,
  state: revenue.state
})

store.registerModule('conversion', {
  mutations: conversion.mutations,
  state: conversion.state
})

export default store

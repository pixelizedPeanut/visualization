import Vue from 'vue'
import Vuex from 'vuex'
import Data from './data'
import Realms from './realm'
import arrayStore from './array'
import treeStore from './tree'
// import Chart from './hc'
import hc from 'highcharts'

Vue.use(Vuex)

const TOKEN = 'c924b652e25324988dbfdabcb34b3ac81c8b329c9d035bb8ed9fceae89ba'
let realmsGenerator = new Realms(TOKEN)
let data = new Data(TOKEN)

const CONFIG = {
  dateStart: new Date(new Date().getTime() - 3 * 24 * 3600 * 1000)
               .toISOString('')
               .match(/(.+)T/)[1],
  dateEnd: new Date()
             .toISOString('')
             .match(/(.+)T/)[1],
  apply: false
}

const pages = treeStore('pages', CONFIG)

const realms = arrayStore('realms')
const percentiles = arrayStore('percentiles')
const revenue = arrayStore('revenue')
const conversion = arrayStore('conversion')
let charts = {}

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

hc.setOptions({
  chart: {
    style: {
      fontFamily: 'sans-serif'
    }
  }
})

const actions = {
  /*eslint-disable*/
  ga () {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||
     function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();
     a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;
     m.parentNode.insertBefore(a,m)})(window,document,'script',
     'https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-102848571-1', 'auto');
    ga('send', 'pageview');
  },
  /*eslint-enble*/

  setPageProp ({ commit }, propArray) {
    commit(pages.types.SET_KEY, propArray)
  },
  /**
   * Requests and set the store
   * @return {Promise}
   */
  setRealms ({ commit }) {
    return realmsGenerator.get()
      .then(res => res.filter(r => isMissguided(r)))
      .then(filtered => commit(realms.types.SET, filtered))
  },

  // change to draw percentiles and pass chart in
  setPercentiles ({ commit, state }, date) {
    return state.realms.array.map((r, i) => {
      return data.get(r.realm, 'loadspeedpercentile', date).then(res => {
        if (res.chart[0]) {
          commit(percentiles.types.ADD, [{
            realm: r.realm,
            label: r.label,
            data: parsePlt(res)
          }])
          if (i === state.realms.array.length - 1) {
            commit(pages.types.SET_KEY, ['apply', true])
          }

          // hc won't catch data changes, we must add it manually
          addSeries('hc', r.label, parsePlt(res))
        }
      })
    })
  },

  setMetrics ({ commit, state }, date) {
    return state.realms.array.map((r) => {
      return data.get(r.realm, 'conversionmetricsbytime', date).then(res => {
        if (endpointValidator('conversionmetricsbytime', res)) {
          commit(revenue.types.ADD, [{
            realm: r.realm,
            label: r.label,
            data: parseRevenue(res)
          }])

          commit(conversion.types.ADD, [{
            realm: r.realm,
            label: r.label,
            data: parseConversions(res)
          }])

          // hc won't catch data changes, we must add it manually
          addSeries('hc3', r.label, parseConversions(res))
          addSeries('hc2', r.label, parseRevenue(res))
        }
      })
    })
  },

  render ({ state }, c) {
    let series = state[c.store].array.map(i => {
      return {
        name: i.label,
        data: i.data
      }
    })

    if (charts[c.id]) {
      charts[c.id].destroy()
    }

    charts[c.id] = hc.chart(c.id, Object.assign(chartDefault, {
      yAxis: {
        title: {
          text: c.title
        },
        labels: {
          format: `{value}${c.label}`
        }
      },
      title: false,
      series: series
    }))
  },

  resetStore ({ commit }) {
    commit(conversion.types.SET, [])
    commit(revenue.types.SET, [])
    commit(percentiles.types.SET, [])
  }
}

function addSeries (id, label, data) {
  if (charts[id]) {
    charts[id].addSeries({
      name: label,
      data: data
    })
  }
}

function isMissguided (conf) {
  return conf.customer === '363' || conf.customer === '861'
}

const getters = {
  pages: (state) => state.pages.tree,
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

store.registerModule('pages', {
  mutations: pages.mutations,
  state: pages.state
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

// to be moved somewhere else e.g api utils
function parseConversions (data) {
  return data.results.map(r => ([r.key, r.conversion]))
}

function parseRevenue (data) {
  return data.results.map(r => ([r.key, parseInt(r.revenuegbp / 100000, 10)]))
}

function parsePlt (data) {
  return data.chart[0].data.map(r => ([r.x, r.y]))
}

function endpointValidator (url, data) {
  switch (url) {
    case 'conversionmetricsbytime':
      return data.results.length > 0

    case 'loadspeedpercentile':
      return data.chart[0]
  }
}

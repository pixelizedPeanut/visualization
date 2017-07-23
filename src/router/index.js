import Vue from 'vue'
import Router from 'vue-router'
import CRUM from '@/components/ConsolidatedView'

Vue.use(Router)

export default new Router({
  // add date in route as param
  routes: [
    {
      path: '/:date',
      name: 'C-RUM',
      component: CRUM,
      props: true
    },
    {
      path: '/',
      name: 'C-RUM-Blank',
      component: CRUM
    }
  ]
})

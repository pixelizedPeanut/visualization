import Vue from 'vue'
import Router from 'vue-router'
import ConsolidatedView from '@/components/ConsolidatedView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/consolidated',
      name: 'Consolidated View',
      component: ConsolidatedView
    }
  ]
})
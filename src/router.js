import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      component: () => import(/* webpackChunkName: "warehouse" */ './views/warehouse'),
    },
  ],
})

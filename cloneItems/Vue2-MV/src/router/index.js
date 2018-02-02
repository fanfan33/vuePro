import Vue from 'vue'
import Router from 'vue-router'
var util = require('util');
Vue.use(Router)

import Index from '../pages/Index'
import MV from '../pages/MV'

//const Mplayer = resolve => require(['../components/Mplayer'], resolve)

export default new Router({
  //mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      console.log(util.format(savedPosition)+"   path="+util.format(to));
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    { path: '/', component: Index, name: 'index', meta: {keepAlive: true} },
    { path: '/mv/:id', component: MV, name: 'mv', meta: {keepAlive: false} }
  ]
})

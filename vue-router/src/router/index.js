import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Users from '@/components/Users'

import Computer from '@/components/Computer'
import Phone from '@/components/Phone'
import PhoneDialog from "@/components/PhoneDialog";
import Tv from '@/components/Tv'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: 'phone',
        component: PhoneDialog
      },{
        path: 'computer',
        component: Computer
      },{
        path: 'tv',
        component: Tv
      },{
        path: '',
        component: PhoneDialog
      }]
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/users/:id',
      name: 'Users',
      component: Users
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

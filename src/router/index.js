import Vue from 'vue'
import Router from 'vue-router'
import UserManager from '@/views/user/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserManager',
      component: UserManager
    }
  ]
})

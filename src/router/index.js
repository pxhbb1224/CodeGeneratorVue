import Vue from 'vue'
import Router from 'vue-router'
import UserManager from '@/views/user/index'
import Generator from '@/views/generator/index'
import Table from '@/views/generator/table'
import Settings from '@/views/user/settings'

Vue.use(Router)

export default new Router({
  //配置项目访问文件路径
  routes: [
    {
      path: '/',
      name: 'UserManager',
      component: UserManager
    },
    {
      path: '/generator',
      name: 'Generator',
      component: Generator
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Settings
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import UserManager from '@/views/user/index'
import CodeManager from '@/views/code/index'
import Generator from '@/views/generator/index'
import Table from '@/views/generator/table'
import View from '@/views/user/table'

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
      path: '/code',
      name: 'Code',
      component: CodeManager
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
      path: '/view',
      name: 'View',
      component: View
    }
  ]
})

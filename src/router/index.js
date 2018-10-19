import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','teacher']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '',
    redirect: '/exam/list'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/exam/list',
    title: '试卷列表',
    component: Layout,
    children: [
      {
        path: '/exam/list',
        component: () => import('@/views/exam/list'),
        name: '试卷列表',
        meta: { title: '试卷列表', icon: 'list', status: { '待扫描': true, '扫描中': true, '已扫描': true, '校对中': true, '已校对': true }},
        noCache: true
      }
    ]
  },
  {
    path: '/exam/edit',
    title: '试卷编辑',
    component: Layout,
    children: [
      {
        path: '/exam/edit',
        component: () => import('@/views/exam/list'),
        name: '试卷编辑',
        meta: { title: '试卷编辑', icon: 'list', status: { '待扫描': true }},
        noCache: true
      }
    ]
  },
  {
    path: '/exam/scan',
    title: '试卷扫描',
    component: Layout,
    children: [
      {
        path: '/exam/scan',
        component: () => import('@/views/exam/list'),
        name: '试卷扫描',
        meta: { title: '试卷扫描', icon: 'list', status: { '待扫描': true, '扫描中': true }},
        noCache: true
      }
    ]
  },
  {
    path: '/exam/veri',
    title: '试卷校对',
    component: Layout,
    children: [
      {
        path: '/exam/veri',
        component: () => import('@/views/exam/list'),
        name: '试卷校对',
        meta: { title: '试卷校对', icon: 'list', status: { '已扫描': true, '校对中': true }},
        noCache: true
      }
    ]
  },
  {
    path: '/exam/verify/:examid(\\d+)',
    title: '分项校对',
    hidden: true,
    component: Layout,
    children: [
      {
        path: '/exam/verify/:examid(\\d+)',
        component: () => import('@/views/veri/UnitVeri'),
        name: '分项校对',
        meta: { title: '分项校对', icon: 'list', status: { '已扫描': true, '校对中': true }},
        noCache: true
      }
    ]
  },
  {
    path: '/exam/score',
    title: '成绩查看',
    component: Layout,
    children: [
      {
        path: '/exam/score',
        component: () => import('@/views/exam/list'),
        name: '成绩查看',
        meta: { title: '成绩查看', icon: 'list', status: { '已校对': true }},
        noCache: true
      }
    ]
  },
  {
    path: '/exam/scorelist/:examid(\\d+)',
    title: '成绩单',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/exam/scorelist/:examid(\\d+)',
        component: () => import('@/views/exam/scorelist'),
        name: '成绩单',
        meta: { title: '成绩单' },
        noCache: true
      }
    ]
  },
  {
    path: '/exam/studentscore/',
    title: '单人成绩',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/exam/studentscore/',
        component: () => import('@/views/exam/studentscore'),
        name: '单人成绩',
        meta: { title: '单人成绩' },
        noCache: true
      }
    ]
  },
  /*新添加的考试分析，饼图和折线图*/
  {
    path: '/exam/analysis/',
    title: '成绩分析',
    component: Layout,
    children: [
      {
        path: '/exam/analysis/',
        component: () => import('@/views/exam/analysis'),
        name: '成绩分析',
        meta: { title: '成绩分析', icon: 'list', status: { '已校对': true }},
        noCache: true
      }
    ]
  },
  {
    path: '/exam/scoreAnalysis/:examid(\\d+)',
    title: '考试成绩分析',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/exam/scoreAnalysis/:examid(\\d+)',
        component: () => import('@/views/exam/scoreAnalysis'),
        name: '考试成绩分析',
        noCache: true
      }
    ]
  }
]

import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home/index',
    name: '首页',
    hidden: true,
    meta: { title: ' 首页' }
   
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页' }
      }
    ]
  },{
    path: '/plan',
    component: Layout,
    children: [
      {
        path: 'schedule',
        name: 'schedule',
        component: () => import('@/views/Plan/schedule'),
        meta: { title: '计划进度' }
      }
    ]
  }, 
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'Right',
        name: 'Right',
        component: () => import('@/views/Right/userRole'),
        meta: { title: '用户权限' }
      }
    ]
  }, 
  {
    path: '/flow',
    component: Layout,
    children: [
      {
        path: 'mg',
        name: 'mg',
        component: () => import('@/views/flow/mg'),
        meta: { title: '流程管理' }
      }
    ]
  }, 
  {
    path: '/Log',
    component: Layout,
    children: [
      {
        path: 'lmg',
        name: 'lmg',
        component: () => import('@/views/Log/mg'),
        meta: { title: '日志管理' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
  mode:'history'
})


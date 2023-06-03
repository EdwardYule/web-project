import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  { 
    path: '/noLogin', 
    name: 'noLogin', 
    component: () => import('@/views/noLogin/index.vue')
  },
  { 
    path: '/', 
    name: 'index', 
    component: () => import('@/components/layout/home.vue'),
    redirect: '/home',
    children: [{
      path: '/home', 
      name: 'home', 
      meta: { title: "首页"}, 
      component: () => import('@/views/home/index.vue'),
    },{
      path: '/detail', 
      name: 'detail', 
      meta: { title: "详情"}, 
      component: () => import('@/views/detail/index.vue'),
    },
    {
      path: '/contribute', 
      name: 'contribute', 
      meta: { title: "投稿"}, 
      component: () => import('@/views/contribute/index.vue'),
    },
    {
      path: '/basicInfo', 
      name: 'basicInfo', 
      meta: { title: "基本资料"}, 
      component: () => import('@/views/info/basicInfo.vue'),
    },
    {
      path: '/infoCenter', 
      name: 'infoCenter', 
      meta: { title: "个人中心"}, 
      component: () => import('@/views/info/infoCenter.vue'),
    },
    {
      path: '/aboutUs', 
      name: 'aboutUs', 
      meta: { title: "关于我们"}, 
      component: () => import('@/views/aboutUs/index.vue'),
    },
    {
      path: '/contactUs', 
      name: 'contactUs', 
      meta: { title: "联系我们"}, 
      component: () => import('@/views/contactUs/index.vue'),
    },
    {
      path: '/product', 
      name: 'product', 
      meta: { title: "产品知识"}, 
      component: () => import('@/views/product/index.vue'),
    },
    {
      path: '/knowledge/:id', 
      name: 'knowledge', 
      meta: { title: "知识分类"}, 
      component: () => import('@/views/knowledge/index.vue'),
    },
    {
      path: '/search', 
      name: 'search', 
      meta: { title: "搜索"}, 
      component: () => import('@/views/search/index.vue'),
    },
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({x:0,y:0}),
  routes: routes
})
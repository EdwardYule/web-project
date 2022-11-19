import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [
  { 
    path: '/', 
    name: 'index', 
    component: () => import('@/components/layout/home.vue'),
    redirect: '/home',
    children: [{
      path: '/home', 
      name: 'home', 
      component: () => import('@/views/home/index.vue'),
    },{
      path: '/detail', 
      name: 'detail', 
      component: () => import('@/views/detail/index.vue'),
    },
    {
      path: '/contribute', 
      name: 'contribute', 
      component: () => import('@/views/contribute/index.vue'),
    },
    {
      path: '/basicInfo', 
      name: 'basicInfo', 
      component: () => import('@/views/info/basicInfo.vue'),
    },
    ]
  },
]

export default new Router({
  routes: routes
})
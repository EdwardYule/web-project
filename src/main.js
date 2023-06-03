import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css';
import less from 'less';
import api from './api'
import utils from '@/static/utils'
Vue.use(less)

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$utils = utils

Vue.use(Element, { size: 'small', zIndex: 3000 });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

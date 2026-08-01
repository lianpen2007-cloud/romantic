import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI) // 使用elementUI
Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter) // 使用路由

import less from 'less'
Vue.use(less) // 使用less

import App from './baseApp/index.vue'
import routerConfig from './router'
new Vue({
  router: new VueRouter(routerConfig),
  render: h => h(App),
}).$mount('#index-html-body')

 

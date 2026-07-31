import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue'
import routerConfig from './router'
new Vue({
  router: new VueRouter(routerConfig),
  render: h => h(App),
}).$mount('#index-html-body')

 

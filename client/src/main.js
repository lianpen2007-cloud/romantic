import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routerConfig from './router'
const router = new VueRouter(routerConfig)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
 
Vue.use(ElementUI);

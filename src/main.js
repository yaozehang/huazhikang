// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from './http.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 权限相关设置
// import router from './router/router.js'
import Vuex from 'vuex'

import utils from './utils'
import 'babel-polyfill'
// Vue.config.debug = true

import '@/common/css/base.css'
import '@/common/css/main.css'
import '@/common/css/my-css.css'
Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://127.0.0.1:8080'
// axios.defaults.baseURL = 'http://192.168.50.190:8080'  //yue 
// axios.defaults.baseURL = 'http://47.92.26.132:8081'
// axios.defaults.baseURL = 'http://192.168.50.211:8080'   //211
// axios.defaults.baseURL = '/api'
	// axios.defaults.baseURL = 'http://localhost:8080/'
	axios.defaults.baseURL = 'http://192.168.5.129:8080/'
// 打包之前线上地址
axios.defaults.timeout = 20000
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}


// instance .post(`url`, params).then(res => res.data);

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(utils)
Vue.use(Vuex)
// Vue.component('c-pdf', CPdf)
Vue.prototype.utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {menuRouter} from '@/router/router'
import {router} from '@/router/index'
import store from './store/store'//Vuex
import Vuex from 'vuex'
import {elementWzp} from '@/element/elementConfig'//封装了按需引入的element-ui组件
import 'element-ui/lib/theme-chalk/index.css'

import Fragment from 'vue-fragment'//用来使el-menu折叠时替代多余<div>
import '@/assets/iconfont/iconfont.css'


require("./mock/mock.js")


Vue.use(Vuex)
Object.keys(elementWzp).forEach((index) => {
  if(index === 'Message'){
    Vue.component(elementWzp[index].name, elementWzp[index])
    Vue.prototype.$message = elementWzp.Message
  }else{
    Vue.use(elementWzp[index])
  }
})

Vue.config.productionTip = false

Vue.use(Fragment.Plugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  data: {},
  methods: {
    init() {

    }
  },
  mounted() {


  }
})

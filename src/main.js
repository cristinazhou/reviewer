// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import Axios from 'axios'

import 'iview/dist/styles/iview.css'    // 使用 CSS
Vue.use(iView);
var http = Axios.create({
  // headers:{
  //   // "Access-Control-Allow-Origin": true
  // },
  timeout: 8000,
  baseURL: 'http://localhost:8080/sce_reviewer'
})


Vue.prototype.$axios = http
var token;

Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  if(to.path!=='/'&&to.path!=='/register' && to.path !== '/login'){
    token = localStorage.getItem("token");
    if(token){
      next();
    }else {
      next('/');
    }
  } else {
    next();
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

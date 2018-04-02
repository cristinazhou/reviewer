// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import store from '@/store'
import util from '@/lib/util';
Vue.use(iView);

let http = axios.create({
  timeout: 8000,
  baseURL: 'http://localhost:8080/sce_reviewer',
});
http.defaults.headers.common['X-Token'] = localStorage.getItem('token');

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/' && to.path !== '/register' && to.path !== '/login') {
    let token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

http.interceptors.response.use(function (response) {
  if (response.data) {
    if (response.data.meta) {
      if (!response.data.meta.success) {
        store.commit('responseErrMsg', response.data.meta.errMsg);
      } else {
        return Promise.resolve(response);
      }
    }
  }
}, function (error) {
  store.commit('responseFailed', error.response.status);
  return Promise.reject(error);
});
Vue.prototype.$axios = http;
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import Axios from 'axios'
import 'iview/dist/styles/iview.css'    // 使用 CSS
import store from './components/vuex/store'
import  Vuex from 'vuex'
Vue.use(iView);

var http = Axios.create({
  timeout: 8000,
  baseURL: 'http://localhost:8080/sce_reviewer',
});
http.defaults.headers.common['X-Token'] = localStorage.getItem('token');

Vue.config.productionTip = false
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

http.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data) {
        if (response.data.meta)
          if (response.data.meta.success) {
            return response;
          }
      }
    }
  }, error => {
    if (error.response) {
      switch (error.response.status) {
        case 500 :
      }
      return Promise.reject(error);
    }
  }
);
Vue.prototype.$axios = http;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: {App},
  template: '<App/>'
})

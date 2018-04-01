import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import app from './app'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {},
  modules: {
    user,
    app
  }
});

export default store;
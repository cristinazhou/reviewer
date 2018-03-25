import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    count:1,
    temp:''
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }

  },getters
});


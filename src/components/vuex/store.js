import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getters.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    papaerID:'',
    refresh:false
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    },
    setpaper(state,payload){
      state.temp.paperID+=payload.papaerID;
    },
    refreshcomment(state){

      state.refresh=(state.refresh?false:true);
    }

  }, getters
});


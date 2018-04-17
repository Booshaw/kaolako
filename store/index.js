import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    cookie: '初始cookie'
  },
  mutations: {
    setCookie (state,cookie) {
      state.cookie = cookie
    }
  },
  getters: {
    cookie: state => state.cookie
  }
})
export default store
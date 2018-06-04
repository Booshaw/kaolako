import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    cookie: '初始cookie',
    isLogin: false
  },
  mutations: {
    setCookie (state,cookie) {
      state.cookie = cookie
    },
    login(state) {
      state.isLogin = true
    },
    logOut(state) {
      state.isLogin = false
    }
  },
  getters: {
    cookie: state => state.cookie,
    isLogin: state => state.isLogin
  }
})
export default store
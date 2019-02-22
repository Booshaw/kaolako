import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  preload: 1.3,
  error: require('../static/error-msg.png'),
  loading: require('../static/error-msg.png')
})
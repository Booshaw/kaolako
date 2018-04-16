/*
*
* 根数据状态 存放全局数据和异步方法
*
*/

import Vue from 'vue'
import service from '~/plugins/axios'

// global actions
export const actions = {

  // // 全局服务初始化
  // nuxtServerInit(store, { params, route, req }) {
  //   // 检查设备类型
  //   const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent
  //   const { isMobile, isOpera, isIE, isSafari, isEdge, isFF, isBB, isChrome, isMaxthon, isIos } = uaParse(userAgent)
  //   const mustJpg = (isIos || isFF || isMaxthon || isSafari || isBB || isIE || isEdge)
  //   store.commit('option/SET_IMG_EXT', mustJpg ? 'jpeg' : 'webp')
  //   // console.log(mustJpg ? 'jpeg' : 'webp')
  //   store.commit('option/SET_MOBILE_LAYOUT', isMobile)
  //   store.commit('option/SET_USER_AGENT', userAgent)
  //   const initAppData = [
  //     // 配置数据
  //     store.dispatch('loadAdminInfo'),
  //     store.dispatch('loadGlobalOption'),
  //     // 内容数据
  //     store.dispatch('loadTagList'),
  //     store.dispatch('loadCategories')
  //   ]
  //   // 如果不是移动端的话，则请求热门文章
  //   if (!isMobile) {
  //     initAppData.push(store.dispatch('loadHotArticles'))
  //   }
  //   // 首次服务端渲染时渲染评论数据
  //   const isGuestbook = Object.is(route.name, 'guestbook')
  //   const post_id = params.article_id || (isGuestbook ? 0 : false)
  //   if (!Object.is(post_id, false)) {
  //     initAppData.push(store.dispatch('loadCommentsByPostId', { post_id }))
  //   }
  //   return Promise.all(initAppData)
  // },

  // 获取最热文章列表
  loadHotArticles({ commit }) {
    commit('article/REQUEST_HOT_LIST')
    return service.get('/Index')
    .then(response => {
      const success = response.status && response.data
      if (success) commit('article/GET_HOT_LIST_SUCCESS', response.data)
      if (!success) commit('article/GET_HOT_LIST_FAILURE')
    }, err => {
      commit('article/GET_HOT_LIST_FAILURE', err)
    })
  },

  // 获取公告列表
  loadAnnouncements({ commit }) {
    commit('announcement/REQUEST_LIST')
    return service.get('/Index',)
    .then(response => {
      const success = response.status && response.data
      if (success) commit('announcement/GET_LIST_SUCCESS', response.data.data)
      if (!success) commit('announcement/GET_LIST_FAILURE')
    }, err => {
      commit('announcement/GET_LIST_FAILURE', err)
    })
    },
}
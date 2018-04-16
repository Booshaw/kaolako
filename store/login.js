/*
*
* 文章数据状态
*
*/

export const state = () => {
  return {
    cookie: '初始化cookie'
  }
}
export const mutations = {

  // List
  login(state, action) {
    state.cookie = action
  }
}
export const getters = {
  cookie: state => state.cookie
}
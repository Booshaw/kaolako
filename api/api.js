import axios from 'axios'
const serverUrl = 'http://cd.godo.pub:18080/kaola'

// 登录
export function login(params) {
  const url =`${serverUrl}/login`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 登出
export function logOut(params) {
  const url =`${serverUrl}/logout`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取文章分类,标签
export function getCategoryTag(params) {
  const url =`${serverUrl}/common/dict/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取文章列表
export function getArticleList(params) {
  const url = `${serverUrl}/web/article/list`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取文章详情
export function getArticle(params) {
  const url = `${serverUrl}/web/article/get`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 发布文章
export function uploadArticle(params) {
  const url = `${serverUrl}/user/article/add`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取课程列表
export function getCourseList(params) {
  const url = `${serverUrl}/web/course/list`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取课程详情
export function getCourseDetail(params) {
  const url = `${serverUrl}/web/course/detail`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取小节视频播放源
export function getVideoDetail(params) {
  const url = `${serverUrl}/web/course/episode`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取师资列表
export function getTeacherList(params) {
  const url = `${serverUrl}/web/teacher/list`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取师资详情
export function getTeacherDetail(params) {
  const url = `${serverUrl}/web/teacher/detail`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取个人中心用户数据
export function getCenterInfo(params) {
  const url = `${serverUrl}/web/user/info`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取个人中心动态列表
export function getCenterIndex(params) {
  const url = `${serverUrl}/user/history/list`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 个人中心师资预约列表
export function getOrderList(params) {
  const url = `${serverUrl}/user/teacher/order/list`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 个人中心师资发布预约
export function uploadOrder(params) {
  const url = `${serverUrl}/user/teacher/order/add`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 个人中心师资删除预约
export function deleteOrder(params) {
  const url = `${serverUrl}/user/teacher/order/update`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 个人中心发起认证
export function uploadIdentification(params) {
  const url = `${serverUrl}/user/authentication/add`
  return axios.post(url,params).then((res) => {
    return Promise.resolve(res.data)
  })
}
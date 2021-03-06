import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = '/api'
axios.defaults.baseURL = ''
axios.defaults.withCredentials=true
// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    });
// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error) {
        }
        // console.log(JSON.stringify(error)); // console : Error: Request failed with status code 402
        return Promise.reject(error)
    });

export default axios;

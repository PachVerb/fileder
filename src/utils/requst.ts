/*
 * @Author: wangshan
 * @Date: 2021-05-03 22:27:40
 * @LastEditors: wangshan
 * @LastEditTime: 2021-05-04 22:43:51
 * @Description: 
 */
import Vue from 'vue'
import Axios, { AxiosInstance } from 'axios'
import router from '@/router/index'
// import { notification } from 'ant-design-vue'
const config = {
  baseURL: 'http://localhost:8080/',
  timeout: 60 * 1000,
  headers: { 'Content-type': 'application/json' }
}

const serve:AxiosInstance = Axios.create(config)

function errorHandle (status: number):void {
  if (status === 401) {
    window.localStorage.clear()
    // notification.warn({
    //   description: '会话过期，请从新登陆',
    //   message: 'error'
    // })
    router.push('/login')
  }
  if (status === 500) {
    router.push('/500')
  }
}

serve.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
serve.interceptors.response.use(function (response) {
  return response
}, function (error) {  
  errorHandle(error.response.status)
  return Promise.reject(error)
})

const Plugin = {
  install (vue:Vue):void {
    vue.prototype.$req = serve
  }
}

export default Plugin

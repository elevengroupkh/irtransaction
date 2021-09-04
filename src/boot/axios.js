import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { LocalStorage, Cookies } from 'quasar'

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  baseURL: '/'
})

axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    //config.headers.Authorization = 'Bearer ' + LocalStorage.getItem('lp_token')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

axiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {

  if (error.response.status==401){
    //LocalStorage.remove('lp_token')
    window.location = '/';
  }
  return Promise.reject(error)
})

const setBaseURL = (baseURL) => {
  axiosInstance.defaults.baseURL = baseURL
}

Vue.prototype.$axios = axiosInstance

export { axiosInstance, setBaseURL }

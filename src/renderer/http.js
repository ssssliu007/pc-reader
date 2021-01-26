import Axios from 'axios'

const CONFIG = {
  baseURL: "http://www.xbiquge.la/",
  timeout: 5000
}
const axios = Axios.create(CONFIG)
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
})
axios.interceptors.response.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
})

export default axios

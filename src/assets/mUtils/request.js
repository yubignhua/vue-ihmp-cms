import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

const service = axios.create({
  baseURL: process.env.BASE_API
  // timeout: 3000 // request timeout
});

service.defaults.withCredentials = true;
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
service.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
service.defaults.validateStatus = function (status) {
  return true;
};

service.defaults.transformRequest = [function (data) {
  //数据序列化
  return qs.stringify(data);
}];

service.interceptors.request.use((config) => {
  return config;
},error => {
  console.log(error);
  Promise.reject(error)
});
service.interceptors.response.use(
  response => {
    console.info("%c%s","color:#5B9EE3;background:white;border-radius:10px"," net::res => " +response.config.url,response);
    return response
  },
  error => {
    console.info("%c%s","color:red;background:white"," net::res =>  "+error);
    Message({
      message: error.message,
      type: 'error',
      duration: 1.5 * 1000
    });
    return Promise.reject(error)
  });

export default service

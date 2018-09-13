import Vue from 'vue';
import App from './App';
import 'babel-polyfill';
import router from './router/router';
import store from './store';
import request from './assets/mUtils/request'
// import 'element-ui/lib/theme-ihmp/index.css';
import ElementUI from 'element-ui';
import './router/limit'
import i18n from './assets/lang'//国际化配置
import './assets/icons' // 引入 svg 图标
import * as filters from './filters'
Vue.use(ElementUI, {
  size: 'medium'
});
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
Vue.config.productionTip = false;
if (process.env.NODE_ENV === 'development') {
  //import('./mock/mock.js')
  //require('./mock/mock.js');
}
Vue.use(require('vue-wechat-title'));
Vue.prototype.request = request;
// 封装element massage
Vue.prototype.$elementMessage = function (msg, type) {
  this.$message({
    message: msg,
    type: type,
    showClose: true
  })
};
// 封装表单验证重置
Vue.prototype.$resetFormValid = function (formName) {
  if (this.$refs[formName] !== undefined){
    this.$refs[formName].resetFields();
  }
};
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App},
});

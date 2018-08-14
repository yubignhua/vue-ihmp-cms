import Vue from 'vue';
import App from './App';
import 'babel-polyfill';
import router from './router/router';
import store from './store';
import request from './assets/mUtils/request'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import './limit'
//import './errorLog'// error log
//import './assets/style/mixin.scss' //(不能直接应用 scss ???)
import i18n from './lang' // Internationalization
import './icons' // icon
import * as filters from './filters'
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

// register global utility filters.
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

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
});

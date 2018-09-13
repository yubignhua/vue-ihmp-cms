/**
 * Created by yubh on 2018/4/9.
 */
import router from '../router';
import store from '../../store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';

// import {getToken} from './assets/mUtils/auth';

NProgress.configure({ showSpinner: false });


// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true;
//   if (!permissionRoles) return true;
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

const whiteList = ['/crm/v_ihmp/login', '/crm/v_ihmp/401', '/crm/v_ihmp/404'];

// let routeList = [];
/**
 * 路由登录 角色 权限控制
 */
const beforeEach = function (to, from, next) {
  NProgress.start();
  store.commit('updateLoadingStatus', { isLoading: true });
  store.commit('SET_FULLPATH', to.path);
  
  if (whiteList.indexOf(to.path) !== -1) {
    console.warn('权限 ==> 直接跳转登录页面不需要 role 权限');
    next();
  } else {
    if (store.getters.roles.length === 0) {//未获得 role 未登录
      console.warn('权限 ==> 未缓存role 进行登录验证');
      //请求获取 role
      store.dispatch('getRole').then(res => {
        console.log("role 权限", res);
        if (res.error_code === 0) {//获取 role 成功(表名已经登录) 直接跳转相应页面
          console.warn('权限 ==> 登录验证通过直接跳转');
          const roles = res.role;
          //console.log('====',roles);
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            //console.log('***************',store.getters.addRouters);
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            if (to.matched.length === 0) {//如果未匹配到路由
              //如果上级也未匹配到路由则跳转404页面，如果上级能匹配到则转上级路由
              next('/crm/v_ihmp/404');
            } else {
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            }
          })
        } else {
          console.warn('权限 ==> 登录验证未通过 跳转登录页面重新登路');
          next('/crm/v_ihmp/login')
        }
      }).catch((err) => {
        console.warn('权限 ==> 网络错误 跳转登录页面', err);
        Message.error('网络错误请重新再试');
        next('/crm/v_ihmp/login')
      });
    } else {//已经获取 role 已经登录
      console.warn('权限 ==> 登录验证通过 直接跳转页面');
      var roles = store.getters.roles;
      // 未授权用户无权限访问页面
      if (roles.indexOf('unauthorized') !== -1) {
        next('/crm/v_ihmp/401');
      } else if (to.matched.length === 0) {//如果未匹配到路由
        //如果上级也未匹配到路由则跳转404页面，如果上级能匹配到则转上级路由
        from.name ? next({ name: from.name }) : next('/crm/v_ihmp/404');
      } else {
        next(); //如果匹配到正确跳转
      }
    }
  }
}

export default {
  beforeEach: beforeEach,
  afterEach: function () {
    store.commit('updateLoadingStatus', { isLoading: false });
    NProgress.done();
  }
};

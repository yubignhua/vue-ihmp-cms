/**
 * Created by yubh on 2018/3/10.
 */
import Vue from 'vue';
import Router from 'vue-router';
import routerIhmp from './router_ihmp';
import routerDm from './router_ds';
 
export const constantRouterMap = routerIhmp.slice();
constantRouterMap.push(...routerDm);

//
// export const constantRouterMap = [
//   ...routerIhmp,
//   ...routerDm
// ];



//动态权限页面
export const asyncRouterMap = [];

// 实例化路由对象
Vue.use(Router);
const router = new Router({
  routes: constantRouterMap,
  mode: 'history',
  base: '/chunyu_admin/',  // crm/v_ihmp/
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { return savedPosition; }
    return {x: 0, y: 0};
  }
});
export default router

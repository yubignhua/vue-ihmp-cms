/**
 * Created by yubh on 2018/3/10.
 */
import Vue from 'vue';
import Router from 'vue-router';

// 引入内嵌页面
// import LayOut from '../pages/layout/layout';
import Login from '../pages/login/login';
import AppContainer from '../pages/app_container/app_container';

// 引入懒加载页面
const NoFindPage = r => require.ensure([], () => r(require('../pages/errorPage/404')), '404');
const NoMatchPage = r => require.ensure([], () => r(require('../pages/errorPage/401')), '401');

// 配置页面路由
const routes = [
  { path: '/cdm', redirect: 'cdm/cdm_cms/layout/login' },
  // { path: '/cdm/cdm_cms', redirect: 'cdm/cdm_cms/layout/base_info' },
  { path: '/cdm/cdm_cms',
    component:AppContainer,
    children:[
      { path: 'login',name:'登录', component: Login },
      //404页
      { path: '404', component: NoFindPage, hidden: true},
      { path: '401', component: NoMatchPage, hidden: true},
      // { path: 'cat', component: cat, hidden: true},
      //布局页
      // { path: 'layout',component: LayOut},
    ],
  },
];
// 实例化路由对象
Vue.use(Router);
// export default new Router({ mode: 'history', routes });
const router =  new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});



export default router

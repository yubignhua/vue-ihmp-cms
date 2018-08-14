/**
 * Created by yubh on 2018/3/10.
 */
import Vue from 'vue';
import Router from 'vue-router';

// 引入内嵌页面
import Login2 from '../pages/ihmp/login/index';
import AppContainer from '../pages/ihmp/app_container/app_container';
import Layout from '../pages/ihmp/layout/layout';
import Cat from '../pages/ihmp/cat/cat.vue';

// 引入懒加载页面
const NoFindPage = r => require.ensure([], () => r(require('../pages/ihmp/errorPage/404')), '404');
const NoMatchPage = r => require.ensure([], () => r(require('../pages/ihmp/errorPage/401')), '401');
const HealthManage = r => require.ensure([], () => r(require('../pages/ihmp/health_manage/health_manage')), 'health_manage');
const inServerUser = r => require.ensure([], () => r(require('../pages/ihmp/in_server_user/in_server_user')), 'in_server_user');
const taskList = r => require.ensure([], () => r(require('../pages/ihmp/task_list')), 'task_list');
const OperationFlow = r => require.ensure([], () => r(require('../pages/ihmp/operationflow')), 'operationflow');

// 配置页面路由
export const constantRouterMap = [
  //公用页面
  { path: '/404', component: NoFindPage, hidden: true,meta: { title: '404',icon : 'documentation' }},
  { path: '/401', component: NoMatchPage, hidden: true,meta: { title: '401',icon : 'documentation' }},
  { path: '/ihmp',component:AppContainer,redirect: '404',hidden: true,
    meta:{title:"",icon: 'example'},
    children:[
      { path: 'login',name:'login',hidden: true, component: Login2,meta:{title: '登录页面'} },
    ],
  },
  
  // task_manage
  { path: '/ihmp/task_manage',
    component:Layout,
    redirect: '404',
    meta:{title:"任务管理",icon: 'example'},
    children:[
      { path: 'in_server_user',name:'in_server_user',hidden: true, component: inServerUser,meta:{title : '服务中',icon : 'example',roles : ['assistant']} },
      { path: 'task_list',name:'task_list',hidden: true, component: taskList,meta:{title : '任务列表',icon : 'example',roles : ['assistant']} },
      { path: 'operationflow',name:'operationflow',hidden: true, component: OperationFlow,meta:{title : '业务流程',icon : 'example',roles : ['assistant']} },

    ],
  },
  //layouts
  { path: '/ihmp/layouts',
    component:Layout,
    redirect: '404',
    meta:{title:"CRM",icon: 'documentation'},
    children:[
      {path : 'cat',name:'cats',component :Cat,meta : {title : 'cat',icon : 'documentation',roles : ['assistant']}},
      { path: 'health_manage',name:'health_manages', component: HealthManage,meta:{title : '健康管理',icon : 'documentation',roles : ['assistant']} },
    
    ],
  },

];
// 实例化路由对象
Vue.use(Router);
// export default new Router({ mode: 'history', routes });
const router =  new Router({
  routes:constantRouterMap,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
export default router

//动态权限页面
export const asyncRouterMap = [
  { path: '/ihmp/layout',
    component:Layout,
    redirect: '404',
    meta:{title:"CRM",icon:'component'},
    children:[
      {path : 'cat4',name:'cat4',component :Cat,meta : {title : 'cat4',icon : 'component',roles : ['assistant']}},
      { path: 'health_manage',name:'health_manage1', component: HealthManage,meta:{title : 'haha',icon : 'component',roles : ['assistant']} },
    
    ],
  },
]


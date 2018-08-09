/**
 * Created by yubh on 2018/3/10.
 */
import Vue from 'vue';
import Router from 'vue-router';

// 引入内嵌页面
import Login from '../pages/login/login';
import Login2 from '../pages/login/index';
import AppContainer from '../pages/app_container/app_container';
import Layout from '../pages/layout/layout';
import Cat from '../pages/cat/cat.vue';

// 引入懒加载页面
const NoFindPage = r => require.ensure([], () => r(require('../pages/errorPage/404')), '404');
const NoMatchPage = r => require.ensure([], () => r(require('../pages/errorPage/401')), '401');
const HealthManage = r => require.ensure([], () => r(require('../pages/health_manage/health_manage.vue')), 'health_manage');
const inServerUser = r => require.ensure([], () => r(require('../pages/in_server_user/in_server_user.vue')), 'in_server_user');

// 配置页面路由
export const constantRouterMap = [
  //公用页面
  { path: '/404', component: NoFindPage, hidden: true,meta: { title: 'tinymce',icon : 'documentation' }},
  { path: '/401', component: NoMatchPage, hidden: true,meta: { title: 'tinymce',icon : 'documentation' }},
  { path: '/login2',name:'login2', component: Login2,meta:{title: '登录页面',icon : 'documentation' } },
  { path: '/ihmp',component:AppContainer,redirect: '404',hidden: true,
    meta:{title:"",icon: 'example'},
    children:[
      { path: 'login',name:'login',hidden: true, component: Login,meta:{title: '登录页面',icon : 'example' } },
    ],
  },
  // 权限页面
  { path: '/ihmp/cms',
    component:Layout,
    redirect: '404',
    meta:{title:"任务管理",icon: 'example'},
    children:[
      {path : 'cat3',name:'cat3',component :Cat,meta : {title : 'cat',icon : 'documentation',roles : ['assistant']}},
      { path: 'health_manage',name:'health_manage', component: HealthManage,meta:{title : '健康管理',icon : 'example',roles : ['assistant']} },
      { path: 'in_server_user',name:'in_server_user', component: inServerUser,meta:{title : '服务中',icon : 'example',roles : ['assistant']} },

    ],
  },
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

/*

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  
  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },
  
  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },
  
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },
  
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'tree-table', component: _import('example/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
          { path: 'custom-tree-table', component: _import('example/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },
  
  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
      { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
    ]
  },
  
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },
  
  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },
  
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },
  
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  },
  
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  },
  
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  },
  
  {
    path: '/i18n',
    component: Layout,
    children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  },
  
  { path: '*', redirect: '/404', hidden: true }
]
*/


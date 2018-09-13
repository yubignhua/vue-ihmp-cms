/**
 * Created by yubh on 2018/3/10.
 */

// 引入内嵌页面
import Login from '../pages/ihmp/login/index';
import Layout from '../pages/ihmp/layout/Layout';

// 引入懒加载页面
const NoFindPage = r => require.ensure([], () => r(require('../pages/common_page/error_page/404')), '404');
const NoMatchPage = r => require.ensure([],() => r(require('../pages/common_page/error_page/401')), '401');
const MenuList = r => require.ensure([], () => r(require('../pages/ihmp/menu/menu_list')), 'menu_list');
const OperationFlow = r => require.ensure([], () => r(require('../pages/ihmp/operationflow')), 'operationflow');
const SvgIcon = r => require.ensure([], () => r(require('../pages/common_page/svg_icons')), 'svg');
const MenuContainer = r => require.ensure([], () => r(require('../pages/ihmp/menu/menu_container')), 'menu_container');

// 任务管理
const TaskList = r => require.ensure([], () => r(require('../pages/ihmp/task/task_list')), 'task_list');

// 用户信息 - 基本信息
const UserInfo = r => require.ensure([], () => r(require('../pages/ihmp/user_info/user_info')), 'user_info');
// 用户信息 - 基本信息 - 家庭档案
const EhrList = r => require.ensure([], () => r(require('../pages/ihmp/ehr/ehr_list')), 'ehr_list');
// 用户信息 - 行为信息
const UserAction = r => require.ensure([], () => r(require('../pages/ihmp/user_action/user_action')), 'user_action');
// 用户信息 - 行为信息 -QA
const UserActionQA = r => require.ensure([], () => r(require('../pages/ihmp/user_action_qa/user_action_qa')), 'user_action_qa');
// 用户信息 - 服务信息
const UserService = r => require.ensure([], () => r(require('../pages/ihmp/user_service/user_service')), 'user_service');

// 营销配置 - 营销活动配置
const MarketActivity = r => require.ensure([], () => r(require('../pages/ihmp/market/market_activity')), 'market_activity');
// 用户信息 - 服务信息
const MarketTools = r => require.ensure([], () => r(require('../pages/ihmp/market/market_tools')), 'market_tools');

// 其他配置 - 人员管理
const StaffList = r => require.ensure([], () => r(require('../pages/ihmp/staff/staff_list')), 'staff_list');
// 其他配置 - 权限分组
const GroupList = r => require.ensure([], () => r(require('../pages/ihmp/group/group_list')), 'group_list');
// 其他配置 - 顾问管理
const ConsultantList = r => require.ensure([], () => r(require('../pages/ihmp/consultant/consultant_list')), 'consultant_list');

// 配置页面路由
const routerIhmp = [
  //公用页面
  {path: '/crm/v_ihmp/404', name: '404', component: NoFindPage, hidden: true, meta: {title: '404', icon: 'documentation'}},
  {path: '/crm/v_ihmp/401', name: '401', component: NoMatchPage, hidden: true, meta: {title: '401', icon: 'documentation'}},
  {path: '/crm/v_ihmp/login', name: 'login', hidden: true, component: Login, meta: {title: '登录页面'}},
  //查看图标
  {path: '/crm/v_ihmp/svg_icon', name: 'SvgIcon', hidden: true, component: SvgIcon, meta: {title: 'SvgIcon'}},
  {
    path: '/crm/v_ihmp/main',
    name: 'main',
    component: Layout,
    redirect: '/crm/v_ihmp/main/menu_list',
    hidden: true,
    children: [
      {
        path: 'operationFlow',
        name: 'operationFlow',
        hidden: true,
        component: OperationFlow,
        meta: {title: '工作流程'}
      },
      // 首页菜单
      {path: 'menu_list', name: 'menu_list', hidden: true, component: MenuList, meta: {title: '菜单'}},
    ]
  },
  // 任务管理
  {
    path: '/crm/v_ihmp/task',
    name: 'task',
    component: Layout,
    redirect: '/crm/v_ihmp/task/task_list',
    meta: {title: "任务管理", icon: 'form'},
    children: [
      {
        path: 'task_list',
        name: 'task_list',
        hidden: false,
        component: TaskList,
        meta: {title: '任务列表', icon: 'documentation', roles: ['admin'], noCache: true}
      }
    ],
  },
  // crm
  {
    path: '/crm/v_ihmp/crm',
    name: 'crm',
    redirect: '/crm/v_ihmp/user/info',
    component: Layout,
    meta: {title: 'CRM', icon: 'component'},
    children: [
      {
        path: '/crm/v_ihmp/user',
        name: 'user',
        component: MenuContainer,
        redirect: '/crm/v_ihmp/user/info',
        meta: {title: '用户管理', icon: 'peoples'},
        children: [
          {
            path: 'info',
            name: 'info',
            hidden: false,
            component: UserInfo,
            meta: {title: '基本信息', roles: ['admin'], noCache: true}
          },
          {
            path: 'ehr/:userId',
            name: 'ehr',
            hidden: true,
            component: EhrList,
            meta: {title: '家庭健康档案', roles: ['admin'], noCache: true}
          },
          {
            path: 'action',
            name: 'action',
            hidden: false,
            component: UserAction,
            meta: {title: '行为信息', roles: ['admin'], noCache: true}
          },
          {
            path: 'action_qa',
            name: 'action_qa',
            hidden: true,
            component: UserActionQA,
            meta: {title: 'QA详情', roles: ['admin'], noCache: true}
          },
          {
            path: 'service',
            name: 'service',
            hidden: false,
            component: UserService,
            meta: {title: '服务信息', roles: ['admin'], noCache: true}
          }
        ],
      },
      {
        path: '/crm/v_ihmp/market',
        name: 'market',
        component: MenuContainer,
        redirect: '/crm/v_ihmp/market/activity',
        meta: {title: "营销配置", icon: 'example'},
        children: [
          {
            path: 'activity',
            name: 'activity',
            hidden: false,
            component: MarketActivity,
            meta: {title: '营销活动配置', roles: ['admin'], noCache: true}
          },
          {
            path: 'tools',
            name: 'tools',
            hidden: false,
            component: MarketTools,
            meta: {title: '营销工具', roles: ['admin'], noCache: true}
          }
        ]
      },
      {
        path: '/crm/v_ihmp/other',
        name: 'other',
        component: MenuContainer,
        redirect: '/crm/v_ihmp/other/staff',
        meta: {title: "其他配置", icon: 'other'},
        children: [
          {
            path: 'staff',
            name: 'staff',
            hidden: false,
            component: StaffList,
            meta: {title: '人员管理', roles: ['admin'], noCache: true}
          },
          {
            path: 'group',
            name: 'group',
            hidden: false,
            component: GroupList,
            meta: {title: '权限分组', roles: ['admin'], noCache: true}
          },
          {
            path: 'consultant',
            name: 'consultant',
            hidden: false,
            component: ConsultantList,
            meta: {title: '顾问管理', roles: ['admin'], noCache: true}
          }
        ]
      }
    ],
  }
];

//动态权限页面
export const asyncRouterMap = [];


export default routerIhmp;

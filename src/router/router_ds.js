// 医生任务系统router

import Layout from '../pages/doctor_mission/components/Layout';

const MissionList = r => require.ensure([], () => r(require('../pages/doctor_mission/MissionList')), 'mission_list');
const PermissionList = r => require.ensure([], () => r(require('../pages/doctor_mission/permission/PermissionList')), 'permission_list');
const PermissionDetail = r => require.ensure([], () => r(require('../pages/doctor_mission/permission/PermissionDetail')), 'permission_review');
const RewardList = r => require.ensure([], () => r(require('../pages/doctor_mission/reward/RewardList')), 'reward_list');
const RewardCreate = r => require.ensure([], () => r(require('../pages/doctor_mission/reward/RewardCreate')), 'reward_create');
const RewardDetail = r => require.ensure([], () => r(require('../pages/doctor_mission/reward/RewardDetail')), 'reward_detail');
const OAmaintenance = r => require.ensure([], () => r(require('../pages/doctor_mission/oa_manage/oa_maintenance')), 'oa_maintenance');

const routerDm = [
	{
		path: '/crm/v_doctor/doctor_mission/mission/',
		component: Layout,
    meta: { title: "春雨管理系统", icon: 'form' },
    children: [
      {
        path: 'mission_list',
        name: 'mission_list',
        hidden: false,
        component: MissionList,
        meta: { title: '医生任务系统', icon: 'documentation', noCache: true }
      }
    ]
	},
	{
		path: '/crm/v_doctor/doctor_mission/permission_configure/',
		component: Layout,
    meta: { title: "权限配置后台", icon: 'form' },
    children: [
      {
        path: 'permission_list',
        name: 'permission_list',
        hidden: false,
        component: PermissionList,
        meta: { title: '权限配置列表', icon: 'documentation', noCache: true }
      },
      {
        path: 'permission_detail',
        name: 'permission_detail',
        hidden: false,
        component: PermissionDetail,
        meta: { title: '权限配置详情', icon: 'documentation', noCache: true }
      },
      {
        path: 'oa_maintenance',
        name: 'oa_maintenance',
        hidden: false,
        component: OAmaintenance,
        meta: { title: 'OA项目管理', icon: 'documentation', noCache: true }
      }
    ]
	},
  {
    path: '/crm/v_doctor/doctor_mission/reward_configure/',
    component: Layout,
    meta: { title: "奖励发放后台", icon: 'form' },
    children: [
      {
        path: 'reward_list',
        name: 'reward_list',
        hidden: false,
        component: RewardList,
        meta: { title: '奖励发放列表', icon: 'documentation', noCache: true }
      },
      {
        path: 'reward_create',
        name: 'reward_create',
        hidden: false,
        component: RewardCreate,
        meta: { title: '新建奖励发放', icon: 'documentation', noCache: true }
      },
      {
        path: 'reward_detail',
        name: 'reward_detail',
        hidden: false,
        component: RewardDetail,
        meta: { title: '奖励发放详情', icon: 'documentation', noCache: true }
      }
    ]
  }
]

export default routerDm;

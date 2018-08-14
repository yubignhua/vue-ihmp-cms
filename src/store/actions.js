/**
 * 放置全局 action
 */
import { asyncRouterMap } from '@/router/router.js';

import request from '../assets/mUtils/request'
//登录
const LOGIN = '/chunyu_admin/accounts/do_login/';
//登出
const LOGINOUT ='/cdm/accounts/logout/';
//获取医生列表
const GETDOCLIST = '/cdm/doctor/check_list/';
//获取医助列表
const GETASSISMENTLIST = '/cdm/assistant/check_list/';
//获取角色
const GETROLE = '/cdm/accounts/role/';
//
const HELLO = '/cdm/hello/';

//import {setToken, removeToken } from '../assets/mUtils/auth'
import {clone} from '../assets/mUtils/utils';

export default {
  /**
   * 登录获取用户基本信息
   * @param commit
   * @param userInfo
   */
  async getUerInfo({commit},userInfo){
    let account = userInfo.account.trim();
    let password = userInfo.password.trim();
    const loginData = await request.post(LOGIN,{username:account,password:password});
    loginData.data.role && commit("SET_ROLE",loginData.data.role);
    loginData.data.user_name && commit("SET_NAME",loginData.data.user_name);
    //loginData.data.token && commit("SET_TOKEN",loginData.data.token);
    //setToken(loginData.data.token);
    return loginData.data;
  },
  /**
   * 登出
   * @param commit
   */
  async loginOut({commit}){
    const loginState = await request.get(LOGINOUT);
     if(loginState){
      commit('SET_NAME', '');
      commit('CLEAR_ROLE');
      commit('SET_TOKEN', '');
     };
     return loginState.data
  },
  
  /**
   * 获取用户角色 如果有则表示已经登录 如果没有则表示未登录
   */
  async getRole({commit}){
    const res = await request.get(GETROLE);
    res.data.role && commit('SET_ROLE',res.data.role);
    res.data.user_name && commit('SET_NAME',res.data.user_name);
    return res.data
  },
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { roles } = data;
      let accessedRouters;
      if (roles.indexOf('admin') >= 0) {
        accessedRouters = asyncRouterMap
      } else {
        console.log('role----',roles);
        accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
      }
      console.log('accessedRouters----',accessedRouters);
      commit('SET_ROUTERS', clone(accessedRouters));
      resolve()
    })
  },
  //更改侧边栏状态
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  
};



/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    console.log('roles:::', roles);
    console.log('route.meta.roles:::', route.meta.roles);
    console.log('***',roles.some(role => route.meta.roles.indexOf(role) >= 0));
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
        //console.log('==123==',filterAsyncRouter(route.children, roles))
      }
      return true
    }
    return false
  });
  //console.log('accessedRouters:::',accessedRouters)
  return accessedRouters
}

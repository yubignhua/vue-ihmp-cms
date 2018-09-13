// 放置全局mutations
//import {constantRouterMap } from '@/router/router'
import routerIhmp from '../router/router_ihmp';
import Cookies from 'js-cookie';
import {clone} from '../assets/mUtils/utils';

export default {
  ["SET_TOKEN"](state,token){
    state.$userInfo.token = token;
  },
  ["SET_ROLE"](state,roles){
    state.$userInfo.roles = [...roles];
  },
  ["CLEAR_ROLE"](state){
    state.$userInfo.roles = [];
  },
  ["SET_NAME"](state,name){
    state.$userInfo.name = name;
  },
  ["SET_USER_ID"](state,userId){
    state.$userInfo.userId = userId;
  },
  ["SET_AVATAR"](state,avatar){
    state.$userInfo.avatar = avatar;
  },
  ["SET_FULLPATH"](state,path){
    state.$fullpath = path;
  },

  ['SET_CUR_PATINET_INFO'](state,map){
    state.$curPatientInfo = map
  },
  ['SET_ROUTERS']: (state, routers) => {
    const newRouters = clone(routerIhmp.concat(routers));
    state.addRouters = clone(routers);
    //state.permission_routers = constantRouterMap.concat(routers)
    state.permission_routers = newRouters
  },
  ['TOGGLE_SIDEBAR']: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1);
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  ['SET_LANGUAGE']: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  }


};


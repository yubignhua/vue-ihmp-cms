/**
 * Created by yubh on 2018/3/10.
 */
import {constantRouterMap } from '@/router/router.js'
import { getToken} from '../assets/mUtils/auth'
import Cookies from 'js-cookie'
import {clone} from '../assets/mUtils/utils';

export default {
  //全局存储用户基本信息
  $userInfo:{
    name: '',//名称
    account:'',//账号
    avatar: '',//头像
    roles:[],//权限
    status: '',//状态
    token: getToken() || '',
    introduction: '',
  },
  permission_routers:clone(constantRouterMap),//权限路由
  addRouters: [],
  sidebar: {
    opened: !+Cookies.get('sidebarStatus')
  },
  
 
  
  
  
};

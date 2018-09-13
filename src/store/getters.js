/**
 * Created by yubh on 2018/3/10.
 */
export default{
  //用户头像
  avatar: state => state.$userInfo.avatar,
  //用户名称
  name: state => state.$userInfo.name,
  //用户id
  userId: state => state.$userInfo.userId,
  //角色
  roles: state => state.$userInfo.roles,
  //路径
  fullPath: state => state.$fullpath,
  //token
  token: state => state.$userInfo.token,

  language: state => state.language,
  sidebar: state => state.sidebar,
  permission_routers: state => state.permission_routers,
  addRouters: state => state.addRouters,


}

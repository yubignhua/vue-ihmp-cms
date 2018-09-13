/**
 * Created by yubh on 2018/9/10.
 */
/**
 * Created by yubh on 2018/4/9.
 */
import request from '../../../assets/mUtils/request'

export default {
  namespaced: true,
  state: {
    //用户信息列表
    userInfoList:[
    ],
    //总页数
    allPageNum:0,
    //当前页
    curPage:1,
    //查询信息
    searchInfo:{
      count:20,
      page:'1',
    }
  },
  mutations: {
    ['SAVE_HOME_DATA'](state, list) {
      state.userInfoList = list;
    },
    ['SAVE_ALL_PAGE_NUM'](state,allPage){
      state.allPageNum = allPage;
    },
    ["CHANGE_PAGE"](state,curPage){
      state.curPage = curPage
    },
    
    ['SET_SEARCH_PAGE'](state,curPage){
      state.searchInfo.page = curPage;
    }
  },
  
  
  actions: {
    /**
     * 查询用户数据
     * @param commit
     * @param name
     * @param phone
     */
    async searchBaseInfo({commit,state},data){
      commit('SET_SEARCH_PAGE',data.curPage);
      console.log(data)
      const searchInfo = await request.get('/cy_task/oa_project/oa_list/',{params:state.searchInfo});
      searchInfo.data.total_num && commit('SAVE_ALL_PAGE_NUM',searchInfo.data.total_num);
      searchInfo.data.oa_list && commit('SAVE_HOME_DATA', searchInfo.data.oa_list);
      return searchInfo.data
    }
  },
  
  //getter
  getters: {},
  
  
};

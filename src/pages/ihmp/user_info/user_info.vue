<template>
  <div class="user_info">
    <page-content-layout>
      <div slot="right_action" class="quick_search">
        <el-button type="text" icon="el-icon-search" @click="showSearch">高级检索</el-button>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="showCreateForm">新增</el-button>
        <quick-search :quickSearchRequest="quickSearchRequest" :quickSearch="quickSearch"
                      @qsRequest="subQuickSearch"></quick-search>
      </div>
      <div slot="content_body">

        <!--统计信息-->
        <el-row class="stats_info" :gutter="100" v-if="showStatsData">
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="stats_value">{{statsData.service.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')}}</div>
              <div class="stats_text">咨询总数</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="stats_value">{{statsData.user.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')}}</div>
              <div class="stats_text">注册用户数</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="stats_value">{{statsData.served_user.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')}}</div>
              <div class="stats_text">已服务用户数</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover">
              <div class="stats_value">{{statsData.family.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')}}</div>
              <div class="stats_text">家庭总数</div>
            </el-card>
          </el-col>
          <!--<el-col :span="4" :offset="1">-->
          <!--<el-card shadow="hover">-->
          <!--<div class="stats_value">{{statsData.paid_user.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',')}}</div>-->
          <!--<div class="stats_text">已付费用户数</div>-->
          <!--</el-card>-->
          <!--</el-col>-->
        </el-row>

        <!--用户列表-->
        <el-table :data="userInfoList" height="90vh" class="user_info_table" size="small">
          <el-table-column prop="user_id" label="用户UID" :render-header="labelHead" header-align="center" align="center"
                           fixed></el-table-column>
          <el-table-column prop="vip_no" label="会员编号" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="wx_no" label="微信号" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="wx_alias" label="微信昵称" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column label="用户Tag" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{vipTagList.find(tag=>tag.value===scope.row.vip_tag).verbose}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="consultant_name" label="所属顾问" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="groups" label="所在群" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column label="入群时间" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.enter_group_time.substring(0,10)}}</span>
              <br/>
              <span>{{scope.row.enter_group_time.substring(11)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会员开始时间" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.vip_start_time.substring(0,10)}}</span>
              <br/>
              <span>{{scope.row.vip_start_time.substring(11)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会员失效时间" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.vip_end_time.substring(0,10)}}</span>
              <br/>
              <span>{{scope.row.vip_end_time.substring(11)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="家庭档案数" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="goEhr(scope.row.user_id)">{{scope.row.ehr_count}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="行为信息数" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="goAction(scope.row.user_id)">{{scope.row.action_count}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="服务记录数" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="goService(scope.row.user_id)">{{scope.row.service_count}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" :render-header="labelHead" header-align="center" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" type="primary" @click="editUser(scope.row)" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <pagination :pageInfo="pageInfo" @pageChange="searchWidthPage"></pagination>

        <!--编辑用户-->
        <el-dialog title="编辑用户" :visible.sync="showEditUser" class="edit_user_dialog">
          <el-form :model="userDetail" ref="userDetailForm" label-width="120px">
            <el-form-item label="微信号" prop="wx_no">
              <span>{{userDetail.wx_no}}</span>
            </el-form-item>
            <el-form-item label="微信昵称" prop="wx_alias">
              <span>{{userDetail.wx_alias}}</span>
            </el-form-item>
            <el-form-item label="所在群" prop="groups">
              <span>{{userDetail.groups}}</span>
            </el-form-item>
            <el-form-item label="所属顾问" prop="consultant_user_id">
              <el-select v-model="userDetail.consultant_user_id" filterable placeholder="请选择顾问">
                <el-option v-for="consultant in consultantList" :key="consultant.value" :label="consultant.verbose"
                           :value="consultant.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会员编号" prop="vip_no">
              <span>{{userDetail.vip_no}}</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateUserInfo">保 存</el-button>
            <el-button @click="showEditUser = false">取 消</el-button>
          </div>
        </el-dialog>

        <!--创建用户-->
        <el-dialog title="创建用户" :visible.sync="showCreateUser" class="create_user_dialog">
          <!--用户唯一性校验-->
          <el-form :model="checkUser" ref="checkUserForm" :rules="checkUserRule">
            <el-col :md="14">
              <el-form-item prop="search" label="校验唯一性" label-width="100px">
                <el-input v-model="checkUser.search" size="mini" @keyup.enter.native="submitCheckUser" clearable>
                  <el-select v-model="checkUser.search_type" slot="prepend" placeholder="请选择" class="cq_select">
                    <el-option v-for="cqType in checkUserRequest" :key="cqType.value" :label="cqType.verbose"
                               :value="cqType.value"></el-option>
                  </el-select>
                  <el-button v-if="showSubmitCheckUser" slot="append" size="mini" @click="submitCheckUser">确定
                  </el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :md="10">
              <el-form-item label-width="10px">
                <span v-if="checkUserTip.length">{{checkUserTip}}</span>
              </el-form-item>
            </el-col>
          </el-form>
          <!--编辑用户信息-->
          <el-form :model="checkUserResult" ref="createUserForm" label-width="100px" v-if="showCreateUserForm">
            <el-col :md="12">
              <el-form-item prop="wx_no" label="微信号">
                <el-input v-model="checkUserResult.wx_no" :disabled="!checkUserResult.isEditWxNo" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item prop="consultant_user_id" label="顾问">
                <el-select v-model="checkUserResult.consultant_user_id" filterable placeholder="请选择顾问">
                  <el-option v-for="consultant in consultantList" :key="consultant.value" :label="consultant.verbose"
                             :value="consultant.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item prop="wx_alias" label="微信昵称">
                <el-input v-model="checkUserResult.wx_alias" :disabled="!checkUserResult.isEditWxAlias"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" v-if="!checkUserResult.created">
              <el-form-item label="会员编号">
                <span>{{checkUserResult.vip_no}}</span>
              </el-form-item>
            </el-col>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <div v-if="showCreateUserForm">
              <el-button type="primary" @click="subCreateForm">保 存</el-button>
              <el-button @click="showCreateUser = false">取 消</el-button>
            </div>
          </div>
        </el-dialog>

        <!--高级检索-->
        <el-dialog title="高级检索" :visible.sync="showSearchForm" class="search_dialog">
          <el-form :model="searchRequest" label-width="120px" size="mini">
            <el-row>
              <el-col :md="12" :sm="24">
                <el-form-item label="用户ID">
                  <el-input v-model="searchRequest.user_id" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="12" :sm="24">
                <el-form-item label="微信号">
                  <el-input v-model="searchRequest.wx_no" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="12" :sm="24">
                <el-form-item label="用户Tag">
                  <el-select v-model="searchRequest.vip_tag" placeholder="请选择用户Tag">
                    <el-option key="" label="全部" value=""></el-option>
                    <el-option v-for="tag in vipTagList" :key="tag.value" :label="tag.verbose"
                               :value="tag.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12" :sm="24">
                <el-form-item label="是否会员">
                  <el-select v-model="searchRequest.vip_type" placeholder="请选择是否是会员">
                    <el-option v-for="type in vipTypeList" :key="type.value" :label="type.verbose"
                               :value="type.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="12" :sm="24">
                <el-form-item label="所属顾问">
                  <el-select v-model="searchRequest.consultant_user_id" filterable placeholder="请选择顾问">
                    <el-option v-for="consultant in consultantList" :key="consultant.value" :label="consultant.verbose"
                               :value="consultant.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12" :sm="24">
                <el-form-item label="所属群">
                  <el-input v-model="searchRequest.group" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="12" :sm="24">
                <el-form-item label="服务记录数">
                  <el-select v-model="searchRequest.service_times_sort_type" filterable placeholder="请选择排序方式">
                    <el-option v-for="sort in serviceSortType" :key="sort.value" :label="sort.verbose"
                               :value="sort.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="24" :sm="24">
                <el-form-item label="会员失效日期">
                  <el-col :sm="11">
                    <el-date-picker type="datetime" placeholder="开始时间" v-model="searchRequest.vip_expire_start_date"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-col>
                  <el-col class="line" :sm="2">至</el-col>
                  <el-col :sm="11">
                    <el-date-picker type="datetime" placeholder="结束时间" v-model="searchRequest.vip_expire_end_date"
                                    value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="searchData">搜 索</el-button>
            <el-button @click="showSearchForm = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </page-content-layout>
  </div>
</template>

<script>
  import {getSearchType, getVipTag, getVipType, serviceSortType, getCheckUserType} from '../../../assets/mUtils/mData'
  import PageContentLayout from '../page_content_layout/page_content_layout'
  import QuickSearch from '../../../components/quick_search'
  import pagination from '../../../components/pagination'
  import {mapGetters} from 'vuex'

  const statsUrl = '/api/crm/stats/'; //统计信息
  const userUrl = '/api/crm/user/'; //用户信息列表
  const infoUrl = '/api/crm/filter_conf/';  //枚举值
  const updateUserUrl = '/api/crm/user/user_id/update/'; //更新用户信息
  const checkUserUrl = '/api/crm/user/check/'; //用户唯一性校验

  export default {
    name: 'user_info',
    components: {PageContentLayout, QuickSearch, pagination},
    data() {
      return {
        // 统计信息
        statsData: {
          user: 0,
          paid_user: 0,
          served_user: 0,
          service: 0,
          paid_service: 0,
          family: 0
        },

        // 快速检索条件
        quickSearchRequest: {
          search_type: 15, //快速搜索类型,默认微信昵称
          search: '', //快速搜索文本
        },

        // 高级检索
        searchRequest: {
          user_id: '', // 用户ID
          wx_no: '', // 微信号
          vip_tag: null, // 用户Tag
          vip_type: '', // 是否会员
          consultant_user_id: '', // 所属顾问
          group: '', // 所属群
          service_times_sort_type: 0, // 服务记录排序方式
          vip_expire_start_date: '', // 会员失效日期（开始）
          vip_expire_end_date: '' // 会员失效日期（结束）
        },

        // 当前搜索条件
        currentSearch: {},

        // 用户基本信息
        userInfoList: [],

        // 用户详情
        userDetail: {
          consultant_user_id: 0
        },

        // 用户唯一性校验
        checkUserRequest: [],
        checkUser: {
          search_type: 20, //默认微信号
          search: '',
          wx_no: ''
        },
        checkUserRule: {
          search_type: [{required: true, message: '请选择校验类型', trigger: 'change'}],
          search: [{required: true, message: '请输入校验内容', trigger: 'blur'}]
        },
        createUserInfo: {},
        checkUserResult: {
          created: null,
          wx_no: '',
          wx_alias: '',
          vip_no: '',
          consultant_user_id: null,
          user_id: null,
          isEditWxNo: false,
          isEditWxAlias: false
        },
        showSubmitCheckUser: true,
        checkUserTip: '',
        showCreateUserForm: false,

        // 用户tag
        vipTagList: [],

        // 是否会员
        vipTypeList: [],

        // 顾问信息
        consultantList: [],

        // 服务记录数排序方式
        serviceSortType: [],

        // 分页信息
        pageInfo: {
          num_pages: 1, //总页码数
          current_page: 1, //当前页码
          total_count: 0 //数据总条目数
        },

        showSearchForm: false,
        showCreateUser: false,
        showEditUser: false,
        quickSearch: [],
        showStatsData: false
      }
    },
    computed: {
      ...mapGetters(["roles"]),
    },
    created() {
      this.quickSearch = getSearchType;

      this.currentSearch.vip_type = 'vip';
      this.getUserInfoList(this.currentSearch);

      this.vipTagList = getVipTag;
      this.vipTypeList = getVipType;
      this.getConsultantList();
      this.serviceSortType = serviceSortType;
      this.checkUserRequest = getCheckUserType;
      if (this.roles[0] === 'admin') {
        this.showStatsData = true;
        this.getStatsData();
      } else {
        this.showStatsData = false;
      }
    },
    methods: {
      // 获取统计信息
      getStatsData() {
        let _this = this;
        _this.request.get(statsUrl).then((res) => {
          if (res.data.error_code === 0) {
            _this.statsData = res.data.stats;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 获取用户信息列表
      getUserInfoList(request) {
        let _this = this;
        _this.request.get(userUrl, {
          params: request
        }).then((res) => {
          if (res.data.error_code === 0) {
            _this.userInfoList = res.data.user_list;
            _this.pageInfo = res.data.page_info;
          } else {
            this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 新建用户
      showCreateForm() {
        this.$resetFormValid('checkUserForm');
        this.showCreateUser = true;
        this.showSubmitCheckUser = true;
        this.showCreateUserForm = false;
        this.checkUser.search = '';
        this.checkUser.wx_no = '';
        this.checkUserTip = '';
      },
      // 用户唯一性校验
      submitCheckUser() {
        let _this = this;
        _this.$refs['checkUserForm'].validate((valid, object) => {
          if (valid) {
            if (_this.checkUser.search_type === 20) {
              _this.checkUser.wx_no = _this.checkUser.search;
            }
            _this.request.post(checkUserUrl, _this.checkUser).then((res) => {
              if (res.data.error_code === 0) {
                _this.checkUserResult.user_id = res.data.data.user_id;
                _this.checkUserResult.created = res.data.data.created;
                _this.checkUserResult.wx_no = res.data.data.wx_no;
                _this.checkUserResult.wx_alias = res.data.data.wx_alias;
                _this.checkUserResult.vip_no = res.data.data.vip_no.length ? res.data.data.vip_no : '--';
                _this.checkUserResult.consultant_user_id = res.data.data.consultant_user_id > 0 ? res.data.data.consultant_user_id : '';

                if (res.data.data.wx_no.length) {
                  _this.checkUserResult.isEditWxNo = false;
                } else {
                  _this.checkUserResult.isEditWxNo = true;
                }
                if (res.data.data.wx_alias.length) {
                  _this.checkUserResult.isEditWxAlias = false;
                } else {
                  _this.checkUserResult.isEditWxAlias = true;
                }
                _this.showSubmitCheckUser = false;
                _this.showCreateUserForm = true;
                if (res.data.data.created) {
                  _this.checkUserTip = '请继续创建相关信息';
                } else {
                  _this.checkUserTip = '用户已存在，请更新该用户基本信息';
                }
              } else {
                _this.$elementMessage(res.data.error_msg, 'error');
              }
            })
          } else {
            console.log('error submit in check user:', object);
            return false;
          }
        });
      },
      // 创建用户时更新用户信息
      subCreateForm() {
        this.userDetail.user_id = this.checkUserResult.user_id;
        this.userDetail.wx_no = this.checkUserResult.wx_no;
        this.userDetail.wx_alias = this.checkUserResult.wx_alias;
        this.userDetail.consultant_user_id = this.checkUserResult.consultant_user_id;

        this.updateUserInfo('create');
      },
      // 编辑用户信息
      editUser(userInfo) {
        this.userDetail.user_id = userInfo.user_id;
        this.userDetail.wx_no = userInfo.wx_no;
        this.userDetail.wx_alias = userInfo.wx_alias ? userInfo.wx_alias : '--';
        this.userDetail.groups = userInfo.groups ? userInfo.groups : '--';
        this.userDetail.consultant_user_id = userInfo.consultant_user_id > 0 ? userInfo.consultant_user_id : '';
        this.userDetail.vip_no = userInfo.vip_no ? userInfo.vip_no : '--';
        this.showEditUser = true;
      },
      // 更新用户信息
      updateUserInfo(type) {
        let _this = this;
        let postUrl = updateUserUrl.replace('user_id', _this.userDetail.user_id);
        let postData = {};
        if (type === 'create') {
          postData.wx_no = _this.userDetail.wx_no;
          postData.consultant_user_id = _this.userDetail.consultant_user_id;
          postData.wx_alias = _this.userDetail.wx_alias;
        } else {
          postData.consultant_user_id = _this.userDetail.consultant_user_id;
        }
        _this.request.post(postUrl, postData).then((res) => {
          if (res.data.error_code === 0) {
            _this.$elementMessage('用户信息更新成功！', 'success');
            if (type === 'create') {
              _this.showCreateUser = false;
              _this.$router.push({
                path: `/crm/v_ihmp/user/ehr/${_this.userDetail.user_id}`
              });
            } else {
              _this.showEditUser = false;
              _this.getUserInfoList(_this.currentSearch);
            }
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 高级搜索
      showSearch() {
        this.resetSearchRequest();
        this.showSearchForm = true;
      },
      // 重置高级检索检索项
      resetSearchRequest() {
        this.searchRequest.user_id = '';
        this.searchRequest.wx_no = '';
        this.searchRequest.vip_tag = '';
        this.searchRequest.vip_type = '';
        this.searchRequest.consultant_user_id = '';
        this.searchRequest.group = '';
        this.searchRequest.service_times_sort_type = '';
        this.searchRequest.vip_expire_start_date = '';
        this.searchRequest.vip_expire_end_date = '';
      },
      searchData() {
        this.currentSearch = Object.assign({}, this.searchRequest);
        this.getUserInfoList(this.searchRequest);
        this.showSearchForm = false;
      },
      // 快速搜索
      subQuickSearch(qsParams) {
        let _this = this;
        _this.quickSearchRequest.search_type = qsParams.search_type;
        _this.quickSearchRequest.search = qsParams.search;

        _this.currentSearch = Object.assign({}, _this.quickSearchRequest);
        _this.getUserInfoList(_this.quickSearchRequest);
      },
      // 表头宽度计算
      labelHead(h, {column, $index}) {
        let labelSize = 16;
        column.minWidth = column.label.length * labelSize + 28;
        return h('div', {style: {padding: 0, width: '100%'}}, [column.label]);
      },
      // 分页改变时搜索
      searchWidthPage(page) {
        let _this = this;
        _this.currentSearch.page = page;
        _this.getUserInfoList(_this.currentSearch);
      },
      // 获得顾问信息
      getConsultantList() {
        let _this = this;
        _this.request.get(infoUrl, {
          params: {
            keys: 'consultant'
          }
        }).then((res) => {
          if (res.data.error_code === 0) {
            _this.consultantList = res.data.filter_list[0].enum_items;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 跳转家庭档案列表页
      goEhr(userId) {
        let targetEhr = this.$router.resolve({
          path: `/crm/v_ihmp/user/ehr/${userId}`
        });
        window.open(targetEhr.href, '_blank');
      },
      // 跳转行为信息页
      goAction(userId) {
        let targetAction = this.$router.resolve({
          path: '/crm/v_ihmp/user/action_qa',
          query: {
            user_id: userId
          }
        });
        window.open(targetAction.href, '_blank');
      },
      // 跳转服务列表页
      goService(userId) {
        let targetService = this.$router.resolve({
          path: '/crm/v_ihmp/user/service',
          query: {
            target_user_id: userId
          }
        });
        window.open(targetService.href, '_blank');
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .user_info {
    .page_content_body {
      padding-top: 30px !important;
    }
    .stats_info {
      margin-bottom: 30px;

      .el-card__body {
        text-align: center;
        .stats_value {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
    .user_info_table {
      width: 100%;
    }
    .el-input, .el-select {
      width: 100%;
    }
    .line {
      text-align: center;
    }
    .cq_select {
      width: 90px;
    }
  }
</style>

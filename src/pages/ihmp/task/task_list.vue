<template>
  <div class="task_list">
    <page-content-layout>
      <div slot="right_action" class="quick_search">
        <el-button type="text" icon="el-icon-search" @click="showSearch">高级检索</el-button>
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="showCreateForm">新增</el-button>
        <quick-search :quickSearchRequest="quickSearchRequest" :quickSearch="quickSearch"
                      @qsRequest="subQuickSearch"></quick-search>
      </div>
      <div slot="content_body">

        <!--任务列表-->
        <el-table :data="taskList" height="90vh" class="task_table" size="small">
          <el-table-column prop="id" label="任务编号" :render-header="labelHead" header-align="center" align="center"
                           fixed></el-table-column>
          <el-table-column label="创建时间" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.created_time.substring(0,10)}}</span>
              <br/>
              <span>{{scope.row.created_time.substring(11)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="task_type_verbose" label="任务类型" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="sponsor_user_name" label="需求发起人" :render-header="filterHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="target_user_info_text" label="用户信息" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="description" label="任务描述" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="conclusion" label="执行结论" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="service_provider_display_text" label="服务提供方" width="200" :render-header="labelHead"
                           header-align="center" align="center"></el-table-column>
          <el-table-column prop="price" label="服务价格" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="assigned_user_name" label="任务跟进人" :render-header="filterHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="status_verbose" label="任务状态" :render-header="filterHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column label="操作" :render-header="labelHead" header-align="center" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="scope.row.is_editable" icon="el-icon-edit" type="primary" @click="editTask(scope.row.id)"
                         size="mini"></el-button>
              <el-button v-else icon="el-icon-edit" type="primary" size="mini" disabled></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <pagination :pageInfo="pageInfo" @pageChange="searchWidthPage"></pagination>

        <!--创建任务-->
        <el-dialog title="创建任务" :visible.sync="showCreateTask" top="5vh" class="create-task-dialog">
          <el-form :model="createTaskData" :rules="createDetailRules" ref="createTaskForm" label-width="120px">
            <el-form-item label="任务类型" prop="task_type">
              <el-select v-model="createTaskData.task_type" placeholder="请选择任务类型">
                <el-option v-for="type in taskTypeList" :key="type.value" :label="type.verbose"
                           :value="type.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="需求发起人">
              <span>{{$store.getters.name}}</span>
            </el-form-item>
            <el-form-item label="服务用户" prop="target_user_id">
              <el-col :span="6">
                <el-select v-model="userSearchType" placeholder="请选择查询类型" class="user_select" @change="clearUserList">
                  <el-option v-for="type in taskUserType" :key="type.value" :label="type.verbose"
                             :value="type.value"></el-option>
                </el-select>
              </el-col>
              <el-col :span="18">
                <el-select v-model="createTaskData.target_user_id" filterable remote :remote-method="getUserList"
                           placeholder="请输入关键词" class="user_select">
                  <el-option v-for="user in userList" :key="user.value" :label="user.verbose"
                             :value="user.value"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="任务描述" prop="description">
              <el-input type="textarea" v-model="createTaskData.description" placeholder="请输入任务描述(300字以内)"></el-input>
            </el-form-item>
            <el-form-item label="任务跟进人" prop="assigned_user_id">
              <el-select v-model="createTaskData.assigned_user_id" placeholder="请选择任务跟进人">
                <el-option v-for="assigned in assignedList" :key="assigned.value" :label="assigned.verbose"
                           :value="assigned.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="createTask">保 存</el-button>
            <el-button @click="showCreateTask = false">取 消</el-button>
          </div>
        </el-dialog>

        <!--编辑任务-->
        <el-dialog title="编辑任务" :visible.sync="showEditTask" top="5vh" class="edit-task-dialog">
          <el-form :model="taskDetail" :rules="taskDetailRules" ref="taskDetailForm" label-width="120px">
            <el-form-item label="任务描述" prop="description">
              <el-input type="textarea" v-model="taskDetail.description" placeholder="请输入任务描述(300字以内)"></el-input>
            </el-form-item>
            <el-form-item label="执行结论" prop="conclusion">
              <el-input type="textarea" v-model="taskDetail.conclusion" placeholder="请输入执行结论(300字以内)"></el-input>
            </el-form-item>
            <el-form-item label="服务结论类型" prop="serivce_provider_type">
              <el-select v-model="taskDetail.service_provider_type" placeholder="请选择服务结论类型">
                <el-option v-for="provider in serviceProviderType" :key="provider.value" :label="provider.verbose"
                           :value="provider.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="taskDetail.service_provider_type===5?'医生ID':'文章标题'" prop="service_provider_value">
              <el-input v-model="taskDetail.service_provider_value" clearable></el-input>
            </el-form-item>
            <el-form-item label="服务价格" prop="price">
              <el-input v-model="taskDetail.price" clearable></el-input>
            </el-form-item>
            <el-form-item label="任务跟进人" prop="assigned_user_id">
              <el-select v-model="taskDetail.assigned_user_id" :placeholder="taskDetail.assigned_user_name">
                <el-option v-for="assigned in assignedList" :key="assigned.value" :label="assigned.verbose"
                           :value="assigned.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务状态" prop="status">
              <el-select v-model="taskDetail.status" placeholder="请选择任务状态">
                <el-option v-for="status in serviceStatus" :key="status.value" :label="status.verbose"
                           :value="status.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model="taskDetail.remark" placeholder="请输入备注(300字以内)"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="postTask">保 存</el-button>
            <el-button @click="showEditTask = false">取 消</el-button>
          </div>
        </el-dialog>

        <!--高级检索-->
        <el-dialog title="高级检索" :visible.sync="showSearchForm" class="search-dialog">
          <el-form :model="searchRequest" :rules="searchRequestRules" ref="searchRequestForm" label-width="120px"
                   size="mini">
            <el-col :md="24" :sm="24">
              <el-form-item label="创建时间">
                <el-col :sm="11">
                  <el-date-picker type="datetime" placeholder="开始时间" v-model="searchRequest.start_time"
                                  value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-col>
                <el-col class="line" :sm="2">至</el-col>
                <el-col :sm="11">
                  <el-date-picker type="datetime" placeholder="结束时间" v-model="searchRequest.end_time"
                                  value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="任务描述关键词" prop="description">
                <el-input v-model="searchRequest.description" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="任务类型">
                <el-select v-model="searchRequest.task_type" placeholder="请选择任务类型">
                  <el-option key="" label="全部" value=""></el-option>
                  <el-option v-for="tType in taskTypeList" :key="tType.value" :label="tType.verbose"
                             :value="tType.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="任务状态">
                <el-select v-model="searchRequest.status" placeholder="请选择任务状态">
                  <el-option key="" label="全部" value=""></el-option>
                  <el-option v-for="status in serviceStatus" :key="status.value" :label="status.verbose"
                             :value="status.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="服务价格">
                <el-col :sm="11">
                  <el-form-item prop="min_price">
                    <el-input v-model="searchRequest.min_price" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :sm="2">-</el-col>
                <el-col :sm="11">
                  <el-form-item prop="max_price">
                    <el-input v-model="searchRequest.max_price" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-col>
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
  import {
    getServiceProviderType,
    getSearchType,
    getServiceStatus,
    getTaskUserType
  } from '../../../assets/mUtils/mData'
  import {validPrice} from '../../../assets/mUtils/validate'
  import PageContentLayout from '../page_content_layout/page_content_layout'
  import QuickSearch from '../../../components/quick_search'
  import pagination from '../../../components/pagination'

  const taskListUrl = '/api/crm/task/';  //任务列表
  const taskDetailUrl = '/api/crm/task/task_id/';  //任务详情
  const infoUrl = '/api/crm/filter_conf/';  //枚举值
  const updateTaskUrl = '/api/crm/task/task_id/update/'; //编辑任务
  const createTaskUrl = '/api/crm/task/create/'; //创建任务
  const userUrl = '/api/crm/user/'; //获取用户信息

  export default {
    name: 'task_list',
    components: {PageContentLayout, QuickSearch, pagination},
    data() {
      return {
        // 任务列表
        taskList: [],
        visible2: false,

        // 任务详情
        taskDetail: {
          id: 0,
          description: '', //任务描述
          conclusion: '', //执行结论
          serivce_provider_type: null, //服务类型
          serivce_provider_value: '', //文章标题或医生id
          price: '', //服务价格
          assigned_user_id: '', //任务跟进人
          assigned_user_name: '',
          status: '', //任务状态
          remark: '' //备注
        },

        // 编辑任务表单验证规则
        taskDetailRules: {
          description: [
            {required: true, message: '请输入任务描述', trigger: 'blur'},
            {max: 300, message: '任务描述不能超过300字', trigger: 'blur'}
          ],
          conclusion: [{max: 300, message: '执行结论不能超过300字', trigger: 'blur'}],
          remark: [{max: 300, message: '备注不能超过300字', trigger: 'blur'}],
          assigned_user_id: [{required: true, message: '请选择有效任务跟进人', trigger: 'change'}],
          status: [{required: true, message: '请选择任务状态', trigger: 'change'}],
          price: [{required: false, validator: validPrice}]
        },

        // 创建任务
        createTaskData: {
          task_type: '',
          target_user_id: '',
          description: '',
          assigned_user_id: ''
        },

        // 创建任务表单验证规则
        createDetailRules: {
          task_type: [{required: true, message: '请选择任务类型', trigger: 'change'}],
          target_user_id: [{required: true, message: '请选择服务用户', trigger: 'change'}],
          description: [
            {required: true, message: '请输入任务描述', trigger: 'blur'},
            {max: 300, message: '任务描述不能超过300字', trigger: 'blur'}
          ],
          assigned_user_id: [{required: true, message: '请选择有效任务跟进人', trigger: 'change'}]
        },

        // 高级搜索条件
        searchRequest: {
          start_time: '', //创建时间开始
          end_time: '', //创建时间结束
          task_type: '', //任务类型
          description: '', //任务描述
          status: '', //任务状态
          min_price: null, //服务价格最小值
          max_price: null //服务价格最大值
        },
        searchRequestRules: {
          description: [{required: false, max: 300, message: '任务描述关键词不能超过300字'}],
          min_price: [{required: false, validator: validPrice}],
          max_price: [{required: false, validator: validPrice}]
        },

        // 快速检索条件
        quickSearchRequest: {
          search_type: 15, //快速搜索类型,默认微信昵称
          search: '', //快速搜索文本
        },

        // 表格筛选
        tableSearchRequest: {
          assigned_user_id: 0, //任务跟进人
          sponsor_user_id: 0, //需求发起人
          status: '', //任务状态
        },

        // 分页信息
        pageInfo: {
          num_pages: 1, //总页码数
          current_page: 1, //当前页码
          total_count: 0 //数据总条目数
        },

        // 当前检索条件
        currentSearch: {},

        // 搜索用户
        userSearchType: 5,
        taskUserType: [],
        userList: [],

        showSearchForm: false,
        showEditTask: false,
        showCreateTask: false,

        serviceProviderType: [], //服务结论提供方类型
        sponsorList: [], //发起人
        assignedList: [], //跟进人
        consultantList: [], //顾问
        taskTypeList: [], //任务类型
        quickSearch: [],
        serviceStatus: []
      }
    },
    created() {
      this.getTaskList(null);
      this.getFilterInfo();
      this.serviceProviderType = getServiceProviderType;
      this.quickSearch = getSearchType;
      this.serviceStatus = getServiceStatus;
      this.taskUserType = getTaskUserType;
    },
    methods: {
      // 获取任务列表
      getTaskList(request) {
        let _this = this;
        _this.request.get(taskListUrl, {
          params: request
        }).then((res) => {
          if (res.data.error_code === 0) {
            _this.taskList = res.data.task_list;
            _this.pageInfo = res.data.page_info;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 编辑任务
      editTask(taskId) {
        let _this = this;
        let detailUrl = taskDetailUrl.replace('task_id', taskId);
        _this.request.get(detailUrl).then((res) => {
          if (res.data.error_code === 0) {
            _this.taskDetail = res.data.task;
            _this.$resetFormValid('taskDetailForm');
            _this.showEditTask = true;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 提交任务
      postTask() {
        let _this = this;
        let _postUrl = updateTaskUrl.replace('task_id', _this.taskDetail.id);
        _this.$refs['taskDetailForm'].validate((valid, object) => {
          if (valid) {
            if (_this.taskDetail.service_provider_type === 0) {
              _this.taskDetail.service_provider_value = '';
            }
            _this.request.post(_postUrl, _this.taskDetail).then((res) => {
              if (res.data.error_code === 0) {
                _this.$elementMessage('任务信息更新成功', 'success');
                _this.showEditTask = false;
                _this.getTaskList(_this.currentSearch);
              } else {
                _this.$elementMessage(res.data.error_msg, 'error');
              }
            })
          } else {
            console.log('error submit in edit task:', object);
            return false;
          }
        });
      },
      // 显示创建任务表单
      showCreateForm() {
        this.userList = [];
        this.$resetFormValid('createTaskForm');
        this.showCreateTask = true;
      },
      // 创建任务
      createTask() {
        let _this = this;
        _this.$refs['createTaskForm'].validate((valid, object) => {
          if (valid) {
            _this.request.post(createTaskUrl, _this.createTaskData).then((res) => {
              if (res.data.error_code === 0) {
                _this.$elementMessage('创建任务成功', 'success');
                _this.showCreateTask = false;
                _this.createTaskData.task_type = '';
                _this.createTaskData.target_user_id = '';
                _this.createTaskData.description = '';
                _this.createTaskData.assigned_user_id = '';
                _this.getTaskList(null);
              } else {
                _this.$elementMessage(res.data.error_msg, 'error');
              }
            })
          } else {
            console.log('error submit in create task:', object);
            return false;
          }
        })

      },
      // 快速搜索
      subQuickSearch(qsParams) {
        let _this = this;
        _this.quickSearchRequest.search_type = qsParams.search_type;
        _this.quickSearchRequest.search = qsParams.search;

        _this.currentSearch = Object.assign({}, _this.quickSearchRequest);
        _this.getTaskList(_this.quickSearchRequest);
      },
      // 显示高级搜索表单
      showSearch() {
        this.searchRequest.start_time = '';
        this.searchRequest.end_time = '';
        this.searchRequest.task_type = '';
        this.searchRequest.description = '';
        this.searchRequest.status = '';
        this.searchRequest.min_price = null;
        this.searchRequest.max_price = null;
        this.showSearchForm = true;
      },
      // 高级搜索
      searchData() {
        let _this = this;
        _this.$refs['searchRequestForm'].validate((valid, object) => {
          if (valid) {
            _this.currentSearch = Object.assign({}, _this.searchRequest);
            _this.getTaskList(_this.searchRequest);
            _this.showSearchForm = false;
          } else {
            console.log('error submit in search task:', object);
            return false;
          }
        });
      },
      // 获取枚举值
      getFilterInfo() {
        let _this = this;
        const userId = this.$store.state.$userInfo.userId;
        _this.request.get(infoUrl, {
          params: {
            keys: 'sponsor|assigned|consultant|task_type'
          }
        }).then((res) => {
          if (res.data.error_code === 0) {
            let resData = res.data.filter_list;
            _this.sponsorList = resData.find(info => info.key === 'sponsor').enum_items;
            _this.assignedList = resData.find(info => info.key === 'assigned').enum_items;
            if (_this.assignedList.find(({value}) => +value === +userId)) _this.createTaskData.assigned_user_id = userId;
            _this.consultantList = resData.find(info => info.key === 'consultant').enum_items;
            _this.taskTypeList = resData.find(info => info.key === 'task_type').enum_items;
            console.log(_this.sponsorList);
          }
        })
      },
      // 清空用户搜索信息
      clearUserList() {
        this.userList = [];
      },
      // 获取用户信息
      getUserList(query) {
        let _this = this;
        if (query.length) {
          _this.request.get(userUrl, {
            params: {
              search_type: _this.userSearchType,
              search: query
            }
          }).then((res) => {
            if (res.data.error_code === 0) {
              _this.userList = [];
              if (res.data.user_list.length) {
                for (let user of res.data.user_list) {
                  let temp = {};
                  let vipNo = user.vip_no.length ? user.vip_no : '--';
                  let wxNo = user.wx_no.length ? user.wx_no : '--';
                  let wxAlias = user.wx_alias.length ? user.wx_alias : '--';
                  temp.value = user.user_id;
                  temp.verbose = vipNo + '(' + wxNo + ':' + wxAlias + ')';
                  _this.userList.push(temp);
                }
              }
            } else {
              _this.$elementMessage('用户信息获取失败', 'error');
            }
          })
        }
      },
      // 表头宽度计算
      labelWidth(labelLength) {
        let labelSize = 16;
        return labelLength * labelSize + 28;
      },
      // 表头(纯文字)
      labelHead(h, {column, $index}) {
        column.minWidth = this.labelWidth(column.label.length);
        return h('div', {style: {padding: 0, width: '100%'}}, [column.label]);
      },
      // 表头(筛选)
      filterHead(h, {column, $index}) {
        let _this = this;
        column.minWidth = this.labelWidth(column.label.length + 2);

        let selectData = [];
        if (column.label.indexOf('发起人') >= 0) {
          selectData = _this.sponsorList.map((item) => {
            return h('el-dropdown-item', {attrs: {command: {type: column.label, param: item.value}}}, [item.verbose]);
          })
        } else if (column.label.indexOf('跟进人') >= 0) {
          selectData = _this.assignedList.map((item) => {
            return h('el-dropdown-item', {attrs: {command: {type: column.label, param: item.value}}}, [item.verbose]);
          })
        } else if (column.label.indexOf('状态') >= 0) {
          selectData = _this.serviceStatus.map((item) => {
            return h('el-dropdown-item', {attrs: {command: {type: column.label, param: item.value}}}, [item.verbose]);
          })
        }

        return h('el-dropdown', {props: {size: 'small'}, on: {command: _this.headFilter}}, [
          h('span', {class: 'el-dropdown-link table_head'}, [
            column.label,
            h('i', {class: 'el-icon-arrow-down el-icon--right'})
          ]),
          h('el-dropdown-menu', {slot: 'dropdown'}, [
            h('el-dropdown-item', {attrs: {command: {type: column.label, param: ''}}}, '全部'),
            selectData
          ])
        ]);
      },
      // 根据表头筛选
      headFilter(command) {
        let request = {};
        if (command.type.indexOf('发起人') >= 0) {
          request.sponsor_user_id = command.param;
        } else if (command.type.indexOf('跟进人') >= 0) {
          request.assigned_user_id = command.param;
        } else if (command.type.indexOf('状态') >= 0) {
          request.status = command.param;
        }

        this.getTaskList(request);
      },
      // 分页改变时搜索
      searchWidthPage(page) {
        let _this = this;
        _this.currentSearch.page = page;
        _this.getTaskList(_this.currentSearch);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .task_list {
    .task_table {
      width: 100%;
    }
    .el-input, .el-select {
      width: 100%;
    }
    .line {
      text-align: center;
    }
    .el-dropdown {
      font-size: 12px;
      color: #909399;
    }
  }

  .el-dropdown-menu {
    max-height: 500px;
    overflow: scroll;
  }
</style>

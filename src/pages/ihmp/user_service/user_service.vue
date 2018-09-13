<template>
  <div class="user_service">
    <page-content-layout>
      <div slot="right_action" class="quick_search">
        <el-button type="text" icon="el-icon-search" @click="showSearch">高级检索</el-button>
        <quick-search :quickSearchRequest="quickSearchRequest" :quickSearch="quickSearchType"
                      @qsRequest="quickSearch"></quick-search>
      </div>
      <div slot="content_body">
        <!--服务列表-->
        <el-table :data="serviceList" height="90vh" class="service_table" size="small">
          <el-table-column label="创建时间" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.created_time.substring(0,10)}}</span>
              <br/>
              <span>{{scope.row.created_time.substring(11)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sponsor_user_name" label="需求发起人" :render-header="filterHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="target_user_info_text" label="用户信息" :render-header="labelHead"
                           header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" label="任务描述" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="conclusion" label="执行结论" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="service_provider_display_text" label="服务提供方" :render-header="labelHead" width="200"
                           header-align="center" align="center"></el-table-column>
          <el-table-column prop="price" label="服务价格(元)" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="status_verbose" label="服务状态" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column label="QA咨询详情" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.service_detail_url.length" type="text"
                         @click="goQADetail(scope.row.service_detail_url)" size="mini">查看
              </el-button>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
        </el-table>

        <!--分页-->
        <pagination :pageInfo="pageInfo" @pageChange="searchWidthPage"></pagination>

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
                  <el-option v-for="status in statusList" :key="status.value" :label="status.verbose"
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
            <el-button type="primary" @click="getSearchResult">搜 索</el-button>
            <el-button @click="showSearchForm = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </page-content-layout>
  </div>
</template>

<script>
  import PageContentLayout from '../page_content_layout/page_content_layout'
  import pagination from '../../../components/pagination'
  import QuickSearch from '../../../components/quick_search'
  import {getSearchType, getServiceStatus} from '../../../assets/mUtils/mData'
  import {validPrice} from '../../../assets/mUtils/validate'

  const serviceListUrl = '/api/crm/task/';
  const confUrl = '/api/crm/filter_conf/';

  export default {
    name: 'user_service',
    components: {pagination, PageContentLayout, QuickSearch},
    data() {
      return {
        serviceList: [], //服务列表
        quickSearchType: [], //快速搜索类型列表
        quickSearchRequest: {
          search_type: 15,
          search: ''
        },
        searchRequest: {
          start_time: '', //创建时间 -- 开始
          end_time: '', //创建时间 -- 结束
          description: '', //任务描述
          task_type: '', //任务类型
          status: '', //任务状态
          min_price: '', //服务价格 -- 最小值
          max_price: '' //服务价格 -- 最大值
        },
        searchRequestRules: {
          description: [{required: false, max: 300, message: '任务描述关键词不能超过300字'}],
          min_price: [{required: false, validator: validPrice}],
          max_price: [{required: false, validator: validPrice}]
        },
        pageInfo: {
          num_pages: 1,
          current_page: 1,
          total_count: 0
        },
        sponsorList: [], //需求发起人
        statusList: [], //任务状态
        taskTypeList: [], //任务类型
        currentSearch: {}, //当前检索条件
        showSearchForm: false,
        targetUserId: 0
      }
    },
    created() {
      let _this = this;
      _this.quickSearchType = getSearchType;
      _this.statusList = getServiceStatus;
      _this.getConfData();
      _this.targetUserId = _this.$route.query.target_user_id || 0;
      if (_this.targetUserId !== 0) {
        _this.getServiceList({target_user_id: _this.targetUserId});
      } else {
        _this.getServiceList(null);
      }
    },
    methods: {
      // 获得服务列表
      getServiceList(request) {
        let _this = this;
        _this.request.get(serviceListUrl, {
          params: request
        }).then((res) => {
          if (res.data.error_code === 0) {
            _this.serviceList = res.data.task_list;
            _this.pageInfo = res.data.page_info;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 快速搜索
      quickSearch(qsParams) {
        let _this = this;
        _this.quickSearchRequest.search_type = qsParams.search_type;
        _this.quickSearchRequest.search = qsParams.search;

        _this.currentSearch = Object.assign({}, _this.quickSearchRequest);
        _this.getServiceList(_this.quickSearchRequest);
      },
      // 高级搜索
      showSearch() {
        this.searchRequest.start_time = '';
        this.searchRequest.end_time = '';
        this.searchRequest.description = '';
        this.searchRequest.task_type = '';
        this.searchRequest.status = '';
        this.searchRequest.min_price = '';
        this.searchRequest.max_price = '';
        this.showSearchForm = true;
      },
      getSearchResult() {
        let _this = this;
        _this.$refs['searchRequestForm'].validate((valid, object) => {
          if (valid) {
            _this.currentSearch = Object.assign({}, this.searchRequest);
            _this.getServiceList(this.searchRequest);
            _this.showSearchForm = false;
          } else {
            console.log('error submit in search service:', object);
            return false;
          }
        });
      },
      // 获得发起人、任务类型
      getConfData() {
        let _this = this;
        _this.request.get(confUrl, {
          params: {
            keys: 'sponsor|task_type'
          }
        }).then((res) => {
          if (res.data.error_code === 0) {
            let resData = res.data.filter_list;
            _this.sponsorList = resData.find(info => info.key === 'sponsor').enum_items;
            _this.taskTypeList = resData.find(info => info.key === 'task_type').enum_items;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 查看qa详情
      goQADetail(url) {
        window.open(url, '_blank');
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

        return h('el-dropdown', {props: {size: 'small'}, on: {command: _this.headFilter}}, [
          h('span', {class: 'el-dropdown-link table_head'}, [
            column.label,
            h('i', {class: 'el-icon-arrow-down el-icon--right'})
          ]),
          h('el-dropdown-menu', {slot: 'dropdown'}, [
            h('el-dropdown-item', {attrs: {command: {type: column.label, param: ''}}}, '全部'),
            _this.sponsorList.map((item) => {
              return h('el-dropdown-item', {attrs: {command: {type: column.label, param: item.value}}}, [item.verbose]);
            })
          ])
        ]);
      },
      // 根据表头筛选
      headFilter(command) {
        let request = {};
        request.sponsor_user_id = command.param;

        this.getServiceList(request);
      },
      // 分页改变时搜索
      searchWidthPage(page) {
        let _this = this;
        if (_this.targetUserId > 0) {
          _this.currentSearch.target_user_id = _this.targetUserId;
        } else {
          _this.currentSearch.target_user_id = '';
        }
        _this.currentSearch.page = page;
        _this.getServiceList(_this.currentSearch);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .user_service {
    .service_table {
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

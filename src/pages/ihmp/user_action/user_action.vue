<template>
  <div class="user_action">
    <page-content-layout>
      <div slot="content_body">
        <!--查询表单-->
        <el-form :inline="true" :model="searchRequest" class="search">
          <el-form-item label="用户Tag">
            <el-select v-model="searchRequest.vip_tag" placeholder="请选择用户tag">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="tag in vipTagList" :key="tag.value" :label="tag.verbose" :value="tag.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属顾问">
            <el-select v-model="searchRequest.consultant_user_id" placeholder="请选择所属顾问">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="consultant in consultantList" :key="consultant.value" :label="consultant.verbose"
                         :value="consultant.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchAction">查询</el-button>
          </el-form-item>
        </el-form>

        <!--行为列表-->
        <el-table :data="actionList" height="90vh" class="action_table" size="small">
          <el-table-column prop="user_id" label="用户UID" :render-header="labelHead" header-align="center" align="center"
                           fixed></el-table-column>
          <el-table-column prop="vip_no" label="会员编号" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="last_consult_time" label="最近一次咨询时间" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="last_consult_device" label="最近一次咨询的端" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="last_consult_paid" label="最近一次消费金额" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="last_consult_clinic" label="最近一次咨询科室" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="paid_times" label="累计消费次数" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="paid_total" label="累计消费金额" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="paid_avg" label="消费均价" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column label="QA咨询" :render-header="labelHead" header-align="center" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="goQA(scope.row.user_id)" size="mini">查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <pagination :pageInfo="pageInfo" @pageChange="searchWidthPage"></pagination>
      </div>
    </page-content-layout>
  </div>
</template>

<script>
  import {getVipTag} from '../../../assets/mUtils/mData'
  import PageContentLayout from '../page_content_layout/page_content_layout'
  import pagination from '../../../components/pagination'

  const actionListUrl = '/api/crm/action/user/';
  const infoUrl = '/api/crm/filter_conf/';  //枚举值

  export default {
    name: 'user_action',
    components: {PageContentLayout, pagination},
    data() {
      return {
        actionList: [],
        searchRequest: {
          vip_tag: null,
          vip_type: '',
          consultant_user_id: null,
          page: 1
        },
        pageInfo: {
          num_pages: 1,
          current_page: 1,
          total_count: 0
        },
        vipTagList: [],
        consultantList: []
      }
    },
    created() {
      this.vipTagList = getVipTag;
      this.getConsultantList();
      this.searchRequest.vip_type = 'vip';
      this.getActionList(this.searchRequest);
    },
    methods: {
      // 获取顾问信息
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
      // 获取行为列表
      getActionList(request) {
        let _this = this;
        _this.request.get(actionListUrl, {
          params: request
        }).then((res) => {
          if (res.data.error_code === 0) {
            _this.actionList = res.data.user_list;
            _this.pageInfo = res.data.page_info;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 查询行为列表
      searchAction() {
        this.searchRequest.vip_type = '';
        this.searchRequest.page = 1;
        this.getActionList(this.searchRequest);
      },
      // 翻页
      searchWidthPage(page) {
        this.searchRequest.page = page;
        this.getActionList(this.searchRequest);
      },
      // 查看QA详情
      goQA(userId) {
        let targetQA = this.$router.resolve({
          path: '/crm/v_ihmp/user/action_qa',
          query: {
            user_id: userId
          }
        });
        window.open(targetQA.href, '_blank');
      },
      // 表头宽度计算
      labelHead(h, {column, $index}) {
        let labelSize = 16;
        column.minWidth = column.label.length * labelSize + 20;
        return h('div', {style: {padding: 0, width: '100%'}}, [column.label]);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .user_action {
    .page_content_body {
      padding-top: 30px !important;
    }
  }
</style>

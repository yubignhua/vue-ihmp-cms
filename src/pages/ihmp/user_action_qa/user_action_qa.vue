<template>
  <div class="user_action_qa">
    <div class="user_action_qa">
      <page-content-layout>
        <div slot="content_body">
          <!--行为列表-->
          <el-table :data="actionQAList" height="90vh" class="action_qa_table" size="small">
            <el-table-column prop="service_id" label="咨询订单ID" :render-header="labelHead" header-align="center"
                             align="center"
                             fixed></el-table-column>
            <el-table-column prop="description" label="首问" :render-header="labelHead" header-align="center"
                             align="center"></el-table-column>
            <el-table-column label="详情" :render-header="labelHead" header-align="center" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="goDetail(scope.row.detail_url)" size="mini">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="service_provider_info" label="医生姓名(医生ID)" :render-header="labelHead"
                             header-align="center"
                             align="center"></el-table-column>
            <el-table-column prop="clinic" label="科室" :render-header="labelHead" header-align="center"
                             align="center"></el-table-column>
            <el-table-column prop="service_type_verbose" label="咨询类型" :render-header="labelHead" header-align="center"
                             align="center"></el-table-column>
            <el-table-column prop="price" label="支付金额(元)" :render-header="labelHead" header-align="center"
                             align="center"></el-table-column>
            <el-table-column label="创建时间" :render-header="labelHead" header-align="center"
                             align="center">
              <template slot-scope="scope">
                <span>{{scope.row.created_time.substring(0,10)}}</span>
                <br />
                <span>{{scope.row.created_time.substring(11)}}</span>
              </template>
            </el-table-column>
          </el-table>

          <!--分页-->
          <pagination :pageInfo="pageInfo" @pageChange="searchWidthPage"></pagination>
        </div>
      </page-content-layout>
    </div>
  </div>
</template>

<script>
  import PageContentLayout from '../page_content_layout/page_content_layout'
  import pagination from '../../../components/pagination'

  const actionQAUrl = '/api/crm/action/';

  export default {
    name: 'user_action_qa',
    components: {PageContentLayout, pagination},
    data() {
      const roles = this.$store.state.$userInfo.roles.slice(0);
      return {
        actionQAList: [],
        pageInfo: {
          num_pages: 1,
          current_page: 1,
          total_count: 0
        },
        currentSearch: {
          page: 1,
          user_id: 0,
          roles: roles.join(',')
        }
      }
    },
    created() {
      this.currentSearch.user_id = this.$route.query.user_id || 0;
      this.getActionQAList(this.currentSearch);
    },
    methods: {
      // 获得QA信息
      getActionQAList(request) {
        let _this = this;
        _this.request.get(actionQAUrl, {
          params: request
        }).then((res) => {
          if (res.data.error_code === 0) {
            _this.actionQAList = res.data.action_list;
            _this.pageInfo = res.data.page_info;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 翻页
      searchWidthPage(page) {
        this.currentSearch.page = page;
        this.getActionQAList(this.currentSearch);
      },
      // 跳转QA详情
      goDetail(url) {
        window.open(url);
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

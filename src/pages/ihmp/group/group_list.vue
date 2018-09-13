<template>
  <div class="group_list">
    <page-content-layout>
      <div slot="content_body">
        <!--权限分组列表-->
        <el-table :data="groupList" height="90vh" class="staff_table" size="small">
          <el-table-column prop="verbose" label="权限组" header-align="center" align="center"></el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </page-content-layout>
  </div>
</template>

<script>
  import PageContentLayout from '../page_content_layout/page_content_layout'

  const confUrl = '/api/crm/filter_conf/';

  export default {
    name: 'group_list',
    components: {PageContentLayout},
    data() {
      return {
        groupList: []
      }
    },
    created() {
      this.getGroupList();
    },
    methods: {
      // 获取权限分组
      getGroupList() {
        let _this = this;
        _this.request.get(confUrl, {
          params: {
            keys: 'group'
          }
        }).then((res) => {
          _this.groupList = res.data.filter_list[0].enum_items;
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .group_list{
    .page_content_body{
      padding-top: 30px !important;
    }
  }
</style>

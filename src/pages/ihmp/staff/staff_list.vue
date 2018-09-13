<template>
  <div class="staff_list">
    <page-content-layout>
      <div slot="right_action" class="quick_search">
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="showStaffActionForm('create')">新增</el-button>
        <quick-search :quickSearchRequest="quickSearchRequest" :quickSearch="staffSearchType"
                      @qsRequest="searchStaff"></quick-search>
      </div>
      <div slot="content_body">
        <!--人员列表-->
        <el-table :data="staffList" height="90vh" class="staff_table" size="small">
          <el-table-column prop="name" label="员工姓名" header-align="center" align="center"></el-table-column>
          <el-table-column prop="username" label="LDAP账号" header-align="center" align="center"></el-table-column>
          <el-table-column prop="group_verbose" label="权限组" header-align="center" align="center"></el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showStaffActionForm('update',scope.row)"
                         size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="showStaffDelete(scope.row.id)"
                         size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <pagination :pageInfo="pageInfo" @pageChange="searchWidthPage"></pagination>

        <!--新增/编辑表单-->
        <el-dialog :title="currentAction==='create'?'创建员工':'编辑员工'" :visible.sync="showStaffForm"
                   class="edit-staff-dialog">
          <el-form :model="staffInfo" ref="staffForm" label-width="120px" :rules="createStaffRules">
            <el-form-item v-if="currentAction==='create'" label="LDAP账号" prop="username">
              <el-input v-model="staffInfo.username"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="name">
              <el-input v-model="staffInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="权限组" prop="group">
              <el-select v-model="staffInfo.group" placeholder="请选择权限组">
                <el-option v-for="group in groupList" :key="group.value" :label="group.verbose"
                           :value="group.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button v-if="currentAction==='create'" type="primary" @click="createStaff">保 存</el-button>
            <el-button v-if="currentAction==='update'" type="primary" @click="updateStaff">保 存</el-button>
            <el-button @click="showStaffForm = false">取 消</el-button>
          </div>
        </el-dialog>

        <!--删除提示-->
        <el-dialog title="删除" :visible.sync="showDeleteDialog" width="30%">
          <span>删除后不可恢复，确定删除？</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showDeleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="deleteStaff">确 定</el-button>
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
  import {getStaffSearch} from '../../../assets/mUtils/mData'

  const staffListUrl = '/chunyu_admin/crm/staff/';
  const staffCreateUrl = '/chunyu_admin/crm/staff/create/';
  const staffUpdateUrl = '/chunyu_admin/crm/staff/staff_id/update/';
  const staffDeleteUrl = '/chunyu_admin/crm/staff/staff_id/delete/';
  const confUrl = '/api/crm/filter_conf/';

  export default {
    name: 'staff_list',
    components: {PageContentLayout, pagination, QuickSearch},
    data() {
      return {
        staffList: [],
        staffInfo: {
          id: 0,
          username: '',
          group: '',
          name: ''
        },
        pageInfo: {
          num_pages: 1,
          current_page: 1,
          total_count: 0
        },
        groupList: [],
        showStaffForm: false,
        currentAction: '',
        showDeleteDialog: false,
        deleteStaffId: 0,
        currentSearch: {},
        quickSearchRequest: {
          search_type: 10,
          search: ''
        },
        staffSearchType: [],
        createStaffRules: {
          username: [{required: true, message: '请填写LDAP账号', trigger: 'blur'}],
          name: [{required: true, message: '请填写员工姓名', trigger: 'blur'}],
          group: [{required: true, message: '请选择权限组', trigger: 'change'}]
        }
      }
    },
    created() {
      this.getGroupList();
      this.staffSearchType = getStaffSearch;
      this.getStaffList(null);
    },
    methods: {
      // 获取人员信息
      getStaffList(request) {
        let _this = this;
        _this.request.get(staffListUrl, {
          params: request
        }).then((res) => {
          if (res.data.error_code === 0) {
            _this.staffList = res.data.staff_list;
            _this.pageInfo = res.data.page_info;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
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
      },
      // 重置人员信息
      resetStaffInfo() {
        this.staffInfo.id = 0;
        this.staffInfo.username = '';
        this.staffInfo.group = '';
        this.staffInfo.name = '';
      },
      // 显示创建/新增表单
      showStaffActionForm(action, staffInfo) {
        this.$resetFormValid('staffForm');
        this.currentAction = action;
        if (action === 'create') {
          this.resetStaffInfo();
        } else if (action === 'update' && staffInfo) {
          this.staffInfo = JSON.parse(JSON.stringify(staffInfo));
        }
        this.showStaffForm = true;
      },
      // 创建用户
      createStaff() {
        let _this = this;
        _this.$refs['staffForm'].validate((valid, object) => {
          if (valid) {
            _this.request.post(staffCreateUrl, {
              username: _this.staffInfo.username,
              group: _this.staffInfo.group,
              name: _this.staffInfo.name
            }).then((res) => {
              if (res.data.error_code === 0) {
                if (res.data.staff.is_reactive) {
                  _this.$elementMessage('此账号重新激活，如有必要请修改相关信息！', 'success');
                } else {
                  _this.$elementMessage('员工创建成功！', 'success');
                }
                _this.showStaffForm = false;
                _this.getStaffList(null);
              } else {
                _this.$elementMessage(res.data.error_msg, 'error');
              }
            })
          } else {
            console.log('error submit in create staff:', object);
            return false;
          }
        });
      },
      // 更新用户
      updateStaff() {
        let _this = this;
        let postUrl = staffUpdateUrl.replace('staff_id', _this.staffInfo.id);
        _this.$refs['staffForm'].validate((valid, object) => {
          if (valid) {
            _this.request.post(postUrl, {
              group: _this.staffInfo.group,
              name: _this.staffInfo.name
            }).then((res) => {
              if (res.data.error_code === 0) {
                _this.$elementMessage('员工信息更新成功！', 'success');
                _this.showStaffForm = false;
                _this.getStaffList(_this.currentSearch);
              } else {
                _this.$elementMessage(res.data.error_msg, 'error');
              }
            })
          } else {
            console.log('error submit in create staff:', object);
            return false;
          }
        });
      },
      // 删除用户
      showStaffDelete(staffId) {
        this.deleteStaffId = staffId;
        this.showDeleteDialog = true;
      },
      deleteStaff() {
        let _this = this;
        let postUrl = staffDeleteUrl.replace('staff_id', _this.deleteStaffId);
        _this.request.post(postUrl).then((res) => {
          if (res.data.error_code === 0) {
            _this.$elementMessage('员工删除成功！', 'success');
            _this.showDeleteDialog = false;
            _this.getStaffList(_this.currentSearch);
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 根据员工姓名/用户名搜索
      searchStaff(qsParams) {
        let _this = this;
        _this.quickSearchRequest.search_type = qsParams.search_type;
        _this.quickSearchRequest.search = qsParams.search;

        _this.currentSearch = Object.assign({}, _this.quickSearchRequest);
        _this.getStaffList(_this.quickSearchRequest);
      },
      // 翻页
      searchWidthPage(page) {
        let _this = this;
        _this.currentSearch.page = page;
        _this.getStaffList(_this.currentSearch);
      }
    }
  }
</script>

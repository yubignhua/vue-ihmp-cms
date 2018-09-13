<template>
  <div class="consultant_list">
    <page-content-layout>
      <div slot="right_action" class="quick_search">
        <el-button type="text" icon="el-icon-circle-plus-outline" @click="showConsultantActionForm('create')">新增
        </el-button>
        <div class="search">
          <el-input placeholder="顾问名称" v-model="searchRequest.name" size="mini" @keyup.enter.native="searchConsultant">
            <el-button slot="append" size="mini" icon="el-icon-search" @click="searchConsultant"></el-button>
          </el-input>
        </div>
      </div>
      <div slot="content_body">
        <!--顾问列表-->
        <el-table :data="consultantList" height="90vh" class="consultant_table" size="small">
          <el-table-column prop="name" label="顾问名称" header-align="center" align="center"></el-table-column>
          <el-table-column prop="wx_no" label="顾问微信号" header-align="center" align="center"></el-table-column>
          <el-table-column label="操作" header-align="center" align="center">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="showConsultantActionForm('update',scope.row)"
                         size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--新增/编辑表单-->
        <el-dialog :title="currentAction==='create'?'创建顾问':'编辑顾问'" :visible.sync="showConsultantForm"
                   class="edit-consultant-dialog">
          <el-form :model="consultantInfo" ref="consultantForm" :rules="createConsultantRules" label-width="120px">
            <el-form-item label="顾问名称" prop="name">
              <el-input v-model="consultantInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="顾问微信号" prop="wx_no">
              <el-input v-model="consultantInfo.wx_no"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button v-if="currentAction==='create'" type="primary" @click="createConsultant">保 存</el-button>
            <el-button v-if="currentAction==='update'" type="primary" @click="updateConsultant">保 存</el-button>
            <el-button @click="showConsultantForm = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </page-content-layout>
  </div>
</template>

<script>
import PageContentLayout from "../page_content_layout/page_content_layout";

const consultantListUrl = "/api/crm/consultant/"; //顾问列表
const consultantCreateUrl = "/api/crm/consultant/create/";  //创建顾问
const consultantUpdateUrl = "/api/crm/consultant/consultant_id/update/";  //更新顾问信息

export default {
  name: "consultant_list",
  components: { PageContentLayout },
  data() {
    return {
      consultantList: [],
      consultantInfo: {
        id: 0,
        name: "",
        wx_no: ""
      },
      showConsultantForm: false,
      currentAction: "",
      searchRequest: {
        name: ""
      },
      createConsultantRules: {
        name: [{ required: true, message: "请填写顾问名称", trigger: "blur" }],
        wx_no: [
          { required: true, message: "请填写顾问微信号", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getConsultantList(null);
  },
  methods: {
    // 获取顾问信息
    getConsultantList(request) {
      let _this = this;
      _this.request
        .get(consultantListUrl, {
          params: request
        })
        .then(res => {
          if (res.data.error_code === 0) {
            _this.consultantList = res.data.consultant_list;
          } else {
            _this.$elementMessage(res.data.error_msg, "error");
          }
        });
    },
    // 重置顾问信息
    resetConsultantInfo() {
      this.consultantInfo.id = 0;
      this.consultantInfo.name = "";
      this.consultantInfo.wx_no = "";
    },
    // 显示创建/新增表单
    showConsultantActionForm(action, consultantInfo) {
      this.currentAction = action;
      if (action === "create") {
        this.resetConsultantInfo();
      } else if (action === "update" && consultantInfo) {
        this.consultantInfo = consultantInfo;
      }
      this.showConsultantForm = true;
    },
    // 创建顾问
    createConsultant() {
      let _this = this;
      _this.$refs["consultantForm"].validate((valid, object) => {
        if (valid) {
          _this.request
            .post(consultantCreateUrl, {
              name: _this.consultantInfo.name,
              wx_no: _this.consultantInfo.wx_no
            })
            .then(res => {
              if (res.data.error_code === 0) {
                _this.$elementMessage("顾问创建成功！", "success");
                _this.showConsultantForm = false;
                _this.getConsultantList(null);
              } else {
                _this.$elementMessage(res.data.error_msg, "error");
              }
            });
        } else {
          console.log("error submit in create staff:", object);
          return false;
        }
      });
    },
    // 更新顾问
    updateConsultant() {
      let _this = this;
      let postUrl = consultantUpdateUrl.replace(
        "consultant_id",
        _this.consultantInfo.id
      );
      _this.$refs["consultantForm"].validate((valid, object) => {
        if (valid) {
          _this.request
            .post(postUrl, {
              name: _this.consultantInfo.name,
              wx_no: _this.consultantInfo.wx_no
            })
            .then(res => {
              if (res.data.error_code === 0) {
                _this.$elementMessage("顾问信息更新成功！", "success");
                _this.showConsultantForm = false;
                _this.getConsultantList(_this.searchRequest);
              } else {
                _this.$elementMessage(res.data.error_msg, "error");
              }
            });
        }
      });
    },
    // 根据顾问姓名搜索
    searchConsultant() {
      this.getConsultantList(this.searchRequest);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.consultant_list {
  .search {
    display: inline-block;
  }
}
</style>

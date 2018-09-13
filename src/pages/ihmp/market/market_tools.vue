<template>
  <div class="market_tools">
    <page-content-layout>
      <div slot="content_body">
        <!--营销工具-->
        <el-container>
          <el-aside>
            <div class="title">
              <h3>营销工具</h3>
            </div>
            <div class="menu_container">
              <a v-for="menu in menuList" :href="menu.url.length?menu.url:'javascript:void(0)'" target="_blank">
                <div class="menu">
                  <div class="pre_menu" :style="{backgroundColor:menu.color}"></div>
                  <span>{{menu.name}}</span>
                </div>
              </a>
            </div>
          </el-aside>
          <el-main>
            <el-form :model="telManage" :rules="telFormRules" ref="telForm" label-width="250px">
              <el-form-item label="请输入您的接听电话(手机/座机)" prop="cellphone">
                <el-input v-model="telManage.cellphone"></el-input>
              </el-form-item>
              <el-form-item label="请输入对方userID" prop="user_id">
                <el-input v-model="telManage.user_id"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitTelForm">开始拨打</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </div>
    </page-content-layout>
  </div>
</template>

<script>
  import PageContentLayout from '../page_content_layout/page_content_layout'

  const telUrl = '/ask/staff_tool/telephone/staff_call/';

  export default {
    name: 'market_tools',
    components: {PageContentLayout},
    data() {
      return {
        menuList: [
          {name: '电话后台', url: '', color: '#409EFF'},
          {
            name: '机器人拉群小助手',
            url: 'https://www.chunyuyisheng.com/cy_wechat_bot/r_admin/group-assistant',
            color: '#6CCD74'
          },
          {name: '消息后台', url: 'http://www.chunyuyisheng.com/operation/staff_tools/index/', color: '#EB1B0D'},
          {name: '优惠券', url: 'https://chunyuyisheng.com/cyadmin/clinic/coupondetail/', color: '#FF7B00'}
        ],
        telManage: {
          cellphone: '',
          user_id: null
        },
        telFormRules: {
          cellphone: [{required: true, message: '请输入接听电话', trigger: 'blur'}],
          user_id: [{required: true, message: '请输入对方userID', trigger: 'blur'}]
        }
      }
    },
    methods: {
      submitTelForm() {
        let _this=this;
        _this.$refs['telForm'].validate((valid, object) => {
          if (valid) {
            _this.request.post(telUrl, {
              phone_number: _this.telManage.cellphone,
              user_id_or_doctor_id: _this.telManage.user_id,
              is_json: 1
            }).then((res) => {
              if (res.data.error_code === 0) {
                _this.$elementMessage('电话正在拨打中，请稍后', 'success');
              } else {
                _this.$elementMessage(res.data.error_msg, 'error');
              }
            })
          } else {
            console.log('error submit in submitTelForm', object);
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .market_tools {
    .page_content_body {
      padding-top: 30px !important;

      .el-container {
        min-height: 80vh;
        background-color: #FFFFFF;

        .el-aside {
          width: 350px;
          border-right: #F2F6FC 2px solid;
          padding-top: 30px;
          padding-left: 30px;

          .menu_container {
            .menu {
              padding-top: 30px;
              .pre_menu {
                height: 10px;
                width: 10px;
                border-radius: 100%;
                display: inline-block;
                margin-right: 5px;
              }
            }
          }
        }

        .el-main {
          padding-top: 60px;
          padding-right: 30px;
        }
      }
    }
  }
</style>

<template>
  <div class="task_list">
    <div class="card_container">
      <el-card shadow="always" class="m_task">
        <el-button type="primary" @click="goUrl('/crm/v_ihmp/task/task_list')">
          <svg-icon size="20px" icon-class="table"/>
          任务管理-任务列表
        </el-button>
      </el-card>
      <div class="task_item2">
        <el-card shadow="always" class="m_task">
          <el-button type="success" @click="goUrl('/crm/v_ihmp/user/info')">
            <svg-icon size="20px" icon-class="peoples"/>
            CRM-用户信息
          </el-button>
          <div>
            <el-radio-group v-model="currentMenu" @change="goUrl">
              <el-radio-button v-for="(menu, index) in userMenu" :key="index" :label="menu.url">{{menu.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-card>

        <el-card shadow="always" class="m_task">
          <el-button type="warning" @click="goUrl('/crm/v_ihmp/market/activity')">
            <svg-icon size="20px" icon-class="other"/>
            CRM-营销配置
          </el-button>
          <div>
            <el-radio-group v-model="currentMenu" @change="goUrl">
              <el-radio-button v-for="(menu, index) in marketMenu" :key="index" :label="menu.url">{{menu.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-card>
      </div>


      <div>
        <el-card shadow="always" class="m_task">
          <el-button type="danger" @click="goUrl('/crm/v_ihmp/other/staff')">
            <svg-icon size="20px" icon-class="clipboard"/>
            CRM-其他设置
          </el-button>
          <div>
            <el-radio-group v-model="currentMenu" @change="goUrl">
              <el-radio-button v-for="(menu, index) in otherMenu" :key="index" :label="menu.url">{{menu.name}}</el-radio-button>
            </el-radio-group>
          </div>
        </el-card>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userMenu: [
          {name: '基本信息', url: '/crm/v_ihmp/user/info'},
          {name: '行为信息', url: '/crm/v_ihmp/user/action'},
          {name: '服务记录', url: '/crm/v_ihmp/user/service'}
        ],
        marketMenu:[
          {name: '营销活动配置', url: '/crm/v_ihmp/market/activity'},
          {name: '营销工具', url: '/crm/v_ihmp/market/tools'}
        ],
        otherMenu:[
          {name: '权限分组', url: '/crm/v_ihmp/other/group'},
          {name: '人员管理', url: '/crm/v_ihmp/other/staff'},
          {name: '顾问管理', url: '/crm/v_ihmp/other/consultant'}
        ],
        currentMenu: ''
      };
    },
    methods: {
      goUrl(url) {
        this.currentMenu = '';
        this.$router.push(url);
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../assets/style/mixin';

  .task_list {
    .card_container {
      padding: 30px;
      padding-top: 10px;
      .m_task {
        margin-top: 30px;
        width: 400px;
      }
      .task_item2 {
        .m_task {
          float: left;
          margin-right: 30px;
          clear: both;
        }
      }
      .el-card__body {
        padding: 0;
      }
      .el-button--default {
        width: 100%;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid #dcdfe6;

      }
      .el-button--medium {
        width: 100%;
        border-radius: 0;
      }
      .el-radio-button__inner {
        border-top: none;
        border-left: none;
        border-bottom: none;
        border-radius: 0;
      }

    }
  }


</style>

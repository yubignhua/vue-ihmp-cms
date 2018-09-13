<template>
  <div class="market_activity">
    <page-content-layout>
      <div slot="content_body">
        <!--营销活动配置-->
        <el-row :gutter="30">
          <el-col :span="8">
            <a href="https://www.chunyuyisheng.com/cy_wechat_bot/r_admin/robot-manage" target="_blank">
              <el-card shadow="hover" class="config config_robot">微信机器人配置后台</el-card>
            </a>
          </el-col>
          <el-col :span="8">
            <a href="https://po.chunyuyisheng.com/cms/special/act_conf/" target="_blank">
              <el-card shadow="hover" class="config config_cms">CMS 后台</el-card>
            </a>
          </el-col>
        </el-row>
      </div>
    </page-content-layout>
  </div>
</template>

<script>
  import PageContentLayout from '../page_content_layout/page_content_layout'

  export default {
    name: 'market_activity',
    components: {PageContentLayout}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .market_activity {
    .page_content_body {
      padding-top: 30px !important;

      .config {
        min-height: 150px;
        color: #FFFFFF;
        text-align: center;
        line-height: 150px;
        font-size: 25px;
        font-weight: bold;

        &.config_robot {
          background-color: #13C0FF;
        }
        &.config_cms {
          background-color: #F8C461;
        }
      }
    }
  }
</style>

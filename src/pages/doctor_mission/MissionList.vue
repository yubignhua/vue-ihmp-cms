<template>
	<div>	
		<page-content-layout>
	      <div slot="content_body">
	        <el-row :gutter="30">
	          <el-col :span="8">
	            <router-link :to="{ name: 'permission_list' }">
	              <el-card shadow="hover" class="config config_robot">权限配置后台</el-card>
	            </router-link>
	          </el-col>
	          <el-col :span="8">
	            <router-link :to="{ name: 'reward_list' }">
	              <el-card shadow="hover" class="config config_cms">奖励发放后台</el-card>
	            </router-link>
	          </el-col>
	        </el-row>
	      </div>
	    </page-content-layout>
	</div>
</template>

<script type="text/javascript">
import PageContentLayout from './components/page_content_layout'

export default {
	components: { PageContentLayout }
}
	
</script>

<style lang="scss" scoped>
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
</style>
<template>
	<div class="sidebar-container">
		<el-menu
	    class="el-menu-vertical-demo"
	    background-color="#304156"
	    text-color="#bfcbd9"
	    active-text-color="#409EFF"
	    :default-active="path" :collapse="isCollapse">
		    <el-submenu index="1">
		      <template slot="title">
		        <i class="el-icon-menu"></i>
		        <span>医生任务系统</span>
		      </template>
		      <el-submenu index="1-1">
		        <template slot="title">权限配置</template>
		        <el-menu-item index="1-1-1">
		        	<router-link :to="{ name: 'permission_list' }">权限配置后台</router-link>
	        	</el-menu-item>
		      </el-submenu>
		      <el-submenu index="1-2">
		        <template slot="title">奖励发放</template>
		        <el-menu-item index="1-2-1">
		        	<router-link :to="{ name: 'reward_list' }">奖励发放后台</router-link>
	        	</el-menu-item>
		      </el-submenu>
          <el-submenu index="1-3">
            <template slot="title">OA管理</template>
            <el-menu-item index="1-2-1">
              <router-link :to="{ name: 'oa_maintenance' }">OA项目维护</router-link>
            </el-menu-item>
          </el-submenu>
		    </el-submenu>
	  </el-menu>
	</div>
</template>

<script type="text/javascript">
export default {
	data() {
		return {
			isCollapse: false,
			path: '/doctor_mission/permission_configure/permission_list'
		}
	}
}

</script>

<style lang="scss" scoped>
	.sidebar-container .el-menu {
      height: 100%;
    }
</style>

<template>
	<div class="permission">
		<page-content-layout>
			<div slot="content_body">
				<!--配置列表-->
	      <el-table :data="permissionList" size="small">
	        <el-table-column prop="group_name" label="小组名称" :render-header="labelHead" header-align="center" align="center" fixed></el-table-column>
	        <el-table-column prop="second_class_checker_username" label="二级审核" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column label="编辑人员" :render-header="labelHead" header-align="center" align="center">
	        	<template slot-scope="scope">
              <span v-for="item,index in scope.row.editor_username_list">
              	<span v-if="index !== scope.row.editor_username_list.length - 1">{{ item }},</span>
              	<span v-else>{{ item }}</span>
            	</span>
            </template>
	        </el-table-column>
	        <el-table-column prop="third_class_checker_username" label="三级审核" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column label="查看权限" :render-header="labelHead" header-align="center" align="center">
	        	<template slot-scope="scope">
              <span v-for="item,index in scope.row.viewer_username_list">
              	<span v-if="index !== scope.row.viewer_username_list.length - 1">{{ item }},</span>
              	<span v-else>{{ item }}</span>
            	</span>
            </template>
	        </el-table-column>
	        <el-table-column label="编辑" :render-header="labelHead" header-align="center" align="center">
	        	<template slot-scope="scope">
	        		<router-link :to="{ name: 'permission_detail', query: { group_id: scope.row.group_id, review_type: 'review' }}" v-if="scope.row.can_edit" class="active-button" >编辑</router-link>
	        		<span v-else>编辑</span>
	        	</template>
	        </el-table-column>
	        <el-table-column prop="groups" label="查看" :render-header="labelHead" header-align="center" align="center">
	        	<template slot-scope="scope">
	        		<router-link :to="{ name: 'permission_detail', query: { group_id: scope.row.group_id, review_type: 'view' }}" v-if="scope.row.can_view" class="active-button" >查看</router-link>
	        		<span v-else>查看</span>
	        	</template>
	        </el-table-column> 
	      </el-table>
	    </div>
		</page-content-layout>		
	</div>
	
</template>

<script type="text/javascript">
import PageContentLayout from '../components/page_content_layout'

export default {
	components: { PageContentLayout },
	data() {
		return {
			permissionList: []
		}
	},
	created() {
		this.getPermissionList();
	},
	methods: {
    getPermissionList() {
    	const permissionUrl = '/cy_task/permission/group_list/';
      const that = this;
      that.request.get(permissionUrl).then((res) => {
        if (res.data.error_code === 0) {
          that.permissionList = res.data.group_list;
        } else {
          this.$elementMessage(res.data.error_msg, 'error');
        }
      })
    },
		// 表头宽度计算
    labelHead(h, {column, $index}) {
      let labelSize = 16;
      column.minWidth = column.label.length * labelSize + 28;
      return h('div', {style: {padding: 0, width: '100%'}}, [column.label]);
    },
	}
}
	
</script>

<style lang="scss" scoped>
	.active-button {
		color: #409eff;
	}
</style>
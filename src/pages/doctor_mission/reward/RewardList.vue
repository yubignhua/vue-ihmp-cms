<template>
	<div class="permission">
		<page-content-layout>
			<div slot="content_body">
				<router-link :to="{ name: 'reward_create', query: { review_type: 'create' }}">
					<el-button type="primary">新建奖励发放</el-button>
				</router-link>
				<!--奖励列表-->
	      <el-table :data="rewardList" size="small">
	        <el-table-column prop="detail_id" label="ID" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="oa_name" label="OA项目" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="activity_name" label="活动名称" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="reward_time" label="发放时间" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="total_num" label="奖励人数" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="total_yuan" label="总金额" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="editor_username" label="提交人员" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="second_class_checker_username" label="二级审核" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="third_class_checker_username" label="三级审核" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column prop="status" label="状态" :render-header="labelHead" header-align="center" align="center"></el-table-column>
	        <el-table-column label="编辑" :render-header="labelHead" header-align="center" align="center">
	        	<template slot-scope="scope">
	        		<router-link :to="{ name: 'reward_create', query: { detail_id: scope.row.detail_id, review_type: 'edit' }}" v-if="scope.row.can_edit" class="active-button" >编辑</router-link>
	        		<span v-else>编辑</span>
	        	</template>
	        </el-table-column>
	        <el-table-column label="审核" :render-header="labelHead" header-align="center" align="center">
	        	<template slot-scope="scope">
	        		<router-link :to="{ name: 'reward_detail', query: { detail_id: scope.row.detail_id, review_type: 'review' }}" v-if="scope.row.can_check" class="active-button" >审核</router-link>
	        		<span v-else>审核</span>
	        	</template>
	        </el-table-column>
	        <el-table-column prop="groups" label="查看" :render-header="labelHead" header-align="center" align="center">
	        	<template slot-scope="scope">
	        		<router-link :to="{ name: 'reward_detail', query: { detail_id: scope.row.detail_id, review_type: 'view' }}" v-if="scope.row.can_view" class="active-button" >查看</router-link>
	        		<span v-else>查看</span>
	        	</template>
	        </el-table-column> 
	      </el-table>
	      <!--分页-->
        <pagination :pageInfo="pageInfo" @pageChange="searchWidthPage"></pagination>
	    </div>
		</page-content-layout>		
	</div>
	
</template>

<script type="text/javascript">
import PageContentLayout from '../components/page_content_layout'
import RewardItem from '../components/RewardItem'
import pagination from '../../../components/pagination'

export default {
	components: { 
		PageContentLayout,
		RewardItem,
		pagination
	},
	data() {
		return {
			rewardList: [],
			// 分页信息
      pageInfo: {
        num_pages: 1, //总页码数
        current_page: 1, //当前页码
        total_count: 0 //数据总条目数
      },
		}
	},
	created() {
		this.getRewardList(1);
	},
	methods: {
    getRewardList(page) {
    	const rewardUrl = '/cy_task/reward/detail_list/';
      const that = this;
      that.request.get(rewardUrl, {
      	params: {
      		page: page,
      		count: 20
      	}
      }).then((res) => {
        if (res.data.error_code === 0) {
          that.rewardList = res.data.reward_detail_list;
          that.pageInfo.total_count = res.data.total_num;
          that.pageInfo.num_pages = res.data.total_num/20;
        } else {
          that.$elementMessage(res.data.error_msg, 'error');
        }
      })
    },
		// 表头宽度计算
    labelHead(h, {column, $index}) {
      let labelSize = 16;
      column.minWidth = column.label.length * labelSize + 28;
      return h('div', {style: {padding: 0, width: '100%'}}, [column.label]);
    },
    // 分页改变时搜索
    searchWidthPage(page) {
      const that = this;
      that.pageInfo.current_page = page;
      that.getRewardList(page);
    },
	}
}
	
</script>

<style lang="scss" scoped>
.el-button {
	margin-bottom: 20px;
	float: right;
}
.el-table {
	margin-bottom: 20px;
}
.active-button {
	color: #409eff;
}
</style>
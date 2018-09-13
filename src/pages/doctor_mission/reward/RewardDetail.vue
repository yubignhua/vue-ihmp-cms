<template>
	<div>	
		<page-content-layout>
	      <div slot="content_body">
	      	<el-form :model="rewardDetail" label-width="120px">
            <el-col>
              <el-form-item label="系统ID" prop="detail_id">
	              <span>{{ rewardDetail.detail_id }}</span>
	            </el-form-item>
	            <el-form-item label="小组名称" prop="group_name">
		            	<span>{{ rewardDetail.group_name }}</span>
	            </el-form-item>
	            <el-form-item label="oa项目" prop="oa_name">
		            	<span>{{ rewardDetail.oa_name }}</span>
	            </el-form-item>
	            <el-form-item label="备注说明" prop="remark">
	            	<span>{{ rewardDetail.remark }}</span>
	            </el-form-item>
	            <el-form-item label="活动名称" prop="activity_name">
	            	<span>{{ rewardDetail.activity_name }}</span>
	            </el-form-item>
	            <el-form-item label="个人消息" prop="personal_message">
	            	<span>{{ rewardDetail.personal_message }}</span>
	            </el-form-item>
	            <el-form-item label="发放时间" prop="reward_time">
	            	<span>{{ rewardDetail.reward_time }}</span>
	            </el-form-item>
	            <el-form-item label="总人数" prop="total_num">
	            	<span>{{ rewardDetail.total_num }}</span>
	            </el-form-item>
	            <el-form-item label="总金额" prop="total_yuan">
	            	<span>{{ rewardDetail.total_yuan }}</span>
	            </el-form-item>
	            <el-form-item label="编辑人员" prop="editor_username">
	            	<span>{{ rewardDetail.editor_username }}</span>
	            </el-form-item>
	            <el-form-item label="二级审核" prop="second_class_checker_username">
	            	<span>{{ rewardDetail.second_class_checker_username }}</span>
	            </el-form-item>
	            <el-form-item label="三级审核" prop="third_class_checker_username">
	            	<span>{{ rewardDetail.third_class_checker_username }}</span>
	            </el-form-item>
	            <el-form-item label="审核状态" prop="status">
	            	<span>{{ rewardDetail.status }}</span>
	            </el-form-item> 
	            <el-form-item v-if="rewardDetail.refuse_reason" label="拒绝理由" prop="refuse_reason">
	            	<span>{{ rewardDetail.refuse_reason }}</span>
	            </el-form-item>
	            <el-form-item label="医生详情">
	            	<el-button class="download-button" type="primary" size="mini" @click="download">奖励名单</el-button>
	            	<span>（点击可以下载文件）</span>
	            	<DoctorList :rewardDetail=rewardDetail.doctor_list></DoctorList>
	            </el-form-item>
	            <el-form-item label="发放奖励" v-if="reviewType === 'review'">
	            	<el-input class="refund-reason" type="textarea" autosize placeholder="输入拒绝理由" v-model="refuseReason"></el-input>
            		<el-button type="primary" size="mini" @click="refundDoctor('reward')">发放奖励</el-button>
            		<el-button type="primary" size="mini" @click="refundDoctor('refuse')">拒绝发放</el-button>
            	</el-form-item>
            </el-col>
          </el-form>
	        
	      </div>
	    </page-content-layout>
	</div>
</template>

<script type="text/javascript">
import PageContentLayout from '../components/page_content_layout'
import DoctorList from '../components/DoctorList'

export default {
	components: { 
		PageContentLayout,
		DoctorList
	},
	data() {
		return {
			detailId: this.$route.query.detail_id, 
			reviewType: this.$route.query.review_type,
			rewardDetail: {},
			refuseReason: ''
		}
	},
	created() {
		this.getRewardDetail();
	},
	methods: {
		// 获取奖励详情
		getRewardDetail() {
			const that = this;
			const detailUrl = '/cy_task/reward/get_detail/';
			that.request.get(detailUrl, {
				params: {
					detail_id: that.detailId
				}
			}).then((res) => {
				let data = res.data;
				if (data.error_code === 0) {
					that.rewardDetail = data.reward_detail;
				} else {
					that.$elementMessage(data.error_msg, 'error');
				}
			})
		},
		// 点击下载
		download() {
			const that = this;
			const downUrl = '/cy_task/reward/download_doctor_detail/';
			that.request.get(downUrl, {
				params: {
					detail_id: that.detailId
				}}).then((res) => {
				if (res.data.error_code === 0) {
					window.location.href = res.data.download_url; 
				} else {
					that.$elementMessage(res.data.error_msg, 'error');
				}
			})
		},
		// 发放奖励
		refundDoctor(type)  {
			const that = this;
			const rewardUrl = '/cy_task/reward/reward_doctor/';
			let message = '';
			if (type === 'refuse' && !that.refuseReason) {
				that.$elementMessage('拒绝发放时拒绝理由是必填项', 'error');
				return;
			}
			let data = {
				detail_id: that.detailId,
				action: type,
				refuse_reason: type === 'refuse' ? that.refuseReason : ''
			}
			type === 'refuse' ? message = '拒绝发放奖励' : message = '发放奖励';
			that.$confirm('确定' + message + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.request.post(rewardUrl, data).then((res) => {
					if (res.data.error_code === 0) {
	          that.$router.push({'name': 'reward_list'});
	        } else {
	          that.$elementMessage(res.data.error_msg, 'error');
	        }
				})
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消' + message
        });          
      });
		}
	}
}
	
</script>

<style lang="scss" scoped>
.el-table {
	width: 600px;
} 
.download-button {
	margin-bottom: 20px;
} 
.refund-reason {
	margin-bottom: 20px;
}  
</style>
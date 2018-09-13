<template>
	<div>	
		<page-content-layout>
	      <div slot="content_body">
	      	<el-form :model="reviewInfo" label-width="120px">
            <el-col>
              <el-form-item label="系统ID" prop="detail_id">
	              <span>{{ reviewInfo.detail_id }}</span>
	            </el-form-item>
	            <el-form-item label="小组名称">
		            	<el-select v-model="reviewInfo.group_name" placeholder="请选择" @change=changeGroup>
		                <el-option v-for="item in reviewInfo.manager_group_list" :key="item.group_id" :value="item.group_name"></el-option>
		              </el-select>
	            </el-form-item>
	            <el-form-item label="oa项目">
		            	<el-select v-model="reviewInfo.oa_name" filterable placeholder="请选择">
		                <el-option v-for="item in currentGroup.oa_name_list" :key="item" :value="item"></el-option>
		              </el-select>
	            </el-form-item>
	            <el-form-item label="备注说明">
	            	<el-input type="textarea" autosize placeholder="项目发送说明，特别是超支情况" v-model="reviewInfo.remark"></el-input>
	            </el-form-item>
	            <el-form-item label="活动">
	            	<el-input placeholder="活动名称" v-model="reviewInfo.activity_name"></el-input>
	            </el-form-item>
	            <el-form-item label="个人消息">
	            	<el-input type="textarea" autosize placeholder="消息内容：奖励发放的时候给医生发送个人消息，周知医生，及时查询" v-model="reviewInfo.personal_message"></el-input>
	            </el-form-item>
	            <el-form-item label="医生名单">
	            	<q-upload @complete="uploadDoctor"></q-upload>
	            	<div class="el-upload__tip">上传较慢，请勿刷新页面</div>
	            </el-form-item>
	            <!--编辑-->
	            <template v-if="reviewType === 'edit'">
		            <el-form-item label="总人数" prop="total_num">
		              <span>{{ reviewInfo.total_num }}</span>
		            </el-form-item>
		            <el-form-item label="总金额" prop="total_yuan">
		              <span>{{ reviewInfo.total_yuan }}</span>
		            </el-form-item>
	            </template>
	            <el-form-item label="医生详情" v-if="doctorList.length">
	            	<DoctorList :rewardDetail=doctorList></DoctorList>
	            </el-form-item>
	            <el-form-item>
	            	<el-button @click="onSubmit('save')">保存</el-button>
						    <el-button type="primary" @click="onSubmit('check')">{{ reviewInfo.operation_text }}</el-button>
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
import qUpload from '../../../components/qupload.vue'

export default {
	components: { 
		PageContentLayout,
		DoctorList,
		qUpload
	},
	data() {
		return {
			detailId: this.$route.query.detail_id, 
			reviewInfo: {},
			currentGroup: '',
			groupName: '',
			oaName: '',
			fileList: [],
			reviewType: this.$route.query.review_type,
			doctorList: [],
			operation_permission: "", // 人员权限
		}
	},
	created() {
		if (this.reviewType === 'create') {
			document.title = '新建奖励发放';
			this.getCreateInfo();
		} else {
			document.title = '编辑奖励发放';
			this.getReviewInfo();
		}
		this.createWebsoket();
	},
	methods: {
		// 创建奖励发放
		getCreateInfo() {
			const that = this;
			const infoUrl = '/cy_task/reward/create_detail/';
			that.request.post(infoUrl).then((res) => {
				let data = res.data;
				if (data.error_code === 0) {
					that.detailId = data.result.detail_id;
					that.reviewInfo = data.result;
					that.operation_permission = data.result.operation_permission;
				} else {
					that.$elementMessage(data.error_msg, 'error');
				}
			})
		},
		// 编辑奖励发放
		getReviewInfo() {
			const that = this;
			const detailUrl = '/cy_task/reward/get_detail/';
			that.request.get(detailUrl, {
				params: {
					detail_id: that.detailId
				}
			}).then((res) => {
				let data = res.data;
				if (data.error_code === 0) {
					var reviewInit = data.reward_detail
					that.reviewInfo = reviewInit;
					that.doctorList = reviewInit.doctor_list;
					that.operation_permission = reviewInit.operation_permission;
					reviewInit.manager_group_list.forEach((item, index) => {
						if (item.group_name === reviewInit.group_name) {
							that.currentGroup = item
						}
					})
				} else {
					that.$elementMessage(data.error_msg, 'error');
				}
			})
		},
		changeGroup(name) {
			const that = this;
			that.reviewInfo.manager_group_list.forEach((item, index) => {
				if (item.group_name === name) {
					that.currentGroup = item
				}
			})
		},
		// 上传之后给服务器发文件地址
		uploadDoctor(res) {
			const that = this;
			const uploadUrl = '/cy_task/reward/upload_doctor_detail/';
			let url = res.url;
			that.request.post(uploadUrl, {
				doctor_detail_download_url: url,
				detail_id: that.detailId
			}).then((res) => {
				if (res.data.error_code === 0) {
					that.$elementMessage('文件上传成功，请等待处理', 'info');
				} else {
					that.$elementMessage(res.data.error_msg, 'error');
				}
			})
		},
		// 点击保存或提交审核
		onSubmit(type)  {
			const that = this;
			if (!that.checkParams()) return;
			if (type === 'check') {
				that.$confirm('确定' + that.reviewInfo.operation_text + '?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        that.confirmSubmit(type);
	      }).catch(() => {
	        that.$message({
	          type: 'info',
	          message: '已取消' + that.reviewInfo.operation_text
	        });          
	      });
			} else {
				that.confirmSubmit(type);
			}
		},
		// 提交审核或保存
		confirmSubmit(type) {
			const that = this;
			const saveUrl = '/cy_task/reward/record_detail/';
			let data = {
				detail_id: that.detailId,
				group_id: that.currentGroup.group_id,
				group_name: that.reviewInfo.group_name,
				oa_name: that.reviewInfo.oa_name,
				remark: that.reviewInfo.remark,
				activity_name: that.reviewInfo.activity_name,
				personal_message: that.reviewInfo.personal_message,
				action: type
			}
			that.request.post(saveUrl, data).then((res) => {
				if (res.data.error_code === 0) {
					if ((that.operation_permission === 'second_class' || that.operation_permission == 'third_class') && type === 'check' ) {
						that.refundDoctor();
					} else {
						that.$router.push({'name': 'reward_list'});
					}
        } else {
          that.$elementMessage(res.data.error_msg, 'error');
        }
			})
		},
		// 发放奖励
		refundDoctor()  {
			const that = this;
			const rewardUrl = '/cy_task/reward/reward_doctor/';
			let data = {
				detail_id: that.detailId,
				action: 'reward',
				refuse_reason: ''
			}
      that.request.post(rewardUrl, data).then((res) => {
				if (res.data.error_code === 0) {
          that.$router.push({'name': 'reward_list'});
        } else {
          that.$elementMessage(res.data.error_msg, 'error');
        }
			});
		},
		// 检查参数
		checkParams() {
			const that = this;
			if (!that.reviewInfo.group_name) {
				that.$elementMessage('小组名称是必选项', 'error');
				return false;
			}
			if (!that.reviewInfo.group_name) {
				that.$elementMessage('oa项目是必选项', 'error');
				return false;
			}
			if (!that.reviewInfo.activity_name) {
				that.$elementMessage('活动名称是必选项', 'error');
				return false;
			}
			if (!that.reviewInfo.personal_message) {
				that.$elementMessage('个人消息是必填项', 'error');
				return false;
			}
			return true;
		},
		// websocket
		createWebsoket() {
			const that = this;
      const currentHost = location.hostname;
      const WEBSOCKET_URL = `wss://${currentHost}/cyws/ws/message?test=adddddddd`;
      const ws = new WebSocket(WEBSOCKET_URL);
      ws.addEventListener('open', () => {
        console.log('websocket opened!');
      });
      ws.addEventListener('close', () => {
        console.log('websocket closed!');
      });
      ws.addEventListener('message', (res) => {
        const data = JSON.parse(res.data);
        // 返回数据载body中
        const returnData = JSON.parse(res.data).body;
        // 返回的数据类型是cy_task_reward_doctor_detail_list_msg_type进行处理
        if (data.msg_type === 'cy_task_reward_doctor_detail_list_msg_type') {
          that.doctorList = returnData.doctor_list;
          // this.updateQAContents(tempContents);
          // this.goScroll();
        }
      });
    },
	}
}
	
</script>

<style lang="scss" scoped>
.el-select {
	width: 100%;
}
.upload {
	padding: 5px;
}
    
</style>
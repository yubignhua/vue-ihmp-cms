<template>
	<div class="permission">
		<page-content-layout>
			<div slot="content_body" style="background-color: #fff">
				<el-form :model="groupInfo">
            <el-col :md="14">
              <el-form-item label="小组名称" prop="group_name">
	              <span>{{ groupInfo.group_name }}</span>
	            </el-form-item>
	            <!-- 编辑人员 -->
	            <el-form-item label="编辑人员"></el-form-item>
	            <PersonItem :list=groupInfo.editor_username_list :reviewType=reviewType :msg="'编辑人员'" :type="'editor'"></PersonItem>
	            <!-- 二级审核 -->
	            <el-form-item label="二级审核（1w-）"></el-form-item>
	            <el-form-item prop="second_class_checker_username">
	              <span>{{ groupInfo.second_class_checker_username }}</span>
	            </el-form-item>
	            <!-- 三级审核 -->
	            <el-form-item label="三级审核（1w+）"></el-form-item>
	            <PersonItem :list=groupInfo.third_class_checker_username :reviewType=reviewType :msg="'三级审核人员'" :type="'third'" :checkOnly="'check'"></PersonItem>
	            <!-- 查看权限人员 -->
	            <el-form-item label="查看权限人员"></el-form-item>
	            <PersonItem :list="groupInfo.viewer_username_list" :reviewType=reviewType  :msg="'查看权限人员'"></PersonItem>
	            <!-- 关联OA项目 -->


	            <el-form-item label="关联OA项目"></el-form-item>
	            <!--<PersonItem :list="groupInfo.oa_name_list" :reviewType=reviewType :type="select" :msg="'关联OA项目'":notCheck="'not-check'"></PersonItem>-->
              <el-form-item style="margin-bottom: 0;" v-for="item, index in allPro" :key="item">
                <span class="person">{{ item.name }}</span>
                <template v-if="reviewType === 'review'">
                  <el-button size="mini" @click.prevent="removeProject(index)">删除</el-button>
                </template>
              </el-form-item>


              <template v-if="reviewType === 'review'">
                <el-select v-model="value" value-key="name" placeholder="请选择文章标签">
                  <el-option v-for="item in oaProjectList" :key="item.id" :label="item.name" :value="item">
                  </el-option>
                </el-select>
                  <el-button size="mini" @click.prevent="addProject(item)">确定</el-button>
              </template>








              <!-- 备注 -->
	            <el-form-item label="备注" prop="remark">
	            	<el-input v-if="reviewType === 'review'" type="textarea" autosize placeholder="请输入内容" v-model="groupInfo.remark"></el-input>
	              <span v-else>{{ groupInfo.remark }}</span>
	            </el-form-item>
	            <el-form-item v-if="reviewType === 'review'">
	            	<el-button type="primary" @click="savePermission">保存</el-button>
	            </el-form-item>
            </el-col>
          </el-form>
			</div>
		</page-content-layout>
	</div>

</template>

<script type="text/javascript">
import PageContentLayout from '../components/page_content_layout'
import PersonItem from '../components/PersonItem'

export default {
	components: {
		PageContentLayout,
		PersonItem
	},
	data() {
		return {
			groupId: this.$route.query.group_id,
			groupInfo: {},
      oaProjectList:[],
			reviewType: this.$route.query.review_type,
      allPro: [

      ],
      value:''
		}
	},
	created() {
		this.getGroupInfo();
	},
	methods: {

    //增加新项目
    addProject(){
    	this.allPro.push(this.value);
    	this.value = '';
    },
    //删除项目
    removeProject(index){
    	this.allPro.splice(index,1)
    },

    getProId(arr){
    	let submitArr = [];
    	for(let i=0;i<arr.length;i++){
        submitArr.push(arr[i].oa_id)
      }
      return submitArr;
    },

		getGroupInfo() {
			const userUrl = '/cy_task/permission/group_get/';
      const that = this;
      that.request.get(userUrl, {
      	params:{
      		group_id: that.groupId
      	}}).then((res) => {
        if (res.data.error_code === 0) {
          that.oaProjectList = res.data.oa_project_list;
          that.groupInfo = res.data.group_detail;
          that.allPro = res.data.group_detail.oa_project_list;
          that.groupInfo.third_class_checker_username = that.groupInfo.third_class_checker_username ? [that.groupInfo.third_class_checker_username] : []
        } else {
          that.$elementMessage(res.data.error_msg, 'error');
        }
      })
		},
		savePermission() {
			const that = this;
			const saveUrl = '/cy_task/permission/group_set/';
			if (!that.groupInfo.third_class_checker_username.length) {
				that.$elementMessage('必须填写三级审核人员', 'error');
				return;
			}
			if (!that.groupInfo.viewer_username_list.length) {
				that.$elementMessage('必须填写查看权限人员', 'error');
				return;
			}
			console.log('that.groupInfo::',that.groupInfo)
			let postData = JSON.parse(JSON.stringify(that.groupInfo));
			postData.editor_username_list = JSON.stringify(postData.editor_username_list);
			postData.viewer_username_list = JSON.stringify(postData.viewer_username_list);
			postData.oa_id_list = JSON.stringify(this.getProId(this.allPro));
			postData.third_class_checker_username = postData.third_class_checker_username.join('');
			that.request.post(saveUrl, postData).then((res) => {
				if (res.data.error_code === 0) {
          that.$router.push({ 'name': 'permission_list' });
        } else {
          that.$elementMessage(res.data.error_msg, 'error');
        }
			})
		}

	}
}
</script>

<style lang="scss" scoped>

</style>

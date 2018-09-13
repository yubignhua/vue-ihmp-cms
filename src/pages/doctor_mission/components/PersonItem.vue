<template>
	<div class="single-person">
    <el-form-item v-for="item, index in list" :key="item">
      <span class="person">{{ item }}</span>
      <template v-if="reviewType === 'review' && item">
      	<el-button size="mini" @click.prevent="removePerson(item)">删除</el-button>
  	</template>
    </el-form-item>
    <el-form-item v-if="reviewType === 'review'">
    	<el-input size="small" v-model="person">
    		<el-button slot="append" size="small" type="primary" @click.prevent="addPerson">确定</el-button>
    	</el-input>
    </el-form-item>
	</div>
</template>

<script type="text/javascript">
export default {
	props: ['list', 'reviewType', 'type', 'msg', 'checkOnly', 'notCheck'],
	data() {
		return {
			person: ''
		}
	},
	methods: {
		// 删除
		removePerson(item) {
			let index = this.list.indexOf(item);
      if (index !== -1) {
      	this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.list.splice(index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
		},
		// 增加
		addPerson() {
			const that = this;
			const check_user_url = '/cy_task/permission/check_user/';
			let username = that.person;
			if (that.checkOnly && that.list.length) {
				that.$elementMessage('只能有一个' + that.msg, 'error');
				return;
			}
			if (!username) {
				that.$elementMessage('请填写要添加的' + that.msg, 'error');
				return;
			}
			that.$confirm('确定添加？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	if (!that.notCheck) {
        		that.request.get(check_user_url, {
	          	params: {
	          		username: username
	          	}}).then((res) => {
			        if (res.data.error_code === 0) {
								that.list.push(username);
								that.person = '';
			        } else {
			        	that.$elementMessage(res.data.error_msg, 'error');
			        }
			      })
	          } else {
	          	that.list.push(username);
	          	that.person = ''
	          }

        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消添加'
          });
        });

		}
	}
}

</script>

<style lang="scss" scoped>
.el-input {
	width: 260px;
}
.person {
	display: inline-block;
	min-width: 100px;
}

</style>

<template>
	<div class="permission">
    <el-table border :data="rewardDetail" size="small">
  		<el-table-column label="医生id" :render-header="labelHead" header-align="center" align="center" fixed>
  			<template slot-scope="scope">
  				<span :class="!scope.row.is_normal ? 'red-color': ''">{{ scope.row.doctor_id }}</span>
  			</template>
  		</el-table-column>
  		<el-table-column label="手机号" :render-header="labelHead" header-align="center" align="center">
  			<template slot-scope="scope">
  				<span :class="!scope.row.is_normal ? 'red-color': ''">{{ scope.row.phone_num }}</span>
  			</template>
  		</el-table-column>
  		<el-table-column label="姓名" :render-header="labelHead" header-align="center" align="center">
  			<template slot-scope="scope">
  				<span :class="!scope.row.is_normal ? 'red-color': ''">{{ scope.row.name }}</span>
  			</template>
  		</el-table-column>
  		<el-table-column label="一级科室" :render-header="labelHead" header-align="center" align="center">
  			<template slot-scope="scope">
  				<span :class="!scope.row.is_normal ? 'red-color': ''">{{ scope.row.first_class_clinic_name }}</span>
  			</template>
  		</el-table-column>
  		<el-table-column label="二级科室" :render-header="labelHead" header-align="center" align="center">
  			<template slot-scope="scope">
  				<span :class="!scope.row.is_normal ? 'red-color': ''">{{ scope.row.second_class_clinic_name }}</span>
  			</template>
  		</el-table-column>
  		<el-table-column label="奖励金额（元）" :render-header="labelHead" header-align="center" align="center">
  			<template slot-scope="scope">
  				<span :class="!scope.row.is_normal ? 'red-color': ''">{{ scope.row.reward_yuan }}</span>
  			</template>
  		</el-table-column>
  	</el-table>	
	</div>
	
</template>

<script type="text/javascript">
import PageContentLayout from '../components/page_content_layout'

export default {
	props: ['rewardDetail'],
	components: { PageContentLayout },
	methods: {
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
.red-color {
	color: #ff6134;
}
	
</style>
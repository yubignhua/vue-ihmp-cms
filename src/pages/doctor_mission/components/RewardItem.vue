<template>
	<div class="reward">
		<el-table-column prop=showData.second_class_checker_username :label=label :render-header="labelHead" header-align="center" align="center" fixed></el-table-column>
		{{showData}}
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['label', 'showData'],
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
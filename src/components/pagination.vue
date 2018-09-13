<template>
  <div class="block">
    <el-pagination @current-change="pageChange" :current-page="pageInfo.current_page" :page-size="20"
                   layout="prev, pager, next, total, jumper"
                   :total="pageInfo.total_count">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: [
      'pageInfo'
    ],
    methods: {
      pageChange(page) {
        this.$emit('pageChange', page);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .block {
    background-color: #FFFFFF;
  }
</style>

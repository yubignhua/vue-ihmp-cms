<template>
  <div class="my_quick_search">
    <el-input placeholder="请输入内容" v-model="quickSearchRequest.search" size="mini"
              @keyup.enter.native="submitRequest">
      <el-select v-model="quickSearchRequest.search_type" slot="prepend" placeholder="请选择" class="qs_select">
        <el-option v-for="qsType in quickSearch" :key="qsType.value" :label="qsType.verbose"
                   :value="qsType.value"></el-option>
      </el-select>
      <el-button slot="append" size="mini" icon="el-icon-search" @click="submitRequest"></el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: 'quick_search',
    props: [
      'quickSearchRequest',
      'quickSearch'
    ],
    methods: {
      submitRequest() {
        this.$emit('qsRequest', this.quickSearchRequest);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .my_quick_search {
    display: inline-block;
    margin-left: 10px;

    .qs_select {
      width: 100px;
    }
  }
</style>

<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <!--<tags-view></tags-view>-->
      <app-main></app-main>
      <el-tooltip placement="top" content="tooltip">
        <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="0"></back-to-top>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import BackToTop from '@/components/BackToTop'

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    BackToTop
  },
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../assets/style/mixin.scss';

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>

<template>
  <div class="app-wrapper">
    <Sidebar></Sidebar>
    <div class="main-container">
      <Navbar :levelList=list></Navbar>
      <app-main></app-main>
    </div>
    
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AppMain from './AppMain'
 
export default {
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  data() {
    return {
      list: [{
        path: '/doctor_mission/mission', 
        redirect: '/doctor_mission/mission/mission_list',
        meta: {title: "春雨管理系统|医生任务系统"},
      }],
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

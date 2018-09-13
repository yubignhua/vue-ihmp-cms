<template>
  <div class="user_info_container">
    <transition name="fade" mode="out-in">
      <!--<keep-alive :include='cachedViews'>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </transition>
  </div>
</template>

<script>
  //import { mapState,mapMutations,mapActions } from 'vuex'
  //import {ToastPlugin,AlertPlugin} from 'vux'
  //将 vux toastPlugin 对象注入 vue组件 可以调用 toastPlugin相关方法 => this.$vux.show()
  //Vue.use(ToastPlugin);
  //Vue.use(AlertPlugin);
  export default {
    computed: {
      cachedViews() {
        //return this.$store.state.tagsView.cachedViews
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../assets/style/mixin';
  .task_list{
    .card_container{
      padding:30px;
      padding-top:10px;
      .m_task{
        margin-top:30px;
        width:400px;
      }
      .task_item2{
        .m_task{
          float: left;
          margin-right:30px;
          clear: both;
        }
      }
      .el-card__body{
        padding: 0;
      }
      .el-button--default{
        width:100%;
        border-radius: 0;
        border:none;
        border-bottom:1px solid #dcdfe6;

      }
      .el-button--medium{
        width:100%;
        border-radius:0;
      }
      .el-radio-button__inner{
        border-top:none;
        border-left:none;
        border-bottom:none;
        border-radius: 0;
      }

    }
  }


</style>


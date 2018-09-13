<template>
  <scroll-bar>
     <div class="logo_wrapper">
       <img src="../../../../../assets/images/logo.png" width="70%" alt="">
     </div>
     <div class="slidebar-top">
       <router-link :to="{path:'/crm/v_ihmp/main/menu_list'}" style="border-right: solid 1px #8a8585;">
          <div ><svg-icon size='28px'  color="#fff" icon-class="home" /></div>
       </router-link>
       <router-link :to="{path:'/crm/v_ihmp/main/operationFlow'}">
           <div><svg-icon size='25px'  color="#fff" icon-class="tree" /></div>
       </router-link>
     </div>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
    <!--<el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="" text-color="" active-text-color="">-->
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
export default {
  components: { SidebarItem, ScrollBar },
  data(){
  	return{
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },

  method:{

  },
  mounted(){
  	console.log('permission_routers===',this.permission_routers)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .scroll-wrapper{
    .logo_wrapper{
      height: 50px;
      background: #002140;
      img{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top:10px;
      }
    }
    .slidebar-top{
      height:50px;
      background: #1f2d3d;
      //border:solid 1px rgb(191, 203, 217);
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      div:nth-child(1){
        border-right:solid 1px #8a8585;
      }
      div{
        flex: 1;
        box-sizing: border-box;
        position: relative;
        .wrapper_span{
          .svg-icon{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top:10px;
          }
        }

      }
    }
  }

</style>

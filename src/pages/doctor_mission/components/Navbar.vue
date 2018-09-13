<template>
	<div class="container">
		<el-menu class="navbar" mode="horizontal">
			<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index)  in levelList" :key="index" v-if='item.meta.title'>
            <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
            <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
       <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span class="user-avatar">{{name}}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <span style="display:block;">{{name}}</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>


      </el-dropdown>
    </div>
		</el-menu>

	</div>
	
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import Hamburger from '@/components/Hamburger'
import { generateTitle } from '@/assets/mUtils/utils/i18n'

export default {
  props: [ 'levelList' ],
  components: {
    Hamburger
  },
	computed: {
	    ...mapGetters([
	      'sidebar',
	      'name',
	      'roles'
	    ])
	},
	methods: {
	    toggleSideBar() {
	      this.$store.dispatch('toggleSideBar');
	      this.changeHamburger();

	    },
	    changeHamburger(){
	      let state = Cookies.get('sidebarStatus')
	      if(state == 1){
	        this.sty = {left:'36px'};
	      }else if(state == 0){
	        this.sty = {left:'180px'};
	      }
	    },
	    logout() {
	      this.$store.dispatch('LogOut').then(() => {
	        this.$router.push({ name: 'login', query: { 'jump_page': 'jumpPage' }});
	      })
	    }
	}
}
	
</script>

<style lang="scss" scoped>	
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  position: fixed;
  right: 0;
  z-index:100;
  box-sizing: border-box;
  left: 180px;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
      }
    }
  }
}
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  }
</style>
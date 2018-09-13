<template>
  <div class="login-container">
    <div class="container">
      <div>
        <img class="login_img" src="../../../assets/images/welcome.png" alt="">
      </div>
      <div style="border:solid 1px #ececec;box-sizing: border-box;overflow: hidden;">
        <div class="left_img"><img src="//static.chunyuyisheng.com/@/media/images/2018/08/13/7a1f/229beba3bf99_w600_h410_.png" alt=""></div>
        <el-form class="login-form" autoComplete="on" :model="ruleForm2" ref="ruleForm2" label-position="left">
          <div class="title-container">
            <!--<h3 class="title">{{$t('login.title')}}</h3>-->
            <h3 class="title">集成化健康管理平台</h3>
            <lang-select class="set-language"></lang-select>
          </div>
          <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
            <el-input name="username" type="text" v-model="ruleForm2.account" autoComplete="on" placeholder="username" />
          </el-form-item>

          <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
            <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="ruleForm2.password" autoComplete="on" placeholder="password" />
            <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
          </el-form-item>

          <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="submitForm('ruleForm2')">{{$t('login.logIn')}}</el-button>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import { isvalidUsername } from '@/assets/mUtils/utils/validate'
  import LangSelect from '@/components/LangSelect'
  import {mapActions} from 'vuex'
  import {validPhone} from '../../../assets/mUtils/validate'
  import Cookies from 'js-cookie'


  export default {
    components: { LangSelect },
    name: 'login',
    data() {
      return {
        passwordType: 'password',
        loading: false,
        ruleForm2: {
          username:Cookies.get('mPhone')||'',
          password: Cookies.get('pass')||'',
        },
        rules2: {
          account: [
            {message: '请填写正确的手机号码',trigger: 'blur',validator:validPhone},
          ]
        },
        jumpPage: this.$route.query.jump_page
      }
    },
    methods: {
      ...mapActions(['getUerInfo']),
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      /**
       * 登录方法
       * @param formName
       */
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            Cookies.set('mPhone', this.ruleForm2.account);
            Cookies.set('pass', this.ruleForm2.pass);
            this.loading = true;
            that.getUerInfo(that.ruleForm2).then((res)=>{
              this.loading = false;
              if(res.username){
                //登录成后的跳转
                if (that.jumpPage) {
                  that.$router.push({ name: 'mission_list'});
                } else {
                  that.$router.push({path:'/crm/v_ihmp/main/menu_list'})
                }
              }
              if(res.error_msg){
                that.$notify.error({
                  title  : '错误',
                  message: res.error_msg || '登录失败'
                })
              }
            }).catch( err =>{
              this.loading = false;
            })
          }
        })
      },
      /**
       * 重置
       * @param formName
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted(){
      console.log('colllkie;::',document.cookie)
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #feff31;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: #FFFFFF;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #666;
        height: 47px;
        &:-webkit-autofill {
          //-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          /*-webkit-text-fill-color: #fff !important;*/
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    //background-color: $bg;
    .login_img{
      height: 60px;
      margin-bottom: 50px;
    }
    .container{
      margin: auto;
      margin-top:50px;
      height:410px;
      width:1122px;

    }
    .left_img{
      float: left;
      height: 410px;
    }
    .login-form {
      /*position: absolute;*/
      /*left: 0;*/
      /*right: 0;*/
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
      float: left;
      margin-top:40px;
      margin-bottom:0;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        font-weight: 400;
        color: #443e3e;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>

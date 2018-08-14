<template>
    <div class="operationflow">
      <div class="line_arrow pos1"><div class="line" ></div><div class='abc'></div></div>
      <div class="line_arrow pos2"><div class="line" ></div><div class='abc'></div></div>
      <div class="line_arrow pos3"><div class="line" ></div><div class='abc'></div></div>
      <div class="line_arrow pos4"><div class="line" ></div><div class='abc'></div></div>

      <div class="o_top o_item">
        <el-button type="success">营销工具</el-button>
        <el-button type="success">营销活动配置</el-button>
      </div>
      <div class="o_left o_item">
        <el-button type="danger">基本信息</el-button>
        <el-button type="danger">行为信息</el-button>
        <el-button type="danger">服务信息</el-button>
      </div>
      <div class="o_right o_item">
        <el-button type="warning">DRM</el-button>
        <el-button type="warning">HRM</el-button>
        <el-button type="warning">ARM</el-button>
      </div>
      <div class="center"><el-button type="primary">任务列表</el-button></div>
      <div class="bottom"><el-button type="warning" plain>创建指派任务</el-button></div>
    </div>
</template>

<script>
	//import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';
	//import { mapState,mapMutations,mapActions } from 'vuex'
	//import {ToastPlugin,AlertPlugin} from 'vux'
	//将 vux toastPlugin 对象注入 vue组件 可以调用 toastPlugin相关方法 => this.$vux.show()
	//Vue.use(ToastPlugin);
	//Vue.use(AlertPlugin);
	export default {
		//components: {Toast, XHeader,},
		//mixins: [MixinSetInterval, MixinRouterState],
		//props: ['goBack'],
		data(){
			return {}
		},
		//computed: {},
		//methods: {},
		//created () {},
		//mounted(){},
		//updated () {},
	};
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../assets/style/mixin.scss';
  .operationflow{
    width:600px;
    margin:auto;
    margin-top:50px;
    position: relative;
    height:600px;
    .el-button{
      display: block;
      margin-top:20px;
      margin-left:auto;
      margin-right:auto;
      width:130px;
    }
    .o_item{
      border: dashed 3px #396fce;
      border-radius: 10px;
      padding:20px;
      position: absolute;
      .el-button:nth-child(1){
        margin-top:0;
      }
    }
    .o_left{
      left:0;
      top:250px;
    }
    .o_right{
      right:0;
      top:250px;
    }
    .o_top{
      top:0;
      left:50%;
      margin-left:-95px;
      margin-top:30px;
    }
    .center{
      position: absolute;
      top:50%;
      left:50%;
      margin-left:-75px;
    }
    .bottom{
      position: absolute;
      bottom:0;
      left:50%;
      margin-left:-75px;

    }

  }
  .line_arrow{
    position: absolute;
    .abc:after {
      content: " ";
      display: inline-block;
      height: 8px;
      width: 8px;
      border-width: 2px 2px 0 0;
      border-color: #ab180d;
      border-style: solid;
      -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      -moz-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      -ms-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
      margin-top: -4px;
      position: absolute;
      right:0;
    }
    .line{
      border:solid 1px #ab180d;
      width:100%;
      position: relative;
      top:1px;
    }
  }
  .pos1{
    left: 175px;
    width: 45px;
    top: 335px;
  }
  .pos2{
    right: 175px;
    width: 65px;
    top: 335px;
    transform: rotate(180deg);
  }
  .pos3{
    left:50%;
    margin-left:-75px;
    width: 145px;
    top: 240px;
    transform: rotate(90deg);
  }
  .pos4{
    left:50%;
    margin-left:-95px;
    width: 185px;
    bottom: 140px;
    transform: rotate(-90deg);
  }



</style>

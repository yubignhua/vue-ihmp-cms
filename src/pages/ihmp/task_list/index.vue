<template>
    <div class="task_list">
       <div class="card_container">
         <el-card shadow="always" class="m_task" >
           <el-button type="primary"><svg-icon size="20px" icon-class="table" />  任务管理-任务列表</el-button>
         </el-card>
       <div class="task_item2">
         <el-card shadow="always" class="m_task" >
           <el-button type="success"><svg-icon size="20px" icon-class="peoples" />  CRM-用户信息</el-button>
           <div>
             <el-radio-group>
               <el-radio-button size="medium" label="基本信息"></el-radio-button>
               <el-radio-button size="medium" label="行为信息"></el-radio-button>
               <el-radio-button size="medium" label="服务记录"></el-radio-button>
             </el-radio-group>
           </div>
         </el-card>

         <el-card shadow="always" class="m_task" >
           <el-button type="warning"><svg-icon size="20px" icon-class="other" /> CRM-营销配置</el-button>
           <div>
             <el-radio-group>
               <el-radio-button size="medium" label="营销活动配置"></el-radio-button>
               <el-radio-button size="medium" label="营销工具"></el-radio-button>
             </el-radio-group>
           </div>
         </el-card>
       </div>


         <div>
           <el-card shadow="always" class="m_task" >
             <el-button type="danger"><svg-icon size="20px" icon-class="clipboard" />  CRM-其他设置 </el-button>
             <div>
               <el-radio-group>
                 <el-radio-button size="medium" label="权限分组"></el-radio-button>
                 <el-radio-button size="medium" label="人员管理"></el-radio-button>
                 <el-radio-button size="medium" label="顾问管理"></el-radio-button>
               </el-radio-group>
             </div>
           </el-card>
         </div>



       </div>
    </div>
</template>

<script>
	//import { mapState,mapMutations,mapActions } from 'vuex'
	//import {ToastPlugin,AlertPlugin} from 'vux'
	//将 vux toastPlugin 对象注入 vue组件 可以调用 toastPlugin相关方法 => this.$vux.show()
	//Vue.use(ToastPlugin);
	//Vue.use(AlertPlugin);
	export default {
		//components: {Toast, XHeader,},
		//mixins: [MixinSetInterval, MixinRouterState],
		//props: ['goBack'],
    data () {
      return {
       // radio3: '上海',
      };
    }
		//computed: {},
		//methods: {},
		//created () {},
		//mounted(){},
		//updated () {},
	};
</script>
<style lang="scss" rel="stylesheet/scss">
   @import '../../../assets/style/mixin.scss';
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

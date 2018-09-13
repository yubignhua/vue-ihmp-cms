<template>
  <div class="user-base-info">
    <el-main>
      <!--头部搜索表单------------>
      <div>
        <span style="font-size: 20px;font-weight: bold;color: #666;float: left">OA项目数据库</span>
        <el-button type="success" round icon="el-icon-plus" style="float: right;margin-right: 15px;margin-bottom: 10px;"
                   @click="dialogFormVisible = true">新增项目
        </el-button>
      </div>
      <!--表格数据------------>
      <div class="table_container" style="margin-top: 20px;">
        <el-table
          :stripe='true'
          v-loading="loading"
          :data="tableData">
          <el-table-column
            fixed
            prop="id"
            label="系统ID"
            min-width="130">
          </el-table-column>
          <el-table-column
            prop="code"
            label="项目编码"
            min-width="150">

          </el-table-column>
          <el-table-column
            prop="name"
            label="OA项目名称"
            min-width="150">

          </el-table-column>
          <el-table-column
            prop="operator_username"
            label="最后修改人员"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="created_time"
            label="创建时间"
            min-width="150">
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button @click="showEditModel(scope.$index,scope.row)" type="primary">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <!--footer------------>
    <el-footer style="background: white;border-top: solid 1px #f4f4f4;">
      <div class="show_num">显示第 <span>{{getCurPage}}</span> 到第 <span>{{tableDataSize+getCurPage-1}}</span> 条记录,总共 <span>{{allPageNum}}</span>
        条记录
      </div>
      <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="pageSize" @current-change="handleCurrentChange" :total="allPageNum"></el-pagination>
    </el-footer>

    <!--新建项目窗口-->
    <el-dialog :visible.sync="dialogFormVisible" title="新建项目">
      <el-form :model="newProForm">
        <el-form-item label="项目编码" :label-width="formLabelWidth">
          <el-input v-model="newProForm.code" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="OA项目名称" :label-width="formLabelWidth">
          <el-input v-model="newProForm.name" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(newProForm,1)">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑项目窗口-->
    <el-dialog :visible.sync="dialogEditVisible" title="编辑项目">
      <el-form :model="editForm">
        <el-form-item label="项目编码" :label-width="formLabelWidth">
          <el-input v-model="editForm.code" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="OA项目名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" auto-complete="off" style="width:400px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm(editForm,0)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {
    mapState,
    mapActions,
    mapMutations
  } from 'vuex';
  import {validPhone} from '../../../assets/mUtils/validate';
  export default {
    data() {
      return {
        formLabelWidth: '120px',
        tableHeight : $('.table_container').height(),
        dialogFormVisible : false,
        dialogEditVisible:false,
        pageSize : 20,
        formInline : {
          query : '',
          curPage : 1,
        },
        //编辑项目
        editForm : {
          code:'',
          name:'',
          oa_id:'',
        },
        //新建项目
        newProForm : {
          code:'',
          name:'',
        },
        //表单检验
        rules : {
          name : [
            {required : true,message : '请输入活动名称',trigger : 'blur'},
            {min : 1,max : 40,message : '长度在 3 到 5 个字符',trigger : 'blur'}
          ],
          phone : [
            {required : true,message : '请填写正确的手机号码',trigger : 'blur',validator : validPhone},
            {type : 'number',message : '电话必须为数字值',trigger : 'blur'},
          ],
        },
        //table loading 开关 ture(显示加载蒙版)/false(隐藏蒙版)
        loading : false,
        curProId:0

      };
    },
    computed : {
      ...mapState('OA_maintenance',{
        //列表数据
        tableData: state => state.userInfoList,
        tableDataSize : state => state.userInfoList.length,
        //当前页数
        curPage : state => state.curPage,
        allPageNum : state => state.allPageNum,
        countPerPage : state => state.countPerPage
      }),
      getCurPage(){
        return (this.curPage - 1) * 20 + 1
      },
    },
    methods : {




      ...mapActions('OA_maintenance',[
        'searchBaseInfo',//查询用户信息
      ]),


      initForm(){
        this.editForm = {
          code:'',
          name:'',
          oa_id:'',
        }
        //新建项目
        this.newProForm = {
          code:'',
          name:'',
        }
      },

      /**
       * 分页回调方法
       * @param value
       */
      handleCurrentChange(value){
        this.loading = true;
        this.formInline.curPage = value;
        this.getSearchList(this.formInline)
      },
      /**
       * 获取查询列表
       * @param opts
       */
      getSearchList(opts){
        let that = this;
        this.searchBaseInfo(opts).then(res =>{
          if (res.error_code === 0){
            that.$nextTick(() =>{
              that.loading = false;
            })
          } else{
            this.$notify.error({
              title : '错误',
              message : res.error_msg
            })
          }
        }).catch(() =>{
          this.$notify.error({
            title : '错误',
            message : '网络错误请重新再试'
          });
        })
      },
      /**
       * 提交表单
       * @param form
       */
     submitForm(form,state){
        this.request.post('/cy_task/oa_project/record_oa/',form).then(res=>{
        	if(res.data.error_code === 0){
        		this.$notify.success({
        			title:"成功",
              message:res.data.error_meg,
            });
            this.dialogEditVisible = false;
            this.dialogFormVisible = false;
            this.getSearchList(this.formInline);
            this.initForm();
          }else{
            this.$notify.error({
              title:"失败",
              message:res.data.error_meg,
            })
          }
        })
      },

      /**
       * 显示编辑弹窗
       */
      showEditModel(index,row){
        this.dialogEditVisible = true;
        this.editForm.oa_id = row.id;
        this.editForm.name = row.name;
        this.editForm.code = row.code;
      },
    },
    mounted(){
      this.getSearchList(this.formInline);
      this.tableHeight = $('.table_container').height();
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../assets/style/mixin.scss';
  .main-container{
    background:#f0f2f5;
  }
  .user-base-info {
    .el-main {
      background: #f0f2f5;
      color: #333;
      text-align: center;
      .el-tag {
        cursor: pointer;
      }
    }
    .el-table .cell {
      text-align: center;
    }
    .el-footer {
      margin: 0 20px;
      height: 100px;
      background: #B3C0D1;
      .show_num {
        //@include ct();
        color: #303133;
        margin-top: 20px;
        margin-left:15px;
        display: inline-block;
        span {
          color: #409EFF
        }
      }
      .el-pagination{
        float: right;
        margin-top: 20px;
      }
    }
  }


</style>

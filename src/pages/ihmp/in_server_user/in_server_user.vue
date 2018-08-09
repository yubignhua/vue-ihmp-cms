<template>
  <div class="wait_distribution">
    <!--tab 组件-->
    <el-tabs class="m-tabls" v-model="activeName2" @tab-click="handleClick">
      <!--tab1-->
      <el-tab-pane label="血压用户" name="first">
        <div class="user-base-info">
          <el-main>
            <!--头部搜索表单------------>
            <div class="top_search">
              <el-form :inline="true" :model="formInline" ref="formName" onsubmit="return false" class="demo-form-inline" style="float: left;margin-left: 20px;">
                <el-form-item label="">
                  <el-input v-model="formInline.query" v-on:keyup.enter.native="onSearchSubmit('formName')"  placeholder="请输入您要查询的内容"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" size="small" @click="onSearchSubmit('formName')">查询</el-button>
                </el-form-item>
              </el-form>

            </div>
            <!--表格数据------------>
            <div class="table_container">
              <el-table
                @row-click="changeTo"
                :stripe='stripe'
                v-loading="loading"
                :data="tableData">
                <el-table-column
                  fixed
                  prop="user_name"
                  label="姓名"
                  min-width="130">
                  <template slot-scope="scope">
                    <a style="color:#409EFF;cursor: pointer">{{scope.row.user_name}}</a>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="user_cellphone"
                  label="手机号"
                  min-width="150">
                </el-table-column>

                <el-table-column
                  prop="start_time"
                  label="服务开始"
                  min-width="150">
                </el-table-column>

                <el-table-column
                  prop="end_time"
                  label="服务结束"
                  min-width="150">
                </el-table-column>

                <el-table-column
                  prop="doctor_name"
                  label="医生"
                  min-width="130">
                </el-table-column>

                <el-table-column
                  prop="assistant_name"
                  label="医助"
                  min-width="130">
                </el-table-column>

                <el-table-column
                  prop="goods_name"
                  label="商品名称"
                  min-width="150">
                </el-table-column>

                <el-table-column
                  prop="user_remarks"
                  label="用户备注"
                  min-width="250">
                </el-table-column>

                <el-table-column prop="user_custom_tags" label="标签" min-width="150">
                  <template slot-scope="scope">
                    <el-tag  @click.native.stop="changeTag(scope.$index, scope.row.user_id)">
                      {{scope.row.user_custom_tags?scope.row.user_custom_tags:"+"}}
                    </el-tag>
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="140" fixed="right">
                  <template slot-scope="scope">
                    <template v-if="scope.row.order_type == 3">
                      <el-button type="danger" @click.native.stop="bloodUpdate(scope.$index,scope.row.user_id,scope.row.service_id)" size="small" icon="el-icon-upload">动态血压上传</el-button>
                    </template>
                  </template>
                </el-table-column>

                <el-table-column label="日历" width="100" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-date" @click.native.stop="showCalendar(scope.$index,scope.row.user_id)" size="small">日历</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-main>
          <!--footer------------>
          <el-footer style="background: white;border-top: solid 1px #f4f4f4;">
            <div class="show_num">显示第 <span>{{getCurPage}}</span> 到第 <span>{{tableDataSize+getCurPage-1}}</span> 条记录,总共 <span>{{allPageNum}}</span> 条记录</div>
            <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="20" @current-change="handleCurrentChange" :total="allPageNum"></el-pagination>
          </el-footer>

          <!--购买弹窗-->
          <el-dialog title="续期" :visible.sync="dialogAddEditVisible">
            <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="name"  size="small">
                <el-input :disabled="true" v-model="editForm.user_name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="cellphone">
                <el-input :disabled="true" type="tel" v-model="editForm.user_cellphone" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="血压健康" prop="goods_name">
                <el-select @change="selectChage" v-model="editForm.goods_name" placeholder="请选择">
                  <el-option key="1" label="1个月" value="1"/>
                  <el-option key="3" label="3个月" value="3"/>
                  <el-option key="6" label="6个月" value="6"/>
                  <el-option key="12" label="12个月" value="12"/>
                </el-select>
              </el-form-item>
              <el-form-item label="购买日期" prop="pay_time">
                <el-date-picker value-format="yyyy-MM-dd" v-model="editForm.pay_time" type="date" placeholder="选择日期" />
              </el-form-item>
              <el-form-item label="有效期(月)" prop="valid_period"  size="small">
                <el-input :disabled="true" v-model="editForm.valid_period" size="small"></el-input>
              </el-form-item>
              <el-form-item  label="数量" prop="num"  size="small">
                <el-input :disabled="true" v-model="editForm.num" size="small"></el-input>
              </el-form-item>
              <el-form-item label="总价" prop="total_price"  size="small">
                <el-input v-model="editForm.total_price" size="small"></el-input>
              </el-form-item>
              <el-form-item label="购买方式" prop="pay_type">
                <el-select v-model="editForm.pay_type" placeholder="请选择">
                  <el-option key="1" label="买" value="1"/>
                  <el-option key="2" label="赠" value="2"/>
                </el-select>
              </el-form-item>
              <el-form-item label="商品备注" prop="remark">
                <el-input type="textarea" v-model="editForm.goods_remarks"></el-input>
              </el-form-item>

              <el-form-item label="医生" prop="name"  size="small">
                <el-input :disabled="true" v-model="editForm.doctor_name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="医助" prop="name"  size="small">
                <el-input :disabled="true" v-model="editForm.assistant_name" size="small"></el-input>
              </el-form-item>


            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogAddEditVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
            </div>
          </el-dialog></el-dialog>

          <!--病情日历-->
          <div v-if="dialogFormVisible">
            <el-dialog :visible.sync="dialogFormVisible">
              <full-calendar :events="fcEvents" locale="zh" lang="zh" @eventClick="dateClick" @changeMonth="changeMonth"></full-calendar>
            </el-dialog>
          </div>

          <!--动态上传血压-->
          <div v-if="dialogVisible1">
            <el-dialog title="动态上传血压" :visible.sync="dialogVisible1" width="70%">
              <span>
                <q-upload @complete="upComplete" qClass="my-upload" :isUpload="dialogVisible1"></q-upload>
              </span>
            </el-dialog>
          </div>




        </div>
      </el-tab-pane>
      <!--tab2 -->
      <el-tab-pane label="血糖用户" name="second">暂无数据</el-tab-pane>
    </el-tabs>



  </div>
</template>

<script>
  import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'
  import moment from 'moment';
  import {validPhone} from '../../../assets/mUtils/validate'
  import DateAdd from '../../../assets/mUtils/calcDate'
  const PURCHASE = '/cdm/purchase/add/';
  //修改病人标签接口
  const EDITREMARK = '/cdm/user/edit/';
  //日历查询接口
  const CADLENDAESEARCH = '/cdm/user/pressure/calendar/list/';

  //动态血压上传
  const UP_BP = '/cdm/user/pressure/report/upload/';
  import qUpload from '../../../components/qupload.vue'





  export default {
    //mixins: [MixinSetInterval, MixinRouterState],
    components:{'full-calendar': require('vue-fullcalendar'),qUpload},
    data() {
      return {
        tableHeight:$('.table_container').height(),
        stripe:true,
        index:0,
        patientId:'',
        service_id:'',
        activeName2: 'first',
        dialogFormVisible: false,
        dialogVisible1:false,
        fcEvents: [],
        formInline : {
          query  : '',
          curPage:'1'
        },
        //新增用户表单状态
        ruleForm: {
          name: '',
          phone: '',
          remark: '',
          weixinId: '',
          type: [],
        },
        // 购买用户表单状态
        editForm:{
          user_name: '',
          user_cellphone: '',
          goods_remarks: '',
          total_price:'',
          num:1,
          valid_period:'',
          pay_time:'',
          pay_type:'',
          goods_name:'',
          assistant_name:'',
          doctor_name:'',


        },
        //表单检验
        rules: {
          goods_name:[{required: true, message: '请选择血压健康', trigger: 'change', type: 'string' }],
          pay_type:[
            { required: true,message: '请选购买方式'},
          ],
          pay_time:[
            { required: true,message: '请选择购买日期'},
          ],

          phone: [
            { required: true, message: '请填写正确的手机号码',trigger: 'blur',validator:validPhone},
            { type: 'number', message: '电话必须为数字值',trigger: 'blur'},
          ],
        },
        //购买用户弹窗开关
        dialogAddEditVisible:false,

        formLabelWidth: '90px',
        //loading 开关
        loading:true,
        curItem:0,//记录当前修改的用户id
      };
    },

    watch: {
      'formInline.name': function(newState){
        this.SET_NAME(newState);
      },
    },

    computed:{
      ...mapState('inServerUser',{
        //列表数据
        tableData: state => state.userInfoList,
        tableDataSize:state=>state.userInfoList.length,
        //当前页数
        curPage: state => Number(state.searchInfo.page),
        allPageNum:state => state.allPageNum,
        countPerPage:state=>state.countPerPage
      }),
      ...mapMutations('healthManage',[
        //更改列表标签
        'CHANGETAG'
      ]),
      getCurPage(){
        return (this.curPage-1)*20+1
      },

    },
    methods: {
      ...mapActions('inServerUser',[
        'searchBaseInfo',//查询用户信息
      ]),
      ...mapMutations('inServerUser',[
        'SET_NAME',
        'SET_PHONE',
      ]),

      handleClick(tab, event) {
        console.log(tab, event);
      },

      /**
       * 初始化编辑状态
       */

      initPayState(){
        this.editForm.user_name = '';
        this.editForm.user_cellphone = '';
        this.editForm.goods_remarks = '';
        this.editForm.total_price = '';
        this.editForm.num = 1;
        this.editForm.valid_period = '';
        this.editForm.pay_time = '';
        this.editForm.pay_type = '';
        this.editForm.goods_name = '';
      },



      /**
       * 续期
       * @param form
       */
      async submitEditForm(){
        let that = this;
        console.log('------',that.editForm);
        const valid = await new Promise((resolve, reject) => {
          that.$refs.editForm.validate( valid => valid ? resolve(valid) : reject(valid))
        });
        if(valid){
          this.editForm.goods_name = `血压健康${this.editForm.goods_name}个月`;
          const res = await this.request.post(PURCHASE,that.editForm);
          that.dialogAddEditVisible = false;
          if(res.data.error_code===0){
            this.initPayState();
            that.$notify({
              type: 'success',
              title:'成功',
              message:'用户信息修改成功',
            });
            if(that.curPage === 1){
              that.formInline.curPage = 1;
              this.loading = true;
              this.getSearchList(this.formInline)
            }
          }else {
            that.$notify.error({
              title  : '错误',
              message: res.data.error_msg
            })
          }

        }
      },

      /**
       * 提交查询用户信息
       * @param formName
       */
      async onSearchSubmit(formName) {
        if(this.formInline.name === '' && this.formInline.phone === '')
          this.$message({
            message: '请输入查询内容',
            type: 'warning'
          });
        else
          this.getSearchList(this.formInline)
      },

      /**
       * 动态血压上传成功回调
       */
      upComplete(res){
        console.log('res.url===',res.url,res.fileName);
        this.updateBP(res);
      },
      /**
       * 动态血压上传
       */
      async updateBP(data){
      	console.log('this.tableData.service_id:',this.tableData.service_id)
      	console.log('this.patientId:',this.patientId)
        const result = await this.request.post(UP_BP,{url:data.url,filename:data.fileName,user_id:this.patientId,service_id:this.service_id});
        if(result.data.error_code === 0){
          this.getSearchList(this.formInline)
          this.$notify({
            type: 'success',
            title:'成功',
            message:result.data.error_msg,
          });
        } else{
          this.$notify({
            type: 'success',
            title:'成功',
            message:result.data.error_msg,
          });
        }


      },


      bloodUpdate(index,user_id,service_id){
        this.dialogVisible1=true;
        this.service_id = service_id;
        this.patientId = user_id;
      },





      /**
       * 分页回调方法
       * @param value
       */
      handleCurrentChange(value){
        console.log('value',value)
        console.log('this.curPage',this.curPage)
        console.log('this.allPageNum',this.allPageNum);
        if(!this.curPage) return;
        if(value == this.curPage) return;
        this.loading = true;
        this.formInline.curPage = value;
        this.getSearchList(this.formInline)

      },
      /**
       * 跳转用户详情
       */
      changeTo(row){
        this.$router.push({ path: '/cdm/cdm_cms/layout/healthRecord/edit_user_info',query: { service_id: row.service_id }});
        console.log('row.user_id',row.user_id);
        this.$store.commit('SET_CUR_PATINET_ID',row.user_id);
        this.$store.commit('SET_SERVICE_ID',row.service_id);
        this.$store.commit('SET_CUR_PATINET_INFO',row);
      },
      /**
       * 编辑用户方法
       * @param index
       * @param dataList
       */
      editRow(index, dataList) {
        this.initPayState();
        let dataItem = dataList[index];
        //更改编辑表格状态
        this.curItem = index;
        this.editForm.user_name = dataItem.user_name;
        this.editForm.user_cellphone = Number(dataItem.user_cellphone);
        this.editForm.goods_remarks = dataItem.goods_remarks;
        this.editForm.assistant_name = dataItem.assistant_name;
        this.editForm.doctor_name = dataItem.doctor_name;
        this.editForm.service_id = dataItem.service_id;
        //显示弹窗
        this.dialogAddEditVisible = true;
      },

      /**
       * 计算日期和花费
       */
      selectChage(value){
        let num = Number(value);
        //let newDate  =  DateAdd( "m ",num,new  Date());
        this.editForm.valid_period = num;
        switch (num){
          case 1:this.editForm.total_price = 1500;break;
          case 3:this.editForm.total_price = 4500;break;
          case 6:this.editForm.total_price = 6000;break;
          case 12:this.editForm.total_price = 8000;break;
        }
      },

      /**
       * 获取查询列表
       * @param opts
       */
      getSearchList(opts){
        let that = this;
        this.searchBaseInfo(opts).then(res => {
          if(res.error_code === 0){
            that.$nextTick(() => {
              that.loading = false;
            })
          }else{
            this.$notify.error({
              title:'错误',
              message:res.error_msg
            })
          }
        }).catch(() => {
          this.$notify.error({
            title  : '错误',
            message: '网络错误请重新再试'
          });
        })
      },
      /**
       * 请求更改标签
       * @param para
       */
      async requestChangeTag(DataMap){
        const result = await this.request.post(EDITREMARK,DataMap);
        return result;
      },
      /**
       * 请求查询日历
       * @param para
       */
      async reqCalendar(start,end){
        const result = await this.request.get(CADLENDAESEARCH,{params:{end_date:end,start_date:start,user_id:this.userId}});
        return result;
      },
      /**
       * 更改标签
       * @param index
       * @param tableData
       */
      changeTag(index, id){
        this.$prompt('请修改用户标签', {
          inputValue:this.tableData[index].user_custom_tags,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          this.requestChangeTag({custom_tags:value,user_id:id}).then((res) => {
            if (res.data.error_code === 0) {
              console.log('value:::',value);
              this.CHANGETAG({value, index});
              this.$message({
                type: 'success',
                message: '更改成功'
              });
            }
          }).catch((res) => {
            this.$message({
              type: 'error',
              message: res.data.error_msg
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      /**
       * 展示用户病情日历
       * @param index
       * @param id
       */
      showCalendar(index, id){
        //展示弹窗并存储 userid
        this.dialogFormVisible = true;
        this.userId = id;
      },

      /**
       * 更改月份事件
       */
      changeMonth(start, end, current){
        let curDate = moment(current).format('YYYY-MM-DD');
        let startTime = moment(current).startOf('month').format('YYYY-MM-DD');
        let endTime = moment(current).endOf("month").format('YYYY-MM-DD');
        console.log(curDate,startTime,endTime);
        this.fcEvents = [];
        this.reqCalendar(startTime,endTime).then(res=>{
          //console.log('////////',res.data.pressure_list);
          if(res.data.pressure_list.length<=0) return;
          let newData = this.dealBpData(res.data.pressure_list);
          //console.log('new Data:::',newData)
          if(res.data.error_code === 0){
            this.fcEvents = [...newData]
          }else{
            this.$notify.error({
              title  : '错误',
              message: '网络请求失败请重新再试'
            });
          }
        })
      },


      /**
       * 日历时间点击提醒事件
       * @param value
       */
      dateClick(event){
        console.log(event);
        this.$alert(event.title, {
          confirmButtonText: '确定',
        });

      },

      /**
       * 处理血压数据
       */
      dealBpData(arr){
        if(!arr || arr.length <= 0) return;
        let mArr = [];
        for(let i=0;i<arr.length;i++){
          let mObj = {},item = arr[i];
          mObj.title = `血压:${item.high_pressure}/${item.low_pressure},测量时间:${item.upload_time}`;
          mObj.start = item.upload_time.split(' ')[0];
          if(item.high_pressure_status === 1 || item.high_pressure_status === 2 || item.low_pressure_status === 1 || item.low_pressure_status === 2){
            mObj.cssClass = 'red';
          }else{
            mObj.cssClass = 'blue';
          }
          mArr.push(mObj);
        }
        return mArr;
      },



    },

    mounted(){
      this.tableHeight=$('.table_container').height();
      this.getSearchList(this.formInline)
    },


  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../../assets/style/mixin.scss';

  .wait_distribution{
    .top_search{
      box-shadow:none!important;
      padding: 0 !important;

    }
    .table_container{
      box-shadow:none!important;
    }
    .m-tabls{
      padding-left:30px;
      padding-top:10px;
      .el-tabs__content{

      }
      .user-base-info{
        .el-main {
          background: #f0f2f5;
          color: #333;
          text-align: center;
          background: #ffffff;
        }
        .el-table .cell{
          overflow: hidden;
          white-space: nowrap;
        }
        .el-footer {
          height: 100px;
          background: #B3C0D1;
          .show_num{
            //@include ct();
            color: #303133;
            span{
              color: #409EFF
            }
          }
        }
      }

    }

  }


</style>

<template>
  <div class="ehr_list">
    <page-content-layout>
      <div slot="content_body">
        <!--家庭档案信息-->
        <div class="table_title ehr_table_title">
          <h3>家庭档案信息</h3>
          <el-button icon="el-icon-plus" type="primary" @click="showEhrEditForm('create')" size="mini">新增</el-button>
        </div>
        <el-table :data="ehrList" class="ehr_table" size="small">
          <el-table-column label="序号" :render-header="labelHead" header-align="center" align="center" fixed>
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="relation_verbose" label="与用户关系" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="born_time" label="出生日期" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="age" label="年龄" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column label="手机号码" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.cellphone.length">{{scope.row.cellphone.substring(0,3)+'********'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="身份证号" :render-header="labelHead" header-align="center" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.identity_card.length">{{scope.row.identity_card.substring(0,4)+'**************'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="nation" label="民族" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column label="现居地" :render-header="labelHead" header-align="center" align="center">

            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>现居地: {{ scope.row.location }}</p>
                <div slot="reference">
                  <span>{{ scope.row.location.split('/')[0] }}</span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="past_history" label="既往病史" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="family_history" label="家族遗传史" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="height" label="身高" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="weight" label="体重" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="allergic_history" label="过敏史" width="150" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="due_date" label="预产期" width="90" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" width="300" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column label="操作" :render-header="labelHead" header-align="center" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button icon="el-icon-edit" type="primary" @click="showEhrEditForm('update',scope.row)"
                         size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--顾问参考信息-->
        <div class="table_title profile_table_title">
          <h3>顾问参考信息</h3>
        </div>
        <el-table :data="profileList" class="profile_table" size="small">
          <el-table-column label="序号" :render-header="labelHead" header-align="center" align="center" fixed>
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="relation" label="与用户关系" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="age" label="年龄" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="qa_times" label="问题个数" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
          <el-table-column prop="clinic_stats" label="咨询科室" :render-header="labelHead" header-align="center"
                           align="center"></el-table-column>
        </el-table>

        <!--ehr表单-->
        <el-dialog :title="ehrActionType==='create'?'新增档案':'编辑档案'" :visible.sync="showEhrForm" top="5vh"
                   class="edit-ehr-dialog">
          <el-form :model="ehrInfo" ref="ehrForm" :rules="ehrRules" label-width="120px">
            <el-row>
              <el-col :md="12" :sm="24">
                <el-form-item label="关系" prop="relation">
                  <el-select v-model="ehrInfo.relation" placeholder="请选择关系">
                    <el-option v-for="relation in relationList" :key="relation.value" :label="relation.verbose"
                               :value="relation.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :md="12" :sm="24">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ehrInfo.name" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="ehrInfo.sex" placeholder="请选择性别">
                  <el-option v-for="sex in sexList" :key="sex.value" :label="sex.verbose"
                             :value="sex.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="出生年月" prop="born_time">
                <el-date-picker type="date" v-model="ehrInfo.born_time" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="手机号码" prop="cellphone">
                <el-input v-model="ehrInfo.cellphone" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="身份证" prop="identity_card">
                <el-input v-model="ehrInfo.identity_card" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="民族" prop="nation">
                <el-select v-model="ehrInfo.nation" filterable placeholder="请选择民族">
                  <el-option v-for="nation in nationList" :key="nation.value" :label="nation.verbose"
                             :value="nation.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24" :sm="24">
              <el-form-item label="现居地" prop="location">
                <el-input placeholder="请输入内容" v-model="ehrInfo.location" class="input-with-select">
                  <el-cascader placeholder="请选择城市" :options="cityData" :props="cityProps" v-model="ehrCity" clearable
                               filterable change-on-select
                               @change="getCityData" slot="prepend"></el-cascader>
                </el-input>
              </el-form-item>

            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="体重(kg)" prop="weight">
                <el-input v-model="ehrInfo.weight" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="身高(cm)" prop="height">
                <el-input v-model="ehrInfo.height" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="过敏史" prop="allergic_history">
                <el-input v-model="ehrInfo.allergic_history" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="24">
              <el-form-item label="预产期" prop="dur_date">
                <el-date-picker type="date" v-model="ehrInfo.due_date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="24" :sm="24">
              <el-form-item label="既往病史" prop="past_history">
                <el-input type="textarea" v-model="ehrInfo.past_history" placeholder="请输入既往病史(300字以内)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" :sm="24">
              <el-form-item label="家族遗传病史" prop="family_history">
                <el-input type="textarea" v-model="ehrInfo.family_history" placeholder="请输入家族遗传病史(300字以内)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" :sm="24">
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="ehrInfo.remark" placeholder="请输入备注(300字以内)"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button v-if="ehrActionType==='create'" type="primary" @click="createEhr">保 存</el-button>
            <el-button v-if="ehrActionType==='update'" type="primary" @click="updateEhr">保 存</el-button>
            <el-button @click="showEhrForm = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </page-content-layout>
  </div>
</template>

<script>
  import {getNation, getSexList} from '../../../assets/mUtils/mData'
  import {cityData} from '../../../assets/mUtils/city_data'
  import PageContentLayout from '../page_content_layout/page_content_layout'
  import {validPhone, validIdCard, validHeight, validWeight} from '../../../assets/mUtils/validate'

  const ehrUrl = '/api/crm/user/user_id/ehr/'; //家庭档案信息
  const profileUrl = '/api/crm/user/ehr/profile/'; //顾问参考信息
  const confUrl = '/api/crm/filter_conf/'; //枚举值
  const createEhrUrl = '/api/crm/user/user_id/ehr/create/'; //创建家庭健康档案
  const updateEhrUrl = '/api/crm/user/ehr/ehr_id/update/'; //更新家庭健康档案

  export default {
    name: 'ehr_list',
    components: {PageContentLayout},
    data() {
      return {
        userId: 0,
        sexList: [], //性别
        nationList: [], //民族
        relationList: [], //关系
        ehrList: [], //家庭档案
        profileList: [], //顾问参考信息
        showEhrForm: false,
        ehrActionType: '',
        ehrInfo: {
          relation: '', //关系
          name: '', //姓名
          sex: '', //性别
          nation: '汉族', //民族
          cellphone: '', //手机
          identity_card: '', //身份证号
          born_time: '', //出生日期
          location: '', //现居住地
          past_history: '', //既往病史
          family_history: '', //遗传病史
          height: '', //身高
          weight: '', //体重
          allergic_history: '', //过敏史
          due_date: '', //预产期
          remark: '' //备注
        },
        ehrRules: {
          relation: [{required: true, message: '请选择关系', trigger: 'change'}],
          cellphone: [{required: false, validator: validPhone}],
          identity_card: [{required: false, validator: validIdCard}],
          past_history: [{max: 300, message: '既往病史不能超过300字', trigger: 'blur'}],
          family_history: [{max: 300, message: '家族遗传史不能超过300字', trigger: 'blur'}],
          remark: [{max: 300, message: '备注不能超过300字', trigger: 'blur'}],
          height: [{required: false, validator: validHeight}],
          weight: [{required: false, validator: validWeight}]
        },
        ehrCity: [], //城市信息
        ehrCityValue: '',
        cityData: [],
        cityProps: {
          value: 'name',
          label: 'name',
          children: 'child'
        }
      }
    },
    created() {
      this.userId = this.$route.params.userId || 0;
      this.sexList = getSexList;
      this.nationList = getNation;
      this.cityData = cityData;
      this.getRelationList();
      this.getEhrList(this.userId);
      this.getProfileList(this.userId);
    },
    methods: {
      // 获取家庭档案信息
      getEhrList(userId) {
        let _this = this;
        let getUrl = ehrUrl.replace('user_id', userId);
        _this.request.get(getUrl).then((res) => {
          if (res.data.error_code === 0) {
            for (var ehr of res.data.ehr_list) {
              if (ehr.sex === 'f') {
                ehr.sex = '女';
              } else if (ehr.sex === 'm') {
                ehr.sex = '男';
              }
            }
            _this.ehrList = res.data.ehr_list;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 获取顾问参考信息
      getProfileList(userId) {
        let _this = this;
        _this.request.get(profileUrl, {
          params: {
            user_id: userId
          }
        }).then((res) => {
          if (res.data.error_code === 0) {
            for (var profile of res.data.profile_list) {
              if (profile.sex === 'f') {
                profile.sex = '女';
              } else if (profile.sex === 'm') {
                profile.sex = '男';
              }
            }
            _this.profileList = res.data.profile_list;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 获取关系
      getRelationList() {
        let _this = this;
        _this.request.get(confUrl, {
          params: {
            keys: 'relation'
          }
        }).then((res) => {
          if (res.data.error_code === 0) {
            _this.relationList = res.data.filter_list[0].enum_items;
          } else {
            _this.$elementMessage(res.data.error_msg, 'error');
          }
        })
      },
      // 获取城市信息
      getCityData(value) {
        this.ehrCityValue = value;
      },
      // 重置ehr信息
      resetEhrInfo() {
        this.ehrInfo.relation = '';
        this.ehrInfo.name = '';
        this.ehrInfo.sex = '';
        this.ehrInfo.nation = '汉族';
        this.ehrInfo.identity_card = '';
        this.ehrInfo.cellphone = '';
        this.ehrInfo.born_time = '';
        this.ehrInfo.location = '';
        this.ehrInfo.past_history = '';
        this.ehrInfo.family_history = '';
        this.ehrInfo.height = '';
        this.ehrInfo.weight = '';
        this.ehrInfo.allergic_history = '';
        this.ehrInfo.due_date = '';
        this.ehrInfo.remark = '';
      },
      // 显示ehr表单
      showEhrEditForm(ehrActionType, ehrInfo) {
        this.ehrCity = [];
        this.ehrActionType = ehrActionType;
        if (ehrActionType === 'create') {
          this.resetEhrInfo();
        }
        if (ehrInfo) {
          this.ehrInfo = JSON.parse(JSON.stringify(ehrInfo));
          if (ehrInfo.location.length) {
            let locationData = ehrInfo.location.split('/');
            if (locationData[0]) {
              this.ehrCity = locationData[0].split(',');
              console.log(this.ehrCity);
            }
            if (locationData[1]) {
              this.ehrInfo.location = locationData[1];
            }
          }
        }
        this.$resetFormValid('ehrForm');
        this.showEhrForm = true;
      },
      // 创建ehr
      createEhr() {
        let _this = this;
        let postUrl = createEhrUrl.replace('user_id', _this.userId);
        _this.ehrInfo.location = _this.ehrCityValue + '/' + _this.ehrInfo.location;
        _this.$refs['ehrForm'].validate((valid, object) => {
          if (valid) {
            _this.request.post(postUrl, _this.ehrInfo).then((res) => {
              if (res.data.error_code === 0) {
                _this.$elementMessage('用户家庭档案创建成功！', 'success');
                _this.showEhrForm = false;
                _this.getEhrList(_this.userId);
                _this.resetEhrInfo();
              } else {
                _this.$elementMessage(res.data.error_msg, 'error');
              }
            })
          } else {
            console.log('error submit in create ehr:', object);
            return false;
          }
        });
      },
      // 更新ehr
      updateEhr() {
        let _this = this;
        let postUrl = updateEhrUrl.replace('ehr_id', _this.ehrInfo.id);
        _this.ehrInfo.location = _this.ehrCityValue + '/' + _this.ehrInfo.location;
        _this.$refs['ehrForm'].validate((valid, object) => {
          if (valid) {
            _this.request.post(postUrl, {
              relation: _this.ehrInfo.relation,
              name: _this.ehrInfo.name,
              sex: _this.ehrInfo.sex,
              nation: _this.ehrInfo.nation,
              cellphone: _this.ehrInfo.cellphone,
              identity_card: _this.ehrInfo.identity_card,
              born_time: _this.ehrInfo.born_time,
              location: _this.ehrInfo.location,
              past_history: _this.ehrInfo.past_history,
              family_history: _this.ehrInfo.family_history,
              height: _this.ehrInfo.height,
              weight: _this.ehrInfo.weight,
              allergic_history: _this.ehrInfo.allergic_history,
              due_date: _this.ehrInfo.due_date,
              remark: _this.ehrInfo.remark
            }).then((res) => {
              if (res.data.error_code === 0) {
                _this.$elementMessage('用户家庭档案更新成功！', 'success');
                _this.showEhrForm = false;
                _this.getEhrList(_this.userId);
                this.resetEhrInfo();
              } else {
                _this.$elementMessage(res.data.error_msg, 'error');
              }
            })
          } else {
            console.log('error submit in create ehr:', object);
            return false;
          }
        });
      },
      // 阻断最后一级显示
      rejectLast(value) {
        console.log('before-filter:', value);
      },
      // 表头宽度计算
      labelHead(h, {column, $index}) {
        let labelSize = 16;
        column.minWidth = column.label.length * labelSize + 28;
        return h('div', {style: {padding: 0, width: '100%'}}, [column.label]);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .ehr_list {
    .el-input,
    .el-select {
      width: 100%;
    }
    .create_ehr_btn {
      margin: 15px 0;
    }
    .ehr_table {
      width: 100%;
    }
    .profile_table {
      width: 100%;
    }
    .table_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;

      &.profile_table_title {
        margin-top: 15px;
      }
    }
    .input-with-select {
      .el-input-group__prepend {
        background: none;
        padding: 0;
        border: none;
        width: 40%;
        .el-cascader {
          width: 100%;
        }
      }
    }
  }
</style>

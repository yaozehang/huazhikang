<template>
  <div class="add-hazardFactors ">
    <div class="add-project-title border-bottom">
      <el-button class="title-btn" type="text">新增危害因素</el-button>
    </div>
    <div class="content clearfix">
      <div class="addForm">
         <el-form ref="hazard" :model="hazard" :rules="rules" label-width="120px" style="width:80%; margin:0 auto;">
        <el-form-item label="危害因素" required prop="hazardName">
          <el-input v-model="hazard.hazardName"  @blur="getCode"></el-input>
        </el-form-item>
        <el-form-item label="拼音简码" required prop="pinyinCode">
            <el-input v-model="hazard.pinyinCode"  readonly></el-input>
        </el-form-item>
         <el-form-item label="唯一标识" >
            <el-input v-model="hazard.uniqueIdentifier" ></el-input>
        </el-form-item>
        <el-form-item label="组合项目">
          <el-select v-model="hazard.testItem" multiple  filterable remote reserve-keyword placeholder="请输入组合项目" 
            :remote-method="getGruopInfo"  :loading="loading" style="width:100%" @change="changeTestItem">
            <el-option v-for="(item,index) in DetailedList"  :key="index"  :label="item.iName"  :value="item.iId">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="备注" >
            <el-input v-model="hazard.remark" ></el-input>
        </el-form-item>
        <el-form-item label="危害因素种类" >
            <el-radio-group v-model="hazard.harmType" style="width:100%" >
            <el-radio :label="1" >化学因素</el-radio>
            <el-radio :label="2" >物理因素</el-radio>
          </el-radio-group>
        </el-form-item>
         <div class="my-factor">
            <div class="ChemicalFactors" v-if="hazard.harmType === 1">
            <my-factors :factors="ChemicalFactors"></my-factors>
          </div>
         <div class="PhysicalFactors" v-else>
            <my-factors :factors="PhysicalFactors"></my-factors>
          </div>
        </div>
        <el-form-item style="margin-top:20px;">
          <el-button type="primary" @click="addHarm('hazard')" :disabled="disable">保存</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
      </div>
      <div class="tabs-right">
        <div class="tabs-list">
          <el-tabs :tab-position="tabPosition" :tab-click="clickTabs" type="border-card" style="height: 90%;">
            <el-tab-pane label="规则">
               <add-rule  v-bind:ruleData="ruleData" ></add-rule>
            </el-tab-pane>
            <el-tab-pane label="GBZ标准岗前">
             <div class="text-textarea">
                <el-input  type="textarea" :autosize="{ minRows: 36, maxRows: 42}" placeholder="请输入内容" v-model="hazard.textarea1">
            </el-input>
            </div>
            </el-tab-pane>
            <el-tab-pane label="GBZ标准岗中">
              <div class="text-textarea">
                <el-input  type="textarea" :autosize="{ minRows: 36, maxRows: 42}" placeholder="请输入内容" v-model="hazard.textarea2">
                </el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="GBZ标准岗后">
              <div class="text-textarea">
                <el-input  type="textarea" :autosize="{ minRows: 36, maxRows: 42}" placeholder="请输入内容" v-model="hazard.textarea3">
                </el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="GBZ标准应急检查">
              <div class="text-textarea">
                <el-input  type="textarea" :autosize="{ minRows: 36, maxRows: 42}" placeholder="请输入内容" v-model="hazard.textarea4">
                </el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="GBZ标准检查周期">
              <div class="text-textarea">
                <el-input  type="textarea" :autosize="{ minRows: 36, maxRows: 42}" placeholder="请输入内容" v-model="hazard.textarea5">
                </el-input>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import MyFactors from './MyFactors.vue'
import  MyFactors from './add-factor.vue'
import AddRule from './add-rule.vue'
import qs from 'qs'
const item = {
  rule1: '',
  contrastValue1: '',
  rule2: '',
  contrastValue2: '',
  handlingOpinions: '',
  handlingTime: ''
}
const detailedItem = {
  detailedValue: ''
}
export default {
  name: 'AddHazardFactors',
  components: {
    MyFactors,
    AddRule,
  },
  data () {
    return {
      tabPosition: 'top',
      hazard: {
        hazardName: '',
        pinyinCode: '',
        uniqueIdentifier: '',
        remark: '',
        hazardDetail: '',
        textarea1:'',
        textarea2: '',
        textarea3: '',
        textarea4: '',
        textarea5: '',
        testItem: '',
        harmType: 1,
      },
      ruleData: [],
      detailedData: [],
      detailedItem: detailedItem,
      DetailedList: [],
      tempList: [],
      rightList: [],
      sysdetalItem: [],
      item:{iName:'',iId:''},
      loading: false,
      disable: false,
      rules : {
        hazardName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        pinyinCode: [
          { required: true, message: '请输入拼音简码', trigger: 'blur' }
        ],
      },
      rule: ['包含','不包含', '大于', '大于等于', '小于', '小于等于', '等于于', '不等于'],
      ChemicalFactors: [
      {
        name: 'PC-TWA参考值',
        value: '',
        unit: ''
      }, {
        name: 'PC-STEC参考值',
        value: '',
        unit: ''
      }, {
        name: 'MAC参考值',
        value: '',
        unit: ''
      }],
      PhysicalFactors: [
      {
        name: '接触限值1',
        value: '',
        unit: ''
      }, {
        name: '接触限值2',
        value: '',
        unit: ''
      }, {
        name: '接触限值3',
        value: '',
        unit: ''
      }],
    }
  },
  methods: {
    clickTabs(val){
    },
    errMsg(msg) {
      return this.$message({
        message: msg,
        type: 'error',
        center: true,
        duration: 1000
        })
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,
        type: 'success',
        center: true,
        duration: 1000
        })
    },
    // selectdetalItemByName.do 参数：projiectName
    getGruopInfo(query) {
      this.loading = true
      if (query !== '') {
        let data = {
        projiectName: query
      }
      this.axios.post('/selectdetalItemByName.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.DetailedList= []
            this.loading = false
            res.data.one.map((item,index)=> {
               this.DetailedList.push({iName:item.iName,iId:item.iId})
               return  this.DetailedList
            })
          }else{
            console.log(res)
          }
      }) 
      } else {
        this.DetailedList = []
      }
    },
    // alphabeticBrevityCodeHName.do
    getCode(){
      let name = this.hazard.hazardName
      let data ={
        name: this.hazard.hazardName
      }
       this.axios.post('/alphabeticBrevityCodeHName.do', qs.stringify(data))
        .then((res) => {
            if (res.status ===200) {
              if(res.data ==='名字重复'){
                this.hazard.hazardName = name
                this.errMsg(res.data)
                this.disable = true
              }else{
                this.hazard.pinyinCode = res.data
                this.disable = false
              }
            }else{
              console.log(res)
            }
        })
    },
    changeTestItem(val){
      let temp = []
      val.map((item,index) => {
        temp.push({iId:item})
      })
      this.sysdetalItem = temp
    },
//     addSysHarm.do 参数：h_name,h_py_name,h_number,h_bak, h_typeofhazardfacto,h_pc_twareferencevalue,h_pc_twaunits,
// h_pc_stecreferencevalue,h_pc_stecunits,h_macreferencevalue,h_macunits,h_postBefore,h_postIn,  h_postAfter,h_contingency,h_checkCycle,sysdetalItem[{i_id}],
// sysDetailItemContrastT[{dcrule1:xx,dccontrastvalue1:xx,dcrule2:xx,dccontrastvalue2,dccontrastresult:xx,dccontrastresultdate:xx}]
 addHarm(hazard){
   let sysDetailItemContrast = JSON.stringify(this.ruleData)
   let sysdetalItem = JSON.stringify(this.sysdetalItem) 
   var  typeofhazardfacto
   var twareferencevalue, twaunits, stecreferencevalue,stecunits,macreferencevalue,macunits
   if(this.hazard.harmType === 1) {
    typeofhazardfacto = '化学因素'
    twareferencevalue = this.ChemicalFactors[0].value
    twaunits = this.ChemicalFactors[0].unit
    stecreferencevalue = this.ChemicalFactors[1].value
    stecunits = this.ChemicalFactors[1].unit
    macreferencevalue = this.ChemicalFactors[2].value
    macunits = this.ChemicalFactors[2].unit
   }else if(this.hazard.harmType === 2) {
    typeofhazardfacto = '物理因素'
    twareferencevalue = this.PhysicalFactors[0].value
    twaunits = this.PhysicalFactors[0].unit
    stecreferencevalue = this.PhysicalFactors[1].value
    stecunits = this.PhysicalFactors[1].unit
    macreferencevalue = this.PhysicalFactors[2].value
    macunits = this.PhysicalFactors[2].unit
   }
   let data = {
    h_name: this.hazard.hazardName,
    h_py_name:this.hazard.pinyinCode,
    h_number: this.hazard.uniqueIdentifier,
    h_bak: this.hazard.remark,
    h_typeofhazardfacto:typeofhazardfacto,
    h_pc_twareferencevalue: twareferencevalue,
    h_pc_twaunits: twaunits,
    h_pc_stecreferencevalue: stecreferencevalue,
    h_pc_stecunits: stecunits,
    h_macreferencevalue: macreferencevalue,
    h_macunits: macunits,
    h_postBefore: this.hazard.textarea1,
    h_postIn: this.hazard.textarea2,
    h_postAfter: this.hazard.textarea3,
    h_contingency: this.hazard.textarea4,
    h_checkCycle:this.hazard.textarea5,
    sysdetalItem: sysdetalItem,
    sysDetailItemContrastT: sysDetailItemContrast
   }
    this.$refs[hazard].validate((valid) => {
      if (valid && this.disable === false) {
      this.axios.post('/addSysHarm.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          if(res.data.msg === '名字重复') {
            this.errmsg(res.data.msg)
          } else {
            this.$router.push({path:'/wrap/project/listHF'})
          }
        }else{
          console.log(res)
        }
      })
      }
      else{
        this.errMsg('数据输入有误请重新输入')
        return false
      }
    })
 },
    chooseLeft(item,index){
      this.tempList.push(item)
      this.item = item
    },
    showRight() {
       this.rightList.push(this.item)
       this.DetailedList.splice(this.item,1)
    },
    chooseRight(item,index){
      this.item2 = item
    },
    removeRight(item2){
       this.DetailedList.push(this.item)
       this.rightList.splice(this.item,1)
    }
  }
}
</script>

<style lang="css" scoped>

.content{
  width: 100%;
  height: 100%;
  border: 1px solid #dedede; 
  margin-top: 20px;
}
.addForm,.tabs-right{
  float: left;
  border: 1px solid #dedede; 
  border-bottom: none;
}
.addForm{
  width: 40%;
}
.tabs-right{
  width: 55%;
}
.title-factors{
float:left;
padding-top:20px;
margin-right: 20px;
}

.add-list ul{
float: left;
max-height: 200px;
}
.list-right{
  height: 200px;
  
}
.list-left,.list-right{
  border: 1px solid #dedede;
  width: 35%;
  overflow:scroll;
}
.list-left li,.list-right li{
  height: 30px;
  line-height: 30px;
  margin: 10px 0;
}
.list-left li:hover,.list-right li:hover{
 background: #dedede;
}
.btns-show{
  width: 20%;
  padding: 50px 0;
}
.btns-show li{
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
  text-align: center;
  border-radius: 30px;
  border: 1px solid black;
}
.my-factor{
  /*margin-left: -20px;*/
}
@media screen and (max-width: 1507px) {
  .my-factor{
  margin-left: -20px;
}
}
@media screen and (max-width: 1507px) {
  .my-factor{
  margin-left: -40px;
}
}
@media screen and (max-width: 1383px) {
  .my-factor{
  margin-left: -60px;
}
}
@media screen and (max-width: 1318px) {
  .my-factor{
  margin-left: -80px;
  }
.ChemicalFactors{
margin-left: 6px;
  }
}
@media screen and (max-width: 1280px) {
  .my-factor{
  margin-left: -100px;
}
.ChemicalFactors{
margin-left:5px;
}
}
@media screen and (max-width: 1269px) {
  .my-factor{
  margin-left: -100px;
}
.ChemicalFactors{
margin-left:-20px;
}
}
</style>
<style>
/*多选换行显示*/
  .el-tag{
  white-space: initial; 
  }
</style>
      <template>
  <div class="add-hazardFactors ">
    <div class="add-project-title border-bottom">
      <button class="title-btn">编辑危害因素</button>
      <button class="title-btn my-return-btn" @click="goBack">返回</button>
    </div>
    <div class="content clearfix">
      <div class="addForm">
         <el-form ref="hazard" :model="hazard" label-width="120px" :rules="rules" style="width:80%; margin:0 auto;">
        <el-form-item label="危害因素" required prop="hazardName">
          <el-input v-model="hazard.hazardName"  @blur="getCode"></el-input>
        </el-form-item>
        <el-form-item label="拼音简码" required prop="pinyinCode">
            <el-input v-model="hazard.pinyinCode" ></el-input>
        </el-form-item>
         <el-form-item label="唯一标识" >
            <el-input v-model="hazard.uniqueIdentifier" ></el-input>
        </el-form-item >
         <el-form-item label="组合项目">
          <el-select v-model="hazard.testItem" multiple  filterable remote reserve-keyword placeholder="请输入组合项目" 
            :remote-method="getGruopBase"  :loading="loading" style="width:100%" @change="changeTestItem">
            <el-option v-for="(item,index) in DetailedList"  :key="item.iId"  :label="item.iName"  :value="item.iId">
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="备注" >
            <el-input v-model="hazard.remark" ></el-input>
        </el-form-item>
        <el-form-item label="危害因素种类">
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
          <el-button type="primary" @click="editHarm('hazard')" :disabled="disable">修改</el-button>
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
// import AddDetailedList from '@/components/project-common/AddDetailedList.vue'
import MyFactors from './MyFactors.vue'
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
        testItem: [],
        harmType: 1
      },
      ruleData: [],
      detailedData: [],
      detailedItem: detailedItem,
      DetailedList: [],
      tempList: [],
      rightList: [],
      sysdetalItem: [],
      item:{iName:'',iId:''},
      rule: ['包含','不包含', '大于', '大于等于', '小于', '小于等于', '等于于', '不等于'],
      ChemicalFactors: [
      {
        name: 'PC-TWA参考值',
        value: '',
        unit: 'mg/m3'
      }, {
        name: 'PC-STEC参考值',
        value: '',
        unit: 'mg/m3'
      }, {
        name: 'MAC参考值',
        value: '',
        unit: 'mg/m3'
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
      querryId : this.$route.query.itemId, //列表传过来的id
      loading: false,
      disable: false,
      page: this.$route.query.page,
      rules : {
        hazardName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        pinyinCode: [
          { required: true, message: '请输入拼音简码', trigger: 'blur' }
        ],
      },
    }
  },
  mounted() {
    this.getGruopInfo()
  },
  methods: {
    clickTabs(val){
    },
    goBack(){
      // query: {itemId: this.curPage}
      this.$router.push({path:'/wrap/project/listHF', query: {page:this.page}})
    },
    getCode(){
      let name = this.hazard.hazardName
      let data ={
        hid: this.querryId,
        name: this.hazard.hazardName
      }
       this.axios.post('/web/alphabeticBrevityCodeHName.do', qs.stringify(data))
        .then((res) => {
            if (res.status ===200) {
              if(res.data ==='名字重复') {
                this.hazard.hazardName = name
                this.disable = true
                this.$message({
                  message: res.data,
                  type: 'error',
                })
              }else{
                this.disable = false
                this.hazard.pinyinCode = res.data
              }
            }else{
              console.log(res)
            }
        })
    },
    // selectdetalItemByName.do 参数：projiectName
    getGruopBase(query) {
      this.DetailedList = []
      this.loading = true
      if (query !== '') {
        let data = {
        projiectName: query
      }
      this.axios.post('/web/selectdetalItemByName.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.DetailedList= []
            this.loading = false
            let temp = []
            let temp2=[]
            res.data.one.map((item,index)=> {
               temp.push({iName:item.iName,iId:item.iId})             
            })
            this.DetailedList = temp
          }else{
            console.log(res)
          }
      }) 
      } else {
        this.DetailedList = []
      }
    },
    changeTestItem(val){
      let temp = []
      val.map((item,index) => {
        temp.push({iId:item})
      })
      this.sysdetalItem = temp
    },
    // ：updateselectsysharmById.do参数：projectId
    getGruopInfo(){
      let data ={
        projectId: this.querryId
      }
      this.axios.post('/web/updateselectsysharmById.do', qs.stringify(data))
      .then((res) => {
        console.log(res.data)
          // console.log(res.data.one[0].hPcTwareferencevalue,res.data.one[0].hPcTwaunits)
          if (res.status ===200) {
            let data = res.data
            this.hazard.hazardName = data.one[0].hName
            this.hazard.hBak = data.one[0].remark
            this.hazard.uniqueIdentifier = data.one[0].hNumber
            this.hazard.pinyinCode = data.one[0].hPyName
            this.hazard.textarea1 = data.one[0].hPostbefore
            this.hazard.textarea2 = data.one[0].hPostin
            this.hazard.textarea3 = data.one[0].hPostafter
            this.hazard.textarea4 = data.one[0].hCheckcycle
            this.hazard.textarea5 = data.one[0].hContingency   
            if(data.one[0].hTypeofhazardfacto === '化学因素') {    //物理因素胡数学因素判断
              this.hazard.harmType = 1
              this.ChemicalFactors[0].value = data.one[0].hPcTwareferencevalue
              // this.ChemicalFactors[0].unit = data.one[0].hPcTwaunits
              this.ChemicalFactors[1].value = data.one[0].hPcStecreferencevalue
              // this.ChemicalFactors[1].unit = data.one[0].hPcStecunits
              this.ChemicalFactors[2].value = data.one[0].hMacreferencevalue
              // this.ChemicalFactors[2].unit =  data.one[0].hMacunits
            }else if (data.one[0].hTypeofhazardfacto === '物理因素') {
              this.hazard.harmType = 2
              this.PhysicalFactors[0].value = data.one[0].hPcTwareferencevalue
              this.PhysicalFactors[0].unit = data.one[0].hPcTwaunits
              this.PhysicalFactors[1].value = data.one[0].hPcStecreferencevalue
              this.PhysicalFactors[1].unit = data.one[0].hPcStecunits
              this.PhysicalFactors[2].value = data.one[0].hMacreferencevalue
              this.PhysicalFactors[2].unit =  data.one[0].hMacunits
             }  
             // console.log(this.PhysicalFactors,this.ChemicalFactors)
            let temp = []
            let temp2=[]
            let temp3=[]
            res.data.two.map((item,index)=> {
                temp3.push({iId:item.iId})
                temp2.push(item.iId)
               temp.push({iName:item.iName,iId:item.iId})             
            })
            this.DetailedList = temp
            this.hazard.testItem = temp2
            this.sysdetalItem = temp3
            data.three.map((item,index) => {
            this.ruleData.push({dcrule1:item.dcRule1, dccontrastvalue1:item.dcContrastValue1,
               dcrule2:item.dcRule2,dccontrastvalue2:item.dcContrastValue2,
               dccontrastresult: item.dcContrastResult, dccontrastresultdate:item.dcContrastResultDate})
            return this.ruleData
          })
          }else{
            console.log(res)
          }
      })
    },
// updatesysItem.do参数：projectId,h_name,h_py_name,h_number,h_bak, h_typeofhazardfacto,h_pc_twareferencevalue,h_pc_twaunits,h_pc_stecreferencevalue,h_pc_stecunits,h_macreferencevalue,h_macunits,h_postBefore,h_postIn, h_postAfter,h_contingency,h_checkCycle,sysdetalItem[{i_id}],sysDetailItemContrastT[{dcrule1:xx,dccontrastvalue1:xx,dcrule2:xx,dccontrastvalue2,dccontrastresult:xx,dccontrastresultdate:xx}]
 editHarm(hazard){
   let sysDetailItemContrast = JSON.stringify(this.ruleData)
   let tempSys = []
   let oldSysdetalItem = []
   let sysdetalItem = JSON.stringify(this.sysdetalItem) 
   let h_typeofhazardfacto ,h_pc_twareferencevalue, h_pc_twaunits, h_pc_stecreferencevalue
   let h_pc_stecunits, h_macreferencevalue, h_macunits
    if(this.hazard.harmType === 1) {
      h_typeofhazardfacto = '化学因素'
      h_pc_twareferencevalue = this.ChemicalFactors[0].value
      h_pc_twaunits = this.ChemicalFactors[0].unit
      h_pc_stecreferencevalue = this.ChemicalFactors[1].value
      h_pc_stecunits = this.ChemicalFactors[1].unit
      h_macreferencevalue = this.ChemicalFactors[2].value
      h_macunits = this.ChemicalFactors[2].unit
    }else if(this.hazard.harmType === 2) {
      h_typeofhazardfacto = '物理因素'
      h_pc_twareferencevalue = this.PhysicalFactors[0].value
      h_pc_twaunits = this.PhysicalFactors[0].unit
      h_pc_stecreferencevalue = this.PhysicalFactors[1].value
      h_pc_stecunits = this.PhysicalFactors[1].unit
      h_macreferencevalue = this.PhysicalFactors[2].value
      h_macunits = this.PhysicalFactors[2].unit
   }
   let data ={
      projectId: this.querryId,
      h_name: this.hazard.hazardName,
      h_py_name:this.hazard.pinyinCode,
      h_number: this.hazard.uniqueIdentifier,
      h_bak: this.hazard.remark,
      h_typeofhazardfacto: h_typeofhazardfacto,
      h_pc_twareferencevalue: h_pc_twareferencevalue,
      h_pc_twaunits: h_pc_twaunits,
      h_pc_stecreferencevalue: h_pc_stecreferencevalue,
      h_pc_stecunits: h_pc_stecunits,
      h_macreferencevalue: h_macreferencevalue,
      h_macunits: h_macunits,
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
        this.axios.post('/web/updatesysItem.do', qs.stringify(data))
        .then((res) => {
        if (res.data === 1 ) {
          this.$message({ message: '修改成功',type: 'success',})
          this.$router.push({path:'/wrap/project/listHF', query: {page:this.page}})
        }else{
          this.$message({message: res.data,type: 'error',})
          console.log(res)
        }
      })
      }
    })
    },
  }
};
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
.ChemicalFactors{
margin-left: -40px;
}
.PhysicalFactors{
margin-left: -40px;
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
.my-return-btn{
  background: white;
color: #1f7edd;
float: right;
margin-right: 30px;
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
margin-left:-10px;
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
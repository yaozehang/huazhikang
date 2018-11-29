<template>
  <div class="PersonalHealthList" @click="hideTree($event)">
    <div class="search-form">
       <el-form :inline="true" :model="form" class="demo-form-inline" label-width="120px">
        <div class="form-items">
          <el-form-item label="记录日期" >
            <el-date-picker  v-model="form.recordtTime"  value-format="yyyy-MM-dd"  type="date"  placeholder="选择日期"> </el-date-picker>
          </el-form-item>
           <el-form-item label="分区" style="margin-right:30px;">
            <el-input v-model="form.depart" placeholder=""   @focus="isSelectcompany = true"  id="part1" readonly   class="my-input inner-input"></el-input>
          </el-form-item>
           <el-form-item label="" >
            <el-button type="primary" @click="searchList" style="width:100px;">查询</el-button>
          </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item label="记录名称">
             <el-input v-model="form.record" placeholder="" class="inner-input"></el-input>
          </el-form-item>
           <el-form-item label="危害因素" style="margin-right:30px;">
            <el-select v-model="form.harm" multiple  filterable  placeholder="请输入关键词" class="inner-input">
              <el-option v-for="(item,index) in harmList" :key="index"  :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="" >
             <el-button type="primary" @click="addRecord">新增记录</el-button>
          </el-form-item>
        </div>
     </el-form>
             <!-- 分区树状图 多选 -->
         <div class="my-companyTree" v-show="isSelectcompany">
          <div class="company-tree">
            <el-tree :data="companyData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
             :props="defaultProps" check-strictly >
          </el-tree>
        </div>
        <div class="buttons">
          <el-button type="primary" @click="onConfirmPart">确认</el-button>
          <el-button @click="resetChecked"> 清空</el-button>
        </div>
      </div>
    <!-- 分区树状图 -->
    </div>
       <!-- 新增记录弹出框 -->
        <el-dialog title="新增记录"  width="900px" center :visible.sync="isAdd" @click="hideTree($event)">
           <el-form :inline="true"  :model="addForm"  :rules="rules" class="demo-form-inline add-form" label-width="120px">
           <div class="form-items">
              <el-form-item label="分区" style="margin-right:30px;" prop="depart"  required>
               <el-input v-model="addForm.depart" placeholder="" readonly @focus="showDepartTree"  id="part" class="common-input" ></el-input>
             </el-form-item>
             <el-form-item label="记录名称" prop="record"  required>
               <el-input v-model="addForm.record" placeholder=""   class="common-input" @focus="getTypeHarm"></el-input>
             </el-form-item>
           </div>
           <div class="form-items">
             <el-form-item label="记录日期"  style="margin-right:30px;"  prop="recordtTime"  required>
               <el-date-picker  v-model="addForm.recordtTime"  type="date" value-format="yyyy-MM-dd" placeholder="选择日期"   :picker-options="pickerOptions" class="common-input"> </el-date-picker>
             </el-form-item>
              <el-form-item label="评测人员"  prop="evaluateMan"  required>
                <el-input v-model="addForm.evaluateMan" placeholder="" class="common-input"></el-input>
             </el-form-item>
           </div>
        </el-form>
         <!-- 分区树状图 单选选 -->
        <div class="my-addTree" v-show="isSelectDerpart">
          <div class="add-tree">
            <el-tree :data="companyData" default-expand-all  show-checkbox node-key="id"  ref="tree1" highlight-current :props="defaultProps" check-strictly @check="getNode">
            </el-tree>
          </div>
       </div>
        <!-- 分区树状图  //       this.innerTable = chemistry  //化学因素 0
          // this.innerTable2 = physic  //物理因素 1  style="width:13%"-->
        <add-table :innerTable="innerTable2"  :innerTableF="innerTable"></add-table>
           <div slot="footer" class="dialog-footer my-footer-bths" >
             <el-button type="primary" @click="sureAdd()">确 定</el-button>
             <el-button>取 消</el-button>
           </div>
         </el-dialog>
     <!-- 新增记录弹出框结束-->
     <div class="type-list-title border-bottom">
        <el-button class="title-btn" type="text">评测记录列表</el-button>
    </div>
    <div class="my-table-v">
<!--  dhid  主键id -->
    <el-table :data="tableData" border stripe style="width: 97%;" :row-style="rowStyle" :header-cell-style="rowStyle"
      max-height="700"   ref="multipleTable"  >
        <el-table-column  label="序号" width="50" type="index" > </el-table-column>
        <el-table-column prop="partitionName" label="分区"  > </el-table-column>
        <el-table-column  prop="harm"  label="危害因素" >  </el-table-column>
        <el-table-column  prop="dhTime"  label="记录日期" >  </el-table-column>
        <el-table-column  prop="dhRecordName"  label="记录名称" >  </el-table-column>
        <el-table-column prop="dhName"  label="评测人" >  </el-table-column>
        <el-table-column  prop="" label="折线图" width="80">  
          <template slot-scope="scope"> 
            <!-- <span class="text-yel" @click="showGraph(scope.$index, scope.row) "> 查看</span> -->
            <el-button type="info" size="mini" @click="showGraph(scope.$index, scope.row) "> 查看</el-button>
          </template>
         </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">  
        <template slot-scope="scope">
            <!-- <span  class="text-yel ml" @click="editInfo(scope.$index, scope.row)"> 编辑</span> -->
            <el-button size="mini" @click="editInfo(scope.$index, scope.row)"> 编辑</el-button>
            <!-- <span class="text-yel" @click="delInfo(scope.$index, scope.row)"> 删除</span> -->
            <el-button size="mini" type="danger" @click="delInfo(scope.$index, scope.row)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>  
    <div class="my-pagination">
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="15" layout=" total, prev, pager, next, jumper" :total="total">
          </el-pagination>
       </div>
  </div> 
    </div>
    <!-- 编辑记录-->
     <el-dialog  class="dialog-form" title="修改记录" width="900px"  :visible.sync="isEdit">
        <edit-table :editTable="editTable" :editTableT="editTable2" :editForm="editForm"></edit-table>
        <div slot="footer" class="dialog-footer my-footer-bths" >
           <el-button type="primary" @click="sureEdit">确 定</el-button>
        </div>
    </el-dialog>
  <!-- 编辑记录 -->
  <!-- 查看折线图 -->
     <el-dialog  class="dialog-form" :title="linTitle" width="1100px"  :visible.sync="lineVisible">
        <chartchart-line :myLenged="myLenged" @changeData="changeData" :Form="Form" :myHarmList="myHarmList"
        typeName="化学" :seriesData="seriesData" :xAxisData="xAxisData" :max="max" :point="point"
         :loading="loading" :intervalNum="intervalNum" :title="title1"></chartchart-line>
        <chartchart-line :myLenged="myLenged2" @changeData="changeData2" :Form="Form1" :myHarmList="myHarmList1"
        typeName="物理" :seriesData="seriesData2" :xAxisData="xAxisData2" :max="max2" :point="point2"
         :loading="loading2" :intervalNum="intervalNum2" :title="title2"></chartchart-line>
  </el-dialog>
  <!-- 查看折线图 -->
</div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils'
import chartchartLine from '@/components/chart-line-d/chart-line.vue'
import editTable from './edit-table.vue'
import getUserInfo from 'common/js/user'
import {getDate} from 'common/js/time'
import {getZoneList,getZoneListByAuthority} from 'api/zone'
import  addTable from './add-table.vue'
const tableData =[
{
  id: 1,
  name: 'zhansan '
}]
const innerTable =[{hid: 2, hname: '化学因素', djPcTwa: '', djPcStel: '', djMac: '',
     djSampling: '', djTime:'', djState: 0}]
const innerTable2 =[{hid: 1, hname:'物理因素', djPcTwa: '', djPcStel: '', djMac: '',
      djSampling: '', djTime:'', djState: 1}]
export default {
  name: 'PersonalHealthList',
  components: {
    chartchartLine,
    editTable,
    addTable
  },
  data () {
    return {
          //       this.innerTable = chemistry  //化学因素 0
          // this.innerTable2 = physic  //物理因素 1
      innerTable: [],
      innerTable2: [],
      th: ['危害因素',  'PC-TWA','PC-STEL','MAC', '采样地点','评测时长（min)'],
      th2: ['危害因素',  '接触限值1', '接触限值1','接触限值1', '采样地点','评测时长（min)'],
      editForm: {},
      editTable: [],
      editTable2: [],
      currentPage: 1,
      total: 0,
      readOnly: true,
      testData:[],
      isSelectcompany: false,
      isSelectDerpart:false,
      isEdit: false,
      isAdd: false,
      lineVisible: false,
      companyData: [],
      tableData: tableData,
      harmList: [],
      form: {
        depart: '',
        record: '',
        recordtTime: '',
        harm: [],
      },
      addForm: {
        depart: '',
        record: '',
        recordtTime: '',
        evaluateMan: '',
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      workTypeList: [],
      zoneKey: 0,
      fileList: [],
      IsUpload: false,
      loading1: false,
      depart: '',
      editId: 0,
      graphId: 0,
      linTitle: '',
      myLenged: ['PC-TWA','PC-STEL', 'MAC'],
      myLenged2: ['接触限值1', '接触限值2', '接触限值3'],
      Form: {},
      Form1: {},
      myHarmList: [],
      myHarmList1: [],
      departName: [],
      max: 0,   //化学最大值
      max2: 0,   //物理最大值
      seriesData: [],   ////对应的数据
      xAxisData: [], //x轴的轴
      seriesData2: [],   ////对应的数据
      xAxisData2: [],  //x轴的轴
      units: '', // 单位
      point: 0,
      point2: 0,
      loading: true,
      loading2: true,
      intervalNum: 0,
      intervalNum2: 0,
      title1: '',
      title2: '',
      pid: {
        pId: getUserInfo().comPId
      },
      pickerOptions:{   //验证入库时间小于当天
        disabledDate(time){
           let _now = Date.now()
          return time.getTime() > _now 
        }
    },
    addFlag: false,
    rules: {
        depart: [{ required: true, message: '记录分区不能为空', trigger: 'blur' }],
        record: [{ required: true, message: '记录名称不能為空', trigger: 'blur' }],
        recordtTime:[{ required: true, message: '记录日期不能为空', trigger: 'blur' }],
        evaluateMan:[{ required: true, message: '记录人员不能为空', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.getZone()
    this.getHarm()
    this.searchList()
    let time = getDate()
    this.form.recordtTime = `${time.year}-${time.month}-${time.date}`
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    hideTree(e){
      if (e.target.id === '') {
        this.isSelectcompany = false
        this.isSelectDerpart = false
      }
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
    showGraph(index,row){     //  harm/selectharm.do  dhid   主键id       //查看直线图
      this.graphId = row.dhId
      let dhTime = row.dhTime.slice(0,4)
      this.linTitle = row.partitionName +  '-'+dhTime
      this.lineVisible = true
      let data={
        dhid: row.dhId
      }
      this.axios.post('/harm/selectharm.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            console.log(res.data)
            this.myHarmList = res.data.chemistry
            this.myHarmList1 = res.data.physic 
          }else{
            this.errMsg('请求失败')
          }
        })
    },
    changeData(harmid, type) {   //查询化学折线图   // 参数dhid 主键id   harmid危害因数id  type 查询的值 
      this.loading = true
       if(harmid !== undefined && type !== undefined){
          let data = {
            dhid: this.graphId,
            harmid: harmid,
            type: type
          }
          this.axios.post('/harm/selectLineChart.do', qs.stringify(data))
          .then((res) => {
          if (res.status ===200) {
            let temp =[] 
            let temp2 =[]
            res.data.Time.map((item,index) => {
              if(item){
                temp.push(item.date)   //时间
                temp2.push(item.endvalue)   //数据
              }
            })
            this.loading = false
            this.point = res.data.units.price   //参考值
            this.max = res.data.peak   //顶点值
            this.intervalNum =  (res.data.peak/20).toFixed(2)
            this.title1 = res.data.units.unit   //单位
            this.seriesData = temp2
            this.xAxisData = temp
            console.log(this.this.xAxisData)
          }else{
            this.errMsg('请求失败')
          }
        })
       } else{
          this.errMsg('查询条件不能为空')
       }
    },
    changeData2(harmid, type) {    //查询物理因素1折线图 切换折线图 物理因素1
      this.loading2 = true
      if(harmid!== '' && type !== ''){
        let data = {
          dhid: this.graphId,
          harmid: harmid,
          type: type
        }
        this.axios.post('/harm/selectLineChart.do', qs.stringify(data)).then((res) => {
        if (res.status ===200) {
           let temp =[] 
           let temp2 =[]
            res.data.Time.map((item,index) => {
              if(item){
                temp.push(item.date)   //时间
                temp2.push(item.endvalue)   //数据
              }
            })
            this.loading2 = false
            this.point2 = res.data.units.price   //参考值
            this.max2 = res.data.peak   //顶点值
            this.intervalNum2 =  (res.data.peak/20).toFixed(2)
            this.title2 = res.data.units.unit   //单位
            this.seriesData2 = temp2
            this.xAxisData2 = temp
             console.log(this.xAxisData2)
        }else{
          this.errMsg('请求失败')
        }
      })
       }else {
          this.errMsg('查询条件不能为空')
       }
    },
    onConfirmPart() {
      let temp = this.$refs.tree.getCheckedNodes()
      this.form.depart = this._filterTreeStr(temp)        //选中的名字 拼接
      this.departName =  JSON.stringify(this._arrayTree(temp))  //选中的名字集合
      this.depart= JSON.stringify(this.$refs.tree.getCheckedKeys())      //选中的id
      this.isSelectcompany = false
    },
    _arrayTree(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join(' ')
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.form.depart = ''
      this.isSelectcompany = !this.isSelectcompany
    },
    showDepartTree() {
      this.isSelectDerpart = true
       this.$refs.tree1.setCheckedKeys([this.zonekey])
    },
    // 获取新增记录的分区
    getNode(val) {
      this.zonekey = val.id
      this.addForm.depart = val.label
      this.isSelectDerpart = false
    },
    searchList() {
      let harm = JSON.stringify(this.form.harm)
      let data ={
        page: this.currentPage,
        date: this.form.recordtTime || '',
        name: this.form.record  === '' ? '' : this.form.record,
        harm: this.form.harm.length ===0 ? '[]' : harm,
        partition: this.departName.length ===0 ? '[]' : this.departName,
        comId: getUserInfo().comPId,
        roleId: getUserInfo().roleId,
        // pid: getUserInfo().cpId
        pid: JSON.stringify(getUserInfo().allPId)
      }
      this.axios.post('/selectDailyLis.do', qs.stringify(data)).then((res) => {
        if (res.status ===200) {
           this.total = parseInt(res.data.total)
           this.tableData = res.data.list
        }else{
          this.errMsg('请求失败')
        }
        })
    },
    handleCurrentChange(val) {
      let harm = JSON.stringify(this.form.harm)
      let data ={
        page: val,
        date: this.form.recordtTime || '',
        name: this.form.record  === '' ? '' : this.form.record,
        harm: this.form.harm.length ===0 ? '[]' : harm,
        partition: this.departName.length ===0 ? '[]' : this.departName,
        comId: getUserInfo().comPId,
        roleId: getUserInfo().roleId,
        pid: getUserInfo().cpId
      }
      this.axios.post('/selectDailyLis.do', qs.stringify(data)).then((res) => {
        if (res.status ===200) {
           this.total = parseInt(res.data.total)
           this.tableData = res.data.list
        }else{
          this.errMsg('请求失败')
        }
        })
    },
    getTypeHarm(){    //根据分区id查询物理因素化学因素
      let data ={
        id: this.zonekey
      }
      this.axios.post('/selectDailyHarm.do', qs.stringify(data)).then((res) => {
        if (res.status ===200) {
          let data = res.data
          let chemistry  =[] 
          let physic = []
          if(data.chemistry.length !==0){
            data.chemistry.map((item, index) =>{
              chemistry.push({hid: item.hid, hname:item.hname, djPcTwa: '', djPcStel: '', djMac: '',
              djSampling: '', djTime:'', djState: 0})
            })
            this.innerTable = chemistry  //化学因素 0
          }else{
           this.innerTable = []  //化学因素 0
          }
          if(data.physic.length !==0){
            data.physic.map((item, index) =>{
              physic.push({hid: item.hid, hname:item.hname, djPcTwa: '', djPcStel: '', djMac: '',
              djSampling: '', djTime:'', djState: 1})
            })
            this.innerTable2 = physic  //物理因素 1
          }else{
            this.innerTable2 = [] //物理因素 1
          }
          console.log(this.innerTable,this.innerTable2)
        }else{
          this.errMsg('请求失败')
        }
        })
    },
      // 新增记录
    addRecord(){
      this.isAdd = true
      this.zonekey = ''
      this.addForm.depart = ''
      let time = getDate()
      this.addForm.recordtTime = `${time.year}-${time.month}-${time.date}`
      this.addForm.record = ''
      this.addForm.evaluateMan = ''
      this.innerTable = []
      this.innerTable2 = []
    }, 
    regAddForm(){
      if(this.addForm.recordtTime !== '' && this.addForm.record !== ''&& this.addForm.evaluateMan !== ''&& this.addForm.record !== '' && this.zonekey !== ''){
        this.addFlag = true
      }else if (this.addForm.recordtTime === '') {
        this.errMsg('请输入记录时间')
        this.addFlag = false
      }else if (this.addForm.record === '') {
        this.errMsg('请输入记录名称')
        this.addFlag = false
      }else if (this.addForm.recordtTime === '') {
        this.errMsg('请输入记录时间')
        this.addFlag = false
      }
      else if (this.addForm.recordtTime === '') {
        this.errMsg('请输入记录时间')
        this.addFlag = false
      }
    },
    sureAdd(){      //添加日常危害因素 
      let addFlag = this.regAddForm()
      if (this.addFlag === false) {
        let myMessage = {
          departmentid: this.zonekey,
          dhTime: this.addForm.recordtTime,
          dhRecordName: this.addForm.record,
          dhName: this.addForm.evaluateMan,
        }
        let chemistry =JSON.stringify(this.innerTable)
        let physics =  JSON.stringify(this.innerTable2)
        let message =JSON.stringify(myMessage)
        let data ={
          message: message,
          chemistry: chemistry,
          physics: physics,
          comId: getUserInfo().comPId
        }
        this.axios.post('/adddhdailyharm.do',qs.stringify(data)).then((res) => {
          if (res.data === '添加成功') {
            this.searchList()
            this.isAdd = false
             this.sucMsg(res.data)
          }else{
            this.errMsg('请求失败')
          }
        })
        }
    },
    getHarm(){   // 模糊搜索危害因素 selectsysparm.do？name=
      this.harmList = []
      let data ={
        name: ''
      }
      this.loading1 = true
        this.axios.post('/selectsysparm.do', qs.stringify(data))
        .then((res) => {
          if (res.status ===200) {
            this.loading1 = false
            let temp = res.data
            for (var i in temp) {
               this.harmList.push({id:i,name:temp[i]}) //值
              }
          }else{
             this.errMsg('查询失败')
          }
      }) 
    },
    getZone() {
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
         this.companyData = [res]
      })
      //  getZoneList(qs.stringify(this.pid)).then((res) => {
      //   this.companyData = [res.data]
      // })
    },
    editInfo(index, row) {   //selectbyIdDhDaily.do   id       、、主键id 
      this.editId = row.dhId
      this.isEdit = true
      let data = {
        id: row.dhId
      }
      this.axios.post('/selectbyIdDhDaily.do', qs.stringify(data))
      .then((res) => {
         if (res.status ===200) {
           this.editForm = res.data.message
           this.editTable = res.data.physic  // 物理因素
           this.editTable2 = res.data.chemistry  // 化学因素
          }else{
            this.errMsg('请求失败')
          }
        })
    },
    sureEdit(){   //确认修改
      let temp1 = [], temp2 = []
      this.editTable.map((item,index) =>{  //化学因素
        temp1.push({djid: item.djid, djPcTwa: item.djPcTwa, djMac: item.djMac,djPcStel:item.djPcStel, 
            djSampling: item.djSampling, djTime:item.djTime})
      })
      this.editTable2.map((item,index) =>{   //物理因素
        temp2.push({djid: item.djid, djPcTwa: item.djPcTwa, djMac: item.djMac,djPcStel:item.djPcStel, 
            djSampling: item.djSampling, djTime:item.djTime})
      })
      let data ={
        chemistry: JSON.stringify(temp1),
        physics: JSON.stringify(temp2)
      }
      this.axios.post('/updateByIdDhDaily.do', qs.stringify(data))
      .then((res) => {
         if (res.data ==='修改成功') {
          this.isEdit = false
          this.sucMsg(res.data)
          this.searchList()
          }else{
            this.errMsg(res.data)
          }
        })
    },
    delInfo(index,row) {   //删除记录    id
    this.axios.post('/deleteByIdDhDaily.do', qs.stringify({ id: row.dhId}))
      .then((res) => {
         if (res.data === '删除成功') {
          this.sucMsg(res.data)
           this.searchList()
            this.sucMsg(res.data) 
          }else{
            this.errMsg(res.data)
          }
        })
    }
  }
};
</script>

<style lang="css" scoped>
.common-input{
  width: 200px;
}
.my-table th{
 background: #e2edf2;
 text-align: left!important;
 padding-left: 20px;
 height: 40px;
 line-height: 40px;
}
.my-table td{
   text-align: center;
 height: 40px;
 line-height: 40px;
}
.search-form{
  margin-top: 30px;
}
.inner-input{
  width: 220px;
}
.my-input .el-input__inner{
  max-width: 220px!important;
  text-overflow:ellipsis!important;
  white-space:nowrap!important;
  overflow:hidden!important;
}
.my-companyTree{
  border: 1px solid #ccc;
  width: 500px;
  position: absolute;
  top:140px;
  left: 650px;
  height: 500px;
  z-index: 300;
  background: #FFF;
  padding: 10px;
}
.company-tree{
  max-height: 450px;
  overflow-y: auto;
}
.my-addTree{
border: 1px solid #ccc;
  width: 500px;
  position: absolute;
  top:140px;
  left:20%;
  height: 500px;
  padding: 10px;
  z-index: 300;
  background: #FFF;
}
.add-tree{
  max-height: 450px;
  overflow-y: auto;
}
.buttons{
  width: 200px;
  margin: 0 auto;
}
.operate-btns{
  float: right;
}
.my-editBox{
position: absolute;
top: 0px;
left: 0px;
z-index: 300;
background: #fff;
width: 100%;
margin-left: 230px;
}
.my-uploade{
  /*float: left;*/
}
.text-yel{
  color: #f8b879;
}
.text-yel:hover{
  cursor: pointer;
}
.ml{
  margin-right: 20px;
  display: inline-block;
}
.my-table td input{
border: none;
outline: none;
height: 40px;
line-height: 40px;
text-align: center;
}
.my-table{
  width: 100%;
  border-collapse:collapse;
  border:none;
}
.my-table tr td{
  width: 13%;
  border: 1px solid #ccc;
}
.add-form{
  width: 90%;
  margin: 0 auto;
}
</style>
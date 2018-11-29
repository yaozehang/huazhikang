<template>
  <div class="zoneList-container" @click="hideTree($event)">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form :inline="true" :model="form"  ref="form" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="所属部门" style="margin-right:30px;">
              <el-input v-model="form.depart" placeholder=""  id="depart" style="width:200px;" @focus="selectDepart"
              class="my-word my-input"></el-input>
            </el-form-item>
            <el-form-item label="发放日期（起）" style="margin-right:30px;">
              <el-date-picker v-model="form.startDate"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"
              style="width:200px;" :picker-options="pickerQualityTime"> </el-date-picker>
          </el-form-item>
            <el-form-item label="产品分类"  style="margin-right:30px;">
              <el-select v-model="form.type" clearable placeholder="请选择" style="width:200px;">
                <el-option  v-for="(item,index) in procetListAll" :key="index"  :label="item.ptName" :value="item.ptName"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="getList"  style="width:90px;">查询</el-button>
            </el-form-item>
          </div>
          <div class="form-items">
          <el-form-item label="领取人信息" style="margin-right:30px;">
              <el-input v-model="form.perSoninfo" placeholder="姓名/电话" style="width:200px;"></el-input>
          </el-form-item>
            <el-form-item label="入库日期（止）" >
              <el-date-picker v-model="form.endDate"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"
              :picker-options="pickerQualityTime" style="width:200px;"> </el-date-picker>
          </el-form-item>
          <el-form-item label="护具名称" style="margin-right:30px;">
              <el-select v-model="form.procetName" clearable placeholder="请选择" style="width:200px;">
                <el-option  v-for="(item,index) in allNameList" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
          </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="addSupplier"  style="width:90px;">新增发放</el-button>
            </el-form-item>
          </div>
        </el-form>
          <!-- 部门树状图 多选-->
         <div class="my-companyTree" v-show="isSelectDepart">
          <div class="company-tree">
            <el-tree :data="departData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
             :props="defaultProps" check-strictly >
          </el-tree>
          </div>
        <div class="buttons">
          <el-button type="primary" @click="onConfirmPart">确认</el-button>
          <el-button @click="resetChecked">取消</el-button>
        </div>
      </div>
    <!-- 部门树状图 -->
      </div>
      <div class="zoneList-title border-bottom">
        <el-button class="title-btn" type="text">个人发放记录</el-button>
        <el-button  @click="exportTable" class="export-excel">导出excel</el-button>
      </div>
     <!-- pgPersonalId   pgLoseDays 时效天数  pgId -->
      <div class="zonList-table">
       <el-table :data="tableData"  stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="600"  :default-sort = "{prop: 'pgGrantTime', order: 'descending'}" @selection-change="SelectionChange">
        <el-table-column prop="pgId"  label="序号"  width="50" type="selection"> </el-table-column>
        <el-table-column prop="pgProductType" label="产品分类"> </el-table-column>
        <el-table-column  prop="pgProductName" label="护具名称"> </el-table-column>
        <el-table-column  prop="pgDepartName" label="所属部门" > </el-table-column>
        <el-table-column  prop="pgGrantNumber" label="发放数量 "> </el-table-column>
        <el-table-column prop="pgGrantTime" label="发放时间" sortable> </el-table-column>
        <el-table-column  prop="pgGrantMan" label="发放人"> </el-table-column>
        <el-table-column  prop="pgGetMan" label="领取人"> </el-table-column> 
        <el-table-column  prop="pgGetTel" label="联系电话"> </el-table-column>        
    </el-table>
      </div>
     <div class="my-pagination">
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="15" layout=" total,prev, pager, next, jumper" :total="total">
          </el-pagination>
       </div>
      </div>
      <!-- 新增弹出框  -->
    <div class="del-form add-contsiner clearfix" :visible.sync="IsAdd" @click="hideTree2($event)">
     <el-dialog  class="dialog-form clearfix" title="新增发放"  width="950px" :visible.sync="IsAdd"  @close="IsAdd = false"
     :closeOnClickModal ="false">
      <div class="add-form-main">
        <el-form :model="addForm"  ref="addForm"  class="demo-form-inline" label-width="120px">
          <el-form-item label="部门岗位"  prop="depart">
            <el-input v-model="addForm.depart" placeholder="" id="depart2" style="width:200px;" @focus="isSelectDepart2 = true"></el-input>
          </el-form-item>
          <el-form-item label="产品分类">
            <el-select v-model="addForm.ProductType" clearable placeholder="请选择" style="width:200px;"  
             @focus="getLisByZone">
              <el-option  v-for="(item,index) in procetList" :key="index"  :label="item.ptName" :value="item.ptName" 
             > </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="护具名称"  prop="procetName">
            <el-select v-model="addForm.procetName" clearable placeholder="请选择" style="width:200px;" @focus="getProtectName"  @change="getInfo">
              <el-option  v-for="(item,index) in protectNameList" :key="index"  :label="item" :value="item"> </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="部门剩余"  prop="surplusNum">
            <el-input v-model="addForm.surplusNum" placeholder="" disabled  style="width:200px;" ></el-input>
          </el-form-item>
          <el-form-item label="发放数量" prop="grantNum">
            <el-input v-model="addForm.grantNum" placeholder="" style="width:200px;" @blur="regNum" ></el-input>
          </el-form-item>
          <el-form-item label="发放人员" >
            <el-input v-model="addForm.grantPerson" disabled placeholder="" style="width:200px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-table">   
        <!-- curPosId   id -->
        <el-table :data="tableData2" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="500" ref="multipleTable"  @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column prop="pgGetMan"  label=""   type="selection"> </el-table-column>
        <el-table-column prop="pgGetMan"  label="姓名" > </el-table-column>
        <el-table-column  prop="pgGetTel" label="电话" > </el-table-column>
        <el-table-column prop="loseDays" label="距离时效天数"> </el-table-column> 
    </el-table>
      </div>
          <!-- 部门树状图 单选-->
         <div class="my-tree2" v-show="isSelectDepart2">
          <el-tree :data="departData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
           :props="defaultProps" check-strictly @check="getNodes" >
        </el-tree>
      </div>
    <!-- 部门树状图 -->
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="sureAdd('addForm')">批量发放</el-button>
          <el-button  @click="cancleAdd('addForm')">清空</el-button>
        </div>
      </el-dialog>
  </div>
<!-- 新增弹出框 结束-->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils.js'
import {getDate} from 'common/js/time'
import {getDepart, getTypelist} from '../protective.js'
import getUserInfo from 'common/js/user'
import {myurl} from '@/api/config.js'
import {getAllProcetType} from 'api/protect'
import {getZoneList} from 'api/zone'
import {getZoneListByAuthority} from 'api/zone'
export default {
  name: '',
  data () {
    return {
      form: {
        startDate: '',
        endDate: '',
        procetName: '',
        type: '',
        depart: '',
        perSoninfo: ''
      },
      addForm: {
        depart: '',  // 部门岗位
        ProductType: '',  // 产品类型
        procetName: '',   // 护具名称
        surplusNum: '',  // 剩余库存
        grantNum: 0,  // 发放数量
        grantPerson: '',   // 发放人
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [{id: 1,iName: '张三'}],
      tableData2: [],
      delId: 0,
      currentPage: 1,
      total: 0,
      IsAdd: false,
      IsEdit: false,
      isAddType: false,
      isUse: ['不限', '是', '否'],
      selectList: ['选择一', '选择二', '选择三','选择四'],
      procetList: [],
      procetListAll: [],
      protectNameList: [],
      supplierList: [],
      editId: 0,
      add2: {},
      addTypeList: '',
      depart: '',
      isSelectDepart: false,
      departData: [],
      isSelectDepart2: false,
      zoneKey: '',
      multipleSelection: [],
      loading: false,
      multipleSelection2: [],
      allNameList: [],
      pickerQualityTime:{
        disabledDate(time){
          let _now = Date.now()
          return time.getTime() > _now 
        }
    },
    }
  },
  mounted() {
    this.getZone()
    this.getList()
    this._getAllProcetType()
    this.getProtectName()
    // this.getUserinfo()
    this.getAllNames()
    this.addForm.grantPerson = getUserInfo().username
    let time = getDate()
    this.form.endDate = `${time.year}-${time.month}-${time.date}`
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    errMsg(msg) {
      return this.$message({
        message: msg,
        type: 'error',
        center: true,
        duration: 10000
        })
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,
        type: 'success',
        center: true,
        duration: 10000
        })
    },
    getAllNames(){   //获取护具名称全部
      let data = {
        prPartitionId: getUserInfo().userId
      }
      this.axios.post('/proic/queryproductnamelist.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
        this.allNameList = res.data
        }else{
          console.log(res)
        }
    })
    },
    getZone() {     //获取分区
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.departData = [res]
      })
    },
    getLisByZone(){   //部门id查询护具类型
      let data= {
        dgId: this.zoneKey
      }
      if(this.zoneKey !== ''){
        this.axios.post('/depart/queryproducttypebydgid.do', qs.stringify(data))
        .then((res) => {
        if (res.status ===200) {
          if(res.data.length !==0){
            this.procetList = res.data
          }else{
            this.procetList = []
          }
        }else{
          console.log(res)
        }
        })
      }
    },
    _getAllProcetType(){      // 获取护具类型下拉列表 protype/queryprotypebyid.do
      let data = {
        departId: getUserInfo().partitionId
      }
      getAllProcetType(qs.stringify(data)).then((res) => {
        let temp = []
        if(res){
          res.map((item, index) => {
          temp.push({ptName:item.ptName,ptId: item.ptId})
        })
          this.procetListAll = temp
        } 
      })
    },
    getProtectName() {   //部门查询护具名称 depart/queryproductbytypename.do
      let data = {
        proType: this.addForm.ProductType
      }
      this.axios.post('/depart/queryproductbytypename.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          if(res.data){
            this.protectNameList = res.data.data
          }
        }else{
          console.log(res)
        }
     })
    },
    getInfo() {   //     查询用户
      this.loading = true   
      let data = {
        posId:  this.zoneKey,
        proName: this.addForm.procetName,
        proType: this.addForm.ProductType
      }
      if(this.zoneKey !=='' && this.addForm.procetName !=='' && this.addForm.ProductType !==''){
      this.axios.post('/period/querypersonbyposid.do', qs.stringify(data))
      .then((res) => {
        if (res.data) {
          this.loading = false
          let surplusNum = res.data.splice(res.data.length -1,res.data.length)
          this.tableData2 = res.data
          this.addForm.surplusNum = surplusNum[0].prRemainNumber  //剩余数量
        }else{
          console.log(res)
        }
     })
    }
    },
    SelectionChange(val) {   // 获取表格选中的值
      let ret = []
      val.map((item,index) => {
         ret.push(item.pgId)
      })
      this.multipleSelection2 = ret
    },
    exportTable(){   //导出表格
      if(this.multipleSelection2.length === 0) {
          this.$message({
          type: 'warning',
          center: true,
          message: '请先选择要导出的的数据'
        })
        return false
      }
      let url =`${myurl}/person/exprot.do?id=${this.multipleSelection2}`
      window.open(url)
    },
    selectDepart(){
      this.isSelectDepart = true
    },
    hideTree(e){
      if (e.target.id === '') {
        this.isSelectDepart = false
      }
    },
    hideTree2(e) {
      if (e.target.id === '') {
        this.isSelectDepart2 = false
      }
    },
    //获取部门多选
    onConfirmPart() {
      let temp = this.$refs.tree.getCheckedNodes()
      this.form.depart = this._filterTreeStr(temp)
      //选中的id
      this.depart= JSON.stringify(this.$refs.tree.getCheckedKeys())
      this.isSelectDepart = false
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
      this.isSelectDepart = false
    },
    // 获取部门单选
    getNodes(val) {
      this.zoneKey = val.id
      this.addForm.depart = val.label
      this.isSelectDepart2 = false
    },
// String page, String dateStart,时间起 String dateEnd,时间止 String proType,护具类型 String proName,护具名称String depart,部门名称 String getMan 领取人
    getList(){      // 分页查询个人发放
      let data ={
        page:this.currentPage,
        deteStart: this.form.startDate,
        dateEnd: this.form.endDate,
        proType: this.form.type,       //护具类型
        proName: this.form.procetName,    //护具名称
        depart: this.depart,       // 部门 id 数组
        getMan: this.form.perSoninfo,   //个人信息
        departId: getUserInfo().userId
      }
    this.axios.post('/person/querypgrant.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
            this.tableData = res.data.resultList
            this.total = res.data.sum
        }else{
          console.log(res)
        }
    })
    },
    // 新增入库
    addSupplier() {
      this.IsAdd =true
      this.addForm.procetName = ''
      this.addForm.ProductType = ''
      this.addForm.depart = ''
      this.zoneKey = ''
      this.addForm.grantNum = ''
      this.addForm.surplusNum = ''
      this.multipleSelection = []
      this.addForm.grantPerson = ''
    },
    handleSelectionChange(val) {   // 获取选中的值
        let ret = []
        if(parseInt(this.addForm.grantNum) >1 && this.addForm.grantNum !== '' ){
          val.map((item,index) => {
            ret.push({gpPersonalId:item.id,gpGetMan: item.pgGetMan, gpGender:item.pgGender,
              gpGetTel:item.pgGetTel, gpAge:item.pgAge, gpProductName: this.addForm.procetName, 
              gpProductType: this.addForm.ProductType,
              gpDepartName: this.addForm.depart, gpDepartId: this.zoneKey,  gpGrantNumber: this.addForm.grantNum, 
              gpRemainNumber: this.addForm.surplusNum, gpGrantMan: this.addForm.grantPerson,
              gpGrantMan: getUserInfo().username})
          })
          this.multipleSelection = ret
        }else if( parseInt(this.addForm.grantNum) <1){
        this.$message({ type: 'warning',center: true,message: '请输入大于1的发放数量'})
        }else if(this.addForm.grantNum  === ''){
          this.$message({ type: 'warning',center: true,message: '请输入发放数量'})
        }
    },
    regNum(){
      if( parseInt(this.addForm.grantNum) <1){
        this.$message({ type: 'warning',center: true,message: '请输入大于1的发放数量'})
      }else if(this.addForm.grantNum  === ''){
        this.$message({ type: 'warning',center: true,message: '请输入发放数量'})
      }
    },
    sureAdd(addForm) {   
      let list = JSON.stringify(this.multipleSelection)
      let data ={
        tabGrants: list
      }
      if(parseInt(this.addForm.grantNum) > 1 && this.addForm.grantNum !== '' && this.multipleSelection.length !==0){
        this.axios.post('/period/addperiod.do', qs.stringify(data)).then((res) => {
          if (res.data.status === 1) {
              this.IsAdd = false
              this.getList()
              this.sucMsg(res.data.msg)
          }else{
            this.errMsg(res.data.msg)
          }
        })
      }else if(this.addForm.grantNum === ''){
        this.$message({ type: 'warning',center: true,message: '请输入发放数量'})
      }else if(parseInt(this.addForm.grantNum)<1){
        this.$message({ type: 'warning',center: true,message: '请输入大于1的发放数量'})
      }else if(this.multipleSelection.length ===0){
        this.$message({ type: 'warning',center: true,message: '请至少选择一位发放人员'})
      }
    },
    cancleAdd(addForm) {
      // this.IsAdd = false
       this.$refs[addForm].resetFields()
    },
    cancleEdit(){
       this.IsEdit = false
    },
    grantPerson(row,index){
    },
    handleCurrentChange(val) {
      let data ={
        page: val,
        deteStart: this.form.startDate,
        dateEnd: this.form.endDate,
        proType: this.form.type,       //护具类型
        proName: this.form.procetName,    //护具名称
        depart: this.depart,       // 部门 id
        getMan: this.form.perSoninfo,   //个人信息
        departId: getUserInfo().partitionId
      }
    this.axios.post('/person/querypgrant.do', qs.stringify(data))
    .then((res) => {
      if (res.status ===200) {
        this.tableData = res.data.resultList
        this.total = res.data.sum
      }else{
        console.log(res)
      }
    })
    },
  },
};
</script>
<style>
.add-contsiner{
 overflow-y: auto;
  width: 100%;
  min-height: 500px;
  z-index: 500;
  }
</style>
<style lang="css" scoped>
.zoneList-content{
width: 100%;
padding-top: 20px;
margin: 20px auto;
}
.zoneList-title{
  margin: 10px 0;
}
.export-excel{
  float: right;
  margin-right: 20px;
}
.add-form-main{
  width: 40%;
  float: left;
  min-height: 400px;
  margin-right: 5%;
}
.add-table{
  width: 55%;
  float: left;
  min-height: 400px;
}
.search-input,.search-btns{ float: left; }
.search-btns{ margin-left: 20px; }
.my-pagination{ float: right; }
.EditGroupProject{
  width: 100%;
  position: absolute;
  top:60px;
  background: #fff;
  z-index: 300;
}
.my-companyTree{
  border: 1px solid #ccc;
  width: 400px;
 margin-left: 400px;
  position: absolute;
  left: -30px;
  top:180px;
  height: 500px;
  padding: 10px;
  border-radius: 5px;
  z-index: 300;
  background: #FFF;
}
.company-tree{
  max-height: 450px;
  overflow-y: auto;
}
.buttons{
  width: 200px;
  margin: 0 auto;
}
.my-tree2{
  border: 1px solid #ccc;
  width: 400px;
 margin-left: 30px;
  position: absolute;
  left: 0px;
  top:125px;
  z-index: 300;
  background: #FFF;
  height: 500px;
  padding: 10px;
  border-radius: 5px;
}
.zone-tree{
max-height: 450px;
overflow-y: auto;
}
</style>
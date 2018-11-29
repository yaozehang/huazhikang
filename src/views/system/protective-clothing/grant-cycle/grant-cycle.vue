<template>
  <div class="zoneList-container" @click="hideTree($event)">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form :inline="true" :model="form"  ref="form" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="部门岗位">
              <el-input v-model="form.depart" placeholder=""  id="depart" style="width:200px;" @focus="selectDepart"
              class="my-word my-input"></el-input>
          </el-form-item>
            <el-form-item label="产品分类"  >
              <el-select v-model="form.type" clearable placeholder="请选择" style="width:200px;" >
                <el-option  v-for="(item,index) in procetListAll" :key="index"  :label="item.ptName" :value="item.ptName"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="护具名称" >
              <el-select v-model="form.procetName" clearable placeholder="请选择" style="width:200px;">
                <el-option  v-for="(item,index) in allNameList" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
          </div>
          <div class="form-items">
             <el-form-item label="姓名">
              <el-input v-model="form.name" placeholder="姓名/电话" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" style="margin-right:150px;">
              <el-input v-model="form.linkTel" placeholder="姓名/电话" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="">
              <el-button type="primary" @click="getList"  style="width:90px;">查询</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="addSupplier"  style="width:90px;">批量发放</el-button>
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
        <el-button class="title-btn" type="text">护具失效列表</el-button>
      </div>
     <!-- pgPersonalId   pgLoseDays 时效天数  pgGrantTime pgId pgGrantNumber gender -->
      <div class="zonList-table">
       <el-table :data="tableData"  stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="600" ref="multipleTable1"  @selection-change="handleSelectionChange1" :default-sort = "{prop: 'pgLoseDays', order: 'descending'}">
        <el-table-column prop="gpId"  label=""   type="selection"> </el-table-column>
        <el-table-column prop="gpGetMan"  label="姓名"  width="50" > </el-table-column>
        <el-table-column prop="" label="性别">
        <template slot-scope="scope">
             <span v-if="scope.gpGender === '0'">女 </span>
             <span v-else>男</span>
        </template> </el-table-column>
        <el-table-column  prop="gpAge" label="年龄"></el-table-column>
        <el-table-column  prop="gpGetTel" label="电话" > </el-table-column>
        <el-table-column  prop="gpDepartName" label="部门"> </el-table-column>
        <el-table-column prop="gpProductType" label="护具类型"> </el-table-column>
        <el-table-column  prop="gpProductName" label="护具名称"> </el-table-column>
        <el-table-column  prop="lostDay" label="距离下次发放天数" sortable> </el-table-column>  <!-- 排序 -->     
        <el-table-column   label="操作"  width="150"> 
          <template slot-scope="scope">
            <span  @click="grantOnce(scope.$index,scope.row)" class="grant">发放 </span>
        </template>
        </el-table-column>
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
     <el-dialog  class="dialog-form clearfix" title="新增发放"  width="950px" :visible.sync="IsAdd" :closeOnClickModal ="false">
      <div class="add-form-main">
        <el-form :model="addForm"  ref="addForm"  class="demo-form-inline" label-width="120px">
          <el-form-item label="部门岗位"  >
            <el-input v-model="addForm.depart" placeholder="" id="depart2" style="width:200px;" @focus="isSelectDepart2 = true"></el-input>
          </el-form-item>
          <el-form-item label="产品分类"  >
            <el-select v-model="addForm.ProductType" clearable placeholder="请选择" style="width:200px;" 
            @focus="getLisByZone">
              <el-option  v-for="(item,index) in procetList" :key="index"  :label="item.ptName" :value="item.ptName" 
             > </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="护具名称" >
            <el-select v-model="addForm.procetName" clearable placeholder="请选择" style="width:200px;" @focus="getProtectName" @change="getInfo">
              <el-option  v-for="(item,index) in protectNameList" :key="index"  :label="item" :value="item"> </el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="部门剩余" >
            <el-input v-model="addForm.surplusNum" placeholder="" disabled  style="width:200px;" ></el-input>
          </el-form-item>
          <el-form-item label="发放数量" >
            <el-input v-model="addForm.grantNum" style="width:200px;" @blur="regNum" type="number"></el-input>
          </el-form-item>
          <el-form-item label="发放人员" >
            <el-input v-model="addForm.grantPerson" placeholder="" disabled style="width:200px;"></el-input>
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
          <div class="zone-tree">
            <el-tree :data="departData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
             :props="defaultProps" check-strictly @check="getNodes" >
          </el-tree>
          </div>
      </div>
    <!-- 部门树状图 -->
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="sureAdd('addForm')">批量发放</el-button>
          <el-button  @click="cancleAdd('addForm')">清空</el-button>
        </div>
      </el-dialog>
  </div>
<!-- 新增弹出框 结束-->
 <!-- 新增护具名称弹出框 -->
   <el-dialog  class="dialog-form" title="发放" width="60%"  :visible.sync="IsGrantOnce">
      <grant :tableDataT="tableDataT" :Form="Form" :departData="departData" :departId="departId"></grant>
      <div slot="footer" class="dialog-footer"> 
        <el-button type="primary" @click="addOnceGrant()" >发放</el-button>
      </div>
    </el-dialog>
    <!-- 新增护具名称弹出框 -->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils.js'
import {getDate} from 'common/js/time'
import {getDepart, getTypelist} from '../protective.js'
import getUserInfo from 'common/js/user'
import grant from './grant.vue'
import {getAllProcetType} from 'api/protect'
import {getZoneList} from 'api/zone'
import {getZoneListByAuthority} from 'api/zone'
export default {
  name: '',
  components:{
    grant
  },
  data () {
    return {
      form: {
        procetName: '',
        type: '',
        depart: '',
        name: '',  //领取人
        linkTel: ''  //领取人电话
      },
      addForm: {
        depart: '',  // 部门岗位
        ProductType: '',  // 产品类型
        procetName: '',   // 护具名称
        surplusNum: '',  // 剩余库存
        grantNum: '',  // 发放数量
        grantPerson: '',   // 发放人
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
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
      zoneKey: 0,
      multipleSelection1: [],
      multipleSelection: [],
      loading: false,
      tableDataT: [],
      Form: {},
      IsGrantOnce: false,
      departId: 0,
      allNameList: []
    }
  },
  mounted() {
    this.getList()
    this.getZone()
    this._getAllProcetType()
    this.getAllNames()
    this.addForm.grantPerson = getUserInfo().username
    this.Form.grantPerson = getUserInfo().username
    let time = getDate()
    this.form.endDate = `${time.year}-${time.month}-${time.date}`
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
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
    getLisByZone(){   //根据分区查询护具
      let data= {
        dgId: this.zoneKey
      }
      this.axios.post('/depart/queryproducttypebydgid.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          if(res.data.length !==0){
            this.procetList = res.data
          }
        }else{
          console.log(res)
        }
    })
    },
    _getAllProcetType(){      // 获取护具类型下拉列表 protype/queryprotypebyid.do
      let data = {
        departId: getUserInfo().comPId
      }
      getAllProcetType(qs.stringify(data)).then((res) => {
        let temp = []
        res.map((item, index) => {
          temp.push({ptName:item.ptName,ptId: item.ptId})
        })
        this.procetListAll = temp
      })
    },
    getProtectName(){   //部门查询护具名称 depart/queryproductbytypename.do
      let data = {
        proType: this.addForm.ProductType
      }
      this.axios.post('/depart/queryproductbytypename.do', qs.stringify(data))
      .then((res) => {
        console.log(res.data)
        if (res.status ===200) {
          if(res.data.data.length !==0){
            this.protectNameList = res.data.data
          }
        }else{
          console.log(res)
        }
     })
    },
//     查询用户person/querypersonbyposid.do
    getInfo(){  
      this.loading= true 
      let data = {
        posId:  this.zoneKey,
        proName: this.addForm.procetName,
        proType: this.addForm.ProductType
      }
      if(this.zoneKey !=='' && this.addForm.procetName !=='' && this.addForm.ProductType !==''){
      this.axios.post('/period/querypersonbyposid.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          this.loading= false
          let surplusNum = res.data.splice(res.data.length -1,res.data.length)
          this.tableData2 = res.data
          this.addForm.surplusNum = surplusNum[0].prRemainNumber  //剩余数量
        }else{
          console.log(res)
        }
     })
   }
    },
    grantOnce(index,row) {   //表格里面的发放  单个发放
      this.IsGrantOnce = true
      let data = {
        gpId: row.gpId
      }
     this.axios.post('/period/querybyid.do', qs.stringify(data))
    .then((res) => {
      if (res.status === 200) { 
        let data  = res.data
        this.tableDataT = []
        this.Form.depart = data.gpDepartName   // 部门岗位
        this.departId = data.gpDepartId,  //部门id
        this.Form.ProductType =data.gpProductType  // 产品类型
        this.Form.procetName = data.gpProductName   // 护具名称
        this.Form.surplusNum =data.gpRemainNumber  // 剩余库存
        this.Form.grantPerson =data.gpGrantMan  // 发放人
        this.Form.grantNum =data.gpGrantNumber  // 发放数量
        this.tableDataT.push({
          gpGender: data.gpGender, gpGetTel: data.gpGetTel, gpId: data.gpId,
          gpGetMan: data.gpGetMan, gpAge: data.gpAge, gpPersonalId:data.gpPersonalId
        })
      }else{
        console.log(res.data)
      }
    })
    },
    addOnceGrant() {   //单个发放
      let data ={
        gpDepartName: this.Form.depart,   // 部门岗位
        gpDepartId: this.departId,   //部门id
        gpProductType: this.Form.ProductType, // 产品类型
        gpProductName: this.Form.procetName,   // 护具名称
        gpRemainNumber: this.Form.surplusNum,   // 剩余库存
        gpGrantMan: this.Form.grantPerson,  // 发放人
        gpGrantNumber: this.Form.grantNum,   // 发放数量
        gpGender: this.tableDataT[0].gpGender,   //表格里面的数据
        gpGetTel: this.tableDataT[0].gpGetTel,    //表格里面的数据
        gpId: this.tableDataT[0].gpId,  //表格里面的数据
        gpPersonalId: this.tableDataT[0].gpPersonalId,
        gpGetMan: this.tableDataT[0].gpGetMan,   //表格里面的数据
        gpAge: this.tableDataT[0].gpAge,   //表格里面的数据
      }
    this.axios.post('/period/updatebykey.do', qs.stringify(data))
    .then((res) => {
      if (res.data.status === 1) {
          this.IsGrantOnce = false
      }else{
        console.log(res)
      }
    })
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
      this.form.depart = ''
    },
    // 获取部门单选
    getNodes(val) {
      this.zoneKey = val.id
      this.addForm.depart = val.label
       this.isSelectDepart2 = false
    },
    getList(){      
      let data ={
        page: this.currentPage,
        proType: this.form.type,       //护具类型
        proName: this.form.procetName,    //护具名称
        depart: this.depart,       // 部门 id
        name: this.form.name,    //个人信息
        linkTel: this.form.linkTel,
        departId: getUserInfo().userId
      }
    this.axios.post('/period/queryperiod.do', qs.stringify(data))
    .then((res) => {
      if (res.status ===200) {
          this.tableData = res.data.resultList
          this.total = res.data.sum
      }else{
        console.log(res)
      }
    })
    },
    formRest(){
      this.addForm.depart = ''
      this.addForm.ProductType = ''
      this.addForm.procetName = ''
      this.addForm.surplusNum = ''
      this.addForm.grantNum = ''
      this.addForm.grantPerson = ''
      this.multipleSelection = []
    },
    // 新增入库
    addSupplier(){
      this.IsAdd =true
      this.formRest()
    },
    handleSelectionChange1(val){
       let ret = []
      val.map((item,index) => {
         ret.push({pgPersonalId:item.id,pgGetMan: item.pgGetMan, pgGetTel:item.pgGetTel})
      })
      this.multipleSelection1 = ret
    },
    handleSelectionChange(val) {   // 获取选中的值批量发发
      let ret = []
      if(parseInt(this.addForm.grantNum) >1 && this.addForm.grantNum !== '' && val.length.length !==0){
          val.map((item,index) => {
            ret.push({gpPersonalId:item.id,gpGetMan: item.pgGetMan, gpGender:item.pgGender,
            gpGetTel:item.pgGetTel, gpAge:item.pgAge, gpProductName: this.addForm.procetName, 
            gpProductType: this.addForm.ProductType,
            gpDepartName: this.addForm.depart, gpDepartId: this.zoneKey ,  gpGrantNumber: this.addForm.grantNum, 
            gpRemainNumber: this.addForm.surplusNum, gpGrantMan: this.addForm.grantPerson,
            gpGrantMan: getUserInfo().username})
          })
        this.multipleSelection = ret
      }else if( parseInt(this.addForm.grantNum) <1){
        this.$message({ type: 'warning',center: true,message: '请输入大于1的发放数量'})
        }else if(this.addForm.grantNum  === '') {
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
    sureAdd(addForm) {  //    批量发放period/addperiod.do
      let tabGrants = JSON.stringify(this.multipleSelection)
      console.log(this.multipleSelection)
      let data ={
        tabGrants: tabGrants
      }
      if(parseInt(this.addForm.grantNum) > 1 && this.addForm.grantNum !== '' && this.multipleSelection.length !==0) {
        this.axios.post('/period/addperiod.do', qs.stringify(data)).then((res) => {
          if (res.status ===200) {
            this.IsAdd = false
            this.getList()
          }else{
            console.log(res)
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
      this.formRest()
    },
    cancleEdit(){
      this.IsEdit = false
    },
    editInfo(row,index){
    },
    handleCurrentChange(val) {  //period/queryperiod.do
      let data ={
        page: val,
        proType: this.form.type,       //护具类型
        proName: this.form.procetName,    //护具名称
        depart: this.depart,       // 部门id 
        name: this.form.name,    //个人信息
        linkTel: this.form.linkTel,
        departId: getUserInfo().userId
      }
    this.axios.post('/period/queryperiod.do', qs.stringify(data))
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
.grant{
  /*color: #a9c9f3;*/
  color: #4d9bf3;
  font-weight: bolder;
}
.grant:hover{
  cursor: pointer;
}
.zoneList-title{
  margin: 10px 0;
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
  width: 500px;
  position: absolute;
  left: 300px;
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
  width: 500px;
 margin-left: 30px;
  position: absolute;
  left: 0px;
  top:125px;
  height: 500px;
  border-radius: 5px;
  padding: 10px;
  z-index: 300;
  background: #FFF;
}
.zone-tree{
  max-height: 450px;
  overflow-y: auto;
}
</style>
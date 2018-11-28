<template>
  <div class="main-content" @click="hideTree($event)">
    <!-- 搜索框 -->
    <ul class="search-container">
      <li class="input-group">
          <span class="title">分区</span>
          <el-input class="inner-input" @focus="onFocus" v-model="searchParams.positionName" id="fenqu"></el-input>
           <transition name="el-zoom-in-center">
             <el-button v-show="permission===1" type="primary" @click="_addNewPlan" style="width:120px;">新增计划</el-button>
          </transition>
      </li>
      <li class="input-group">
          <span class="title">选择日期</span>
          <el-date-picker v-model="selectParams.date" type="date"  clearable  placeholder="请选择日期" class="inner-input" value-format="yyyy-MM-dd" @keyup.native.enter="_getPlanList"></el-date-picker>
          <el-button type="primary" style="width:120px;" @click="_getPlanList">查询</el-button>
      </li>
     </ul>
    <div class="tree-container" v-show="isShowTree" id="tree">
      <el-tree :data="treeData" show-checkbox node-key="id" default-expand-all ref="tree" highlight-current :props="defaultProps" check-strictly @check="onCheckPos">
      </el-tree>
    </div>
    <!-- 表格标题 -->
    <table-title :title="'巡检计划列表'"></table-title>
    <!-- 表格  workerPlan-->
    <div class="table-container my-table">
      <el-table :data="tableData" border stripe style="width: 100%;">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="positionName" label="分区"></el-table-column>
        <el-table-column prop="insTitle" label="巡检标题"></el-table-column>
        <el-table-column prop="" label="执行日期">
           <template slot-scope="scope">
            <span class="" >{{scope.row.insDate}} 至 {{scope.row.endDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="insFreq" label="巡检频次(次/天) "></el-table-column>
        <el-table-column prop="insPerson" label="巡检人员"></el-table-column>
        <el-table-column label="操作" v-if="permission===1">
          <template slot-scope="scope">
            <span class="edit-btn" @click="_editPlan(scope.row)">编辑</span>|<span class="del-btn" @click="_removePlan(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
        <!-- 分页 -->
    <div class="pagination-container">
        <el-pagination @current-change="pageChange"
          :page-size="15"  :current-page="selectParams.page" layout="total, prev, pager, next, jumper" :total="totalPage">
        </el-pagination>
    </div>
    <!-- 新增弹出框 -->
    <el-dialog  class="dialog-form" :title="editType===0?'新增计划':'编辑计划'" width="900px" :visible.sync="showFlag"
     :closeOnClickModal ="false" center>
      <el-form :inline="true" :model="editParams"  ref="editParams"  :rules="rules" class="demo-form-inline" label-width="120px" >
        <div class="form-items">
          <el-form-item label="模板类型"  class="inner-group" prop="templateType"  required>
            <el-select v-model="editParams.templateType" placeholder="请选择" @change="changeType" class="inner-input" :disabled="editType===1">
              <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="巡检标题"   class="inner-group" >
              <el-input class="inner-input" v-model="titleName" :disabled="editType===1" v-if="editType!==0"></el-input>
              <el-select v-model="editParams.templateId" filterable placeholder="请选择" @change="selectTitle" class="inner-input" :disabled="editType===1" v-else>
              <el-option v-for="item in titleOption" :key="item.id" :label="item.title" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item label="执行日期"  class="inner-group">
            <el-date-picker v-model="dateList" type="daterange" range-separator="至" start-placeholder="开始日期"
           end-placeholder="结束日期" value-format="yyyy-MM-dd" :disabled="editType===1" @change="changeDate" :picker-options="pickerOptions" class="inner-input">
          </el-date-picker>
            </el-form-item>
            <el-form-item label="巡检频次"   class="inner-group"  prop="freq"  required>
              <el-input class="inner-input" v-model="editParams.freq" :disabled="editType===1"></el-input>
              <span class="unit" v-if="editType===1"></span>
              <span class="unit" v-else>次/ {{tatalDay}}天</span>
          </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item label="任务分区"  class="inner-group" prop="positionName"  required>
             <el-input class="inner-input" @focus="onFocus2"  v-model="editParams.positionName" id="fenqu2" :disabled="editType===1"></el-input>
            </el-form-item>
            <el-form-item label="人员分区"   class="inner-group"   required>
               <el-input class="inner-input" @focus="onFocus3" v-model="searchParams.zoneName" id="fenqu2"></el-input>
          </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item label="巡检人员"  class="inner-group"  prop="userId"  required>
            <el-select v-model="editParams.userId" multiple filterable placeholder="请选择" class="inner-input" @change="">
              <el-option v-for="item in personOptions" :key="item.personId" :label="item.username" :value="item.personId"></el-option>
              </el-select>
            </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item  class="btns-group">
              <el-button type="primary" @click="confirmAdd('editParams')">确 定</el-button>
              <el-button @click="showFlag=!showFlag">取 消</el-button>
            </el-form-item>
        </div>
      </el-form>
          <!-- 部门选择树状图 -->
      <div class="tree-container2" v-show="isShowTree2" id="tree2">
        <el-tree :data="treeData" show-checkbox node-key="id" default-expand-all ref="tree2" highlight-current :props="defaultProps" check-strictly @check="onCheckPos2">
        </el-tree>
      </div>
        <!--人员 部门选择树状图 -->
      <div class="tree-container3" v-show="isShowTree3" id="tree3">
        <div class="team-tree">
          <el-tree :data="treeData" default-expand-all  show-checkbox node-key="id"  ref="tree3" highlight-current
           :props="defaultProps"  check-strictly >
          </el-tree>
        </div>
        <div class="my-tree-btns">
          <el-button type="primary" @click="onConfirmPart">确认</el-button>
          <el-button @click="resetChecked">清空</el-button>
        </div>
    </div>
    <!-- 部门分区图 -->
      <div slot="footer" class="dialog-footer">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'

import {getAllPolingType, getTreeDataById, getPlanList, getTitleList, removePlan, getPersonListById,getAllTitle,
  getTitleListById,getPersonList} from 'api/poling'
import {getDate,getYesterday} from 'common/js/time'
import {getPermissionById} from 'api/login'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
import {getAllId} from 'common/js/allpid'

import qs from 'qs'

export default {
  props: {
    currentMenu: {
      type: Number,
      default:-1
    }
  },
  components: {
    tableTitle
  },
  data () {
    return {
      isSwitch: false,
      isShowTree2: false,
      isShowTree3: false,
      value7: '',
      typeList: [{id: 1,name: '定期巡检'},{id: 0,name: '日常巡检'}],
      treeData: [],
      typeOption: [],
      titleOption: [],
      personOptions: [],
      personOptions2: [],
      totalPage: 0,
      searchParams:{
        positionName: '',
        zoneId: [],
        zoneName: '',
        userId: []
      },
      selectParams: {
        page: 1,
        positionId: -1,
        date: '',
        allPId: getAllId(),
        comPId: getUserInfo().comPId,
      },
      editType: 0,
      editId: 0,
      dateList: [], //日期
      titleName: '',  //编辑时的巡检标题
      editParams: {
        templateType: 1,
        title: '',
        templateId: '',
        freq: '1',
        dateList: [],
        userId: [],
        positionId: '',
        positionName: '',
        isOverdue: 0,
        comPId: getUserInfo().comPId,
      },
      showFlag: false,
      tableData: [],
      isShowTree: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dates: [],
      permission: 0,
      editZoneKey: '',
      tatalDay: 1,
      regFlag: false, //验证标识
      date1: '',
      pickerOptions:{
        disabledDate(time){   //时间小于今天禁用
        let _now = Date.now()
        return time.getTime() < _now - 24*3600*1000
        }
      },
      rules: {
        templateType: [{ required: true, message: '魔板类型不能为空', trigger: 'blur' }],
        templateId: [{ required: true, message: '巡检标题不能為空', trigger: 'blur' }],
        themeId:[{ required: true, message: '培训主题不能为空', trigger: 'blur' }],
        freq:[{ required: true, message: '巡检频次不能为空', trigger: 'blur' }],
        positionName:[{ required: true, message: '任务分区不能为空', trigger: 'blur' }],
        userId:[{ required: true, message: '请选择巡检人员', trigger: 'blur' }],
      },
    }
  },
  created() {
    let time = getDate()
    this.date1 = `${getDate().year}-${getDate().month}-${getDate().date}`
    this.selectParams.date = `${time.year}-${time.month}-${time.date}`
    this.dateList = [this.date1,this.date1]
    this._getTreeDataById()
    this._getPlanList()
    this._getAllPolingType()
  },
  mounted() {
    // this._getAllTitle()
    getPermissionById({menuId: this.currentMenu}).then((res) => {
      this.permission = res
    })
  },
  watch: {
    currentMenu(newVal) {
      getPermissionById({menuId: newVal}).then((res) => {
        this.permission = res
      })
    }
  },
  methods: {
    changeDate(val){
      console.log(val)
      if(this.editParams.templateType === 1){
      this.tatalDay = this.datedifference(val[0],val[1]) + 1
      }else{
         this.tatalDay = 1
      }
    },
    insertStr(str1,n,str2){
      let s1,s2
      if(str1.length<n){
        return str1+str2
      }else{
        s1 = str1.substring(0,n)
        s2 = str1.substring(n,str1.length)
        return s1+str2+s2
      }
    },
        // alert(insertStr("aaaa",2,"bbb"));//测试
   datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
    var dateSpan,tempDate,iDays
        sDate1 = Date.parse(sDate1)
        sDate2 = Date.parse(sDate2)
        dateSpan = sDate2 - sDate1
        dateSpan = Math.abs(dateSpan)
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
        return iDays
    },
    changeType(type){
      let data ={
        templateType: type,
        comPId:getUserInfo().comPId
      }
      getTitleListById(qs.stringify(data)).then((res) =>{
        console.log(res)
        let temp = []
        res.map((item,index) =>{
          temp.push({title:item.insTitle,id:item.id})
        })
        this.titleOption = temp
        // this.editParams.userId = []
        this.editParams.templateId = ''
      })
    },
    _getAllTitle(){
      getAllTitle().then((res) => {
        this.titleOption = res
      })
    },
    setSwitch(val){
      if(val === true){
        this.editParams.isOverdue = 1
      } else{
        this.editParams.isOverdue = 0
      }
    },
    _getTreeDataById() {
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.treeData = [res]
      })
    },
    _getAllPolingType() {
      getAllPolingType().then((res) => {
        this.typeOption = res
      })
    },
    _getPlanList() {
      let data = this.selectParams
      getPlanList(qs.stringify(data)).then((res) => {
        console.log(res.resultList)
        if(res.length!==0){
          this.tableData = res.resultList
          this.totalPage = res.pageCount
        }
      })
    },
    pageChange(val){   //分页查询
      this.selectParams.page = val
      getPlanList(qs.stringify(this.selectParams)).then((res) => {
        console.log(res)
        if(res.length!==0){
          this.tableData = res.resultList
          this.totalPage = res.pageCount
          this.tableData.map((item,index) =>{
            item.userName =  item.userName.join('、 ')
            return  this.tableData
          })
        }
      })
    },
    _addNewPlan() {
      this.editParams.templateType = ''
      this.editParams.title = this.editParams.templateId = ''
      this.editParams.freq = 1
      this.editParams.dateList = this.dateList = [this.date1,this.date1]
      this.editParams.userId = []
      this.searchParams.zoneName = ''
      this.editParams.positionName = ''
      this.searchParams.zoneId = []
    	this.editType = 0
      this.tatalDay = 1
    	this.showFlag = !this.showFlag
      this.isSwitch = false    //开启 
    },
    getPerson(){
      if(this.editParams.positionName !==''){
        getPersonListById({partitionId: this.editParams.positionId}).then((res) => {
          this.personOptions = res
        })
      }
    },
    addNewPlan() {
      let tempId = this.editParams.userId 
      let data = {}
      let userId = JSON.stringify(this.editParams.userId)
      this.editParams.dateList = JSON.stringify(this.dateList)
      Object.assign(data, this.editParams, {userId:userId})
      this.axios.post('/web/workPlan/add.do', qs.stringify(data)).then((res) => {
          if (res.data === 'success') {
            this.editParams.userId = []
            this.$message({type: 'success',message: '新增成功'})
            this.showFlag = !this.showFlag
          }else{
            this.$message({ type: 'error', message: res.data})
            this.showFlag = true
            this.editParams.userId = tempId 
          }
          this._getPlanList()
        })
    },
    uniqArr(arr){      //普通数组去重
      return Array.from(new Set(arr))
    },
    _editPlan(row) {
      console.log(row,row.templateId)
      let pId = this.uniqArr(row.pId)
      this.searchParams.zoneName = ''
      this.editType = 1
      this.editZoneKey = row.positionId
      this.editParams.templateType = row.insCycle
      let data = JSON.stringify(pId)
      getPersonList(qs.stringify({partitionId: data})).then((res) => {
        this.personOptions = res
      })
      let str = row.insFreq
      let n = str.indexOf('/')
      let newStr = this.insertStr(str,n,'次')
      let result = this.insertStr(newStr,newStr.length,'天')
      this.showFlag = !this.showFlag
      this.editParams.insTitle = row.insTitle
      this.editParams.freq = result
      this.editParams.dateList = this.dateList = [row.insDate,row.endDate]
      this.editParams.userId = row.userId
      this.editParams.positionId = row.positionId
      this.editParams.positionName = row.positionName
      this.searchParams.zoneId = pId  //人员分区id
      this.titleName = row.insTitle  //巡检标题
      // this.$refs.tree3.setCheckedKeys(this.searchParams.zoneId)
      // console.log(this._filterTreeStr(this.$refs.tree3.getCheckedNodes()))
      this.editId = row.id
      if(row.isOverdue === 0){
        this.isSwitch = false    //0关闭
      } else{
         this.isSwitch = true    //开启
      }
    },
    editPlan() {
      let tempId = this.editParams.userId 
      userId = JSON.stringify(this.editParams.userId)
      let data = {
        id: this.editId,
        userId: userId,
        username: '',
        isOverdue: 0,
      }
      // Object.assign(data, this.editParams)
      if(true){
        this.axios.post('/web/workPlan/edit.do', qs.stringify(data)).then((res) => {
          if (res.data === 1) {
            this.$message({type: 'success',message: '修改成功' })
            this.showFlag = false
            this.editParams.userId = []
          }else if(res.data === 0){
            this.$message({type: 'error',message: '该任务已全部完成' })
          }
          else{
            this.showFlag = true
            this.editParams.userId = tempId
          }
          this._getPlanList()
        })
      }
    },
    _removePlan(id) {
      let data = {
        id: id
      }
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          removePlan(data).then((res) => {
            if (res === 1) {
              this.$message({type: 'success',message: '删除成功!'})
              this._getPlanList()
            }
          })
        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'})
        })
    },
    onFocus() { //查询的分区
      if (this.treeData.length !== 0) {
        this.isShowTree = true
        this.$refs.tree.setCheckedKeys([this.selectParams.positionId])
      }
    },
    onCheckPos(e) {   //查询的分区
      if (this.$refs.tree.getCheckedKeys().length !== 0) {
         this.selectParams.positionId = e.id
         this.searchParams.positionName = e.label
      } else {
        this.selectParams.positionId = -1
        this.searchParams.positionName = ''
      }
      this.isShowTree = false
    },
    onFocus2() {  //新增计划的分区
      if (this.treeData.length !== 0) {
        this.isShowTree2 = true
        this.$refs.tree2.setCheckedKeys([this.editParams.positionId])
      }
    },
    onCheckPos2(e){   //新增计划的分区
      if (this.$refs.tree2.getCheckedKeys().length !== 0) {
        this.editParams.positionId  = e.id
        this.editParams.positionName = e.label
      } else {
        this.editParams.positionId = -1
        this.editParams.positionName = ''
      }
      this.isShowTree2 = false
    },
    onFocus3() {  //新增计划的分区
      if (this.treeData.length !== 0) {
        this.isShowTree3 = true
        this.$refs.tree3.setCheckedKeys(this.searchParams.zoneId)
        this.searchParams.zoneName = this._filterTreeStr(this.$refs.tree3.getCheckedNodes())
      }
    },
    onConfirmPart() {   //分区多选
      if(this.$refs.tree3.getCheckedKeys().length !== 0){
        let temp = this.$refs.tree3.getCheckedNodes()
        this.searchParams.zoneName = this._filterTreeStr(temp)
        this.searchParams.zoneId = this.$refs.tree3.getCheckedKeys()          //选中的id
        this.isShowTree3 = false
        this.getPerson2()
      }else{
        this.searchParams.zoneId  = []
        this.searchParams.zoneName = ''
      }
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join(',')
    },
    resetChecked() {
      this.$refs.tree3.setCheckedKeys([])
      this.isShowTree3 = true
      this.searchParams.zoneName = ''
    },
    getPerson2(){
      let list = JSON.stringify(this.searchParams.zoneId)
      let data = {
        partitionId: list
      }
      if(this.searchParams.zoneName !==''){
        getPersonList(qs.stringify(data)).then((res) => {
          this.personOptions = res
        })
      }
    },
    confirmAdd(editParams) {
      this.$refs[editParams].validate((valid) => {
        if (valid) {
          if (this.editType === 0) {
            this.addNewPlan()
          } else {
            this.editPlan()
          }
        }
      })
    },
    selectTitle(data) {
      let title = ''
      this.titleOption.forEach((item, idx) => {
        if (data === item.id) {
          title = item.title
        }
      })
      this.editParams.title = title
    },
    selectPerson(data) {   //获取巡检人员的名字
      let temp = []
      let arr = this.personOptions2
      this.editParams.userId = data
      this.personOptions.forEach((item, idx) => {   //选中名字的集合
        data.forEach((i,idx) => {
          if (i === item.personId) {
            temp.push({personId: item.personId,username:item.username})
          }
        })
      })
      this.personOptions2 = temp
    },
    hideTree(e) {
      if (e.target.id === '') {
        this.isShowTree = false
        this.isShowTree2 = false
        this.isShowTree3 = false
      }
    }
  }
 };
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.main-content
  margin-top:20px
  border-top:1px solid $color-border
  .search-container
    padding:20px 0 30px 0
    li
      height:40px
      line-height:40px
      margin-bottom:20px
      font-size:0
      &:last-child
        margin-bottom:0
      &.input-group
        .title
          width:80px
          display:inline-block
          text-align:left
          margin-right:20px
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:40px
  .table-container
    margin-top:10px
    border-radius(5px)
    overflow:hidden
    .edit-btn
      padding:10px
      text-decoration:underline
      cursor:pointer
      color:#f48c25
    .del-btn
      padding:10px
      text-decoration:underline
      cursor:pointer
      color:#ef3a41
  .pagination-container
    text-align:right
    margin-top:30px
  .tree-container
    position:absolute
    top:160px
    left:250px
    width:420px
    max-height:500px
    padding:15px 40px
    overflow-y:auto
    z-index:10001
    background: #fff
    border:1px solid $color-border
    border-radius(5px)
  .tree-container3
    position:absolute
    top:240px
    left:480px
    width:420px
    max-height:500px
    padding:15px 40px
    overflow-y:auto
    z-index:10001
    background: #fff
    border:1px solid $color-border
    border-radius(5px)
  .tree-container2
    position:absolute
    top:240px
    left:132px
    width:420px
    max-height:500px
    padding:15px 40px
    overflow-y:auto
    z-index:300
    background: #fff
    border:1px solid $color-border
    border-radius(5px)
    .button-container
      text-align:center
      margin-top:10px 
	.dialog-form
	  ul
	    padding:0 30px
	  .input-group
	    margin-bottom:20px
	  .input-group .title
      width:80px
      display:inline-block
      font-size:14px
      text-align:left
      vertical-align:middle
    .input-group .unit
      position:relative
      display:inline-block
      margin-left: -310px
      z-index: 100
	  .input-group .inner-input
	    width:350px
	    &.large
	      width:740px
	      .inner-input
	        width:500px
	      .img-upload
	        width:80px
	        display:inline-block
	        margin-left:20px
	    &.small
	    	width:110px
	  .edit-content
	    height:300px
	    overflow-y:auto
	    overflow-x:hidden
	    border-bottom:1px solid $color-border
	    .title
	      height:40px
	      line-height:40px
	      font-size:16px
	    .check-item
	      padding:10px
	      width:100%
	      margin:0
</style>
<style lang="css" scoped >
.my-tree-btns{
    width: 200px;
    margin: 0 auto;
  }
.form-items .inner-group:nth-child(2){
margin-left: 50px;
}
.form-items .inner-group .inner-input{
  width: 220px!important;
}
.btns-group{
width: 300px;
margin-left: 350px;
}
</style>
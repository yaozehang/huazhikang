<template>
<div class="workType-container">
  <div class="workType-content">
    <!-- 下拉查询 -->
    <div class="type-form">
      <ul class="search-form">
        <li class="input-group">
          <span class="title">工种名称</span>
          <el-input v-model="form.name" class="inner-input"></el-input>
          <el-select v-model="form.status" clearable placeholder="请选择" class="my-select">
              <el-option :label="item" :value="item" v-for="(item,index) in isUse" :key="index"></el-option>
          </el-select>
        </li>
        <!-- <ul class="type-btn clearfix">
          <li> <span class="common-btn orange-btn"  @click="searchType(form)" >查询工种</span></li>
          <li><span class="common-btn green-btn" @click=" addWokeType">新增工种</span></li>
        </ul> -->
        <li class="type-btn">
          <el-button type="success" round @click="searchType(form)">查询工种</el-button>
          <el-button type="warning" round @click=" addWokeType">新增工种</el-button>
        </li>
      </ul>
    </div>
    <div class="type-list-title border-bottom clearfix">
        <el-button class="title-btn" type="text">工种列表</el-button>
    </div> 
    <!-- pid是序号  jid是本身id-->
    <div class="list-table" >
      <el-table :data="tableData" border stripe  :row-style="rowStyle" :header-cell-style="rowStyle" max-height="700"  :row-class-name="tableRowClassName" center>
        <el-table-column prop="pid" label="序列号" width="100" > </el-table-column>
        <el-table-column prop="jid" label="id" width="100" > </el-table-column>
        <el-table-column prop="jobsName"  label="工种名称">  </el-table-column>
        <el-table-column  prop="status"  label="工种状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" class="safe-type"> 启用</span>
            <span v-else class="ban-type"> 禁用</span>
        </template>  </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">  
        <template slot-scope="scope">
          <span  @click="editTable(scope.$index, scope.row)">
            <span class="edit-work"> 修改信息</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页  //-->
    <div class="my-pagination">
        <div class="block">  
          <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="15"
            layout="total, prev, pager, next, jumper"  :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <!-- 新增弹出框 -->
      <div class="dialog-form" :visible.sync="addFormVisible">
     <el-dialog  class="dialog-form" title="新增工种" width="500px"  center :visible.sync="addFormVisible" >
        <el-form :model="addForm" label-width="80px" ref="addForm"  class="add-form" >
          <el-form-item label="工种名称" class="dialog-item"  >
            <el-input v-model="addForm.name" auto-complete="off" style="width: 100%;" 
           ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" >
            <el-select v-model="addForm.status" placeholder="请选择" style="width: 100%;">
               <el-option :label="item" :value="item" v-for="(item,index) in isUse" :key="index" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancleAdd(addForm)">取 消</el-button>
          <span class="add-comfirm">
           <el-button class="small-comfirm" @click="addType(addForm)" :disabled="forbid1">确 定</el-button>
          </span>
        </div>
      </el-dialog>
    </div>

    <!-- 修改弹出框 @blur="isRepeat(editForm.name,forbid2)" -->
    <div class="dialog-form" :visible.sync="editFormVisible">
     <el-dialog  class="dialog-form" title="编辑工种"  width="500px" center :visible.sync="editFormVisible" >
        <el-form :model="editForm" label-width="80px" ref="editForm"  class="add-form">
          <el-form-item label="工种名称" class="dialog-item">
            <el-input v-model="editForm.jobsName" auto-complete="off" style="width: 100%;"
             ></el-input>
          </el-form-item>
          <el-form-item label="是否启用" >
            <el-select v-model="editForm.status" placeholder="请选择" style="width: 100%;">
              <el-option :label="item" :value="item" v-for="(item,index) in isUse" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancleEdit(editForm)">取 消</el-button>
          <span class="add-comfirm">
           <el-button class="small-comfirm" @click="editType(editForm)" :disabled="forbid2">确 定</el-button>
          </span>
        <!--   <el-button type="primary" @click="editType(editForm)" :disabled="forbid2">确 定</el-button>
          <el-button @click="cancleEdit(editForm)">取 消</el-button> -->
        </div>
      </el-dialog>
    </div>
</div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {addWorkType,editWorkType,getWorkTypelist,getRepeat} from 'api/zone'
const item = {
  id: 1,
  jobsName: '工种一',
  status: '启用',
 }
  // 数据库结构
export default {
  name: 'WorkType',
  components: {
  },
  data () {
    return {
      currentPage: 1,
      total: 0,
      form: {
        name: '',
        status: '',
        page: 1,
        comId: getUserInfo().comPId
      },
      isUse: ['启用', '禁用'],
      editFormVisible: false,
      addFormVisible: false,
      forbid1: false,
      forbid2: false,
      repeat: true,
      addForm: {
        name: '',
        status: '启用',
        comId: getUserInfo().comPId
      },
      editForm: {
        jid: '',
        jobsName: '',
        status: '启用',
        comId: getUserInfo().comPId
      },
      formLabelWidth: '80px',
      tableData: [],
      localName: this.$route.name,
    }
  },
  mounted() {
    this.form.page = this.currentPage
    this.searchType()
  },
  methods: {
    errMsg(msg) {
      return this.$message({message: msg,type: 'error',center: true,duration: 10000})
    },
    sucMsg(msg) {
      return this.$message({message: msg,type: 'success',center: true,duration: 10000})
    },
    rowStyle() {
      return 'text-align: center'
    },
    // :row-class-name="tableRowClassName"
    tableRowClassName({row, rowIndex}) {   //设置表格一行的默认色
      if (rowIndex%2 == 0) {
        return 'success-row';
      }else{
        return '';
      }
    },
    searchType(form) {   // 条件查询   name  page  status
      var searchStatu 
     if(this.form.status === '启用'){
         searchStatu = 1
      } else if(this.form.status === '禁用'){
          searchStatu = 2
      }else if(this.form.status === ''){
          searchStatu = 0
      }
      let data={}
      Object.assign(data, this.form, {status: searchStatu})
      getWorkTypelist(qs.stringify(data)).then((res) =>{
        if(res){
          this.tableData = res.list
          this.total = res.sum
        }
      })
    },
    handleCurrentChange(val) {
       var Statu 
      if(this.form.status  === ''){
        Statu = 0
      } else if(this.form.status  === '启用'){
        Statu = 1
      } else if(this.form.status  === '禁用'){
        Statu = 2
      }
      this.form.page = val
      let data={}
      Object.assign(data, this.form, {status: Statu})
      console.log(data)
      getWorkTypelist(qs.stringify(data)).then((res) =>{
        if(res){
          this.tableData = res.list
          this.total = res.sum
        }
      })
    },
    isRepeat(name,forbid){      //  工种是否存在 返回的  y工种可以添加    n工种已经存在
      let data = {
        jobs: name,
        comId: getUserInfo().comId
      }
      if(name !==''){
        getRepeat().then((res) =>{
          if(res){
            this.repeat = false
          }else{
            this.repeat = true
          }
        })
      }
    },
    addWokeType(){
      this.addFormVisible  = true
      this.addForm.name = ''
    },
    addType(addForm) {
      // 1：启用，2：禁用
      var addStatu = this.addForm.status === '启用' ? 1 : 2
      let data = {}
      Object.assign(data, this.addForm, {status: addStatu})
      if(this.addForm.name!=='' && this.addForm.status !=='') {
        addWorkType(qs.stringify(data)).then((res) =>{
          if (res ==='添加成功') {
            this.getList()
            this.addFormVisible = false
            this.sucMsg(res)
          }else{
            this.addFormVisible = true
            this.errMsg(res)
          }
        })
      }else if(this.addForm.name ==='' || this.addForm.status ===''){
        this.errMsg('请输入要新增的工种信息')
      }
    },
    cancleAdd(addForm) {
      this.addFormVisible = false
    },
    editTable(index, row) {
      this.editFormVisible = true
      this.editForm.jid = row.jid
      this.editForm.jobsName = row.jobsName
      if( row.status === 1){
        this.editForm.status  = '启用'
      } else if(row.status === 2){
        this.editForm.status  = '禁用'
      } else if(row.status === 0){
        this.editForm.status  = ''
      }
    },
    editType(editForm) {   //修改工种信息
      let editStatu = this.editForm.status === '启用' ? 1: 2
      let data={}
      Object.assign(data, this.editForm, {status: editStatu})
        editWorkType(qs.stringify(data)).then((res) =>{
          if (res ==='修改成功') {
            this.getList()
            this.editFormVisible = false
            this.sucMsg(res)
          }else{
            this.editFormVisible = true
            this.errMsg(res)
          }
        })
    },
    cancleEdit(editForm) {
      this.editFormVisible = false
    },
  }
};
</script>
<style  lang="css">
 .workType-container .el-dialog__title{
    color: #0088ee;
  }
.add-comfirm .el-button:hover,.add-comfirm .el-button--default:hover{
color: #fff;
  }
</style>
<style lang="css" scoped>
.workType-container{
width: 100%;
/*margin-top: 30px;*/
}
.type-btn{
  width: 310px;
  margin-left: 90px;
}
.type-btn li{
  float: left;
  width: 130px;
  margin-right:50px;  
}
.type-btn li:nth-child(2){
margin-right: 0;
}
.edit-work{
  color: #4e99f4;
}
.edit-work:hover{
cursor: pointer;
}
.workType-content{
  width: 100%
}
.type-form{
  width: 500px;
  margin-bottom: 40px;
}
.type-form .search-form{
width: 500px;
}
 .type-form .search-form .title{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
 }
 .type-form .search-form .input-group{
margin-bottom: 30px;
margin-left: 40px;
}
 .type-form .search-form .input-group .inner-input{
width: 200px;
margin-right: 10px;
}
 .type-form .search-form .input-group .my-select{
  width: 100px;
}
.add-form{
  width: 100%;
  padding-top: 20px;
  border-top: 1px solid #ccc;
}
.ban-type{
  color: red;
}
.wire{height: 30px;width: 100%;border-bottom: 1px solid #ccc;margin-bottom: 18px}
.wire-btn{height: 46px;border-bottom: 1px solid #ef5924;padding: 0 10px;position:relative;}
.wire-btn button{position: absolute;top:1px;left: 10px;height: 45px;outline: none;border: none;border-radius: 5px 5px 0 0;padding: 0 18px;font-size: 16px;background-color: #f37b03;font-size: 16px;color: #fff}
.dm-list-table{margin-top: 10px; font-size: 16px; }
.list-table{
font-size: 16px;
}
</style>
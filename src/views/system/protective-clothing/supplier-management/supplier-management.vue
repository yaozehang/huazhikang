<template>
  <div class="zoneList-container">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form :inline="true" :model="form"  ref="form" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="供应商名称"  style="margin-right:30px;">
              <el-select v-model="form.name" clearable placeholder="请选择" class="common-input">
                <el-option  v-for="(item,index) in supplierList" :key="index"  :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="form.chargePerson" placeholder="" class="common-input"></el-input>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="是否启用"  style="margin-right:150px;">
              <el-select v-model="form.isUse" clearable placeholder="请选择" class="common-input">
                <el-option  v-for="(item,index) in isUse" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="searchList"  style="width:90px;margin-right:20px;">查询</el-button>
              <el-button type="primary" @click="addSupplier"  style="width:90px;">新增</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="zoneList-title border-bottom">
        <el-button class="title-btn" type="text">供应商列表</el-button>
      </div>
      <div class="zonList-table">  <!-- spPyCode  spDescribe -->
       <el-table :data="tableData"  stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="600">
        <!-- <el-table-column prop="spId"  label="序号"  width="50" > </el-table-column> -->
        <el-table-column  prop="spName" label="供应商名称" > </el-table-column>
         <el-table-column prop="spLinkman" label="联系人"> </el-table-column>
        <el-table-column  prop="spLinkTel" label="联系电话"> </el-table-column>
        <el-table-column  prop="spStatus" label="状态 "> </el-table-column>
<!--         <el-table-column  prop="spDescribe" label="gonyinhsangmaioshu"> </el-table-column>
         <el-table-column  prop="spPyCode" label="gonyinhsangmaioshu"> </el-table-column> -->
        <el-table-column   label="操作"  width="150"> 
          <template slot-scope="scope">
             <el-button size="mini" type="warning" style="margin-left:30px;" @click="editInfo(scope.$index,scope.row)">修改</el-button>
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
    <div class="del-form" :visible.sync="IsAdd">
     <el-dialog  class="dialog-form" title="供应商信息"  width="40%" :visible.sync="IsAdd" :closeOnClickModal ="false">
        <el-form :inline="true" :model="addForm"  ref="addForm" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="供应商名称"  style="margin-right:30px;" prop="name">
              <el-input v-model="addForm.name" placeholder="" class="common-input"></el-input>
            </el-form-item>
             <el-form-item label="是否启用" >
              <el-select v-model="addForm.isUse" clearable placeholder="请选择" class="common-input">
                <el-option  v-for="(item,index) in uselist" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
         <!--    <el-form-item label="拼音简码">
              <el-input v-model="addForm.pyCode" placeholder="" class="common-input"></el-input>
            </el-form-item> -->
          </div>
           <div class="form-items">
            <el-form-item label="联 系 人"  style="margin-right:30px;" prop="chargePerson">
              <el-input v-model="addForm.chargePerson" placeholder="" class="common-input"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telNum">
              <el-input v-model="addForm.telNum" placeholder="" class="common-input"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="供应商描述"  prop="info">
               <el-input v-model="addForm.info" placeholder="" type="textarea" :row="1" class="instructions-word"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="sureAdd">确 定</el-button>
          <el-button  @click="cancleAdd('addForm')">取消</el-button>
        </div>
      </el-dialog>
  </div>
<!-- 新增弹出框 结束-->
      <!-- 修改弹出框  -->
    <div class="del-form" :visible.sync="IsEdit">
     <el-dialog  class="dialog-form" title="供应商信息"  width="40%" :visible.sync="IsEdit">
        <el-form :inline="true" :model="editForm"  ref="editForm" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="供应商名称"  style="margin-right:30px;">
              <el-input v-model="editForm.name" placeholder="" class="common-input"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" >
              <el-select v-model="addForm.isUse" clearable placeholder="请选择" class="common-input">
                <el-option  v-for="(item,index) in uselist" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
           <!--  <el-form-item label="拼音简码">
              <el-input v-model="editForm.pyCode" placeholder="" class="common-input"></el-input>
            </el-form-item> -->
          </div>
           <div class="form-items">
            <el-form-item label="联 系 人"  style="margin-right:30px;">
              <el-input v-model="editForm.chargePerson" placeholder="" class="common-input"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="editForm.telNum" placeholder="" class="common-input"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="供应商描述" >
               <el-input v-model="editForm.info" placeholder="" type="textarea" :row="1" class="instructions-word"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="sureEdit">确 定</el-button>
          <el-button  @click="cancleEdit">取消</el-button>
        </div>
      </el-dialog>
  </div>
<!-- 修改弹出框 结束-->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
export default {
  name: '',
  data () {
    return {
      form: {
        name: '',
        chargePerson: '',
        isUse: '不限'
      },
      addForm: {
        name: '',
        pyCode: '',
        chargePerson: '',
        isUse: '启用',
        telNum: '',
        info: ''
      },
      editForm: {
        name: '',
        pyCode: '',
        chargePerson: '',
        isUse: '不限',
        telNum: '',
        info: ''
      },
      tableData: [{id: 1,iName: '张三'}],
      delId: 0,
      currentPage: 1,
      total: 0,
      IsAdd: false,
      IsEdit: false,
      uselist: ['启用', '禁用'],  // zifuchaun 
      isUse: ['不限', '启用', '禁用'],  // zifuhcan 
      editID: 0,
      partitionId: getUserInfo().comPId,
      supplierList: []
    }
  },
  mounted() {
    this.searchList()
    this.getSupplierList()
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
    searchList(){
      let data = {
        page: this.currentPage,
        spName: this.form.name,
        spLinkman: this.form.chargePerson,
        spStatus:  this.form.isUse,
        departId: this.partitionId
      }
      console.log(data)
      this.axios.post('/supp/selectsuppbypage.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          this.tableData = res.data.resultList
          this.total = res.data.sum
        }else{
          console.log(res)
        }
    })
    },
    // 请求所有供应商名称（下拉列表）：supp/selectsupnamelist.do
    getSupplierList(){
      let data={
        spPartitionId: getUserInfo().comPId
      }
      this.axios.post('/supp/selectsupnamelist.do',qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
        this.supplierList = res.data
        }else{
          console.log(res)
        }
    })
    },
    // 新增供应商
    addSupplier(){
      this.IsAdd =true
    },
    sureAdd() {   //  添加供应商：supp/addsupp.do  
      let data ={
        spName: this.addForm.name, //供应商名
        spPyCode: this.addForm.pyCode,
        spLinkman: this.addForm.chargePerson,
        spLinkTel: this.addForm.telNum,  
        spStatus: this.addForm.isUse,
        spDescribe: this.addForm.info,
        spPartitionId: this.partitionId
      }
    this.axios.post('/supp/addsupp.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
          if(res.data.msg === '添加成功') {
            this.IsAdd = false
            this.searchList()
            this.getSupplierList()
            this.sucMsg('新增成功')
          }else{
            this.IsAdd = true
            this.errMsg(res.data.msg)
          }
        }else{
          console.log(res.data)
        }
    })
    },
    cancleAdd(addForm) {
      this.$refs[addForm].resetFields()
    },
    //修改供应商    supp/selectsuppbyid.do    spId gongyinghshNG ID
    editInfo(index, row){
      this.IsEdit = true
      this.editID = row.spId
      let data = {
        spId: row.spId
      }
    this.axios.post('/supp/selectsuppbyid.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
          this.editForm.name = res.data.spName
          this.editForm.pyCode = res.data.spPyCode
          this.editForm.chargePerson = res.data.spLinkman
          this.editForm.telNum = res.data.spLinkTel
          this.editForm.isUse = res.data.spStatus
          this.editForm.info = res.data.spDescribe
        }else{
          console.log(res)
        }
    })

    },
    // supp/updatesupp.do
    sureEdit(){
      let data ={
        spId: this.editID,
        spName: this.editForm.name, //供应商名
        spPyCode: this.editForm.pyCode,
        spLinkman: this.editForm.chargePerson,
        spLinkTel: this.editForm.telNum,  
        spStatus: this.editForm.isUse,
        spDescribe: this.editForm.info,
        spPartitionId: this.partitionId
      }
    this.axios.post('/supp/updatesupp.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
          if(res.data.msg === '修改成功') {
            this.IsEdit = false
            this.searchList()
            this.sucMsg('修改成功')
          } else {
            this.errMsg(res.data.msg)
          }
        }else{
          console.log(res.data)
        }
    })
    },
    cancleEdit(){
       this.IsEdit = false
    },
    // 分页/条件查询供应商：
    handleCurrentChange(val) {
      let data = {
        page: val,
        spName: this.form.name,
        spLinkman: this.form.chargePerson,
        spStatus:  this.form.isUse,
        departId: this.partitionId
      }
      console.log(data)
    this.axios.post('/supp/selectsuppbypage.do', qs.stringify(data))
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
}
</script>

<style lang="css" scoped>
.zoneList-content{
width: 100%;
padding-top: 20px;
margin: 20px auto;
}
.zoneList-title{
  margin: 10px 0;
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
.common-input{
  width: 220px;
}
.instructions-word{
  width: 250%;
}
@media screen and (max-width: 1360px) {
  .instructions-word{
    width: 150%;
}
}
@media screen and (max-width: 1540px) {
  .instructions-word{
    width: 200%;
}
}
@media screen and (max-width: 1280px) {
  .instructions-word{
    width: 150%;
}
}
@media screen and (max-width: 1063px) {
  .instructions-word{
    width: 120%;
}
}
@media screen and (max-width: 1024px) {
  .instructions-word{
    width: 120%;
}
.common-input{
  width: 180px;
}
}
</style>
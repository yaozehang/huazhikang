<template>
<div class="archivesListType-main">
  <div class="select-container clearfix">
    <span class="title">文案类型：</span>
    <el-input v-model="file.type" placeholder="请选择" class="my-select" style="width:200px;margin-right:20px;" ></el-input>
    <span class="search-btn common-btn blue-check" @click="searchFile()" >查询</span>
    <span class="search-btn common-btn green-btn"  @click="addFile()" >新增</span>
  </div>
  <div class="list-title-all border-bottom">
    <el-button class="title-btn" type="text">档案类型管理</el-button>
  </div>
  <div class="list-tabel">
   <el-table :data="typeData" stripe border style="width: 100%"  :row-style="rowStyle" :header-cell-style="rowStyle"
   :row-class-name="tableRowClassName">
    <el-table-column label="序列号" prop="sort"  width="100"> </el-table-column>
    <el-table-column label="类型名称" prop="name"> </el-table-column>
    <el-table-column label="备注" prop="note"> </el-table-column>
    <el-table-column label="操作" fixed="right">
      <template slot-scope="scope">
        <el-button type="button"  @click="editType(scope.$index, scope.row)">
         <i class="el-icon-edit-outline"></i>
        </el-button>
        <el-button  type="button" @click="_del(scope.$index, scope.row)">
          <i class="el-icon-delete"></i>
        </el-button>
      </template>
     </el-table-column>
   </el-table>
  </div>
  <div class="my-pagination">
    <div class="block">
      <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" 
      :page-sizes="[15]"  :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"  :total="total">
      </el-pagination>
    </div>
  </div>
<!-- 新增弹出框 -->
  <div class="add-fileType" :visible.sync="IsAdd">
   <el-dialog  class="dialog-form" :title=" titleType === 0 ? '新增类型': '编辑类型' "  center width="500px" :visible.sync="IsAdd">
    <el-form :model="addForm" label-width="80px"  :rules="rules"  ref="addForm" style="width:80%;">
      <el-form-item label="类型名称" class="dialog-item"  prop="typeName" >
        <el-input v-model="addForm.typeName" auto-complete="off" style="width:100%;"></el-input>
      </el-form-item>
      <el-form-item label="备注" >
        <el-input v-model="addForm.note" auto-complete="off" style="width:100%;"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer my-footer-bths" >
        <el-button type="primary" @click="comfirmAdd('addForm')">确 定</el-button>
        <el-button @click="cancleAdd('addForm')">取 消</el-button>
      </div>
    </el-dialog>
</div>
<!-- 新增弹出框 结束-->
</div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {delOther,addOtherType,editOtherType,getOtherList} from 'api/archives.js'
export default {
  name: 'ArchivesListType',
  data () {
    return {
      typeData: [],
      IsAdd: false,
      IsEdit: false,
      IsDel: false,
      currentPage: 1,
      total: 10,
      pageSize: 15,
      editId: 0,
      delId: 0,
      file:{
        type: '',
        size: 15,
        page: 1,
        comPId: getUserInfo().comPId
      },
      addForm: {
        typeName: '',
        note: '',
        comPId: getUserInfo().comPId
      },
      fileType: ['类型一', '类型二', '类型三','类型四'],
      titleType: 0,
      rules: {
        typeName: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
      }
    }
  },
  mounted() {
    this.getFileType()
    this.file.page = this.currentPage
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    errMsg(msg) {
      return this.$message({ message: msg,type: 'error',center: true,duration: 1000})
    },
    sucMsg(msg) {
      return this.$message({ message: msg,type: 'success',center: true,duration: 1000})
    },
    tableRowClassName({row, rowIndex}) {   //设置表格一行的默认色
      if (rowIndex%2 == 0) {
        return 'success-row';
      }else{
        return '';
      }
    },
    getFileType() {     // 默认查询列表 
      getOtherList(qs.stringify(this.file)).then((res) =>{
        if(res){
          this.typeData = res.data
          this.total = res.total
        }
      })
    },
    searchFile() {     // 查询文件列表
      getOtherList(qs.stringify(this.file)).then((res) =>{
        if(res){
          this.typeData = res.data
          this.total = res.total
        }
      })
    },
    handleCurrentChange(val) {   //分页
      this.file.page = val
      getOtherList(qs.stringify(this.file)).then((res) =>{
        if(res){
          this.typeData = res.data
          this.total = res.total
        }
      })
    },
    addFile(){     // 新增类型按钮
      this.IsAdd = !this.IsAdd
      this.titleType = 0
      this.addForm.typeName = ''
      this.addForm.note = ''
    },
    comfirmAdd(addForm) {    // 新增类型
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          if(this.titleType === 0){   //新增
            this.addType()
          }else if(this.titleType === 1){
            this.editFileType()
          }
        } else {
          this.errMsg('请输入类型名称')
        }
      })
    },
    addType(){
      addOtherType(qs.stringify(this.addForm)).then((res) =>{
        if (res) {
          this.sucMsg('新增成功')
          this.getFileType()
          this.IsAdd = false
        }else{
          this.errMsg('新增失败')
        }
      })
    },
    cancleAdd(addForm) {
      this.IsAdd = !this.IsAdd
    },
    editType(index,row) {     // 编辑类型按钮
      this.IsAdd = !this.IsAdd
      this.titleType = 1
      this.addForm.typeName = row.name
      this.addForm.note = row.note
      this.editId = row.id
      console.log(row)
    },
    editFileType() { // 编辑类型事件
      let data = {}
      Object.assign(data,this.addForm,{id:this.editId})
      editOtherType(qs.stringify( data ) ).then((res) =>{
        if(res){
          this.getFileType()
          this.sucMsg('修改成功')
          this.IsAdd = false
        }else{
          this.errMsg('修改失败')
        }
      })
    },
    _del(index, row){     // 删除类型 
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOther(qs.stringify({ id: row.id,})).then((res) => {
          if (res) {
            this.getFileType()
            this.sucMsg('删除成功')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
};
</script>

<style lang="css" scoped>
.archivesListType-main{
  padding-top: 30px;
}
.search-btn{
  display: inline-block;
  margin-left: 20px;
  margin-right: 20px;
}
/*  .select-container
    padding:20px 0
    font-size:0
    .title
      margin-right:20px
      font-size:$font-size-medium-x
      color:$text-color-main
    .search-btn
      display: inline-block
      float: right
      width:120px*/
</style>
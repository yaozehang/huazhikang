<template>
  <div class="userList-container">
      <ul class="user-form" >
        <li class="clearfix">
          <span class="startDate">
            <span class="">载入开始时间（起）</span>
              <el-date-picker  v-model="form.startDate" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
          </span>
          <span class="username">
            <span > 文档名称</span>
            <el-input v-model="form.fileName" style="width: 250px;"></el-input>
          </span>
          <span class="search">
            <span class="search-btn common-btn blue-check" @click="searchFile()" >查询</span>
          </span>
        </li>
        <li class="clearfix">
          <span class="startDate">
            <span >载入结束时间（止）</span>
            <el-date-picker  v-model="form.endDate" value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"> </el-date-picker>
          </span>
          <span class=" username  ">
            <span > 文档类型</span>      
              <el-select v-model="form.type" clearable placeholder="请选择" style="width:250px;" label="文件类型">
              <el-option :label="item.typeName" :value="item.id" v-for="(item,index) in fileType" :key="index"></el-option>
            </el-select> 
          </span>
          <span class="search">
            <span class="search-btn common-btn green-btn"  @click="uploadFile()" >上传</span>
          </span>
        </li>  
     </ul>
      <div class="list-title-all border-bottom">
         <el-button class="title-btn" type="text">档案列表</el-button>
    </div>
<!--     :date:"2018-05-17"id:1name:""note:""path:"F:\HYS_TEST\hzk\web\WEB-INF\file\otherRecords\2018-05-17"
sort:1title:"档案编写表单内容.docx"type:"测试" -->
      <div class="list-table" >
      <el-table :data="tableData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="100%" :row-class-name="tableRowClassName">
        <el-table-column prop="sort" label="序列号" width="100" > </el-table-column>
        <el-table-column prop="title"  label="标题"  width="180">  </el-table-column>
        <el-table-column  prop="type"  label="类型">  </el-table-column>
        <el-table-column  prop="name"  label="上传者">  </el-table-column>
        <el-table-column  prop="date"  label="上传时间">  </el-table-column>
        <el-table-column  prop="note"  label="备注">  </el-table-column>
        <el-table-column fixed="right" label="操作">  
        <template slot-scope="scope">
          <div class="operate">
            <span class="scan" @click="view(scope.$index, scope.row)"> <i class="el-icon-view"></i></span>
              <!-- 下载 -->
            <span class="del" >
              <i class="el-icon-download"  @click="downFile(scope.$index, scope.row)"></i>
           </span>
            <span class="del" @click="deleteRow(scope.$index, scope.row)"> <i class="el-icon-delete"></i> </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
      <div class="my-pagination">
        <div class="block">
          <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage" 
           :page-sizes="[15]" :page-size="pageSize"
            layout=" total, sizes, prev, pager, next, jumper"  :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
<!-- 修改状态 -->
<!-- 上传弹出框   multiple 多选 -->
    <div class="upload-form" :visible.sync="IsUpload">
     <el-dialog  class="dialog-form" title="上传文档"  width="600px" :visible.sync="IsUpload">
        <el-form :model="uploadForm" label-width="80px" ref="uploadForm">
          <el-form-item label="文件类型" >
            <el-select v-model="uploadForm.type" placeholder="请选择" style="width:80%;" @change="selectType">
              <el-option :label="item.typeName" :value="item.id" v-for="(item,index) in fileType" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" class="dialog-item">
            <el-input v-model="uploadForm.remarks" auto-complete="off" style="width:80%;"></el-input>
          </el-form-item>
        </el-form>
     <!--  :http-request ="beforeUpload"   :before-upload="beforeUpload"
          :on-success="handlesuccess" -->
        <el-upload  class="upload-demo"  style="margin-bottom:30px; margin-left:20px;"
          action="123" multiple :before-upload="beforeUpload"
          :limit="3"   :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-dialog>
  </div>
<!-- 上传弹出框 结束-->
</div>
</template>

<script>
import {myurl} from '@/api/config.js'
import getUserInfo from 'common/js/user'
import {getListType,listDel,getSelsectlist} from 'api/archives.js'
import qs from 'qs'
export default {
  name: 'ArchivesList',
  data () {
    return {
      form: {
        startDate: '',
        endDate: '',
        type: '',
        fileName: '',
        page: 1,
        size: 15,
        comPId: getUserInfo().comPId
      },
      username: '',
      contactNumber: '',
      value1: '',
      value2: '',
      tableData:[] ,
      currentPage: 1,
      total: 0,
      pageSize: 15,
      editType: false,
      tipWord: '',
      editUser: false,
      IsUpload: false,
      type: '',
      uploadForm: {
        remarks: '',
        type: '',
        typeName: ''
      },
      groupId: '',
      fileType: ['卫生', '安全', '健康'],
      fileList: [],
      uploadId: 0,
    }
  },
  mounted() {
    this.form.page =  this.currentPage,
    this.getSelectFileType()
    this.searchFile()
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
    downFile(index, row){   //下载
      let url =`${myurl}/otherRecords/download.do?id=${row.id}`
      window.open(url)
    },
    view(index, row) {         // 预览
      let url =`${myurl}/otherRecords/preview.do?id=${row.id}`
      window.open(url)
    },
    getSelectFileType() {     // 获取下拉选择文档类型 
      getSelsectlist(qs.stringify({comPId: getUserInfo().comPId})).then((res) =>{
        if(res){
          let temp = []
          res.data.map((item,index) =>{
            temp.push({typeName:item.typeName, id: item.id})
            return temp
          })
          this.fileType = temp
        }
      })
    },
    searchFile(){     // 条件查询 
      let data = {}
      Object.assign(data,this.form,{startDate: this.form.startTime || '1900-01-01',endDate: this.form.endTime || '3100-01-02',})
      getListType(qs.stringify(data)).then((res) =>{
        console.log(res)
        if(res.data){
          this.tableData = res.data
          this.total = res.total
          this.currentPage =  res.curPage
        }
      })
    },
    handleCurrentChange(val) {   //分页查询
      this.form.page = val
      let data = {}
      Object.assign(data,this.form,{startDate: this.form.startTime || '1900-01-01',endDate: this.form.endTime || '3100-01-02',})
      getListType(qs.stringify(data)).then((res) =>{
        if(res.data.length ){
          this.tableData = res.data
          this.total = res.total
          this.currentPage =  res.curPage
        }
      })
    },
    editUserInfo(row,index){
      this.editUser = ! this.editUser
    },
    // 上传文档按钮 获取id
    uploadFile() {
      this.IsUpload = ! this.IsUpload
      this.fileList = []
    },
    handlepreview(file){
      this.fileList.push({name: file.name})
    },
    // 上传文档事件 otherRecords/upload.do  上传    file文件   note备注   typeId类型id   typeName类型名称  // 上传之前
    beforeUpload (file,fileList) { 
       this.fileList.push({name: file.name})
       let fd = new FormData()
       fd.append('file', file)
       fd.append('note', this.uploadForm.remarks)
       fd.append('typeId', this.uploadForm.type)
       fd.append('typeName', this.uploadForm.typeName)
       fd.append('comPId', getUserInfo().comPId)
      let config = {
        headers: {
          'Content-Type': 'multpart/form-data'
        }
      }
      if(this.uploadForm.type) {
        this.axios.post('/otherRecords/upload.do',fd, config)
       .then((res) => {
          if(res.status === 200){
            this.sucMsg('上传成功')
            this.searchFile()
          }else{
            this.errMsg('上传失败')
          }
       }).catch(err => {
        this.errMsg('error')
        })
      return true
      } else {
        this.errMsg('请选择文件类型')
      }

   },
   handlesuccess(file, fileList){
   }, // 上传文档结束
     // 删除一行 otherRecords/detele.do  删除  id
  deleteRow(index, row) {
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        listDel(qs.stringify({id: row.id})).then((res) =>{
        if(res){
          this.searchFile()
          this.sucMsg('删除成功')
        }else{
          this.errMsg('删除失败')
        }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    selectType(data) {
      let name = ''
      this.fileType.forEach((item, idx) => {
        if (item.id === data) {
          name = item.typeName
        }
      })
      this.uploadForm.typeName = name
    }
  }
  };
</script>

<style lang="css" scoped>
.user-form li{
  margin: 20px 0;
}
.startDate,.username{
  display: inline-block;
  margin-right: 50px;
}
.upload-btn{
  display: inline-block;
  margin-right: 50px;
}
.filetype{
   height: 40px;
}
.filetype span{
 float: left;
}
.file-select{
  float: right;
  margin-left: 20px;
}
.type-name{
  display: inline-block;
  margin-top: 20px;
  height: 40px;
}
.operate span{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 20px;
}
</style>
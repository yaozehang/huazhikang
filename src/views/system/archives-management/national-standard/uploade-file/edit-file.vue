<template>
  <!-- 页面样式 -->
  <div class="file-container">
  <div class="list-title-all border-bottom">
    <el-button class="title-btn" type="text">新建上传</el-button>
    <el-button class="return" @click="goBack" >返回</el-button>
  </div>
  <div class="file-content clearfix">
    <div class="file-left">
     <ul class="nav clearfix">
      <li>
        <el-upload  class="upload-demo my-uploade"  style="margin-bottom:1px;"
        ref="newupload"
        :before-upload= "beforeUpload"
         action="123"
        :file-list="fileList">
      <el-button type="" >上传文件</el-button>
      </el-upload>
      </li>
      <li>
        <el-button type="" @click="creatFiles">新建文件</el-button>
      </li>
    </ul>
    <div class="bread-nav">       <!-- :to="{ path: '/' }" -->
      <ul class="bread-ul clearfix">
        <li class="text-ellipsis" @click="_getFileList">全部></li>
        <li v-for="(item,index) in breadList" :key="index" class="text-ellipsis" track-by="index" @click="_getFileListById(item,index)"> {{item.fName}} </li>
      </ul>
  </div>
    <div class="my-table">
      <el-table :data="fileData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle"
       max-height="700"   ref="multipleTable"  @selection-change="handleSelectionChange" >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号" width="50" type="index"> </el-table-column>
        <el-table-column  label="名字" >
           <template slot-scope="scope">
            <div class="file-name" @click="editFile(scope.$index,scope.row)">
              <span class="logo-img">
                <img src="static/img/files.png" alt="文件夹" v-if="scope.row.type === 1">   
                <img src="static/img/word.png" alt="文件夹" v-if="scope.row.type === 2"> 
                <img src="static/img/pdf.png" alt="文件夹" v-if="scope.row.type === 3">
                <img src="static/img/PNG.png" alt="文件夹" v-if="scope.row.type === 4"> 
                <!-- <img src="static/img/PNG.png" alt="文件夹" v-if="scope.row.type === 4"> -->
                </span>
              <span class="name-row text-ellipsis" >{{scope.row.fName}}</span>
            </div>
          </template>
         </el-table-column>
         <el-table-column  label="操作" > 
            <template slot-scope="scope">
             <!--  <span class="operate-btn" v-if="scope.row.type === 1" @click="addInnerFloder(scope.$index,scope.row)">新建文件夹</span> -->
              <span class="operate-btn" v-if="scope.row.type !== 1">下载文件</span>
              <span class="operate-btn" v-if="scope.row.type !== 1">预览文件</span>
              <span class="operate-btn" @click="editName(scope.$index,scope.row)">重命名</span>
              <span class="operate-btn" @click="delRow(scope.$index,scope.row)">删除</span>
            </template>
         </el-table-column>
      </el-table>
    </div>
    </div>
    <div class="file-right">
      <h3>传输列表</h3>
      <div class="no-uploadeData" v-if="noUploadeData">
        <div class="no-uploade-img">
          <img src="static/img/no-uploade.png" alt="">
        </div>
        <p>暂无上传数据，请先上传</p>
      </div>
       <div class="uploadeHistory" v-if="!noUploadeData">
        <ul class="uploadeHistory-title">
          <li class="file-number">
            共上传了 <span class="num"> {{num}} </span>份文件
          </li>
          <li>
            <el-button type="" >清空历史记录</el-button>
          </li>
        </ul>
        <ul class="data-list">
          <li class="clearfix" v-for=" (item,index) in historyList" :key="index">
            <div class="item-left">
              <span class="item-img">
                <img src="static/img/word.png" alt="文件夹" v-if="item.status === 2">
                <img src="static/img/pdf.png" alt="文件夹" v-if="item.status === 3">
                <img src="static/img/PNG.png" alt="文件夹" v-if="item.status === 4">
              </span>
              <span class="item-name"> {{ item.name}}</span>
            </div>
            <div class="item-right">
              <span class="creat-time"> {{item.time}} </span>
              <span class="del"><i class="el-icon-delete"></i></span>
            </div>
          </li>
        </ul>
      </div>
       <!-- 新建弹出框/重命名-->
       <el-dialog :title="editType===0?'新建文件夹':'重命名' "  width="400px" center :visible.sync="isAddFloder">
          <span>文件夹名</span>
          <el-input v-model="floderName" placeholder="" class="inner-input" ></el-input>
          <div slot="footer" class="dialog-footer my-footer-bths" >
            <el-button type="primary" @click="comfirmAdd()">确 定</el-button>
            <el-button @click="cancleAddFloder">取 消</el-button>
          </div>
        </el-dialog>
  <!-- 新建弹出框结束-->
        <!-- 删除弹出框 -->
       <el-dialog title=""  width="400px" center :visible.sync="isDel">
          <p class="center-text">删除之后数据不可恢复</p>
          <div slot="footer" class="dialog-footer my-footer-bths" >
            <el-button type="primary" @click="delFile()">确 定</el-button>
            <el-button @click="cancleDelFile">取 消</el-button>
          </div>
        </el-dialog>
  <!-- 删除弹出框结束-->
    </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {getFileList,getFileListById,creatFloder,delFloder,delFile,renameFloder,renameFile} from 'api/archives.js'
export default {
  name: 'data-file',
  data () {
    return {
      id: $route.params.id,
      form: {},
      fileData: [],
      multipleSelection: [],
      fileList: [],
      fileList2: [],
      noUploadeData: true,
      isAddFloder: false,
      isDel: false,
      IsEdit: false,
      num: 15,
      historyList: [],
      editType: '',
      delId: '',
      editType: 0,
      floderName: '',
      newFloder: {
        fYear: this.$route.query.fYear,   //年份
        fSmallId: this.$route.query.fSmallId,   //小类型id
        fBigId: this.$route.query.fBigId,  //大类型id
        fParentId: 0,   //父级id
        fName: ''  //文件名称
      },
      selectParam: {
        year: this.$route.query.fYear,   //年份
        smallId: this.$route.query.fSmallId,   //小类型id
        bigId: this.$route.query.fBigId,  //大类型id
        comPId: getUserInfo().comPId,   
        fId: 0
      },
      uploadeId: 0,
      editFloder: {
        fId: '',
        fName: ''
      },
      breadList: [],
      multipleSelection:[],
      delType: 0,
      delId: 0,
      creatType: 0,
    }
  },
  watch:{
  },
  mounted() {
    console.log($route.params.id)
    this._getFileListById()
    if(this.historyList.length === 0){
      this.noUploadeData = true
    }
    // console.log(this.newFloder)
  },
  methods: {
    rowStyle() {
     return 'text-align:left'
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
    creatArray(data){
      let temp =[]
      data.map((item,index) => {
          if(item.fileName.indexOf('doc')!==-1){
            temp.push({fName:item.fileName,fId:item.id,
              fBigId: 0,fParentId: 0,fSmallId: 0,fYear: 0,type: 2})
          }else if(item.fileName.indexOf('pdf')!==-1){
            temp.push({fName:item.fileName,fId:item.id,
              fBigId: 0,fParentId: 0,fSmallId: 0,fYear: 0,type: 3})
          }else{
            temp.push({fName:item.fileName,fId:item.id,
              fBigId: 0,fParentId: 0,fSmallId: 0,fYear: 0,type: 4})
          }
        })
      return temp
    },
    _getFileList(){
      this.$router.push({path:'/wrap/archives/nation/check/file'})
    },
    _getFileListById(){
      getFileListById(qs.stringify({fId:this.id})).then((res) => {
        let temp = res.folder
          temp.map((item,index) => {
            item.type = 1
          })
          let temp2 = this.creatArray(res.file)
          this.fileData = temp2.concat(temp)
        })
    },
    getAllList(data){
      getFileListById(qs.stringify({fId:data})).then((res) => {
        let temp = res.folder
          temp.map((item,index) => {
            item.type = 1
          })
          let temp2 = this.creatArray(res.file)
          this.fileData = temp2.concat(temp)
        })
    },
    goBack(){
      this.$router.push({path:'/wrap/archives/nation/check'})
    },
    changeData(){
      console.log('nsd')
    },
    handleSelectionChange(val) {       //  获取选中的值
        let ret = []
        this.multipleSelection = val
        console.log(this.multipleSelection[0].fId)
        this.uploadeId =this.multipleSelection[0].fId    
    },
    beforeUpload(file) {   //最外层上传
      let fd = new FormData()
      fd.append('file', file)
      fd.append('note', 'gdsduav')
      fd.append('typeOne', this.newFloder.fBigId)
      fd.append('typeTwo', this.newFloder.fSmallId)
      fd.append('comPId', getUserInfo().comPId)
      fd.append('userId', getUserInfo().userId)
      fd.append('userName', getUserInfo().username)
      fd.append('folderId', this.uploadeId)
      let config = {
      headers: {
        'Content-Type': 'multpart/form-data'
      }
     }
    this.axios.post('web/occuHealthRecordsManage/upload.do',fd, config).then((res) => {
      if(res.status === 1){
        this.sucMsg('上传成功')
      }
    })
    },
    getFIleId(row){
      this.uploadeId = row.fId
      console.log(row)
    },
    handleSuccess(file, fileList){   //上传成功
    },
    editFile(index,row){
      if(row.type === 1) {   //文件夹重新获取数据
        this.breadList.push({fName:row.fName,id:row.fId})
        this.$router.push({path: '/wrap/archives/nation/check/file/edit',params:{id:row.fId}})
      }
    },
    delRow(index,row){   //获取删除的id
      this.isDel = true
      this.delId = row.fId
      this.fileData.splice(index,1)
      if(row.type = 1){  //文件夹
        this.delType = 1
      }else {   //文件
        this.delType =2
      }
    },
    delFile(){   //删除文件夹/文件
      if(this.delType = 1) {
        this._delFloder()
      }else{
        this._delFile()
      }
    },
    _delFloder() {  //删除文件夹
      delFloder(qs.stringify({id: this.delId})).then((res) => {
        if(res === '删除成功'){
          this.isDel = false
          this.$message({message: res, type: 'success'})
        } else{
          this.$message({message: res, type: 'error'})
        }
      })
    },
    _delFile(){   //删除文件
      delFile(qs.stringify({id: this.delId})).then((res) => {
        if(res === '删除成功'){
          this.isDel = false
          this.$message({message: res, type: 'success'})
        } else{
          this.$message({message: res, type: 'error'})
        }
      })
    },
    cancleDelFile(){   //取消删除
      this.isDel = false
    },
    editName(index,row){   //展开重命名
      this.editType = 1
      this.isAddFloder  = true
      this.editFloder.fId = row.fId
      this.floderName = row.fName
    },
    goHome() {
      this.$router.push({path: '/'})
    },
    showEdit(item){
      this.IsEdit = true
      this.editType = item.type
    },
    comfirmAdd(){   //弹窗确定
      if(this.editType === 0) {   //新建
        this.addFloder()
      } else if(this.editType === 1) {   //重命名
       this._renameFloder()
      }
    },
    _renameFloder(){
      this.editFloder.fName = this.floderName
      renameFloder(qs.stringify(this.editFloder)).then((res) => {
          if(res === '修改成功') {
            this.isAddFloder  = false
            this.$message({message: res, type: 'success'})
          }
      })
    },
    cancleAddFloder() {
      this.isAddFloder  = false
    },
    creatFiles(){
      this.isAddFloder  = true
      this.editType = 0
      if(this.multipleSelection.length!==0 && this.multipleSelection[0].type === 1){   //内部新建文件夹
        this.newFloder.fParentId = this.multipleSelection[0].fId 
        this.creatType = 1
      }else{
        this.newFloder.fParentId = 0   //外层新建文件夹
        this.creatType = 0
      }
    },
    addFloder(index,row){    // 小类型下确定新建
      this.newFloder.fName = this.floderName
      creatFloder(qs.stringify(this.newFloder)).then((res) => {
        if(res === '新建成功'){
          this.isAddFloder  = false
          if(this.creatType === 0){
            this._getFileList()
          }else {
            getFileListById(qs.stringify({fId:this.newFloder.fParentId})).then((res) => {
              let temp = res.folder
              temp.map((item,index) => {
                item.type = 1
              })
              let temp2 = this.creatArray(res.file)
              this.fileData = temp2.concat(temp)
            })
          }
          this.$message({message: res, type: 'success',})
        }
      })
    },
    cancleAdd(index,row){   //取消新建
      this.fileData.splice(index,1)
    }
  }
}
</script>

<style lang="css" scoped>
.return{
  display: inline-block;
  float: right;
  margin-right: 20px;
}
.inner-input{
  width: 300px;
  margin-left: 20px;
  padding-left: 20px;
}
.center-text{
  text-align: center;
}
.bread-nav{
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.bread-ul li{
  float: left;
  width: 80px;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
}
.bread-ul li:hover{
  cursor: pointer;
  color: #409EFF;
}
.nav li{
  float: left;
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
}
.bread-ul li:first-child{
  margin-right: 0!important;
}
.operate-btn{
  display: inline-block;
  margin-right: 10px;
}
.operate-btn:hover{
  cursor: pointer;
  color: #409EFF;
}
.logo-img{
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.logo-img img{
  width: 100%;
  height: 100%;
}
.inner-input{
  width: 150px;
}
.text-ellipsis{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.name-row{
  max-width: 100px;
}
.file-container{
  width: 100%;
  padding:20px;
}
.file-left{
  float: left;
  width: 60%;
}
.file-right{
  float: right;
  width: 30%;
  margin-right: 30px;
}
.file-list{
  height: 500px;
}
.file-list li{
  float: left;
  width: 100px;
  height: 155px;
  margin: 20px 20px;
}
.file-img{
  width: 100px;
  height: 117px;
}
.file-img img{
  width: 100%;
  height: 100%;
}
.file-name{
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.no-uploade-img{
  width: 64px;
  margin: 100px auto 20px auto;
  height: 57px;
}
.no-uploade-img img{
  width: 100%;
  height: 100%;
}
.no-uploadeData p{
  text-align: center;
}
.uploadeHistory-title li{
float: left;
width: 160px;
height: 40px;
line-height: 40px;
}
.uploadeHistory-title li:first-child{
  margin-right: 30px;
} 
.data-list li{
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.data-list li .item-left{
  float: left;
  width: 60%;
}
.item-left .item-name{
  display: inline-block;
  width: 134px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.data-list li .item-right{
  float: right;
  width: 38%;
}
.item-left .item-img{
  display: inline-block;
  width: 30px;
  height: 30px;
}
.item-left .item-img img{
  width: 100%;
  height: 100%;
}
.num{
color: #86c1fe;
}
</style>
  <div class="edit-container">
    <ul class="nav">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-width="20px">
        <el-form-item label="" v-if="editType === 1">
          <el-button type="" >上传文件</el-button>
        </el-form-item>
        <el-form-item label="" v-if="editType === 1">
          <el-button type="" >新建文件夹</el-button>
        </el-form-item>
        <el-form-item label="" >
          <el-button type="" >删除文件</el-button>
        </el-form-item>
        <el-form-item label="" >
          <el-button type="" >重命名</el-button>
        </el-form-item>
        <el-form-item label="" >
          <el-button type="" >下载文件</el-button>
        </el-form-item>
        <el-form-item label="" >
          <el-button type="" >预览文件</el-button>
        </el-form-item>
      </el-form>
    </ul>
    <div class="view-content">
      <div class="uploade-file" v-if="">
        <ul class="file-list clearfix">
      <!-- 1 文件夹 2 word 3 PDF 4 图片 -->
       <li class="" v-for="(item,index) in fileData"  track-by="index" :key="index" @click="showEdit(item)">
         <div class="file-img">
            <img src="static/img/files.png" alt="文件夹" v-if="item.status === 1">   
            <img src="static/img/word.png" alt="文件夹" v-if="item.status === 2">
            <img src="static/img/pdf.png" alt="文件夹" v-if="item.status === 3">
            <img src="static/img/PNG.png" alt="文件夹" v-if="item.status === 4">
         </div>
         <p class="file-name">{{item.name}} </p>
       </li>
     </ul>
      </div>
    </div>
  </div>
</template>

<script>
const fileData = [
  {
    name: '文件夹一',
    status: 1,   //文件夹
  },
   {
    name: '文件一1654mvoerignfibkfnb9eiovfhnfb9whjf',
    status: 2,  //word
  },
   {
    name: '文件一',
    status: 3,  //pdf
  },
   {
    name: '文件13',
    status: 4,  //img
  },
  ]
export default {
  name: 'edit-file',
  props: {
    editType: Number
  },
  data () {
    return {
      fileData: fileData
    }
  },
  methods: {
    showEdit(item){
      // 请求更新数据

    }
  }
}
</script>

<style lang="css" scoped>
.file-container{
  width: 100%;
}
.file-list{
  height: 500px;
}
.file-list li{
  float: left;
  width: 100px;
  height: 155px;
  margin: 20px 20px;
}
.file-img{
  width: 100px;
  height: 117px;
}
.file-img img{
  width: 100%;
  height: 100%;
}
.file-name{
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
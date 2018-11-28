<template>
  <!-- 页面样式 -->
  <div class="file-container">
  <div class="list-title-all border-bottom">
    <button class="title-btn">新建上传</button>
    <el-button class="return" @click="goBack" >返回</el-button>
  </div>
  <div class="file-content clearfix">
    <!-- 上传弹窗          :on-progress="onProgress"   :on-success="handleSuccess"-->
    <el-dialog  class="dialog-form" title="" center width="800px" :visible.sync="fileLisShow">
       <el-upload  class="upload-demo my-uploade"  style="margin-bottom:1px;"
        ref="newupload" multiple
        :before-upload= "beforeUpload"
         action="123"
        :file-list="fileList">
      <el-button type="" >选择文件</el-button>
      </el-upload>
      <!-- 上传进度 -->
   <!--    <div class="progress-bar">
      <el-progress v-if="progressFlag = true" color="#8e71c7" :percentage="uploadPercent" ></el-progress>
      </div> -->
    </el-dialog>
    <!-- 上传弹窗 -->
    <div class="file-left">
     <ul class="nav clearfix">
      <li>
      <el-button type=""  @click="uploadeFile">上传文件</el-button>
      </li>
      <li>
        <el-button type="" @click="creatFiles">新建文件</el-button>
      </li>
    </ul>
    <div class="bread-nav">       <!-- :to="{ path: '/' }" -->
      <ul class="bread-ul clearfix">
        <li class="text-ellipsis" @click="getFileListAll">全部></li>
        <li v-for="(item,index) in breadList" :key="index" class="text-ellipsis" track-by="index" @click="_getFileListById(item,index)"> {{item.fName}} </li>
      </ul>
  </div>
  <!--  -->
    <div class="my-table">
      <el-table :data="fileData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle"
       max-height="700"   ref="multipleTable"  @selection-change="" >
<!--         <el-table-column type="selection" > </el-table-column> -->
        <el-table-column label="序号" width="50" type="index"> </el-table-column>
        <el-table-column  label="名字" >
           <template slot-scope="scope">
            <div :class=" scope.row.type === 1 ? 'floder-name' : 'file-name'" @click="editFile(scope.$index,scope.row)">
              <span class="logo-img">
                <img src="static/img/files.png" alt="文件夹" v-if="scope.row.type === 1">   
                <img src="static/img/word.png" alt="文件夹" v-if="scope.row.type === 2"> 
                <img src="static/img/pdf.png" alt="文件夹" v-if="scope.row.type === 3">
                <img src="static/img/PNG.png" alt="文件夹" v-if="scope.row.type === 4"> 
                </span>
              <span class="name-row text-ellipsis" >{{scope.row.fName}}</span>
            </div>
          </template>
         </el-table-column>
         <el-table-column  label="操作" > 
            <template slot-scope="scope">
           <!--    <span class="operate-btn" v-if="scope.row.type === 1" @click="addInnerFloder(scope.$index,scope.row)">新建文件夹</span> -->
              <span class="operate-btn" v-if="scope.row.type !== 1" @click="downFile(scope.$index,scope.row)">下载文件</span>
              <span class="operate-btn" v-if="scope.row.type !== 1" @click="scanFile(scope.$index,scope.row)">预览文件</span>
              <span class="operate-btn" v-if="scope.row.type === 1" @click="editName(scope.$index,scope.row)">重命名</span>
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
            <el-button type=""  @click="_delHistoryLIst">清空历史记录</el-button>
          </li>
        </ul>
        <ul class="data-list">
          <li class="clearfix" v-for=" (item,indedx) in historyList">
            <div class="item-left">
              <span class="item-img">
                <img src="static/img/word.png" alt="文件夹" v-if="item.type === 2">
                <img src="static/img/pdf.png" alt="文件夹" v-if="item.type === 3">
                <img src="static/img/PNG.png" alt="文件夹" v-if="item.type === 4">
              </span>
              <span class="item-name"> {{ item.fileName}}</span>
              <span v-if="item.uploadStatus === 1"> <i class="el-icon-success"></i></span>
              <span v-if="item.uploadStatus === 0"><i class="el-icon-error"></i></span>
            </div>
            <div class="item-right">
              <span class="creat-time text-word"> {{item.uploadDate}} </span>
              <span class="del"><i class="el-icon-delete" @click="_delHistoryItem(item)"></i></span>
            </div>
          </li>
        </ul>
      </div>
       <!-- 新建弹出框/重命名-->
       <el-dialog :title="editType===0?'新建文件夹':'重命名' "  width="400px" center :visible.sync="isAddFloder">
          <span>文件夹名</span>
          <el-input v-model="floderName" placeholder="" class="inner-input" @blur="_floderIsReapeat"></el-input>
          <div slot="footer" class="dialog-footer my-footer-bths" >
            <el-button type="primary" @click="comfirmAdd()" :disabled="disabled">确 定</el-button>
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
import {myurl} from '@/api/config.js'
import getUserInfo from 'common/js/user'
import {getFileList,getFileListById,creatFloder,delFloder,delFile,renameFloder,renameFile,getHistoryLIst,delHistoryLIst,delHistoryItem,floderIsReapeat} from 'api/archives.js'
export default {
  name: 'data-file',
  components: {
  },
  data () {
    return {
      form: {},
      fileData: [],
      multipleSelection: [],
      fileList: [],
      fileList2: [],
      noUploadeData: true,
      isAddFloder: false,
      isDel: false,
      IsEdit: false,
      disabled: true,
      fileLisShow: false,
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
        fName: '',  //文件名称
        fComPId: getUserInfo().comPId
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
        fName: '',
        type: 0 ,  //0 文件 1 文件夹
      },
      breadList: [],
      multipleSelection:[],
      delType: 0,
      delId: 0,
      creatType: 0,
      delIndex:0,
      editId: 0,
      fileList: [],
      dataReapeat: {
        year: this.$route.query.fYear,
        comPId: getUserInfo().comPId,
        folderName: ''
      },
      flagUpload: false,
      progressFlag: false,
      uploadPercent: 10,
      dialogName: ''
    }
  },
  watch:{
  },
  created(){
    this.fileList = []
  },
  mounted() {
    this._getFileList()
    this._getHistoryLIst()
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
        message: msg, type: 'error',center: true,duration: 1000
      })
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,type: 'success',center: true,duration: 1000
      })
    },
    scanFile(index,item){   //预览
      let url =`${myurl}/web/occuHealthRecordsManage/preview.do?id=${item.fId}`
      window.open(url)
    },
    downFile(index,item){   //预览
      let url =`${myurl}/web/occuHealthRecordsManage/download.do?id=${item.fId}`
      window.open(url)
    },
    _floderIsReapeat(){
      if(this.editType === 0) {   //新建
        this.dataReapeat.folderName = this.floderName
      }else if(this.editType === 1) {   //重命名
        this.dataReapeat.folderName = this.floderName
      }
      floderIsReapeat(qs.stringify(this.dataReapeat)).then((res) => {
        console.log(res)
        if(res.status === 1){   //成功 不重复
          this.disabled = false
          this.sucMsg(res.msg)
        } else if(res.status === 2){  // 2 重复
          this.disabled = true
          this.errMsg(res.msg)
        }else{
          this.errMsg(res.msg)
        }
      })
    },
    _delHistoryLIst(){
      delHistoryLIst().then((res) =>{
        console.log(res)
        if(res === '清除成功'){
          this._getHistoryLIst()
           this.sucMsg(res)
        }
      })
    },
    _delHistoryItem(item){
        let data = {id: item.id}
      delHistoryItem(qs.stringify(data)).then((res) =>{
        console.log(res)
        if(res === '删除成功'){
          this._getHistoryLIst()
          this.sucMsg(res)
        }
      })
    },
    _getHistoryLIst(){
      getHistoryLIst().then((res) => {
        console.log(res)
        if(res){
          this.historyList = this.creatHistory(res)
          this.num = res.length
          this.noUploadeData = false
        }
      })
    },
    creatHistory(data){
      if(data.length !==0){
        data.map((item,index) => {
          if(item.fileName.indexOf('doc')!==-1){
              item.type = 2
          }else if(item.fileName.indexOf('pdf')!==-1){
            item.type = 3
          }else{
            item.type = 4
          }
        })
      } 
      return data
    },
    creatArray(data){
      let temp =[]
      if(data.length !==0){
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
      } 
      return temp
    },
    getFileListAll(){   //点击全部 获取
       console.log(this.newFloder.fParentId,this.uploadeId)
      this.breadList = []
      this.newFloder.fParentId = 0
      this.selectParam.fId = 0
      this.uploadeId = 0
      console.log(this.newFloder.fParentId,this.uploadeId)
      getFileList(qs.stringify(this.selectParam)).then((res) => {
        console.log(res)
        let temp = res.folder
        temp.map((item,index) => {
          item.type = 1
        })
        let temp2 = this.creatArray(res.file)
        this.fileData = temp2.concat(temp)
      })
    },
    _getFileList(){   //获取最外层文本和文件夹
      this.breadList = []
      getFileList(qs.stringify(this.selectParam)).then((res) => {
        console.log(res)
        let temp = res.folder
        temp.map((item,index) => {
          item.type = 1
        })
        let temp2 = this.creatArray(res.file)
        this.fileData = temp2.concat(temp)
      })
    },
    getAllList(data){   //获取内层文本和文件夹
      getFileListById(qs.stringify(data)).then((res) => {
        if(res){
          let temp2 = []
          if(res.folder){
            let temp = res.folder
            temp.map((item,index) => {
              item.type = 1
            })
            if(res.file){
              temp2 = this.creatArray(res.file)
            }
            this.fileData = temp2.concat(temp)
          }else{
            this.fileData  = []
          }
        }
      })
    },
    _getFileListById(item,index){
      this.breadList.splice(index+1, 1)
      this.selectParam.fId = item.fId
      this.uploadeId = item.fId
      this.newFloder.fParentId = item.fId
      let data ={fId:item.fId}
      this.getAllList(data)
    },
    goBack(){
      this.$router.push({path:'/wrap/archives/nation/check',query: {menuId:4, name:'职业健康监护档案'}})
    },
    changeData(){
      console.log('nsd')
    },
    handlepreview(file){
      this.fileList.push({name: file.name})
      console.log(this.fileList)
    },
    uploadeFile(){  //上传按钮 
      this.fileList = []
      this.fileLisShow = true
      this.uploadPercent  = 0
    },
    beforeUpload(file,fileList) {   //最外层上传
      this.uploadPercent  = 10
      this.progressFlag = true
      this.fileList.push({name: file.name})
      this.uploadeId = this.newFloder.fParentId 
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
      if(res.status === 200){
        this.sucMsg('上传成功')
        this.uploadPercent = 100
        this._getHistoryLIst()
        // this.fileLisShow = false
        if(this.creatType === 0){   //获取外层文件夹和文件
            this._getFileList()
        }else {  //内部上传文件夹
          let data ={fId:this.newFloder.fParentId}  //获取内部文件夹和文件
          this.getAllList(data)
        }
      }
    })
    },
    getFIleId(row){
      this.uploadeId = row.fId
    },
    handleSuccess(file, fileList){   //上传成功
    },
    delRow(index,row){   //获取删除的id   判断是文件还是文件夹
      this.delIndex = index
      this.isDel = true
      this.delId = row.fId
      if(row.type === 1){  //文件夹
        this.delType = 1
      }else if(row.type !== 1) {   //文件
        this.delType =2
      }
    },
    delFile(){   //删除文件夹/文件
      if(this.delType === 1) {
        this._delFloder()
      }else{
        this._delFile()
      }
    },
    _delFloder() {  //删除文件夹
      delFloder(qs.stringify({id: this.delId})).then((res) => {
        if(res === '删除成功'){
          this.isDel = false
          this.fileData.splice(this.delIndex,1)
          this.$message({message: res, type: 'success'})
        } else{
          this.$message({message: res, type: 'error'})
        }
      })
    },
    _delFile(){   //删除文件
      delFile(qs.stringify({id: this.delId})).then((res) => {
        if(res.status == '1'){
          this.isDel = false
          this.fileData.splice(this.delIndex,1)
          this.$message({message: '删除成功', type: 'success'})
        } else{
          this.$message({message: '删除失败', type: 'error'})
        }
      })
    },
    cancleDelFile(){   //取消删除
      this.isDel = false
    },
    editFile(index,row){ //点击文件夹或者文件
      if(row.type === 1) {   //文件夹重新获取数据
        this.breadList.push({fName:row.fName,fId:row.fId})
        this.uploadeId = row.fId
        this.newFloder.fParentId = row.fId
        if(this.newFloder.fParentId !==0){
           let data ={fId:row.fId}
            this.getAllList(data)
        }
      }
    },
    editName(index,row){   //展开重命名
      this.editType = 1
      this.isAddFloder  = true
      if(row.type === 1){   //文件夹
        this.editFloder.type = 1
      }else{
          this.editFloder.type = 0  //文件
      }
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
          }else{
             this.$message({message: res, type: 'error'})
          }
      })
    },
    cancleAddFloder() {
      this.isAddFloder  = false
    },
    creatFiles(){
      this.isAddFloder  = true
      this.editType = 0
      if(this.uploadeId !==0){   //内部新建文件夹
        this.creatType = 1
      }else{
        this.newFloder.fParentId = 0   //外层新建文件夹
        this.creatType = 0
      }
    },
    addFloder(){    // 小类型下确定新建
      this.newFloder.fName = this.floderName
      creatFloder(qs.stringify(this.newFloder)).then((res) => {
        if(res === '新建成功'){
          this.isAddFloder  = false
          this.$message({message: res, type: 'success',})
          if(this.creatType === 0){   //获取外层文件夹和文件
            this._getFileList()
          }else {  //内部新建文件夹
            let data ={fId:this.newFloder.fParentId}  //获取内部文件夹和文件
            this.getAllList(data)
          }
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
.progress-bar{
  width: 200px;
}
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
.floder-name:hover{
  cursor: pointer;
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
width: 140px;
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
  font-size: 14px;
margin-bottom: 10px;
}
.data-list li i{
display: inline-block;
vertical-align: middle;
height: 30px;
line-height: 30px;
}
.data-list li .item-left{
  float: left;
  width: 55%;
}
.text-word{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.item-left .item-name{
  display: inline-block;
  width: 110px;
  padding-left: 5px;
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.data-list li .item-right{
  float: right;
  width: 45%;
}
.data-list li .item-right .creat-time{
  display: inline-block;
  width: 100px;
  height: 20px;
  line-height: 20px;
}
.item-left .item-img{
  display: inline-block;
  width: 20px;
  height: 20px;
}
.item-left .item-img img{
  width: 100%;
  height: 100%;
}
.num{
color: #86c1fe;
}
</style>
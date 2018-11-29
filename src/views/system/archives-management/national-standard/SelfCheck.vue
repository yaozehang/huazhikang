<template>
  <div class="selfCheck-container">
    <div class="select-date clearfix">
      <span class="fileDate">
        <span style=" margin-right:20px;">归档时间：</span>
         <el-date-picker v-model="archivesDate" type="year" :clearable="false" placeholder="选择年" value-format="yyyy"  class="choose-year-data" @change="searchFileByYear()" > </el-date-picker>
      </span>
       <span class="fileDate">
        <span class="common-btn green-btn right-30" @click="searchFileBox">文件搜索</span>
        <span class="common-btn orange-btn"  @click=" dataShow = true" >数据同步</span>
      </span>
      <span class="search-btn" v-if="this.newsTime !=='' ">
        <span class="my-icon"> 
          <el-badge is-dot class="item">
            <img src="static/img/incon1.png" alt="">
          </el-badge>
          </span>
         <span class="my-news" @click="newsShow = true">管理员给你发了一条消息</span>
      </span>
  </div>
  <!-- 搜索文件弹窗 -->
    <el-dialog  class="dialog-form" title="文件搜索" center width="800px" :visible.sync="searchShow">
      <ul class="search-container" >
      <li class="input-group">
        <span class="title">文件名</span>
        <el-input class="inner-input" v-model="selectParams.fileName" @blur="getTip"
        @keyup.native.enter="_getFileList"></el-input>
      </li>
    </ul>
    <div class="" v-loading="listLoading">
      <p v-if="yearList.length === 0">{{this.noDataWord}}</p>
      <year-list :yearList="yearList" @deleteRow="deleteSearchFile"></year-list>
    </div>
  </el-dialog>
  <!-- 搜索文件弹窗结束 -->
  <div class="list-title-all border-bottom">
      <el-button class="title-btn" type="text">自查清单</el-button>
      <!-- <button class="title-btn" @click=" dataShow = true">数据同步</button> -->
  </div>
    <!-- 数据同步弹窗 -->
      <el-dialog  class="dialog-form" title="提示" center width="400px" :visible.sync="dataShow">
        <p class="warm-text"> 数据同步会导致现在的数据结构和数据文件丢失，请确认是否继续</p>
         <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button @click="dataShow = false">取 消</el-button>
          <el-button class="small-comfirm" @click="linkData">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 数据同步弹窗 结束-->
    <div class="list-tabel">
      <!-- 消息弹窗 -->
      <el-dialog  class="dialog-form" title="" center width="500px" :visible.sync="newsShow">
        <div class="news-content">
          <p class="news-info">  {{newsContent}} </p>
          <p class="time-label"> {{newsTime}} </p>
        </div>
    </el-dialog>
    <!-- 消息弹窗结束 -->
      <!-- 新版文件夹弹出框 -->
     <el-dialog title="类型名字"  width="1200px" center :visible.sync="isFileUploade">
        <file-uploade></file-uploade>
      </el-dialog>
  <!-- 新版文件夹弹出框结束-->
  <!-- 0 自主上传  1编写 -->
       <el-table :data="filesData" stripe border style="width: 100%"  :row-style="rowStyle" :header-cell-style="rowStyle"
       :row-class-name="tableRowClassName">
        <el-table-column type="expand" >
          <template slot-scope="props">
            <div class="inner-table">
            <el-table :data="props.row.children" stripe border style="width: 100%"  :row-style="rowStyle" :header-cell-style="rowStyle" :row-class-name="tableRowClassName">
              <el-table-column label="序列号" prop="sort"> </el-table-column>
              <el-table-column label="类型" prop="type"> </el-table-column>
              <el-table-column label="已有文件数" prop="have"> </el-table-column>
              <el-table-column label="应有文案数" prop="should"> </el-table-column>
              <el-table-column label="操作" fixed="right">
                 <template slot-scope="scope">
                  <el-button  type="button" @click="uploadeFile(scope.$index, scope.row,props.row)">
                     <i class="el-icon-circle-plus-outline" > </i> 新增文件
                  </el-button>
                  <el-button  type="button" @click="_delTypeTwo(scope.$index, scope.row)">
                    <i class="el-icon-delete"></i>删除
                  </el-button>
           <!--        <i class="el-icon-edit my-icon" @click="uploadeFile(scope.$index, scope.row,props.row)" ></i>
                  <i class="el-icon-delete "  @click="_delTypeTwo(scope.$index, scope.row)"></i> -->
                </template>
               </el-table-column>
            </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="序列号" prop="sort"  width="100"> </el-table-column>
        <el-table-column label="类型" prop="name"> </el-table-column>
        <el-table-column  fixed="right">
         <template slot-scope="scope">
          <el-button  type="button" @click="addTypeTwo(scope.$index, scope.row)">
             <i class="el-icon-circle-plus-outline" > </i> 新增文件
          </el-button>
          <el-button  type="button" @click="_delTypeOne(scope.$index, scope.row)">
            <i class="el-icon-delete"></i>删除
          </el-button>
        </template>
       </el-table-column>
     </el-table>
      <div class="add-type" >
        <el-button type="button"   class="add-type-btn" @click="addTypeOne()">
            <i class="el-icon-circle-plus-outline"> </i>
        </el-button>
     </div>
    </div>
       <!-- 编辑弹出框 -->
    <div class="edit-form" >
     <el-dialog  class="dialog-form" title="编辑" center width="800px" :visible.sync="IsEdit">
        <ul class="editList">
          <li v-for="(item,index) in editList" :key="index" track-by="index" class="clearfix">
            <div class="fileName"> <i class="el-icon-document"></i> {{item.recordName}}</div>
            <div class="fileRight"> 
              <span class="scan">   <!-- 预览 -->
                  <i class="el-icon-view "  @click="scanFile(index,item)"></i>
               </span>
             <span class="del"> 
               <i class="el-icon-download"  @click="downFile(index, item)"></i>                  <!-- 下载 -->
              </span>
              <span class="del" @click="deleteRow(item,index)" > <i class="el-icon-delete"></i></span>
            </div>
          </li>
        </ul>
    </el-dialog>
  </div>
    <!-- 编辑弹出框 结束-->
    <!-- 新增类型弹出框 -->
     <el-dialog title="新增文件类型"  width="400px" center :visible.sync="IsAddType2">
        <el-form  label-width="80px" :model="addForm" :rules="rules" ref="addForm">
          <el-form-item label="文件类型" class="" required>
            <el-input v-model="addForm.fileType"   auto-complete="off" style="width:80%;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="comfirmAddType(addForm)">确 定</el-button>
          <el-button>取 消</el-button>
        </div>
      </el-dialog>
  <!-- 新增类型弹出框结束-->
  </div>
</template>

<script>
import qs from 'qs'
import {myurl} from '@/api/config.js'
import getUserInfo from 'common/js/user'
import YearList from './search-list.vue'
import {getDate} from 'common/js/time'
import {getAllList,getsearchList,delTypeTwo,delTypeOne,addBigType,addSmallType} from 'api/archives.js'
// import FileUploade from './data-file/data-file.vue'
// import FileUploade from './data-file/demo.vue'
export default {
  name: 'SelfCheck',
  components: {
    YearList,
  },
  data () {
    return {
      newsShow: false,
      dataShow: false,
      isFileUploade: false,
      newsContent: '消息不存在',
      fileName: '',
      newsTime: '',
      isshowpdf:false,
      searchShow: false,
      isDelBigType: false,
      isDelSmallType: false,
      delSmallId: 0,
      delBigId: 0,
      fileList1: [],
      archivesDate: '',
      IsUpload: false,
      IsEdit: false,
      IsAddType1: false,
      IsAddType2: false,
      addForm: {
        fileType: '',
      },
      selectParams: {
        fileName: '',
        comPId: getUserInfo().comPId
      },
      addForm2: {
        fileType: '',
      },
      editList: [],
      uploadForm: {
        remarks: '',
        type: ''
      },
      rules: {
          fileType: [
            { required: true, message: '请输入文件名称', trigger: 'blur' }
          ],
      },
      fileType: [
      '建设项目职业卫生“三同时”档案', '职 业 卫 生 管 理 档 案', '职业卫生宣传培训档案',
      '职业病危害因素监测与检测评价档案 ', '用人单位职业健康监护管理档案 ', '.劳动者个人职业健康监护档案'
      ],
      fileList: [],
      filesData: [],
      typeOne: '',
      typeTwo: '',
      parantId:'',
      yearList: [],
      listLoading: true,
      noDataWord: '',
      fileTypeNum: 0
    }
  },
  created() {
    this.archivesDate = (new Date().getFullYear().toString())
  },
  mounted() {
    this.searchFileByYear()
    this.getNews()
  },
  methods: {
    rowStyle() {
     return 'text-align: center'
    },
    tableRowClassName({row, rowIndex}) {   //设置表格一行的默认色
      if (rowIndex%2 == 0) {
        return 'success-row';
      }else{
        return '';
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
    linkData(){   //数据同步
      this.$router.push({path: '/wrap/archives/nation/check/data', query: {year: this.archivesDate,menuId:4, name:'职业健康监护档案'}})
    },
    uploadeFile(index, row, rows){   //新建上传
     // rows.id 大类型id  row.id 小类型id
      this.$router.push({path: '/wrap/archives/nation/check/file',
        query: {fYear: this.archivesDate, fSmallId:row.id, fBigId:rows.id,menuId:4, name:'职业健康监护档案'}})
    },
    scanFile(index,item){   //预览
      let url =`${myurl}/occuHealthRecordsManage/preview.do?id=${item.id}`
      window.open(url)
    },
     downFile(index,item){   //预览
      let url =`${myurl}/occuHealthRecordsManage/download.do?id=${item.id}`
      window.open(url)
    },
    getNews(){
      let data = {comId: getUserInfo().comPId}
      this.axios.post('/switch/queryMessage.do', qs.stringify(data)).then((res) => {
        if(res.data.status === 1){
          this.newsContent = res.data.data.tmMessage
          this.newsTime = res.data.data.tmCreateDate
        }
      })
    },
    deleteSearchFile(item){
      console.log(item)
      this.yearList.splice(item,1)
    },
    searchFileBox(){
      this.searchShow = true
      this.selectParams.fileName  = ''
      this.yearList = []
    },
    getTip(){
      if(this.selectParams.fileName ===''){
        this.errMsg('请输入要搜索的文件名字')
      }
    },
    _getFileList(){  //获取搜索列表
      if(this.selectParams.fileName !==''){
      getsearchList(qs.stringify(this.selectParams)).then((res) => {
        if(res.length === 0) {
          this.listLoading = false
          this.noDataWord = '暂无数据'
          this.yearList = []
        }else{
          this.listLoading = false
          this.yearList = res
        }
      })
    }else{
      this.errMsg('请输入要搜索的文件名字')
    }
    },
    // 根据年份查询   year 年份    type  大类型id
    searchFileByYear(){ 
      let data = {
        year: this.archivesDate,
        comPId: getUserInfo().comPId
        }
      getAllList(qs.stringify(data)).then((res) => {
        console.log(res)
        this.filesData = res
      })
    },
    cancleDelBig() {
       this.isDelBigType = ! this.isDelBigType
    },
    cancleDelSmall() {
       this.isDelSmallType = ! this.isDelSmallType
    }, 
    _delTypeOne(index, row){     // 删除大类型 
      let data = {
        id: row.id,
        comPId: getUserInfo().comPId
      }
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTypeOne(qs.stringify(data)).then((res) => {
          if (res) {
            this.searchFileByYear()
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
    _delTypeTwo(index, row){     // 删除小类型 
      let data = {
        id: row.id,
        comPId: getUserInfo().comPId
      }
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTypeTwo(qs.stringify(data)).then((res) => {
          if (res) {
            this.searchFileByYear()
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
    comfirmAddType(){  //确定新增
      if(this.fileTypeNum === 1){   //新增小类型
        this._addSmallType()
      }else if (this.fileTypeNum === 0){   //新增大类型
        this._addBigType()
      }
    },
    addTypeTwo(index,row) {     // 新增小类型  
      this.IsAddType2 = !this.IsAddType2
      this.parantId = row.id
      this.fileTypeNum = 1
    },
    _addSmallType(addForm2){
        let data = {
         smallType: this.addForm.fileType,
         parentId: this.parantId,
         comPId: getUserInfo().comPId,
         smallYear: this.archivesDate
        }
        if (this.addForm.fileType !='') {
          addSmallType(qs.stringify(data)).then((res) =>{
            if(res.status === 1){
              this.searchFileByYear()
              this.sucMsg('添加成功')
              this.IsAddType2 = false
              this.addForm.fileType = ''
            } else{
              this.errMsg('添加失败')
            }
          })
          } else {
            this.errMsg('文件类型不能为空')
            return false
          }
    },
    addTypeOne() { // 新增大类型
      this.IsAddType2 = !this.IsAddType2
      this.fileTypeNum = 0
    },
    _addBigType(addForm){
      let data = {
         bigType: this.addForm.fileType,
         comPId: getUserInfo().comPId,
         bigYear: this.archivesDate
        }
        if (this.addForm.fileType !='') {
          addBigType(qs.stringify(data)).then((res) =>{
            if(res.status === 1){
              this.searchFileByYear()
              this.sucMsg(res.msg)
              this.IsAddType2 = false
              this.addForm.fileType = ''
            }else{
              this.errMsg(res.msg)
            }
          })
          } else {
            this.errMsg('文件类型不能为空')
          }
    },
    deleteRow(item,index) {     // 删除一行
      this.editList.splice(index,1)
      let data = {
        id: item.id,
      }
      this.axios.post('/occuHealthRecordsManage/delete.do', qs.stringify(data))
     .then((res) => {
      if(res.status === 200){
       this.sucMsg('删除成功')
      }
     })
    },
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  .search-container
    width:1000px
    padding:20px 0 30px 0
    font-size:0
    li
      display:inline-block
      width:600px
      height:40px
      line-height:40px
      margin-bottom:20px
      font-size:0
      &:nth-child(odd)
        width:400px
      &:nth-child(even)
        width:600px
      &:last-child
        margin-bottom:0
      &.input-group
        .title
          display:inline-block
          text-align:left
          margin-right:20px
          width: 64px
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:40px
</style>
<style lang="css" scoped>
.inner-input{
  width: 200px;
}
.year-list{
  max-height: 300px;
  overflow-y: auto;
}
.return{
 float: left;
width: 80px;
height: 40px;
line-height: 40px;
}
.return:hover{
  cursor: pointer;
}
.warm-text{
width: 350px;
margin: 0 auto;
height: 40px;
line-height: 40px;
color: #d31e48;
text-align: center;
}
.my-news{
  float: right;
  margin-right: 20px;
}
.my-news:hover{
  cursor: pointer;
}
.my-icon{
  margin-right: 20px;
}
.time-label{
  float: right;
  margin-right: 20px;
}
.news-content{
  text-indent: 10px;
}
.news-info{
  height: 20px;
  line-height: 20px;
  margin: 10px 0;
}
.my-close{
  position: absolute;
  bottom: -20px;
  left: 150px;
}
.my-icon{
  margin-right: 20px;
}
.scan{
  position: relative;
}
.view-btn{
  display: inline-block;
  position: absolute!important;
  top:3px!important;
  right:-9px!important;
}
.selfCheck-container{
  width: 100%;
  padding: 30px 20px;
}
.search-btn{
  display: inline-block;
  float: right;
}
.selfCheck-container{
  width: 100%;
}
.search-btn{
  display: inline-block;
  float: right;
}
/*编辑列表滚动条*/
.editList{   
max-height: 400px;
overflow-y: auto;
}
.editList li { 
  width: 100%;  
  min-height: 40px;
  line-height: 20px;
  margin: 10px 0;
  border-bottom: 1px solid #d9d9d9;
}
.editList{
  border-top: 1px solid #d9d9d9;
}
.editList li .fileName{
  width: 600px;
  float: left;
}
.editList li .fileRight{
  width: 150px;
  float: left;
}
.editList li .fileRight span{
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.editList li .fileRight span i{
  display: inline-block;
  width: 20px;
  height: 20px;
}
.add-type{
  text-align: center;
  width: 100%;
}
.add-type-btn{
  width: 100%;
}
.my-upload-btn{
  padding-left: 50px;
}
.my-uploade{
padding-left: 50px;
}
.my-uploade-file{
  min-height: 500px;
}
.inner-table{
  border: 1px solid #ccc;
  box-shadow: 0 0 2px #ccc;
}
</style>

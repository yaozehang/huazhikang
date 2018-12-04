<template>
  <div class="main-content">
    <!-- 搜索框 -->
    <ul class="search-container" >
      <li class="input-group">
        <span class="title">主题名称</span>
        <el-select v-model="selectParams.themeId" class="inner-input" placeholder="请选择" clearable>
          <el-option v-for="item in themeOptions" :key="item.id" :label="item.theme" :value="item.id"></el-option>
        </el-select>
      </li>
      <li class="input-group">
         <span class="title">组卷名称</span>
         <el-input v-model="selectParams.papersName" class="inner-input"></el-input>
      </li>
      <li class="input-group">
        <span class="title">是否启用</span>
        <el-select v-model="selectParams.status" class="inner-input" placeholder="请选择">
          <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </li>
      <li class="btn-container">
        <el-button type="primary" @click="_getPaperList" style="margin-left:90px">查询组卷</el-button>
        <el-button type="primary" @click="_addNewPaper">新增组卷</el-button>
      </li>
    </ul>
    <!-- 表格标题 -->
    <table-title :title="'组卷列表'"></table-title>
    <div class="table-container my-table">
      <el-table :data="tableData" border stripe width="100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="themeName" label="培训主题"></el-table-column>
        <el-table-column prop="paperName" label="组卷名称"></el-table-column>
        <el-table-column prop="queNum" label="组卷题数"></el-table-column>
        <el-table-column prop="editorName" label="编辑人"></el-table-column>
        <!-- <el-table-column label="二维码">
          <template slot-scope="scope">
            <img :src="scope.row.qrPath" class="erweima" alt="二维码" width="25px" height="25px" @click="showImg(scope.row.qrPath)">
          </template>
        </el-table-column> -->
        <el-table-column prop="subjectPerson"  label="相关资料">
          <template slot-scope="scope">
            <i class="el-icon-document file-btn" @click="showFile(scope.row.id)"></i>
          </template>
        </el-table-column>
        <el-table-column label="试题状态" width="200" >
          <template slot-scope="scope">
            <span v-text="scope.row.status===0?'禁用':'启用'" :style="scope.row.status===0?{color:'#ff9b9d'}:{color:'#64b786'}"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作组卷" width="200">
        <template slot-scope="scope">
          <!-- <p class="edit-btn" @click="_editPaper(scope.row.id)">编辑组卷</p> -->
          <el-button size="mini" plain @click="_editPaper(scope.row.id)" >编辑组卷</el-button>
        </template>
      </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
          <el-pagination
            @current-change="pageChange"
            :current-page="selectParams.page"
            layout=" prev, pager, next, jumper"
            :total="totalPage">
          </el-pagination>
      </div>
   </div>
   <!-- 新增弹出框 -->
   <el-dialog class="dialog-form" :title="editType===0?'新增组卷':'编辑组卷'" width="840px" :visible.sync="showFlag">
    <ul style="border-bottom:1px solid #ccc">
      <li class="input-group">
         <span class="title">主题名称</span>
         <el-select v-model="themeIdList" class="inner-input" placeholder="请选择" clearable @change="selectTheme" multiple>
          <el-option v-for="item in themeOptions" :key="item.id" :label="item.theme" :value="item.id"></el-option>
         </el-select>
       </li>
       <li class="input-group">
         <span class="title">组卷名称</span>
         <el-input class="inner-input" v-model="editParams.papersName"></el-input>
        <!-- <p class="danger-tip" v-if="editParams.papersName ==='' ">请输入组卷名称</p> -->
       </li>
       <li class="input-group">
         <span class="title">是否启用</span>
         <el-select v-model="editParams.status"  placeholder="请选择"  class="inner-input">
             <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
         </el-select>
       </li>
    </ul>
    <div class="edit-content">
      <h3 class="title">职业卫生知识培训</h3>
      <el-checkbox-group v-model="checkList" @change="selectQuestion">
      <el-checkbox :label="item" class="check-item" v-for="(item,idx) in questionList" :key="idx"><span>{{item.stem}}</span></el-checkbox>
      </el-checkbox-group>
    </div>
    <p class="answer">答案：{{answerStr}}</p>
    <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="onConfirm">确 定</el-button>
       <el-button @click="showFlag=!showFlag">取 消</el-button>
     </div>
   </el-dialog>
   <!-- 相关资料弹窗 -->
   <el-dialog class="dialog-file" title="相关资料" width="640px" :visible.sync="fileFlag">
    <ul>
      <el-row tag="li" class="list-item" v-for="(item,idx) in fileList" :key="idx">
        <el-col :span="18">{{item.fileName}}</el-col>
        <el-col :span="2" class="el-icon-view icon"></el-col>
        <el-col :span="2" class="el-icon-download icon" @click.native="downloadFile(item.id)"></el-col>
        <el-col :span="2" class="el-icon-delete icon" @click.native="deletFile(item.id)"></el-col>
      </el-row>
      <el-row tag="li" v-if="fileList.length === 0">
         暂无相关资料,请点击上传
      </el-row>
      <el-row tag="li">
        <input type="file" id="file" style="visibility:hidden" @change="uploadFile">
        <label for="file" class="upload-btn">上传文件</label>
      </el-row>
    </ul>
     <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="uploadFile">确 定</el-button>
       <el-button @click="fileFlag=!fileFlag">取 消</el-button>
     </div>
   </el-dialog>
   <!-- 二维码放大查看 -->
   <el-dialog class="img-viewer" width="340px" :visible.sync="imgFlag">
      <img :src="imgPath" height="300px" width="300px">
   </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import getUserInfo from 'common/js/user'
import {getAllTheme, getPaperList, getQuestionById, getPaperDataById, getPaperDetailById, delDetailById} from 'api/training'
import qs from 'qs'

const status = [
  {
    label: '是',
    value: 1
  },
  {
    label: '否',
    value: 0
  }
]

export default {
  data () {
    return {
      themeOptions: [],
      statusOption: status,
      selectParams: {
        themeId: '',
        papersName: '',
        status: '',
        page: 1,
        size: 15,
        comPId: getUserInfo().comPId
      },
      editType: 0,
      showFlag: false,
      editParams: {
        themeList: [],
        papersName: '',
        status: '',
        queIdList: [],
        paperId: ''
      },
      themeIdList: [],
      questionList: [],
      checkList: [],
      answerStr: '',
      totalPage: 10,
      tableData: [{}],
      fileFlag: false,
      imgFlag: false,
      imgPath: '',
      uploadId: '',
      fileList: []
    }
  },
  created() {
    this._getAllTheme()
    this._getPaperList()
  },
  methods: {
    _getAllTheme() {
      getAllTheme().then((res) => {
        this.themeOptions = res
      })
    },
    _getPaperList() {
      let data = {}
      Object.assign(data, this.selectParams, {
        themeId: this.selectParams.themeId === '' ? -1 : this.selectParams.themeId,
        status: this.selectParams.status === '' ? -1 : this.selectParams.status
      })
      console.log(data)
      getPaperList(qs.stringify(data)).then((res) => {
        if (res.status === 1) {
          this.tableData = res.list
          this.totalPage = res.totalPage * 10
        }
      })
    },
    _addNewPaper() {
      for(let k in this.editParams) {
        this.editParams[k] = ''
      }
      this.themeIdList = []
      this.checkList = []
      this.answerStr = ''
      this.questionList = []
      this.editType = 0
      this.showFlag = true
    },
    addNewPaper() {
      let data = {
        themeList: JSON.stringify(this.editParams.themeList),
        papersName: this.editParams.papersName,
        status: this.editParams.status,
        queIdList: JSON.stringify(this.editParams.queIdList),
        comPId: getUserInfo().comPId
      }
      this.axios.post('/train/papers/add.do', qs.stringify(data)).then((res) => {
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.showFlag = false
          this._getPaperList()
        } else {
          this.$message({
            type: 'info',
            message: res.data.msg
          })
        }
      })
    },
    _editPaper(id) {
      this.editType = 1
      this.showFlag = true
      this.editParams.paperId = id
      getPaperDataById({paperId: id}).then((res) => {
        this.answerStr = res.allAnswers
        this.themeIdList = res.themeIdList
        this.editParams.papersName = res.paperName
        this.editParams.status = res.status
        this.editParams.queIdList = res.queList
        let themeList = []
        this.themeIdList.forEach((item) => {
          this.themeOptions.forEach((i) => {
            if (item === i.id) {
              themeList.push({
                themeId: i.id,
                themeName: i.theme
              })
            }
          })
        })
        this.editParams.themeList = themeList
        let data = {
          themeIdList: JSON.stringify(res.themeIdList)
        }
        getQuestionById(qs.stringify(data)).then((res) => {
          if (res.status === 1) {
            let checkList = []
            this.questionList = res.list
            this.editParams.queIdList.forEach((item) => {
              this.questionList.forEach((i) => {
                if (item === i.queId) {
                  checkList.push(i)
                }
              })
            })
            this.checkList = checkList
          }
        })
      })
    },
    editPaper() {
      let data = {
        themeList: JSON.stringify(this.editParams.themeList),
        papersName: this.editParams.papersName,
        status: this.editParams.status,
        queIdList: JSON.stringify(this.editParams.queIdList),
        paperId:  this.editParams.paperId,
        comPId: getUserInfo().comPId
      }
      this.axios.post('/train/papers/edit.do', qs.stringify(data)).then((res) => {
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          this.showFlag = false
          this._getPaperList()
        } else {
          this.$message({
            type: 'info',
            message: res.data.msg
          })
        }
      })
    },
    selectTheme(list) {
      let ret = []
      for (let i = 0; i < list.length; i++) {
        for (let k = 0; k < this.themeOptions.length; k++) {
          if (list[i] === this.themeOptions[k].id) {
            ret.push({
              themeId: this.themeOptions[k].id,
              themeName: this.themeOptions[k].theme
            })
          }
        }
      }
      this.editParams.themeList = ret
      let data = {
        themeIdList: JSON.stringify(list)
      }
      getQuestionById(qs.stringify(data)).then((res) => {
        if (res.status === 1) {
          this.questionList = res.list
        }
      })
      this.editParams.queIdList = []
      this.answerStr = ''
    },
    selectQuestion(list) {
      let data = list.sort(function(a, b){
        return a.queId - b.queId
      })
      let idList = []
      let answerStr = ''
      data.forEach((item, idx) => {
        idList.push(item.queId)
        answerStr += `${idx+1}:${item.answer} `
      })
      this.editParams.queIdList = idList
      this.answerStr = answerStr.substr(0, answerStr.length-1)
    },
    onConfirm() {
      if (this.editType === 0) {
        this.addNewPaper()
      } else {
        this.editPaper()
      }
    },
    showFile(id){
      this.uploadId = id
      this.fileFlag = true
      getPaperDetailById({paperId: id}).then((res) => {
        this.fileList = res
      })
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getPaperList()
    },
    showImg(path) {
      this.imgFlag = true
      this.imgPath = path
    },
    uploadFile(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('paperId', this.uploadId)
      let config = {
        headers: {
          'Content-Type': 'multpart/form-data'
        }
      }
      this.axios.post('/train/papers/uploadDocs.do', formData, config).then((res) => {
        if (res.data === 1) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          getPaperDetailById({paperId: this.uploadId}).then((response) => {
            this.fileList = response
          })
        }
      })
    },
    downloadFile(id) {
      let url = `http://192.168.1.157:8088/train/papers/downloadDocs.do?id=${id}`
      window.open(url)
    },
    deletFile(id) {
      delDetailById({id: id}).then((res) => {
        console.log(res)
        if (res === 1) {
          this.$message({
            type: 'success',
            message: '已删除'
          })
          getPaperDetailById({paperId: this.uploadId}).then((response) => {
            this.fileList = response
          })
        }
      })
    }
  },
  components: {
    tableTitle
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
    width:800px
    padding:20px 0 30px
    font-size:0
    li
      display:inline-block
      width:400px
      height:40px
      line-height:40px
      margin-bottom:20px
      font-size:0
      &:last-child
        margin-bottom:0
      &.input-group
        .title
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
      text-decoration:underline
      cursor:pointer
      extend-click()
    .file-btn
      font-size:18px
      cursor:pointer
    .erweima
      cursor:pointer
  .pagination-container
    text-align:right
    margin-top:30px
.dialog-form
  ul
    padding:0 30px
    font-size:0
  .input-group
    display:inline-block
    width:370px
    margin-bottom:20px
    .inner-input
      width:220px
    .title
      width:80px
      display:inline-block
      font-size:14px
      text-align:left
      vertical-align:middle
    .danger-tip
      width:220px
      height: 10px
      line-height:10px
      margin-right:40px
    &.large
      width:740px
      .inner-input
        width:500px
      .img-upload
        width:80px
        display:inline-block
        margin-left:20px
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
  .answer
    line-height:30px
    height:30px
.dialog-file
  ul
    padding:0 30px
  li
    position:relative
    height:40px
    line-height:40px
    &.list-item
      border-bottom:1px solid $color-border
    .icon
      font-size:18px
      cursor:pointer
      line-height:40px
    .upload-btn
      position:absolute
      left:0
      top:0
      cursor:pointer
      color: #409EFF
      text-decoration:underline
</style>
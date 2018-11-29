<template>
  <div class="main-content">
    <!-- 搜索框 -->
    <ul class="search-container" >
      <li class="input-group">
        <span class="title">主题名称</span>
        <el-select v-model="selectParams.themeId"  class="inner-input" placeholder="请选择" clearable>
          <el-option v-for="item in themeOptions" :key="item.id" :label="item.theme" :value="item.id"></el-option>
        </el-select>
      </li>
      <li class="input-group">
         <span class="title">题干名称</span>
         <el-input v-model="selectParams.stem" class="inner-input"></el-input>
      </li>
      <li class="input-group">
        <span class="title">是否启用</span>
        <el-select v-model="selectParams.status" class="inner-input" placeholder="请选择" clearable>
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </li>
      <li class="btn-container">
        <el-button type="primary" @click="_getQuestionList" style="margin-left:90px">查询试题</el-button>
        <el-button type="primary" @click="_addQuestion">新增试题</el-button>
      </li>
    </ul>
    <!-- 表格标题 -->
    <table-title :title="'题干列表'"></table-title>
    <div class="table-container my-table">
      <el-table :data="tableData" border stripe style="width: 100%;">
        <el-table-column type="index" label="序号" width="100" ></el-table-column>
        <el-table-column prop="themeName" label="培训主题" width="250" ></el-table-column> 
        <el-table-column prop="stem" label=" 题干名称" ></el-table-column> 
         <el-table-column prop="editorName" label="编辑人" width="200"></el-table-column> 
        <el-table-column label="试题状态" width="200" >
          <template slot-scope="scope">
            <span v-text="scope.row.status===0?'禁用':'启用'" :style="scope.row.status===0?{color:'#ff9b9d'}:{color:'#64b786'}"></span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="编辑试题" width="200">
        <template slot-scope="scope">
          <p class="edit-btn" @click="_editQustion(scope.row)">编辑试题</p>
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
   <!-- 新增/编辑弹出框 -->
   <el-dialog  class="dialog-form" :title="editType===0?'新增试题':'编辑试题'" width="840px"  :visible.sync="showFlag">
     <ul>
       <li class="input-group">
         <span class="title">主题名称</span>
         <el-select v-model="editParams.themeId" @change="changeTheme"  placeholder="请选择"  class="inner-input">
             <el-option v-for="item in themeOptions" :key="item.id" :label="item.theme" :value="item.id"></el-option>
         </el-select>
       </li>
       <li class="input-group">
         <span class="title">正确答案</span>
         <el-select v-model="editParams.answer"  placeholder="请选择"  class="inner-input">
             <el-option v-for="item in answerOptions" :key="item" :label="item" :value="item"> </el-option>
         </el-select>
       </li>
       <li class="input-group">
         <span class="title">是否启用</span>
         <el-select v-model="editParams.status" placeholder="请选择"  class="inner-input">
             <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
         </el-select>
       </li>
       <li class="input-group">
         <span class="title">得分</span>
         <el-input v-model="editParams.score" class="inner-input"></el-input>
       </li>
       <li class="input-group large">
         <span class="title">题干名称</span>
         <el-input v-model="editParams.stem" type="textarea" :autosize="{minRows: 1}" class="inner-input"></el-input>
         <el-upload
            class="img-upload"
            action="http://192.168.1.157:8088/train/questions/uploadPic.do" :auto-upload="false"
            :on-change="uploadImg"
            :file-list="fileList[0]"
            list-type="picture" @click.native="selectId(0)">
             <el-button size="small" type="primary">点击上传</el-button>
         </el-upload>
       </li>
       <li class="input-group large">
         <span class="title">选项A</span>
         <el-input v-model="editParams.optionA" class="inner-input"></el-input>
         <el-upload
            class="img-upload"
            action="http://192.168.1.157:8088/train/questions/uploadPic.do" :auto-upload="false"
            :on-change="uploadImg"
            :file-list="fileList[1]"
            list-type="picture" @click.native="selectId(1)">
             <el-button size="small" type="primary">点击上传</el-button>
         </el-upload>
       </li>
       <li class="input-group large">
         <span class="title">选项B</span>
         <el-input v-model="editParams.optionB" class="inner-input"></el-input>
         <el-upload
            class="img-upload"
            action="myPath" :auto-upload="false"
            :on-change="uploadImg"
            :file-list="fileList[2]"
            list-type="picture" @click.native="selectId(2)">
             <el-button size="small" type="primary">点击上传</el-button>
         </el-upload>
       </li>
       <li class="input-group large">
         <span class="title">选项C</span>
         <el-input v-model="editParams.optionC" class="inner-input"></el-input>
         <el-upload
            class="img-upload"
            action="myPath" :auto-upload="false"
            :on-change="uploadImg"
            :file-list="fileList[3]"
            list-type="picture" @click.native="selectId(3)">
             <el-button size="small" type="primary">点击上传</el-button>
         </el-upload>
       </li>
       <li class="input-group large">
         <span class="title">选项D</span>
         <el-input v-model="editParams.optionD" class="inner-input"></el-input>
         <el-upload
            class="img-upload"
            action="myPath" :auto-upload="false"
            :on-change="uploadImg"
            :file-list="fileList[4]"
            list-type="picture" @click.native="selectId(4)">
             <el-button size="small" type="primary">点击上传</el-button>
         </el-upload>
       </li>
     </ul>
     <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="onConfirm">确 定</el-button>
       <el-button @click="onCancel">取 消</el-button>
     </div>
   </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import getUserInfo from 'common/js/user'
import {myurl} from '@/api/config.js'
import {getAllTheme, getQuestionList, getQueDetailById} from 'api/training'

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
      myPath: '',
      themeOptions: [],
      statusOptions: status,
      answerOptions: ['A', 'B', 'C', 'D'],
      selectParams: {
        themeId: '',
        stem: '',
        status: '',
        page: 1,
        size: 15
      },
      editType: 0,
      showFlag: false,
      editParams: {
        themeId: '',
        themeName: '',
        answer: '',
        status: '',
        score: '',
        stem: '',
        picStem: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        picA: '',
        picB: '',
        picC: '',
        picD: '',
        comPId: getUserInfo().comPId
      },
      editId: '',
      totalPage: 10,
      tableData: [],
      fileType: '',
      fileList: [[], [], [], [], []]
    }
  },
  created() {
    this.myPath = `${myurl}/train/questions/uploadPic.do`
    console.log(this.myPath)
  },
  mounted() {
    this._getAllTheme()
    this._getQuestionList()
  },
  methods: {
    _getAllTheme() {
      getAllTheme().then((res) => {
        this.themeOptions = res
      })
    },
    _getQuestionList() {
      let data = {
        stem: this.selectParams.stem,
        page: this.selectParams.page,
        size: this.selectParams.size,
        comPId: getUserInfo().comPId
      }
      data['themeId'] = this.selectParams.themeId === '' ? -1 : this.selectParams.themeId
      data['status'] = this.selectParams.status === '' ? -1 : this.selectParams.status
      getQuestionList(qs.stringify(data)).then((res) => {
        this.tableData = res.list
        this.totalPage = res.totalPage * 10
      })
    },
    _addQuestion() {
      for(let k in this.editParams) {
        if (k !== 'comPId') {
          this.editParams[k] = ''
        }
      }
      this.fileList = [[], [], [], [], []]
      this.editType = 0
      this.showFlag = true
    },
    addQuestion() {
      this.axios.post('/train/questions/add.do', qs.stringify(this.editParams))
        .then((res) => {
          if (res.data.status === 1) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.showFlag = false
            this._getQuestionList()
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            })
          }
        })
    },
    _editQustion(row) {
      this.editType = 1
      this.editId = row.queId
      getQueDetailById({queId:this.editId}).then((res) => {
        for (let k in res) {
          if(k !== 'callbacks' && k!== 'id' && k!== 'anwser') {
            this.editParams[k] = res[k]
          } else if (k === 'anwser') {
            this.editParams['answer'] = res[k]
          }
        }
        this.fileList[0] = [{name: res.stem, url: res.picStem}]
        this.fileList[1] = [{name: res.optionA, url: res.picA}]
        this.fileList[2] = [{name: res.optionB, url: res.picB}]
        this.fileList[3] = [{name: res.optionC, url: res.picC}]
        this.fileList[4] = [{name: res.optionD, url: res.picD}]
      })
      this.showFlag = true
    },
    editQuestion() {
      let data = {}
      Object.assign(data, this.editParams, {queId: this.editId})
      this.axios.post('/train/questions/edit.do', qs.stringify(data))
        .then((res) => {
          if (res.data.status === 1) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.showFlag = false
            this._getQuestionList()
          } else {
            this.$message({
              type: 'warning',
              message: res.data.msg
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    changeTheme(data) {
      this.themeOptions.forEach((item, idx) => {
        if (item.id === data) {
          this.editParams.themeName = item.theme
        }
      })
    },
    onConfirm() {
      if (this.editType === 0) {
        this.addQuestion()
      } else {
        this.editQuestion()
      }
    },
    onCancel() {
      this.showFlag = false
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getQuestionList()
    },
    selectId(id) {
      this.fileType = id
    },
    uploadImg(file) {
      if (this.fileType === '') {
        return
      }
      let formData = new FormData()
      formData.append('file', file.raw)
      let config = {
        headers: {
          'Content-Type': 'multpart/form-data'
        }
      }
      this.axios.post('/train/questions/uploadPic.do', formData, config)
        .then((res) => {
          if (res.data.status === 1) {
            switch (this.fileType) {
              case 0:
              this.editParams.picStem = res.data.picPath
              break
              case 1:
              this.editParams.picA = res.data.picPath
              break
              case 2:
              this.editParams.picB = res.data.picPath
              break
              case 3:
              this.editParams.picC = res.data.picPath
              break
              case 4:
              this.editParams.picD = res.data.picPath
              break
            }
            this.fileType = ''
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
    padding:20px 0 30px 0
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
    &.large
      position:relative
      width:740px
      height: 40px
      .inner-input
        width:500px
      .img-upload
        width:80px
        display:inline-block
        margin-left:20px
      .img-upload
        position:absolute
        top:0
        right:40px
</style>
<style scope>
  .dialog-form .el-upload-list--picture .el-upload-list__item{
    z-index: 100;
    height: 45px;
    width:100px;
    margin-top: -40px;
  }
  .dialog-form .el-upload-list--picture .el-upload-list__item-thumbnail{
    width: 30px;
    height: 30px;
    margin-top:-6px;
  }
  .dialog-form .el-upload-list--picture .el-upload-list__item-name i{
    font-size:0;
  }
</style>
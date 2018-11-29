<template>
  <div class="main-content" @click="hideTree($event)">
    <!-- 搜索框 -->
    <ul class="search-container" >
      <li class="input-group">
        <span class="title">培训主题</span>
        <el-select v-model="selectParams.themeIdList"  class="inner-input" placeholder="请选择" multiple>
          <el-option v-for="item in themeOptions" :key="item.id" :label="item.theme" :value="item.id"></el-option>
        </el-select>
      </li>
      <li class="input-group">
         <span class="title">培训日期</span>
          <el-date-picker v-model="selectParams.date" type="datetime" placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
   <!--        <el-date-picker v-model="selectParams.date" type="date" placeholder="选择日期" class="inner-input" :editable="false" value-format="yyyy-MM-dd"></el-date-picker> -->
         <el-button type="primary" @click="_getExamList" style="width:120px;margin-left:40px;">查询</el-button>
      </li>
      <li class="input-group">
          <span class="title">培训单位</span>
          <el-input class="inner-input" placeholder="请选择" readonly @focus="onFocus" v-model="treeStr" id="fenqu"></el-input>
      </li>
      <li class="input-group">
          <span class="title">考试状态</span>
          <el-select v-model="selectParams.status"  class="inner-input" placeholder="请选择" clearable>
            <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" @click="_addExam" style="width:120px">新增记录</el-button>
      </li>
    </ul>
    <!-- 表格标题 -->
    <table-title :title="'培训列表'"></table-title>
    <div class="table-container my-table">
      <el-table :data="tableData" border stripe style="width:100%;">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="date" label="培训时间" width="250" >  </el-table-column>
        <el-table-column prop="themeName" label="培训主题"></el-table-column>
        <el-table-column prop="partitionName" label="培训单位"></el-table-column>
        <el-table-column prop="planNum" label="计划人数"></el-table-column>
        <el-table-column label="签到二维码" width="100px">
          <template slot-scope="scope">
             <img :src="scope.row.signQrCodePath" alt="签到二维码" class="erweima" width="25px" height="25px" @click="showImg(scope.row.signQrCodePath)">
          </template>
        </el-table-column>
        <el-table-column prop="signNum" label="签到人数"></el-table-column>
        <el-table-column prop="paperQrCodePath" label="试卷二维码" width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.paperQrCodePath" alt="试卷二维码" width="25px" height="25px" class="erweima" @click="showImg(scope.row.paperQrCodePath)">
          </template>
        </el-table-column>
        <el-table-column prop="quaRate" label="合格率"></el-table-column>
        <el-table-column label="状态/操作" width="200">
          <template slot-scope="scope">
            <p class="edit-btn" v-html="examStatus(scope.row.status)" @click="changeStatus(scope.row)"></p>
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
   <el-dialog  class="dialog-form" title="新增试题" width="760px"  :visible.sync="showFlag">
      <el-form :inline="true" :model="editParams"  ref="editParams"  :rules="rules" class="demo-form-inline" label-width="120px" >
        <div class="form-items">
          <el-form-item label="培训时间"  class="inner-group" prop="date"  required>
            <el-date-picker v-model="editParams.date" type="datetime" placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss" class="inner-input">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="培训单位"   class="inner-group"  prop="posName"  required>
              <el-input class="inner-input" @focus="onFocus1" placeholder="请选择" readonly v-model="editParams.posName"
               ></el-input>
            </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item label="培训主题"  class="inner-group" prop="themeId"  required>
            <el-select v-model="editParams.themeId"  placeholder="请选择" class="inner-input" @change="selectTheme">
               <el-option v-for="item in themeOptions" :key="item.id" :label="item.theme" :value="item.id"> </el-option>
           </el-select>
            </el-form-item>
            <el-form-item label="培训组卷"   class="inner-group"  prop="paperId"  required>
              <el-select v-model="editParams.paperId"  placeholder="请选择"  class="inner-input" @change="selectPaper">
              <el-option v-for="item in paperOptions" :key="item.paperId" :label="item.paperName" :value="item.paperId"></el-option>
              </el-select>
          </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item label="培训说明"  class="inner-group">
             <el-input type="textarea" class="inner-input" :autosize="{minRows: 1}" v-model="editParams.introduction"></el-input>
            </el-form-item>
            <el-form-item label="合格率"   class="inner-group"  prop="rate"  required>
              <el-input class="inner-input" v-model="editParams.rate" @blur="numberVali"></el-input>
          </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item   class="btns-group">
              <el-button type="primary" @click="onConfirm('editParams')">确 定</el-button>
              <el-button @click="showFlag=!showFlag">取 消</el-button>
            </el-form-item>
        </div>
      </el-form>
      <!-- 培训单位单选树状图 -->
      <div class="tree-container" v-show="isShowTree1" id="tree1">
        <div class="tree-content">
          <el-tree :data="treeData" show-checkbox node-key="positionId"  default-expand-all ref="tree1" highlight-current :props="defaultProps" @check="onCheckPos1" check-strictly>
          </el-tree>
        </div>
      </div>
    </el-dialog>
    <!-- 培训单位树状图 -->
    <div class="tree-container" v-show="isShowTree" id="tree">
      <div class="tree-content">
        <el-tree :data="treeData" show-checkbox node-key="id" default-expand-all ref="tree" highlight-current :props="defaultProps" check-strictly>
        </el-tree>
      </div>
      <div class="button-container" id="treeBtn">
        <el-button type="primary" @click="onConfirmPos()">确认</el-button>
        <el-button @click="onClearPos" id="clearBtn">清空</el-button>
      </div>
    </div>
    <!-- 图片弹窗 -->
    <el-dialog class="img-dialog" width="340px" :visible.sync="imgFlag">
       <img :src="imgPath" alt="二维码" width="300px" height="300px">
    </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'

import {getAllTheme, getExamList, getPaperByThemeId, changePaperStatus, getThemeListByZone} from 'api/training'
import {getTreeData} from 'api/position'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
import {getAllId} from 'common/js/allpid'
import qs from 'qs'

const status = [
  {
    label: '正在考试',
    value: 1
  },
  {
    label: '未开始',
    value: 2
  }
]

export default {
  data () {
    return {
      themeOptions: [],
      treeData: [],
      statusOption: status,
      paperOptions: [],
      selectParams: {
        themeIdList: [],
        posIdList: [],
        date: '',
        status: '',
        page: 1,
        size: 15,
        allPId: getAllId()
      },
      isShowTree: false,
      treeStr: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      totalPage: 10,
      editParams: {
        date: '',
        posId: '',
        posName: '',
        themeId: '',
        themeName: '',
        paperId: '',
        paperName: '',
        introduction: '',
        rate: '',
        comPId: getUserInfo().comPId
      },
      showFlag: false,
      isShowTree1: false,
      form: {
        themeName: '',
        isUse: '',
        questionName: ''
      },
      addForm: {
        name: '',
        isUse: '',
        questionName: ''
      },
      editForm: {
        name: '',
        isUse: '',
        questionName: ''
      },
      tableData: [{}],
      imgFlag:  false,
      imgPath: '',
      rules: {
        date: [{ required: true, message: '培训日期不能为空', trigger: 'blur' }],
        posName: [{ required: true, message: '培训单位不能為空', trigger: 'blur' }],
        themeId:[{ required: true, message: '培训主题不能为空', trigger: 'blur' }],
        paperId:[{ required: true, message: '试卷名称不能为空', trigger: 'blur' }],
        introduction:[{ required: true, message: '培训说明不能为空', trigger: 'blur' }],
        rate:[{ required: true, message: '合格率不能为空', trigger: 'blur' }],
      },
    }
  },
  created() {
    this._getAllTheme()
    this._getTreeData()
    this._getExamList()
    this._getThemeListByZone()
  },
  methods: {
    _getAllTheme() {
      getAllTheme().then((res) => {
        this.themeOptions = res
      })
    },
    _getThemeListByZone(){
      getThemeListByZone().then((res) =>{
        console.log(res)
      })
    },
    _getTreeData() {  //comPId, userId 
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.treeData = [res]
      })
    },
    _getExamList() {
      let data = {}
      Object.assign(data, this.selectParams, {
        themeIdList: JSON.stringify(this.selectParams.themeIdList),
        posIdList: JSON.stringify(this.selectParams.posIdList),
        status: this.selectParams.status === '' ? -1 : this.selectParams.status
      })
      getExamList(qs.stringify(data)).then((res) => {
        console.log(res)
        if (res.status === 1) {
          this.tableData = res.list
          this.totalPage = res.totalPage * 10
        }
      })
    },
    onFocus() {
      this.isShowTree = true
      this.$refs.tree.setCheckedKeys(this.selectParams.posIdList)
    },
    _addExam() {
      for (let k in this.editParams) {
        this.editParams[k] = ''
        this.editParams.comPId = getUserInfo().comPId
      }
      this.showFlag = true
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getExamList()
    },
    onConfirmPos() {
      let treeLabels = this.$refs.tree.getCheckedNodes()
      this.treeStr = this._filterTreeStr(treeLabels)
      this.selectParams.posIdList = this.$refs.tree.getCheckedKeys()
      this.isShowTree = false
    },
    onClearPos() {
      this.$refs.tree.setCheckedKeys([])
      this.selectParams.posIdList = []
      this.treeStr = ''
    },
    onFocus1() {
      this.isShowTree1 = true
    },
    onCheckPos1() {
      let e = this.$refs.tree1.getCheckedNodes()[0]
      this.editParams.posId = e ? e.id : ''
      this.editParams.posName = e ? e.label : ''
      this.isShowTree1 = false
    },
    onConfirm(editParams) {
       this.$refs[editParams].validate((valid) => {
        if (valid) {
          this.axios.post('/train/exam/add.do', qs.stringify(this.editParams)).then((res) => {
            console.log(this.editParams)
            if (res.data === 1) {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
              this._getExamList()
              this.showFlag = false
            }
          })
        }
      })
    },
    selectTheme(id) {
      this.themeOptions.forEach((item) => {
        if (id === item.id) {
          this.editParams.themeName = item.theme
        }
      })
      let data = {
        themeId: id,
        comPId: getUserInfo().comPId
      }
      getPaperByThemeId(data).then((res) => {
        this.paperOptions = res
      })
    },
    selectPaper(id) {
      this.paperOptions.forEach((item) => {
        if (id === item.paperId) {
          this.editParams.paperName = item.paperName
        }
      })
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join('/')
    },
    hideTree(e) {
      if (e.target.id === '') {
        if (e.target.parentElement.id === 'clearBtn') {
          return false
        } else {
          this.isShowTree = false
        }
      }
    },
    numberVali(e) {
      let reg = /^100$|^(\d|[1-9]\d)(\.\d+)*$/
      let val = e.target.value
      if (val.match(reg) === null) {
        this.$message({
          type: 'warning',
          message: '请输入0-100之间的数字'
        })
        this.editParams.rate = ''
      }
    },
    showImg(path) {
      this.imgPath = path
      this.imgFlag = true
    },
    examStatus(status) {
      if (status === 0) {
        return '<span>已结束</span>'
      } else if (status === 1) {
        return '<span style="text-decoration:underline;color:#4e99f3;">结束考试</span>'
      } else {
        return '<span style="text-decoration:underline">开始考试</span>'
      }
    },
    changeStatus(row) {
      console.log(row)
      if (row.status === 0) {
        return
      }
      if (row.status === 1) {
        this.$confirm('确定结束考试？', '提示', {
          confirmButtonText: '确定结束',
          cancelButtonText: '取消结束',
          type: 'warning'
        })
          .then(() => {
            changePaperStatus({examId: row.examId, status: 0}).then((res) => {
              if (res === 1) {
                this.$message({
                  type: 'success',
                  message: '已结束'
                })
              }
              this._getExamList()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      } else {
        changePaperStatus({examId: row.examId, status: 1}).then((res) => {
          console.log(res)
          if (res === 1) {
            this.$message({
              type: 'success',
              message: '已开始考试'
            })
            this.imgPath = row.paperQrCodePath
            this.imgFlag = true
            this._getExamList()
          }
        })
      }
    }
  },
  components: {
    tableTitle
  }
};
</script>
<style lang="css" scoped>
.form-items .inner-group:nth-child(1){
  margin-right: 20px;
}
.form-items .inner-group .inner-input{
  width: 220px;
}
.form-items .btns-group {
  width: 300px!important;
  margin-left: 250px;
}
</style>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.main-content
  margin-top:20px
  border-top:1px solid $color-border
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
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:40px
  .table-container
    margin-top:10px
    border-radius(5px)
    overflow:hidden
    .edit-btn
      cursor:pointer
      extend-click()
    .erweima
      cursor:pointer
  .pagination-container
    text-align:right
    margin-top:30px
.img-dialog
  img
    width:100%
    height:auto
.dialog-form
  ul
    padding:0 30px
    font-size:0
  .input-group
    display:inline-block
    width:330px
    margin-bottom:20px
    .inner-input
      width:220px
    .title
      width:80px
      display:inline-block
      font-size:14px
      text-align:left
      vertical-align:middle
  .tree-container
    top: 130px
    left: 320px
.tree-container
  position:absolute
  top:220px
  left:250px
  width:420px
  max-height:500px
  padding:15px 40px
  z-index:300
  background: #fff
  border:1px solid $color-border
  border-radius(5px)
  .tree-content
    max-height:450px
    overflow-y:auto
  .button-container
    width:100%
    text-align:center
    height:40px
    margin-top:10px 
</style>
<template>
  <div class="main-content">
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
        <el-date-picker v-model="selectParams.date" type="date" placeholder="选择日期" class="inner-input" :editable="false" value-format="yyyy-MM-dd"></el-date-picker>
        <el-button type="primary" @click="_getAnalysisList">查询培训</el-button>
      </li>
      <el-button type="primary" plain class="import-btn" @click="importExcel">一键导出</el-button>
    </ul>
    <!-- 表格标题 -->
    <table-title :title="'考试列表'"></table-title>
    <div class="table-container left my-table" style="width:54%;">
      <el-table :data="tableData" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="date"  label="培训时间">  </el-table-column>
        <el-table-column prop="themeName"  label="培训主题"></el-table-column>
        <el-table-column prop="paperName"  label="组卷名称"></el-table-column>
        <el-table-column prop="num"  label="人数"></el-table-column>
        <el-table-column prop="rate"  label="合格率"></el-table-column>
        <el-table-column label="状态/操作" width="200">
          <template slot-scope="scope">
            <span class="edit-btn" @click="showInfo(scope.row.examId,0)">查看错题&nbsp;&nbsp;</span>|
            <span class="edit-btn" @click="showInfo(scope.row.examId,1)">&nbsp;&nbsp;查看考生</span>
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
    <div class="table-container right my-table" style="width:44%;max-height:100%;overflow-y:auto">
      <div class="table-head" v-html="headTitle" @click="showAll"></div>
      <table width="100%" v-show="infoType===0">
        <tr>
          <th>题目</th>
          <th style="width:100px">做错人次</th>
        </tr>
        <tr v-for="(item,idx) in errorData" :key="idx">
          <td>{{item.stem}}</td>
          <td>{{item.num}}</td>
        </tr>
        <tr v-if="errorData.length===0"><td colspan="2">暂无错题</td></tr>
      </table>
      <table width="100%" v-show="infoType===1">
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>证件号</th>
          <th>联系方式</th>
          <th>得分</th>
          <th>状态/操作</th>
        </tr>
        <tr v-for="(item,idx) in examineeData" :key="idx">
          <td>{{item.name}}</td>
          <td>{{item.sex==='1'?'女':'男'}}</td>
          <td>{{item.age}}</td>
          <td>{{item.idCard}}</td>
          <td>{{item.tel}}</td>
          <td>{{item.score}}</td>
          <td style="text-decoration:underline;cursor:pointer" @click="showDetail(item.id)">查看详情</td>
        </tr>
      </table>
    </div>
   <!-- 错题弹出框 -->
    <el-dialog  class="dialog-form" title="错题详情" width="840px"  :visible.sync="errorFlag">
      <el-table :data="errorDetail" width="100%" border stripe>
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="errStem" label="题目"></el-table-column>
<!--         <el-table-column prop="errStem" label="正确答案"></el-table-column>
        <el-table-column prop="errStem" label="考生选择"></el-table-column> -->
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"   @click="errorFlag=!errorData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import getUserInfo from 'common/js/user'
import {getAllId} from 'common/js/allpid'
import {getAllTheme, getAnalysisList, getErrorList, getExamineeList, getErrorDetail} from 'api/training'
import qs from 'qs'
import {host, prefix} from 'api/config'

export default {
  data () {
    return {
      themeOptions: [],
      selectParams: {
        themeIdList: [],
        date: '',
        page: 1,
        size: 15,
        allPId: getAllId(),
        comPId: getUserInfo().comPId,
      },
      errorFlag: false,
      totalPage: 10,
      infoType: 0,
      tableData: [],
      errorData: [],
      examineeData: [],
      errorDetail: [],
      importIdList: []
    }
  },
  created() {
    this._getAnalysisList()
    this._getAllTheme()
  },
  computed: {
    headTitle() {
      return this.infoType === 0 ? '<span>错题列表</span><span class="all-btn" style="float:right;padding-right:20px;color:#4e99f3;text-decoration:underline;cursor:pointer">查看全部</span>' : '<span>考生列表</span>'
    }
  },
  methods: {
    _getAllTheme() {
      getAllTheme().then((res) => {
        this.themeOptions = res
      })
    },
    _getAnalysisList() {
      let data = {}
      Object.assign(data, this.selectParams, {
        themeIdList: JSON.stringify(this.selectParams.themeIdList)
      })
      getAnalysisList(qs.stringify(data)).then((res) => {
        if (res.status === 1) {
          this.tableData = res.list
          this.totalPage = res.totalPage * 10
          this.errorData = res.errList
        }
      })
    },
    showInfo(id, type){
      this.infoType = type
      if (type === 0) {
        getErrorList({examId: id}).then((res) => {
          this.errorData = res
        })
      } else {
        getExamineeList({examId: id}).then((res) => {
          this.examineeData = res
          console.log(res)
        })
      }
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getAnalysisList()
    },
    showAll(e) {
      if (e.target.className === 'all-btn') {
        this._getAnalysisList()
      }
    },
    showDetail(id) {
      getErrorDetail({examPersonId: id}).then((res) => {
        this.errorDetail = res
        this.errorFlag = true
      })
    },
    handleSelectionChange(list) {
      let ret = []
      list.forEach((item) => {
        ret.push(item.examId)
      })
      this.importIdList = ret
    },
    importExcel() {
      if (this.importIdList.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择您要导出的考试'
        })
        return
      }
      let url = `${host}${prefix}/train/exam/downloadTable.do?examIdArray=${JSON.stringify(this.importIdList)}`
      window.open(url)
    }
  },
  components: {
    tableTitle
  }
}
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.main-content
  margin-top:20px
  border-top:1px solid $color-border
  .search-container
    position:relative
    width:100%
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
    .import-btn
      position: absolute
      bottom: -30px
      right:0
  .table-container
    margin-top:10px
    border-radius(5px)
    .edit-btn
      text-decoration:underline
      cursor:pointer
      extend-click()
    .table-head
      height:40px
      line-height:40px
      text-indent:15px
      background-color:#e2eff3
      border-radius(5px)
      border-bottom-left-radius:0
      border-bottom-right-radius:0
  .pagination-container
    text-align:right
    margin-top:30px
  .table-container.left
  	float: left
  .table-container.right
  	float:right
.table-container.right
  table th
    background-color:#f2f2f2
    height:40px
    line-height:40px
    border:1px solid #d8d8d8
    border-top:none
    text-align:center
  table td
    height:40px
    line-height:40px
    border:1px solid #d8d8d8
    border-top:none
    text-align:center
</style>
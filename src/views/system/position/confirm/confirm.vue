<template>
  <el-card>
  <div class="main-content" @click="hideTree($event)">
    <!-- 搜索框 -->
    <ul class="search-container">
      <li class="input-group">
          <span class="title">分区</span>
          <el-input class="inner-input my-input" placeholder="请选择" readonly @focus="onFocus" v-model="treeStr" id="fenqu"></el-input>
      </li>
      <li class="input-group">
          <span class="title">身份证号码</span>
          <el-input class="inner-input" v-model="selectParams.idCard" placeholder="请输入身份证号"></el-input>
      </li>
      <li class="input-group">
          <span class="title">体检类型</span>
          <el-select v-model="selectParams.checkState" placeholder="请选择" class="inner-input" clearable>
            <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
      </li>
      <li class="input-group">
          <span class="title">工种/职务</span>
          <el-select v-model="selectParams.jobType" filterable placeholder="请选择" class="inner-input" clearable>
            <el-option v-for="item in jobOptions" :key="item.jid" :label="item.jobsName" :value="item.jobsName"></el-option>
          </el-select>
      </li>
      <li class="input-group">
          <span class="title">姓名</span>
          <el-input class="inner-input" v-model="selectParams.username" placeholder="请输入姓名"></el-input>
      </li>
      <li class="input-group">
        <el-radio-group v-model="selectParams.status">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">最近三个月</el-radio>
        </el-radio-group>
        <el-button type="primary" style="margin-left:20px;width:120px;" @click="_getConfirmList">查询</el-button>
        <el-button type="primary"  plain  class="all-btn downBtn" @click="exportExcel" style="margin-right:20px;">批量下载</el-button>
      </li>
     </ul>
    <!-- 表格标题 -->
    <table-title :title="'待确认列表'"></table-title>
    <!-- 表格 -->
    <div class="table-container my-table">
      <el-button type="primary" plain class="all-btn" @click="handleAll">批量调岗</el-button>
      <ul class="tooltip-container">
        <li><i class="circle bg-1"></i><span class="text">听力风控</span></li>
        <!-- <li><i class="circle bg-2"></i><span class="text">粉尘风控</span></li> -->
        <li><i class="circle bg-0"></i><span class="text">正常</span></li>
      </ul>
      <el-table :data="tableData" border @selection-change="handleSelectionChange">
        <el-table-column  width="50" type="selection" > </el-table-column>
        <el-table-column  prop="username"  label="姓名">  </el-table-column>
        <el-table-column  prop="sex"  label="性别" >  </el-table-column>
        <el-table-column  prop="checkType"  label="体检类型">  </el-table-column>
        <el-table-column  prop="curPosName"  label="当前分区">  </el-table-column>
        <el-table-column  prop="curJobName"  label="当前工种/职务">  </el-table-column>
        <el-table-column  prop="aimPosName"  label="目标分区">  </el-table-column>
        <el-table-column  prop="aimJobName"  label="目标工种/职务">  </el-table-column>
        <el-table-column  prop="lastCheckDate"  label="上次体检时间">  </el-table-column>
        <el-table-column  prop="" label="体检结论">
          <template slot-scope="scope">
            <span class="ruselt">{{scope.row.conclusion}} </span>
          </template>
        </el-table-column>
        <el-table-column  prop=""  label="风控模型">
          <template slot-scope="scope">
             <i class="circle bg-0" v-if="scope.row.model.length === 0"></i>
             <i class="circle" :class="'bg-'+item" v-for="(item,idx) in scope.row.model"></i>
          </template>
        </el-table-column>
        <el-table-column  prop="" label="查看报告">
          <template slot-scope="scope">
             <i class="el-icon-search icon" @click="showReport(scope.row)"></i>
          </template>
        </el-table-column>
      <el-table-column  prop="" label="操作">
          <template slot-scope="scope">
             <i class="el-icon-check icon" style="margin-right:40px;" @click="onPass(scope.row.id)"></i>
             <i class="el-icon-close icon" @click="onReject(scope.row.id, scope.row.userid)"></i>
          </template>
      </el-table-column>
    </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
        <el-pagination
          @current-change="pageChange"
          :current-page="selectParams.page"
          layout=" prev, pager, next, jumper"
          :total="totalPage">
        </el-pagination>
    </div>
    <!-- 部门选择树状图 -->
    <div class="tree-container" v-show="isShowTree" id="tree">
      <div class="tree-content">
        <el-tree :data="treeData" show-checkbox node-key="id"  default-expand-all ref="tree" highlight-current :props="defaultProps" check-strictly>
        </el-tree>
      </div>
      <div class="button-container" id="treeBtn">
        <el-button type="primary" @click="onConfirmPos">确认</el-button>
        <el-button @click="onClearPos" id="clearBtn">清空</el-button>
      </div>
    </div>
    <!--报告弹窗 -->
    <el-dialog  class="report-container" title="体检报告"  width="500px" :visible.sync="IsReport">
      <ul>
       <el-row tag="li" class="report-item" v-if="reportContent.filePath">
         <el-col :span="2"><i class="el-icon-document"></i></el-col>
         <el-col :span="16">体检报告.pdf</el-col>
         <el-col :span="3">
          <i class="el-icon-view icon" @click="viewFile()"></i>
            <!-- <a :href="'http://47.92.26.132:8080/web/tranPos/previewPdf.do?id='+reportContent.id" class="el-icon-view icon" target="_blank"></a> -->
         </el-col>
         <el-col :span="3">
          <i class="el-icon-download icon" @click="downFile"></i>
           <!--  <a :href="'http://47.92.26.132:8080/web/downloadPdf.do?id='+reportContent.id" class="el-icon-download icon"></a> -->
         </el-col>
       </el-row>
       <li v-else>
           暂无体检报告
       </li>
      </ul>
    </el-dialog>
  </div>
  </el-card>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import {getTreeData, getAllJobs, getConfirmList, passPlan, rejectPlan} from 'api/position'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
import qs from 'qs'
import {myurl} from '@/api/config.js'
import {getAllId} from 'common/js/allpid'
const typeOptions= ['上岗前', '在岗期间', '离岗时', '离岗后随访', '应急检查']

export default {
  data () {
    return {
      selectParams: {
        posIdList: JSON.stringify([]),
        idCard: '',
        jobType: '',
        checkState: '',
        status: 0,
        username: '',
        page: 1,
        size: 15,
        allPId: getAllId()
      },
      treeStr: '',
      jobOptions: [],
      typeOptions: typeOptions,
      totalPage: 10,
      tableData: [],
      isShowTree: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      IsReport: false,
      passIdList: [],
      reportContent: {
        id: -1,
        filePath: ''
      }
    }
  },
  created() {
    this._getTreeData()
    this._getAllJobs()
    this._getConfirmList()
  },
  methods: {
    viewFile(){  //预览PDF
      let url =`${myurl}/web/tranPos/previewPdf.do?id=${this.reportContent.id}`
      window.open(url)
    },
    exportExcel(){   //批量下载 导出表格
      let data = JSON.stringify(this.passIdList)
      let url =`${myurl}/web/tranPos/exprotExcl.do?id=${this.passIdList}`
      window.open(url)
    },
    downFile(){   //下载
      let url =`${myurl}/web/downloadPdf.do?id=${this.reportContent.id}`
      window.open(url)
    },
    _getTreeData() {
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.treeData = [res]
      })
    },
    _getAllJobs() {
      getAllJobs().then((res) => {
        this.jobOptions = res
      })
    },
    _getConfirmList() {
      getConfirmList(qs.stringify(this.selectParams)).then((res) => {
        this.tableData = res.list
        this.totalPage = res.totalPage * 10
      })
    },
    onFocus() {
      this.isShowTree = true
      this.$refs.tree.setCheckedKeys(JSON.parse(this.selectParams.posIdList))
    },
    onConfirmPos() {
      let treeLabels = this.$refs.tree.getCheckedNodes()
      this.treeStr = this._filterTreeStr(treeLabels)
      this.selectParams.posIdList = JSON.stringify(this.$refs.tree.getCheckedKeys())
      this.isShowTree = false
    },
    onClearPos() {
      this.$refs.tree.setCheckedKeys([])
      this.selectParams.posIdList = JSON.stringify([])
      this.treeStr = ''
      console.log(this.selectParams.posIdList)
    },
    handleAll() {
      this.$confirm('确定批量调岗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let idStr = JSON.stringify(this.passIdList)
          passPlan(qs.stringify({list: idStr})).then((res) => {
            if (res) {
              this.$message({
                type: 'success',
                message: '调岗成功!'
              })
              this._getConfirmList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    handleSelectionChange(val) {
      let ret = []
      val.forEach((item) => {
        ret.push(item.id)
      })
      this.passIdList = ret
    },
    showReport(row) {
      this.reportContent.id = row.id
      this.reportContent.filePath = row.pdfPath
      this.IsReport = !this.IsReport
    },
    onPass(id) {
      this.passIdList = [id]
      let idStr = JSON.stringify(this.passIdList)
      this.$confirm('确定调岗吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          passPlan(qs.stringify({list: idStr})).then((res) => {
            if (res === 1) {
              this.$message({
                type: 'success',
                message: '调岗成功!'
              })
              this._getConfirmList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    onReject(id1, id2) {
      let data = {
        delId: id1,
        personId: id2
      }
      this.$confirm('确定取消调岗吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rejectPlan(data).then((res) => {
            if (res === 2) {
              this.$message({
                type: 'success',
                 message: '驳回成功!'
              })
              this._getConfirmList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join('/')
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getConfirmList()
    },
    hideTree(e) {
      if (e.target.id === '') {
        if (e.target.parentElement.id === 'clearBtn') {
          return false
        } else {
          this.isShowTree = false
        }
      }
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
    padding:20px 0 30px 0
    li
      display:inline-block
      height:40px
      line-height:40px
      margin-bottom:20px
      margin-right:100px
      font-size:0
      &:last-child
        margin-bottom:0
      &.input-group
        .title
          display:inline-block
          width:80px
          text-align:left
          margin-right:20px
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:40px
  .table-container
    position:relative
    margin-top:10px
    border-radius(5px)
    .icon
      font-size:18px
      cursor:pointer
    .all-btn
      position:absolute
      right: 0
      top:-60px
    .tooltip-container
      position:absolute
      left:200px
      top: -50px
      height:40px
      font-size:0
      li
        display:inline-block
        margin-right:30px
        line-height:40px
        span.text
          display:inline-block
          line-height:40px
          font-size:14px
    .circle
      display:inline-block
      width:15px
      height:15px
      border-radius(50%)
      margin-right:15px
    .circle.bg-1
      background-color: $color-pink
    .circle.bg-2
      background-color: $color-orange
    .circle.bg-0
      background-color: $color-green
  .pagination-container
    text-align:right
    margin-top:30px
  .report-container
	  ul
	    padding:0 30px
    ul i, ul a
      font-size:18px
    ul i.icon
      cursor:pointer
  .tree-container
    position:absolute
    top:160px
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
 .my-downLoade
  display inline-block
  vertical-align middle
  width 100px
  height 40px
  line-height 40px
  border-radius 5px
  text-align center
  margin-left 7px
  background #FFF
  outline none
  border none
</style>
<style lang="css" scoped>
.PostPlan{
  margin-top: 30px;
}
.myTree{
  border: 1px solid #eee;
  width: 500px;
  position: absolute;
  top: 100px;
  left:250px;
  max-height: 700px;
  overflow:scroll;
  z-index: 300;
  background: #FFF;
}
.downBtn{
  position: absolute;
  right:30px;
}
</style>
<template>
<el-card>
  <div class="main-content" @click="hideTree($event)">
    <!-- 搜索框 -->
    <ul class="search-container">
      <li class="input-group">
        <span class="title">分区</span>
        <el-input class="inner-input my-input" v-model="treeStr" placeholder="请选择" @focus="onFocus" readonly id="fenqu"></el-input>
      </li>
      <li class="input-group">
          <span class="title">身份证号码</span>
          <el-input class="inner-input" v-model="selectParams.idCard" placeholder="请输入身份证号"></el-input>
      </li>
      <li class="input-group">
          <span class="title">姓名</span>
          <el-input class="inner-input" v-model="selectParams.personName" placeholder="请输入姓名"></el-input>
      </li>
      <li class="input-group">
        <el-button type="primary" class="inner-button" @click="_getHistoryList">查询</el-button>
      </li>
     </ul>
    <!-- 表格标题 -->
    <table-title :title="'调岗记录'"></table-title>
    <!-- 表格 -->
    <div class="table-container my-table">
      <el-table :data="tableData" border  style="width: 100%;" max-height="700">
        <el-table-column  label="序号" type="index" width="50"> </el-table-column>
        <el-table-column  prop="name"  label="姓名"></el-table-column>
        <el-table-column  prop="idCard"  label="身份证号码"></el-table-column>
        <el-table-column  prop="sex"  label="性别" ></el-table-column>
        <el-table-column  prop="age"  label="年龄" ></el-table-column>
        <el-table-column  prop="position"  label="分区"></el-table-column>
        <el-table-column  prop="num"  label="调岗次数"></el-table-column>
        <el-table-column  label="调岗记录">
          <template slot-scope="scope">
            <span @click="viewDetail(scope.row.personId)" class="detail-btn">查看详情</span>
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
        <el-button @click="onClearPos" id="clearBtn">取消</el-button>
      </div>
    </div>
    <!-- 详情弹出框 -->
    <el-dialog  class="history-container" title="调岗记录" width="530px" :visible.sync="isView">
    <div class="history-item" v-for="(item,index) in stepsData" :key="index">
       <h1 class="title">{{item.year}}</h1>
       <el-steps align-center>
        <el-step v-for=" (i ,idx) in item.list" :key="idx" :title="i.date" :description="i.position+''+i.reason"></el-step>
      </el-steps>
    </div>
  </el-dialog>
  </div>
  </el-card> 
</template>

<script>
import tableTitle from 'components/table-title/table-title'

import {getTreeData, getHistoryList, getHistoryDetail} from 'api/position'
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
import {getAllId} from 'common/js/allpid'

export default {
  data () {
    return {
      selectParams: {
        idCard: '',
        personName: '',
        posIdList: JSON.stringify([]),
        page: 1,
        size: 15,
        allPId: getAllId()
      },
      totalPage: 10,
      tableData: [],
      isShowTree: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isView: false,
      stepsData: [],
      treeStr: ''
    }
  },
  created() {
    this._getTreeData()
    this._getHistoryList()
  },
  methods: {
    _getTreeData() {
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.treeData = [res]
      })
    },
    _getHistoryList() {
      getHistoryList(qs.stringify(this.selectParams)).then((res) => {
        this.tableData = res.list
        this.totalPage = res.totalPage * 10
      })
    },
    onFocus() {
      this.isShowTree = true
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
    },
    onSearch() {
      console.log(this.selectParams)
    },
    viewDetail(id) {
      getHistoryDetail({personId: id}).then((res) => {
        this.stepsData = res
      })
      this.isView = true
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getHistoryList()
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
    width:1000px
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
        .inner-button
          width:120px
          margin-left:100px
  .table-container
    margin-top:10px
    border-radius(5px)
    overflow:hidden
    .detail-btn
      padding:10px
      text-decoration:underline
      cursor:pointer
  .pagination-container
    text-align:right
    margin-top:30px
  .tree-container
    position:absolute
    top:160px
    left:20px
    width:420px
    margin-left:250px
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
  .history-container
    .history-item .title
      color: #4e99f3
      line-height:40px
      text-indent:25px
</style>
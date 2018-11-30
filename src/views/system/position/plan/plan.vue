<template>
  <div class="main-content" @click="hideTree($event)">
    <!-- 搜索框 -->
    <ul class="search-container">
      <li class="input-group">
          <span class="title">分区</span>
          <el-input class="inner-input my-input" placeholder="请选择" readonly @focus="onFocus" v-model="treeStr" id="fenqu"></el-input>
      </li>
      <li class="input-group">
          <span class="title">身份证号码</span>
          <el-input class="inner-input" v-model="selectParams.idCard" placeholder="请输入身份证号" @keyup.native.enter="_getPlanTodoList"></el-input>
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
            <el-option v-for="item in jobOptions" :key="item.jid" :label="item.jobsName" :value="item.jid"></el-option>
          </el-select>
      </li>
      <li class="input-group">
          <span class="title">姓名</span>
          <el-input class="inner-input" v-model="selectParams.username" placeholder="请输入姓名" @keyup.native.enter="_getPlanTodoList"></el-input>
      </li>
      <li class="input-group">
        <el-radio-group v-model="selectParams.status">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">三个月内有体检</el-radio>
        </el-radio-group>
        <el-button type="primary" style="margin-left:20px;width:120px;" @click="_getPlanTodoList">查询</el-button>
      </li>
      <li class="input-group">
        <span class="title">体检提醒</span>
        <el-switch v-model="isSwitch" active-text="开启" inactive-text="关闭" active-color="#13ce66" inactive-color="#ff4949" @change="changeSwitch"> </el-switch>
      </li>
     </ul>
    <!-- 表格标题 -->
    <table-title :title="'待调岗列表'"></table-title>
    <!-- 表格 -->
    <div class="table-container my-table">
      <ul class="tooltip-container">
        <li><i class="circle bg-1"></i><span class="text">听力风控</span></li>
        <!-- <li><i class="circle bg-2"></i><span class="text">粉尘风控</span></li> -->
        <li><i class="circle bg-0"></i><span class="text">正常</span></li>
      </ul>
      <el-table :data="tableData" border style="width: 100%;" max-height="100%" stripe >
        <el-table-column label="序号" type="index" width="50" ></el-table-column>
        <el-table-column  prop="username" label="姓名"></el-table-column>
        <el-table-column  prop="sex" label="性别" ></el-table-column>
        <el-table-column  prop="idCard" label="身份证号码" width="170px"></el-table-column>
         <el-table-column  prop="position" label="分区"></el-table-column>
        <el-table-column  prop="job" label="工种/职务" width="100px"></el-table-column>
        <el-table-column  prop="checkDate" label="上次体检时间" width="110px"></el-table-column>
        <el-table-column  prop="checkType"  label="体检类型"></el-table-column>
        <el-table-column label="体检结论">
          <template slot-scope="scope">
            <span class="ruselt">{{scope.row.conclusion}}</span>
          </template>
        </el-table-column>
        <el-table-column  prop=""  label="风控模型">
          <template slot-scope="scope">
            <!-- 0 正常 1 听力 2 粉尘 -->
             <i class="circle bg-0" v-if="scope.row.model.length === 0"></i>
             <i class="circle" :class="'bg-'+item" v-for="(item,idx) in scope.row.model" v-bind:key="idx"></i>
          </template>
        </el-table-column>
        <el-table-column  prop="" label="预调岗">
          <template slot-scope="scope">
             <i class="el-icon-sort icon" style="transform:rotate(90deg)" @click="onPosition(scope.$index)"></i>
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
        <el-tree :data="treeData" show-checkbox node-key="id" default-expand-all ref="tree" highlight-current :props="defaultProps" check-strictly>
        </el-tree>
      </div>
      <div class="button-container" id="treeBtn">
        <el-button type="primary" @click="onConfirmPos">确认</el-button>
        <el-button @click="onClearPos" id="clearBtn">清空</el-button>
      </div>
    </div>
    <!-- 新增弹出框 -->
    <el-dialog  class="dialog-form" title="预调岗"  width="1150px" :visible.sync="IsPosition" :closeOnClickModal ="false">
      <get-set :data="itemData" @onConfirm="prePos" @onCancel="cancelPos" v-if="IsPosition"></get-set>
    </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import GetSet from './GetSet.vue'
import {getTreeData, getPlanTodoList, getAllJobs, setSwitch, getSwitch} from 'api/position'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
import {getAllId} from 'common/js/allpid'
import qs from 'qs'

const typeOptions= ['上岗前', '在岗期间', '离岗时', '离岗后随访', '应急检查']

export default {
  data () {
    return {
      positionData: [{name: '全部岗位', id: -1}],
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
      typeOptions: typeOptions,
      jobOptions: [],
      treeData: [],
      treeStr: '',
      tableData: [],
      isShowTree: false,
      isSwitch: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      IsPosition: false,
      totalPage: 10,
      itemData: [],
      checkedTree: []
    }
  },
  created() {
    this._getTreeData()
    this._getAllJobs()
    this._getPlanTodoList()
    this._getSwitch()
  },
  methods: {
    _getSwitch(){
      let data ={
        comId: getUserInfo().comPId,
        type:1
      }
      getSwitch(qs.stringify(data)).then((res) => {
        if(res === 1) {
          this.isSwitch =  true  //开启
        }else if(res === 0) {
          this.isSwitch =  false  // 关闭
        }
      })
    },
    changeSwitch(val){  // 请求参数：comId公司id,type类型   isopen
      var isopen
      if(val === true) {
        isopen = 1   //开启
      }else if(val === false) {
        isopen = 0  // 关闭
      }
      let data = {
        isopen: isopen,
        comId: getUserInfo().comPId,
        type:1
      }
      setSwitch(qs.stringify(data)).then((res) => {
        if(res === '修改成功'){
          this.$message({
            type: 'success',
            message: '设置成功'
          })
        }
      })
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
    _getPlanTodoList() {
      getPlanTodoList(qs.stringify(this.selectParams)).then((res) => {
        console.log(res.list)
        this.tableData = res.list
        this.totalPage = res.totalPage * 10
      })
    },
    _getAllJobs() {
      getAllJobs().then((res) => {
        this.jobOptions = res
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
    },
    onPosition(index) {
      this.itemData = this.tableData[index]
      this.IsPosition = !this.IsPosition
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
      this._getPlanTodoList()
    },
    prePos(data) {
      console.log(data)
      this.axios.post('/preTranPos.do', qs.stringify(data)).then((res) => {
        if (res.data === 1) {
          this.$message({
            type: 'success',
            message: '预调岗成功'
          })
          this.IsPosition = !this.IsPosition
          this._getPlanTodoList()
        }else if(res.data === 3){
          this.$message({type: 'error',message: '请输入目标分区' })
        }else{
          this.$message({type: 'error',message: 'error' })
        }
      })
    },
    cancelPos() {
      this.IsPosition = !this.IsPosition
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
    tableTitle,
    GetSet
  }
}
</script>
<style>
.input-group .my-input .el-input__inner{
  max-width: 220px!important;
  text-overflow:ellipsis!important;
  white-space:nowrap!important;
  overflow:hidden!important;
}
</style>
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
	.dialog-form
	  ul
	    padding:0 30px
	  .input-group
	    margin-bottom:20px
	  .input-group .title
      width:80px
      display:inline-block
      font-size:14px
      text-align:left
      vertical-align:middle
	  .input-group .inner-input
	    width:220px
	    &.large
	      width:740px
	      .inner-input
	        width:500px
	      .img-upload
	        width:80px
	        display:inline-block
	        margin-left:20px
	    &.small
	    	width:110px
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
</style>
<style scoped>

</style>
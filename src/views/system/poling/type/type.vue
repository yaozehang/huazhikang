<template>
  <div class="main-content">
    <!-- 搜索框 -->
    <ul class="search-container" >
      <li class="input-group">
        <span class="title">巡检类型</span>
        <el-input class="inner-input" v-model="selectParams.type" placeholder="请输入关键字查询" @keyup.native.enter="_getListByType"></el-input>
      </li>
      <li class="btn-container">
        <el-button type="primary"  @click="_getListByType" style="margin-left:90px">查询</el-button>
        <el-button type="primary" @click="_addNewType" style="margin-left:50px">新增</el-button>
      </li>
    </ul>
    <!-- 表格标题 -->
    <table-title :title="'巡检类型列表'"></table-title>
    <!-- 表格 -->
    <div class="table-container my-table">
      <el-table :data="tableData" border stripe style="width: 100%;" empty-text="暂无相关类型结果">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="type" label="巡检类型"></el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <span class="edit-btn" @click="_editType(scope.row)">修改信息</span> -->
          <el-button size="mini" plain @click="_editType(scope.row)">修改信息</el-button>
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
    <!-- 新增弹出框 -->
    <el-dialog  class="dialog-form" :title="editParams.type===0?'新增类型':'修改类型'" width="420px" :visible.sync="showFlag">
        <ul :span="15" class="input-container">
          <li class="input-group">
            <span class="title">巡检类型</span>
            <el-input class="inner-input" v-model="editParams.typeName" @focus="OnFocus"></el-input>
          </li>
          <p class="danger-tip" v-if="tipFlag">请输入巡检类型</p>
        </ul>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button @click="showFlag=!showFlag">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import {getListByType} from 'api/poling.js'
import getUserInfo from 'common/js/user'

import qs from 'qs'

export default {
  data () {
    return {
      typeOption: [],
      titleOption: [],
      selectParams: {
        type: '',
        page: 1,
        size: 15,
        comPId: getUserInfo().comPId
        // inspectionId: JSON.stringify(getUserInfo().inspectionId), //用户的巡检类型
      },
      editParams: {
        type: 0,
        typeName: '',
        id: '',
      },
      totalPage: 0,
      showFlag: false,
      tableData: [],
      showOption: false,
      tipFlag:false,
      templates: []
    }
  },
  created() {
    this._getListByType()
  },
  methods: {
    _getListByType() {
      let data = this.selectParams
      getListByType(qs.stringify(data)).then((res) => {
        this.tableData = res.list
        this.totalPage = res.totalPage * 10
      })
    },
    addNewType() {
      this.axios.post('/inspection/addInspectionType.do', qs.stringify({
        typeName: this.editParams.typeName,
        comPId: getUserInfo().comPId
      }))
        .then((res) => {
          if (res.data.status === 1) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            this.showFlag = !this.showFlag
            this._getListByType()
          }
        })
    },
    editType() {
      this.axios.post(('/inspection/updateInspectionType.do'), qs.stringify({
        id: this.editParams.id,
        type: this.editParams.typeName,
        comPId: getUserInfo().comPId
      }))
        .then((res) => {
          if (res.data === 1) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.showFlag = !this.showFlag
            this._getListByType()
          }
        })
    },
    _addNewType() {
      this.editParams.type = 0
      this.tipFlag = false
      this.editParams.typeName = ''
      this.showFlag = !this.showFlag
    },
    _editType(data) {
      this.editParams.id = data.id
      this.tipFlag = false
      this.editParams.typeName = data.type
      this.editParams.type = 1
      this.showFlag = !this.showFlag
    },
    OnFocus(){
      if(this.editParams.typeName === ''){
        this.tipFlag = true
      }else{
        this.tipFlag = false
      }
    },
    confirm() {
      if(this.editParams.typeName === ''){
        this.tipFlag = true
      }else{
        this.tipFlag = false
        if (this.editParams.type === 0) {
          this.addNewType()
        } else {
          this.editType()
        }
      }
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getListByType()
    }
  },
  components: {
    tableTitle
  }
};
</script>
<style>
.input-container .danger-tip{
width: 220px;
height: 30px;
line-height: 30px;
padding-left: 50px;
color: red;
}
  
</style>
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
      height:40px
      line-height:40px
      margin-bottom:20px
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
      padding:10px
      text-decoration:underline
      cursor:pointer
  .pagination-container
    text-align:right
    margin-top:30px
  .dialog-form
    ul.input-container
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
          width:500
        .img-upload
          width:80px
          display:inline-block
          margin-left:20px
      &.small
        width:110px
</style>
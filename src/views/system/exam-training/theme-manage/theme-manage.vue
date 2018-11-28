<template>
  <div class="main-content">
    <!-- 搜索框 -->
    <ul class="search-container">
      <li class="input-group">
          <span class="title">主题名称</span>
          <el-input v-model="selectParams.themeName" class="inner-input" @keyup.native.enter="_getThemeList"></el-input>
          <el-button type="primary" @click="_getThemeList">查询主题</el-button>
      </li>
      <li class="input-group">
          <span class="title">是否启用</span>
          <el-select v-model="selectParams.status" clearable placeholder="请选择" class="inner-input" @keyup.native.enter="_getThemeList">
            <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button type="primary" @click="_addTheme">新增主题</el-button>
      </li>
     </ul>
    <!-- 表格标题 -->
    <table-title :title="'主题列表'"></table-title>
    <!-- 表格 -->
    <div class="table-container my-table">
      <el-table :data="tableData" border stripe>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="themeName" label="主题名称" ></el-table-column> 
        <el-table-column label="是否启用" >
          <template slot-scope="scope">
            <span v-text="scope.row.status===0?'禁用':'启用'" :style="scope.row.status===0?{color:'#ff9b9d'}:{color:'#64b786'}"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
            <p class="edit-btn" @click="_editTheme(scope.row)">修改信息</p>
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
    <el-dialog  class="dialog-form" :title="editType===0?'新增主题':'编辑主题'" width="420px" :visible.sync="showFlag">
      <el-form :model="editParams" label-width="90px" ref="editParams" style="padding:0 30px"  :rules="rules">
        <el-form-item label="主题名称" class="dialog-item" prop="themeName"  required>
          <el-input v-model="editParams.themeName" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" >
          <el-select v-model="editParams.status" placeholder="请选择" style="width:220px">
             <el-option v-for="item in statusOption" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onConfirm('editParams')">确 定</el-button>
        <el-button @click="onCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import getUserInfo from 'common/js/user'

import {getThemeList} from 'api/training'

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
      statusOption: status,
      selectParams: {
        themeName: '',
        status: '',
        page: 1,
        size: 15
      },
      editType: 0,
      showFlag: false,
      editParams: {
        themeName: '',
        status: '',
        themeId: '',
        comPId: getUserInfo().comPId
      },
      tableData: [],
      totalPage: 10,
      comPId: getUserInfo().comPId,
      rules: {
        themeName: [{ required: true, message: '主題名称不能为空', trigger: 'blur' }],
      },
    }
  },
  created() {
    this._getThemeList()
  },
  methods: {
    _getThemeList() {
      let data = {
        themeName: this.selectParams.themeName,
        page: this.selectParams.page,
        size: this.selectParams.size,
        comPId: this.comPId
      }
      if (this.selectParams.status === '') {
        data['status'] = '-1'
      } else {
        data['status'] = this.selectParams.status
      }
      getThemeList(qs.stringify(data)).then((res) => {
        this.tableData = res.list
        this.totalPage = res.totalPage * 10
      })
    },
    _addTheme() {
      this.editParams.themeName = this.editParams.status = ''
      this.editType = 0
      this.showFlag = true
    },
    addTheme() {
      this.axios.post('/web/train/theme/add.do', qs.stringify({
        themeName: this.editParams.themeName,
        status: this.editParams.status,
        comPId: this.comPId
      })).then((res) => {
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: '新增主题成功'
          })
          this.showFlag = false
          this._getThemeList()
        } else {
          this.$message({
            type: 'warning',
            message: res.data.msg
          })
        }
      })
    },
    _editTheme(row) {
      this.editParams.themeName = row.themeName
      this.editParams.themeId = row.themeId
      this.editParams.status = row.status
      this.editType = 1
      this.$nextTick(() => {
        this.showFlag = true
      })
    },
    editTheme() {
      this.axios.post('/web/train/theme/edit.do', qs.stringify(this.editParams)).then((res) => {
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: '编辑主题成功'
          })
          this.showFlag = false
          this._getThemeList()
        } else {
          this.$message({
            type: 'warning',
            message: res.data.msg
          })
        }
      })
    },
    onConfirm(editParams) {
      this.$refs[editParams].validate((valid) => {
          if (valid) {
            if (this.editType === 0) {
              this.addTheme()
            } else {
              this.editTheme()
            }
          }
        })
    },
    onCancel() {
      this.showFlag = false
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getThemeList()
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
</style>
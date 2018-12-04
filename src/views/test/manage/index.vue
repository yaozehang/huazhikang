<template>
  <div class="main-content">
    <div class="search">
      <span>企业名称：</span>
      <el-input  placeholder="请输入内容" style="width:220px;"></el-input>
      <el-button type="primary" style="width:100px;margin-left:10px;">查询</el-button>
      <el-button type="primary">添加内容</el-button>
    </div>
    <table-title :title="'企业列表'"></table-title>
    <div>
      <el-table
      :data="tableData"
      stripe
      style="width: 100%">
        <el-table-column
          prop="name"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="permiss"
          label="培训权限">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'

  export default {
    data() {
      return {
        tableData:[]
      }
    },
    components:{
      tableTitle
    }
  }
</script>

<style scoped lang="scss">
.main-content {
  margin-top:20px;
  border-top:1px solid #ccc;
  .search {
    margin-top: 20px;
    margin-bottom: 40px;
  }
}
</style>
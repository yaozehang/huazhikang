<template>
  <div class="main-content">
    <div class="search">
      <span>培训名称：</span>
      <el-input  placeholder="请输入培训名称" style="width:220px;"></el-input>
      <el-button type="primary" style="width:100px;margin-left:10px;">查询</el-button>
      <el-button type="primary">添加培训主题</el-button>
    </div>
    <table-title :title="'培训主题列表'"></table-title>
    <div>
      <el-table
      :data="tableData"
      stripe
      style="width: 100%">
        <el-table-column
          prop="name"
          label="培训主题">
        </el-table-column>
        <el-table-column
          prop="number"
          label="题库管理">
          <template slot-scope="scope">
            <p @click="handleEdit(scope.$index, scope.row)">{{number}}</p>
          </template>
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
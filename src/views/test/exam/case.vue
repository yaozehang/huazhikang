<template>
  <div class="main-content">
    <div class="search">
      <span>培训名称或姓名：</span>
      <el-input  placeholder="请输入培训名称或姓名" style="width:220px;"></el-input>
      <el-button type="primary" style="width:100px;margin-left:10px;">查询</el-button>
    </div>
    <table-title :title="'成绩列表'"></table-title>
    <div>
      <el-table
      :data="tableData"
      stripe
      style="width: 100%">
        <el-table-column
          prop="name"
          label="培训考试主题">
        </el-table-column>
        <el-table-column
          prop="num"
          label="用户">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="得分">
        </el-table-column>
        <el-table-column
          prop="time"
          label="考试时间">
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
    },
    methods:{
      edit(row){

      },
      delete(row){

      }
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
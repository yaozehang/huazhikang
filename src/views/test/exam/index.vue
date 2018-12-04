<template>
  <div class="main-content">
    <div class="search">
      <span>培训名称：</span>
      <el-input  placeholder="请输入培训名称" style="width:220px;"></el-input>
      <el-button type="primary" style="width:100px;margin-left:10px;">查询</el-button>
      <el-button type="primary">创建培训考试</el-button>
    </div>
    <table-title :title="'考试列表'"></table-title>
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
          label="参与人数">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="答卷情况">
        </el-table-column>
        <el-table-column
          prop="look"
          label="观看人次">
        </el-table-column>
        <el-table-column
          prop="time"
          label="培训时间">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" plain @click="edit(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="delete(scope.row)">删除</el-button>
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
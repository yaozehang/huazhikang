<template>
  <div class="main-content">
    <div class="search">
      <span>题目名称：</span>
      <el-input  placeholder="请输入题目" style="width:220px;"></el-input>
      <el-button type="primary" style="width:100px;margin-left:10px;">查询</el-button>
      <el-button type="primary">添加题目</el-button>
    </div>
    <table-title :title="'题目列表'"></table-title>
    <div>
      <el-table
      :data="tableData"
      stripe
      style="width: 100%">
        <el-table-column
          prop="name"
          label="题目名称">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="本题分数">
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
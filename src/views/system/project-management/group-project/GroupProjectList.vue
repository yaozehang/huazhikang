<template>
  <div class="zoneList-container">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form ref="Project" :model="Project" label-width="80px" class="clearfix">
          <div class="search-input clearfix">
            <el-form-item label="项目名称" style="float:left;">
              <el-input v-model="Project.ProjectName"></el-input>
            </el-form-item>
             <el-form-item label="项目类型" style="float:left;">
               <el-select v-model="Project.ProjectType" clearable placeholder="请选择">
                <el-option  v-for="(item,index) in ProjectTypeList" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
            <div class="search-btns ">
              <el-button type="primary" @click="searchList">查询</el-button>
              </div>
          </div>
        </el-form>
      </div>
      <div class="zoneList-title border-bottom">
        <el-button class="title-btn" type="text">组合项目列表</el-button>
        <span class="import-excel" @click="exportTable"> 导出EXCEL</span>
      </div>
      <div class="zonList-table">
       <el-table :data="tableData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="600"  @selection-change="handleSelectionChange">
        <el-table-column width="50"  type="selection"> </el-table-column>
        <el-table-column type="index" label="序号"  width="50"> </el-table-column>
        <el-table-column prop="iId"  label="id"  width="50" > </el-table-column>
        <el-table-column  prop="iName" label="项目名称" > </el-table-column>
         <el-table-column prop="iPyName" label="拼音码"> </el-table-column>
        <el-table-column  prop="iItemTyle" label="项目类型">  </el-table-column>
        <el-table-column  prop="iOrder" label="项目排序码"> </el-table-column>
        <el-table-column  prop="iCode" label="项目代码"> </el-table-column>
        <el-table-column  prop="iUsable" label="是否启用"> </el-table-column>
        <el-table-column   label="操作"  width="150"> 
          <template slot-scope="scope">
          <i class="el-icon-delete"  @click="delRow(scope.$index,scope.row)"></i>
          <el-button type="primary" style="margin-left:30px;" @click="showDetail(scope.$index,scope.row)">修改</el-button>
           <!-- <span    > </span> -->
        </template>
        </el-table-column>
    </el-table>
      </div>
     <div class="my-pagination">
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="15" layout=" total,prev, pager, next, jumper" :total="total">
          </el-pagination>
       </div>
      </div>
      <!-- 删除弹出框  -->
    <div class="del-form" :visible.sync="IsDel">
     <el-dialog  class="dialog-form" title="提示"  width="30%" :visible.sync="IsDel">
        <p>删除之后无法恢复，是否确认删除？</p>
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="sureDel()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
<!-- 删除弹出框 结束-->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {myurl} from '@/api/config.js'
export default {
  name: '',
  data () {
    return {
      Project: {
        ProjectName: '',
        ProjectType: ''
      },
      tableData: [],
      delId: 0,
      currentPage: 1,
      total: 0,
      IsDel: false,
      ProjectTypeList: ['全部', '医生检查', '功能检查', '检验检查'],
      page: this.$route.query.page,
      multipleSelection: []
    }
  },
  created() {
    this.currentPage = this.page  ? parseInt(this.page): 1  
  },
  mounted() {
    this.getList()
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    handleSelectionChange(val) {      //  获取选中的值
        let ret = []
        val.map((item,index) => {
           ret.push(item.iId)
        })
        this.multipleSelection = ret
    },
    exportTable(){   //导出表格
      if(this.multipleSelection.length === 0) {
        this.$message({
        type: 'warning',
        center: true,
        message: '请先选择要导出的的数据'
      })
        return false
      } else{
        let url =`${myurl}/exprotGroupProject.do?id=${this.multipleSelection}`
        window.open(url)
      }
    },
    // selectGroupProject.do 值：page
    getList(){
      this.currentPage = this.page  ? parseInt(this.page): 1
      let data ={
        page:this.currentPage
      }
    this.axios.post('/selectGroupProject.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
          this.tableData = res.data.resultList
          this.total = res.data.recordCount
          this.currentPage = this.page  ? parseInt(this.page): 1
        }else{
          console.log(res)
        }
    })
    },
     // 条件查询组合项目 接口：conditionSelectGroupProject.do 值：page,projects_name,projects_type
    searchList(){
      if( this.Project.ProjectType === '全部'){
         this.Project.ProjectType = ''
      }
     let data ={
        page: this.currentPage,
        projects_name: this.Project.ProjectName,
        projects_type:  this.Project.ProjectType
      }
    this.axios.post('/conditionSelectGroupProject.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
          this.tableData = res.data.resultList
          this.total = res.data.recordCount
        }else{
          console.log(res)
        }
    })
    },
    delRow(index, row){
      this.IsDel = !this.IsDel
      this.delId = row.iId
    },
      // deleteProjectGroupById.do 值：paojectId
    sureDel() {
       this.IsDel = !this.IsDel
        let data ={
        projectId: this.delId
      }
    this.axios.post('/deleteProjectGroupById.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
            this.getList()
        }else{
          console.log(res)
        }
    })
    },
    cancleDel() {
       this.IsDel = !this.IsDel
    },
    handleCurrentChange(val) {
      if( this.Project.ProjectType === '全部'){
         this.Project.ProjectType = ''
      }
      let data ={
        projects_name: this.Project.ProjectName,
        projects_type:  this.Project.ProjectType,
        page: val
      }
    this.axios.post('/conditionSelectGroupProject.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
              this.tableData = res.data.resultList
              this.total = res.data.recordCount
        }else{
          console.log(res)
        }
    })
    },
    showDetail( index,row){
      this.$router.push({path:'/wrap/project/listGP/edit2',query: {itemId: row.iId,page: this.currentPage}})
    }
  },
}
</script>

<style lang="stylus" scoped>
.import-excel
  display inline-block
  vertical-align middle
  width 100px
  height 40px
  line-height 40px
  border 1px solid #4e99f4
  border-radius 5px
  color #4e99f4
  text-align center
  margin-left 7px
  float right
  margin-right 20px
</style>
<style lang="css" scoped>
.import-excel:hover{
  cursor: pointer;
}
.zoneList-content{
width: 100%;
padding-top: 20px;
margin: 20px auto;
}
.zoneList-title{
  margin: 10px 0;
}
.search-input,.search-btns{ float: left; }
.search-btns{ margin-left: 20px; }
.my-pagination{ float: right; }
.EditGroupProject{
  width: 100%;
  position: absolute;
  top:60px;
  background: #fff;
  z-index: 300;
}
</style>
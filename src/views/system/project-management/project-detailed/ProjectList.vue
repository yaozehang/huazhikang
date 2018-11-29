<template>
  <div class="zoneList-container" v-show="editInfo">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form ref="form" :model="form" label-width="80px" class="clearfix">
          <div class="search-input">
            <el-form-item label="项目名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
          <div class="search-btns">
          <el-button type="primary" @click="searchName">查询</el-button>
          </div>
        </el-form>
      </div>
      <div class="zoneList-title border-bottom">
        <el-button class="title-btn" type="text">明细项目列表</el-button>
        <span class="import-excel" @click="exportTable"> 导出EXCEL</span>
      </div>
      <div class="zonList-table">
<!-- diId -->
       <el-table :data="tableData" border  stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="600" @selection-change="handleSelectionChange">
        <el-table-column   width="50"  type="selection"> </el-table-column>
        <el-table-column type="index" label="序号"  width="50"> </el-table-column>
        <el-table-column prop="diId" label="id"  width="50"> </el-table-column>
        <el-table-column  prop="diName"  label="明细名称"> </el-table-column>
         <el-table-column prop="diPyname" label="拼音简码" > </el-table-column>
        <el-table-column  prop="diUnit" label="计量单位" >  </el-table-column>
        <el-table-column  prop="diResultType" label="结果类型" > </el-table-column>
        <el-table-column  prop="diOrder" label="排序码" > </el-table-column>
        <el-table-column  prop="diCode" label="关联码"> </el-table-column>
        <el-table-column  prop="diUsable" label="是否启用" > </el-table-column>
        <el-table-column  prop=""  label="修改"> 
          <template slot-scope="scope">
            <el-button type="primary" @click="editProcetInfo(scope.$index,scope.row)">修改</el-button>
          </template> 
        </el-table-column>
    </el-table>
      </div>
     <div class="my-pagination">
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
            :page-size="15" layout=" total, prev, pager, next, jumper" :total="total">
          </el-pagination>
       </div>
      </div>
    </div>
  </div>

</template>

<script>
import qs from 'qs'
import {myurl} from '@/api/config.js'
import EditProject from './EditProject.vue'
export default {
  name: 'ZoneList',
  components: {
    EditProject
  },
  data () {
    return {
      form: {
        name: '',
      },
      tableData: [],
      currentPage: 1,
      total: 0,
      isSelectZone: false,
      editInfo: true,
      page: this.$route.query.page,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      multipleSelection: []
    }
  },
  created() {
    // this.currentPage = this.page ? parseInt(this.page) : 1 
  },
  watch: {     
    },
  mounted() {
    this.getListAll()
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    //  获取选中的值
    handleSelectionChange(val) { 
        let ret = []
        val.map((item,index) => {
           ret.push(item.diId)
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
        let url =`${myurl}/exprotProjectToExcl.do?id=${this.multipleSelection}`
        window.open(url)
      }
    },
    // 默认查询   selectProject.do page
    getListAll(){
      this.currentPage = this.page  ? parseInt(this.page): 1 
      let data ={
        page: this.currentPage
      }
    this.axios.post('/selectProject.do', qs.stringify(data))
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
    // 条件查询  conditionProject page，detail
    searchName() { 
      let data ={
        di_name: this.form.name,
        page: this.currentPage
      }
    this.axios.post('/conditionProject.do ', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
          this.tableData = res.data.resultList
          this.total = res.data.recordCount 
        }else{
          console.log(res)
        }
    })
    },
    handleCurrentChange(val) {
      let data ={
        di_name: this.form.name,
        page: val
      }
    this.axios.post('/conditionProject.do ', qs.stringify(data))
    .then((res) => {
      if (res.status ===200) {
        this.tableData = res.data.resultList
        this.total = res.data.recordCount
      }else{
        console.log(res)
      }
    })
    },
    editProcetInfo(index, row){
       this.$router.push({path:'/wrap/project/listPJ/edit1', query: {itemId: row.diId, page: this.currentPage} })
    }
  }
};
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
}
.zoneList-title{
  margin: 10px 0;
}
.search-group{
  margin-top: 20px;
}
.search-input,.search-btns{ float: left; }
.search-input{ margin-right: 20px; }
.my-pagination{ float: right; }
.my-zoneTree{
  border: 1px solid #eee;
  width: 500px;
  position: absolute;
  max-height: 700px;
  overflow:scroll;
  z-index: 300;
  background: #FFF;
}
.edit-project{
  position: absolute;
  top: 60px;
  z-index: 300;
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
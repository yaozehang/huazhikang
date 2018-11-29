<template>
  <div class="factorsList-container">
    <div class="factorsList-content clearfix">
      <div class="search-group clearfix">
        <el-form ref="form" :model="form" label-width="120px" class="clearfix">
          <div class="search-input">
            <el-form-item label="危害因素名称">
              <el-input v-model="form.factorName"></el-input>
            </el-form-item>
          </div>
          <div class="my-search-btns">
          <el-button type="primary" @click="searchList">查询</el-button>
          </div>
        </el-form>
      </div>
      <div class="factorsList-title border-bottom">
        <el-button class="title-btn" type="text">危害因素列表</el-button>
        <span class="import-excel" @click="exportTable"> 导出EXCEL</span>
      </div>
      <div class="factorsList-table">
       <el-table :data="tableData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="600" @selection-change="handleSelectionChange">
        <el-table-column width="50"  type="selection"> </el-table-column>
        <el-table-column type="index" label="序号"  width="50"> </el-table-column>
        <el-table-column prop="hId" label="id"  width="50" > </el-table-column>
        <el-table-column  prop="hName" label="危害因素名称" >  </el-table-column>
         <el-table-column prop="hPyName" label="拼音简码"> </el-table-column>
        <el-table-column  prop="hNumber" label="唯一标识">  </el-table-column>
        <el-table-column  prop="hBak" label="备注"> </el-table-column>                  
        <el-table-column   label="操作"> 
          <template slot-scope="scope">
             <el-button type="primary" @click="editInfo(scope.$index,scope.row)" style="margin-right:10px;"> 修改信息 </el-button>
            <!-- <a href="#" class="edit-btn" style="color: black;"  >  |</a> -->
         <!--    <a href="#" :class="scope.row.hType ===  '禁用' ? 'danger': 'safe' "  @click="showIsuse(scope.$index,scope.row)"> {{scope.row.hType}} 危害因素</a> -->
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
 <!-- 禁用提示弹出框  -->
    <div class="disable-form" :visible.sync="IsDisable">
     <el-dialog  class="dialog-form" title="提示"  width="30%" :visible.sync="IsDisable">
        <p>{{ tipWord}} 成功</p>
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="sureDisable()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
<!-- 禁用提示弹出框结束-->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {myurl} from '@/api/config.js'
const item = {
  _id: '15',
  hazardName: '噪声',
  pinyinCode: 'zhaosheng',
  uniqueIdentifier: 'ykl_q',
  remark: '',
  type: 1,
  ableUse: '禁用',
  }
export default {
  name: 'HazardFactorsList',
  data () {
    return {
      form: {
        factorName: ''
      },
      FactorNames: [],
      tableData: Array(10).fill(item),
      currentPage: 1,
      total: 0,
      IsDisable: false,
      tipWord: '',
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
         ret.push(item.hId)
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
        let url =`${myurl}/exprotSysHarmToExcl.do?id=${this.multipleSelection}`
        window.open(url)
      }
    },
    // 默认查询 selectsysharm.do 参数：page
    getList(){
      this.currentPage = this.page ? parseInt(this.page) : 1
      let data ={
        page: this.currentPage
      }
      this.axios.post('/selectsysharm.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.tableData = res.data.resultList
            this.total = res.data.recordCount
            this.currentPage = this.page ? parseInt(this.page) : 1
          }else{
            console.log(res)
          }
      })
    },
    // 分页查询
    handleCurrentChange(val) {
        let data ={
        sysharmName:  this.form.factorName,
        page: val
      }
      this.axios.post('/selectsysharmByName.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.tableData = res.data.resultList
            this.total = res.data.recordCount
          }else{
            console.log(res)
          }
      })
    },
    // 条件查询 selectsysharmByName.do 参数：page,sysharmName
    searchList() {
      let data ={
        sysharmName:  this.form.factorName,
        page: this.currentPage
      }
      this.axios.post('/selectsysharmByName.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.tableData = res.data.resultList
            this.total = res.data.recordCount
          }else{
            console.log(res)
          }
      })
    },
    editInfo(index, row){
      this.$router.push({path:'/wrap/project/listHF/edit3', query: {itemId: row.hId, page:this.currentPage}})
    },
    // 禁用危害因素 接口：updateType.do 参数：id，type
    showIsuse(index, row){
      this.IsDisable =! this.IsDisable
      if (row.hType === '禁用') {
        this.tipWord = '启用'
        row.hType = '启用'
        row.type = 0
      }else{
        this.tipWord = '禁用'
        row.hType = '禁用'
        row.type = 1
      }
      let data = {
        type: this.tipWord,
        id: row.hId
      }
      this.axios.post('/updateType.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
          }else{
            console.log(res)
          }
      })
    },
    sureDisable(){
      this.IsDisable =! this.IsDisable
    }
  }
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
.factorsList-content{
width: 100%;
padding-top: 20px;
margin: 20px auto;
}
.factorsList-title{
  margin: 10px 0;
}
.search-input,.my-search-btns{ float: left; }
.search-input{ margin-right: 20px; }
.my-pagination{ float: right; }
a{ text-decoration: none; }
.edit-btn{
display: inline-block;
margin-right: 10px;
}
.danger{
  color: red;
}
.safe{
color: green;
}
.edit-info{
  position: absolute;
  top: 80px;
  left: 230px;
  z-index: 500;
  background: #fff;
  width: 100%;
/*  height: 100%;*/
}
</style>
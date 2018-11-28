<template>
  <div class="zoneList-container" @click="hideTree($event)">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form ref="form" :model="form" label-width="80px" class="clearfix"  @submit.native.prevent>
          <div class="search-input">
            <el-form-item label="区域名称">
              <el-input v-model="form.higherZone" style="width:450px;"  @keyup.native.enter="getListByName"></el-input>
            </el-form-item>
          </div>
          <div class="search-btns">
           <span class="save-blue right-30" @click="getListByName" > 查询 </span>
          <span class="common-btn green-btn right-30"  @click="selectZone" id="part1" >结构树查询</span>
          <span class="common-btn orange-btn" @click="isTransfer = true"> 分区迁移 </span>
          </div>
        </el-form>
        <!-- 分区树 default-expand-all -->
      <div class="my-zoneTree" v-show="isSelectZone">
        <div class="my-tree">
         <el-tree :data="zoneData"  show-checkbox node-key="id" check-strictly default-expand-all  ref="tree" highlight-current 
           :props="defaultProps" @check="getCheckedNodes">
        </el-tree>
        </div>
      </div>
      </div>
      <div class="zoneList-title border-bottom ">
        <button class="title-btn">区域列表</button>
      </div>
      <!-- 分区迁移弹出框 -->
       <el-dialog title="分区迁移"  width="1200px" center :visible.sync="isTransfer">
          <transfer :zoneData="zoneData" @confirmTransfer="confirmTransfer"></transfer>
        </el-dialog>
    <!-- 分区迁移弹出框-->
        <!-- pid是序号  id是本身id-->
      <div class="zonList-table">
       <el-table :data="tableData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="700" :row-class-name="tableRowClassName">
        <el-table-column prop="pid" label="序号"   > </el-table-column>
         <el-table-column prop="id" label="id"   > </el-table-column>
        <el-table-column  prop="name" label="分区名称" >  </el-table-column>
        <el-table-column prop="sj" label="上级分区"> </el-table-column>
        <el-table-column  prop="node" label="分区备注"> </el-table-column>
         <el-table-column  label="修改" >
            <template slot-scope="scope">
              <span class="edit-zone" @click="editTable(scope.$index, scope.row)"> 修改分区</span>
            </template>
          </el-table-column>
    </el-table>
      </div>
     <div class="my-pagination">
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" 
            :page-size="15" layout="total,prev, pager, next, jumper" :total="total">
          </el-pagination>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils.js'
import getUserInfo from 'common/js/user'
import {getZoneList,zoneTransfer,getZoneListByAuthority,getList} from 'api/zone.js'
import VueQArt from 'vue-qart'
import Transfer from './zone-transfer/transfer.vue'
export default {
  name: 'ZoneList',
  components: {
    VueQArt,
    Transfer
  },
  data () {
    return {
      form: {
        name: '',
        higherZone: '',
      },
      higherZone: [],
      tableData: [],
      currentPage: 1,
      total: 1,
      isSelectZone: false,
      isTransfer: false,
      zoneData: [],
      zoneKey: -1,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      editZone:{
        id: '',
        name:'',
        sj: '',
        node: ''
      },
      page: this.$route.query.page,
      localName: this.$route.name,
    }
  },
  created() {
    this.currentPage = this.page  ? parseInt(this.page): 1  
  },
  mounted() {
    this.getZone()
    this.getListByName()
  },
  methods: {
    errMsg(msg) {
      return this.$message({message: msg,type: 'error',center: true,duration: 10000})
    },
    sucMsg(msg) {
      return this.$message({message: msg,type: 'success',center: true,duration: 10000})
    },
    rowStyle() {
      return 'text-align: center'
    },
      // :row-class-name="tableRowClassName"
    tableRowClassName({row, rowIndex}) {   //设置表格一行的默认色
      if (rowIndex%2 == 0) {
        return 'success-row';
      }else{
        return '';
      }
      },
    confirmTransfer(keyList){   //分区迁移
      if(keyList.oldPId !==keyList.targetPId){
        this.sucMsg('可以合并')
        zoneTransfer(qs.stringify(keyList)).then((res) => {
          if(res = '合并成功'){
            this.sucMsg('迁移成功')
          }
        })
      }
    },
    handleCurrentChange(val) {
      let data = {
        page: val,
        name: this.form.higherZone,
        comId: getUserInfo().comPId
      }
      this.currentPage = val
      getList(qs.stringify(data)).then((res) =>{
        if (res) {
          this.total = res.sum
          this.tableData = res.list
          this.currentPage = this.page ? parseInt(this.page) : 1
        }else{
          this.errMsg('分区不存在，请重新输入')
        }
      })
    },
    // 条件查询
    getListByName() {
      this.currentPage = this.page ? parseInt(this.page) : 1
      let data = {
        page: this.currentPage,
        name: this.form.higherZone,
        comId: getUserInfo().comPId
      }
      getList(qs.stringify(data)).then((res) =>{
        if (res) {
          this.total = res.sum
          this.tableData = res.list
          this.currentPage = this.page ? parseInt(this.page) : 1
        }else{
          this.errMsg('分区不存在，请重新输入')
        }
      })
    },
    editTable(index,row){     //查询所有并分页 Integer page, String name 
      let myItem = {
        name: row.name,
        sj:row.sj,
        node: row.node,
        id: row.id
      }
      this.$router.push({path:'/wrap/zone/list/editZone',query: {item: myItem,page:this.currentPage,menuId:1,name:'分区管理'}})
    },
    getZone() {
      let data ={
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res)=>{
        this.zoneData = [res]
      })
    },
    selectZone() {
      this.$refs.tree.setCheckedKeys([])
      this.isSelectZone = true
    },
    hideTree(e){
      if(e.target.id === ''){
         this.isSelectZone = false
      }
    },
    getCheckedNodes(val) {
      this.zoneKey = val.id
      this.form.higherZone = val.label 
      this.isSelectZone = false
    },
    resetChecked() {
      this.isSelectZone = !this.isSelectZone
      this.$refs.tree.setCheckedKeys([])
    },
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
</style>
<style lang="css" scoped>
.zoneList-content{
/*width: 1600px;*/
min-height: 800px;
}
.zoneList-title{
  margin: 10px;
}
.edit-zone{
  color: #4e99f4;
}
.edit-zone:hover{
  cursor: pointer;
}
.search-input,.search-btns{ float: left; }
.search-input{ margin-right: 20px; }
.search-btn:hover{
  cursor: pointer;
}
.my-zoneTree{
  position: absolute;
  top: 100px;
  left: 250px;
  width: 420px;
  max-height: 500px;
  padding: 15px 40px;
  z-index: 300;
  background: #fff;
  border: 1px solid #ccc;
}
.my-tree{
  max-height: 500px;
  overflow-y: auto;
}
.search-btn{
  padding: 0  10px;
  height: 40px;
  line-height: 40px;
  background: #409EFF;
  border: none;
  color: #fff;
  outline: none;
}
.orange-btn-big{
  color: #fff;
  border-color: #dec043;
  display: inline-block;
  width: 200px;
  height: 60px;
  line-height: 60px;
  border-radius: 5px;
  background: -webkit-linear-gradient(#dec043, #b05e06); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#dec043, #b05e06); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#dec043, #b05e06); /* Firefox 3.6 - 15 */
  background: linear-gradient(#dec043, #b05e06); /* 标准的语法 */ 
}
.orange-btn-big:hover{
background: #d0a132;
border-color: #d0a132;
cursor: pointer;
}
</style>
<template>
  <div class="userList-container">
      <ul class="user-form" >
        <li class="clearfix">
          <span class="startDate">
            <span class="">创建时间（起）</span>
              <el-date-picker  v-model="user.startDate" value-format="yyyy-MM-dd"  type="date"  placeholder="选择日期"> </el-date-picker>
          </span>
          <span class="username">
            <span for="#"> 用户名</span>
            <el-input v-model="user.username" style="width: 260px;"></el-input>
          </span>
          <span class="search">
             <span class="save-blue big-blue"  @click="searchList">查询</span>
          </span>
        </li>
        <li class="clearfix">
           <span class="startDate">
            <span class="">创建时间（止）</span>
              <el-date-picker  v-model="user.endDate"  value-format="yyyy-MM-dd"  type="date"  placeholder="选择日期"> </el-date-picker>
          </span>
          <span class="username">
            <span for="#"> 操作类型</span>
            <el-select v-model="user.type"   placeholder="请选择" style="width: 250px;">
                <el-option  v-for="item in typeList" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </span>
        </li>  
     </ul>
      <div class="type-list-title border-bottom">
        <button class="title-btn">登录列表</button>
    </div>
      <div class="list-table" >
      <el-table :data="userData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="700" :row-class-name="tableRowClassName">
        <el-table-column prop="sort" label="序列号" width="100" > </el-table-column>
        <el-table-column  prop="username"  label="登录账号">  </el-table-column>
        <el-table-column  prop="date"  label="时间">  </el-table-column>
        <el-table-column  prop="type"  label="操作">  </el-table-column>
    </el-table>
      <div class="my-pagination">
        <div class="block">
          <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"  :page-size="15"
            layout="total, prev, pager, next, jumper"  :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
</div>

  </div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {getDate} from 'common/js/time'
import {getAllId} from 'common/js/allpid'
import {getLoginList} from 'api/user'
export default {
  name: 'UserList',
  data () {
  return {
    user: {
      startDate: '',
      endDate: '',
      username: '',
      type:'全部',
      page: 1,
      size: 15,
      pId: getUserInfo().comPId,
      allPId: ''
    },
    userData: [],
    currentPage: 1,
    total: 0,
    editType: false,
    tipWord: '',
    typeList: ['全部', '登录', '注销']
  }
  },
  created(){
    let time = getDate()
    this.user.endDate = `${time.year}-${time.month}-${time.date}`
    this.user.page = this.currentPage,
    this.user.allPId = getAllId()
  },
  mounted() {
    this.searchList()
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    tableRowClassName({row, rowIndex}) {   //设置表格一行的默认色
      if (rowIndex%2 == 0) {
        return 'success-row';
      }else{
        return '';
      }
      },
    errMsg(msg) {
      return this.$message({message: msg, type: 'error',center: true,duration: 1000})
    },
    sucMsg(msg) {
      return this.$message({message: msg, type: 'success',center: true,duration: 1000})
    },
    searchList(){       // 条件查询 全部 -1 登录1  注销 0
      var type 
      if(this.user.type === '全部') {
          type = -1
      } else if(this.user.type === '登录') {
         type = 1
      } else if(this.user.type === '注销') {
         type = 0
      }
      let data = {}
      Object.assign(data,this.user,{startDate: this.user.startDate || '1800-01-01', type: type})
      getLoginList(qs.stringify(data)).then((res)=>{
           if (res.list.length !==0) {
            this.userData = res.list
            this.total = res.total
          }else{
            this.errMsg('请求失败')
          }
      })
    },
    // 分页
    handleCurrentChange(val) {
      var type 
      if(this.user.type === '全部') {
          type = -1
      } else if(this.user.type === '登录') {
         type = 1
      } else if(this.user.type === '注销') {
         type = 0
      }
      this.user.page = val
      let data = {}
      Object.assign(data,this.user,{startDate: this.user.startDate || '1800-01-01', type: type})
      getLoginList(qs.stringify(data)).then((res)=>{
           if (res.list.length !==0) {
            this.userData = res.list
            this.total = res.total
          }else{
            this.errMsg('请求失败')
          }
      })
    },
  }
};
</script>

<style lang="css" scoped>
.user-form li{
margin: 20px;
}
.startDate,.username{
  display: inline-block;
  margin-right: 50px;
}
.dialog-form{ width: 800px!important;margin: 10% auto!important; }
</style>
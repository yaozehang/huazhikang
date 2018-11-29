<template>
  <!-- @click="hideTree($event)" -->
  <el-card class="HealthReminder" @click="hideTree($event)">
    <el-form :inline="true" :model="form" class="demo-form-inline" label-width="120px">
      <div class="search-form">
        <div class="search-items">
          <el-form-item label="上次体检时间">
            <el-date-picker  v-model="form.startTime"  type="date"  placeholder="选择日期" value-format="yyyy-MM-dd" >
             </el-date-picker>
          </el-form-item>
          <el-form-item label="分区">
            <el-input v-model="form.zone" placeholder="" id="part" readOnly @focus="showTree" class="my-word my-input"></el-input>
          </el-form-item>
          <el-form-item label="体检结论">
            <el-select v-model="form.testResult" clearable placeholder="请选择">
              <el-option v-for="item in options" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提醒类型">
             <el-select v-model="form.remindeType"  placeholder="请选择">
              <el-option v-for="item in options0" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下次体检时间">
            <el-date-picker  v-model="form.endTime"  type="date"  placeholder="选择日期" value-format="yyyy-MM-dd" > </el-date-picker>
          </el-form-item>
          <el-form-item label="工种">
            <el-select v-model="form.workPost" multiple  filterable  placeholder="请输入关键词"  style="width:100%" >
            <el-option v-for="(item,index) in workTypeList" v-bind:key="index"  :label="item.jobsName" :value="item.jobsName">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="体检类型" style="margin-right:20px;">
             <el-select v-model="form.testType"  placeholder="请选择">
              <el-option v-for="item in options1" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置提醒">
            <el-switch v-model="form.isRemind"   active-text="开启" inactive-text="关闭" active-color="#13ce66" inactive-color="#ff4949" @change="changeSwitch"></el-switch>
          </el-form-item>
          <el-form-item label="设定体检周期">
            <el-input v-model="form.testCycle" placeholder="" type="number" required></el-input>
          </el-form-item>
          <el-form-item label="" v-if=" form.testCycle !== '' " class="set-cycle">
             <el-button type="primary" @click="setCycle">设置体检周期</el-button>
          </el-form-item>
        </div>
        <div class="search-button">
          <div class="top-button">
            <el-form-item label="" >
              <el-button type="" @click="goTest">人员安排标记</el-button>
              <span class="import-excel" @click="exportTable"> 导出EXCEL</span>
       <!--    <a class="import-excel" :href="'http://192.168.1.208:8080/warn/exportwarn.do?id='+multipleSelection">导出EXCEL</a> -->
            </el-form-item>
          </div>
          <div class="bottom-button">
            <el-form-item label="" style="margin-right:130px;">
              <el-button type="primary" style="width:215px;" @click="getList()">查询</el-button>
            </el-form-item>
          </div>
        </div>
        <!-- 部门分区状图 -->
        <div class="my-teamTree" v-show="isSelectTeam">
          <div class="team-tree">
            <el-tree :data="zoneData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
             :props="defaultProps"  check-strictly >
            </el-tree>
          </div>
          <div class="buttons">
            <el-button type="primary" @click="onConfirmPart">确认</el-button>
            <el-button @click="resetChecked">清空</el-button>
          </div>
      </div>
    <!-- 部门分区图 -->
    </div>
    </el-form>
     <div class="type-list-title border-bottom">
        <el-button class="title-btn" type="text">职业健康检查一览表</el-button>
    </div>
    <div class="my-table">
        <!-- 没用到的 "cwHarmElement":危害因素       "cwUserId":职员id   "cwWarn":提醒类型   "cwWorkType":工种 -->
      <el-table :data="testData" border stripe style="width: 97%;" :row-style="rowStyle" :header-cell-style="rowStyle"
       max-height="700"   ref="multipleTable"  @selection-change="handleSelectionChange"
        :default-sort="{prop: ['cwCurrentTime','cwNextTime'],order: 'descending'}" >
        <el-table-column label="序号" width="50"   type="selection"> </el-table-column>
        <el-table-column  label="序号" width="50"   type="index"> </el-table-column>
        <el-table-column  prop="cwUsername"  label="姓名" width="100">  </el-table-column>
        <el-table-column  prop="cwGender"  label="性别" width="50">  </el-table-column>
        <el-table-column  prop="cwAge"  label="年龄" width="50">  </el-table-column>
        <el-table-column prop="cwWorkType"  label="工种" >  </el-table-column>
        <el-table-column prop="cwDepartment"  label="车间班组" >  </el-table-column>
        <el-table-column  prop="cwHarmElement"  label="危害因素">  </el-table-column> 
        <el-table-column  prop="cwHarmTime"  label="危害工龄">  </el-table-column>
        <el-table-column  prop="cwCurrentTime"  label="本次体检时间" sortable>  </el-table-column>
        <el-table-column  prop="cwNextTime"  label="下次体检时间"  sortable>  </el-table-column>
        <el-table-column  prop="cwPeriod"  label="体检周期">  </el-table-column>
        <el-table-column  prop="cwWarn"  label="提醒">  </el-table-column>
        <el-table-column  prop="cwConclusion" label="上次体检结论"> </el-table-column>
        <el-table-column  prop=""  label="状态">
          <template slot-scope="scope"> 
            <span class="ruselt" v-if="scope.row.cwStauts === '1' " > 已安排体检 </span>
            <span class="ruselt" v-else > 未安排体检 </span>
          </template>
          </el-table-column>
      </el-table>  
      <div class="my-pagination">
          <div class="block">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
              :page-size="15" layout=" total, prev, pager, next, jumper" :total="total">
            </el-pagination>
         </div>
      </div> 

    </div>
  </el-card>
</template>

<script>
import utils from '@/utils.js'
import qs from  'qs'
import getUserInfo from 'common/js/user'
import {myurl} from '@/api/config.js'
import {getDate} from 'common/js/time'
import {getZoneListByAuthority} from 'api/zone'
import {getSwitch, setSwitch} from 'api/position'
export default {
  name: 'HealthReminder',
  data () {
    return {
      tab: '职业健康体检提醒',
      menuId: this.$route.query.menuId,
      userId: getUserInfo().userId,
      isSelectTeam: false,
      currentPage: 1,
      total: 0,
      zoneData: [],
      multipleSelection: [],
      form: {
        startTime: '',
        zone: '',
        testResult: '',
        remindeType: '全部',
        endTime: '',
        testType: '全部', 
        workPost:'',
        harmFactor: '',
        radio: '1',
        testCycle: '',
        isRemind: true,
      },
      workTypeList: [],
      loading1: false,
      options: ['目前未见异常', '职业禁忌症', '疑似职业病', '其他疾病或异常', '复查', '未检查'],
      options0: ['全部', '已安排体检', '未安排体检'],
      options1: ['全部', '未检查', '离岗检查', '周期性检查'],
      options2: ['安全员', '技术员', '巡查员', '班长', '组长'],
      options3: ['噪声', '粉尘', '一氧化碳'],
      defaultProps: {
        children: 'children',
        label: 'label'
    },
    testData: [],
    zoneKey: '',
    department: [],
    cycleList: ['30天','60天','90天', '120天']
    }
  },
  mounted() {
    this.getZone()
    this.getList()
    this.getWorks()
    this._getSwitch()
    let time = getDate()
    this.form.endTime = `${time.year}-${time.month}-${time.date}`
  },
  methods: {
    _getSwitch(){
      let data ={
        comId: getUserInfo().comPId,
        type: 2
      }
      getSwitch(qs.stringify(data)).then((res) => {
        if(res === 1) {
          this.form.isRemind =  true  //开启
        }else if(res === 0) {
          this.form.isRemind =  false  // 关闭
        }
      })
    },
     changeSwitch(val){
      var isopen
      if(val === true) {
        isopen = 1   //开启
      }else if(val === false) {
        isopen = 0  // 关闭
      }
      let data = {
        isopen: isopen,
        comId: getUserInfo().comPId,
        type: 2
      }
      setSwitch(qs.stringify(data)).then((res) => {
        console.log(res)
        if(res === '修改成功'){
          this.sucMsg('设置成功')
        }
      })
    },
    setCycle(){   //设置体检周期 id, comId, period 
      let data = {
        comId: getUserInfo().comPId,
        period: this.form.testCycle,
        id: JSON.stringify(this.multipleSelection)
      }
      this.axios.post('/warn/updatePeriod.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
         this.sucMsg(res.data)
         this.getList()
        }else{
           this.errMsg('error')
        }
      })
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
        let url =`${myurl}/warn/exportwarn.do?id=${this.multipleSelection}`
        window.open(url)
      }
    },
    rowStyle() {
      return 'text-align: center'
    },
    sucMsg(msg){
      return this.$message({message: msg,type: 'success',center: true,duration: 1000
        })
    },
    errMsg(msg) {
      return this.$message({message: msg, type: 'error', center: true,duration: 1000
        })
    },
    // 分区树状图
    hideTree(e){
      if(e.target.id=== ''){
      this.isSelectTeam = false
      }
    },
    showTree(){
      this.isSelectTeam = true
    },
    onConfirmPart() {
      let temp = this.$refs.tree.getCheckedNodes()
      this.form.zone = this._filterTreeStr(temp)
      let temp2 = []      
      temp.forEach((item, idx) => {  //选中的值得数组
        temp2.push(item.label)
      })
      this.department= JSON.stringify(temp2)
      //选中的id
      this.zoneKey= JSON.stringify(this.$refs.tree.getCheckedKeys())
      this.isSelectTeam = false
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join(',')
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.form.zone = ''
    },
    // 模糊搜索  查询工种模糊查询  // selectJobslist.do   job 
    getWorks() {
      let data ={
        job: '',
        comId: getUserInfo().comPId
      }
      this.axios.post('/selectJobslist.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          res.data.map((item,index) => {
              this.workTypeList.push({jobsName:item.jobsName, id:item.jid.toString() })
              return this.workTypeList
            })
        }else{
           this.errMsg('请求失败')
        }
      }) 
    },
    getZone() {
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.zoneData = [res]
      })
    },
    // 默认查询
    getList(){
      let workPost = JSON.stringify(this.form.workPost)       // 工种是字符串
      let data = {
        page: this.currentPage,
        dateStart: this.form.startTime,
        dateEnd: this.form.endTime,
        department: this.department,
        jielun: this.form.testResult,
        txType: this.form.remindeType,
        tjType: this.form.testType,
        workType: workPost === []? '' : workPost,   // 工种
        departId: getUserInfo().userId,
      }
      this.axios.post('/warn/query.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.sucMsg('查询成功')
            console.log(res.data.resultList)
            this.testData = res.data.resultList
            this.total = res.data.sum
          }else{
          }
      })
    },
//  获取选中的值
    handleSelectionChange(val) { 
        let ret = []
        val.map((item,index) => {
           ret.push(item.cwId)
        })
        this.multipleSelection = ret
    },
    // .人员安排标记接口：warn/updatestatus.do id
    goTest(){
      let id = JSON.stringify(this.multipleSelection)
      let data ={
        id: id
      }
      if(this.multipleSelection.length >0){
        this.axios.post('/warn/updatestatus.do', qs.stringify(data))
        .then((res) => {
          if (res.status ===200) {
            this.sucMsg(res.data.msg)
            this.getList()
          }else{
            this.errMsg('人员安排标记失败')
          }
       })
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          let temp = this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleCurrentChange(val) {
      let workPost = JSON.stringify(this.form.workPost)
      let data = {
        page: val,
        dateStart: this.form.startTime,
        dateEnd: this.form.endTime,
        department: this.form.zone,
        jielun: this.form.testResult,
        txType: this.form.remindeType,
        tjType: this.form.testType,
        workType: workPost,
        departId: getUserInfo().userId,
      }
      this.axios.post('/warn/query.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.testData = res.data.resultList
            this.total = res.data.sum
          }else{
          }
      })
 
    },
    addclass(i) {
      let  arr = ['conclusions-1','conclusions-2','conclusions-3','conclusions-4','conclusions-5']
      if(i==1){
         return 'conclusions-1'
      }else if(i==2){
        return 'conclusions-2'
      }
      else if(i==3){
        return 'conclusions-3'
      }
      else if(i==4){
        return 'conclusions-4'
      }
      else if(i==5){
        return 'conclusions-5'
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
.search-form
  overflow hidden
  .search-items
    width 80%
    float left
  .search-button
    width 20%
    float right 
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

<style>
.set-cycle{
  margin-left: 95px;
}
.import-excel:hover{
  cursor: pointer;
}
.my-input .el-input__inner{
  width: 200px;
  max-width: 200px!important;
  text-overflow:ellipsis!important;
  white-space:nowrap!important;
  overflow:hidden!important;
}
.search-items .el-form--inline .el-form-item{
  margin-right: 0;
}
.search-button .top-button .el-button{
  width:100px;
  height:40px;
  padding: 0;
  border:1px solid #4e99f4;
  border-radius:5px;
  color:#4e99f4;
  text-align:center;
  vertical-align: middle;
}
</style>
<style lang="css" scoped>
.HealthReminder{
  border-top:1px solid #cccccc;
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  padding: 20px 0;
}
.form-items{
  margin:  5px 0;
}
.my-teamTree{
  border: 1px solid #ccc;
  width: 500px;
  left:350px;
  top:150px;
  height: 500px;
  padding: 10px;
  position: absolute;
  z-index: 300;
  background: #FFF;
}
.team-tree{
  max-height: 450px;
  overflow-y:auto;
}
.my-table{
  width: 100%;
  margin: 0 auto;
}
.topNav{
text-align: center;
line-height: 70px;
height: 70px;
font-size: 16px;
padding: 0 20px;
background: #fff;
color: rgb(102,102,102);
}
.buttons{
  width: 50%;
  margin: 0 auto;
}
</style>
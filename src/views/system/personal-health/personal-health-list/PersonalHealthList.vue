<template>
  <!-- @click="hideTree($event)" -->
  <div class="PersonalHealthList" @click="hideTree($event)">
    <div class="search-form">
     <el-form :inline="true" :model="form" class="demo-form-inline" label-width="120px">
        <div class="form-items">
          <el-form-item label="体检开始时间"  style="margin-right:30px;">
            <el-date-picker  v-model="form.startTime"   type="date"  placeholder="选择日期"> </el-date-picker>
          </el-form-item>
           <el-form-item label="分区" style="margin-right:30px;">
            <el-input v-model="form.company" placeholder=""  @focus="onFocus"  id="part" readonly  class=" my-input"></el-input>
          </el-form-item>
           <el-form-item label="身份证号码" >
            <el-input v-model="form.idCard" placeholder=""></el-input>
          </el-form-item>
        </div>
        <!-- 单位树状图  -->
         <div class="my-Tree" v-show="isSelectcompany">
          <div class="zone-tree">
            <el-tree :data="companyData"   show-checkbox node-key="id" default-expand-all ref="tree" highlight-current
             :props="defaultProps" check-strictly >
            </el-tree>
          </div>
          <div class="buttons">
            <el-button type="primary" @click="onConfirmPart">确认</el-button>
            <el-button @click="resetChecked">清空</el-button>
          </div>
      </div>
    <!-- 单位树状图 -->
        <div class="form-items">
          <el-form-item label="体检结束时间"  style="margin-right:30px;">
            <el-date-picker  v-model="form.endTime"  value-format="yyyy-MM-dd"   type="date"  placeholder="选择日期"> </el-date-picker>
          </el-form-item>
           <el-form-item label="工种" style="margin-right:30px;">
            <el-select v-model="form.workPost" multiple  filterable  placeholder="请输入关键词" >
              <el-option v-for="(item,index) in workTypeList" :key="item.id"  :label="item.jobsName" :value="item.jobsName">
              </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="姓名" >
            <el-input v-model="form.name" placeholder=""></el-input>
          </el-form-item>
        </div>
        <div class="form-items">
          <el-form-item label="体检结论"  style="margin-right:50px;">
              <el-select v-model="form.testResult" clearable  placeholder="请选择">
              <el-option v-for="item,index) in options" :key="index" :label="item" :value="item"> </el-option>
              </el-select>
          </el-form-item>
           <el-form-item label="危害因素 " style="margin-right:80px;">
          <el-select v-model="form.harmFactor" multiple  filterable  placeholder="请输入关键词" 
           style="width:100%" @change="selectHarm">
          <el-option v-for="(item,index) in harmList" :key="item.id"  :label="item.name"  :value="item.id">
          </el-option>
        </el-select>
          </el-form-item>
           <el-form-item label="" >
             <el-checkbox v-model="form.checked"  style="margin-right:87px;">只看未分区</el-checkbox>
              <span class="save-blue right-30" @click="getTestData" > 查询 </span>
              <!-- <el-button type="primary" @click="getTestData()"  style="margin-right:87px;" >查询</el-button> -->
          </el-form-item>
        </div>
     </el-form>
    </div>
     <!-- 上传弹出框  :on-progress="onProgress" -->
    <div class="upload-form" >
     <el-dialog  class="dialog-form" title="导入EXCEL"  width="30%" center :visible.sync="IsUpload">
        <el-upload  class="upload-demo my-uploade" style="margin-bottom:30px;"
          ref="newupload" 
          :on-preview="handlePreview"
          :before-upload= "beforeUpload"
           action="123"
          :file-list="fileList">
           <el-button size="small" type="primary" >选择EXCEL</el-button>
        </el-upload>
      </el-dialog>
  </div>
     <!-- 上传弹出框 结束-->
    <div class="tabs">
      <div class="type-list-title border-bottom">
        <button class="title-btn">体检结果统计</button>
        <button v-show="role === 1" class="my-downLoade right-30" @click="downFile"> 模板下载</button>
        <button  class="my-downLoade right-30" v-show="role === 1"  @click="importExcle"> 导入EXCEL </button>
      </div> 
        <el-table :data="testData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="700"  :row-class-name="tableRowClassName">
        <!-- <el-table-column prop="cpid" label="序号" width="50" > </el-table-column> -->
        <el-table-column prop="crdepartment_id"  label="车间班组"  width="180">  </el-table-column>
        <el-table-column  prop="cpname"  label="姓名">  </el-table-column>
        <el-table-column  prop="cpcardnumber"  label="身份证号码">  </el-table-column>
        <el-table-column  prop=""  label="性别" width="50">  
          <template slot-scope="scope">
          <span v-if="scope.row.cpgener === '0' ">男</span>
          <span v-else> 女</span>
        </template>
        </el-table-column>
        <el-table-column  prop="cpage"  label="年龄" width="50">  </el-table-column>
        <el-table-column  prop="crjpbtype"  label="工种/职务">  </el-table-column>
        <el-table-column  prop="crjobnumber"  label="工号">  </el-table-column>
        <el-table-column  prop="crjobstate"  label="体检类型">  </el-table-column>
        <el-table-column  prop="chharmname"  label="危害因素">  </el-table-column>  
        <el-table-column  prop="crcheckdate"  label="体检时间"  sortable>  </el-table-column>
        <el-table-column  prop="" label="体检结论"> 
          <template slot-scope="scope"> 
             <!-- :class="addclass(scope.row.crcheckstate)" -->
          <span class="ruselt"> {{scope.row.crcheckstate}} </span>
          </template>
         </el-table-column>
        <el-table-column fixed="right" label="操作"> 
        <template slot-scope="scope">
          <el-button  type="text" size="primary" @click="showInfo(scope.$index, scope.row) ">
            <span style="text-decoration: underline;"> 查看</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="my-pagination">
        <div class="block">
          <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage1"  :page-size="15" 
            layout="total,prev, pager, next, jumper"  :total="total1">
          </el-pagination>
        </div>
      </div>
  </div>
</div>
</template>

<script>
// Array(6).fill(item2)
import qs from 'qs'
import utils from '@/utils'
import getUserInfo from 'common/js/user'
import {getDate} from 'common/js/time'
import {myurl} from '@/api/config.js'
import {getZoneList, getWorklist,getHarmlist,getZoneListByAuthority} from 'api/zone.js'
export default {
  name: 'PersonalHealthList',
  components: {
  },
  data () {
    return {
      testData2: [],
      testData:[],
      isSelectcompany: false,
      companyData: [],
      harmList: [],
      form: {
        startTime: '',
        company: '',
        idCard: '',
        endTime: '',
        name: '', 
        workPost:'',
        username: '',
        testResult: '',
        harmFactor: '',
        checked: false,
        onlyZone: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      options: ['目前未见异常', '职业禁忌症', '疑似职业病', '其他疾病或异常', '复查', '未检查'],
      workTypeList: [],
      options3: ['噪声', '粉尘', '一氧化碳'],
      currentPage1: 1,
      total1: 0,
      currentPage2: 1,
      total2: 0,
      zoneKey: 0,
      fileList: [],
      IsUpload: false,
      loading1: false,
      loading2: false,
      depart: '',
      departList: [],
      page: this.$route.query.page,
      userId: getUserInfo().userId,
      menuId: this.$route.query.menuId,
      role: 1,
      readOnly: false,
      flagUpload: false,
      progressFlag: false,
      uploadPercent: 0,
      dialogName: ''
    }
  },
  created() {
    this.currentPage1 = this.page  ? parseInt(this.page): 1 
  },
  mounted() {
    this.getUserAuth()
    this.getZone()
    this.getTestData()
    this.getHarm()
    this.getWorks()
    let time = getDate()
    this.form.endTime = `${time.year}-${time.month}-${time.date}`
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
    getUserAuth(){     //获取用户权限
      let data = {
        userId : this.userId,
        menuId: this.menuId
      }
      this.axios.post('/web/user/getAuthorityByUserAndMenu.do', qs.stringify(data))
      .then((res) => {
          if (res.status === 200) {
            if(res.data === 1){  //管理员可操作
              this.readonly = false
              this.role = 1
            } if(res.data === 0){ //管理员bu可操作
              this.role = 0
              this.readonly = true
            }
          }else{
            this.errMsg('获取失败')
          }
        })
    },
    downFile(){   //下载
      let url =`${myurl}/web/download.do`
      window.open(url)
    },
    showInfo(index, row){        //判断用户是可以查看还是可以操作 true查看
      if(this.role === 1){   
        this.readOnly = false   //操作
      } else {
        this.readOnly = true   //查看
      }
      // query: {item: myItem,page:this.currentPage,menuId:1,name:'分区管理'}}
      this.$router.push({path:'/wrap/health/listH/listD', query: {menuId:this.menuId,itemId: row.cpid, page:this.currentPage1,readonly: this.readonly}})
    },
    // 选择工种 拼接值
    selectResult(val){
      console.log(val)
    },
    selectHarm(val){
    },
    hideTree(e){
      if (e.target.id === '') {
        this.isSelectcompany = false
      }
    },
    errMsg(msg) {
      return this.$message({
        message: msg,
        type: 'error',
        center: true,
        duration: 3000
        })
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,
        type: 'success',
        center: true,
        duration: 1000
        })
    },
    getNodes(val) {
      this.zoneKey = val.id
      this.form.company = val.label
    },
    onFocus(){
      this.isSelectcompany = true
      this.depart = []
      this.departList = []
    },
    onConfirmPart() {
      let temp = this.$refs.tree.getCheckedNodes()
      this.form.company = this._filterTreeStr(temp)
      let temp2 = []      
      temp.forEach((item, idx) => {  //选中的值得数组
        temp2.push(item.id)
      })
      this.departList = temp2
      this.depart= this.$refs.tree.getCheckedKeys()       //选中的id
      this.isSelectcompany = false
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join('')
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.form.company = ''
      // this.isSelectcompany = !this.isSelectcompany
    },
    getWorks() {   //获取工种
      let data ={
        job: '',
        comId: getUserInfo().comPId
      }
      getWorklist(qs.stringify(data)).then((res) => {
        if (res) {
          res.map((item,index) => {
            this.workTypeList.push({jobsName:item.jobsName, id:item.jid.toString() })
            return this.workTypeList
          })
        }else{
           this.errMsg('请求失败')
        }
      }) 
    },
    getHarm() {
      let data ={   //获取危害因素
        name: ''
      }
      getHarmlist(qs.stringify(data)).then((res) => {
        if (res) {
        let temp = res
        for (var i in temp) {
           this.harmList.push({id:i,name:temp[i]}) //值
          }
      }else{
         this.errMsg('查询失败')
      }
      }) 
    },
    getZone() {
       let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.companyData = [res]
      })
    },
    importExcle(){
      this.IsUpload= !this.IsUpload
      this.fileList = []
    },
    handlePreview(file){   //显示文件名字
      this.dialogName = file.name
      this.flagUpload = true
    },
    onProgress(event, file, fileList){   //获取上传进度
      this.progressFlag = true
      console.log(file.percentage)
      this.uploadPercent = file.percentage.toFixed(0)
    },
    // 上传文件 导入excel importExcel.do
    beforeUpload (file) {
      this.fileList.push({name:file.name})
      let fd = new FormData()
      fd.append('file', file)
      fd.append('comId', getUserInfo().comPId)
      let config = {
        headers: {
          'Content-Type': 'multpart/form-data'
        }
      }
      this.axios.post('/web/importExcel.do',fd, config)
       .then((res) => {
          if(res.data === '添加成功') {
            this.getTestData()
            this.sucMsg(res.data)
            this.IsUpload = false
          } else{
            this.errMsg(res.data)
          }
       })
    },
    // 查询列表 selectlistallpage.do  int page,String date, 开始时间String date1结束,String jielun,结论String
    getTestData(){
      let start =this.form.startTime === ''? '' : this.utils.getMyDay(this.form.startTime)
      let time = getDate()
      this.form.endTime = `${time.year}-${time.month}-${time.date}`
      let harm =JSON.stringify(this.form.harmFactor)
      let jobs = JSON.stringify(this.form.workPost)
      let departList =  JSON.stringify(this.departList)
      this.currentPage1 = this.page  ? parseInt(this.page): 1
      let data ={
        page: this.currentPage1,
        date: start,
        date1: this.form.endTime,
        jielun: this.form.testResult,
        danwei: this.departList.length!==0 ? departList : [],
        jobss: jobs || [],
        yinshu: harm || [],
        haoma: this.form.idCard,
        name: this.form.name,
        comId: getUserInfo().comPId,
        roleId: getUserInfo().roleId,
        pid: getUserInfo().cpId || '[]'
      }
      if(this.form.checked){
        this.form.onlyZone = '只看分区'
     }
      if(true){
        this.axios.post('/web/selectlistallpage.do', qs.stringify(data))
        .then((res) => {
            if (res.status ===200) {
              console.log(res.data)
              this.sucMsg('查询成功')
              this.total1 = parseInt(res.data.total)
              this.testData = res.data.list
              this.currentPage1 = this.page  ? parseInt(this.page): 1
            }else{
              this.errMsg('查询失败')
            }
        })
      }
      console.log(data)
    },
    searchTest(form) {
     if(this.form.checked){
        this.form.onlyZone = '只看分区'
     }
      console.log(this.form)
    },
    handleCurrentChange(val) {
      let start =this.form.startTime === ''? '' : this.utils.getMyDay(this.form.startTime)
      let end = this.form.endTime 
      let harm =JSON.stringify(this.form.harmFactor)
      let jobs = JSON.stringify(this.form.workPost)
      let departList = JSON.stringify(this.departList)
      let data ={
        page: val,
        date: start,
        date1: end,
        jielun: this.form.testResult,
        danwei: this.departList.length!==0 ? departList : [],
        jobss: jobs || [],
        yinshu: harm || [],
        haoma: this.form.idCard,
        name: this.form.name,
        comId: getUserInfo().comPId,
        roleId: getUserInfo().roleId,
        pid: getUserInfo().cpId || '[]'
      }
      this.axios.post('/web/selectlistallpage.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          this.total1 = parseInt(res.data.total)
          this.testData = res.data.list
          }else{
              this.errMsg('请求失败')
            }
        })
    },
    addclass(i) {
      var arr = ['conclusions-1','conclusions-2','conclusions-3','conclusions-4','conclusions-5']
      if(i=='职业禁忌症'){
         return 'conclusions-1'
      }else if(i=='疑似职业病'){
        return 'conclusions-2'
      }
      else if(i=='其他疾病或异常'){
        return 'conclusions-3'
      }
      else if(i=='复查'){
        return 'conclusions-4'
      }
      else if(i=='未检查'){
        return 'conclusions-5'
      }
    },
  }
};
</script>

<style lang="css" scoped>
.PersonalHealthList{
  min-height: 800px;
}
.search-form{
  margin-top: 30px;
}
.tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
color: #fff!important; 
background-color: #f37c03!important; 
border-right-color: none!important;
border-left-color: none!important;
}
.tabs .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  color: #fff!important; 
}
.my-Tree{
  border: 1px solid #ccc;
  width: 420px;
  position: absolute;
  left:650px;
  top:100px;
  height: 500px;
  padding: 10px;
  overflow-y:auto;
  z-index: 300;
  background: #FFF;
}
.zone-tree{
max-height: 450px;
overflow-y:auto;
}
.tree1{

}
.buttons{
   text-align:center;
    margin-top:10px;
  /*margin-left: 530px!important;*/
}
.operate-btns{
  float: right;
}
.my-editBox{
position: absolute;
top: 0px;
left: 0px;
z-index: 300;
background: #fff;
width: 100%;
margin-left: 230px;
}
.my-uploade{
  /*float: left;*/
}
.my-downLoade:hover{
  cursor: pointer;
  color: #409EFF; 
  border: 1px solid #dcdfe6
}
.my-export:hover{
cursor: pointer;
}
</style>
<style lang="stylus" scoped> 
 .my-downLoade
  display inline-block
  vertical-align middle
  width 100px
  height 40px
  line-height 40px
  border-radius 5px
  text-align center
  margin-left 7px
  background #FFF
  outline none
  border none
</style>
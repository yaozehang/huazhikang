<template> 
<!-- :disabled="readonly"  进入页面判断 true 只读 false 查看-->
  <div class="AddPersonalHealth">
  <div class="list-title-all border-bottom">
    <button class="title-btn">修改信息</button>
    <el-button class="return" @click="goBack" :disabled="readonly">返回</el-button>
    </div>
    <div class="content clearfix row">
      <div class="add-from col">
        <el-form :inline="true" :model="form"  :rules="rules"  ref="form" class="demo-form-inline" label-width="120px">
          <div class="item-title">员工基本信息</div>
          <div class="form-items">
            <el-form-item label="姓名"  style="margin-right:30px;" prop="username"  required>
              <el-input v-model="form.username" placeholder="" style="width:220px;" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
             </el-radio-group>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="身份证号码"  style="margin-right:30px;" prop="idCard"  required>
              <el-input v-model="form.idCard" placeholder=""  style="width:220px;" @blur="getYear" :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况">
                <el-select v-model="form.marriage" clearable placeholder="请选择"  style="width:220px;">
                <el-option  v-for="item in options1" :key="item" :label="item" :value="item" :readonly="readonly"> </el-option>
                </el-select>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="出生年月"  style="margin-right:30px;">
              <el-date-picker v-model="form.birthTime" readonly type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
            <el-form-item label="家庭地址">
             <el-input v-model="form.address" placeholder=""  style="width:220px;" :readonly="readonly"></el-input>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="年龄"  style="margin-right:30px;">
              <el-input v-model="form.age" placeholder="" readonly style="width:220px;" ></el-input>
            </el-form-item>
            <el-form-item label="教育程度">
                <el-select v-model="form.educationalLevel" clearable placeholder="请选择"  style="width:220px;" :readonly="readonly">
                <el-option  v-for="item in options2" :key="item" :label="item" :value="item" > </el-option>
                </el-select>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="联系电话"  style="margin-right:30px;">
              <el-input v-model="form.phoneNum" placeholder=""   style="width:220px;"  :readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="工号">
                <el-input v-model="form.workNum" placeholder="" style="width:220px;"  :readonly="readonly"></el-input>
            </el-form-item>
          </div>
          <div class="item-title">体检记录信息</div>
          <div class="form-items">
            <el-form-item label="体检类型"  style="margin-right:30px;">
              <el-select v-model="form.testType" clearable placeholder="请选择"   style="width:220px;"  :readonly="readonly">
                <el-option  v-for="item in options3" :key="item" :label="item" :value="item" > </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="体检结论">
              <el-select v-model="form.resultStatu" clearable placeholder="请选择"  style="width:220px;"  :readonly="readonly">
                <el-option  v-for="item in options4" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="体检时间">
                <el-date-picker v-model="form.resultTime" type="date" placeholder="选择日期"  :readonly="readonly"> </el-date-picker>
            </el-form-item>
          </div>
          <div class="item-title">岗位信息</div>
          <div class="form-items">
            <el-form-item label="入职时间"  style="margin-right:30px;">
              <el-date-picker v-model="form.entryTime" type="date" placeholder="选择日期" :readonly="readonly" > </el-date-picker>
            </el-form-item>
            <el-form-item label="离职时间">
                <el-date-picker v-model="form.quitTime" type="date" placeholder="选择日期"  :readonly="readonly"> </el-date-picker>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="入岗时间"  style="margin-right:30px;">
              <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期" :readonly="readonly" > </el-date-picker>
            </el-form-item>
            <el-form-item label="离岗时间">
                <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期" :readonly="readonly"> </el-date-picker>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="分区"  style="margin-right:30px;">
              <el-input v-model="form.workPost" placeholder=""  id="part" disabled  style="width:320%"  ></el-input>
            </el-form-item>
          </div>
          <div class="form-items">  
             <!-- 可以创建 allow-create  @blur="isRepeat" filterable  -->
            <el-form-item label="工种/职务" >
              <el-select v-model="form.jobPost" multiple  filterable  placeholder="请输入关键词" 
                 style="width:320%" disabled>
              <el-option v-for="(item,index) in jobPostList" :key="item"  :label="item" :value="item">
              </el-option>
            </el-select>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="危害因素" >
                <el-input v-model="form.harm" placeholder="" disabled   style="width:320%"  ></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="护具类型" >
              <el-input v-model="form.protectiveEquipment" placeholder="" disabled   style="width:320%"  ></el-input>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="危害工龄"  style="margin-right:30px;">
              <el-input v-model="form.harmYear" placeholder="" style="width:220px;" :readonly="readonly"></el-input>
            </el-form-item>
             <el-form-item label="日工作时长" > 
              <el-input v-model="form.workDay" placeholder="" style="width:220px;" :readonly="readonly"></el-input>
            </el-form-item>
          </div>
    </el-form>
    <div class="item-title">职业史</div>
    <table style="width:100%" class="my-table">
      <tr> <th v-for="(item,index) in th2" :key="index" style="width:25%"> {{item}} </th> </tr>
      <tr v-for="(i,idx) in careerHistory" :key="idx" >
        <td>{{i.crstartdate}}</td>
        <td>{{i.crenddate}}</td>
        <td>{{i.crdepartmentid}}</td>
        <td>{{i.crjobs}}</td>
      </tr>
    </table>
     <div class="item-title">历次体检记录</div>
       <table style="width:100%" class="my-table">
      <tr> 
        <th style="width:16%;"> 体检号 </th>
        <th style="width:16%;"> 检查时间 </th>
        <th style="width:16%;"> 工种/职务 </th>
        <th style="width:16%;"> 结论状态 </th>
        <th style="width:16%;"> 体检类型  </th>
        <th style="width:20%;"> 操作 </th>
        <!-- status 1 有-->
      <tr v-for="(i,idx) in  testRecord" :key="idx">
        <td > {{i.crentertime}}</td>
        <!-- <td > {{i.crentertime}}</td> -->
        <td > {{i.crcheckdate}}</td>
        <td > {{i.crjobtype}}</td>
        <td > {{i.crcheckstate}}</td>
        <td > {{i.crjobstate}}</td>
        <td style="position:relative;"> 
          <!-- v-show="i.status == 1" -->
           <i class="el-icon-edit"  @click="changeTestInfo(i)"></i>
           <i class="el-icon-view" @click="viewFile(i)"></i>
       <!--    <a :href="'http://47.92.26.132:8080/web/selectpdf.do?id='+i.crentertime" class="el-icon-view icon"
           target="_blank" v-show="i.status == 1"></a> -->
          <i class="el-icon-upload2"  @click="getTestNum(i)" ></i>
          <i class="el-icon-remove-outline" @click="delPdf(i)" v-show="i.status == 1"> </i>
         </td>
      </tr>
    </table>
        <!-- 上传弹出框 -->
    <div class="upload-form" >
     <el-dialog  class="dialog-form" title="上传pdf"  width="30%" center :visible.sync="IsUpload">
        <el-upload  class="upload-demo my-uploade"  style=" margin-right:10px;" type="primary"
          ref="newupload"
          :on-success="handleSuccess"
          :limit="3" 
          :before-upload= "beforeUpload"
           action="123"
          :file-list="fileList">
         <el-button size="small" type="primary" >点击上传</el-button>
        </el-upload>
      </el-dialog>
  </div>
  <!-- 上传弹出框 结束-->
      </div>
      <div class="body-test-info col">
      <!-- <project-info></project-info> -->
      <project-info :form="form1"  :testList="testList" :testTitle="testTitle"></project-info>
      </div>
    </div>
    <div class="save">
         <el-button @click="resetForm()" class="right-20">清空</el-button> 
        <span class="save-blue big-blue"  @click="editInfo" :disabled="readonly">确认修改</span>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils'
import ProjectInfo from './project-info.vue'
import getUserInfo from 'common/js/user'
import {myurl} from '@/api/config.js'
// getUserInfo().allPId
var validateCard = (rule, value, callback) => {
  var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      if (value === '') {
        callback(new Error('请输入身份证号码'));
      } else if (reg.test(value) === false){
        callback(new Error('请输入15位或18位合法的身份证号码'))
      } else {
        callback();
      }
}
export default {
  name: 'HealthDetail',
  components: {
    ProjectInfo,
  },
  data () {
    return {
      th2: ['入岗时间', '离岗时间', '班组', '岗位'],
      careerHistory: [],
      testList: [],
      testTitle: [],
      testRecord: [],
      labelPosition: 'right',
      isWorkTree: false,
      abWorkPost: false,
      IsUpload: false,
      loading1: false,
      form2: {
      },
      testList: [],
      testTitle: [],
      form1: {
        testNum: '',
        name: '',
        sex: '',
        age: '',
        idCard: '',
        phoneNum: '',
        testType: '',
        testDate: '',
        company: '',
        conclusion1: '',
        conclusion2: '',
        conclusion3: ''
      },
      form: {
        username: '',
        birthTime: '',
        sex: 0,
        marriage: '',
        address: '',
        age: '',
        educationalLevel: '',
        phoneNum: '',
        workNum: '',
        testType: '',
        resultStatu: '',
        testStatu: '',
        resultTime: '',
        entryTime: '',
        quitTime: '',
        startTime: '',
        endTime: '',
        workPost: '',
        jobPost: [],
        harm: '',
        protectiveEquipment: '',
        idCard: '',
        harmYear: '-1',
        workDay: '-1'
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      options1: ['已婚', '未婚','离异'],
      jobPostList: [],
      procetList: ['护具一','护具二'],
      options2: ['小学', '初中', '中专/高中', '专科', '大学本科', '硕士研究生', '博士研究生'],
      options3: ['上岗前', '在岗期间', '离岗时', '离岗随访时', '应急检查'],
      options4: ['目前未见异常', '职业禁忌症', '疑似职业病', '其他疾病或异常', '复查', '未检查'],
      editableTabsValue2: '2',
      tabIndex: 2,
      isRead: false,
      harmList: [],
      zoneData: [],
      zoneKey: 0,
      fileList: [],
      testNumItem: 0,
      isshowpdf:false,
      rules: {  
        idCard: [{ validator: validateCard, trigger: 'blur' } ],
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
      },
      crId: 0,
      queryId : this.$route.query.itemId,
      page: this.$route.query.page,
      currentMenu: this.$route.query.menuId,
      readonly: false,
      cpCurPosId: '',
    }
  },
  created(){
    this.currentMenu = this.$route.query.menuId
  },
  mounted () {
    this.getUserAuth()
    this.getInfoById()
    this.currentMenu = this.$route.query.menuId
    if(getUserInfo().roleId === 0){
      this.readonly = true
    }
  },
  methods: {
    resetWorkPost() {
      this.$refs.tree.setCheckedKeys([])
      this.isWorkTree = !this.isWorkTree
    },
    errMsg(msg) {
      return this.$message({
        message: msg,
        type: 'error',
        center: true,
        duration: 1000
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
    //获取用户权限
      getUserAuth(){
      let data = {
        userId : getUserInfo().userId,
        menuId: 33
      }
      this.axios.post('/web/user/getAuthorityByUserAndMenu.do', qs.stringify(data))
      .then((res) => {
        console.log(res.data)
          if (res.status === 200) {
            if(res.data === 1){  //管理员可操作
              this.readonly = false
            } if(res.data === 0){ //管理员可操作
              this.readonly = true
            }
          }else{
            this.errMsg('获取失败')
          }
        })
    },
    viewFile(index, item){  //预览PDF
      let url =`${myurl}/web/selectpdf.do?id=${i.crentertime}`
      window.open(url)
    },
    goBack(){
      this.$router.push({path:'/wrap/health/listH', query: {page:this.page}})
    }, 
    getYear(){        // crcardnumber.do  获取年龄和出生日期
      let data={
        crcardnumber: this.form.idCard
      }
      this.axios.post('/web/crcardnumber.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          this.form.age =  res.data.age
          this.form.birthTime = res.data.year
        }else{
         this.errMsg(res.data)
        }
      })
    },
    handleSuccess(file, fileList){ },// 上传PDF
    getTestNum(i){      // 获取体检号
      this.fileList = []
      this.IsUpload = ! this.IsUpload
      this.testNumItem = i.crentertime
    }, 
    delPdf(i) { // 删除pdf
      let data ={
        id: i.crentertime
      }
      this.axios.post('/web/deletepdf.do', qs.stringify(data))
      .then((res) => {
          if(res.data === '删除成功'){
            this.sucMsg(res.data)
          }else{
            this.errMsg(res.data)
          }
       })
    },
    changeTestInfo(i) {  // selectBynumber.do   String  number  体检号
      let data ={
        number: i.crentertime
      }
      this.axios.post('/web/selectBynumber.do', qs.stringify(data))
       .then((res) => {
        console.log(res.data.conclusion)
          if(res.status === 200){
            this.form1.testNum = i.crentertime  //体检号
            this.form1.testType = i.crcheckstate    //体检状态
            this.form1.workPost = i.crjobtype    //工种
            this.form1.resultTime = i.crcheckdate    //体检时间
            this.form1.testType = i.crjobstate
            this.testTitle = res.data.project
            this.testList = res.data.project
            if(res.data.conclusion.length > 0) {
              this.form1.conclusion1 = res.data.conclusion[0].crCheckConclusion   //检查结论 体检
              this.form1.conclusion2 = res.data.conclusion[0].crProfessionConclusion   //职业结论
              this.form1.conclusion3 = res.data.conclusion[0].crExtremelyConclusion     //异常结论  
            } else{
              this.form1.conclusion1 = ''
              this.form1.conclusion2 = ''
              this.form1.conclusion3 = ''
            }
              
            this.sucMsg('成功')
          } else {
            this.errMsg('失败')
          }
       })
    },
    // 上传之前 //     uploading.do    上传接口     id就是体检号   file文件  
    beforeUpload (file) {
       let fd = new FormData()
       fd.append('file', file)
       fd.append('id', this.testNumItem)
       let config = {
        headers: {
          'Content-Type': 'multpart/form-data'
        }
      }
      this.axios.post('/web/uploading.do',fd, config)
       .then((res) => {
        if(res.status ===200){
          if(res.data === '上传成功'){
            this.sucMsg(res.data)
            this.fileList.push({name:file.name})
          }else{
            this.errMsg(res.data)
          }
        } else{
          this.errMsg('上传失败')
        }
 
       })
    },
    // 工种不重复jobsVerify.do    接收工种名  jobs     返回的  y工种可以添加    n工种已经存在
    isRepeat(){
      let data = {
        jobs: this.form.jobPost,
      }
      if(name !=='') {
         this.axios.post('/web/jobsVerify.do', qs.stringify(data))
        .then((res) => {
          if(res.data === 'y'){
            this.sucMsg('工种可以添加')
          }else {
            this.errMsg('工种名字重复，请重新输入')
          }
          })
        }
    },
    //    tabid      接口 healthinformation.do 
    getInfoById(){
      let  data ={ tabid: this.queryId}
      this.axios.post('/web/healthinformation.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            console.log(res.data)
            let data = res.data
            this.form.username = data.personal.cpName
            this.form.entryTime= res.data.personal.cpUnitStarttime   //入职时间
            this.form.quitTime = data.personal.cpUnitEndtime  //离职时间
            this.form.birthTime = data.personal.cpBirthday
            this.form.phoneNum = data.personal.cpTel
            this.form.marriage = data.personal.cpMarry
            this.form.educationalLevel = data.personal.cpEducation
            this.form.address = data.personal.cpBornAddress
            this.form.age = data.personal.cpAge
            this.form.sex =   parseInt(data.personal.cpGender) 
            this.form.idCard = data.personal.cpCardNumber  //身份
            // 体检信息
            this.crId = data.personal.crId
            this.cpCurPosId = data.personal.cpCurPosId
            this.form.startTime = data.personal.cpStartDate   //入岗时间
            this.form.endTime = data.personal.cpEndDate    //离岗时间
            this.form.resultTime = data.personal.cpCheckDate    //体检时间
            this.form.testType = data.personal.cpJobState    //体检状态
            this.form.harmYear = data.personal.cpJobHarmYears    //危害工龄
            this.form.workDay = data.personal.cpJobTotalYears    //工作时长
            this.form.workNum = data.personal.crJobNumber    //工号
            this.form.resultStatu = data.personal.crCheckState  // 体检结论
            if(data.conclusion ){
              this.form1.conclusion1 = data.conclusion[0].crCheckConclusion   //检查结论 体检
              this.form1.conclusion2 = data.conclusion[0].crProfessionConclusion   //职业结论
              this.form1.conclusion3 = data.conclusion[0].crExtremelyConclusion     //异常结论
            }
            if(data.xinxi.length > 0 ){
              // this.form1.testNum = data.xinxi[0].crEnterTime  //体检号
              this.form1.testType = data.xinxi[0].crJobState    //体检状态
              // this.form1.workPost = data.xinxi[0].crDeartrment    //工种
              this.form1.resultTime = data.xinxi[0].crCheckDate    //体检时间
            }
            this.form1.username = data.personal.cpName
            this.form1.age = data.personal.cpAge
            this.form1.sex = data.personal.cpGender === '0'? '男': '女'
            this.form1.idCard = data.personal.cpCardNumber  //身份
            this.form1.phoneNum = data.personal.cpTel
            this.form.harm  =res.data.harm
            this.form.workPost = data.personal.cpCurPosName    //分区
            // this.form.jobPost = data.personal.cp_cur_job_name    //工作岗位
            this.form.protectiveEquipment = data.personal.cpProtect   //护具 字符纯
            // this.harmList = data.jobs 
           
            let temp0 = []
            if(data.jobs.length > 0 ) {   //工种
                this.form.jobPost = data.jobs
                this.form1.workPost = data.jobs.join('')
                this.jobPostList =  data.jobs
            }
            let temp4 =[]   //获取护具类型 不可修改
             console.log(data.jobs,this.form.jobPost )
              this.careerHistory =  data.history
              this.testRecord = data.record
              this.testTitle = data.project
              this.testList = data.project
          }else{
            this.errMsg('请求失败')
          }
        })
    },
    resetForm(){
      for(var i in this.form){
        if(!(this.form[i] instanceof Array)){
          this.form[i] = ''
        }else{
          this.form[i] = []
        }
      }
    },
    // 确认修改
    editInfo(){
        let baseInfo = {
        id: this.queryId,
        cpName: this.form.username, 
        cpGender: this.form.sex,
        cpAge: this.form.age,
        cpMarry: this.form.marriage,
        cpBirthday: this.form.birthTime,
        cpCardNumber: this.form.idCard,
        cpEducation: this.form.educationalLevel,
        cpTel: this.form.phoneNum,
        cpBornAddress: this.form.address,
        cpUnitStarttime: this.form.entryTime , //入职时间
        cpUnitEndtime:  this.form.quitTime, //离职时间
      }
      let positionInfo={
        crId: this.crId,
        crCheckDate: this.form.resultTime,   //体检时间
        crJobState: this.form.testType,    // 体检类型 
        crEnterTime: this.form1.testNum,  // 体检号
        crCheckState: this.form.resultStatu, // 体检结论
        crStartDate: this.form.startTime,   // 入岗时间
        crEndDate: this.form.endTime,      // 离岗时间
        crDepartmentId : this.cpCurPosId,   // 分区 最后一集ID
        crDeartrment: this.form.workPost, // 工作岗位 全部
        crJobType: this.form.jobPost,        // 工种职务   传名字数组 
        crProtect: this.form.protectiveEquipment,       // 防护用品
        crJobHarmYears: this.form.harmYear,     // 危害工龄 
        crDayworktime: this.form.workDay,     // 日工作时长
        crJobNumber : this.form.workNum,   // 工号 
        sysparmid: this.form.harm,   //危害因素的 id
        crProtect: this.form.protectiveEquipment
      }
      let myDetailInfo = JSON.stringify(this.testList)
      let myBaseInfo = JSON.stringify(baseInfo)
      let myPositionInfo = JSON.stringify(positionInfo)
      let data = {
        baseInfo: myBaseInfo,
        positionInfo:myPositionInfo,
        detailInfo: myDetailInfo
     }
     // console.log(data)
     // updatepersonal.do
      this.axios.post('/web/updatepersonal.do', qs.stringify(data))
       .then((res) => {
        console.log(res.data)
          if(res.status === 200){
            // this.getAllType()
            this.sucMsg('修改成功')
            this.from= this.form
            this.$router.push({path:'/wrap/health/listH', query: {page:this.page,readonly: false}})
            // this.IsUpload = false
          }
       })

    },
  }
};
</script>

<style lang="css" scoped>
.content{
  border: 1px solid #d9d9d9;
  border-radius: 3px;
}
.add-from{
  max-height: 800px;
  background: #f5fcff;
}
.add-from{
overflow-y: scroll;
overflow-x:hidden;
}
.body-test-info{
  margin-left: 20px;
  overflow: hidden;
}
.form-items{
  margin: 5px 0;
}
.form-items .el-form-item .el-form-item__label{
  text-align: left;
}
.item-title{
  background: #0089e2;
  color: #fff;
  height: 40px;
  width: 100%;
  line-height: 40px;
  font-size: 18px;  
  padding-left: 20px;         
}
.my-workTree{
max-height: 150px;
overflow: scroll;
border: 1px solid #d9d9d9;
}
.save{
  width: 20%;
  margin:10px auto;
  height: 80px;
}
.test-list li{
float: left;
height: 30px;
line-height: 30px;
padding: 5px;
color: #52a1f3;
border:1px solid #52a1f3;
margin: 5px;
border-radius: 10px;
}
.addBtn{
  border: none!important;
}
.row{display: -webkit-box;display: -webkit-flex;display: -moz-box;display: -ms-flexbox;display: flex;}
.row .col {-webkit-box-flex: 1;-webkit-flex: 1;-moz-box-flex: 1;-moz-flex: 1;-ms-flex: 1;flex: 1; display: block;width: 100%;}
.my-table{
  margin-bottom: 40px;
}
.my-table th,.my-table td{
  height: 40px;
  line-height: 40px;
  text-align: center;
  border:1px solid #cccccc;
  font-weight: normal;
  font-size: 16px;
}
.my-table th{
  background: #f2f2f2;
}
.my-uploade{
margin: 0 auto;
}
.return{
  background: white;
color: #1f7edd;
float: right;
margin-right: 30px;
 }
</style>
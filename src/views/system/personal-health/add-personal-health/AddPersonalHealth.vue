<template>
  <div class="AddPersonalHealth" @click="hideTree($event)">
  <div class="list-title-all border-bottom">
     <el-button class="title-btn" type="text">新增健康监护档案</el-button>
    </div>
    <div class="content clearfix ">
      <div class="add-from ">
        <el-form :inline="true" :model="form"   ref="form" :rules="rules" class="demo-form-inline" label-width="120px">
          <div class="item-title">员工基本信息</div>
          <div class="form-items">
            <el-form-item label="姓名"  style="margin-right:30px;" prop="username"  required>
              <el-input v-model="form.username" placeholder="" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
             </el-radio-group>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="身份证号码"  style="margin-right:30px;" prop="idCard"  required>
              <el-input v-model="form.idCard" placeholder="" style="width:220px;" @blur="getYear" type="number"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="marriage">
                <el-select v-model="form.marriage"  clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="item in options1" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </el-form-item>
          </div>
           <div class="form-items" >
            <el-form-item label="出生年月"  style="margin-right:30px;" prop="birthTime">
              <el-date-picker v-model="form.birthTime" readonly  value-format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width:220px;"> </el-date-picker>
            </el-form-item>
            <el-form-item label="家庭地址" prop="address">
             <el-input v-model="form.address" placeholder="" style="width:220px;"></el-input>
            </el-form-item>
          </div>
           <div class="form-items" >
            <el-form-item label="年龄"  style="margin-right:30px;" prop="age">
              <el-input v-model="form.age" readonly placeholder="" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="教育程度" prop="educationalLevel">
                <el-select v-model="form.educationalLevel" clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="item in options2" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </el-form-item>
          </div>
           <div class="form-items" >
            <el-form-item label="联系电话"  style="margin-right:30px;" prop="phoneNum">
              <el-input v-model="form.phoneNum" placeholder="" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="workNum">
                <el-input v-model="form.workNum" placeholder="" style="width:220px;"></el-input>
            </el-form-item>
          </div>
          <div class="item-title">体检记录信息</div>
          <div class="form-items" >
            <el-form-item label="体检类型"  style="margin-right:30px;" prop="testType">
              <el-select v-model="form.testType" clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="item in options3" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="体检结论" prop="resultStatu">
              <el-select v-model="form.resultStatu" clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="item in options4" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="体检时间" prop="resultTime">
                <el-date-picker v-model="form.resultTime"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
          </div>
          <div class="item-title">岗位信息</div>
          <div class="form-items" >
            <el-form-item label="入职时间"  style="margin-right:30px;" prop="entryTime">
              <el-date-picker v-model="form.entryTime"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
            <el-form-item label="离职时间" prop="quitTime">
                <el-date-picker v-model="form.quitTime"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="入岗时间"  style="margin-right:30px;"  prop="startTime">
              <el-date-picker v-model="form.startTime"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
            <el-form-item label="离岗时间" prop="endTime">
                <el-date-picker v-model="form.endTime"   value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="所在分区" required  style="margin-right:30px;" prop="workPost">
              <el-input v-model="form.workPost"  readonly placeholder="" id="part1" @focus="showTree()"  style="width:320%"></el-input>
            </el-form-item>
          </div>
          <!-- 分区树状图 -->
          <div class="my-workTree" v-show="isWorkTree">
            <div class="work-tree">
              <el-tree :data="zoneData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
               :props="defaultProps" @check="getWorkPost" check-strictly>
              </el-tree>
            </div>
          </div>
           <!-- 分区树状图 -->
          <div class="form-items">
            <el-form-item label="工种/职务" prop="jobPost">
              <el-select v-model="form.jobPost" multiple @change="change" @focus="getInfo"  placeholder="请选择"  style="width:320%">
                <el-option v-for="(item,index) in jobPostList" v-bind:key="index"  :label="item.name" :value="item.name">
              </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="危害因素" prop="harm" >
               <el-select v-model="form.harm"  :disabled="true"  placeholder="请选择" style="width:320%">
                <el-option  v-for="item in harmList" :key="item.hid" :label="item.hname" :value="item.hid"> </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="护具类型" prop="protectiveEquipment">
               <el-input v-model="form.protectiveEquipment" placeholder="" style="width:320%"  :disabled="true" ></el-input>
 <!--               <el-select v-model="form.protectiveEquipment" multiple  disabled placeholder="请选择" style="width:320%">
                <el-option  v-for="item in protectList" :key="item" :label="item" :value="item"> </el-option>
              </el-select> -->
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="危害工龄"  style="margin-right:30px;" prop="harmYear">
              <el-input v-model="form.harmYear" placeholder=""  style="width:220px;" @blur="regYear" type="number"></el-input>
              <span class="item unit">/年</span>
            </el-form-item>
             <el-form-item label="日工作时长" prop="workDay">
              <el-input v-model="form.workDay" placeholder="" style="width:220px;" type="number"></el-input>
              <span class="item unit">/时</span>
            </el-form-item>
          </div>   
    </el-form>
      </div>
    </div>
      <div class="save">
        <el-button  @click="addEmpInfo('form')"  :disabled="readonly" type="primary">保存</el-button>
        <el-button @click="resetForm()" class="right-20" plain>清空</el-button> 
        <!-- <span class="save-blue big-blue" @click="addEmpInfo('form')"  :disabled="readonly">保存</span> -->
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import qs from 'qs'
import ProjectInfo from './ProjectInfo.vue'
import getUserInfo from 'common/js/user'
import {getZoneList} from 'api/zone.js'
import {getZoneListByAuthority} from 'api/zone'
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
  name: 'AddPersonalHealth',
  components: {
    ProjectInfo
  },
  props:{
    currentMenu: Number
  },
  data () {
    return {
      labelPosition: 'right',
      isWorkTree: false,
      loading1: false,
      zoneData: [],
      zoneKey: 0,
      form2: {},
      form: {
        username: '',
        birthTime: '',
        sex: 0,
        marriage: '',
        address: '',
        age: '',
        idCard: '',
        educationalLevel: '',
        phoneNum: '',
        workNum: '',
        testNum: '',
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
        harm: [],
        protectiveEquipment: '',
        harmYear: '',
        workDay: '',
        resultStatu1: '',
        resultStatu2: '',
        resultStatu3: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      harmList: [],
      jobPostList: [],
      testTitle: [],
      testList: [],
      options1: ['已婚', '未婚','离异'],
      options2: ['小学', '初中', '中专/高中', '专科', '大学本科', '硕士研究生', '博士研究生'],
      protectList: ['护具一', '护具二', '护具三'],
      options3: ['上岗前', '在岗期间', '离岗时', '离岗随访时', '应急检查'],
      options4: ['目前未见异常', '职业禁忌症', '疑似职业病', '其他疾病或异常', '复查', '未检查'],
      editableTabsValue2: '2',
      tabIndex: 2,
      permission: 0,
      readonly:false,
      rules: {  
        idCard: [{ validator: validateCard, trigger: 'blur' }],
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' } ],
      } 
    }
  },
  mounted() {
    this.getUserAuth()
    this.getZone()
  },
  methods: {
    errMsg(msg) {
      return this.$message({message: msg,type: 'error',center: true,duration: 2000})
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,type: 'success',center: true, duration: 1000
        })
    },
    change(val){
      console.log(val)
    },
    regYear(){
       this.readonly = false
      if(this.form.harmYear.length<3 ) {
      }else{
        this.errMsg('请输入两位数的危害工龄')
        this.readonly = true
      }
    },
    getUserAuth(){ //获取用户权限
      let data = {
        userId : getUserInfo().userId,
        menuId: this.currentMenu
      }
      this.axios.post('/user/getAuthorityByUserAndMenu.do', qs.stringify(data))
      .then((res) => {
        console.log(res.data)
          if (res.status === 200) {
            if(res.data === 1){  //管理员可操作
              this.permission = 1
            } if(res.data === 0){ //管理员BU可操作
              this.permission= 0
            }
          }else{
            this.errMsg('获取失败')
          }
        })
    },
    // 获取分区
    getZone() {
       let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.zoneData = [res]
      })
    },
    slectHarm(val,item) {
    },
    // crcardnumber.do  crcardnumber  
    getYear(){
      let data={
        crcardnumber: this.form.idCard
      }
      console.log(this.form.idCard.length)
      if(this.form.idCard !== '' && this.form.idCard.length>=18){
        this.axios.post('/crcardnumber.do', qs.stringify(data))
        .then((res) => {
          if (res.status ===200) {
            this.form.age =  res.data.age
            this.form.birthTime = res.data.year
          }else{
           this.errMsg(res.data)
          }
        })
      }
    },
     // 根据分区获取信息 addlistall.do 
    getInfo(){
      let data ={
        id: this.zoneKey
      }
      this.axios.post('/addlistall.do', qs.stringify(data))
      .then((res) => {
        console.log(res.data)
        console.log(this.form.jobPost)
          if (res.status ===200) {
            // this.jobPostList = res.data.listvo  hname
             let temp = []
             if(res.data.listVo1.length !== 0){
                res.data.listVo1.map((item,index) =>{
                temp.push(item.hname)
             })
              this.harmList = res.data.listVo1   //危害因素
              this.form.harm = temp
             }
             let temp3 =[]
             let temp4 =[]
             if(res.data.listvo.length !== 0){
                res.data.listvo.map((item,index) =>{
                temp3.push({id:item.id,name:item.name})
                temp4.push(item.name)
              })
              this.jobPostList = temp3
              this.form.jobPost = temp4  //工种
             }
            this.form.protectiveEquipment = res.data.protect
            console.log(this.form.jobPost)
          }else{
          }
      })
    },
    resetForm(){
      this.zoneKey = ''
      for(var i in this.form){
        if(!(this.form[i] instanceof Array)){
          this.form[i] = ''
        }else{
          this.form[i] = []
        }
      }
    },
    addEmpInfo(form){       // addTabCheckPersonal.do  危害因素 id
      let protect = JSON.stringify(this.form.protectiveEquipment)   //护具 id 
      let baseInfo = {
        cpName: this.form.username, 
        cpGender: this.form.sex,
        cpAge: this.form.age,
        cpMarry: this.form.marriage,
        cpBirthday: this.form.birthTime,
        cpCardNumber: this.form.idCard,
        cpEducation: this.form.educationalLevel,
        cpTel: this.form.phoneNum,
        cpBornAddress: this.form.address,
        cpUnitStarttime: this.form.entryTime, //入职时间
        cpUnitEndtime:  this.form.quitTime, //离开职时间
      }
      let positionInfo={
        crCheckDate: this.form.resultTime,   //体检时间
        crJobState: this.form.testType,    // 体检类型 
        crEnterTime: this.form.testNum,     // 体检号
        crCheckState: this.form.resultStatu, // 体检结论
        crStartDate: this.form.startTime,   // 入岗时间
        crEndDate: this.form.endTime,      // 离岗时间
        crDepartmentId : this.zoneKey === 0 ? '' : this.zoneKey,   // 工作岗位 最后一集ID
        crDeartrment: this.form.workPost, // 工作岗位 全部
        crJobType: this.form.jobPost,        // 工种职务   传名字数组 
        crProtect: this.form.protectiveEquipment,       // 防护用品
        crJobHarmYears: this.form.harmYear,     // 危害工龄 
        crDayworktime: this.form.workDay,     // 日工作时长
        crJobNumber : this.form.workNum,   // 工号 
        sysparmid: this.form.harm,   //危害因素的 id
      }
      let myBaseInfo = JSON.stringify(baseInfo)
      let myPositionInfo = JSON.stringify(positionInfo)
      let data = {
        baseInfo: myBaseInfo,
        positionInfo:myPositionInfo,
        comId: getUserInfo().comPId
     }
    this.$refs[form].validate((valid) => {
      console.log(valid)
      if (valid) {
        this.axios.post('/addTabCheckPersonal.do', qs.stringify(data))
        .then((res) => {
          if (res.data === '添加成功') {
           this.sucMsg('新增成功')
          this.$refs[form].resetFields()
          this.form = this.form
          }else{
           this.errMsg(res.data)
          }
        })
         }else {
          this.readonly = true
          this.errMsg('您输入的数据有误')
         }  

      })
     },
     hideTree(e){
      if(e.target.id === ''){
        this.isWorkTree = false
      }
     },
    showTree() {
      this.isWorkTree = true
      this.$refs.tree.setCheckedKeys([this.zoneKey])
      // this.$refs.tree.setCheckedKeys([])
    },
    save() {
      console.log(this.form)
    },
    // 体检项目信息新增的值
    addProjrect(val) {
      console.log(val)
    },
    // 体检项目信息录入的值
    saveTest(val){
      console.log(val)
    },
    // 获取树状图图的值
    getWorkPost(val) {
       //获取 当前id  (this.$refs.tree.getCheckedKeys())[0]  //level 层级
      this.zoneKey = val.id
      this.form.workPost = val.label
      this.isWorkTree = false
      this.form.jobPost = []
    },
  }
};
</script>

<style lang="css" scoped>
.AddPersonalHealth{
  padding-top:10px;
}
.content{
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  margin: 0 auto;
  width: 800px;
}
.add-from{
  margin: 0 auto;
  width: 800px;
  position: relative;
  background: #f5fcff;
}
.add-from{
/*overflow-y: scroll;*/
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
  font-size: 16px;  
  padding-left: 20px;   
  margin-bottom: 20px;      
}
.my-workTree{
 width: 500px;
height: 500px;
padding: 10px;
border: 1px solid #d9d9d9;
position: absolute;
top:800px;
left:120px;
background: #fff;
z-index: 300;
}
.work-tree{
height: 450px;
overflow-y: auto;
}
.save{
  width: 250px;
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
</style>
<template>
  <!-- v-if="roleId 员工0  普通管理员1 2 是公司 超级管理员3  -->
  <div class="user-main">
    <div class="common-user"  @click="hideTree($event)" v-if="roleId !== 3">
    <div class="user-info-title border-bottom">
      <el-button class="title-btn" type="text">用户基本信息</el-button>
    </div>
  <div class="user-form my-form common-form" >
    <el-form ref="user" :model="user"  :rules="rules"  label-width="120px">
      <el-form-item label=" 用户名" prop="username"  required>
        <el-input v-model="user.username" @blur="isRepeat"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCard" required >
        <el-input v-model="user.idCard" ></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="accountNumber" required >
        <el-input v-model="user.accountNumber" ></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="loginPassword" required>
          <el-input v-model="user.loginPassword" ></el-input>
      </el-form-item>
       <el-form-item label="联系电话" >
          <el-input v-model="user.contactNumber" ></el-input>
      </el-form-item>
      <el-form-item label="所在分区" prop="zoneName" required>
          <el-input   readonly  v-model="user.zoneName" id="part" @focus="selectZone" ></el-input>
      </el-form-item>
      <el-form-item label="数据区域"  required>
          <el-input   readonly  v-model="user.operateZones" id="operate" @focus="isoperateTree = true" ></el-input>
      </el-form-item>
      <el-form-item label="巡检类型">
        <el-select v-model="typeform.type" multiple filterable  placeholder="请选择"  @change="addType" class="big-select">
             <el-option v-for="(item,index) in typeList" :key="index" :label="item.insTypeName" :value="item.id" ></el-option>
          </el-select>
      </el-form-item>
      <!-- 分区树 -->
      <div class="my-zoneTree" v-show="isSelectZone" id="zoneTree">
        <div class="zone-tree">
         <el-tree :data="zoneData"   show-checkbox node-key="id" check-strictly default-expand-all ref="tree1" highlight-current :props="defaultProps" @check="getCheckedNodes">
        </el-tree>
        </div>
      </div>
      <!-- 分区树 -->
       <!-- 操作分区状图 -->
      <div class="my-operateTree" v-show="isoperateTree" id="operateTree">
        <div class="operate-tree">
            <el-tree :data="zoneData" default-expand-all  show-checkbox node-key="id"  ref="operateTree" highlight-current
            :props="defaultProps"  check-strictly >
        </el-tree>
        </div>
        <div class="buttons">
          <span @click="resetChecked"  class="small-check clear-btn">清空</span>
          <span class="small-check blue-check" @click="onConfirmPart">确定</span>
      </div>
    </div>
  <!-- 操作分区图 -->
    <ul class="form-items clearfix">
        <li class="input-group">
          <span class="title">用户类型</span>
           <el-select v-model="user.type"  placeholder="请选择" class="inner-input">
            <el-option v-for="(item,index) in types" :key="index"  :label="item"  :value="item"> </el-option>
          </el-select>
        </li>
        <li class="input-group">
          <span class="title">是否禁用</span>
          <el-select v-model="user.isUse"  placeholder="请选择" class="inner-input">
            <el-option v-for="(item,index) in isUse" :key="index"  :label="item"  :value="item"> </el-option>
          </el-select>
        </li>
        <li class="input-group">
          <button class="choose-auth yell-btn" @click="isAuthority = true" id="power" type="button">选择权限</button>
        </li>
    </ul>
        <!-- 权限树  check-strictly  @check="getCheckedAuthority" v-show="isAuthority" --> 
      <div class="my-authorityTree" v-show="isAuthority" id="authorityTree">
        <div class="authority-tree">
          <el-tree :data="authorityData" show-checkbox  node-key="id"  default-expand-all  :expand-on-click-node="false"
             ref="tree" >
          <span class="custom-tree-node" slot-scope="{ node, data }"  >
            <span style="margin-right:20px" @click="setType(node,data)"> {{ node.data.name }}</span>
            <span>
               <el-checkbox v-model="node.data.operate" true-label="1" false-label="0">可操作</el-checkbox>
               <!-- <el-radio :label="1" v-model="node.data.operate">可操作</el-radio> -->
            </span>
          </span>
         </el-tree>
        </div>
        <div class="buttons">
          <span @click="resetAuthority"  class="small-check clear-btn">清空</span>
          <span class="small-check orange-check" @click="getCheckedAuthority">确定</span>
      </div>
      </div>
      <!--  权限树-->
      <el-form-item class="footer-item">
           <!-- <span class="save-blue big-blue"  @click="addUser('user')">保存</span> -->
           <el-button type="primary"  @click="addUser('user')">保存</el-button>
      </el-form-item>
    </el-form>
    <div>
    </div>
    </div>
  </div>
  <!-- :myUser="myUser"  :newUser="newUser" -->
  <div class="super-adduser" v-if="roleId === 3">
    <div class="supper-user">
      <super-user  :myUser="myUser" :newUser="newUser"></super-user>
    </div>
    <div class="sure-btn">
      <span class="save-blue big-blue"  @click="addSuperUser()" :disabled="disabled">保存</span>
    </div>
    
  </div>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils.js'
import getUserInfo from 'common/js/user'
import {getZoneList} from 'api/zone.js'
import {addUser,addCompany,getAuthorityData,nameRepeat} from 'api/user'
import {getAllPolingType} from 'api/poling'
import superUser from './super-user.vue'
var validatePass = (rule, value, callback) => {
  var reg = /^[a-zA-Z0-9_-]{6,12}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (reg.test(value) === false){
        callback(new Error('请输入6到12位的数字、字母组成的密码'))
      } else {
        callback();
      }
}
var validateName = (rule, value, callback) => {
  var uPattern = /^[a-zA-Z0-9_-]{4,12}$/
      if (value === '') {
        callback(new Error('请输入登录账号'));
      } else if (uPattern.test(value) === false){
        callback(new Error('请输入4到12位数字、字母组成的登录账号'))
      } else {
        callback();
      }
}
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
  label: 'AddUser',
  components:{
    superUser
  },
  data () {
    return {
      myUser:{
        zoneName: '',
        higherZone: '',
        partitionLevel: 0,
        type: 1,
        zoneKey: 0,
      },
      newUser: {
        username: '',
        loginAccount: '',
        password: '',
        permissions: [],
      },
      roleId: getUserInfo().roleId,
      user:{
        type: '',
        username: '',
        idCard:'',
        accountNumber: '',
        loginPassword: '',
        contactNumber: '',
        zoneName: '',
        isUse: '',
        operateZones: '',
        operateKeys: [],
        authority: {
          authorityRow: [],
          authorityItem: []
        }
      },
      isoperateTree: false,
      disabled: false,
      zoneKey: 0,
      types: ['管理员', '员工',],
      zoneName: [],
      authority: [],
      authorityRow: [],
      authorityItem: [],
      isUse: ['是', '否'],
      isSelectZone: false,
      isAuthority: false,
      editAuthority: false,
      typeShow: false, // 巡检类弹窗显示
      zoneData: [],
      authorityList: [],
      authorityData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultProps1: {
        children: 'children',
        label: 'name'
      },
      multipleSelection: [],
      menuList: [],
      userList: [],
      typeform: {
        type: []
      },
      typeList: [],
      rules: {
        idCard: [{validator: validateCard, trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
        accountNumber: [{required: true,validator: validateName, trigger: 'blur'}],
        loginPassword: [{required: true, validator: validatePass, trigger: 'blur'}],
        zoneName:   [{ required: true, message: '请选择分区', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    if(this.roleId !==3){
    this.getZone()
    this.getAuthorityList()
    this._getAllPolingType()
    }
  },
  methods: {
    rowStyle() {
     return 'text-align: center'
    },
    errMsg(msg) {
      return this.$message({
        message: msg, type: 'error',center: true,duration: 2000})
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,type: 'success', center: true, duration: 1000})
    },
    addSuperUser(){   //  超级管理员  新增分区 
      this.disabled = true
      var newUser =this.myUser.type === 1 ? JSON.stringify(this.newUser) : JSON.stringify({})
      let data ={
        parentPId: this.myUser.zoneKey,  //上级分区id
        partitionLevel: this.myUser.partitionLevel,  //上级分区level
        pName: this.myUser.zoneName,   //新增分区名称
        status: this.myUser.type,   //状态(1:公司  2：分公司),
        newUser: newUser,  //新增公司管理员信息 账号密码 用户名
      }
      addCompany(qs.stringify(data)).then((res) =>{
        if(res === 1){
          this.sucMsg('新增成功')
          this.myUser =this.myUser
          this.newUser = []
          this.disabled = false
        }else{
          console.log(res)
        }
      })
    },
    isRepeat() {      // user/username.do  用户名是否存在  username
      nameRepeat(qs.stringify({username: this.user.username})).then((res) =>{
        if(res.status === 1){
          this.errMsg('用户名字重复 请重新输入')
        }
        this.disabled= true
      })
    },
    getAuthorityList() {    //   获取 用户权限樹狀圖
      getAuthorityData().then((res) =>{
        if(res.length!==0){
          this.authorityData= res
        }else{
          console.log(res)
        }
      })
    },
    showAuthorityTree() {
      this.isAuthority = true
    },
    _getAllPolingType() {  //获取巡检类型
      getAllPolingType().then((res) => {
        this.typeList = res
      })
    },
    setType(node,data){   //显示巡检类弹窗
      if(node.data.id === 12){
        if(node.checked){
        this.typeShow = true
        this.isAuthority = true
       }
      }
    },
    addType(){
      console.log(this.typeform.type)
       this.typeShow = false
    },
    getCheck(val){
      let temp =this.$refs.tree.getNode(val.id).parent
      if(temp !==undefined){
         temp.checked = true
      }
    },
    resetAuthority(){
      this.key = this.$refs.tree.setCheckedKeys([])
      this.isAuthority = true
    },
    getCheckedAuthority(){     // 获取用户选择的权限
      let temp3 =[],temp2 = [],temp = []
      temp = [].concat(this.$refs.tree.getCheckedKeys(), this.$refs.tree.getHalfCheckedKeys())
      temp.map((item,index) => {
        temp2.push({name:this.$refs.tree.getNode(item).data.name, id: item,
          operate:this.$refs.tree.getNode(item).data.operate,level:this.$refs.tree.getNode(item).data.level})
      })
      this.menuList = temp2
      this.key = this.$refs.tree.getCheckedKeys()
      this.userList =  JSON.stringify(this.$refs.tree.getCheckedKeys())
      this.isAuthority = false 
      if(temp2.length!==0){
        this.sucMsg('权限选择成功')
      }else{
        this.errMsg('请选择权限')
      }
    },
    cancleAuthority() {
      this.$refs.tree.setCheckedKeys([])
    },
    // partition/query.do  获取分区
    getZone() {
      getZoneList(qs.stringify({pId: getUserInfo().comPId})).then((res)=>{
        this.zoneData = [res.data]
      })
    },
    onConfirmPart() {   //可操作区域
      let temp = this.$refs.operateTree.getCheckedNodes()
      this.user.operateZones = this._filterTreeStr(temp)
      //选中的id
      this.user.operateKeys= JSON.stringify(this.$refs.operateTree.getCheckedKeys())
      this.isoperateTree = false
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join(',')
    },
    resetChecked() {
      this.$refs.operateTree.setCheckedKeys([])
      this.user.operateZones = ''
      this.isoperateTree = true
    },
    addUser(user){     // user/insert.do  新增用户  roleId 0员工  1 
      this.disabled = true
      let isUse = this.user.isUse === '禁用' ? 0: 1
      let roleId = this.user.type === '管理员' ? 1 :0
      let permissions = JSON.stringify(this.menuList)//    permissions:[] 权限菜单
      let data = {
        username: this.user.username,
        idCard: this.user.idCard,
        loginAccount: this.user.accountNumber,
        password: this.user.loginPassword,
        tel: this.user.contactNumber,
        partitionId: this.zoneKey,
        partitionName: this.user.zoneName,
        status: isUse,
        roleId: roleId,
        permissions: permissions,
        partitions: this.user.operateKeys,
        comPId: getUserInfo().comPId,
        inspectionIds: JSON.stringify(this.typeform.type)
      }
     this.$refs[user].validate((valid) => {
      if (valid) {
        addUser(qs.stringify(data)).then((res) =>{
         if (res) {
            if(res.msg === '添加成功'){  //成功
              this.sucMsg(res.msg)
              this.$router.push({path:'/wrap/user/list'})
              this.$refs[user].resetFields()
              this.user = this.user
            } else if(res.status === '0'){  //失败
              this.errMsg(res.msg)
            } else if(res.status === '3'){  //身份证重复
              this.errMsg(res.msg)
            }else if(res.status === '4'){  //登录账号重复
              this.errMsg(res.msg)
            }else if(res.status === '-1'){  //后台报错
              this.errMsg(res.msg)
            }
          }else{
            this.errMsg('新增未成功')
            this.disabled = false
          }
        })
      } else {
        this.errMsg('数据输入有误请重新输入')
        return false
      }
    })
  },
  selectZone() {
    this.isSelectZone = true
    this.$refs.tree1.setCheckedKeys([this.zoneKey])
    },
  hideTree(e){
    if(e.target.id === ''){
      this.isSelectZone = false
      this.isAuthority = false
      this.isoperateTree = false
      }
    },
  getCheckedNodes(val) {
    this.user.zoneName = val.label
    this.zoneKey = val.id
      //获取 当前id
     this.isSelectZone = false
  },
  }
};
</script>

<style lang="css" scoped>
.user-main{
  max-height: 900px;
}
.user-info-title{
  color: #fff;
  font-size: 18px;
}
.my-zoneTree{
  border: 1px solid #ccc;
  width: 550px;
  margin-left: 129px;
  padding: 10px;
  position: absolute;
  bottom:382px;
  max-height: 450px;
  z-index: 300;
  background: #FFF;
}
.zone-tree{
  overflow-y:auto;
  max-height: 400px;
}
.my-operateTree{
  border: 1px solid #ccc;
  width: 550px;
  margin-left: 127px;
  padding: 10px;
  position: absolute;
  bottom:320px;
  max-height: 600px;
  background: #FFF;
  z-index: 300;
  border-radius:5px;
}
.operate-tree{
  max-height: 400px;
  overflow-y:auto;
}
.buttons{
  width: 200px;
  margin: 0 auto;
}
.my-authorityTree{
  border: 1px solid #ccc;
  width: 350px;
  padding-left: 30px;
  position: absolute;
  margin-left: 317px;
  bottom: 194px;
  max-height: 550px;
  background: #FFF;
  z-index: 300;
}
.authority-tree{
  max-height: 500px;
    overflow-y: auto;
}
.btns{
  position: fixed;
  bottom: 45%;
  z-index: 500;
}
.inner-tabel tr td{
  width: 30%;
}
.choose-auth{
  height: 40px;
  line-height: 40px;
  width: 100px;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 5px;
}
.sure-btn{
  width: 300px;
  margin:-70px auto 0 auto;
  /* margin-left: 600px; */
  text-align: center;
}
.big-select{
  width: 580px;
}
.form-items{
  width: 760px;
  margin-left: 50px;
  margin-bottom: 20px;
}
.form-items li{
float: left;
width: 260px;
}
.form-items li:nth-child(3){
  width: 100px!important;
}
.form-items li:nth-child(2),.form-items li:nth-child(1){
  margin-right: 15px;
}
.form-items li .title{
width: 80px;
}
.form-items li .inner-input{
width: 180px;
}
.footer-item{
  margin-left: 200px;
}
</style>

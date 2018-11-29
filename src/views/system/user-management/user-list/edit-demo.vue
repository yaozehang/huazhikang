<template>
  <div class="edit-user-main"   @click="hideTree($event)">
    <div class="type-list-title border-bottom">
        <el-button class="title-btn" type="text">用户列表</el-button>
        <el-button class="return" @click="goBack">返回</el-button>
    </div>
  <div class="user-form my-form" >
    <el-form ref="user" :model="user"  :rules="rules" label-width="120px">
      <el-form-item label=" 用户名" prop="username"  required>
        <el-input v-model="user.username" @blur="isRepeat"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCard" required>
        <el-input v-model="user.idCard" ></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="loginAccount" required >
        <el-input v-model="user.loginAccount" ></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="loginPassword" required>
          <el-input v-model="user.loginPassword" ></el-input>
      </el-form-item>
       <el-form-item label="联系电话" >
          <el-input v-model="user.contactNumber" ></el-input>
      </el-form-item>
      <el-form-item label="所在分区" prop="zoneName" required>
          <el-input v-model="user.zoneName" @focus="selectZone" id="part" ></el-input>
      </el-form-item>
       <el-form-item label="数据区域"  required>
          <el-input   readonly  v-model="user.operateZones" id="operate" @focus="isoperateTree = true" ></el-input>
      </el-form-item>
        <!-- 分区树 -->
        <div class="my-zoneTree" v-show="isSelectZone">
          <div class="zone-tree">
           <el-tree :data="zoneData"   show-checkbox node-key="id" check-strictly default-expand-all ref="tree1" highlight-current
             :props="defaultProps" @check="getCheckedNodes">
          </el-tree>
        </div>
      </div>
      <!-- 分区树 -->
        <!-- 数据区域分区状图 -->
      <div class="my-operateTree" v-show="isoperateTree">
        <div class="operate-tree">
          <el-tree :data="zoneData" default-expand-all  show-checkbox node-key="id"  ref="operateTree" highlight-current
           :props="defaultProps"  check-strictly >
          </el-tree>
        </div>
        <div class="buttons">
        <el-button type="primary" @click="onConfirmPart">确认</el-button>
        <el-button @click="resetChecked">清空</el-button>
      </div>
    </div>
  <!-- 部操作分区图 -->
       <el-form-item label=" 用户类型" required>
         <el-select v-model="user.type"  placeholder="请选择" >
          <el-option v-for="(item,index) in types" :key="index"  :label="item"  :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-select v-model="user.isUse"  placeholder="请选择" >
          <el-option v-for="(item,index) in isUse" :key="index"  :label="item"  :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限列表">
         <button class="choose-auth"  @click="isAuthority = true" id="power" type="button">修改权限</button>
         <button class="choose-auth" @click="getCheckedAuthority" type="button">确定修改</button>
      </el-form-item>
        <!-- 权限树 :default-checked-keys="permissionsKeys" getKeys-->
      <div class="my-authorityTree" v-show="isAuthority">
        <div class="authority-tree">
           <el-tree :data="authorityData" show-checkbox  node-key="id"  default-expand-all  :expand-on-click-node="false"
             ref="tree" >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span style="margin-right:20px"  @click="setType(node,data)"> {{ node.data.name }}</span>
              <span>
                  <el-checkbox v-model="node.data.operate" true-label="1" false-label="0">可操作</el-checkbox>
              </span>
            </span>
          </el-tree>
        </div>
        <div class="buttons">
        <!-- <el-button type="primary" @click="getCheckedAuthority">确认</el-button> -->
      </div>
      </div>
    <!-- 权限树 -->
      <el-form-item>
        <el-button type="primary" @click="addUser('user')" :disabled="userRoleId === 2">保存</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
  </el-form>
    <!-- 设置巡检类型-->
    <el-dialog  class="dialog-form" title="设置巡检类型" width="500px"  :visible.sync="typeShow" >
      <el-form :model="typeform" label-width="80px" ref="typeform" style="width: 80%;">
        <el-form-item label="巡检类型" >
          <el-select v-model="typeform.type" multiple filterable  placeholder="请选择" style="width: 100%;">
             <el-option v-for="(item,index) in typeList" :key="index" :label="item.insTypeName" :value="item.id" ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addType" >确 定</el-button>
      </div>
    </el-dialog>
     <!-- 设置巡检类型-->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils.js'
import getUserInfo from 'common/js/user'
import {getZoneList} from 'api/zone.js'
import {getAllPolingType} from 'api/poling'
import {editUser,getCommonUser,getAuthorityData,getMenuByUserId,nameRepeat} from 'api/user'
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
  name: 'EditUser',
  data () {
    return {
      user:{
        type: '',
        username: '',
        loginAccount: '',
        accountNumber: '',
        loginPassword: '',
        contactNumber: '',
        zoneName: '',
        isUse: '',
        myAuthority: '',
        operateZones: '',
        operateKeys: [],
        idCard: '',
        authority: {
          authorityRow: [],
          authorityItem: []
        }
      },
      types: ['管理员', '员工'],
      zoneName: [],
      authority: [],
      authorityRow: [],
      authorityItem: [],
      isUse: ['是', '否'],
      isoperateTree: false,
      isSelectZone: false,
      isSelectauthority: false,
      isAuthority: false,
      authorityKey: 0,
      editAuthority: false,
      zoneData: [],
      zonkey: 0,
      authorityData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultProps1: {
        children: 'children',
        label: 'label'
      },
      multipleSelection: [],
      querryId : this.$route.query.itemId, //列表传过来的id
      page: this.$route.query.page,
      menuList: [],
      permissionsKeys: [],  //用户现在的权限 id
      typeShow: false,
      typeform: {
        type: []
      },
      userRoleId: 0,
      typeList: [],
      dataZone: [],
      rules: {
        idCard: [{validator: validateCard, trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
        loginAccount: [{validator: validateName, trigger: 'blur'}],
        loginPassword: [{ validator: validatePass, trigger: 'blur'}],
        zoneName:   [{ required: true, message: '请选择分区', trigger: 'blur' }],
        operateZone: [{ required: true, message: '请选择数据区域', trigger: 'blur' }],
      }
    }
  },
  created(){
   },
  mounted() {
    this.getInfo()
    this.getZone()
    this.getUserAuthority()
    this.getAuthorityList()
    this._getAllPolingType()
  },
  methods: {
    rowStyle() {
     return 'text-align: center'
    },
    sucMsg(msg) {
      return this.$message({message: msg,type: 'success',center: true, duration: 1000})
    },
    errMsg(msg) {
      return this.$message({message: msg,type: 'error',center: true, duration: 2000})
    },
    goBack(){
      this.$router.push({path:'/wrap/user/list', query: {page:this.page,menuId:18,name:'用户列表'}})
    },
    isRepeat() {
      let data ={
        username: this.user.username
      }
      this.axios.post('/user/username.do', qs.stringify(data)).then((res) => {
        if (res.status ===200) {
          if(res.data.status === 1){
            this.errMsg('用户名字重复 请重新输入')
          }
          this.disabled= true
        }else{
        console.log(res)
        }
      })
    },
    getZone() {
      getZoneList(qs.stringify({pId: getUserInfo().comPId})).then((res)=>{
        this.zoneData = [res.data]
      })
    },
     // user/allMenu.do  获取 用户全部权限菜单
    getAuthorityList() {
      getAuthorityData().then((res) =>{
        if(res.length!==0){
          this.authorityData = res
        }else{
          console.log(res)
        }
      })
    },
    getUserAuthority(){  //user/getMenuByUserId.do  获取当前权限
      this.getAuthorityList()
      getMenuByUserId(qs.stringify({userId: this.querryId})).then((res) =>{
        let data = res[0]
        console.log(res[0])
        if (res.length === 1) {
          let temp = []
          let temp1= []
          this.typeform.type = data.inspectionIds
          data.menuList.map((item,index) => {
            temp.push({id:item.menuId})
            temp1.push(item.menuId)
          })
          let authorityData = this.authorityData
          data.menuList.forEach((i, idx) =>{
            authorityData.map((item,index) =>{
              if(item.id === i.menuId){
                // console.log(this.$refs.tree.getNode(item.id))
                this.$refs.tree.getNode(item.id).data.operate = i.operate.toString()
              }
              if(item.children.length !==0){
                item.children.map((j,x)=>{
                  if(j.id === i.menuId){
                       // console.log(this.$refs.tree.getNode(i.id))
                    this.$refs.tree.getNode(j.id).data.operate =i.operate.toString()
                  }
                  if(j.children.length !==0){
                    j.children.map((k,y)=>{
                      if(k.id === i.menuId){
                        this.$refs.tree.getNode(k.id).data.operate = i.operate.toString()
                      }
                    })
                  }
                })  
              }
            })
            return authorityData
          })
         this.permissionsKeys =  temp1
         this.authorityData = authorityData
         this.$refs.tree.setCheckedKeys(this.permissionsKeys)
        }else{
        console.log(res)
        }
      })
    },
    getInfo(){
      getCommonUser(qs.stringify({userId: this.querryId})).then((res) =>{
        let user = res.user
        if (res.user !== undefined) {
         this.userRoleId = user.roleId
         this.user.username = user.username
         this.user.loginAccount = user.loginAccount
         this.user.loginPassword = user.noMd5Pwd
         this.user.contactNumber = user.tel
         this.user.zoneName = user.partitionName
         this.user.idCard  = user.idCard
         this.user.isUse = user.status === 0 ? '是' : '否'
         this.user.type = user.roleId === 0 ? '员工' : '管理员'
         this.zoneKey = user.partitionId  
         let temp = []
         if(res.allId.length !==0){
            res.allId.map((item,index) =>{
            for(let key in item){
              this.dataZone.push(key)
              temp.push(item[key])
            }
          })
          this.user.operateZones = temp.join('、')
          this.$refs.operateTree.setCheckedKeys(this.dataZone)
         }
        }else{
         console.log(res)
        }
      })
    },
    showAuthorityTree() {
      this.isAuthority = !this.isAuthority
    },
    cancleCheckAuthority(){
       this.isAuthority = !this.isAuthority
    },
    selectZone() {
      this.isSelectZone = !this.isSelectZone
      this.$refs.tree1.setCheckedKeys([this.zoneKey])
    },
    hideTree(e){
      if(e.target.id === ''){
        this.isSelectZone = false
        this.isAuthority = false
      }
    },
    getCheckedNodes(val) {
      this.user.zoneName = val.label
      this.zoneKey = val.id
        //获取 当前id
       this.isSelectZone = false
    },
    resetChecked() {
      this.$set(this.user, 'zoneName', '')
      this.$refs.tree1.setCheckedKeys([])
    },
    selectAuthority() {
      this.isSelectauthority = !this.isSelectauthority
    },
    _getAllPolingType() {  //获取巡检类型
      getAllPolingType().then((res) => {
        this.typeList = res
      })
    },
    setType(node,data){   //显示巡检类弹窗
      console.log(node)
      if(node.data.id === 12){
        if(node.checked){
        this.typeShow = true
        this.isoperateTree = true
       }
      }
    },
    addType(){
       this.typeShow = false
    },
    getKeys(val){
      let key = val.id
      let temp =this.$refs.tree.getNode(val.id).parent
      if(temp !==undefined){
         temp.checked = true
      }
      let pId =this.$refs.tree.getNode(val).parent.data.id
      if(this.$refs.tree.getNode(pId).parent !==undefined){
        this.$refs.tree.getNode(pId).parent.checked = true
      }
      },
    getCheckedAuthority() {   //修改用户权限
       let temp = [].concat(this.$refs.tree.getCheckedKeys(), this.$refs.tree.getHalfCheckedKeys())
      let temp2 = []
       temp.map((item,index) => {
        temp2.push({name:this.$refs.tree.getNode(item).data.name, id: item,
          operate:this.$refs.tree.getNode(item).data.operate,level:this.$refs.tree.getNode(item).data.level})
      })
      this.menuList = JSON.stringify(temp2)
      if(temp2.length!==0){
        this.sucMsg('权限选择成功')
      }else{
        this.errMsg('请选择权限')
      }
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
    },
    addUser(user){
      let isUse = this.user.isUse === '禁用' ? 0: 1
      let roleId = this.user.type === '管理员' ? 1 :0
      let data = {
        userId: this.querryId,
        username: this.user.username,
        loginAccount: this.user.loginAccount,
        password: this.user.loginPassword,
        tel: this.user.contactNumber,
        partitionId: this.zoneKey,
        partitionName: this.user.zoneName,
        status: isUse,
        roleId: roleId,
        permissions: this.menuList,
        partitions: this.user.operateKeys || '[]',
        inspectionIds: JSON.stringify(this.typeform.type)  //巡检类型
       }
      this.$refs[user].validate((valid) => {
        if (valid) {
          editUser(qs.stringify(data)).then((res) =>{
            if(res.msg === '添加成功'){
              this.sucMsg('修改成功')
              this.user =this.user
              this.$router.push({path:'/wrap/user/list', query: {page:this.page,menuId:18,name:'用户列表'}})
            }else{
              this.errMsg(res.msg)
            }
        })
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
};
</script>

<style lang="css" scoped>
.edit-dialog-form{
  background: #fff;
  width: 80%;
}
.user-info-title{
  line-height: 50px;
  color: #fff;
  margin: 20px auto;
  font-size: 16px;
  border-bottom: 1px solid #f35a1f;
}
.my-zoneTree{
  border: 1px solid #ccc;
  width: 550px;
  margin-left: 50px;
  padding: 10px;
  position: absolute;
  bottom:400px;
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
  margin-left: 100px;
  padding: 10px;
  position: absolute;
  bottom:339px;
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
  width: 420px;
  position: absolute;
 margin-left: 50px;
  bottom: 160px;
  max-height: 700px;
  background: #FFF;
  z-index: 300;
}
.authority-tree{
  max-height: 650px;
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
 .return{
background: white;
color: #1f7edd;
float: right;
margin-right: 30px;
 }
 .choose-auth{
  height: 40px;
  line-height: 40px;
  background: #409EFF;
  width: 100px;
  color: #fff;
  border: none;
  outline: none;
}
/*.el-table-column .el-table th{
  display: none!important;}*/
</style>
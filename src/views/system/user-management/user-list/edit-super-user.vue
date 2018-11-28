<template>
  <!-- v-if="roleId === 1   普通管理员1 超级管理员2-->
  <div class="user-main" @click="hideTree($event)">
    <div class="user-info-title border-bottom">
      <button class="title-btn">修改用户信息</button>
      <el-button class="return" @click="goBack">返回</el-button>
    </div>
  <div class="user-form my-form common-form" >
      <div class="super-user" >
      <el-form ref="newUser" :model="newUser"   label-width="120px">
        <el-form-item label=" 用户名"  required>
          <el-input v-model="newUser.username" @blur=""></el-input>
        </el-form-item>
        <el-form-item label="登录账号"  required >
          <el-input v-model="newUser.loginAccount" ></el-input>
        </el-form-item>
        <el-form-item label="登录密码"  required>
            <el-input v-model="newUser.password" ></el-input>
        </el-form-item>
         <el-form-item label="权限列表">
          <button class="choose-auth yell-btn" @click="isAuthority = true" id="power" >选择权限</button>
        </el-form-item>
          <!-- 权限树  check-strictly  @check="getCheckedAuthority" v-show="isAuthority" --> 
        <div class="my-authorityTree" v-show="isAuthority">
          <div class="authority-content">
            <el-tree :data="authorityData" show-checkbox  node-key="id"  default-expand-all  :expand-on-click-node="false"
               ref="tree1" @check="">
            <span class="custom-tree-node" slot-scope="{ node, data }"  >
              <span style="margin-right:20px"> {{ node.data.name }}</span>
              <span>
                 <el-checkbox v-model="node.data.operate" true-label="1" false-label="0">可操作</el-checkbox>
              </span>
            </span>
            </el-tree>
          </div>
          <div class="buttons autho-footer">
            <span @click="resetAuthority"  class="small-check clear-btn">清空</span>
            <span class="small-check orange-check" @click="getCheckedAuthority">确定</span>
          </div>
        </div>
        <!--  权限树-->
        <el-form-item class="footer-item">
          <span class="save-blue big-blue"  @click="addUser('user')">保存</span>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {getUserInfoById} from 'api/user.js'
export default {
  label: 'AddUser',
  data () {
    return {
      newUser: {
        username: '',
        loginAccount: '',
        password: '',
        permissions: [],
      },
      key: 0,
      disabled: false,
      authority: [],
      isSelectZone: false,
      isAuthority: false,
      zoneData: [],
      authorityData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      userList: [],
      querryId : this.$route.query.itemId,  //列表传过来的id
      page: this.$route.query.page,
      row: this.$route.query.row,
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' } ],
        accountNumber: [{ required: true, message: '登录账户不能为空', trigger: 'blur' }],
        loginPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        zoneName:   [{ required: true, message: '请选择分区', trigger: 'blur' }]
      }
    }
  },
  created(){
      this.newUser.username = this.row.username
      this.newUser.loginAccount = this.row.loginAccount 
  },
  mounted() {
    this.getZone()
    this.getAuthorityList()
    this.getUserAuthority()
    this.getInfo()
  },
  methods: {
    errMsg(msg) {
      return this.$message({
        message: msg, type: 'error', center: true,duration: 2000})
    },
    sucMsg(msg) {
      return this.$message({
        message: msg, type: 'success', center: true,duration: 1000})
    },
    goBack(){
      this.$router.push({path:'/wrap/user/list', query: {page:this.page}})
    },
    // user/username.do  用户名是否存在  username
    isRepeat() {
    },
    getInfo(){
      let data = {
        userId: this.querryId
      }
      this.axios.post('/web/user/selectByUserId.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          console.log(res.data)
         this.newUser.username = res.data.user.username
         this.newUser.loginAccount = res.data.user.loginAccount
         this.newUser.password = res.data.user.noMd5Pwd
        }else{
        console.log(res)
        }
        })
    },
    // user/allMenu.do  获取 用户权限菜单
    getAuthorityList() {
      this.axios.post('/web/user/allMenu.do')
      .then((res) => {
        if (res.status ===200) {
          this.authorityData= res.data
        }else{
        console.log(res)
        }
      })
    },
    getUserAuthority(){  //user/getMenuByUserId.do  获取当前权限
      this.getAuthorityList()
      let data ={
        userId: this.querryId
      }
      this.axios.post('/web/user/getMenuByUserId.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          let temp = []
          let temp1= []
          res.data.map((item,index) => {
            temp.push({id:item.menuId})
            temp1.push(item.menuId)
          })
          let authorityData = this.authorityData
          res.data.forEach((i, idx) =>{
             authorityData.map((item,index) =>{
              if(item.id === i.menuId){
                this.$refs.tree1.getNode(item.id).data.operate = i.operate
              }
              if(item.children.length !==0){
                item.children.map((j,x)=>{
                  if(j.id === i.menuId){
                    this.$refs.tree1.getNode(j.id).data.operate = i.operate
                  }
                  if(j.children.length !==0){
                    j.children.map((k,y)=>{
                      if(k.id === i.menuId){
                        this.$refs.tree1.getNode(k.id).data.operate = i.operate
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
         this.$refs.tree1.setCheckedKeys(this.permissionsKeys)
        }else{
        console.log(res)
        }
      })
    },
    showAuthorityTree() {
      this.isAuthority = true
    },
    // 获取用户选择的权限
    getKeys(val){
      let key = val.id
      let temp =this.$refs.tree1.getNode(val.id).parent
      if(temp !==undefined){
         temp.checked = true
      }
      let pId =this.$refs.tree1.getNode(val).parent.data.id
      if(this.$refs.tree1.getNode(pId).parent !==undefined){
        this.$refs.tree1.getNode(pId).parent.checked = true
      }
      },
    resetAuthority(){
      this.$refs.tree1.setCheckedKeys([])
      this.isAuthority = true
    },
    getCheckedAuthority(){
      let temp3 =[]
      let temp2 = []
      //获取半选中状态
      let temp = []
      temp = [].concat(this.$refs.tree1.getCheckedKeys(), this.$refs.tree1.getHalfCheckedKeys())
      temp.map((item,index) => {
        temp2.push({name:this.$refs.tree1.getNode(item).data.name, id: item,
          operate:this.$refs.tree1.getNode(item).data.operate,level:this.$refs.tree1.getNode(item).data.level})
      })
      this.newUser.permissions = temp2
      this.key = this.$refs.tree1.getCheckedKeys()
      this.userList =  JSON.stringify(this.$refs.tree1.getCheckedKeys())
      this.isAuthority = false 
    },
    cancleAuthority() {
      this.$refs.tree1.setCheckedKeys([])
    },
    getZone() {      // partition/superAdminSelectZone.do
      this.axios.post('/web/partition/superAdminSelectZone.do')
      .then((res) => {
        console.log(res.data.data)
        if (res.data) {
          this.zoneData = [res.data.data]
        }else{
        console.log(res)
        }
      })
    },
    addUser(){
      // this.$emit('addUser',this.newUser)
      let data ={
        userId: this.$route.query.itemId,
        newUser: JSON.stringify(this.newUser)
      }
      console.log(this.newUser)
      console.log(data)
      this.axios.post('/web/partition/superAdminUpdateUser.do', qs.stringify(data))
      .then((res) => {
        if (res.data !==0) {
         this.sucMsg('修改成功')
         this.newUser = this.newUser
        }else{
        console.log(res)
        }
        })
    },
    selectZone() {
      this.isSelectZone = true
    // this.$refs.tree1.setCheckedKeys([])
    },
    hideTree(e){
      if(e.target.id === ''){
        this.isSelectZone = false
        this.isAuthority = false
        }
      },
    getCheckedNodes(val) {
      this.myUser.higherZone = val.label
      this.myUser.zoneKey = val.id
      this.isSelectZone = false
      this.myUser.partitionLevel = this.$refs.tree.getNode(val.id).data.level
    },
  }
};
</script>

<style lang="css" scoped>
.user-main{
  height: 900px;
  max-height: 900px;
}
.return{
  float: right;
  margin-right: 20px;
}
.user-info-title{
  color: #fff;
  margin: 30px auto;
  font-size: 16px;
}
.my-zoneTree{
  border: 1px solid #ccc;
  width: 550px;
  margin-left: 50px;
  position: absolute;
  top:234px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
  background: #FFF;
}
.my-authorityTree{
  border: 1px solid #ccc;
  width: 420px;
  height: 450px;
  padding-left: 20px;
  margin-left: 50px;
  position: absolute;
  top: 432px;
  z-index: 400;
  background: #FFF;
}
.authority-content{
  max-height: 400px;
  overflow-y: auto;
}
.autho-footer{
  width: 200px;
  margin: 8px auto;
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
}
.footer-item{
  margin-left: 200px;
}
</style>

<template>
  <!-- v-if="roleId === 1   普通管理员1 超级管理员2-->
  <div class="user-main" @click="hideTree($event)">
    <div class="user-info-title border-bottom">
      <el-button class="title-btn" type="text">用户基本信息</el-button>
    </div>
  <div class="user-form my-form common-form" >
    <el-form ref="myUser" :model="myUser"  label-width="120px">
      <el-form-item label=" 分区名称" required>
        <el-input v-model="myUser.zoneName" ></el-input>
      </el-form-item>
      <el-form-item label="上级分区"  required>
        <el-input  v-model="myUser.higherZone" @focus="selectZone"  id="part" style="width:100%" ></el-input>
      </el-form-item>
      <el-form-item label="是否为公司"  required>
        <el-radio-group v-model="myUser.type">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分区树  -->
      <div class="my-zoneTree" v-show="isSelectZone">
         <el-tree :data="zoneData" default-expand-all  show-checkbox node-key="id"   ref="tree" highlight-current
           :props="defaultProps" check-strictly @check="getCheckedNodes">
        </el-tree>
      </div>
        <!-- 为公司即 新增一个账号 -->
      <div class="super-user" v-if="myUser.type === 1">
      <el-form ref="newUser" :model="newUser"   label-width="120px">
        <el-form-item label=" 用户名"  required>
          <el-input v-model="newUser.username" ></el-input>
        </el-form-item>
        <el-form-item label="登录账号"  required >
          <el-input v-model="newUser.loginAccount" ></el-input>
        </el-form-item>
        <el-form-item label="登录密码"  required>
            <el-input v-model="newUser.password" ></el-input>
        </el-form-item>
         <el-form-item label="权限列表">
          <!-- getCheckedAuthority -->
          <button class="choose-auth yell-btn" @click="isAuthority = true" id="power" >选择权限</button>
            <!-- <el-button type="primary" @click="getCheckedAuthority">确认权限</el-button> -->
        </el-form-item>
          <!-- 权限树  check-strictly  @check="getCheckedAuthority" v-show="isAuthority" --> 
        <div class="my-authorityTree" v-show="isAuthority">
          <div class="authority-content">
            <el-tree :data="authorityData" show-checkbox  node-key="id"  default-expand-all  :expand-on-click-node="false"
               ref="tree1" >
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
      </el-form>
      </div>
    </el-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {getSuperZone} from 'api/zone'
export default {
  label: 'AddUser',
  props: {
    myUser: Object,
    newUser: Object,
  },
  data () {
    return {
      // myUser:{
      //   zoneName: '',
      //   higherZone: '',
      //   type: 1,
      //   zoneKey: 0,
      // },
      // newUser: {
      //   username: '',
      //   loginAccount: '',
      //   password: '',
      //   permissions: [],
      // },
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
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' } ],
        accountNumber: [{ required: true, message: '登录账户不能为空', trigger: 'blur' }],
        loginPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        zoneName:   [{ required: true, message: '请选择分区', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getZone()
    this.getAuthorityList()
  },
  methods: {
    errMsg(msg) {
      return this.$message({
        message: msg,
        type: 'error',
        center: true,
        duration: 2000
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
    // user/username.do  用户名是否存在  username
    isRepeat() {
    },
    // user/allMenu.do  获取 用户权限菜单
    getAuthorityList() {
      this.axios.post('/user/allMenu.do')
      .then((res) => {
        if (res.status ===200) {
          this.authorityData= res.data
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
      getSuperZone().then((res) => {
        if(res.length !== 0){
          this.zoneData = [res]
        }
      })
    },
    addUser(){
      this.$emit('addUser')
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
  max-height: 900px;
}
.user-info-title{
  color: #fff;
  margin: 30px auto;
  font-size: 16px;
}
.my-zoneTree{
  border: 1px solid #eee;
  width: 550px;
  margin-left: 125px;
  padding-left: 25px;
  position: absolute;
  top:308px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 1000;
  background: #FFF;
}
.my-authorityTree{
  border: 1px solid #ccc;
  width: 420px;
  height: 550px;
  position: absolute;
  margin-left: 50px;
  bottom: 106px;
  z-index: 400;
  background: #FFF;
}
.authority-content{
  max-height: 500px;
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

</style>

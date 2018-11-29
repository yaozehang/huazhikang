<template>
  <!-- :style="{backgroundImage:'url('+bgImage+')'}" -->
  <div class="login-container" >
    <div class="login-content">
    <img class="logo" :src="'static/imgs/hzk-login.png'" alt="华职康健康科技"/>
    <!-- <h3 class="hello" :style="{backgroundImage:'url(static/imgs/Loginbottom.png)'}">欢迎光临职业健康系统</h3> -->
    <div class="login-bar" >
      <div class="other">
        <span class="forget-btn" @click="setPws">忘记密码</span>
      </div>
      <div class="form-content">
          <div class="input-group">
             <div class="group-content">
                <i class="icon icon-username" :style="{backgroundImage:'url(static/imgs/User.png)'}"></i>
                <input class="inner-input" v-model="userInfo.username" placeholder="请输入用户名" @blur="onBlur(0)">
              </div>
              <div class="tip-word" v-show="tipShow">{{nameTip}}</div>
              <div class="tip-word" v-show="!tipShow">&nbsp;</div>
          </div>
          <div class="input-group">
            <div class="group-content">
              <i class="icon icon-password" :style="{backgroundImage:'url(static/imgs/Cipher.png)'}"></i>
              <input class="inner-input" :type="typePws" placeholder="请输入密码" v-model="userInfo.password" @keyup.enter="_login" @blur="onBlur(1)">
              <i :class="typePws === 'text' ? 'text-icon' : 'pass-icon' " @click="changeNumType"></i>
              </div>
              <div class="tip-word" v-show="tipShow2" >{{pawTip}}</div>
              <div class="tip-word" v-show="!tipShow2">&nbsp;</div>
          </div>
          <div class="btn-login" :loading="loading" @click="_login"></div>
    </div>
    <!-- 忘记密码 -->
    <div class="forgetPws">
      <el-dialog  class="dialog-form" title="忘记密码"  center width="500px"  :visible.sync="pwsVisible" :modal-append-to-body="false" >
        <el-form :model="pwsForm" label-width="120px" ref="pwsForm"  class="pws-form" >
          <el-form-item label="用户名" >
            <el-input v-model="pwsForm.username" auto-complete="off" class="inner-input" ></el-input>
          </el-form-item>
           <el-form-item label="身份证号码" >
            <el-input v-model="pwsForm.idCard" auto-complete="off" class="inner-input" ></el-input>
          </el-form-item>
          <el-form-item label="新密码" >
            <el-input v-model="pwsForm.newPws" auto-complete="off" class="inner-input" ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" >
            <el-input v-model="pwsForm.comfirmPws" auto-complete="off" class="inner-input" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancleSet">取 消</el-button>
          <span class="add-comfirm">
           <el-button class="small-comfirm" @click="confirmSet" >确 定</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
    <!-- 忘记密码 -->
  </div>
  <footer>
      <!-- <p>版权所有 成都xxx网络科技股份有限公司 京ICP备10011965号-1 京公网安备110104762022005号</p> -->
  </footer>
  </div>
</div>
</template>

<script>
import {login} from 'api/login'
import qs from 'qs'
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      pwsForm:{
        username: '',
        idCard: '',
        newPws:'',
        comfirmPws: ''
      },
      loading: false,
      pwsVisible: false,
      tipShow2:false,
      tipShow:false,
      typePws: 'password',
      nameTip: '用户名不能为空',
      pawTip: '密码不能为空',
      bgImage: 'static/img/background-map.jpg',
      iconFlag: 'static/imgs/Close.png',
    }
  },
  created() {
    localStorage.clear()
    sessionStorage.clear()
  },
  methods: {
    _login() {
      if (this.userInfo.username === '' || this.userInfo.password === '') {
        // this.$message({type: 'warning', message: '用户名或密码不能为空'})
        this.tipShow = true
        this.tipShow2 = true
        return false
      }
      login(qs.stringify(this.userInfo)).then((res) => {
        if (res.status === 1) {
          sessionStorage.setItem('userInfo',encodeURIComponent(JSON.stringify(res.user)))
          sessionStorage.setItem('menu',encodeURIComponent(JSON.stringify(res.menuList)))
          localStorage.setItem('navMenu',JSON.stringify([]))
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.$router.push('/homePage')
        } else {
           this.tipShow = true
           this.tipShow2 = true
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      })
    },
    //测试登录
    login(){
       this.$router.push('/homePage')
    },
    setPws(){   //设置密码
      this.pwsVisible = true
    },
    confirmSet(){   //确认新密码

    },
    cancleSet(){
      this.pwsVisible = false
    },
    onBlur(type) {
      if (type === 0 && this.userInfo.username === '') {
        this.tipShow = true
        // this.$message({type: 'warning',message: '用户名不能为空' })
        return false
      }else{
        this.tipShow = false
      }
      if (type === 1 && this.userInfo.password === '') {
        this.tipShow2 = true
        // this.$message({type: 'warning',message: '密码不能为空'})
        return false
      }else{
        this.tipShow2 = false
      }
    },
    changeNumType(){   //切换明文还是省略号
      if( this.userInfo.password !== ''){
        if(this.typePws === 'text'){
          this.typePws = 'password'
        }else{
          this.typePws = 'text'
        }
        console.log(this.typePws)
      }
    }
  }
};
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.login-container
  height :100vh
  // background: #005989
  bg-image('~static/imgs/bg-login.png')
  background-size:cover
  .logo
    display:inline-block
    width:415px
    height:146px
    margin: 0 0 20px 115px
  .hello
    width:100%
    height:30px
    line-height:30px
    font-size:24px
    color:#fff
    position:fixed
    top:240px
    text-align:center
  .login-bar
    position: relative
    width:700px
    height: 300px
    padding: 20px 0
    box-sizing: border-box
    // pading:50px
    bg-image('~static/imgs/Loginbottom.png')
    // background-color:#5a99b7
    border-radius(10px)
    .input-group
      padding-left: 80px
      margin-bottom: 35px
      // border:1px solid #ccc
      border-radius(5px)
      box-sizing:border-box
      i.icon
        display:inline-block
        width:60px
        height:60px
        margin-right:-2px
        margin-left:-20px
        box-sizing:border-box
      .icon-username
        bg-image('~static/imgs/User.png')
      .icon-password
        bg-image('~static/imgs/Cipher.png')
      .inner-input
        width:310px
        height:60px
        line-height:60px
        vertical-align:top
        border:none
        border-left:1px solid $color-border
        outline:0
        font-size:16px
        text-indent:15px
        box-sizing:border-box
      .forgetBtn
        color:#666
        &:hover
          text-decoration:underline
          color:#4e99f3
    .btn-login
      bg-image('~static/imgs/login.png')
    .text-icon
      bg-image('~static/imgs/Open.png')
    .pass-icon
      bg-image('~static/imgs/Close.png')
  footer
    position:fixed
    bottom:0
    left:0
    width:100%
    padding-bottom:60px
    font-size:16px
    text-align:center
    p
      color:#fff
</style>
<style scoped>
.login-bar .el-input__inner{
  border:none;
}
.login-content{
/*   height: 600px;
  margin-top: 180px;
  position: relative; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.form-content{
  width: 520px;
  height: 220px;
  margin: 0 125px 0 55px;
  padding-top: 35px;
  background: #00326a;
  position: relative;
  border-radius: 10px;
}
.btn-login{
  width: 195px;
  height: 220px;
  position: absolute;
  top: 30px;
  left: 450px;
}
.btn-login:hover{
  cursor: pointer;
}
.other{
  width: 700px;
  margin:10px auto;
  height: 20px;
  line-height: 20px;
  color: #fff;
  text-align: right;
  padding-right: 10px;
  position: absolute;
  top: -40px;
}
.other:hover{
   cursor: pointer;
  color: #4e99f3;
}
.input-group .tip-word{
color:  #fff;
margin-top: 5px;
}
.form-content .input-group:nth-child(1){
  margin-bottom: 30px;
}
.group-content{
  height: 60px;
  line-height: 60px;
  position: relative;
}
.text-icon{
  height: 14px;
  width: 26px;
  display: inline-block;
  position: absolute;
  right: 100px;
  top: 30px;
  /* background-image: url('static/imgs/Open.png') */

}
.pass-icon{
  height: 14px;
  width: 26px;
  display: inline-block;
  position: absolute;
  right: 100px;
  top: 30px;
  /* background-image: url('static/imgs/Close.png') */
}
.pass-icon:hover,.text-icon:hover{
  cursor: pointer;
  color: black;
}
.forgetPws{
  z-index: 1005;
}
.inner-input{
  width: 220px;
}
</style>

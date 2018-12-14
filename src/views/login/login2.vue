<template>
  <div class="login-container" :style="{backgroundImage:'url('+bgImage+')'}">
    <img class="logo" :src="'static/img/login-logo.png'" height="100" width="475" alt="华职康健康科技"/>
    <!-- <h3 class="hello">欢迎光临职业健康系统</h3> -->
    <div class="login-bar">
        <div class="input-group">
            <i class="icon icon-username" :style="{backgroundImage:'url(static/img/people.png)'}"></i>
            <input class="inner-input" v-model="userInfo.username" placeholder="用户名" @blur="onBlur(0)">
        </div>
        <div class="input-group">
            <i class="icon icon-password" :style="{backgroundImage:'url(static/img/password.png)'}"></i>
            <input class="inner-input" type="password" placeholder="密码" v-model="userInfo.password" @keyup.enter="_login" @blur="onBlur(1)">
        </div>
        <div class="other">
          <a href="javascript:void(0)" class="forgetBtn">忘记密码?</a>
        </div>
         <!-- <el-button :loading="loading" class="login-btn" type="primary" @click="login">登录</el-button> -->
        <el-button :loading="loading" class="login-btn" type="primary" @click="_login">登录</el-button>
  </div>
  <footer>
      <!-- <p>版权所有 成都xxx网络科技股份有限公司 京ICP备10011965号-1 京公网安备110104762022005号</p> -->
  </footer>
</div>
</template>

<script>
import {login} from 'api/login'
import qs from 'qs'
// var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
//   if(reg.test(card) === false)
export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      },
      loading: false,
      bgImage: 'static/img/background-map.jpg'
    }
  },
  created() {
    localStorage.clear()
    sessionStorage.clear()
  },
  methods: {
    _login() {
      if (this.userInfo.username === '' || this.userInfo.password === '') {
        this.$message({
          type: 'warning',
          message: '用户名或密码不能为空'
        })
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
          this.$router.push('/board')
        } else {
          this.$message({
            type: 'warning',
            message: res.msg
          })
        }
      })
    },
    //测试登录
    login(){
       this.$router.push('/board')
    },
    onBlur(type) {
      if (type === 0 && this.userInfo.username === '') {
        this.$message({
          type: 'warning',
          message: '用户名不能为空'
        })
        return false
      }
      if (type === 1 && this.userInfo.password === '') {
        this.$message({
          type: 'warning',
          message: '密码不能为空'
        })
        return false
      }
    }
  }
};
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.login-container
  position:absolute
  top:50%
  left:50%
  transform:translate(-50%,-50%)
  background-size:cover
  .logo
    position:fixed
    top:140px
    left:50%
    display:inline-block
    width:475px
    height:100px
    margin-left: -237.5px
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
    position:fixed
    top:280px
    left:50%
    margin-left:-300px
    width:500px
    padding:50px
    background-color:#fff
    border-radius(10px)
    .input-group
      padding:10px 0px
      padding-left: 80px
      margin-bottom: 20px
      border:1px solid #ccc
      border-radius(5px)
      box-sizing:border-box
      i.icon
        display:inline-block
        width:40px
        height:40px
        padding:0 20px
        margin-right:15px
        margin-left:-60px
        box-sizing:border-box
      .icon-username
        bg-image('~static/img/people.png')
      .icon-password
        bg-image('~static/img/password.png')
      .inner-input
        width:418px
        height:40px
        line-height:40px
        vertical-align:top
        border:none
        border-left:1px solid $color-border
        outline:0
        font-size:16px
        text-indent:15px
        box-sizing:border-box
    .other
      padding:10px 0
      font-size:16px
      float:right
      .forgetBtn
        color:#666
        &:hover
          text-decoration:underline
          color:#4e99f3
    .login-btn
      height:40px
      width:100%
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
</style>

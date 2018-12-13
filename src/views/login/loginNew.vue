<template>
  <div class="login">
    <div class="login-logo"></div>
    <div class="login-box">
      <div class="login-container">
        <p class="box-title">登录</p>
        <div class="box-input">
          <el-input type="text" placeholder="请输入用户名" class="log-input" v-model="userInfo.username" @blur="onBlur(0)">
            <i slot="prefix" class="user-icon el-input__icon"></i>
            <i slot="suffix" class="el-icon-close el-input__icon" @click="clearText"></i>
          </el-input>
        </div>
        <div class="box-input">
          <el-input  placeholder="请输入密码" class="log-input" :type="typePws"  v-model="userInfo.password" @keyup.enter="_login" @blur="onBlur(1)">
            <i slot="prefix" class="pass-icon el-input__icon"></i>
            <i slot="suffix" class="el-icon-view el-input__icon" @click="changeNumType" ></i>
          </el-input>
        </div>
        <div class="box-hint clearfix">
          <div class="remember fll">
            <input type="checkbox" class="box-check fll">
            <span>记住密码</span>
          </div>
          <div class="forget flr" @click="setPws">忘记密码？</div>
        </div>
        <el-button type="primary" class="box-btn" :loading="loading" @click="_login">登录</el-button>
      </div>
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
           <el-button type="primary" @click="confirmSet" >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 忘记密码 -->
  </div>
</template>

<script>
import { login } from "api/login";
import qs from "qs";

export default {
  data() {
    return {
      userInfo: {
        username: "",
        password: ""
      },
      pwsForm: {
        username: "",
        idCard: "",
        newPws: "",
        comfirmPws: ""
      },
      loading: false,
      pwsVisible: false,
      tipShow2: false,
      tipShow: false,
      typePws: "password",
      nameTip: "用户名不能为空",
      pawTip: "密码不能为空",
      bgImage: "static/img/background-map.jpg",
      iconFlag: "static/imgs/Close.png"
    };
  },
  created() {
    localStorage.clear();
    sessionStorage.clear();
  },
  methods: {
    _login() {
      if (this.userInfo.username === "" || this.userInfo.password === "") {
        // this.$message({type: 'warning', message: '用户名或密码不能为空'})
        this.tipShow = true;
        this.tipShow2 = true;
        return false;
      }
      login(qs.stringify(this.userInfo)).then(res => {
        if (res.status === 1) {
          sessionStorage.setItem(
            "userInfo",
            encodeURIComponent(JSON.stringify(res.user))
          );
          sessionStorage.setItem(
            "menu",
            encodeURIComponent(JSON.stringify(res.menuList))
          );
          localStorage.setItem("navMenu", JSON.stringify([]));
          this.$message({
            type: "success",
            message: res.msg
          });
          this.$router.push("/homePage");
        } else {
          this.tipShow = true;
          this.tipShow2 = true;
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      });
    },
    //测试登录
    login() {
      this.$router.push("/homePage");
    },
    setPws() {
      //设置密码
      this.pwsVisible = true;
    },
    confirmSet() {
      //确认新密码
    },
    cancleSet() {
      this.pwsVisible = false;
    },
    onBlur(type) {
      if (type === 0 && this.userInfo.username === "") {
        this.tipShow = true;
        this.$message({type: 'warning',message: '用户名不能为空' })
        return false;
      } else {
        this.tipShow = false;
      }
      if (type === 1 && this.userInfo.password === "") {
        this.tipShow2 = true;
        this.$message({type: 'warning',message: '密码不能为空'})
        return false;
      } else {
        this.tipShow2 = false;
      }
    },
    changeNumType() {
      //切换明文还是省略号
      if (this.userInfo.password !== "") {
        if (this.typePws === "text") {
          this.typePws = "password";
        } else {
          this.typePws = "text";
        }
        console.log(this.typePws);
      }
    },
    clearText() {
      this.userInfo.username = ""
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  background: url(~/static/img/login.png) no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: relative;
}
.login-logo {
  width: 600px;
  height: 500px;
  background: url(~/static/img/logo.png) no-repeat center;
  background-size: contain;
  position: absolute;
  top: 15%;
  left: 10%;
}
.login-box {
  background: url(~/static/img/login-box.png) no-repeat center;
  background-size: contain;
  position: absolute;
  width: 450px;
  height: 450px;
  top: 18%;
  left: 60%;
}
.login-container {
  width: 400px;
  height: 400px;
  margin-top: 50px;
  margin-left: 20px;
  padding: 0 30px;
  box-sizing: border-box;
}
.box-title {
  text-align: center;
  color: #fff;
  font-size: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid #999;
  margin-bottom: 30px;
}
.user-icon {
  position: absolute;
  top: -1px;
  left: -5px;
  display: inline-block;
  width: 50px;
  height: 51px;
  background: url(~/static/img/username.png) no-repeat;
  background-size: contain;
}
.pass-icon {
  position: absolute;
  top: 0;
  left: -5px;
  display: inline-block;
  width: 50px;
  height: 51px;
  background: url(~/static/img/pass.png) no-repeat;
  background-size: contain;
}
.log-input {
  position: relative;
  margin-bottom: 20px;
}
/deep/ {
  .el-input__inner {
    height: 50px;
    padding-left: 55px;
  }
}
.box-check {
  height: 25px;
  width: 25px;
  margin: 0;
}
.box-hint {
  color: #fff;
  margin-bottom: 45px;
}

.remember span {
  margin-left: 5px;
}

.forget{
  cursor: pointer;
}

.box-btn {
  width: 100%;
}

.forgetPws{
  z-index: 1005;
}

.fll {
  float: left;
}

.flr {
  float: right;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
<template>
    <div class="app-head clearfix" >
      <div class="logo" :style="{height:'60px'}"><img :src="'static/img/logo.png'"></div>
        <div class="home-btn" @click="goHome"><img src="static/img/home.png" alt=""></div>
        <div class="submenu">
          <ul class="menulist clearfix">
            <!-- curIdex === index ? my-active ? 'common-link' query:{menuId:item.id,name:item.name}-->
           <router-link tag="li" class="" v-for="(item, index) in List" :key="item.id" 
           :to="{path:item.path,query:{menuId:item.id,name:item.name}}" track-by="index">
              <span class="title-menu">  {{item.name}}</span>
              <i class="el-icon-close" @click="removeTab(index,List)"></i>
              </router-link>
        </ul>
        </div>
        <ul class="head-btn-list clearfix">
           <li class="ac-person-item">
              <div class="ac-person">
                <img src="static/img/person.png" alt="">
              </div>
            </li>
              <li class="ac">
                <div class="account-man">
                    <span class="my-username"><s class="icon-h1"></s>{{username}}<u></u></span>
                    <div class="account-list">
                        <p @click="editPassword()">修改密码</p>
                        <p @click="_logOut()">注销登录</p>
                    </div>
                </div>
            </li>
            <li>
              <div class="loggingStatus">
                <span>已登录</span>
              </div>
            </li>
        </ul>
    <!-- 修改密码弹出框 editPsw-->
<!--         <div class="dialog-form" :visible.sync="editPsw">
         <el-dialog  class="dialog-form" title="修改密码" width="30%"  :visible.sync="editPsw">
            <el-form :model="PWSForm" label-width="150px" ref="PWSForm" style="width: 80%;">
              <el-form-item label="原始密码" class="dialog-item"  >
                <el-input v-model="PWSForm.originalPws" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" >
                 <el-input v-model="PWSForm.newPws" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" class="dialog-item"  >
                <el-input v-model="PWSForm.endPws" auto-complete="off" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="editPWS(pwsForm)">确 定</el-button>
              <el-button @click="cancleEdit(pwsForm)">取 消</el-button>
            </div>
          </el-dialog>
        </div> -->
 <!-- 修改密码弹出框 -->
    </div>
</template>

<script>
import Event from '@/common/js/event.js'
import getUserInfo from 'common/js/user'
import {loginOut} from 'api/login.js'
import qs from 'qs'
export default{
  props: {
    List: Array
  },
  data() {
    return {
      s: {
       height: '60px'
      },
      PWSForm: {
        originalPws: '',
        newPws: '',
        endPws: ''
      },
      myRoute: '',
      notHome: true,
      editPsw: false,
      menuId: '',
      menuName: this.$route.query.name,
      tabIndex: 2,
      curIdex: -1,
    }
  },
  created() {
    this.username = getUserInfo().username
  },
  mounted() {
    var _this = this
    },
    methods: { 
      changePage(item,index){
        this.$emit('changePage',item)
        this.curIdex = index 
        // this.$router.push({path:item.path}) 
      },
      addTab(targetName) {
      },
      removeTab(index,List) {
        this.$emit('removeTab',index,List)
        this.curIdex = index
      },
      goHome() {
        this.$router.push({path:'/board'})
      },
      _logOut(){
        let data = {
          username: getUserInfo().username,
          userId: getUserInfo().userId,
          comPId: getUserInfo().comPId,
        }
         loginOut(qs.stringify(data)).then((res) =>{
          console.log(res)
          if(res === '注销成功'){
            sessionStorage.removeItem('userInfo.username')
            sessionStorage.setItem('navMenu', JSON.stringify([]))
           this.$router.push({path:'/login'})
          }
         })
      },
      editPassword() {
        this.editPsw = !this.editPsw
      },
      editPWS(PWSForm) {
        // sessionStorage.getItem('userInfo.username')
        // sessionStorage.getItem('userInfo.password')
        this.editPsw = !this.editPsw
      },
      cancleEdit(PWSForm) {
        this.editPsw = !this.editPsw
      },
      viewRoute(){
        if(this.$route.fullPath === '/board' || this.$route.fullPath === '/login') {
          this.notHome = false
        }
      }
    }
  };
</script>

<style lang="css" scoped>
.app-head {
  background: #252424;
  overflow: visible;
   color: #fff;
   position:fixed;
   left: 0;
   top:0;
   width:100%;
   z-index: 1000
 }
.logo {width: 220px; height: 60px;float: left;background-color: #20222A;}
.logo img {
margin-top: 10px;
margin-left: 10px;}
.home-btn{  width: 30px; height: 30px;float: left;margin-left: 58px;margin-right: 5px;}
.home-btn img {margin-top: 20px; width: 20px;height: 20px;}
.head-btn-list {float: right; color: #fff;overflow: hidden; width: 250px; height: 60px;}
.head-btn-list li {float: left;margin-right: 30px;white-space: nowrap;color: #fff;line-height: 60px;cursor: pointer;}
.head-btn-list li:first-child{ margin-right: 0px!important; }
.head-btn-list li:last-child{float: right;}
.head-btn-list li:last-child:hover{text-decoration: underline;}
.head-btn-list li a {float: left;line-height: 24px;color: #666;}
.head-btn-list li s {float: left;width: 16px;height: 16px;background: url('') no-repeat;margin: 4px 8px 0 0;}
.head-btn-list li .icon-h1 {background-position: 0 -14px;}
.head-btn-list li .icon-h2 {background-position: -16px -14px;}
.head-btn-list li .icon-h3 {background-position: -32px -14px;}
.head-btn-list li a.user-name {color: #388dca;}
.head-btn-list li a.user-name s {background-position: -22px 0;}
.head-btn-list li a.user-logout {color: #333;}
.head-btn-list li a.user-logout s {background-position: 0 0;}
.us-title {font-size: 14px;float: left;line-height: 24px;color: #2e92db;height: 24px;}
.user-select {float: left;line-height: 24px;color: #333;height: 24px;}
.user-select .el-select {margin-left: 5px;}
.user-select .el-input__inner {border: 0 none;border-radius: 0;background: none;height: 24px;padding-right: 20px;padding-left: 5px;color: #666;line-height: 24px;padding: 0;text-align: center;padding-right: 14px;border-bottom: 1px solid #aaa;}
.user-select .el-input__icon {width: 20px;}

.user-select .el-select .el-input .el-input__icon {color: #44a8f0;}
.ac {width: 100px;line-height: 24px;text-align: center;}
.account-man {position: absolute;z-index: 1000;color: #fff;width: 100px;}
.account-man span {cursor: pointer;}
.account-man .my-username{
  width: 100px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.account-man .account-list {display: none;background-color: #e4e8f1;padding: 6px 0;width: 86px;border:1px solid #d1dbe5;box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);border-radius: 2px;margin-top:5px;}
.account-list p {cursor: pointer;line-height: 36px;padding:0 5px; color: black;}
.account-man:hover .account-list {display: block;}
.account-man:hover {}
.account-man:hover .account-list p:hover {background-color: #e4e8f1;}
.account-man span u{display: inline-block;border:6px solid transparent;border-bottom: 0 none;border-top: 7px solid #44a8f0;border-radius: 2px;transition:.3s;vertical-align: middle;margin-top:-2px;}
.account-man:hover span u{transform:translateY(-50%) rotateZ(180deg);transition:.3s;-ms-transform:translateY(-50%) rotateZ(180deg);margin-top:7px;}
.ac-person-item{ 
  width: 30px!important;
 /*margin-right: -20px;*/
}
.ac-person{padding-top: 10px;}
.tabMenu{
  float: left;
text-align: center;
line-height: 60px;
width: 60px;
height: 60px;
/*background: #fff;*/
}
.submenu{
float: left;
text-align: center;
line-height: 60px;
height: 60px;
font-size: 14px;
margin-left: 5px;
}
.menulist li{
float: left;
text-align: center;
line-height: 60px;
height: 60px;
font-size: 14px;
padding: 0 10px;
color: rgba(255,255,255,.7);
}
.menulist .title-menu{
  line-height: 60px;
  height: 60px;
}
.subItem{
background: #000;
}
.menulist li:hover{
  cursor: pointer;
  color: #fff;
}
.menulist li.common-link{
background: #1f7add;
}
.menulist li.active{
   background: #000;
}
.menulist li.my-active{
  /*background: #fff;*/
}
.menulist{
  height: 60px;
}
@media screen and (max-width: 1657px) {
  .menulist{
  width: 780px;
  overflow: hidden;
}
}
@media screen and (max-width: 1595px) {
  .menulist{
  width: 780px;
  overflow: hidden;
}
}
@media screen and (max-width: 1363px) {
  .menulist{
  width: 686px;
  overflow: hidden;
}
}
@media screen and (max-width: 1280px) {
  .menulist{
  width: 640px;
  overflow: hidden;
}
}
@media screen and (max-width: 1222px) {
  .menulist{
  width: 480px;
  overflow: hidden;
}
}
</style>
<style>
  .menulist .router-link-active{
  background: #111;
  color: #fff;
}
.menulist .router-link-active .title-menu{
  background: #111;
  color: #fff;
}
</style>
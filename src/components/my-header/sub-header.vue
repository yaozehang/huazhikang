<template>
    <div class="app-head home-header clearfix" >
      <div class="logo" :style="{height:'60px'}"><img :src="'static/img/logo.png'"></div>
         <div class="news-set">
         <p class="set-news" @click="downloadeApp">下载App</p>
        </div>
        <div class="news-set" v-if="roleId === 3">
         <p class="set-news" @click="shoeNews">设置消息</p>
        </div>
        <div class="news-set" v-if="roleId === 2">
          <!-- /board -->
         <p class="set-news" @click="showBoard">数据看板</p>
        </div>
        <div class="submenu" >
          <slot name="subItem" class="" v-if="notHome"> 
              <div class="subItem"  v-if="notHome"> </div>
              <el-tag type="info" class="subItem" > </el-tag>
          </slot>
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
            <!-- app下载弹出框 -->
        <div class="dialog-form" >
         <el-dialog  title="App二维码" width="400px"  :visible.sync="appCode" :modal-append-to-body="false">
            <!-- <div class="app-code">  <img src="http://120.78.185.196:8080/APPFile/DownAPPCode.jpg" alt="">  </div> -->
            <div class="app-code">  <img :src="appSrc" alt="">  </div>
          </el-dialog>
        </div>
 <!-- 下载app弹出框 -->
          <!-- 设置消息弹出框 -->
        <div class="news-form" >
         <el-dialog  title="设置消息" width="800px"  :visible.sync="isSetNews" :modal-append-to-body="false">
            <el-form :model="news" label-width="80px" ref="news" style="width: 100%;" >
              <el-form-item label="选择分区"  >
                <el-input v-model="news.zone" auto-complete="off" id="depart" @focus="showTree"></el-input>
              </el-form-item>
              <el-form-item label="消息内容" >
                 <el-input v-model="news.content"  type="textarea" auto-complete="off"></el-input>
              </el-form-item>
                <!-- 分区树状图  -->
             <div class="my-Tree" v-show="isSelectcompany">
              <el-tree :data="companyData"   show-checkbox node-key="id" default-expand-all ref="tree" highlight-current
               :props="defaultProps" check-strictly  class="tree1">
            </el-tree>
            <div class="buttons">
              <el-button type="primary" @click="onConfirmPart">确认</el-button>
              <el-button @click="resetChecked">清空</el-button>
            </div>
          </div>
    <!-- 单位树状图 -->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="sureSet()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
 <!-- 设置消息弹出框 -->
    <!-- 修改密码弹出框 -->
        <div class="dialog-form" >
         <el-dialog  title="修改密码" width="400px"  :visible.sync="editPsw" :modal-append-to-body="false">
            <el-form :model="PWSForm" label-width="150px" ref="PWSForm" style="width: 80%;">
              <el-form-item label="原始密码"  >
                <el-input v-model="PWSForm.originalPws" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" >
                 <el-input v-model="PWSForm.newPws" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码"  >
                <el-input v-model="PWSForm.endPws" auto-complete="off" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="editPWS(PWSForm)">确 定</el-button>
              <el-button @click="cancleEdit(PWSForm)">取 消</el-button>
            </div>
          </el-dialog>
        </div>
 <!-- 修改密码弹出框 -->
    </div>
</template>

<script>
import Event from '@/common/js/event.js'
import getUserInfo from 'common/js/user'
import {getSuperZone} from 'api/zone'
import {loginOut} from 'api/login.js'
import qs from 'qs'
import {myurl} from '@/api/config.js'
export default{
  props: {
    // tabShow: Boolean
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
      news: {
        zone: '',
        content: '',
        zoneKey: []
      },
      myRoute: '',
      notHome: true,
      editPsw: false,
      isSelectcompany: false,
      appCode: false,
      isSetNews: false,
      roleId: getUserInfo().roleId,
      companyData: [],
      appUrl: '',
      appSrc: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  created() {
    this.username = getUserInfo().username
    this.appUrl = `${myurl}/APPFile\DownAPPCode.jpg`
  },
  mounted() {
    this.getZone()
    var _this = this
    Event.$emit('changeHeight', parseInt(_this.s.height, 10) + 1)
    Event.$emit('changeContentHeight', parseInt(_this.s.height, 10) + 1)
    window.onresize = function() {
        Event.$emit('changeHeight', parseInt(_this.s.height, 10) + 1)
        Event.$emit('changeContentHeight', parseInt(_this.s.height, 10) + 1)
      }
    },
    methods: {
      goHome() {
        this.$router.push({path:'/homePage'})
      },
      showBoard(){
        this.$router.push({path:'/board'})
      },
      downloadeApp(){   //下载APP
        this.appCode = true
        this.appSrc = `${myurl}/APPFile/DownAPPCode.jpg`
      },
      _logOut() {
        let data = {
          username: getUserInfo().username,
          userId: getUserInfo().userId,
          comPId: getUserInfo().comPId,
        }
        loginOut(qs.stringify(data)).then((res) => {
          console.log(res)
          if(res === '注销成功'){
            sessionStorage.removeItem('userInfo.username')
            sessionStorage.setItem('navMenu', JSON.stringify([]))
            this.$router.push({path:'/login'})
          }
        })
      },
      hideTree(e){
        if (e.target.id === '') {
          this.isSelectcompany = false
        }
      },
      shoeNews() {
        this.isSetNews = true
      },
      showTree(){
        this.isSelectcompany = true
      },
      getZone() {
        getSuperZone().then((res) => {
          if(res.length !== 0){
            this.companyData = [res]
          }
          })
        },
      onConfirmPart() {
        let temp = this.$refs.tree.getCheckedNodes()
        this.news.zone = this._filterTreeStr(temp)    
        //选中的id
        this.news.zoneKey = JSON.stringify(this.$refs.tree.getCheckedKeys())
        this.isSelectcompany = false
      },
      _filterTreeStr(data) {
        let ret = []
        data.forEach((item, idx) => {
          ret.push(item.label)
        })
        return ret.join('')
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([])
        this.news.zone = ''
      },
      sureSet(){
        let data ={
          comId: this.news.zoneKey,
          message: this.news.content
        }
        this.axios.post('/web/switch/addMessage.do', qs.stringify(data)).then((res) => {
          if (res.data === '添加成功' || res.data === '添加/修改成功') {
            this.$message({
              type: 'success',
              message:  '添加成功'
            })
          } else{
            this.$message({
              type: 'error',
              message: res.data
            })
          }
      })
      },
      editPassword() {
        this.editPsw = !this.editPsw
      },
      editPWS(PWSForm) {
        // localStorage.getItem('userInfo.username')
        // localStorage.getItem('userInfo.password')
        this.editPsw = !this.editPsw
      },
      cancleEdit(PWSForm) {
        this.editPsw = !this.editPsw
      },
      viewRoute(){
        if(this.$route.fullPath === '/homePage' || this.$route.fullPath === '/login') {
          this.notHome = false
        }
      }
    }
  };
</script>

<style lang="css" scoped>
.news-set{
  width: 70px;
  height: 60px;
  line-height: 60px;
  margin-left: 18px;
  font-size: 16px;
  float: left;
}
.set-news{
  color: #FFF;
}
.set-news:hover{
cursor: pointer;
}
.my-Tree{
  border: 1px solid #eee;
  width: 420px;
  position: absolute;
  left:100px;
  top:125px;
  max-height: 810px;
  overflow-y:auto;
  z-index: 300;
  background: #FFF;
}
.news-form{
/*z-index: 3000;*/
}
.home-header{

}
.app-head {
  background: #20222A;
  /* border-bottom: 1px solid #b5c2ca; */
  overflow: visible;
   color: #fff;
   position:fixed;
   left: 0;
   top:0;
   width:100%;
   z-index: 1000;
    font-size: 16px;
 }
.logo {width: 220px; height: 60px;float: left;background-color: #20222A;}
.logo img {
margin-top: 0px;
 width: 100%;
height: 100%;}
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
.account-man {position: absolute;color: #fff;width: 100px;}
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
background: #fff;
}
.submenu{
float: left;
margin-left: 5px;
text-align: center;
line-height: 60px;
height: 60px;
font-size: 16px;
padding: 0 20px;
}
.subItem{
margin-left: 5px;
text-align: center;
line-height: 60px;
height: 60px;
font-size: 16px;
padding: 0 20px;
background: #fff;
color: rgb(102,102,102);
}
.app-code{
  width: 350px;
  margin: 0 auto;
}
.app-code img{
  width: 100%;
  height: 100%;
}
</style>
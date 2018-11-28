<template>
  <div class="home-container">
    <div class="home-content">
      <div class="header-home">
       <sub-header>
       <div slot="subItem" >
           {{tab}}
         </div>
       </sub-header>
      </div>
      <div class="menu-container" :style="{backgroundImage:'url(static/img/home-bg.png)'}">
        <div class="menu-content">
          <home-menu :menuList="menuList"></home-menu>
         </div>
      </div>
  <!--   <div class="my-notification" v-if="roleId !==3">
    <div class="my-warning healthWarning" v-show="healthShow">
      <h5 class="warm-title clearfix">职工健康预警提醒 <span class="del" @click="coloseHealth()"><i class="el-icon-close"></i></span></h5>
      <div class="waring-content">
        <span class="waring-name"> {{testZone}} 公司有<span class="health-num">{{testNum}}</span>人未安排体检</span> 
        <span class="link-btn" @click="goPersonDetail"> 点击查看</span>
      </div>
    </div>
    <div class="my-warning protective-tip" v-show="false">
      <h5 class="warm-title clearfix">护具失效提醒 <span class="del" @click="coloseProtect()"><i class="el-icon-close"></i></span></h5>
      <div class="waring-content">
        <span class="waring-name">共有<span class="warm-num">2</span>件护具即将失效</span>
         <span class="link-btn" @click=""> 点击查看</span>
      </div>
      <div class="waring-content">
        <span class="waring-name">有 <span class="warm-num">2</span>件护具库存小于20%</span>
         <span class="link-btn" @click=""> 点击查看</span>
      </div>
    </div>
    </div> -->
  </div>
  </div>
</template>

<script>
import HomeMenu from '@/components/nav-menu/HomeMenu.vue'
import SubHeader from '@/components/my-header/sub-header.vue'
import getUserInfo from 'common/js/user'
import {getSwitch} from 'api/position'
import qs from 'qs'
export default {
  data () {
    return {
      tab: '',
      menuList: [],
      healthShow: true,
      protectiveShow: false,
      userId: this.$route.query.userId,
      testNum: 20,
      testZone: '华大健康',
      roleId: getUserInfo().roleId
    }
  },
  created() {
    this._getMenuList()
    this.getRemindNum()
    console.log(getUserInfo())
  },
  mounted(){
    this._getSwitch()
  },
  methods: {
   _getSwitch(){   //获取健康提醒的开关
      let data ={
        comId: getUserInfo().comPId,
        type: 2
      }
      getSwitch(qs.stringify(data)).then((res) => {
        if(res === 1) {
          this.getRemindNum()
        }else if(res === 0) {
          this.healthShow = false
        }
      })
    },
    _getMenuList() {
      let ret = []
      let list = JSON.parse(decodeURIComponent(sessionStorage.getItem('menu')))
      list.forEach((item, idx) => {
        ret.push({
          id: item.menuid,
          name: item.menuname,
          logo: item.image,
          path: item.url
        })
      })
      this.menuList = ret
      // console.log(ret[0])
    },
    getRemindNum(){
      let data ={
        comId: getUserInfo().comPId
      }
      this.axios.post('/web/warn/warnMessgage.do', qs.stringify(data))
      .then((res) => {
        if(res.data){
          this.testZone = res.data.patitionName
          this.testNum = res.data.warnNumber
        }
      })
    },
    goPersonDetail(){
      this.$router.push({path:'/wrap/remind'})
    },
    coloseProtect(){
      this.protectiveShow = !this.protectiveShow
    },
    coloseHealth(){
      this.healthShow = !this.healthShow
    },
  },
  components: {
    HomeMenu,
    SubHeader
  }
};
</script>

<style lang="css" scoped>
.header-home{
  height: 60px;
}
.home-container{
background-size: 100% 100%;
}
.home-content{
   height: 100%;
   /* background: url('../../static/img/home-bg.png') */
}
.menu-container{
  width: 1920px;
  height: 1010px;
  background-size: 100% 100%;
}
.menu-content{
  width: 1080px;
  height: 1010px;
  position: fixed;
  top: 208px;
  /* left: 485px; */
  left: 25%;
}
.my-notification{
  width: 400px;
  height: 100px;
  position: fixed;
  bottom: 30px;
  right: 60px;
  color: #fff;
}
.my-warning{
  width: 400px;
  height: auto;
 border: 1px solid #ec1c24;
 margin-bottom: 20px;
 box-sizing: border-box;
}
.healthWarning{
 position: fixed;
 /*bottom: 150px;*/
 bottom: 30px;
 right: 60px;
}
.protective-tip{
position: fixed;
 bottom: 0;
 right: 60px;
}
.healthWarning .warm-title{
background: #ed1d25;
}
.protective-tip .warm-title{
background: #f27b02;
}
.my-warning .warm-title{
width: 400px;
height: 50px;
line-height: 50px;
color: #fff;
font-size: 18px;
text-indent: 10px;
}
.my-warning .waring-content{
  width: 400px;
  height: 20px;
  line-height: 20px;
  margin: 10px 0;
  text-indent: 10px;
  box-sizing: border-box;
}
.my-warning .waring-content .link-btn{
 display: inline-block;
 float: right;
 text-decoration: underline;
 margin-left: 30px;
 margin-right: 10px;
}
.link-btn:hover{
  cursor: pointer;
}
.del{
  position: fixed;
 right: 80px;
}
.health-num{
  color: #ed1d25;
  font-weight: bolder;
}
.warm-num{
  color: #f27b02;
}
</style>

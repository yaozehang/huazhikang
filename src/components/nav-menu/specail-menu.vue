<template>
  <!-- 手写菜单 -->
  <div class="side-menu-container">
    <transition name="el-zoom-in-top">
      <div class="menu-list-container">
        <ul class="main-menu">
           <router-link tag="li" class="menu-list" v-for="(menuItem,menuIdx) in slidList" :key="menuIdx" :to="{path:menuItem.path,query: {menuId: menuItem.id,name:menuItem.name}}" :data-menu-id="menuItem.id" track-by="menuIdx">
            <span class="title" :data-menu-id="menuItem.id" v-if="menuItem.id !== 51">{{menuItem.name}} </span>
            <span class="title" v-if="menuItem.id === 51">
              <span class="title" size="small" :data-menu-id="51" v-if="num === 0 ">隐患排查</span>
              <el-badge :value="num"  class="item"v-if="num !==0" >
              <span class="title" size="small" :data-menu-id="51">隐患排查</span>
            </el-badge>
            </span>
          </router-link>
        </ul>
      </div>
    </transition>
  </div>

</template>

<script>
import getUserInfo from 'common/js/user'
import {getAllDangerNum} from 'api/poling'
import qs from 'qs'
export default {
  props: {
    slidList: Array
  },
  data() {
    return {
      currentIndex: 0,
      isCollapse: true,
      showSub: false,
      num: 0,
    }
  },
  mounted() {
    this.getNum()
  },
  // /wrap/project/editPJ
  methods: {
    showHide: function(idx) {
      this.showSub = !this.showSub
      this.currentIndex = idx
    },
    getNum(){
      getAllDangerNum().then((res) => {
        this.num = res
        console.log(res)   //未完成逾期
      })
    },
  }
};
</script>

<style lang="css" scoped>
/*.side-menu-container{width: 100%;height: 100%;  border-right: 1px solid rbg(204,204,204);}

/*手写样式i*/
.side-menu-container{
  width: 220px;
  height: 100vh;
  background-size: 100% 100%;
  background: #20222A;
} 
.menu-list-container{
    background: #20222A;
}
.menu-list-container ul{
  background: #20222A;
}
.menu-list-container ul li{
  height: 52px;
  line-height: 52px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  color: rgba(255,255,255,.7);
}
.main-menu li{
  height: 40px;
  line-height: 40px;
  padding-left: 45px;
  padding-right: 30px;
}
.main-menu li:hover {
  background-color: #111;
}
.router-link-active,.router-link-exact-active{
   color: #fff;
   background-color: #111;
}
.menu-list-container ul li.active{
    color: #fff;
}
.router-link-active .title,.router-link-exact-active .title{
color: #fff;
}
.menu-list-container ul li:hover{
  color: #fff;
/*   background: -webkit-linear-gradient(#009efa, #004c9c); 
  background: -o-linear-gradient(#009efa, #004c9c); 
  background: -moz-linear-gradient(#009efa, #004c9c); 
  background: linear-gradient(#009efa, #004c9c); */ 
}
</style>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

  // .menu-list-container ul li.active
  //   bg-image('~static/imgs/Select.png')
  // .router-link-active,.router-link-exact-active
  //   bg-image('~static/imgs/Select.png')
  // .menu-list-container ul li:hover
  //   bg-image('~static/imgs/Select.png')
  </style>


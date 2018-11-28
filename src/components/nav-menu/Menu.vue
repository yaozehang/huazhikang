<template>
  <div class="menu-container">
  <div class="menu-list-container">
  <ul class="nav-menu-container">
      <router-link tag="li" class="menu-level-1" v-for="(level1,level1Idx) in slidList" :key="level1Idx" :to="{path:level1.menupath,
    query: {menuId: level1.menuid,name:level1.menuname}}" v-bind:class="level1Idx===currentIndex1?'active':''">
          <!-- <img :src="menuIcon(level1.icon)" alt="菜单图标" class="menu-icon"> -->
          <span class="title" @click="showHide1(level1Idx,level1)">{{level1.menuname}} 
            <i v-if="level1.children?true:false" class="arrow " :class="level1Idx===currentIndex1?'el-icon-arrow-down':'el-icon-arrow-right'"></i></span>
          <el-collapse-transition class="my-collapse">
            <ul class="menu-level-2" v-if="level1.children?true:false" v-show="level1Idx===currentIndex1">
               <router-link class="menu-level-2-list" tag="li" v-for="(level2,level2Idx) in level1.children" :key="level2Idx" :to="{path:level2.menupath,query: {menuId: level2.menuid,name:level2.menuname}}" >
                <div class="sub-title"><i class="circle"></i><span class="text">{{level2.menuname}}</span><i v-if="level2.children?true:false" class="arrow " ></i></div>
               </router-link>
            </ul>
         </el-collapse-transition>
      </router-link>
   </ul>
  </div>
</div>
</template>

<script>

export default {
  props: {
    slidList: Array,
    roleType: String
  },
  data () {
    return {
      currentIndex1: -1
    }
  },
  mounted() {
  },
  watch: {
    'currentIndex1'() {
      this.currentIndex1 = this.currentIndex1
    },
    '$route'() {
      this.currentPath = this.$route.path
    }
  },
  methods: {
    showHide1: function(idx,data) {
      if (idx === this.currentIndex1) {
        this.currentIndex1 = -1
      } else {
        this.currentIndex1 = idx
      }
      this.$emit('showHide1', data)
    }
  }
};
</script>

<style lang="css" scoped >
.menu-container{
  width: 220px;
  height: 100vh;
}
.menu-list-container{
  background: #20222A;
}
.menu-list-container ul{
  background: #20222A;
}
.menu-level-1{
    min-height:70px;
    position:relative;
    cursor:pointer;
    background: #20222A;
    text-align: center;
  }
  .menu-icon{
   position:absolute;
    top:0;
    left:40px;
    display:inline-block;
    width:30px;
    height:30px;
    padding-top:20px;
  }
  .title{
  display:inline-block;
  width:100%;
  height:70px;
  line-height:70px;
  text-align: center;
  font-size:14px;
   /* color: rgb(102,102,102); */
   color: rgba(255,255,255,.7);
  vertical-align:middle;
    }
  .menu-level-1 i.arrow{
    position:absolute;
    top:29px;
    right:20px;
    color: ;
    font-size:8px;
  }
  .my-collapse{
    margin-left: 0!important;
  }
 .menu-level-1.active{
/*   background: #4d9bf3;
   color: rgb(204,204,204); */
  color: #fff;
  background: #111;;
  /* background: -webkit-linear-gradient(#009efa, #004c9c); Safari 5.1 - 6.0 */
  /* background: -o-linear-gradient(#009efa, #004c9c); Opera 11.1 - 12.0 */
  /* background: -moz-linear-gradient(#009efa, #004c9c); Firefox 3.6 - 15 */
  /* background: linear-gradient(#009efa, #004c9c); 标准的语法 */
  }
  .menu-level-1.active .text{
    color: rgba(255,255,255,.7);
  }
   .menu-level-1.active .title,.menu-level-1 .title:hover{
  color: #fff;
  background: #111;
  /* background: -webkit-linear-gradient(#009efa, #004c9c); /* Safari 5.1 - 6.0 */
  /* background: -o-linear-gradient(#009efa, #004c9c); Opera 11.1 - 12.0 */
  /* background: -moz-linear-gradient(#009efa, #004c9c); Firefox 3.6 - 15 */
  /* background: linear-gradient(#009efa, #004c9c); 标准的语法 */ 
  }
  .menu-level-2-list{
  min-height:40px;
  line-height:40px;
  width:100%;
  font-size:16px;
  position:relative;
  text-align: center;
  }
  .menu-level-2-list.active{
  color: #fff;
  background: #111;
  /* background: -webkit-linear-gradient(#009efa, #004c9c); Safari 5.1 - 6.0 */
  /* background: -o-linear-gradient(#009efa, #004c9c); Opera 11.1 - 12.0 */
  /* background: -moz-linear-gradient(#009efa, #004c9c); Firefox 3.6 - 15 */
  /* background: linear-gradient(#009efa, #004c9c); 标准的语法 */
  }
.menu-level-2-list.active .circle{
  color: #e7ffff;
  }
.menu-level-2-list.active .arrow{
  color: #e7ffff;
  }
  .menu-level-2-list .sub-title{
  position:relative;
  display:inline-block;
  width:100%;
  text-align: center;
  margin-left: -80px;
    }
 .menu-level-2-list .sub-title .arrow{
   position:absolute;
    top:13px;
     }
 .menu-level-2-list .sub-title .circle{
 margin-left:90px;
margin-right:10px;
 }
 .menu-level-1.router-link-exact-active,.menu-level-2-list:hover,.menu-level-1:hover,.menu-level-2-list .text:hover{
  color: #fff;
  background: #111;
  /* background: -webkit-linear-gradient(#009efa, #004c9c); Safari 5.1 - 6.0 */
  /* background: -o-linear-gradient(#009efa, #004c9c); Opera 11.1 - 12.0 */
  /* background: -moz-linear-gradient(#009efa, #004c9c); Firefox 3.6 - 15 */
  /* background: linear-gradient(#009efa, #004c9c); 标准的语法 */
 }
 .menu-level-2-list.router-link-exact-active {
  color: #fff;
  background: #111;
  /* background: -webkit-linear-gradient(#009efa, #004c9c); Safari 5.1 - 6.0 */
  /* background: -o-linear-gradient(#009efa, #004c9c); Opera 11.1 - 12.0 */
  /* background: -moz-linear-gradient(#009efa, #004c9c); Firefox 3.6 - 15 */
  /* background: linear-gradient(#009efa, #004c9c);  */
 }
</style>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

  .mmmm
    bg-image('~static/imgs/Select.png')
  </style>
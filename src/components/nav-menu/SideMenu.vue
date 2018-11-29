<template>
  <!-- 手写菜单 -->
  <div class="side-menu-container">
    <div name="el-zoom-in-top">
      <div class="menu-list-container">
        <ul class="main-menu">
           <router-link tag="li" :class="menuIdx === curIndex ? 'menu-list' : '' "  v-for="(menuItem,menuIdx) in slidList" :key="menuIdx" :to="{path:menuItem.path,query: {menuId: menuItem.id,name:menuItem.name}}" :data-menu-id="menuItem.id"  track-by="menuIdx">
            <span class="title">{{menuItem.name}} </span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    slidList: Array
  },
  data() {
    return {
      curIndex: 0,
      isCollapse: true,
      showSub: false
    }
  },
  mounted() {
  },
  methods: {
    showHide: function(idx) {
      this.showSub = !this.showSub
      this.curIndex = idx
      if (idx === this.curIndex) {
        this.curIndex = -1
      } else {
        this.curIndex = idx
      }
    }
  }
};
</script>

<style lang="css" scoped>
/*.side-menu-container{width: 100%;height: 100%;  border-right: 1px solid rbg(204,204,204);}

/*手写样式i*/
.side-menu-container{
  width: 220px;
  height: 100vh;
  /* background-size: 100% 100%; */
  background: #20222A;
  /* border: 10px solid #0075c8; */
  /* background: #e8f5fe; */
} 
.menu-list-container{
    /* background: #e8f5fe; */
}
.menu-list-container ul{
  background: #20222A;
  border-top: solid 1px #000;
}
.menu-list-container ul li{
  height: 52px;
  line-height: 52px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  color: rgba(255,255,255,.7);
}
.menu-list{
  /* color: #fff;
  background: -webkit-linear-gradient(#009efa, #004c9c); 
  background: -o-linear-gradient(#009efa, #004c9c); 
  background: -moz-linear-gradient(#009efa, #004c9c); 
  background: linear-gradient(#009efa, #004c9c);  */
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
.router-link-active .title,.router-link-exact-active .title{
color: #fff;
}
.menu-list-container ul li.active{
  color: #fff;
}
.menu-list-container ul li:hover{
     /* background: -webkit-linear-gradient(#009efa, #004c9c); 
  background: -o-linear-gradient(#009efa, #004c9c); 
  background: -moz-linear-gradient(#009efa, #004c9c); 
  background: linear-gradient(#009efa, #004c9c);  */
  color: #fff;
}
</style>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

  // .side-menu-container
  //   bg-image('~static/imgs/Frame.png') 
  //  .menu-list-container
  //     bg-image('~static/imgs/Frame.png') 
  //     ul li.active
  //       bg-image('~static/imgs/Select.png')
  //     .router-link-active,.router-link-exact-active
  //       bg-image('~static/imgs/Select.png')
  //      ul li:hover
  //       bg-image('~static/imgs/Select.png')
  </style>


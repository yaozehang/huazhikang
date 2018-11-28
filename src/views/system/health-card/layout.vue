<template>
  <div class="layout-container">
  	  <div class="side-menu">
  	  	 <side-menu :slidList="menuList"></side-menu>
      </div>
  	  <div class="main-container">
        <div class="bread-list clearfix">
        <div class="bread-content">
          <span class="local-icon"> <img src="static/imgs/position.png" alt=""></span>
          <span class="local-title">您的当前位置：</span>
          <span class="bread-menu">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{localName}} </el-breadcrumb-item>
            </el-breadcrumb>
          </span>
        </div>
      </div>
  	  	 <router-view></router-view>
  	  </div>
  </div>
</template>

<script>
import sideMenu from '@/components/nav-menu/SideMenu.vue'

export default {
  data () {
    return {
      localName: this.$route.query.name,
      menuList: [
        {
          id: '1',
          name: '健康信息卡',
          path: '/wrap/infoCard/card'
        }
      ]
    }
  },
  components: {
  	sideMenu
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.side-menu
  position:fixed
  top:60px
  left:0
  width:220px
  background-color: #20222A
  height:100%
  z-index:100
.main-container
  margin-left:230px
  padding:0 30px
  color:$text-color-main
</style>
<template>
  <div class="content-container">
  	  <div class="side-menu">
  	  	 <side-menu :slidList="menuList"></side-menu>
      </div>
  	  <el-card class="main-container">
  	  	 <router-view></router-view>
  	  </el-card>
  </div>
</template>

<script>
import sideMenu from '@/components/nav-menu/SideMenu.vue'

import getUserInfo from 'common/js/user'
import {getSubmenuList} from 'api/login'

export default {
  data () {
    return {
      menuList: [],
      currentMenu: -1
    }
  },
  created() {
    let data = {
      userId: getUserInfo().userId,
      menuId: ''
    }
    if (this.$route.query.menuId !== undefined) {
      sessionStorage.setItem('menuId', this.$route.query.menuId)
      data.menuId = this.$route.query.menuId
    } else {
      data.menuId = sessionStorage.getItem('menuId')
    }
    getSubmenuList(data).then((res) => {
      this.menuList = res
    })
  },
  mounted() {
    // console.log(this.menuList)
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
  position:absolute
  top:0
  left:0
  width:220px
  background-color: #20222A
  height:100%
  z-index:100
.main-container
  padding: 0 30px;
  margin: 20px 30px 20px 250px;
  color:$text-color-main
</style>

<style>
  .content-container {
    left: 0;
    width: 100%;
    min-height: calc(100vh - 77px);
    overflow: hidden;
    position: relative;
    display: block;
  }
</style>
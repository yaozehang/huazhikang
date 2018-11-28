<template>
  <div class="layout-container">
  	  <div class="side-menu">
  	  	 <side-menu :slidList="menuList" @click.native="onClick($event)" ref="menu"></side-menu>
      </div>
      <el-car>
  	  <div class="main-container">
  	  	 <router-view :currentMenu="currentMenu"></router-view>
  	  </div>
      </el-car>
  </div>
</template>

<script>
// import sideMenu from '@/components/nav-menu/SideMenu.vue'
import sideMenu from '@/components/nav-menu/specail-menu.vue'
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
      let list = res
      this.menuList = list
      this.menuList = res
      if (sessionStorage.getItem('submenuId') === this.menuList[0].id) {
        this.currentMenu = this.menuList[0].id
      } else {
        this.currentMenu = parseInt(sessionStorage.getItem('submenuId'))
      }
    })
  },
  methods: {
    onClick(e) {
      this.currentMenu = parseInt(e.target.dataset.menuId)
      sessionStorage.setItem('submenuId', this.currentMenu)
    }
  },
  components: {
  	sideMenu
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.side-menu
  position:fixed;
  top:60px;
  left:0;
  width:220px;
  background-color: #20222A;
  height:100%;
  z-index:100;
.main-container
  margin-left:230px
  padding:0 30px
  color:$text-color-main
</style>
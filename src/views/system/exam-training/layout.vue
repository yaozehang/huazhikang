<template>
  <div class="layout-container">
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
import qs from 'qs'
export default {
  data () {
    return {
      menuList: [],
      currentMenu: -1,
      menuList1: [
        {
          id: '1',
          name: '主题管理',
          path: '/wrap/exam/theme'
        },
        {
          id: '2',
          name: '题库维护',
          path: '/wrap/exam/question'
        },
        {
          id: '3',
          name: '组卷管理',
          path: '/wrap/exam/test'
        },
        {
          id: '4',
          name: '培训考试',
          path: '/wrap/exam/train',
        },
        {
          id: '5',
          name: '考试分析',
          path: '/wrap/exam/analysis'
        }
      ]
    }
  },
  mounted() {
    this.getMenu()
  },
  methods:{
    getMenu(){
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
  onClick(e) {
      this.currentMenu = parseInt(e.target.dataset.menuId)
      sessionStorage.setItem('submenuId', this.currentMenu)
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
  position:fixed;
  top:60px;
  left:0;
  width:220px;
  background-color: #20222A;
  height:100%;
  z-index:100;
.main-container
  padding: 0 30px;
  margin: 20px 30px 20px 250px;
  color:$text-color-main
</style>
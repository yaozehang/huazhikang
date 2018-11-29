<template>
  <div  class="project-container clearfix">
    <div class="sideMenu">
      <side-menu :slidList="menuList"></side-menu>
    </div>
     <el-card class="project-main">
      <router-view v-if="isRouterAlive"></router-view>
     </el-card>
  </div>
</template>

<script>
import SideMenu from '@/components/nav-menu/SideMenu.vue'
import getUserInfo from 'common/js/user'
import {getSubmenuList} from 'api/login'
import qs from 'qs'
export default {
  name: 'ProjectManagement',
  components: {
    SideMenu
  },
  mounted(){
     this.reload()
     this._getSubmenu()
     // window.location.reload()
   },
  data () {
    return {
      isRouterAlive: true,
      menuList: [],
      slidList1: [
        {
          id: '1',
          name: '护具入库',
          path: '/wrap/protect/enter'
        },
        {
          id: '2',
          name: '部门发放',
          path: '/wrap/protect/depart'
        },
        {
          id: '3',
          name: '个人发放',
          path: '/wrap/protect/person'
        },
        {
          id: '4',
          name: '发放周期',
          path: '/wrap/protect/cycle'
        },
        {
          id: '5',
          name: '采购提醒',
          path: '/wrap/protect/remind'
        },
        {
          id: '6',
          name: '供应商管理',
          path: '/wrap/protect/supplier'
        }
      ]
    }
  },
  methods: {
    reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   },
    _getSubmenu() {      //获取菜单  超级管理员不需要权限
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
  }
  }
};
</script>

<style lang="css" scoped>
.Project-container{left: 0; width: 100%; overflow: hidden;position: relative;display: block;}
.sideMenu{  position:fixed;
  top:60px;
  left:0;
  width:220px;
  background-color: #20222A;
  height:100%;
  z-index:100;
}
.project-main{margin-left:250px;overflow: hidden;border-top: 1px solid #dedede; margin-top: 30px;margin-right:20px;}
</style>
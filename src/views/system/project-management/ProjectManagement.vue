<template>
  <div  class="content-container clearfix">
    <div class="sideMenu">
      <side-menu :slidList="slidList"></side-menu>
    </div>
    <el-card>
     <div class="project-main">
      <router-view></router-view>
     </div>
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
    // console.log(this.$route.query.menuId)
   // this._getSubmenu()
    location.replace(location.href)
   },
  data () {
    return {
      menuId: this.$route.query.menuId,
      userId: getUserInfo().userId,
      slidList: [
        {
          id: '1',
          name: '新增明细项目',
          path: '/wrap/project/addPJ'
        },
        {
          id: '2',
          name: '明细项目列表',
          path: '/wrap/project/listPJ'
        },
        {
          id: '3',
          name: '新增组合项目',
          path: '/wrap/project/addGP'
        },
        {
          id: '4',
          name: '组合项目列表',
          path: '/wrap/project/listGP'
        },
        {
          id: '5',
          name: '新增危害因素',
          path: '/wrap/project/addHF'
        },
        {
          id: '6',
          name: '危害因素列表',
          path: '/wrap/project/listHF'
        }
      ]
    }
  },
  methods: {
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
.sideMenu{  
  position:absolute;
  top:0;
  left:0;
  width:220px;
  background-color: #20222A;
  height:100%;
  z-index:100;
}
.project-main{margin-left:260px;overflow: hidden;border-top: 1px solid #dedede; }
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
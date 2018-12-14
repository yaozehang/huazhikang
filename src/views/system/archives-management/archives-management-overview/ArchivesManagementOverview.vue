<template>
<div  class="container ">
  <div class="sideMenu">
      <side-menu :slidList="slidList" @showHide1="showHide1"></side-menu>
        <!-- <side-menu :navMenus="slidList"></side-menu> -->
  </div>
  <div class="Archives-main">
    <div class="bread-list clearfix">
      <div class="bread-content">
        <span class="local-icon"> <img src="static/imgs/position.png" alt="" width="20px"></span>
        <span class="local-title">您的当前位置：</span>
        <span class="bread-menu">
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/board' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{localName}} </el-breadcrumb-item>
          </el-breadcrumb>
        </span>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</div>
</template>


<script>
import SideMenu from '@/components/nav-menu/Menu.vue'
// import SideMenu from '@/components/nav-menu/nav-menu.vue'
import getUserInfo from 'common/js/user'
import {getSpecialmenuList} from 'api/login'
import qs from 'qs'
export default {
  name: 'ArchivesManagementOverview', 
  components: {    
    SideMenu 
   }, 
  data () {
    return {
      isRouterAlive: true,
      tab: '职业卫生档案管理',
      menuId: this.$route.query.menuId,
      userId: getUserInfo().userId,
      localName: this.$route.query.name,
      slidList: [],
      slidList1: [
      {
        id: '1',
        name: '职业卫生档案管理',
        path: '/wrap/archives/nation',
        submenu: [
          {
            id: '1-1',
            name: '档案自查',
            path: '/wrap/archives/nation/check',
          },
          {
            id: '1-2',
            name: '档案编写',
            path: '/wrap/archives/nation/edit',
          }
        ]
      },
      {
        id: '2',
        name: '其他档案管理',
        path: '/wrap/archives/other',
        submenu: [{
          id: '2-1',
          name: '档案类型管理',
          path: '/wrap/archives/other/type',
        }, {
          id: '2-2',
          name: '档案列表',
          path: '/wrap/archives/other/list',
        }]
      }
      ]
    }
  },
  mounted() {
    this.reload()
    this._getSubmenu()
  },
  methods: {
    reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
   },
   menuSelected(data){
    console.log(data)
   },
   showHide1(data){
    console.log(data)
      let param = {
      menuId: data.id,
      userId: this.userId,
    }
    console.log({param});
   },
  //获取二级菜单
  _getSubmenu() {
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
    getSpecialmenuList(data).then((res) => {
      console.log(res)
      this.slidList = res
    })
  }
},
  components: {
    SideMenu
  }
};
</script>

<style lang="css" scoped>
.container{
  left: 0;
  width: 100%;
  min-height: calc(100vh - 77px);
  overflow: hidden;
  position: relative;
  display: block;
}
.sideMenu{
  position:absolute;
  top:0;
  left:0;
  width:220px;
  background-color: #20222A;
  height:100%;
  z-index:100;
}
.Archives-main{
  margin-left: 250px;
  margin-right: 30px;
  overflow: hidden;
}
</style>
<style>
  .upload-form{
    max-height: 800px;
    overflow-y: auto;
  }
</style>
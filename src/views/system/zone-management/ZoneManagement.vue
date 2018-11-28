<template>
	  <div  class="content-container clearfix">
    <div class="sideMenu">
      <side-menu :slidList="slidList"></side-menu>
    </div>
     <div class="content-main">
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
      <router-view keep-alive></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/nav-menu/SideMenu.vue'
import getUserInfo from 'common/js/user'
import qs from 'qs'
import {getSubmenuList} from 'api/login'
export default {
  name: 'ZoneManagement',
  components: {
    SideMenu
  },
  data () {
    return {
      menuId: this.$route.query.menuId,
      userId: getUserInfo().userId,
      localName: this.$route.query.name,
      slidList: [],
      slidList1: [
        {
        id: '1',
        name: '工种管理',
        path: '/wrap/zone/type'
      },
       {
        id: '2',
        name: '新增分区',
        path: '/wrap/zone/add'
      },
      {
        id: '3',
        name: '分区列表',
        path: '/wrap/zone/list'
      }
      ]
      //  {
      //   id: '4',
      //   name: '分区迁移',
      //   path: '/wrap/zone/transfer'
      // }
    }
  },
  destroyed (){
    // window.location.reload()
  },
  mounted(){
   this._getSubmenu()
   console.log(this.$route)
   // location.assign(location)
    // location.replace(location.href)
  },
  methods:{
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
      this.slidList = res
    })
  }
  }
};
</script>

<style lang="css" scoped>
.content-container{left: 0; width: 100%; overflow: hidden;position: relative;display: block;}
.sideMenu{
  position:fixed;
  top:60px;
  left:0;
  width:220px;
  background-color: #20222A;
  height:100%;
  z-index:100;
}
.content-main{
  margin-left:270px;
  overflow: hidden;
  padding: 10px 20px;
  }
</style>
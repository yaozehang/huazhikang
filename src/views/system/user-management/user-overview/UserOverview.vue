<template>
<div class="content-container clearfix">
   <div class="sideMenu">
      <side-menu :slidList="slidList"></side-menu>
    </div>
     <div class="content-main">
      <div class="bread-list clearfix">
        <div class="bread-content">
          <span class="local-icon"> <img src="static/imgs/position.png" alt="" width="20px"></span>
          <span class="local-title">您的当前位置：</span>
          <span class="bread-menu">
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/homePage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{localName}} </el-breadcrumb-item>
            </el-breadcrumb>
          </span>
        </div>
      </div>
      <el-card>
        <router-view></router-view>
      </el-card>
    </div>
 </div>
</template>

<script>
import SideMenu from '@/components/nav-menu/SideMenu.vue'
import getUserInfo from 'common/js/user'
import qs from 'qs'
import {getSubmenuList} from 'api/login'
export default {
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
        name: '新增用户',
        path: '/wrap/user/add'
      },
      {
        id: '2',
        name: '用户列表',
        path: '/wrap/user/list'
      },
      {
        id: '3',
        name: '登录记录',
        path: '/wrap/user/record'
      }
      ]
    }
  },
  mounted(){
   console.log(getUserInfo())
   this._getSubmenu()
  },
  destroyed(){
    window.location.reload()
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
.content-container{
  overflow: hidden;
  position: relative;
  left: 0;
  display: block;
 padding: 10px 20px;
}
.sideMenu{
  position:fixed;
  top:58px;
  left:0;
  width:220px;
  background-color: #20222A;
  height:100%;
  z-index:100;
}
.content-main{margin-left:270px;}
</style>
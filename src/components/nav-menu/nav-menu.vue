<template>
  <div class="navMenu">
    <div >
    <el-aside width="230px" style="background-color: #e2eff3">
      <!-- el-menu  :default-openeds="['1']" -->
    <el-menu   router v-for="(navItem,pIndex) in navMenus" :key="pIndex">
      <el-submenu :index="navItem.path">
        <template slot="title" @click="goPath(navItem)">{{navItem.name}}</template>
        <el-menu-item :index="item.path"  v-for="(item,index) in navItem.submenu" @click="goPath(item)" :key="index">{{item.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
    </div>
  </div>
</template>
 
<script>
  export default {
    name: 'NavMenu',
    props: {
      navMenus:Array,
    },
    data() {
      return {}
    },
    methods: {
    goPath(data){
      console.log(data)
      // this.$router.push({path:data.path,query:{menuId: data.id,name:data.name}})
    },
    }
  };
</script>
 
<style lang="css" scoped>
 
</style>
<style lang="css">
.navMenu{
  background: #e2eff3;
}
  .navMenu .el-menu-item{
  background: #e2eff3;
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-size: 14px;
    color: rgb(102,102,102);
  }
  .navMenu .el-submenu__title{
   background: #e2eff3;
  text-align: center;
  font-size: 14px;
    color: rgb(102,102,102);
  }
  .navMenu .el-menu {
  /* height: 133px; */
  }
  .navMenu .el-menu-item:hover{
  background: #4d9bf3;
  color: #fff;
  }
  .navMenu .el-submenu__title:hover{
     background: #4d9bf3;
  color: #fff;
  }
  .el-menu-item.is-active{
  background: #4d9bf3;
  color: #fff;
  }
</style>
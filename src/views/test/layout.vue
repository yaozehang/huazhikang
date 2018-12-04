<template>
<div  class="container ">
  <div class="sideMenu">
      <el-menu
      :default-active="$route.name"
      class="el-menu-vertical-demo"
      background-color="#20222A"
      text-color="#e1e1e1"
      active-text-color="#ffd04b"
      :router=router>
      <el-submenu index="manage">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>企业管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="manage">企业列表</el-menu-item>
          <el-menu-item index="manageAdd">添加企业</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="theme">
        <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">培训主题</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="theme">培训列表</el-menu-item>
          <el-menu-item index="themeAdd">添加培训</el-menu-item>
          <el-submenu index="question">
            <template slot="title">题库管理</template>
              <el-menu-item index="question">题目列表</el-menu-item>
              <el-menu-item index="questionAdd">添加考题</el-menu-item>
          </el-submenu>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="exam">
        <template slot="title">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">培训考试</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="exam">考试列表</el-menu-item>
          <el-menu-item index="examCreator">创建考试</el-menu-item>
          <el-menu-item index="examCase">答卷情况</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
    <el-card>
      <router-view></router-view>
    </el-card>
</div>
</template>


<script>
export default {
  data(){
    return {
      router:true
    }
  },
   methods: {

    }
};
</script>

<style lang="scss" scoped>
.container{
  position: relative;
  left: 0;
  width: 100%;
  overflow: hidden;
  display: block;
  margin-top: 30px;
  .sideMenu{
    position:fixed;
    top:60px;
    left:0;
    width:220px;
    background-color: #20222A;
    height:100%;
    z-index:100;
  }
}

/deep/{
  .el-menu{
    border:none;
  }
}

.el-card {
  min-height: calc(100vh - 160px);
  margin:0 20px 0 240px;
}

</style>
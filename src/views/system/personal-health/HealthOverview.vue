<template>
	<div  class="content-container clearfix">
    <div class="sideMenu">
      <side-menu :slidList="slidList"  @click.native="onClick($event)" ref="menu"></side-menu>
    </div>
     <div class="content-main">
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
      <el-card style="padding-bottom:10px;">
        <router-view :currentMenu="currentMenu"></router-view>
      </el-card>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/nav-menu/SideMenu.vue'
import getUserInfo from 'common/js/user'
import qs from 'qs'
export default {
  name: 'HealthOverview',
  components: {
    SideMenu
  },
  mounted() {
    console.log(getUserInfo())
  },
  data () {
    return {
      currentMenu: -1,
      menuId: this.$route.query.menuId,
      userId: getUserInfo().userId,
      localName: this.$route.query.name,
      slidList: []
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
    this.axios.post('/user/getInsideMenu.do', qs.stringify(data))
    .then((res) => {
    if (res.status ===200) {
      console.log(res.data)
      let temp =[]
      res.data.map((item,index) =>{
        temp.push({name:item.menuname,id:item.menuid, path:item.url})
      })
      this.slidList = temp
      console.log(this.slidList)
      if(parseInt(getUserInfo().roleId) === 0) {  //员工 直接进入详情页面查看 不能操作 3公司
        this.$router.push({path:'/wrap/health/listH/listD', query: {itemId: this.userId,page: 1, }})
         this.slidList.push({name:'个人健康档案',id:1, path:'wrap/health/listH/listD'})
      }
        }else {
          console.log(res.data)
        }
      })
  },
  methods: {
  //获取二级菜单id
  onClick(e) {
    this.currentMenu = parseInt(e.target.dataset.menuId)
    sessionStorage.setItem('submenuId', this.currentMenu)
    console.log(this.currentMenu)
  }
  },
};
</script>

<style lang="css" scoped>
.content-container{left: 0; width: 100%; min-height: calc(100vh - 77px); overflow: hidden;position: relative;display: block;}
.sideMenu{
  position:absolute;
  top:0;
  left:0;
  width:220px;
  background-color: #20222A;
  height:100%;
  z-index:100;
}
.content-main{margin-left:250px;overflow: hidden; margin-top: 30px;
  margin-bottom: 30px;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
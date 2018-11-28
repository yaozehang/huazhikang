<template>
  <div class="menu-list-container">
    <div class="menu-content clearfix">
      <ul class="main-menu" v-for="(col, index) in menus" :key="index">
      <p class="list-title"> 
        <!-- <i class="el-icon-document my-icon" ></i> -->
        <img :src="iconImg" alt="华职康健康科技" class="my-icon">
         <span>功能模块</span></p>
      <router-link tag="li" class="menu-list" v-for="(item,idx) in col" :key="item.id"
       :to="{path:item.path,query: {menuId: item.id,name:item.name}}" @click.native="setPath(item)">
        <img :src="item.logo" alt=""  class="logo-img">
     <!--    <p class="title" @click="linkTo(item.path)">{{item.name}} </p> -->
      </router-link>
    </ul>
    </div>
  </div>
</template>

<script>
import utils from '@/utils.js'
export default {
  props: {
    menuList: Array
  },
  data() {
    return {
      menus: [],
      iconImg:'static/img/a.png'
    }
  },
  mounted() {
    // this.menus = this._formatList(this.menuList)
    this.menus= this.splitMenu()
    this.splitMenu()
  },
  watch: {
    menuList() {
      this.menus= this.splitMenu()
      // this.menus = this._formatList(this.menuList)
    }
  },
  methods: {
  duplicate1(arr,id){   //去重
    let result = []
    arr.forEach((item, index)=> {
    })
    return result
  },
  linkTo(myPath) {
    this.$router.push({path:myPath}) 
    // window.location.reload()
  },
  _filter(oldArr, newArr){
    for(var i=0; i<oldArr.length; i++) {
    　　  var flag = true
    　　for(var j=0; j<newArr.length; j++) {
    　　　　if(oldArr[i].id === newArr[j].id){
    　　　　　　flag = false
    　　　　}
    　　}
    　　if(flag){
        newArr.push(oldArr[i])
        return newArr
    　　}
    }
  return newArr
  },
  objkey(obj, keys){    //對象數組排序
  var n = keys.length,  
      key = [] 
  while(n--){  
      key.push(obj[keys[n]])
  } 
  return key.join('|')  
  },
  uniqeByKeys(array,keys){  
  var arr = []
  var hash = {}
  for (var i = 0, j = array.length; i < j; i++) {  
      var k = this.objkey(array[i], keys)
      console.log(k)
      if (!(k in hash)) { 
          hash[k] = true 
          arr .push(array[i]) 
      }  
  }  
  return arr 
  },
  setPath(item){
    let navMenu = sessionStorage.getItem('navMenu') ? JSON.parse(sessionStorage.getItem('navMenu')) : []
      navMenu.push({name:item.name,path:item.path, id:item.id})
      let newList = this.uniqeByKeys(navMenu,['id'])
      sessionStorage.setItem('navMenu',JSON.stringify(newList))
  },
  splitArr(N,Q){
  var R = [],F
  for (F = 0;F < Q.length;) R.push(Q.slice(F,F += N))
  return R
  },
  splitMenu(){
    let menu =this.menuList
     let arr = menu.slice(0,5)
    let arr2 = menu.slice(5,9)
    let arr3 = menu.slice(9,12)
    let result = []
    result[0] = arr
    result[1] = arr2
    result[2] = arr3
    return result
  },
  _formatList(list) {
    let ret = []
    let col = []
    for (let i = 1; i <= list.length; i++) {
      col.push(list[i-1])
      if (i % 5 === 0) {
        ret.push(col)
        col = []
      }
    }
    if (col.length !== 0) {
      ret.push(col)
    }
    // console.log(ret)
    return ret
  }
 }
};
</script>

<style lang="css" scoped>
.menu-content{
  width: 1080px;
}
.menu-list-container .main-menu{
  display:inline-block;
  vertical-align:top;
  width: 460px;
  margin-bottom: 50px;
}
.menu-list-container .main-menu:nth-child(3){
margin-bottom: 0;
}
.menu-list-container .main-menu:nth-child(1),.menu-list-container .main-menu:nth-child(3){
margin-right: 100px;
}
.menu-list-container .main-menu .menu-list{
  width: 140px;
  text-align: center;
  height: 140px;
  font-size: 16px;
  border-bottom: 1px solid rbg(204,204,204);
  cursor: pointer;
  text-align: center;
  float: left;
  margin-left: 10px;
  margin-bottom: 10px;
}
.menu-list-container .main-menu .menu-list:hover{
  cursor: pointer;
  -webkit-box-shadow:0 0 10px #5ed0ff;
  -moz-box-shadow:0 0 10px #5ed0ff;
  box-shadow:0 0 15px #5ed0ff;
}
.menu-list-container .main-menu .menu-list:nth-child(1){
  margin-left: 0!important;
}
.list-title{
color: #fff;
width: 90px;
height: 15px;
line-height: 15px;
padding-bottom: 5px;
border-bottom: 1px solid #fff;
margin-bottom: 10px;
margin-left: 10px;
background: transparent; 
}
.list-title .my-icon{
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
}
.title{
  color: #fff;
}
.logo-img{
  height: 140px;
  width: 140px;
}
.log-png img{
  width: 140px;
  height: 140px;
}
.menu-list-container .main-menu .menu-list p{
  height: 30px;
  line-height: 30px;
}
</style>


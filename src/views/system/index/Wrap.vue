<template>
  <div class="wrap">
    <div class="header-wrap">
       <sub-header :List="myTab" @removeTab="removeTab"> </sub-header>
    </div>
    <router-view ></router-view>
    </div>
</template>

<script>
// import SubHeader from '@/components/my-header/my-header.vue'   //li
import SubHeader from '@/components/my-header/my-header.vue'   //router -link
export default {
  name: 'Wrap',
  components: {
    SubHeader
  },
  data () {
    return {
      tab: '',
      tab2: '',
      isRouterAlive: true,
      myTab: []
    }
  },
  watch: {
    'myTab'() {
      let myLength = this.myTab.length -1
       if(this.myTab.length ===0){
        this.$router.push({path:'/homePage'})
        sessionStorage.setItem('navMenu', JSON.stringify([]))
      }else{
        // this.$router.push({path:this.myTab[myLength].path,query:{menuId:this.myTab[myLength].id,name:this.myTab[myLength].name}})
      }
    }
  },
  mounted() {
     this.myTab = JSON.parse(sessionStorage.getItem('navMenu')) ? JSON.parse(sessionStorage.getItem('navMenu')) : []
     // console.log(this.$route)
  },
  methods: {
   changePage(item){
    this.$router.push({path:item.path,query:{menuId:item.id,name:item.name}}) 
   },
   removeTab(index,List){
    this.myTab.splice(index,1)
     if(this.myTab.length !==0){
        this.$router.push({path:this.myTab[index-1].path,query:{menuId:this.myTab[index-1].id,name:this.myTab[index-1].name}})
        sessionStorage.setItem('navMenu', JSON.stringify(this.myTab))
     }
   }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scope>
.header-wrap
  height:60px
</style>

<style lang="css" scoped>
.header-wrap{
text-align: center;
line-height: 60px;
height: 60px;
font-size: 16px;
background: #fff;
color: rgb(102,102,102);
}
</style>
<template>
  <div class="wrap">
    <div class="header-wrap">
       <my-header :list="list"></my-header>
    </div>
    <router-view ></router-view>
    </div>
</template>

<script>
// import SubHeader from '@/components/my-header/my-header.vue'   //li
// import SubHeader from '@/components/my-header/my-header.vue'   //router -link
import MyHeader from '@/components/my-header/data-header.vue'

export default {
  name: 'Wrap',
  components: {
    // SubHeader
    MyHeader
  },
  data () {
    return {
      tab: '',
      tab2: '',
      isRouterAlive: true,
      myTab: [],
      list:[]
    }
  },
  // watch: {
  //   'myTab'() {
  //     let myLength = this.myTab.length -1
  //      if(this.myTab.length ===0){
  //       this.$router.push({path:'/board'})
  //       sessionStorage.setItem('navMenu', JSON.stringify([]))
  //     }else{
  //       // this.$router.push({path:this.myTab[myLength].path,query:{menuId:this.myTab[myLength].id,name:this.myTab[myLength].name}})
  //     }
  //   }
  // },
  // mounted() {
  //    this.myTab = JSON.parse(sessionStorage.getItem('navMenu')) ? JSON.parse(sessionStorage.getItem('navMenu')) : []
  //    // console.log(this.$route)
  // },
  methods: {
    _getList() {
      let ret = []
      let menulist = JSON.parse(decodeURIComponent(sessionStorage.getItem('menu')))
      menulist.forEach((item, idx) => {
        ret.push({
          id: item.menuid,
          name: item.menuname,
          logo: item.image,
          path: item.url
        })
      })
      this.list = ret
    },
  //  changePage(item){
  //   this.$router.push({path:item.path,query:{menuId:item.id,name:item.name}}) 
  //  },
  //  removeTab(index,List){
  //   this.myTab.splice(index,1)
  //    if(this.myTab.length !==0){
  //       this.$router.push({path:this.myTab[index-1].path,query:{menuId:this.myTab[index-1].id,name:this.myTab[index-1].name}})
  //       sessionStorage.setItem('navMenu', JSON.stringify(this.myTab))
  //    }
  //  }
  },
  created(){
    this._getList()
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scope>
.header-wrap
  height:60px
</style>

<style lang="css" scoped>
/* .header-wrap{
text-align: center;
line-height: 60px;
height: 60px;
font-size: 16px;
background: #fff;
color: rgb(102,102,102);
} */
</style>
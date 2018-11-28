<template>
  <div class="img-content">
    <div class="opreate">
      <span @click="goBcak">返回</span>
    </div>
    <div class="item-img">
      <img :src="imgSrc" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'img-detail',
  // props: {
  //   imgSrc:String
  // },
  data() {
    return {
      imgSrc:this.$route.query.imgSrc
    };
  },
  methods:{
     goBcak(){
      this.$router.push({path:'/wrap/poling/plan1',query:{menuId:12,name:'智能辅助巡检'}})
    },
  }
};
</script>

<style lang="css" scoped>
.opreate{
  height: 30px;
  line-height: 30px;
}
.item-img{
  width: auto;
  height: auto;
}
</style>

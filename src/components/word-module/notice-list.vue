<template>
  <div class="container-min">
      <!-- swiper -->
      <swiper :options="swiperOption" class="news-list">
        <swiper-slide class="news-item" v-for="(item,index) in newsList" :key="index">
          <p :class="item.type === 2 ? 'danger-word' : 'common-word' "> 
          {{item.title}} 
          <span v-if="item.status === 0">正在进行</span> 
          <span v-if="item.status === 1">已经完成</span></p>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    props: {
      newsList: Array,
    },
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 5,
          spaceBetween: 30,
          mousewheel: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    components:{
    swiper,
    swiperSlide,
    }
  };
</script>
<style lang="css" scoped>
.container-min{
  margin-top: 20px;
}
.news-list{
  width: 230px;
  height: 250px;
  overflow: hidden;
  margin: 0 auto;
  overflow: hidden;
}
.news-list .news-item{
margin: 5px auto 0 auto;
border-radius: 30px!important;
}
.news-list .news-item:first-child{
  margin-top: 0!important;
}
.news-list .news-item p{
text-overflow:ellipsis;
white-space:nowrap;
overflow:hidden;
border-radius: 30px!important;
}
.news-list .news-item p{
min-height: 30px;
max-height: 60px;
line-height: 30px;
font-size: 14px;
padding:  0 20px;
background: #001b41; 
}
.danger-word{
  color: #b66a11!important;
}
.common-word{
  color: #fff!important;
}
</style>
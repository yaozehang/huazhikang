<template>
  <div class="nwwest-roll" id="nwwest-roll">
      <swiper :options="swiperOption" id="roll-ul">
        <swiper-slide v-for="(lawItem,index) in lawList" :key="index" ref="rollul">
          <div class="animated fadeInDownBig law-item">           
          <h4 class="law-title"> {{lawItem.title}}</h4>
          <ul class="law-info clearfix">
            <li class="law-left">
               <p class="item-info-s">已有文件数{{lawItem.ExistNum}}个 </p>
            </li>
            <li class="law-right">
              <p class="item-info"> 应有文件数 <span class="num"> /{{lawItem.DueNum}} </span> </p>
              <p class="item-info"> 包含类型数<span class="num"> /{{lawItem.typeNum}} </span></p>
            </li>
          </ul>
        </div>
      </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
</div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'word-module',
  props:{
    lawList: Array,
  },
  data() {
    return {
      animate:true,
      list:[],
     swiperOption: {
      direction: 'vertical',
      slidesPerView: 3,
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
    };
  },
  created(){
    // setInterval(this.scroll,3000) 
  },
  mounted(){
  },
  methods:{
   scroll(){
    let con1 = this.$refs.rollul
    con1[0].style.marginTop='30px'
    this.animate=!this.animate
    var that = this // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
    setTimeout(function() {
        that.list.push(that.list[0])
        that.list.shift()
        con1[0].style.marginTop='0px'
        that.animate=!that.animate  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
    },0)
  }
  },
  components:{
    swiper,
    swiperSlide,
  }
};
</script>

<style lang="css" scoped>
.anim{
transition: all 1s;
}
 #roll-ul{
  width: 214px;
  height: 400px;
  margin: 0 auto 10px auto;
  transition: all 1s;
  overflow: hidden;
}
 #roll-ul .law-item{
  width: 214px;
  float: left;
  height: 120px;
  background: #001739;
  padding: 0 5px;
}
#roll-ul .law-title{
width: 150px;
margin: 10px auto;
height: 26px;
line-height: 26px;
text-align: center;
padding: 2px 5px;
border-radius: 20px;
color: #00f6ff;
background: #002e5e;
box-shadow: 0 5px #00172e;
text-overflow:ellipsis;
white-space:nowrap;
overflow:hidden;
text-align: center;
}
#roll-ul .item-info{
width: 100px;
text-align: center;
height: 20px;
line-height: 20px;
border:1px solid #003576;
color: #fff;
}
#roll-ul .item-info:first-child{
margin-bottom: 6px;
}
.law-info{
  width: 202px;
  margin:  0 auto;
  font-size: 14px;
}
.law-info li{
  float: left;
  height: 50px;
}
.law-info li:first-child{
  margin-right: 10px;
}
.item-info-s{
width: 80px;
height: 50px;
line-height: 25px;
color: #fff;
text-align: center;
background: #002851;
}
/* .num{
  display: inline-block;
  width: 20px;
  color: #fff;
 font-weight: 500;
} */
</style>

<template>
	<div class="chart-pie-container">
		<div class="pie-bg"></div>
		<div class="pie-data" :style="{height:h,backgroundColor:bgColor}"></div>
    <div class="standard-line" :style="{top:top}"></div>
    <div class="text" v-if="text">{{text}}</div>
	</div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 6
    },
    standard: {
      type: Number,
      default: 3
    },
    data: {
      type:Number,
      default: 1
    }
  },
  computed: {
    h() {
      return parseInt(this.data / this.total * 100) * 4 + 'px'
    },
    bgColor() {
      let standard = this.standard / this.total
      return this.data / this.total > standard ? '#f00' : '#cce8ff'
    },
    top() {
      return 100 - parseInt(this.standard / this.total * 100) + '%'
    },
    text() {
      let standard = this.standard / this.total
      return this.data / this.total > standard ? '观察对象' : ''
    }
  },
  data () {
    return {

    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .chart-pie-container
    position:relative
    width: 278px
    height: 300px
    border-radius(50%)
    overflow:hidden
    .pie-bg
      position:absolute
      top:0
      left:0
      width: 100%
      height: 100%
      border-radius(50%)
      background-color: #00b771
    .pie-data
      position:absolute
      bottom:0
      left:0
      width:100%
      height:0px
      background-color:#cce8ff
    .standard-line
      position:absolute
      top:0
      left:0
      width:100%
      border-top:4px dashed #ffc000
    .text
      position:absolute
      top:60px
      left:0
      width:100%
      color:#fff
      font-size:50px
      text-align:center
</style>
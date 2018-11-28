<template>
  <div class="chart-bar-container" :id="id">
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')

export default {
  props: {
    xLabel: {
      default: [],
      type: Array
    },
    data: {
      default: [],
      type: Array
    }
  },
  created() {
    this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    this.drawBar()
  },
  watch: {
    'data'() {
      this.drawBar()
    },
    'xLabel'(){
      this.drawBar()
    }
  },
  methods: {
    drawBar() {
      let myChart = echarts.init(document.getElementById(this.id))
      var linear_color = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0,
            color: '#02a9e7'
        }, {
            offset: 1,
            color: '#0157d5'
        }]
      };
      let option = {
        color: linear_color,
        tooltip : {
          trigger: 'axis',
          width: 20,
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          show: true,
          text: '危害因素占比图',
          textStyle:{
            color: '#fff',
            align: 'center',
            fontSize: 18,
          },
          left: 'center',
          y: '95%'
        },
        grid: {
          show:false,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            // name: '类别',
            show: true,
            type : 'category',
            data : this.xLabel,
            boundaryGap: ['10%', '10%'],
            nameGap: -5,
            axisLabel: {
              textStyle: {
                  color: '#fff',//坐标值得具体的颜色
              }
            },
            splitLine:{
              show:false,
            },
            axisLine:{
              show: true,
              lineStyle:{
                color:'#fff'
              }
            },
            axisTick: {
                alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            name: '人',
            show: true,
            splitNumber: 4,
            type : 'value',
            splitLine:{
              show:false,
            },
            axisLine:{
              show: true,
              lineStyle:{
                color:'#fff'
              }
            },
            axisLabel: {
              textStyle: {
                  color: '#fff',//坐标值得具体的颜色
              }
            }
          }
        ],
        label:{
          color:'#fff'
        },
        series : [
          {
            type:'bar',
            barWidth: '40',
            // barGap: '20px',
            itemStyle:{
              color:linear_color
            },
            label:{
              show: true,
              position: 'top'
            },
            data:this.data
          }
        ]
    }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.chart-bar-container
  width:100%
  height:100%
</style>
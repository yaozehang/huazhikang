<template>
  <div class="chart-container" :id="id">
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/gauge')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')

export default {
  props: {
    // xLabel: {
    //   default: [],
    //   type: Array
    // },
    numData: {
      default: 56,
      type: Number
    }
  },
  created() {
    this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    this.drawBar()
  },
  watch: {
    'numData'() {
      this.drawBar()
    }
  },
  methods: {
    drawBar() {
      let myChart = echarts.init(document.getElementById(this.id))
      var rate = 0.4 + 0.3 * Math.random();//rate为【0,1】间的数
      var linear_color = {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [{
              offset: 0,
              color: '#1e90fd'
          }, {
              offset: 1,
              color: '#00a8ff',
              opacity: 0.5,
          }]
      };
      let  option = {
        title: {
            text: "合格率",
            textStyle: {
                color: '#fff',
                fontSize: 12,
                fontWeight: 'bold'
            },
            left: 'center',
            y: '80%'
          },
          grid: {
            top: '15%'
          },
          series: [{
              name: '合格率',
              type: 'gauge',
              hoverAnimation: false,
              min: 0,
              max: 100,
              splitNumber: 10,
              startAngle: 225,
              endAngle: -45,
              center: ["50%", '70%'],
              radius: '75%',
              data: [this.numData],
              pointer:{   //指针的宽度 长度设置
                show:true,
                width: 5,
                length: '70%',
              },
              splitLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  color: linear_color
                }
              },
              axisLine: {   //表盘
                lineStyle: {
                  width: 5,
                  color:[[1, '#1e90fd']],
                  shadowColor: '#00a8ff',
                  opacity: 0.5,
                }       
              },
              axisTick: {   //刻度
                  length: 8,
                  lineStyle: {
                      width: 1,
                      color: linear_color
                  }
              },
              axisLabel: {
                  distance: 2,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'normal',
              },
              detail: {
                height: 15,
                lineHeight: 15,
                width: 40,
                fontSize: 16,
                borderRadius: 13,
                backgroundColor: '#16934f',
                color: '#fff',
                offsetCenter: [0, '85%'],
                formatter:'{value}%',
                rich:{
                  borderRadius: 10,
                  color: '#fff',
                  align: 'center'
                }
              },
              itemStyle:{
                color: '#ffdd40',  //指针
              }
          }]
      };
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.chart-container
  width:100%
  height:100%
</style>
<template>
  <div class="chart-dot-container" :id="id">
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/scatter')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  props: {
    xLabel:Array,
    data: Array
  },
   data() {
    return {
      color: ['#018cec', '#009218','#db6500'],
      // xLabel: [2014,2015,2016,2017,2018],
      // data: [[60,90,50,40,70],[80,70,30,80,60],[60,20,90,40,70]],
    }
  },
  created() {
    this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    this.drawDot()  
  },
  watch: {
    'xLabel'(){
      this.drawDot()
    },
    'data'() {
      this.drawDot()
    },
  },
  methods: {
    drawDot() {
      let myChart = echarts.init(document.getElementById(this.id))
      let that = this
      let option = {
          tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          orient:'horizontal',
          left: 10,
          top: 10,
          data: ['标准值','风险值2','风险值1'],
          textStyle: {
            color:'#fff',
            fontSize: 14,
          }
        },
        xAxis : [
          {
            type : 'category',
            data: this.xLabel,
            splitLine: {
            show: true,
            lineStyle: {
              color: '#047feb'
            }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color:'#001d42'
              }
            },
            axisLabel: {
              show: true,
              fontSize: 14,
              color: '#fff'
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            min: 0,
            max: 100,
            interval: 20,
            show: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show:true,
              lineStyle: {
                color:'#001d42'
              }
            },
            axisLabel: {
              show: true,
              fontSize: 14,
              color: '#fff',
              formatter: '{value}'
            }
          }
        ],
        series: [{
          type: 'scatter',
          name: '标准值',
          symbolSize: 15,
          data: this.data[0],
          itemStyle: {
            normal: {
              color: this.color[0],
            }
          }
        },
        {
          type: 'scatter',
          name: '风险值1',
          symbolSize: 15,
          data: this.data[1],
          itemStyle: {
            normal: {
              color: this.color[1],
            }
          }
        },
        {
          type: 'scatter',
          name: '风险值2',
          symbolSize: 15,
          data: this.data[2],
          itemStyle: {
            normal: {
              color: this.color[2],
            }
          }
        },
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.chart-dot-container
  width:100%
  height:100%
  // height:480px
  // margin-top:-60px
</style>
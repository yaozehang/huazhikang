<template>
	<div class="chart-line-container" :id="id">
	</div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  props: {
    xLabel: {
      type: Array,
      default: []
    },
    data: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.drawLine()
  },
  watch: {
    'xLabel'() {
      this.drawLine()
    }
  },
  created() {
  	this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById(this.id))
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['标准值', '风险值1', '风险值2'],
          itemGap: 40
        },
        grid: {
          left: 40,
          top: 60,
          right: 10,
          bottom: 40
        },
        xAxis : [
          {
            type : 'category',
            data : this.xLabel,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 14,
              color: '#666'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#d9d9d9'
              }
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            min: 0,
            max: 30,
            splitNumber: 10,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#d9d9d9'
              }
            },
            axisLabel: {
              fontSize: 14,
              color: '#666'
            }
          }
        ],
        series : [
        {
          type: 'line',
          data:this.data,
          areaStyle: {}
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
.chart-line-container
  width:100%
  height:530px
  margin-top:50px
</style>
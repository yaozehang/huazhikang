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
    }
  },
  methods: {
    drawBar() {
      let myChart = echarts.init(document.getElementById(this.id))
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: 40,
          top: 90,
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
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
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
        series : this.data
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.chart-bar-container
  width:100%
  height:480px
  margin-top:-60px
</style>
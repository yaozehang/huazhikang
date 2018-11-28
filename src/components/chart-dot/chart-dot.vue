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
    xLabel: {
      default: [],
      type: Array
    },
    data: {
      default: [],
      type: Array
    },
    tooltip: {
      default: [],
      type: Array
    }
  },
  created() {
    this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    this.drawDot()
  },
  watch: {
    'data'() {
      this.drawDot()
    },
    'xLabel'() {
      this.drawDot()
    },
    'tooltip'() {
      this.drawDot()
    }
  },
  methods: {
    drawDot() {
      let myChart = echarts.init(document.getElementById(this.id))
      let that = this
      let option = {
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let name = params[0].name
            let tooltip = ''
            that.tooltip.forEach((item, idx) => {
              if (params[0].name === item.name) {
                tooltip = item.content.slice(1, item.content.length).split('/').join('<br>')
              }
            })
            return tooltip
          }
        },
        legend: {
          data: ['复查人数', '职业禁忌症','其他']
        },
        xAxis : [
          {
            type : 'category',
            data: this.xLabel,
            splitLine: {
            show: true,
            lineStyle: {
              color: '#f2f2f2'
            }
            },
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
            min: 0,
            max: 100,
            interval: 20,
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
              color: '#666',
              formatter: '{value}%'
            }
          }
        ],
        series : {
          type: 'scatter',
          symbolSize: 10,
          data: this.data,
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5
            }
          }
        }
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
.chart-dot-container
  width:100%
  height:100%
  // height:480px
  // margin-top:-60px
</style>
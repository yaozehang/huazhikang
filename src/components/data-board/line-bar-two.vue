<template>
	<div class="chart-line-container" :id="id">
	</div>
</template>

<script>
import {myColor} from './data.js'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  props: {
    // xLabel: {
    //   type: Array,
    //   default: []
    // },
    // data: {
    //   type: Array,
    //   default: []
    // }
  },
  mounted() {
    this.drawLine()
  },
  watch: {
    // 'xLabel'() {
    //   this.drawLine()
    // }
  },
  created() {
  	this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById(this.id))
      let option = {
   title: {
      left: 'center',
      y: '10',
      textStyle: {
        color: '#fff'
      }
    },
    color: '#384757',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#384757'
        }
      }
    },
    legend: {
      data: [
        {
          name: '应培训人数',
          icon: 'circle',
          textStyle: {
            color: '#7d838b'
          }
        },
        {
          name: '实际培训人数',
          icon: 'circle',
          textStyle: {
            color: '#7d838b'
          }
        },
      ],
      top: '10%',
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: ['10月-12月', '01月-03月', '04月-06月','07月-09月',],
        axisPointer: {
          type: 'shadow'
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#001d42'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#7d838b'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '人数',
        nameTextStyle: {
          color: '#7d838b'
        },
        min: 0,
        max: 50,
        interval: 10,
        axisLabel: {
          show: true,
          textStyle: {
            color: '#7d838b'
          }
        },
        axisLine: {
          show: true
        },
        splitLine: {
           show: true,
          lineStyle: {
            color: '#001d42'
          }
        }
      },
    ],
    grid: {
      top: '20%'
    },
    series: [
      {
        name: '应培训人数',
        type: 'bar',
        data: [34,26,36, 30],
        barWidth: '10%',
        barGap: '1',
        itemStyle: {
          normal: {
            color: myColor.linearOne,
          }
        }
      },
      {
        name: '实际培训人数',
        type: 'bar',
        data: [14,16,26, 20],
        barWidth: '10%',
        barGap: '1',
        itemStyle: {
          normal: {
            color: myColor.linearThree,
          }
        }
      },
    ]
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
.chart-line-container
  width:100%
  height:100%
</style>
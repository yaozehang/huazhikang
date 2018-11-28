<template>
	<div class="chart-line-container" :id="id">
	</div>
</template>

<script>
import {myColor} from './data.js'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  props: {
    // xLabel: {
    //   type: Array,
    //   default: []
    // },
    // sData: {
    //   type: Object,
    //   default: {},
    // }
  },
  mounted() {
    this.drawLine()
  },
  watch: {
    // 'data'() {
    //   this.drawLine()
    // }
  },
  created() {
  	this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById(this.id))
      var myStyle ={
        backgroundColor: '#62aeea',
        color: '#fff',
        borderRadius: 5,
        wordWrap:'break-word',
        width: 80,
        height: 60,
        lineHeight:30,
      }
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
          show: false,
          top: '10%',
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['2017第四季度', '2018第一季度', '2018第二季度','2018第三季度',],
            // data: ['2017-10月-12月', '2018-01月-03月', '2018-04月-06月','2018-07月-09月',],
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
              show: false,
              rotate: 45,
              textStyle: myStyle
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '次数',
            min: 0,
            max: 12,
            interval: 6,
            show: true,
            nameTextStyle: {
              color: '#fff'
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
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
            name: '应培训次数',
            type: 'bar',
            // data: this.sData.one,
            data: [9,6,11, 10],
            barWidth: '20%',
            // barGap: '1',
            itemStyle: {
              normal: {
                color: myColor.linearThree,
              }
            }
          },
          {
            name: '实际培训次数',
            type: 'bar',
            // data: this.sData.two,
            data: [7,8,10,11],
            barWidth: '20%',
            // barGap: '1',
            itemStyle: {
              normal: {
                color: myColor.linearFour,
              }
            },
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
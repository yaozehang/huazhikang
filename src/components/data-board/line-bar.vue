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
    XDataT: Array,
    sData:Object,
    max:Number
  },
  mounted() {
    this.drawLine()
  },
  watch: {
    'XDataT'() {
      this.drawLine()
    },
    'max'() {
      this.drawLine()
    },
     'sData'() {
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
      show: true,
      top: '10%',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: this.XDataT,
        // data: ['2017第四季度', '2018第一季度', '2018第二季度','2018第三季度'],
        axisPointer: {
          type: 'shadow'
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: '#001d42'
          }
        },
        axisLabel: {
          show: true,
          // rotate: 20,
          textStyle: {
            color: '#fff'
          },
           interval: 0,  
           formatter:function(value)  {   
               var ret = "";//拼接加\n返回的类目项  
               var maxLength = 10;//每项显示文字个数  
               var valLength = value.length;//X轴类目项的文字个数  
               var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
               if (rowN > 1)//如果类目项的文字大于3,  
               {  
                   for (var i = 0; i < rowN; i++) {  
                       var temp = "";//每次截取的字符串  
                       var start = i * maxLength;//开始截取的位置  
                       var end = start + maxLength;//结束截取的位置  
                       //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                       temp = value.substring(start, end) + "\n";  
                       ret += temp; //凭借最终的字符串  
                   }  
                   return ret;  
               }  
               else {  
                   return value;  
               }  
           }   
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '人数',
        nameTextStyle: {
          color: '#fff'
        },
        min: 0,
        max: this.max,
        splitNumber: 10,
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
           show: false,
          lineStyle: {
            color: '#001d42'
          }
        }
      },
      {
        type: 'value',
        name: '合格率',
        min: 0,
        max: 100,
        interval: 25,
        show: true,
        nameTextStyle: {
          color: '#fff',
          fontSize:12,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          }
        },
        splitLine: {
           show: false,
          lineStyle: {
            color: '#001d42'
          }
        }
      }
    ],
    grid: {
      bottom: '10%'
    },
    series: [
      {
        name: '应培训人数',
        type: 'bar',
        data: this.sData.one,
        barWidth: 20,
        // barGap: '1',
        itemStyle: {
          normal: {
            color: myColor.linearOne,
          }
        }
      },
      {
        name: '实际培训人数',
        type: 'bar',
        // data: [54,66,76, 80],
        data: this.sData.two,
        barWidth: 20,
        // barGap: '1',
        itemStyle: {
          normal: {
            color: myColor.linearTwo,
          }
        }
      },
      {
        name: '合格率',
        type: 'line',
        yAxisIndex: 1,
        // data: [58,95, 65,90],
        data: this.sData.three,
        itemStyle: {
          normal: {
            color: '#b66a11'
          }
        },
        smooth: true
      }
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
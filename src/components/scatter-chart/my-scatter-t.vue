<template>
  <div class="chart-dot-container" :id="id">
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/scatter')
require('echarts/lib/chart/effectScatter')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  props: {
    // data: {
    //   default: [],
    //   type: Array
    // },
  },
   data() {
    return {
      color: '#047feb',
      data: [30,50,40,60,80,70,90]
    }
  },
  created() {
    this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    // this.drawDot()
    setInterval(this.changeColor,4000) 
    // setInterval(this.changeColorT,4000) 
  },
  watch: {
    'data'() {
      this.drawDot()
    },
    'color'(){
      this.drawDot()
    }
  },
  methods: {
    RndNum(){
    let temp = []
    let n = Math.floor(Math.random()*10)
    for(var i=0;i<n;i++)
      temp.push(Math.floor(Math.random()*30))
    return temp
  },
    drawDot() {
      let myChart = echarts.init(document.getElementById(this.id))
      let that = this
      let option = {
        tooltip: {
           trigger: 'item',
           formatter: `{c}`
       },
        legend: {
          show: false,
        },
        xAxis : [
          {
            type : 'category',
            // data: this.xLabel,
            splitLine: {
            show: false,
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
            show: false,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#047feb'
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
          type: 'effectScatter',
          symbolSize: 10,
          data: this.data,
          itemStyle: {
            normal: {
              color: this.color,
              shadowBlur: 10,
              shadowColor: this.color,
              shadowOffsetY: 5
            }
          },
          animation: true,
          animationThreshold:2000,
          animationEasing: 'cubicOut',
          animationDuration: function (idx) {
            return idx * 100             // 越往后的数据延迟越大
          },
          label: {
              show: false,
              position: 'top',
              color:'#00f6ff',
              formatter: '执行任务',
            },
        }
      }
      // myChart.showLoading()  //加载数据之前
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    changeColor(){
      this.color= '#0086fb'
      this.data.shift()
      var randomNum =  Math.floor(parseInt(Math.random()*100))  
      this.data.push(randomNum)
      this.drawDot()
    },
    changeColorT(){
      this.color= '#016ada'
      this.data= this.RndNum()
      this.drawDot()
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
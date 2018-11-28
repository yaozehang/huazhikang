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
      data: [100,20,60,40,70,50,60,20,80],
    }
  },
  created() {
    this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    // this.drawDot()
    setInterval(this.changeColor,2000)
    // setInterval(this.changeColor2,2000)
    // setInterval(this.changeData1,1000)  
  },
  watch: {
    'data'() {
      this.drawDot()
    },
  },
  methods: {
   RndNum(){
    let temp = []
    let n = Math.floor(Math.random()*10)
    for(var i=0;i<n;i++)
      temp.push(Math.floor(Math.random()*80))
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
          label: {
              show: false,
              position: 'top',
              color:'#fff',
              formatter: '发现隐患',
            },
        }
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
       // setTimeout(function() {
       //    myChart.setOption(option)
       //    window.addEventListener('resize', function() {
       //  myChart.resize()
       // })
       //  },0)
    },
    changeColor(){
      this.color= '#0086fb'
      this.data.shift()
      var randomNum = Math.floor(parseInt(Math.random()*100))
      this.data.push(randomNum)
      // this.data = this.RndNum()
      this.drawDot()
    },
    changeColor2(){
      this.color = '#04142c'
      // this.data= [90,70,60,40,70,50,60,100]
      this.data = this.RndNum()
      this.drawDot()
    },
    changeData1(){
      this.data= [100,70,60,50,90]
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
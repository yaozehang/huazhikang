<template>
  <div class="chart-radar-container">
     <div :id="id" class="chart-radar" @click="emitClick"></div>
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/radar')
require('echarts/lib/component/tooltip')

export default {
  props: {
    radarData: Object,
    lengendData: Array,
  },
  data () {
    return {
      id: '',
      indicator: [],
      datas: [],
      // lengendData:['2017第四季度', '2018第一季度','2018第二季度','2018第三季度']
    }
  },
  created() {
    this.id = 'chart-radar' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    this.drawRadar()
  },
  watch: {
    'lengendData'() {
      this.drawRadar()
    },
    'radarData'(){
      this.drawRadar()
    }
  },
  methods: {
    drawRadar: function() {
      var indicator = [
        {name: '隐患处理时长', max: this.radarData.max[0]},
        {name: '隐患总数', max: this.radarData.max[1]},
        {name: '隐患已经完成', max: this.radarData.max[2]},
        {name: '巡检已经完成 ', max: this.radarData.max[3]},
        {name: '巡检已经完成', max: this.radarData.max[4]},
        ]
      var icon1 = 'image://static/data/year-01.png'
      var icon2 = 'image://static/data/year-02.png'
      var icon3 = 'image://static/data/year-03.png'
      var icon4 = 'image://static/data/year-04.png'
      var myStyle = {
        color: '#fff',
        borderRadius: 5,
        wordWrap:'break-word',
        width: 80,
        height: 80,
        lineHeight:80,
        // rotate:45
      }
      let myChart = echarts.init(document.getElementById(this.id))
      let option = {
        tooltip: {
        },
        legend: {
          show: true,
          orient:'vertical',
          left: -5,
          top: '0px',
          itemHeight: 80,
          itemWidth:0,
          align: 'left',
          itemGap:0,
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        //   formatter:  function(name){
        //     let  temp = name.split(',')
        //     let left = temp.splice(0,3)
        //     let right = temp.splice(4,8)
        //     var arr = [left,right]
        //     let str = `${left} <br/> ${right}`
        //     return str
        // },
          data:[
          { name:this.lengendData[0],
            icon:icon1,
            textStyle:myStyle
          },
          { name:this.lengendData[1],
            icon:icon2,
            textStyle:myStyle
          },
          { name:this.lengendData[2],
            icon:icon3,
            textStyle:myStyle
          },
          { name:this.lengendData[3],
            icon:icon4,
            textStyle:myStyle
          },
          ]
          // data: ['2017-10-12', '2018-01-03','2018-04-06','2018-07-09']
        },
        radar: [
          {
            indicator: indicator,
            center: ['60%', '50%'],
            radius: '75%',
            startAngle: 90,
            splitNumber: 5,
            shape: 'circle',
            backgroundColor: '#03315d',
            name: {
              // formatter: '{value}',
              textStyle: {
                color: '#fff',
                fontSize: 14,
                align: 'center'
              },
              formatter:function(value)  {  
               var ret = "";//拼接加\n返回的类目项  
               var maxLength = 4;//每项显示文字个数  
               var valLength = value.length;//X轴类目项的文字个数  
               var rowN = 2 
               if (rowN > 1) {  //如果类目项的文字大于3,
                 for (var i = 0; i < rowN; i++) {  
                     var temp = "";//每次截取的字符串  
                     var start = i * maxLength;//开始截取的位置  
                     var end = start + maxLength;//结束截取的位置  
                     //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                     temp = value.substring(start, end) + "\n";  
                     ret += temp; //最终的字符串  
                 }  
                   return ret;  
               } else {  
                 return value;  
               }  
           } 
            },
            nameGap: 2,
            splitArea: {
              areaStyle: {
                color: ['#03315d'],
                shadowColor: '#03315d',
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: '#7a9cb2'
              }
            },
            axisLabel:{
              margin:2,
              width : 60,
              lineHeight:20,  
              align: 'center'
            },
            splitLine: {
              lineStyle: {
                width : 1,
                color : '#183e62' // 图表背景网格线的颜色
              }
            }
          }
        ],
        series: [
          {
            name: '任务处理',
            type: 'radar',
            // itemStyle: {
            //   normal: {
            //     color: 'rgb(238, 197, 102)'
            //   }
            // },
            data: [
             {
              value : this.radarData.one,
              name: this.lengendData[0],
              // totalNumber:1000
              textStyle:myStyle,
              itemStyle: {
                normal: {
                    color : "#5cd870" // 图表中各个图区域的边框线拐点颜色
                }
              }
            },
            {
            value : this.radarData.two,
            name: this.lengendData[1],
              textStyle:myStyle,
            // totalNumber:1000,
            itemStyle: {
              normal: {
                  color : "#cb9478"   // 图表中各个图区域的边框线颜色
              }
            }
            },
            {
              value : this.radarData.three,
              name: this.lengendData[2],
              // totalNumber:1000,
              textStyle:myStyle,
              itemStyle: {
                normal: {
                    color : "#647e64" // 图表中各个图区域的边框线拐点颜色
                }
              }
            },
            {
            value : this.radarData.four,
            name: this.lengendData[3],
            // totalNumber:1000,
            textStyle:myStyle,
            itemStyle: {
              normal: {
                  color : "#5ddedf"   // 图表中各个图区域的边框线颜色
              }
            }
            },
            ]
          }
        ]
      }
       // myChart.showLoading()  //加载数据之前
      myChart.setOption(option)
      // myChart.hideLoading()
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    emitClick() {
      this.$emit('onclick', 1)
    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.chart-radar-container
  position:relative
  width:100%
  height:100%
.chart-radar
  width:100%
  height:100%
.chart-radar:after
  content: ''
  display:block
  background-image: linear-gradient(270deg,transparent 25%, rgba(0,162,255,0.1) 50%, rgba(0,162,255,0.2) 75%, rgba(0,162,255,0.4) 100%)
  width: 135px
  height: 135px
  position: absolute
  top: 40px
  right: 70px
  animation: radar-beam 4s infinite
  animation-timing-function: linear
  transform-origin: bottom left
  border-radius: 0 100% 0 0
  z-index:22

@keyframes radar-beam
  0%
    transform:rotate(0deg)
  100%
    transform:rotate(360deg)
</style>
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
    data:{
      type: Object,
      default: {
        one: [],
        two: [],
        three:[]
      }
    },
    sData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      lengndData: []
    };
  },
  mounted() {
    this.drawLine()
  },
  watch: {
    'xLabel'() {
      this.drawLine()
    },
    'data'() {
      this.drawLine()
    }
  },
  created() {
  	this.id = 'chart' + (Math.random() + '').replace('.', '_')
    let temp =[]
    this.sData.map((item,index) =>{
      temp.push({name:item,icon: 'circle' })
    })
    this.lengndData =temp
  },
  methods: {
    drawLine() {
      let myChart = echarts.init(document.getElementById(this.id))
      let option = {
        title: {
          text: 'mg/m3'
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
          right: 20,
          top: 10,
          data:this.lengndData,
          textStyle:{
            color: '#fff'
          }
        },
        grid: {
          left: '1%',
          right: '1%',
          bottom: '2%',
          containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            // name: '月份',
            boundaryGap: ['10%', '10%'],
            splitLine:{
              show:false,
            },
            margin: 1,
            // position: 'right', 
            axisLine:{
              show: true,
              lineStyle:{
                color:'#fff'
              }
            },          
            axisLabel: {
              // rotate: 45,
              fontSize: 10,
              fontWeight: 'normal',
              textStyle: {
                color: '#fff',//坐标值得具体的颜色
              }
            },
            data: this.xLabel,
        },
        yAxis: {
          name: 'db',
          type: 'value',
          splitNumber: 5,
          splitLine:{
             show:false,
          },
          axisLine:{
            show: true,
              lineStyle:{
                color:'#fff'
              }
            },
          axisLabel: {
            textStyle: {
              color: '#fff',//坐标值得具体的颜色
            }
            },
        },
        series: [
            {
              name: this.sData[0],
              type:'line',
              stack: '总量',
              color: '#4fbc6c',
              data: this.data.one
              // data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: this.sData[1],
              type:'line',
              stack: '总量',
              color: '#59d6db',
              data: this.data.two
              // data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:this.sData[2],
              type:'line',
              stack: '总量',
              color: '#d6d76e',
              data: this.data.three,
              // data:[150, 232, 201, 154, 190, 330, 410]
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
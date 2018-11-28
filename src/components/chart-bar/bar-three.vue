<template>
  <div class="chart-bar-container" :id="id">
  </div>
</template>

<script>
// import echarts from 'echarts'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pictorialBar')
// require('echarts/lib/chart/pictorialBar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title');

export default {
  props: {
    xLabel:Array,
    data:Array,
  },
  data(){
    return {
      barGap: '20%'
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
    },
    'xLabel'(){
      this.drawBar()
    },
    'barGap'(){
      this.drawBar()
    }
  },
  methods: {
    drawBar() {
      if(this.xLabel.length>1){
      this.barGap = '-80%'
      }else if(this.data.length ===1){
        this.barGap = '20%'
      }
      let myChart = echarts.init(document.getElementById(this.id))
      var fillImg = 'image://static/data/column-2.png'
//    let xLabel = ['噪声', '粉尘','一氧化碳', '化学'],
//     data = [300,700,500,600]
      let option = {
          title: '',
          grid: {
              top: '15%',
              left: '15%',
            // right: '1%',
            // bottom: '15%',
              containLabel: true
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'none'
              },
              formatter: '{b}: {c}人',
          },
          xAxis: {
              type: 'category',
              show: true,
              data: this.xLabel,
              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              }
              }
          ,
          yAxis: {
            name: '人数',
            show: true,
            offset: 52,
            splitNumber: 4,
            splitLine: {
              show: false,
              lineStyle: {
                  color: "rgba(255,255,255,0.2)"
              }
            },
            nameTextStyle:{
              color: '#fff'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true
            },
            axisLabel: {
              show: true,
              color: '#fff'
            }
          },
          color: '#e54035',
          series: {
            name: '危害因素',
            type: 'pictorialBar',
            barCategoryGap: this.barGap,
            // barCategoryGap: '-5%',
            symbol: 'triangle',   
            // symbol: 'path://d="M150 50 L130 130 L170 130  Z"',   //三角形
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = [
                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
                    'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)'
                  ];
                  return colorList[params.dataIndex];
                }
              },
              emphasis: {
                 opacity: 1
              }
            },
            label: {
              show: true,
              position: 'top',
              color:'#fff',
              formatter: '{c}人',
            },
            data: this.data,
              },
        
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
.chart-bar-container
  width:100%
  height:100%
</style>
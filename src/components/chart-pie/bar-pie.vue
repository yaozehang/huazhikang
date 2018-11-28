<template>
  <div class="chart-bar-container" :id="id">
  </div>
</template>

<script>
// import echarts from 'echarts'
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pictorialBar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title');

export default {
    props: {
    pieData: {
      type:Number,
      default: 0
    }
  },
  data(){
    return {
      barGap: '10%',
      fillImg:'image://static/imgs/green.png'
    }
  },
  created() {
    this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    this.drawBar()
  },
  watch: {
    'pieData'() {
      if(this.pieData == 0){
        this.fillImg = 'image://static/imgs/green.png'
      }else{
        this.fillImg = 'image://static/imgs/red.png'
      }
      this.drawBar()
    },
  },
  methods: {
    drawBar() {
      let myChart = echarts.init(document.getElementById(this.id))
      let standard = 3, total = 6
      console.log(this.pieData)
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
              formatter: '{a}',
          },
          xAxis: {
            type: 'category',
            show: false,
              },
          yAxis: {
            name: '值',
            show: false,
            offset: 52,
            splitNumber: 4,
            splitLine: {
              show: false,
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
            name: '风险值3',
            type: 'pictorialBar',
            barCategoryGap: this.barGap,
            symbol: this.fillImg,   
            // symbol: 'path://d="M150 50 L130 130 L170 130  Z"',   //三角形
            // itemStyle: {
            //   normal: {
            //     color: function(params) {
            //       let colorList = [
            //         'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
            //         'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)',
            //         'rgba(13,177,205,0.8)', 'rgba(29,103,182,0.6)'
            //       ];
            //       return colorList[params.dataIndex];
            //     }
            //   },
            //   emphasis: {
            //      opacity: 1
            //   }
            // },
            label: {
              show: true,
              position: 'top',
              color:'#fff',
              formatter: '{c}',
            },
            data: [6],
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
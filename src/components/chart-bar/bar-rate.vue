<template>
  <div class="chart-bar-container" :id="id">
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')

export default {
  props: {
    xLabel: {
      default: [],
      type: Array
    },
    data: {
      default: [],
      type: Array
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
    }
  },
  methods: {
    drawBar() {
      var myColor=['#53509a','#16944e'];
      let myChart = echarts.init(document.getElementById(this.id))
      let  option = {
        tooltip: {
            show: false
        },
        grid: {
            top: '20%',
            left: '1%',
            right: '1%',
            bottom: '15%',
        },
        xAxis: {
          type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false,
              color: '#fff',
              fontSize: 14
            }
        },
        yAxis: {
           type: 'category',
            data: ['2017', '2018'],
            // offset: -15,
            splitLine: {
              show: false
            },
            axisTick: {
               show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#fff',
              show: false
            }
        },
        series: [{
            type: 'bar',
            label: {
                show: true,
                 position: ['2%', '80%'],
                // position: 'top',
                padding: 2,
                color: '#fff',
                fontSize: 14,
                formatter: `{b}:{c}%`
            },
            itemStyle: {
               normal: {
                  show: true,
                  color: function(params) {
                    var num=myColor.length;
                    return myColor[params.dataIndex%num]
                  },
                  barBorderRadius: 20,
                  borderWidth: 2,
                  borderColor: '#333',
               }
              },
            barWidth: '30%',
            barGap: '30%',
            data: [49, 80],
            z: 10
        }, {
            type: 'bar',
            barGap: '-100%',
            itemStyle: {
                color: '#011020',
                // opacity: 0.05
            },
            barWidth: '30%',

            data: [100, 100],
            z: 5
        }],
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
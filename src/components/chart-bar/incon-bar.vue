<template>
  <div class="chart-bar-container" :id="id">
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pictorialBar')
require('echarts/lib/component/tooltip')

export default {
  props: {
    titlename:Array,
    sData:Array,
  },
  created() {
    this.id = 'chart' + (Math.random() + '').replace('.', '_')
  },
  mounted() {
    this.drawBar()
  },
  watch: {
    'titlename'() {
      this.drawBar()
    },
    'sData'() {
      this.drawBar()
    }
  },
  methods: {
    drawBar() {
      let myChart = echarts.init(document.getElementById(this.id))
      // var sData = [70, 34]
      // var titlename = ['2017', '2018']
      var myColor = ['#534f9b', '#16934f','#3af6a3']
let option = {
    xAxis: {
        show: false
    },
    legend:{
      show: false,
      orient:'horizontal',
      top: 20,
      left:20,
    },
    yAxis:{
        show: true,
        data: this.titlename,
        inverse: true,
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#fff',
            nameLocation:'end',
            margin: 10,
            // rotate: 45,
            fontSize: 10,
            fontWeight: 'normal',
            rich: {
                lg: {
                    backgroundColor: '#339911',
                    color: '#fff',
                    borderRadius: 15,
                    // padding: 5,
                    align: 'center',
                    width: 15,
                    height: 15
                },
            }
        },
    },
    grid: {
        left: '25%'
      },
    series: [{
        name: '条',
        type: 'bar',
        barGap: '1%',
        data: this.sData,
        barWidth: '15px',
        itemStyle: {
          normal: {
            barBorderRadius: 10,
            color: function(params) {
              var num = myColor.length;
              return myColor[params.dataIndex % num]
            },
          }
        },
        label: {
          normal: {
            show: true,
            position: 'end',
            // position: ['50%', '20%'],
            color: '#fff',
            formatter: '{c}%'
          }
        },
    }, {
        name: '框',
        type: 'bar',
        barGap: '-100%',
        data: [100, 100,100],
        barWidth: '15px',
        itemStyle: {
          normal: {
            color: 'none',
            borderColor: '#324251',
            borderWidth: 2,
            barBorderRadius: 10,
          }
        }
    }, ]
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
.chart-bar-container
  width:100%
  height:100%
</style>
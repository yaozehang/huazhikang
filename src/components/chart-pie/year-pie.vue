<template>
  <div :id="id" class="chart-pie">
  </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
let random = (Math.random() + '').replace('.', '_')

export default {
  props: {
    dataList: Array,
    lengendData: Array,
    // title: {
    //   default: '',
    //   type: String
    // }
  },
  data () {
    return {
      id: 'chart' + random,
      // lengendData:['2017总人数', '2017实际人数','2018总人数', '2018实际人数',]
    }
  },
  mounted() {
    this.drawPie()
  },
  watch: {
    'lengendData'(){
      this.drawPie()
    },
    'dataList'() {
      this.drawPie()
    }
  },
  methods: {
    drawPie: function() {
      let myChart = echarts.init(document.getElementById(this.id))
      let option = {
       // backgroundColor: '#0a1235',
       tooltip: {
           trigger: 'item',
           formatter: `{b} <br/>{c}人`
       },
       legend: {
          show:true,
          x: 'center',
          y: '70%',
          orient: 'vertical',
          // width:100, 
          itemWidth: 16,
          itemHeight: 16,
          data:[
          { name:this.lengendData[0],
            icon:'triangle'
          },
          { name:this.lengendData[1],
            icon:'triangle'
          },
          { name:this.lengendData[2],
            icon:'triangle'
          },
          ],
          textStyle: {
            color: '#fff',
            fontSize: 14,
          }
       },
       calculable: true,
       series: [{
           name: '',
           type: 'pie',
           //起始角度，支持范围[0, 360]
           startAngle: 0,
           //饼图的半径，数组的第一项是内半径，第二项是外半径
           radius: [0, 90],
           //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
           center: ['45%', '35%'],
           //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
           // 'radius' 面积展现数据的百分比，半径展现数据的大小。
           //  'area' 所有扇区面积相同，仅通过半径展现数据大小
           roseType: 'area',
           //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
           avoidLabelOverlap: false,
           label: {
             normal: {
               show: true,
               position: 'inside',
               formatter: '{c}人'
             },
             emphasis: {
               show: true
             }
           },
           labelLine: {
             normal: {
               show: true,
               length2: 1,
             },
             emphasis: {
              show: true
             }
           },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200
            },
           data: [{
             value: this.dataList[0],
             name: this.lengendData[0],
             itemStyle: {
              normal: {
                color: '#1d58a0'
               }
             }
            },
            {
             value: this.dataList[1],
             name: this.lengendData[1],
             itemStyle: {
               normal: {
                 color: '#3a76bf'
               }
             }
            },
            {
             value: this.dataList[2],
             name: this.lengendData[2],
             itemStyle: {
               normal: {
                  color: '#2b6f6a'
               }
             }
            },
           ]
        }]
      };
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
};
</script>

<style lang="css" scoped>
  .chart-pie{
    width: 100%;
    height:100%;
  }
</style>
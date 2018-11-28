<template>
  <div class="line-container clearfix">
    <!-- 查询条件  {{typeName}}  hid   hname-->
    <div class="my-form">
    <el-form :inline="true" :model="Form" class="demo-form-inline" label-width="80px" >
       <div class="form-items">
        <span class="my-harm-type"> {{typeName}}危害因素</span>
         <el-form-item label="名称" >
            <el-select v-model="Form.harm" >
              <el-option v-for="(item,index) in myHarmList" :key="item.hid"  :label="item.hname" :value="item.hid">
              </el-option>
            </el-select>
         </el-form-item>
          <el-form-item label="评测对象" >
            <el-select v-model="Form.test"  @change="">
              <el-option v-for="(item,index) in myLenged" :key="item"  :label="item" :value="item">
              </el-option>
            </el-select>
         </el-form-item>
        <el-form-item label="" >
            <el-button type="primary" @click="changeData(Form.harm,Form.test)"> 查询 </el-button>
         </el-form-item>
       </div>
    </el-form>
  </div>
<!-- 折线图 -->
  <div class="my-line" v-loading="loading">
    <div class="chart-line-container" :id="id"></div> 
  </div>  
  </div>
</template>

<script>
import echarts from 'echarts'
var  intervalNum
var xdata =[]
export default {
  data() {
    return {
      type: '',
      curIndex: -1,
      dataWarm: 3,
      xData: [],
      intervalNum: 2,
      lengthD: 0,
    }
  },
  props: {
    myLenged:{
      type: Array,
      default: []
    },
    myHarmList: Array,
    Form: Object,
    typeName: String,
    xAxisData: Array,
    seriesData: Array,
    point: Number,
    loading: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: 5,
    },
    title: String
  },
  mounted() {
    this.intervalNum = (this.max / 20).toFixed(2)
    this.drawLine()
  },
  watch: {
    'xLabel'() {
      this.drawLine()
    },
    'Form.harm'(){
      this.drawLine()
    },
    'Form.test'(){
      this.drawLine()
    },
    'seriesData'(){
     this.drawLine()
    },
    'xAxisData'() {
      this.drawLine()
    },
    'max'(){
      this.intervalNum = (this.max / 20).toFixed(2)
      this.drawLine()
    },
    'point'(){
      this.drawLine()
    },
    'title'(){
      this.drawLine()
    }
  },
  created() {
  	this.id = 'chart' + (Math.random() + '').replace('.', '_')
    this.pointData = []
  },
  methods: {
    getArray(a) {
      var temp = []
      for(let i = 0; i <21; i++){ 
         temp.push( ((a/20)*i).toFixed(2))
      }
      return temp 
    },
    getPoint(){
      let temp = []
      for(let i = 0;i<this.seriesData.length+1;i++){
       temp.push(this.point)
      }
      return temp
    },
    drawLine() {
      console.log(this.pointData)
      const _that = this
      _that.intervalNum = this.intervalNum
      _that.max = this.max
      _that.title = this.title
      let myChart = echarts.init(document.getElementById(this.id))
      let option = {
        title: {
          show:false,
          text: this.title,
          subtext: '',
          align: 'left',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData,
          splitLine: {
            show: true,
          },
        },
        yAxis: {
          type: 'value',
          max:  _that.max,
          min: 0,
          axisLine: {
            show: true
          },
          splitLine: {
            show: true,
          },
          axisLabel: {
             formatter: `{value}${this.title}`
          },
          splitNumber: 20,
        },
        series: [
          {
            name:`${this.Form.test}`,
            type:'line',
            data: this.seriesData,
            lineStyle: {
              color: '#37a8f5',
              type: 'solid'
            },
            // markLine: {
            //   silent: true,
            //   itemStyle:{
            //     normal:{lineStyle:{type:'solid',color:'red'},
            //     label:{
            //       show:true,
            //       position:'end',
            //       formatter:this.point
            //     }}
            //     },
            //   data: [
            //     [
            //       {name: '标线1起点', value:this.point, xAxis:0, yAxis: this.point},   
            //       {name: '标线1终点', xAxis: this.xAxisData[parseInt(this.xAxisData.length)-1], yAxis: this.point},             
            //     ],
            //   ]
            // }
          },
           {
            name:'接触限值',
            type:'line',
            data: this.getPoint(),
            lineStyle: {
              color: 'red',
              type: 'solid'
            },
          },
        ]
    }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    },
    changeData(item,item2){
      this.$emit('changeData', item, item2)
    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.chart-line-container
  width:100%
  height:530px
  margin-top:10px
</style>
<style scoped>
  .line-container{
    height: 600px;
    margin-bottom: 30px;
  }
  .change-btns{
    width: 400px;
    margin: 0 auto;
  }
  .my-form{
    width: 80%;
    margin:  0 auto;
  }
  .my-harm-type{
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
</style>
<template>
  <div class="main-content">
    <!-- 搜索框 -->
    <ul class="search-container">
      <li class="input-group">
          <span class="title">选择年份</span>
          <el-date-picker v-model="selectParams.year" type="year" placeholder="选择年" value-format="yyyy"></el-date-picker>
          <el-button type="primary" @click="_getAnlysisData" style="margin-left:30px">查询</el-button>
      </li>
     </ul>
    <!-- 表格标题 -->
    <table-title :title="'巡检统计分析图'"></table-title>
    <!-- 图表 -->
    <div class="chart-container">
      <div class="title">巡检统计</div>
      <chart-bar :xLabel="xLabel1" :data="data1"></chart-bar>
      <ul class="legend-container">
         <li class="legend"><i class="box blue"></i><span class="text">总数</span></li>
         <li class="legend"><i class="box orange"></i><span class="text">已完成</span></li>
         <li class="legend"><i class="box grey"></i><span class="text">逾期</span></li>
         <li class="legend"><i class="box yellow"></i><span class="text">未完成</span></li>
      </ul>
    </div>
    <div class="chart-container">
      <div class="title">逾期统计</div>
      <chart-bar :xLabel="xLabel2" :data="data2"></chart-bar>
      <ul class="legend-container">
         <li class="legend"><i class="box blue"></i><span class="text">岗位</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import chartBar from 'components/chart-bar-v/chart-bar-v'

import {getDate} from 'common/js/time'
import {getAnlysisData} from 'api/poling'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
import {getAllId} from 'common/js/allpid'
import qs from  'qs'

export default {
  data () {
    return {
      selectParams: {
        year: '',
        allPId: getAllId()
      },
      xLabel1: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      xLabel2: [],
      data1: [],
      data2: []
    }
  },
  created() {
    this.selectParams.year = getDate().year.toString()
    this._getAnlysisData()
  },
  methods: {
    _getAnlysisData() {
      getAnlysisData(qs.stringify(this.selectParams)).then((res) => {
        this.formatData1(res.listOne)
        this.formatData2(res.listTwo)
      })
    },
    formatData1(obj) {
      let dataList = [obj.total, obj.finish, obj.overdue, obj.notFinish]
      let colorList = ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000']
      let nameList = ['总数', '已完成', '逾期', '未完成']
      this.data1 = []
      dataList.forEach((item,idx) =>{
        this.data1.push({
          name: nameList[idx],
          type: 'bar',
          data: dataList[idx],
          itemStyle: {
            color: colorList[idx]
          }
        })
      })
    },
    formatData2(obj) {
      this.xLabel2 = obj.x
      this.data2 = []
      this.data2.push({
        name: '逾期统计',
        type: 'bar',
        data: obj.y,
        itemStyle: {
          color: '#5b9bd5'
        }
      })
    }
  },
  components: {
    chartBar,
    tableTitle
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.main-content
  margin-top:20px
  border-top:1px solid $color-border
  .search-container
    padding:20px 0 30px 0
    li
      height:40px
      line-height:40px
      margin-bottom:20px
      font-size:0
      &:last-child
        margin-bottom:0
      &.input-group
        .title
          display:inline-block
          text-align:left
          margin-right:20px
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:40px
  .chart-container
  	height:615px
  	width:100%
  	border:1px solid $color-border
  	margin-top:20px
  	box-sizing:border-box
  .chart-container .title
    width:100%
    height:90px
    line-height:90px
    text-align:center
    font-size:$font-size-large-x
  .chart-container .legend-container
    width:100%
    height:120px
    text-align:center
    li.legend
      display:inline-block
      height:20px
      line-height:20px
      margin-top:50px
      margin-right:30px
      i.box
        display:inline-block
        width:20px
        height:20px
        margin-right:15px
        &.blue
          background-color:#5b9bd5
        &.orange
          background-color:#ed7d31
        &.grey
          background-color:#a5a5a5
        &.yellow
          background-color:#ffc000
    li.legend .text
      display:inline-block
      height:20px
      vertical-align:top
</style>
<template>
  <div class="main-content">
    <div class="card-container">
    <!-- 搜索框 -->
    <el-row class="search-form clearfix" :gutter="20">
      <el-col :span="12">
    <el-card>
    <ul class="search-container" >
      <li class="input-group">
        <span class="title">姓名</span>
        <el-select placeholder="请选择" v-model="personId" class="inner-input" filterable @change="selectName" :disabled="personOptions.length===1">
          <el-option v-for="item in personOptions" :key="item.userId" :label="item.username" :value="item.userId"></el-option>
        </el-select>
      </li>
      <li class="input-group">
         <span class="title">性别</span>
         <el-input class="inner-input" v-model="Info.sex" readonly></el-input>
      </li>
      <li class="input-group">
         <span class="title">年龄</span>
         <el-input class="inner-input" v-model="Info.age" readonly></el-input>
      </li>
      <li class="input-group">
        <span class="title">身份证号</span>
        <el-input class="inner-input" v-model="Info.idCard" readonly></el-input>
      </li>
    </ul>
    </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
      <ul class="search-container" >
        <li class="input-group">
          <span class="title">分区</span>
          <el-input class="inner-input" v-model="Info.position" readonly></el-input>
        </li>
        <li class="input-group">
            <span class="title">工种</span>
            <el-input class="inner-input" v-model="Info.jobType" readonly></el-input>
        </li>
        <li class="input-group">
            <span class="title">体检状态</span>
            <el-input class="inner-input"  v-model="Info.status" readonly></el-input>
        </li>
        <li class="input-group">
            <span class="title">阳性结果</span>
            <el-input class="inner-input" v-model="Info.result" readonly></el-input>
        </li>
      </ul>
    </el-card>
    </el-col>
    </el-row>
    <el-row class="chart-container">
    	<el-col tag="section" :span="16" class="left-chart">
         <div class="tip" v-show="isObject">观察对象</div>
         <chart-line :xLabel="xLabel" :data="lineData"></chart-line>
      </el-col>
      <el-col tag="section" :span="2" class="left-chart"></el-col>
    	<el-col tag="section" :span="6" class="right-chart">
        <div class="bar-lengend">风险值3</div>
        <div class="pie-container">
           <!-- <chart-pie :data="pieData"></chart-pie> -->
           <bar-pie :pieData="pieData"></bar-pie>
        </div>
        <div class="bar-footer">最近4次的综合值</div>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import chartLine from 'components/chart-line/chart-line'
import chartPie from 'components/chart-pie/chart-pie'
import barPie from 'components/chart-pie/bar-pie'

import {getUserList, getHealthCardData} from 'api/card'
import getUserInfo from 'common/js/user'

const STANDARE_COUNT = 15

let lineData = [
  {
      name:'风险值1',
      type:'line',
      data:[],
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#009b2f'
      }
  },
  {
      name:'风险值2',
      type:'line',
      data:[],
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#4e99f3'
      }
  },
  {
      name:'标准值',
      type:'line',
      data:[],
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        color: '#f00'
      }
  }
]

export default {
  data () {
    return {
      personOptions: [{value: '1', label: '1'}],
      Info: {
        position: '',
        status: '',
        idCard: '',
        age: '',
        jobType: '',
        result: ''
      },
      xLabel: ['周一','周二','周三','周四','周五','周六','周日'],
      lineData: lineData,
      pieData: 0,
      isObject: false,
      personId: ''
    }
  },
  created() {
    this.userId = getUserInfo().userId
    this.roleId = getUserInfo().roleId
    this.cpId = getUserInfo().cpId
    this._getUserList()
  },
  methods: {
    //cpId档案id null为纯管理者 现请求下拉框 默认第一个人
    _getUserList() {
      let data = {
        userId: this.userId,
        roleId: this.roleId
      }
      getUserList(data).then((res) => {
        if (res.status === 1) {
          this.personOptions = res.data
          if (this.cpId) {
            this.personId = this.cpId
          } else {
            this.personId = res.data[0].userId
          }
          this.$nextTick(() => {
            this._getHealthCardData()
          })
        }
      })
    },
    _getHealthCardData() {
      getHealthCardData({personId: this.personId}).then((res) => {
        if (res) {
          // 输入框赋值
          this.Info = res
          this.isObject = res.flag
          // 折线图
          let arr1 = [], arr2 = [], arr3 = [], arr4 = []
          res.chartOne.forEach((item, idx) => {
            arr1.push(item.date)
            arr2.push(item.danger1 > 30 ? 30 : item.danger1)
            arr3.push(item.danger2 > 30 ? 30 : item.danger2)
            arr4.push(STANDARE_COUNT)
          })
          this.xLabel = arr1
          this.lineData[0].data = arr2
          this.lineData[1].data = arr3
          this.lineData[2].data = arr4
          // 饼图
          // this.pieData = 3
          this.pieData = res.preWarn > 6 ? 6 : res.preWarn
          console.log(this.lineData,this.pieData)
        } else {
          this.Info = {}
        }
      })
    },
    selectName(data) {
      this.userId = data
      this.$nextTick(() => {
        this._getHealthCardData()
      })
    }
  },
  components: {
    tableTitle,
    chartLine,
    chartPie,
    barPie
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">

@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.main-content
  margin-top: 20px
  border-top: 1px solid #004a9d
  .search-container
    width:400px
    padding: 20px 20px 20px 30px
    font-size:0
    li
      display:inline-block
      height:40px
      width:400px
      line-height:40px
      margin-bottom:20px
      font-size:0
      &.input-group
        .title
          width:90px
          display:inline-block
          text-align:left
          margin-right:10px
          font-size:$font-size-medium-x
        .inner-input
          width:240px
  .chart-container
    height:560px
    width:100%
    border:1px solid $color-border
    border-radius(5px)
    .left-chart,.right-chart
      height:100%
      display:inline-block
    .left-chart
      position:relative
      border-right:1px solid $color-border
      .tip
        position: absolute
        right: 20px
        top: 30px
        font-size:32px
        color: red
    .right-chart
      position:relative
      .pie-container
        position:absolute
        left:50%
        top:56%
        width:278px
        height:350px
        margin-top:-200px
        margin-left:-139px
</style>
<style lang="css" scoped>
.card-container{
  width: 1000px;
  margin:  0 auto;
}
.search-form{
  width: 950px;
  margin: 40px auto;
}
.search-container{
  float: left;
}
.search-form .search-container:nth-child(1){
  margin-right: 30px;
}
.bar-lengend{
width: 80px;
height: 36px;
line-height: 36px;
position: absolute;
top: 8%;
left: 35%;
}
.bar-footer{
  width: 150px;
  height: 36px;
  line-height: 36px;
  border-radius: 20px;
  border: 1px solid #ccc;
  text-align: center;
  position: absolute;
  top: 90%;
  left: 25%;
}
</style>
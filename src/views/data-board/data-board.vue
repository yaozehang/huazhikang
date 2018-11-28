<template>
  <div class="data-board">
    <div class="my-header">
      <my-header></my-header>
    </div>
    <div class="data-container clearfix">
      <div class="left-container">
        <!-- 危害因素 Harm2-->
        <div class="harm-content"  :style="{backgroundImage:'url(static/data/W490-H500.png)'}">
          <h3 class="content-title" :style="{backgroundImage:'url(static/data/Harm2.png)'}">
           <p class="title-word">危害因素</p>  
          </h3>
          <div class="bar-chart" v-loading="loadingHarm"  element-loading-text="数据加载中" 
           element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.5, 0.6, 0.8)">
            <bar-three :xLabel="barOne.xLabel" :data="barOne.yData"></bar-three>
            <!-- <bar-one :xLabel="barOne.xLabel" :data="barOne.yData"></bar-one> -->
          </div>
          <div class="bar-title">车间涉及危害因素</div>
    <!--       <div class="line-chart">
            <stack-line :xLabel="lineOne.xLabel" :data="lineOne.data" :sData="lineOne.sData"></stack-line>
          </div> -->
      <!--     <div class="type-harm"> 
            <el-radio-group v-model="hazard.harmType" @change="harmTypeChange" >
              <el-radio :label="1" >噪音</el-radio>
              <el-radio :label="2" >粉尘</el-radio>
              </el-radio-group>
          </div> -->
        </div>
         <!-- 体检记录 -->
        <div class="test-record" :style="{backgroundImage:'url(static/data/W490-H450-Septum.png)'}">
          <h3 class="content-title" :style="{backgroundImage:'url(static/data/Harm2.png)'}">
            <p class="title-word">体检记录</p>  
          </h3>
          <ul class="record-content clearfix" v-loading="loadingTask"  element-loading-text="数据加载中" 
           element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.5, 0.6, 0.8)">
            <li class="year-record">
              <year-pie :dataList="year.yearList" :lengendData="year.lengendData"></year-pie>
            </li>
            <li class="qualificate-rate">
              <!-- <p class="title-gauge">合格率</p> -->
              <div class="gauge-pie">
                <gauge-pie :numData="numData"></gauge-pie>
              </div>
              <div class="rate-bar">
                <incon-bar :titlename="rateData.titlename" :sData="rateData.sData"></incon-bar>
                <!-- <rate-bar></rate-bar> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-container">
        <ul class="top-container clearfix">
          <li class="map-content"  :style="{backgroundImage:'url(static/data/distribution.png)'}">
            <h3 class="content-title big-title" :style="{backgroundImage:'url(static/data/Harm1.png)'}">
              <p class="title-word-s"> 公司车间分布区间</p> 
            </h3>
            <div class="my-scatter">
            <div class="my-scatter-one">
                <my-scatter-t ></my-scatter-t>
            </div>
              <div class="my-scatter-two">
                 <my-scatter ></my-scatter>
              </div>
          </div>
          </li>
          <li class="law-content" :style="{backgroundImage:'url(static/data/W490-H500.png)'}" >
            <h3 class="content-title" :style="{backgroundImage:'url(static/data/Harm2.png)'}">
              <p class="title-word"> 职业卫生档案 </p> 
            </h3> 
            <ul class="list-info clearfix">
              <li class="info-item"><law-list :lawList="lawList"></law-list></li>
              <li class="info-item"><law-list :lawList="lawList2"></law-list> </li>
            </ul>
          </li>
        </ul>
        <ul class="bottom-container clearfix">
          <li class="card-content" :style="{backgroundImage:'url('+coverImgUrl+')'}"
           v-loading="loadingBig" element-loading-text="数据加载中" 
           element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.5, 0.6, 0.8)">
            <div class="card-title clearfix">
              <h3 class="content-title" :style="{backgroundImage:'url(static/data/Harm2.png)'}">
                 <p class="title-word"> {{cardTitle}}  </p> 
               </h3>
              <p class="change-item" @click="changeChart">
                <img src="static/data/Return.png" alt="">
              </p>
            </div>
            <!-- -->
            <div class="change-content">
              <div class="task-content" v-if="chartType ===0" v-loading="loadingT" element-loading-text="数据加载中"
              element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.5, 0.6, 0.8)">
                <chart-tast :radarData="radarData"  :lengendData="radarLengend"></chart-tast>
              </div>
              <div class="task-content" v-if="chartType ===1" v-loading="loadingH" element-loading-text="数据加载中"
              element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.5, 0.6, 0.8)">
                <div class="input-group" v-if="loadingH === false">
                  <span class="title">姓名</span>
                   <el-select v-model="personId"  filterable clearable placeholder="请选择" 
                     class="inner-input" @change="selectName" :disabled="personOptions.length===0">
                     <el-option v-for="item in personOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </div>
                <div class="chart-scatter" v-if="healthData.data.length!==0">
                  <chart-scatter :data="healthData.data" :xLabel="healthData.xLabel"></chart-scatter>
                </div>
                <div class="chart-scatter" v-if="healthData.data.length ===0">
                  <p class="no-data">此人暂时没有健康卡数据</p>
                </div>
       <!--          <ul class="person-list">
         <li v-for="(item,personIdx) in personList" :key="personIdx" @click="changePerson(item,personIdx)"
         v-bind:class=" personIdx === curIndex ? 'active' : '' " 
         > {{item.name}}</li>
       </ul> -->
              </div>
            </div>
          </li>
          <li class="exam-content" :style="{backgroundImage:'url(static/data/W550-H450-Septum3.png)'}">
            <h3 class="content-title" :style="{backgroundImage:'url(static/data/Harm2.png)'}">
              <p class="title-word"> 考试培训统计 </p>
             </h3>
            <div class="line-chart-content"  v-loading="loadingE" element-loading-text="数据加载中"
              element-loading-spinner="el-icon-loading" element-loading-background="rgba(0.2, 0.5, 0.6, 0.8)">
              <div class="top-bar">
                <line-bar :sData="examTwo.sData" :XDataT="examTwo.xLabel" :max="examTwo.max"></line-bar> 
              </div>                   
            </div>
          </li>
          <li class="news-content"  :style="{backgroundImage:'url(static/data/W280-H450.png)'}">
              <h3 class="content-title news-title" :style="{backgroundImage:'url(static/data/Harm3.png)'}">
                   <p class="title-word"> 任务执行情况 </p>
               </h3>
<!--               <div class="img-mews">
                <div class="img-content">
                  <img :src="newsUrl" alt="">
                </div>
                <h4 class="news-sub-title">四川省成都市举办职业监测</h4>
              </div> -->
              <ul class="word-news">
                <news-list :newsList="newsList"></news-list>
              </ul>
           </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {barOne,lineOne,personList,newsList,lawList,examOne,radarData,examTwo,rateData,year,healthData} from './data.js'
import {getExamData,getHarmBarData,getTaskData,getHealthData,getAllUser,getTestData,getDangerData} from 'api/board.js'
import {getUserList, getHealthCardData} from 'api/card'
import getUserInfo from 'common/js/user'
import MyHeader from '@/components/my-header/data-header.vue'
import BarOne from '@/components/chart-bar/chart-bar-one.vue' // 危害因素
import BarThree from '@/components/chart-bar/bar-three.vue'    //象形柱状图
import StackLine from '@/components/chart-line/stack-line.vue'
import YearPie from '@/components/chart-pie/year-pie.vue'   //体检记录年份
import GaugePie from '@/components/chart-pie/gauge-pie.vue'   //体检合格率
import InconBar from '@/components/chart-bar/incon-bar.vue'   //合格率百分比
import RateBar from '@/components/chart-bar/bar-rate.vue'   //两年百分比
import ChartTast from '@/components/data-board/chart-radar.vue'   //任务雷达图
import ChartScatter from '@/components/data-board/chart-scatter.vue'   //健康卡散点图
import LineBar from '@/components/data-board/line-bar.vue'   //考试培训图
import BarTwo from '@/components/data-board/bar-two.vue'   //考试培训图柱状图
import MyScatter from '@/components/scatter-chart/my-scatter.vue'  //地图散点图
import MyScatterT from '@/components/scatter-chart/my-scatter-t.vue'   //地图散点图
import LawList from '@/components/word-module/word-module.vue'    //法律法规
import NewsList from '@/components/word-module/notice-list.vue'    //新闻动态

const STANDARE_COUNT = 15

export default {
  name: 'data-board',
  data() {
    return {
      // barOne: barOne,
      barOne:{
        xLabel: [],
        yData: []
      },
      examOne:examOne,
      lineOne: lineOne,
      rateData:{
        titlename: [],
        sData: []
      }, //横向柱状合格率
      personList: personList,  // 前三人员数据
      newsList: newsList,  //新闻数据
      // newsList: [],
      lawList: lawList,  //法律法规
      lawList2:[],
      loadingE: false,   //考试培训加载
      loadingT: false,  //隐患任务加载
      loadingH: false,  //健康卡加载
      loadingBig: false,
      loadingTask: false,  //体检记录
      loadingHarm: false,
      curIndex: 0,
      personId: '',
      personOptions:[],
      healthData: {
        xLabel:[],
        data: []
      }, //健康卡信息
      examTwo: {
          sData:{
            one: [],
            two: [],
            three: []
          },
          max:2000,
        xLabel: []
      },
      // examTwo: examTwo,  //考试培训折线柱状图
      radarData: {
        one: [],
        two: [],
        three: [],
        four:[],
        max:[]
      }, //雷达图数据 radarData
      radarLengend: [],
      // radarLengend:['2017第四季度', '2018第一季度','2018第二季度','2018第三季度'],
      year: {
       yearList: [],
       lengendData: []
      },  //年份体检合格率饼图数据
      numData: 0, //仪表盘合格率
      cardTitle: '任务处理情况',
      chartType: 0,  //任务
      barType: true,  
      newsUrl: 'static/data/News-map.jpg',
      coverImgUrl: 'static/data/W550-H450-1.png',
      userId : getUserInfo().userId,
      roleId : getUserInfo().roleId,
      cpId : getUserInfo().cpId,
      hazard: {
        harmType: 1,
      }
    };
  },
  created() {
    this.lawList2 = this.fomater(this.lawList)
  },
  mounted() { 
    this._getExamData()
    this._getTaskData()
    this._getUserList()
    this._getTestData()
    this._getHarmData()
    this._getDangerData()
  },
  methods:{
    fomater(arr){
      let len  = arr.length-1
      let result = []
      for(var i = 0;i<+len;i++){
        result[i] = arr[len-i]
      }
      return result
    },
    myStyle1(){
      if(this.chartType === 1){
        return 'background:url(static/data/W550-H450.png)'
      }else{
        return 'background:url(static/data/W550-H450-1.png)'
      }
    },
    _getDangerData(){
      getDangerData().then((res) =>{
        console.log(res.data)
        if(res.status ===1){
          // this.newsList = res.data
        }
      })
    },
    _getExamData(){   //获取培训考试数据
      this.loadingE = true
      getExamData().then((res) =>{
        let temp= [],temp1= [],temp2= [],temp3= []
        let time = []
        if(res.status === 1){
          this.loadingE = false
          res.data.map((item,index) =>{
            temp.push(item.timeAndPartitionName)
            temp1.push(item.percentOfPass)   //合格率
            temp2.push(item.trainPersonNumber) // 参考人数
            temp3.push(item.truePersonNumber)  //实际考试
          })  
        }
        this.examTwo.sData.one =  temp2 // 参考人数
        this.examTwo.sData.two = temp3
        this.examTwo.sData.three =  temp1
        this.examTwo.xLabel  = temp
        temp.map((item,index) =>{
          time.push()
        })
        this.examTwo.max = Math.max(...temp2)*1.2
      })
    },
    _getTaskData(){   //获取任务雷达图数据
      this.loadingT = true
      getTaskData().then((res) =>{
        let temp= [],temp1= [],temp2=[],temp3= [],temp4=[],temp5=[], temp6 =[],temp7=[],temp8=[],temp9=[]
        if(res.status ===1) {
           this.loadingT = false
          res.data.map((item,index) =>{
            temp.push(item.quarter)
            temp5.push(item.hiddenDealTime)
            temp6.push(item.planFinishCount)
            temp7.push(item.planOverduCount)
            temp8.push(item.hiddenDealCount)
            temp9.push(item.hiddenCount)
          })
          temp1.push(res.data[0].hiddenDealTime,res.data[0].planFinishCount,res.data[0].planOverduCount,res.data[0].hiddenDealCount,res.data[0].hiddenCount)
          temp2.push(res.data[1].hiddenDealTime,res.data[1].planFinishCount,res.data[1].planOverduCount,res.data[1].hiddenDealCount,res.data[1].hiddenCount)
          temp3.push(res.data[2].hiddenDealTime,res.data[2].planFinishCount,res.data[2].planOverduCount,res.data[2].hiddenDealCount,res.data[2].hiddenCount)
          temp4.push(res.data[3].hiddenDealTime,res.data[3].planFinishCount,res.data[3].planOverduCount,res.data[3].hiddenDealCount,res.data[3].hiddenCount)
          this.radarLengend = temp
          this.radarData.one = temp1
          this.radarData.two = temp2
          this.radarData.three = temp3
          this.radarData.four = temp4
          this.radarData.max[0] = Math.max(...temp5) > 1 ? Math.max(...temp5)*3 :10
          this.radarData.max[1] = Math.max(...temp6) > 1 ? Math.max(...temp6)*3 :10
          this.radarData.max[2] = Math.max(...temp7) > 1 ? Math.max(...temp7)*3 :10
          this.radarData.max[3] = Math.max(...temp8) > 1 ? Math.max(...temp8)*3 :10
          this.radarData.max[4] = Math.max(...temp9) > 1 ? Math.max(...temp9)*3 :10
        }
      })
    },
    _getHarmData(){   //获取危害因素数据
      this.loadingHarm = true
      getHarmBarData().then((res) =>{
         if(res.status === 1){
          this.loadingHarm = false
          let arr1=[], arr2=[]
          res.data.map((item,index) =>{
            arr1.push(item.harm)   //名称
            arr2.push(item.pNumber)   //人数
          })
          this.barOne.xLabel = arr1
          this.barOne.yData = arr2
          console.log(this.barOne)
        }
      })
    },
    _getTestData(){
      this.loadingTask = true
      getTestData().then((res) =>{
        if(res.status === 1){
          console.log(res.data)
           this.loadingTask = false
          let temp =[], temp2 = [], temp3 = [], label = []
          res.data.map((item,index) =>{
            temp.push(item.year)
            label.push(`${item.year}年体检人数`)
            temp2.push(item.pass)   //合格率
            temp3.push(item.pNum)   //人数
          })
          this.year.yearList = temp3  //三年的体检人数
          this.year.lengendData = label 
          this.numData  = temp2[0]//当年的合格率
          this.rateData.titlename = temp // 三年的合格率
          this.rateData.sData  = temp2
        }
      })
    },
    _getUserList() {        //cpId档案id null为纯管理者 请求下拉框 默认第一个人
      this.loadingBig = true
      getAllUser().then((res) => {
        if (res.status === 1) {
          this.loadingBig = false
          this.personOptions = res.data
          this.personId = res.data[0].id
          this.$nextTick(() => {
            this._getHealthCardData()
          })
        }
      })
    },
    selectName(data) {
      this.healthData.data = []
      this.userId = data
      this.$nextTick(() => {
        this._getHealthCardData()
      })
    },
    _getHealthCardData() {
      this.loadingH = true
      getHealthCardData({personId: this.personId}).then((res) => {
        if (res.chartOne.length!==0) {
          this.loadingH = false
          let arr1 = [], arr2 = [], arr3 = [], arr4 = []
          res.chartOne.forEach((item, idx) => {
            arr1.push(item.date)
            arr2.push(item.danger1 > 30 ? 30 : item.danger1)
            arr3.push(item.danger2 > 30 ? 30 : item.danger2)
            arr4.push(STANDARE_COUNT)
          })
          this.healthData.xLabel = arr1
           this.healthData.data[0] = arr2
           this.healthData.data[1] = arr3
           this.healthData.data[2] = arr4
        } else {
          this.loadingH = false
          this.$message({message: '暂无健康卡数据',type: 'info',center: true,duration: 3000})
          // console.log(res)
        }
      })
    },
    changeChart(){
      if(this.chartType ===0){
        this.chartType = 1
        this.cardTitle = '健康卡'
        this. coverImgUrl= 'static/data/W550-H450.png'
        // this._getUserList()
      }else{
        this.chartType = 0
        this.cardTitle = '任务处理情况'
        this. coverImgUrl= 'static/data/W550-H450-1.png'
      }
    },
    changePerson(value){   //切换健康卡人员
      if(value === 1){
        // this.healthData.xLabel = this.xLabel1
        // this.healthData.data = this.healthData1
         this.healthData.data = [[60,70,80,90,50],[90,80,70,60,50],[30,60,50,70,80]]
       }else if(value ===2){
        // this.healthData.xLabel = this.xLabel2
         // this.healthData.data = this.healthData2
        this.healthData.data = [[40,50,60,70,80],[30,40,50,60,70],[60,70,80,90,60]]
      }else{
        // this.healthData.xLabel = this.xLabel3
        // this.healthData.data = this.healthData3
        this.healthData.data = [[30,40,50,60,70],[60,70,80,90,50],[80,60,50,70,80]]
      }
    },
    changeBar(){
      this.barType  =!this.barType
    }
  },
  components:{
    MyHeader,
    BarOne,
    StackLine,
    YearPie,
    GaugePie,
    InconBar,
    ChartTast,
    ChartScatter,
    LineBar,
    MyScatter,
    MyScatterT,
    LawList,
    NewsList,
    RateBar,
    BarTwo,
    BarThree
  }
};
</script>
<style lang="css">
  .data-board .task-content .input-group .el-input--suffix .el-input__inner{
background-color: #020f21!important;
color: #fff!important;
border: 1px solid #004075!important;
height: 30px;
line-height: 30px;
  }
 .data-board .el-select-dropdown .el-scrollbar .el-select-dropdown__list{
background-color: #020f21!important;
color: #fff!important;
  }
</style>
<style lang="css" scoped>
.data-board{
  width: 100%;
  background: #020e1f;
}
.my-header{
  height: 60px;
}
.left-container{
float: left;
}
.right-container{
  float: right;
}
.data-container{
  width: 1900px;
  margin: 20px auto 10px auto;
}
.left-container{
  width: 490px;
  margin: 10px 0 10px 0;
}
.right-container{
  width: 1400px;
  margin: 10px 10px 10px 0;
}
.harm-content{
  height: 500px;
  /* background: url('static/data/W490-H500-Septum.png') no-repeat center; */
  margin-bottom: 10px;
}
.test-record{
  height: 450px;
  /* background: #011535;      */
}
.top-container{
  height: 500px;
}
.bottom-container{
  height: 450px;
}
.top-container li,.bottom-container li{
float: left;
}
.top-container>li{
  height: 500px;
}
.bottom-container>li{
  height: 450px;
}
.map-content{
  width: 900px;
  margin: 0 10px 10px 10px;
}
.map-content .my-scatter{
  width: 560px;
  margin-left: 50px;
  height: 300px; 
  position: relative;
}
.map-content .my-scatter-one{
  width: 400px;
  height: 400px;
  position: absolute;
  right: 50px;
}
.map-content .my-scatter-two{
  width: 400px;
  height: 300px;
  position: absolute;
  top: 10px;
  left: 100px;
}
.law-content{
 width: 480px;
margin-bottom: 10px; 
}
.law-content .list-info{
  width: 438px;
  height: 400px;
  margin:  0 auto;
}
.law-content .list-info .info-item{
  width: 214px;
  height: 400px;
  float: left;
}
.law-content .list-info .info-item:first-child{
  margin-right: 10px;
}

/* .law-content .law-list li:nth-child(2){
margin-right: 0!important;
} */
.law-list .law-info{
width: 184px;
margin: 14px auto;
height: 60px;
line-height: 20px;
color: #fff;
text-overflow:ellipsis;
overflow:hidden;
}
.card-content,.exam-content{
width: 550px;
margin-right: 10px;
position: relative;
}
.exam-lengend{
  width: 450px;
  height: 10px;
  line-height: 10px;
  margin: 20px auto 0 79px;
  color: #fff;
}
.exam-lengend li{
  float: left;
  width: 80px;
  margin-left: 10px;
  font-size: 12px;
}
.exam-lengend li:first-child{
margin-left: 0!important;
}
.exam-lengend li .square{
display: inline-block;
width: 10px;
height: 10px;
}
.exam-lengend li .square-1{
background: linear-gradient(#006cff, #00d3d5)
}
.exam-lengend li .square-2{
background: linear-gradient(#4a3cd0, #00d3d5 )
}
.exam-lengend li .square-3{
background: linear-gradient(#6cdab7, #066666)
}
.exam-lengend li .square-4{
background: linear-gradient(#48c0b9, #0a739a)
}
.exam-lengend li .square-5{
background: #b66a11;
}
.exam-content .change-exam{
position: absolute;
top: 20px;
right: 20px;
}
.card-content{
  margin-left: 10px;
}
.news-content{
  width: 270px;
}
.content-title{  
  height: 50px;
  width: 256px;
  line-height: 50px;
  margin: 0 auto;
  text-align: center;
  font-size: 20px;
  font-weight: 200;
  color: #00f6ff;
  /* background: #002447; */
}
.title-word{
  height: 40px;
  line-height: 42px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 200;
}
.title-word-s{
  height: 72px!important;
  line-height: 72px;
}
.big-title{
  width: 370px!important;
  height: 72px!important;
}
.news-title{
  width: 182px!important;
}
.harm-content .bar-chart{
  width: 480px;
  margin:0 auto;
  height: 400px;
  margin-top: -20px!important;
}
.bar-title{
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
  width: 150px;
  margin: -20px auto 0 auto;
}
.harm-content .line-chart{
  height: 200px;
  width: 450px;
  margin:0 auto;
}
.type-harm{
  height: 40px;
  line-height: 40px;
  width: 150px;
  margin: 0 auto;
}
/* 分割线 */
.split-line{
  height: 20px;
}
.record-content li{
float: left;
}
.record-content .year-record{
height: 400px;
width: 245px;
}
.record-content .qualificate-rate{
width: 244px;
height: 400px;
position: relative;
}
.qualificate-rate .title-gauge{
  width: 50px;
  height: 20px;
  line-height: 20px;
  color: #fff;
  position: absolute;
  top: 178px;
  left: 40%;
}
.qualificate-rate .gauge-pie{
  width: 230px;
  margin: 0 auto;
  margin-top: -70px;
  height: 300px;
}
.qualificate-rate .rate-bar{
width: 230px;
margin-left: 10px;
height: 200px;
}
.change-content{
  height: 350px;
}
.card-title{
  position: relative;
}
.card-title .content-title{
float: left;
margin-left: 27%;
}
.card-title .change-item{
width: 54px;
height: 30px;
position: absolute;
top: 20px;
right: 0px;
}
.card-title .change-item>img{
  width: 54px;
  height: 30px;
}
.task-content{
  height: 350px;
  width: 520px;
  margin:30px auto 0 auto;
  /* position: relative; */
}
.task-content .input-group{
position: absolute;
top: 85px;
right: 60px;
z-index: 3000;
}
.task-content .input-group .title{
  margin-right: 5px;
  color: #fff;
}
.task-content .input-group .inner-input{
  width: 150px;
  height: 30px;
  line-height: 30px;
  /* background: #020f21; */
}
.chart-scatter{
  width: 520px;
  height: 350px;
}
.chart-scatter .no-data{
  height: 350px;
  line-height: 350px;
  color: #fff;
  text-align: center;
  font-size: 18px;
}
.task-content .person-list{
  width: 20px;
  height: 300px;
  position: absolute;
  right: 20px;
  top: 50px;
}
.task-content .person-list li{
  width: 20px;
  height: 60px;
  line-height: 20px;
  margin-top: 20px;
  color: #fff;
}
.task-content .person-list li:first-child{
  margin-top: 0;
}
.task-content .person-list li:hover{
  cursor: pointer;
  color: #009218;
}
.task-content .person-list li.active{
  color: #009218;
}
.chooseP{
  color: #009218;
}
.cancleP{
  color: #fff;
}
.line-chart-content{
height: 370px;
position: relative;
/* height: 260px; */
}
.line-chart-content .top-bar{
  height: 370px;
}
.line-chart-content .bottom-bar{
  height: 143px;
  /* transform: rotate(180deg); */
}
.img-mews{
  width: 230px;
  margin: 0 auto;
}
.img-mews .img-content{
width: 230px;
height: 160px;
margin-top: 20px;
}
.img-mews .img-content img{
  width: 230px;
  height: 160px;
}
.news-sub-title{
  width: 230px;
  margin: 10px auto;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
}
.word-news{
  margin-top: 10px;
  width: 230px;
  height: 320px;
  overflow: hidden;
  margin: 0 auto;
}
</style>

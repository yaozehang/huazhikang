<template>
  <div class="main-content" @click="hideTree($event)">
    <!-- 搜索框 -->
    <ul class="search-container">
      <li class="input-group">
          <span class="title">分区名称</span>
          <el-input class="inner-input" readonly placeholder="请选择" v-model="selectParams.personal" @focus="onFocus" id="fenqu"></el-input>
      </li>
      <li class="input-group">
        <span class="title">开始日期（起）</span>
        <el-date-picker class="inner-input" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="selectParams.startDate"></el-date-picker>
      </li>
      <li class="input-group">
          <span class="title">接害因素</span>
          <el-select v-model="selectParams.harm" placeholder="请选择" class="inner-input" clearable filterable>
            <el-option v-for="item in harmList" :key="item.value" :label="item.label" :value="item.label"></el-option>
          </el-select>
      </li>
      <li class="input-group">
          <span class="title">体检类型</span>
          <el-select v-model="selectParams.state" placeholder="请选择" class="inner-input" clearable>
            <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
      </li>
      <li class="input-group">
          <span class="title">结束日期（止）</span>
          <el-date-picker class="inner-input" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="selectParams.endDate"></el-date-picker>
      </li>
      <li class="input-group" style="padding-left:120px">
          <el-button type="primary" class="inner-button" @click="_getAnalysisList">查询</el-button>
          <el-button type="primary" class="inner-button" @click="reset">重置</el-button>
      </li>
     </ul>
    <!-- 表格标题 -->
    <table-title :title="'查询结果分析'"></table-title>
    <!-- 表格 -->
    <div class="table-container my-table">
      <el-button type="primary" plain class="all-btn" @click="showReport">生成团体报告</el-button>
      <el-table :data="tableData" border>
        <el-table-column label="序号" width="50" type="index"></el-table-column>
        <el-table-column prop="dunit" label="单位名称"></el-table-column>
        <el-table-column prop="state" label="在岗状态"></el-table-column>
        <el-table-column prop="factor" label="接害因素"></el-table-column>
        <el-table-column prop="headcount" label="体检人数/次"></el-table-column>
        <el-table-column prop="normal" label="正常人数"></el-table-column>
        <el-table-column prop="review" label="复查人数"></el-table-column>
        <el-table-column prop="taboo" label="职业禁忌人数"></el-table-column>
        <el-table-column prop="disease" label="疑似职业病"></el-table-column>
        <el-table-column prop="rest" label="疾病或其他异常"></el-table-column>
    </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
        <el-pagination
          @current-change="pageChange"
          :current-page="selectParams.page"
          layout=" prev, pager, next, jumper"
          :total="totalPage">
        </el-pagination>
    </div>
    <!-- 部门选择树状图 单选 onCheckPos onConfirmPart 多选 -->
    <div class="tree-container" v-show="isShowTree" id="tree">
      <div class="tree-content">
        <el-tree :data="treeData" show-checkbox node-key="id"  default-expand-all ref="tree" highlight-current :props="defaultProps" check-strictly @check="onCheckPos">
        </el-tree>
      </div>
<!--       <div class="buttons">
        <el-button type="primary" @click="onConfirmPart">确认</el-button>
        <el-button @click="resetChecked">清空</el-button>
      </div> -->
    </div>
    <!--报告弹窗 -->
    <el-dialog title="团体报告"  width="880px" :visible.sync="IsReport">
      <div class="report-container">
       <h1 class="caption"> {{zoneName}} <br>历年职业健康体检结果分析报告</h1>
       <section class="content">
          <h2 class="title">1.历年统计表格</h2>
          <div class="table-container my-table">
            <el-table :data="yearResult" border>
              <el-table-column label="时间" prop="year"></el-table-column>
              <el-table-column label="总人数" prop="total"></el-table-column>
              <el-table-column label="复查人数" prop="review"></el-table-column>
              <el-table-column label="职业禁忌人数" prop="taboo"></el-table-column>
            </el-table>
          </div>
       </section>
       <section class="content">
         <h2 class="title">2.历年统计条形图</h2>
         <div class="chart-container bar">
           <chart-bar :yLabel="yLabel" :data="dataBar"></chart-bar>
         </div>
       </section>
       <section class="content">
         <h2 class="title">3.历年复查统计散点图</h2>
         <div class="chart-container dot">
           <chart-dot :xLabel="xLabel1" :data="dataDot1" :tooltip="tooltip1"></chart-dot>
         </div>
       </section>
       <section class="content">
         <h2 class="title">4.历年职业病患者统计散点图</h2>
         <div class="chart-container dot">
           <chart-dot :xLabel="xLabel2" :data="dataDot2" :tooltip="tooltip2"></chart-dot>
         </div>
       </section>
       </div>
    </el-dialog>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import chartBar from 'components/chart-bar/chart-bar'
import chartDot from 'components/chart-dot/chart-dot'
import getUserInfo from 'common/js/user'

import {getZoneList} from 'api/zone'
import {getAllHarmList, getAnalysisList, getReportData} from 'api/analysis'
import {getTreeData} from 'api/position'
import qs from 'qs'

const typeOptions= ['上岗前', '在岗期间', '离岗时', '离岗后随访', '应急检查']

export default {
  data () {
    return {
      selectParams: {
        startDate: '',
        endDate: '',
        personal: '',
        state: '',
        harm: '',
        comId: getUserInfo().comPId,
        page: 1,
      },
      harmList: [],
      typeOptions: typeOptions,
      treeData: [],
      totalPage: 10,
      tableData: [],
      isShowTree: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      IsReport: false,
      yearResult: [],
      yLabel: [],
      xLabel1: [],
      xLabel2: [],
      dataBar: [],
      dataDot1: [],
      dataDot2: [],
      tooltip1: [],
      tooltip2: [],
      pid: {
        pId: getUserInfo().comPId
      },
      zoneName: getUserInfo().username,
      zoneKey: [],
      selectKey: 0
    }
  },
  created() {
    this._getAnalysisList()
    this._getAllHarmList()
    this._getTreeData()
    this.selectParams.comId = getUserInfo().comPId
  },
  methods: {
    _getTreeData() {
      getZoneList(qs.stringify(this.pid)).then((res) => {
        this.treeData = [res.data]
      })
    },
    _getAllHarmList() {
      getAllHarmList({name: ''}).then((res) => {
        this.harmList = this._filterList(res)
      })
    },
    _filterList(obj) {
      let arr = []
      for (let k in obj) {
        arr.push({value: k, label: obj[k]})
      }
      return arr
    },
    _getAnalysisList() {
      console.log(this.selectParams)
      this.selectParams.comId = getUserInfo().comPId
      getAnalysisList(qs.stringify(this.selectParams)).then((res) => {
        if(res){
          this.tableData = res.list
          this.totalPage = res.totalPage * 10
          this.$message({
           message: '查询成功', type: 'success', center: true, duration: 1000
          })
        }
      })
    },
    onFocus() {
      this.isShowTree = true
      this.$refs.tree.setCheckedKeys([this.selectKey])
    },
    onCheckPos(val) {
      // let e = this.$refs.tree.getCheckedNodes()[0]   //设置为选中的第一个
      this.selectParams.personal = val.label
      this.selectKey = val.id
      this.isShowTree = false
    },
    onConfirmPart() {  //分区多选
      let temp = this.$refs.tree.getCheckedNodes()
      this.selectParams.personal = this._filterTreeStr(temp)
      let temp2 = []      
      temp.forEach((item, idx) => {  //选中的值得数组
        temp2.push(item.label)
      })
      this.zoneKey= JSON.stringify(this.$refs.tree.getCheckedKeys())       //选中的id
      this.isShowTree = false
    },
    _filterTreeStr(data) { //分区多选字符串拼接
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join(',')
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.selectParams.personal = ''
    },
    reset() {
      this.$refs.tree.setCheckedKeys([])
      this.selectParams.comId = getUserInfo().comPId
      for (let k in this.selectParams) {
        if (k!== 'page') {
          this.selectParams[k] = ''
        }
      }
    },
    showReport() {
      let data = {
        comId: getUserInfo().comPId
      }
      getReportData(qs.stringify(data)).then((res) => {
        console.log(res)
        this.zoneName = res.partitionName  //公司名字
        // table
        this.yearResult = res.yearResult
        // bar
        let yLabel = [], dataList = [[], [], []]
        let colorList = ['#4d9bf3', '#666', '#999']
        let nameList = ['复查人数', '职业禁忌人数', '其他']
        let dataBar = []
        res.yearResult.forEach((item) => {
          yLabel.push(item.year)
          dataList[0].push(item.review)
          dataList[1].push(item.taboo)
          dataList[2].push(item.total - item.review - item.taboo)
        })
        nameList.forEach((item, idx) => {
          dataBar.push({
            name: item,
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: dataList[idx],
            itemStyle: {
              color: colorList[idx]
            }
          })
        })
        // dot
        let xLabel1 = [], xLabel2 = [], data1 = [], data2 = [], tip1 = [], tip2 = []
        res.review.forEach((item) => {
          xLabel1.push(item.year)
          data1.push(item.ratio)
          tip1.push({name: item.year, content: item.jobs})
        })
        res.result.forEach((item) => {
          xLabel2.push(item.year)
          data2.push(item.ratio)
          tip2.push({name: item.year, content: item.jobs})
        })
        this.yLabel = yLabel
        this.dataBar = dataBar
        this.xLabel1 = xLabel1
        this.xLabel2 = xLabel2
        this.dataDot1 = data1
        this.dataDot2 = data2
        this.tooltip1 = tip1
        this.tooltip2 = tip2
      })
      this.IsReport = true
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getAnalysisList()
    },
    hideTree(e) {
      if (e.target.id === '') {
        if (e.target.parentElement.id === 'clearBtn') {
          return false
        } else {
          this.isShowTree = false
        }
      }
    }
  },
  components: {
    tableTitle,
    chartBar,
    chartDot
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.main-content
  margin:20px 20px 0
  border-top:1px solid $color-border
  .search-container
    position:relative
    padding:20px 0 30px 0
    li
      display:inline-block
      height:40px
      line-height:40px
      margin-bottom:20px
      margin-right:100px
      font-size:0
      &:last-child
        margin-bottom:0
      &.input-group
        .title
          display:inline-block
          width:120px
          text-align:left
          margin-right:20px
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:40px
        .inner-button
          width:100px
          margin-left:20px
  .table-container
    position:relative
    margin-top:10px
    border-radius(5px)
    .icon
      font-size:18px
      cursor:pointer
    .all-btn
      position:absolute
      right: 0
      top:-60px
  .pagination-container
    text-align:right
    margin-top:30px
  .report-container
    max-height:560px
    overflow-y: auto
    padding-bottom
    .caption
      text-align:center
      font-size:$font-size-large
      line-height:30px
    .content
      margin-top:20px
      .title
        font-size:$font-size-medium-x
      .chart-container.bar,.chart-container.dot
        height: 250px
  .tree-container
    position:absolute
    top:150px
    left:100px
    width:500px
    max-height:600px
    padding:15px 5px
    z-index:300
    background: #fff
    border:1px solid $color-border
    border-radius(5px)
    .tree-content
      max-height:450px
      overflow-y:auto
    .buttons
      width: 200px
      margin: 5px auto
</style>

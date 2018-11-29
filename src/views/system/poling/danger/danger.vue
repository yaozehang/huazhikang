<template>
  <div class="main-content">
    <!-- 搜索框 -->
    <div class="search-content"  @click="hideTree($event)">
    <ul class="search-container" >
      <li class="input-group">
        <span class="title">开始时间</span>
        <el-date-picker v-model="selectParams.startDate"   value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
      </li>
      <li class="input-group">
         <span class="title">分区</span>
         <el-input class="inner-input my-input" v-model="zone" @keyup.native.enter="_getDangerList" @focus="isSelectZone = true" id="part1"></el-input>
      </li>
      <li class="input-group">
          <span class="title">结束时间</span>
          <el-date-picker v-model="selectParams.endDate"   value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
      </li>
      <li class="input-group">
          <span class="title">排查状态</span>
          <el-select v-model="form.status" class="inner-input" placeholder="请选择" >
          <el-option v-for="item in statusList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      <!--     <el-input class="inner-input" v-model="selectParams.status" @keyup.native.enter="_getDangerList"></el-input> -->
          <el-button type="primary" @click="_getDangerList">查询</el-button>
          <el-button type="primary" @click="goPrint">打印预览</el-button>
      </li>
    </ul>
    <!-- 分区树状图  -->
         <div class="my-Tree1" v-show="isSelectZone">
          <div class="tree-content">
            <el-tree :data="zoneData"   show-checkbox node-key="id" default-expand-all ref="tree1" highlight-current
            :props="defaultProps" check-strictly  class="">
        </el-tree>
          </div>
        <div class="buttons">
          <el-button type="primary" @click="onConfirmPart">确认</el-button>
          <el-button @click="resetChecked">清空</el-button>
        </div>
      </div>
    <!-- 分区树状图 -->
    </div>
    <!-- 表格标题 -->
    <div class="title-container clearfix">
       <table-title :title="'隐患排查列表'"></table-title>
        <ul class="tooltip-container">
        <li><i class="circle bg-0"></i><span class="text">已完成 {{compNumber}} </span></li>
        <li><i class="circle bg-2"></i><span class="text">未处理 {{notNumber}} </span></li>
        <li><i class="circle bg-1"></i><span class="text">逾期 {{overdueNumber}} </span></li>
         <li><i class="circle bg-1"></i><span class="text">处理中{{dealNumber}} </span></li>
      </ul>
    </div>
    <!-- typeId workPlanId   dangerDetail详情 status 未完成 已完成 逾期 finishDate 完成時間 endDate隱患處理結束日期-->
    <div class="table-container my-table">
      <el-table :data="tableData" border stripe  @selection-change="selectRow">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="place"  label="地点"></el-table-column>
        <el-table-column prop="type"  label="类型"></el-table-column>
        <el-table-column  label="标题"  width="200">
          <template slot-scope="scope">
           <p class=""> {{scope.row.title}} </p>
          </template>
        </el-table-column>
        <el-table-column  label="隐患详情" width="100px">
          <template slot-scope="scope">
            <!-- <span class="link-btn" @click="showDetail(scope.row.id,scope.row.dangerDetail, scope.row.status)">查看详情</span> -->
            <el-button size="mini" plain @click="showDetail(scope.row.id,scope.row.dangerDetail, scope.row.status)">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="personal"  label="审核人"></el-table-column>
        <el-table-column prop="date"  label="审核时间"></el-table-column>
        <el-table-column prop="finishDate"  label="执行时间"></el-table-column>
        <el-table-column prop="dealPerson"  label="执行人"></el-table-column>
        <el-table-column  label="隐患处理">
          <template slot-scope="scope">
            <!-- <span class="link-btn" @click="handelDangers(scope.$index, scope.row)" v-if="scope.row.status === '3' ||scope.row.status === '4'">处理</span> -->
            <el-button size="mini" type="danger" @click="handelDangers(scope.$index, scope.row)" v-if="scope.row.status === '3' ||scope.row.status === '4'">处理</el-button>
            <!-- <span class="link-btn"  @click="handelDangers(scope.$index, scope.row)" v-else>查看</span> -->
            <el-button size="mini" plain  @click="handelDangers(scope.$index, scope.row)" v-else>查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="处理状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '0'"> 未完成</span>
            <span v-if="scope.row.status === '1'"> 逾期未完成</span>
             <span v-if="scope.row.status === '2'"> 已完成</span>
            <span v-if="scope.row.status === '3'"> 未处理</span>
            <span v-if="scope.row.status === '4'"> 处理中</span>
            <span v-if="scope.row.status === '5'"> 逾期完成</span>
          </template>
      </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination @current-change="pageChange" :current-page="selectParams.page"
          layout=" prev, pager, next, jumper" :total="totalPage"></el-pagination>
      </div>
      <!-- 处理弹窗 selsectPerson-->
      <div class="handel-content"  @click="hideTree($event)">
      <el-dialog  class="dialog-form" width="800px" :title="delTitle" center :visible.sync="isHandel"
      :closeOnClickModal ="false">
        <ul class="search-container">
          <li class="input-group" >
            <span class="title">分区</span>
            <el-input class="inner-input" v-model="handelParams.pName" id="my-part"  @focus="showZone" :disabled="publishFlag"></el-input>
          </li>
          <li class="input-group">
             <span class="title">处理人员</span>
              <el-select v-model="handelParams.dealPserson" class="inner-input" filterable multiple  placeholder="请选择" 
              @change="selsectPerson" :disabled="publishFlag" >
                <el-option v-for="item in personOptions" :key="item.personId" :label="item.username" :value="item.personId"></el-option>
              </el-select>
          </li>
          <li class="input-group">
              <span class="title">结束日期</span>
              <el-date-picker  class="inner-input" v-model="handelParams.endDate"   value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions" :disabled="publishFlag" > </el-date-picker>
          </li>
          <li class="input-group">
            <span class="title">电话号码</span>
            <el-input class="inner-input"  v-model="dangerParams.telNum"  @focus="_getPersonNum" ></el-input>
          </li>
           <div class="specail-group">
            <span class="title">隐患说明</span>
            <el-input class="specail-input" type="textarea" :rows="3" v-model="dangerParams.title" disabled></el-input>
          </div>
           <div class="specail-group">
            <span class="title">处理方案</span>
            <el-input class="specail-input" type="textarea" :rows="3" v-model="handelParams.dealWay" :disabled="publishFlag" ></el-input>
          </div>
          <div class="specail-group">
            <span class="title">处理后备注</span>
            <el-input class="specail-input" type="textarea" :rows="3" v-model="dangerParams.mark" disabled></el-input>
          </div>
          <div class="specail-group">
            <span class="title">隐患上报图片</span>
             <!-- <span class="img-link" v-if="!publishFlag">暂无图片</span> -->
            <span class="img-link" @click="showDangerImg">查看图片</span>
            <!-- <el-button type="primary" class="center-btn" @click="" :disabled="!publishFlag">查看</el-button> -->
          </div>
           <div class="center-input">
              <el-button type="primary" class="center-btn" @click="publishDanger" :disabled="publishFlag">发布</el-button>
          </div>
        </ul>
           <!--人员 部门选择树状图 -->
      <div class="tree-container3" v-show="isTree" id="myTree">
        <div class="team-tree">
          <el-tree :data="zoneData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
           :props="defaultProps"  check-strictly >
          </el-tree>
        </div>
        <div class="my-tree-btns">
          <el-button type="primary" @click="onConfirmPart2">确认</el-button>
          <el-button @click="resetChecked2">清空</el-button>
        </div>
    </div>
    <!-- 部门分区图 -->
      </el-dialog>
      </div>
      <!-- 处理弹窗 -->
      <!-- 电话号码弹框 -->
      <el-dialog class="check-container" :title="'电话列表'" center width="600px" :visible.sync="telShow">
        <el-table :data="telData" border stripe>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="name"  label="处理人员"></el-table-column>
        <el-table-column prop="tel"  label="电话号码"></el-table-column>
        </el-table>
      </el-dialog>
    <!-- 号码弹窗 -->
      <!-- 图片弹框 -->
    <el-dialog class="check-container" :title="'图片列表'" center width="600px" :visible.sync="dangerImgShow">
      <ul class="img-list clearfix">
        <li v-for="(item,index) in imgList" :key="index" @click="showBigImg(item)">
          <img :src="item" alt="" >
        </li>
      </ul>
    </el-dialog>
    <!-- 图片弹框 v-if="beforImgList.length!==0"-->
    <el-dialog class="check-container" :title="'图片详情'" center width="600px" :visible.sync="isImgShow">
      <ul class="img-container clearfix" >
        <li class="left-img">
          <p >处理前图片</p>
          <ul class="img-list" v-if="beforImgList.length!==0">
            <li v-for="(item,index) in beforImgList" :key="index" @click="showBigImg(item)">
              <img :src="item" alt="" >
            </li>
          </ul>
        </li>
        <li class="right-img">
          <p>处理后图片</p>
          <ul class="img-list" v-if="endImgList.length!==0" >
            <li v-for="(item,index) in endImgList" :key="index"  @click="showBigImg(item)">
              <img :src="item" alt="" >
            </li>
          </ul>
        </li>
      </ul>
    </el-dialog>
      <!-- 查看大图弹窗  transform:rotate(7deg); v-bind:style="styleObject"   :class="bigOne "-->
      <el-dialog class="check-container" :title="'图片列表'" center width="1080px" :visible.sync="bigImgShow">
        <div class="big-img" ref="bigImg"  @click="rotateImg($event)" id="root">
           <!-- <i :class="" @click="start"></i>  -->
           <!-- <a :href="bigSrc">图片</a> -->
           <img :src="bigSrc" alt="" >
        </div>
    </el-dialog>
    <!-- 查看大图弹窗 -->
      <el-dialog  class="dialog-form" width="800px" title="隐患详情" :visible.sync="isDetail">
      <div class="template-container" v-for="(template,index) in editParams.templateList" track-by="index" :key="index">
        <header class="template-head">
          <span class="title title-dm">{{ template.title}}</span>
          <span class="show-img" @click="showImg(template)" > 查看图片 </span>
        </header>
        <section class="template-content">
          <ul>
            <li v-for="(item,idx) in template.list" :key="idx">
              <template-item :type="parseInt(item.type)" :index="index" :idx="idx" @handleDefault="handleDefault"  :defaultData="item.array.length ===0 ? item.defaultValue : item.array"   :result="item.array.length ===0 ? (item.editStr[0]!== undefined? [item.editStr]:[item.defaultValue]):item.items"></template-item>
            </li>
          </ul>
        </section>
      </div>
    </el-dialog>
    <!-- 详情弹窗 -->
   </div>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import {getDangerList,getDangerDetail,handelDanger,getPersonListById,getPersonNum,getAllDangerResult
,getPersonList} from 'api/poling'
// import templateItem from '../poling-plan/template-edit'
import templateItem from './danger-detail.vue'
import getUserInfo from 'common/js/user'
import {getDate} from 'common/js/time'
import {myurl} from '@/api/config.js'
import {getZoneListByAuthority} from 'api/zone'
import qs from 'qs'
export default {
  components: {
    tableTitle,
    templateItem
  },
  data () {
    return {
      personArr: [],
      personOptionsTwo: [],
      fileList: [],
      value1: '',
      placeOption: [],
      zone: '',
      form: {
        status: ''
      },
      selectParams: {
        startDate: '',
        endDate: '',
        status: '',
        pId: '',
        page: 1,
        size: 15,
        comPId: getUserInfo().comPId,
        inspectionId: JSON.stringify(getUserInfo().inspectionId), //用户的巡检类型
        roleId: getUserInfo().roleId
      },
      dangerParams: {
        person: [],
        endDate: '',
        telNum: '',
        mark: '',
        title: ''
      },
      handelParams: {
        id: '',
        dealWay: '',
        partitionId: [], //分区id
        pName: '', //分区名字
        endDate: '', //执行日期
        dealPserson: [],
        tel: [],
        comPId: getUserInfo().comPId,
      },
      totalPage: 0,
      isDetail: false,
      imgStatus: false,
      isImgShow: false,
      bigImgShow: false,
      dangerImgShow:false,
      bigSrc: '',
      isHandel: false,
      isTree: false,
      isSelectZone: false,
      showOneImg: false,
      showFlag: false,
      publishFlag: false,
      telShow: false,
      editParams: {
        id: '',
        templateList: [],
        confirm: 0
      },
      templateList: [{
        title: '标题',
        list:[]
      }],
      zoneData:[],
      tableData: [],
      statusList: ['未处理','处理中','未完成','已完成','逾期完成','逾期未完成'],
      imgList: [],
      beforImgList: [],
      endImgList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      notNumber: 0,
      compNumber: 0,
      overdueNumber: 0,
      dealNumber: 0,
      editId: '',
      handelId: '',
      delTitle: '',
      personOptions: [],
      telData: [],
      workIds: [],
      bigOne: false,
      r: 0,
      styleObject: {
        transform: 'rotate(0deg)',
      },
      pickerOptions:{
        disabledDate(time){   //时间小于今天禁用
        let _now = Date.now()
        return time.getTime() < _now - 24*3600*1000
        }
    }
    }
  },
  created() {
    this._getDangerList()
    this.getZone()
    let time = getDate()
    this.selectParams.endDate = `${time.year}-${time.month}-${time.date}`
    this.handelParams.endDate = `${time.year}-${time.month}-${time.date}`
  },
  methods: { 
    goPrint(){ 
      if(this.workIds.length!==0){
        console.log(this.workIds)
        this.$router.push({path: '/print2',query: {workIds: this.workIds}})
      }else {
        this.$message({ type: 'warning', message: '请先选择要打印的隐患'})
      }
    },
    selectRow(data){  //选中行
      let temp = []
      data.map((item,index) =>{
        temp.push(item.id)
      })
      this.workIds = temp
    },
    showBigImg(item){  //查看大图
       // this.$router.push({path: '/img',query:{imgSrc:item}})
      this.bigImgShow = true
      this.bigSrc  = item
      this.r = 0
    },
    rotateImg(e){  //旋转图片
      if(this.r===90){
        this.r = 180
      }else if(this.r===180){
        this.r = 270
      }else if(this.r===270){
        this.r = 360
      }else if(this.r===360){
        this.r = 90
      }else if(this.r===0){
        this.r = 90
      }
    var root = document.getElementById('root')
    root.style.cssText=`transform: rotate(${this.r}deg);`
    },
    showDangerImg(){   //显示隐患图片
      this.isImgShow = true
    },
    _getDangerList() {
      // '0未完成1逾期未完成2已完成3未处理4处理中', 5逾期完成
      if(this.form.status === '未处理'){
        this.selectParams.status = 3
      } else if(this.form.status === '逾期未完成'){
         this.selectParams.status = 1
      } else if(this.form.status === '逾期完成'){
         this.selectParams.status = 5
      } else if(this.form.status === '已完成'){
         this.selectParams.status = 2
      } else if(this.form.status === '未完成'){
         this.selectParams.status = 0
      }else if(this.form.status === '处理中'){
         this.selectParams.status = 4
      }
      getDangerList(qs.stringify(this.selectParams)).then((res) => {
        console.log(res.resultList)
        this.tableData= res.resultList
        this.notNumber = res.notNumber  //未完成
        this.overdueNumber = res.overdueNumber   //逾期
        this.compNumber = res.compNumber  //已完成
        this.dealNumber  = res.dealNumber    //处理中
      })
    },
    getZone() {
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.zoneData = [res]
      })
    },
    _getPersonListById(){   //根据分区id获取处理人员
      if(!this.publishFlag){          //不是完成就获取     
      getPersonListById({partitionId:this.handelParams.partitionId}).then((res) =>{
        if(res){
          this.personOptions = res
        }
      })
     }
    },
    selsectPerson(){    //获取选中的处理人员
      let data = {
        ids: this.handelParams.dealPserson.join(',')
      }
      if(this.handelParams.dealPserson.length !==0 && !this.publishFlag){
        getPersonNum(qs.stringify(data)).then((res) =>{
          if(res.length!==0){
           this.telData = res
           let temp =[]
           res.map((item,index) =>{
            temp.push(item.tel)
           })
           this.dangerParams.telNum = temp.join(',')
          }
        })
      }
    },
    _getPersonNum(){   //根据处理人员id获取号码
      this.telShow = true
    },
    onConfirmPart() {   //分区多选
      let temp = this.$refs.tree1.getCheckedNodes()
      this.zone = this._filterTreeStr(temp)
      this.selectParams.pId= JSON.stringify(this.$refs.tree1.getCheckedKeys())
      this.isSelectZone = false
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join(',')
    },
    resetChecked() {
      this.$refs.tree1.setCheckedKeys([])
      this.zone = ''
    },
    hideTree(e){
      if(e.target.id === ''){
        this.isSelectZone = false
        this.isTree = false
      }
     },
     showZone(){
      this.isTree = true
      this.$refs.tree.setCheckedKeys([this.handelParams.partitionId])
      this.handelParams.pName = this._filterTreeStr(this.$refs.tree.getCheckedNodes())
    },
    onConfirmPart2() {   //分区多选
      if(this.$refs.tree.getCheckedKeys().length !== 0){
        let temp = this.$refs.tree.getCheckedNodes()
        this.handelParams.pName = this._filterTreeStr(temp)
        this.handelParams.partitionId = this.$refs.tree.getCheckedKeys()          //选中的id
        this.isTree = false
        this.getPerson2()
      }else{
        // this.handelParams.pName = ''
        // this.handelParams.partitionId = []
      }
    },
    resetChecked2() {
      this.$refs.tree.setCheckedKeys([])
      this.handelParams.pName = ''
    },
    getPerson2(){
      let list = JSON.stringify(this.handelParams.partitionId)
      let data = {
        partitionId: list
      }
      if(this.handelParams.pNam !==''){
        getPersonList(qs.stringify(data)).then((res) => {
          this.personOptions = res
        })
      }
    },
    // 获取树状图图的
    showImg(template){
      this.dangerImgShow = true
      this.imgList = template.picUrl 
    },
    handleDefault(data, index, idx) {
      this.editParams.templateList[index].list[idx]['result'] = data
    },
    viewImg(item){
      // this.isImgShow = false
      this.showOneImg = true
    },
    pageChange(val) {
      this.selectParams.page = val
      this._getDangerList()
    },
    showDetail(id, data, status){ //查看详情
      console.log(data)
      this.isDetail = true
      this.imgStatus = false
      this.editParams.id = id
      this.editParams.templateList = this.changeList( [data])
      if(status === '2') {   //完成之后才有图片
        this.imgStatus = true
      }
    },
    changeList(data){   //转换 requires  0false不是必填 1 true是必填 && i.editStr !==undefined
      let temp = data
      temp.map((item,index) => {
        item.list.map((i,idx)=> {
          if(i.array.length ===0){
              i.editStr =[i.editStr]
          } else{
            return
          }
        })
      })
      return temp
    },
    _getAllDangerResult(data){  //获取详细信息
      getAllDangerResult(qs.stringify(data)).then((res) => {    //獲取人員名字 人員號碼
        if(res){
          console.log(res)
          this.dangerParams.mark = res.dealNot
          this.handelParams.dealWay = res.dealWay
          // this.handelParams.pName = res.partitionName
          this.handelParams.endDate = res.dealDate
          this.endImgList = res.resultPicPath  //隐患图片
          let list = [] 
          let temp2 = []  //人员
          let temp3= []
          let temp4= []
          let temp = res.userList
          temp.map((item,index) =>{
            list.push({name:item.userName,tel: item.tel})
            temp2.push({personId:item.userId,username: item.userName})
            temp3.push(item.userId)
            temp4.push(item.tel)
          })
          this.telData= list
          this.personOptions = temp2
          this.handelParams.dealPserson = temp3
          this.personArr = temp3
          this.dangerParams.telNum = temp4.join(',')
        }

      })
    },
    clearForm(){
      this.dangerParams.mark = ''
      this.handelParams.dealWay = ''
      this.handelParams.pName = ''
      this.handelParams.endDate = ''
      this.dangerParams.telNum = ''
      this.handelParams.dealPserson = []
      this.telData = []
      this.personOptions = []
    },
    handelDangers(index, row){   //获取处理id
      this.isHandel = true
      this.clearForm()
      this.handelParams.id = row.id
      this.dangerParams.title = row.title
      this.beforImgList = row.dangerDetail.picUrl
      this.handelParams.partitionId = row.dealPersonPartition  //分区id数组
      let data = {id:this.handelParams.id}
      // 0是未完成
      if(row.status === '3'){  // 4处理中 3 未处理
        this.delTitle = '未处理'
        this.publishFlag = false
      }else if(row.status === '4'){
        this.delTitle = '处理中'
        this.publishFlag = false
        this._getAllDangerResult(data)
      }else if(row.status === '1'){
        this.delTitle = '逾期未完成'
        this.publishFlag = true
      }else if(row.status === '2'){
        this.delTitle = '完成'
        this.publishFlag = true
        this._getAllDangerResult(data)
      }else if(row.status === '5'){
        this.delTitle = '逾期完成'
        this.publishFlag = true
        this._getAllDangerResult(data)
      }
    },
    publishDanger(){   //发布处理
      this.handelParams.comPId = getUserInfo().comPId
      if(this.handelParams.dealPserson.length !==0 &&this.handelParams.pName !=='' &&  this.handelParams.partitionId!=''){
        if(this.handelParams.dealPserson instanceof Array){
          this.handelParams.dealPserson = JSON.stringify(this.handelParams.dealPserson)
        }else{
          this.handelParams.dealPserson = this.handelParams.dealPserson
        }
        this.handelParams.tel = JSON.stringify([])
        handelDanger(qs.stringify(this.handelParams)).then((res) => {
          console.log(res)
          if(res === '发布成功'){
            this.$message({type: 'success', message: res})
            this._getDangerList()
            this.isHandel = false
          }else{
            this.dangerParams.telNum = ''
            this.handelParams.dealPserson = []
            this.telData = []
            this.personOptions = []
            this.$message({type: 'error', message: res})
          }
        })
      }else{
        this.$message({type: 'error', message: '数据不对'})
      }
    },
  },
};
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.main-content
  margin-top:20px
  border-top:1px solid $color-border
  .dialog-form
    .template-container
      height:400px
      border:1px solid $color-border
      margin:0 70px 20px
      box-sizing:border-box
      border-radius(5px)
      .template-head
        position:relative
        // height: 30px
        padding:5px
        // background-color:$color-background-blue
        .title
          display:inline-block
          line-height:30px
          text-indent:10px
      .template-content
        height:300px
        overflow-y:auto
        overflow-x:hidden
        padding:10px
        li
          position:relative
          line-height:20px
          padding:10px
          margin-bottom:10px
          // background-color:#e6e6e6
          border-radius(5px)
  .search-container
    width:1000px
    padding:20px 0 30px 0
    font-size:0
    li
      display:inline-block
      width:600px
      height:40px
      line-height:40px
      margin-bottom:20px
      font-size:0
      &:nth-child(odd)
        width:400px
      &:nth-child(even)
        width:600px
      &:last-child
        margin-bottom:0
      &.input-group
        .title
          display:inline-block
          text-align:left
          margin-right:20px
          width: 64px
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:10px
  .table-container
    margin-top:10px
    border-radius(5px)
    overflow:hidden
    .cancel-btn
      padding:10px
      text-decoration:underline
      cursor:pointer
      color: #ef3a41
    .link-btn
      padding:10px
      text-decoration:underline
      cursor:pointer
      color: #f48c25
  .pagination-container
    text-align:right
    margin-top:30px
</style>
<style scoped>
.rotate-90{
    transform:rotate(90deg);
    transition: all 2s;
    }
  .rotate-180{
    transform:rotate(180deg);
    transition: all 2s;
  }
  .rotate-270{
    transform:rotate(90deg);
    transition: all 2s;
  }
    .rotate-360{
    transform:rotate(90deg);
    transition: all 2s;
  }
.img-link{
  display: inline-block;
  margin-left: 10px;
   color: #f48c25;
}
.img-link:hover{
  cursor: pointer;
}
.big-img{
  width: 800px;
  height: 1000px;
  margin: 0 auto;
}
.big-img img{
  width: 100%;
  height: 100%;
}
.big-img:hover{
  cursor: pointer;
}
.title-dm{
  margin-right: 20px;
}
.show-img{
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #409EFF;
}
.img-container{
  width: 500px;
  margin:0 auto;
}
.img-container li{
  width: 250px;
  float: left;
}
.img-container li p{
 margin-left: 50px;
}
.img-list{
  width: 200px;
  margin:0 auto;
}
  .img-list li{
    width: 135px;
    height: 120px;
    margin: 10px auto;
  }
  .img-list li img{
    width: 100%;
    height: 100%;
  }
  .item-img{
    text-align: center;
  }
  .title-container{
    position: relative;
  }
  .tooltip-container{
    position: absolute;
    top: -5px;
    left: 200px;
    height:40px;
    font-size:0;
    overflow: hidden;
  }
  .tooltip-container li{
    float:left;
    margin-right:30px;
    line-height:40px;
  }
  .tooltip-container li{
    float:left;
    margin-right:30px;
    line-height:40px;
  }
  .tooltip-container .text{
    display: inline-block;
    line-height: 40px;
    font-size: 14px;
  }
  .circle{
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .bg-1{
  background: #ff295c;
  }
 .bg-2{
    background: #ff742e;
  }
.bg-0{
background: #00c68d;
}
 .center-input{
  width: 400px;
  margin: 0 auto;
}
.specail-group{
  width: 100%;
  margin: 10px 0;
}
.specail-group span{
  display: inline-block;
  text-align: left;
  width: 64px;
  margin-right: 20px;
  font-size: 16px;
  vertical-align: top;
  margin-top:30px;
}
.specail-input{
  width: 600px;
}
.tree-container3{
 width: 600px;
max-height: 500px;
overflow: scroll;
border: 1px solid #d9d9d9;
position: absolute;
top:145px;
left:104px;
background: #fff;
/*z-index: 1000;*/
}
.my-tree-btns{
  width: 300px;
  margin: 0 auto;
}
.my-Tree1{
width: 500px;
height: 500px;
padding: 20px;
border: 1px solid #d9d9d9;
position: absolute;
top:152px;
left:560px;
background: #fff;
z-index: 300;
}
.tree-content{
max-height: 500px;
overflow-y: auto;
}
.search-container .inner-input{
  width: 200px!important;
  border: 1px solid #d9d9d9!important;
}
.buttons{
  width: 200px;
  margin: 0 auto;
}
.task-contant{
  width: 200px;
  line-height:20px;
  max-height:60px;
 text-overflow:ellipsis;
  display: -webkit-box;   
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
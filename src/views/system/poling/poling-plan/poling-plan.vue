<template>
  <div class="main-content" @click="hideTree($event)">
    <!-- 搜索框 -->
    <ul class="search-container">
      <li class="input-group">
          <span class="title">分区</span>
          <el-input class="inner-input my-input" @focus="onFoucs" v-model="treeStr" readonly id="fenqu"></el-input>
      </li>
      <li class="input-group">
          <span class="title">选择日期</span>
          <el-date-picker v-model="selectParams.date"  clearable type="date" placeholder="请选择日期" class="inner-input" value-format="yyyy-MM-dd"></el-date-picker>
          <el-button type="primary" style="width:120px;" @click="_getPolingPlanList">查询</el-button>
          <!-- <el-button style="width:120px;" @click="goPrint">打印预览</el-button> -->
      </li>
     </ul>
    <!-- 表格标题  finishDate endDate :show-overflow-tooltip="true" -->
    <table-title :title="'巡检计划列表'"></table-title>
    <!-- 表格 insType :filters="titleFilters" :filter-method="filterTitle" filter-placement="bottom-end"巡检类型-->
    <div class="table-container my-table">
       <el-button class="download-btn" @click="goPrint">打印预览</el-button>
      <!-- <el-button class="download-btn" @click="download">批量下载</el-button> -->
      <el-table :data="tableData" border stripe style="width: 100%;" @selection-change="selectRow">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="position" label="分区" ></el-table-column>
        <el-table-column prop="insTitle" label="巡检标题" ></el-table-column>
        <el-table-column prop="inTime" label="开始时间"></el-table-column>
        <el-table-column prop="finishDate" label="结束时间"></el-table-column>
        <el-table-column prop="freq" label="巡检频次"></el-table-column>
        <el-table-column  label="巡检人员" width="200">
          <template slot-scope="scope">
           <p class="task-contant"> {{scope.row.person}} </p>
          </template>
        </el-table-column>
        <el-table-column prop="dealPerson" label="执行人"></el-table-column>
        <el-table-column  label="巡检内容" width="200" >
          <template slot-scope="scope">
           <p class="task-contant"> {{scope.row.insContent}} </p>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
         <!--  -->
        <el-table-column label="审核" v-if="permission===1">
        <template slot-scope="scope">
          <!-- 未完成未审核 已完成未审核 已完成已审核 -->
          <span class="edit-btn" @click="_editTemplate(scope.row,scope.row.templates)" 
          v-if="scope.row.audit === 0 ">未审核</span>
          <span class="edit-btn" @click="_editTemplate(scope.row,scope.row.templates)"
           v-if="scope.row.audit === 1 ">已审核</span>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 图片弹框 -->
    <el-dialog class="check-container" :title="'图片列表'" width="600px" :visible.sync="isImgShow">
      <ul class="img-list clearfix">
        <li v-for="(item,index) in imgList" :key="index" @click="showBigImg(item)">
          <img :src="item" alt="">
        </li>
      </ul>
    </el-dialog>
    <!-- 图片弹框 -->
     <!-- 查看大图弹窗  transform:rotate(7deg); v-bind:style="styleObject"   :class="bigOne "-->
    <el-dialog class="check-container" :title="'图片列表'" center width="1080px" :visible.sync="bigImgShow">
      <div class="big-img" ref="bigImg"  @click="rotateImg($event)" id="root">
        <img :src="bigSrc" alt="" >
      </div>
  </el-dialog>
    <!-- 查看大图弹窗 -->
    <!-- 审核 -->
    <el-dialog  class="dialog-form" width="800px" :title="editTitle" :visible.sync="showFlag">
      <div class="template-container" v-for="(template,index) in editParams.templateList" track-by="index" :key="index">
        <header class="template-head">
          <div class="input-group">
            <span class="title">类型:</span>
            <span class="title title-dm">{{template.typeName}}</span>
          </div>
            <div class="input-group">
            <span class="title title-dm">{{template.title}}</span>
          </div>
        </header>
        <section class="template-content">
          <ul>
          <!--  未完成未审核 listType=== 0-->
          <li v-for="(item,idx) in template.list" :key="item.uid">
            <template-item :type="parseInt(item.type)" :defaultData="item.default" :result="item.result" :uid="editParams.id" v-if="listType=== 0" :status="0" :resultList=" []"></template-item>
             <!-- 已完成已审核可以查看图片 2-->
            <template-item :type="parseInt(item.type)" :defaultData="item.array.length ===0 ? item.defaultValue : item.array"  :resultList="item.array.length ===0 ? [item.editStr]:item.items"
            :status="2" :result =" '' " v-if="listType=== 2"></template-item> 
             <!-- 已完成未审核可以查看图片1-->
            <template-item :type="parseInt(item.type)"  :defaultData="item.array.length ===0 ? item.defaultValue : item.array" :resultList="item.array.length ===0 ? (item.editStr? [item.editStr]:[item.defaultValue]):item.items"
            :status="1" :result =" '' " v-if="listType=== 1"></template-item>          
          </li>
          </ul>
        </section>
        <ul class="template-foot">
          <li class="input-group" v-if="listType !== 0" style="margin-bottom:10px;">
            <span class="title title-s">巡检结果</span>
            <el-radio-group v-model="template.isHaveAqyh" disabled>
              <el-radio :label="true">存在隐患</el-radio>
              <el-radio :label="false">不存在隐患</el-radio>
            </el-radio-group>
            <span class="show-img" @click="showImg(template)" v-if="listType !== 0"> 查看图片 </span>
          </li>
          <li class="input-group" v-if="listType !== 0" style="margin-bottom:10px;">
            <span class="title title-s">审核结果</span>
               <el-radio-group v-model="template.isHarm">
              <el-radio :label="true">存在隐患</el-radio>
              <el-radio :label="false">不存在隐患</el-radio>
            </el-radio-group>
          </li>
          <li class="input-group" v-if="listType !== 0">
            <span class="title title-reson-s">审核依据</span>
            <el-input class="inner-input my-input2" type="textarea" :rows="3" placeholder="请输入审核依据" v-model="template.reason"></el-input>
          </li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer" v-if="imgStatus === true">
        <el-button type="primary" @click="editTemplate" :disabled="listType !== 1">确定</el-button>
        <el-button @click="showFlag=!showFlag">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 审核 -->
    <!-- 部门选择树状图 -->
    <div class="tree-container" v-show="isShowTree" id="tree">
      <div class="tree-content">
        <el-tree :data="treeData" show-checkbox node-key="id" default-expand-all ref="tree" highlight-current :props="defaultProps" check-strictly>
        </el-tree>
      </div>
      <div class="button-container" id="treeBtn">
        <el-button type="primary" @click="onConfirmPos">确认</el-button>
        <el-button @click="onCancelPos" id="clearBtn">清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import templateItem from './template-edit'

import {getTreeDataById, getPolingPlanList,getPolingPlanDetail,reportPlanDanger} from 'api/poling'
import {getDate} from 'common/js/time'
import getUserInfo from 'common/js/user'
import {getAllId} from 'common/js/allpid'
import {getPermissionById} from 'api/login'
import {myurl} from '@/api/config.js'
import {getZoneListByAuthority} from 'api/zone'

import qs from 'qs'

export default {
  props: {
    currentMenu: {
      type: Number,
      default:-1
    }
  },
  data () {
    return {
      treeData: [],
      isDanger: '1',
      checkOption: [{label: '合格', value: '1'}, {label: '不合格', value: '2'}],
      selectParams: {
        posIdList: JSON.stringify([]),
        date: '',
        allPId: getAllId(),
        inspectionId: JSON.stringify(getUserInfo().inspectionId),
        comPId: getUserInfo().comPId,
      },
      checkParams: {
        id: '',
        audit: ''
      },
      editParams: {
        id: '',
        templateList: [],
        confirm: 0
      },
      insType: 1,
      reportParams: {
        id: '',
        canNotPlays: [],   //不显示 
        canPlays: [],
      },
      rowList: [],
      showFlag: false,
      showCheck: false,
      imgStatus: false,
      tableData: [],
      typeFilters: [],
      titleFilters: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isShowTree: false,
      isImgShow: false,
      treeStr: '',
      permission: 0,
      listType: 0,
      imgList: [],
      editTitle: '',
      inspectionId: getUserInfo().inspectionId, //用户的巡检类型
      bigImgShow: false,
      bigSrc:'',
      r: 0,
    }
  },
  created() {
    let time = getDate()
    this.selectParams.date = `${time.year}-${time.month}-${time.date}`
    this._getTreeDataById()
    this._getPolingPlanList()
  },
  mounted() {
    getPermissionById({menuId: this.currentMenu}).then((res) => {
      this.permission = res
    })
  },
  watch: {
    currentMenu(newVal) {
      getPermissionById({menuId: newVal}).then((res) => {
        this.permission = res
      })
    }
  },
  methods: {
    goPrint(){
      let ids= [],workIds =[]
      this.rowList.map((item,index) =>{
        ids.push(item.id)
      })
      workIds = ids
      // this.$router.push({path: '/print',query: {workIds: workIds}})
      if(this.rowList.length!==0){
        this.$router.push({path: '/print',query: {workIds: workIds}})
      }else{
        this.$message({ type: 'warning', message: '请先选择要打印的计划'})
      }
    },
    getDanger(val){
      console.log(val)
    },
    _getTreeDataById() {
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.treeData = [res]
      })
    },
    _getPolingPlanList() {
    console.log(this.inspectionId) //用户的巡检类型
      getPolingPlanList(qs.stringify(this.selectParams)).then((res) => {
        // console.log(res.table)
        this.tableData = res.table
      })
      let typeNameList = []
      let tempTable = this.tableData1
    },
    selectRow(data) {
      this.rowList = data
    },
    printFile(){   //调出打印机
      window.print()
    },
    download() {
      let listStr = ''
      this.rowList.forEach((item, idx) => {
        listStr += `&id=${item.id}`
      })
      listStr = listStr.substring(1,listStr.length)
      if (listStr === '') {
        this.$message({ type: 'warning', message: '请先选择要下载的文件'})
        return false
      }
      let url =`${myurl}/web/workPlan/batchDownload.do?${listStr}`
      window.open(url)
    },
    checkRow() {
      this.axios.post('/web/workPlan/audit.do', qs.stringify(this.checkParams))
        .then((res) => {
          if (res.data === 1) {
            this.$message({
              type: 'success',
              message: '审核成功'
            })
          }
          this.showCheck = !this.showCheck
          this._getPolingPlanList()
        })
    },
    _checkRow(id, status) {
      if (status === '未审核') {
        this.checkParams.id = id
        this.showCheck = !this.showCheck
      }
    },
    _getPolingPlanDetail(data){
      getPolingPlanDetail(qs.stringify(data)).then((res) =>{
        if(res){
          console.log(res.canPlays)
          this.reportParams.canNotPlays  = res.canNotPlays  //不显示 
          this.editParams.templateList = res.canPlays
          this.insType = res.insType   //1上报为隐患不能再上报
        }
      })
    },
    _editTemplate(row, data) {
      console.log(row.audit)
      this.editParams.id = row.id
      this.showFlag  = true
      let myData = {
          wId: row.id,
          inspectionId:JSON.stringify(getUserInfo().inspectionId),
          comPId: getUserInfo().comPId
        }
      if(row.status === '已完成' && row.audit === 0) {   //已完成未审核
        this.imgStatus = true
        this.editTitle  ='待审核'
        this.listType = 1
        this._getPolingPlanDetail(myData)
      }else if(row.status === '已完成' && row.audit === 1) {   //已完成已审核
        this.imgStatus = true 
         this.editTitle  ='已审核'
          this.listType = 2
        this._getPolingPlanDetail(myData)
      }else{   //未完成未审核
        this.editTitle  ='待审核'
        this.imgStatus = false
         this.listType = 0
        this.editParams.templateList = data
      }
    },
    editTemplate() {  //上报隐患
      let data ={
        wId: this.editParams.id,   //任务id
        cpId:  getUserInfo().userId,   //上报人id
        comPId: getUserInfo().comPId,
        canPlays: JSON.stringify(this.editParams.templateList),
        canNotPlays: JSON.stringify(this.reportParams.canNotPlays)
      }
      reportPlanDanger(qs.stringify(data)).then((res) =>{
        console.log(res)
        if(res ==='提交成功'){
          this.$message({type: 'success',message: res})
          this.showFlag  = false
        }
      })
    },
    showImg(template){   //查看图片
      this.isImgShow = true
      console.log(template.picUrl)
      this.imgList = template.picUrl 
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
    handleDefault(data, index, idx) {
      this.editParams.templateList[index].list[idx]['result'] = data
    },
    onFoucs() {
      if (this.treeData.length !== 0) {
        this.isShowTree = true
      }
    },
    onConfirmPos() {
      let treeLabels = this.$refs.tree.getCheckedNodes()
      this.treeStr = this._filterTreeStr(treeLabels)
      this.selectParams.posIdList = JSON.stringify(this.$refs.tree.getCheckedKeys())
      this.isShowTree = false
    },
    onCancelPos() {
      this.$refs.tree.setCheckedKeys([])
      this.selectParams.posIdList = JSON.stringify([])
      this.treeStr = ''
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join('/')
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
    templateItem
  }
};
</script>
<style scoped>
  .title-dm{
    margin-right: 20px;
  }
  .title-danger{
    margin-right: 20px;
    font-weight: bolder;
  }
  .show-img{
    color: #409EFF;
    margin-left: 30px;
  }
  .img-list{
    width: 480px;
    margin: 0 auto;
  }
  .img-list li{
    float: left;
    width: 135px;
    height: 120px;
    margin: 10px 10px;
  }
  .img-list li img{
    width: 100%;
    height: 100%;
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
.my-input2{
  width: 462px!important;
}
.title-s{
  margin-right: 10px;
}
.title-reson{
  vertical-align: top;
  display: inline-block;
  width: 56px;
  margin-right:5px;
  margin-top: 20px;
}
.title-reson-s{
  vertical-align: top;
  display: inline-block;
  width: 56px;
  margin-right:10px;
  margin-top: 30px;
}
.template-foot{
  padding-left: 20px;
}
.template-foot .inner-input{
  min-height: 75px;
margin-bottom: 10px!important;
}
.task-contant {
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
          width:80px
          display:inline-block
          text-align:left
          margin-right:20px
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:40px
  .table-container
    position:relative
    margin-top:10px
    border-radius(5px)
    .edit-btn
      padding:10px
      text-decoration:underline
      cursor:pointer
      color:#f48c25
    .check-btn
      padding:10px
      text-decoration:underline
      cursor:pointer
    .download-btn
      position:absolute
      top: -60px
      right: 0
  .pagination-container
    text-align:right
    margin-top:30px
  .tree-container
    position:absolute
    top:160px
    left:250px
    width:420px
    max-height:500px
    padding:15px 40px
    z-index:300
    background: #fff
    border:1px solid $color-border
    border-radius(5px)
    .tree-content
      max-height:450px
      overflow-y:auto
    .button-container
      text-align:center
      margin-top:10px
	.dialog-form
	  .template-container
      // height:160px
      border:1px solid $color-border
      margin:0 70px 20px
      box-sizing:border-box
      border-radius(5px)
      .template-head
        position:relative
        line-height: 30px
        padding:5px
        // background-color:$color-background-blue
        .title
          display:inline-block
          line-height:30px
          text-indent:10px
      .template-content
        // height:100px
        // overflow-y:auto
        overflow-x:hidden
        padding:10px
        li
          position:relative
          line-height:20px
          padding:10px
          margin-bottom:10px
          // background-color:#e6e6e6
          border-radius(5px)
</style>
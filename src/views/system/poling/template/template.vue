<template>
  <div class="main-content">
    <!-- 搜索框 -->
    <ul class="search-container" >
      <li class="input-group">
         <span class="title">巡检内容</span>
         <el-input class="inner-input" v-model="selectParams.content" @keyup.native.enter="_getTemplateList"></el-input>
      </li>
      <li class="input-group">
        <span class="title">巡检标题</span>
        <el-select v-model="selectParams.title"  clearable placeholder="请选择"  class="inner-input" >
          <el-option v-for="item in titleOption" :key="item.id" :label="item.title" :value="item.title"></el-option>
          </el-select>
        <!-- <el-input class="inner-input" v-model="selectParams.title" @keyup.native.enter="_getTemplateList"></el-input> -->
      </li>
      <li class="btn-container">
        <el-button type="primary" @click="_getTemplateList" style="margin-left:90px">查询</el-button>
        <el-button type="primary" @click="_addNewTemplates" style="margin-left:50px">新增模板</el-button>
      </li>
    </ul>
    <!-- 表格标题 -->
    <table-title :title="'巡检模板列表'"></table-title>
    <!-- 表格  :show-overflow-tooltip="true" 超出提示-->
    <div class="table-container my-table">
      <el-table :data="tableData" border stripe style="width: 100%;">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <!-- <el-table-column prop="insTypeName" label="巡检类型"></el-table-column> -->
        <el-table-column prop="insTitle" label="巡检标题" width="200"></el-table-column>
        <el-table-column label="巡检内容" >
          <template slot-scope="scope">
           <p class="task-contant"> {{scope.row.insContent}} </p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button class="edit-btn" @click="_editTemplate(scope.row.id)" size="mini">编辑</el-button>
          <el-button size="mini" type="danger" class="del-btn" @click="_removeTemplatebyId(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-container">
        <el-pagination  @current-change="pageChange" :current-page="selectParams.page" 
         layout=" prev, pager, next, jumper" :total="totalPage"> </el-pagination>
    </div>
    <!-- 新增弹出框 -->
    <div class="my-dialog">
    <el-dialog  class="dialog-form" :title="editParams.type===0?'新增模板':'编辑模板'" width="880px" :visible.sync="showFlag"
    :closeOnClickModal ="false">
      <el-row>
        <el-col tag="ul" :span="17" class="input-container">
          <li class="input-group">
            <span class="title">巡检标题</span>
            <el-input class="inner-input" v-model="editParams.title" style="width:420px;"></el-input>
          </li>
          <li class="input-group">
            <span class="title title-dm">巡检内容</span>
            <el-input class="inner-input" type="textarea" :rows="5" v-model="editParams.content" style="width:420px;"></el-input>
          </li>
          <li class="input-group">
            <span class="title">模板类型</span>
              <el-radio-group v-model="editParams.templateType">
                <el-radio :label="1">定期巡检</el-radio> <el-radio :label="0">日常巡检</el-radio>
              </el-radio-group>
          </li>
        </el-col>
        <el-col :span="9">
    <!--        <img :src="imgPath===''?'static/img/blank.jpg':imgPath" alt="二维码" width="160px" height="160px">
           <p>鼠标右键另存为保存图片</p> -->
        </el-col>
      </el-row>
      <div class="template-container" v-for="(template,index) in templateList" track-by="index" :key="index">
        <header class="template-head">
          <span class="input-group">
            <span class="">标题</span>
            <el-input class="inner-input"  v-model="template.title" placeholder="标题"></el-input>
          </span>
           <span class="input-group">
            <!-- getTypename -->
            <span class="title" style="text-align:right;">巡检类型</span>
            <el-select class="inner-input" v-model="template.typeId" placeholder="请选择">
              <el-option v-for="item in typeOption1" :key="item.id" :label="item.insTypeName" :value="item.id"></el-option>
         </el-select>
          </span>
<!--           <span>巡检类型</span>
          <input type="text" v-model="template.title" name="" placeholder="巡检类型"> -->
          <i class="icon el-icon-circle-close-outline" @click="cutTemplate(index)"></i>
          <i class="icon" :class="showIndex===index?'el-icon-remove-outline':'el-icon-circle-plus-outline'" @click="addItem(index)"></i>
          <transition name="el-zoom-in-top">
            <ul class="template-option" v-if="showIndex===index" @click="selectItem($event,index)">
              <li data-type="1">任务说明</li>
              <li data-type="2">单选</li>
              <li data-type="3">多选</li>
              <li data-type="5">备注</li>
            </ul>
          </transition>
        </header>
        <section class="template-content">
          <ul>
            <li v-for="(item,idx) in template.list" :key="item.uid">
              <el-checkbox v-model="item.required" :disabled="item.type === 1">必填项</el-checkbox>
              <p v-if="item.type == 2" style="padding-top:10px;">单选</p>
              <p v-if="item.type == 3" style="padding-top:10px;">多选</p>
               <template-item :type="item.type" :index="index" :idx="idx" @handleDefault="handleDefault" @handleDel="handleDel" :defaultData="item.default"></template-item>
            </li>
          </ul>
        </section>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addTemplate">+ 新增模块</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
        <el-button @click="showFlag=!showFlag">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import templateItem from './template-item'

import {getAllPolingType, getTemplateList, getTemplatebyId, removeTemplatebyId, getAllTitle} from 'api/poling'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
import qs from 'qs'
import {myurl} from '@/api/config.js'

export default {
  data () {
    return {
      radio2: 1,
      typeOption: [{id: -1, insTypeName: '所有类型'}],
      typeOption1: [],
      titleOption: [],
      selectParams: {
        typeId: -1,
        content: '',
        title: '',
        page: 1,
        size: 15,
        comPId: getUserInfo().comPId
      },
      editParams: {
        templateType: 1,
        type: 0,
        typeId: '',
        typeName: '',
        title: '',
        content: '',
        id: ''
      },
      totalPage: 10,
      showFlag: false,
      tableData: [],
      showIndex: -1,
      templateList: [],
      imgPath: ''
    }
  },
  created() {
    this._getAllPolingType()
    this._getTemplateList()
    this._getAllTitle()
  },
  methods: {
     _getAllTitle(){   //获取标题
      getAllTitle().then((res) => {
        this.titleOption = res
      })
    },
    _getAllPolingType() {
      getAllPolingType().then((res) => {
        this.typeOption = this.typeOption.concat(res)
        this.typeOption1 = res
      })
    },
    // getTypename(val){
    // },
    _getTemplateList() {
      let data = this.selectParams
      getTemplateList(qs.stringify(data)).then((res) => {
        if (res.status === 1) {
          this.tableData = res.list
        }
        this.totalPage = res.totalPage === 0 ? 10 : res.totalPage * 10
      })
    },
    _getTemplatebyId(data) {
      getTemplatebyId(data).then((res) => {
        this.editParams.typeId = res.insTypeId
        this.editParams.typeName = res.insTypeName
        this.editParams.title = res.insTitle
        this.editParams.content = res.insContent
        this.editParams.id = res.id
        this.editParams.templateType = res.templateType
        this.templateList =  this.editChangeList(JSON.parse(res.insDetail))
      })
    },
    _removeTemplatebyId(id) {
      let data = {
        id: id
      }
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          removeTemplatebyId(data).then((res) => {
            if (res === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this._getTemplateList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addNewTemplates() {
      let list = this.changeList()
      this.typeOption1.forEach((item, idx) => {
        list.forEach((i,index) => {
          if (i.typeId === item.id) {
            i.typeName = item.insTypeName
          }
        })
      })
      let data = {
        title: this.editParams.title,
        content: this.editParams.content,
        templateType: this.editParams.templateType,
        templates: JSON.stringify(list),
        comPId: getUserInfo().comPId
      }
      console.log(data)
      this.axios.post('/inspection/addInspectionTemplate.do', qs.stringify(data))
        .then((res) => {
          if (res.data === 1) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
          }
          this.showFlag = !this.showFlag
          this._getTemplateList()
        })
    },
    changeList(){   //转换 requires  0false不是必填 1 true是必填
      let temp = this.templateList
      temp.map((item,index) => {
        item.list.map((i,idx)=> {
          if(i.required){
            i.required = 1
          } else{
            i.required = 0
          }
        })
      })
      return temp
    },
    editChangeList(data){   //转换 requires  0false不是必填 1 true是必填
      let temp = data
      temp.map((item,index) => {
        item.list.map((i,idx)=> {
          if(i.required === 1){
            i.required = true
          } else{
            i.required = false
          }
        })
      })
      return temp
    },
    editTemplate() {
      let list = this.changeList()
      this.typeOption1.forEach((item, idx) => {
        list.forEach((i,index) => {
          if (i.typeId === item.id) {
            i.typeName = item.insTypeName
          }
        })
      })
      let data = {
        id: this.editParams.id,
        title: this.editParams.title,
        content: this.editParams.content,
        templates: JSON.stringify(list),
        templateType: this.editParams.templateType,
        comPId: getUserInfo().comPId
      }
      this.axios.post('/inspection/editInsTemp.do', qs.stringify(data))
        .then((res) => {
          if (res.data === 1) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
          this.showFlag = !this.showFlag
          this._getTemplateList()
        })
    },
    _addNewTemplates() {
      this.editParams.typeId = ''
      this.editParams.typeName = ''
      this.editParams.title = ''
      this.editParams.content = ''
      this.templateList = [
        {
          title: '',
          typeId: '',   //巡检类型
          typeName: '',  //巡检类型对应的名字
          list: [
            {
              uid: Math.random(),
              type: parseInt(1),
              default: [],
              required: true,
            },
            {
              uid: Math.random(),
              type: parseInt(2),
              default: [],
              required: true,
            },
            {
              uid: Math.random(),
              type: parseInt(3),
              default: [],
              required: true,
            },
            {
              uid: Math.random(),
              type: parseInt(5),
              default: [],
              required: true,
            },
          ]
        }
      ]
      this.editParams.templateType = 1
      this.editParams.type = 0
      this.showFlag = !this.showFlag
    },
    _editTemplate(id) {
      let data = {
        id: id
      }
      this._getTemplatebyId(data)
      this.editParams.type = 1
      this.showFlag = !this.showFlag
    },
    pageChange(page) {
      this.selectParams.page = page
      this._getTemplateList()
    },
    confirmAdd() {
      if (this.editParams.type === 0) {
        this.addNewTemplates()
      } else {
        this.editTemplate()
      }
    },
    // 模板
    selectType(data) {   //获取巡检类型的名字 现在无效了
      let name = ''
      this.typeOption1.forEach((item, idx) => {
        if (data === item.id) {
          name = item.insTypeName
        }
      })
      this.editParams.typeName = name
    },
    addTemplate() {
      if(this.templateList.length === 20){
          // this.addDisable = true
      } else{
        this.templateList.push({
          title: '',
          typeId: '',   //巡检类型
          typeName: '',  //巡检类型对应的名字
          list: [
            {
              uid: Math.random(),
              type: parseInt(1),
              default: [],
              required: true,
            },
            {
              uid: Math.random(),
              type: parseInt(2),
              default: [],
              required: true,
            },
            {
              uid: Math.random(),
              type: parseInt(3),
              default: [],
              required: true,
            },
            {
              uid: Math.random(),
              type: parseInt(5),
              default: [],
              required: true,
            },
          ]
        })
      }
    },
    cutTemplate(index) {
      this.templateList.splice(index, 1)
    },
    addItem(index) {
      this.showIndex = this.showIndex===index ? -1 : index
    },
    selectItem(e,index) {
      console.log(e.target.dataset.type);
      this.templateList[index].list.push({
        uid: Math.random(),
        type: parseInt(e.target.dataset.type),
        default: [],
        required: true,
      })
      this.showIndex = -1
    },
    handleDefault(data, index, idx) {
      this.templateList[index].list[idx].default = data
      console.log(this.templateList)
    },
    handleDel(index, idx) {
      this.templateList[index].list.splice(idx, 1)
    }
  },
  components: {
    tableTitle,
    templateItem
  }
};
</script>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.main-content
  margin-top:20px
  border-top:1px solid $color-border
  .search-container
    width:800px
    padding:20px 0 30px 0
    font-size:0
    li
      display:inline-block
      width:400px
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
  .table-container
    margin-top:10px
    border-radius(5px)
    overflow:hidden
    // .edit-btn
    //   padding:10px
    //   text-decoration:underline
    //   cursor:pointer
    //   color:#f48c25
    // .del-btn
    //   padding:10px
    //   text-decoration:underline
    //   cursor:pointer
    //   color:#ef3a41
  .pagination-container
    text-align:right
    margin-top:30px
  .dialog-form
    ul.input-container
      padding-left:70px
    .input-group
      margin-bottom:20px
    .input-group .title
      width:80px
      display:inline-block
      font-size:14px
      text-align:left
      vertical-align:middle
    .input-group .inner-input
      width:220px
      &.large
        width:740px
        .inner-input
          width:500px
        .img-upload
          width:80px
          display:inline-block
          margin-left:20px
      &.small
        width:110px
    .template-container
      border:1px solid $color-border
      margin:0 70px 20px
      box-sizing:border-box
      border-radius(5px)
      .template-head
        position:relative
        height: 40px
        padding:10px
        background-color:$F8F8F8
        input
          display:inline-block
          width:150px
          outline:none
          height:20px
          border:1px solid $color-border
        .icon
          display:inline-block
          float:right
          font-size:18px
          line-height:30px
          margin-right:20px
          cursor:pointer
        .template-option
          position:absolute
          right:-90px
          top:0
          width:120px
          padding:10px
          background-color:#fff
          z-index:1000
          border-radius(5px)
          border:1px solid $color-border
          li
            height:30px
            line-height:30px
            cursor:pointer
      .template-content
        overflow-y:auto
        overflow-x:hidden
        padding:10px
        li
          position:relative
          line-height:20px
          padding:10px
          margin-bottom:10px
          background-color:#f8f8f8
          border-radius(5px)
</style>
<style scoped>
  .my-dialog{
    max-height: 800px;
    overflow-y: auto;
  }
  .title-dm{
    margin-top: -100px;
  }
  /* 多浏览器 */
/*   .task-contant {
    width: 600px;
    position:relative;
    line-height:20px;
    height:60px;
    overflow:hidden;
}
.task-contant::after {
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 20px 1px 45px;
    background:url(http://css88.b0.upaiyun.com/css88/2014/09/ellipsis_bg.png) repeat-y;
} */
/* 谷歌浏览器 */
  .task-contant{
    width: 600px;
    line-height:20px;
    max-height:60px;
   text-overflow:ellipsis;
    display: -webkit-box;   
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>

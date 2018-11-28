<template>
 <el-card>
  <div class="plan-container" @click="hideTree($event)">
    <el-row :gutter="20">
     <!-- 基本信息 -->
     <el-col :span="16" class="baseInfo-container">
       <div class="item-title">基本信息</div>
        <el-form :inline="true" :model="formData" label-width="120px">
          <div class="form-items">
            <el-form-item label="姓名">
              <el-input v-model="formData.username" readonly></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="formData.sex" readonly></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="年龄">
              <el-input v-model="formData.age"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码">
              <el-input v-model="formData.idCard"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="当前工种/职务"  >
              <el-input v-model="formData.job" readonly></el-input>
            </el-form-item>
            <el-form-item label="体检类型">
              <el-input v-model="formData.checkType" readonly></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="当前分区" >
               <el-input v-model="formData.position" readonly style="width:575px"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="可调分区" >
              <el-input v-model="formData.aimPosName" placeholder="" @focus="onFocus" style="width:575px" id="fenqu" readonly></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="预调工种/职务">
              <el-select v-model="aimJobId" multiple placeholder="请选择" style="width:575px" @change="selectJob">
                  <el-option v-for="item in jobOptions" :key="item.jid" :label="item.jobsName" :value="item.jid"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
     </el-col>
     <!-- 结果 -->
     <el-col :span="8" class="result-list">
       <div class="item-title">历年职业结论</div>
       <ul class="result">
        <li v-for="(item,index) in posResult" :key="index">
          <span>{{item.date}}</span>
          <span class="text">{{item.result}}</span>
        </li>
       </ul>
       <div class="item-title">体检结果</div>
       <div class="result">
          <p>{{checkResult}}</p>
       </div>
     </el-col>
    </el-row>
    <!-- 部门选择树状图 -->
    <div class="tree-container" v-show="isShowTree" id="tree">
      <div class="tree-content">
        <el-tree :data="treeData" show-checkbox node-key="positionId"  default-expand-all ref="tree" highlight-current :props="defaultProps" @check="onCheckPos" check-strictly :render-content="renderContent">
        </el-tree>
      </div>
    </div>
     <div class="btn-container">
        <el-button type="primary" @click="onConfirm">确 定</el-button>
        <el-button @click="onCancel" style="color:">取 消</el-button>
      </div>
  </div>
  </el-card>
</template>

<script>
import {getPosCanBeTran, getPositiveResult, getJobsById, getCheckResult} from 'api/position'
import getUserInfo from 'common/js/user'
import qs from 'qs'

export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      selectDepartment: false,
      formData:{
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'positionName'
      },
      jobOptions: [],
      aimJobId: [],
      posResult: [],
      checkResult: '',
      isShowTree: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.formData = this.data
      this._getPosCanBeTran()
      this._getPositiveResult()
      this._getCheckResult()
      this.formData.aimPosName = this.formData.aimPosId = ''
      this.aimJobId = []
      // this.formData.aimJobId = ''
    })
  },
  watch: {
    'data.recordId'() {
      this.formData = this.data
      this._getPosCanBeTran()
      this._getPositiveResult()
      this._getCheckResult()
    }
  },
  methods: {
    _getPosCanBeTran() {
      getPosCanBeTran({partitionId: this.formData.positionId,
        comPId: getUserInfo().comPId
      })
      .then((res) => {
        console.log([res])
        this.treeData = [res]
      })
    },
    _getPositiveResult() {
      getPositiveResult({userId: this.formData.userId}).then((res) => {
        this.posResult = res
      })
    },
    _getCheckResult() {
      getCheckResult({recordId: this.formData.recordId}).then((res) => {
        this.checkResult = res
      })
    },
    _getJobsById() {
      let listStr = JSON.stringify([this.formData.aimPosId])
      getJobsById(qs.stringify({posIdList: listStr})).then((res) => {
        this.jobOptions = res
      })
    },
    onFocus() {
      this.isShowTree = true
    },
    onCheckPos(e) {
      this.formData['aimPosId'] = e.positionId
      this.formData['aimPosName'] = e.positionName
      this.$refs.tree.setCheckedKeys([e.positionId])
      this._getJobsById()
      this.aimJobId = []
      this.isShowTree = false
    },
    selectJob(data) {
      // this.formData['aimJobId'] = data
      let ret = []
      this.jobOptions.forEach((item,idx) => {
        if (item.jid === data[idx]) {
          ret.push(item.jobsName)
        }
      })
      this.formData['aimJobName'] = ret.join('、')
    },
    onConfirm() {
      this.$emit('onConfirm', this.formData)
    },
    onCancel() {
      this.$emit('onCancel')
    },
    hideTree(e) {
      if (e.target.id === '') {
        this.isShowTree = false
      }
    },
    renderContent(h, {node, data, store}) {
      let str = ''
      if (data.recommend === '推荐') {
        str = 'color:#00c68d'
      } else {
        str = 'color:#ff295c'
      }
      // return `<span style=${str}>${data.positionName}${data.recommend}${data.num}人</span>`
      return (<span style={str}>{data.positionName+' ('+data.recommend+','+data.num+'人)'}</span>)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.plan-container
  position:relative
  .item-title
    background-color: #e2eff3
    height: 40px
    width: 100%
    line-height: 40px
    font-size: 18px
    text-indent: 20px
  .baseInfo-container .item-title
    margin-bottom:20px
    .inner-input
      width:220px
  .btn-container
    text-align:center
  .tree-container
    position:absolute
    bottom:0px
    left:160px
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
      width:100%
      text-align:center
      height:40px
      margin-top:10px 
  .result-list
    .result
      padding:10px 20px
      border: 1px solid #ccc;
      min-height: 150px;
      margin-bottom: 20px;
      li
        height:30px
        line-height:30px
        .text
          float:right
          display:inline-block
          width: 200px
          overflow: hidden
          text-align:right
          text-overflow: ellipsis
          white-space: nowrap
</style>
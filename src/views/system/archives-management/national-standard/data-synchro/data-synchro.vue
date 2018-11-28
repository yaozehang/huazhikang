<template>
  <div class="synchro-container">
    <div class="select-date clearfix">
      <span class="fileDate">
        <span style=" margin-right:20px;">归档时间：</span>
         <el-date-picker v-model="selectParams.targetYear" disabled type="year" value-format="yyyy"  class="choose-year-data" > </el-date-picker>
      </span>
      <span class="fileDate">
        <span style=" margin-right:20px;">历史模板</span>
          <el-select v-model="year" filterable  placeholder="请输入关键词" @change="_getTreeData">
          <el-option v-for="(item,index) in chooseList" :key="item.year"  :label="item.year" :value="item.year">
          </el-option>
        </el-select>
      </span>
       <span class="fileDate">
         <el-button type="primary" class="" @click="onConfirmParent"> 确定父级 </el-button>
        <el-button type="primary" class="" @click="onConfirmPart"> 确定数据 </el-button>
        <el-button type="primary" class="" @click="confirmAdd" :disabled="disabledBtn"> 同步 </el-button>
      </span>
      <!-- <div type="primary" class="center-btn" @click="onConfirmPart"> 同步 </div> -->
  </div>
  <div class="list-title-all border-bottom">
    <button class="title-btn">数据同步</button>
    <el-button class="return" @click="goBack" >返回</el-button>
  </div>
  <div class="data-container clearfix">
    <div class="choose-data text-ellipsis" >
      <p class="data-title">基础数据</p>
    <!-- 可选择树状图  :default-checked-keys="disableList" check-strictly  getCheck -->
      <div class="my-data-tree">
        <el-tree :data="treeData"   show-checkbox node-key="id" default-expand-all ref="tree" highlight-current
         :props="defaultProps"  class="tree-data" @check="getCheck">
      </el-tree>
    </div>
    <!-- 可选择树状图 -->
     </div>
<!--    <div class="choose-options">
      <el-button type="primary" class="" @click="onConfirmPart"> 同步 </el-button>
    </div> -->
    <div class="synchro-data text-ellipsis" >
      <p class="data-title">同步结果</p>
         <!-- 可选择树状图  check-strictly-->
      <div class="my-resulet-tree" v-loading="loading2"  element-loading-text="等待同步..."
     element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-tree :data="treeData1"  node-key="id" default-expand-all ref="tree1" highlight-current
         :props="defaultProps"  class="tree-result">
      </el-tree>
    </div>
    <!-- 可选择树状图 -->
     </div>
  </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
import {getTreeData,getTemplate,dataSynchro} from 'api/archives'
import {getDate} from 'common/js/time'
export default {
  name: 'SelfCheck',
  components: {
  },
  data () {
    return {
      archivesDate: '',
      loading1: false,
      loading2: false,
      isSelectData: true,
      disabledBtn: true,
      year: '',
      curDate: '',
      treeData: [],
      treeData1: [],
      disableList: [],
      fileList: [],
      fileList1: [],
      selectParams: {
        comPId: getUserInfo().comPId,
        year: '',   //模板的时间 初始模板为当前年 其他年份 为年份
        targetYear: this.$route.query.year,
        bigId: [],
        smallId: [],
        floderId: [],
        fileId: [],
        type: 1,  //1 初始模板 2 年份
      },
      bigId: [],
      smallId: [],
      floderId: [],
      fileId: [],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      chooseList: []
    }
  },
  created() {
    if(this.treeData.length !==0) {
      this.loading1 = false
    }
    if(this.treeData1.length !==0) {
      this.loading2  = false
    }
  },
  mounted() {
    this._getTemplate()
  },
  methods: {
    goBack(){
      this.$router.push({path:'/wrap/archives/nation/check',query: {menuId:4, name:'职业健康监护档案'}})
    },
    _getTemplate(){   //获取历史模板下拉
      let data = {
        year: this.selectParams.targetYear,
        comPId: getUserInfo().comPId
      }
      getTemplate(qs.stringify(data)).then((res) => {
        console.log(res)
        this.chooseList = res
      })
    },
    _dataSynchro(){
      dataSynchro(qs.stringify(this.selectParams)).then((res) => {
        console.log(res)
        if(res === '同步成功'){
          this.$message({ message: res,type: 'success',center: true,})
          this.disabledBtn = true
          this._getResultData()
        }
      })
    },
    _getTreeData(val){   //type 1 是初始模板 2 是年份
      this.loading1 = true
      this.treeData = []
      this.selectParams.year = val
      let  type = 0
      if(val === '初始模板'){
        type = 1
        this.selectParams.type = 1
        this.selectParams.year = this.selectParams.targetYear
      } else {
        type = 2
        this.selectParams.type = 2
      }
      let data = {
        comPId: getUserInfo().comPId,
        year: this.selectParams.year,
        type: type
      }
      getTreeData(qs.stringify(data)).then((res) => {
        console.log(res)
        let temp = []
        this.loading1 = false
        if(res.length !==0){
          this.treeData = res
          this.treeData.map((item,index)=> {
          if(item.disabled){
            temp.push(item.id)
            this.bigId.push(item.id)
          }
          item.child.map((i,idx)=>{
            if(i.disabled){
              temp.push(i.id)
              this.smallId.push(i.id)
            }
          })
        })
          this.disableList = temp
          console.log(this.disableList)  //设置默认宣选中
        }
      })
    },
      _getResultData(){   //type 1 是初始模板 2 是年份
      this.loading1 = true
      this.treeData = []
      let  type = 0
      if(this.year === '初始模板'){
        type = 1
      } else {
        type = 2
      }
      let data = {
        comPId: getUserInfo().comPId,
        year: this.selectParams.targetYear,
        type: type
      }
      getTreeData(qs.stringify(data)).then((res) => {
        this.treeData1 = res
      })
    },
    getCheckData(id){
      this.$refs.tree.getNode(id).parent.checked = true
      return this.$refs.tree.getNode(id).parent.data.id
    },
    getCheck(val){   //选中两级父级
      console.log(this.getCheckData(val.id))
      console.log(this.$refs.tree.getNode(val.id).parent)
      let temp =this.$refs.tree.getNode(val.id).parent
      if(this.$refs.tree.getNode(val.id).parent){
        let temp = this.$refs.tree.getNode(val.id).parent
        let pId = this.$refs.tree.getNode(val.id).parent.data.id
         temp.checked = true
         // if(this.$refs.tree.getNode(pId).parent){
         //    this.$refs.tree.getNode(pId).parent.checked = true
         //    let pId2 =this.$refs.tree.getNode(pId).parent.data.id
         //    if(this.$refs.tree.getNode(pId2).parent){
         //      this.$refs.tree.getNode(pId2).parent.checked = true
         //       let pId3 =this.$refs.tree.getNode(pId2).parent.data.id
         //      if(this.$refs.tree.getNode(pId3).parent){
         //        this.$refs.tree.getNode(pId3).parent.checked = true
         //          let pId4 =this.$refs.tree.getNode(pId3).parent.data.id
         //          if(this.$refs.tree.getNode(pId4).parent){
         //            this.$refs.tree.getNode(pId4).parent.checked = true
         //          }
         //      }
         //    }
         // }
      }
    },
    checkedArray(data){
      if(this.$refs.tree.getNode(data).parent){
        let temp = this.$refs.tree.getNode(data).parent
        let pId = this.$refs.tree.getNode(data).parent.data.id
         temp.checked = true
      }
    },
    onConfirmParent(){ //选中多级父级
      // [].concat(this.$refs.tree.getCheckedKeys(), this.$refs.tree.getHalfCheckedKeys())
      let temp = this.$refs.tree.getCheckedNodes()  
      temp.map((item,idx) =>{
        this.checkedArray(item.id)
      }) 
      let temp2 = this.$refs.tree.getCheckedNodes()
      temp2.map((item,index) => {
        this.checkedArray(item.id)
      })
    },
    onConfirmPart() {   //选定同步数据  type 1 大类型 2 小类型 3 文件夹 4 文件
      this.floderId = []
      this.fileId = []
      let temp = this.$refs.tree.getCheckedNodes()     
      // this.fileList = JSON.stringify(this.$refs.tree.getCheckedKeys())
      temp.map((item,index) => {
        if(item.type=== 1) {
          this.bigId.push(item.id)
        }else if (item.type=== 2) {
          this.smallId.push(item.id)
        }else if (item.type=== 3) {
          this.floderId.push(item.id)
        }else if (item.type=== 4) {
          this.fileId.push(item.id)
        }
      })

      this.selectParams.bigId = JSON.stringify(this.bigId)
      this.selectParams.smallId = JSON.stringify(this.smallId)
      this.selectParams.floderId = JSON.stringify(this.floderId)
      this.selectParams.fileId = JSON.stringify(this.fileId)
      console.log(this.selectParams,temp)
      if(this.disableList.length !==0){
        this.disabledBtn = false
      }
    },
    confirmAdd(){   
      this._dataSynchro()
    }
  }
}
</script>
<style>
.synchro-container .el-tree-node__label{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  }
</style>
<style lang="css" scoped>
.data-container .data-title{
  height: 40px;
  line-height: 40px;
  color: #f37c03;
  font-size: 18px;
  text-align: left;
}
.center-btn:hover{
  cursor: pointer;
}
.text-ellipsis{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.synchro-container{
  width: 100%;
  padding: 20px;
}
.search-btn{
  display: inline-block;
  float: right;
}
.selfCheck-container{
  width: 100%;
}
.search-btn{
  display: inline-block;
  float: right;
}
.choose-data,.choose-options{
float: left;
height: 650px;
text-align: center;
}
.synchro-data{
float: right;
height: 650px;
}
.choose-data,.synchro-data{
width: 49%;
}
.choose-options{
  width: 100px;
  padding: 0 10px;
  margin: 0 auto;
}
.cur-date{
  width: 100px;
}
.label-time{
  height: 40px;
  line-height: 40px;
}
.center-btn{
  width: 80px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #409eff;
  margin: 20px auto;
  color: #fff;
}
.my-data-tree,.my-resulet-tree{
  border: 1px solid #eee;
  width: 100%;
  height: 600px;
  max-height: 650px;
  overflow-y: auto;
}
/*.tree-data{
  position: absolute;
  left:230px;
  width: 600px;
  height: 600px;
  max-height: 650px;
}
.tree-result{
  position: absolute;
  left:230px;
  width: 600px;
  height: 600px;
  max-height: 650px;
}*/
.tree-item{
  width: 500px;
}
.return{
  display: inline-block;
  float: right;
  margin-right: 20px;
}
</style>

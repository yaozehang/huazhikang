<template>
  <div class="selfCheck-container">
  <div class="list-title-all border-bottom">
    <el-button class="title-btn" type="text">分区迁移</el-button>
  </div>
  <div class="data-container clearfix">
    <div class="choose-data" >
     <p class="data-title">基础数据</p>
    <!-- 可选择树状图  -->
      <div class="my-Tree" >
        <el-tree :data="treeData"   show-checkbox node-key="id" default-expand-all ref="tree" highlight-current
         :props="defaultProps" check-strictly  class="tree">
      </el-tree>
    </div>
    <!-- 可选择树状图 -->
     </div>
    <div class="choose-options">
      <div type="primary" class="center-btn" @click="confirmAdd"> 合并 </div>
    </div>
    <div class="synchro-data">
       <p class="data-title">迁移数据</p>
         <!-- 可选择树状图  -->
      <div class="my-Tree2">
        <el-tree :data="treeData1"   show-checkbox node-key="id" default-expand-all ref="tree1" highlight-current
         :props="defaultProps" check-strictly  class="tree">
      </el-tree>
    </div>
    <!-- 可选择树状图 -->
     </div>
  </div>
    </div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {getZoneListByAuthority} from 'api/zone'
export default {
  name: 'SelfCheck',
  components: {
  },
  data () {
    return {
      archivesDate: '',
      isSelectData: true,
      year: '',
      treeData: [],
      treeData1: [],
      fileList: [],
      fileList1: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      chooseList: [ 
      {
        id: 1,
        name:'初始模板'
      },
      {
        id: 2,
        name:'2017'
      },
      {
        id: 3,
        name:'2018'
      }
      ]
    }
  },
  created() {
  },
  mounted() {
    this.getFileList()
  },
  methods: {
    getFileList() {
       let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.treeData = [res]
        this.treeData1 = [res]
      })
    },
    onConfirmPart() {   //选定同步数据
      let temp = this.$refs.tree.getCheckedNodes()      
      this.fileList = JSON.stringify(this.$refs.tree.getCheckedKeys())
      console.log(this.fileList)
    },
    confirmAdd(){   //确定同步数据
      let temp = this.$refs.tree1.getCheckedNodes()      
      this.fileList1 = JSON.stringify(this.$refs.tree1.getCheckedKeys())
      console.log(this.fileList1)
    }
  }
};
</script>

<style lang="css" scoped>
.center-btn:hover{
  cursor: pointer;
}
.data-title{
  height: 40px;
  line-height: 40px;
  color: #f37c03;
  font-size: 18px;
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
}
.synchro-data{
float: right;
height: 650px;
}
.choose-data,.synchro-data{
width: 40%;
}
.choose-options{
  width: 100px;
  padding: 0 10px;
  margin: 0 auto;
}
.center-btn{
  width: 80px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #409eff;
  margin: 150px auto;
  color: #fff;
}
.my-Tree,.my-Tree2{
  border: 1px solid #eee;
  width: 600px;
  height: 600px;
  max-height: 650px;
  overflow-y: auto;
  z-index: 300;
  background: #FFF;
}
.return{
  display: inline-block;
  float: right;
  margin-right: 20px;
}
</style>

<template>
  <div class="selfCheck-container">
  <div class="data-container clearfix">
    <div class="choose-data" >
      <div class="input-gruop">
        <span class="data-title" @click="selectData">基础数据</span>
        <el-input v-model="form.baseZone"   class="inner-input"></el-input>
      </div>
    <!-- 可选择树状图  -->
      <div class="my-zone-tree" v-show="isSelectData">
        <el-tree :data="zoneData"   show-checkbox node-key="id" default-expand-all ref="tree" highlight-current
         :props="defaultProps" check-strictly  class="tree" @check="confirmZone">
      </el-tree>
    </div>
    <!-- 可选择树状图 -->
     </div>
    <div class="choose-options">
      <div type="primary" class="transfer-btn" @click="confirmTransfer"> 合并 </div>
    </div>
    <div class="synchro-data">
        <div class="input-gruop">
        <span class="data-title"  @click="selectData2">迁移数据</span>
        <el-input v-model="form.delzone"   class="inner-input"></el-input>
      </div>
         <!-- 可选择树状图  -->
      <div class="my-zone-tree2"  v-show="isSelectData2">
        <el-tree :data="zoneData"   show-checkbox node-key="id" default-expand-all ref="tree1" highlight-current
         :props="defaultProps" check-strictly  class="tree" @check="confirmZone2">
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
  props:{
    zoneData: Array,
    // targetPId: Number,
    // oldPId: Number,
  },
  components: {
  },
  data () {
    return {
      isSelectData: true,
      isSelectData2: true,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        baseZone: '',
        delzone: ''
      },
      keyList: {
        targetPId: '',
        oldPId: '',
        comPId: getUserInfo().comPId,
      }
    }
  },
  created() {
  },
  mounted() {
    this.keyList.comPId = getUserInfo().comPId
    // this.getFileList()
  },
  methods: {
    selectData(){
      this.isSelectData = true
    },
    selectData2(){
      this.isSelectData2 = true
      
    },
    confirmZone(val){
      this.keyList.targetPId = val.id
      this.form.baseZone = val.label
      this.isSelectData = false
    },
    confirmZone2(val){
      this.keyList.oldPId = val.id
      this.form.delzone = val.label
      this.isSelectData2 = false
    },
    confirmTransfer(){   //确定迁移数据
      this.$emit('confirmTransfer',this.keyList)
      this.isSelectData2 = true
      this.isSelectData = true
      this.$refs.tree1.setCheckedKeys([this.keyList.oldPId])
       this.$refs.tree.setCheckedKeys([this.keyList.targetPId])
      if(this.keyList.oldPId === this.keyList.targetPId){
        this.$message({ message: '同一分区不可迁移，请重新选择', type: 'error', center: true,})
         this.isSelectData = true
         this.isSelectData2 = true
      }
    }
  }
};
</script>

<style lang="css" scoped>
.transfer-btn:hover{
  cursor: pointer;
}
.inner-input{
  width: 200px;
  margin-left: 20px;
  padding-left: 20px;
}
.data-title{
  height: 40px;
  line-height: 40px;
  color: #f37c03;
  font-size: 18px;
}
.selfCheck-container{
  width: 100%;
  padding: 20px;
}
.search-btn{
  display: inline-block;
  float: right;
}

.choose-data,.choose-options{
float: left;
height: 650px;
}
.choose-data{
  width: 500px;
}
.synchro-data{
float: right;
height: 650px;
width: 500px;
}
.choose-options{
  width: 100px;
  padding: 0 10px;
  margin: 0 auto;
}
.transfer-btn{
  width: 100px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #409eff;
  margin: 150px auto;
  color: #fff;
}
.my-zone-tree,.my-zone-tree{
  border: 1px solid #eee;
  margin: 20px 0;
  width: 500px;
  height: 600px;
  max-height: 650px;
  overflow-y: auto;
}
.return{
  display: inline-block;
  float: right;
  margin-right: 20px;
}
</style>

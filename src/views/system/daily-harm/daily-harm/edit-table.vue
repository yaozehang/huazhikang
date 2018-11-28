<template>
  <div>
    <el-form :inline="true" :model="editForm" class="demo-form-inline add-form" label-width="120px">
     <div class="form-items">
        <el-form-item label="分区" style="margin-right:30px;">
         <el-input v-model="editForm.partition" placeholder="" disabled   class="common-input" ></el-input>
       </el-form-item>
       <el-form-item label="记录名称" >
         <el-input v-model="editForm.dhRecordName" placeholder=""  disabled class="common-input"></el-input>
       </el-form-item>
     </div>
     <div class="form-items">
       <el-form-item label="记录日期"  style="margin-right:30px;">
         <el-date-picker  v-model="editForm.dhTime"  type="date" disabled value-format="yyyy-MM-dd" placeholder="选择日期" class="common-input"> </el-date-picker>
       </el-form-item>
        <el-form-item label="评测人员" >
          <el-input v-model="editForm.dhName" placeholder="" disabled class="common-input"></el-input>
       </el-form-item>
     </div>
  </el-form>
   <table class="addTable1 my-table" style="width:100%" v-if="editTable.length !=0">
     <thead>
       <tr> <th colspan="6"> 物理因素</th> </tr>
       <tr>
         <td style="width:13%" v-for="(item,index) in th2" :key="index">  {{item}}</td></tr>
     </thead>
     <tbody>
       <tr v-for="(i,idx) in editTable" :key="idx">
         <td style="width:13%"><input type="text" v-model="i.harm" readonly> </td>
         <td style="width:13%"><input type="text" v-model="i.djPcTwa"> </td>
         <td style="width:13%"><input type="text" v-model="i.djPcStel"> </td>
         <td style="width:13%"><input type="text" v-model="i.djMac"> </td>
         <td style="width:13%"><input type="text" v-model="i.djSampling"> </td>
         <td style="width:13%"><input type="text" v-model="i.djTime"> </td>
       </tr>
     </tbody>
   </table>
    <table class="addTable2 my-table" style="width:100%" v-if="editTableT.length !=0">
     <thead>
       <tr> <th colspan="6">化学因素</th> </tr>
       <tr>
         <td style="width:13%" v-for="(item,index) in th" :key="index">  {{item}}</td></tr>
     </thead>
     <tbody>
        <tr v-for="(i,x) in editTableT" :key="x">
         <td style="width:13%"><input type="text" v-model="i.harm" readonly> </td>
         <td style="width:13%"><input type="text" v-model="i.djPcTwa"> </td>
         <td style="width:13%"><input type="text" v-model="i.djPcStel"> </td>
         <td style="width:13%"><input type="text" v-model="i.djMac"> </td>
         <td style="width:13%"><input type="text" v-model="i.djSampling"> </td>
         <td style="width:13%"><input type="text" v-model="i.djTime"> </td>
       </tr>
     </tbody>
   </table>
  </div>
</template>

<script>
export default {
  name: 'edit-table',
  props: {
    editTable: {
      type: Array,
      default: function () {
        return []
      },
    },
    editTableT: {
      type: Array,
      default: function () {
        return []
      },
    },
    editForm: {
      type:   Object,
      default: function () {
        return {}
      },
    }
  },
  data () {
    return {
      th: ['危害因素',  'PC-TWA','PC-STEL','MAC', '采样地点','评测时长（min)'],
      th2: ['危害因素',  '接触限值1', '接触限值1','接触限值1', '采样地点','评测时长（min)'],
    }
  }
}
</script>

<style lang="css" scoped>
.common-input{
  width: 200px;
}
.my-table th{
 background: #e2edf2;
 text-align: left!important;
 padding-left: 20px;
 height: 40px;
 line-height: 40px;
  border: 1px solid #ccc;
}
.my-table td{
   text-align: center;
 height: 40px;
 line-height: 40px;
  border: 1px solid #ccc;
}
.my-table td input{
border: none;
outline: none;
height: 40px;
line-height: 40px;
text-align: center;
width: 100%;
text-align: center;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.my-table{
  width: 100%;
  border-collapse:collapse;
  border:none;
}
.add-form{
  width: 90%;
  margin: 0 auto;
}
.addTable1{
  margin-bottom: 20px;
}
</style>
<template>
  <div>
   <table class="addTable1 my-table" v-if="innerTable.length !=0">
     <thead>
       <tr> <th colspan="6"> 物理因素</th> </tr>
       <tr>
         <td  v-for="(item,index) in th2" :key="index">  {{item}}</td></tr>
     </thead>
     <tbody >
       <tr v-for="(i,idx) in innerTable" :key="idx">
         <td><input type="text" v-model="i.hname" readonly  class="my-left"> </td>
         <td ><input type="text" v-model="i.djPcTwa"> </td>
         <td ><input type="text" v-model="i.djPcStel"> </td>
         <td ><input type="text" v-model="i.djMac"> </td>
         <td ><input type="text" v-model="i.djSampling"> </td>
         <td ><input type="text" v-model="i.djTime"> </td>
       </tr>
     </tbody>
   </table>
    <table class="addTable2 my-table" v-if="innerTableF.length !=0">
     <thead>
       <tr> <th colspan="6">化学因素</th> </tr>
       <tr>
         <td  v-for="(item,index) in th" :key="index">  {{item}}</td></tr>
     </thead>
     <tbody >
        <tr v-for="(i,x) in innerTableF" :key="x">
         <td ><input type="text" v-model="i.hname" readonly class="my-left"> </td>
         <td ><input type="text" v-model="i.djPcTwa"> </td>
         <td ><input type="text" v-model="i.djPcStel"> </td>
         <td ><input type="text" v-model="i.djMac"> </td>
         <td ><input type="text" v-model="i.djSampling"> </td>
         <td ><input type="text" v-model="i.djTime"> </td>
       </tr>
     </tbody>
   </table>
  </div>
</template>

<script>
export default {
  name: 'edit-table',
  props: {
    innerTable: {
      type: Array,
      default: function () {
        return []
      },
    },
    innerTableF: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  watch(){
  },
  data () {
    return {
      th: ['危害因素',  'PC-TWA','PC-STEL','MAC', '采样地点','评测时长(分)'],
      th2: ['危害因素',  '接触限值1', '接触限值1','接触限值1', '采样地点','评测时长(分)'],
    }
  }
};
</script>

<style lang="css" scoped>
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
 min-height: 40px;
 line-height: 40px;
 border: 1px solid #ccc;
}
.my-table td input{
border: none;
outline: none;
min-height: 40px;
line-height: 40px;
width: 100%;
text-align: center;
/* word-wrap: break-word;
word-break: break-all;
overflow: hidden; */
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.my-table{
  width: 100%;
  border-collapse:collapse;
  border:none;
  /* table-layout:fixed; */
}
.addTable1{
  margin-bottom: 20px;
}

</style>
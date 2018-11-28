<template>
  <div>
    <div class="btns">
      <el-button type="primary" @click=" addRow()">新增规则</el-button>
      <!-- <el-button type="primary" @click="saveRule">保存规则</el-button> -->
    </div>
    <div class="rule-table">
      <table >
    <tbody>
       <tr>
        <th style="width:140px;">  规则一 </th>
        <th style="width:140px;"> 对比值1</th>
        <th style="width:140px;">  规则二 </th>
        <th style="width:140px;"> 对比值2</th>
        <th style="width:140px;">  处理意见 </th>
        <th style="width:140px;"> 处理时效</th>
        <th style="width:50px;">  删除 </th>
      </tr>
  <!-- rule[{dcrule1:xx,dccontrastvalue1:xx,dcrule2:xx,dccontrastvalue2:xx,dccontrastresult:xx,dccontrastresultdate}]-->
      <tr v-for="(i, x) in ruleData " :key="x" track-by="x">
        <td >
          <el-select v-model="i.dcrule1"  placeholder="请选择"  style="border:none;outline:none;">
           <el-option  v-for="(item,index) in rule" :key="item"  :label="item" :value="item"> </el-option>
          </el-select>
        </td>
         <td >
          <input v-model="i.dccontrastvalue1" >  </input>
        </td>
         <td >
           <el-select v-model="i.dcrule2" ref="workTypeST"  placeholder="请选择"  >
           <el-option  v-for="(item,index) in rule" :key="item"  :label="item" :value="item"> </el-option>
          </el-select>
        </td>
         <td >
          <input v-model="i.dccontrastvalue2" >  </input>
        </td>
         <td >
          <el-select v-model="i.dccontrastresult" placeholder="请选择"  style="border:none;outline:none;">
           <el-option  v-for="(item,index) in opinions" :key="item"  :label="item" :value="item"> </el-option>
          </el-select>
        </td>
         <td >
          <input v-model="i.dccontrastresultdate" >  </input>
        </td>
        <td >
          <i class="el-icon-remove-outline" @click="delInner(i,x)"></i>
        </td>
        </tr>
    </tbody>
   </table>
    </div>
    </div>
</template>

<script> // <!-- rule[{dcrule1:xx,dccontrastvalue1:xx,dcrule2:xx,dccontrastvalue2:xx,dccontrastresult:xx,dccontrastresultdate}]-->
export default {
  name: 'AddRule',
  props: {
    ruleData: Array
  },
  data () {
    return {
      detailedData: [],
      tableData: [],
      rule: ['包含','不包含', '大于', '大于等于', '小于', '小于等于', '等于于', '不等于'],
      opinions: ['复查', '离岗', '疑似职业病', '职业病', '周期性检查']
    }
  },
  watch: {
    'tableData'() {
      this.ruleData = this.ruleData
    }
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    addRow() {
      this.ruleData.push({
        dcrule1: '',
        dccontrastvalue1: '',
        dcrule2: '',
        dccontrastvalue2: '',
        dccontrastresult: '',
        dccontrastresultdate: ''
      })
    },
         // 删除一行
    delInner(item,index){
      this.ruleData.splice(index,1)
    },
    saveRule(){
      // console.log(this.tableData.rows)
      this.$emit('saveRule', this.ruleData)
    }
  }
}
</script>

<style lang="css" scoped>
.rule-list{
width: 50%;
padding: 0 20px;
}
.rule-table{
  width: 100%;
  margin: 20px auto;
  padding-left: 20px;
/*  border: 1px solid #dedede; */
}
.rule-table .el-table_row .hover-row{
background: #fff!important;
}
.rule-table select{
outline: none!important;
 border: none!important;
 display: inline-block;
 width: 100%;
 height: 50px;
 line-height: 50px;
}
 .rule-table select, .rule-table input{
 outline: none!important;
 border: none!important;
 display: inline-block;
 width: 100%;
 height: 50px;
 line-height: 50px;
}
.add-detailed-table .my-table2 tr td{
  width: 100%;
}
.add-detailed-table .my-table2 tr td{
  border-collapse: separate; 
  border-spacing:  2px!important;
  border-color: grey;
}
.del-btns-inner{
float: right;
position: relative;
top:-40px;
right:10px;
}
.rule-table  table td {
  border: 1px solid #e6e6e6;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.rule-table  table td input{
  text-align: center;
}
.rule-table  table th{
  background: #e2eff3;
  font-size: 16px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e6e6e6;
  text-align: center;
}
</style>
<template>
  <!-- 职业病危害因素日常监测季报汇总表  -->
<div class="content">
  <div class="list-title-all border-bottom">
     <button class="title-btn-file">职业病危害因素日常监测季报汇总表 </button>
  </div>
  <div class="tableForm">                 
    <el-form :inline="true" :model="form1" class="demo-form-inline file-form" label-width="160px" >
      <el-form-item label="用人单位" >
        <el-input v-model="form[0]" placeholder=""  class="inner-input" ></el-input>
      </el-form-item>
      <el-form-item label="职业卫生管理负责人">
        <el-input v-model="form[1]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form[2]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱 ">
        <el-input v-model="form[3]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
        <el-form-item label="编制人" >
        <el-input v-model="form[4]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
      <el-form-item label="审核人">
        <el-input v-model="form[5]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
      <el-form-item label="建档时间">
        <el-date-picker v-model="form[6]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="inner-input"> </el-date-picker>
      </el-form-item>
  </el-form>
  <div class="my-table" >
    <table >
    <tbody>
       <tr>
        <th style="width:50px;">  车间 </th>
        <th style="width:150px;"> 职业病危害因素名称</th>
        <th style="width:100px;">  监测周期 </th>
        <th style="width:100px;">  监测点数</th>
        <th style="width:150px;"> 监测结果范围 </th>
        <th style="width:100px;">  合格率(%) </th>
        <th style="width:100px;"> 职业接触限值 </th>
        <th style="width:100px;">  监测人员 </th>
        <th style="width:50px;">  删除 </th>
      </tr>
      <tr v-for="(i, x) in tableData " :key="x"  track-by="x">
         <td > <input v-model="i[0]" >  </input> </td>
         <td ><input v-model="i[1]" >  </input> </td>
         <td ><input v-model="i[2] " >  </input></td>
         <td ><input v-model="i[3] " >  </input> </td>
         <td > <input v-model="i[4]" >  </input> </td>
         <td ><input v-model="i[5]" >  </input> </td>
         <td ><input v-model="i[6]" >  </input> </td>
         <td ><input v-model="i[7]" >  </input> </td>
        <td class="center-td" >
          <i class="el-icon-remove-outline" @click="delInner(x)"></i>
        </td>
        </tr>
        <tr colspan="9" style="height:40px;line-height:40px; text-align: center;  position: relative;" >
          <td colspan="9" class="center-td" ><i class="el-icon-circle-plus-outline add-btn" @click="addRow"></i></td>
       </tr>
    </tbody>
   </table>
  </div>
</div> 
<div class="save">
    <el-button type="" @click="reset">清空</el-button>
    <span class="save-blue big-blue left-20" @click="save" >保存</span>
</div>
</form>
<!-- 保存弹框 -->
<div class="choose-year" v-show="isSave">
   <el-dialog  class="dialog-form" title="选择年限" center  width="400px" :visible.sync="isSave">
      <el-date-picker v-model="saveYear" type="year" placeholder="选择年"  value-format="yyyy" class="choose-year-data left-50"> </el-date-picker >
    <div slot="footer" class="dialog-footer my-footer-bths" >
      <el-button @click="cancleSave()">取 消</el-button>
      <span class="save-blue big-blue left-20" @click="saveAll" >确定</span>
    </div>
  </el-dialog>
</div>
</div>
</template>

<script>
import qs from 'qs'
import {getDate} from 'common/js/time'
import getUserInfo from 'common/js/user'
import {FillEdit} from 'api/archives.js'
export default {
  name: 'quarterly-report',
  data () {
    return {
      tableData: [],
      isSave: false,
      saveYear: new Date('2018'),
      form1: { },
      form: ['', '', '', '', '', '','']
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
    addRow() {
      this.tableData.push(['', '', '', '', '','', '', ''])
      this.$emit('addRow', this.tableData)
    },
    delInner(index){
      this.tableData.splice(index,1)
    },
    reset() {
      this.form = ['', '', '', '', '', '','']
      this.tableData = []
    },
    save() {
      this.isSave = !this.isSave
    },
    saveAll() {
      this.isSave = !this.isSave
      let year = this.saveYear  
      let table = JSON.stringify(this.tableData)
      let inputs =JSON.stringify(this.form)
      let  data ={
        typeOne: '职业病危害因素监测与检测评价档案',
        typeTwo: '职业病危害因素日常监测季报汇总表',
        year: year,
        table: table,
        inputs: inputs,
        comPId: getUserInfo().comPId
      }
      FillEdit(qs.stringify(data)).then((res) =>{
        if(res === 'success1'){
          this.reset()
          this.$message({message: '保存成功',type: 'success',center: true,duration: 1000})
        }else{
          this.$message({ message: res.data,type: 'error',center: true,duration: 1000})
        }
      })
    },
    cancleSave() {
      this.isSave = !this.isSave
    }
  }
};
</script>


<style lang="css" scoped>
.tableForm{
  width: 900px;
  font-size: 16px;
  margin:  0 auto;
  padding: 20px;
  background: #f5fcff;
}
.file-form{
  width: 800px;
  margin:  0 auto;
}
.content .my-table{
  width: 900px;
  border: 1px solid #ccc;
  background: #fff;
}
.inner-input{
  width: 220px;
}
.content .my-table table{
  width: 900px;
  table-layout: fixed;
}
.content .my-table  table tr td{
  border-collapse: separate;
  border-spacing: 2px!important;
}
.content .my-table  table td {
  height: 40px;
  line-height: 40px;
  background: #fff;
  border: 1px solid #c7cedb;
}
.content .my-table  table td input{
  text-indent: 5px;
  outline: none;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: none;
  background: #fff;
}
.content .my-table  table th{
  background: #fff;
  font-size: 16px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
  border: 1px solid #c7cedb;
  text-align: center;
}
.add-btn{
  position: absolute;
  height: 40px;
  line-height: 40px;
}
.save{
margin:  0 auto;
text-align: center;
padding-top: 50px;
background: #f5fcff;
}
.center-td{
  text-align: center;
}
</style>
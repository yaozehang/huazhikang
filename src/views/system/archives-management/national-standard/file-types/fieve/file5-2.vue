<template>
  <!-- 5-2职业健康检查异常结果登记表  31 -->
<div class="content">
  <div class="list-title-all border-bottom">
     <button class="title-btn-file">职业健康检查异常结果登记表 </button>
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
      <el-form-item label="车间"  >
        <el-input v-model="form[4]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
      <el-form-item label="体检类别">
        <el-input v-model="form[5]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
      <el-form-item label="体检日期：" >
        <el-date-picker v-model="form[6]" type="date"  value-format="yyyy-MM-dd"  placeholder="选择日期" class="inner-input"> </el-date-picker>
      </el-form-item>
      <el-form-item label="编制人" >
        <el-input v-model="form[7]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
      <el-form-item label="审核人">
        <el-input v-model="form[8]" placeholder="" class="inner-input"></el-input>
      </el-form-item>
      <el-form-item label="建档时间">
        <el-date-picker v-model="form[9]" type="date"  value-format="yyyy-MM-dd" placeholder="选择日期" class="inner-input"> </el-date-picker>
      </el-form-item>
    </el-form>                
  <div class="my-table" >
    <table >
    <tbody>
       <tr>
        <th style="width:50px;">  序号 </th>
        <th style="width:50px;"> 姓名</th>
        <th style="width:50px;">  性别 </th>
        <th style="width:50px;">  年龄</th>
        <th style="width:50px;"> 岗位 </th>
        <th style="width:150px;">  接触职业病危害因素 </th>
        <th style="width:150px;"> 可能导致的职业病 </th>
        <th style="width:200px;"> 体检结论与处理意见 </th>
        <th style="width:100px;"> 落实情况 </th>
        <th style="width:50px;">  删除 </th>
      </tr> 
      <tr v-for="(i, x) in tableData " :key="x" track-by="x">
         <td > <input v-model="i[0]" >   </td>
         <td ><input v-model="i[1]" >   </td>
         <td ><input v-model="i[2] " >  </td>
         <td ><input v-model="i[3] " >   </td>
         <td > <input v-model="i[4]" >   </td>
         <td ><input v-model="i[5]" >   </td>
         <td ><input v-model="i[6]" >   </td>
         <td ><input v-model="i[7]" >   </td>
         <td ><input v-model="i[8]" >   </td>
        <td class="center-td" >
          <i class="el-icon-remove-outline" @click="delInner(x)"></i>
        </td>
        </tr>
        <tr colspan="10" style="height:40px;line-height:40px; text-align: center;  position: relative;" >
          <td class="center-td" colspan="10"><i class="el-icon-circle-plus-outline add-btn" @click="addRow"></i></td>
       </tr>
    </tbody>
   </table>
  </div>
</div> 
<div class="save">
    <el-button  @click="reset">清空</el-button>
    <span class="save-blue big-blue left-20" @click="save" >保存</span>
</div>
<!-- 保存弹框 -->
<div class="choose-year" v-show="isSave">
   <el-dialog  class="dialog-form" title="选择年限" center width="400px" :visible.sync="isSave">
      <el-date-picker v-model="saveYear" type="year" placeholder="选择年" value-format="yyyy"  class="choose-year-data left-50"> </el-date-picker>
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
  name: 'result-registration',
  data () {
    return {
      tableData: [],
      isSave: false,
      saveYear: '',
      form1: { },
      form: ['', '', '', '', '', '', '', '', '','']
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
    addRow() {
      this.tableData.push(['', '', '', '', '','', '', '', ''])
    },
    delInner(index){
      this.tableData.splice(index,1)
    },
    reset() {
      this.form = ['', '', '', '', '', '', '', '', '','']
      this.tableData = []
    },
    save() {
      this.isSave = !this.isSave
    },
    saveAll() {
      // typeOne  大类型  typeTwo小类型
      this.isSave = !this.isSave
      let year = this.saveYear  
      let table = JSON.stringify(this.tableData)
      let inputs =JSON.stringify(this.form)
      let  data ={
        typeOne: '用人单位职业健康监护管理档案',
        typeTwo: '职业健康检查异常结果登记表',
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
  margin:  0 auto;
  padding: 20px;
  background: #f5fcff;
}
.file-form{
  width: 800px;
  margin:  0 auto;
}
.inner-input{
  width: 220px;
}
.content .my-table{
  width: 900px;
  border: 1px solid #ccc;
  background: #fff;
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
<template>
  <!-- 5-2职业健康检查异常结果登记表  31 -->
<div class="content">
  <div class="list-title-all border-bottom">
     <el-button class="title-btn" type="text">职业健康检查异常结果登记表 </el-button>
  </div>
  <div class="tableForm">                 
    <el-form :inline="true" :model="form1" class="demo-form-inline" label-width="140px" style="margin-left:-50px;">
      <div class="form-items">
        <el-form-item label="用人单位"  style="margin-right:30px;">
          <el-input v-model="form[0]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="职业卫生管理负责人">
          <el-input v-model="form[1]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form[2]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱 ">
          <el-input v-model="form[3]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="车间"  style="margin-right:30px;">
          <el-input v-model="form[4]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="体检类别">
          <el-input v-model="form[5]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="体检日期：" >
          <el-date-picker v-model="form[6]" type="date"  value-format="yyyy-MM-dd"  placeholder="选择日期"> </el-date-picker>
        </el-form-item>
      </div>
       <div class="form-items">
        <el-form-item label="编制人"  style="margin-right:30px;">
          <el-input v-model="form[7]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="form[8]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="建档时间">
          <el-date-picker v-model="form[9]" type="date"  value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
      </div>
  </el-form>
  <div class="my-table" >
    <table >
    <tbody>
       <tr>
        <th style="width:120px;">  序号 </th>
        <th style="width:120px;"> 姓名</th>
        <th style="width:100px;">  性别 </th>
        <th style="width:100px;">  年龄</th>
        <th style="width:210px;"> 岗位 </th>
        <th style="width:250px;">  接触职业病危害因素 </th>
        <th style="width:210px;"> 可能导致的职业病 </th>
        <th style="width:280px;"> 体检结论与处理意见 </th>
        <th style="width:200px;"> 落实情况 </th>
        <th style="width:100px;">  删除 </th>
      </tr> 
      <tr v-for="(i, x) in tableData " :key="x" track-by="x">
         <td > <input v-model="i[0]" >   </td>
         <td ><input v-model="i[1]" >  </td>
         <td ><input v-model="i[2] " >  </td>
         <td ><input v-model="i[3] " >   </td>
         <td > <input v-model="i[4]" >   </td>
         <td ><input v-model="i[5]" >  </td>
         <td ><input v-model="i[6]" >  </td>
         <td ><input v-model="i[7]" >  </td>
         <td ><input v-model="i[8]" >   </td>
        <td >
          <i class="el-icon-remove-outline" @click="delInner(x)"></i>
        </td>
        </tr>
        <tr colspan="9" style="height:40px;line-height:40px; text-align: center;  position: relative;" >
         <i class="el-icon-circle-plus-outline add-btn" @click="addRow"></i>
       </tr>
    </tbody>
   </table>
  </div>
</div> 
<div class="save">
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="" @click="reset">清空</el-button>
</div>
<!-- 保存弹框 -->
<div class="choose-year" v-show="isSave">
   <el-dialog  class="dialog-form" title="选择年限"  width="22%" :visible.sync="isSave">
      <el-date-picker v-model="saveYear" type="year" placeholder="选择年" value-format="yyyy"  class="choose-year-data"> </el-date-picker>
    <div slot="footer" class="dialog-footer my-footer-bths" >
      <el-button type="primary" @click="saveAll()">确 定</el-button>
      <el-button @click="cancleSave()">取 消</el-button>
    </div>
  </el-dialog>
</div>
</div>
</template>
<script>
import qs from 'qs'
import {getDate} from 'common/js/time'
import getUserInfo from 'common/js/user'
 // pId : getUserInfo().partitionId
  // comPId: getUserInfo().comPId
export default {
  name: 'result-registration',
  data () {
    return {
      tableData: [],
      isSave: false,
      saveYear: '',
      form1: { },
      form: ['', '', '', '', '', '', '', '', '']
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
      this.tableData.splice(this.tableData[index],1)
    },
    reset() {
      this.form = ['', '', '', '', '', '', '', '', '']
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
        typeOne: 5,
        typeTwo: 31,
        year: year,
        table: table,
        inputs: inputs,
        comPId: getUserInfo().comPId
      }
      console.log(data)
      this.axios.post('/recordsEdit/edit.do', qs.stringify( data )  )
      .then((res) => {
        if(res.data === 'success1') {
          this.$message({
            message: '保存成功',
            type: 'success',
            center: true,
            duration: 1000
          })
        }else {
          this.$message({
            message: res.data,
            type: 'error',
          })
        }
      })
    },
    cancleSave() {
      this.isSave = !this.isSave
    }
  }
}
</script>

<style lang="css" scoped>
.tableForm{
  border: 1px solid #ccc;
  padding-top: 20px;
  padding-bottom: 100px;
}
.edit-mian-from{
  margin: 18px 122px;
  padding: 0 15px 10px 15px;
  border: 1px solid #ccc;
}
.row{display: -webkit-box;display: -webkit-flex;display: -moz-box;display: -ms-flexbox;display: flex;width: 100%;}
.row .col {-webkit-box-flex: 1;-webkit-flex: 1;-moz-box-flex: 1;-moz-flex: 1;-ms-flex: 1;flex: 1; display: block;width: 100%;}
.public-div{
  margin-top: 15px;
  height: 40px;
  line-height: 40px;
}
.public-div span{
  font-size: 16px;
  color: #303644;
  display: inline-block;
}
.public-input input{
  font-size: 14px;
  outline: none;
  border: none;
  border-bottom: 1px solid #000;
  margin-left: 5px;
  height: 36px;
}
.my-table{
  width: 100%;
}
.my-table tr td{
  border-collapse: separate;
  border-spacing:  2px!important;
  border-color: grey;
}
.my-table  table td {
  border: 1px solid #e6e6e6;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.my-table  table td input{
  text-align: center;
  outline: none;
  border: none;
}
.my-table  table th{
  background: #e2eff3;
  font-size: 16px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e6e6e6;
  text-align: center;
}
.add-btn{
  position: absolute;
  right:50%;
  height: 40px;
  line-height: 40px;
}
.save{
margin:  0 auto;
text-align: center;
margin-top: 50px;
}
</style>
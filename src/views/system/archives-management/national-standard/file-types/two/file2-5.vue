<template>
    <!--  2-2. id   职业病危害项目申报基本情况表 -->
<div class="content">
  <div class="list-title-all border-bottom">
     <button class="title-btn-file">   职业病危害项目申报基本情况表 </button>
  </div>
  <div class="tableForm">
    <el-form :inline="true" :model="form1" class="demo-form-inline file-form" label-width="220px">
        <el-form-item label="用人单位"  >
          <el-input v-model="form[0]" placeholder="" class="inner-input"></el-input>
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
        <el-form-item label="单位名称" >
          <el-input v-model="form[4]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form[5]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="变更原因" >
          <el-input v-model="form[6]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="行业分类">
          <el-input v-model="form[7]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="注册类型">
          <el-input v-model="form[8]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="劳动者总人数" >
          <el-input v-model="form[9]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="职业卫生管理机构" >
            <el-radio-group v-model="form[10]"  class="inner-input">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="2">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职业病累计人数" >
          <el-input v-model="form[11]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="接触职业病危害因素种类数（个）" >
          <el-input v-model="form[12]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
          <el-form-item label="单位注册地址">
           <el-input v-model="form[13]" placeholder="" class="inner-input"></el-input>
          </el-form-item>
          <el-form-item label="工作场所地址 ">
            <el-input v-model="form[14]" placeholder="" class="inner-input"></el-input>
          </el-form-item>
         <el-form-item label="接触职业病危害因素人数 ">
           <el-input v-model="form[15]" placeholder="" class="inner-input"></el-input>
         </el-form-item>
        <!-- 专职是最后一项 -->
          <el-form-item label="职业卫生管理人员数（人）:专职 ">   
           <el-input v-model="form[25]" placeholder="" class="inner-input"></el-input>
          </el-form-item>
             <el-form-item label="职业卫生管理人员数（人）:兼职 ">
           <el-input v-model="form[16]" placeholder="" class="inner-input"></el-input>
          </el-form-item>
        <el-form-item label="编制人" >
          <el-input v-model="form[17]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
          <el-form-item label="审核人">
          <el-input v-model="form[18]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人 ">
          <el-input v-model="form[19]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人联系电话 ">
          <el-input v-model="form[20]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
          <el-form-item label="建档时间">
          <el-date-picker v-model="form[21]" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" class="inner-input"> </el-date-picker>
        </el-form-item>
        <el-form-item label="申报类别" >
            <el-radio-group v-model="form[22]"  class="inner-input">
            <el-radio :label="1">初次申报</el-radio>
            <el-radio :label="2">变更申报</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="企业规模">
          <el-radio-group v-model="form[23]"  class="inner-input">
            <el-radio :label="1">大</el-radio>
            <el-radio :label="2">中</el-radio>
            <el-radio :label="3">小</el-radio>
          </el-radio-group>
        </el-form-item>
  </el-form>
  <div class="my-table" >
    <table >
      <tr>
        <th colspan="4" style="width:100%">职业病防治计划内容</th>
      </tr>
       <tr>
        <th style="width:200px;">  作业场所名称 </th>
        <th style="width:250px;"> 职业病危害因素名称 </th>
        <th style="width:250px;">  接触人数(可重复) </th>
        <th style="width:200px;"> 接触人数(可重复)</th>
      </tr>
     <tbody v-for="(item,index) in tableData">
         <tr>
          <td :rowspan="item.list.length+2"><input v-model="item.name" ref="nameInput"></input></td>
          <td><input v-model="item.list[0][0]"></input></td>
          <td class="center-td"><input v-model="item.list[0][1]"></input> <i class="el-icon-remove-outline my-del"></i> </td>
          <td :rowspan="item.list.length+2"><input v-model="item.num"></input></td>
         </tr>
         <tr v-for="(i,idx) in item.list" v-if="idx!==0" track-by="idx">
          <td><input v-model="i[0]"></input></td>
          <td class="center-td"><input v-model="i[1]"></input>
           <i class="el-icon-remove-outline my-del" @click="delInner(idx,item.list,i)"></i></td>
         </tr>
         <tr>
          <td colspan="2" class="center-td"><i class="el-icon-circle-plus-outline add-plus" @click="addInner(item.list)"></i></td>
         </tr>
       </tbody>
        <tr>
        <td colspan="3">合计</td>
        <td><input v-model="form[24]"></input></td>
         </tr>
       <tr>
        <td colspan="4" class="center-td"><i class="el-icon-circle-plus-outline" @click="addRow"></i></td>
       </tr>
   </table>
  </div>
</div> 
<div class="save">
    <el-button  @click="reset">清空</el-button>
    <span class="save-blue big-blue left-20" @click="save" >保存</span>
</div> 
<div class="choose-year" v-show="isSave">
   <el-dialog  class="dialog-form" title="选择年限"  width="400px" center  :visible.sync="isSave">
      <el-date-picker v-model="saveYear" type="year" placeholder="选择年"  value-format="yyyy" class="choose-year-data left-50"> </el-date-picker>
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
import {FillEditTwo} from 'api/archives.js'

const tableData = [
{
  name: '', list:[['', ''],], num:''
}]
export default {
  name: 'declaration-form',
  data () {
    return {
      ssaveYear: '',
      isSave: false,
      saveYear: '',
      parentLength: 1,
      tableData: tableData,
      form1: {},
      form: ['', '', '', '', '', '', '','', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', 1, 1,'','']
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
    addHeight(h){
      var heightCss = window.setComputedStyle(this.$refs.nameInput).height // 100px
    },
    delInner(index,list,item){
      list.splice(index, 1)
    },
    addRow() {
      // this.parentLength++
      this.tableData.push({name: '', list:[['', ''],], num:''})
    },
    addInner(list) {
      list.push(['', ''])
    },
    reset(){
      this.tableData = []
      this.form = ['', '', '', '', '', '', '','', '', '', 1, '', '', '', '', '', '', '', '', '', '', '', 1, 1,'','']
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
        typeOne: '职业卫生管理档案',
        typeTwo: '职业病危害项目申报表及回执',
        year: year,
        table: table,
        inputs: inputs,
        comPId: getUserInfo().comPId
      }
      FillEditTwo(qs.stringify(data)).then((res)=>{
      if(res=== 'success1'){
        this.reset()
         this.$message({message: '保存成功',type: 'success',center: true,duration: 1000})
        }else{
           this.$message({message: '保存失敗 ',type: 'error',center: true,duration: 1000})
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
  width: 900px;
  margin:  0 auto;
}
.inner-input{
  width: 200px;
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
  right:45%;
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
  text-align: center!important;
}
</style>
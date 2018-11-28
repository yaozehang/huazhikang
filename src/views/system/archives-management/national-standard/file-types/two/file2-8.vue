<template>
  <!-- 2-8. id 14 用人单位职业卫生检查和处理记录表   -->
<div class="content">
  <div class="list-title-all border-bottom">
     <button class="title-btn-file">用人单位职业卫生检查和处理记录表  </button>
  </div>
  <div class="tableForm">
    <el-form :inline="true" :model="form1" class="demo-form-inline file-form" label-width="160px" >
        <el-form-item label="用人单位"  style="margin-right:30px;">
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
        <el-form-item label="车间名称"  >
          <el-input v-model="form[4]" placeholder="" class="inner-input"></el-input>
        </el-form-item> 
        <el-form-item label="车间负责人">
          <el-input v-model="form[5]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
         <el-form-item label="检查地点">
          <el-input v-model="form[6]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
         <el-form-item label="检查时间">
            <el-date-picker v-model="form[7]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="inner-input"> </el-date-picker>
        </el-form-item>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle"> 检查情况记录:</span>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[12]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
          <el-form-item label="检查人员" >
            <el-input v-model="form[8]" placeholder="" class="inner-input"></el-input>
          </el-form-item>
          <el-form-item label="日期" >
            <el-date-picker v-model="form[9]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="inner-input"> </el-date-picker>
           </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">整改意见: </span>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[13]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
          <el-form-item label="负责人" >
              <el-input v-model="form[10]" placeholder="" class="inner-input"></el-input>
            </el-form-item>
             <el-form-item label="日期" >
              <el-date-picker v-model="form[11]" type="date" value-format="yyyy-MM-dd"  placeholder="选择日期"> </el-date-picker>
             </el-form-item>
        </div>
         <p class="findQusetion">
            <span class="qusetionTitle"> 整改落实情况:</span>
          </p>
        <el-form-item label=""  >
          <el-input v-model="form[16]" placeholder="" type="textarea" :rows="5" class="my-textarea" ></el-input>
        </el-form-item>
        <el-form-item label="车间负责人" >
            <el-input v-model="form[14]" placeholder="" class="inner-input"></el-input>
          </el-form-item>
          <el-form-item label="日期" >
            <el-date-picker v-model="form[15]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="inner-input"> </el-date-picker>
           </el-form-item>
    </el-form>
  </div>
<div class="save">
    <el-button  @click="reset">清空</el-button>
    <span class="save-blue big-blue left-20" @click="save" >保存</span>
</div> 
<!-- 保存弹框 -->
<div class="choose-year" v-show="isSave">
   <el-dialog  class="dialog-form" title="选择年限"  width="400px" center :visible.sync="isSave">
      <el-date-picker v-model="saveYear" type="year" placeholder="选择年" value-format="yyyy" class="choose-year-data left-50"> </el-date-picker>
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
  name: 'negative-regulatory-opinion',
  data () {
    return {
      isSave: false,
      saveYear: '',
      form1: {},
      form: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','']
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
  },
  methods: {
    reset() {
      this.form = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','']
    },
    save() {
      this.isSave = !this.isSave
    },
    saveAll() {
      this.isSave = !this.isSave
      let table = JSON.stringify([])
      let inputs =JSON.stringify(this.form)
      let  data ={
        typeOne: '职业卫生管理档案',
        typeTwo: '用人单位职业卫生检查和处理记录',
        year: this.saveYear,
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
  width: 900px;
  margin:  0 auto;
}
.inner-input{
  width: 220px;
}
.findQusetion{
  margin-left: 85px;
  margin-bottom: 20px;
}
.my-textarea{
  width: 688px;
  margin-left: 85px;
  text-indent: 20px;
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
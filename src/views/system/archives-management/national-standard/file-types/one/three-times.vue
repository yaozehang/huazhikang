<template>
  <!-- 1-1.建设项目职业卫生“三同时”审查登记表  -->
<div class="content">
  <div class="list-title-all border-bottom">
     <button class="title-btn-file">建设项目职业卫生“三同时”审查登记表  </button>
  </div>
  <div class="tableForm">
    <el-form :inline="true" :model="form1" class="demo-form-inline file-form" label-width="160px" >
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
        <el-form-item label="项目名称"  >
          <el-input v-model="form[4]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="项目类型">
           <el-input v-model="form[5]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
         <el-form-item label="项目投资">
           <el-input v-model="form[6]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <!-- 7 8 两个日期 -->
        <el-form-item label="建设工期"> 
           <el-date-picker v-model="myDate" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="checkDate"  placeholder="选择日期" class="inner-input"> </el-date-picker>
        </el-form-item>
        <div class="word-left">
          <p class="findQusetion">
            <!-- 顺序反了 竣工验收结论＆ 预评价结论 -->
            <span class="qusetionTitle"> 预评价审核-结论</span>
            <el-form-item label="日期" label-width="160px"> 
             <el-date-picker v-model="form[9]" value-format="yyyy-MM-dd" class="inner-input" type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[11]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">竣工验收结论 </span>
             <el-form-item label="日期" label-width="160px">
              <el-date-picker v-model="form[10]" value-format="yyyy-MM-dd" class="inner-input" type="date" placeholder="选择日期"> </el-date-picker>
             </el-form-item>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[12]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">设计审查 （严重危害项目）结论 </span>
             <el-form-item label="日期" label-width="160px">
              <el-date-picker v-model="form[13]" value-format="yyyy-MM-dd" class="inner-input" type="date" placeholder="选择日期"> </el-date-picker>
             </el-form-item>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[14]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle1"> 存在的主要职业病危害因素</span>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[15]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle1"> 审查结论</span>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[16]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <el-form-item label="预评价审核-审核单位"  >
          <el-input v-model="form[17]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label=" 设计审查（严重危害项目）-审核单位" >
          <el-input v-model="form[18]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="竣工验收-审核单位"  >
          <el-input v-model="form[19]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="编制人" >
          <el-input v-model="form[20]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="审核人"  s>
          <el-input v-model="form[21]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="建档时间">
          <el-date-picker v-model="form[22]"  value-format="yyyy-MM-dd"  type="date" class="inner-input" placeholder="选择日期"> </el-date-picker>
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
      <el-date-picker v-model="saveYear" type="year"  value-format="yyyy" placeholder="选择年" class="choose-year-data left-50"> </el-date-picker>
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
      myDate: '',
      form1: {},
      form: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '','','']
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
    checkDate(val) {
      console.log(val)
      this.form[7]= val[0]
      this.form[8]= val[1]
    },
    save() {
      this.isSave = !this.isSave
    },
    reset() {
      this.form = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '','','']
    },
    saveAll() {
      this.isSave = !this.isSave
      let table = JSON.stringify([])
      let inputs =JSON.stringify(this.form)
      let year = this.saveYear
      let data ={
        typeOne: '建设项目职业卫生“三同时”档案',
        typeTwo: '建设项目职业卫生“三同时”审查登记表',
        table: table,
        inputs: inputs,
        year: year,
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
}
.qusetionTitle{
  display: inline-block;
  vertical-align: middle;
  margin-bottom: -20px;
  width: 300px;
}
.qusetionTitle1{
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 20px;
  width: 300px;
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
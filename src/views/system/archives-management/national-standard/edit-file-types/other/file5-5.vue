<template>
  <!-- 5-5  id 35职业病危害事故报告与处理记录表   -->
<div class="content">
  <div class="list-title-all border-bottom">
     <el-button class="title-btn" type="text">职业病危害事故报告与处理记录表 </el-button>
  </div>
  <div class="tableForm">
    <el-form :inline="true" :model="form1" class="demo-form-inline" label-width="160px" style="margin-left:-10px;">
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
        <el-form-item label="企业名称"  style="margin-right:30px;">
          <el-input v-model="form[4]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
           <el-input v-model="form[5]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
         <el-form-item label="事故报告人">
           <el-input v-model="form[6]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
           <el-input v-model="form[7]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
<!--       <p>基本情况</p> -->
      <div class="form-items">
        <el-form-item label="接触人数 "  style="margin-right:30px;">
          <el-input v-model="form[8]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="发病人数">
           <el-input v-model="form[9]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
         <el-form-item label="送医院治疗人数">
           <el-input v-model="form[10]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="死亡人数">
           <el-input v-model="form[11]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div class="form-items clearfix">
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle"> 发生场所</span>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[12]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">岗位及工作内容  </span>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[13]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-items clearfix">
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle"> 可能产生职业病的有害因素名称</span>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[14]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">事故经过简述（事件起因、患者主要临床表现、救援过程和处理情况） </span>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[15]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-items clearfix">
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle"> 对事故原因和性质的初步认定意见</span>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[16]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">事件报告情况 </span>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[17]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-items">
        <el-form-item label="报告单位"  style="margin-right:140px;" label-width="190px">
          <el-input v-model="form[18]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="报告时间">
          <el-date-picker v-model="form[29]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
      </div>
  </el-form>
  </div>
<div class="save">
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="" @click="reset">清空</el-button>
</div> 
<!-- 保存弹框 -->
<div class="choose-year" v-show="isSave">
   <el-dialog  class="dialog-form" title="选择年限"  width="22%" :visible.sync="isSave">
      <el-date-picker v-model="saveYear" type="year" placeholder="选择年" value-format="yyyy" class="choose-year-data"> </el-date-picker>
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
  name: 'negative-regulatory-opinion',
  data () {
    return {
      isSave: false,
      saveYear: '',
      form1: {},
      form: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', '', '','', '', '',]
    }
  },
  mounted(){
      let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
    save() {
      this.isSave = !this.isSave
    },
    reset(){
      this.form = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '', '', '', '','', '', '',]
    },
    saveAll() {
      this.isSave = !this.isSave
      let inputs =JSON.stringify(this.form)
      let table = JSON.stringify([])
      let year = this.saveYear
      let data ={
        typeOne: 5,
        typeTwo: 34,
        inputs: inputs,
        year: year,
        table: table,
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
.findQusetion{
  padding-left: 80px;
  margin: 10px 0;
}
.word-left{
float: left;
}
.date-time-two{
  margin-right: 500px;
}
.qusetionTitle0{
  display: inline-block;
  margin-right: 200px;
  height: 40px;
  line-height: 40px;
}
.qusetionTitle{
  display: inline-block;
  margin-right: 166px;
  height: 40px;
  line-height: 40px;
}
.qusetionTitle2{
  display: inline-block;
  margin-right: 150px;
  height: 60px;
  line-height: 50px;
}
.qusetionTitle1{
  display: inline-block;
  margin-right: 98px;
  height: 40px;
  line-height: 40px;
}
.my-textarea{
 width:700px;
  padding-left:80px;
}
.my-textarea1{
  width:1550px; 
  padding-left:50px;
}
</style>
<template>
  <!-- 1-1.建设项目职业卫生“三同时”审查登记表  -->
<div class="content">
  <div class="list-title-all border-bottom">
     <el-button class="title-btn" type="text">建设项目职业卫生“三同时”审查登记表  </el-button>
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
        <el-form-item label="项目名称"  style="margin-right:30px;">
          <el-input v-model="form[4]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="项目类型">
           <el-input v-model="form[5]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
         <el-form-item label="项目投资">
           <el-input v-model="form[6]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <!-- 7 8 两个日期 -->
        <el-form-item label="建设工期"> 
           <el-date-picker v-model="myDate" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="checkDate"  placeholder="选择日期" style="width:220px;"> </el-date-picker>
        </el-form-item>
      </div>
      <div class="form-items clearfix">
        <div class="word-left">
          <p class="findQusetion">
            <!-- 顺序反了 竣工验收结论＆ 预评价结论 -->
            <span class="qusetionTitle0"> 预评价审核-结论</span>
            <el-form-item label="日期"> 
             <el-date-picker v-model="form[9]" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"> </el-date-picker>
            </el-form-item>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[11]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">竣工验收结论 </span>
             <el-form-item label="日期">
              <el-date-picker v-model="form[10]" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"> </el-date-picker>
             </el-form-item>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[12]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-items clearfix">
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle1">设计审查 （严重危害项目）结论 </span>
             <el-form-item label="日期">
              <el-date-picker v-model="form[13]" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"> </el-date-picker>
             </el-form-item>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[14]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle2"> 存在的主要职业病危害因素</span>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[15]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-items clearfix">
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle0"> 审查结论</span>
          </p>  
          <el-form-item label=""  >
            <el-input v-model="form[16]" placeholder="" type="textarea"  :rows="5" class="my-textarea3" ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-items">
        <el-form-item label="预评价审核-审核单位"  label-width="190px">
          <el-input v-model="form[17]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label=" 设计审查（严重危害项目）-审核单位"  label-width="290px">
          <el-input v-model="form[18]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="竣工验收-审核单位"  label-width="220px">
          <el-input v-model="form[19]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="编制人"  style="margin-right:140px;" label-width="190px">
          <el-input v-model="form[20]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="审核人"  style="margin-right:73px;" >
          <el-input v-model="form[21]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="建档时间">
          <el-date-picker v-model="form[22]"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"> </el-date-picker>
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
      <el-date-picker v-model="saveYear" type="year"  value-format="yyyy" placeholder="选择年" class="choose-year-data"> </el-date-picker>
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
      // 1 1变成对应的名字
      let data ={
        typeOne: '建设项目职业卫生“三同时”档案',
        typeTwo: '建设项目职业卫生“三同时”审查登记表',
        table: table,
        inputs: inputs,
        year: year,
        comPId: getUserInfo().comPId
      }
      console.log(data)
      this.axios.post('/recordsEdit/edit.do', qs.stringify( data )  )
      .then((res) => {
        if(res.data === 'success1'){
            this.$message({
            message: '保存成功',
            type: 'success',
            center: true,
            duration: 1000
          })
        }else{
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
.choose-year-data{
 margin-left: 15%;
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
.my-textarea3{
  width: 1500px;
  padding-left:80px;
}
</style>
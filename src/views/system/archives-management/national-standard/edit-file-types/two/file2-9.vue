<template>
  <!-- 2-9. id 15 职业卫生监管意见和落实情况记录表   -->
<div class="content">
  <div class="list-title-all border-bottom">
     <el-button class="title-btn" type="text"> 职业卫生监管意见和落实情况记录表  </el-button>
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
        <el-form-item label="上级检查部门"  >
          <el-input v-model="form[4]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="检查日期">
          <el-date-picker v-model="form[5]" type="date"  value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
      </div>
      <div class="form-items">
        <p class="findQusetion">发现主要存在的问题（主要内容摘录）</p>
        <el-form-item label=""  >
          <el-input v-model="form[6]" placeholder="" type="textarea" :rows="5" 
          class="my-textarea1" ></el-input>
        </el-form-item>
      </div>
      <div class="form-items clearfix">
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle"> 要求整改的措施及建议</span>
            <el-form-item label="日期">
          <el-date-picker v-model="form[7]" type="date" value-format="yyyy-MM-dd"  placeholder="选择日期"> </el-date-picker>
        </el-form-item>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[8]" placeholder="" type="textarea"  :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">用人单位领导审批意见 </span>
             <el-form-item label="日期">
              <el-date-picker v-model="form[9]" type="date" value-format="yyyy-MM-dd"  placeholder="选择日期"> </el-date-picker>
             </el-form-item>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[10]" placeholder="" type="textarea" :rows="5"  class="my-textarea"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-items">
        <el-form-item label="整改落实情况"  >
          <el-input v-model="form[11]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label=" 负责人">
          <el-input v-model="form[12]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="编制日期">
          <el-date-picker v-model="form[13]" type="date" value-format="yyyy-MM-dd"  placeholder="选择日期"> </el-date-picker>
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
      <el-date-picker v-model="saveYear" type="year" placeholder="选择年"  value-format="yyyy" class="choose-year-data"> </el-date-picker>
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
      saveYear:'',
      form1: {},
      form: ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
    reset() {
      this.form = ['', '', '', '', '', '', '', '', '', '', '', '', '', '']
     },
    save() {
      this.isSave = !this.isSave
    },
    saveAll() {
      this.isSave = !this.isSave
      let table = JSON.stringify([])
      let inputs =JSON.stringify(this.form)
      let  data ={
        typeOne: 2,
        typeTwo: 15,
        year: this.saveYear,
        table: table,
        inputs: inputs,
        comPId: getUserInfo().comPId
      }
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
.findQusetion{
  padding-left: 60px;
  margin: 10px 0;
}
.word-left{
float: left;
}
.date-time-two{
  margin-right: 500px;
}
.qusetionTitle{
  display: inline-block;
  margin-right: 190px;
  height: 40px;
  line-height: 40px;
}
.my-textarea{
 width:750px;
  padding-left:50px;
}
.my-textarea1{
  width:1550px; 
  padding-left:50px;
}
</style>
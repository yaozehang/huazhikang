<template>
<div class="add-project-management">
  <div class="add-project-title border-bottom">
    <button class="title-btn">新增明细项目</button>
  </div>
  <div class="list-content clearfix">
    <div class="add-form">
      <el-form ref="project" :model="project"  :rules="rules" label-width="80px" style="width:80%; margin:0 auto;">
        <el-form-item label=" 是否启用" >
           <el-radio-group v-model="project.isUse">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目名称" required prop="projectName" >
          <el-input v-model="project.projectName"  @blur="getCode"></el-input>
        </el-form-item>
        <el-form-item label="拼音简码" required prop="pinyinCode" >
            <el-input v-model="project.pinyinCode" readonly></el-input>
        </el-form-item>
         <el-form-item label="计量单位" >
            <el-input v-model="project.measurementUnit" ></el-input>
        </el-form-item>
        <el-form-item label="参考值" >
            <el-input v-model="project.referenceValue"  ></el-input>
        </el-form-item>
        <el-form-item label="结果类型" >
            <el-radio-group v-model="project.resultType">
            <el-radio :label="2">文本型</el-radio>
            <el-radio :label="3">数字型</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目排序" >
          <el-input v-model="project.projectSort"  ></el-input>
        </el-form-item>
        <el-form-item label="项目编码" >
          <el-input v-model="project.projectCode"  ></el-input>
        </el-form-item>
        <el-form-item>
          <i class="el-icon-circle-plus-outline" style="margin-left:-22px;"  @click="addDetailed()"></i>
          <span style="margin-left:-65px;" >明细值</span>
          <div class="add-detailed-table">
            <table style=" width: 100%;" class="my-table2">
              <tr v-for="(item,index) in detailPrice" :key="index" style=" width: 90%; " track-by="index">
                <td style=" width: 100%; margin-bottom:20px; height:40px; line-height: 40px;" class="clearfix ">
                 <input v-model="item.thedetailvalue"  class="detailedName"></input>
                 <span  class="del-btns-inner" @click="delInner(item,index)">  <i class="el-icon-remove-outline"></i> </span>
                </td>
              </tr>
            </table>
          </div>
        </el-form-item>
        <el-form-item  class="sureBtns">
          <el-button type="primary" @click="save('project')"  >保存</el-button>
          <!-- <el-button @click="reset('project')">取消</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="rule-list">
      <add-rule  v-bind:ruleData="ruleData"></add-rule>
    </div>

  </div>
</div>
</template>

<script>
import qs from 'qs'
import AddRule from './add-rule.vue'
export default {
  name: 'AddProject',
  components: {
    AddRule
  },
  data () {
    return {
      project: {
        isUse: 1,
        projectName: '',
        pinyinCode: '',
        measurementUnit: '',
        referenceValue: '',
        resultType: 2,
        projectSort: '',
        projectCode: '',
        detailedValue: ''
      },
      myRules: [],
      detailed: {
        detailedList: [{}]
      },
      ruleData: [],
      detailPrice: [],
      rule: ['包含','不包含', '大于', '大于等于', '小于', '小于等于', '等于于', '不等于'],
      rules : {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        pinyinCode: [
          { required: true, message: '请输入拼音简码', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    errMsg(msg) {
      return this.$message({
        message: msg,
        type: 'error',
        center: true,
        duration: 1000
        })
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,
        type: 'success',
        center: true,
        duration: 1000
        })
    },
    reset(project) {
      this.$refs[project].resetFields()
    },
    getCode(){
      let data ={
        diname: this.project.projectName
      }
       this.axios.post('/web/alphabeticBrevityCode.do', qs.stringify(data))
        .then((res) => {
            if (res.status ===200) {
              this.project.pinyinCode = res.data
            }else{
              console.log(res)
            }
        })
    },
    // addDetailProject.do
// dusable,diname,dipyname,diunit,di_refreence,di_result_type, diorder, dicode, ,detailPrice[{number:xx}],
// rule[{dcrule1:xx,dccontrastvalue1:xx,dcrule2:xx,dccontrastvalue2:xx,dccontrastresult:xx,dccontrastresultdate}]
    save(project){ 
      let dusable = '是'
      if(this.project.isUse === 2){
        dusable = '否'
      }
      let resultType = '文本型'
      if(this.project.resultType === 3 ){
         resultType = '数字型'
      }
      let detailPrice = JSON.stringify(this.detailPrice)
      let myRules = JSON.stringify(this.ruleData)
      let data = {
        dusable: dusable,
        diname: this.project.projectName,
        dipyname: this.project.pinyinCode,
        diunit: this.project.measurementUnit,
        di_refreence: this.project.referenceValue,
        di_result_type: resultType,
        diorder: this.project.projectSort,
        dicode: this.project.projectCode,
        detailPrice: detailPrice,
        rule: myRules
      }
    this.$refs[project].validate((valid) => {
      if (valid) {
        this.sucMsg('数据正确')
        this.axios.post('/web/addDetailProject.do', qs.stringify(data))
          .then((res) => {
              if (res.status ===200) {
                this.sucMsg('提交成功')
                this.$router.push({path:'/wrap/project/listPJ'})
              }else{
                console.log(res)
              }
          })
      } else {
        this.errMsg('数据输入有误请重新输入')
        return false
      }
    })
    },
    // 删除一行
    addDetailed(){
      this.detailPrice.push({thedetailvalue:''})
    },
    delInner(item,index) {
      // arr.splice(1,1,'ttt')             替换起始下标为1，长度为1的一个值为‘ttt'，len设置的1
       this.detailPrice.splice(index, 1)
    }
  }
}
</script>

<style lang="css" scoped>
.add-project-title{
  margin-top: 30px;
}
.list-content {
  border: 1px solid #dedede; 
 padding: 30px;
 margin: 10px 0;
 box-sizing: border-box;
}
.add-form,.rule-list{
  float: left;
}
.add-form{
width: 40%;
padding: 0 20px;
border-right: 1px solid #dedede; 
}
.rule-list{
width: 50%;
padding: 0 20px;
}
.rule-table{
  width: 100%;
  margin: 20px auto;
  padding-left: 20px;
  border: 1px solid #dedede; 
}
.rule-table select{
outline: none!important;
 border: none!important;
 display: inline-block;
 width: 100%;
 height: 50px;
 line-height: 50px;
}
 .rule-table option, .rule-table button , .rule-table input{
 outline: none!important;
 border: none!important;
 display: inline-block;
 width: 100%;
 height: 50px;
 line-height: 50px;
}
.rule-table table th{
  background: #e2eff3;
}
.rule-table table tr{
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.rule-table table  tr td{
  border: 1px solid #dedede; 
}
.rule-table el-table el-input{
outline: none!important;
border: none!important;
}
.add-detailed-table .my-table2 tr td{
  width: 100%;
  margin-top: -20px;
}
.add-detailed-table .my-table2 tr td{
  border-collapse: separate; 
  border-spacing:  2px!important;
  border-color: grey;
}
.detailedName{
width: 100%;
height: 40px;
line-height: 40px;
}
.del-btns-inner{
float: right;
position: relative;
top:-40px;
right:10px;
}
</style>
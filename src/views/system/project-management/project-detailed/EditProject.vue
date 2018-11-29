<template>
<div class="add-project-management" >
  <div class="add-project-title border-bottom clearfix">
     <el-button class="title-btn" type="text">修改明细项目</el-button>
     <button class="title-btn my-return-btn" @click="goBack">返回</button>
  </div>
  <div class="list-content clearfix">
    <div class="add-form">
      <el-form ref="project" :model="project" label-width="80px" style="width:80%; margin:0 auto;">
        <el-form-item label=" 是否启用" >
           <el-radio-group v-model="project.isUse">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目名称" required>
          <el-input v-model="project.projectName" ></el-input>
        </el-form-item>
        <el-form-item label="拼音简码" required>
            <el-input v-model="project.pinyinCode" ></el-input>
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
              <tr v-for="(item,index) in detailedData" :key="index" style=" width: 90%; " track-by="index">
                <td style=" width: 100%;" class="clearfix">
                 <el-input v-model="item.thedetailvalue"  ></el-input>
                 <span  class="del-btns-inner" @click="delInner(item,index)">  <i class="el-icon-remove-outline"></i> </span>
                </td>
              </tr>
            </table>
          </div>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="rule-list"></div>
    <div class="btns">
      <el-button type="primary" @click=" addRule(item)">新增规则</el-button>
    </div>
     <div class="rule-table">
      <table >
    <tbody>
       <tr>
        <th style="width:140px;">  规则一 </th>
        <th style="width:140px;"> 对比值1</th>
        <th style="width:140px;">  规则二 </th>
        <th style="width:140px;"> 对比值2</th>
        <th style="width:140px;">  处理意见 </th>
        <th style="width:140px;"> 处理时效</th>
        <th style="width:50px;">  删除 </th>
      </tr>
      <tr v-for="(i, x) in rule" :key="x" track-by="x">
        <td >
          <el-select v-model="i.dcrule1"  placeholder="请选择"  style="border:none;outline:none;">
           <el-option  v-for="(item,index) in rule1" :key="index"  :label="item" :value="item"> </el-option>
          </el-select>
        </td>
         <td >
          <input v-model="i.dccontrastvalue1" >  
        </td>
         <td >
           <el-select v-model="i.dcrule2" ref="workTypeST"  placeholder="请选择"  >
           <el-option  v-for="(item,idx) in rule1" :key="idx"  :label="item" :value="item"> </el-option>
          </el-select>
        </td>
         <td >
          <input v-model="i.dccontrastvalue2" >  
        </td>
         <td >
          <el-select v-model="i.dccontrastresult" placeholder="请选择"  style="border:none;outline:none;">
           <el-option  v-for="(item,x1) in opinions" :key="x1"  :label="item" :value="item"> </el-option>
          </el-select>
        </td>
         <td >
          <input v-model="i.dccontrastresultdate" >  
        </td>
        <td >
          <i class="el-icon-remove-outline" @click="delRule(i,x)"></i>
        </td>
        </tr>
    </tbody>
   </table>
    </div>
    </div>

  </div>
</template>

<script>
import qs from 'qs'
const item = {
  dcrule1: '',
  dccontrastvalue1: '',
  dcrule2: '',
  dccontrastvalue2: '',
  dccontrastresult: '',
  dccontrastresultdate: ''
}
export default {
  name: 'EditProject',
  data () {
    return {
      project: {
        isUse: '1',
        projectName: '',
        pinyinCode: '',
        measurementUnit: '',
        referenceValue: '',
        resultType: 2,
        projectSort: '',
        projectCode: '',
        detailedValue: ''
      },
      detailed: {
        detailedList: [{}]
      },
      rule: [],
      detailedData: [],
      detailedItem: {
        thedetailvalue: ''
      },
      item: item,
      rule1: ['包含','不包含', '大于', '大于等于', '小于', '小于等于', '等于于', '不等于'],
      opinions: ['复查', '离岗', '疑似职业病', '职业病', '周期性检查'],
      querryId : this.$route.query.itemId,  //列表传过来的id
      page: this.$route.query.page,
    }
  },
  created(){
    // this.$route.
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,
        type: 'success',
        center: true,
        duration: 1000
        })
    },
    goBack(){
      this.$router.push({path:'/wrap/project/listPJ',query: {page:this.page}})
    },
    // updateditionProjectById.do  di_id
    getInfo(){
      let data = {
        di_id: this.querryId
      }
    this.axios.post('/selectditionProjectById.do', qs.stringify(data))
    .then((res) => {
        let data = res.data
        let diUsable = 2
        if(data.one[0].diUsable === ''|| data.one[0].diUsable === '是'){
          diUsable = 1
        }
        if (res.status ===200) {
          let diResultType = 1
          if(data.one[0].diResultType === '文本型'){
              diResultType = 2 
          } else if(data.one[0].diResultType === '数字型'){
              diResultType = 3
          }
          this.project.isUse =  diUsable
          this.project.projectName = data.one[0].diName
          this.project.pinyinCode = data.one[0].diPyname
          this.project.measurementUnit = data.one[0].diUnit
          this.project.referenceValue = data.one[0].diRefreence
          this.project.resultType = diResultType
          this.project.projectSort = data.one[0].diOrder
          this.project.projectCode  = data.one[0].diCode
          this.detailedData = []
           data.two.map((item,index) => {
             this.detailedData.push({thedetailvalue:item.thedetailvalue})
             return  this.detailedData
           })
          data.three.map((item,index) => {
            this.rule.push({dcrule1:item.dcRule1, dccontrastvalue1:item.dcContrastValue1,
               dcrule2:item.dcRule2,dccontrastvalue2:item.dcContrastValue2,
               dccontrastresult: item.dcContrastResult, dccontrastresultdate:item.dcContrastResultDate})
            return this.rule
          })
        }else{
          console.log(res)
        }
    })
    },
// updateditionProjectById.do  
// di_id,diname,dipyname,diunit,diresulttype, direfreence,// diorder,dicode,dusable,detailPrice[{thedetailvalue:xx}],
// rule[{dcrule1:xx,dccontrastvalue1:xx,dcrule2:xx,dccontrastvalue2:xx,dccontrastresult:xx,dccontrastresultdate}]
    save(){
      let dusable = '是'
      if(this.project.isUse === 2){
        dusable = '否'
      }
      let resultType = '不计类型'
      if(this.project.resultType === 2){
         resultType = '文本型'
      } else if(this.project.resultType === 3 ){
         resultType = '数字型'
      }
      let detailPrice = JSON.stringify(this.detailedData)
      let myRules = JSON.stringify(this.rule)
      let data = {
        di_id: this.$route.query.itemId,
        dusable: dusable,
        diname: this.project.projectName,
        dipyname: this.project.pinyinCode,
        diunit: this.project.measurementUnit,
        direfreence: this.project.referenceValue,
        diresulttype: resultType,
        diorder: this.project.projectSort,
        dicode: this.project.projectCode,
        detailPrice: detailPrice,
        rule: myRules
      }
      this.axios.post('/updateditionProjectById.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
         thsi.sucMsg('修改成功')
         this.$router.push({path:'/wrap/project/listPJ',query: {page:this.page}})
        }else{
          console.log(res)
        }
    })
    },
    addRule(item) {
      this.rule.push(this.item)
    },
     // 删除一行
    addDetailed(){
      this.detailedData.push({thedetailvalue: ''})
    },
    delInner(item,index){
       this.detailedData.splice(index, 1)
    },
    delRule(i,index){
      this.rule.splice(index, 1)
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
 margin: 10px 20px;
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
width: 60%;
padding: 0 20px;
}
.rule-table{
  width: 100%;
  margin: 20px auto;
  padding-left: 20px;
/*  border: 1px solid #dedede; */
}
.rule-table .el-table_row .hover-row{
background: #fff!important;
}
.rule-table select{
outline: none!important;
 border: none!important;
 display: inline-block;
 width: 100%;
 height: 50px;
 line-height: 50px;
}
 .rule-table select, .rule-table input{
 outline: none!important;
 border: none!important;
 display: inline-block;
 width: 100%;
 height: 50px;
 line-height: 50px;
}
.add-detailed-table .my-table2 tr td{
  width: 100%;
}
.add-detailed-table .my-table2 tr td{
  border-collapse: separate; 
  border-spacing:  2px!important;
  border-color: grey;
}
.del-btns-inner{
float: right;
position: relative;
top:-40px;
right:10px;
}
.rule-table  table td {
  border: 1px solid #e6e6e6;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.rule-table  table td input{
  text-align: center;
}
.rule-table  table th{
  background: #e2eff3;
  font-size: 16px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e6e6e6;
  text-align: center;
}
.del-btns-inner{
float: right;
position: relative;
top:-40px;
right:10px;
}
.title-btn{
  float: left;
}
.my-return-btn{
  background: white;
color: #1f7edd;
float: right;
margin-right: 30px;
}
</style>
<template>
  <div class="content"> 
  <div class="tableForm">
    <el-form ref="form" :model="form" label-width="80px">
    <div class="row public-input public-div">
      <div class="col">
        <span>用人单位:</span>
        <input type="text"  v-model="form.employers" placeholder=""/>
      </div>
       <div class="col">
        <span>职业卫生管理负责人:</span>
        <input type="text"  v-model="form.chargePerson"  placeholder=""/>
      </div>
       <div class="col">
        <span>联系电话:</span>
        <input type="text" v-model="form.phoneNum"  placeholder=""/>
      </div>
       <div class="col">
        <span>电子邮箱:</span>
        <input type="text" v-model="form.email"  placeholder=""/>
      </div>
    </div>
   <div class="row public-input public-div">
      <div class="col">
        <span>编制人:</span>
        <input type="text" v-model="form.compactor"  placeholder=""/>
      </div>
       <div class="col">
        <span>审核人:</span>
        <input type="text" v-model="form.auditor"  placeholder=""/>
      </div>
      <div class="block col">
        <span class="demonstration">建档时间</span>
        <el-date-picker v-model="form.time" type="date" placeholder="选择日期"> </el-date-picker>
      </div>
       <div class="col">
      </div>
    </div>
  <div class="content"> 
  <div class="tableForm">
    <el-form ref="form" :model="form" label-width="80px">
    <div class="row public-input public-div">
      <div class="col">
        <span>用人单位:</span>
        <input type="text"  v-model="form.employers" placeholder=""/>
      </div>
       <div class="col">
        <span>职业卫生管理负责人:</span>
        <input type="text"  v-model="form.chargePerson"  placeholder=""/>
      </div>
       <div class="col">
        <span>联系电话:</span>
        <input type="text" v-model="form.phoneNum"  placeholder=""/>
      </div>
       <div class="col">
        <span>电子邮箱:</span>
        <input type="text" v-model="form.email"  placeholder=""/>
      </div>
    </div>
   <div class="row public-input public-div">
      <div class="col">
        <span>编制人:</span>
        <input type="text" v-model="form.compactor"  placeholder=""/>
      </div>
       <div class="col">
        <span>审核人:</span>
        <input type="text" v-model="form.auditor"  placeholder=""/>
      </div>
      <div class="block col">
        <span class="demonstration">建档时间</span>
        <el-date-picker v-model="form.time" type="date" placeholder="选择日期"> </el-date-picker>
      </div>
       <div class="col">
      </div>
    </div>
<div class="content">
  <div class="list-title-all border-bottom">
     <button class="title-btn">年度职业病防治计划实施检查表</button>
  </div>
  <div class="tableForm">
    <el-form :inline="true" :model="form" class="demo-form-inline" label-width="140px" style="margin-left:-50px;">
      <div class="form-items">
        <el-form-item label="用人单位"  style="margin-right:30px;">
          <el-input v-model="form.employers" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="职业卫生管理负责人">
          <el-input v-model="form.chargePerson" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phoneNum" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱 ">
          <el-input v-model="form.email" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
       <div class="form-items">
        <el-form-item label="编制人"  style="margin-right:30px;">
          <el-input v-model="form.compactor" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="form.auditor" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="建档时间">
          <el-date-picker v-model="form.time" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
      </div>
  <div>
    <div class="table-form">
      <el-row>
        <el-col :span="6" class="input-group">
          <span class="title">用人单位:</span>
          <input type="text"  v-model="form.employers"/>
        </el-col>
        <el-col :span="6" class="input-group">
          <span class="title">职业卫生管理负责人:</span>
          <input type="text"  v-model="form.chargePerson"/>
        </el-col>
        <el-col :span="6" class="input-group">
          <span class="title">联系电话:</span>
          <input type="text" v-model="form.phoneNum"/>
        </el-col>
        <el-col :span="6" class="input-group">
          <span class="title">电子邮箱:</span>
          <input type="text" v-model="form.email"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="input-group">
          <span class="title">编制人:</span>
          <input type="text" v-model="form.compactor"/>
        </el-col>
        <el-col :span="6" class="input-group">
          <span class="title">审核人:</span>
          <input type="text" v-model="form.auditor"/>
        </el-col>
        <el-col :span="6">
          <span class="title">建档时间</span>
          <el-date-picker v-model="form.time" type="date" placeholder="选择日期"> </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <div class="table-container">
      <table width="100%">
        <tr>
          <th v-for="(item,index) in tableData.headData" :key="index">{{item}}</th>
        </tr>
        <tr v-for="(i, x) in tableData.rows " :key="x">
          <td v-for="(rowItem,idx) in i.rowsData" :key="idx" >
            <input v-model="rowItem.name" ></input>
          </td>
        </tr>
        <tr class="rows-add-td">
          <td :colspan="6"><i class="el-icon-circle-plus-outline" @click="addRow"></i></td>
        </tr>
      </table>
    </div>
  </el-form>
  <div class="my-table" >
    <table >
    <tbody>
       <tr>
        <th style="width:80px;">  序号 </th>
        <th style="width:170px;"> 日期 </th>
        <th style="width:480px;">  职业病防治计划内容 </th>
        <th style="width:400px;"> 实施情况</th>
        <th style="width:210px;"> 实施负责人 </th>
        <th style="width:200px;"> 备注</th>
        <th style="width:60px;">  删除 </th>
      </tr>
      <tr v-for="(i, x) in tableData.rows " :key="x">
        <td >
          <input v-model="i.rule1" >  </input>
        </td>
         <td >
          <input v-model="i.contrastValue1" >  </input>
        </td>
         <td >
          <input v-model="i.rule2" >  </input>
        </td>
         <td >
          <input v-model="i.contrastValue2" >  </input>
        </td>
         <td >
          <input v-model="i.handlingOpinions" >  </input>
        </td>
         <td >
          <input v-model="i.handlingTime" >  </input>
        </td>
        <td >
          <i class="el-icon-remove-outline" @click="delInner(x)"></i>
        </td>
        </tr>
        <tr colspan="7" style="height:40px;line-height:40px; text-align: center;  position: relative;" >
         <i class="el-icon-circle-plus-outline add-btn" @click="addRow"></i>
       </tr>
    </tbody>
   </table>
  </div>
<<<<<<< .mine</div> 
<div class="save">
    <el-button type="primary">保存</el-button>
    <el-button type="">清空</el-button>
</div>      
=======>>>>>>> .theirs</div>
</template>

<script>
const item = { name: '' }
const tableData = {
  rows: []
const item = {idx: 1, date: '', content: '', detail: '', person: '', text: ''}
const tableData = {
  headData: ['序号', '日期', '职业病防治计划内容', '实施情况', '实施负责人', '备注'],
  rows: [
    {
      idx: 1,
      date: '2013-5-7',
    }
  ]

}
export default {
  name: 'TableForm',
  data () {
    return {
      tableData: tableData,
      form: {
        time: '',
        employers: '',
        phoneNum: '',
        email: '',
        compactor: '',
        auditor: ''
      }
    }
  },
  methods: {
    addRow() {
      this.tableData.rows.push({
        rule1: '',
        contrastValue1: '',
        rule2: '',
        contrastValue2: '',
        handlingOpinions: '',
        handlingTime: ''
      })
      this.$emit('addRow', this.tableData)
    },
    delInner(index){
      console.log(index)
         this.tableData.rows.splice(this.tableData.rows[index],1)
    },
    addRow() {
      this.tableDate.rows.push({

      })
      this.$emit('addRow', this.tableDate)
    }
  }
}
</script>

<style lang="css" scoped>
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
  margin-top: 30px;
  width: 100%;
}





<style lang="css" scoped>
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
  margin-top: 30px;
  width: 100%;
}

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
<style lang="stylus" rel="stylesheet/stylus" scope>
.table-form
  margin-top: 15px
  height: 40px
  line-height: 40px
  .input-group
    margin-bottom:20px
    .title
      min-width:20%
      display:inline-block
      text-align:left
      padding:0 20px
    input
      font-size: 14px
      outline: none
      border: none
      border-bottom: 1px solid #000
      margin-left: 5px
      height: 36px
.table-container
  width:100%
  margin-top:30px
  table input
    font-size: 16px
    outline: none
    border: none
    height: 40px
    line-height: 40px
  table th,table td
    border: 1px solid #e6e6e6
    text-align: center
    height: 40px
    line-height: 40px
  table th
    background: #e2eff3
    font-size: 16px
    font-weight: normal
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
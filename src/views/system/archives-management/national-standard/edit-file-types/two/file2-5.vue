<template>
    <!--  2-2. id   职业病危害项目申报基本情况表 -->
<div class="content">
  <div class="list-title-all border-bottom">
     <el-button class="title-btn" type="text">   职业病危害项目申报基本情况表 </el-button>
  </div>
  <div class="tableForm">
    <el-form :inline="true" :model="form1" class="demo-form-inline" label-width="250px" style="margin-left:-50px;">
      <div class="form-items">
        <el-form-item label="用人单位"  >
          <el-input v-model="form[0]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="职业卫生管理负责人">
          <el-input v-model="form[1]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form[2]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="电子邮箱 ">
          <el-input v-model="form[3]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="单位名称" >
          <el-input v-model="form[4]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form[5]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="变更原因" >
          <el-input v-model="form[6]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="行业分类">
          <el-input v-model="form[7]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="注册类型">
          <el-input v-model="form[8]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="劳动者总人数" >
          <el-input v-model="form[9]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="职业卫生管理机构" label-width="300px" >
            <el-radio-group v-model="form[10]">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="2">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="职业病累计人数" label-width="310px">
          <el-input v-model="form[11]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="接触职业病危害因素种类数（个）" >
          <el-input v-model="form[12]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
          <el-form-item label="单位注册地址">
           <el-input v-model="form[13]" placeholder="" style="width:220px;"></el-input>
          </el-form-item>
          <el-form-item label="工作场所地址 ">
            <el-input v-model="form[14]" placeholder="" style="width:220px;"></el-input>
          </el-form-item>
         <el-form-item label="接触职业病危害因素人数 ">
           <el-input v-model="form[15]" placeholder="" style="width:220px;"></el-input>
         </el-form-item>
       </div>
      <div class="form-items">
        <!-- 专职是最后一项 -->
          <el-form-item label="职业卫生管理人员数（人）:专职 ">   
           <el-input v-model="form[25]" placeholder="" style="width:220px;"></el-input>
          </el-form-item>
             <el-form-item label="职业卫生管理人员数（人）:兼职 ">
           <el-input v-model="form[16]" placeholder="" style="width:220px;"></el-input>
          </el-form-item>
        <el-form-item label="编制人" >
          <el-input v-model="form[17]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
       <div class="form-items">
          <el-form-item label="审核人">
          <el-input v-model="form[18]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人 ">
          <el-input v-model="form[19]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人联系电话 ">
          <el-input v-model="form[20]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
          <el-form-item label="建档时间">
          <el-date-picker v-model="form[21]" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="申报类别" >
            <el-radio-group v-model="form[22]">
            <el-radio :label="1">初次申报</el-radio>
            <el-radio :label="2">变更申报</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="企业规模">
          <el-radio-group v-model="form[23]">
            <el-radio :label="1">大</el-radio>
            <el-radio :label="2">中</el-radio>
            <el-radio :label="3">小</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
  </el-form>
  <div class="my-table" >
    <table >
      <tr>
        <th colspan="4" style="width:100%">职业病防治计划内容</th>
      </tr>
       <tr>
        <th style="width:400px;">  作业场所名称 </th>
        <th style="width:400px;"> 职业病危害因素名称 </th>
        <th style="width:400px;">  接触人数(可重复) </th>
        <th style="width:400px;"> 接触人数(可重复)</th>
      </tr>
     <tbody v-for="(item,index) in tableData" :key="index">
         <tr>
          <td :rowspan="item.list.length+2"><input v-model="item.name" ref="nameInput"></td>
          <td><input v-model="item.list[0][0]"></td>
          <td><input v-model="item.list[0][1]"> <i class="el-icon-remove-outline my-del"></i> </td>
          <td :rowspan="item.list.length+2"><input v-model="item.num"></td>
         </tr>
         <tr v-for="(i,idx) in item.list" v-if="idx!==0" track-by="idx" :key="idx">
          <td><input v-model="i[0]"></td>
          <td><input v-model="i[1]">
           <i class="el-icon-remove-outline my-del" @click="delInner(idx,item.list,i)"></i></td>
         </tr>
         <tr>
          <td colspan="2"><i class="el-icon-circle-plus-outline add-plus" @click="addInner(item.list)"></i></td>
         </tr>
       </tbody>
        <tr>
        <td colspan="3">合计</td>
        <td><input v-model="form[24]"></td>
         </tr>
       <tr>
        <td colspan="4"><i class="el-icon-circle-plus-outline" @click="addRow"></i></td>
       </tr>
   </table>
  </div>
</div> 
<div class="save">
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="" @click="reset">清空</el-button>
</div> 
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
        typeOne: 2,
        typeTwo: 6,
        year: year,
        table: table,
        inputs: inputs,
        comPId: getUserInfo().comPId
      }
      this.axios.post('/recordsEdit/editSpecialTwo.do', qs.stringify( data )  )
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

.my-table {
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
.merge{
height:40px;line-height:40px; text-align: center;  position: relative;
}
.my-del{
float: right;
margin-right: 20px;
padding-top: 10px;
}
.add-plus{
text-align: center;
}
</style>
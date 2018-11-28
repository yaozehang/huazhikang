<template>
   <div class="content">
    <div class="list-title-all border-bottom">
     <button class="title-btn-file">可能产生职业病危害设备、材料(化学品)一览表 </button>
    </div>
    <!-- <table-title :title="'可能产生职业病危害设备、材料(化学品)一览表'"></table-title> -->
    <form ref="form1" action="">
    <div class="form-table-container">
      <el-form :inline="true" :model="form1" class="demo-form-inline file-form" label-width="160px" >
        <el-form-item label="用人单位" >
          <el-input v-model="form[0]" placeholder=""  class="inner-input" ></el-input>
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
          <el-form-item label="编制人" >
          <el-input v-model="form[4]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="form[5]" placeholder="" class="inner-input"></el-input>
        </el-form-item>
        <el-form-item label="建档时间">
          <el-date-picker v-model="form[6]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" class="inner-input"> </el-date-picker>
        </el-form-item>
    </el-form>
      <div class="table-container my-table">
         <table width="100%">
           <thead>
             <tr>
                <th></th>
                <th>设备、材料、化学品名称</th>
                <th>可能产生职业病的危害因素名称</th>
                <th>使用车间和岗位</th>
                <th>生产、供货单位</th>
                <th>删除</th>
              </tr>
            </thead>
            <tbody v-for="(item,index) in tableData">
              <tr>
                <td class="center-td" :rowspan="item.list.length">{{item.name}}<br><i class="el-icon-circle-plus-outline icon" @click="addLine(item,index)" track-by="index">
                </i></td>
                <td><input v-model="item.list[0][0]"></input></td>
                <td><input v-model="item.list[0][1]"></input></td>
                <td><input v-model="item.list[0][2]"></input></td>
                <td><input v-model="item.list[0][3]"></input></td>
                <td><i class="el-icon-remove-outline icon" @click="cutLine(index,item.list)"></i></td>
              </tr>
              <tr v-for="(row,idx) in item.list" v-if="idx>0" track-by="idx">
                <td><input v-model="row[0]"></input></td>
                <td><input v-model="row[1]"></input></td>
                <td><input v-model="row[2]"></input></td>
                <td><input v-model="row[3]"></input></td>
                <td class="center-td"><i class="el-icon-remove-outline icon" @click="cutLine1(idx,row,item.list)"></i></td>
              </tr>
            </tbody>
         </table>
      </div>
    </div>
    </el-form>
    <div class="save">
       <el-button  @click="reset">清 空</el-button>
       <span class="save-blue big-blue left-20" @click="save" >保 存</span>
    </div>
    </form>
    <!-- 保存弹框 -->
  <div class="choose-year" v-show="isSave">
     <el-dialog  class="dialog-form" title="选择年限" center width="400px" :visible.sync="isSave">
        <el-date-picker v-model="saveYear" type="year" placeholder="选择年" value-format="yyyy"  class="choose-year-data left-50"> </el-date-picker>
      <div slot="footer" class="dialog-footer my-footer-bths" >
        <el-button @click="cancleSave()">取 消</el-button>
        <span class="save-blue big-blue left-20" @click="saveAll" >确 定</span>
      </div>
    </el-dialog>
  </div>
   </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import {getDate} from 'common/js/time'
import getUserInfo from 'common/js/user'
import {FillEditOne} from 'api/archives.js'
 // pId : getUserInfo().partitionId
  // comPId: getUserInfo().comPId
import qs from  'qs'
export default {
  data () {
    return {
      isSave: false,
      saveYear: new Date('2018'),
      form1: {},
      form: ['', '', '', '', '', '', ''],
      tableData: [
        { name:'设备', list: [['', '', '', ''], ['', '', '', '']] },
        { name: '材料', list: [['', '', '', ''], ['', '', '', '']] },
        { name:'化学品', list: [['', '', '', ''], ['', '', '', '']] }
      ]
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
    addLine(item,index) {
      // console.log(index, item)
      let itemObj = ['', '', '', '']
      item.list.push(itemObj)
    },
    cutLine(index, list) {   //删除第一行
      if (list.length >2) {     
        list.splice(index, 1)
      }
    },
    cutLine1(index, row,list){
      list.splice(index,1)
    },
    reset() {
  /*    this.$refs.form1.reset()*/
    },
    save() {
      this.isSave = !this.isSave
    },
    saveAll() {
      // recordsEdit/editSpecialOne.do   可能产生职业病危害设备、材料和化学品一览表的接口
      this.isSave = !this.isSave
      let year = this.saveYear  
      let table = JSON.stringify(this.tableData)
      let inputs =JSON.stringify(this.form)
      let  data ={
        typeOne: '职业病危害因素监测与检测评价档案',
        typeTwo: '可能产生职业病危害设备、材料和化学品一览表',
        year: year,
        table: table,
        inputs: inputs,
        comPId: getUserInfo().comPId
      }
      FillEditOne(qs.stringify(data)).then((res) =>{
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
  },
  components: {
    tableTitle
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.content
  margin-top:20px
  .form-table-container
    width:900px
    margin:0 auto
    margin-top:10px
    border-radius(5px)
    ul
      padding-top:15px
      font-size:0
      li.input-group
        display:inline-block
        height:40px
        line-height:40px
        margin-bottom:20px
        margin-right:40px
        margin-left:-90px
        font-size:0
        .title
          display:inline-block
          margin-right:20px
          min-width:160px
          font-size:$font-size-medium
          text-align:right
        .inner-input
          width:220px
  .table-container
    width:900px
    .icon
      cursor:pointer
      font-size:16px
  .btn-container
    margin-top: 50px
    text-align:center
</style>
<style lang="css" scoped>
.form-table-container{
  width: 900px;
  margin:  0 auto;
  padding: 20px;
  background: #f5fcff;
}
.file-form{
  width: 800px;
  margin:  0 auto;
}
.content .my-table{
  width: 900px;
  background: #fff;
}
.inner-input{
  width: 220px;
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
.content .table-container  table th{
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
  right:50%;
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
  text-align: center;
}
</style>
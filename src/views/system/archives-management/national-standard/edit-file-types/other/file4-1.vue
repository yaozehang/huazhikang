<template>
   <div class="content">
    <table-title :title="'可能产生职业病危害设备、材料(化学品)一览表'"></table-title>
    <form ref="form1" action="">
    <div class="form-table-container">
      <ul class="form-container">
        <li class='input-group'>
          <span class='title'>用人单位</span>
          <el-input class="inner-input" v-model="form[0]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title' style="margin-left:70px">职业卫生管理负责人</span>
          <el-input class="inner-input" v-model="form[1]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title'>联系电话</span>
          <el-input class="inner-input" v-model="form[2]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title'>电子邮箱</span>
          <el-input class="inner-input" v-model="form[3]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title'>编制人</span>
          <el-input class="inner-input" v-model="form[4]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title' style="margin-left:70px">审核人</span>
          <el-input class="inner-input" v-model="form[5]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title'>编制时间</span>
          <el-date-picker type="date" v-model="form[6]"  value-format="yyyy-MM-dd"  placeholder="选择日期" classs="inner-input"></el-date-picker>
        </li>
      </ul>
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
            <tbody v-for="(item,index) in tableData" :key="index">
              <tr>
                <td :rowspan="item.list.length">{{item.name}}<br><i class="el-icon-circle-plus-outline icon" @click="addLine(item,index)" track-by="index">
                </i></td>
                <td><el-input v-model="item.list[0][0]"></el-input></td>
                <td><el-input v-model="item.list[0][1]"></el-input></td>
                <td><el-input v-model="item.list[0][2]"></el-input></td>
                <td><el-input v-model="item.list[0][3]"></el-input></td>
                <td><i class="el-icon-remove-outline icon" @click="cutLine(index,item.list)"></i></td>
              </tr>
              <tr v-for="(row,idx) in item.list" v-if="idx>0" track-by="idx" :key="idx">
                <td><el-input v-model="row[0]"></el-input></td>
                <td><el-input v-model="row[1]"></el-input></td>
                <td><el-input v-model="row[2]"></el-input></td>
                <td><el-input v-model="row[3]"></el-input></td>
                <td><i class="el-icon-remove-outline icon" @click="cutLine1(idx,row,item.list)"></i></td>
              </tr>
            </tbody>
         </table>
      </div>
    </div>
    <div class="btn-container">
       <el-button type="primary" @click="save">保存</el-button>
       <el-button  @click="reset">清空</el-button>
    </div>
    </form>
    <!-- 保存弹框 -->
  <div class="choose-year" v-show="isSave">
     <el-dialog  class="dialog-form" title="选择年限"  width="22%" :visible.sync="isSave">
        <el-date-picker v-model="saveYear" type="year" placeholder="选择年" value-format="yyyy"  class="choose-year-data"> </el-date-picker>
      <div slot="footer" class="dialog-footer my-footer-bths" >
        <el-button type="primary" @click="saveAll()">确 定</el-button>
        <el-button @click="cancleSave()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
   </div>
</template>

<script>
import tableTitle from 'components/table-title/table-title'
import {getDate} from 'common/js/time'
import getUserInfo from 'common/js/user'
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
        typeOne: 4,
        typeTwo: 22,
        year: year,
        table: table,
        inputs: inputs,
        comPId: getUserInfo().comPId
      }
      console.log(data)
      this.axios.post('/recordsEdit/editSpecialOne.do', qs.stringify(data) )
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
  },
  components: {
    tableTitle
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.content
  margin-top:20px
  .form-table-container
    margin-top:10px
    border:1px solid $color-border
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
    width:100%
    .icon
      cursor:pointer
      font-size:16px
  .btn-container
    margin-top: 50px
    text-align:center
</style>
<style scoped>
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
  vertical-align: middle;
}
.my-table  table th{
  background: #e2eff3;
  font-size: 16px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e6e6e6;
  text-align: center;
  vertical-align: middle;
}
</style>
<style lang="css" scope>
  .my-table .el-input__inner{
    border:none;
  }
  .btn-container .el-button+.el-button{
    margin-left: 60px;
  }
  .btn-container .el-button{
    width: 120px
  }
</style>
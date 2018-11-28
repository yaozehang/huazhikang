<template>
  <!-- 5-6职业健康监护档案汇总表 id 36-->
   <div class="content">
      <div class="list-title-all border-bottom">
         <button class="title-btn-file">职业健康监护档案汇总表 </button>
      </div>
   	<!-- <table-title :title="title"></table-title> -->
   	<form ref="form" action="">
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
	    		 	 	  <th rowspan="2">部门/车间</th>
	    		 	 	  <th rowspan="2">档案编号</th>
	    		 	 	  <th rowspan="2">姓名</th>
	    		 	 	  <th rowspan="2">性别</th>
	    		 	 	  <th rowspan="2">建档时间</th>
                <th colspan="3">人员调离情况</th>
                <th rowspan="2">备注</th>
                <th rowspan="2" width="50px"></th>
	    		 	 	</tr>
              <tr>
                <th>调离时间</th>
                <th>是否提供档案复印件</th>
                <th>劳动者签字</th>
              </tr>
    		 	 	</thead>
    		 	 	<tbody>
    		 	 		<tr v-for="(item,index) in tableData" :key="index"  track-by="index">
                <td><el-input v-model="item[0]"></el-input></td>
                <td><el-input v-model="item[1]"></el-input></td>
                <td><el-input v-model="item[2]"></el-input></td>
                <td><el-input v-model="item[3]"></el-input></td>
                <td><el-input v-model="item[4]"></el-input></td>
                <td><el-input v-model="item[5]"></el-input></td>
                <td><el-input v-model="item[6]"></el-input></td>
                <td><el-input v-model="item[7]"></el-input></td>
                <td><el-input v-model="item[8]"></el-input></td>
                <td><i class="icon el-icon-remove-outline" @click="cutRow(index)"></i></td>
    		 	 		</tr>
              <tr>
                <td colspan="13"><i class="el-icon-circle-plus-outline icon" @click="AddRow()"></i></td>
              </tr>
    		 	 	</tbody>
    		 </table>
    	</div>
    </div>
    </el-form>
    <div class="btn-container">
    	<el-button  @click="reset">清空</el-button>
      <span class="save-blue big-blue" @click="save" >保存</span>
    </div>
    </form>
    <!-- 保存弹框 -->
  <div class="choose-year" v-show="isSave">
     <el-dialog  class="dialog-form" title="选择年限" center width="400px" :visible.sync="isSave">
        <el-date-picker v-model="saveYear" type="year" placeholder="选择年" value-format="yyyy"  class="choose-year-data left-50"> </el-date-picker>
      <div slot="footer" class="dialog-footer my-footer-bths" >
        <el-button @click="cancleSave()">取 消</el-button>
          <span class="save-blue big-blue" @click="saveAll" >保存</span>
      </div>
    </el-dialog>
  </div>
   </div>
</template>

<script>
import qs from 'qs'
import tableTitle from 'components/table-title/table-title'
import {getDate} from 'common/js/time' 
import getUserInfo from 'common/js/user'
import {FillEdit} from 'api/archives.js'

export default {
  data () {
    return {
      isSave: false,
      title:'职业健康监护档案汇总表',
      saveYear: '',
      form1:{},
      form: ['', '', '', '', '', ''],
      tableData: [['','', '', '', '', '', '', '', '']]
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
  	AddRow() {
      this.tableData.push(['','', '', '', '', '', '', '', ''])
  	},
    cutRow(index) {
      this.tableData.splice(index, 1)
    },
  	reset() {
  		this.$refs.form.reset()
  	},
    save() {
      this.isSave = !this.isSave
    },
    reset() {
      this.tableData= []
      this.form = ['', '', '', '', '', '']
    },
    saveAll() {
      this.isSave = !this.isSave
     let inputs =JSON.stringify(this.form)
     let table = JSON.stringify(this.tableData)
     let  data ={
        typeOne: '用人单位职业健康监护管理档案',
        typeTwo: '职业健康监护档案汇总表',
        year: this.saveYear,
        table: table,
        inputs: inputs,
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
    background:#f5fcff
  	margin-top:10px
  	border:1px solid $color-border
  	border-radius(5px)
  	ul
  	  padding-top:15px
  	  font-size:0
  	  li.input-group
       width: 400px 
  	  	display:inline-block
  	  	height:40px
  	  	line-height:40px
  	  	margin-bottom:20px
  	  	// margin-right:40px
  	  	// margin-left:-90px
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
<style lang="css" scoped>
.tableForm{
  width: 900px;
  margin:  0 auto;
  padding: 20px;
  background: #f5fcff;
}
.file-form{
  width: 800px;
  margin:  0 auto;
}
.content .table-container
  width: 900px;
  border: 1px solid #ccc;
  background: #fff;
}
.content .table-containertable{
  width: 900px;
  table-layout: fixed;
}
.content .table-containertr td{
  border-collapse: separate;
  border-spacing:  2px!important;
  border-color: grey;
}
.content .table-container table td {
  border: 1px solid #e6e6e6;
  text-indent: 5px;
  height: 40px;
  line-height: 40px;
  background: #fff;
}
.content .table-container table td input{
  text-indent: 5px;
  outline: none;
  border: none;
  background: #fff;
}
.content .table-container table thead tr{
    border: 1px solid #e6e6e6;
    height: 40px;
    line-height: 40px;
}
.content .table-container table thead th{
  background: #fff;
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
padding-top: 50px;
background: #f5fcff;
}
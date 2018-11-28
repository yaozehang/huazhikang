<template>
  <!-- id 22 -->
   <div class="content">
    <div class="list-title-all border-bottom">
     <button class="title-btn-file">接触职业病危害因素汇总表 </button>
    </div>
   	<!-- <table-title :title="'接触职业病危害因素汇总表'"></table-title> -->
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
	    		 	 	  <th rowspan="2" width="50px">序号</th>
	    		 	 	  <th rowspan="2">岗位</th>
	    		 	 	  <th rowspan="2">职业病危害<br>因素名称</th>
	    		 	 	  <th rowspan="2">危害来源</th>
	    		 	 	  <th rowspan="2">接触方式<br>（定点巡查）</th>
	    		 	 	  <th colspan="2">接触职业病危害</th>
                <th rowspan="2">工程防护<br>设施</th>
                <th rowspan="2">个体防护<br>用品</th>
                <th rowspan="2" width="50px">刪除</th>
	    		 	 	</tr>
              <tr>
                <th>总人数</th>
                <th>女工数</th>
              </tr>
    		 	 	</thead>
    		 	 	<tbody>
    		 	 		<tr v-for="(item,index) in tableData" :key="index" track-by="index">
                <td><input v-model="item[0]"></input></td>
                <td><input v-model="item[1]"></input></td>
                <td><input v-model="item[2]"></input></td>
                <td><input v-model="item[3]"></input></td>
                <td><input v-model="item[4]"></input></td>
                <td><input v-model="item[5]"></input></td>
                <td><input v-model="item[6]"></input></td>
                <td><input v-model="item[7]"></input></td>
                <td><input v-model="item[8]"></input></td>
                <td class="center-td" >
                  <i class="el-icon-remove-outline" @click="delInner(index)"></i>
                </td>
    		 	 		</tr>
              <tr>
                <td colspan="10" style="text-align:center;"><i class="el-icon-circle-plus-outline icon" @click="AddRow"></i></td>
              </tr>
    		 	 	</tbody>
    		 </table>
    	</div>
    </div>
    </el-form>
    <div class="save">
    	 <el-button  @click="reset">清空</el-button>
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
import qs from 'qs'
import {getDate} from 'common/js/time' 
import tableTitle from 'components/table-title/table-title'
import getUserInfo from 'common/js/user'
import {FillEdit} from 'api/archives.js'

export default {
  data () {
    return {
      isSave: false,
      form1:{},
      saveYear: '',
      form: ['', '', '', '', '', '', ''],
      tableData: [['', '', '', '', '', '', '','', '']]
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
  	AddRow(index) {
      this.tableData.push(['', '', '', '', '', '', '','', ''])
  	},
  	reset() {
  		this.$refs.form.reset()
  	},
    save() {
      this.isSave = !this.isSave
    },
    delInner(index){
      this.tableData.splice(index,1)
    },
    saveAll() {
      // typeOne  大类型  typeTwo小类型
      this.isSave = !this.isSave
      let year = this.saveYear  
      let table = JSON.stringify(this.tableData)
      let inputs =JSON.stringify(this.form)
      let  data ={
        typeOne: '职业病危害因素监测与检测评价档案',
        typeTwo: '接触职业病危害因素汇总表',
        year: year,
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
    margin: 0 auto
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
  	width:100%
    border:1px solid $color-border 
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
  border: 1px solid #ccc;
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
</style>
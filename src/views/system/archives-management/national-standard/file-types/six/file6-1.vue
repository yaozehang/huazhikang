<template>
  <!--6-1 劳动者个人信息卡 37-->
   <div class="content">
    <div class="list-title-all border-bottom">
      <button class="title-btn-file">劳动者个人信息卡 </button>
    </div>
   	<!-- <table-title :title="'劳动者个人信息卡'"></table-title> -->
   	<form ref="form" action="">
    <div class="form-table-container">
    	<ul class="form-container">
    		<li class='input-group'>
    			<span class='title'>用人单位</span>
    			<el-input class="inner-input" v-model="form[0]"></el-input>
    		</li>
    		<li class='input-group'>
    			<span class='title' style="margin-left:70px">职业卫生管理负责人</span>
    			<el-input class="inner-input"  v-model="form[1]"></el-input>
    		</li>
    		<li class='input-group'>
    			<span class='title'>联系电话</span>
    			<el-input class="inner-input"  v-model="form[2]"></el-input>
    		</li>
    		<li class='input-group'>
    			<span class='title'>电子邮箱</span>
    			<el-input class="inner-input"  v-model="form[3]"></el-input>
    		</li>
    		<li class='input-group'>
    			<span class='title'>档案号</span>
    			<el-input class="inner-input"  v-model="form[4]"></el-input>
    		</li>
    		<li class='input-group'>
    			<span class='title' style="margin-left:70px">姓名</span>
    			<el-input class="inner-input"  v-model="form[5]"></el-input>
    		</li>
        <li class='input-group'>
          <span class='title'>性别</span>
          <el-input class="inner-input"  v-model="form[6]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title'>籍贯</span>
          <el-input class="inner-input"  v-model="form[7]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title'>婚姻</span>
          <el-input class="inner-input"  v-model="form[8]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title' style="margin-left:70px">文化程度</span>
          <el-input class="inner-input"  v-model="form[9]"></el-input>
        </li>
        <li class='input-group'>
          <span class='title'>参加工作时间</span>
          <el-date-picker type="date" placeholder="选择日期"   v-model="form[10]" value-format="yyyy-MM-dd"  class="inner-input"></el-date-picker>
        </li>
        <li class='input-group'>
          <span class='title'>身份证号</span>
          <el-input class="inner-input"  v-model="form[11]"></el-input>
        </li>
    		<li class='input-group'>
    			<span class='title'>编制时间</span>
    			<el-date-picker type="date" placeholder="选择日期"  v-model="form[12]" value-format="yyyy-MM-dd"  class="inner-input"></el-date-picker>
    		</li>
        <li class="input-group">
          <label class='title' style="margin-left:70px" for="img_upload">上传照片</label>
          <input type="file" id="img_upload" style="visibility:hidden;font-size:0;position:absolute;left:0">
          <el-input class="inner-input"  v-model="form[13]"></el-input>
        </li>
    	</ul>
    	<div class="table-container my-table">
    		 <table width="100%">
    		 	 <thead>
            <tr>
              <th colspan="7">职业史及职业病危害接触史</th>
            </tr>
	    		 	 <tr>
	    		 	 	  <th>起止时间</th>
	    		 	 	  <th>工作单位</th>
	    		 	 	  <th>工种</th>
	    		 	 	  <th>接触职业病危害因素</th>
	    		 	 	  <th>防护措施</th>
                <th>删除</th>
	    		 	 	</tr>
    		 	 	</thead>
    		 	 	<tbody>
    		 	 		<tr v-for="(item,index) in tableData" :key="index" track-by="index">
                <td>
                  <el-date-picker v-model="item[0]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                </td>
                <td><el-input v-model="item[1]"></el-input></td>
                <td><el-input v-model="item[2]"></el-input></td>
                <td><el-input v-model="item[3]"></el-input></td>
                <td><el-input v-model="item[4]"></el-input></td>
                <td><i class="icon el-icon-remove-outline" @click="cutRow(index)"></i></td>
    		 	 		</tr>
              <tr>
                <td colspan="13"><i class="el-icon-circle-plus-outline icon" @click="AddRow"></i></td>
              </tr>
    		 	 	</tbody>
    		 </table>
    	</div>
    </div>
    </el-form>
    <div class="btn-container">
    	 <el-button type="primary" @click="save">保存</el-button>
    	 <el-button  @click="reset">清空</el-button>
    </div>
    </form>
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
import tableTitle from 'components/table-title/table-title'
import {getDate} from 'common/js/time' 
import getUserInfo from 'common/js/user'
import {FillEdit} from 'api/archives.js'
export default {
  data () {
    return {
      isSave: false,
      saveYear: '',
      tableData: [],
      form: ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
  	AddRow() {
    this.tableData.push(['', '', '', '', ''])
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
    saveAll() {
      // typeOne  大类型  typeTwo小类型
      this.isSave = !this.isSave  
      let year = this.saveYear
      let table = JSON.stringify(this.tableData)
      let inputs =JSON.stringify(this.form)
      let  data ={
        typeOne: '劳动者个人职业健康监护档案',
        typeTwo: '劳动者个人信息卡',
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
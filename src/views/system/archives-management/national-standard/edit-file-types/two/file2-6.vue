<template>
    <!-- 2#6  2-5 id 10 职业病防护设施检修、维护记录表 -->
<div class="content">
  <div class="list-title-all border-bottom">
     <button class="title-btn"> 职业病防护设施检修、维护记录表</button>
  </div>
  <div class="tableForm">
    <el-form :inline="true" :model="form1" class="demo-form-inline" label-width="160px" style="margin-left:-50px;">
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
        <el-form-item label="电子邮箱 ">
          <el-input v-model="form[3]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
      </div>
      <div>
      </div>
      <div class="form-items">
        <el-form-item label="车间名称" >
          <el-input v-model="form[4]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="车间负责人">
          <el-input v-model="form[5]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="防护设备名称" >
          <el-input v-model="form[6]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="检修时间">
          <el-date-picker v-model="form[7]" type="date"   value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
      </div>
       <div class="form-items clearfix">
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle"> 检修、维护情况（包括检修的原因、检修部门、检修费用、检修效果等）</span>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[8]" placeholder="" type="textarea"   :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
        <div class="word-left">
          <p class="findQusetion">
            <span class="qusetionTitle">验收意见 </span>
          </p>
          <el-form-item label=""  >
            <el-input v-model="form[9]" placeholder="" type="textarea"    :rows="5" class="my-textarea" ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="form-items">
        <el-form-item label="负责人 ">
          <el-input v-model="form[10]" placeholder="" style="width:220px;"></el-input>
        </el-form-item>
        <el-form-item label="编制日期">
          <el-date-picker v-model="form[11]" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
      </div>
  </el-form>
</div> 
<div class="save">
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="" @click="reset">清空</el-button>
</div> 
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
import qs from 'qs'
import {getDate} from 'common/js/time'
import getUserInfo from 'common/js/user'
 // pId : getUserInfo().partitionId
  // comPId: getUserInfo().comPId
export default {
  name: 'maintenance-record',
  data () {
    return {
      saveYear: '',
      isSave: false,
      form1: {},
      form: ['', '', '', '', '', '', '', '', '', '', '', '']
    }
  },
  mounted(){
    let time = getDate()
    this.saveYear = `${time.year}`
   },
  methods: {
    reset() {
      this.form = ['', '', '', '', '', '', '', '', '', '', '', '']
    },
    save() {
      this.isSave = !this.isSave
    },
    saveAll() {
      let table = JSON.stringify([])
      let inputs =JSON.stringify(this.form)
      let  data ={
        typeOne: 2,
        typeTwo: 10,
        year: this.saveYear,
        table: table,
        inputs: inputs,
        comPId: getUserInfo().comPId
      }
      console.log(data)
      this.axios.post('/web/recordsEdit/edit.do', qs.stringify( data ) )
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
  padding-left: 78px;
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
  height: 40px;
  line-height: 40px;
}
.my-textarea{
  width: 700px;
 padding-left:78px;
}
</style>
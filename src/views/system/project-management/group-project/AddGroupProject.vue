<template>
<div class="clearfix addZone-container"> 
  <div class="addZone-content">
    <div class="addZone-title border-bottom">
       <el-button class="title-btn" type="text">新增组合项目</el-button>
    </div>
 <div class="add-form">
      <el-form ref="project" :model="project" :rules="rules"  label-width="120px" style="width:90%; margin:0 auto;">
        <el-form-item label=" 是否启用" >
           <el-radio-group v-model="project.isUse">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="项目名称" required prop="projectName">
          <el-input v-model="project.projectName" @blur="getCode"></el-input>
        </el-form-item>
        <el-form-item label="拼音简码" required prop="pinyinCode">
            <el-input v-model="project.pinyinCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="结果类型" >
            <el-radio-group v-model="project.resultType" style="width:100%" >
            <el-radio :label="1" >医生检查</el-radio>
            <el-radio :label="2" >功能检查</el-radio>
            <el-radio :label="3" >检验检查</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="默认结果" >
          <el-input type="textarea" :rows="3" placeholder="" v-model="project.defaultResult"> </el-input>
        </el-form-item>
        <el-form-item label="项目排序" >
          <el-input v-model="project.projectSort"  ></el-input>
        </el-form-item>
        <el-form-item label="项目编码" >
          <el-input v-model="project.projectCode"  ></el-input>
        </el-form-item>
        <el-form-item label="明细项目">
        <el-select v-model="project.testItem" multiple  filterable remote reserve-keyword placeholder="请输入明细项目" 
          :remote-method="remoteMethod1"  :loading="loading" style="width:100%" @change="changeTestItem">
          <el-option v-for="(item,index) in DetailedList" :key="index"  :label="item.diName"  :value="item.diId">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item style="margin-top:20px;">
          <el-button type="primary" @click="save('project')">保存</el-button>
          <!-- <el-button @click="reset('project')">清空</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'AddZone',
  data () {
    return {
        project: {
          isUse: 1,
          projectName: '',
          pinyinCode: '',
          resultType: 1,
          defaultResult: '',
          projectSort: '',
          projectCode: '',
          detailedValue: '',
          detalItem: '',
          testItem: '',
      },
      curIdex: -1,
      DetailedList: [],
      tempList: [],
      sysdetalitems: [],
      item: {diName:'',diId:''},
      item2: {diName:'',diId:''},
      loading: false,
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
  mounted() {
    // this.getDetails()
    this.rightList= []
  },
  methods: {
    sucMsg(msg) {
      return this.$message({
        message: msg,
        type: 'success',
        center: true,
        duration: 1000
        })
    },
    errMsg(msg) {
      return this.$message({
        message: msg,
        type: 'error',
        center: true,
        duration: 10000
        })
    },
    reset(project) {
      this.$refs[project].resetFields()
    },
    // 选择明细
    changeTestItem(val){
      let temp = []
      val.map((item,index) => {
        temp.push({diId:item})
      })
      this.sysdetalitems = temp
    },
    // 查询明细项目 接口：selectSysDetalItem.do 值：projectName
    remoteMethod1(query) {
      // this.form.hazardFactors
      this.loading = true
      if (query !== '') {
        let data = {
        projectName: query
      }
      this.axios.post('/selectSysDetalItem.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.DetailedList= []
            this.loading = false
            res.data.one.map((item,index)=> {
               this.DetailedList.push({diName:item.diName,diId:item.diId})
               return  this.DetailedList
            })
          }else{
            console.log(res)
          }
      }) 
      } else {
        this.DetailedList = []
      }
    },
    getCode(){
      let data ={
        name: this.project.projectName,
      }
       this.axios.post('/groupprojectCode.do', qs.stringify(data))
        .then((res) => {
            if (res.status ===200) {
              this.project.pinyinCode = res.data
            }else{
              console.log(res)
            }
        })
    },
    // 新增组合项目：addGroupProject.do值：i_usable,i_name,i_py_name,i_item_tyle,i_default_result, i_order,i_code,sysdetalitems[{diId:xx}]  // i_id gaiwei diId
    save(project){
      let dusable = '是'
      if(this.project.isUse === 2){
        dusable = '否'
      }
      let resultType = '医生检查'
      if(this.project.resultType === 2){
         resultType = '功能检查'
      } else if(this.project.resultType === 3 ){
         resultType = '检验检查'
      }
      let sysdetalitems = JSON.stringify(this.sysdetalitems)
      let data = {
        i_usable: dusable,
        i_name: this.project.projectName,
        i_py_name: this.project.pinyinCode,
        i_item_tyle: resultType,
        i_default_result: this.project.defaultResult,
        i_order: this.project.projectSort,
        i_code: this.project.projectCode,
        sysdetalitems: sysdetalitems,
      }
    this.$refs[project].validate((valid) => {
      if (valid) {
        this.axios.post('/addGroupProject.do', qs.stringify(data))
          .then((res) => {
              if (res.status ===200) {
                this.sucMsg('新增成功')
                this.project = this.project
                this.$router.push({path:'/wrap/project/listGP'})
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
    chooseLeft(item,index){
      this.tempList.push(item)
      this.item = item
    },
    showRight() {
       this.rightList.push(this.item)
       this.DetailedList.splice(this.item,1)
    },
    chooseRight(item,index){
      this.item2 = item
    },
    removeRight(item2){
       this.DetailedList.push(this.item)
       this.rightList.splice(this.item,1)
    }
  }
}
</script>

<style lang="css" scoped>
.addZone-container{
width: 100%; 
}
.addZone-content{
width: 100%;
margin: 20px auto;
}
.addZone-title{
  line-height: 50px;
  color: #fff;
  margin: 20px auto;
  font-size: 16px;
}
.add-form{
  width: 50%;
  margin:  0 auto;
}
.search-btns{
  display: inline-block;
  margin-left: 20%;
}
.add-list ul{
float: left;
max-height: 200px;
}
.list-right{
  height: 200px;
  
}
.list-left,.list-right{
  border: 1px solid #dedede;
  width: 35%;
  overflow:scroll;
}
.list-left li,.list-right li{
  height: 30px;
  line-height: 30px;
  margin: 10px 0;
  width: 100%;
}
.list-left li:hover,.list-right li:hover{
 background: #dedede;
}
.choose{
   /*background: #dedede;*/
}
.btns-show{
  width: 20%;
  padding: 50px 0;
}
.btns-show li{
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
  text-align: center;
  border-radius: 30px;
  border: 1px solid black;
}
</style>
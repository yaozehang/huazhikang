<template>
<div class="clearfix addZone-container"> 
  <div class="addZone-content">
    <div class="addZone-title border-bottom">
      <button class="title-btn">修改信息</button>
      <button class="title-btn my-return-btn" @click="goBack">返回</button>
    </div>
 <div class="add-form">
      <el-form ref="project" :model="project" label-width="120px" style="width:80%; margin:0 auto;">
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
        <el-form-item label="结果类型" >
          <el-radio-group v-model="project.resultType">
            <el-radio :label="1">医生检查</el-radio>
            <el-radio :label="2">功能检查</el-radio>
            <el-radio :label="3">检验检查</el-radio>
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
        <el-form-item label="明细项目" >
          <el-select v-model="project.testItem" multiple  filterable remote reserve-keyword placeholder="请输入明细项目" 
          :remote-method="remoteMethod1"  :loading="loading" style="width:100%" @change="changeTestItem">
          <el-option v-for="(item,index) in DetailedList" :key="item.diId" track-by="index" :label="item.diName"  :value="item.diId">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'EditGroupProject',
  data () {
    return {
        project: {
          isUse: '1',
          projectName: '',
          pinyinCode: '',
          resultType: '1',
          defaultResult:'',
          projectSort: '',
          projectCode: '',
          detailedValue: '',
          detalItem: '',
          testItem: []
      },
      DetailedList: [],
      tempList: [],
      rightList: [],
      item: {diName:'',diId:''},
      item2: {diName:'',diId:''},
      loading: false,
      sysdetalitems: [],
      querryId : this.$route.query.itemId, //列表传过来的id
      page: this.$route.query.page
    }
  },
  mounted() {
    this.getGroupInfo()
  },
  methods: {
    goBack(){
      this.$router.push({path:'/wrap/project/listGP', query: {page:this.page}})
    },
    errMsg(msg) {
      return this.$message({
        message: msg,
        type: 'error',
        center: true,
        duration: 10000
        })
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,
        type: 'success',
        center: true,
        duration: 10000
        })
    },
    changeTestItem(val){
      let temp = []
      val.map((item,index) => {
        temp.push({diId:item})
      })
      this.sysdetalitems = temp
    },
     // 查询明细项目 接口：selectSysDetalItem.do 值：projectName
    remoteMethod1(query) {
      this.DetailedList = []
      this.loading = true
      if (query !== '') {
        let data = {
        projectName: query
      }
      this.axios.post('/web/selectSysDetalItem.do', qs.stringify(data))
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
    // updateSelectGroupProject.do 值： projectId
    getGroupInfo(){
      let data ={
        projectId: this.querryId
      }
      this.axios.post('/web/updateSelectGroupProject.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            let data = res.data
            this.DetailedList = []
            this.project.testItem = []
            let diResultType = 1
            if(data.one[0].diResultType === '功能检查'){
                diResultType = 2 
            } else if(data.one[0].diResultType === '检验检查'){
                diResultType = 3
            }
          this.project.isUse =  data.one[0].iUsable === '是' ? 1: 2
          this.project.projectName = data.one[0].iName
          this.project.pinyinCode = data.one[0].iPyName
          this.project.defaultResult = data.one[0].iDefaultResult
          this.project.resultType = diResultType
          this.project.projectSort = data.one[0].iOrder
          this.project.projectCode  = data.one[0].iCode
          let temp =[] 
          let temp2 = []
          let temp3= []
            this.project.testItem = temp
            data.two.map((item,index)=> {
              temp.push(item.diId)
              temp3.push({diId:item.diId})
              temp2.push({diName:item.diName,diId:item.diId})            
            })
            this.DetailedList = temp2
            this.sysdetalitems = temp3
            this.project.testItem = temp
          }else{
            console.log(res)
          }
      })
    },
    addDetailed() {
    }, 
    // 确认修改 接口：updateGroupProject.do 值：i_id，i_usable,i_name,i_py_name,i_item_tyle,i_default_result, i_order,i_code,sysdetalitems[{i_id:xx}]
    save(){
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
      // this.changeTestItem()
      let tempSys = []
      let sysdetalItems = JSON.stringify(this.sysdetalitems) 
      let data = {
        i_id: this.querryId,
        i_usable: dusable,
        i_name: this.project.projectName,
        i_py_name: this.project.pinyinCode,
        i_item_tyle: resultType,
        i_default_result: this.project.defaultResult,
        i_order: this.project.projectSort,
        i_code: this.project.projectCode,
        sysdetalitems: sysdetalItems,
      } 
      this.axios.post('/web/updateGroupProject.do', qs.stringify(data))
      .then((res) => {
          if (res.status ===200) {
            this.sucMsg('修改成功')
            this.$router.push({path:'/wrap/project/listGP', query: {page:this.page}})
          }else{
            console.log(res)
          }
      })
    },
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
  margin: 20px 0;
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
}
.list-left li:hover,.list-right li:hover{
 background: #dedede;
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
.my-return-btn{
  background: white;
color: #1f7edd;
float: right;
margin-right: 30px;
}
</style>
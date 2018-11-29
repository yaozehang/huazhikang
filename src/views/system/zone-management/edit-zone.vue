<template>
<div class=" addZone-container" @click="hideTree($event)"> 
  <div class="addZone-content">
    <div class="type-list-title border-bottom">
       <el-button type="text" class="title-btn">修改分区</el-button>
       <el-button class="return" @click="goBack">返回 </el-button>
        <!-- <button class="return" @click="goBack">返回</button> -->
    </div>
    <div class="add-form my-form" >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" >
      <el-form-item label="分区名称" prop="name"  required>
        <el-input v-model="form.name"  style="width:100%" ></el-input>
      </el-form-item>
      <el-form-item label="上级分区" prop="higherZone" required>
        <el-input   readonly v-model="form.higherZone"  id="part" style="width:100%" ></el-input>
      </el-form-item>
        <el-form-item label="工种/职务" prop="workType">
        <el-select v-model="form.workType" multiple   filterable placeholder="请输入关键词" 
           style="width:100%" @remove-tag="removeWork">
          <el-option v-for="(item,index) in workTypeList" :key="index"  :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 选择列表 -->
      <el-form-item label="危害因素">
     <el-select v-model="form.hazardFactors" multiple  filterable  placeholder="请输入关键词" 
        style="width:100%">
        <el-option v-for="(item,index) in hazardFactorsList" :key="index"  :label="item.name"  :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
<!--       <el-form-item label="护具类型">
        <el-select v-model="form.protectClothing"  multiple placeholder="请选择" style="width:100%">
          <el-option v-for="(item,index) in protectClothingList" :key="item.id"  :label="item.name"  :value="item.id">
        </el-option>
        </el-select>
      </el-form-item> -->
        <el-form-item label="护具类型" >
        <el-select v-model="form.protectClothing"  multiple placeholder="请选择" style="width:100%">
          <el-option v-for="(item,index) in protectClothingList" :key="index"  :label="item.ptName"  :value="item.ptId">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="培训主题">
        <el-select v-model="form.testTheme" multiple placeholder="请选择" style="width:100%">
          <el-option v-for="(item,index) in trainingThemeList" :key="index"  :label="item.theme"  :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="培训周期">
        <el-input  v-model="form.testCycle" placeholder="天" style="width:200px; margin-right:20px;" type="number"></el-input>  <span>天</span>
      </el-form-item>
      <el-form-item label="二维码">
        <div class="code-img" @click="codeVisible = true">
          <img :src="form.qrcodePath" alt="">
        </div>
      </el-form-item>
      <el-form-item label="分区备注">
        <el-input type="textarea" v-model="form.zoneRemarks" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" @click="save('form')" :disabled="disabled">保存</el-button> -->
        <el-button @click="reset('form')">清空</el-button>
        <!-- <span class="reste-btn"  @click="reset('form')">清空</span> -->
         <span class="save-blue big-blue" @click="save('form')" :disabled="disabled">保存</span>
      </el-form-item>
  </el-form>
  <!-- 二维码弹窗 -->
      <el-dialog  class="dialog-form" title="" width="400px"  :visible.sync="codeVisible" >
        <div class="code-bid-img">
          <img :src="form.qrcodePath" alt="">
        </div>
      </el-dialog>
        <!-- 二维码弹窗 -->
    </div>
  </div>
</div>
</template>
<script>
import utils from '@/utils'
import {myurl} from '@/api/config.js'
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {getWorklist,getHarmlist,getThemelist,getProtectlist,editZone} from 'api/zone.js'
const form = {
      name: '',
      higherZone: '',
      workType: [],
      protectClothing: [],
      hazardFactors: [],
      zoneRemarks: '',
      testTheme: [],
      testCycle: ''
      }
  const rules = {
      name: [{ required: true, message: '请输入分区名称', trigger: 'blur' }],
      higherZone: [{ required: true, message: '请选择上级分区', trigger: 'blur' }],
    }
export default {
  name: 'AddZone',
  data () {
    return {
      rules: rules,
      zoneData: [],
      form: {
        name: '',
        higherZone: '',
        workType: [],
        protectClothing: '',
        hazardFactors: '',
        zoneRemarks: '',
        testTheme: '',
        testCycle: '',
        qrcodePath: ''
      },
      isSelectZone: false,
      isShowList: false,
      isShowWorkType: false,
      isShowListHazard: false,
      isProtectList: false,
      loading1: false,
      loading2: false,
      disabled: false,
      codeVisible: false,
      workTypeName: [],
      hazardTabel: [],
      protectTable: [],
      workTypeList: [],
      zoneKey: {},
      trainingThemeList: [],
      hazardFactorsList: [],
      protectClothingList: [],
      testTheme: ['噪声', '粉尘', '一氧化碳'],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      queryItem: this.$route.query.item,
      page: this.$route.query.page
    }
  },
  watch: {
    // 'form.higherZone'(){},
  },
  mounted() {
    // this.getZone()
    this.getWorks()
    this.getHarm()
    this.getInfo()
    this.getTheme()
    this.getProcetType()
  },
  methods: {
    errMsg(msg) {
      return this.$message({message: msg,type: 'error',center: true,duration: 10000})
    },
    sucMsg(msg) {
      return this.$message({message: msg,type: 'success',center: true,duration: 10000})
    },
    goBack(){
      this.$router.push({path:'/wrap/zone/list', query: {page:this.page,menuId:1,name:'分区管理'} })
    },
    getWorks() {   //获取工种
      let data ={
        job: '',
        comId: getUserInfo().comPId
      }
      getWorklist(qs.stringify(data)).then((res)=>{
        let  temp = []
        if(res){
          res.map((item,index) => {
              temp.push({name:item.jobsName, id:item.jid })
          })
          this.workTypeList = temp
        }
      })
    },
    getTheme(){  
      getThemelist(qs.stringify({comId: getUserInfo().comPId})).then((res) => {
        if(res){
          this.trainingThemeList = res.list
        }
      })
    },
    getProcetType() {   //huju
      getProtectlist(qs.stringify({departId: getUserInfo().comPId})).then((res) => {
        let temp = []
        if(res){
          res.map((item, index) => {
          temp.push({ptName:item.ptName,ptId: item.ptId})
        })
        this.protectClothingList = temp
        }
      })
    },
    getHarm() {   //selectsysparm.do
      getHarmlist(qs.stringify({name: ''})).then((res) =>{
        if(res){
          let temp = res
            let temp2 = []
            for (var i in temp) {
               temp2.push({id:i,name:temp[i]}) //值
              }
            this.hazardFactorsList = temp2
        }
      }) 
    },
    getInfo(){
      let data= this.queryItem
       this.axios.post('/selectByPartition.do', qs.stringify(data)).then((res) => {
            if (res.status ===200) {
              let data = res.data.bylist
              this.form.name  = data.name
              let path = data.qrcodePath
              var index= path.lastIndexOf('k')
              path = path.substring(index+1,path.length)
              this.form.qrcodePath = `${myurl}${path}`
              this.form.higherZone  = data.sj
              this.form.zoneRemarks  = data.node
              let temp = []
              let temp1 = []
              let temp3= []
              let temp4 = []   //护具类型
              let temp5 = []   //培训主题
              data.jobs.map((item,index) => {
                temp.push(item.id)
              })
              data.harm.map((item,index) =>{
                temp1.push(item.hid)
                temp3.push({name:item.hname, id:item.hid})
              }) 
              data.pro.map((item, index) => {
                  temp4.push(item.id)
              })
              data.themes.map((item, index) => {
                  temp5.push(item.id)
                })
              this.form.protectClothing =  temp4   //护具类型
              this.form.testTheme = temp5  //培训考试
              this.form.hazardFactors = temp1
              this.form.testCycle = data.cycle
              this.form.workType = temp
            }else{
            }
        })
    },
    removeWork(val){ //   验证工种能不能删除   job,   partitionId
      let data = {
        job: val,
        partitionId: this.queryItem.id,
        comId: getUserInfo().comPId
      }
      this.axios.post('/canOrNotDelJob.do', qs.stringify(data)).then((res) => {
        if (res.data === '可以删除') {
          this.axios.post('/delPartitionBlowJob.do', qs.stringify(data))
          .then((res) => {
              if (res.status ===200) {
              }else{
                this.errMsg('error')
              }
          })
      }else{              //不能删除
        this.workTypeList.push({name:val})
        this.form.workType.push(val)
        this.errMsg(res.data)
        }
      })
    },
    reset() {
      this.form.higherZone = ''
      this.form.workType = []
      this.form.hazardFactors = []
      this.form.protectClothing = []
      this.form.testTheme = []
      this.form.testCycle = ''
      this.form.zoneRemarks = ''
      this.form.name = ''
    }, 
    save(form) {   //修改分区
      let tempList =[]
      let tempSysharm = []
      let lists = JSON.stringify(this.form.workType)
      let sysharm = JSON.stringify(this.form.hazardFactors)
      let theme = JSON.stringify(this.form.testTheme)
      let prodect = JSON.stringify(this.form.protectClothing)
      let data = {
        name: this.form.name,
        id: this.queryItem.id,
        lists: lists,
        sysharm: sysharm,
        node: this.form.zoneRemarks,
        theme: theme,  //主题  id集合
        prodect: prodect,     //护具 id集合  
        period: this.form.testCycle
        } 
      this.$refs[form].validate((valid) => {
      if (valid) {
        editZone(qs.stringify(data)).then((res) =>{
         if (res == 1) {
            this.sucMsg('修改成功')
            this.reset()
            this.$router.push({path:'/wrap/zone/list', query: {page:this.page} })
          }else if(res == 2){
            this.errMsg('分区名字重复，请重新输入')
          }else{
            this.errMsg('error')
          }
        })
      } else {
        return false
      }
    })
    },
    getZone() {
      this.axios.post('/partition/query.do').then((res) => {
        if (res.status ===200) {
          this.zoneData.push(res.data)
        }else{
          this.errMsg('请求失败')
        }
        })
    },
    selectZone() {
      this.isSelectZone = true
      this.$refs.tree.setCheckedKeys([this.zoneKey])
    },
    hideTree(e) {
      if (e.target.id === '') {
        this.isSelectZone = false
      }
    },
    getCheckedNodes(val,item) {
      this.zoneKey = val.id
      this.form.higherZone =  val.label
      let temp = this.$refs.tree.getNode(val.id).parent.data.label   //父级名称
      this.partitionLevel = this.$refs.tree.getNode(val.id).data.level
       this.isSelectZone = false
    },
    selectworkType(val) {
      this.isShowWorkType = true
      this.workTypeName = val
    },
    selecthazard(val) {
      this.isShowListHazard = true
      this.hazardTabel = val
    },
    selectProtect(val){
      this.isProtectList = true
      this.protectTable = val
    },
    rowStyle() {
      return 'text-align: center'
    },
    delate(index, row) {
      this.workTypeName.splice(index,2,'')
      return this.workTypeName
    }
  }
};
</script>

<style lang="css" scoped>
.code-img{
  width: 50px;
  height: 50px;
}
.code-img img{
  width: 100%;
  height: 100%;
}
.code-bid-img{
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
.addZone-container{
  margin: 0 auto ;
}
.addZone-content{
}
.addZone-title{
  line-height: 50px;
  color: #fff;
  margin: 20px auto;
  font-size: 16px;
  border-bottom: 1px solid #f35a1f;
}
.my-zoneTree{
  border: 1px solid #eee;
 width: 550px;
  margin-left: 50px;
  position: absolute;
  max-height: 400px;
  overflow:scroll;
  z-index: 300;
  background: #FFF;
}
.selectTabel{width: 500px;}
 .workName,.del-btn{ float: left; }
 .my-select{
  width: 200px!important;
  display: inline-block!important;
 }
 .return{
  background: white;
color: #1f7edd;
float: right;
margin-right: 30px;
 }
</style>
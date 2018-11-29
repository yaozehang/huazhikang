<template>
<div class=" addZone-container" @click="hideTree($event)"> 
  <div class="addZone-content">
    <div class="type-list-title border-bottom">
       <el-button class="title-btn" type="text">新增分区</el-button>
    </div>
    <div class="add-form my-form" >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" >
      <el-form-item label="分区名称" prop="name"  required>
        <el-input v-model="form.name"  style="width:100%"  ></el-input>
      </el-form-item>
      <el-form-item label="上级分区" prop="higherZone" required>
        <el-input v-model="form.higherZone" @focus="selectZone"  id="part" style="width:100%" ></el-input>
      </el-form-item>
            <!-- 分区树  -->
      <div class="my-zoneTree" v-show="isSelectZone">
        <div class="zone-tree">
           <el-tree :data="zoneData" default-expand-all  show-checkbox node-key="id"   ref="tree" highlight-current
             :props="defaultProps" check-strictly @check="getCheckedNodes">
          </el-tree>
        </div>
      </div>
      <el-form-item label="工种/职务" prop="workType">
        <el-select v-model="form.workType" multiple   filterable placeholder="请输入关键词" 
           style="width:100%">
          <el-option v-for="(item,index) in workTypeList" :key="index"  :label="item.jobsName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 选择列表 -->
      <el-form-item label="危害因素" prop="hazardFactors">
     <el-select v-model="form.hazardFactors" multiple  filterable placeholder="请输入关键词" 
        style="width:100%">
        <el-option v-for="(item,index) in hazardFactorsList" :key="index"  :label="item.name"  :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="护具类型" prop="protectClothing">
        <el-select v-model="form.protectClothing"  multiple placeholder="请选择" style="width:100%">
          <el-option v-for="(item,index) in protectClothingList" :key="index"  :label="item.ptName"  :value="item.ptId">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="培训主题" prop="testTheme">
        <el-select v-model="form.testTheme" multiple placeholder="请选择" style="width:100%">
          <el-option v-for="(item,index) in trainingThemeList" :key="index"  :label="item.theme"  :value="item.id">
        </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="培训周期" prop="testCycle">
        <el-input v-model="form.testCycle" placeholder="天" style="width:200px; margin-right:20px;" type="number"></el-input>  <span>天</span>
      </el-form-item>
      <el-form-item label="分区备注" prop="zoneRemarks">
        <el-input type="textarea" v-model="form.zoneRemarks" style="width:100%"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <span class="save-blue big-blue" @click="save('form')"  v-loading="addLoading">保存</span> -->
        <el-button type="primary" @click="save('form')"  v-loading="addLoading">保存</el-button>
        <el-button @click="reset()">清空</el-button> 
      </el-form-item>
  </el-form>
    </div>
  </div>
</div>
</template>
<script>
import utils from '@/utils'
import qs from 'qs'
import getUserInfo from 'common/js/user'
 // prPartitionId: getUserInfo().partitionId
 import {getAllProcetType} from 'api/protect'
import {getZoneList, getWorklist,getHarmlist,getThemelist,getProtectlist,addZone} from 'api/zone.js'
const rules = {
    name: [{ required: true, message: '请输入分区名称', trigger: 'blur' }],
    higherZone: [{ required: true, message: '请选择上级分区', trigger: 'blur' }],
  }
export default {
  name: 'AddZone',
  data () {
    return {
      roleId: getUserInfo().roleId,
      rules: rules,
      zoneData: [],
      form: {
        name: '',
        higherZone: '',
        workType: '',
        protectClothing: [],
        hazardFactors: [],
        zoneRemarks: '',
        testTheme: [],
        testCycle: '',
      },
      isSelectZone: false,
      isShowList: false,
      isShowWorkType: false,
      isShowListHazard: false,
      isProtectList: false,
      loading1: false,
      loading2: false,
      disabled: false,
      addLoading: false,
      workTypeName: [],
      hazardTabel: [],
      protectTable: [],
      workTypeList: [],
      zoneKey: {},
      trainingThemeList: [],
      hazardFactorsList: [],
      protectClothingList: [],
      testTheme: [],
      localName: this.$route.name,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.getZone()
    this.getHarm()
    this.getWorks()
    this.getProcetType()
    this.getTheme()
    console.log(this.$route)
  },
  methods: {
    errMsg(msg) {
      return this.$message({ message: msg,type: 'error',center: true,duration: 10000})
    },
    sucMsg(msg) {
      return this.$message({message: msg,type: 'success',center: true,duration: 10000})
    },
    getZone() {
      getZoneList(qs.stringify({pId: getUserInfo().comPId})).then((res)=> {
        if(res.data){
          this.zoneData = [res.data]
        }else {
          this.errMsg(res.data)
        }
      })
    },
    getWorks() {   //获取工种
      let data ={
        job: '',
        comId: getUserInfo().comPId
      }
      getWorklist(qs.stringify(data)).then((res) => {
        console.log(res)
        if(res){
          res.map((item,index) => {
            this.workTypeList.push({jobsName:item.jobsName, id:item.jid.toString() })
            return this.workTypeList
          })
        }
      })
    },
    getProcetType(){   //protype/queryprotypelist.do
      getProtectlist(qs.stringify({departId: getUserInfo().comPId})).then((res) => {
        if(res.length !==0){
            this.protectClothingList = res
          }else{
            this.protectClothingList =[]
          }
      })
    },
    getHarm() {
      getHarmlist(qs.stringify({name: ''})).then((res) =>{
        let temp = res
          for (var i in temp) {
            this.hazardFactorsList.push({id:i,name:temp[i]}) //值
          }
      }) 
    },
    getTheme(){
      let data = {
        comId: getUserInfo().comPId
      }
      getThemelist(qs.stringify(data)).then((res) => {
        if(res){
          this.trainingThemeList = res.list
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
      this.zoneKey = ''
      this.form.name = ''
      this.partitionLevel = ''
    },
    save(form) {  //新增分区
      let lists = JSON.stringify(this.form.workType)
      let sysharm = JSON.stringify(this.form.hazardFactors)
      let theme = JSON.stringify(this.form.testTheme)
      let prodect = JSON.stringify(this.form.protectClothing)
      let data = {
        name: this.form.name,
        id: this.zoneKey,
        partitionLevel: this.partitionLevel,   //上级分区的level
        lists: lists,   //工种
        sysharm: sysharm,    //危害因素
        node: this.form.zoneRemarks,   //备注
        theme: theme,  //主题  id集合
        prodect: prodect ,     //护具 id集合  
        period: this.form.testCycle,
        comId: getUserInfo().comPId,
        status: 0,
        } 
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.addLoading = true
            addZone(qs.stringify(data)).then((res) =>{
              this.addLoading = false
                if (res === 1) {
                  this.sucMsg('新增分区成功')
                  this.reset()
                  this.getZone()
                  // this.$router.push({path:'/wrap/zone/list'})
                }else if(res === 2){
                  this.errMsg('分区名字重复，请重新输入')
                } else if(res === 'error'){
                 this.errMsg(res)
                }else {
                  this.errMsg('error')
                }
            })
          } else {
            this.errMsg('数据输入有误请重新输入')
            return false
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
.addZone-container{
  margin: 0 auto ;
}
.addZone-content{
}
.addZone-content .add-form{
  padding: 50px;
background: #f5fcff;
}
.addZone-title{
  line-height: 50px;
  color: #fff;
  margin: 20px auto;
  font-size: 16px;
  border-bottom: 1px solid #f35a1f;
}
.my-zoneTree{
  border: 1px solid #ccc;
  width: 520px;
  margin-left: 80px;
  position: absolute;
  top:230px;
  height: 460px;
  z-index: 300;
  background: #FFF;
}
.zone-tree{
max-height: 450px;
overflow-y: auto;
}
.selectTabel{width: 500px;}
 .workName,.del-btn{ float: left; }
 .my-select{
  width: 200px!important;
  display: inline-block!important;
 }
</style>
<style>
/*多选换行显示*/
  .el-tag{
  white-space: initial; 
  }
</style>
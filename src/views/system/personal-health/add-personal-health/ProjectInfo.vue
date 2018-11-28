<template>
<div>
  <div class="item-info">
    <div class="item-title clearfix">项目信息 <i class="el-icon-printer" style="float:right;margin: 10px 50px 0 0 ;"></i></div>
    <ul class="test-list clearfix">
      <li v-for="(item,index) in testTitle" :key="index" ref="titles">
          <a :href="'#'+item.id"> {{item.name}}</a>
        </li>
      <li class="addBtn" @click="addPro = true">  <i class="el-icon-circle-plus-outline"></i></li>
    </ul>
  </div>
  <!-- 新增项目弹出框 -->
  <el-dialog  class="dialog-form"  width="30%" title="新增项目" :visible.sync="addPro">
        <el-form ref="form1" :model="form2" label-width="80px" >
      <el-form-item label="明细项目">
        <el-select v-model="testItem"  filterable remote reserve-keyword placeholder="请输入明细项目" 
          :remote-method="remoteMethod1"  :loading="loading" style="width:100%" @change="changeTestItem">
          <el-option v-for="(item,index) in DetailedList" :key="item.diId"  :label="item.diName"  :value="item.diId">
          </el-option>
        </el-select>
        </el-form-item>
        </el-form  >
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addProjrect">确 定</el-button>
        </div>
  </el-dialog>
  <!-- 新增项目弹出框 -->
  <ul class="test-result">
    <li id="resultTitle">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-width="120px">
        <div class="form-items">
        <el-form-item label="体检号码"  style="margin-right:30px;">
           <el-input v-model="form.testNum" placeholder=""  ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
           <el-input v-model="form.username" placeholder=""   :disabled="true"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="性别"  style="margin-right:30px;">
           <el-input v-model="form.sex" placeholder=""   :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
           <el-input v-model="form.age" placeholder=""   :disabled="true"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="证件号码"  style="margin-right:30px;">
           <el-input v-model="form.idCard" placeholder=""   :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话">
           <el-input v-model="form.phoneNum" placeholder=""   :disabled="true"></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="体检类型"  style="margin-right:30px;">
           <el-input v-model="form.testType" placeholder=""   :disabled="true" ></el-input>
          </el-form-item>
        <el-form-item label="体检日期">
           <el-input v-model="form.resultTime"  value-format="yyyy-MM-dd" placeholder=""   :disabled="true" ></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="工作岗位" >
           <el-input v-model="form.workPost" placeholder="" style="width:300%"   :disabled="true" ></el-input>
        </el-form-item>
      </div>
     <div class="form-items">
        <el-form-item label="体检结论建议"  >
           <el-input  type="textarea" autosize v-model="form.resultStatu1" placeholder="" style="width:300%"  ></el-input>
        </el-form-item>
      </div>
       <div class="form-items">
        <el-form-item label="职业结论"  >
           <el-input  type="textarea" autosize v-model="form.resultStatu2" placeholder="" style="width:300%"   ></el-input>
        </el-form-item>
      </div>
       <div class="form-items">
        <el-form-item label="异常结论"  >
           <el-input  type="textarea" :row="2" autosize v-model="info.resultStatu3" placeholder="" style="width:300%"  
           ></el-input>
        </el-form-item>
      </div>
      </el-form>
    </li>
    <!--  id :609 name: "肝功能1" details:[{小项 did 467 dname"谷丙转氨酶"}]  -->
    <li id="item.id" class="ENT" v-for="(item,index) in testList" ref="items">
      <div class="list-title">{{item.name}}</div>
      <ul >
        <li :key="idx" class="clearfix"  v-for="(i,idx) in item.details">
          <el-row class="demo-autocomplete">
          <el-col :span="12">
           <span> {{ i.dname}} </span>
          </el-col>
          <el-col :span="8" style=" margin-right:60px;">
            <el-input  autosize v-model="i.value" ></el-input>
          </el-col>
          <el-col :span="4" >
             <el-select v-model="i.standard" placeholder="请选择">
            <el-option value="↑"> ↑</el-option>
             <el-option value="↓">↓</el-option>
            </el-select>
          </el-col>
          </el-row>
        </li>
      </ul>
        <el-row class="demo-autocomplete">
          <el-col :span="4">
           <span> 项目小结</span>
          </el-col>
          <el-col :span="8" style=" margin-right:60px;">
            <el-input  type="textarea" autosize :row="3" v-model="item.result" ></el-input>
          </el-col>
        </el-row>
    </li>
  </ul>
</div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'ProjectInfo',
  components: {
  },
  props:{
    testTitle: Array,
    testList: Array,
    form: Object,
  },
  mounted() {
   this.log()
  },
  data () {
    return {
      info: {
        testNum: '',
        name: '',
        sex: '',
        age: '',
        idCard: '',
        phoneNum: '',
        testType: '',
        testDate: '',
        company: '',
        conclusion: '本次检查未见明显异常',
        occupateConclusion: '未检查出职业病',
        abnormalConclusion: '未见异常'
      },
      form2: {},
      useAble: '',
      addPro: false,
      testItem: '',
      DetailedList: [],
      loading: false,
      sysdetalitems: [],
  }
},
  mounted() {
    this.log()
    this.getHeight()
  },
  methods: {
    log(){
        console.log(this.testTitle, this.testList)
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
    addProjrect() {
      this.addPro = !this.addPro
      // this.$emit('increment1',"这是可以加参数的");
      this.$emit('addProjrect',this.listData)
    },
    save() {
      this.$emit('save',this.ENTInfo)
    },
    cancleAdd() {
      this.addPro = !this.addPro
    },
    //获取标签的位置
    getHeight(){
      var titles = this.$refs.titles
      var item = this.$refs.items
      console.log(titles, item)
    },
    //滚动条的高度的位置
  }
}
</script>

<style lang="css" scoped>
.content{
  width: 100%;
  height: 100%;
  position: relative;
}
.test-result{
  max-height: 700px;
  overflow-y: scroll;
overflow-x:hidden;
}
.test-list{
/*position: fixed;
top: 120px;*/
}
.form-items{
  margin: 5px 0;
}
.item-titleT{
  background: #FFF;
}
.item-title{
  background: #e2eff3;
  height: 40px;
  width: 100%;
  line-height: 40px;
  font-size: 18px;  
  padding-left: 20px;         
}
.test-list li{
float: left;
height: 30px;
line-height: 30px;
padding: 5px;
color: #52a1f3;
border:1px solid #52a1f3;
margin: 5px;
border-radius: 10px;
}
.addBtn{
  border: none!important;
  cursor: pointer;
}
.item-title{
  display: inline-block;
  height: 40px;
  line-height: 40px;
}
.ENT ul li{
  margin: 10px 0;
  text-align: center;
}
.list-title{
background: #e2eff3;
height: 40px;
width: 100%;
line-height: 40px;
font-size: 18px;  
padding-left: 10px;
color:black;
}
.item-info{border: 1px solid #d9d9d9;border-top:none;}
</style>
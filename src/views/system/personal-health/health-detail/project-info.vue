<template>
<div>
  <div class="item-info">
    <div class="item-title clearfix">项目信息 <i class="el-icon-printer" style="float:right;margin: 10px 50px 0 0 ;"></i></div>
    <ul class="test-list clearfix">
      <li v-for="(item,index) in testTitle" :key="index">
          <a :href="'#'+item.id"> {{item.iname}}</a>
        </li>
      <!-- <li class="addBtn" >  <i class="el-icon-circle-plus-outline"></i></li> -->
    </ul>
  </div>
  <ul class="test-result">
    <li id="resultTitle">
      <el-form :inline="true" :model="form" ref="form"  class="demo-form-inline" label-width="120px">
        <div class="form-items">
        <el-form-item label="体检号码"  style="margin-right:30px;">
           <el-input v-model="form.testNum" placeholder=""   ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
           <el-input v-model="form.username" placeholder="" disabled  ></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="性别"  style="margin-right:30px;">
           <el-input v-model="form.sex" placeholder=""  disabled></el-input>
        </el-form-item>
        <el-form-item label="年龄">
           <el-input v-model="form.age" placeholder="" disabled ></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="证件号码"  style="margin-right:30px;">
           <el-input v-model="form.idCard" placeholder=""  disabled></el-input>
        </el-form-item>
        <el-form-item label="电话">
           <el-input v-model="form.phoneNum" placeholder="" disabled ></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="体检类型"  style="margin-right:30px;">
           <el-input v-model="form.testType" placeholder=""   ></el-input>
          </el-form-item>
        <el-form-item label="体检日期">
           <el-input v-model="form.resultTime"  value-format="yyyy-MM-dd" placeholder=""   ></el-input>
        </el-form-item>
      </div>
      <div class="form-items">
        <el-form-item label="工作岗位" >
           <el-input v-model="form.workPost" placeholder="" style="width:300%"   ></el-input>
        </el-form-item>
      </div>
     <div class="form-items">
        <el-form-item label="体检结论建议"  >
           <el-input  type="textarea" autosize v-model="form.conclusion1" placeholder="" style="width:300%"  ></el-input>
        </el-form-item>
      </div>
       <div class="form-items">
        <el-form-item label="职业结论"  >
           <el-input  type="textarea" autosize v-model="form.conclusion2" placeholder="" style="width:300%"  ></el-input>
        </el-form-item>
      </div>
       <div class="form-items">
        <el-form-item label="异常结论"  >
           <el-input  type="textarea" :row="2" autosize v-model="form.conclusion3" placeholder="" style="width:300%"  
            ></el-input>
        </el-form-item>
      </div>
      </el-form>
    </li>
    <!--  id :609 name: "肝功能1" details:[{小项 did 467 dname"谷丙转氨酶"}]  -->
    <li id="1" class="ENT" v-for="(item,index) in testList ">
      <div class="list-title">{{item.iname}}</div>
      <ul >
        <li :key="idx" class="clearfix"  v-for="(i,idx) in item.list">
          <el-row class="demo-autocomplete">
          <el-col :span="12">
           <span> {{ i.dname}} </span>
          </el-col  :span="2" > </el-col>
          <el-col :span="8" style=" ">
            <el-input  autosize v-model="i.value" ></el-input>
          </el-col>
          <el-col :span="2" >
             <el-select v-model="i.cdmtip" placeholder="请选择">
            <el-option value="↑"> ↑</el-option>
             <el-option value="↓">↓</el-option>
            </el-select>
          </el-col>
          </el-row>
        </li>
      </ul>
      <div>
        <div class="demo-autocomplete">
           <span class="result"> 项目小结</span>
            <el-input  type="textarea" autosize :row="3" v-model="item.iunit" style="width:60%;" ></el-input>
        </div>
      </div>

    </li>
  </ul>
</div>
</template>

<script>

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
      useAble: '',
      addPro: false
  }
},
  mounted() {
     // console.log(this.testTitle, this.testList)
  },
  methods: {
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
    }
  }
};
</script>

<style lang="css" scoped>
.content{
  width: 100%;
  height: 100%;
  position: relative;
}
.test-result{
  max-height: 700px;
  background: #f5fcff;
  overflow-y: scroll;
overflow-x:hidden;
}
.test-list{
  background: #f5fcff;
}
.form-items{
  margin: 5px 0;
}
.item-titleT{
  background: #FFF;
}
.item-title{
  background: #0089e2;
  color: #fff;
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
.result{
  display: inline-block;
  margin-left: 25%;
  width: 100;
  height: 40px;
  line-height: 40px;
}
</style>
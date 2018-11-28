<template>
  <div class="archivesEdit-main">
   <div class="select-type clearfix">
      <span class="fileType">
        <span style=" margin-right:20px;">文件类型：</span>
        <span class="span">
        <el-input v-model="fileName" placeholder=""   @focus="isSelectcompany = true"  id="part1" readonly  style="width:220px;"></el-input>
        </span>
       </span>
      <el-button class="return" @click="goBack" >返回</el-button>
    <div class="edit-form">
      <!-- 建设项目职业卫生“三同时”档案  纯表单 加一个审查结论文本框-->
      <three-times v-if="isShow === '1' "></three-times >
      <!-- 2-1职业病防治年度计划及实施方案  -->
      <file21 v-if="isShow ==='2#1'"></file21>
      <!-- 2-4职业病防护设施一览表 表单两行  3一行表格-->
      <file22 v-if="isShow ==='2#2'"></file22>
      <!--2- 6._年度个人防护用品发放使用记录  -->
      <file23 v-if="isShow==='2#3'"></file23>
      <!-- 2-7.工作场所警示标识一览表 纯表单 有文本域-->
      <file27 v-if="isShow ==='2#7'"></file27>
      <!-- 2-2.职业病危害项目申报基本情况表   特殊表格单独接口-->
      <file25 v-if="isShow==='2#5'"></file25>
      <!-- 2-3._年度职业病防治经费一览表 特殊格式  -->
      <file24 v-if="isShow==='2#4'"></file24>
      <!-- 2-9 职业卫生监管意见和落实情况记录表 纯表单-->
      <file29 v-if="isShow==='2#9'"></file29>
      <!-- 2-4 职业病防护设施检修、维护记录表 纯表单 设计图是2-5 -->
      <file26 v-if="isShow==='2#6'"></file26>
      <!-- 2-8.用人单位职业卫生检查和处理记录表 纯表单-->
      <file28 v-if="isShow==='2#8'"></file28>
      <!-- _年度职业卫生宣传培训一览表  3#1   一行表格加表单-->
      <file31 v-if="isShow==='3#1'"></file31>
      <!-- 4-1可能产生职业病危害设备、材料和化学品一览  特殊表格单独接口-->
      <file41 v-if="isShow==='4#1'"></file41>
      <!-- 4-2接触职业病危害因素汇总表 -->
      <file42 v-if="isShow==='4#2'"></file42>
      <!-- 4-3.职业病危害因素日常监测季报汇总表 -->
      <file43 v-if="isShow==='4#3'"></file43>
      <!-- 5-1职业健康检查结果汇总表 -->
      <file51 v-if="isShow==='5#1'"></file51>
      <!-- 5-2.职业健康检查异常结果登记表 -->
      <file52  v-if="isShow==='5#2'"></file52>
      <!-- 5-3  职业病患者一览表 -->
      <file53  v-if="isShow==='5#3'"></file53>
      <!-- 5-4疑似职业病患者一览表 -->
      <file54 v-if="isShow==='5#4'"></file54>
      <!-- 5-5.职业病危害事故报告与处理记录表 -->
      <file55 v-if="isShow==='5#5'"></file55>
      <!-- 5-6.职业健康监护档案汇总表 表单 -->
      <file56  v-if="isShow==='5#6'"></file56>
      <!-- 6-1劳动者个人信息卡 -->
      <!-- <file61 v-if="isShow==='6#1'"></file61> -->
      <!-- 6-2．工作场所职业病危害因素检测结果  -->
      <file62 v-if="isShow==='6#2'"></file62>
      <!-- 6-3历次职业健康检查结果及处理情况 -->
      <file63 v-if="isShow==='6#3'"></file63>
    </div>
  </div>
  </div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import ThreeTimes from './one/three-times.vue'
import file21  from './two/file2-1.vue'
import file22 from './two/file2-2.vue'
import file23 from './two/file2-3.vue'
import file25 from './two/file2-5.vue'
import file26 from './two/file2-6.vue'
import file27 from './two/file2-7.vue'
import file24 from './two/file2-4.vue'
import file28 from './two/file2-8.vue'
import file29 from './two/file2-9.vue'
import file41 from './four/file4-1.vue'
import file42 from './four/file4-2.vue'
import file51 from './fieve/file5-1.vue'
import file61 from './six/file6-1.vue'
import file31 from './three/file3-1.vue'
import file43 from './four/file4-3.vue'
import file52 from './fieve/file5-2.vue'
import file53 from './fieve/file5-3.vue'
import file54 from './fieve/file5-4.vue'
import file55 from  './fieve/file5-5.vue'
import file56 from  './fieve/file5-6.vue'
import File62 from './six/file6-2.vue'
import File63 from './six/file6-3.vue' 
export default {
  name: 'ArchivesEdit',
  components: {
    file21,
    file22,
    file23,
    file27,
    file25,
    file24,
    file29,
    file26,
    file28,
    ThreeTimes,
    file41,
    file42,
    file51,
    file61,
    file31,
    file43,
    file52,
    file54,
    file53,
    file55,
    file56,
    File62,
    File63
   },
 data () {
    return {
      options: [],
      isShow: '0',
      fileName: '三同时',
      id: '1',
      // id: this.$route.query.id,
      // fileName: this.$route.query.fileName
    }
  },
  mounted() {
    this.isShow = `${this.id}`
  },
  methods: {
    goBack(){
      this.$router.push({path:'/wrap/archives/nation/check'})
    },
  },
}
</script>

<style lang="css" scoped>
.archivesEdit-main{
  padding-top: 30px;
}
.default-word{
  height: 40px;
  line-height: 40px;
  margin-top: 30px;
}
.search-btn{
  display: inline-block;
  margin-left: 200px;
}
.editForm{
  width: 100%;
  height: 100%;
  font-size: 20px;
  margin-top: 20px;
}
.return{
  display: inline-block;
  float: right;
  margin-right: 20px;
}
</style>
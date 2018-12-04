<template>
  <div class="main-content">
    <el-form ref="form" :model="form" label-width="80px" class="form" label-position="left">
      <el-form-item label="企业名称">
        <el-select v-model="form.name" placeholder="培训主题选择">
          <el-option label="开拓明天" value="shanghai"></el-option>
          <el-option label="中央党校" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参与人员" >
        <el-button type="text">人员设置</el-button>
      </el-form-item>
      <el-form-item label="活动时间">
         <el-date-picker
          v-model="form.time"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00', '08:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          time:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang="scss">
.main-content{
  margin-top:20px;
  border-top:1px solid #ccc;
  .form {
    width: 1000px;
    margin:0 auto;
    margin-top:40px;
  }
}

</style>
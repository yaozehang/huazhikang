<template>
  <div class="main-content">
    <el-form ref="form" :model="form" label-width="80px" class="form" label-position="left">
      <el-form-item label="企业名称">
        <el-select v-model="form.name" placeholder="请选择活动区域">
          <el-option label="开拓明天" value="shanghai"></el-option>
          <el-option label="中央党校" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="培训主题" >
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="安全规范培训" name="type"></el-checkbox>
          <el-checkbox label="职业健康培训" name="type"></el-checkbox>
          <el-checkbox label="职业健康培训" name="type"></el-checkbox>
          <el-checkbox label="安全规范培训" name="type"></el-checkbox>
          <el-checkbox label="安全规范培训" name="type"></el-checkbox>
          <el-checkbox label="职业健康培训" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.desc" style="width:800px;" :rows="5"></el-input>
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
          region: '',
          type: [],
          resource: '',
          desc: ''
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
<template>
  <div class="main-content">
    <el-form ref="form" :model="form" label-width="80px" class="form" label-position="left">
      <el-form-item label="题目">
        <Editor v-model="form.content"></Editor>
      </el-form-item>
      <el-form-item label="选项">
        <el-button type="text"  @click="add">增加选项</el-button>
        <el-checkbox-group v-model="form.type" v-for="(item,index) in form.type" :key="index">
          <el-checkbox name="type" >
            <el-input type="text" placeholder="请输入选项" style="width:350px;"></el-input>
            <el-upload class="upload-demo" action multiple style="display:inline-block">
              <el-button type="text">上传图片</el-button>
            </el-upload>
            <el-button type="text" @click="dele(item,index)">删除</el-button>
          </el-checkbox>
        </el-checkbox-group>
        <p>请勾选正确答案</p>
        <p>正确答案是：AB</p>
      </el-form-item>
      <el-form-item label="答案解析">
        <el-input type="textarea" :rows="5" placeholder="请输入解析" v-model="form.textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from "@/components/Editor";

export default {
  components: {
    Editor
  },
  data() {
    return {
      form: {
        content: {},
        textarea:'',
        type:[0,1,2,3]
      },
    };
  },
  methods: {
    add() {
      this.form.type.forEach(item => {
        if(item < Math.max.apply(null, this.form.type)){
          
        } else {
          this.form.type.push(item += 1)
        }
          return;
      })
      console.log(this.form.type);
    },
    dele(item,index) {
      this.form.type.splice(index,1)
    }
  }
};
</script>

<style scoped lang="scss">
.main-content {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  .form {
    width: 1000px;
    margin: 0 auto;
    margin-top: 40px;
  }
}
</style>
<template>
  <div class="addQuestion">
  <ul class="user-form">
  <li class="clearfix">
    <span class="themeName">
      <span >主题名称</span>
      <el-input v-model="form.themeName" style="width: 150px;"></el-input>
    </span>
     <span class="themeName">
      <span >正确答案</span>
      <el-select v-model="form.rightKey"  placeholder="请选择" style="width: 150px;">
        <el-option v-for="item in options1" :key="item" :label="item" :value="item"> </el-option>
      </el-select>
    </span>
  </li>
  <li class="clearfix">
    <span class="themeName" >
      <span >是否启用</span>
      <el-select v-model="form.isUse"  placeholder="请选择" style="width: 150px;">
        <el-option v-for="item in options" :key="item" :label="item" :value="item"> </el-option>
      </el-select>
    </span>
      <span class="themeName">
      <span >得  &nbsp; &nbsp; &nbsp;&nbsp;分</span>
      <el-input v-model="form.score" style="width: 150px;"></el-input>
    </span>
  </li>  
  <li class="clearfix">
    <span class="themeName" >
      <span class="middle-text">题干名称</span>
        <el-input v-model="form.questionName" style="width: 280px;" type="textarea" row="2"></el-input>
    </span>
    <span class="themeName myUpload" >
      <el-upload 
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card" :limit ='1'
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <span>上传图片</span>
    </el-upload>
    <span class="imgExhibition">
      <el-dialog :visible.sync="dialogVisible" >
        <img width="50%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </span>
    </span>
  </li> 
    <li class="clearfix">
    <span class="themeName" >
      <span class="middle-text">选项A</span>
        <el-input v-model="form.questionName" style="width: 280px;"  ></el-input>
    </span>
    <span class="themeName myUpload2" >
      <el-upload 
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card" :limit ='1'
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <span>上传图片</span>
    </el-upload>
    <span class="imgExhibition">
      <el-dialog :visible.sync="dialogVisible" >
        <img width="50%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </span>
    </span>
  </li> 
</ul>
</div>
</template>

<script>
export default {
  name: 'AddForm',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        themeName: '',
        rightKey: '',
        score: '',
        questionName: '',
        isUse: ''
      },
      options: ['启用', '禁用'],
      options1: ['选项A', '选项B', '选项C', '选项D'],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="css" scoped>
.user-form li{
margin: 20px ;
}
.themeName{
  display: inline-block;
  margin-right: 20px;
}
.middle-text{
  display: inline-block;
  margin-bottom: 15px;
}
.imgExhibition{
  display: inline-block;
}
.myUpload{
position: absolute;
top: 220px;
left: 400px;
}
.myUpload2{
position: absolute;
top: 290px;
left: 400px;
}
</style>
<template>
  <div class="main-content">
    <el-form ref="form" :model="form" label-width="100px" class="form" label-position="left">
      <el-form-item label="培训主题">
        <el-input type="text" v-model="form.name" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="视频上传" prop="Video">
        <!-- action必选参数, 上传的地址 -->
        <el-upload
          class="avatar-uploader el-upload--text"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeUploadVideo"
          :on-progress="uploadVideoProcess"
        >
          <video
            v-if="videoForm.Video !='' && videoFlag == false"
            :src="videoForm.Video"
            class="avatar"
            controls="controls"
          >您的浏览器不支持视频播放</video>
          <el-button
            v-else-if="videoForm.Video =='' && videoFlag == false"
            type="primary"
            size="medium"
          >点击上传</el-button>
          <el-progress
            v-if="videoFlag == true"
            type="circle"
            :percentage="25"
            style="margin-top:30px;"
          ></el-progress>
        </el-upload>
        <P class="text">请保证视频格式正确，且不超过10M</P>
      </el-form-item>
      <el-form-item label="题目数量">
        <el-input-number v-model="num" @change="handleChange" :min="1"  label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="及格分数">
        <el-input-number v-model="grade" @change="handleChange" :min="1"  label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="主题介绍">
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
        name: "",
        desc: "",
      },
      videoForm: {
        Video: ""
      },
      videoFlag: false,
      // videoUploadPercent: 0,
      uploadUrl: "",
      num:0,
      grade:60,
    };
  },
  methods: {
    //上传视频的函数
    beforeUploadVideo(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt10M) {
        this.$message.error("上传视频大小不能超过10MB哦!");
        return false;
      }
    },

    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = file.percentage.toFixed(0);
    },
    handleVideoSuccess(res, file) {
      //获取上传图片地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      if (res.status == 200) {
        this.videoForm.videoUploadId = res.data.uploadId;
        this.videoForm.Video = res.data.uploadUrl;
      } else {
        this.$message.error("视频上传失败，请重新上传！");
      }
    },
    //计数器函数
    handleChange(){

    },
    onSubmit() {
      console.log("submit!");
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
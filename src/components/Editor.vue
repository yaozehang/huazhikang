<template>
  <div style="height:400px">
    <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                 @change="onEditorChange($event)"
                 style="height:300px;"
                >
    </quill-editor>
  </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

Quill.register("modules/ImageExtend", ImageExtend);

export default {
  props: {
    value: Object
  },
  components: {
    quillEditor
  },
  data() {
    return {
      token: "",
      content: this.value.content,
      editorOption: {
        modules: {
          ImageExtend: {
            // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: "file", // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: `http://`, // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: res => {
              return res.info;
            },
            headers: xhr => {
              // xhr.setRequestHeader('myHeader','myValue')
            }, // 可选参数 设置请求头部
            sizeError: () => {}, // 图片超过大小的回调
            start: () => {}, // 可选参数 自定义开始上传触发事件
            end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, // 可选参数 上传失败触发的事件
            success: () => {}, // 可选参数  上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              formData.append("token", this.token);
            } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: {
            // 如果不上传图片到服务器，此处不必配置
            container: container, // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              image: function() {
                // 劫持原来的图片点击按钮事件
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      }
    };
  },
  methods: {
    getToken() {
      this.$axios.get("").then(res => {
        if (res.code == 200) {
          this.token = res.data;
        }
      });
    },
    onEditorChange(res) {
      this.content = res.html;
      this.$emit("input", {
        content: this.content,
      });
    }
  },
  created() {
    // this.getToken();
  },
  watch: {
    value(val) {
      this.content = val.content;
    }
  }
};
</script>

<style scoped>
</style>
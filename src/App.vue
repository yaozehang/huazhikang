<template>
  <div id="app" class="container"  v-cloak>
     <div class="main">
        <!-- <router-view ></router-view> -->
        <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/my-header/sub-header.vue'
export default {
  name: 'App',
  components: {
    SubHeader
  },
  data() {
    return{
      isShow:true,
      tabShow: true,
      isRouterAlive: true,
      tab: '分区',
      dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
    }
  },
  mounted() {
  },
  provide(){
    return{
      reload: this.reload
    }
  },
  watch:{
      '$route':'isTab'
    },
methods:{
   reload () {
   this.isRouterAlive = false
   },
  isTab(){
    if(this.$route.path === '/login'||this.$route.path==='/gameHall'||this.$route.path==='/car'||this.$route.path==='/par'){
       this.isShow = false
    }else if(this.$route.path === '/homePage'||this.$route.path==='/homePage:uesrId'){
      this.isShow = true
    }else{
      this.isShow = true
    }
  },
     handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
  }
};
</script>

<style lang="css">
.header{height: 60px; width: 100%;}
.el-table--border{

}
/*.el-input__inner{
  border: 1px solid #ccc;
  border-radius: 5px;
}*/
/*input{
   border:1px solid #ccc;
   border-radius: 5px;
}*/
.my-pagination{
float: right;
margin-right: 10px;
margin-top: 20px;   
}
.el-table__row td,.has-gutter th{
  padding:8px 0!important;
}
.el-table_11_column_66  .el-table-column--selection{
  padding:8px 0!important;
}
.header{
  height: 71px;
}

body {
  background-color: #f1f1f1;
}
</style>

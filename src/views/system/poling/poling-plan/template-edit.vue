<template>
  <div>
  	 <!-- 文本 -->
  	 <div v-show="type===1">
  	    <span class="title-s">任务说明</span>
        <textarea name="" v-model="defaultData" @change="" rows="3" class="iner-input" placeholder="" readonly></textarea>
  	 </div>
  	 <!-- 单选 -->
  	 <div v-show="type===2">
         <el-radio-group v-model="value1" @change="" disabled>
            <el-radio :label="item" v-for="(item,idx) in list" :key="idx">{{item}}</el-radio>
         </el-radio-group>
  	 </div>
  	 <!-- 复选 -->
  	 <div v-show="type===3">
        <el-checkbox-group v-model="value2" @change="" disabled>
		    <el-checkbox :label="item" v-for="(item,idx) in list" :key="idx"></el-checkbox>
        </el-checkbox-group>
  	 </div>
     <!-- 输入框 -->
     <div v-show="type===4">
      <span class="title-s">任务说明</span>
       <input type="text" v-model="str" @change=""  class="iner-input" placeholder="" readonly>
     </div>
     <!-- 文本域 -->
     <div v-show="type==5">
      <span class="title-s">备注</span>
      <textarea name="" v-model="str" @change="" rows="3" class="iner-input" placeholder="" readonly></textarea>
     </div>
  </div>
</template>

<script>
export default {
  props: {
  	type: {
      type:Number,
  	  default: 1
    },
    status:{
      type: Number,
      default: 0
    },
    defaultData: '',
    result: {
      type: String,
      default: ''
    },
    resultList: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      str: '',
      list: [''],
      value1: '',
      value2: []
    }
  },
  mounted() {
    console.log(this.status)
    if(this.status ===0){  //未完成 未审核
      if (this.type === 2 || this.type === 3) {
      this.list = this.defaultData
      if (this.result ) {
        this.value1 = this.result
        this.value2 = this.result
      } else {
        this.value1 = this.list[0]
        this.value2 = []
      }
    } else {
      if (this.result) {
        this.str = this.result
      }else {
        this.str = this.defaultData
      }
    }
    }else if(this.status === 1){   //完成未审核
      if (this.type === 2 || this.type === 3) {
      this.list = this.defaultData
      if (this.resultList.length !==1) {
        this.resultList.map((item,index) =>{
          if(item.isCheck === true){
            this.value1 = item.value
            this.value2 .push(item.value)
          }
        })
      }else {
        if(this.resultList[0]){
          this.value1 = this.resultList[0]
          this.value2 = this.resultList[0]
        }
      }
    }else if(this.type === 5 || this.type === 1) {
      if (this.resultList.length ===1) {
        this.str = this.resultList[0]
      } 
    }else {
      if (this.resultList.length ===1) {
        this.str = this.resultList[0]
      } 
    }
    }else if(this.status === 2){   //完成已审核
      if (this.type === 2 || this.type === 3) {
      this.list = this.defaultData
      if (this.resultList.length !==1) {
        this.resultList.map((item,index) =>{
          if(item.isCheck){
            this.value1 = item.value
            this.value2 .push(item.value)
          }
        })
      }else {
        if(this.resultList[0]){
          this.value1 = this.resultList[0]
          this.value2 = this.resultList[0]
        }
      }
    }else if(this.type === 5 || this.type === 1) {
      if (this.resultList.length ===1) {
        this.str = this.resultList[0]
      }  
    }else {
      if (this.resultList.length ===1) {
        this.str = this.resultList[0]
      } 
    }
    }
  },
  watch: {
  },
  methods: {
    // onChange(data) {
    //   if (this.type === 2 || this.type === 3) {
    //   	this.$emit('handleDefault', data, this.index, this.idx)
    //   } else {
    //   	this.$emit('handleDefault', data.target.value, this.index, this.idx)
    //   }
    // }
  }
};
</script>
<style type="text/css" scoped>
  .iner-input{
    width: 450px;
  }
  .title-s{
  vertical-align: top;
  display: inline-block;
  width: 56px;
   margin-right:20px;
   margin-top: 20px;
}
</style>
<style lang="stylus" scoped rel="stylesheet/stylus">
  input[type=text],textarea
  	display:inline-block
  	line-height:20px
  	width:150px
  	padding:0
  	margin:0
input[type=radio],input[type=checkbox]
  padding:0
  margin:0
  width:30px
.icon
  line-height:20px
  margin-left:10px
  cursor:pointer
.radio-group
  position:relative
  width:135px
  display:inline-block
  .icon
    position:absolute
    right:3px
    top:2px
    font-size:10px
    line-height:20px
</style>
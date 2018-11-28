<template>
  <div>
  	 <!-- 文本 -->
  	 <div v-show="type===1">
<!--   	   <p>{{defaultData}}</p> -->
        <span class="title-s">任务说明</span>
        <textarea type="text" name="" v-model="str" @change="" rows="3" placeholder="请输入文字" class="iner-input" readonly></textarea>
  	 </div>
  	 <!-- 单选 -->
<!--   	 <div v-show="type===2">
         <el-radio-group v-model="value1" @change="onChange">
            <el-radio :label="item" v-for="(item,idx) in list" :key="idx">{{item}}</el-radio>
         </el-radio-group>
  	 </div> -->
  	 <!-- 复选 -->
  	 <div v-show="type===3 || type===2">
        <el-checkbox-group v-model="value2" @change="" disabled>
		    <el-checkbox :label="item" v-for="(item,idx) in list" :key="idx"></el-checkbox>
        </el-checkbox-group>
  	 </div>
     <!-- 输入框 -->
     <div v-show="type===4">
       <input type="text" v-model="str" @change="" placeholder="请输入文字">
     </div>
     <!-- 文本域 -->
     <div v-show="type==5">
       <span class="title-s">备注</span>
      <textarea type="text"name="" v-model="str" @change="" rows="3" placeholder="请输入文字" class="iner-input" readonly></textarea>
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
    index: {
      type: Number,
      default: 0
    },
    idx: {
      type: Number,
      default: 0
    },
    defaultData: '',
    result: Array,
    uid: {
      type: Number,
      default: 0
    }
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
    if (this.type === 2 || this.type === 3) {
      this.list = this.defaultData
      if (this.result.length !==1) {
        this.result.map((item,index) =>{
          if(item.isCheck === true){
            this.value1 = item.value
            this.value2 .push(item.value)
          }
        })
      } else {
        if(this.result[0]){
          this.value1 = this.result[0]
          this.value2 = this.result[0]
        }
      }
    } else {
      if (this.result.length ===1) {
        this.str = this.result[0]
      } 
    }
  },
  watch: {
  },
  methods: {
    onChange(data) {
      if (this.type === 2 || this.type === 3) {
      	this.$emit('handleDefault', data, this.index, this.idx)
      } else {
      	this.$emit('handleDefault', data.target.value, this.index, this.idx)
      }
    }
  }
};
</script>
<style lang="css" scoped>
  .iner-input{
    display: inline-block;
    width: 450px!important;
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
    width: 450px
  	line-height:20px
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
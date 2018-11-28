<template>
  <div>
  	 <!-- 文本   任务说明-->
  	 <div v-show="type===1">
      <span class="title">说明</span>
  	   <input type="text" data-type="word" v-model="defaultData" @change="onChange($event)" placeholder="任务说明"><i class="el-icon-circle-close-outline icon" @click="delItem"></i>
  	 </div>
  	 <!-- 单选 -->
  	 <div v-show="type===2">
        <div class="radio-group" v-for="(item,idx) in list" :key="idx">
  	 	    <input type="radio" name=""><input type="text" placeholder="请编辑选项" style="width:100px" v-model="list[idx]" @change="onChange"><i class="el-icon-remove-outline icon" @click="delRadio(idx)"></i>
        </div>
        <i class="icon el-icon-circle-plus-outline" @click="addRadio"></i>
        <i class="el-icon-circle-close-outline icon" @click="delItem"></i>
  	 </div>
  	 <!-- 复选 多选-->
  	 <div v-show="type===3">
        <div class="radio-group" v-for="(item,idx) in list" :key="idx">
  	 	    <input type="checkbox"><input type="text" v-model="list[idx]" @change="onChange" placeholder="请编辑选项" style="width:100px" ><i class="el-icon-remove-outline icon" @click="delRadio(idx)"></i>
        </div>
        <i class="icon el-icon-circle-plus-outline" @click="addRadio"></i>
        <i class="el-icon-circle-close-outline icon" @click="delItem"></i>
  	 </div>
     <!-- 输入框 -->
  <!--    <div v-show="type===4">
       <input type="text" v-model="defaultData" @change="onChange($event)" placeholder="请输入输入框默认文字"><i class="el-icon-circle-close-outline icon" @click="delItem"></i>
     </div> -->
     <!-- 文本域 备注 -->
     <div v-show="type==5">
      <span class="title-s">备注</span>
      <textarea name="" v-model="defaultData" id="" @change="onChange($event)" rows="3" placeholder="备注"></textarea><i class="el-icon-circle-close-outline icon" @click="delItem"></i>
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
    defaultData: ''
  },
  data() {
    return {
      list: ['']
    }
  },
  mounted() {
    if (this.type === 2 || this.type === 3) {
      this.list = this.defaultData
    }
    // else if (this.type === 5) {
    //   this.defaultData = '备注：'
    // }else if (this.type === 1) {
    //   this.defaultData = '任务说明：'
    // }
  },
  watch: {
    'defaultData'() {
      if (this.type === 2 || this.type === 3) {
        this.list = this.defaultData
      }
    }
  },
  methods: {
    delItem() {
      this.$emit('handleDel', this.index, this.idx)
    },
    onChange(e) {
      if (this.type === 2 || this.type === 3) {
        this.$emit('handleDefault', this.list, this.index, this.idx)
      } else {
        this.$emit('handleDefault', e.target.value, this.index, this.idx)
      }
    },
    addRadio() {
      this.list.push('')
      this.$emit('handleDefault', this.list, this.index, this.idx)
    },
    delRadio(idx) {
      this.list.splice(idx, 1)
      this.list.forEach((item, index) => {
        item.value = index.toString()
      })
      this.$emit('handleDefault', this.list, this.index, this.idx)
    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  input[type=text],textarea
  	display:inline-block
  	line-height:20px
  	width:500px
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
  .title
    display:inline-block
    text-align:left
    margin-right:20px
    font-size:$font-size-medium-x
</style>
<style lang="css" scoped>
.title{
  display: inline-block;
   margin-right:20px;
}
.title-s{
  vertical-align: top;
  display: inline-block;
   margin-right:20px;
   margin-top: 20px;
}
</style>
<template>
  <div class="">
      <ul class="editList">
          <li v-for="(item,index) in yearList" :key="index" track-by="index" >
            <div class="year-item">{{item.year}} </div>
            <div class="year-list clearfix" v-for="(i,x) in item.files" :key="x" track-by="x">
              <el-tooltip class="item" effect="dark" :content="i.filePath" placement="top-start">
                <div class="fileName"> {{i.fileName}}</div>
              </el-tooltip>
                <div class="fileRight"> 
                  <!--   <span class="scan">   
                      <i class="el-icon-edit" @click="linkEdit"></i>
                   </span> -->
                  <span class="scan">   
                      <i class="el-icon-view "  @click="scanFile(x,i)"></i>
                   </span>
                 <span class="del"> 
                   <i class="el-icon-download"  @click="downFile(x,i)"></i>                  
                  </span>
                  <span class="del" @click="deleteRow(x,i)" > <i class="el-icon-delete"></i></span>
                </div>
            </div>
          </li>
        </ul>
  </div>
</template>

<script>
import {getFileList} from 'api/archives.js'
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {myurl} from '@/api/config.js'
export default {
  name: 'search-list',
  props: {
    yearList: Array,
  },
  data () {
    return {
    }
  },
  mounted(){
    console.log(this.yearList)
  },
  methods:{
    scanFile(index,item){   //预览
      let url =`${myurl}/occuHealthRecordsManage/preview.do?id=${item.id}`
      window.open(url)
    },
    downFile(index,item){   //预览
      let url =`${myurl}/occuHealthRecordsManage/download.do?id=${item.id}`
      window.open(url)
    },
    deleteRow(index,item){
      this.$emit('deleteRow',item)
    },
    linkEdit(index,item){
      // selectedOptions3: ['zujian', 'data', 'tag']
      this.$router.push({path: '/wrap/archives/nation/edit2',query:{id:['1','1']}})
    }
  }
}
</script>

<style lang="css" scoped>
/*编辑列表滚动条*/
.editList{ 
width: 100%;  
max-height: 700px;
overflow-y: auto;
}
.editList .year-list {   
  min-height: 30px;
  line-height: 20px;
  margin: 5px 0;
/*  border-bottom: 1px solid #d9d9d9;*/
}
.year-item{
  margin: 10px 0;
}
.editList .year-list .fileName{
  width: 550px;
  float: left;
}
.editList .year-list .fileRight{
  width: 150px;
  float: left;
}
.editList .year-list .fileRight span{
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.editList .year-list .fileRight span i{
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>
<template>
  <div class="file-container">
    <ul class="nav">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-width="20px">
          <el-form-item label="">
            <el-button type="" >上传文件</el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="" @click="creatFiles">新建文件</el-button>
          </el-form-item>
          <el-form-item label="" v-if="multipleSelection.length !==0">
            <el-button type="" >删除文件</el-button>
          </el-form-item>
          <el-form-item label=""  v-if="multipleSelection.length !==0">
            <el-button type="" >重命名</el-button>
          </el-form-item>
          <el-form-item label=""  v-if="multipleSelection.length !==0">
            <el-button type="" >下载文件</el-button>
          </el-form-item>
          <el-form-item label=""  v-if="multipleSelection.length !==0">
            <el-button type="" >预览文件</el-button>
          </el-form-item>
      </el-form>
    </ul>
    <div class="my-table">
      <el-table :data="testData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle"
       max-height="700"   ref="multipleTable"  @selection-change="handleSelectionChange" >
        <el-table-column  width="30" type="selection"> </el-table-column>
        <el-table-column  label="文件名字" >
           <template slot-scope="scope">
            <div class="file-name" @click="editName(scope.$index,scope.row)">
              <span class="logo-img"><img src="static/img/files.png" alt=""></span>
              <span class="input-container" v-if="scope.row.editFlag === true">
                <el-input class="inner-input" v-model="scope.row.name" 
                 placeholder="输入文件名"></el-input>
                 <span v-if="!scope.row.disabled">
                    <i class="el-icon-check"></i>
                    <i class="el-icon-close"></i>
                 </span>
              </span>
              <span v-else>{{scope.row.name}}</span>
            </div>
          </template>
         </el-table-column>
        <el-table-column  prop="creatTime"  label="创建时间" >  </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
const testData = [
  {
    name: '文件一',
    creatTime: '2018-06-25',
    editFlag: false,
  },
   {
    name: '文件一',
    creatTime: '2018-06-25',
    editFlag: false,
  }
  ]
export default {
  name: 'file-uploade',
  data () {
    return {
      form: {},
      testData: testData,
      multipleSelection: [],
      editFlag: false,
    }
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    editName(index,row){
      // row.editFlag = true
      console.log(index,row)
    },
    goHome() {
      this.$router.push({path: '/'})
    },
    handleSelectionChange(val){
       let ret = []
      val.map((item,index) => {
         ret.push(item.id)
      })
      this.multipleSelection = ret
    },
    creatFiles(){
      this.testData.push({
        name: '',
        editFlag: true,
        creatTime: ''
      })
    },
  }
}
</script>

<style lang="css" scoped>
.logo-img{
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.logo-img img{
  width: 100%;
  height: 100%;
}
.inner-input{
  width: 200px;
}
</style>
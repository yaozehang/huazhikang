<template>
  <div class="zoneList-container">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form :inline="true" :model="form"  ref="form" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="产品分类"  style="margin-right:30px;">
               <el-select v-model="form.type" clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="(item,index) in typeList" :key="index"  :label="item.ptName" :value="item.ptName"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="护具名称">
              <el-select v-model="form.procetName" clearable placeholder="请选择" style="width:200px;">
                <el-option  v-for="(item,index) in allNameList" :key="index"  :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="" style="margin-left:120px;">
              <el-button type="primary" @click="searchList" style="width:100px;">查询</el-button>
              <el-button type="primary" @click="reset" style="width:100px;">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="zoneList-title border-bottom">
        <el-button class="title-btn" type="text">护具使用情况</el-button>
      </div>
      <div class="zonList-table">
       <el-table :data="tableData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.child" stripe border style="width: 100%"  :row-style="rowStyle" :header-cell-style="rowStyle">
              <el-table-column label="序列号" prop="number"> </el-table-column>
              <el-table-column label="护具名称" prop="prName"> </el-table-column>
              <el-table-column label="产品批号" prop="prProductNumber"> </el-table-column>
              <el-table-column label="入库数量 " prop="inNumber"> </el-table-column>
              <el-table-column label="剩余数量" prop="remainNumber"> </el-table-column>
              <el-table-column label="供应商" prop="supplier"> </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column  prop="prProductType" label="产品分类" > </el-table-column>
         <el-table-column prop="inTotalNumber" label="产品总量"> </el-table-column>
        <el-table-column  prop="totalRemainNumber" label="剩余数量">  </el-table-column>
<!--         <el-table-column  prop="name" label="推荐购买量"> </el-table-column>
        <el-table-column  prop="name" label="是否够发放一次"> </el-table-column> -->
    </el-table>
      </div>
     <div class="my-pagination">
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="15" layout=" total,prev, pager, next, jumper" :total="total">
          </el-pagination>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import {getAllProcetType} from 'api/protect'
import getUserInfo from 'common/js/user'
export default {
  name: '',
  data () {
    return {
      form: {
        type: '',
        procetName: '',
      },
      tableData: [],
      delId: 0,
      currentPage: 1,
      total: 10,
      IsDel: false,
      isUse: ['不限', '是', '否'],
      typeList: [],
      allNameList: []
    }
  },
  mounted() {
    this.searchList()
    this._getAllProcetType()
    this.getAllNames()
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    reset(){
      this.form.type = ''
      this.form.procetName = ''
    },
    getAllNames(){   //获取护具名称全部
      let data = {
        prPartitionId: getUserInfo().userId
      }
      this.axios.post('/proic/queryproductnamelist.do',qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
        this.allNameList = res.data
        }else{
          console.log(res)
        }
    })
    },
    _getAllProcetType(){      // 获取护具类型下拉列表 protype/queryprotypebyid.do
      let data = {
        departId: getUserInfo().comPId
      }
      getAllProcetType(qs.stringify(data)).then((res) => {
        let temp = []
        res.map((item, index) => {
          temp.push({ptName:item.ptName,ptId: item.ptId})
        })
         this.typeList = temp
        this.form.type = temp[0]
      })
    },
// 请求参数：page, 页码proType, 产品类型proName 护具名称
    searchList(){       // 条件查询
     let data ={ 
        page: this.currentPage,
        proType: this.form.type,
        proName: this.form.procetName,
        prPartitionId: getUserInfo().userId
      }
    this.axios.post('/proic/querybywarn.do', qs.stringify(data))
    .then((res) => {
      if (res.status ===200) {
        this.tableData = res.data.resultList
        this.total = res.data.sum
      }else{
        console.log(res)
      }
    })
    },
    handleCurrentChange(val) {
      let data ={ 
        page: val,
        proType: this.form.type,
        proName: this.form.procetName,
        prPartitionId: getUserInfo().userId
      }
    this.axios.post('/proic/querybywarn.do', qs.stringify(data))
    .then((res) => {
      if (res.status ===200) {
        this.tableData = res.data.resultList
        this.total = res.data.sum
      }else{
        console.log(res)
      }
    })
    },
  },
}
</script>

<style lang="css" scoped>
.zoneList-content{
width: 100%;
padding-top: 20px;
margin: 20px auto;
}
.zoneList-title{
  margin: 10px 0;
}
.search-input,.search-btns{ float: left; }
.search-btns{ margin-left: 20px; }
.my-pagination{ float: right; }
.EditGroupProject{
  width: 100%;
  position: absolute;
  top:60px;
  background: #fff;
  z-index: 300;
}
</style>
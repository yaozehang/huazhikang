 <template>
  <div class="zoneList-container"  @click="hideTree($event)">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form :inline="true" :model="form"  ref="form" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="发放部门"  style="margin-right:30px;">
              <el-input v-model="form.depart" placeholder="" readonly id="depart1" @focus="isSelectDepart = true" style="width:220px;" class="my-word my-input"></el-input>
          </el-form-item>
            <el-form-item label="产品分类"  style="margin-right:30px;">
              <el-select v-model="form.type" clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="(item,index) in procetListAll" :key="index"  :label="item.ptName" :value="item.ptName"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="护具名称">
               <el-select v-model="form.procetName" clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="(item,index) in allNameList" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="发放日期（起）"  style="margin-right:30px;">
              <el-date-picker v-model="form.startDate"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"
                :picker-options="pickerOptions"> </el-date-picker>
            </el-form-item>
            <el-form-item label="入库日期（止）">
              <el-date-picker v-model="form.endDate"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"
                 :picker-options="pickerOptions"> </el-date-picker>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="getList"  style="width:90px;margin-right:20px;">查询</el-button>
              <el-button type="primary" @click="adddepartGrant('addForm')"  style="width:90px;">新增发放</el-button>
            </el-form-item>
          </div>
        </el-form>
          <!-- 部门树状图 多选-->
         <div class="my-companyTree" v-show="isSelectDepart">
          <div class="company-tree">
            <el-tree :data="departData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
             :props="defaultProps" check-strictly >
          </el-tree>
          </div>
        <div class="buttons">
          <el-button type="primary" @click="onConfirmPart">确认</el-button>
          <el-button @click="resetChecked">取消</el-button>
        </div>
      </div>
    <!-- 部门树状图 -->
      </div>
      <div class="zoneList-title border-bottom">
        <el-button class="title-btn" type="text">部门发放记录</el-button>
        <el-button  @click="exportTable" class="export-excel">导出excel</el-button>
      </div>       
      <div class="zonList-table">
       <el-table :data="tableData"  stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="100%" :default-sort = "{prop: 'dgGrantTime', order: 'descending'}"  @selection-change="handleSelectionChange">
        <el-table-column prop="dgId"  label="序号"  width="50"  type="selection"> </el-table-column>
        <el-table-column  prop="dgDepartName" label="发放部门" > </el-table-column>
        <el-table-column prop="dgProductType" label="产品分类"> </el-table-column>
        <el-table-column  prop="dgProductName" label="护具名称"> </el-table-column>
        <el-table-column  prop="dgGrantNumber" label="发放数量"> </el-table-column>
        <el-table-column  prop="dgRemainNumber" label="剩余数量 " > </el-table-column>
        <el-table-column prop="dgGrantTime" label="发放时间" sortable> </el-table-column>
        <el-table-column  prop="dgGrantMan" label="发放人员"> </el-table-column>
        <el-table-column  prop="dgGetMan" label="领取人员"> </el-table-column>    
    </el-table>
      </div>
     <div class="my-pagination">
        <div class="block">
          <el-pagination @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="15" layout=" total,prev, pager, next, jumper" :total="total">
          </el-pagination>
       </div>
      </div>
      <!-- 新增弹出框  -->
    <div class="del-form"  @click="hideTree2($event)">
     <el-dialog  class="dialog-form" title="新增发放"  width="800px" :visible.sync="IsAdd" @close="IsAdd = false" 
     :closeOnClickModal ="false">
        <el-form :inline="true" :model="addForm"  ref="addForm"  :rules="rules" class="demo-form-inline" label-width="90px" style="">
          <div class="form-items">
            <el-form-item label="发放部门"  style="margin-right:30px;" prop="depart"  required>
              <el-input v-model="addForm.depart" placeholder="" id="depart2"  @focus="isSelectDepart2 = true" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="产品分类"   style="margin-right:10px;">
              <el-select v-model="addForm.ProductType" clearable placeholder="请选择" style="width:220px;" @focus="getLisByZone">
              <el-option v-for="(item,index) in procetList" :key="index"  :label="item.ptName"  :value="item.ptName">
                </el-option>
               </el-select>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="护具名称"  style="margin-right:30px;" prop="procetName"  required>
               <el-select v-model="addForm.procetName" clearable placeholder="请选择" style="width:220px;"  @change="getNumber" @focus="getProcetName">
                <el-option  v-for="(item,index) in procetNameList" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="库存总数" >
              <el-input v-model="addForm.totalNum" placeholder="" readonly style="width:220px;"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="剩余数量"  style="margin-right:30px;">
              <el-input v-model="addForm.surplusNum" placeholder="" readonly style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="发放数量"  prop="grantNum" >
              <el-input v-model="addForm.grantNum" placeholder="" style="width:220px;" type="number"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="发放人"  style="margin-right:30px;">
              <el-input v-model="addForm.grantPerson" placeholder="" style="width:220px;" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="领取人" prop="getPerson"  required>
              <el-input v-model="addForm.getPerson" placeholder="" style="width:220px;"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="领取人电话"  style="margin-right:30px;">
              <el-input v-model="addForm.tel" placeholder="" style="width:220px;" type="number"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <!-- 部门树状图 单选-->
         <div class="my-tree2" v-show="isSelectDepart2">
          <div class="zone-tree">
            <el-tree :data="departData" default-expand-all  show-checkbox node-key="id"  ref="tree" highlight-current
             :props="defaultProps" check-strictly @check="getNodes" >
          </el-tree>
          </div>
        </div>
    <!-- 部门树状图 -->
        <div slot="footer" class="dialog-footer my-footer-bths">
          <el-button type="primary" @click="sureAdd('addForm')">确 定</el-button>
          <el-button  @click="cancleAdd('addForm')">清空</el-button>
        </div>
      </el-dialog>
  </div>
<!-- 新增弹出框 结束-->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils.js'
import {getDate} from 'common/js/time'
import getUserInfo from 'common/js/user'
import {myurl} from '@/api/config.js'
import {getAllProcetType} from 'api/protect'
import {getZoneList} from 'api/zone'
import {getZoneListByAuthority} from 'api/zone'
export default {
  name: '',
  data () {
    return {
      form: {
        startDate: '',
        endDate: '',
        procetName: '', 
        type: '',
        depart: '',
      },
      addForm: {
        depart: '',  // 发放部门
        ProductType: '',  // 产品类型
        procetName: '',   // 护具名称
        totalNum: '',    // 库存总数
        surplusNum: '',  // 剩余库存
        grantNum: '',  // 发放数量
        grantPerson: '',   // 发放人
        getPerson: '',  // 领取人
        tel: '',  //领取人电话
      },
      isSelectDepart: false,
      departData: [],
      depart: [],   //多选部门的id
      isSelectDepart2: false,
      zoneKey: 0, // 单选部门id
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {
        depart: [{ required: true, message: '部门不能为空', trigger: 'blur' } ],
        procetName: [{ required: true, message: '护具名称不能为空', trigger: 'blur' } ],
        grantNum: [{ required: true, message: '发放数量不能为空', trigger: 'blur' }],
        getPerson: [{ required: true, message: '领取人不能为空', trigger: 'blur' }]
      },
      tableData: [{id: 1,iName: '张三'}],
      delId: 0,
      currentPage: 1,
      total: 0,
      IsAdd: false,
      IsEdit: false,
      isUse: ['不限', '是', '否'],
      selectList: ['选择一', '选择二', '选择三','选择四'],
      procetList: [],
      procetListAll: [],
      multipleSelection: [],
      procetNameList: [],
      allNameList: [],
      pickerOptions:{   //验证入库时间小于当天
        disabledDate(time){
           let _now = Date.now()
          return time.getTime() > _now 
        }
    },

    }
  },
  mounted() {
    this.getZone()
    this.getList()
    this._getAllProcetType()
    this.getAllNames()
    this.addForm.grantPerson = getUserInfo().username
    let time = getDate()
    this.form.endDate = `${time.year}-${time.month}-${time.date}`
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    //获取分区
    getZone() {
      let data = {
        comPId: getUserInfo().comPId,
        userId: getUserInfo().userId
      }
      getZoneListByAuthority(qs.stringify(data)).then((res) => {
        this.departData = [res]
      })
    },
    getLisByZone(){
      let data= {
        dgId: this.zoneKey
      }
      if(this.zoneKey !== ''){
        this.axios.post('/depart/queryproducttypebydgid.do', qs.stringify(data))
        .then((res) => {
        if (res.status ===200) {
          if(res.data.length !==0){
            this.procetList = res.data
          }else{
            this.procetList = []
          }
        }else{
          console.log(res)
          this.procetList = []
        }
        })
      }
    },
    _getAllProcetType(){      // 获取护具类型下拉列表 protype/queryprotypebyid.do
      let data = {
        departId: getUserInfo().comPId
      }
      getAllProcetType(qs.stringify(data)).then((res) => {
        let temp = []
        if(res){
            res.map((item, index) => {
            temp.push({ptName:item.ptName,ptId: item.ptId})
            })
            this.procetListAll = temp
          }
      })
    },
    getAllNames(){
      let data = {
        prPartitionId: getUserInfo().userId,
        // comPId: getUserInfo().comPId
      }
      console.log(data)
      this.axios.post('/proic/queryproductnamelist.do',qs.stringify(data))
      .then((res) => {
        console.log(res.data)
        if (res.status ===200) {
        this.allNameList = res.data
        }else{
          console.log(res)
        }
    })
    },
    getProcetName(){   // 根据类型获取护具名称
      let data = {
        proType: this.addForm.ProductType
      }
      this.axios.post('/depart/queryproductbytypename.do',qs.stringify(data))
      .then((res) => {
        console.log(res.data)
        if (res.status ===200) {
          if(res.data.data.length !==0){
            this.procetNameList = res.data.data
          }
        }else{
          console.log(res)
        }
    })
    },
    hideTree(e) {
      if (e.target.id === '') {
        this.isSelectDepart = false
      }
    },
    hideTree2(e) {
      if (e.target.id === '') {
        this.isSelectDepart2 = false
      }
    },
    //获取部门多选
    onConfirmPart() {
      let temp = this.$refs.tree.getCheckedNodes()
      this.form.depart = this._filterTreeStr(temp)
      //选中的id
      this.depart= JSON.stringify(this.$refs.tree.getCheckedKeys())
      this.isSelectDepart = false
    },
    _filterTreeStr(data) {
      let ret = []
      data.forEach((item, idx) => {
        ret.push(item.label)
      })
      return ret.join('')
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.isSelectDepart = false
      this.form.depart = ''
    },
    // 获取部门单选
    getNodes(val) {
      this.zoneKey = val.id
      this.addForm.depart = val.label
      this.isSelectDepart2 = false
    },
    handleSelectionChange(val) {   // 获取表格选中的值
      let ret = []
      val.map((item,index) => {
         ret.push(item.dgId)
      })
      this.multipleSelection = ret
    },
    exportTable(){   //导出表格
      if(this.multipleSelection.length === 0) {
          this.$message({
          type: 'warning',
          center: true,
          message: '请先选择要导出的的数据'
        })
        return false
      }
      let url =`${myurl}/depart/exprot.do?id=${this.multipleSelection}`
      // let url ='http://47.92.26.132:8080/workPlan/batchDownload.do?id='+this.multipleSelection
      window.open(url)
    },
    // 分页/条件查询部门发放信息depart/querydepartlist.do
    getList(){
      let data ={
        page:this.currentPage,
        dateStart: this.form.startDate,  //发放日期
        dateEnd: this.form.endDate,  //入库日期
        proName: this.form.procetName,  //护具名称
        type: this.form.type,  //护具类型
        depart: this.depart,  //发放部门   id
        departId: getUserInfo().userId
      }
    this.axios.post('/depart/querydepartlist.do', qs.stringify(data))
    .then((res) => {
      if (res.status ===200) {
            this.tableData = res.data.resultList
            this.total = res.data.sum
      }else{
        console.log(res)
      }
    })
    },
    // 新增入库
    adddepartGrant(addForm){
      this.IsAdd =true
      this.addForm.depart = ''
      this.addForm.ProductType = ''
      this.addForm.procetName = ''
      this.addForm.totalNum = ''
      this.addForm.surplusNum = ''
      this.addForm.grantNum = ''
      this.addForm.grantPerson = getUserInfo().username
      this.addForm.tel = ''
      // this.$refs[addForm].resetFields()
    },
    getNumber() {   // 查询库存总数以及剩余数量depart/querynumbers.do proType, 
      let data = {
        proType: this.addForm.ProductType,
        proName: this.addForm.procetName
      }
      if(this.addForm.ProductType !== '' && this.addForm.procetName !==''){
        this.axios.post('/depart/querynumbers.do', qs.stringify(data))
        .then((res) => {
        if (res.status ===200) {
          this.addForm.totalNum = res.data.totalNumber
          this.addForm.surplusNum = res.data.lessNumber
        }else{
          console.log(res)
        }
      })
      }
    },
    sureAdd(addForm) {    // 新增部门发放depart/adddepartgrant.do
      let data = {
        dgDepartName: this.addForm.depart,   // 发放部门
        dgDepartId: this.zoneKey,  //部门id
        dgProductType: this.addForm.ProductType,  // 产品类型
        dgProductName: this.addForm.procetName,   // 护具名称
        dgRemainNumber: this.addForm.surplusNum,  // 剩余库存
        dgGrantNumber: this.addForm.grantNum,  // 发放数量
        dgGrantMan: this.addForm.grantPerson,   // 发放人
        dgGetMan: this.addForm.getPerson,    // 领取人
        dgGetTel: this.addForm.tel,  //领取人电话
        dgGrantMan: getUserInfo().username   //入库人员 
      }
    this.$refs[addForm].validate((valid) => {
      if (valid) {
        this.axios.post('/depart/adddepartgrant.do', qs.stringify(data))
        .then((res) => {
          if (res.status ===200) {
            this.IsAdd = false
            this.getList()
          }else{
            console.log(res)
          }
      })
      }
    })
    },
    formReset(){
      this.addForm.depart = ''
      this.addForm.ProductType = ''
      this.addForm.procetName = ''
      this.addForm.totalNum = ''
      this.addForm.surplusNum = ''
      this.addForm.grantNum = ''
      this.addForm.grantPerson  = getUserInfo().username
      this.addForm.tel = ''
    },
    cancleAdd(addForm) {
      this.formReset()
    },
    handleCurrentChange(val) {
      let data = {
        page: this.currentPage,
        dateStart: this.form.startDate,  //发放日期
        dateEnd: this.form.endDate,  //入库日期
        proName: this.form.procetName,  //护具名称
        type: this.form.type,  //护具类型
        depart: this.depart,  //发放部门
        departId: getUserInfo().partitionId
      }
    this.axios.post('/depart/querydepartlist.do', qs.stringify(data))
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
.export-excel{
  float: right;
  margin-right: 20px;
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
.my-companyTree{
  border: 1px solid #ccc;
  width: 500px;
  margin-left: 400px;
  position: absolute;
  left: -30px;
  top:180px;
  height: 500px;
  padding: 10px;
  z-index: 300;
  background: #FFF;
  border-radius: 5px;
}
.company-tree{
  max-height: 450px;
  overflow-y: auto;
}
.buttons{
  width: 200px;
  margin: 0 auto;
}
.my-tree2{
  border: 1px solid #ccc;
  width: 400px;
 margin-left: 30px;
  position: absolute;
  left: 0px;
  top:125px;
  height: 500px;
  z-index: 300;
  border-radius: 5px;
  background: #FFF;
}
.zone-tree{
  max-height: 450px;
  overflow-y: auto;
}
</style>
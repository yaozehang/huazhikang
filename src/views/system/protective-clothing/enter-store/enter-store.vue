<template>
  <div class="zoneList-container">
    <div class="zoneList-content clearfix">
      <div class="search-group clearfix">
        <el-form :inline="true" :model="form"  ref="form" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="入库日期（起）">
              <el-date-picker v-model="form.startDate"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"
              :picker-options="pickerOptions"> </el-date-picker>
          </el-form-item>
            <el-form-item label="产品分类"  style="margin-right:30px;">
              <el-select v-model="form.type" clearable placeholder="请选择" class="common-input">
                <el-option  v-for="(item,index) in procetList" :key="index"  :label="item.ptName" :value="item.ptName"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="护具名称">
              <el-select v-model="form.procetName" clearable placeholder="请选择" class="common-input">
                <el-option  v-for="(item,index) in allNameList" :key="index"  :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-items">
              <el-form-item label="入库日期（止）" style="margin-right:130px;">
              <el-date-picker v-model="form.endDate"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"
                :picker-options="pickerOptions"> </el-date-picker>
          </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="getList"  style="width:90px;margin-right:20px;">查询</el-button>
              <el-button type="primary" @click="addSupplier"  style="width:90px;">新增入库</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="zoneList-title border-bottom">
        <el-button class="title-btn" type="text">护具列表</el-button>
      </div>
      <div class="zonList-table">
       <el-table :data="tableData"  stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="100%" :default-sort = "{prop: 'pgLoseDays', order: 'descending'}">
        <el-table-column prop="prId"  label="序号"  width="50" > </el-table-column>
        <el-table-column  prop="prProductNumber" label="产品批号" > </el-table-column>
        <el-table-column prop="prProductType" label="产品分类"> </el-table-column>
        <el-table-column  prop="prName" label="护具名称"> </el-table-column>
        <el-table-column  prop="prInNumber" label="入库数量 "> </el-table-column>
        <el-table-column  prop="prRemainNumber" label="剩余数量" > </el-table-column>
        <el-table-column prop="prInDate" label="入库时间" sortable> </el-table-column>
        <el-table-column  prop="prInUser" label="入库人员"> </el-table-column>     
        <el-table-column   label="操作"  width="150"> 
          <template slot-scope="scope">
             <el-button size="mini" type="warning" style="margin-left:30px;" @click="editInfo(scope.$index,scope.row)">修改信息</el-button>
        </template>
        </el-table-column>
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
    <div class="del-form" :visible.sync="IsAdd">
     <el-dialog  class="dialog-form" title="新增入库"  width="800px" :visible.sync="IsAdd" :closeOnClickModal ="false">
        <el-form :inline="true" :model="addForm"  ref="addForm"  :rules="rules" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="护具名称"  style="margin-right:30px;" prop="procetName"  required>
                <el-input v-model="addForm.procetName" placeholder="" class="common-input"></el-input>
     <!--           <el-select v-model="addForm.procetName"   filterable  allow-create default-first-option placeholder="请选择">
                <el-option v-for="item in selectList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select> -->
            </el-form-item>
            <el-form-item label="产品分类"  prop="ProductType" style="margin-right:10px;"  required>
              <el-select v-model="addForm.ProductType" clearable placeholder="请选择" style="width:180px;">
                <el-option  v-for="(item,index) in procetList" :key="index"  :label="item.ptName" :value="item.ptName"> </el-option>
               </el-select>
               <el-button type=""  @click="addType">新增</el-button>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="供应商家"  style="margin-right:30px;"  prop="supplier"  required>
              <el-select v-model="addForm.supplier" clearable placeholder="请选择" class="common-input">
                <el-option  v-for="(item,index) in supplierList" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="产品批号" prop="batchNumber">
              <el-input v-model="addForm.batchNumber" placeholder="" class="common-input" @blur="numLength" type="number"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="入库数量"  style="margin-right:30px;" prop="enterNum"  required>
              <el-input v-model="addForm.enterNum" placeholder="" class="common-input" type="number"></el-input>
            </el-form-item>
            <el-form-item label="发放周期"  prop="grantCycle"  required>
              <div class="input-group">
                <el-input v-model="addForm.grantCycle" placeholder="" class="common-input" type="number"></el-input>
                <span class="unit">天</span>
              </div>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="保质期至"  style="margin-right:30px;" prop="qualityTime"  required>
              <el-date-picker v-model="addForm.qualityTime"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期" :picker-options="pickerQualityTime"> </el-date-picker>
            </el-form-item>
            <el-form-item label="入库单价"  style="margin-right:30px;"  prop="perPrice"  required>
              <div class="input-group">
                <el-input v-model="addForm.perPrice" placeholder="" class="common-input" type="number"></el-input>
              <span class="unit">元</span>
              </div>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="入库总价">
              <div class="input-group">
                <el-input v-model="enterPrice" placeholder="" disabled class="common-input"></el-input>
                <span class="unit">元</span>
              </div>
            </el-form-item>
            <el-form-item label="存放地点" prop="depositPosition">
              <el-input v-model="addForm.depositPosition" placeholder="" class="common-input"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="入库时间"  style="margin-right:30px;"  prop="enterTime"  required>
                <el-date-picker v-model="addForm.enterTime"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"  :picker-options="pickerOptions"> </el-date-picker>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="使用说明" prop="instructions">
              <el-input v-model="addForm.instructions"  type="textarea" :row="1"  placeholder="" class="instructions-word"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="sureAdd('addForm')" :disabled="disabled" >确 定</el-button>
          <el-button  @click="cancleAdd('addForm')">清空</el-button>
        </div>
      </el-dialog>
  </div>
<!-- 新增弹出框 结束-->
  <!-- 新增护具名称弹出框 -->
    <div class="dialog-form" :visible.sync="isAddType">
     <el-dialog  class="dialog-form" title="新增类型" width="400"  :visible.sync="isAddType" :closeOnClickModal ="false">
        <el-form :model="add2" label-width="80px" ref="add2" style="width: 80%;">
          <el-form-item label="护具类型" >
             <el-input v-model="addTypeList"  placeholder="" style=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addTypes()" >确 定</el-button>
          <el-button @click="cancleAddType()">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增护具名称弹出框 -->
      <!-- 修改弹出框  -->
    <div class="del-form" :visible.sync="IsEdit">
     <el-dialog  class="dialog-form" title="修改信息"  width="800px" :visible.sync="IsEdit" :closeOnClickModal ="false">
        <el-form :inline="true" :model="editForm"  ref="editForm"  :rules="rules" class="demo-form-inline" label-width="120px" style="">
          <div class="form-items">
            <el-form-item label="护具名称"  style="margin-right:30px;" prop="procetName"  required>
              <el-input v-model="editForm.procetName" placeholder="" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="产品分类"  prop="ProductType"  required>
              <el-select v-model="editForm.ProductType" clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="(item,index) in procetList" :key="index"  :label="item.ptName" :value="item.ptName"> </el-option>
               </el-select>
            </el-form-item>
          </div>
           <div class="form-items">
            <el-form-item label="供应商家"  style="margin-right:30px;"  prop="supplier"  required>
              <el-select v-model="editForm.supplier" clearable placeholder="请选择" style="width:220px;">
                <el-option  v-for="(item,index) in supplierList" :key="index"  :label="item" :value="item"> </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="产品批号" >
              <el-input v-model="editForm.batchNumber" placeholder="" style="width:220px;" @blur="numLength" type="number"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="入库数量"  style="margin-right:30px;" prop="enterNum"  required>
              <el-input v-model="editForm.enterNum" placeholder="" style="width:220px;" type="number"></el-input>
            </el-form-item>
            <el-form-item label="发放周期"  prop="grantCycle"  required>
              <div class="input-group">
                <el-input v-model="editForm.grantCycle" placeholder="" style="width:220px;" type="number"></el-input>
                <span class="unit">天</span>
              </div>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="保质期至"  style="margin-right:30px;" prop="qualityTime"  required>
              <el-date-picker v-model="editForm.qualityTime"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"  :picker-options="pickerQualityTime"> </el-date-picker>
          </el-form-item>
            <el-form-item label="入库单价"  style="margin-right:30px;" prop="perPrice"  required>
              <div class="input-group">
                <el-input v-model="editForm.perPrice" placeholder="" style="width:220px;" type="number"></el-input>
                <span class="unit">元</span>
              </div>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="入库总价" >
              <div class="input-group">
                <el-input v-model="enterPrice1" placeholder="" disabled style="width:220px;"></el-input>
                <span class="unit">元</span>
              </div>
            </el-form-item>
            <el-form-item label="存放地点" >
              <el-input v-model="editForm.depositPosition" placeholder="" style="width:220px;"></el-input>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="入库时间"  style="margin-right:30px;" prop="enterTime"  required>
                <el-date-picker v-model="editForm.enterTime"  value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"  :picker-options="pickerOptions" > </el-date-picker>
            </el-form-item>
          </div>
          <div class="form-items">
            <el-form-item label="使用说明" >
              <el-input v-model="editForm.instructions"  type="textarea" :row="1"  placeholder="" class="instructions-word"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer my-footer-bths" >
          <el-button type="primary" @click="sureEdit('editForm')" :disabled="disabled2">确 定</el-button>
          <!-- <el-button  @click="cancleEdit">取消</el-button> -->
        </div>
      </el-dialog>
  </div>
<!-- 修改弹出框 结束-->
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import utils from '@/utils.js'
import {getDate} from 'common/js/time'
import getUserInfo from 'common/js/user'
import {getAllProcetType} from 'api/protect'
export default {
  name: '',
  data () {
    return {
      form: {
        startDate: '',
        endDate: '',
        procetName: '',
        type: '',
      },
      addForm: {
        procetName: '',  // 护具名称
        ProductType: '',  // 产品类型
        supplier: '',   // 供应商家
        batchNumber: '',  // 产品批号
        enterNum: '',  // 入库数量
        grantCycle: '',   // 发放周期
        enterTime: '',   // 入库时间
        totalNum: '',    // 库存总数
        qualityTime: '',   //保质期
        enterPrice: '',   // 入库总价
        perPrice: '',   //入库单价
        depositPosition: '',   // 存放地点
        instructions: '',        //使用说明
      },
      editForm: {
        procetName: '',  // 护具名称
        ProductType: '',  // 产品类型
        supplier: '',   // 供应商家
        batchNumber: '',  // 产品批号
        enterNum: '',  // 入库数量
        grantCycle: '',   // 发放周期
        enterTime: '',   // 入库时间
        totalNum: '',    // 库存总数
        qualityTime: '',   //保质期
        enterPrice: '',   // 入库总价
        perPrice: '',   //入库单价
        depositPosition: '',   // 存放地点
        instructions: '',       //使用说明
      },
      rules: {
        procetName: [{ required: true, message: '护具名称不能为空', trigger: 'blur' } ],
        ProductType: [{ required: true, message: '产品类型不能为空', trigger: 'blur' } ],
        supplier: [{ required: true, message: '供应商家不能为空', trigger: 'blur' }],
        enterNum:   [{ required: true, message: '入库数量不能为空', trigger: 'blur' }],
        grantCycle: [{ required: true, message: '发放周期不能为空', trigger: 'blur' }],
        qualityTime: [{ required: true, message: '保质期限不能为空', trigger: 'blur' }],
        perPrice: [{ required: true, message: '入库单价不能为空', trigger: 'blur' }],
        enterTime: [{ required: true, message: '入库时间不能为空', trigger: 'blur' }],
      },
      tableData: [{id: 1,iName: '张三'}],
      delId: 0,
      currentPage: 1,
      total: 0,
      IsAdd: false,
      IsEdit: false,
      isAddType: false,
      disabled: false,
      disabled2: false,
      isUse: ['不限', '是', '否'],
      selectList: ['选择一', '选择二', '选择三','选择四'],
      procetList: [],
      supplierList: [],
      editId: 0,
      comId: getUserInfo().comPId,
      add2: {},
      addTypeList: '',
      allNameList: [],
      pickerOptions:{   //验证入库时间小于当天
        disabledDate(time){
          let _now = Date.now()
          return time.getTime() > _now 
        }
    },
    pickerQualityTime:{
      disabledDate(time){
        let _now = Date.now()
        return time.getTime() < _now 
        }
    }
    }
  },
  computed: {
    enterPrice: function () {
      return  this.addForm.enterNum*this.addForm.perPrice
    },
    enterPrice1: function (){
      return this.editForm.enterNum*this.editForm.perPrice
    }
  },
  mounted() {
    this.getList()
    this._getAllProcetType()
    this.getSupplierList()
    this.getAllNames()
    let time = getDate()
    this.form.endDate = `${time.year}-${time.month}-${time.date}`
    this.comId = getUserInfo().comPId
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    errMsg(msg) {
      return this.$message({
        message: msg,type: 'error',center: true,duration: 10000
        })
    },
    sucMsg(msg) {
      return this.$message({
        message: msg,type: 'success',center: true,duration: 10000
        })
    },
    numLength(){
      console.log(this.addForm.batchNumber.length)
      if(this.addForm.batchNumber.length>8){
        this.errMsg('请输入九位以下的数字作为产品批号')
        this.disabled = true
      }else{
        this.disabled = false
      }
      if(this.editForm.batchNumber.length>8){
         this.errMsg('请输入九位以下的数字作为产品批号')
         this.disabled2 = true
      }else{
        this.disabled2 = false
      }
    },
    getAllNames(){   //获取护具名称全部
        let data = {
        prPartitionId: getUserInfo().userId
      }
      this.axios.post('/proic/queryproductnamelist.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          console.log(res.data)
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
        this.procetList = temp
      })
    },
    // 请求所有供应商名称（下拉列表）：supp/selectsupnamelist.do
    getSupplierList(){
      let data={
        spPartitionId: getUserInfo().comPId
      }
      this.axios.post('/supp/selectsupnamelist.do',qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
        this.supplierList = res.data
        }else{
          console.log(res)
        }
    })
    },
    // 新增护具分类  protype/addprotype.do请求参数：ptName：护具类型名称
    addType() {
      this.isAddType = true
    },
    addTypes() {   //添加护具类型
      this.isAddType = false
      let data = {
        ptName: this.addTypeList,
        partitionId: getUserInfo().comPId
      }
    this.axios.post('/protype/addprotype.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
          console.log(res.data)
          this._getAllProcetType()
        }else{
          console.log(res)
        }
    })
    },
    cancleAddType(){
      this.isAddType = false
    },
// ：proic/querybypage.do
    getList(){
      let data ={
        page:this.currentPage,
        deteStart: this.form.startDate,
        dateEnd: this.form.endDate,
        prProductType: this.form.type,
        prName: this.form.procetName,
        prPartitionId: getUserInfo().comPId
      }
    this.axios.post('/proic/querybypage.do', qs.stringify(data))
    .then((res) => {
        if (res.status ===200) {
          this.tableData = res.data.resultList
          this.total = res.data.sum
        }else{
        }
    })
    },
    // 新增入库
    addSupplier(){
      this.IsAdd =true
    },

  // 新增护具入库：proic/addprotectice.do
    sureAdd(addForm) {
      let data ={
        prName: this.addForm.procetName, // 护具名称
        prProductType: this.addForm.ProductType,  // 产品类型
        prSupplier: this.addForm.supplier, // 供应商家
        prProductNumber: this.addForm.batchNumber ||0,  // 产品批号
        prInNumber: this.addForm.enterNum, // 入库数量
        prPeriod: this.addForm.grantCycle,   // 发放周期
        prInDate: this.addForm.enterTime,   // 入库时间
        prExpirationDate: this.addForm.qualityTime, //保质期
        prTotalPrice: this.enterPrice,  // 入库总价
        prUnitPrice: this.addForm.perPrice,    //入库单价
        prDeposit: this.addForm.depositPosition,   // 存放地点
        prInstructions: this.addForm.instructions,    //使用说明
        prInUser: getUserInfo().username,   //入库人员
        prPartitionId: getUserInfo().comPId //公司id
      }
    this.$refs[addForm].validate((valid) => {
      if (valid) {
        this.axios.post('/proic/addprotectice.do', qs.stringify(data))
        .then((res) => {
          if (res.status ===200) {
            if(res.data.status === 1){
              this.IsAdd = false
              this.getList()
              this.sucMsg(res.data.msg)
            }else{
              this.errMsg(res.data.msg)
            }
          }else{
            console.log(res)
          }
        })
      }
    })
    },
    cancleAdd(addForm) {
      this.$refs[addForm].resetFields()
      this.enterPrice =''
    },
    //修改入库获取信息 proic/querybyid.do多增加一个prId
    editInfo(index, row) {
      this.IsEdit = true
      this.editId = row.prId
      let data = {
        prId: row.prId
      }
      this.axios.post('/proic/querybyid.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          this.editForm.procetName = res.data.prName  //护具名称
          this.editForm.ProductType = res.data.prProductType  // 产品类型
          this.editForm.supplier = res.data.prSupplier // 供应商家
          this.editForm.batchNumber = res.data.prProductNumber // 产品批号
          this.editForm.enterNum =res.data.prInNumber // 入库数量
          this.editForm.grantCycle = res.data.prPeriod   // 发放周期
          this.editForm.enterTime = res.data.prInDate   // 入库时间
          this.editForm.qualityTime = res.data.prExpirationDate //保质期
          this.editForm.perPrice  = res.data.prUnitPrice  //入库单价
          this.editForm.depositPosition  = res.data.prDeposit   // 存放地点
          this.editForm.instructions  = res.data.prInstructions //使用说明
        }else {
          console.log(res)
        }
      })

    },
    sureEdit(editForm){
      let data = {
        prId: this.editId,
        prName: this.editForm.procetName, // 护具名称
        prProductType: this.editForm.ProductType,  // 产品类型
        prSupplier: this.editForm.supplier, // 供应商家
        prProductNumber: this.editForm.batchNumber,  // 产品批号
        prInNumber: this.editForm.enterNum, // 入库数量
        prPeriod: this.editForm.grantCycle,   // 发放周期
        prInDate: this.editForm.enterTime,   // 入库时间
        prExpirationDate: this.editForm.qualityTime, //保质期
        prTotalPrice: this.enterPrice1,  // 入库总价
        prUnitPrice: this.editForm.perPrice,    //入库单价
        prDeposit: this.editForm.depositPosition,   // 存放地点
        prInstructions: this.editForm.instructions,    //使用说明
        prInUser: getUserInfo().username,  //修改人
        prPartitionId: getUserInfo().comPId //公司id
      }
      this.$refs[editForm].validate((valid) => {
      if (valid) {
      this.axios.post('/proic/updateprotectice.do', qs.stringify(data))
      .then((res) => {
        if (res.status ===200) {
          if(res.data.status === 1){
            this.IsEdit = false
            this.getList()
            this.sucMsg(res.data.msg)
          }else{
            this.errMsg(res.data.msg)
          }
        }else{
          console.log(res)
        }
      })
      }
    })
    },
    cancleEdit(){
       this.IsEdit = false
    },
    handleCurrentChange(val) {
      let data = {
        page: val,
        deteStart: this.form.startDate,
        dateEnd: this.form.endDate,
        prProductType: this.form.type,
        prName: this.form.procetName,
        prPartitionId: getUserInfo().comPId //分区id
      }
    this.axios.post('/proic/querybypage.do', qs.stringify(data))
    .then((res) => {
      if (res.status ===200) {
        this.tableData = res.data.resultList
        this.total = res.data.recordCount
      }else{
        console.log(res)
      }
    })
    },
  },
};
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
.input-group{
  position: relative;
}
.unit{
  /* margin-left: -50px; */
  position: absolute;
  top: -1px;
  right: 20px;
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
.common-input{
  width: 220px;
}
.instructions-word{
  width: 550px;
}
/* @media screen and (max-width: 1280px) {
  .instructions-word{
    width: 200%;
}
}
@media screen and (max-width: 1210px) {
.instructions-word{
    width: 150%;
}
.common-input{
  width: 200px;
}
} */
</style>
 <template>
  <div class="userList-container">
      <ul class="user-form" >
        <li class="clearfix">
          <span class="startDate">
            <span class="">创建时间（起）</span>
              <el-date-picker  v-model="user.startDate" value-format="yyyy-MM-dd"  type="date"  placeholder="选择日期"> </el-date-picker>
          </span>
          <span class="username">
            <span for="#"> 姓名</span>
            <el-input v-model="user.name" style="width: 250px;"></el-input>
          </span>
          <span class="search">
            <!-- <span class="save-blue big-blue"  @click="searchList">查询</span> -->
            <el-button type="primary" @click="searchList">查询</el-button>
          </span>
        </li>
        <li class="clearfix">
           <span class="startDate">
            <span class="">创建时间（止）</span>
              <el-date-picker  v-model="user.endDate" value-format="yyyy-MM-dd"  type="date"  placeholder="选择日期"> </el-date-picker>
          </span>
          <span class="username">
            <span for="#"> 电话</span>
            <el-input v-model="user.tel" style="width: 250px;"></el-input>
          </span>
        </li>  
     </ul>
      <div class="type-list-title border-bottom">
        <el-button class="title-btn" type="text">用户列表</el-button>
    </div>
<!-- userId  2 是公司管理员将 1 普通管理员 3 超级管理员 0 是员工-->
      <div class="list-table" >
      <el-table :data="userData" border stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="700" :row-class-name="tableRowClassName">
        <el-table-column prop="sort" label="序列号" width="100" > </el-table-column>
        <el-table-column prop="username"  label="用户名"  width="100">  </el-table-column>
        <el-table-column  prop="loginAccount"  label="登录账号">  </el-table-column>
        <el-table-column  prop="tel"  label="联系电话">  </el-table-column>
        <el-table-column  prop="creater"  label="创建者">  </el-table-column>
        <el-table-column  prop="date"  label="创建时间">  </el-table-column>
        <el-table-column  prop="partition"  label="所在分区">  </el-table-column>
         <el-table-column  prop="roleId"  label="用户类型"> 
            <template slot-scope="scope">
              <span v-if="scope.row.roleId === 1"> 普通管理员</span>
              <span v-if="scope.row.roleId === 2"> 公司管理员</span>
              <span v-if="scope.row.roleId === 3"> 超级管理员</span>
              <span v-if="scope.row.roleId === 0"> 员工</span>
            </template>
         </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">  
        <template slot-scope="scope">
          <!-- <el-button  type="text" size="primary" @click="editUserInfo(scope.$index, scope.row)">
            <span class="editUser-span">修改信息</span>
          </el-button> -->
          <el-button plain size="mini"  @click="editUserInfo(scope.$index, scope.row)">修改信息</el-button>
           <!-- <el-button  type="text" size="primary" @click="editTable(scope.$index, scope.row)">
            <a href="#" class="danger" v-if="scope.row.status === 1"> 禁用人员</a>
            <a href="#" class="safe " > 启用人员</a>
          </el-button> -->
          <el-button type="danger" size="mini" @click="editTable(scope.$index, scope.row)" v-if="scope.row.status === 1">禁用人员</el-button>
          <el-button type="success" size="mini" @click="editTable(scope.$index, scope.row)" v-else>启用人员</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div class="my-pagination">
        <div class="block">
          <el-pagination  @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[15]" :page-size="pageSize"
            layout=" total,prev, pager, next, jumper"  :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
<!-- 修改状态 -->
    <div class="dialog-form" :visible.sync="editType">
     <el-dialog  class="dialog-form"  width="400px" title="提示" :visible.sync="editType">
      <span> {{tipWord}} 人员成功</span>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editType = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</div>
</template>

<script>
import qs from 'qs'
import getUserInfo from 'common/js/user'
import {getDate} from 'common/js/time'
import {getAllList} from 'api/user'
import {getAllId} from 'common/js/allpid'
export default {
  name: 'UserList',
  data () {
  return {
    defaultYear: new Date('2018'),
    user: {
      name: '',
      tel: '',
      startDate: '',
      endDate: '',
      allId : [],
      roleId: getUserInfo().roleId,
      page: 1,
      size: 15,
    },
    value1: '',
    value2: '',
    userData: [],
    currentPage:1,
    pageSize: 15,
    total: 0,
    editType: false,
    tipWord: '',
  }
  },
  created() {
    this.currentPage = this.page  ? parseInt(this.page): 1  
    this.user.allId = getAllId()
  },
  mounted() {
    this.getUserList()
    let time = getDate()
    this.user.endDate = `${time.year}-${time.month}-${time.date}`
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    tableRowClassName({row, rowIndex}) {   //设置表格一行的默认色
      if (rowIndex%2 == 0) {
        return 'success-row';
      }else{
        return '';
      }
      },
    getUserList(){    // 获取默认列表user/select.do
      this.currentPage = this.page ? parseInt(this.page) : 1
      let data ={}
      Object.assign(data,this.user,{startDate: '1900-01-01',endDate: '3100-01-01' || this.user.endDate})
      getAllList(qs.stringify(data)).then((res) =>{
        if (res) {
          this.total= res.total
          this.userData = res.list
          this.currentPage = this.page ? parseInt(this.page) : 1
        }else{
          console.log(res)
        }
      })
    },
    searchList(){
      let startDate = this.user.startDate === ''? '1900-01-01' : this.user.startDate
      let data ={}
      Object.assign(data,this.user,{startDate: startDate})
      getAllList(qs.stringify(data)).then((res) =>{
        if (res) {
          this.total= res.total
          this.userData = res.list
        }else{
          console.log(res)
        }
      })
    },
    editTable2(index,row){
      this.editType = !this.editType
    },
    // 禁用 user/ban.do  禁用   userId 用户id 
    editTable(index,row) {
      console.log(row.status)
      this.editType = !this.editType
      var  status  = row.status === 1 ? 0: 1   //1显示是启用 请求时禁用
        let data ={
          userId: row.userId,
          status: status
        }
      this.axios.post('/user/ban.do', qs.stringify(data)).then((res) => {
        if (res.status ===200) {
          if (row.status === 1) {
              this.tipWord = '禁用'
              status = 0
            }else{
              this.tipWord = '启用'
              status = 1
            }
            this.getUserList()
        }else{
        console.log(res)
        }
      })
    },
    // 修改用户
    editUserInfo(index,row){
      if(getUserInfo().roleId === 3) {
        this.$router.push({path:'/wrap/user/list/editSuper', query: {itemId: row.userId,row:row,page:this.currentPage}})
      }else{
        this.$router.push({path:'/wrap/user/list/editUser', query: {itemId: row.userId,page:this.currentPage,menuId:18,name:'用户列表'}})
      }
    },
    handleCurrentChange(val) {
      let startDate = this.user.startDate === ''? '1900-01-01' : this.user.startDate
      let data = {}
      Object.assign(data,this.user,{startDate: startDate,endDate:  '3100-01-01' || this.user.endDate,})
      getAllList(qs.stringify(data)).then((res) =>{
        if (res) {
          this.total= res.total
          this.userData = res.list
        }else{
          console.log(res)
        }
      })
    },
  }
};
</script>

<style lang="stylus" scoped>
// .editUser-span
//   text-decoration underline
</style>


<style lang="css" scoped>
.user-form li{
margin: 20px;
}
.startDate,.username{
  display: inline-block;
  margin-right: 50px;
}
.edit-dialog-form{ background: #fff; z-index: 400; }
.danger{
  color: red;
}
.safe{
color: green;
}
</style>
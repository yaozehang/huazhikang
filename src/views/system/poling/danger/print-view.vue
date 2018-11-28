<template>
  <div class="danger-print">
    <div class="return-btn" @click="goBcak">返回</div>
    <div class="danger-title">隐患</div>
    <div class="print-content" >
      <div class="content-item" v-for="(template,index) in templateList" :key="index">
      <p class="sub-title">隐患详情</p>
       <div class="template-container" >
        <header class="template-head">
             <div class="input-group">
            <span class="title">类型:</span>
            <span class="title title-dm">{{template.dangerDetail.typeName}}</span>
          </div>
            <div class="input-group">
            <span class="title title-dm">{{template.dangerDetail.title}}</span>
          </div>
        </header>
        <section class="template-content">
          <ul>
            <li v-for="(item,idx) in template.dangerDetail.list" :key="idx">
              <danger-item :type="parseInt(item.type)" :idx="idx" :defaultData="item.array.length ===0 ? item.defaultValue : item.array"  :result="item.array.length ===0 ? (item.editStr? [item.editStr]:[item.defaultValue]):item.items"></danger-item>
            </li>
          </ul>
        </section>
      </div>
      <p class="sub-title">处理情况</p>
       <ul class="search-container">
          <li class="input-group" >
            <span class="title">任务分区</span>
            <el-input class="inner-input" v-model="template.place" id="my-part"  @focus="" :disabled="publishFlag"></el-input>
          </li>
            <li class="input-group" >
            <span class="title">执行时间</span>
            <el-input class="inner-input" v-model="template.finishDate" id="my-part"  @focus="" :disabled="publishFlag"></el-input>
          </li>
            <li class="input-group" >
            <span class="title">审核时间</span>
            <el-input class="inner-input" v-model="template.date" id="my-part"  @focus="" :disabled="publishFlag"></el-input>
          </li>
          <li class="input-group">
            <span class="title">结束日期</span>
            <el-date-picker  class="inner-input" v-model="template.result.dealDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" :disabled="publishFlag" > </el-date-picker>
          </li>
           <div class="specail-group">
            <span class="title">处理方案</span>
            <el-input class="specail-input" type="textarea" :rows="3" v-model="template.result.dealWay" :disabled="publishFlag" ></el-input>
          </div>
          <div class="specail-group">
            <span class="title">处理后备注</span>
            <el-input class="specail-input" type="textarea" :rows="3" v-model="template.result.dealNot" disabled></el-input>
          </div>
        </ul>
        <p class="sub-title">执行人员/电话号码</p>
        <div class="danger-table">
          <el-table :data="template.result.userList" border stripe>
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column prop="userName"  label="执行人员"></el-table-column>
          <el-table-column prop="tel"  label="电话号码"></el-table-column>
          </el-table>
        </div>
        <ul class="danger-imgs clearfix">
          <li class="left-img">
            <p class="sub-title title-s">处理前图片</p>
            <ul class="img-list">
            <li v-for="(item,index) in template.dangerDetail.picUrl" :key="index">
              <img :src="item" alt="">
            </li>
          </ul>
          </li>
            <li class="right-img">
              <p class="sub-title title-s">处理后图片</p>
              <ul class="img-list">
              <li v-for="(item,index) in template.result.resultPicPath" :key="index">
                <img :src="item" alt="">
              </li>
            </ul>
          </li>
        </ul>
    </div>
    </div>
      <div class="center-input">
        <el-button type="" class="center-btn" @click="printDanger" >打印</el-button>
      </div>
  </div>
</template>

<script>
import {getPrintDangerData} from 'api/poling'
import getUserInfo from 'common/js/user'
import DangerItem from './print-item.vue'
import qs from 'qs'
export default {
  name: 'print-view',
  data() {
    return {
      hIds: this.$route.query.workIds,  //列表传过来的id
      publishFlag: true,
      templateList:[],
      personOptions: [],
      imgList: [],
      imgList2: [],
      handelParams: {
        dealWay: '',
        partitionId: [], //分区id
        pName: '', //分区名字
        endDate: '', //执行日期
        dealPserson: [],
        tel: [],
        mark: '',
        comPId: getUserInfo().comPId,
      },
    }
  },
  mounted(){
    this.getInfo()
  },
  methods:{
    goBcak(){
      this.$router.push({path: '/wrap/poling/danger',query:{menuId:12,name:'智能辅助巡检'}})
    },
    getInfo(){
      console.log(this.hIds)
      let hIds = JSON.stringify(this.hIds)
      getPrintDangerData(qs.stringify({hIds:hIds})).then((res) =>{
        console.log(res[0].dangerDetail,res)
        this.templateList = res
      })
    },
    printDanger(){
      window.print()
    }
  },
  components:{
    DangerItem
  }
};
</script>

<style lang="css" scoped>
.danger-print,.print-content{
  width: 700px;
  margin:  0 auto;
}
.content-item{
  width: 700px;
  padding-left: 10px;
  margin:  0 auto;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
.return-btn{
  height: 50px;
  line-height: 50px;
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 16px;
}
.return-btn:hover{
  cursor: pointer;
}
.danger-title{
  width: 40px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  margin: 0 auto;
}
.specail-group{
  width: 100%;
  margin: 10px 0;
}
.specail-group span{
  display: inline-block;
  text-align: left;
  width: 64px;
  margin-right: 20px;
  font-size: 16px;
  vertical-align: top;
  margin-top:30px;
}
.specail-input{
  width: 600px;
}
.sub-title{
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bolder;
}
 .center-input{
  width: 400px;
  margin: 0 auto;
}
.title-dm{
  margin-right: 20px;
}
.danger-imgs{
  width: 500px;
  margin:  0 auto;
}
.danger-imgs li{
  float: left;
  width: 250px;
}
  .img-list{
    width: 250px;
  }
  .img-list li{
    width: 135px;
    height: 120px;
    margin: 10px auto;
  }
 .title-s{
    margin-left: 20px!important;
  }
  .img-list li img{
    width: 100%;
    height: 100%;
  }
  .danger-table{
    width: 700px;
  }
</style>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
  .search-container
    width:1000px
    padding:20px 0 30px 0
    font-size:0
    li
      display:inline-block
      width:600px
      height:40px
      line-height:40px
      margin-bottom:20px
      font-size:0
      &:nth-child(odd)
        width:400px
      &:nth-child(even)
        width:600px
      &:last-child
        margin-bottom:0
      &.input-group
        .title
          display:inline-block
          text-align:left
          margin-right:20px
          width: 64px
          font-size:$font-size-medium-x
        .inner-input
          width:220px
          margin-right:10px
  .template-container
    // height:160px
    // border:1px solid $color-border
    margin:0 auto
    box-sizing:border-box
    border-radius(5px)
    .template-head
      position:relative
      line-height: 30px
      padding:5px
      // background-color:$color-background-blue
      .title
        display:inline-block
        line-height:30px
        text-indent:10px
    .template-content
      // height:100px
      // overflow-y:auto
      overflow-x:hidden
      padding:10px
      li
        position:relative
        line-height:20px
        padding:10px
        margin-bottom:10px
        // background-color:#e6e6e6
        border-radius(5px)
</style>

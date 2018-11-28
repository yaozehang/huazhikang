<template>
  <div class="print-view-content">
    <div class="return-btn" @click="goBcak">返回</div>
    <div class="print-title">
      <span>巡检计划</span>
    </div>
    <div class="print-content" v-for="(listItem,i) in templateList" :key="i">
      <p class="sub-title">
        <span class="sub-title-s">任务区域： {{listItem.position}}</span>
        <span class="sub-title-s">任务标题： {{listItem.insTitle}}</span>
      </p>
      <p class="sub-title">
        <span class="sub-title-s">执行人： {{listItem.dealPerson}}</span>
        <span class="sub-title-s">审核人： {{name}}</span>
      </p>
      <p class="sub-title">
        <span class="sub-title-s">执行时间： {{listItem.finishDate}}</span>
        <span class="sub-title-s">审核时间： {{listItem.inTime}}</span>
      </p>
      <div class="template-container" v-for="(template,index) in listItem.templates" :key="index">
        <header class="template-head">
          <div class="input-group">
            <span class="title">类型:</span>
            <span class="title title-dm">{{template.typeName}}</span>
          </div>
            <div class="input-group">
            <span class="title title-dm">{{template.title}}</span>
          </div>
        </header>
       <ul class="template-content">
        <!-- 未完成未审核 listType=== 0 已完成未审核可以查看图片1 已完成已审核可以查看图片 2-->
        <li v-for="(item,idx) in template.list" :key="idx">
          <template-item :type="parseInt(item.type)" :index="index" :idx="idx"  :defaultData="item.default" :result="item.result"  v-if="parseInt(listItem.status)===0 " :status="0" :resultList=" []"></template-item>

          <template-item :type="parseInt(item.type)" :index="index" :idx="idx" :defaultData="item.array.length ===0 ? item.defaultValue : item.array"  :resultList="item.array.length ===0 ? [item.editStr]:item.items"
          :status="1" :result =" '' " v-if="parseInt(listItem.status)=== 1 "></template-item>

          <template-item :type="parseInt(item.type)" :index="index" :idx="idx" :defaultData="item.array.length ===0 ? item.defaultValue : item.array"  :resultList="item.array.length ===0 ? (item.editStr? [item.editStr]:[item.defaultValue]):item.items"
          :status="2" :result =" '' " v-if="parseInt(listItem.status)=== 2 "></template-item> 
         
        </li>
      </ul>
        <ul class="template-foot">
          <li class="input-group" v-if="listItem.status !== 0" style="margin-bottom:10px;">
            <span class="title title-s">巡检结果</span>
            <span class="squre-logo" v-if="template.isHaveAqyh === true">●</span>
            <span class="squre-logo" v-if="template.isHaveAqyh === false">○</span>
            <span class="title title-s">存在隐患</span>
             <span class="squre-logo" v-if="template.isHaveAqyh === false">●</span>
             <span class="squre-logo" v-if="template.isHaveAqyh === true">○</span>
            <span class="title title-s" >不存在隐患</span>
            <!-- <span class="show-img" @click="showImg(template)" v-if="listItem.status !== 0"> 查看图片 </span> -->
          </li>
          <li class="input-group" v-if="listItem.status !== 0" style="margin-bottom:10px;">
            <span class="title title-s">审核结果</span>
            <span class="squre-logo" v-if="template.isHarm === true">●</span>
            <span class="squre-logo" v-if="template.isHarm === false">○</span>
            <span class="title title-s">存在隐患</span>
             <span class="squre-logo" v-if="template.isHarm === false">●</span>
             <span class="squre-logo" v-if="template.isHarm === true">○</span>
            <span class="title title-s" >不存在隐患</span>
          </li>
          <li class="input-group" v-if="listItem.status !== 0">
            <span class="title title-reson-s">审核依据</span>
            <el-input class="inner-input my-input2" type="textarea" :rows="3" placeholder="请输入审核依据" v-model="template.reason"></el-input>
          </li>
        </ul>
      <p class="sub-title">图片列表</p>
      <!-- <p class="sub-title" v-if="template.picUrl.length ===0">暂无图片</p> -->
      <ul class="img-list clearfix" >
        <li v-for="(item,x) in template.picUrl" :key="x">
          <img :src="item" alt="">
        </li>
      </ul>
      </div>
    </div>
    <div class="center-input">
      <el-button  class="center-btn" @click="printDanger" >打印</el-button>
    </div>
  </div>
</template>

<script>
import {getPrintData} from 'api/poling'
import templateItem from './print-item.vue'
import getUserInfo from 'common/js/user'
import qs from 'qs'
export default {
  name: 'print-view',
  data() {
    return {
      listType: 0,
      workIds : this.$route.query.workIds,  //列表传过来的id
      imgList: [],
      templateList:[],
      name:getUserInfo().username
    };
  },
  mounted(){
    this.getPrintInfo()
  },
  methods:{
    goBcak(){
      this.$router.push({path: '/wrap/poling/plan1',query:{menuId:12,name:'智能辅助巡检'}})
    },
    getPrintInfo(){
      console.log(this.workIds)
      let data={
        workIds:JSON.stringify(this.workIds),
        inspectionId: JSON.stringify(getUserInfo().inspectionId),
      }
      getPrintData(qs.stringify(data)).then((res) =>{
        console.log(res.table)
        let temp = []
        let table = []
        res.table.map((i,x)=>{
          if(i.audit === 0 && i.status === '未完成'){   //未审核
            table.push({templates:i.templates,status:0,insTitle:i.insTitle,position:i.position,dealPerson:i.dealPerson,
              finishDate:i.finishDate,inTime:i.inTime,reason:i.reason})
          }else if(i.audit === 0 && i.status === '已完成'){   //未审核
            table.push({templates:i.templates,status:1,insTitle:i.insTitle,position:i.position,dealPerson:i.dealPerson,
            finishDate:i.finishDate,inTime:i.inTime,reason:i.reason})
          }else if(i.audit === 1 && i.status === '已完成'){   //审核
            table.push({templates:i.templates,status:2,insTitle:i.insTitle,position:i.position,dealPerson:i.dealPerson,
            finishDate:i.finishDate,inTime:i.inTime,reason:i.reason})
          }
        })
        this.templateList = table
        console.log(this.templateList)
      })
    },
    printDanger(){
      window.print()
    }
  },
  components:{
    templateItem
  }
};
</script>

<style lang="css" scoped>
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
.print-title{
  width: 80px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  margin: 0 auto;
}
.title-dm{
    margin-right: 20px;
  }
.print-content{
  width: 900px;
  margin:5px auto;
  border: 1px solid #ccc;
  padding-left: 10px;
}
.template-content{
  margin: 20px 0;
}
.img-list{
    width: 480px;
/*     margin: 0 auto; */
  }
.img-list li{
  float: left;
  width: 135px;
  height: 120px;
  margin: 10px 10px;
  /*border:1px solid #409EFF;*/
}
.img-list li img{
  width: 100%;
  height: 100%;
}
.sub-title{
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bolder;
}
.sub-title-s{
  font-weight: normal!important;
  margin-right: 20px;
}
 .center-input{
  width: 400px;
  margin: 0 auto;
}
.my-input2{
  width: 552px!important;
}
.template-foot{
  padding-left: 20px;
}
.template-foot .inner-input{
  min-height: 75px;
margin-bottom: 10px!important;
}
.title-reson-s{
  vertical-align: top;
  display: inline-block;
  width: 56px;
  margin-right:20px;
  margin-top: 30px;
}
.title-s{
  margin-right: 20px;
}
.squre-logo{
  display: inline-block;
  font-size: 20px;
  height: 19px;
  line-height: 19px;
}
.show-img{
margin-left: 30px;
}
.title-reson{
  vertical-align: top;
  display: inline-block;
   margin-right:10px;
   padding-left: 10px;
   margin-top: 20px;
}
</style>
<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
    .template-container
      // height:160px
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

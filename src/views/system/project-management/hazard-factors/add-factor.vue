<template>
  <div class="factors-form">
      <ul class="form-list">
        <li class="clearfix" v-for="(item,index) in factors " :key="index">
          <div class="list-item">
            <span class="title"> {{item.name}} </span>
            <input v-model="item.value"></input>
          </div>
          <div class="list-other">
             <span class="title"> 单位</span>
            <input v-model="item.unit" ></input>
          </div>

        </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Factors',
  props: {
    factors: Array
  },
  data () {
    return {
    }
  },
  watch:{
    'factors'(){

    }
  }
}
</script>

<style lang="css" scoped>
.form-list{
  z-index: 300;
}
.form-list li{
   margin-bottom: 20px;
   width: 100%;
}
.form-list li .list-item{
float: left;
width: 70%;
font-size: 14px;
margin-right: 21px;
text-align: right;
}
.form-list li .list-item input{
width: 40%;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.form-list input{
  outline: none;
  padding-left: 5px;
 height: 30px;
 line-height: 30px;
 border : 1px solid #d9d9d9;
}
.list-other{
float: left;
width: 23%;
font-size: 14px;
}
.list-other input{
width: 40%;
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.form-list .title{
  margin-right: 2px;
}

</style>
<style>
@media screen and (max-width: 1920px) {
.form-list{
  margin-left: -155px;
}
}
@media screen and (max-width: 1554px) {
.form-list{
  /*margin-left: -100px;*/
  margin-left: 20px;
  }
}
@media  screen and (max-width: 1279px) {
.form-list{
  margin-left: 80px;
}
}
  @media screen and (max-width: 1280px) {
.form-list{
  margin-left: 90px;
}
.form-list li .list-item{
width: 100%;
font-size: 14px;
text-align: right;
}
.form-list li .list-item input{
  width: 50%;
}
.form-list input{
  outline: none;
  padding-left: 5px;
 height: 30px;
 line-height: 30px;
}
.list-other{
width: 100%;
font-size: 14px;
}
.list-other input{
  width: 20%;
}
.form-list .title{
  margin-left: -20px;
}
}
</style>
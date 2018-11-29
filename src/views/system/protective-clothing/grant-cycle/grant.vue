<template>
  <div class="container-grant clearfix">
          <div class="add-form-main">
        <el-form :model="Form"  ref="Form"  class="demo-form-inline" label-width="120px" style="">
          <el-form-item label="部门岗位"  >
            <el-input v-model="Form.depart" placeholder="" disabled  id="depart2" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="产品分类"  >
            <el-input v-model="Form.ProductType" placeholder="" disabled  style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="护具名称" >
            <el-input v-model="Form.procetName" placeholder="" disabled  style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="部门剩余" >
            <el-input v-model="Form.surplusNum" placeholder="" disabled  style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="发放数量" >
            <el-input v-model="Form.grantNum" placeholder="" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="发放人员" >
            <el-input v-model="Form.grantPerson" placeholder="" disabled  style="width:200px;"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="add-table">   
        <!-- curPosId   id  gpGender  gpAge-->
        <el-table :data="tableDataT"  stripe style="width: 100%;" :row-style="rowStyle" :header-cell-style="rowStyle" max-height="500" ref="multipleTable"  >
        <el-table-column prop="gpGetMan"  label=""> </el-table-column>
        <el-table-column prop="gpGetMan"  label="姓名" > </el-table-column>
        <el-table-column  prop="gpGetTel" label="电话" > </el-table-column>
        <!-- <el-table-column prop="loseDays" label="距离时效天数"> </el-table-column>  -->
    </el-table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'grant',
  props: {
    tableDataT: Array,
    Form: Object,
    departData:Array,
    departId: Number
  },

  data () {
    return {

    }
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
  }
};
</script>

<style lang="css" scoped>
.add-form-main{
  width: 40%;
  float: left;
  min-height: 400px;
  margin-right: 5%;
}
.add-table{
  width: 55%;
  float: left;
  min-height: 400px;
}
</style>
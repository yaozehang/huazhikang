<template>
  <div class="add-fileType" :visible.sync="IsAdd">
   <el-dialog  class="dialog-form" title="新增类型"  width="30%" :visible.sync="IsAdd">
    <el-form :model="addForm" label-width="80px" ref="addForm">
      <el-form-item label="类型名称" class="dialog-item">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" >
        <el-input v-model="addForm.remark" auto-complete="off"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer my-footer-bths" >
        <el-button type="primary" @click="addType(addForm)">确 定</el-button>
        <el-button @click="cancleAdd(addForm)">取 消</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
export default {
  name: 'AddForm',
  props: {
    IsAdd: Boolean,
    addForm: Object,
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
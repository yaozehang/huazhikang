<template>
	<div class="demo">
	   <table width="800px" style="border:1px solid #ccc;">
	   	 <tr>
	   	  <th>作业场所名称</th>
	   	  <th>职业病危害因素名称</th>
	   	  <th>接触人数（可重复）</th>
	   	  <th></th>
	   	  <th>接触人数（不重复）</th>
	   	 </tr>
	   	 <tbody v-for="(item,index) in parentLength">
  	   	 <tr>
  	   	 	<td :rowspan="tableData[index].list.length+2"><el-input v-model="tableData[index].address"></el-input></td>
  	   	 	<td><el-input v-model="tableData[index].list[0].name"></el-input></td>
  	   	 	<td><el-input v-model="tableData[index].list[0].num"></el-input></td>
  	   	 	<td :rowspan="tableData[index].list.length+1"><i class="el-icon-remove-outline"></i></td>
  	   	 	<td :rowspan="tableData[index].list.length+2"><el-input v-model="tableData[index].num"></el-input></td>
  	   	 </tr>
  	   	 <tr v-for="(item,idx) in tableData[index].list" v-if="idx!==0">
  	   	 	<td><el-input v-model="tableData[index].list[idx].name"></el-input></td>
  	   	 	<td><el-input v-model="tableData[index].list[idx].num"></el-input></td>
  	   	 </tr>
  	   	 <tr>
  	   	 	<td colspan="3"><i class="el-icon-circle-plus-outline" @click="Add2(index)"></i></td>
  	   	 </tr>
	   	 </tbody>
	   	 <tr>
	   	 	<td colspan="5"><i class="el-icon-circle-plus-outline" @click="Add1"></i></td>
	   	 </tr>
	   </table>
     <el-button type='primary' @click="onClick">click</el-button>
	</div>
</template>

<script>
export default {
  data () {
    return {
      parentLength: 1,
      tableData: [
        {
          address: '',
          list: [{
            name: '',
            num: ''
          }],
          num: ''
        }
      ]
    }
  },
  methods: {
    Add1() {
      this.parentLength++
      this.tableData.push({
        address: '',
        list: [{
          name: '',
          num: ''
        }],
        num: ''
      })
    },
    Add2(index) {
      this.tableData[index].list.push({
        name: '',
        num: ''
      })
    },
    onClick() {
      console.log(this.tableData)
    }
  }
}
</script>

<style lang="stylus" scoped>
 table
   border:1px solid #ccc
   tr
   	border-bottom:1px solid #ccc
   	line-height:40px
   	text-align:center
   	th,td
   	  border-right:1px solid #ccc
   	  vertical-align:middle
</style>
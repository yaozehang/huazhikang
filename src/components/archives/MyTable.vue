<template>
   <div class="my-table" >
   <table style="width:100%">
    <tbody>
       <tr>
        <th v-for="(item,index) in tableDate.headData" :key="index">{{item}}</th>
      </tr>
      <tr v-for="(i, x) in tableDate.rows " :key="x">
        <td v-for="(rowItem,idx) in i.rowsData" :key="idx" >
          <input v-model="rowItem.name" ></input></td>
        </tr>
        <tr class="rows-add-td">
          <td :colspan="6"><i class="el-icon-circle-plus-outline" @click="addRow"></i></td>
        </tr>
    </tbody>
   </table>
  </div>
</template>

<script>
const item = { name: '' }
export default {
  props: {
    tableDate: Object,
  },
  data () {
    return {
      item: item,
      formData: {
        receiveId: '',
        department: '',
        applyTime: '',
        useTime: '',
        acombined: 0,
        applyItemsList: [],
        state: '',
        userName: '',
        userId: ''
      },
      rowLength: 4,
      itemsList: [{
        reason: '',
        number: '',
        forecast_unitPrice: '',
        total_price: '',
        note: ''
      }],
      showFlag: false,
      headmasterList: []
    }
  },
  methods: {
    rowStyle() {
      return 'text-align: center'
    },
    addRow() {
      this.tableDate.rows.push({
        rowsData: Array(this.tableDate.headData.length).fill(this.item)
      })
      this.$emit('addRow', this.tableDate)
    },
  }
}
</script>

<style lang="css" scoped>

</style>
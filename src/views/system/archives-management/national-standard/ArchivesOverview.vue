<template>
  <el-card style="margin-bottom:20px;">
    <div class="content-main">
        <router-view></router-view>
      </div>
  </el-card>
</template>

<script>
export default {
  name: 'ArchivesOverview',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.content-main {
  padding-right: 20px;
}
</style>
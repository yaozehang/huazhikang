<template>
	<div class="table-title">
			<span class="title">{{title}}</span>
	 </div>
</template>

<script>
export default {
	props: {
		title: {
			default: '',
      type: String
		}
	}
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.table-title
  width:100%
  height:40px
  line-height:40px
  border-bottom:1px solid $color-background-blue
  .title
    display:inline-block
    padding:0 20px
    background-color:#009EFF
    color:#fff
    border-radius(5px)
    border-bottom-left-radius:0
    border-bottom-right-radius:0
    font-size:$font-size-large
    text-align:center
</style>
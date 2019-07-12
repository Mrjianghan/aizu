<template>
  <div class="greyContainer" :style="{width:width+'px'}">{{text}}</div>
</template>
<script>
    export default {
		props:{
			text:{
				type:String,
				default:'取消'
			},
			width:{
				default:90
			}
		},
    }
</script>
<style scoped lang="scss">
	.greyContainer {
		background-color:  #fff;
		border-radius: 20px;
		height: 40px;
		color: #a4aabc;
		box-sizing: border-box;
		box-shadow: $greyShadow;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		font-size: 13px;
	}
</style>
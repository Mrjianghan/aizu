<template>
<div class="redContainer" :style="{width:width+'px'}">{{text}}&nbsp;<i class="icon-xiala- iconfont" v-if="showArrow"></i></div>
</template>
<script>
    export default {
		props:{
			text:{
				type:String,
				default:'确定'
			},
			width:{
				default:90
			},
			showArrow:{
				type:Boolean,
				default:false
			}
		},
    }
</script>
<style scoped lang="scss">
	.redContainer {
		background-color:  $mainRed;
		border-radius: 20px;
		height: 40px;
		color: #fff;
		box-sizing: border-box;
		box-shadow: $redShadow;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		font-size: 13px;
		.iconfont {
			font-size: 8px;
		}
	}
</style>
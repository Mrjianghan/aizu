<template>
  <div class="delContainer"> 	  
      <div class="delBgCon">
		<div class="delConfirm">
			<div class="delConfirmHeader">{{head}}</div>
			<div class="delConfirmCon">
				<div class="confirmDel btnCommon" @click="delConAction()">确定</div>
				<div class="cancelDel btnCommon" @click="delCancelAction()">取消</div>
			</div>
		</div>
	</div>	 
  </div>
</template>
<script>
    export default {
		props:{
			delCon:Function,
			delCancel:Function,
			head:{
				default: '确定要删除吗？'
			}
		},
		computed:{
			delConAction:function(){
				return this.delCon;
			},
			delCancelAction:function(){
				return this.delCancel;
			},
		},
    }
</script>
<style scoped lang="scss">
	.delBgCon {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		z-index: 20000;
		.delConfirm {
			border-radius: 10px;
			width: 300px;
			height: 140px;
			background-color: #fff;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			padding: 26px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			justify-content: space-between;				
			.delConfirmHeader {
				font-size: 14px;
				color: #2a2f48;
			}
			.btnCommon {
				width: 90px;
				border-radius: 20px;
				text-align: center;
				line-height: 40px;
				font-size: 13px;
				cursor: pointer;
			}
			.delConfirmCon {
				height: 40px;
				display: flex;
				flex-direction: row;
				box-sizing: border-box;
				padding-left: 10px;
				padding-right: 10px;
				justify-content: space-between;
				.confirmDel {
					background-color: $mainRed;
					color: #fff;
					box-shadow: $redShadow;
				}
				.cancelDel {
					background-color: #fff;
					color: $mainTextColor;
					box-shadow: $greyShadow;
				}
			}
		}
	}
</style>
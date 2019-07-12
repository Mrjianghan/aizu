<template>	
  	<div class="fourthPartContainer"> 
		<div class="header">通告及送达相关信息</div>
		<div class="leftFlex marBottom limitWidth flex">
			<div class="title">地址</div><input type="text" v-model.trim="noticeAddress" placeholder="请输入" @change="noticeAddressChange">
		</div>
		<div class="leftFlex marBottom limitWidth flex">
			<div class="title">收件人</div><input type="text" v-model.trim="noticeReceiver" placeholder="请输入" @change="noticeReceiverChange">
		</div>
		<div class="leftFlex limitWidth marBottom flex">								
			<div class="title">邮政编码</div><input type="text" v-model.trim="noticeCode" placeholder="请输入" @change="noticeCodeChange">
		</div>
		<div class="leftFlex limitWidth marBottom flex">								
			<div class="title">联系电话</div><input type="text" v-model.trim="noticePhone" placeholder="请输入" @change="noticePhoneChange">
		</div>
		<el-dialog  title="确认修改" class="smallDiagCon" :visible.sync="dialogVisible" :close-on-click-modal="false">
		  	<span>确认修改？</span>
		  	<span slot="footer" class="dialog-footer">
				<div class="diagBtnConSpecial">
			  		<RedBtn @click.native="confirmDialogVisible"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelDialogVisible"></GreyBtn>
				</div>
			</span>
		</el-dialog>
  	</div>
</template>
<script>
	import { required,numeric,minLength,maxLength } from 'vuelidate/lib/validators';	
    export default {
		validations: {
			noticePhone:{
				required,		
				numeric,
				minLength:minLength(11),
				maxLength:maxLength(11),
			}			
		},
        data(){
			return {	
				dialogVisible:false,
				noticeAddress:'',
				noticeReceiver:'',
				noticeCode:'',
				noticePhone:'',
				storeInput:{
					noticePhone:'',
				}
			}
		},
		mounted(){		
		},
		methods:{	
			confirmDialogVisible(){
				this.dialogVisible = false;
			},
			cancelDialogVisible(){
				this.dialogVisible = false;
			},
			noticeAddressChange(){
				this.dialogVisible = true;
			},
			noticeReceiverChange(){
				this.dialogVisible = true;
			},
			noticeCodeChange(){
				this.dialogVisible = true;
			},
			noticePhoneChange(){				
				this.$v.noticePhone.$touch();				
				if(this.$v.noticePhone.$invalid){
                    this.$message.error('格式错误。');
					this.noticePhone = this.storeInput.noticePhone;
				}else{
                    this.dialogVisible = true;
					this.trackFlag = '';
				}
			},
		},
    }
</script>
<style scoped lang="scss">
	.fourthPartContainer {
		.header {
			font-size: 16px;
			color: #2a2f48;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.leftFlex {
			flex-wrap: nowrap;
			justify-content: flex-start;
			.title {
				color: #a4aabc;
				font-size: 13px;
				width: 60px;
				margin-right: 10px;
				margin-left: 10px;
			}
		}
		.limitWidth {
			width: 320px;
			border: 2px solid #efeef3;
			height: 40px;
			box-sizing: border-box;
			input {
				border: none;
				height: 34px;
				width: 200px;
			}
		}
		.marBottom {
			margin-bottom: 16px;
		}
	}
</style>
<style lang="scss">
	.fourthPartContainer {
		.el-dialog {
			width: 540px;
			height: 210px !important;
		}	
		.diagBtnConSpecial {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-content: center;
			align-items: center;
			.marLeft {
				margin-left: 20px;
			}
		}
	}
</style>
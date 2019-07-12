<template>	
  	<div class="secondPartContainer"> 		
		<div class="header">租金及押金</div>
		<div class="leftFlex limitWidth marBottom flex">								
			<div class="title">证明文件</div>
			<el-select v-model="houseInfoProveType" placeholder="请选择" @change="houseProveChange">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</div>
		<div class="leftFlex marBottom limitWidth flex">
			<div class="title">证明编号</div><input type="text" v-model.trim="houseInfoProveNo" placeholder="请输入" @change="houseProveNoChange">
		</div>
		<div class="leftFlex marBottom limitWidth flex">
			<div class="title">房屋来源证明名称</div><input type="text" v-model.trim="houseInfoHouseResource" placeholder="请输入" @change="houseResourceChange">
		</div>
		<div class="leftFlex limitWidth marBottom flex">								
			<div class="title">所有权人姓名</div><input type="text" v-model.trim="houseInfoOwner" placeholder="请输入" @change="houseOwnerChange">
		</div>
		<div class="leftFlex limitWidth marBottom flex">								
			<div class="title">是否抵押</div>
			<el-select v-model="firstBlock.needPledge" placeholder="请选择" @change="mortgageTypeChange">
				<el-option label="是" value="true"></el-option>
				<el-option label="否" value="false"></el-option>
			</el-select>
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
	import { required,numeric } from 'vuelidate/lib/validators';	
    export default {
        data(){
			return {	
				houseInfoProveType:'',
				houseInfoProveNo:'',
				houseInfoHouseResource:'',
				houseInfoOwner:'',
				houseInfoMortgage:'',
				dialogVisible:false,
				trackFlag:'',
				storeInput:{
					houseInfoProveNo:'',
					houseInfoHouseResource:'',
					houseInfoOwner:'',	
				},
                firstBlock:{},
			}
		},
		validations: {
			houseInfoProveNo:{
				required,		
				numeric
			},
			houseInfoHouseResource:{
				required,				
			},
			houseInfoOwner:{
				required,				
			},
		},
		mounted(){	
            this.initRequest();
		},
		methods:{	
            initRequest(){
                this.Digital.aesDecrypt.bind(this)();
                let data1 = {
                    contractId:this.routeQuery.id
                }; 
                this.ApiLists[10034](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { message,data,success  } = layer1;
                    if( success ){
                        console.log(data);
                        this.firstBlock = data;
                        this.firstBlock.needPledge = String(data.needPledge);
                    }else{
                       this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
			confirmDialogVisible(){
				this.dialogVisible = false;
			},
			cancelDialogVisible(){
				this.dialogVisible = false;
			},
			houseProveChange(){	
				this.dialogVisible = true;
				this.trackFlag = '';
			},
			houseProveNoChange(){
				this.$v.houseInfoProveNo.$touch();				
				if(this.$v.houseInfoProveNo.$invalid){
				   this.$message.error('格式错误。');
					this.houseInfoProveNo = this.storeInput.houseInfoProveNo;
				}else{
				   this.dialogVisible = true;
					this.trackFlag = '';
				}
			},
			houseResourceChange(){				
				this.$v.houseInfoHouseResource.$touch();				
				if(this.$v.houseInfoHouseResource.$invalid){
				   this.$message.error('格式错误。');
					this.houseInfoHouseResource = this.storeInput.houseInfoHouseResource;
				}else{
				   this.dialogVisible = true;
					this.trackFlag = '';
				}				
			},
			houseOwnerChange(){
				this.$v.houseInfoOwner.$touch();				
				if(this.$v.houseInfoOwner.$invalid){
				   this.$message.error('格式错误。');
					this.houseInfoOwner = this.storeInput.houseInfoOwner;;
				}else{
				   this.dialogVisible = true;
					this.trackFlag = '';
				}
			},
			mortgageTypeChange(){
				this.dialogVisible = true;
				this.trackFlag = '';
			},
		},
    }
</script>
<style scoped lang="scss">
	.secondPartContainer {
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
<style  lang="scss">
	.secondPartContainer {
		.el-input__inner {
			border: none !important;
			height: 36px;
		}
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
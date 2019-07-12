<template>
  <div class="newDeliveryOrderCon">
	  <div class="inner">
		  <div class="top">
			   <div class="topHeader">
				  <div class="topHeadLeft" @click="goBack">
					  <i class="icon-fanhui- iconfont"></i>&nbsp;<span>  返回</span>
					</div>
				  <div class="topHeadRight">
					  <div class="print" @click="send">提交</div>
					</div>
				</div>
			  <div class="flexCon">
				  <div class="left">
					  <div class="repairInfoCon">
						<div class="repairInfoFirst">
							<span class="repairInfoTitle">配送单信息</span>
<!--							<span class="repairInfoStatus">[状态：待接收]</span>-->
						</div>
						<div class="repairInfoDetailCon">
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">合同号</div>
								<div class="repairInfoDetailContent">NB100300K4</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">类型</div>
								<div class="repairInfoDetailContent">收房</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">登记人</div>
								<div class="repairInfoDetailContent">叽叽叽</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">登记时间</div>
								<div class="repairInfoDetailContent">2018-09-07  08:30:07</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">审核人</div>
								<div class="repairInfoDetailContent">叽叽叽</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">审核时间</div>
								<div class="repairInfoDetailContent">2018-09-07  08:30:07</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">小区</div>
								<div class="repairInfoDetailContent">兴宁巷83号</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">地址</div>
								<div class="repairInfoDetailContent">兴宁巷83号533室</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">业务员</div>
								<div class="repairInfoDetailContent">￥0.00</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">业务员电话</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">二次添置理由</div>
								<div class="repairInfoDetailContent">
									<el-input
									  type="textarea"
									  :rows="4"
									  placeholder="请输入内容"
									  v-model.trim="textarea"
										:resize="'none'">
									</el-input>
								</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">联系人</div>
								<div class="repairInfoDetailContent limitSelect">
									<el-select v-model="value" placeholder="请选择">
										<el-option
										  v-for="item in options"
										  :key="item.value"
										  :label="item.label"
										  :value="item.value">
										</el-option>
									  </el-select>
								</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">备注</div>
								<div class="repairInfoDetailContent">
									<el-input
									  type="textarea"
									  :rows="4"
									  placeholder="请输入内容"
									  v-model.trim="textarea2"
										:resize="'none'">
									</el-input>
								</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">供应商</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">供应商联系方式</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">供应系人</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">供应系人电话</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
						</div>
					</div>
					</div>
				</div>
		</div>
		  <div class="middle">
			  <div class="middleTitle">原有物资</div>
			  <div class="tableContent"  :style="{width:computed}">
				  <el-table :data="startTable"  tooltip-effect="dark"  style="width: 100%"   :height="'startTableHeight'"  stripe>
                      <el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
                      <el-table-column  label="物品名称" show-overflow-tooltip>
                          <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
						<el-table-column  label="新旧程度" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
						<el-table-column  label="规格型号" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
						<el-table-column  label="品牌" show-overflow-tooltip>
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
						<el-table-column  label="产品类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="数量" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="房东承担" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="价格" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="备注" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
				</el-table>
			</div>
		</div>
		  <div class="bottom">
			  <div class="bottomFlex">
				  <div class="bottomTitle">新增物资</div>
				  <div class="addBg" @click="showAdd"><i class="icon-tianjia- iconfont" ></i></div>
			  </div>
			  <div class="tableContent" :style="{width:computed}">
				  <el-table  ref="newTable"  :data="newTable"  tooltip-effect="dark"  style="width: 100%"   :height="'newTableHeight'"  stripe>
						<el-table-column  label="物品名称" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="新旧程度" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="规格型号" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="品牌" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="产品类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="数量" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="归属" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="备注" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="预计单价" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="责任人" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="固资编号" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="配送日期" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="预计总额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="采购总额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
				</el-table>
			</div>
		</div>
		</div>
		<el-dialog title="新增" :visible.sync="addVisible" class="diagCon trackInput" :close-on-click-modal="false">
			<el-form :model="addform" :rules="addrules" ref="addform" label-width="100px">
				<div class="scrollContainer">
					 <el-form-item label="物品名称" class="specialForm" prop="name">
						  <el-input v-model="addform.name" placeholder="请输入物品名称" v-if="showNormal" class="specialSet"></el-input>
						 <el-select v-model="addform.name" placeholder="请选择活动区域" @change="furnitureChange(addform.name)" v-else>
                              <el-option
                                v-for="item in selectFurnitureArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>  
						  </el-select>
						 <span class="addOther" @click="changeNormal('addform')" v-text="normalText"></span>
						</el-form-item>
					<el-form-item label="产品类型" prop="type">
						<el-select v-model="addform.type" placeholder="请选择">                            
							  <el-option
                                v-for="item in linkageArr1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>  
						  </el-select>
					  </el-form-item>
                    <el-form-item label="供应商" prop="supplier">
						<el-select v-model="addform.supplier" placeholder="请选择">
                            <el-option
                            v-for="item in supplierArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>                               
						  </el-select>
					  </el-form-item> 
					<el-form-item label="产品规格" prop="productSpecifications">
						<el-input v-model="addform.productSpecifications"></el-input>
					  </el-form-item>
					<el-form-item label="品牌" prop="brand">
						<el-input v-model="addform.brand"></el-input>
					  </el-form-item>
					<el-form-item label="新旧程度" prop="degree">
						<el-radio-group v-model="addform.degree">
							<el-radio :label="'优'">优</el-radio>
							<el-radio :label="'良'">良</el-radio>
							<el-radio :label="'劣'">劣</el-radio>
						  </el-radio-group>
					  </el-form-item>
					<el-form-item label="归属" prop="ascription">
						<el-radio-group v-model="addform.ascription">
							<el-radio :label="'LANDLORD'">房东</el-radio>
							<el-radio :label="'COMPANY'">公司</el-radio>
						  </el-radio-group>
					  </el-form-item>
					<el-form-item label="数量" prop="number">
						<el-input v-model="addform.number"></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" :rows="3" resize="none" v-model="addform.remark"></el-input>
					  </el-form-item>					
					<el-form-item label="预计单价" prop="price">
						<el-input v-model="addform.price"></el-input>
					  </el-form-item>
					<el-form-item label="固资编号" prop="serialNo">
						<el-input v-model="addform.serialNo"></el-input>
					  </el-form-item>
					<el-form-item label="配送日期" prop="date">						
						<el-date-picker							
						  v-model="addform.date"
						  align="right"
						  type="date"
						  placeholder="选择日期"
						  :picker-options="pickerOptions2">
						</el-date-picker>
					  </el-form-item>
					<el-form-item label="预计总额" prop="totalAmount">
						<el-input v-model.trim="addform.totalAmount"></el-input>
					  </el-form-item>
					<el-form-item label="采购总额" prop="purchasePrice">
						<el-input v-model.trim="addform.purchasePrice"></el-input>
					  </el-form-item>
					<el-form-item label="责任人" prop="owner">
						<el-input v-model.trim="addform.owner"></el-input>
					  </el-form-item>						
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveAdd"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>	  
		<transition name="popDel">
			<Del v-if="showSingleDelete"  :delCon="quitSingleConfirm" :delCancel="quitSingleCancel"></Del>
		</transition>	  
  </div>
</template>
<script>
	import { mapGetters } from 'vuex'	
    export default {
		computed: {
			...mapGetters([
                'tagsLists',
				'tagActive'
			])
		  },
		watch:{
			'startTable':function(nval,val){
				this.Digital.setTableHeight.bind(this)('startTableHeight',(nval.length+1)*50); 
			},
			'newTable':function(nval,val){
				this.Digital.setTableHeight.bind(this)('newTableHeight',(nval.length+1)*50); 
			},			
		},
        data(){
			return {	
                supplierArr:this.StateData.supplierArr,
                linkageArr1:[],
                selectFurnitureArr:[],
				showNormal:false,				
				normalText:'添加其他',				
				computed:'auto',
				showSingleDelete:false,
				startTable:[
					{name:'me'}
				],
				newTable:[	
					{name:'me'},
					{name:'me'},
					{name:'me'},
					{name:'me'}
				],
				startTableHeight:50,
				newTableHeight:50,
				addVisible:false,
				form:{},
				rules:{},
				addform:{},
				addrules:{},
				textarea2:'',
				textarea:'',
				value:'',
				options:[],
				pickerOptions2: this.DatePick.date,
			}
		},
		mounted(){		
			this.initTable();
            this.initselectFurnitureArr();
		},
		methods:{
			initTable(){
                this.Digital.tableWidthController.bind(this)(310,'computed');  
			},
            initselectFurnitureArr(){
                this.selectFurnitureArr  = this.StateData.furnitureArr;
            },
            furnitureChange(val){
                this.linkageArr1 = this.StateData.matchFurniture[val];
                console.log(val,this.linkageArr1);
            },
			changeNormal(str){
                function clear(){
                    this.linkageArr1 = []; 
                    this[str].name='';
                    this[str].type='';
                };
				if(this.showNormal){
					this.showNormal = false;
					this.normalText = '添加其他';
                    clear.bind(this)();
				}else{
					this.showNormal = true;
					this.normalText = '返回';
                    clear.bind(this)();
				}
			},
			quitSingleConfirm(){
				this.showSingleDelete = false;
				this.Success.deleteSuccess();
//				this.Err.netErr();
			},
			quitSingleCancel(){
				this.showSingleDelete = false;
			},
			saveAdd(){
				this.addVisible = false;
				this.Success.saveSuccess();
//				this.Err.netErr();
			},
			cancelAdd(){
				this.addVisible = false;
			},
			showAdd(){
				this.addform = {};
				this.addVisible = true;
			},
			popDelete(row){
				this.showSingleDelete = true;
			},
			goBack(){
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/deliveryOrderManage',{id:1});  
			},
			send(){
                
			},
		},
    }
</script>
<style scoped lang="scss">
.addOther {
	margin-left: 10px;
	color: $mainRed;
	cursor: pointer;
}
.newDeliveryOrderCon {
	box-sizing: border-box;
	padding: 24px;
	padding-bottom: 50px;
}
.limitSelect {
	width: 189px;
}
.inner {
	background-color: #fff;
	border-radius: 10px;
	padding: 24px;
}
.top {
	.repairInfoFirst {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		margin-bottom: 30px;
	.repairInfoTitle {
		font-weight: 600;
		font-size: 16px;
	}
	.repairInfoStatus {
		font-size: 16px;
		color: $mainRed;
		margin-left: 10px;
		font-weight: 600;
	}
}
.repairInfoDetailCon {
	.repairInfoDetailLists {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		margin-bottom: 20px;
	}
	.repairInfoDetailTitle {
		color: #a4aabc;
		font-size: 13px;
		width: 80px;
		text-align: right;
	}
	.repairInfoDetailContent {
		font-weight: 600;
		font-size: 14px;
		margin-left: 20px;
	}
}
.topHeader {
	height: 40px;
	margin-bottom: 24px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	.topHeadLeft {
		width: 120px;
		height: 40px;
		line-height: 40px;
		border-radius: 20px;
		background-color: #ffefef;
		color: $mainRed;
				text-align: center;
				cursor: pointer;
				span {
					vertical-align: 1px;
					font-size: 12px;
					font-weight: 600;
				}
			}
			.topHeadRight {
				.print {
					width: 90px;
					height: 40px;
					line-height: 40px;
					color: #fff;
					background-color: $mainRed;
					text-align: center;
					border-radius: 20px;
					font-size: 13px;
					cursor: pointer;
					box-shadow: $redShadow;
				}
			}
		}
		.flexCon {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:flex-start;
			.left {
				width: 50%;
			}
			.right {
				width: 50%;
			}
		}
	}
	.middle {
		margin-top: 40px;
		margin-bottom: 40px;
		.middleTitle {
			margin-bottom: 30px;
			font-weight: 600;
			font-size: 16px;
			margin-left: 30px;
		}
	}
	.diagBtnCon {
		margin-top: 30px;
		margin-bottom: 30px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
		align-content: center;
		align-items: center;
		.marLeft {
			margin-left: 20px;
		}
	}
	.scrollContainer {
		overflow-y: scroll;
		height: 370px;
	}
	.bottom {
		.bottomTitle {
			font-weight: 600;
			font-size: 16px;
			margin-bottom: 30px;
			margin-left: 30px;
		}
		.bottomFlex {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.addBg {
				height: 30px;
				width: 30px;
				background-color: $mainRed;
				border-radius: 15px;
				line-height: 30px;
				text-align: center;
				color: #fff;
				box-shadow: $redShadow;
				cursor: pointer;
				box-shadow: 0px 2px 10px 5px #ffecec !important;
			}
		}
}		
</style>
<style lang="scss">
.newDeliveryOrderCon {
	.el-table__header-wrapper .has-gutter {			
		th{
			background-color:$tableHeadBg;
			color: #fff;
		}
	}
    .diagCon {
        .el-dialog {
            width: 540px !important;
            height: 560px !important;
        }
        .el-select {
            width: 100%;
        }
    }
	.specialForm .el-select  {
		width: 80% !important;
	}
	.specialSet {
		width: 80% !important;
	}
	.el-dialog__body { 
		padding: 30px 20px !important;
	}
	.trackInput .el-date-editor.el-input {
		width: 100% !important;
	}		
}
</style>
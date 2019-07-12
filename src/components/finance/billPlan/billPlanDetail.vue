<template>
  <div class="billPlanDetailContainer">
	  <div class="inner">
		  <div class="top">
			   <div class="topHeader">
				  <div class="topHeadLeft" @click="goBack">
					  <i class="icon-fanhui- iconfont"></i>&nbsp;&nbsp;<span>返回</span>
					</div>
				  <div class="topHeadRight">
					  <el-tooltip content="添加账单" placement="bottom" effect="light">
					   <div class="tableTopRight addBg" @click="showAdd"><i class="icon-tianjia- iconfont" ></i></div>
					</el-tooltip>
					  <el-tooltip content="多选删除" placement="bottom" effect="light">
					  <div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete"><i class="icon-shanchu- iconfont"></i></div>
						</el-tooltip>
					  <el-tooltip content="批量发放" placement="bottom" effect="light">
					  <div v-if="!showFirst" class="tableTopRightSp  delDisable addBg"  @click="popMultipleDistribute"  :class="{delAble}" ><i class="icon-piliangfafang- iconfont"></i></div>
						</el-tooltip>
					  <el-tooltip content="批量打款" placement="bottom" effect="light">
					  <div v-if="!showFirst" class="tableTopRightSp  delDisable" @click="popMultiplePayment"  :class="{delAble}" ><i class="icon-xianxiadakuan- iconfont"></i></div>
						</el-tooltip>
					</div>
				</div>
		</div>		 
		  <div class="bottom">			
			  <div class="tableContent"  :style="{width:computed}">
				  <div v-if="showFirst" >
				  <el-table :data="newTable"  tooltip-effect="dark" :key="1"  style="width: 100%"   height="600"  stripe @selection-change="handleSelectionChange">
					  	<el-table-column  type="selection"> </el-table-column>
						  <el-table-column  type="index"  label="序号">
							</el-table-column>
						<el-table-column  label="合同号" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="房东/租客姓名" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="受益人姓名" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="金额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="抵扣后金额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="已支付金额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="状态" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="账单月份" show-overflow-tooltip>						  
						  <template slot-scope="scope">
							<el-popover	placement="bottom"	trigger="hover">
									<div class="popperInner popperEdit" @click="edit2(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 修改</span>  </div>
									<div  class="operate" slot="reference">
                                        <span class="tableInnerText">
                                            {{ scope.row.name }}
                                        </span>
                                    </div>
								  </el-popover>
						  </template>						  
					</el-table-column>
					  <el-table-column  label="创建时间" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					  <el-table-column  label="收款时间" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					  <el-table-column  label="抵扣备注" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="收款备注" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="审核人" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>					  
					  <el-table-column label="操作">
						  <template slot-scope="scope">
							<div >
								<el-popover	placement="bottom"	trigger="hover">
									<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 确认收款</span>  </div>
									<div class="popperInner popperDelete" @click="popDelete(scope.row)"><i class="iconfont icon-shanchu-"></i> <span> 删除</span></div>
									<div  class="operate" slot="reference">操作</div>
								  </el-popover>
							</div>
						  </template>
					</el-table-column>
				</el-table>
				<div class="pagOuter">
						<el-pagination
						  @size-change="handleSizeChange"
						  @current-change="handleCurrentChange"
						  :current-page="current"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="size"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="total">
						</el-pagination>
				</div>
				</div>
				<div v-else>
					<el-table :data="newTable1" :key="2"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe @selection-change="handleSelectionChange1">
					  	<el-table-column  type="selection"> </el-table-column>
						  <el-table-column  type="index"  label="序号">
							</el-table-column>
						<el-table-column  label="合同号" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="房东/租客" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="受益人姓名" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="金额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="抵扣后金额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="已支付金额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="状态" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
                        <el-table-column  label="账单月份" show-overflow-tooltip>
                            <template slot-scope="scope">	
                                <el-popover	placement="bottom"	trigger="hover">
                                    <div class="popperInner popperEdit" @click="edit2(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 修改</span>  </div>
                                    <div  class="operate" slot="reference">
                                        <span class="tableInnerText">{{ scope.row.name }}</span>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
					  <el-table-column  label="创建时间" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="收款时间" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="备注" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="审核人" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>	
				</el-table>
				<div class="pagOuter">
						<el-pagination
						  @size-change="handleSizeChange1"
						  @current-change="handleCurrentChange1"
						  :current-page="current1"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="size1"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="total1">
						</el-pagination>
				</div>	
				</div>
			</div>
		</div>
		</div>
		<el-dialog title="信息" :visible.sync="editVisible" class="diagCon" :close-on-click-modal="false">
			<el-form :model="infoForm" :rules="infoRules" ref="infoForm" label-width="70px">
				<div class="scrollContainer">
					<el-form-item label="金额" prop="amount">
						<el-input v-model.trim="infoForm.amount" @change="unifiedNumberChange('infoForm','amount')"></el-input>
					  </el-form-item>
					 <el-form-item label="支付方式" prop="wayOfPayment">                         
                         <el-select v-model="infoForm.wayOfPayment" placeholder="请选择">
                             <el-option label="农行" value="NONGHANG"></el-option>
                             <el-option label="包商" value="BAOSHANG"></el-option>
                             <el-option label="包商POS" value="BAOSHANGPOS"></el-option>
                             <el-option label="现金" value="XIANJIN"></el-option>                             
                             <el-option label="违约单" value="BREACH"></el-option>
                             <el-option label="代金券" value="CASH_COUPON"></el-option>
                             <el-option label="维修费" value="MAINTENANCE_COST"></el-option>
						  </el-select>
						</el-form-item>					
					<el-form-item label="收款时间" >
                       <el-date-picker   prop="date" v-model="infoForm.date"  align="right" type="date"  placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions2" >
                        </el-date-picker>
                      </el-form-item>					
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea"  :rows="4" resize="none"  placeholder="请输入内容"  v-model.trim="infoForm.remark"></el-input>
					  </el-form-item>					
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'提交'" @click.native="saveEdit('infoForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEdit('infoForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="添加账单" :visible.sync="addVisible" class="diagCon" :close-on-click-modal="false">
			<el-form :model="addform" :rules="addrules" ref="addform" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="合同号" prop="agreementNo">
						<el-input v-model.trim="addform.agreementNo" @change="unifiedAgreementNoChange('addform','agreementNo')"></el-input>
					  </el-form-item>
					 <el-form-item label="类型" >
						  <el-select v-model="addform.type" placeholder="请选择">
                              <el-option
                                v-for="item in feeArrOption1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
						  </el-select>
						</el-form-item>
					<el-form-item label="金额" prop="amount">
						<el-input v-model.trim="addform.amount" @change="unifiedNumberChange('addform','amount')"></el-input>
					  </el-form-item>
					 <el-form-item label="应付时间" >
                              <el-date-picker   prop="hiredate" v-model="addform.date"  align="right" type="date"  placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyy-MM-dd" :picker-options="pickerOptions2" >
                                </el-date-picker>
                      </el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input v-model.trim="addform.remark"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveAdd('addform')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd('addform')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<transition name="popDel">
			<Del v-if="showDelete"  :delCon="quitConfirm" :delCancel="quitCancel"></Del>
		</transition>		
		<transition name="popDel">	
			<Del v-if="showSingleDelete"  :delCon="quitSingleConfirm" :delCancel="quitSingleCancel"></Del>
		</transition>
		<transition name="popDel">	
			<Del v-if="testShow"  :delCon="confirmTest" :delCancel="cancelTest" :head="'确定要对选中的账单执行批量发放吗?'"></Del>
		</transition>
		<transition name="popDel">	
			<Del v-if="paymentShow"  :delCon="confirPayment" :delCancel="cancelPayment" :head="'确定要对选中的账单执行批量打款吗?'"></Del>
		</transition>
		<el-dialog title="修改时间" :visible.sync="editVisible2" class="diagCon addDiagCon" :close-on-click-modal="false">		
			<el-form :model="addForm2" :rules="addRules2" ref="addForm2" label-width="80px">
					<div class="scrollContainer">
						<el-form-item label="时间" prop="name">
							<el-date-picker
							  v-model="addForm2.time"
							  align="right"
							  type="date"
							  placeholder="选择日期"
                                value-format="yyyy-MM-dd"            
							  :picker-options="pickerOptions2">
							</el-date-picker>
						  </el-form-item>
					</div>
					<div class="diagBtnCon">
						<RedBtn :text="'确定'" @click.native="billConfirm2('addForm2')"></RedBtn>
						<GreyBtn class="marLeft" @click.native="billCancel2('addForm2')"></GreyBtn>
					</div>
				</el-form>		
		</el-dialog>
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
			'multipleSelection':function(nval,val){
				if(nval.length){
					this.delAble = true;
				}else{
					this.delAble = false;
				}
			},
			'multipleSelection1':function(nval,val){
				if(nval.length){
					this.delAble = true;
				}else{
					this.delAble = false;
				}
			},
		},
        data(){
			return {
                feeArrOption1:[],
                pickerOptions2:this.DatePick.date,                
				addForm2:{},
				addRules2:{},
				editVisible2:false,
				paymentShow:false,
				testShow:false,
				showDelete:false,
				showSingleDelete:false,
				computed:'auto',
				showFirst:true,
				delAble:false,
				newTable:[		
					{name:'2019-12-12me'},
					{name:'2019-12-12me'},
					{name:'2019-12-12me'},
					{name:'2019-12-12me'}
				],
				newTable1:[
					{name:'2019'},
					{name:'2019-12-12me'},
					{name:'2019-12-12me'},
					{name:'2019-12-12me'}
				],
				editVisible:false,
				addVisible:false,
				infoForm:{
                    
                },
                infoRules:{
                    
                },
				addform:{
                },
				addrules:{
                    agreementNo:[
                        { required: true, message: '请输入合同号', trigger: 'blur' },
                    ],
                },
				multipleSelection:[],
				multipleSelection1:[],
				current:1,
				size:10,
				total:1,
				current1:1,
				size1:10,
				total1:1,
			}
		},
		mounted(){
			this.initTable();
		},
		methods:{
            unifiedAgreementNoChange(form,item){                
                let val =  this[form][item]; 
                let final  = this.Digital.formatAgreementNo.bind(this)( val );
                this[form][item] = final;
            },
            unifiedNumberChange(form,item){
                this.Digital.formatPrice.bind(this)( `${form}.${item}` );
            },
			billConfirm2(str){
                console.log(str,this[str]);
				this.editVisible2 = false;
			},
			billCancel2(str){
                console.log(str,this[str]);
				this.editVisible2 = false;
			},
			edit2(row){
				this.editVisible2 = true;
				console.log(row);	
                this.addForm2.time = '2019-06-18';
                console.log( this.addForm2 );
			},
			confirPayment(){
				this.paymentShow = false;	
			},
			cancelPayment(){
				this.paymentShow = false;	
			},
			confirmTest(){
				this.testShow = false;	
			},
			cancelTest(){
				this.testShow = false;	
			},
			quitSingleConfirm(){
				this.showSingleDelete = false;
			},
			quitSingleCancel(){
				this.showSingleDelete = false;
			},
			quitConfirm(){
				this.showDelete = false;
			},
			quitCancel(){
				this.showDelete = false;
			},
			initTable(){                
                this.Digital.tableWidthController.bind(this)(310,'computed');  
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.size = val;
				let data = {};
				this.runSearch(data);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.current = val;
				let data = {};
				this.runSearch(data);
			},
			handleSizeChange1(val) {
				console.log(`每页 ${val} 条`);
				this.size1 = val;
				let data = {};
				this.runSearch1(data);
			},
			handleCurrentChange1(val) {
				console.log(`当前页: ${val}`);
				this.current1 = val;
				let data = {};
				this.runSearch1(data);
			},
			runSearch(data){
				console.log(data);
			},
			runSearch1(data){
				console.log(data);
			},
			handleSelectionChange1(val){
                this.multipleSelection1 = val;
			},
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			popMultipleDistribute(){
				if(this.delAble){
					this.testShow = true;	
				}
			},
			popMultiplePayment(){
				if(this.delAble){
					this.paymentShow = true;	
				}
			},
			popMultipleDelete(){
				if(this.delAble){
					this.showDelete = true;
				}
			},
			saveAdd(str){
                console.log( str,this[str] );
                this.$refs[str].validate((valid) => {
                  if (valid) {
                      this.addVisible = false;
                      
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
                }); 
			},
			cancelAdd(str){
                console.log(str);
				this.addVisible = false;
                this.$refs[str].resetFields();
			},
			showAdd(){
				this.addform = {};
				this.addVisible = true;
                let interfaceArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
                let final =this.StateData.feeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });
				this.feeArrOption1 = final;
			},
			editInfo(row){
				this.form = {};
				this.editVisible = true;
			},
			saveEdit(str){
                console.log( str,this[str] );
				this.editVisible = false;
			},
			cancelEdit(str){
                console.log(str,this[str]);
				this.editVisible = false;
			},			
			popDelete(row){
				console.log(row);
				this.showSingleDelete = true;
			},
			goBack(){                
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/billPlan');                
			},			
		},
    }
</script>
<style scoped lang="scss">
    .tableInnerText {
		display: inline-block;
		width: 70%;
		margin: 0 auto;
		overflow: hidden;
	}
	.billPlanDetailContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.pagOuter {
			text-align: right;
			padding-top: 10px;
			box-sizing: border-box;
		}
		.inner {
			background-color: #fff;
			border-radius: 10px;
			padding: 24px;
		}
		.top {	
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
					background-color: #eafafe;
					color: #07aedb;
					text-align: center;
					cursor: pointer;
					span {
						vertical-align: 1px;
						font-size: 12px;
						font-weight: 600;
					}
				}
				.topHeadRight {
					display: flex;
					justify-content:flex-end;
					align-content: center;
					align-items: center;
					.tableTopRight {
						height: 30px;
						width: 30px;
						background-color: $mainRed;
						border-radius: 15px;
						line-height: 30px;
						text-align: center;
						color: #fff;
						box-shadow: $redShadow;
						cursor: pointer;
					}
					.tableTopRightSp {
						height: 30px;
						width: 30px;
						background-color: $mainRed;
						border-radius: 15px;
						line-height: 30px;
						text-align: center;
						color: #fff;
						box-shadow: $redShadow;
						margin-left: 20px;
					}
				}
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
		.addBg {
			background-color: #2a2f48 !important;			
			box-shadow: 0px 2px 10px 5px #dadbe1 !important;
		}
		.scrollContainer {
			overflow-y: scroll;
			height: 310px;
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
					background-color: #2a2f48 !important;
					height: 30px;
					width: 30px;
					background-color: $mainRed;
					border-radius: 15px;
					line-height: 30px;
					text-align: center;
					color: #fff;
					box-shadow: $redShadow;
					cursor: pointer;
					box-shadow: 0px 2px 10px 5px #dadbe1 !important;
				}
			}
			.operate {
				overflow: hidden;
				height: 30px;
				color: $mainRed;
				margin: 0 auto;
				background-color: $specialBgRed;
				border-radius: 15px;
				cursor: pointer;
				font-size: 13px;
				line-height: 30px;
			}
		}
	}
</style>
<style  lang="scss">
	.billPlanDetailContainer {
		.el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
		.diagCon .el-dialog {			
			width: 540px !important;
			height: 490px ;
		}
		.diagCon .el-select {
			width: 100%;
		}
		.el-dialog__body { 
			padding: 30px 20px !important;
		}
		.addDiagCon .el-dialog {
			height: 250px !important;
			.scrollContainer {
				height: 70px !important;
			}
		}
		.el-date-editor {
			width: 100%;
		}		
	}
</style>
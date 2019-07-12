<template>
  <div class="dailyPaymentContainer">  
	  <div class="searchCon flex">
		  <div class="sameWidth marRight marBottom">
			  <el-select v-model.trim="searchMaster.itemType" placeholder="请选择" @change="inputChange(searchMaster.itemType,'searchMaster','itemType')">	
                  <el-option
                             v-for="item in feeArrOption1"
							:key="item.value"
							:label="item.label"
							:value="item.value">
				</el-option>                  
				</el-select>
			</div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入合同号"  v-model.trim="searchMaster.agreementNo"  clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')" ></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入房源名"  v-model.trim="searchMaster.houseName"  clearable @change="inputChange(searchMaster.houseName,'searchMaster','houseName')" ></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入小区名"  v-model.trim="searchMaster.community"  clearable @change="inputChange(searchMaster.community,'searchMaster','community')" ></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入户号"  v-model.trim="searchMaster.accountNo"  clearable @change="inputChange(searchMaster.accountNo,'searchMaster','accountNo')" ></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入发票号"  v-model.trim="searchMaster.receiptNumber"  clearable @change="inputChange(searchMaster.receiptNumber,'searchMaster','receiptNumber')" ></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入录入人"  v-model.trim="searchMaster.enteringPerson"  clearable @change="inputChange(searchMaster.enteringPerson,'searchMaster','enteringPerson')" ></el-input>
		 </div>
		  <div class="timerCon marRight marBottom">
			  <el-date-picker	prefix-icon="''" v-model.trim="searchMaster.time1" type="daterange" align="right" unlink-panels  range-separator="至" start-placeholder="缴费开始日期"  end-placeholder="缴费结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time1,'searchMaster','time1')"></el-date-picker>
			</div>
		  <div class="timerCon marRight marBottom">
			  <el-date-picker	prefix-icon="''" v-model.trim="searchMaster.time2" type="daterange" align="right" unlink-panels  range-separator="至" start-placeholder="录入开始日期"  end-placeholder="录入结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time2,'searchMaster','time2')"></el-date-picker>
			</div>
		  <div class="btnCon marBottom flex">			  
              <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
              <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex">	
			   <div></div>			   
<!--
			   <div  class="lightLeft" @click="withdrawalClick">
				   <i class="icon-chakanquanbuzhangdan- iconfont"></i>
				   <span>&nbsp;查看全部账单</span>
				</div>
-->			   
			   <el-tooltip content="新增" placement="bottom" effect="light">
			   <div class="tableTopRight" @click="addPop">
				   <i class="icon-tianjia- iconfont" ></i></div>
				</el-tooltip>
<!--
			   <el-tooltip content="多选删除" placement="bottom" effect="light">
				  <div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete">
					  <i class="icon-shanchu- iconfont"></i>
					</div>
				</el-tooltip>
-->
			</div>
		  <div class="tableContent"  :style="{width:computed}">
			  <el-table  :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">				  
				<el-table-column  label="项目" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="房源名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="租客姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="户号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="单价" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="缴费日期" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
				<el-table-column  label="开始度数/时间" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="结束度数/时间" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="发票号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="备注" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="录入时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="录入人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div >
							<el-popover	placement="bottom"	trigger="hover">							
								<div class="popperInner popperEdit" @click="popDetail(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 详情</span></div>
                                
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
	</div>
	<transition name="popDel">
		<Del v-if="showDelete"  :delCon="quitConfirm" :delCancel="quitCancel"></Del>
	</transition>
	<el-dialog title="请输入合同号" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false">		
		<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="合同号" prop="no">
						<el-input v-model.trim="addForm.no"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'确定'" @click.native="saveAdd('addForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd('addForm')"></GreyBtn>
				</div>
			</el-form>		
	</el-dialog>
	<el-dialog title="信息" :visible.sync="infoVisible" class="diagCon infoDiagCon" :close-on-click-modal="false">		
		<el-form :model="infoForm" :rules="infoRules" ref="infoForm" label-width="100px">
				<div class="scrollContainer triggerContainer">
					<div class="dialogTitle">生活缴费登记<span class="">{{infoAgreementNo}}</span></div>
					<el-form-item label="类型" prop="name">
						<el-select v-model.trim="infoForm.type" placeholder="请选择活动区域">                            
                            <el-option
                                         v-for="item in feeArrOption2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                            </el-option>   
						  </el-select>
					  </el-form-item>
					<el-form-item label="户号" prop="name">
						<el-input v-model.trim="infoForm.name"></el-input>
					  </el-form-item>					
					 <el-form-item label="单价" >
						  <el-select v-model.trim="infoForm.value" placeholder="请选择">                              
                              <el-option-group
                              v-for="group in priceOptions"
                              :key="group.label"
                              :label="group.label">
                              <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-option-group>
						  </el-select>                         
						</el-form-item>
					<el-form-item label="自定义单价" >
						<el-input v-model.trim="infoForm.value"></el-input>
					  </el-form-item>		
                    <el-form-item label="总额" >
						<el-input v-model.trim="infoForm.value"></el-input>
					  </el-form-item>	
                    <el-form-item label="起始时间" prop="name">
                        <el-date-picker
                          v-model="infoForm.time1"
                          align="right"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions1"
                        value-format="yyyy-MM-dd" >
                        </el-date-picker>
					  </el-form-item>	
                    <el-form-item label="结束时间" prop="name">
                        <el-date-picker
                          v-model="infoForm.time1"
                          align="right"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions1"
                        value-format="yyyy-MM-dd" >
                        </el-date-picker>
					  </el-form-item>	
					<el-form-item label="缴费时间" prop="name">
                        <el-date-picker
                          v-model="infoForm.time1"
                          align="right"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions1"
                        value-format="yyyy-MM-dd" >
                        </el-date-picker>
					  </el-form-item>					
					<el-form-item label="起始度数" prop="name">
						<el-input v-model.trim="infoForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="结束度数" prop="name">
						<el-input v-model.trim="infoForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="发票号" prop="name">
						<el-input v-model.trim="infoForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="name">
						<el-input v-model.trim="infoForm.name"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveEdit(infoForm)"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEdit(infoForm)"></GreyBtn>
				</div>
			</el-form>
	</el-dialog>
	<el-dialog title="详情" :visible.sync="detailVisible" class="diagCon largeDialog" :close-on-click-modal="false">
		<div class="greyBgCon">	
			<div class="tableOuterSp">
				<div class="tableContent">
					<el-table  ref="statementTable"  :data="tableData4"  tooltip-effect="dark"  style="width: 100%"   height="513"  stripe>
						<el-table-column  label="合同号" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="缴费类型" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="承担角色" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="承担度数" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="承担金额" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="承担人" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="新增时间" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					</el-table>
					<div class="pagOuter">
						<el-pagination
						  @size-change="handleSizeSpChange"
						  @current-change="handleCurrentSpChange"
						  :current-page="currentSp"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="sizeSp"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="totalSp">
						</el-pagination>
				</div>
				</div>
			</div>
		</div>		
	</el-dialog>
    <transition name="popDel">
		<Del v-if="showSingleDelete"  :delCon="quitSingleConfirm" :delCancel="quitSingleCancel"></Del>
	</transition>
  </div>
</template>
<script>
    export default {		
		watch:{
			'multipleSelection':function(nval,val){
				if(nval.length){
					this.delAble = true;
				}else{
					this.delAble = false;
				}
			},
		},
        data(){
			return {
                loading:true,
                feeArrOption1:[],
                feeArrOption2:[],
                priceOptions:[
                    { 
                        label: '水费',
                          options: [
                              {
                                value: '6.12',
                                label: '6.12'
                              },
                              {
                                value: '7',
                                label: '7'
                              },
                              {
                                value: '3.4',
                                label: '3.4'
                              },
                              {
                                value: '6.3',
                                label: '6.3'
                              },
                          ]
                    },
                    { 
                        label: '电费',
                          options: [
                            {
                                value: '0.538',
                                label: '0.538'
                              },
                              {
                                value: '0.883',
                                label: '0.883'
                              },
                              {
                                value: '0.75',
                                label: '0.75'
                              },
                          ]
                    },
                    { 
                        label: '煤气费',
                          options: [
                            {
                                value: '2.95',
                                label: '2.95'
                              },
                          ]
                    },
                    { 
                        label: '空调费',
                          options: [
                            {
                                value: '1.2',
                                label: '1.2'
                              },
                          ]
                    },
                    { 
                        label: '有线费',
                          options: [
                            {
                                value: '240',
                                label: '240'
                              },
                          ]
                    },
                    { 
                        label: '网络费以及网络机顶盒',
                          options: [
                            {
                                value: '120',
                                label: '120'
                              },
                          ]
                    },
                    { 
                        label: '机顶盒',
                          options: [
                            {
                                value: '580',
                                label: '580'
                              },
                          ]
                    },
                ],
                infoAgreementNo:'nb234234234',
				tableData4:[
					{name:'meeeee'},
					{name:'meeeee'},
					{name:'meeeee'},
					{name:'meeeee'},
					{name:'meeeee'},
					{name:'meeeee'},
					{name:'meeeee'},
				],
                showSingleDelete:false,
				currentSp:1,
				sizeSp:10,
				totalSp:0,				
				infoForm:{
					value:12312
				},
				infoRules:{},
				addForm:{
					no:'',
				},
				addRules:{
                    no:[
                        {  required: true, message: '请输入合同号。', trigger: 'blur' },
                        { pattern: /^[a-zA-Z_\-\0-9]+$/, message: '请输入正确格式', trigger: 'blur' },
                    ]
                },
				detailVisible:false,
				addVisible:false,
				infoVisible:false,
				computed:'auto',	
                searchMaster:{
                    community:'',
                    itemType:'',
                    agreementNo:'',
                    houseName:'',
                    accountNo:'',
                    receiptNumber:'',
                    enteringPerson:'',
                    time1:'',
                    time2:'',	
                },
				storeMap:{
					time1:'dailyPaymentTime1',
					time2:'dailyPaymentTime2',
					community:'dailyPaymentCommunity',
					itemType:'dailyPaymentItemType',
					agreementNo:'dailyPaymentAgreementNo',
					houseName:'dailyPaymentHouseName',
					accountNo:'dailyPaymentAccountNo',
					receiptNumber:'dailyPaymentReceiptNumber',
					enteringPerson:'dailyPaymentEnteringPerson',
				},
				storeArr:[		
					'time1',
					'time2',
					'community',
					'itemType',
					'agreementNo',
					'houseName',
					'accountNo',
					'receiptNumber',
					'enteringPerson',					
				],
				storeArrMatchParam:[
					'ptime1',
					'ptime2',
					'pcommunity',
					'pitemType',
					'pagreementNo',
					'phouseName',
					'paccountNo',
					'preceiptNumber',
					'penteringPerson',	
				],
				timeParams:{
					ptime1:[
						'ptime1part1',
						'ptime1part2',
					],
					ptime2:[
						'ptime2part1',
						'ptime2part2',
					],
				},					
				delAble:false,				
				showDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
                pickerOptions2:this.DatePick.range,            
                pickerOptions1:this.DatePick.date,         
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();
            this.initfeeArrOption1();
            this.initfeeArrOption2();
		},
		methods:{	
            initfeeArrOption2(){
                let interfaceArr = [0,5,6,23,1,22,2,21];
                let final =this.StateData.feeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });    
				this.feeArrOption2 = final;
            },
            initfeeArrOption1(){
                let interfaceArr = [0,1,2,3,4,5,6,8,9,10,16,17,22,23,24,25,26];
                let final =this.StateData.feeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });                
                final.splice(0,0,{
                    label:'项目（全部）',
                    value:'',
                    index:0,
                })
				this.feeArrOption1 = final;
			},
            quitSingleConfirm(){
				this.showSingleDelete = false;
				this.Success.deleteSuccess();
			},
			quitSingleCancel(){
				this.showSingleDelete = false;
			},
			handleSizeSpChange(val){},
			handleCurrentSpChange(val){},
			popDetail(){
				this.detailVisible = true;
			},		
            popDelete(row){
				console.log(row);
				this.showSingleDelete = true;
			},	
			saveEdit(infoForm){
				this.infoVisible = false;
				console.log(infoForm);
			},
			cancelEdit(infoForm){
				this.infoVisible = false;
				console.log(infoForm);
			},
			saveAdd(){				
				this.addVisible = false;
				this.infoVisible = true;
			},
			cancelAdd(){
				this.addVisible = false;
			},
			addPop(){
				this.addVisible = true;
			},
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
			inputChange(val,form,item){
                if(val){
                   this.StoreJs.set( this.storeMap[item],val );
                }else{
                    this.StoreJs.remove( this.storeMap[item] );
                }
			},
			initSearch(){
                let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
                this.runSearch(finalData);
			},
			popMultipleDelete(){
				if(this.delAble){
					this.showDelete = true;
				}
			},	
			quitConfirm(){
				this.showDelete = false;
				this.Success.deleteSuccess();
//				this.Err.netErr();
			},
			quitCancel(){
				this.showDelete = false;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},			
			handleSelectionChange(val) {
                this.multipleSelection = val;
			},
			runSearch(data){
				console.log(data);
                this.loading = false;
			},
			queryNow(){
				this.initSearch();
			},
			reset(){
				this.Digital.reset.bind(this)(); 
				this.runSearch({});
			},
		},
    }
</script>
<style scoped lang="scss">
	.greyBgCon {
		background-color: #f5f6fd;
		padding: 20px;
	}
	.dialogTitle {
		padding-left: 30px;
		margin-bottom: 20px;
		font-weight: 600;
		font-size: 17px;   
	}
	.lightLeft {
		width: 120px;
		cursor: pointer;
		border-radius: 20px;
		background-color: #fff7f7;
		color: $mainRed;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 12px;
		span {
			vertical-align: 1px;
			font-weight: 600;
		}
	}
	.tableTop {
		height: 40px;
		flex-wrap: nowrap;
		justify-content:space-between;
		margin-bottom: 20px;
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
	.diagBtnCon {
		margin-top: 30px;
		margin-bottom: 30px;
		flex-wrap: nowrap;
		justify-content: flex-end;
		.marLeft {
			margin-left: 20px;
		}
	}
	.dailyPaymentContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.pagOuter {
			text-align: right;
			padding-top: 10px;
			box-sizing: border-box;
		}
		.operate {
			width: 60px;
			height: 30px;
			color: $mainRed;
			margin: 0 auto;
			line-height: 30px;
			background-color: $specialBgRed;
			border-radius: 15px;
			cursor: pointer;
			font-size: 13px;
		}
		.tableOuter {
			height: 730px;
			background-color: #fff;
			border-radius: 10px;
			padding: 14px;
			box-sizing: border-box;			
		}
		.searchCon {
			flex-wrap:wrap;
			justify-content:flex-start;
		}
		.btnCon {
			width: 200px;
			flex-wrap: nowrap;
			justify-content: space-between;
			margin-bottom: 26px;
		}
        .marRight {
            margin-right: 20px;
        }
        .marBottom {
            margin-bottom: 20px;
        }
		.timerCon {
			width: 280px;
		}		
		.sameWidth {
			width: 170px;
		}
		.scrollContainer {
			height: 370px;
			overflow-y: scroll;
		}
	}
</style>
<style  lang="scss">
	.dailyPaymentContainer {
		.diagCon .el-dialog {
			width: 540px;
			height: 560px;
		}			
		.diagCon .el-select {
			width: 100%;
		}		
		.searchCon .el-input__inner {
			border: none;
			border-radius: 20px;
		}
		.searchCon .el-date-editor--daterange {
			width: 280px;
		}
		.el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
		.addDiagCon .el-dialog {
			height: 250px !important;
			.scrollContainer {
				height: 70px !important;
			}
		}
        .infoDiagCon {
            .el-date-editor {
                width: 100%;
            }
            .el-dialog {
                height: 560px !important;
                .scrollContainer {
                    height: 380px !important;
                }
            }
        }
	}
</style>
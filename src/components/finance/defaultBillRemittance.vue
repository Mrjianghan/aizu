<template>
  <div class="defaultManageContainer">	  
	  <div class="searchCon">
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入合同号"  v-model.trim="searchMaster.agreementNo" clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"
						@clear="clearEvent('agreementNo')"></el-input>
		 </div>
		 <div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''"  v-model.trim="searchMaster.time1" type="daterange"  align="right" unlink-panels range-separator="至" start-placeholder="创建开始日期"  end-placeholder="创建结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time1,'searchMaster','time1')"  value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.operator" placeholder="请选择" @change="inputChange(searchMaster.operator,'searchMaster','operator')">			
				  <el-option label="操作人（全部）" value=""></el-option>				
                  <el-option label="邹婷婷" value="11330"></el-option>
                  <el-option label="姜亚花" value="7154"></el-option>
				</el-select>
			</div>          
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status1" placeholder="请选择" @change="inputChange(searchMaster.status1,'searchMaster','status1')">			
				  <el-option label="账单类型（全部）" value=""></el-option>
                  <el-option label="房东" value="false"></el-option>
                  <el-option label="租客" value="true"></el-option>
				</el-select>
			</div>          
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status2" placeholder="请选择" @change="inputChange(searchMaster.status2,'searchMaster','status2')">			
				  <el-option label="打款状态（全部）" value=""></el-option>
				  <el-option label="已打款" value="true"></el-option>
				  <el-option label="未打款" value="false"></el-option>
				</el-select>
			</div>          
          <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status3" placeholder="请选择" @change="inputChange(searchMaster.status3,'searchMaster','status3')">			
				  <el-option label="有无备注（全部）" value=""></el-option>
				  <el-option label="有" value="true"></el-option>
				  <el-option label="无" value="false"></el-option>
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model.trim="searchMaster.time2"  type="daterange"  align="right" unlink-panels  range-separator="至"  start-placeholder="成功开始日期" end-placeholder="成功结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time2,'searchMaster','time2')"  value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  <div class="btnCon marBottom">			  
              <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
              <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop" >	
			   <div class="topLeft"></div>
			   <div class="topRight">
				   <el-tooltip content="账单下载" placement="bottom" effect="light">
					 <a :href="excelHref" :download="excelDownload">  
					   <div class="tableTopRight">
						<i class="iconfont icon-xiazai-" ></i>
						</div>
					</a>   
					</el-tooltip>
				</div>
			</div>
		  <div class="tableContent" :style="{width:computed}">
		  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
			  <el-table-column type="selection" show-overflow-tooltip></el-table-column>
			  <el-table-column  label="序号" type="index" show-overflow-tooltip></el-table-column>
				<el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="账户名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="开户银行" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="银行账户" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="需退金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>				
				<el-table-column  label="账单类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="创建日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>				
				<el-table-column  label="成功时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="指定打款人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="备注" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>								
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
		<el-dialog title="编辑" :visible.sync="editVisible" class="diagCon editDiagCon" :close-on-click-modal="false">			
			<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px">
				<div class="scrollContainer triggerContainer">
					<el-form-item label="合同号" prop="agreementNo">
						<el-input v-model.trim="editForm.agreementNo" disabled></el-input>
					  </el-form-item>
					<el-form-item label="账户名称" prop="accountName">
						<el-input v-model.trim="editForm.accountName"></el-input>
					  </el-form-item>
					<el-form-item label="开户银行" prop="bankName">
						<el-input v-model.trim="editForm.bankName"></el-input>
					  </el-form-item>
					<el-form-item label="银行账户" prop="bankAccount">
						<el-input v-model.trim="editForm.bankAccount"></el-input>
					  </el-form-item>
					<el-form-item label="需退金额" prop="refund">
						<el-input v-model.trim="editForm.refund" disabled></el-input>
					  </el-form-item>
					<el-form-item label="账单类型" prop="billType">
						<el-radio-group v-model.trim="editForm.billType">
						  <el-radio label="租客"></el-radio>
						  <el-radio label="房东"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="创建时间" prop="timeOfCreation">
						<el-input v-model.trim="editForm.timeOfCreation" disabled></el-input>
					  </el-form-item>
					<el-form-item label="成功时间" prop="timeOfSuccess">
						<el-input v-model.trim="editForm.timeOfSuccess" disabled></el-input>
					  </el-form-item>
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model.trim="editForm.status">
						  <el-radio label="true">已打款</el-radio>
						  <el-radio label="false">未打款</el-radio>
						</el-radio-group>
						<RedBtn :text="'不打款'" @click.native="notPay(editForm.status)" class="transToInline"></RedBtn>
					</el-form-item>
					<el-form-item label="指定打款人" prop="assigner">
						<el-input v-model.trim="editForm.assigner" disabled></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input resize="none" rows="4" type="textarea" v-model.trim="editForm.remark"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveEdit('editForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEdit('editForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
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
				computed:'auto',                
                searchMaster:{
                    agreementNo:'',
                    time1:'',                
                    operator:'',                
                    status1:'',
                    status2:'',
                    status3:'',
                    time2:'',
                },
				storeMap:{
					time1:'defaultBillRemitTime1',
					time2:'defaultBillRemitTime2',
					status2:'defaultBillRemitStatus2',
                    status3:'defaultBillRemitStatus3',
					agreementNo:'defaultBillRemitAgreementNo',
					operator:'defaultBillRemitOperator',
					status1:'defaultBillRemitStatus1',
				},
				storeArr:[					
					'time1',
					'time2',
					'status2',        
                    'status3',  
					'operator',                    
					'status1',
					'agreementNo',
				],
				storeArrMatchParam:[
					'ptime1',
					'ptime2',
					'pstatus1',
					'poperator',                    
					'pstatus2',
                    'pstatus3',
					'pagreementNo',
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
				editVisible:false,			
                editForm:{                    
                },
                editRules:{                    
                },
				delAble:false,							
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
				pickerOptions2: this.DatePick.range, 
				tableData3:[
//					{name:'me'},
//					{name:'me'}  
				],
				excelHref:'',
				excelDownload:'',
			}
		},
		mounted(){
			this.initSearch();		
			this.initTable();
			this.generateExcel([]);
		},
		methods:{
			generateExcel(buffer){		
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );				
				this.excelHref =  url;
				let now = Date.now();				
				console.log('now',now);				
				let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
				console.log('format',format);				
				this.excelDownload = `testtestme${format}.xls`;				
				URL.revokeObjectURL(url);
			},
			notPay(val){	
                console.log(val);
                if(val){
                    if( val==='true' ){
                        console.log(  '等于true' );                        
                    }else{
                        console.log(  '等于false' );
                    }
                }else{
                }
			},
			inputChange(val,form,item){
                if(val){
                   this.StoreJs.set( this.storeMap[item],val );
                }else{
                    this.StoreJs.remove( this.storeMap[item] );
                }
			},
			clearEvent(str){
				this.StoreJs.remove( this.storeMap[str] );	
			},
			initSearch(){	
                let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
                this.runSearch(finalData);                
			},
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
			saveEdit(str){
                console.log(str,this[str]);                
				this.editVisible = false;                
			},
			cancelEdit(str){
                console.log(str);
				this.editVisible = false;
			},
			editInfo(){
				this.editVisible = true;
			},
			handleSizeChange(val) {                
				console.log(`每页 ${val} 条`);
				this.initSearch();	
			},
			handleCurrentChange(val) {                
				console.log(`当前页: ${val}`);
				this.initSearch();	
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
    .marBottom {
        margin-bottom: 20px;        
    }
    .marRight {
        margin-right: 20px;
    }
	.transToInline {
		display: inline-block;
		margin-left: 20px;
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
	.defaultManageContainer {
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
			.tableTop {
				margin-bottom: 20px;
				display: flex;
				flex-direction: row;
				justify-content:space-between;
				align-content: center;
				align-items: center;
				.topLeft {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content:flex-start;
					align-content: center;
					align-items: center;
				}				
				.topRight {
					height: 40px;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content:flex-end;
					align-content: center;
					align-items: center;
				}
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
			}
		}
		.searchCon {
			display: flex;
			flex-direction: row;
			flex-wrap:wrap;
			justify-content:flex-start;
			align-content: center;
			align-items: center;
		}
		.btnCon {
			width: 200px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-content: center;
			align-items: center;		
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
	.defaultManageContainer {
		.diagCon .el-dialog {
			width: 540px !important;
			height: 560px ;
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
		.el-dialog__body { 
			padding: 30px 20px !important;
		}
	}
</style>
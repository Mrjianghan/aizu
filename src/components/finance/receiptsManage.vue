<template>
  <div class="receiptsManageContainer">
	  <div class="searchCon">
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入合同号"  v-model.trim="searchMaster.agreementNo"  clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"
						></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入收款人"  v-model.trim="searchMaster.payee"  clearable @change="inputChange(searchMaster.payee,'searchMaster','payee')"
						></el-input>
		 </div>
		   <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status" placeholder="请选择" @change="inputChange(searchMaster.status,'searchMaster','status')">			
				  <el-option label="状态（全部）" value=""></el-option>
				  <el-option label="已打印" value="1"></el-option>
				  <el-option label="未打印" value="0"></el-option>
				</el-select>
			</div>
		   <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.type" placeholder="请选择" @change="inputChange(searchMaster.type,'searchMaster','type')">			
				  <el-option label="类型（全部）" value=""></el-option>
				  <el-option label="支付宝" value="ALIPAY"></el-option>
				  <el-option label="微信" value="WEIXIN"></el-option>
				  <el-option label="其他" value="OTHER"></el-option>
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model.trim="searchMaster.time" type="daterange"  align="right"  unlink-panels  range-separator="至"  start-placeholder="创建开始日期"  end-placeholder="创建结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time,'searchMaster','time')"></el-date-picker>
		</div>		 
		  <div class="btnCon marBottom">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			  <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
		  </div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop" >	
			   <div class="topLeft">				   
				   <div class="anotherSelectFile">
						<input class="changeManageInput" ref="deductionBillImport" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importManage">
						<i class="iconfont icon-shangchuan-"></i>  <span> 包商对账</span>
					</div>
				   <select ref="track1" v-model.trim="select1" v-show="false"></select>
				   <el-select class="equip" v-model.trim="equip" placeholder="指定打印机" @change="equipChange" @focus="checked1Focus">
					<el-option
					  v-for="item in options1"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				   <select ref="track2" v-model.trim="select2" v-show="false"></select>
				   <el-select class="paper" v-model.trim="paper" placeholder="指定纸张" @change="paperChange" @focus="checked2Focus">
						<el-option
						  v-for="item in options2"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
				   </el-select>
				   <RedBtn :text="'批量打印'" @click.native="batchPrint"></RedBtn>
				   <el-checkbox class="checked3" v-model.trim="checked3" >佣金</el-checkbox>			   
				</div>
			   <div class="topRight">
				   <el-tooltip content="下载" placement="bottom" effect="light">
					   <a :href="excelHref" :download="excelDownload"><div class="tableTopRight addBg">
						<i class="iconfont icon-xiazai-" ></i>
						</div></a>	
					</el-tooltip>				   
				   <el-tooltip content="打印" placement="bottom" effect="light">
					   <div class="tableTopRight" @click="print">
						<i class="iconfont icon-dayin-" ></i>
						</div>	
					</el-tooltip>
				</div>
			</div>
		  <div class="tableContent" :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				  <el-table-column type="selection"> </el-table-column>
				  <el-table-column  label="序号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="客户名称" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="名称" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>				
				<el-table-column  label="数量" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="单价" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
				<el-table-column  label="金额" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
				<el-table-column  label="交款人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="收款人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="会计" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="备注" show-overflow-tooltip  class="note">
					  <template slot-scope="scope" class="note">
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="popEdit(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 修改备注</span>  </div>								
								<div  class="operate" slot="reference">
									<span class="tableInnerText">
										{{ scope.row.name }}
						  			</span>
						  		</div>
							</el-popover>
						</template>
				</el-table-column>
				<el-table-column  label="打印次数" show-overflow-tooltip >					
					  <template slot-scope="scope">
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="confirmPrint(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 确认打印</span>  </div>								
							<div  class="operate" slot="reference">
								<span class="tableInnerText">
										{{ scope.row.name }}
						  			</span>
						  	</div>
						</el-popover>
					</template>					
				</el-table-column>
				<el-table-column  label="支付方式" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="商户订单号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="创建时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
<!--
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div >
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看</span>  </div>
								<div class="popperInner popperDelete" @click="popDelete(scope.row)"><i class="iconfont icon-shanchu-"></i> <span> 删除</span></div>
								<div  class="operate" slot="reference">操作</div>
							  </el-popover>
                        </div>
                      </template>
                </el-table-column>
-->
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
	<transition name="popDel">
		<Del v-if="showSingleDelete"  :delCon="quitSingleConfirm" :delCancel="quitSingleCancel"></Del>
	</transition>
	<el-dialog title="新增" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="手机号" prop="name">
						<el-input v-model.trim="addForm.name"></el-input>
					  </el-form-item>
					 <el-form-item label="身份" >
						  <el-select v-model.trim="addForm.type" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						  </el-select>
						</el-form-item>					
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveAdd"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="修改" :visible.sync="remarksVisible" class="diagCon editDiagCon" :close-on-click-modal="false">
			<el-input type="textarea" v-model.trim="textarea1" rows="11" :resize="'none'"></el-input>
			<div class="diagBtnCon">
				<RedBtn :text="'保存'" @click.native="saveEdit1"></RedBtn>
				<GreyBtn class="marLeft" @click.native="cancelEdit1"></GreyBtn>
			</div>
		</el-dialog>
        <ClodopAlert class="clodopDialog diagCon" v-if="clodopShow" :action="shutClodopShow"></ClodopAlert>
  </div>
</template>

<script>
    import {getLodop} from '@/tools/lodop.js'; 
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
                clodopShow:false,
				excelHref:'',
				excelDownload:'',
				computed:'auto',
				textarea1:'',
				remarksVisible:false,
				select2:'',
				select1:'',
				equip:'',
				options1:[],
				paper:'',
				options2:[],
				checked3:false,
				checked1:false,
				checked2:false,
				addVisible:false,
				orderMan:'',
				repairMan:'',
				communityName:'',
				addForm:{},
				addRules:{},
				agreementNumber:'',
				delAble:false,
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
				pickerOptions2: this.DatePick.range, 
				tableData3:[
//					{name:'sdfsewe'},
//					{name:'m23423342'}
				],		
                searchMaster:{
                    agreementNo:'',
                    payee:'',
                    status:'',
                    type:'',
                    time:'',
                },	
				storeMap:{
					agreementNo:'receiptsManageAgreementNo',
					payee:'receiptsManagePayee',
					status:'receiptsManageStatus',
					type:'receiptsManageType',
					time:'receiptsManageTime',
				},
				storeArr:[					
					'time',
					'agreementNo',
					'payee',
					'status',
					'type',
				],
				storeArrMatchParam:[
					'ptime',
					'pagreementNo',
					'ppayee',
					'pstatus',
					'ptype',
				],
				timeParams:{
					ptime:[
						'ptimepart1',
						'ptimepart2',
					]
				},	
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();
			this.generateExcel([]);
		},
		methods:{
			importManage(){
				var file = this.$refs.deductionBillImport.files[0];
                const excelReg = /(.(xls|xlsx))+$/i;
				if (excelReg.test(file.name) === false) {
					this.$message.error('请导入文件类型为excel格式的表格文件。');
					this.$refs.deductionBillImport.value="";
					return false;
				}else {
					const formData = new FormData();
					formData.append('file',file);
				}
			},
            shutClodopShow(){
                this.clodopShow = false;
            },
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
			initSearch(){	
                let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
                this.runSearch(finalData);
			},		
			saveEdit1(){
				this.remarksVisible = false;
			},
			generateExcel(buffer){		
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );				
				this.excelHref =  url;
				let now = Date.now();			
				let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
				this.excelDownload = `testtestme${format}.xls`;				
				URL.revokeObjectURL(url);
			},
			cancelEdit1(){
				this.remarksVisible = false;
			},
			inputChange(val,form,item){
                if(val){
                   this.StoreJs.set( this.storeMap[item],val );
                }else{
                    this.StoreJs.remove( this.storeMap[item] );
                }
			},
			confirmPrint(row){
				console.log(row);	
			},
            checked1Focus(){
                this.checked1Change();
            },
            checked2Focus(){
                this.checked2Change();
            },
			checked2Change(){
				let  LODOP = getLodop();
				if(LODOP){
                    let versionStatus = this.SimplifiedVerRouter.lodopVersionCheck();
                    if( versionStatus ){
                        if(this.select1){
                            CLODOP.Create_PageSize_List(this.$refs.track2,this.select1) ;  
                            let getMap = this.$refs.track2.childNodes;
                            var initArr = [];
                            for( let ele of getMap){
                                let obj = {};
                                obj.label = ele.label;
                                obj.value = ele.value;
                                initArr.push(obj);
                            }
                            this.options2 = initArr;
                        }else{
                           this.options2 = [];
                        } 
                    }else{
                       this.clodopShow = true; 
                    }
				}else{
					this.clodopShow = true;
				}
			},
			paperChange(){
				this.select2 = this.paper;
			},
			popEdit(row){
				console.log(row);
				this.remarksVisible = true;
				this.textarea1 = '';
			},
			equipChange(){
				this.select1 = this.equip;
				this.options2 = [];
				this.checked2 = '';
				this.paper = '';
			},
			checked1Change(){
				let  LODOP = getLodop();
				if(LODOP){
                    let versionStatus = this.SimplifiedVerRouter.lodopVersionCheck();
                    if( versionStatus ){
                        CLODOP.Create_Printer_List(this.$refs.track1) ;  
                        let getMap = this.$refs.track1.childNodes;
                        var initArr = [];
                        for( let ele of getMap){
                            let obj = {};
                            obj.label = ele.label;
                            obj.value = ele.value;
                            initArr.push(obj);
                        }
                        this.options1 = initArr;
                    }else{
                        this.clodopShow = true;
                    }
				}else{
                    this.clodopShow = true;
				}
			},
			batchPrint(){
				let  LODOP = getLodop();
				if(LODOP){		
					console.log( LODOP );
//                    LODOP.PRINT();
				}else{
				}
			},
			saveAdd(){
				this.addVisible = false;
			},
			cancelAdd(){
				this.addVisible = false;
			},
			editInfo(){		
			},
			popDelete(row){
				console.log(row);
				this.showSingleDelete = true;
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
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);				
				this.size = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.current = val;
			},
			print(){				
			},
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			queryNow(){
                this.initSearch();
			},
			runSearch(data){
				console.log(data);
                this.loading = false;
			},
			reset(){	
				this.Digital.reset.bind(this)(); 
				this.runSearch({});	
			},
		},
    }
</script>
<style scoped lang="scss">
	.anotherSelectFile {
		margin-right: 20px;
		position: relative;
		width: 120px;
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
	.changeManageInput {
		position: absolute;
		left: 0;
		width: 120px;
		height: 40px;
		opacity: 0;
		cursor: pointer;
		z-index: 2;
	}
	.addBg {
		background-color: #2a2f48 !important;
		margin-right: 20px;
		box-shadow: 0px 2px 10px 5px #dadbe1 !important;
	}
	.tableInnerText {
		display: inline-block;
		width: 70%;
		margin: 0 auto;
		overflow: hidden;
	}
	.equip {
		margin-right:20px;
	}
	.paper {
		margin-right:20px;
	}
	.checked3 {
		margin-left: 20px;
	}
	.checked1 {
		margin-right:20px;
	}
	.checked2 {
		margin-right:20px;
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
	.receiptsManageContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.pagOuter {
			text-align: right;
			padding-top: 10px;
			box-sizing: border-box;
		}
		.operate {
			width: 100%;
			margin: 0 auto;
			height: 30px;
			color: $mainRed;	
			line-height: 30px;
			background-color: $specialBgRed;
			border-radius: 15px;
			cursor: pointer;
			font-size: 13px;
			overflow: hidden;
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
				justify-content: space-between;
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
        .marBottom {
            margin-bottom: 20px;        
        }
        .marRight {
            margin-right: 20px;
        }
		.scrollContainer {
			height: 370px;
			overflow-y: scroll;
		}
	}
</style>
<style  lang="scss">
	.receiptsManageContainer {	
		.diagCon .el-dialog {
			width: 540px !important;
			height: 560px !important;
		}
		.addDiagCon .el-dialog{
			height: 320px !important;
			.scrollContainer {
				height: 130px !important;
			}
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
        .clodopDialog  .el-dialog{
			height: 250px !important;
		}
		.el-dialog__body { 
			padding-top: 30px;
			padding-bottom: 30px !important;
			padding-left: 20px !important;
			padding-right: 20px !important;
		}
		.editDiagCon .el-dialog {		
			height: 400px !important;
		}	
		.editDiagCon .el-dialog__body  {
			padding-top: 10px !important;
		}
	}
</style>
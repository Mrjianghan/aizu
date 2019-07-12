<template>
  <div class="houseOwnerManageContainer">  
	  <div class="searchCon">
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入关键词"  v-model.trim="searchMaster.keyWords" clearable @change="inputChange(searchMaster.keyWords,'searchMaster','keyWords')"
						></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入操作人姓名"  v-model.trim="searchMaster.operater"  clearable @change="inputChange(searchMaster.operater,'searchMaster','operater')"
						></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入合同号"  v-model.trim="searchMaster.agreementNo"  clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"
						></el-input>
		 </div>
		 <div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''"  v-model.trim="searchMaster.time1" type="daterange"  align="right"  unlink-panels  range-separator="至" start-placeholder="创建开始日期" end-placeholder="创建结束日期" :picker-options="pickerOptions2" @change="inputChange(searchMaster.time1,'searchMaster','time1')"></el-date-picker>
			</div>
		  <div class=" sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.type" placeholder="请选择" @change="inputChange(searchMaster.type,'searchMaster','type')">			
				  <el-option label="账单类型(全部)" value=""></el-option>
				  <el-option label="房东款" value="TRANSFER_LANDLORD"></el-option>
				  <el-option label="房东提现" value="LANDLORD_WITHDRAW"></el-option>
				  <el-option label="溢价收益" value="PROFIT"></el-option>
				</el-select>
			</div>
		  <div class=" sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status" placeholder="请选择" @change="inputChange(searchMaster.status,'searchMaster','status')">			
				  <el-option label="状态(全部)" value=""></el-option>
				  <el-option label="成功" value="SUCCESS"></el-option>
				  <el-option label="申请中" value="APPLYING"></el-option>
				  <el-option label="打款中" value="PAYING"></el-option>
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''"  v-model.trim="searchMaster.time2"  type="daterange" align="right"  unlink-panels  range-separator="至" start-placeholder="成功开始日期"  end-placeholder="成功结束日期" :picker-options="pickerOptions2" @change="inputChange(searchMaster.time2,'searchMaster','time2')"></el-date-picker>
			</div>
		  <div class="btnCon marBottom">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			<GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop" >	
			   <div class="topLeft">
<!--
				   <div class="selectFile">
					   <input class="importStaffExcel" ref="importExcel" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importExcel">
					   <i class="iconfont icon-jia-"></i> <span> 选择文件</span>  
					</div>
-->
				    <div class="anotherSelectFile">
						<input class="changeManageInput" ref="changeManageImport" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importManage">
						<i class="iconfont icon-shangchuan-"></i>  <span> 上传房东款</span>
					</div>
				</div>
			   <div class="topRight">
				   <el-tooltip content="账单下载" placement="bottom" effect="light">
				   		<a :href="excelHref" :download="excelDownload"><div class="tableTopRight">
				   		<i class="iconfont icon-xiazai-" ></i>
						</div></a>
					</el-tooltip>
<!--				   <div class="tableTopRight addBg" @click="addUserPop"><i class="icon-tianjia- iconfont" ></i></div>-->
					<div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete"><i class="icon-shanchu- iconfont"></i></div>
				</div>
			</div>
		  <div class="tableContent" :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				  <el-table-column type="selection"></el-table-column>				  
				  <el-table-column  label="序号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="帐单编号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="利息" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="对公" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="对私" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="账单类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="账单状态" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
				<el-table-column  label="账单月份" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="创建日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="成功日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="描述" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="操作人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div >
							<el-popover	placement="bottom"	trigger="hover">
<!--								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看</span>  </div>-->
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
				excelHref:'',
				excelDownload:'',
                searchMaster:{
                    time1:'',
                    type:'',
                    status:'',
                    time2:'',
                    operater:'',
                    agreementNo:'',
                    keyWords:'',
                },		
				storeMap:{
					time1:'houseOwnerTime1',
					type:'houseOwnerType',
					status:'houseOwnerStatus',
					time2:'houseOwnerTime2',
					operater:'houseOwnerOperater',
					agreementNo:'houseOwnerAgreementNo',
					keyWords:'houseOwnerKeyWords',
				},				
				storeArr:[					
					'time1',
					'time2',
					'keyWords',
					'type',
					'status',
					'agreementNo',
					'operater'
				],
				storeArrMatchParam:[
					'ptime1',
					'ptime2',
					'pkeyWords',
					'ptype',
					'pstatus',
					'pagreementNo',
					'poperater'
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
				computed:'auto',
				addVisible:false,				
				addForm:{},
				addRules:{},				
				delAble:false,
				time:Date.now(),
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
				pickerOptions2: this.DatePick.range, 
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],
                loading:true,
			}
		},
		mounted(){
			this.initTable();
			this.initSearch();
			this.generateExcel([]);
		},
		methods:{	
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
			initSearch(){
                let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
                this.runSearch(finalData);
			},
			inputChange(val,form,item){
                if(val){
                   this.StoreJs.set( this.storeMap[item],val );
                }else{
                    this.StoreJs.remove( this.storeMap[item] );
                }
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
			importExcel(){				
				 var file = this.$refs.importExcel.files[0];
					const excelReg = /(.(xls|xlsx))+$/i;
					if (excelReg.test(file.name) === false) {
						this.$message.error('请导入文件类型为excel格式的表格文件。');
						this.$refs.importStaffExcel.value="";
						return false;
					}else {
						const formData = new FormData();
						formData.append('file',file);
					}	
			},
			importManage(){

			},			
			saveAdd(){
				this.addVisible = false;
			},
			cancelAdd(){
				this.addVisible = false;
			},
			addUserPop(){
				this.addForm ={};
				this.addVisible = true;
			},
			popMultipleDelete(){
				if(this.delAble){
					this.showDelete = true;
				}
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
				let data = {};
				this.initSearch();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				let data = {};
				this.initSearch();
			},
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			runSearch(data){
//				console.log(data);
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
	.houseOwnerManageContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.addBg {
			background-color: #2a2f48 !important;
			margin-left: 20px;
			box-shadow: 0px 2px 10px 5px #dadbe1 !important;
		}
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
					.importStaffExcel {
						position: absolute;
						left: 0;
						width: 120px;
						height: 40px;
						opacity: 0;
						cursor: pointer;
						z-index: 2;
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
					.selectFile {
						cursor: pointer;
						width: 120px;
						border-radius: 20px;
						background-color: #fafafc;
						color: #2a2f48;
						height: 40px;
						line-height: 40px;
						text-align: center;
						font-size: 12px;
						position: relative;
						.iconfont {
							color: $mainRed;
						}
						span {
							vertical-align: 1px;
							font-weight: 600;
						}
					}
					.anotherSelectFile {
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
					background-color: #2a2f48;
					border-radius: 15px;
					line-height: 30px;
					text-align: center;
					color: #fff;
					box-shadow: 0px 2px 10px 5px#dadbe1;
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
.houseOwnerManageContainer {
	.diagCon .el-dialog {
		width: 540px;
		height: 560px;
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
}
</style>
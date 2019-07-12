<template>
  <div class="billPlanContainer">  	  
	  <div class="searchCon" v-if="initShow">
		  	<div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入合同号" v-model.trim="searchMaster.agreementNo1" clearable @change="inputChange(searchMaster.agreementNo1,'searchMaster','agreementNo1')"
						></el-input>
		 	</div>
		  	<div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.operater" placeholder="请选择" @change="inputChange(searchMaster.operater,'searchMaster','operater')">			
				  <el-option label="操作人(全部)" value=""></el-option>
				  <el-option label="周雪萍" value="10397"></el-option>
				  <el-option label="王紫莹" value="11332"></el-option>
				  <el-option label="孔令文" value="11369"></el-option>
				  <el-option label="史秋艳" value="24408"></el-option>
				  <el-option label="沈旭静" value="11338"></el-option>
				  <el-option label="钟丽丽" value="11340"></el-option>
				  <el-option label="包利琴" value="23885"></el-option>
				</el-select>
			</div>
		  	<div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''" v-model.trim="searchMaster.time1"  type="daterange" align="right"  unlink-panels range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time1,'searchMaster','time1')"  value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  	<div class="btnCon marBottom">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			  <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
		  	</div>
		</div>
	  <div class="searchCon" v-else>
		  	<div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入合同号" v-model.trim="searchMaster.agreementNo2" clearable @change="inputChange(searchMaster.agreementNo2,'searchMaster','agreementNo2')"></el-input>
		 	</div>
		  	<div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''"  v-model.trim="searchMaster.time2"  type="daterange" align="right"  unlink-panels  range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time2,'searchMaster','time2')" value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  	<div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.agreementType" placeholder="请选择" @change="inputChange(searchMaster.agreementType,'searchMaster','agreementType')">			
				  <el-option label="合同类型(全部)" value="0"></el-option>
				  <el-option label="出租合同" value="1"></el-option>
				  <el-option label="收房合同" value="2"></el-option>
				  <el-option label="续签合同" value="3"></el-option>				  
				</el-select>
			 </div>
		  	<div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status" placeholder="请选择" @change="inputChange(searchMaster.status,'searchMaster','status')">	
				  <el-option
                    v-for="item in reviewArrOption1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                	</el-option> 
				</el-select>
			</div>
		  	<div class="btnCon marBottom">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			  <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
		  	</div>
	  </div>
	   <div class="tableOuter" >
		   <div class="tableTop" >	
			   <div class="topLeft">				   
				   <div class="anotherSelectFile " @click="shutInit" v-if="!initShow">
						<i class="iconfont icon-chakanquanbuzhangdan-"></i>  <span> 返回账单计划</span>
					</div>
				    <div class="anotherSelectFile biggerSp" v-if="initShow">
						<input class="changeManageInput" ref="changeManageImport" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importManage">
						<i class="iconfont icon-shangchuan-"></i>  <span> 出租账单计划导入</span>
					</div>				   
				   <div class="anotherSelectFile checkAll" @click="checkAll" v-if="initShow">
						<i class="iconfont icon-chakanquanbuzhangdan-"></i>  <span> 查看全部账单</span>
					</div>				   
				</div>
			   <div class="topRight">
				   <el-tooltip content="下载" placement="bottom" effect="light">
					   <a :href="excelHref" :download="excelDownload"><div class="tableTopRight " v-if="!initShow">
							<i class="iconfont icon-xiazai-" ></i>
						</div></a>
					</el-tooltip>
				   <el-tooltip content="生成账单" placement="bottom" effect="light">
				   <div v-if="initShow" class="tableTopRight addBg" @click="generateBill"><i class="icon-shengchengzhangdan- iconfont" ></i></div>
					</el-tooltip>
				   <el-tooltip content="冻结账单" placement="bottom" effect="light">
					<div v-if="initShow" class="tableTopRightSp  cursor" @click="frozenBill"><i class="icon-dongjiezhangdan- iconfont"></i></div>
					</el-tooltip>
				</div>
			</div>		   
		   <div>		   
		  <div class="tableContent" v-if="initShow" :style="{width:computed}">			  
			  <el-table :data="tableData3" :key="1" tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				  <el-table-column  label="序号" type="index" show-overflow-tooltip></el-table-column>
				  <el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="房东/租客姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="收款人姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="起租日" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="到期日" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="打款总期数" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="总金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="代扣款额" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					   </template>
					</el-table-column>
				    <el-table-column  label="抵扣后金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <div >							
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看</span>  </div>
<!--								<div class="popperInner popperDelete" @click="popDelete(scope.row)"><i class="iconfont icon-shanchu-"></i> <span> 删除</span></div>-->
								<div  class="operate" slot="reference">操作</div>
							  </el-popover>							
                        </div>
                      </template>
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
			<div  class="tableContent" v-else :style="{width:computed}">
			  <el-table :data="tableData1" :key="2"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange">
				  <el-table-column  label="序号" type="index" show-overflow-tooltip>
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
				<el-table-column  label="类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="账单月份" show-overflow-tooltip>					
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>				  
				  <el-table-column  label="创建时间" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>				  
				  <el-table-column  label="备注" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>				  
				  <el-table-column  label="审核人" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
				</el-table>
				<div class="pagOuter">
					<el-pagination
					  @size-change="handleSizeChange2"
					  @current-change="handleCurrentChange2"
					  :current-page="current2"
					  :page-sizes="[10, 20, 30, 50]"
					  :page-size="size2"
					  layout="total, sizes, prev, pager, next, jumper"
					  :total="total2">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>	
	<el-dialog title="账单日期提前天数" :visible.sync="billVisible" class="diagCon addDiagCon" :close-on-click-modal="false">		
		<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="合同号" prop="name">
						<el-input v-model.trim="addForm.name"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'确定'" @click.native="confirmBill"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelBill"></GreyBtn>
				</div>
			</el-form>		
	</el-dialog>
    <el-dialog title="请输入合同号" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false">		
		<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="合同号" prop="agreementNo">
						<el-input v-model.trim="addForm.agreementNo"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'确定'" @click.native="saveAdd('addForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd('addForm')"></GreyBtn>
				</div>
			</el-form>		
	</el-dialog>
	<el-dialog title="请输入合同号" :visible.sync="addVisible2" class="diagCon addDiagCon" :close-on-click-modal="false">		
        <el-form :model="addForm2" :rules="addRules2" ref="addForm2" label-width="100px">
            <div class="scrollContainer">
                <el-form-item label="合同号" prop="agreementNo">
                    <el-input v-model.trim="addForm2.agreementNo"></el-input>
                </el-form-item>
            </div>
            <div class="diagBtnCon">
                <RedBtn :text="'确定'" @click.native="saveAdd2('addForm2')"></RedBtn>
				<GreyBtn class="marLeft" @click.native="cancelAdd2('addForm2')"></GreyBtn>
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
		},
        data(){
			return {
                loading:true,
				reviewArrOption1:[],	
				excelHref:'',
				excelDownload:'',
				computed:'auto',
				addVisible2:false,
				billVisible:false,
				addVisible:false,
				initShow:true,	
				addForm:{                    
                },
				addRules:{                    
                },
                addForm2:{                    
                },
                addRules2:{                    
                },
				delAble:false,
				showSingleDelete:false,
				multipleSelection:[],
				current2:1,
				size2:10,
				total2:0,
				pickerOptions2: this.DatePick.range, 
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],
				tableData1:[
//					{name:'me'},
//					{name:'me'}
				],
				tempPage:1,
				pageSize:10,
				pageTotal:1,
				current1:1,
				size1:10,
				total1:0,		
                searchMaster:{
                    agreementNo1:'',
                    operater:'',
                    time1:'',
                    agreementNo2:'',
                    time2:'',
                    agreementType:'',
                    status:'',		
                },						
				storeMap:{
					agreementNo1:'billPlanAgreementNo1',
					operater:'billPlanOperater',
					time1:'billPlanTime1',
					agreementNo2:'billPlanAgreementNo2',
					time2:'billPlanTime2',
					agreementType:'billPlanAgreementType',
					status:'billPlanStatus',
				},				
				storeArr:[					
					'time1',
					'time2',
					'agreementNo1',
					'operater',
					'agreementNo2',
					'agreementType',
					'status',
				],
				storeArrMatchParam:[
					'ptime1',
					'ptime2',
					'pagreementNo1',
					'poperater',
					'pagreementNo2',
					'pagreementType',
					'pstatus',
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
			}
		},
		mounted(){
			this.initTable();
			this.initSearch();	
			this.initreviewArrOption1();		
		},
		methods:{
			initreviewArrOption1(){
                let interfaceArr = [2,3,16,18,19,20,21,22];
                let final =this.StateData.reviewStatusArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });    
                final.splice(0,0,{
                    label:"状态（全部）",value:"",index:-1, 
                });
				this.reviewArrOption1 = final;
            },
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
			saveAdd2(str){
				this.addVisible2 = false;
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
			cancelAdd2(){
				this.addVisible2 = false;
			},
			confirmBill(){
				this.billVisible = false;
			},
			cancelBill(){
				this.billVisible = false;
			},
			saveAdd(str){                
				this.addVisible = false;
				this.billVisible = true;
			},
			cancelAdd(str){
				this.addVisible = false;
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
			runSearch1(data){
				console.log(data);	
			},
			runSearch(data){
				console.log(data);	
                this.loading = false;
			},
			handleSizeChange2(val){
				this.size2 = val;				
			},
			handleCurrentChange2(val){
				this.current2 = val; 
			},
			shutInit(){
				this.initShow = true;
			},
			checkAll(){
				this.initShow = false;
				this.generateExcel([]);
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
			generateBill(){
				this.addVisible = true;		   
			},
			frozenBill(){
				this.addVisible2 = true;
			},			
			editInfo(){
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/billPlan/detail',{id:1});  
			},		
			handleSizeChange1(val) {
				console.log(`每页 ${val} 条`);
				this.size1 = val;
				let data = {};
				this.runSearch1(data);
			},
			handleCurrentChange1(val) {
				this.current1 = val; 
				console.log(`当前页: ${val}`);
				let data = {};
				this.runSearch1(data);
			},
			handleSelectionChange(val) {
                this.multipleSelection = val;
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
	.checkAll {
		margin-left: 20px;
	}
	.cursor {
		cursor: pointer;
	}
	.biggerSp {
		width: 140px !important;
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
	.billPlanContainer {
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
					.changeManageInput {
						position: absolute;
						left: 0;
						width: 140px;
						height: 40px;
						opacity: 0;
						cursor: pointer;
						z-index: 2;
					}
					.anotherSelectFile {
						cursor: pointer;
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
        .marBottom {
            margin-bottom: 20px;        
        }
        .marRight {
            margin-right: 20px;
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
	.billPlanContainer {
        .diagCon {
            .el-dialog {
                width: 540px;
                height: 560px;
            }
            .el-select {
                width: 100%;
            }
        }
		.addDiagCon .el-dialog{
			height: 250px !important;
			.scrollContainer {
				height: 70px !important;
			}
		}
        .searchCon {
            .el-input__inner {
                border: none;
                border-radius: 20px;
            }
            .el-date-editor--daterange {
                width: 280px;
            }
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
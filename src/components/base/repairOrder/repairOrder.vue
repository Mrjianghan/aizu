<template>
  <div class="repairOrderManageContainer">  
	  <div class="searchCon flex">
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入合同号" v-model.trim="searchMaster.agreementNumber"clearable @change="inputChange(searchMaster.agreementNumber,'searchMaster','agreementNumber')"></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入下单人姓名" v-model.trim="searchMaster.orderMan" clearable @change="inputChange(searchMaster.orderMan,'searchMaster','orderMan')"
						></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入维修员姓名"  v-model.trim="searchMaster.repairMan"  clearable @change="inputChange(searchMaster.repairMan,'searchMaster','repairMan')"
						></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入小区名称" v-model.trim="searchMaster.communityName"  clearable @change="inputChange(searchMaster.communityName,'searchMaster','communityName')"
						></el-input>
		 </div>
		  <div class=" sameWidth marRight marBottom">
			  <el-select v-model.trim="searchMaster.supplies" placeholder="请选择" @change="inputChange(searchMaster.supplies,'searchMaster','supplies')">	
                  <el-option
                      v-for="item in furnitureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
				</el-select>
			</div>
		  <div class="sameWidth marRight marBottom">
			  <el-select v-model.trim="searchMaster.delegate" placeholder="请选择" @change="inputChange(searchMaster.delegate,'searchMaster','delegate')">	
				  <el-option
                    v-for="item in reviewArrOption1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                	</el-option> 
				</el-select>
			</div>
		  <div class="sameWidth marRight marBottom">
			  <el-select v-model.trim="searchMaster.type" placeholder="请选择" @change="inputChange(searchMaster.type,'searchMaster','type')">			
				  <el-option label="全部(类型)" value=""></el-option>
				  <el-option label="内部维修" value="false"></el-option>
				  <el-option label="外包" value="true"></el-option>
				</el-select>
			</div>
		  <div class="timerCon marRight marBottom">
			  <el-date-picker prefix-icon="''"  v-model.trim="searchMaster.time"  type="daterange"  align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time,'searchMaster','time')" value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  <div class="btnCon marBottom flex">			  
              <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
              <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex">	
			  <el-tooltip content="维修单表格下载" placement="bottom" effect="light">
			     <a :href="excelHref" :download="excelDownload">
				    <div class="tableTopRight">
					   <i class="iconfont icon-xiazai-" ></i>
				    </div>
			     </a>
                </el-tooltip>
				<el-tooltip content="新增" placement="bottom" effect="light">
			   <div class="tableTopRight addBg" @click="addUserPop"><i class="icon-tianjia- iconfont" ></i></div>
				</el-tooltip>
<!--
				<el-tooltip content="多选删除" placement="bottom" effect="light">
				  <div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete"><i class="icon-shanchu- iconfont"></i></div>
				</el-tooltip>
-->
			</div>
		  <div class="tableContent"  :style="{width:computed}">
			  <el-table  :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
<!--				  <el-table-column type="selection"></el-table-column>-->
				  <el-table-column  label="ID" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.id | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.contractNo | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.communityName | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="房源名称" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.houseName | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="最近空房下单日" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="维修专员" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="下单人姓名" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.ordererName | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="维修项目" show-overflow-tooltip>
					  <template slot-scope="scope">{{ tableArr1[scope.row.repairItem] | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="出租日期" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope"><span>{{ scope.row.name | emptyProcessor  }}</span></template>
					</el-table-column>
				    <el-table-column  label="创建日期" show-overflow-tooltip  min-width="140">
					  <template slot-scope="scope">{{ scope.row.gmtCreate | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="间隔" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{   new Map( [ [true,'外包'],[false,'内部维修'] ] ).get( scope.row.outsourcing )  | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ tableArr2[scope.row.status] | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <div >
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperSpecial" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看</span>  </div>
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
	<el-dialog title="新增" :visible.sync="addVisible" class="diagCon  coverDiagCon" :close-on-click-modal="false">
			<el-form :model="addForm"  ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="合同号" prop="name">
						<el-input v-model.trim="addForm.no"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'下一步'" @click.native="saveAdd"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
	<el-dialog title="新增" :visible.sync="newVisible" class="diagCon  newDiagCon" :close-on-click-modal="false">
			<el-form :model="newForm"  :rules="newRules"  ref="newForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="合同号" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
					<el-form-item label="小区" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
					<el-form-item label="地址" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
					<el-form-item label="合同起始时间" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
					<el-form-item label="合同结束时间" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
					<el-form-item label="联系人" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
					<el-form-item label="联系电话" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
					<el-form-item label="维修项目" prop="name">		
						<el-select v-model.trim="newForm.region" placeholder="请选择活动区域">
						  <el-option label="区域一" value="shanghai"></el-option>
						  <el-option label="区域二" value="beijing"></el-option>
						</el-select>
					  </el-form-item>
					<el-form-item label="维修类型" prop="name">
						<el-radio-group v-model.trim="newForm.resource">
						  <el-radio label="内部维修"></el-radio>
						  <el-radio label="外包"></el-radio>
						</el-radio-group>
					  </el-form-item>					
					<el-form-item label="维修师傅" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
					</el-form-item>
                            <el-form-item label="预约时间" >
                                  <el-date-picker prop="hiredate" v-model.trim="newForm.hiredate" align="right"  type="date" placeholder="选择日期" format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"   :picker-options="pickerOptions2">
                                    </el-date-picker>
                          </el-form-item>
					<el-form-item label="报修说明" prop="name">
						<el-input v-model.trim="newForm.no"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'确认下单'" @click.native="saveNew"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelNew"></GreyBtn>
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
                furnitureOptions:[],
				reviewArrOption1:[],
				excelHref:'',
				excelDownload:'',
				computed:'auto',
				newVisible:false,
				newForm:{},
				newRules:{},
				addVisible:false,
				addForm:{},	
				delAble:false,				
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
                pickerOptions2:this.DatePick.range,                
				tableData3:[],
                searchMaster:{
                    agreementNumber:'',
                    time:'',
                    orderMan:'',
                    repairMan:'',
                    supplies:'',
                    communityName:'',
                    type:'',
                    delegate:'',
                },
				storeMap:{
					time:'repairOrderTime',
					agreementNumber:'repairOrderAgreementNumber',
					orderMan:'repairOrderMan',
					repairMan:'repairOrderRepairMan',
					supplies:'repairOrderSupplies',
					communityName:'repairOrderCommunityName',
					type:'repairOrderType',
					delegate:'repairOrderDelegate',
				},
				storeArr:[		
					'time',
					'agreementNumber',					
					'orderMan',
					'repairMan',
					'supplies',
					'communityName',
					'type',
					'delegate',
				],
				storeArrMatchParam:[
					'ptime',
					'contractNo',					
					'ordererName',
					'receiverName',
					'repairItemEnum',
					'communityName',
					'outsourcing',
					'status',
				],
				timeParams:{
					ptime:[
						'gmtStart',
						'gmtEnd',
					],
				},	
                singleDeleteId:'',
                tableArr1:[],
                tableArr2:[],
			}
		},
		mounted(){			
			this.initTable();
			this.initSearch();
			this.generateExcel([]);    
			this.initreviewArrOption1();   
            this.initTableArr1();
            this.initTableArr2();
		},
		methods:{           
            initTableArr1(){
                this.furnitureOptions = [{label:"全部(维修类型)",value:"",index:-1,},...this.StateData.repairOrderFurnitureArr];     
                let obj = {};
                this.StateData.repairOrderFurnitureArr.forEach(ele=>{
                    obj[ele.value] = ele.label;
                });
                this.tableArr1 = obj;  
            },
            initTableArr2(){
                let obj = {};
                this.StateData.repairOrderStatusArr.forEach(ele=>{
                    obj[ele.value] = ele.label;
                });
                this.tableArr2 = obj;  
            },
			initreviewArrOption1(){
                let interfaceArr = [2,11,12,13,14,15];
                let final =this.StateData.reviewStatusArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });    
                this.reviewArrOption1 = [ {  label:"委托状态(全部)",value:"",index:-1, },...final ];
            },
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
			saveNew(){
				this.newVisible = false;
				this.Success.saveSuccess();
				this.Err.netErr();
			},
			cancelNew(){
				this.newVisible = false;
			},
			saveAdd(){
				if(this.addForm.no){
					if(this.addForm.no.length > 4){
					   this.addVisible = false;
						this.newVisible = true;
						this.newForm = {};
					}else{
					   this.$message.error('请检查合同号。');
					}
				}else{
					this.$message.error('不能为空。');
				}
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
			editInfo(row){                
                let data = {
                    id:row.id
                };    
                let AES = this.AES.encrypt(data);
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/repairOrderManage/detail',{
                    AES
                });                  
			},
			popDelete(row){
				console.log(row);
				this.showSingleDelete = true;
                this.singleDeleteId = row.id;
			},	
			quitSingleConfirm(){
				this.showSingleDelete = false;
                let data ={
                  id:this.singleDeleteId
                };                
                this.ApiLists[10008](data).then(res=>{
                    let { data:layer1 } = res;
                    let { message,success,data }=layer1;
                    if( success ){
                        let data= {};
                        this.runSearch(data);
                        this.Success.deleteSuccess();
                    }else{
                       this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err); 
                });  
			},
			quitSingleCancel(){
				this.showSingleDelete = false;
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
                this.current = 1;                
                this.size = val;
                this.initSearch();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
                this.current = val;
                this.initSearch();
			},
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			runSearch(data){
				console.log(data);  
                data.current = this.current;
                data.size = this.size;
                this.ApiLists[10004](data).then(res=>{
                    let { data:layer1 } = res;
                    let { data,success,message } = layer1;
                    if( success ){
                        this.tableData3 = data.records;
                        this.total= data.total;
                        this.loading = false;
                    }else{
                        this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err); 
                });                
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
    .marRight  {
        margin-right: 20px;
    }
    .marBottom {
        margin-bottom: 20px;
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
	.repairOrderManageContainer {
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
				height: 40px;
				flex-wrap: nowrap;
				justify-content:flex-end;
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
		}
		.searchCon {
			flex-wrap:wrap;
			justify-content:flex-start;
		}
		.btnCon {
			width: 200px;
			flex-wrap: nowrap;
			justify-content: space-between;
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
	.repairOrderManageContainer {
		.diagCon .el-dialog {
			width: 540px !important;
			height: 560px !important;
		}
		.coverDiagCon .el-dialog{
			height: 250px !important;
			.scrollContainer {
				height: 70px !important;
			}
		}
		.diagCon .el-select {
			width: 100%;
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
		.el-date-editor {
			width: 100%;
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
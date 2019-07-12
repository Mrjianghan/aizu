<template>
  <div class="deliveryOrderManageContainer">  
	  <div class="searchCon flex">
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入下单人姓名" v-model.trim="searchMaster.orderMan" clearable @change="inputChange(searchMaster.orderMan,'searchMaster','orderMan')" ></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入合同号"  v-model.trim="searchMaster.agreementNumber" clearable @change="inputChange(searchMaster.agreementNumber,'searchMaster','agreementNumber')"
						></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入房源名"  v-model.trim="searchMaster.houseName" clearable @change="inputChange(searchMaster.houseName,'searchMaster','houseName')"
						></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入小区名"  v-model.trim="searchMaster.communityName" clearable @change="inputChange(searchMaster.communityName,'searchMaster','communityName')"
						></el-input>
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
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.type" placeholder="请选择" @change="inputChange(searchMaster.type,'searchMaster','type')">			
				  <el-option label="类型(全部)" value=""></el-option>
				  <el-option label="新增" value="ADD"></el-option>
                  <el-option label="撤离" value="LEAVE"></el-option>
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model.trim="searchMaster.time"  type="daterange"  align="right" unlink-panels range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time,'searchMaster','time')" value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  <div class="btnCon marBottom flex">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
				<GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex">
			   <el-tooltip content="新增" placement="bottom" effect="light">
			   <div class="tableTopRight " @click="addUserPop"><i class="icon-tianjia- iconfont" ></i></div>
				</el-tooltip>
<!--				  <div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete"><i class="icon-shanchu- iconfont"></i></div>-->			   
			</div>
		  <div class="tableContent"  :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				    <el-table-column  label="ID" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.id | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.contractNo | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.communityName  | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="房源名称" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.houseName  | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="下单人姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.ordererName | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="创建日期" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.gmtCreate | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.status | emptyProcessor }}</template>
					</el-table-column>
                    <el-table-column  label="类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.deliveryType | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperSpecial" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看</span>  </div>
<!--								<div class="popperInner popperDelete" @click="popDelete(scope.row)"><i class="iconfont icon-shanchu-"></i> <span> 删除</span></div>-->
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
	<el-dialog title="输入合同号" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="addForm"  ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="合同号" >
						<el-input  v-model.trim="addForm.no"></el-input>
					  </el-form-item>
					<div class="radioContainer">
						<el-radio v-model="addForm.radio" label="Insert">新增</el-radio>
  						<el-radio v-model="addForm.radio" label="evacuation">撤离</el-radio>
					</div>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn @click.native="saveAdd('addForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd('addForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
  </div>
</template>
<script>
	import { required, minLength,helpers  } from 'vuelidate/lib/validators';
	const strNum = helpers.regex('alpha', /^[0-9a-zA-Z]*$/);
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
		validations:{
			addForm:{
				no:{
					required,
					strNum
				},
				radio:{
					required
				}
			}
		},
        data(){
			return {	
                loading:true,
                reviewArrOption1:[],
				computed:'auto',
				addVisible:false,		
				addForm:{
					no:'',
					radio:''
				},	
				delAble:false,				
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
                pickerOptions2:this.DatePick.range,  
				tableData3:[
//                    { name:'me' }
                ],	
                searchMaster:{
                    status:'',
                    orderMan:'',
                    houseName:'',
                    communityName:'',
                    agreementNumber:'',
                    type:'',
                    time:'',	
                },	
				storeMap:{					
					time:'deliveryOrderTime',
					type:'deliveryOrderType',
					status:'deliveryOrderStatus',
					orderMan:'deliveryOrderMan',
					houseName:'deliveryOrderHouseName',
					communityName:'deliveryOrderCommunityName',
					agreementNumber:'deliveryOrderAgreementNumber',
				},
				storeArr:[					
					'time',
					'type',
					'status',
					'orderMan',
					'houseName',
					'communityName',
					'agreementNumber',
				],
				storeArrMatchParam:[
					'ptime',
					'deliveryListType',
					'status',
					'ordererName',
					'houseName',
					'communityName',
					'contractNo',
				],
				timeParams:{
					ptime:[
						'gmtStart',
						'gmtEnd',
					],
				},					
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();
            this.initreviewArrOption1();
		},
		methods:{	
            initreviewArrOption1(){
                let interfaceArr = [2,8,9,10,11];
                let final =this.StateData.reviewStatusArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });   
                this.reviewArrOption1 = [ { label:"状态（全部）",value:"",index:-1, },...final ];
            },
			initSearch(){		
                let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
                this.runSearch(finalData);
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
			saveAdd(str){
				this.$v.addForm.no.$touch();
				this.$v.addForm.radio.$touch();			
				let condition1 = this.$v.addForm.no.$error;
				let condition2 = this.$v.addForm.radio.$error;				
				if( condition1||condition2 ){				   
					this.$message.error('请检查表单。');
				}else{
					this.addVisible = false;					                
//                    this.SimplifiedVerRouter.push(
//                        this.tagsLists,this.tagActive,'/main/deliveryOrderManage/new',{id:this.addForm.no,type:this.addForm.radio}
//                    );        
				}	
			},
			cancelAdd(str){
				console.log(str);
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
                    id:row.id,
                    contractId:row.contractId,
                    contractNo:row.contractNo,
                };    
                let AES = this.AES.encrypt(data);
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/deliveryOrderManage/detail',{
                    AES
                });    
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
			queryNow(){
				this.initSearch();
			},
			runSearch(data){
				console.log(data);
                data.current = this.current ;
                data.size = this.size ;
                this.ApiLists[10006](data).then(res=>{
                    let { data:layer1 } = res;
                    let { success,message,data } = layer1;             
                    if( success ){
                        this.tableData3 = data.records;
                        this.total = data.total;
                        this.loading = false;
                    }else{           
                        this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err); 
                });    
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
	.radioContainer {
		padding-left: 45px;
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
	.deliveryOrderManageContainer {
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
			height: 390px;
			overflow-y: scroll;
		}
	}
</style>
<style  lang="scss">
	.deliveryOrderManageContainer {
		.el-dialog__body { 
			padding: 30px 20px !important;
		}
		.diagCon .el-dialog {			
			width: 540px !important;
		}
		.addDiagCon .el-dialog{
			height: 280px !important;
			.scrollContainer {
				height: 90px !important;
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
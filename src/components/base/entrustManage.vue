<template>
  <div class="entrustManageContainer">  
	  <div class="searchCon flex">
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入委托人姓名"  v-model.trim="searchMaster.entrustName"  clearable @change="inputChange(searchMaster.entrustName,'searchMaster','entrustName')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model="searchMaster.rentType" placeholder="请选择" @change="inputChange(searchMaster.rentType,'searchMaster','rentType')">			
				  <el-option label="委托类型（全部）" value=""></el-option>
				  <el-option label="出租" value="RENT_OUT"></el-option>
				  <el-option label="租房" value="RENT"></el-option>
				</el-select>
			</div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model="searchMaster.status" placeholder="请选择" @change="inputChange(searchMaster.status,'searchMaster','status')">			
				  <el-option label="委托状态（全部）" value=""></el-option>
				  <el-option label="分配中" value="ALLOCATING"></el-option>
				  <el-option label="等待分配" value="WAITTING_REPLY"></el-option>
				  <el-option label="取消" value="CANCEL"></el-option>
				  <el-option label="完成" value="FINISH"></el-option>
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''" v-model="searchMaster.time" type="daterange" align="right" unlink-panels  range-separator="至" start-placeholder="创建开始日期"  end-placeholder="创建结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time,'searchMaster','time')"  value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  <div class="btnCon flex marBottom ">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			<GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex">
			   <el-tooltip content="多选删除" placement="bottom" effect="light">
				  <div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete">
					  <i class="icon-shanchu- iconfont"></i>
					</div>
				</el-tooltip>
			</div>
		  <div class="tableContent"  :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				  <el-table-column type="selection"> </el-table-column>
				<el-table-column  label="ID" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="是否可用" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="委托类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="委托状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="委托人姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="委托人手机号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="下单地址" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="创建日期" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
				<el-table-column  label="接收日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="接单业务员姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">							
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
                searchMaster:{
                    entrustName:'',
				    rentType:'',
				    status:'',
				    time:'',
                },  
				storeMap:{
					time:'entrustManageTime',
					status:'entrustManageStatus',
					entrustName:'entrustManageEntrustName',
					rentType:'entrustManageRentType',
				},
				storeArr:[					
					'time',
					'status',
					'entrustName',
					'rentType',
				],
				storeArrMatchParam:[
					'ptime',
					'pstatus',
					'pentrustName',
					'prentType',
				],
				timeParams:{
					ptime:[
						'ptimepart1',
						'ptimepart2',
					],
				},					
				delAble:false,				
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
				computed:'auto',
				pickerOptions2: this.DatePick.range, 
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],
                loading:true,
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();
		},
		methods:{	
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
			popDelete(row){
				console.log(row);
				this.showSingleDelete = true;
			},	
			quitSingleConfirm(){
				this.showSingleDelete = false;
				this.Success.deleteSuccess();
//				this.Err.netErr();
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
                this.size = val;
                this.current = 1;
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
                this.size = val;
                this.current = val;
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
	.entrustManageContainer {
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
		}
		.timerCon {
			width: 280px;
		}	
        .marBottom  {
            margin-bottom: 20px;
        }
        .marRight {
            margin-right: 20px;
        }
		.sameWidth {
			width: 170px;
		}
	}
</style>
<style  lang="scss">
	.entrustManageContainer {
        .diagCon {
            .el-dialog {
                width: 540px;
                height: 560px;
            }	
            .el-select {
                width: 100%;
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
	}
</style>
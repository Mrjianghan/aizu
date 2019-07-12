<template>
  <div class="housePreOrderContainer">  
	  <div class="searchCon flex">
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入房源名" v-model.trim="searchMaster.houseName"  clearable @change="inputChange(searchMaster.houseName,'searchMaster','houseName')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入合同号" v-model.trim="searchMaster.agreementNo"  clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model="searchMaster.preStatus" placeholder="请选择" @change="inputChange(searchMaster.preStatus,'searchMaster','preStatus')">			
				  <el-option label="全部" value=""></el-option>
				  <el-option label="已预定" value="RESERVED"></el-option>
				  <el-option label="取消预定" value="CANCEL"></el-option>
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.time" type="daterange"
						@change="inputChange(searchMaster.time,'searchMaster','time')"	  align="right" unlink-panels range-separator="至"
				  start-placeholder="预定开始日期"
				  end-placeholder="预定结束日期"
				  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
		  <div class="btnCon flex marBottom marRight">			  
			    <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
				<GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
		  </div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex">
			   <el-tooltip content="下载房源预定列表" placement="bottom" effect="light">
				   <a :href="excelHref" :download="excelDownload"><div class="tableTopRight">
					   <i class="iconfont icon-xiazai-" ></i>
					</div></a>
				</el-tooltip>
			</div>
		  <div class="tableContent" :style="{width:computed}">
			  <el-table  :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe  >
					<el-table-column  label="合同号" show-overflow-tooltip v-loading="loading">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="房源名称" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="业务员" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="租客" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="预定时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
                    <el-table-column  label="定金" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="操作人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="取消时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
                            <div  class="operate" @click="popQuit(scope.row)">退订</div>
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
		<Del v-if="showQuit" :head="'确定要退订吗？'" :delCon="quitConfirm" :delCancel="quitCancel"></Del>
	</transition>
  </div>
</template>
<script>
    export default {
        data(){
			return {
                loading:true,
				computed:'auto',                
                searchMaster:{
                    houseName:'',
                    agreementNo:'',
                    preStatus:'',
                    time:'',	
                },			
				storeMap:{
					time:'housePreTime',
					houseName:'housePreHouseName',
					agreementNo:'housePreAgreementNo',
					preStatus:'housePreStatus',
				},
				storeArr:[					
					'time',
					'houseName',
					'preStatus',
					'agreementNo',
				],
				storeArrMatchParam:[
					'ptime',
					'phouseName',
					'ppreStatus',
					'pagreementNo',
				],
				timeParams:{
					ptime:[
						'ptimepart1',
						'ptimepart2',
					],
				},					
				showQuit:false,
				current:1,
				size:10,
				total:0,
				pickerOptions2: this.DatePick.range, 
				tableData3:[
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
			initTable(){
                this.Digital.tableWidthController.bind(this)(300,'computed');  
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
			popQuit(row){
				this.showQuit = true;
				console.log(row);
			},
			quitConfirm(){
				this.showQuit = false;
				this.Success.normalSuccess();
//				this.Err.netErr();
			},
			quitCancel(){
				this.showQuit = false;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
                this.size = val; 
                this.current = 1;
                this.initSearch();
            },
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
                this.current = val; 
                this.initSearch();
            },
			runSearch(data){				
                data.current = this.current;
                data.size = this.size;
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
	.housePreOrderContainer {
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
	}
</style>
<style  lang="scss">
	.housePreOrderContainer {
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
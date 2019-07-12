<template>
  <div class="houseResourceListContainer">  
	  <div class="searchCon flex">
		  <div class="sameWidth">
			  <el-input  placeholder="输入城市名" v-model.trim="searchMaster.houseName"  clearable @change="inputChange(searchMaster.houseName,'searchMaster','houseName')" ></el-input>
		 </div>
		  <div class="sameWidth">
			  <el-input  placeholder="输入部门名" v-model.trim="searchMaster.agreementNo"  clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"></el-input>
		 </div>
		  <div class="sameWidth">
			  <el-input  placeholder="输入小区名" v-model.trim="searchMaster.community"  clearable @change="inputChange(searchMaster.community,'searchMaster','community')"></el-input>
		 </div>	
          <div class="sameWidth cusRateInput">
              <div class="cusDoubleInputCon flex">
                  <input placeholder="运营出租率起始值">
                 <span>至</span>
                  <input placeholder="运营出租率结束值">
                </div>
            </div>
          <div class="sameWidth cusRateInput">
              <div class="cusDoubleInputCon flex">
                  <input placeholder="空置率率起始值">
                 <span>至</span>
                  <input placeholder="空置率率结束值">
                </div>
            </div>
		  <div class="timerCon">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.time" type="daterange"
						@change="inputChange(searchMaster.time,'searchMaster','time')"	  align="right" unlink-panels range-separator="至"
				  start-placeholder="预定开始日期"
				  end-placeholder="预定结束日期"
				  :picker-options="pickerOptions2"  value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
		  <div class="btnCon flex">			  
			    <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
				<GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
		  </div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex">
			   <el-popover	placement="bottom"	trigger="hover">					
					<a :href="csvHref" :download="csvDownload"><div  class="popperEdit popperInner">导出为Csv文件</div></a>
				   <a :href="excelHref" :download="excelDownload"><div class="popperSpecial popperInner">导出为Excel文件</div></a>
				   <div class="tableTopRight"  slot="reference" @click="downLoadNow">
					   <i class="iconfont icon-xiazai-" ></i>
					</div>
				</el-popover>
			</div>           
		  <div :style="{width:computed}">
			  <el-table :data="tableData3"   tooltip-effect="dark"  style="width: 100%"   height="600"  stripe v-loading="loading">
					<el-table-column  label="城市名" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor}}</template>
					</el-table-column>
				    <el-table-column  label="部门" show-overflow-tooltip  >
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>				    
				    <el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
                    <el-table-column  label="总套数" show-overflow-tooltip >					
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="正常出租数" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="空置天数" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="可出租数" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="运营出租率" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="利润率" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
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
				csvHref:'de',
				csvDownload:'',
				excelHref:'de',
				excelDownload:'',
				computed:'auto',                
                searchMaster:{
                    area:'',
                    houseName:'',
                    community:'',
                    agreementNo:'',
                    city:'',
                    time:'',	
                    department:'',
                    status:'',	
                },
				storeMap:{
					time:'resourceListTime',
					area:'resourceListArea',
					houseName:'resourceListHouseName',
					community:'resourceListCommunity',
					agreementNo:'resourceListAgreementNo',
					city:'resourceListCity',
					department:'resourceListDepartment',
					status:'resourceListStatus',
				},
				storeArr:[					
					'time',
					'area',
					'houseName',
					'community',
					'agreementNo',
					'city',
					'department',
					'status',
				],
				storeArrMatchParam:[
					'ptime',
					'districtName',
					'name',
					'communityName',
					'contractNo',
					'cityName',
					'departmentId',
					'pstatus',
				],
				timeParams:{
					ptime:[
						'gmtStart',
						'gmtEnd',
					],
				},					
				showQuit:false,
				current:1,
				size:10,
				total:0,
                pickerOptions2:this.DatePick.range,
				tableData3:[
//                    { name:'me' }
                ],
			}
		},
		mounted(){
			this.initTable();
			this.initSearch();
			this.initDownload();
            
		},
		methods:{
			initTable(){                
                this.Digital.tableWidthController.bind(this)(290,'computed');                 
			},
			initDownload(){
				this.generateExcel([]);
				this.generateCsv([]);
			},
			generateExcel(buffer){		
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );				
				this.excelHref =  url;				
				let now = Date.now();				
//				console.log('now',now);				
				let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
//				console.log('format',format);
				this.excelDownload = `testtestme${format}.xls`;
				URL.revokeObjectURL(url);
			},
			generateCsv(buffer){			
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );				
				this.csvHref =  url;				
				let now = Date.now();				
//				console.log('now',now);				
				let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
//				console.log('format',format);
				this.csvDownload =  `testtestme${format}.csv`;
				URL.revokeObjectURL(url);
			},	
			initSearch(){                
                let data = this.Digital.getParams.bind(this)();  
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
				this.runSearch(finalData);		
                console.log( 'finalData',finalData );
			},
			inputChange(val,form,item){
                if(val){
                   this.StoreJs.set( this.storeMap[item],val );
                }else{
                    this.StoreJs.remove( this.storeMap[item] );
                }
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
			  },
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			downLoadNow(){
				let res = {};
			},
			runSearch(data){
				console.log(data);
                data.current = this.current;
                data.size = this.size;                
                this.loading = false;
//                this.ApiLists[](data).then(res=>{
//                    let { data } = res;
//                    console.log( data );                    
//                    if( data.success ){
//                        this.tableData3 = data.data.records;
//                    }else{
//                    }
//                }).catch(err=>{
//                    console.log(err); 
//                }); 
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
    ::-webkit-input-placeholder { /* WebKit browsers */
        color:    #c0c4cc;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #c0c4cc;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #c0c4cc;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #c0c4cc;
    }
    .cusRateInput {
        width: 280px !important;
        border-radius: 20px;
        background-color: #fff;
        height: 40px;
        line-height: 40px;
    }
    .cusDoubleInputCon {
        flex-wrap: nowrap;
        justify-content:space-around;
        span {
            font-size: 14px;
        }
        input {
            text-align: center;
            width: 110px;
            height: 34px;
            border: none;
            outline: none;
        }        
    }
    .limitHeight {
        max-height: 300px;
        overflow-y: scroll;
    }
		label {
			cursor: pointer;
		}
		.myCheckboxInput {
			& + span {
				background-image:url(../../../public/imgs/radioUnchecked.png);
			}
			&:checked + span {
				background-image:url(../../../public/imgs/radioChecked.png);
			}		
		}
	.houseResourceListContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.pagOuter {
			text-align: right;
			padding-top: 10px;
			box-sizing: border-box;
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
			margin-bottom: 20px;
			flex-wrap: nowrap;
			justify-content: space-between;
		}
		.timerCon {
			width: 280px;
			margin-right: 20px;
			margin-bottom: 20px;
		}
		.sameWidth {
			width: 170px;
			margin-bottom: 20px;
			margin-right: 20px;
		}
	}
</style>
<style  lang="scss">
	.houseResourceListContainer {
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
		.el-table--border {
			border-bottom: 1px solid #EBEEF5;
		}
	}
</style>
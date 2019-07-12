<template>
  <div class="houseResourceListContainer">  
	  <div class="searchCon flex">
		  <div class="sameWidth">
			  <el-input  placeholder="输入房源名" v-model.trim="searchMaster.houseName"  clearable @change="inputChange(searchMaster.houseName,'searchMaster','houseName')"></el-input>
		 </div>
		  <div class="sameWidth">
			  <el-input  placeholder="输入收房合同号" v-model.trim="searchMaster.agreementNo"  clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"></el-input>
		 </div>
		  <div class="sameWidth">
			  <el-input  placeholder="输入小区名" v-model.trim="searchMaster.community"  clearable @change="inputChange(searchMaster.community,'searchMaster','community')"></el-input>
		 </div>		  
		   <div class=" sameWidth">
			  <el-select v-model="searchMaster.city" placeholder="请选择城市名" @change="inputChange(searchMaster.city,'searchMaster','city')">			
				  <el-option label="城市（全部）" value=""></el-option>                  
				  <el-option label="杭州" value="杭州"></el-option>
				  <el-option label="上海" value="上海"></el-option>                  
                  <el-option label="苏州" value="苏州"></el-option>
				  <el-option label="宁波" value="宁波"></el-option>
                  <el-option label="绍兴" value="绍兴"></el-option>
				  <el-option label="湖州" value="湖州"></el-option>
                  <el-option label="海宁" value="海宁"></el-option>
				  <el-option label="嘉兴" value="嘉兴"></el-option>                  
				</el-select>
			</div>		  
		  <div class="sameWidth">
			  <el-input  placeholder="输入区域名" v-model.trim="searchMaster.area"  clearable @change="inputChange(searchMaster.area,'searchMaster','area')"></el-input>
		 </div>		  
		  <div class=" sameWidth">
			  <el-select v-model="searchMaster.department" placeholder="请选择" @change="inputChange(searchMaster.department,'searchMaster','department')">	
				  <el-option
                    v-for="item in departmentOptions"
                        :key="item.value"
                        :label="item.label"
                    	:value="item.value">
                	</el-option>
				</el-select>
			</div>
		  <div class=" sameWidth">
			  <el-select v-model="searchMaster.status" placeholder="请选择" @change="inputChange(searchMaster.status,'searchMaster','status')">			
				  <el-option label="状态（全部）" value="3"></el-option>                  
				  <el-option label="不可出租" value="2"></el-option>
				  <el-option label="可出租" value="1"></el-option>
                  <el-option label="已出租" value="0"></el-option>
				  <el-option label="出租签订中" value="5"></el-option>
                  <el-option label="已预定" value="4"></el-option>
				  <el-option label="准备违约" value="6"></el-option>
				</el-select>
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
			   <el-dropdown :hide-on-click="false">
					<div class="lightLeft" @click="">
					   <i class="icon-shaixuan- iconfont"></i>
					   <span>&nbsp;筛选&nbsp;&nbsp;&nbsp;&nbsp;</span>
						<i class="icon-xiala- iconfont"></i>
					</div>
				   	<el-dropdown-menu slot="dropdown" class="limitHeight">
						<div v-for="(obj,index) in storeCheckedArr" :key="index">							
							<el-dropdown-item>
								<label><div><input class="myCheckboxInput" type="checkbox" v-model="checked" :value="obj.name" @change="cusInputChange('obj.name')"><span></span><span>{{obj.chinese}}</span></div></label>
							</el-dropdown-item>
						</div>
					  </el-dropdown-menu>
				</el-dropdown>
			   <el-popover	placement="bottom"	trigger="hover">					
					<a :href="csvHref" :download="csvDownload"><div  class="popperEdit popperInner">导出为Csv文件</div></a>
				   <a :href="excelHref" :download="excelDownload"><div class="popperSpecial popperInner">导出为Excel文件</div></a>
				   <div class="tableTopRight"  slot="reference" @click="downLoadNow">
					   <i class="iconfont icon-xiazai-" ></i>
					</div>
				</el-popover>
			</div>           
		  <div :style="{width:computed}">
			  <el-table :data="tableData3" tooltip-effect="dark"  style="width: 100%"   height="600"  stripe v-loading="loading">
                    <el-table-column  label="城市名" show-overflow-tooltip v-if="testStatus('cityName')">
                            <template slot-scope="scope"><div>{{ scope.row.value  | emptyProcessor }}</div></template>
                        </el-table-column>
                    <el-table-column  label="区域名" show-overflow-tooltip v-if="testStatus('areaName')">
                            <template slot-scope="scope"><div>{{ scope.row.value  | emptyProcessor }}</div></template>
                        </el-table-column>
                    <el-table-column  label="合同号" show-overflow-tooltip v-if="testStatus('agreementNo')">
                            <template slot-scope="scope"><div>{{ scope.row.value  | emptyProcessor }}</div></template>
                        </el-table-column>
                    <el-table-column  label="小区名" show-overflow-tooltip v-if="testStatus('community')">
                            <template slot-scope="scope"><div>{{ scope.row.value  | emptyProcessor}}</div></template>
                        </el-table-column>
                    <el-table-column  label="房源名" show-overflow-tooltip v-if="testStatus('houseName')">
                            <template slot-scope="scope"><div>{{ scope.row.value  | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="部门" show-overflow-tooltip v-if="testStatus('department')">
                            <template slot-scope="scope"><div>{{ scope.row.value  | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="收房业务员" show-overflow-tooltip v-if="testStatus('salesMan')" min-width="100">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房源责任人" show-overflow-tooltip v-if="testStatus('responsiblePerson')" min-width="100">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="违约专员" show-overflow-tooltip v-if="testStatus('violationManager')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="空置总天数" show-overflow-tooltip v-if="testStatus('totalVacant')" min-width="100">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="空置天数" show-overflow-tooltip v-if="testStatus('vacant')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="前置免租期" show-overflow-tooltip v-if="testStatus('prepose')" min-width="100">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房源备注" show-overflow-tooltip v-if="testStatus('note')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
            <el-table-column  label="面积" show-overflow-tooltip v-if="testStatus('squareMeasure')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="总楼层" show-overflow-tooltip v-if="testStatus('totalFloor')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房型" show-overflow-tooltip v-if="testStatus('roomType')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="朝向" show-overflow-tooltip v-if="testStatus('direction')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="收进价格" show-overflow-tooltip v-if="testStatus('incomePrice')">
                            <template slot-scope="scope"><div>{{ scope.row.value | formatMoneyValueWithMark | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="佣金" show-overflow-tooltip v-if="testStatus('commission')">
                            <template slot-scope="scope"><div>{{ scope.row.value | formatMoneyValueWithMark | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="有线电视户号" show-overflow-tooltip v-if="testStatus('cableTvNo')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="有线电视是否开通" show-overflow-tooltip v-if="testStatus('cableTvAble')" min-width="140">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="水户号" show-overflow-tooltip v-if="testStatus('waterNo')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="煤气户号" show-overflow-tooltip v-if="testStatus('gasNo')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="电户号" show-overflow-tooltip v-if="testStatus('electricNo')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="收房开始时间" show-overflow-tooltip v-if="testStatus('timeOfCollection')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="收房结束时间" show-overflow-tooltip v-if="testStatus('closingDate')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="公司定价" show-overflow-tooltip v-if="testStatus('companyPrice')">
                            <template slot-scope="scope"><div>{{ scope.row.value | formatMoneyValueWithMark | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="实际出租价格" show-overflow-tooltip v-if="testStatus('actualPrice')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | formatMoneyValueWithMark | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房源价格" show-overflow-tooltip v-if="testStatus('priceOfHouse')">
                            <template slot-scope="scope"><div>{{ scope.row.value | formatMoneyValueWithMark | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="出租合同号" show-overflow-tooltip v-if="testStatus('contractNo')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="出租类型" show-overflow-tooltip v-if="testStatus('rentType')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="出租开始时间" show-overflow-tooltip v-if="testStatus('startOfRentalTime')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="出租结束时间" show-overflow-tooltip v-if="testStatus('endOfRentalTime')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="租客姓名" show-overflow-tooltip v-if="testStatus('tenant')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="租客号码" show-overflow-tooltip v-if="testStatus('tenantPhone')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="租客身份证号码" show-overflow-tooltip v-if="testStatus('tenantId')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="租客信息备注" show-overflow-tooltip v-if="testStatus('tenantInfo')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="出租业务员" show-overflow-tooltip v-if="testStatus('rentalSalesman')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="续签涨价" show-overflow-tooltip v-if="testStatus('priceIncrease')">
                            <template slot-scope="scope"><div>{{ scope.row.value  | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="服务费" show-overflow-tooltip v-if="testStatus('serviceFee')">
                            <template slot-scope="scope"><div>{{ scope.row.value | formatMoneyValueWithMark | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="租客收租方式" show-overflow-tooltip v-if="testStatus('rentCollectionMethod')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房东姓名" show-overflow-tooltip v-if="testStatus('landlord')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房东身份证" show-overflow-tooltip v-if="testStatus('landlordId')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房东号码" show-overflow-tooltip v-if="testStatus('landlordPhone')">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房东信息备注" show-overflow-tooltip v-if="testStatus('landlordInfo')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
                        </el-table-column>
                <el-table-column  label="房东收租方式" show-overflow-tooltip v-if="testStatus('landlordRentCollectionMethod')" min-width="120">
                            <template slot-scope="scope"><div>{{ scope.row.value | emptyProcessor }}</div></template>
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
				tableData3:[
//                    {  value:'me'  },
                ],
                loading:true,
				csvHref:'de',
				csvDownload:'',
				excelHref:'de',
				excelDownload:'',
				storeCheckedArr:[
					{name:'cityName',chinese:'城市名'},
					{name:'areaName',chinese:'区域名'},
					{name:'agreementNo',chinese:'合同号'},
					{name:'community',chinese:'小区名'},
					{name:'houseName',chinese:'房源名'},
					{name:'department',chinese:'部门'},
					{name:'salesMan',chinese:'收房业务员'},
					{name:'responsiblePerson',chinese:'房源责任人'},
					{name:'violationManager',chinese:'违约专员'},
					{name:'totalVacant',chinese:'空置总天数'},	
					{name:'vacant',chinese:'空置天数'},
					{name:'prepose',chinese:'前置免租期'},
					{name:'note',chinese:'房源备注'},
					{name:'squareMeasure',chinese:'面积'},
					{name:'totalFloor',chinese:'总楼层'},
					{name:'roomType',chinese:'房型'},
					{name:'direction',chinese:'朝向'},
					{name:'incomePrice',chinese:'收进价格'},
					{name:'commission',chinese:'佣金'},
					{name:'cableTvNo',chinese:'有线电视户号'},
					{name:'cableTvAble',chinese:'有线电视是否开通'},
					{name:'waterNo',chinese:'水户号'},
					{name:'gasNo',chinese:'煤气户号'},
					{name:'electricNo',chinese:'电户号'},
					{name:'timeOfCollection',chinese:'收房开始时间'},					
					{name:'closingDate',chinese:'收房结束时间'},
					{name:'companyPrice',chinese:'公司定价'},
					{name:'actualPrice',chinese:'实际出租价格'},
					{name:'priceOfHouse',chinese:'房源价格'},
					{name:'contractNo',chinese:'出租合同号'},
					{name:'rentType',chinese:'出租类型'},
					{name:'startOfRentalTime',chinese:'出租开始时间'},					
					{name:'endOfRentalTime',chinese:'出租结束时间'},
					{name:'tenant',chinese:'租客姓名'},
					{name:'tenantPhone',chinese:'租客号码'},
					{name:'tenantId',chinese:'租客身份证号码'},
					{name:'tenantInfo',chinese:'租客信息备注'},
					{name:'rentalSalesman',chinese:'出租业务员'},
					{name:'priceIncrease',chinese:'续签涨价'},
					{name:'serviceFee',chinese:'服务费'},
					{name:'rentCollectionMethod',chinese:'租客收租方式'},
					{name:'landlord',chinese:'房东姓名'},
					{name:'landlordId',chinese:'房东身份证'},
					{name:'landlordPhone',chinese:'房东号码'},
					{name:'landlordInfo',chinese:'房东信息备注'},
					{name:'landlordRentCollectionMethod',chinese:'房东收租方式'},		
				],
				checked:[
					'cityName',
					'areaName',
					'agreementNo',
					'community',
					'houseName',
					'department',
					'salesMan',
					'responsiblePerson',
					'violationManager',
					'totalVacant',
					'vacant',
					'prepose',					
					'note',
					'squareMeasure',
					'totalFloor',
					'roomType',
					'direction',
					'incomePrice',
					'commission',
					'cableTvNo',
					'cableTvAble',
					'waterNo',
					'gasNo',
					'electricNo',
					'timeOfCollection',
					'closingDate',
					'companyPrice',
					'actualPrice',
					'priceOfHouse',
					'contractNo',
					'rentType',
					'startOfRentalTime',
					'endOfRentalTime',
					'tenant',
					'tenantPhone',
					'tenantId',
					'tenantInfo',
					'rentalSalesman',					
					'priceIncrease',
					'serviceFee',
					'rentCollectionMethod',
					'landlord',
					'landlordId',
					'landlordPhone',
					'landlordInfo',
					'landlordRentCollectionMethod',					
				],
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
				departmentOptions:[],               
			}
		},
		mounted(){
			this.initTable();
			this.initSearch();
			this.initDownload();
			this.initDepartmentOptions();
		},
		methods:{
			initDepartmentOptions(){
                let interfaceArr = [0,1,2,3,4,5,6,7,8];
                let final =this.StateData.departmentArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                        return val;
                    }
                });
                this.departmentOptions = final;
            },
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
			cusInputChange(val){
                let storeArr = this._.cloneDeep(this.tableData3); 
                this.tableData3 = [];
                this.$nextTick(()=>{
                    this.tableData3 = storeArr;
                });
			},			
			testStatus(val){
				let final = this.checked.includes(val);	
				return final;
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
                this.ApiLists[10010](data).then(res=>{
                    let { data } = res;
                    console.log( data );                    
                    if( data.success ){
                        this.tableData3 = data.data.records;
                        this.loading = false;
                    }else{
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
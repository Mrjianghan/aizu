<template>
  <div class="illegalContainer">  
	  <div class="searchCon flex">
          <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.houseLord" placeholder="请选择身份" @change="inputChange(searchMaster.houseLord,'searchMaster','houseLord')">	
				  <el-option label="房东" value="true"></el-option>
				  <el-option label="租客" value="false"></el-option>
				</el-select>
			</div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入关键词" v-model.trim="searchMaster.keyWords" clearable @change="inputChange(searchMaster.keyWords,'searchMaster','keyWords')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入违约专员" v-model.trim="searchMaster.commissioner" clearable @change="inputChange(searchMaster.commissioner,'searchMaster','commissioner')"></el-input>
		 </div>		  
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.type" placeholder="请选择" @change="inputChange(searchMaster.type,'searchMaster','type')">			
				  <el-option label="全部" value=""></el-option>
				  <el-option label="到期" value="EXPIRE"></el-option>
				  <el-option label="公司违约" value="COMPANY_DEFAULT"></el-option>
				  <el-option label="房东违约" value="LANDLORD_BREACH"></el-option>
				  <el-option label="催款" value="PRESS_FOR_MONEY"></el-option>
				  <el-option label="租客违约" value="TENANT_BREACH"></el-option>
				  <el-option label="转租违约" value="SUBLET_BREACH"></el-option>
				  <el-option label="换房违约" value="EXCHANGE_HOUSES_BREACH"></el-option>
				  <el-option label="水电催收" value="WATER_ELECTRICITY_URGE"></el-option>
				</el-select>
			</div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status1" placeholder="请选择" @change="inputChange(searchMaster.status1,'searchMaster','status1')">			
				  <el-option label="全部（状态）" value=""></el-option>
				  <el-option label="待处理" value="PENDING"></el-option>
				  <el-option label="待审核" value="AUDIT"></el-option>
				  <el-option label="完成" value="SUCCESS"></el-option>
				</el-select>
			</div>
		 <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status2" placeholder="请选择" @change="inputChange(searchMaster.status2,'searchMaster','status2')">			
				  <el-option label="全部(打款状态)" value=""></el-option>
				  <el-option label="已打款" value="true"></el-option>
				  <el-option label="未打款" value="false"></el-option>
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.time1"  type="daterange"  align="right"  unlink-panels  range-separator="至"  start-placeholder="登记开始日期"  end-placeholder="登记结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time1,'searchMaster','time1')" format="yyyy-MM-dd" 
						value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker
				prefix-icon="''"
				  v-model="searchMaster.time2"
				  type="daterange"
				  align="right"
				  unlink-panels
				  range-separator="至"
				  start-placeholder="回收开始日期"
				  end-placeholder="回收结束日期"
				  :picker-options="pickerOptions2"
				@change="inputChange(searchMaster.time2,'searchMaster','time2')"  
                format="yyyy-MM-dd" 
				value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker
				prefix-icon="''"
				  v-model="searchMaster.time3"
				  type="daterange"
				  align="right"
				  unlink-panels
				  range-separator="至"
				  start-placeholder="违约开始日期"
				  end-placeholder="违约结束日期"
				  :picker-options="pickerOptions2"
					@change="inputChange(searchMaster.time3,'searchMaster','time3')" value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
		  <div class="btnCon flex marBottom">			  
              <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
              <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
            </div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex" >	
			   <div class="topLeft flex"></div>
			   <div class="topRight flex">
				   <el-tooltip content="违约单下载" placement="bottom" effect="light">
					   <a :href="excelHref" :download="excelDownload" ref="anchor"><div class="tableTopRight" @click="anchorClick('anchor')">
							<i class="iconfont icon-xiazai-" ></i>
						</div></a>
					</el-tooltip>
				   <el-tooltip content="新建违约单" placement="bottom" effect="light">
					   <div class="tableTopRight addBg" @click="addUserPop('agreementForm')">
						   <i class="icon-tianjia- iconfont" ></i>
						</div>
					</el-tooltip>
				   <el-tooltip content="新建到期通知" placement="bottom" effect="light">
						<div class="tableTopRightSp"@click="popNotification('agreementForm2')">
							<i class="icon-tongzhi- iconfont"></i>
						</div>
					</el-tooltip>
				</div>
			</div>
		   <div class="tableContent" :style="{width:computed}">
			   <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				   <el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
					<el-table-column  label="合同号" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.contractNo | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="登记人" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="违约专员" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.breachConsumerName | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="房东" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="租客号码" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="小区" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.communityName | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="房源名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="登记时间" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name | emptyProcessor }}</span>
					</template>
					</el-table-column>
					<el-table-column  label="房租付至日" show-overflow-tooltip min-width="130">
					  <template slot-scope="scope">{{ scope.row.gmtCallBack | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="房租结算止日期" show-overflow-tooltip min-width="170">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="财务办结时间" show-overflow-tooltip min-width="170">
					  <template slot-scope="scope">{{ scope.row.gmtFinish | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="违约专员办结时间" show-overflow-tooltip min-width="170">
					  <template slot-scope="scope">{{ scope.row.gmtRentSettlement | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="工作时长" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.duration | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="间隔" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.interval | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="状态" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.status | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="类型" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.type | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="是否打款" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.isRemit | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="账户名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="银行账户" show-overflow-tooltip min-width="150">
					  <template slot-scope="scope">{{ scope.row.bankCardNo | emptyProcessor}}</template>
					</el-table-column>
					<el-table-column  label="财务总金额" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看</span>  </div>
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
		<el-form :model="agreementForm" label-width="100px">
			<div class="scrollContainer">
				<el-form-item label="违约合同号">
					<el-input v-model.trim="agreementForm.no"></el-input>
				</el-form-item>					 
			</div>
			<div class="diagBtnCon flex">
				<RedBtn :text="'查询'" @click.native="queryDefaultForm('agreementForm')"></RedBtn>
			</div>
		</el-form>
	</el-dialog>
	<el-dialog title="新增违约单" :visible.sync="defaultFormShow" class="diagCon " :close-on-click-modal="false">
		<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="140px">
			<div class="scrollContainer">
				<el-form-item label="合同号" >
					<el-input v-model.trim="addForm.agreementNo" disabled></el-input>
				</el-form-item>		
					<el-form-item label="业务员" >
						<el-input v-model.trim="addForm.salesman" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="小区名称" >
						<el-input v-model.trim="addForm.communityName" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="房东姓名">
						<el-input v-model.trim="addForm.renterName" disabled></el-input>
					  </el-form-item>		
					<el-form-item label="房东电话" >
						<el-input v-model.trim="addForm.renterMobile" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="房屋地址">
						<el-input v-model.trim="addForm.houseName" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="合同开始时间" >
						<el-input v-model.trim="addForm.agencyStartDate" disabled></el-input>
					  </el-form-item>		
					<el-form-item label="合同结束时间">
						<el-input v-model.trim="addForm.agencyEndDate" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="房租">
						<el-input v-model.trim="addForm.rentAmount" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="电户号">
						<el-input v-model.trim="addForm.electricAccount" disabled></el-input>
					  </el-form-item>		
					<el-form-item label="押付信息">
						<el-input v-model.trim="addForm.mortgageInfo" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="支付方式">
						<el-input v-model.trim="addForm.paymentMethod" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="到期房屋回收时间">
						<el-input v-model.trim="addForm.agencyEndDate" disabled></el-input>
					  </el-form-item>	
					<el-form-item label="房租付至日" prop="breachCallbackDate">
                        <el-date-picker
                            v-model="addForm.breachCallbackDate"
                            align="right"
                            type="date"
                            value-format="yyyy-MM-dd"            
                            placeholder="选择日期"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
					  </el-form-item>
					 <el-form-item label="违约专员" prop="defaultCommissioner">
						<el-select v-model.trim="addForm.defaultCommissioner" placeholder="请选择">
                            <el-option
                              v-for="item in rolesOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
						</el-select>
					  </el-form-item>
					<el-form-item label="违约类型" prop="breachType">
						<el-select v-model.trim="addForm.breachType" placeholder="请选择">
                            <el-option
                              v-for="item in breachTypeOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>                 
						</el-select>
					  </el-form-item>
					<el-form-item label="备注说明">
						<el-input type="textarea" :rows="4" :resize="'none'" v-model.trim="addForm.description"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'提交'" @click.native="submitForm('addForm')"></RedBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="输入合同号" :visible.sync="addVisible1" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="agreementForm2" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="合同号" prop="name">
						<el-input v-model.trim="agreementForm2.no"></el-input>
					  </el-form-item>					 
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'确定'" @click.native="popNotice('agreementForm2')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelThis"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
  </div>
</template>
<script>	
	import { mapGetters } from 'vuex'	
	import { required,helpers } from 'vuelidate/lib/validators';
	const strNum = helpers.regex('alpha', /^[a-zA-Z0-9]*$/);      
    import WebSocket from 'isomorphic-ws';
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
		validations: {
			agreementForm:{
				no:{
					required,
					strNum
				}
			},
			agreementForm2:{
				no:{
					required,
					strNum
				}
			},
		},
        data(){
			return {
                loading:true,
                pickerOptions1:this.DatePick.date, 
                breachTypeOptions:[],
                rolesOptions:[],
				agreementForm:{},
				agreementForm2:{},
                searchMaster:{
                    time1:'',
                    time2:'',
                    time3:'',
                    type:'',
                    status1:'',
                    status2:'',
                    keyWords:'',
                    commissioner:'',
                    houseLord:'',
                },			
				computed:'auto',
				defaultFormShow:false,
				addVisible:false,
				addVisible1:false,
				addForm:{},
				addRules:{
                    breachCallbackDate:[
                        { required: true, message: '请选择', trigger: ['blur', 'change']}
                    ],
                    defaultCommissioner:[
                        { required: true, message: '请选择', trigger: ['blur', 'change']}
                    ],
                    breachType:[
                        { required: true, message: '请选择', trigger: ['blur', 'change']}
                    ],
                },
				delAble:false,				
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:1,
				pickerOptions2: this.DatePick.range, 
				tableData3:[
//                    {name:'me'}
                ],
				tempPage:1,
				pageSize:10,
				pageTotal:1,
				storeMap:{
					time1:'illegalTime1',
					time2:'illegalTime2',
					time3:'illegalTime3',
					type:'illegalType',
					status1:'illegalStatus1',
					status2:'illegalStatus2',
					keyWords:'illegalKeyWords',
					commissioner:'illegalCommissioner',	
                    houseLord:'illegalHouseLord',
				},
				storeArr:[
					'time1',
					'time2',
					'time3',
					'type',
					'status1',
					'status2',
					'keyWords',
					'commissioner',
                    'houseLord'
				],
				storeArrMatchParam:[
					'ptime1',
					'ptime2',
					'ptime3',
					'type',
					'status',
					'isRemit',
					'keywords',
					'breachName',
                    'landlordBreach',
				],
				timeParams:{
					ptime1:[
						'gmtCreateStart',
						'gmtCreateEnd',
					],
					ptime2:[
						'ptime2part1',
						'ptime2part2',
					],
					ptime3:[
						'gmtAuditStart',
						'gmtAuditEnd',
					],
				},
				excelHref:false,
				excelDownload:false,
			}
		},
		mounted(){
			this.setTable();
			this.initSearch();  
            this.initBreachTypeOptions();
//            const ws = new WebSocket('ws://localhost:3000/');
//            ws.onopen = function open() {
//              console.log('connected');
//              ws.send(Date.now());
//            };
//            ws.onmessage = function incoming(data) {
//              console.log('onmessagedata',data);
//              setTimeout(function timeout() {
//                ws.send(Date.now());
//              }, 2000);
//            };
		},
		methods:{
            initBreachTypeOptions(){
                let interfaceArr = [0,1,2,3,4,5];
                let final =this.StateData.breachTypeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });   
				this.breachTypeOptions = final;
            },            
            queryNow(){     
                console.log( 'queryNow',this.searchMaster.houseLord );   
                this.StoreJs.set( this.storeMap['houseLord'],this.searchMaster.houseLord  );
                let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
                this.runSearch(finalData);
			},
			runSearch(data){               
                data.size = this.size;
                data.current = this.current;
                data.landlordBreach = this.searchMaster.houseLord;                
                this.ApiLists[10011](data).then(res=>{                    
                    let { data:layer1 } = res;                    
                    let { success,message,data } = layer1;  
                    if( success ){
                        this.tableData3 = data.records;                        
                        this.tableData3.forEach(ele=>{
                            ele.gmtCallBack = this.DayJs(ele.gmtBreachCallback).format('YYYY-MM-DD');
                        });
                        this.total = data.total;
                        this.loading = false;
                    }else{           
                        this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err);
                })                
			},
			anchorClick(ref){			
				this.ApiLists[10002]().then(res=>{
					let { status,data } = res;
					console.log( 'data',data );
					this.generateExcel( data );						
					this.$nextTick(()=>{
						this.$refs[ref].click();
						this.$nextTick(()=>{
							this.excelHref = false;
							this.excelDownload = false;
						});
					});					
				}).catch(err=>{
					console.log(err);
				});
			},
			inputChange(val,form,item){
                if(val){
                   this.StoreJs.set( this.storeMap[item],val );
                }else{
                    this.StoreJs.remove( this.storeMap[item] );
                }
			},
			setTable(){                
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
            specialHandler(){
                this.searchMaster.houseLord = 'false';
                this.StoreJs.set( this.storeMap['houseLord'],'false' );
            },
			initSearch(){	
                let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);                  
                if( this.StoreJs.get( this.storeMap['houseLord']) ){
                    this.searchMaster.houseLord = this.StoreJs.get( this.storeMap['houseLord']);
                }else{
                    this.specialHandler();
                }                
                this.runSearch(finalData);
			},
			submitForm(str){
//				this.defaultFormShow = false;
//                               
                let validate = this.Digital.shorterValidate.bind(this)(str);                
                if( validate ){
//                    
                    console.log( this.addForm );                    
                    let data1 = {
                        breachBillType:this.addForm.breachType,
                        breacherId:this.addForm.defaultCommissioner,
                        contractId:this.addForm.contractId,
                        description:this.addForm.description,
                        gmtBreachCallBack:this.addForm.breachCallbackDate,
                    }; 
                    console.log( 'data1',data1 );
                    this.ApiLists[10021](data1).then(res=>{
                        let { data:layer1 } = res;
                        let { data,message,success } = layer1;
                        if( success ){
                            console.log( data,message,success );
                            this.defaultFormShow = false;
                        }else{
                            this.$message.error(message);
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }

                
                
                
			},
			popNotice(str){
				this.$v.agreementForm2.no.$touch();
				let condition = this.$v.agreementForm2.no.$error;
				if( condition ){				   
					this.$message.error('请检查合同号。');					
				 }else{
					this.addVisible1 = false;	
					this.$notify({
					  title: '成功',
					  message: '这是一条成功的提示消息',
					  type: 'success'
					});	
//					this.$notify.error({
//					  title: '错误',
//					  message: '这是一条错误的提示消息'
//					});
					//根据反馈结果
				 }		
			},
			cancelThis(){
				this.addVisible1 = false;
			},
			queryDefaultForm(str){
				console.log(str,this[str]);				
				this.$v.agreementForm.no.$touch();
				let condition = this.$v.agreementForm.no.$error;
				if( condition ){				   
					this.$message.error('请检查合同号。');					
				 }else{
				    this.addForm.agreementNo = this[str].no;
                     let data2 = {
                         contractNo:this.addForm.agreementNo
                     };
                     this.ApiLists[10029](data2).then(res=>{
                         let { data:layer1 } = res;
                         let { data,message,success } = layer1;
                         if( success ){
                             this.addForm = data;
                             this.addForm.agreementNo = data2.contractNo;
                             let fix = Math.round(+data.rentAmount + 'e' + 2) / Math.pow(10, 2);
                             let finalFix = fix.toLocaleString('zh-CN',{ style: 'currency', currency: 'CNY' });
                             this.addForm.rentAmount = finalFix;
                             this.addForm.mortgageInfo = `押${data.pledgeCount}付${data.perMonth}`;
                             this.addForm.paymentMethod = `每${data.perMonth}个月支付`;
                             this.addForm.electricAccount = data.electricAccount ? data.electricAccount :'无';
                             this.addForm.breachCallbackDate = this.DayJs(data.gmtBreachCallback).format('YYYY-MM-DD'); 
                             this.addVisible = false;
					         this.defaultFormShow = true;                             
                             let data1 = {
                                 roleNum:'COMMISSIONER'
                             };
                             this.ApiLists[10030](data1).then(res=>{                         
                                 let { data:layer1 } = res;
                                 let { data,message,success } = layer1;
                                 if( success ){
                                    this.rolesOptions = data;
                                }else{
                                    this.$message.error(message);
                                }
                             }).catch(err=>{
                                 console.log(err);
                             })
                        }else{
                            this.$message.error(message);
                            this.addVisible = true;
                        }
                     }).catch(err=>{
                         console.log(err);
                         this.addVisible = true;
                     })
				 }				
			},
			popNotification(str){
				this[str] = {};
				this.addVisible1 = true;
			},
			addUserPop(str){
                this[str]={};
                this.addForm = {};
				this.addVisible = true;
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
			editInfo(row){	
                console.log(row);
                let data = {
                    id:row.id,                    
                };    
                let AES = this.AES.encrypt(data);                
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/illegalProcess/detail',{AES});
			},
			popDelete(row){
				this.showSingleDelete = true;
			},	
			quitSingleConfirm(){
				this.showSingleDelete = false;
                this.Success.deleteSuccess();
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
                this.current = 1;
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
			reset(){				
                this.Digital.reset.bind(this)(); 
                this.specialHandler();
				this.runSearch({});
			},
		},
    }
</script>
<style scoped lang="scss">
	.diagBtnCon {
		margin-top: 30px;
		margin-bottom: 30px;
		flex-wrap: nowrap;
		justify-content: flex-end;
		.marLeft {
			margin-left: 20px;
		}
	}
	.illegalContainer {
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
				justify-content: space-between;
				.topLeft {
					flex-wrap: nowrap;
					justify-content:flex-start;
				}				
				.topRight {
					height: 40px;
					flex-wrap: nowrap;
					justify-content:flex-end;
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
					cursor: pointer;
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
        .marBottom {
            margin-bottom: 20px;        
        }
        .marRight {
            margin-right: 20px;
        }
		.sameWidth {
			width: 170px;
		}
		.scrollContainer {
			height: 380px;
			overflow-y: scroll;
		}
	}
</style>
<style lang="scss">
	.illegalContainer {
        .diagCon {
            .el-dialog {
                width: 540px !important;
                height: 560px !important;
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
        .diagCon .el-date-editor.el-input {
            width: 100%;
        }
	}
</style>
<template>
  <div class="userManageContainer">  
	  <div class="searchCon flex">
		  <div class="sameWidth marRight marBottom">              
                <el-input  placeholder="输入关键字"  v-model.trim="searchMaster.keyWords" clearable @change="inputChange(searchMaster.keyWords,'searchMaster','keyWords')"></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-select v-model="searchMaster.type" placeholder="请选择" @change="inputChange(searchMaster.type,'searchMaster','type')">	
                  <el-option
                      v-for="item in identityOptions1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
				</el-select>
			</div>
		  <div class="timerCon marRight marBottom">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.time"  type="daterange" align="right"  unlink-panels range-separator="至" start-placeholder="开始日期"  end-placeholder="结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time,'searchMaster','time')" value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  <div class="btnCon flex marBottom">			  
              <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
              <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex">
			   <div>
				   <RedBtn :text="'获取验证码'" class="sendSms" @click.native="sendSms"></RedBtn>
				</div>
			   <div class="tableTopRightCon flex">
                   <el-tooltip content="导出Excel" placement="bottom" effect="light">				   
                       <a :href="excelHref" :download="excelDownload"><div class="tableTopRight">
                           <i class="iconfont icon-xiazai-" ></i>
                        </div></a>				   
                    </el-tooltip>
                   <el-tooltip content="新增" placement="bottom" effect="light">
                       <div class="tableTopRight addBg" @click="addUserPop">
                           <i class="icon-tianjia- iconfont" ></i>
                        </div>
                    </el-tooltip>
                   <el-tooltip content="多选删除" placement="bottom" effect="light">
                      <div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete">
                          <i class="icon-shanchu- iconfont"></i>
                        </div>
                    </el-tooltip>
			   </div>
			</div>
		  <div class="tableContent" :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				<el-table-column type="selection"></el-table-column>
				<el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
				<el-table-column  label="姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
				</el-table-column>
				<el-table-column  label="手机号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.username | emptyProcessor  }}</template>
				</el-table-column>
				<el-table-column  label="身份证号码" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.idNo | emptyProcessor  }}</template>
				</el-table-column>
				<el-table-column  label="身份" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.identity | emptyProcessor  }}</template>
				</el-table-column>
				<el-table-column  label="余额" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">
						<el-popover	placement="bottom"	trigger="hover">
							<div class="popperInner popperEdit" @click="showDetail(scope.row)"><i class="iconfont icon-bianji-"></i><span> 查看</span>  </div>
							<div  class="operateSpecial" slot="reference">
								<div class="operateText">{{ scope.row.avaiableAmount | formatMoneyValueWithMark | emptyProcessor }}</div>
						  	</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column  label="备注" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.unknow | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="是否有效" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.unknow | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="最后登录时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.gmtModified | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
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
						  :current-page="page1"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="size1"
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
	<el-dialog title="编辑" :visible.sync="editVisible" class="diagCon" :close-on-click-modal="false">
			<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="姓名" prop="name">
						<el-input v-model.trim="editForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model.trim="editForm.phone" @change="unifiedPhoneChange('editForm','phone')"></el-input>
					  </el-form-item>
					<el-form-item label="身份证号码" prop="idNo">
						<el-input v-model.trim="editForm.idNo"></el-input>
					  </el-form-item>
					 <el-form-item label="身份" prop="identity">
						  <el-select v-model="editForm.identity" placeholder="请选择">
                              <el-option
                                  v-for="item in identityOptions2"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
						  </el-select>
						</el-form-item>
					<el-form-item label="银行卡号" prop="bankNo">
						<el-input v-model.trim="editForm.bankNo"></el-input>
					  </el-form-item>
					<el-form-item label="银行卡账户名" prop="bankAccount">
						<el-input v-model.trim="editForm.bankAccount"></el-input>
					  </el-form-item>
					<el-form-item label="银行名称" prop="bankName">
						<el-input v-model.trim="editForm.bankName"></el-input>
					  </el-form-item>
					<el-form-item label="银行支行" prop="subBranch">
						<el-input v-model.trim="editForm.subBranch"></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" :rows="3" v-model.trim="editForm.remark" :resize="'none'"></el-input>
					  </el-form-item>
                    <el-form-item label="是否有效" prop="effective">
						<el-select v-model="editForm.effective" placeholder="请选择状态">
							<el-option label="是" value="1"></el-option>
							<el-option label="否" value="0"></el-option>
						  </el-select>
					  </el-form-item>
					<el-form-item label="最后登录时间" prop="time">
						<el-input v-model.trim="editForm.time" disabled></el-input>
					  </el-form-item>
					<el-form-item label="当前状态" prop="status">
						<el-select v-model="editForm.status" placeholder="请选择状态">
							<el-option label="区域一" value="shanghai"></el-option>							
						  </el-select>
					  </el-form-item>
					<div class="resetContainer flex">
						<div class="resetLogin" @click="resetLoginPassword">重置登录密码</div>
						<div class="resetGet" @click="resetWithdrawPassword">重置提现密码</div>
					</div>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveEdit('editForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEdit('editForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
	<el-dialog title="新增" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="手机号" prop="phone">
						<el-input v-model.trim="addForm.phone" @change="unifiedPhoneChange('addForm','phone')"></el-input>
					  </el-form-item>
					 <el-form-item label="身份"  prop="identity">
						  <el-select v-model="addForm.identity" placeholder="请选择">
                              <el-option
                                  v-for="item in identityOptions3"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
						  </el-select>
						</el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveAdd('addForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd('addForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="输入手机号" :visible.sync="smsVisible" class="diagCon addDiagCon smsDiagCon" :close-on-click-modal="false">
			<el-form :model="smsForm" :rules="smsRules" ref="smsForm" label-width="100px">
				<div class="scrollContainer smsScrollContainer">
					<el-form-item label="手机号" prop="phone">
						<el-input v-model.trim="smsForm.phone" @change="unifiedPhoneChange('smsForm','phone')"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn  @click.native="saveSms('smsForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelSms('smsForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
	<el-dialog title="查看" :visible.sync="checkVisible" class="diagCon checkDiagCon" :close-on-click-modal="false">
		<div class="checkDiagConHead flex">
			<div class="widthCon">
				<span class="widthTitle">房屋租金</span>
				<span class="widthMoney">{{50000000.23 | formatMoneyValueWithMark}}</span>
			</div>
			<div class="widthCon">
				<span class="widthTitle">房屋溢价</span>
				<span class="widthMoney">{{50000000 | formatMoneyValueWithMark}}</span>
			</div>
		</div>
		<div class="searchCon flex">
		  <div class="sameWidth marRight marBottom">
			  <el-select v-model="subSearch.fundsType" placeholder="请选择">			
				  <el-option label="收支（全部）" value=""></el-option>
				  <el-option label="收入" value="1"></el-option>
				  <el-option label="支出" value="0"></el-option>
				</el-select>
			</div>
			<div class="sameWidth marRight marBottom">
			  <el-select v-model="subSearch.chargeType" placeholder="请选择">			
				  <el-option label="类型（全部）" value=""></el-option>
				  <el-option label="手工充值" value="DEPOSIT_MANUAL"></el-option>
				  <el-option label="支付宝充值" value="DEPOSIT_ALIPAY"></el-option> 
                  <el-option label="普通转账" value="TRANSFER_NORMAL"></el-option>
				  <el-option label="房东款" value="TRANSFER_LANDLORD"></el-option>
                  <el-option label="押金" value="PLEDGE"></el-option>
				  <el-option label="工资" value="TRANSFER_SALARY"></el-option>
                  <el-option label="奖励金" value="TRANSFER_BOUNTY"></el-option>
				  <el-option label="溢价收益" value="PROFIT"></el-option>
                  <el-option label="预存款" value="PRE_DEPOSIT"></el-option>
				  <el-option label="普通提现" value="WITHDRAW_COMMON"></el-option>
                  <el-option label="线下打款" value="LINE_PAY"></el-option>
				</el-select>
			</div>
            <div class="sameWidth marRight marBottom">
			  <el-input placeholder="输入合同号" v-model.trim="subSearch.contractNo"  clearable></el-input>
            </div>
            <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入操作人"  v-model.trim="subSearch.operator" clearable></el-input>
            </div>
            <RedBtn :text="'查询'" class="marBottom marRight" @click.native="queryNowInner"></RedBtn>
			<GreyBtn :text="'重置'" class="marBottom" @click.native="resetInner"></GreyBtn>
		</div>
		<div class="tableInner">
			  <el-table :data="tableData"  tooltip-effect="dark"  style="width: 100%" height="340" stripe >
				<el-table-column  label="ID" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="收入" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="房东款支出" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="溢价支出" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="操作人" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>					
					</template>
					</el-table-column>
				<el-table-column  label="余额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="创建日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column label="合同号">
                      <template slot-scope="scope">
                      </template>
                </el-table-column>
				  <el-table-column label="备注">
                      <template slot-scope="scope">
                      </template>
                </el-table-column>
				</el-table>
				<div class="pagOuter">
                    <el-pagination
						  @size-change="sizeChange"
						  @current-change="currentChange"
						  :current-page="page2"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="size2"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="pageTotal">
                    </el-pagination>
				</div>
			</div>		
		</el-dialog>
        <el-dialog title="提示" :visible.sync="loginPasswordVisible" class="diagCon loginPasswordDiagCon" :close-on-click-modal="false">
            <div class="InfoCon">是否重置登录密码？</div>
            <div class="diagBtnCon flex">
                <RedBtn :text="'确定'" @click.native="confirmLoginPassword"></RedBtn>
                <GreyBtn class="marLeft" @click.native="cancelLoginPassword"></GreyBtn>
            </div>	
        </el-dialog>
        <el-dialog title="提示" :visible.sync="withdrawPasswordVisible" class="diagCon loginPasswordDiagCon" :close-on-click-modal="false">
            <div class="InfoCon">是否重置提现密码？</div>
            <div class="diagBtnCon flex">
                <RedBtn :text="'确定'" @click.native="confirmWithdrawPassword"></RedBtn>
                <GreyBtn class="marLeft" @click.native="cancelWithdrawPassword"></GreyBtn>
            </div>	
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
                loading:true,
                identityOptions3:[],
                identityOptions2:[],
                identityOptions1:[],
                withdrawPasswordVisible:false,
                loginPasswordVisible:false,
				computed:'auto',                
                subSearch:{
                    fundsType:'',
                    chargeType:'',
                    contractNo:'',
                    operator:'',
                },	
				checkVisible:false,
				editVisible:false,
				addVisible:false,
				smsVisible:false,
				editForm:{},
				editRules:{},
				smsForm:{},
				smsRules:{},
				addForm:{
                    phone:'',
                    identity:'',
                },
				addRules:{
                    phone:[
                        { required: true, message: '请输入正确手机号', trigger: 'blur' },
                        { len: 11, message: '长度11个字符', trigger: 'blur' },
                    ],
                    identity:[
                        { required: true, message: '请选择身份', trigger: ['blur','change'] },
                    ],
                },	
                searchMaster:{
                    keyWords:'',
                    time:'',
                    type:'',	
                },                
				storeMap:{
					time:'userManageTime',
					keyWords:'userManageKeyWords',
					type:'userManageType',					
				},
				storeArr:[					
					'time',
					'keyWords',
					'type',
				],
				storeArrMatchParam:[
					'ptime',
					'keyword',
					'role',
				],
				timeParams:{
					ptime:[
						'gmtCreateStart',
						'gmtCreateEnd',
					],
				},				
				delAble:false,				
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				page1:1,
				size1:10,
				total:0,
				pickerOptions2: this.DatePick.range,
				tableData3:[
                ],
				tableData:[
				],
				page2:1,
				size2:10,
				pageTotal:0,
				excelHref:'',
				excelDownload:'',
				statusText:'正常',
				statusAction:'锁定',
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();
			this.generateExcel([]);
            this.initIdentityOptions1();
		},
		methods:{	
            unifiedPhoneChange(form,item){
                let val =  this[form][item]; 
                let final  = this.Digital.formatPhone.bind(this)( val );
                this[form][item] = final;
            },
            initIdentityOptions1(){                
                let interfaceArr = [0,1,2,3,4,5,6,7,8,9,10];
                let final =this.StateData.identityTypeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });
				this.identityOptions1 = final;
            },
            confirmLoginPassword(){
                this.loginPasswordVisible = false;
                this.$message({
                  message: '重置登录密码成功',
                  type: 'success'
                });
            },
            cancelLoginPassword(){
                this.loginPasswordVisible = false;
            },
            confirmWithdrawPassword(){
                this.withdrawPasswordVisible = false;
                this.$message({
                  message: '重置提现密码成功',
                  type: 'success'
                });
            },
            cancelWithdrawPassword(){
                this.withdrawPasswordVisible = false;
            },
            resetLoginPassword(){
                this.loginPasswordVisible = true;
            },
            resetWithdrawPassword(){
                this.withdrawPasswordVisible = true;
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
			generateExcel(buffer){				
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );				
				this.excelHref =  url;
				let now = Date.now();			
				let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
				this.excelDownload = `testtestme${format}.xls`;				
				URL.revokeObjectURL(url);
			},
			saveSms(str){
                
				this.smsVisible = false;
			},
			cancelSms(str){
                
				this.smsVisible = false;
			},
			sendSms(){
				this.smsVisible = true;
			},
			sizeChange(val){
				this.size2 = val;
				let data = {};
				this.doInnerSearch(data);
			},
			currentChange(val){
				this.page2 = val;
				let data = {};
				this.doInnerSearch(data);
			},
			showDetail(){
				this.checkVisible =true;
			},
			saveAdd(str){       
                let res = this.Digital.shorterValidate.bind(this)(str);
                if(res){
                    this.addVisible = false;
                    this.Success.saveSuccess();
                    this.$refs[str].resetFields();
                }else{
                    
                }
			},
			cancelAdd(str){
				this.addVisible = false;
                this.$refs[str].resetFields();
			},
            initIdentityOptions3(){
                let interfaceArr = [1,2,3,4,5,6,7,8,9,10];
                let final =this.StateData.identityTypeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });
				this.identityOptions3 = final;
            },
			addUserPop(){
				this.addVisible = true;
                this.initIdentityOptions3();
			},
			popMultipleDelete(){
				if(this.delAble){
					this.showDelete = true;
				}
			},
			saveEdit(){
				this.editVisible = false;
				this.Success.saveSuccess();
//				this.Err.netErr();
			},
			cancelEdit(){
				this.editVisible = false;
			},
            initIdentityOptions2(){
                let interfaceArr = [1,2,3,4,5,6,7,8,9,10];
                let final =this.StateData.identityTypeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });
				this.identityOptions2 = final;
            },
			editInfo(){
				this.form = {};
				this.editVisible = true;
                this.initIdentityOptions2();
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
				console.log(`每页 ${val} 条`);
                this.size1 = val;
                this.page1 = 1;
				let data = {};
				this.runSearch(data);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
                this.page1 = val;
				let data = {};
				this.runSearch(data);
			},					
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			runSearch(data){
                console.log(data);                
                data.current = this.page1;
                data.size = this.size1;                
                this.ApiLists[10003]( data ).then(res=>{                    
                    let { data:layer1 } = res;
                    this.loading = false;
                    console.log( 'layer1',layer1 );
                    let { success,message,data } = layer1; 
                    if(success){
                        this.tableData3 = data.records;
                        this.total = data.total;
                        this.loading = false;
                    }else{
                       this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err);
                })
			},
			queryNowInner(){
                console.log(this.subSearch); 
				let data = {                    
                };             
				this.doInnerSearch(data);
			},
			queryNow(){
				this.initSearch();
			},
			doInnerSearch(data){
				console.log('innerSearch');
			},
			resetInner(){
                this.subSearch = {};
				let data = {};
				this.doInnerSearch(data);
			},
			reset(){
				this.Digital.reset.bind(this)(); 
				this.runSearch({});
			},
		},        
    }
</script>
<style scoped lang="scss">
    .InfoCon {
        height: 50px;
        line-height: 50px;
    }
	.operateSpecial {
		width: 70%;
		height: 30px;
		color: $mainRed;
		margin: 0 auto;
		line-height: 30px;
		background-color: $specialBgRed;
		border-radius: 15px;
		cursor: pointer;
		font-size: 13px;
		padding-left: 10px;
		padding-right: 10px;
		box-sizing: border-box;
	}
	.operateText {		
		overflow: hidden;
	}
    .marRight  {
        margin-right: 20px;
    }
    .marBottom {
        margin-bottom: 20px;
    }
	.marLeft {
		margin-left: 20px;
	}
	.checkDiagConHead {
		justify-content: flex-start;
		margin-bottom: 20px;
		margin-top: 10px;		
		.widthCon {
			width: 300px;
			.widthTitle {
				margin-right: 10px;
			}
			.widthMoney {
				color: $mainRed;
				font-size: 20px;
			}
		}
	}
	.resetContainer {
		justify-content: space-between;
		width: 100%;
		height: 40px;
		font-size: 14px;
		.resetLogin {
			color:#f9aa2b;
			width: 50%;
			line-height: 40px;
			text-align: center;
			cursor: pointer;
		}
		.resetGet {
			color:#30caf6;
			width: 50%;
			line-height: 40px;
			text-align: center;
			cursor: pointer;
		}
	}
	.diagBtnCon {
        margin-top: 30px;
        margin-bottom: 30px;
		flex-wrap: nowrap;
		justify-content: flex-end;
    }
	.userManageContainer {
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
			.tableTopRightCon {
				flex-wrap: nowrap;
				justify-content:flex-end;
			}
			.tableTop {
				height: 40px;
				flex-wrap: nowrap;
				justify-content: space-between;
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
	.userManageContainer {
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
			height: 320px !important;
			.scrollContainer {
				height: 130px !important;
			}
		}
        .loginPasswordDiagCon .el-dialog{
            height: 250px !important;
        }
		.smsDiagCon  .el-dialog{
			height: 250px !important;
			.smsScrollContainer {
				height: 70px !important;
			}
		}
		.checkDiagCon .el-dialog{
			height: 580px !important;
			width: 1040px !important;
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
		.checkDiagCon  {
			.searchCon .el-input__inner {
				border: 1px solid #a4aabc;
			}
			.el-dialog__body {
				padding-top: 0 !important;
				padding-bottom: 0 !important;
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
		.sendSms {
			background-color: #fff7f7;
			color: $mainRed;
			box-shadow: none;
			font-weight: 600;
			font-size: 12px;
		}
	}
</style>
<template>
  <div class="aggrementContainer">        
    <div v-if="agreementInitShow">
      <div class="searchCon flex">
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入用户名" v-model.trim="searchMaster.user"  clearable @change="inputChange(searchMaster.user,'searchMaster','user')" ></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入合同编号"  v-model.trim="searchMaster.agreementNo" clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')" ></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入房源名"  v-model.trim="searchMaster.houseName"  clearable @change="inputChange(searchMaster.houseName,'searchMaster','houseName')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入小区名"  v-model.trim="searchMaster.community"  clearable @change="inputChange(searchMaster.community,'searchMaster','community')"></el-input>
		 </div>
          <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入手机号"  v-model.trim="searchMaster.phone"  clearable @change="inputChange(searchMaster.phone,'searchMaster','phone')"></el-input>
		 </div>
<!--
		  <div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''"  v-model="searchMaster.time1"  type="daterange"  align="right" unlink-panels  range-separator="至"  start-placeholder="创建开始日期"  end-placeholder="创建结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time1,'searchMaster','time1')"  value-format="yyyy-MM-dd"></el-date-picker>
			</div>
-->
<!--
		   <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.time2" type="daterange"  align="right"  unlink-panels  range-separator="至"  start-placeholder="起租开始日期"  end-placeholder="起租结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time2,'searchMaster','time2')" value-format="yyyy-MM-dd"></el-date-picker>
		</div>
-->
<!--
		  <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.time3" type="daterange"  align="right"  unlink-panels  range-separator="至"  start-placeholder="到期开始日期"  end-placeholder="到期结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time3,'searchMaster','time3')"  value-format="yyyy-MM-dd"></el-date-picker>
		</div>
-->
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
<!--
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.type1" placeholder="是否是批量房" @change="inputChange(searchMaster.type1,'searchMaster','type1')">			
				  <el-option label="是否是批量房（全部）" value=""></el-option>
				  <el-option label="批量房" value="true"></el-option>
				  <el-option label="普通房" value="false"></el-option>
				</el-select>
			</div>
-->
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.type2" placeholder="房源类型" @change="inputChange(searchMaster.type2,'searchMaster','type2')">	
                  <el-option
                    v-for="item in reviewArrOption2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                	</el-option> 
<!--
				  <el-option label="房源类型（全部）" value=""></el-option>
				  <el-option label="出租" value="RENT"></el-option>
				  <el-option label="收房" value="RECEIVE"></el-option>
				  <el-option label="收房续签" value="RECEIVE_RENEW"></el-option>
-->
				</el-select>
			</div>
		  <div class="btnCon flex marBottom">			  
			    <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
				<GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex" >	
			   <div class="topLeft flex">
				   <div class="selectFile">
					   <input class="importStaffExcel" ref="importExcel" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importExcel">
					   <i class="iconfont icon-shangchuan-"></i><span> 房东批量变更上传</span>  
					</div>
				    <div class="anotherSelectFile">
                        <div class="anotherTextCon" @click="switchUncollected">
                            <i class="iconfont icon-genggaifufeifangshi-"></i><span> 出租未收款</span>
                        </div>                        
					</div>
				</div>
			   <div class="topRight flex">
				   <el-tooltip content="导出Excel" placement="bottom" effect="light">
					   <a :href="excelHref" :download="excelDownload"  ref="anchor">
                           <div class="tableTopRight addBg" @click="anchorClick('anchor')">
                            <i class="iconfont icon-xiazai-" ></i>
                            </div>
                        </a>
				   </el-tooltip>
				   <el-tooltip content="多选删除" placement="bottom" effect="light">
				    <div class="tableTopRightSp   delDisable" :class="{delAble}" @click="popMultipleDelete">
				        <i class="icon-shanchu- iconfont"></i>
					</div>
				   </el-tooltip>
				</div>
			</div>
		  <div class="tableContent"  :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange"  :key="1" v-loading="loading">
				  <el-table-column type="selection"></el-table-column>
				  <el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
					<el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.contractNo | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="房源名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.houseName | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.communityName | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.contractStatus | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="业务员" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.salesmanName | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="打款方式" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.payType | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="创建时间" show-overflow-tooltip min-width="160">
					  <template slot-scope="scope">
							<span>{{ scope.row.gmtCreate | emptyProcessor }}</span>
					</template>
					</el-table-column>
					<el-table-column  label="审核时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.gmtAudit | emptyProcessor }}</template>
					</el-table-column>
					<el-table-column  label="房东/租客" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.consumerName | emptyProcessor  }}</template>
					</el-table-column>
					<el-table-column  label="是否批量房" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.type | emptyProcessor  }}</template>
					</el-table-column>
					<el-table-column label="操作">
						  <template slot-scope="scope">
							<div >
								<el-popover	placement="bottom"	trigger="hover">
									<div class="popperInner popperSpecial" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
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
  </div>
  <div v-else>            
      <div class="tableOuter">
          <div class="tableTop flex" >	
              <div class="topLeft flex">
                  <div class="goBack" @click="goBack"><i class="icon-fanhui- iconfont"></i><span> &nbsp;返回</span></div>
              </div>
            <div class="topRight flex">
                <el-tooltip content="多选删除" placement="bottom" effect="light">
				    <div class="tableTopRightSp   delDisable" :class="{delAble:delAble2}" @click="popMultipleDelete2">
				        <i class="icon-shanchu- iconfont"></i>
					</div>
				</el-tooltip>
            </div>
          </div>
          <div class="tableContent"  :style="{width:computed}">
			  <el-table :data="tableData4"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange2" :key="2">
				  <el-table-column     type="selection"> </el-table-column>
				  <el-table-column  label="序号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="房源名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="业务员" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="打款方式" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="创建日期" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
					<el-table-column  label="审核日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="房东/租客" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="是否批量房" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column label="操作">
						  <template slot-scope="scope">
							<div >
								<el-popover	placement="bottom"	trigger="hover">
									<div class="popperInner popperSpecial" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
									<div class="popperInner popperDelete" @click="popDelete(scope.row)"><i class="iconfont icon-shanchu-"></i> <span> 删除</span></div>
									<div  class="operate" slot="reference">操作</div>
								  </el-popover>
							</div>
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
    <transition name="popDel">
        <Del v-if="showDelete"  :delCon="quitConfirm" :delCancel="quitCancel"></Del>
    </transition>
    <transition name="popDel">
        <Del v-if="showSingleDelete"  :delCon="quitSingleConfirm" :delCancel="quitSingleCancel"></Del>
    </transition>
	<el-dialog title="新增" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false" >
		<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
			<div class="scrollContainer">
				<el-form-item label="手机号" prop="name">
					<el-input v-model="addForm.name"></el-input>
			  </el-form-item>
			 <el-form-item label="身份" >
				  <el-select v-model="addForm.type" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				  </el-select>
				</el-form-item>
		</div>
		<div class="diagBtnCon flex">
			<RedBtn :text="'保存'" @click.native="saveAdd"></RedBtn>
			<GreyBtn class="marLeft" @click.native="cancelAdd"></GreyBtn>
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
				'tagActive',
                'agreementInitShow'
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
            'multipleSelection2':function(nval,val){
				if(nval.length){
					this.delAble2 = true;
				}else{
					this.delAble2 = false;
				}
			},
		},		
        data(){
			return {
                loading:true,
                reviewArrOption2:[],
				reviewArrOption1:[],	
                delAble2:false,
				computed:'auto',
				addVisible:false,
				addForm:{},
				addRules:{},				
				delAble:false,
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
                multipleSelection2:[],
                current2:1,
                size2:10,
                total2:0,                
				current:1,
				size:10,
				total:0,                
				pickerOptions2: this.DatePick.range, 
				tableData3:[
//					{name:'me'}
				],
                tableData4:[
//					{name:'me'}
				],	
                searchMaster:{
                    time1:'',
                    time2:'',
                    time3:'',
                    user:'',
                    agreementNo:'',
                    houseName:'',
                    community:'',				
                    status:'',
                    type1:'',
                    type2:'',
                    phone:'',
                },
				storeMap:{
					time1:'agreementTime1',
					time2:'agreementTime2',
					time3:'agreementTime3',
					user:'agreementUser',
					agreementNo:'agreementAgreementNo',
					houseName:'agreementHouseName',					
					community:'agreementCommunity',
					status:'agreementStatus',
					type1:'agreementType1',
					type2:'agreementType2',
                    phone:'agreementPhone'
				},
				storeArr:[					
					'time1',
					'time2',
					'time3',
					'user',
					'agreementNo',
					'houseName',
					'community',
					'status',
					'type1',
					'type2',
                    'phone'
				],
				storeArrMatchParam:[
					'ptime1',
					'ptime2',
					'ptime3',
					'consumerName',
					'contractNo',
					'houseName',
					'communityName',
					'contractStatus',
					'ptype1',
					'houseStatus',
                    'mobile'
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
						'ptime3part1',
						'ptime3part2',
					]
				},
				excelHref:false,
				excelDownload:false,
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();
			this.initreviewArrOption1();
            this.initreviewArrOption2();
		},
		methods:{
            initreviewArrOption2(){                
                let interfaceArr = [0,1,3];
                let final =this.StateData.agreementContractTypeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });   
				this.reviewArrOption2 = [  { label:"房源类型（全部）",value:"",index:-1, },...final ];
            },
			initreviewArrOption1(){
                let interfaceArr = [0,1,2,4,5,6,17,24,25,26,27,28,29,30,31,32];
                let final =this.StateData.reviewStatusArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });   
				this.reviewArrOption1 = [  { label:"状态（全部）",value:"",index:-1, },...final ];
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
			generateExcel(buffer){							
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );				
				this.excelHref =  url;
				let now = Date.now();		
				let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
				this.excelDownload = `testtestme${format}.xls`;				
				URL.revokeObjectURL(url);
			},
            switchUncollected(){
                this.$store.commit('setAgreementInitShow',false);
                //请求出租未收款列表
                this.current2 = 1;
                this.size2 = 10;
                this.total2 = 1;  
                let data = { };
                this.uncollectedRequest(data);
            },
            uncollectedRequest(data){
                console.log( '未收款请求',data );
            },
            handleSizeChange2(val){
                console.log(`每页 ${val} 条`);
				this.size2 = val;	
                let data ={};
                this.uncollectedRequest(data);
            },
            handleCurrentChange2(val){
                console.log(`当前页: ${val}`);
				this.current2 = val;
                let data ={  };
                this.uncollectedRequest(data);
            },
            popMultipleDelete2(){
                this.showDelete = true;
            },
            goBack(){
                this.$store.commit('setAgreementInitShow',true);
                //请求所有列表
                this.initSearch();
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
			editInfo(row){
				this.StoreJs.set('agreementTrackIndex',0);			
				this.$store.commit('setAgreementTrackIndex',0);
                let data = {
                    id:row.id,                    
                };    
                let AES = this.AES.encrypt(data);                                
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/agreementManage/detail',{
                    AES
                });                
			},
			popDelete(row){
				console.log(row);
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
                if( this.agreementInitShow ){                    
                    this.showDelete = false;
                    this.Success.deleteSuccess();  
                    //抓取不同参数
                }else{
                    this.showDelete = false;
                    this.Success.deleteSuccess();  
                }
			},
			quitCancel(){
				this.showDelete = false;                
			},            
			handleSizeChange(val) {
				this.size = val;
                this.current = 1;
                this.initSearch();
			},
			handleCurrentChange(val) {
				this.current = val;
				this.initSearch();
			},
            handleSelectionChange2(val) {
                this.multipleSelection2 = val;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			runSearch(data){				
                data.current = this.current;
                data.size = this.size;
                this.ApiLists[10015](data).then(res=>{
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
    .goBack {
        cursor: pointer;
        width: 120px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        background-color: #ffefef;
        color: $mainRed;
        text-align: center;
        span {
            vertical-align: 1px;
			font-size: 12px;
			font-weight: 600;
        }       
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
	.aggrementContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.addBg {
			background-color: #2a2f48 !important;
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
					.importStaffExcel {
						position: absolute;
						left: 0;
						width: 120px;
						height: 40px;
						opacity: 0;
						cursor: pointer;
						z-index: 2;
					}
					.anotherTextCon {
						cursor: pointer;
						z-index: 2;
					}
					.selectFile {
						cursor: pointer;
                        padding-left: 10px;
                        padding-right: 10px;
						border-radius: 20px;
						background-color: #fff7f7;
						color: $mainRed;
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
                        padding-left: 10px;
                        padding-right: 10px;
						margin-left: 26px;
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
	.aggrementContainer {
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
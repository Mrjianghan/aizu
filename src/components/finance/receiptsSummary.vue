<template>
  <div class="receiptsSummaryContainer">	  	  
	  <div class="searchCon">
		 <div class=" sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.area" placeholder="请选择" @change="inputChange(searchMaster.area,'searchMaster','area')">			
				  <el-option label="宁波" value="NB"></el-option>
				  <el-option label="杭州" value="HZ"></el-option>
				  <el-option label="上海" value="SH"></el-option>
				  <el-option label="苏州" value="SZ"></el-option>
				</el-select>
			</div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入合同号" v-model.trim="searchMaster.agreementNo"  clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"
						></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入收款人"  v-model.trim="searchMaster.payee"  clearable @change="inputChange(searchMaster.payee,'searchMaster','payee')"
						></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入租客姓名" v-model.trim="searchMaster.renter" @change="inputChange(searchMaster.renter,'searchMaster','renter')" clearable></el-input>
		 </div>
		   <div class="marBottom marRight sameWidth">
			  <el-select v-model.trim="searchMaster.internal" placeholder="请选择" @change="inputChange(searchMaster.internal,'searchMaster','internal')">			
				  <el-option label="对内凭证号(全部)" value=""></el-option>
				  <el-option label="有" value="1"></el-option>
				  <el-option label="无" value="0"></el-option>
				</el-select>
			</div>
		   <div class="marBottom marRight sameWidth">
			  <el-select v-model.trim="searchMaster.foreign" placeholder="请选择" @change="inputChange(searchMaster.foreign,'searchMaster','foreign')">			
				  <el-option label="对外凭证号(全部)" value=""></el-option>
				  <el-option label="有" value="1"></el-option>
				  <el-option label="无" value="0"></el-option>
				</el-select>
			</div>
		 <div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''"  v-model.trim="searchMaster.time"  type="daterange"  align="right"  unlink-panels  range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time,'searchMaster','time')" value-format="yyyy-MM-dd" ></el-date-picker>
			</div>
		  <div class="btnCon marBottom">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			  <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop" >	
			   <div class="topLeft">
				   <select ref="track1" v-model.trim="select1" v-show="false"></select>
				   <el-select class="equip" v-model.trim="equip" placeholder="指定打印机" @change="equipChange" @focus="checked1Focus">
					<el-option
					  v-for="item in options1"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				   <select ref="track2" v-model.trim="select2" v-show="false"></select>
				   <el-select class="paper" v-model.trim="paper" placeholder="指定纸张" @change="paperChange" @focus="checked2Focus">
						<el-option
						  v-for="item in options2"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
				   </el-select>
				   <el-checkbox  v-model.trim="checked3" >佣金</el-checkbox>
			   </div>
			   <div class="topRight">
				   <el-tooltip content="凭证Excel下载" placement="bottom" effect="light">
					   <div class="tableTopRight addBg" @click="downLoadNow">
						<i class="iconfont icon-xiazai-" ></i>
						</div>
					</el-tooltip> 
					<el-tooltip content="凭证号录入" placement="bottom" effect="light">   
						<div class="tableTopRight " @click="addUserPop">
						   <i class="icon-tianjia- iconfont" ></i>
						</div>
					</el-tooltip> 
				</div>
			</div>
		  <div class="tableContent" :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
<!--				  <el-table-column     type="selection"> </el-table-column>-->
				  <el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
				<el-table-column  label="收据号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="租客姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>				
				<el-table-column  label="交款人" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
				<el-table-column  label="收款人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				<el-table-column  label="创建时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>				
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div >
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看</span>  </div>	
								<div class="popperInner popperDelete" @click="print(scope.row)"><i class="iconfont icon-dayin-"></i> <span> 打印</span>  </div>	
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
	<el-dialog title="收据号" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="收据号" prop="name">
						<el-input v-model.trim="addForm.name"></el-input>
					  </el-form-item>					 
				</div>
				<div class="diagBtnCon">
					<RedBtn @click.native="saveAdd"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="凭证号" :visible.sync="certificateVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="certificateForm" :rules="certificateRule" ref="certificateForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="凭证号" prop="name">
						<el-input v-model.trim="certificateForm.name"></el-input>
					  </el-form-item>					 
				</div>
				<div class="diagBtnCon">
					<RedBtn @click.native="certificateConfirm"></RedBtn>
					<GreyBtn class="marLeft" @click.native="certificateCancel"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="信息" :visible.sync="infoShow" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form ref="holderForm" label-width="100px">
				<div class="describe">请选择对内对外。</div>
				<div class="diagBtnCon">
					<RedBtn @click.native="infoInner" :text="'对内'"></RedBtn>
					<RedBtn @click.native="infoOuter" :text="'对外'" class="marLeft" ></RedBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="收据号" :visible.sync="firstVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="receiptForm" :rules="receiptRule" ref="receiptForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="收据号" prop="name">
						<el-input v-model.trim="receiptForm.name"></el-input>
					  </el-form-item>					 
				</div>
				<div class="diagBtnCon">
					<RedBtn  @click.native="saveFirst"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelFirst"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="信息" :visible.sync="excelSelectShow" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form ref="holderForm" label-width="100px">
				<div class="describe">请选择对内对外。</div>
				<div class="diagBtnCon">
					<a :href="excelHref1" :download="excelDownload1"><RedBtn @click.native="innerExcel" :text="'对内'"></RedBtn></a>
					<a :href="excelHref2" :download="excelDownload2"><RedBtn @click.native="outerExcel" :text="'对外'" class="marLeft" ></RedBtn></a>
				</div>
			</el-form>
		</el-dialog>
        <ClodopAlert class="clodopDialog diagCon" v-if="clodopShow" :action="shutClodopShow"></ClodopAlert>
		<el-dialog title="信息" :visible.sync="CheckVisible" class="diagConBig " :close-on-click-modal="false">			
			<el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"  height="520"  stripe>
                <el-table-column  label="序号" type="index"></el-table-column>
				<el-table-column  label="合同号" show-overflow-tooltip >
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="客户名称" show-overflow-tooltip >
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="名称" show-overflow-tooltip >
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="数量" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="单价" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="交款人" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="收款人" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="会计" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="备注" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="支付方式" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="商户订单号" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="创建时间" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
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
		</el-dialog>
  </div>
</template>
<script>
    import { getLodop } from '@/tools/lodop.js'; 	
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
                clodopShow:false,
				certificateVisible:false,
				certificateForm:{},
				certificateRule:{},				
				infoShow:false,
				excelHref1:'',
				excelDownload1:'',
				excelHref2:'',
				excelDownload2:'',
				excelSelectShow:false,
				computed:'auto',
				select2:'',
				select1:'',
				equip:'',
				options1:[],
				paper:'',
				options2:[],
				checked3:false,
				checked1:false,
				checked2:false,
				CheckVisible:false,
				firstVisible:false,
				addVisible:false,
				receiptForm:{},
				receiptRule:{},
				addForm:{},
				addRules:{},
				delAble:false,
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
				pickerOptions2: this.DatePick.range,
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],	
                searchMaster:{
                    time:'',
                    area:'',
                    agreementNo:'',
                    payee:'',
                    renter:'',
                    internal:'',
                    foreign:'',		
                },
				storeMap:{
					time:'receiptsSummaryTime',
					area:'receiptsSummaryArea',
					agreementNo:'receiptsSummaryAgreementNo',
					payee:'receiptsSummaryPayee',
					renter:'receiptsSummaryRenter',
					internal:'receiptsSummaryInternal',
					foreign:'receiptsSummaryForeign',	
				},				
				storeArr:[
					'time',
					'area',
					'agreementNo',
					'payee',
					'renter',
					'internal',
					'foreign'
				],
				storeArrMatchParam:[
					'ptime',
					'parea',
					'pagreementNo',
					'ppayee',
					'prenter',
					'pinternal',
					'pforeign'
				],
				timeParams:{
					ptime:[
						'ptimepart1',
						'ptimepart2',
					]
				},		
				current2:1,
				size2:10,
				total2:0,				
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();    
		},
		methods:{	
            numberToChinese(num){
                if( num == null ) return '';     
                let hundredThousand,tenThousand,thousand,hundred,ten,single,negativeOne,negativeTwo;
                let mixObj = {
                    '0':'零','1':'壹','2':'贰','3':'叁','4':'肆','5':'伍','6':'陆','7':'柒','8':'捌','9':'玖'
                };   
                let integerMap = [
                    { value:'' },{ value:'' },{ value:'' },{ value:'' },{ value:'' },{ value:'' }
                ];
                let floatMap = [
                    { value:'' },{ value:'' }
                ];   
                let integerValue = parseInt( num );
                let isInteger = integerValue === num;
                let strRes = String(num); 
                let splitArr = strRes.split('.');
                let integerPart = splitArr[0];     
                let integerLength = integerPart.length;
                let integerArr =  Array.from(integerPart);
                integerArr.forEach((val,index)=>{
                    integerMap[integerLength-index-1].value = mixObj[val];
                });
                if( isInteger ){
                }else{
                    let floatPart = splitArr[1];
                    let floatLength = floatPart.length;
                    let floatArr = Array.from(floatPart);
                    floatArr.forEach((val,index)=>{
                        floatMap[index].value = mixObj[val];
                    })
                }                     
                hundredThousand = integerMap[5].value ? integerMap[5].value : '零';
                tenThousand = integerMap[4].value ? integerMap[4].value : '零';                
                thousand = integerMap[3].value ? integerMap[3].value : '零';                 
                hundred = integerMap[2].value ? integerMap[2].value : '零';                
                ten = integerMap[1].value ? integerMap[1].value : '零';      
                single = integerMap[0].value ? integerMap[0].value : '零';
                negativeOne = floatMap[0].value ? floatMap[0].value : '零';              
                negativeTwo = floatMap[1].value ? floatMap[1].value : '零';   
                return {
                    hundredThousand,
                    tenThousand,
                    thousand,
                    hundred,
                    ten,
                    single,
                    negativeOne,
                    negativeTwo
                };
            },
            shutClodopShow(){
                this.clodopShow = false;
            },
			initTable(){
				this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
            checked1Focus(){
                this.checked1Change();
            },
            checked2Focus(){
                this.checked2Change();
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
			innerExcel(){
				this.receiptForm = {};
				this.addForm ={};
				this.excelSelectShow = false;
			},
			outerExcel(){
				this.receiptForm = {};
				this.addForm ={};
				this.excelSelectShow = false;
			},			
			infoInner(){
				this.infoShow = false;
				this.certificateForm = {};
			}, 
			infoOuter(){
				this.infoShow = false;
				this.certificateForm = {};
			},
			certificateConfirm(){
				this.certificateVisible = false;
				this.infoShow = true;
				this.certificateForm = {};
			},
			certificateCancel(){
				this.certificateVisible = false;
				this.certificateForm = {};
			},
			handleSizeChange2(val){				
				this.size2 = val;
			},
			handleCurrentChange2(val){
				this.current2 = val;
			},
			print(row){                
                let  LODOP = getLodop();
				if(LODOP){ 
                    if( ( this.select1 )&&( this.select2 ) ){       
                        let keepShorter = ()=>{
                            LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
                        };
                        LODOP.PRINT_INITA(0,0,1000,1000,"打印控件Lodop");
                        LODOP.SET_PRINTER_INDEX(this.select1);
                        LODOP.SET_PRINT_PAGESIZE(0,0,0,this.select2);    
                        LODOP.ADD_PRINT_TEXT(119,262,140,25,'consumerName');                        
                        keepShorter(); 
                        LODOP.ADD_PRINT_TEXT(98,661,100,25,'contractNo');                        
                        keepShorter();                        
                        LODOP.ADD_PRINT_TEXT(58,640,100,25,'serialNumber');                        
                        keepShorter();                        
                        LODOP.ADD_PRINT_TEXT(124,626,44,22,'gmt0');                        
                        keepShorter();                        
                        LODOP.ADD_PRINT_TEXT(125,684,25,22,'gmt1');                        
                        keepShorter();                        
                        LODOP.ADD_PRINT_TEXT(125,719,25,22,'gmt2');                        
                        keepShorter();                        
                        LODOP.ADD_PRINT_TEXT(194,182,180,25,'desc1');
                        keepShorter();  
                        LODOP.ADD_PRINT_TEXT(224,182,180,25,'desc2');
                        keepShorter();  
                        LODOP.ADD_PRINT_TEXT(253,182,180,25,'desc3');
                        keepShorter();  
                        LODOP.ADD_PRINT_TEXT(283,182,180,25,'descr4');
                        keepShorter();  
                        LODOP.ADD_PRINT_TEXT(312,182,180,25,'descrin5');
                        keepShorter();  
                        LODOP.ADD_PRINT_TEXT(342,182,180,25,'desc6');
                        keepShorter();   
                        LODOP.ADD_PRINT_TEXT(194,464,50,25,'count1');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(224,464,50,25,'count2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,464,50,25,'count3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(283,464,50,25,'count4');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,463,50,25,'count5');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,463,50,25,'count6');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(195,632,15,25,'beforeArr0');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(195,649,15,25,'beforeArr1');
                        keepShorter();                        
                        LODOP.ADD_PRINT_TEXT(195,667,15,25,'beforeArr2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(195,684,15,25,'beforeArr3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(195,702,15,25,'beforeArr4');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(195,719,15,25,'beforeArr5');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(195,737,15,25,'u1');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(195,754,15,25,'u2');
                        keepShorter();                        
                        LODOP.ADD_PRINT_TEXT(225,632,15,25,'beforeArr2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(225,649,15,25,'beforeArr2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(225,667,15,25,'beforeArr2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(225,684,15,25,'beforeArr2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(225,702,15,25,'beforeArr2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(225,719,15,25,'beforeArr2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(225,737,15,25,'u2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(225,754,15,25,'u2');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,632,15,25,'beforeArr3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,649,15,25,'beforeArr3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,667,15,25,'beforeArr3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,684,15,25,'beforeArr3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,702,15,25,'beforeArr3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,719,15,25,'beforeArr3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,737,15,25,'u3');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(253,754,15,25,'u3');
                        keepShorter();                        
                        LODOP.ADD_PRINT_TEXT(283,632,15,25,'beforeA');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(283,649,15,25,'beforeArr4');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(283,667,15,25,'beforeArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(283,684,15,25,'befor');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(283,702,15,25,'beforeArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(283,719,15,25,'beforeA');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(283,737,15,25,'u4');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(283,754,15,25,'u4');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,632,15,25,'beforeAr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,649,15,25,'beforeArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,667,15,25,'beforeAr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,684,15,25,'beforeArr5');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,702,15,25,'beforeArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,719,15,25,'beforeA');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,737,15,25,'u51');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(312,754,15,25,'u5');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,632,15,25,'beforeArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,649,15,25,'beforeArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,667,15,25,'befo');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,684,15,25,'beforeA');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,702,15,25,'befor');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,719,15,25,'befo');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,737,15,25,'u6');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(341,754,15,25,'u6');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(381,265,26,25,'bigTotal');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(379,698,99,25,'total');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(381,540,25,25,'bigTotalAr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(381,490,28,25,'bigTotalArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(381,440,25,25,'bigTotalArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(381,395,25,25,'bigTotalArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(381,355,25,25,'bigTotalArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(381,312,24,25,'bigTotalArr');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(464,199,405,25,'memo1'+' '+'memo2'+' '+'memo3'+' '+'memo4'+' '+'memo5'+' '+'memo6');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(417,502,100,25,'accountant');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(417,355,100,25,'payee');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(417,199,100,25,'filler');
                        keepShorter();
                        LODOP.ADD_PRINT_TEXT(381,580,26,25,'bigTotalArr');
                        keepShorter();

    //					LODOP.PRINT();
                        LODOP.PRINT_DESIGN();
    //                    LODOP.PREVIEW();                        
                    }else{
                       this.$message.error('请选择打印机和纸张。');
                    }                       
				}else{
                    this.clodopShow = true;
                }
			},
			importManage(){
			},
			checked2Change(){
                let  LODOP = getLodop();
                if(LODOP){
                    let versionStatus = this.SimplifiedVerRouter.lodopVersionCheck();
                    if( versionStatus ){
                        if(this.select1){
                            CLODOP.Create_PageSize_List(this.$refs.track2,this.select1) ;  
                            let getMap = this.$refs.track2.childNodes;
                            var initArr = [];
                            for( let ele of getMap){
                                let obj = {};
                                obj.label = ele.label;
                                obj.value = ele.value;
                                initArr.push(obj);
                            }
                            this.options2 = initArr;
                        }else{
                           this.options2 = [];
                        }
                    }else{
                        this.clodopShow = true;
                    }
                }else{
                    this.clodopShow = true;
                }
			},
			paperChange(){
				this.select2 = this.paper;
			},
			equipChange(){
				this.select1 = this.equip;
				this.options2 = [];
				this.checked2 = '';
				this.paper = '';
			},
			checked1Change(){
                let  LODOP = getLodop();
    				if(LODOP){
                        let versionStatus = this.SimplifiedVerRouter.lodopVersionCheck();
                        if( versionStatus ){
                            CLODOP.Create_Printer_List(this.$refs.track1) ;  
                            let getMap = this.$refs.track1.childNodes;
                            var initArr = [];
                            for( let ele of getMap){
                                let obj = {};
                                obj.label = ele.label;
                                obj.value = ele.value;
                                initArr.push(obj);
                            }
                            this.options1 = initArr;
                        }else{
                            this.clodopShow = true;
                        }
    				}else{
                        this.clodopShow = true;
    				}
			},
			saveFirst(){
				this.firstVisible = false;
				this.excelSelectShow = true;
				this.generateExcel( [],'excelHref1','excelDownload1' ); 	
				this.generateExcel( [],'excelHref2','excelDownload2' ); 	
			},
			downLoadNow(){
				this.firstVisible = true;					
			},
			generateExcel(buffer,href,download){
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );				
				this[href] =  url;
				let now = Date.now();			
				let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
				this[download] = `testtestme${format}.xls`;				
				URL.revokeObjectURL(url);	
			},	
			cancelFirst(){
				this.firstVisible = false;
			},		
			saveAdd(){
				this.addVisible = false;
				this.certificateVisible = true;	
				this.addForm = {};
			},
			cancelAdd(){
				this.addVisible = false;
				this.addForm = {};
			},
			addUserPop(){
				this.addForm ={};
				this.addVisible = true;
			},
			editInfo(row){
				console.log(row);
				this.CheckVisible = true;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.current = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.size = val;
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
    a {
        color: #6AA50D;
    }
    .marBottom {
        margin-bottom: 20px;        
    }
    .marRight {
        margin-right: 20px;
    }
    .cusRight {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: center;
        align-items: center;
    }
	.describe {
		margin-top: 20px;
		font-size: 16px;
		padding-left: 20px;
		margin-bottom: 60px;
	}
	.equip {
		margin-right:20px;
	}
	.paper {
		margin-right:20px;
	}
	.checked1 {
		margin-right:20px;
	}
	.checked2 {
		margin-right:20px;
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
	.receiptsSummaryContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.addBg {
			background-color: #2a2f48 !important;
			margin-right: 20px;
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
	.receiptsSummaryContainer {
		.diagConBig .el-dialog {
			width: 1100px;
			height: 650px;
		}
		.diagCon .el-dialog {
			width: 540px !important;
			height: 560px !important;
		}
        .downloadDiagCon .el-dialog{
            height: 203px !important;
            width: 440px !important;
        }
        .clodopDialog  .el-dialog{
			height: 250px !important;
		}
		.addDiagCon .el-dialog{
			height: 250px !important;
			.scrollContainer {
				height: 70px !important;
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
		.el-dialog__body { 
			padding: 30px 20px !important;
		}
		.diagConBig .el-dialog__body { 
			padding-top:  20px !important;
		}        
	}
</style>
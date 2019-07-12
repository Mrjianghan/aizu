<template>
  <div class="defaultCerManageContainer">        
	  <div class="searchCon">
          <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入合同号"  v-model.trim="searchMaster.agreementNo" clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"></el-input>
		 </div>
		  <div class="sameWidth marRight marBottom">
			  <el-input  placeholder="输入违约单号"  v-model.trim="searchMaster.defaultNo"  clearable @change="inputChange(searchMaster.defaultNo,'searchMaster','defaultNo')"></el-input>
		 </div>
		 <div class="timerCon marRight marBottom">
			  <el-date-picker	prefix-icon="''"  v-model="searchMaster.time" type="daterange"  align="right" unlink-panels range-separator="至"  start-placeholder="创建开始日期"  end-placeholder="创建结束日期" :picker-options="pickerOptions2" @change="inputChange(searchMaster.time,'searchMaster','time')"  value-format="yyyy-MM-dd"></el-date-picker>
			</div>
		  <div class="marRight marBottom sameWidth">
			  <el-select v-model="searchMaster.internalSwitch" placeholder="请选择" @change="inputChange(searchMaster.internalSwitch,'searchMaster','internalSwitch')">			
				  <el-option label="（对内凭证号）全部" value=""></el-option>
				  <el-option label="无" value="0"></el-option>
				  <el-option label="有" value="1"></el-option>
				</el-select>
			</div>
		  <div class="marRight marBottom sameWidth">
			  <el-select v-model="searchMaster.foreignSwitch" placeholder="请选择" @change="inputChange(searchMaster.foreignSwitch,'searchMaster','foreignSwitch')">			
				  <el-option label="（对外凭证号）全部" value=""></el-option>
				  <el-option label="无" value="0"></el-option>
				  <el-option label="有" value="1"></el-option>
				</el-select>
			</div>
		  <div class="btnCon marBottom">			  
              <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
              <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop" >	
			   <div class="topLeft">
				   <select ref="track1" v-model="select1" v-show="false"></select>
				   <el-select class="equip" v-model="equip" placeholder="指定打印机" @change="equipChange" @focus="select1Focus">
					<el-option
					  v-for="item in options1"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				   <select ref="track2" v-model="select2" v-show="false"></select>
				   <el-select class="paper" v-model="paper" placeholder="指定纸张" @change="paperChange" @focus="select2Focus">
						<el-option
						  v-for="item in options2"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
				   </el-select>
				   <RedBtn :text="'批量打印'" @click.native="print"></RedBtn>
				</div>
			   <div class="topRight"></div>
			</div>
		  <div class="tableContent" :style="{width:computed}">
		  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
			  <el-table-column type="selection" show-overflow-tooltip></el-table-column>
			  <el-table-column  label="序号" type="index" show-overflow-tooltip></el-table-column>
				<el-table-column  label="违约单号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="合同号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="租客/房东" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="创建日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="统计号" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-popover	placement="bottom"	trigger="hover">
							<div class="popperInner popperEdit" @click="edit1(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>								
							<div  class="operate" slot="reference">{{ scope.row.name }}</div>
						</el-popover>	
					</template>
				</el-table-column>		
				<el-table-column  label="凭证号" show-overflow-tooltip>
					  <template slot-scope="scope">
						<el-popover	placement="bottom"	trigger="hover">
							<div class="popperInner popperEdit" @click="edit2(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>								
							<div  class="operate" slot="reference">{{ scope.row.name }}</div>
						</el-popover>					
					  </template>
				</el-table-column>	
				<el-table-column  label="关联收据号" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="exportExcel(scope.row)"><i class="iconfont icon-daochu-"></i> <span> 导出</span>  </div>	
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
	<el-dialog title="选择" :visible.sync="towardsVisible" class="towardsDialog diagCon" :close-on-click-modal="false">
		<div class="describe">选择对内或者对外。</div>
		<div class="diagBtnCon">
			<RedBtn :text="'对内'" @click.native="setInternal"></RedBtn>
			<RedBtn class="marLeft" :text="'对外'" @click.native="setForeign"></RedBtn>
		</div>		 
	</el-dialog>
	<el-dialog title="编辑" :visible.sync="editVisible1" class="diagCon editDiagCon" :close-on-click-modal="false">		
    	<el-input type="textarea" v-model.trim="textarea1" rows="11" :resize="'none'" class="paddingInput"></el-input>
		<div class="diagBtnCon">
			<RedBtn :text="'保存'" @click.native="saveEdit1"></RedBtn>
			<GreyBtn class="marLeft" @click.native="cancelEdit1"></GreyBtn>
		</div>
	</el-dialog>
	<el-dialog title="编辑" :visible.sync="editVisible2" class="diagCon editDiagCon" :close-on-click-modal="false">		
    	<el-input type="textarea" v-model.trim="textarea2" rows="11" :resize="'none'" class="paddingInput"></el-input>
		<div class="diagBtnCon">
			<RedBtn :text="'保存'" @click.native="saveEdit2"></RedBtn>
			<GreyBtn class="marLeft" @click.native="cancelEdit2"></GreyBtn>
		</div>
	</el-dialog>
    <div class="printDivContainer" v-show="false"  >
        <table :style="tableStyle">
            <caption :style="captionStyle">违约到期流转单</caption>
            <tr>
                <td colspan="8" :style="tdStyle">基本信息</td>
            </tr>
            <tr>
                <th :style="[tdStyle,limitWidth]">合同号</th>
                <th :style="[tdStyle,limitWidth]"></th>
                <th :style="[tdStyle,limitWidth]">登记人</th>
                <th :style="[tdStyle,limitWidth]"></th>
                <th :style="[tdStyle,limitWidth]">小区</th>
                <th :style="[tdStyle,limitWidth]"></th>
                <th :style="[tdStyle,limitWidth]">地址</th>
                <th :style="[tdStyle,fillWidth]"></th>
            </tr>
            <tr>
                <td :style="tdStyle">业务员</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle">租客姓名</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle">租客电话</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle">房租</td>
                <td :style="tdStyle"></td>
            </tr>
            <tr>
                <td :style="tdStyle">情况</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle">说明</td>
                <td :style="tdStyle" colspan="5"></td>
            </tr>
            <tr>
                <td :style="tdStyle">违约专员</td>
                <td :style="tdStyle"  colspan="3"></td>
                <td :style="tdStyle">办结时间</td>
                <td :style="tdStyle" colspan="3"></td>
            </tr>
            <tr>
                <td :style="tdStyle">违约专员说明</td>
                <td :style="tdStyle"  colspan="7"></td>
            </tr>
            <tr>
                <td :style="tdStyle">合同开始时间</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle">合同结束时间</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle">到期回收时间</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle">违约回收时间</td>
                <td :style="tdStyle"></td>
            </tr>
        </table>
        <table :style="tableStyle">
            <tr>
                <td colspan="9" :style="topTdStyle">水、电、煤气、其它</td>
            </tr>
            <tr>
                <td :style="tdStyle" width="11%"></td>
                <td :style="tdStyle" width="11%">水（度数）</td>
                <td :style="tdStyle" width="11%">电（度数）</td>
                <td :style="tdStyle" width="11%">煤气（度数）</td>
                <td :style="tdStyle" width="11%">空调</td>
                <td :style="tdStyle" width="11%">电视费</td>
                <td :style="tdStyle" width="11%">电梯费</td>
                <td :style="tdStyle" width="11%">公用电费</td>
                <td :style="tdStyle">其它（度数）</td>
            </tr>
            <tr>
                <td :style="tdStyle">已付至度数</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
            </tr>
            <tr>
                <td :style="tdStyle">目前度数</td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
                <td :style="tdStyle"></td>
            </tr>
        </table>
        <table :style="[tableStyle]">            
            <tr>
                <td colspan="12" :style="topTdStyle">费用结算</td>
            </tr>
            <tr>
                <td :style="tdStyle" width="9%">项目</td>
                <td :style="tdStyle" width="8%">违</td>
                <td :style="tdStyle" width="8%">财</td>
                <td :style="tdStyle" width="9%">项目</td>
                <td :style="tdStyle" width="8%">违</td>
                <td :style="tdStyle" width="8%">财</td>
                <td :style="tdStyle" width="9%">项目</td>
                <td :style="tdStyle" width="8%">违</td>
                <td :style="tdStyle" width="9%">财</td>
                <td :style="tdStyle" width="8%">项目</td>
                <td :style="tdStyle" width="8%">违</td>
                <td :style="tdStyle" width="8%">财</td>
            </tr>
            <template v-for="(val,index) in printArr">
                <tr>
                    <template v-for="(subVal,subIndex) in val.item">
                        <td :style="tdStyle">{{subVal.name}}</td>
                        <td :style="tdStyle">{{subVal.value}}</td>
                        <td :style="tdStyle">{{subVal.value}}</td>
                    </template>
                </tr>
            </template>   
            <tr>
                <td :style="tdStyle" colspan="2">其它费用</td>
                <td :style="tdStyle" colspan="10"></td>
            </tr>
            <tr>
                <td :style="tdStyle" colspan="2">总计</td>
                <td :style="tdStyle" colspan="10"></td>
            </tr>
            <tr>
                <td :style="tdStyle" colspan="2">备注</td>
                <td :style="tdStyle" colspan="10"></td>
            </tr>
            <tr>
                <td :style="tdStyle" colspan="2">房租结算时间</td>
                <td :style="tdStyle" colspan="10"></td>
            </tr>
        </table>
    </div>
    <span  v-show="false"><img ref="stamp" src="../../../public/stamp.png" :style="stampStyle"></span>
    <ClodopAlert class="clodopDialog diagCon" v-if="clodopShow" :action="shutClodopShow"></ClodopAlert>
  </div>
</template>
<script>
	import {getLodop} from '@/tools/lodop.js';    
    export default {		
		watch:{
			'multipleSelection':function(nval,val){				
			},
		},
        data(){
			return {	
                loading:true,
                clodopShow:false,
				computed:'auto',
				editVisible2:false,
				textarea2:'',
				editVisible1:false,
				textarea1:'',
				towardsVisible:false,		
                searchMaster:{
                    defaultNo:'',
                    agreementNo:'',
                    time:'',
                    internalSwitch:'',
                    foreignSwitch:'',	
                },		
				storeMap:{
					defaultNo:'defaultCerDefaultNo',
					agreementNo:'defaultCerAgreementNo',
					time:'defaultCerTime',		
					internalSwitch:'defaultCerInternalSwitch',
					foreignSwitch:'defaultCerForeignSwitch',
				},				
				storeArr:[					
					'defaultNo',
					'agreementNo',
					'time',		
					'internalSwitch',
					'foreignSwitch'
				],
				storeArrMatchParam:[
					'ptime',	
					'pdefaultNo',
					'pagreementNo',	
					'pinternalSwitch',
					'pforeignSwitch'
				],
				timeParams:{
					ptime:[
						'ptimepart1',
						'ptimepart2',
					]
				},	
				select2:'',
				select1:'',
				equip:'',
				options1:[],
				paper:'',
				options2:[],
				checked1:false,
				checked2:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
				pickerOptions2: this.DatePick.range,
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],
                tdStyle:{
                    border: '1px solid #000',
                    textAlign: 'center',
                    fontWeight: 'normal',
                    height:'24px',
                },
                tableStyle:{
                    width: '90%',
                    borderCollapse: 'collapse',
                    fontSize:'12px',
                    margin:'0 auto',
                },
                limitWidth:{
                    width:'12%',
                },
                fillWidth:{
                    width:'16%',  
                },
                stampStyle : {
                    position:'absolute',
                    right:'200px',
                    top:'200px',
                    zIndex:'-1'
                },
                captionStyle:{
                    marginBottom:'30px',
                    marginTop:'30px',
                    fontSize:'18px'
                },
                topTdStyle:{
                    textAlign: 'center',
                    borderLeft: '1px solid #000',
                    borderRight: '1px solid #000',
                },
                printArr:[],
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();
                    let arr = [
                        { name:'房租',value:1 },
                        { name:'违约金',value:2 },
                        { name:'水费',value:3 },
                        { name:'电费',value:4 },
                        { name:'网络费',value:5 },
                        { name:'电视费',value:6 },
                        { name:'煤气费',value:7 },
                        { name:'押金',value:8 },
                        { name:9,value:9 },
                        { name:10,value:10 },
                    ];   
                    let assemblyArr = [];
                    if( arr.length ){
                       let layer = Math.ceil(arr.length/4);  
                        for( let i=0; i < layer; i++ ){
//                            console.log( 'index',i );
                            assemblyArr.push({
                                item:arr.splice(0,4)
                            });
                        }   
                        let isEnough =  assemblyArr[layer-1].item.length === 4;
                        if( isEnough ){
                        }else{                           
                            let limit =  4 - assemblyArr[layer-1].item.length;
                            for (let i = 0; i<limit;i++){
                                assemblyArr[layer-1].item.push({
                                    name:'',
                                    value:''
                                })
                            }                            
                        }
                    }
                    this.printArr = assemblyArr; 
		},
		methods:{	
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
            select1Focus(){
                this.checked1Change();
            },
            select2Focus(){
                this.checked2Change();
            },
			saveEdit2(){
				this.editVisible2 = false;
			},
			cancelEdit2(){
				this.editVisible2 = false;
			},
			setInternal(){
				this.towardsVisible = false;
			},
			setForeign(){
				this.towardsVisible = false;
			},
			saveEdit1(){
				this.editVisible1 = false;
			},
			cancelEdit1(){
				this.editVisible1 = false;
			},
			edit1(row){
				console.log(row);	
				this.editVisible1 = true;
			},
			edit2(row){
				this.editVisible2 = true;
				console.log(row);	
			},
            shutClodopShow(){
                this.clodopShow = false;
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
			print(){
				let  LODOP = getLodop();
				if(LODOP){                    
                    LODOP.PRINT_INITA(0,0,1000,1000,"打印控件功能演示_Lodop功能_不同高度幅面");
                    LODOP.SET_PRINTER_INDEX(this.select1);
                    LODOP.SET_PRINT_PAGESIZE(0,0,0,this.select2);                   
                    LODOP.ADD_PRINT_HTM(100,100,'100%','100%',this.$refs.stamp.outerHTML);                      
                    LODOP.ADD_PRINT_HTM(0,0,'100%','100%',document.querySelector('.printDivContainer').innerHTML);  
                    console.log( document.querySelector('.printDivContainer').innerHTML );
//					LODOP.PRINT();
                    LODOP.PRINT_DESIGN();
//                    LODOP.PREVIEW();
				}else{
                    
                }
			},			
			exportExcel(row){
				console.log(row);
				this.towardsVisible = true;
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
    .marRight {
        margin-right: 20px;
    }
    .marBottom {
        margin-bottom: 20px;
    }
    .printDivContainer {
        position: absolute;
        left: 200px;
        top: 200px;
        background-color:#fff;
        width: 700px;
        height: 400px;        
    }
	.equip {
		margin-right:20px;
	}
	.describe {
		margin-top: 40px;
		font-size: 16px;
		padding-left: 40px;
		margin-bottom: 50px;
	}
	.paddingInput {
		width: 90%;
		margin-top: 20px;
		margin-left:  5%;
	}		
	.diagBtnCon {
		padding-right: 5%;
		margin-top: 20px;
		margin-bottom: 20px;
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
	.paper {
		margin-right:20px;
	}
	.checked1 {
		margin-right:20px;
	}
	.checked2 {
		margin-right:20px;
	}
	.cusRight {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-content: center;
		align-items: center;
	}
	.defaultCerManageContainer {
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
				margin-bottom: 20px;
				display: flex;
				flex-direction: row;
				justify-content:space-between;
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
	}
</style>
<style  lang="scss">
.defaultCerManageContainer {
	.diagCon .el-dialog {
		width: 540px;
		height: 560px;
	}
	.editDiagCon .el-dialog {		
		height: 400px !important;
	}		
    .downloadDiagCon {
        .el-dialog {
            width: 540px !important;
            height: 200px !important;
        }
        .el-dialog__body {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-top: 10px !important;
            height: 60px;
        }
    }
    .clodopDialog {
        .el-dialog{
            height: 250px !important;
        }
        .el-dialog__body {
            padding: 30px 20px !important;
        }
    }  
	.addDiagCon .el-dialog{
		height: 320px !important;
	}
	.towardsDialog {
		.el-dialog {
			height: 230px !important;
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
		padding: 0 !important;
	}
}
</style>
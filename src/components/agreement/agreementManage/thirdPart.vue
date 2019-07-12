<template>	
  	<div class="thirdPartContainer">
		<div class="header">房屋收费项目</div>		
		<div class="tableCon" :style="{width:computed}">
			<el-table :data="tableData2"  tooltip-effect="dark"  style="width: 100%" stripe >
			  	<el-table-column  label="项目" show-overflow-tooltip>
				  <template slot-scope="scope">{{ matchItemNameArr[scope.row.name] }}</template>
				</el-table-column>
				<el-table-column  label="户号/账号" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.account | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="起记度数" show-overflow-tooltip>
				  <template slot-scope="scope">{{  | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="起记时间" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.recordTime | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="终止度数" show-overflow-tooltip>
				  <template slot-scope="scope">{{ | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="终止时间" show-overflow-tooltip>
				  <template slot-scope="scope">{{ | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="费用结算" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.feeSettlement | formatMoneyValueWithMark | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="操作" show-overflow-tooltip>						  
					<template slot-scope="scope">
					<div >
						<el-popover	placement="bottom"	trigger="hover">
							<div class="popperInner popperEdit" @click="editInfo2(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
							<div  class="operate" slot="reference">操作</div>
						  </el-popover>
					</div>
				  </template>
				</el-table-column>
			</el-table>
		</div>
        <div class="tableCon" :style="{width:computed}">
			<el-table :data="tableData3"  tooltip-effect="dark" style="width: 100%" stripe >
				<el-table-column  label="项目" show-overflow-tooltip>
				  <template slot-scope="scope">{{ matchItemNameArr[scope.row.name] }}</template>
				</el-table-column>
                <el-table-column  label="户号/账号" show-overflow-tooltip>
				  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
				</el-table-column>
                <el-table-column  label="开通情况" show-overflow-tooltip>
				  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
				</el-table-column>
                <el-table-column  label="是否分期" show-overflow-tooltip>
				  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
				</el-table-column>
                <el-table-column  label="备注" show-overflow-tooltip>
				  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
				</el-table-column>
                <el-table-column  label="费用结算" show-overflow-tooltip>
				  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
				</el-table-column>
                <el-table-column  label="操作" show-overflow-tooltip>						  
					<template slot-scope="scope">
					<div >
						<el-popover	placement="bottom"	trigger="hover">
							<div class="popperInner popperEdit" @click="editInfo2(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
							<div  class="operate" slot="reference">操作</div>
						  </el-popover>
					</div>
				  </template>
				</el-table-column>
            </el-table>
        </div>
        <div class="tableCon" :style="{width:computed}">
			<el-table :data="tableData1"  tooltip-effect="dark" style="width: 100%" stripe >
				<el-table-column  label="项目" show-overflow-tooltip>
				  <template slot-scope="scope">{{ matchItemNameArr[scope.row.name] }}</template>
				</el-table-column>
				<el-table-column  label="是否分期" show-overflow-tooltip>
				  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
				</el-table-column>
				<el-table-column  label="费用结算" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.feeSettlement | formatMoneyValueWithMark | emptyProcessor }}</template>
				</el-table-column>
				<el-table-column  label="操作" show-overflow-tooltip>
					<template slot-scope="scope">
					<div>
						<el-popover	placement="bottom"	trigger="hover">
							<div class="popperInner popperEdit" @click="editInfo1(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
							<div  class="operate" slot="reference">操作</div>
					  	</el-popover>
					</div>
				  </template>
				</el-table-column>
			</el-table>
		</div>
		<div class="feeItemsConBottom">
			<div class="header">其他相关费用承担方式信息</div>
			<div class="">
				<div class="leftFlex limitWidth bottomGutter flex">								
				    <div class="title">乙方承担费用项目</div>                    
                    <el-select v-model="contractNumber1" class="specialSelect" disabled  multiple placeholder="请选择">
                        <el-option
                          v-for="item in contractNumber1Options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                        <RedBtn class="editContractNumber1" :text="'修改'" @click.native="editContractNumber1"></RedBtn>                    
				</div>
				<div class="leftFlex limitWidth flex">								
				    <div class="title">甲方承担费用项目</div>
                    <el-select v-model="contractNumber2" class="specialSelect" disabled  multiple placeholder="请选择">
                        <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
				</div>
			</div>
		</div>	
        <div class="keyContainer">
            <div class="header">钥匙/卡相关信息</div>
            <div class="tableCon" :style="{width:computed}">
                <el-table  :data="tableData4"  tooltip-effect="dark"  style="width: 100%" stripe >
                    <el-table-column  label="电子门" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column  label="防盗门" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column  label="房门" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column  label="车棚" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column  label="信箱" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column  label="其他" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column  label="操作" show-overflow-tooltip>
                      <template slot-scope="scope">
                        <div>
                            <el-popover	placement="bottom"	trigger="hover">
                                <div class="popperInner popperEdit" @click="editInfo3(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
                                <div  class="operate" slot="reference">操作</div>
                              </el-popover>
                        </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="编辑" :visible.sync="feeItemShow1" class="diagCon" :close-on-click-modal="false">
			<el-form :model="feeItemForm1" :rules="feeItemRules1" ref="feeItemForm1" label-width="130px">
				<div class="scrollContainer">
					<el-form-item label="项目" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="户号/账号" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="开通情况" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="交费情况" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="费用结算" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>			
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveFeeItemForm1"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelFeeItemForm1"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
        <el-dialog  title="确认修改" class="smallDiagConDialog" :visible.sync="specialSelectVisible" :close-on-click-modal="false">
            <div class="scrollContainer">
                <el-select v-model="contractNumber1Copy" class="specialSelect"  multiple placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>           
		  	<span slot="footer" class="dialog-footer">
				<div class="diagBtnCon">
			  		<RedBtn @click.native="confirmSmallDiagConDialog"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelSmallDiagConDialog"></GreyBtn>
				</div>
			</span>
		</el-dialog>
		<el-dialog  title="确认修改" class="smallDiagCon" :visible.sync="dialogVisible" :close-on-click-modal="false">
		  	<span>确认修改？</span>
		  	<span slot="footer" class="dialog-footer">
				<div class="diagBtnCon">
			  		<RedBtn @click.native="confirmDialogVisible"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelDialogVisible"></GreyBtn>
				</div>
			</span>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="feeItemShow1" class="diagCon" :close-on-click-modal="false">
			<el-form :model="feeItemForm1" :rules="feeItemRules1" ref="feeItemForm1" label-width="130px">
				<div class="scrollContainer">
					<el-form-item label="项目" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="户号/账号" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="开通情况" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="交费情况" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>
					<el-form-item label="费用结算" prop="name">
						<el-input v-model.trim="feeItemForm1.name"></el-input>
					  </el-form-item>			
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveFeeItemForm1"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelFeeItemForm1"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="feeItemShow3" class="diagCon" :close-on-click-modal="false">
			<el-form :model="feeItemForm3" :rules="feeItemRules3" ref="feeItemForm3" label-width="130px">
				<div class="scrollContainer specialScrollContainer">
					<el-form-item label="电子门" prop="name">
						<el-input v-model.trim="feeItemForm3.name"></el-input>
					  </el-form-item>
					<el-form-item label="防盗门" prop="name">
						<el-input v-model.trim="feeItemForm3.name"></el-input>
					  </el-form-item>
					<el-form-item label="房门" prop="name">
						<el-input v-model.trim="feeItemForm3.name"></el-input>
					  </el-form-item>
					<el-form-item label="车棚" prop="name">
						<el-input v-model.trim="feeItemForm3.name"></el-input>
					  </el-form-item>
					<el-form-item label="信箱" prop="name">
						<el-input v-model.trim="feeItemForm3.name"></el-input>
					  </el-form-item>
					<el-form-item label="其他" prop="name">
						<el-input v-model.trim="feeItemForm3.name"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon diagBtnConSpecial">
					<RedBtn :text="'保存'" @click.native="saveFeeItemForm3('feeItemForm3')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelFeeItemForm3('feeItemForm3')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
  	</div>
</template>
<script>
	import { required,numeric,helpers } from 'vuelidate/lib/validators';
	const positiveNum =  helpers.regex('alpha', /^\d+(\.\d+)?$/) || helpers.regex('alpha', /^\d+$/);
    export default {
		watch:{	
			'tableData1': function(nval, val) {
				this.Digital.setTableHeight.bind(this)('table1Height',(nval.length+1)*50); 
			},
			'tableData2': function(nval, val) {
				this.Digital.setTableHeight.bind(this)('table2Height',(nval.length+1)*50); 
			},
           
		},
		validations: {
			contractNumber1:{
				required,		
				positiveNum
			},
			contractNumber2:{
				required,	
				positiveNum
			},
		},
        data(){
			return {
                feeItemShow3:false,
                feeItemForm3:{},
                feeItemRules3:{},
                options: [
                    {
                      value: '物业管理费',
                      label: '物业管理费'
                    }, 
                    {
                      value: '水费',
                      label: '水费'
                    }, 
                    {
                      value: '电费',
                      label: '电费'
                    }, 
                    {
                      value: '电梯费',
                      label: '电梯费'
                    }, 
                    {
                      value: '燃气费',
                      label: '燃气费'
                    },
                    {
                      value: '网络费',
                      label: '网络费'
                    }, 
                    {
                      value: '电视费',
                      label: '电视费'
                    }, 
                    {
                      value: '公用电费',
                      label: '公用电费'
                    }, 
                    {
                      value: '其他',
                      label: '其他'
                    }
                ],
                options2:[
//                    {
//                        value: '选项10',
//                      label: '北10京烤鸭'
//                    },
//                    {
//                        value: '选项11',
//                      label: '北11京烤鸭'
//                    },
//                    {
//                        value: '选项12',
//                      label: '北12京烤鸭'
//                    },
                ],
                contractNumber1Copy:'',
                specialSelectVisible:false,
				trackFlage:'',
				dialogVisible:false,
				tableData1:[
//					{name:'me'},
				],
				tableData2:[
//					{name:'me'},
				],
                tableData3:[
//					{ name:'me' },
				],
                tableData4:[],
				contractNumber1:'',
				contractNumber2:[
//                     '选项10','选项11','选项12',
                ],
				inputStore:{
					contractNumber1:'',
					contractNumber2:'',
				},
				feeItemShow1:false,
				feeItemShow2:false,
				feeItemForm1:{},
				feeItemRules1:{},
				feeItemForm2:{},
				feeItemRules2:{},
                computed:'auto',
                matchItemNameArr:[],
                contractNumber1Options:[
                    {   label:"物业管理费",value:"物业管理费"  },
                    {   label:"水费",value:"水费"  },  
                    {   label:"电费",value:"电费"  },  
                    {   label:"电梯费",value:"电梯费"  },  
                    {   label:"燃气费",value:"燃气费"  },
                    {   label:"网络费",value:"网络费"  },  
                    {   label:"电视费",value:"电视费"  },  
                    {   label:"公用电费",value:"公用电费"  },  
                    {   label:"其他",value:"其他"  },
                ],
			}
		},	
		mounted(){	
            this.initTable();
            this.initRequest();
            this.initMatchItemNameArr();
		},
		methods:{	
            initTable(){
                this.Digital.tableWidthController.bind(this)(310,'computed');  
			},
            initMatchItemNameArr(){
                let obj = {};
                this.StateData.agreementChargeListArr.forEach(ele=>{
                    obj[ele.value] = ele.label;
                });
                this.matchItemNameArr = obj;
            },
            initRequest(){
                this.Digital.aesDecrypt.bind(this)();
                let data1 = {
                    contractId:this.routeQuery.id
                }; 
                this.ApiLists[10035](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { message,data,success  } = layer1;
                    if( success ){
                        this.firstBlock = data;
//                        this.tableData1 = data.chargesList;
                        this.tableData2 = data.chargesList;
                        this.tableData3 = data.chargesList;
//                        this.tableData4 = data.chargesList;
                        this.contractNumber2 = data.yi;
                        this.contractNumber1 = data.jia;    
                        
                    }else{
                       this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
			confirmDialogVisible(){
				this.dialogVisible = false;
			},
			cancelDialogVisible(){
				this.dialogVisible = false;
			},
            editContractNumber1(){
                this.specialSelectVisible = true;
            },     
            editInfo3(row){
                this.feeItemShow3 = true;
            },
            saveFeeItemForm3(str){
//                   feeItemShow3
//                   feeItemForm3
//                   feeItemRules3
            },
            cancelFeeItemForm3(str){
                
            },
            confirmSmallDiagConDialog(){
                this.specialSelectVisible = false;                
                this.contractNumber1 = this.contractNumber1Copy;                
                this.Success.normalSuccess();
            },
            cancelSmallDiagConDialog(){
                this.specialSelectVisible = false;
            },
			contractNumber1Change(){				
				this.$v.contractNumber1.$touch();				
				if(this.$v.contractNumber1.$invalid){
				   this.$message.error('格式错误。');
					this.contractNumber1 = this.inputStore.contractNumber1;
				}else{
				   this.dialogVisible = true;
					this.trackFlag = '';
					if(  Math.floor(this.contractNumber1) === Number(this.contractNumber1)  ){
					   console.log( ' 是整数 ' );
					}else{
					    console.log( ' 是浮点 ' );
							this.contractNumber1 = this.Digital.roundValue(+this.contractNumber1,2);
					}
				}				
			},
			contractNumber2Change(){
				this.$v.contractNumber2.$touch();				
				if(this.$v.contractNumber2.$invalid){
				   this.$message.error('格式错误。');
					this.contractNumber2 = this.inputStore.contractNumber2;
				}else{
				   this.dialogVisible = true;
					this.trackFlag = '';					
					if(  Math.floor(this.contractNumber2) === Number(this.contractNumber2)  ){
					   console.log( ' 是整数 ' );
					}else{
					    console.log( ' 是浮点 ' );
							this.contractNumber2 = this.Digital.roundValue(+this.contractNumber2,2);
					}					
				}				
			},
			editInfo1(row){
				console.log(row);			
				this.feeItemShow1 = true;
			},
			editInfo2(row){
				console.log(row);
				this.feeItemShow2 = true;
			},            
			saveFeeItemForm2(){
				this.feeItemShow2 = false;
			},
			cancelFeeItemForm2(){
				this.feeItemShow2 = false;
			},
			saveFeeItemForm1(){
				this.feeItemShow1 = false;
			},
			cancelFeeItemForm1(){
				this.feeItemShow1 = false;
			},
		},
    }
</script>
<style scoped lang="scss">
    .keyContainer {
        margin-top: 30px;
    }
    .bottomGutter {
        margin-bottom: 20px;
    }
    .editContractNumber1 {
        margin-left: 10px;
    }
    .specialSelect {
        width: 500px;
    }
	.thirdPartContainer {
		.header {
			font-size: 16px;
			color: #2a2f48;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.tableCon {
			margin-bottom: 30px;
		}
		.leftFlex {
			flex-wrap: nowrap;
			justify-content: flex-start;
			.title {
				color: #a4aabc;
				font-size: 13px;
				width: 60px;
				margin-right: 10px;
				margin-left: 10px;
			}
		}
		.limitWidth {
			box-sizing: border-box;
			input {
				border: none;
				height: 34px;
				width: 200px;
			}
		}
		.marLeft {
			margin-left: 20px;
		}
		.operate {
			width: 60px;
			color: $mainRed;
			margin: 0 auto;
			background-color: $specialBgRed;
			border-radius: 15px;
			cursor: pointer;
			font-size: 13px;
		}		
	}
</style>
<style lang="scss">
	.thirdPartContainer {
		.el-table__header-wrapper .has-gutter {
			th {
				background-color: $tableHeadBg;
				color: #fff !important;
				font-weight: normal;
			}
		}
		.diagBtnCon {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-content: center;
			align-items: center;
			.marLeft {
				margin-left: 20px;
			}
		}
		.diagCon {			
			.el-dialog {
				width: 540px;
				height: 520px;
			}	
			.specialScrollContainer {
				height: 340px;
				overflow-y: scroll;
			}
			.diagBtnConSpecial {
				margin-top: 30px;
			}
		}		
		.smallDiagCon {			
			.el-dialog {
				width: 540px;
				height: 210px !important;
			}		
			.scrollContainer {
				height: 70px !important;
			}			
		}	        
        .smallDiagConDialog {
            .el-dialog {
				width: 540px;
				height: 320px !important;
			}	
            .scrollContainer {
				height: 140px !important;
			}	
        }
	}
</style>
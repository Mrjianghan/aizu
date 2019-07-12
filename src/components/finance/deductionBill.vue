<template>
  <div class="deductionManageContainer">  
	  <div class="searchCon">
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入合同号" v-model.trim="searchMaster.agreementNo" clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.type" placeholder="请选择" @change="inputChange(searchMaster.type,'searchMaster','type')">			
				  <el-option label="类型(全部)" value=""></el-option>
				  <el-option label="可出租" value="1"></el-option>				
				</el-select>
			</div>
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
		  <div class="btnCon marBottom">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			  <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
		  </div>
		</div>
	   <div class="tableOuter">
		   <div class="tableTop" >	
			   <div class="topLeft">
				    <div class="anotherSelectFile">
						<input class="changeManageInput" ref="deductionBillImport" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importManage">
						<i class="iconfont icon-shangchuan-"></i>  <span> 批量抵扣账单</span>
					</div>
				</div>
			   <div class="topRight">
				   <el-tooltip content="新建抵扣账单" placement="bottom" effect="light">
				   		<div class="tableTopRight" @click="addUserPop"><i class="icon-tianjia- iconfont" ></i></div>
					</el-tooltip>
				</div>
			</div>
		  <div class="tableContent"  :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
                  <el-table-column  label="序号" type="index"></el-table-column>
                  <el-table-column  label="合同号" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
				    <el-table-column  label="类型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="抵扣金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="抵扣余额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="创建时间" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="创建人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column  label="审核人" show-overflow-tooltip>
					  <template slot-scope="scope">
							<span>{{ scope.row.name }}</span>
					</template>
					</el-table-column>
				    <el-table-column  label="备注" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
				    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-chenggong-"></i> <span> 通过</span>  </div>
								<div class="popperInner popperDelete" @click="popReject(scope.row)"><i class="iconfont icon-shouye_lixian-"></i> <span> 拒绝</span></div>
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
	   <el-dialog title="新增" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="请输入合同号" prop="name">
						<el-input v-model.trim="addForm.name"></el-input>
					  </el-form-item>
					 <el-form-item label="产品类型" >
						  <el-select v-model.trim="addForm.type" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						  </el-select>
						</el-form-item>
					<el-form-item label="输入抵扣金额" prop="name">
						<el-input v-model.trim="addForm.name"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveAdd"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
        <el-dialog title="处理抵扣账单" :visible.sync="remarksVisible" class="diagCon editDiagCon" :close-on-click-modal="false">
			<el-input type="textarea" v-model.trim="textarea1.input" rows="11" :resize="'none'" class="paddingInput"></el-input>
			<div class="diagBtnCon">
				<RedBtn :text="'保存'" @click.native="saveEdit1"></RedBtn>
				<GreyBtn class="marLeft" @click.native="cancelEdit1"></GreyBtn>
			</div>
		</el-dialog>
  </div>
</template>
<script>
    const textarea1Reset = {
        id:'',
        input:''
    };
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
				reviewArrOption1:[],
				computed:'auto',
				addVisible:false,	
				addForm:{},
				addRules:{},
				delAble:false,
				showDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,		
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],		
                searchMaster:{
                    status:'',
                    agreementNo:'',
                    type:'', 
                },
				storeMap:{
					status:'deductionBillStatus',
					agreementNo:'deductionBillAgreementNo',
					type:'deductionBillType',
				},
				storeArr:[					
					'status',
					'agreementNo',
					'type',					
				],
				storeArrMatchParam:[
					'pstatus',
					'pagreementNo',
					'ptype',
				],
                textarea1:textarea1Reset,
                remarksVisible:false,
			}
		},
		mounted(){
			this.initSearch();
			this.initTable();
			this.initreviewArrOption1();
		},
		methods:{
			initreviewArrOption1(){
                let interfaceArr = [2,17,23];
                let final =this.StateData.reviewStatusArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });    
                final.splice(0,0,{
                    label:"状态（全部）",value:"",index:-1, 
                });
				this.reviewArrOption1 = final;
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
			initSearch(){	
                let data = this.Digital.getParams.bind(this)(); 
                this.runSearch(data);
                console.log( 'data',data );
			},
			importManage(){
				var file = this.$refs.deductionBillImport.files[0];
                const excelReg = /(.(xls|xlsx))+$/i;
				if (excelReg.test(file.name) === false) {
					this.$message.error('请导入文件类型为excel格式的表格文件。');
					this.$refs.deductionBillImport.value="";
					return false;
				}else {
					const formData = new FormData();
					formData.append('file',file);
				}
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
                console.log(row);
                 //确认提交参数
                this.remarksVisible = true;
                this.textarea1.input = '已确认';
                this.textarea1.id = row.name;
			},
            saveEdit1(){              
                if( this.textarea1.input.length ){
                   this.remarksVisible = false;
                    console.log( this.textarea1 );
                }else{
                    this.$message.error('输入框不能为空。');
                }
            },
            cancelEdit1(){
                this.textarea1 = textarea1Reset;
                 this.remarksVisible = false;
            },
			popReject(row){
				console.log(row);
                //拒绝提交参数
                this.remarksVisible = true;
                this.textarea1.input = '';
                this.textarea1.id = row.name;
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
    .marBottom {
        margin-bottom: 20px;        
    }
    .marRight {
        margin-right: 20px;
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
	.deductionManageContainer {
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
					.changeManageInput {
						position: absolute;
						left: 0;
						width: 120px;
						height: 40px;
						opacity: 0;
						cursor: pointer;
						z-index: 2;
					}
					.anotherSelectFile {
						position: relative;
						width: 120px;
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
	.deductionManageContainer {
		.diagCon .el-dialog {
			width: 540px !important;
			height: 560px !important;
		}
		.addDiagCon .el-dialog{
			height: 380px !important;
			.scrollContainer {
				height: 190px !important;
			}
		}
		.diagCon .el-select {
			width: 100%;
		}
		.searchCon .el-input__inner {
			border: none;
			border-radius: 20px;
		}
		.el-dialog__body { 
			padding: 30px 20px !important;
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
        .editDiagCon .el-dialog {		
			height: 420px !important;
		}	
	}
</style>
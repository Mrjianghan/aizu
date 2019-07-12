<template>
  <div class="forProcessingContainer">  
      <div class="masterShow" v-if="masterShow">
	  <div class="searchCon">
		  <div class="nameSearchCon sameWidth ableRent">
			  <el-input placeholder="输入关键词"  v-model.trim="agreementNumber"  clearable></el-input>
		 </div>
		<div class="ableRent sameWidth">
			  <el-select v-model="ableRent" placeholder="请选择">			
				  <el-option label="全部" value=""></el-option>
				  <el-option label="可出租" value="1"></el-option>
				  <el-option label="不可出租" value="0"></el-option>
				</el-select>
			</div>
		  <div class="timerCon">
			  <el-date-picker
				prefix-icon="''"
				  v-model="time"
				  type="daterange"
				  align="right"
				  unlink-panels
				  range-separator="至"
				  start-placeholder="开始日期"
				  end-placeholder="结束日期"
				  :picker-options="pickerOptions2">
				</el-date-picker>
			</div>
		  <div class="btnCon">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			  <GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
		  </div>
		</div>
	   <div class="tableOuter">		   
		  <div class="tableContent">
			  <el-table  :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="440"  stripe>
                  <el-table-column  label="序号" show-overflow-tooltip >
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column  label="事项描述" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
                    <el-table-column  label="状态" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
                    <el-table-column  label="待领取时间" show-overflow-tooltip >
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
                    <el-table-column  label="备注" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
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
			<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="手机号" prop="name">
						<el-input v-model.trim="addForm.name"></el-input>
					  </el-form-item>
					 <el-form-item label="身份" >
						  <el-select v-model="addForm.type" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						  </el-select>
						</el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveAdd"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
	</div>
	<div v-else>
	</div>
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
				masterShow:true,
				addVisible:false,
				orderMan:'',
				repairMan:'',
				communityName:'',
				addForm:{},
				addRules:{},
				agreementNumber:'',
				ableRent:'',
				delAble:false,
				time:new Date(),
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:1,
				pickerOptions2: this.DatePick.range,
				tableData3:[
					{name:'meeeee'},
					{name:'meeeee'}
				],
                tempPage:1,
                pageSize:10,
                pageTotal:1,
			}
		},
		mounted(){
		},
		methods:{
			saveAdd(){
				this.addVisible = false;
			},
			cancelAdd(){
				this.addVisible = false;
			},
			editInfo(){				
			},
			popDelete(row){
				console.log(row);
				this.showSingleDelete = true;
			},	
			quitSingleConfirm(){
				this.showSingleDelete = false;
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
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},		
			queryNow(){
			},
			reset(){
			},
		},
    }
</script>
<style scoped lang="scss">
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
	.forProcessingContainer {
		background-color: $bgGrey;
		box-sizing: border-box;
		padding: 20px;
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
			height: 500px;
			background-color: #fff;
			border-radius: 10px;
			padding: 8px;
			box-sizing: border-box;		
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
			margin-bottom: 20px;			
		}
		.timerCon {
			width: 280px;
			margin-right: 20px;
			margin-bottom: 20px;
		}
		.ableRent {
			margin-right: 20px;
		}
		.sameWidth {
			width: 170px;
			margin-bottom: 20px;
		}
		.scrollContainer {
			height: 370px;
			overflow-y: scroll;
		}
	}
</style>
<style  lang="scss">
	.forProcessingContainer {
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
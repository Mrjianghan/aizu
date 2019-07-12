 <template>
  <div class="messageContainer" :class="{setBg:masterShow}">  	  
	   <div class="masterShow" v-if="masterShow">
		  <div class="searchCon">
			  <div class="nameSearchCon sameWidth ableRent">
				  <el-input  placeholder="输入关键词" v-model.trim="agreementNumber" clearable>
				</el-input>
			 </div>
			  <div class="ableRent sameWidth">
				  <el-select v-model="ableRent" placeholder="请选择">			
					  <el-option label="状态（全部）" value=""></el-option>
					  <el-option label="可出租" value="1"></el-option>
					  <el-option label="不可出租" value="0"></el-option>
					</el-select>
				</div>
			<div class="ableRent sameWidth">
				  <el-select v-model="ableRent" placeholder="请选择">			
					  <el-option label="类型（全部）" value=""></el-option>
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
					  start-placeholder="创建开始日期"
					  end-placeholder="创建结束日期"
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
				  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="370"  stripe>
					  <el-table-column  label="类型" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					<el-table-column  label="消息内容" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
				<el-table-column  label="消息类型" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					<el-table-column  label="是否已读" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
				<el-table-column  label="创建日期" show-overflow-tooltip>
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
				<el-table-column  label="操作日期" show-overflow-tooltip>
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					<el-table-column label="操作">
						  <template slot-scope="scope">
							<div >
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
		</div>
		<div v-else class="scrollCon">
			<Detail></Detail>
		</div>
  </div>
</template>
<script>	
	import Detail from './messageDetail.vue'
    export default {
		components:{   
			Detail
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
        data(){
			return {
				masterShow:true,
				orderMan:'',
				repairMan:'',
				communityName:'',
				addForm:{},
				addRules:{},
				agreementNumber:'',
				ableRent:'',
				delAble:false,
				time:Date.now(),
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
			editInfo(row){
				this.masterShow = false;
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
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			queryNow(){				
			},
			reset(){				
			},
		},
    }
</script>
<style scoped lang="scss">
	.scrollCon {
		overflow-y: scroll;
		height: 600px;
	}
	.setBg {
		background-color: $bgGrey;
	}
	.messageContainer {
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
			height: 440px;
			background-color: #fff;
			border-radius: 10px;
			padding: 14px;
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
	}
</style>
<style  lang="scss">
	.messageContainer {		
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
	}
</style>
<template>
  <div class="shoppingListContainer">  	
	   <div class="tableOuter">
		  <div class="tableContent" :style="{width:computed}" >
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
                  <el-table-column  label="序号" type="index"></el-table-column>
                  <el-table-column  label="供应商" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
					<el-table-column  label="供应商联系方式" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="楼盘名称" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="收货联系人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="收货联系人电话" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>				
					<el-table-column  label="申请人" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="申请日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="操作" show-overflow-tooltip>
					  <template slot-scope="scope">
						<div>
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="popNow(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看详情</span>  </div>	
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
</template>
<script>
	import { mapGetters } from 'vuex'
    export default {
		computed: {
			...mapGetters([
                'tagsLists',
				'tagActive'
			])
		  },
        data(){
			return {
                loading:true,
				computed:'auto',
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],							
			}
		},
		mounted(){
			this.initTable();
            this.runSearch();
		},
		methods:{
            runSearch(){
                this.loading = false;
            },
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
			popNow(row){
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/shoppingList/detail',{id:1}); 
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);				
				this.size = val;
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.current = val;
			},
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
		},
    }
</script>
<style scoped lang="scss">
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
	.shoppingListContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.pagOuter {
			text-align: right;
			padding-top: 10px;
			box-sizing: border-box;
		}
		.tableOuter {
			height: 670px;
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
			}
		}
	}
</style>
<style  lang="scss">
	.shoppingListContainer {
		.el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
	}
</style>
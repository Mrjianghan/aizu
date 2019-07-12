<template>
<div class="shoppingListDetailContainer"> 
	<div class="inner">	
		<div class="top">
		   <div class="topHeader">
			  <div class="topHeadLeft" @click="goBack">
				  <i class="icon-fanhui- iconfont"></i>&nbsp;&nbsp;<span>返回</span>
				</div>
			</div>
			<div class="flexCon">
				<div class="repairInfoCon">
					<div class="repairInfoDetailCon">
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">申请日期</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">需求日期</div>
							<div class="repairInfoDetailContent">收房</div>
						</div>
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">配送地址</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>	
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">供应商</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>	
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">楼盘名称</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>	
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">配送单号</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>	
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">供应商联系方式</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">收货联系人</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>	
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">联系人号码</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
		<div class="tableContent" :style="{width:computed}" >
		  <el-table :data="startTable"  tooltip-effect="dark"  style="width: 100%"   :height="'startTableHeight'"  stripe>
			  <el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
				<el-table-column  label="物资名称" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="型号" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="单位" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>			
				<el-table-column  label="数量" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>		
				<el-table-column  label="单价" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column  label="金额" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>	
				<el-table-column  label="税额" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>	
				<el-table-column  label="总额" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>	
				<el-table-column  label="备注" show-overflow-tooltip>
				  <template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>	
		</el-table>
	</div>
	<div class="bottomName">
		申请人：XXX
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
		watch:{
			'startTable':function(nval,val){
				this.Digital.setTableHeight.bind(this)('startTableHeight',(nval.length+1)*50);                
			},
		},
        data(){
			return {
				computed:'auto',
				startTable:[
					{name:'幂幂'},
					{name:'幂幂'},
				],
				startTableHeight:50,
			}
		},
		mounted(){
			this.initTable();
		},
		methods:{
			goBack(){
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/shoppingList',{id:1}); 
			},
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
		},
    }
</script>
<style scoped lang="scss">
	.shoppingListDetailContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
	}
	.bottomName {
		text-align: right;
		margin-top: 10px;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		color: #a4aabc;
	}
	.flexCon {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content:flex-start;
	}
	.repairInfoDetailCon {
		.repairInfoDetailLists {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			margin-bottom: 20px;				
		}
		.repairInfoDetailTitle {
			color: #a4aabc;
			font-size: 13px;
			width: 80px;
			text-align: right;
		}
		.repairInfoDetailContent {
			font-weight: 600;
			font-size: 14px;
				margin-left: 20px;
			}
		}
		.inner {
			background-color: #fff;
			border-radius: 10px;
			padding: 24px;
		}
		.topHeader {
			height: 40px;
			margin-bottom: 24px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			.topHeadLeft {
				width: 120px;
				height: 40px;
				line-height: 40px;
				border-radius: 20px;
				background-color: #ffefef;
				color: $mainRed;
				text-align: center;
				cursor: pointer;
				span {
					vertical-align: 1px;
					font-size: 12px;
					font-weight: 600;
				}
			}			
		}			
</style>
<style  lang="scss">
	.shoppingListDetailContainer {
		.el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
	}
</style>
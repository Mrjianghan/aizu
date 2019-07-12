<template>
<div class="earlyWithdrawalDetailContainer"> 
	<div class="inner">
		<div class="top">
		   <div class="topHeader">
			  <div class="topHeadLeft" @click="goBack">
				  <i class="icon-fanhui- iconfont"></i>&nbsp;&nbsp;<span>返回</span>
				</div>
			</div>
			<div class="flexCon">
				<div class="repairInfoCon">
					<div class="repairInfoFirst">
						<span class="repairInfoTitle">支取详情</span>
						<span class="repairInfoStatus">[状态：待审核]</span>
					</div>
					<div class="repairInfoDetailCon">
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">合同号</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">姓名</div>
							<div class="repairInfoDetailContent">收房</div>
						</div>
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">创建时间</div>
							<div class="repairInfoDetailContent">NB100300K4</div>
						</div>
						<div class="repairInfoDetailLists">
							<div class="repairInfoDetailTitle">租金金额</div>
							<div class="repairInfoDetailContent">
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
								<div class="rentalAmountText">2018-12-16 -2021-12-15 金额：2200.00</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="middle">
		  <div class="middleTitle">数据表</div>
		  <div class="tableContent" :style="{width:computed}" >
			  <el-table :data="startTable"  tooltip-effect="dark"  style="width: 100%" :height="startTableHeight"  stripe>
					<el-table-column  label="应付日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="应付金额" show-overflow-tooltip>
					  <template slot-scope="scope">￥{{ scope.row.name }}</template>
					</el-table-column>
					<el-table-column  label="实际金额" show-overflow-tooltip>
					  <template slot-scope="scope">￥{{ scope.row.name }}</template>
					</el-table-column>																
			</el-table>
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
				computed:'auto',
				startTable:[],
				startTableHeight:150,
			}
		},
		watch:{
			'startTable':function(nval,val){
                this.Digital.setTableHeight.bind(this)('startTableHeight',(nval.length+1)*50); 
			},
		},
		mounted(){
            this.$nextTick(()=>{
                this.initRequest(); 
            });            
			this.initTable();
		},
		methods:{  
            initRequest(){
                console.log( 'initRequest',this.$route.query ); 
                this.startTable = [
					{name:'幂幂'},
					{name:'幂幂'},
                    {name:'幂幂'},
					{name:'幂幂'},
				];
            },
			initTable(){
                this.Digital.tableWidthController.bind(this)(310,'computed'); 
			},
			goBack(){                
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/earlyWithdrawal');   
			},
		},
    }
</script>
<style scoped lang="scss">
	.earlyWithdrawalDetailContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
	}	
	.rentalAmountText {
		margin-bottom: 10px;
	}
	.inner {
		background-color: #fff;
		border-radius: 10px;
		padding: 24px;
	}
	.repairInfoFirst {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		margin-bottom: 30px;
		.repairInfoTitle {
			font-weight: 600;
			font-size: 16px;
		}
		.repairInfoStatus {
			font-size: 16px;
			color: $mainRed;
			margin-left: 10px;
			font-weight: 600;
		}
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
	.middle {
		margin-top: 40px;
		margin-bottom: 40px;
		.middleTitle {
            margin-bottom: 30px;
            font-weight: 600;
            font-size: 16px;
            margin-left: 30px;
		}
	}
</style>
<style  lang="scss">
	.earlyWithdrawalDetailContainer {
		.el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
	}
</style>
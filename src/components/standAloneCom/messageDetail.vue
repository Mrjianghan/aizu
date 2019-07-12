<template>
  <div class="messageDetailContainer">
	  <div class="tableShow" v-show="tableShow">
				  <div class="printContainer">                      
					  <div class="printHeader" >违约到期流转单</div>
					  <div class="table">
						  <div class="flexLeft baseInfo">
							  <div class="sameHeightRow ">基本信息</div>
							</div>
						  <div class="flexLeft">
							  <div class="firstColumn  sameHeightRow">合同号</div>
							  <div class="secondColumn sameHeightRow">NB100300K4</div>
							  <div class="thirdColumn sameHeightRow">登记人</div>
							  <div class="fourthColumn sameHeightRow"></div>
							  <div class="fifthColumn sameHeightRow">小区</div>
							  <div class="sixthColumn sameHeightRow "></div>
							  <div class="seventhColumn sameHeightRow rentPhone borderBottom borderRight borderLeft">地址</div>
							  <div class="eightthColumn sameHeightRow phoneCon borderBottom">12345678901</div>
							</div>
						  <div class="flexLeft">
							  <div class="firstColumn  sameHeightRow">业务员</div>
							  <div class="secondColumn sameHeightRow">NB100300K4</div>
							  <div class="thirdColumn sameHeightRow">租客姓名</div>
							  <div class="fourthColumn sameHeightRow"></div>
							  <div class="fifthColumn sameHeightRow">租客电话</div>
							  <div class="sixthColumn sameHeightRow ">12345678901</div>
							  <div class="seventhColumn sameHeightRow rentPhone borderBottom borderRight borderLeft">房租</div>
							  <div class="eightthColumn sameHeightRow phoneCon borderBottom">12345678901</div>
							</div>
						  <div class="flexLeft">
							  <div class="firstColumn sameHeightRow">情况</div>
							  <div class="borderBottom sameHeightRow addressWidth borderRight"></div>
							  <div class=" sameHeightRow borderBottom fifthColumn">说明</div>
							  <div class="borderBottom sameHeightRow specialSix specialSixFix"></div>
							</div>
						  <div class="flexLeft ">
							  <div class="firstColumn sameHeightRow">违约专员</div>
							  <div class="borderBottom sameHeightRow addressWidth borderRight"></div>
							  <div class=" sameHeightRow borderBottom fifthColumn">办结时间</div>
							  <div class="borderBottom sameHeightRow specialSix specialSixFix"></div>
							</div>						
						  <div class="flexLeft">
							  <div class="firstColumn sameHeightRow ">违约专员说明</div>
							  <div class="borderBottom sameHeightRow second"></div>
							</div>
						  <div class="flexLeft">
							  <div class="firstColumn  doubleHeightRow removeBottomBorder">合同开始时间</div>
							  <div class="secondColumn doubleHeightRow removeBottomBorder">2015-10-20</div>
							  <div class="thirdColumn doubleHeightRow removeBottomBorder">合同结束时间</div>
							  <div class="fourthColumn doubleHeightRow removeBottomBorder">2015-10-20</div>
							  <div class="fifthColumn doubleHeightRow removeBottomBorder">到期房屋回收时间</div>
							  <div class="sixthColumn doubleHeightRow removeBottomBorder">2015-10-20</div>
							  <div class="seventhColumn doubleHeightRow rentPhone borderBottom borderRight borderLeft removeBottomBorder">违约房屋回收时间</div>
							  <div class="eightthColumn doubleHeightRow phoneCon borderBottom removeBottomBorder">2015-10-20</div>
							</div>
						</div>
					  <div class="head">水电、煤气、其他</div>
					  <div>
						  <div class="firstTitleCon">
							  <div class="firstTitleFirst  borderRight">&nbsp;</div>
							  <div class="firstTitleSecond  borderRight">水（度）</div>
							  <div class="firstTitleThird  borderRight">电（度）</div>
							  <div class="firstTitleFourth  borderRight">煤气（度）</div>
							  <div class="firstTitleFifth  borderRight">空调</div>
							  <div class="firstTitleSixth  borderRight">电视费</div>
							  <div class="firstTitleSeventh  borderRight">电梯费</div>
							  <div class="firstTitleEighth  borderRight">公用电费</div>
							  <div class="firstTitleNinth  borderRight removeRightBorder">其他（度）</div>
						  </div>
						  <template v-for="i in 5">
							  <div class="firstTitleCon removeTopBorder ">
								  <div class="firstTitleFirst borderRight sameHeightRow"></div>
								  <div class="firstTitleSecond borderRight sameHeightRow"></div>
								  <div class="firstTitleThird borderRight sameHeightRow"></div>
								  <div class="firstTitleFourth borderRight sameHeightRow"></div>
								  <div class="firstTitleFifth borderRight sameHeightRow"></div>
								  <div class="firstTitleSixth borderRight sameHeightRow"></div>
								  <div class="firstTitleSeventh borderRight sameHeightRow"></div>
								  <div class="firstTitleEighth borderRight sameHeightRow"></div>
								  <div class="firstTitleNinth borderRight sameHeightRow removeRightBorder"></div>
							  </div>
							</template>
						</div>
						<div class="head">结算费用</div>
					  <div>
						  <div class="firstTitleCon flexTitlePrint removeBottomBorder">
							  <div class="flexThree  removeBottomBorder">
								  <div class="first">项目</div>
								  <div class="second">违约专员</div>
								  <div class="third">财务</div>
							  </div>
							  <div class="flexThree removeBottomBorder">
								  <div class="first">项目</div>
								  <div class="second">违约专员</div>
								  <div class="third">财务</div>
							  </div>
							  <div class="flexThree removeRightBorder removeBottomBorder">
								  <div class="first">项目</div>
								  <div class="second">违约专员</div>
								  <div class="third">财务</div>
							  </div>
						  </div>
						  <div class="firstTitleCon flexTitlePrint limitWidth removeBottomBorder removeRightBorder">
							  <template v-for="i in 10">
									<div class="flexThree ">
										  <div class="first">公司代付物业费</div>
										  <div class="second">1234567</div>
										  <div class="third ">1234567</div>
									</div>
							  </template>
						  </div>
						  <div class="firstTitleCon flexTitlePrint limitWidth removeBottomBorder">
							  <div class="threeParts">
								  	<div class="first">代付公用电费</div>
									<div class="second">1234567</div>
									<div class="third ">1234567</div>
							  </div>
							  <div class="threeParts">
								  	<div class="first">其他费用</div>
									<div class="second">1234567</div>
									<div class="third ">1234567</div>
							  </div>
							  <div class="threeParts">
								  	<div class="first">总计</div>
									<div class="second">1234567</div>
									<div class="third ">1234567</div>
							  </div>
							  <div class="twoParts">
								  	<div class="first">备注</div>
									<div class="second">1234567</div>
							  </div>
							  <div class="twoParts">
								  	<div class="first">房租结算时间</div>
									<div class="second">1234567</div>
							  </div>
						  </div>
						</div>
					</div>
		</div>
	  
	  <div class="inner">
		  <div class="top">
			   <div class="topHeader">
				   <div class="topHeadLeft">
					   <div class="goBack" @click="goBack">					  
						  <i class="icon-fanhui- iconfont"></i>&nbsp;<span>  返回</span>					  
						</div>
					   <el-tooltip content="回退" placement="bottom" effect="light">
						   <div class="fallBack" @click="fallBack">					  
							  <i class="icon-huitui- iconfont"></i>				  
							</div>
					   </el-tooltip>
				   </div>
				  <div class="topHeadRight">
					  <div class="print" @click="print">打印</div>
					</div>
				</div>
			  <div class="flexCon">
				  <div class="left">
					  <div class="repairInfoCon">
						<div class="repairInfoFirst">
							<div class=" repairInfoDetailTitle special">合同NB100</div>
							<span class="repairInfoStatus">[状态：待接收]</span>
						</div>
						<div class="repairInfoDetailCon">
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">合同号</div>
								<div class="repairInfoDetailContent">NB100300K4</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">违约类型</div>
								<div class="repairInfoDetailContent">收房</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">登记人</div>
								<div class="repairInfoDetailContent">叽叽叽</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">出租业务员</div>
								<div class="repairInfoDetailContent">叽叽叽</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">小区</div>
								<div class="repairInfoDetailContent">2018-09-07  08:30:07</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">地址</div>
								<div class="repairInfoDetailContent">2018-09-07  08:30:07</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">房东/租客姓名</div>
								<div class="repairInfoDetailContent">2018-09-07  08:30:07</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">房东/租客电话</div>
								<div class="repairInfoDetailContent">2018-09-07  08:30:07</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">银行卡号</div>
								<div class="repairInfoDetailContent">2018-09-07  08:30:07</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">持卡人姓名</div>
								<div class="repairInfoDetailContent">叽叽叽</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">开户银行</div>
								<div class="repairInfoDetailContent">2018-09-07  08:30:07</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">合同开始时间</div>
								<div class="repairInfoDetailContent">兴宁巷83号</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">合同结束时间</div>
								<div class="repairInfoDetailContent">兴宁巷83号533室</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">房租</div>
								<div class="repairInfoDetailContent">￥0.00</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">到期房屋回收时间</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">房租付至日</div>
								<div class="repairInfoDetailContent">内部维修</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">说明/备注</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">违约单开始时间</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">违约单结束时间</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">违约专员</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">房源责任人</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
							<div class="repairInfoDetailLists">
								<div class="repairInfoDetailTitle">违约专员说明</div>
								<div class="repairInfoDetailContent">空房复查</div>
							</div>
						</div>
					</div>
					</div>
				  <div class="right">
					  <div class="repairStaffInfo">						  
						  <div class="repairInfoFirst">
							<span class="repairInfoTitle">财务备注信息</span>
						  </div>
						  <div class="repairStaffInfoLists">
							<div class="repairStaffInfoTitle">维修记录</div>
							  <el-input
										maxlength="200"
										 class="textarea"
										  type="textarea"
										  :rows="4"
										  placeholder="请输入维修记录"
										  v-model="repairStaffTextValue"
											:resize="'none'">
								</el-input>
								<div class="topHeadLeft specialConfirm" @click="recordsConfirm"><span>确认</span></div>
							</div>
					   </div>
					  <div class="repairStaffInfo">						  
						  <div class="repairInfoFirst">
							<span class="repairInfoTitle">流程</span>
						  </div>
						  <div class="progressDetails">
							  <template v-for="(val,i) in 2">
									<div class="flexBetween">
										<div class="flexLeftSide">
											<div>2018-09-01</div>
											<div>20:25:40</div>
										</div>
										<div class="flexRightSide">
											<div class="top">张凯威 主办  </div>
											<div class="bottom">维修单创建成功 [已办结 ]</div>
										</div>
								  </div>
							  </template>
						  </div>
					   </div>
					</div>
				</div>
		</div>
		  <div class="middle">
			  <div class="middleTitle">原有物资</div>
			  <div class="tableContent">
				  <el-table :data="startTable"  tooltip-effect="dark"  style="width: 100%"   :height="'startTableHeight'"  stripe>
						<el-table-column  label="物品名称" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="新旧程度" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="规格型号" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="品牌" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="产品类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="数量" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="归属" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="备注" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="价格" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="赔偿费" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="违约专员确认栏" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="middle ">
			  <div class="middleTitle">水电、煤气、其他</div>
			  <div class="tableContent">
				  <el-table  :data="startTable1"  tooltip-effect="dark"  style="width: 100%"   :height="'startTableHeight1'"  stripe>
						<el-table-column  label="" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="水（度数）" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="电（度数）" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="煤气（度数）" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="空调" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="电视费" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="电梯费" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="公用电费" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
					  <el-table-column  label="其他（度数）" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>					 
				</el-table>
			</div>
		</div>
		  <div class="bottomSpe">
			  <div class="bottomFlex">
				  <div class="bottomTitle">费用结算</div>
			  </div>
			  <div class="hundredPercent">
				  <div class="thirdTitleCon">
					  <div class="thirdTitle">
						  <div class="first">项目</div>
						  <div class="second">违约专员</div>
						  <div class="third">财务</div>
					  </div>
					  <div class="thirdTitle">
						  <div class="first">项目</div>
						  <div class="second">违约专员</div>
						  <div class="third">财务</div>
					  </div>
					  <div class="thirdTitle">
						  <div class="first">项目</div>
						  <div class="second">违约专员</div>
						  <div class="third">财务</div>
					  </div>
				  </div>
				  <div class="itemCon">
					  <template v-for="(item,index) in itemArr">
							<div class="thirdTitle">
								<div class="first darker">{{item.name}}</div>
								  <div class="second darker">￥1200</div>
								  <div class="third darker">
									  <input placeholder="请输入" @change="cusInputChange">
						  			</div>
						  	</div>
					  </template>
				  </div>
				  <div>
					  <div class="thirdTitleLike">
						  <div class="first darker">其他费用</div>
						  <div class="second darker">￥0</div>
						  <div class="third darker">
							  <input placeholder="请输入">
						  </div>
					  </div>
				  </div>
				  <div>
					  <div class="thirdTitleLike">
						  <div class="first darker">总计</div>
						  <div class="second darker">￥0</div>
						  <div class="third darker">
							  <input placeholder="请输入">
						  </div>
					  </div>
				  </div>
				  <div>
					  <div class="thirdTitleLike">
						  <div class="first darker">备注</div>
						  <div class="second darker">￥0</div>
						  <div class="third darker">
							  <input placeholder="请输入">
						  </div>
					  </div>
				  </div>
				  <div>
					  <div class="thirdTitleLike">
						  <div class="first darker">房租结算时间</div>
						  <div class="third darker">
							  <input placeholder="请输入">
						  </div>
					  </div>
				  </div>
			  </div>
		</div>
		</div>
	  

		<el-dialog title="编辑" :visible.sync="editVisible" class="diagCon" :close-on-click-modal="false">
			<el-form :model="form" :rules="rules" ref="" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="姓名" prop="name">
						<el-input v-model.trim="form.name"></el-input>
					  </el-form-item>
					 <el-form-item label="身份" >
						  <el-select v-model="form.type" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						  </el-select>
						</el-form-item>
					<el-form-item label="银行支行" prop="name">
						<el-input v-model.trim="form.name"></el-input>
					  </el-form-item>
					<el-form-item label="最后登录时间" prop="name">
						<el-input v-model.trim="form.name" disabled></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveEdit"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEdit"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<transition name="popDel">
			<div v-show="dialogVisible2" class="dialogVisible2">
				<div class="visible2Inner">
					<div  class="el-dialog__header">
						<span class="el-dialog__title">确认修改</span>
						<button type="button" @click="shutCus" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
					</div> 
					<div class="el-dialog__body"><span >确认修改？</span></div>
					<div class="el-dialog__footer">
						<span  class="dialog-footer">
							<div class="diagBtnConSpecial">
								<RedBtn @click.native="confirmDialogVisible2"></RedBtn>
								<GreyBtn class="marLeft" @click.native="cancelDialogVisible2"></GreyBtn>
							</div>
						</span>
					</div>
				</div>
			</div>
	</transition>
  </div>
</template>
<script>
    export default {
		watch:{
			'startTable':function(nval,val){
				console.log('nval',nval);
				this.Digital.setTableHeight.bind(this)('startTableHeight',(nval.length+1)*50); 
			},
			'startTable1':function(nval,val){
				console.log('nval',nval);
				this.Digital.setTableHeight.bind(this)('startTableHeight1',(nval.length+1)*50); 
			},
			'newTable':function(nval,val){
				this.Digital.setTableHeight.bind(this)('newTableHeight',(nval.length+1)*50); 
			},
			
		},
        data(){
			return {
				dialogVisible2:false,
				itemArr:[
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'公司代办阀手动阀业务业务费'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
					{name:'房租'},
				],
				startTable1:[],
				startTableHeight1:100,
				startTable:[],
				newTable:[],
				startTableHeight:100,
				newTableHeight:100,
				form:{},
				editVisible:false,
				addVisible:false,
				form:{},
				rules:{},
				addform:{},
				addrules:{},
				repairStaffTextValue:'',
				tableShow:false,
			}
		},
		mounted(){		
			this.startTable1 = [
				{name:'me'},
				{name:'me'}
			];
			this.startTable = [
				{name:'me'},
				{name:'me'}
			];
			this.newTable = [
				{name:'me'},
				{name:'me'},
				{name:'me'},
				{name:'me'}
			];
		},
		methods:{
			shutCus(){
				this.dialogVisible2 = false;
			},
			confirmDialogVisible2(){
				this.dialogVisible2 = false;
			},
			cancelDialogVisible2(){
				this.dialogVisible2 = false;
			},
			cusInputChange(){
				this.dialogVisible2 = true;
			},
			recordsConfirm(){
				this.Success.saveSuccess();
//				this.Err.netErr();
			},
			saveEdit(){
				this.editVisible = false;
			},
			cancelEdit(){
				this.editVisible = false;
			},
			goBack(){
				this.$parent.masterShow = true;
			},
			fallBack(){
			} ,
			print(){

				
			},
		},
    }
</script>
<style scoped lang="scss">
	.dialogVisible2 {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		z-index: 200;
		.visible2Inner {
			height: 200px;
			width: 540px;
			margin: auto;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: #fff;
			border-radius: 10px;
		}
	}	
	.tableShow {
		position: absolute;
		width: 790px;
		height: 800px;
		background-color: aquamarine;
		left: 200px;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.hundredPercent {
		width: 100%;
		.thirdTitleCon {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:flex-start;
			align-content: center;
			align-items: center;
		}
		.itemCon {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap:wrap;
			justify-content:flex-start;
			align-content: center;
			align-items: center;
		}
		.darker {
			color: #464b60;
			font-weight: 600;
		}
		.thirdTitleLike {
			width: 33.333%;
			height: 20px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:flex-start;
			align-content: center;
			align-items: center;	
			color: #a4aabc;
    		font-size: 13px;
			text-align: center;
			padding-bottom: 30px;
			.first {
				width: 30%;
			}
			.second {
				width: 30%;
			}
			.third {
				width: 40%;
				input {
					height: 30px;
					width: 130px;
					border: 2px solid #efeef3;
					box-sizing: border-box;
					padding-left: 20px;
				}
			}
		}
		.thirdTitle {
			width: 33.333%;
			height: 20px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:flex-start;
			align-content: center;
			align-items: center;	
			color: #a4aabc;
    		font-size: 13px;
			text-align: center;
			padding-bottom: 30px;
			&:after {
				border-right:1px  dashed #444;
				content: '';
				height: 100%;
			}
			.first {
				width: 30%;
			}
			.second {
				width: 30%;
			}
			.third {
				width: 40%;
				input {
					height: 30px;
					width: 130px;
					border: 2px solid #efeef3;
					box-sizing: border-box;
					padding-left: 20px;
				}
			}
		}
	}
	.messageDetailContainer {
		box-sizing: border-box;
		padding-top: 0 !important;		
		.inner {
			background-color: #fff;
			padding-top: 10px;
		}
		.top {
			.topHeadLeft {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-content: center;
				align-items: center;					
				.fallBack {
					width: 40px;
					height: 40px;
					line-height: 40px;
					border-radius: 20px;
					text-align: center;
					color: #fff;
					background-color: #2a2f48 !important;
					cursor: pointer;
					box-shadow: 0px 2px 10px 5px #dadbe1 !important;
					margin-left: 20px;
					.iconfont {
						font-size: 24px;
					}
				}
				.goBack {
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
		.specialConfirm {
			width: 70px !important;
			margin-left: 20px;
			border-radius: 20px;
			background-color: #ffefef;
			color: #fc6565;
			font-size: 12px;
			font-weight: 600;
			text-align: center;
			cursor: pointer; 
			height: 40px;
			justify-content: center !important;
		}
		.textarea {
			font-size: 14px;
			margin-left: 20px;
			height: 100px;
			border-color: #e4e6ee;
			resize: none;
			width: 230px;
			box-sizing: border-box;
			font-family: PingFang SC,Microsoft YaHei,BlinkMacSystemFont,Helvetica Neue,Hiragino Sans GB, 'Avenir', Arial, sans-serif;
		}
		.repairStaffInfoTitle {
			color: #a4aabc;
			font-size: 13px;
			width: 96px;
			text-align: right;
		}
		.repairStaffInfoLists {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			margin-bottom: 20px;
		}
		.progressDetails {
			margin-top: 24px;
		}	
		.flexBetween {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			width: 310px;
			margin-bottom: 20px;
			.flexLeftSide {
				color: #a4aabc;
				font-size: 13px;
				width: 96px;
				text-align: right;
			}
			.flexRightSide {
				width: 150px;
				position: relative;
				&::before {
					content: "";
					position: absolute;
					background-color: $mainRed;
					height: 10px;
					width: 10px;
					border-radius: 5px;
					left: -40px;
					top: 5px;
				}
				.top {
					font-size: 15px;
					font-weight: 600px;
				}
				.bottom {
					color: #a4aabc;
					font-size: 13px;
				}
			}
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
					width: 140px;
					text-align: right;
				}
				.repairInfoDetailContent {
					font-weight: 600;
					font-size: 14px;
					margin-left: 20px;
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
			.topHeadRight {
				.print {
					width: 90px;
					height: 40px;
					line-height: 40px;
					color: #fff;
					background-color: $mainRed;
					text-align: center;
					border-radius: 20px;
					font-size: 13px;
					cursor: pointer;
					box-shadow: $redShadow;
				}
			}
		}
		.flexCon {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:flex-start;
			.left {
				width: 50%;
			}
			.right {
				width: 50%;
			}
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
	.scrollContainer {
		overflow-y: scroll;
		height: 370px;
	}
	.bottomSpe {
		margin-bottom: 20px;
		.bottomTitle {
			font-weight: 600;
			font-size: 16px;
			margin-bottom: 30px;
			margin-left: 30px;
		}
		.bottomFlex {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.addBg {
				background-color: #2a2f48 !important;
				height: 30px;
				width: 30px;
				background-color: $mainRed;
				border-radius: 15px;
				line-height: 30px;
				text-align: center;
				color: #fff;
				box-shadow: $redShadow;
				cursor: pointer;
				box-shadow: 0px 2px 10px 5px #dadbe1 !important;
			}
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
	.special {
		width: 140px;
		text-align: right;
		font-weight: 600;
	}
}
</style>
<style  lang="scss">
	.messageDetailContainer {
		.diagBtnConSpecial {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-content: center;
			align-items: center;
			.marLeft {
				margin-left: 20px;
			}
		}
		.el-dialog__body {
			padding: 30px 20px !important;
		}
		.el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
	}
</style>	
<style  lang="scss">
	@page {
		margin: 0mm;
		margin-top: 2mm;
	}
	@media all {
		.tableShow {
			font-size: 10px;
			z-index: 300;
		}
		.limitWidth {
			width: 790px;
			flex-wrap: wrap !important;
			box-sizing: border-box;
		}
		.threeParts {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			border-bottom: 1px solid #999;
			box-sizing: border-box;
			.first {
				width: 120px;
				border-right: 1px solid #999;
				text-align: center;
				box-sizing: border-box;
			}
			.second {
				width: 300px;
				border-right: 1px solid #999;
				text-align: center;
				box-sizing: border-box;
			}
			.third {
				width: 370px;
				text-align: center;
				box-sizing: border-box;
			}
		}
		.twoParts {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			box-sizing: border-box;
			border-bottom: 1px solid #999;
			.first {
				width: 120px;
				border-right: 1px solid #999;
				text-align: center;
				box-sizing: border-box;
			}
			.second {
				width: 670px;
				text-align: center;
				box-sizing: border-box;
			}
		}
		.flexTitlePrint {
			display: flex;
			flex-direction: row;
			flex-wrap:nowrap;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
		}
		.flexThree {
			width: 263px;
			border-right: 1px solid #999;
			border-bottom: 1px solid #999;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			.first {
				width: 120px;
				border-right: 1px solid #999;
				text-align: center;
			}
			.second {
				width: 70px;
				border-right: 1px solid #999;
				text-align: center;
			}
			.third {
				width: 70px;
				text-align: center;
			}
		}
		.table {
			margin-top: 6px;
			width: 790px;;
			border: 1px solid #999;
			box-sizing: border-box;
			text-align: center;
		}	
		.printHeader {
			text-align: center;
		}
		.rentPhone {
		}
		.second {
			width: 690px;
		}
		.phoneCon {
			width: 128px;
		}
		.checkTime {
			width: 180px !important;
		}
		.specialTimer {
			width: 240px !important;
			border-bottom: 1px solid #999;
		}
		.addressWidth {
			width: 330px;
		}
		.borderBottom {
			border-bottom: 1px solid #999;
		}
		.borderRight {
			border-right: 1px solid #999;
		}
		.borderLeft {
			border-left: 1px solid #999;
		}
		.removeTopBorder {
			border-top: 0 !important;
		}
		.secondDateCon {
			width: 100px;
				text-align: center;		
				box-sizing: border-box;
		}
		.fourty {
			width: 40px !important;
		}
		.fourtyHeight {
			height: 34px !important;
		}
		.firstTitleCon {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
			border: 1px solid #999;			
			.firstTitleFirst {
				width: 100px;
				text-align: center;		
				box-sizing: border-box;
			}
			.firstTitleSecond {
				width: 80px;
				text-align: center;		
				box-sizing: border-box;
			}
			.firstTitleThird {
				width: 80px;
				text-align: center;	
				box-sizing: border-box;
			}
			.firstTitleFourth {
				width: 100px;
				text-align: center;	
				box-sizing: border-box;
			}
			.firstTitleFifth {
				width: 80px;
				text-align: center;	
				box-sizing: border-box;
			}
			.firstTitleSixth {
				width: 80px;
				text-align: center;	
				box-sizing: border-box;
			}
			.firstTitleSeventh {
				width: 90px;
				text-align: center;	
				box-sizing: border-box;
			}
			.firstTitleEighth {
				width: 90px;
				text-align: center;	
				box-sizing: border-box;
			}
			.firstTitleNinth {
				width: 90px;
				text-align: center;	
				box-sizing: border-box;
			}
		}
		.firstColumn {
			width: 100px;
			border-bottom:  1px solid #999;
			border-right:  1px solid #999;
			text-align: center;
			box-sizing: border-box;
		}
		.secondColumn {
			width: 100px;
			border-bottom:  1px solid #999;
			border-right:  1px solid #999;
		}
		.thirdColumn {
			width: 100px;
			border-bottom:  1px solid #999;
			border-right:  1px solid #999;
		}		
		.fourthColumn {
			width: 100px;
			border-bottom:  1px solid #999;
			border-right:  1px solid #999;
		}
		.fifthColumn {
			width: 80px;
			border-bottom:  1px solid #999;
			border-right:  1px solid #999;
		}
		.head {
			text-align: center;
		}
		.sixthColumn {
			width: 120px;
			border-bottom:  1px solid #999;
		}
		.seventhColumn {
			width: 80px;
		}
		.eightthColumn {
		}
		.removeBottomBorder {
			border-bottom: 0px !important;
		}
		.removeRightBorder {
			border-right: 0px !important;
		}
		.specialSix {
			width: 280px;
		}
		.specialSixFix {
			width: 278px !important;
		}
		.sameHeightRow {
			height: 18px;
			line-height: 18px;
			box-sizing: border-box;
		}
		.doubleHeightRow {
			height: 40px;
			box-sizing: border-box;
			vertical-align:bottom !important;
		}
		.flexLeft {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-content: center;
			align-items: center;
		}		
		.baseInfo {
			text-align: center;
			border-bottom: 1px solid #999;
			border-top: none !important;
			justify-content: center !important;
		}
	}
</style>
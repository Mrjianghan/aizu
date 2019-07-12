<template>
  <div class="houseManageContainer">  
      <div class="searchCon flex">
		  <div class="sameWidth marBottom marRight">
			  <el-input  placeholder="输入房源名"  v-model.trim="searchMaster.houseName"  clearable @change="inputChange(searchMaster.houseName,'searchMaster','houseName')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入小区名"  v-model.trim="searchMaster.CommunityName" clearable  @change="inputChange(searchMaster.CommunityName,'searchMaster','CommunityName')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入合同号"  v-model.trim="searchMaster.agreementNo" clearable @change="inputChange(searchMaster.agreementNo,'searchMaster','agreementNo')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入设备编号"  v-model.trim="searchMaster.equipNo" clearable @change="inputChange(searchMaster.equipNo,'searchMaster','equipNo')"></el-input>
		 </div>
          <div class="sameWidth marBottom marRight">
			  <el-select v-model="searchMaster.payType" placeholder="请选择付费模式" @change="inputChange(searchMaster.payType,'searchMaster','payType')">			
				  <el-option label="付费模式(全部)" value=""></el-option>
				  <el-option label="预付费" value="预付费"></el-option>
				  <el-option label="后付费" value="后付费"></el-option>	
				</el-select>
			</div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model="searchMaster.unsualStatus" placeholder="请选择异常状态" @change="inputChange(searchMaster.unsualStatus,'searchMaster','unsualStatus')">			
				  <el-option label="异常状态(全部)" value=""></el-option>
				  <el-option label="异常" value="异常"></el-option>
				  <el-option label="正常" value="正常"></el-option>	
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''"  v-model="searchMaster.time"  type="daterange" align="right"  unlink-panels range-separator="至"  start-placeholder="创建开始日期"  end-placeholder="创建结束日期"  value-format="yyyy-MM-dd"	@change="inputChange(searchMaster.time,'searchMaster','time')" :picker-options="pickerOptions2"></el-date-picker>
			</div>
		  <div class="btnCon flex marBottom">
              <div class="queryNow btnsame" @click="queryNow">查询</div>
              <div class="reset btnsame" @click="reset">重置</div>
			</div>
		</div>
	  <div class="tableOuter">
		   <div class="tableTop flex">
			   <div class="tableTopLeft flex">
				    <div class="anotherSelectFile">                        
						<input class="changeManageInput" ref="houseManageFileOne" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importManage('houseManageFileOne')">                        
						<i class="iconfont icon-zerenbiangeng-"></i>  <span> 责任人变更</span>
					</div>				   
				   <div class="anotherSelectFile">
						<input class="changeManageInput" ref="houseManageFileTwo" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importElectricMeter('houseManageFileTwo')">
						<i class="iconfont icon-dianbiao-"></i>  <span> 批量绑定电表</span>
					</div>				   
				   <div class="anotherSelectFile">
						<input class="changeManageInput" ref="houseManageFileThree" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importElectricityPrice('houseManageFileThree')">
						<i class="iconfont icon-dianfei-"></i>  <span> 修改电价</span>
					</div>				   
				   <div class="anotherSelectFile">
						<input class="changeManageInput" ref="houseManageFileFour" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importAuthorizedPrice('houseManageFileFour')">
						<i class="iconfont icon-piliangxiugaijiage-"></i>  <span> 批量修改授权价格</span>
					</div>				   
				   <div class="anotherSelectFile">
						<input class="changeManageInput" ref="houseManageFileFive" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importPaymentMode('houseManageFileFive')">
						<i class="iconfont icon-piliangbangdingdianbiao-"></i>  <span> 批量绑定电表后付费模式</span>
					</div>				   
				   <div class="anotherSelectFile">
						<input class="changeManageInput" ref="houseManageFileSix" type="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="importChangePaymentMode('houseManageFileSix')">
						<i class="iconfont icon-genggaifufeifangshi-"></i>  <span> 更改付费模式</span>
					</div>				   
				</div>
			   <el-tooltip content="多选删除" placement="bottom" effect="light">
				   <div class="tableTopRight delDisable" :class="{delAble}" @click="delMultiple">
						   <i class="iconfont icon-shanchu-" ></i>
					</div>
				</el-tooltip>
			</div>
		  <div class="tableContent" :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column  label="合同号" show-overflow-tooltip min-width="100">
                      <template slot-scope="scope">{{ scope.row.contractNo | emptyProcessor }}</template>
                    </el-table-column>
				    <el-table-column  label="小区名" show-overflow-tooltip min-width="130">
					  <template slot-scope="scope">{{ scope.row.communityName | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="房源名称" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				    
				    <el-table-column  label="收房业务员" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ scope.row.shoufangClerk | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="出租业务员" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="责任业务员" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
					</el-table-column>
				    <el-table-column  label="面积" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ scope.row.area | formatAreaValue | emptyProcessor  }}</template>
					</el-table-column>
<!--
				    <el-table-column  label="是否上架" show-overflow-tooltip>
					  <template slot-scope="scope">{{ | emptyProcessor  }}</template>
					</el-table-column>
-->
				    <el-table-column  label="最小租金" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ scope.row.minRent | formatMoneyValueWithMark | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="显示租金" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ scope.row.rent | formatMoneyValueWithMark | emptyProcessor   }}</template>
					</el-table-column>
				    <el-table-column  label="房源状态" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ tableArr1[scope.row.houseStatus]  | emptyProcessor }}</template>
					</el-table-column>
                    <el-table-column  label="设备编号" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.pcode | emptyProcessor }}</template>
					</el-table-column>
                    <el-table-column  label="设备状态" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.pcode | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="电表更新时间" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.freeDay | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="电价" show-overflow-tooltip min-width="90">
					  <template slot-scope="scope">{{ scope.row.price | formatMoneyValueWithMark | emptyProcessor }}</template>
					</el-table-column>
				    <el-table-column  label="剩余电量" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.surplus | emptyProcessor }}</template>
					</el-table-column>
                    <el-table-column  label="充值状态" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ scope.row.rechargeStatus | emptyProcessor }}</template>
					</el-table-column>
<!--
				    <el-table-column  label="设备状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{  }}</template>
					</el-table-column>
-->
<!--
				    <el-table-column  label="户型" show-overflow-tooltip>
					  <template slot-scope="scope">{{ `${scope.row.livingRoomNumber ? scope.row.livingRoomNumber : '0'}室${scope.row.surplus ? scope.row.surplus : '0'}厅${scope.row.kitchenNumber ? }厨${scope.row.toiletNumber}卫` }}</template>
					</el-table-column>
-->
<!--
				    <el-table-column  label="备注" show-overflow-tooltip>
					  <template slot-scope="scope">{{  scope.row.memo | emptyProcessor  }}</template>
					</el-table-column>
-->
				    <el-table-column label="电表操作" min-width="100">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">
                                <div class="popperInner popperStrange" @click="batteryDetail(scope.row)"> <div> 详细</div>  </div>
								<div class="popperInner popperEdit" @click="batteryAnalysis(scope.row)"> <div> 用电分析</div>  </div>
								<div class="popperInner popperSpecial" @click="batteryCharge(scope.row)"> <div> 充值记录</div></div>
								<div class="popperInner popperYellow" @click="stayRecords(scope.row)"> <div> 入住记录</div></div>
								<div  class="operate" slot="reference">&nbsp;电表操作&nbsp;</div>
							  </el-popover>
                        </div>
                      </template>
                    </el-table-column>                    
				    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <div>
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperSpecial" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
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
		<el-dialog title="用电详情" :visible.sync="batteryAnalysisShow" class="largeDialog " :close-on-click-modal="false">
		  <div class="batteryAnalysisCon">
			  <div class="searchCon flex">
				  <div class="timerConCopy">
					  <el-date-picker
						prefix-icon="''"
						  v-model="time1"
						  type="daterange"
						  align="right"
						  unlink-panels
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				  <div>
					  <RedBtn :text="'查询'" @click.native="queryNow1('time1')"></RedBtn>
				  </div>
			  </div>
              <div class="chartContainer">
                  <div id="houseChartPie" style="width:1053px;height:300px;"></div>
              </div>
			  <div class="tableOuter1"> 
				  <el-table :data="tableData01"  tooltip-effect="dark"  style="width: 100%"   height="450"  stripe>
					    <el-table-column  label="序号" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="事项描述" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					  	<el-table-column  label="事项描述" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
				  </el-table>
				  <div class="pagOuter">
						<el-pagination
						  @size-change="handleSizeChange1"
						  @current-change="handleCurrentChange1"
						  :current-page="current1"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="size1"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="total1">
						</el-pagination>
				</div>
			  </div>
		  </div>
		</el-dialog>
		<el-dialog title="充值记录" :visible.sync="batteryChargeShow" class="largeDialog " :close-on-click-modal="false">
		  <div class="batteryChargeCon">
			  <div class="searchCon flex marBottom">
				  <div class="timerConCopy">
					  <el-date-picker
						prefix-icon="''"
						  v-model="time2"
						  type="daterange"
						  align="right"
						  unlink-panels
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				  <div>
					  <RedBtn :text="'查询'" @click.native="queryNow2('time2')"></RedBtn>
				  </div>
			  </div>			  
			  <div class="tableOuter2"> 
				  <el-table :data="tableData02"  tooltip-effect="dark"  style="width: 100%"   height="450"  stripe >
					    <el-table-column  label="日期" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="金额" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					  	<el-table-column  label="姓名" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					  	<el-table-column  label="电话" show-overflow-tooltip >
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
			  </div>
		  </div>
		</el-dialog>
        <el-dialog title="详情" :visible.sync="batteryDetailShow" class="largeDialog" :close-on-click-modal="false" :before-close="handleClose">
            <div class="batteryDetailCon">
                <div class="titleFlexCon spaceBetween flex">
                    <div class="titleLeft">电表详细信息</div>
                    <div class="switchCon spaceBetween flex">
                        <div class="switchConText">开关电</div>
                        <div class="switchSelfCon spaceBetween flex">
                            <div class="offStyle">OFF</div>
                            <div class="switchMaster">
                                <input type="checkbox" v-model="detailForm.switchCheckValue" @change="switchChange(detailForm.switchCheckValue)">
                                <div class="switchColorfulCon" :class="{switchOn:switchOn,redBg:switchOn}"></div>
                            </div>
                            <div class="onStyle">ON</div>
                        </div>
                    </div>
                </div>
                <div class="spaceBetween flex">
                    <div class="borderStyle thirdOne spaceBetween flex"><div class="inputItemName">电表名称</div><input disabled="false" v-model="detailForm.ammeterName"></div>
                    <div class="borderStyle thirdOne spaceBetween flex"><div class="inputItemName">单价</div><input v-model="detailForm.ammeterPrice"></div>
                    <div class="borderStyle thirdOne spaceBetween flex paymentModel"><div class="inputItemName">付款模式</div>
                        <el-select v-model="detailForm.typeValue" placeholder="请选择">
                            <el-option
                              v-for="item in typeOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </div>
                </div>
                <div class="spaceBetween flex">
                    <div class="borderStyle halfCus spaceBetween flex"><div class="inputItemName">房源名称</div><input disabled="false" v-model="detailForm.houseName" ></div>
                    <div class="borderStyle halfCus spaceBetween flex"><div class="inputItemName">授权码</div><input disabled="false" v-model="detailForm.authCode"></div>
                </div>
                <div class="titleFlexConSpecial spaceBetween flex">
                    <div class="titleLeft secondTitle">电表信息</div>
                    <div></div>
                </div>
                <div class="spaceBetween flex">
                    <div class="borderStyle halfCus spaceBetween flex"><div class="inputItemName">剩余电量</div><input disabled="false" v-model="detailForm.remainingBattery" ></div>
                    <div class="borderStyle halfCus spaceBetween flex"><div class="inputItemName">更新时间</div><input disabled="false" v-model="detailForm.updateTime"></div>
                </div>
                <div class="spaceBetween flex">
                    <div class="borderStyle halfCus spaceBetween flex"><div class="inputItemName">当前度数</div><input disabled="false" v-model="detailForm.currentDegree" ></div>
                    <div class="borderStyle halfCus spaceBetween flex"><div class="inputItemName">当前电流</div><input disabled="false" v-model="detailForm.current"></div>
                </div>
                <div class="spaceBetween flex">
                    <div class="borderStyle halfCus spaceBetween flex"><div class="inputItemName">当前电压</div><input disabled="false" v-model="detailForm.currentVoltage" ></div>
                    <div class="borderStyle halfCus spaceBetween flex"><div class="inputItemName">当前功率</div><input disabled="false" v-model="detailForm.currentPower"></div>
                </div>
                <div class="chargeBtnContainer spaceBetween flex">
                    <RedBtn :text="'虚拟充值'" @click.native="popVirtualCharge"></RedBtn>
                    <el-popover
                        placement="top"
                        width="220"
                        trigger="manual"
                        v-model="qrcodeVisible">
                        <div class="shutIconCon"><i class="el-icon-circle-close" @click="shutIconDone"></i></div>
                        <img class="qrcode" :src="qrcodeSrc">
                        <RedBtn slot="reference" :text="'在线充值'" class="marLeft" @click.native="popOnlineCharge"></RedBtn>
                      </el-popover>
                </div>
            </div>
        </el-dialog>
		<el-dialog title="入住记录" :visible.sync="stayRecordsShow" class="largeDialog" :close-on-click-modal="false">
		  <div class="stayRecordsCon">
			  <div class="searchCon marBottom flex">
				  <div class="timerConCopy">
					  <el-date-picker
						prefix-icon="''"
						  v-model="time3"
						  type="daterange"
						  align="right"
						  unlink-panels
						  range-separator="至"
						  start-placeholder="开始日期"
						  end-placeholder="结束日期"
						  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				  <div>
					  <RedBtn :text="'查询'" @click.native="queryNow3('time3')"></RedBtn>
				  </div>
			  </div>
			  <div class="tableOuter3"> 
				  <el-table :data="tableData03"  tooltip-effect="dark"  style="width: 100%"   height="450"  stripe>					    
					  	<el-table-column  label="姓名" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					  	<el-table-column  label="电话" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					  	<el-table-column  label="入住时间" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="退房时间" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					  	<el-table-column  label="房间状态" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					  	<el-table-column  label="分摊" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="总电量" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
				  </el-table>
				  <div class="pagOuter">
						<el-pagination
						  @size-change="handleSizeChange3"
						  @current-change="handleCurrentChange3"
						  :current-page="current3"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="size3"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="total3">
						</el-pagination>
				</div>
			  </div>	
		  </div>
		</el-dialog>
    <el-dialog title="充值金额" :visible.sync="virtualChargeVisible" class="coverDiagCon" :close-on-click-modal="false">
            <el-form  label-width="70px">
				<div class="scrollContainer">
					<el-form-item label="金额">                     
                        <el-input v-model.trim="virtualChargeMoney" @change="virtualMoneyChange('virtualChargeMoney')"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon spaceBetween flex">
					<RedBtn :text="'确定'" @click.native="virtualConfirmCharge('virtualChargeMoney')"></RedBtn>
					<GreyBtn :text="'取消'" class="marLeft" @click.native="virtualCancelCharge('virtualChargeMoney')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
        <el-dialog title="充值金额" :visible.sync="onlineChargeVisible" class="coverDiagCon" :close-on-click-modal="false">
            <el-form  label-width="70px">
				<div class="scrollContainer">
					<el-form-item label="金额">                     
                        <el-input v-model.trim="onlineChargeMoney" @change="onlineMoneyChange('onlineChargeMoney')"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon spaceBetween flex">
					<RedBtn :text="'确定'" @click.native="onlineConfirmCharge('onlineChargeMoney')"></RedBtn>
					<GreyBtn :text="'取消'" class="marLeft" @click.native="onlineCancelCharge('onlineChargeMoney')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
  </div>
</template>
<script>
    import QRCode from 'qrcode'
    import { required, decimal, maxValue ,minValue } from 'vuelidate/lib/validators'
    import echarts from 'echarts';	
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
                qrcodeSrc:'',
                qrcodeVisible:false,
                onlineChargeMoney:'',
                virtualChargeMoney:'',                
                virtualChargeVisible:false,
                onlineChargeVisible:false,
                detailForm:{
                    ammeterPrice:'',
                    ammeterName:'',
                    typeValue:'',
                    houseName:'',
                    authCode:'',
                    remainingBattery:'',
                    updateTime:'',
                    currentDegree:'',
                    current:'',
                    currentVoltage:'',
                    currentPower:'',
                    switchCheckValue:''
                },                
                typeOptions:[
                    {
                      value: '预付费',
                      label: '预付'
                    },
                    {
                      value: '后付费',
                      label: '后付'
                    }
                ],
                houseChartPie:null,
				computed:'auto',
				time1:'',
				time2:'',
				time3:'',				
				tableData03:[
					{name:'me'},
					{name:'me'},
					{name:'me'}	
				],				
				current3:1,
				size3:10,
				total3:1,
				tableData02:[
					{name:'me'},
					{name:'me'},
					{name:'me'}	
				],				
				current2:1,
				size2:10,
				total2:1,
                batteryDetailShow:false,
				batteryAnalysisShow:false,
				batteryChargeShow:false,
				stayRecordsShow:false,
				showDelete:false,
				showSingleDelete:false,	
                searchMaster:{
                    houseName:'',
                    agreementNo:'',
                    CommunityName:'',
                    ableRent:'',
                    time:'',		
                    equipNo:'',	
                    payType:'',
                    unsualStatus:'',
                },
				storeMap:{
					time:'homeManageTime',
					ableRent:'homeManageAbleRent',
					agreementNo:'homeManageAgreementNo',
					CommunityName:'homeManageCommunityName',
					houseName:'homeManageHouseName',
					equipNo:'homeManageEquipNo',
                    payType:'homeManagePayType',
                    unsualStatus:'homeManageUnsualStatus'
				},
				storeArr:[					
					'time',
					'ableRent',
					'agreementNo',
					'CommunityName',
					'houseName',
					'equipNo',
                    'payType',
                    'unsualStatus',
				],
				storeArrMatchParam:[
					'ptime',
					'houseStatus',
					'contractNo',
					'communityName',
					'name',
					'pcode',
                    'model',
                    'rechargeStatus'
				],
				timeParams:{
					ptime:[
						'gmtCreateStart',
						'gmtCreateEnd',
					],
				},					
				current:1,
				total:0,
				size:10,
				tableData3:[
                ],
				tableData01:[
					{name:'me'},
					{name:'me'},
					{name:'me'},
                    {name:'me'}			
				],
				delAble:false,
				multipleSelection:[],
				current1:1,
				size1:10,
				total1:0,
                pickerOptions2:this.DatePick.range,
                switchOn:false,
                tableArr1:[],
			}
		},
        validations: {
            virtualChargeMoney:{
                required,
                decimal,
                minValue:minValue(0.01),
                maxValue:maxValue(100000),
            },
            onlineChargeMoney:{
                required,
                decimal,
                minValue:minValue(0.01),
                maxValue:maxValue(100000),
            }
        },
		mounted(){
			this.initSearch();
			this.initTable();  
            this.specialSetParam();
            this.initTableArr1();
		},
		watch:{
			'multipleSelection':function(nval,val){
				console.log(nval);
				if(nval.length){
				   this.delAble = true;
				}else{
				   this.delAble = false;
				}
			},
		},
		methods:{
            initTableArr1(){ 
                let obj = {};
                this.StateData.houseStatusArr.forEach(ele=>{
                    obj[ele.value] = ele.label;
                });
                this.tableArr1 = obj;  
            },
            specialSetParam(){
//                this.searchMaster.ableRent = '3';
//                this.StoreJs.set( this.storeMap.ableRent,'3' );
            },
            shutIconDone(){
                this.qrcodeVisible = false;
            },
            handleClose(done){
                this.qrcodeVisible = false;
                done();
            },
            virtualMoneyChange(str){   
                this.Digital.formatPrice.bind(this)(str);   
            },
            onlineMoneyChange(str){
                this.Digital.formatPrice.bind(this)(str);
            },
            onlineConfirmCharge(str){
                console.log(this[str]);
                this.$v.onlineChargeMoney.$touch();                
                console.log( this.$v.onlineChargeMoney.$error );
                if( this.$v.onlineChargeMoney.$error ){
                   this.$message.error('请检查输入金额,可用金额下限为0.01元，上限为100,000元。');
                }else{
                   this.onlineChargeVisible = false;                     
                    QRCode.toDataURL('https://qr.alipay.com/bax03566vxnfhlchfgs7404d',{                        
                        width:220,
                        margin:1
                    })
                      .then(url => {
                        console.log(url)
                        this.qrcodeSrc = url;
                        this.$nextTick(()=>{
                            this.qrcodeVisible = true; 
                        })   
                      })
                      .catch(err => {
                        console.error(err)
                      })
                }
            },
            onlineCancelCharge(str){
                this.onlineChargeVisible = false; 
            },
            initChart(){
                this.houseChartPie = echarts.init(document.getElementById('houseChartPie'));                
                this.setHouseChartPie();
                window.addEventListener('resize', ()=>{
					this.resizeEvent();
				});
            },
            virtualConfirmCharge(str){
                console.log(this[str]);
                this.$v.virtualChargeMoney.$touch();                
                console.log( this.$v.virtualChargeMoney.$error );
                if( this.$v.virtualChargeMoney.$error ){
                   this.$message.error('请检查输入金额,可用金额下限为0.01元，上限为100000元。');
                }else{
                   this.virtualChargeVisible = false; 
                }
            },
            virtualCancelCharge(str){
                this.virtualChargeVisible = false;                
            },
            popVirtualCharge(){
                this.virtualChargeVisible = true;
                this.virtualChargeMoney = '';
            },
            popOnlineCharge(){
                this.onlineChargeVisible = true;
                this.onlineChargeMoney = '';
                this.qrcodeVisible = false;
            },
            switchChange(val){
                console.log(val);  
                if(val){
                   this.switchOn = true;
                }else{
                   this.switchOn = false;
                }
            },
            setHouseChartPie(){
                let option = {
                     color: ['#fc6565'],
                     tooltip : {
                           trigger: 'axis',
                           axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                               type : 'line',       // 默认为直线，可选为：'line' | 'shadow'
                           },
                     },
                     xAxis : [
                          {
                             type : 'category',
                             data : [1,2,3,4,5,6,7,8,9,10],
                             axisTick: {
                                 alignWithLabel: true
                             },
                             axisLine:{
                                 lineStyle :{
                                    color:'#d5d9e6'
                                }
                            }
                          }
                      ],
                      yAxis : [
                         {
                           type : 'value',
                           axisLine:{
                                lineStyle :{
                                  color:'#d5d9e6',
                                  width : 0,
                                }
                            }
                         },
					],
				    series : [
                        {
                               name:'留存金额',
                               type:'bar',
                               barWidth: '20%',
                               data:['100','200','300','400','500','600','700','800','900','500'],
                               itemStyle:{
                                    barBorderRadius:[4, 4, 4, 4],
                               },
                               markPoint:{
                                    label:{
                                        color:'red'
                                    }
                               }
                           }
                     ]
				};			
				this.houseChartPie.setOption(option);
            },
            resizeEvent(){
                this.houseChartPie.resize();
            },
			initTable(){                
                this.Digital.tableWidthController.bind(this)(290,'computed'); 
			},            
            abstractUpload(str){
                var file = this.$refs[str].files[0]; 
				const excelReg = /(.(xls|xlsx))+$/i;
				if (excelReg.test(file.name) === false) {
					this.$message.error('请导入文件类型为excel格式的表格文件。');
					this.$refs[str].value="";
					return false;
				}else {
					const formData = new FormData();
					formData.append('file',file);
                    console.log( '文件选取正常。' );                    
                    return formData;
				}	
            },
			importManage(str){	
                console.log(str);
				let formData = this.abstractUpload(str);
                console.log( 'formData',formData );
			},			
			importPaymentMode(str){
				console.log(str);
				let formData = this.abstractUpload(str);
                console.log( 'formData',formData );
			},
			importChangePaymentMode(str){
                console.log(str);
				let formData = this.abstractUpload(str);
                console.log( 'formData',formData );
			},
			importElectricMeter(str){
				console.log(str);
				let formData = this.abstractUpload(str);
                console.log( 'formData',formData );
			},
			importElectricityPrice(str){
                console.log(str);
				let formData = this.abstractUpload(str);
                console.log( 'formData',formData );
			},
			importAuthorizedPrice(str){
                console.log(str);
				let formData = this.abstractUpload(str);
                console.log( 'formData',formData );
			},            
			handleSizeChange3(val){
				this.size3 = val;
                this.current3 = 1;
			},
			handleCurrentChange3(val){
                this.current3 = val;
			},
			queryNow3(str){
				console.log( str,this[str] );
			},
			handleSizeChange2(val){
				this.size2 = val;
                this.current2 = 1;
			},
			handleCurrentChange2(val){
                this.current2 = val;
			},
			queryNow2(str){
				console.log( str,this[str] );
			},
			handleSizeChange1(val){
				this.size1 = val;
                this.current1 = 1;
			},
			handleCurrentChange1(val){
                this.current1 = val;
			},
			queryNow1(str){
				console.log( str,this[str] );
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
            batteryDetail(row){
                this.batteryDetailShow = true;
                console.log( row );                
            },
			batteryAnalysis(row){
				console.log(row);
				this.batteryAnalysisShow = true;	
                this.$nextTick(()=>{
                    this.initChart();
                });
			},
			batteryCharge(row){
				console.log(row);
				this.batteryChargeShow = true;				
			},
			stayRecords(row){
				console.log(row);
				this.stayRecordsShow = true;
			},
			popDelete(row){
				console.log(row);
				this.showSingleDelete = true;
			},	
			quitSingleConfirm(){
				this.showSingleDelete = false;
				this.Success.deleteSuccess();
//				this.Err.netErr();
			},
			quitSingleCancel(){
				this.showSingleDelete = false;
			},
			quitConfirm(){
				this.showDelete = false;
				this.Success.deleteSuccess();
//				this.Err.netErr();
			},
			quitCancel(){
				this.showDelete = false;
			},
			delMultiple(){
				if(this.delAble){
					this.showDelete = true;
				}
			},
			editInfo(row){   
                let data = {
                    id:row.id
                };    
                let AES = this.AES.encrypt(data);
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/houseManage/detail',{
                    AES
                });                  
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
                this.current = 1;
                this.size = val;
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
                data.current = this.current;
                data.size = this.size;
//				console.log(data);	
                this.ApiLists[10009](data).then(res=>{
                    let { data:layer1 } = res;
                    let { message,success,data }=layer1;
                    if( success ){
                        this.tableData3 = data.records;      
                        this.total = data.total;
                        this.loading = false;
                    }else{
                       this.$message.error(message);
                    }  
                }).catch(err=>{
                    console.log(err); 
                }); 
                
                
			},
			queryNow(){	
                this.initSearch();
			},
			reset(){	
                this.Digital.reset.bind(this)(); 
                this.specialSetParam();
				this.runSearch({});
                console.log( this.searchMaster );
			},
		},
    }
</script>
<style scoped lang="scss">
    .shutIconCon {
        text-align: right;
        font-size: 26px;
        height: 30px;
        color: $mainRed;
        i {
            cursor: pointer;
            &:hover {
                color: #ce2f2f;
            }
        }
    }
    .qrcode {
        width: 220px;
    }
    .marLeft {
        margin-left: 20px;
    }
    .chargeBtnContainer {
        justify-content: flex-end !important;
        margin-top: 50px;
        position: relative;
    }
    .secondTitle {
        margin-top: 20px;
    }
    .inputItemName {
        color: #afb5c4;
    }
    .thirdOne {
        width: 334px;
        input {
            height: 46px;
            border: none;
            width: 70%;
        }
    }
    .halfCus {
        width: 516px;
        margin-top: 20px;
        input {
            height: 46px;
            border: none;
            width: 82%;
        }
    }
    .borderStyle {
        border: 2px solid #efeef3;
        height: 50px;
        box-sizing: border-box;
        padding-left: 24px;
        padding-right: 24px;
        line-height: 46px;
    }
    .offStyle {
        margin-right: 20px;
        margin-left: 20px;
        color: #cfd3e2 !important;
    }
    .onStyle {
        margin-left: 20px;
        color: #cfd3e2 !important;
    }
    .redBg {
        background-color: $mainRed !important;
    }
    .switchOn {
        &:before {
            left:42px !important;
        }
    }
    .switchMaster {
        position: relative;        
        .switchColorfulCon {            
            height: 30px;
            width: 70px;
            background-color: #cfd3e2;
            border-radius: 15px;
            position: relative;            
            &:before {
                content: "";
                height: 26px;
                width: 26px;
                border-radius: 13px;
                background-color: #fff;
                position: absolute;
                left: 2px;
                top: 2px;
                transition-duration: 0.2s;
                transition-property: left;
                transition-timing-function: ease-in-out;
            }
        }
        input {
            cursor: pointer;
            position: absolute;
            left: 0;
            top: 0;
            height: 30px;
            width: 70px;
            opacity: 0;
            z-index: 2;
        }
    }
    .spaceBetween {
        justify-content: space-between;
        flex-wrap: nowrap;    
    }
    .switchCon {       
        font-size: 14px;
        .switchConText {
            color: #afb5c4;            
        }
        .switchSelfCon {
        }
    }
    .titleFlexCon {        
        color: #a4aabc;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
    }    
    .titleFlexConSpecial {
        color: #a4aabc;
        font-size: 16px;
        font-weight: 600;
    }
	.batteryAnalysisCon {
		background-color: $bgGrey;
		box-sizing: border-box;
		padding: 20px;
		.timerConCopy {
			margin-left: 0 !important;
		}
		.tableOuter1 {
			background-color: #fff; 
		}
	}
    .batteryDetailCon {
		box-sizing: border-box;
		padding: 20px;
    }
	.batteryChargeCon {
		background-color: $bgGrey;
		box-sizing: border-box;
		padding: 20px;
		.timerConCopy {
			margin-left: 0 !important;
		}
		.tableOuter2 {
			background-color: #fff; 
		}
	}
	.stayRecordsCon {
		background-color: $bgGrey;
		box-sizing: border-box;
		padding: 24px;
		.timerConCopy {
			margin-left: 0 !important;
		}
		.tableOuter3 {
			background-color: #fff; 
		}
	}
	.houseManageContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.searchCon {
			flex-wrap:wrap;
			justify-content:flex-start;
		}
		.operate {
			height: 30px;
			background-color: $specialBgRed;
			color: $mainRed;
			line-height: 30px;
			border-radius: 15px;
			cursor: pointer;
		}
		.tableTop {
			height: 40px;
			flex-wrap: nowrap;
			justify-content: space-between;
			margin-bottom: 20px;
			.tableTopLeft {
				flex-wrap: nowrap;
				justify-content:flex-start;
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
					padding-left: 20px;
					padding-right: 20px;
					margin-right: 20px;
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
			.tableTopRight {
				height: 30px;
				width: 30px;
				background-color: $mainRed;
				border-radius: 15px;
				line-height: 30px;
				text-align: center;
				color: #fff;
				box-shadow: $redShadow;
			}
		}
		.tableOuter {
			height: 730px;
			background-color: #fff;
			border-radius: 10px;
			padding: 14px;
			box-sizing: border-box;
		}
		.pagOuter {
			text-align: right;
			padding-top: 10px;
			box-sizing: border-box;
		}
		.sameWidth {
			width: 170px;            
		}
        .marBottom {
            margin-bottom: 20px;
        }
        .marRight {
            margin-right: 20px;
        }
		.timerConCopy {
			margin-left: 20px;
			width: 280px;
			margin-right: 20px;
		}
		.btnCon {
			width: 200px;
			flex-wrap: nowrap;
			justify-content: space-between;
		}
		.btnsame {
			width: 90px;
			height: 40px;
			border-radius: 20px;
			text-align: center;
			line-height: 40px;
			box-sizing: border-box;
			margin-left: 20px;
			font-size: 13px;
			cursor: pointer;
		}
		.queryNow {
			background-color: $mainRed;
			color: #fff;
			margin-left: 0 !important;
			box-shadow: $redShadow;
		}
		.reset {
			background-color: #fff;
			box-shadow: $greyShadow;
			color: $tableHeadBg;
		}   
        .diagBtnCon {
            margin-top: 30px;
            margin-bottom: 30px;
            justify-content: flex-end !important;
        }
	}
</style>
<style lang="scss">
	.houseManageContainer {     
        .largeDialog{
            .el-dialog__body {
                height: 600px;
                overflow-y: scroll;
            }
        } 
        .coverDiagCon .el-dialog{
			height: 250px !important;
            width: 540px !important;
			.scrollContainer {
				height: 70px !important;
			}
		}
        .paymentModel input {
            text-align: right;
        }
        .thirdOne {
            .el-input__inner {
                border: none !important;
            }
        }  
        .searchCon  {
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
<template>
  <div class="remindListContainer">  
	  <div class="searchCon flex">	
          <div class="sameWidth marBottom marRight">
              <el-input  placeholder="输入关键词" v-model.trim="searchMaster.keyWord"clearable @change="inputChange(searchMaster.keyWord,'searchMaster','keyWord')" ></el-input>
          </div>
          <div class="sameWidth marBottom marRight">
              <el-popover
                  placement="bottom"
                  width="280"
                  trigger="click" v-model="dateTableVisible">
                  <div>
                      <div class="cusDateTitle">选择日期</div>
                    <table class="cusDatePicker"> 
                      <tr v-for=" (val,index) in dateTable" :key="index">
                          <td  v-for=" (subVal,subIndex) in dateTable[index]" :key="subIndex" @click="dateTableClick(subVal.date,'searchMaster','expiryDateFir')"><div class="dateSolo" :class="{dateTableActive:dateTableActiveIndex == subVal.date ? true : false}" >{{subVal.date}}</div></td>
                        </tr>
                    </table>  
                  </div>
                  <el-input  placeholder="输入合同到期日期" v-model.trim="searchMaster.expiryDateFir"clearable
                             @input="preventImmediately('searchMaster','expiryDateFir')" @focus="dateTableFocus"  slot="reference" ref="cusDatePicker"></el-input>
                </el-popover>
          </div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.settleStatus" placeholder="是否结清" @change="inputChange(searchMaster.settleStatus,'searchMaster','settleStatus')">			
				  <el-option label="是" value="1"></el-option>
				  <el-option label="否" value="0"></el-option>				
				</el-select>
			</div>
          <div class="spWidth  marBottom marRight">
              <el-select
                v-model="searchMaster.departmentMaster"
                multiple
                @change="inputChange(searchMaster.departmentMaster,'searchMaster','departmentMaster')"         
                collapse-tags                
                placeholder="部门（全部）">
                <el-option
                  v-for="(item,index) in departmentMasterArr"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.defaultType" placeholder="违约单类型" @change="inputChange(searchMaster.defaultType,'searchMaster','defaultType')">	
				  <el-option label="到期" value="EXPIRE"></el-option>	                  
                  <el-option label="公司违约" value="COMPANY_DEFAULT"></el-option>
				  <el-option label="租客违约" value="TENANT_BREACH"></el-option>	
                  <el-option label="换房违约" value="EXCHANGE_HOUSES_BREACH"></el-option>
				  <el-option label="转租违约" value="SUBLET_BREACH"></el-option>	
                  <el-option label="房租催款" value="PRESS_FOR_MONEY"></el-option> 
				</el-select>
			</div>
          <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.planStatus" placeholder="账单计划状态" @change="inputChange(searchMaster.planStatus,'searchMaster','planStatus')">	
				  <el-option label="待支付" value="WAITING_PAY"></el-option>	                  
                  <el-option label="催款中" value="DUNNING"></el-option>
				  <el-option label="支付中" value="PAYING"></el-option>	
                  <el-option label="支付成功" value="PAY_SUCCESS"></el-option>
				  <el-option label="违约" value="BREACH"></el-option>	
				</el-select>
			</div>
          <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.defaultStatus" placeholder="违约单状态" @change="inputChange(searchMaster.defaultStatus,'searchMaster','defaultStatus')">	
				  <el-option label="待处理" value="PENDING"></el-option>	                  
                  <el-option label="待审核" value="AUDIT"></el-option>
				  <el-option label="完成" value="SUCCESS"></el-option>
				</el-select>
			</div>
		  <div class="sameWidth  marBottom marRight">
			  <el-select v-model.trim="searchMaster.receiptDate" placeholder="收款日" @change="inputChange(searchMaster.receiptDate,'searchMaster','receiptDate')">			
				  <el-option label="收款日（全部）" value="true"></el-option>
                  <el-option label="收款日（3）" value="3"></el-option>
                  <el-option label="收款日（13）" value="13"></el-option>
                  <el-option label="收款日（23）" value="23"></el-option>
				</el-select>
			</div>
          <div class="marRight marBottom marRight">
			  <el-date-picker
					prefix-icon="''" 		  
				  v-model.trim="searchMaster.monthValue"
				  type="month"
				  placeholder="选择月份"
				  @change="inputChange(searchMaster.monthValue,'searchMaster','monthValue')"
					value-format="timestamp">
				</el-date-picker>
			</div>
          <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.newTime" type="daterange"
						@change="inputChange(searchMaster.newTime,'searchMaster','newTime')" align="right" unlink-panels range-separator="至"
				  start-placeholder="违约单新增开始日期"
				  end-placeholder="违约单新增结束日期"
				  :picker-options="pickerOptions2"  value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
          <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.finishTime" type="daterange"
						@change="inputChange(searchMaster.finishTime,'searchMaster','finishTime')"	  align="right" unlink-panels range-separator="至"
				  start-placeholder="违约单办结开始日期"
				  end-placeholder="违约单办结结束日期"
				  :picker-options="pickerOptions2"  value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
          <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.rentTime" type="daterange"
						@change="inputChange(searchMaster.rentTime,'searchMaster','rentTime')"	  align="right" unlink-panels range-separator="至"
				  start-placeholder="起租开始日期"
				  end-placeholder="起租结束日期"
				  :picker-options="pickerOptions2"  value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
          <div class="timerCon marBottom marRight">
			  <el-date-picker prefix-icon="''"  v-model="searchMaster.expireTimeSec" type="daterange"
						@change="inputChange(searchMaster.expireTimeSec,'searchMaster','expireTimeSec')"	  align="right" unlink-panels range-separator="至"
				  start-placeholder="到期开始日期"
				  end-placeholder="到期结束日期"
				  :picker-options="pickerOptions2"  value-format="yyyy-MM-dd">
				</el-date-picker>
			</div>
          <div class="sameWidth marBottom marRight">
              <el-input  placeholder="输入小区名" v-model.trim="searchMaster.communityName"clearable @change="inputChange(searchMaster.communityName,'searchMaster','communityName')" ></el-input>
          </div>
          <div class="sameWidth marBottom marRight">
              <el-input  placeholder="输入房源名" v-model.trim="searchMaster.houseName"clearable @change="inputChange(searchMaster.houseName,'searchMaster','houseName')" ></el-input>
          </div>
		  <div class="btnCon marBottom flex">			  
			  <el-dropdown @command="handleCommand">
				<RedBtn :text="'操作'" class="dropCus" showArrow></RedBtn>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="a">查询</el-dropdown-item>					
					<a :href="excelHref" :download="excelDownload"><el-dropdown-item command="b">应收催款下载</el-dropdown-item></a>	
				</el-dropdown-menu>
			</el-dropdown>
			<GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>
		</div>
	   <div class="tableOuter">		   
		   <div class="tableTop flex">
			   <div  class="lightLeft" @click="withdrawalClick">
				   <i class="icon-ticheng- iconfont"></i>
				   <span>&nbsp;收款提成</span>
				</div>
			   <el-tooltip content="多选删除" placement="bottom" effect="light">
				  <div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete">
					  <i class="icon-shanchu- iconfont"></i>
					</div>
				</el-tooltip>
			</div>
		  <div class="tableContent" :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				  <el-table-column  label="序号"   type="index"> </el-table-column>
				<el-table-column  label="合同" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="地址" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="租客姓名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="租客号码" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="应收金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				<el-table-column  label="收款日期" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="实收金额" show-overflow-tooltip>
					  <template slot-scope="scope"><span>{{ scope.row.name | emptyProcessor  }}</span></template>
					</el-table-column>
				<el-table-column  label="未收金额" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="收房责任人" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="房源备注" show-overflow-tooltip>
					  <template slot-scope="scope">
						<el-popover	placement="bottom"	trigger="hover">
							<div class="popperInner popperEdit" @click="edit1(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>								
							<div  class="operate" slot="reference">{{ scope.row.name | emptyProcessor  }}</div>
						</el-popover>						
					</template>
					</el-table-column>
				<el-table-column  label="违约单类型" show-overflow-tooltip min-width="100">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
					</el-table-column>
				<el-table-column  label="违约单创建时间" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="违约单结束时间" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="违约专员" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
				<el-table-column  label="联系内容" show-overflow-tooltip>
					  <template slot-scope="scope">
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="edit3(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>								
								<div  class="operate" slot="reference">{{ scope.row.name | emptyProcessor  }}</div>
							</el-popover>	
						</template>
					</el-table-column>
					<el-table-column  label="账单月份" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
					<el-table-column  label="合同开始时间" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
					<el-table-column  label="合同到期时间" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
                    <el-table-column  label="催款客服" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
                    <el-table-column  label="收款备注" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
                    <el-table-column  label="累计已收金额" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
                    <el-table-column  label="累计未收金额" show-overflow-tooltip min-width="120">
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
                    <el-table-column  label="状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
					</el-table-column>
                    <el-table-column  label="操作" show-overflow-tooltip>
					  <template slot-scope="scope">
                        <el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="checkDetail(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 查看详情</span>  </div>	
                            <div class="popperInner popperSpecial" @click="popNewBreach(scope.row)"><i class="iconfont icon-tianjia-"></i> <span> 新建违约单</span>  </div>	
								<div  class="operate" slot="reference">{{ scope.row.name | emptyProcessor }}</div>
							</el-popover>	
                        </template>
					</el-table-column>
				</el-table>
                <div class="amountSummary flex">
                    <div class="amountSub"><span class="amountTitle">实时总金额：</span><span class="amountValue">￥{{firstAmount | formatMoneyValue}}</span></div>
                    <div class="amountSub"><span class="amountTitle">未收总金额：</span><span class="amountValue">￥{{secondAmount | formatMoneyValue}}</span></div>
                    <div class="amountSub"><span class="amountTitle">应收总金额：</span><span class="amountValue">￥{{thirdAmount | formatMoneyValue}}</span></div>
                </div>
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
		<Del v-if="showDelete2"  :delCon="quitConfirm2" :delCancel="quitCancel2"></Del>
	</transition>
	<transition name="popDel">	
		<Del v-if="showSingleDelete"  :delCon="quitSingleConfirm" :delCancel="quitSingleCancel"></Del>
	</transition>
	<el-dialog title="编辑" :visible.sync="editVisible1" class="diagCon editDiagCon" :close-on-click-modal="false">		
    	<el-input type="textarea" v-model.trim="textarea1" rows="11" :resize="'none'" class="paddingInput"></el-input>
		<div class="diagBtnCon flex">
			<RedBtn :text="'保存'" @click.native="saveEdit1"></RedBtn>
			<GreyBtn class="marLeft" @click.native="cancelEdit1"></GreyBtn>
		</div>
	</el-dialog>	
	<el-dialog title="编辑" :visible.sync="editVisible3" class="diagCon editDiagCon" :close-on-click-modal="false">
		<el-input type="textarea" v-model.trim="textarea3" rows="11" :resize="'none'" class="paddingInput"></el-input>
		<div class="diagBtnCon flex">
			<RedBtn :text="'保存'" @click.native="saveEdit3"></RedBtn>
			<GreyBtn class="marLeft" @click.native="cancelEdit3"></GreyBtn>
		</div>
	</el-dialog>
	<el-dialog title="编辑" :visible.sync="withdrawShow" class="largeDialog" :close-on-click-modal="false">	
		<div class="greyBgCon">		
			<div class="searchCon flex">
				<div class="sameWidth marBottom marRight">
				  <el-select  placeholder="是否结清" v-model.trim="statementStatus">			
					  <el-option label="是否结清（全部）" value=""></el-option>
					  <el-option label="可出租" value="1"></el-option>
					  <el-option label="不可出租" value="0"></el-option>
					</el-select>
				</div>
			  <div class="marBottom marRight">
				  <el-date-picker
					prefix-icon="''"
					  v-model.trim="timeSp"
					  type="daterange"
					  align="right"
					  unlink-panels
					  range-separator="至"
					  start-placeholder="开始日期"
					  end-placeholder="结束日期"
					  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
					</el-date-picker>
				</div>	
			  <div class="btnCon marBottom flex">			  
				  <RedBtn :text="'查询'" @click.native="queryNowSp"></RedBtn>
				  <GreyBtn :text="'重置'" class="marLeft" @click.native="resetSp"></GreyBtn>
			  </div>
			</div>
			<div class="tableOuterSp">
				<div class="tableContent">
					<el-table :data="tableData4"  tooltip-effect="dark"  style="width: 100%"   height="440"  stripe>
						<el-table-column  label="地区" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="应催收" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="已催收" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="违约单数量" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="催款率" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="无效单子" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="催收>=65%的单子" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					</el-table>
					<div class="pagOuter">
						<el-pagination
						  @size-change="handleSizeSpChange"
						  @current-change="handleCurrentSpChange"
						  :current-page="currentSp"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="sizeSp"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="totalSp">
						</el-pagination>
				</div>
				</div>
			</div>		
		</div>
	</el-dialog>
    <el-dialog title="列表" :visible.sync="detailShow" class="largeDialog" :close-on-click-modal="false">
		  <div class="batteryAnalysisCon">
			  <div class="searchConList flex">
                      <el-tooltip content="添加账单" placement="bottom" effect="light">
                       <div class="tableTopRight addBg" @click="addBill">
                           <i class="icon-tianjia- iconfont" ></i>
                        </div>
                    </el-tooltip>
                      <el-tooltip content="多选删除" placement="bottom" effect="light">
                      <div class="tableTopRightSp  delDisable" :class="{delAble:delAble2}" @click="popMultipleDelete2">
                          <i class="icon-shanchu- iconfont"></i>
                        </div>
                    </el-tooltip>
			  </div>
			  <div class="tableOuter1"> 
				  <el-table :data="tableData01"  tooltip-effect="dark"  style="width: 100%"   height="470"  stripe @selection-change="handleSelectionChange2">
                        <el-table-column  type="selection"></el-table-column>
					    <el-table-column  label="序号" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
						<el-table-column  label="合同号" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
					  	<el-table-column  label="房东/租客姓名" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="受益人姓名" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="金额" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="抵扣后金额" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="已支付金额" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="类型" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="状态" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="账单月份" show-overflow-tooltip >
						  <template slot-scope="scope">
                            <el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editTime(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 修改</span>  </div>								
								<div  class="operate" slot="reference">{{ scope.row.name }}</div>
							</el-popover>	
                          </template>
						</el-table-column>
                      <el-table-column  label="创建时间" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="收款时间" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="抵扣备注" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
						</el-table-column>
                      <el-table-column  label="收款备注" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="审核" show-overflow-tooltip >
						  <template slot-scope="scope">{{ scope.row.name }}</template>
						</el-table-column>
                      <el-table-column  label="操作" show-overflow-tooltip >
						  <template slot-scope="scope">
                            <el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="confirmReceipt(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 确认收款</span>  </div>								
								<div  class="operate" slot="reference">{{ scope.row.name }}</div>
							</el-popover>
                          </template>
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
    <el-dialog title="修改时间" :visible.sync="editDateVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
        <div class="scrollContainer">
            <el-date-picker
                v-model="billDate"
                align="right"
                type="date"
                value-format="yyyy-MM-dd"            
                placeholder="选择日期"
                :picker-options="pickerOptions1">
            </el-date-picker>
		</div>
		<div class="diagBtnCon flex">
			<RedBtn :text="'确定'" @click.native="confirmEditTime"></RedBtn>
			<GreyBtn class="marLeft" @click.native="cancelEditTime"></GreyBtn>
		</div>	
	</el-dialog>
    	<el-dialog title="信息" :visible.sync="receiptVisible" class="diagCon editDiagCon receiptCon" :close-on-click-modal="false">
			<el-form :model="receiptForm" ref="receiptForm" label-width="100px">
				<div class="scrollContainer triggerContainer">
					<el-form-item label="金额">
						<el-input v-model.trim="receiptForm.money"></el-input>
					  </el-form-item>
					<el-form-item label="支付方式">
                        <el-select v-model.trim="receiptForm.paymentMethod" placeholder="请选择活动区域">
							<el-option label="农行" value="NONGHANG"></el-option>
							<el-option label="苏州泰隆" value="SZTAILONG"></el-option>
                            <el-option label="苏州泰隆POS" value="SZTAILONGPOS"></el-option>
							<el-option label="苏州民生" value="SZMINSHENG"></el-option>
                            <el-option label="违约单" value="BREACH"></el-option>
							<el-option label="代金券" value="CASH_COUPON"></el-option>
                            <el-option label="维修费" value="MAINTENANCE_COST"></el-option>
						  </el-select>
					  </el-form-item>
					 <el-form-item label="收款时间">
						  <el-date-picker
                            v-model="receiptForm.collectionTime"
                            align="right"
                            type="date"
                            value-format="yyyy-MM-dd"            
                            placeholder="选择日期"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
						</el-form-item>
					<el-form-item label="备注">
						<el-input :resize="'none'" type="textarea"  :rows="2" v-model.trim="receiptForm.remarks"></el-input>
					  </el-form-item>	
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="confirmChangeReceipt('receiptForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelChangeReceipt('receiptForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
        <el-dialog title="添加账单" :visible.sync="addBillVisible" class="addBillCon" :close-on-click-modal="false">
			<el-form :model="addBillForm" ref="addBillForm" label-width="100px">
				<div class="scrollContainer triggerContainer">
					<el-form-item label="合同号">
						<el-input v-model.trim="addBillForm.agreementNo"></el-input>
					  </el-form-item>
			         <el-form-item label="类型">
                       <el-select v-model.trim="addBillForm.type" placeholder="请选择">
						   <el-option
							v-for="item in feeArrOption1"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					  </el-form-item>
					 <el-form-item label="应付款时间">
						  <el-date-picker
                            v-model="addBillForm.normalTime"
                            align="right"
                            type="date"
                            value-format="yyyy-MM-dd"            
                            placeholder="选择日期"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
				    </el-form-item>
					<el-form-item label="金额">
						<el-input v-model.trim="addBillForm.money"></el-input>
					  </el-form-item>	
                    <el-form-item label="备注">
						<el-input :resize="'none'" type="textarea"  :rows="2"  v-model.trim="addBillForm.remarks"></el-input>
					  </el-form-item>	
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="confirmAddBill('addBillForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAddBill('addBillForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
        <el-dialog title="新建违约单" :visible.sync="newBreachVisible" class="diagCon addDiagCon" :close-on-click-modal="false">		
            <el-form :model="breachSingleItem" :rules="breachSingleRules" ref="breachSingleItem" label-width="100px">
                    <div class="specialScrollContainer">
                        <el-form-item label="违约合同号" prop="agreementNo">
                            <el-input v-model.trim="breachSingleItem.agreementNo"></el-input>
                          </el-form-item>
                    </div>
                    <div class="diagBtnCon flex">
                        <RedBtn :text="'确定'" @click.native="confirmNewBreach('breachSingleItem')"></RedBtn>
                        <GreyBtn class="marLeft" @click.native="cancelNewBreach('breachSingleItem')"></GreyBtn>
                    </div>
                </el-form>		
        </el-dialog>
    <el-dialog title="新建违约单" :visible.sync="breachDetailVisible" class="breachDetailCon " :close-on-click-modal="false">
        <el-form :model="breachDetailForm" :rules="breachDetailRules" ref="breachDetailForm" label-width="140px">
            <div class="scrollContainer">
                <el-form-item label="合同号">
                    <el-input v-model.trim="breachDetailForm.agreementNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="业务员">
                    <el-input v-model.trim="breachDetailForm.salesman" disabled></el-input>
                </el-form-item>
                <el-form-item label="小区名称">
                    <el-input v-model.trim="breachDetailForm.communityName" disabled></el-input>
                </el-form-item>
                <el-form-item label="租客姓名">
                    <el-input v-model.trim="breachDetailForm.tenantName" disabled></el-input>
                </el-form-item>
                <el-form-item label="租客电话">
                    <el-input v-model.trim="breachDetailForm.tenantPhone" disabled></el-input>
                </el-form-item>
                <el-form-item label="房屋地址">
                    <el-input v-model.trim="breachDetailForm.address" disabled></el-input>
                </el-form-item>
                <el-form-item label="合同开始时间">
                    <el-input v-model.trim="breachDetailForm.agreementEffective" disabled></el-input>
                </el-form-item>
                <el-form-item label="合同结束时间">
                    <el-input v-model.trim="breachDetailForm.agreementInvalid" disabled></el-input>
                </el-form-item>
                <el-form-item label="房租">
                    <el-input v-model.trim="breachDetailForm.rentFee" disabled></el-input>
                </el-form-item>
                <el-form-item label="电户号">
                    <el-input v-model.trim="breachDetailForm.electricityNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="押付信息">
                    <el-input v-model.trim="breachDetailForm.mortgageInfo" disabled></el-input>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-input v-model.trim="breachDetailForm.paymentMethod" disabled></el-input>
                </el-form-item>
                <el-form-item label="到期房屋回收时间">
                    <el-input v-model.trim="breachDetailForm.timeOfRecycling" disabled></el-input>
                </el-form-item>
                <el-form-item label="房租付至日">
                    <el-input v-model.trim="breachDetailForm.deadline" disabled></el-input>
                </el-form-item>
                <el-form-item label="违约专员">
                    <el-select v-model.trim="breachDetailForm.defaultCommissioner" placeholder="请选择">
				        <el-option label="吴玉丰" value="115"></el-option>                        
                        <el-option label="韩江南" value="6701"></el-option>
                        <el-option label="胡宇斌" value="107"></el-option>                        
                        <el-option label="桑博豪" value="24156"></el-option>
                        <el-option label="陈任鹏" value="82"></el-option>
                        <el-option label="张明阳" value="100"></el-option>
                        <el-option label="王佳男" value="6700"></el-option>
                        <el-option label="韩军" value="84"></el-option>
                        <el-option label="吴坤" value="16918"></el-option>
                        <el-option label="杨恒" value="6702"></el-option>
                        <el-option label="季暄朝" value="23660"></el-option>
                        <el-option label="赵平" value="26163"></el-option>
                        <el-option label="范伟平" value="23320"></el-option>
                        <el-option label="张凯威" value="16507"></el-option>
                        <el-option label="吴朋朋" value="24913"></el-option>
                        <el-option label="卢杰" value="16916"></el-option>
                        <el-option label="严阿强" value="26593"></el-option>
                        <el-option label="孙科定" value="86"></el-option>
                        <el-option label="盛学申" value="6837"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="违约类型">                    
                    <el-select v-model.trim="breachDetailForm.defaultType" placeholder="请选择">
						<el-option label="催款" value="PRESS_FOR_MONEY"></el-option>
                        <el-option label="到期" value="EXPIRE"></el-option>
                        <el-option label="公司违约" value="COMPANY_DEFAULT"></el-option>
                        <el-option label="房东违约" value="LANDLORD_BREACH"></el-option>
                        <el-option label="租客违约" value="TENANT_BREACH"></el-option>
                        <el-option label="转租违约" value="SUBLET_BREACH"></el-option>
                        <el-option label="换房违约" value="EXCHANGE_HOUSES_BREACH"></el-option>
                        <el-option label="其他费用催收" value="OTHER_COLLECTION"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注说明">
                    <el-input v-model.trim="breachDetailForm.remark" :resize="'none'" type="textarea"  :rows="3"></el-input>
                </el-form-item>
            </div>
            <div class="diagBtnCon flex">
                <RedBtn :text="'确定'" @click.native="confirmbreachDetail('breachDetailForm')"></RedBtn>
                <GreyBtn class="marLeft" @click.native="cancelbreachDetail('breachDetailForm')"></GreyBtn>
            </div>            
        </el-form>
    </el-dialog>
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
            'multipleSelection2':function(nval,val){
				if(nval.length){
                    this.delAble2 = true;
				}else{
                    this.delAble2 = false;
				}
			},
		},
        data(){
			return {
                loading:true,
				feeArrOption1:[],
                firstAmount:12312312.23,
                secondAmount:122312.23,
                thirdAmount:1232.23,
                breachDetailForm:{
                },
                breachDetailRules:{
                },
                breachDetailVisible:false,
                breachSingleItem:{
                    agreementNo:'',
                },
                breachSingleRules:{
                    agreementNo:[
                        {  required: true, message: '请输入合同号。', trigger: 'blur' },
                        { pattern: /^[a-zA-Z0-9]+$/, message: '请输入正确格式', trigger: 'blur' },
                    ]
                },
                newBreachVisible:false,
                showDelete2:false,
                receiptForm:{
                    money:'',
                    paymentMethod:'',
                    collectionTime:'',
                    remarks:'',
                },
                addBillForm:{
                },
                addBillVisible:false,
                receiptVisible:false,
                billDate:'',
                editDateVisible:false,
                detailShow:false,
                tableData01:[{ name:'me' }],
                dateTableVisible:false,
                dateTable:[
                    [   { date:1 },{ date:2 },{ date:3 },{ date:4 },{ date:5 },{ date:6 },{ date:7 }    ],
                    [   { date:8 },{ date:9 },{ date:10 },{ date:11 },{ date:12 },{ date:13 },{ date:14 }    ],
                    [   { date:15 },{ date:16 },{ date:17 },{ date:18 },{ date:19 },{ date:20 },{ date:21 }    ],
                    [   { date:22 },{ date:23 },{ date:24 },{ date:25 },{ date:26 },{ date:27 },{ date:28 }    ],
                    [   { date:29 },{ date:30 },{ date:31 }    ],
                ],                    
                dateTableActiveIndex:'',
				excelHref:'',
				excelDownload:'',
				currentSp:1,
				sizeSp:10,
				totalSp:0,
				tableData4:[
					{name:'meeeee'},
					{name:'meeeee'}		
				],
				statementStatus:'',
				withdrawShow:false,
				textarea1:'',
				textarea2:'',
				textarea3:'',
				editVisible1:false,
				editVisible3:false,
				computed:'auto',
				delAble:false,	
                delAble2:false,
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
                multipleSelection2:[],
				current:1,
				size:10,
				total:0,
				pickerOptions2: this.DatePick.range, 
                pickerOptions1: this.DatePick.date, 
				tableData3:[
//					{name:'me'}
				],	                
                searchMaster:{
                    keyWord:'',
                    settleStatus:'',
                    departmentMaster:'',
                    expiryDateFir:'',
                    defaultType:'',
                    planStatus:'',
                    defaultStatus:'',
                    receiptDate:'',
                    monthValue:'',
                    newTime:'',
                    finishTime:'',
                    rentTime:'',
                    expireTimeSec:'',
                    communityName:'',
                    houseName:'',
                },                
				timeSp:'',                
                departmentMasterArr:[                    
                    {
                      value: '1',
                      label: '宁波一部(沈旭静)'
                    },
                    {
                      value: '2',
                      label: '宁波二部(钟丽丽)'
                    },
                    {
                      value: '3',
                      label: '宁波三部(景佳艳)'
                    },
                    {
                      value: '4',
                      label: '杭州一部(景佳艳)'
                    },
                    {
                      value: '5',
                      label: '杭州二部(沈旭静)'
                    },
                    {
                      value: '6',
                      label: '杭州三部(景佳艳)'
                    },
                    {
                      value: '7',
                      label: '苏州一部(钟丽丽)'
                    },
                    {
                      value: '8',
                      label: '上海一部(景佳艳)'
                    },
                ],
                current1:1,
                size1:10,
                total1:0,                  
				storeMap:{
                    keyWord:'remListKeyWord',
                    settleStatus:'remListSettleStatus',
                    departmentMaster:'remListDepartmentMaster',
                    expiryDateFir:'remListExpiryDateFir',
                    defaultType:'remListDefaultType',
                    planStatus:'remListPlanStatus',
                    defaultStatus:'remListDefaultStatus',
                    receiptDate:'remListReceiptDate',
                    monthValue:'remListMonthValue',
                    newTime:'remListNewTime',
                    finishTime:'remListFinishTime',
                    rentTime:'remListRentTime',
                    expireTimeSec:'remListExpireTimeSec',
                    communityName:'remListCommunityName',
                    houseName:'remListHouseName',
				},
				storeArr:[	
                    'newTime',
                    'finishTime',
                    'rentTime',
                    'expireTimeSec',               
                    'keyWord',
                    'settleStatus',
                    'departmentMaster',
                    'expiryDateFir',
                    'defaultType',
                    'planStatus',
                    'defaultStatus',
                    'receiptDate',
                    'monthValue',
                    'communityName',
                    'houseName',                    
				],
				storeArrMatchParam:[
                    'ptime1',
                    'ptime2',
                    'ptime3',
                    'ptime4',                           
                    'pkeyWord',
                    'psettleStatus',
                    'pdepartmentMaster',
                    'pexpiryDateFir',
                    'pdefaultType',
                    'planStatus',
                    'pdefaultStatus',
                    'preceiptDate',
                    'pmonthValue',
                    'pcommunityName',
                    'phouseName',    
				],
				timeParams:{					
                    ptime1:[
						'ptime1part1',
						'ptime1part2',
					],
                    ptime2:[
						'ptime2part1',
						'ptime2part2',
					],
                    ptime3:[
						'ptime3part1',
						'ptime3part2',
					],
                    ptime4:[
						'ptime4part1',
						'ptime4part2',
					],
				},	
			}
		},
		mounted(){
			this.initTable();
			this.initSearch();
			this.generateExcel([]);
			this.initfeeArrOption1();
		},
		methods:{ 
			initfeeArrOption1(){
                let interfaceArr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
                let final =this.StateData.feeArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                       return val;
                    }
                });
				this.feeArrOption1 = final;
			},
            confirmbreachDetail(str){
                console.log(str);
                console.log( this[str] );
                this.breachDetailVisible = false;
                this.$refs[str].resetFields();
            },
            cancelbreachDetail(str){
                console.log(str);
                this.breachDetailVisible = false;
                this.$refs[str].resetFields();
            },
            confirmNewBreach(str){
                console.log(str);
                this.$refs[str].resetFields();
                this.breachDetailVisible = true;
                this.newBreachVisible = false;
            },
            cancelNewBreach(str){
                console.log(str);
                this.$refs[str].resetFields();
                this.newBreachVisible = false;
            },
            popNewBreach(){
                this.newBreachVisible = true;
            },
            confirmAddBill(str){
                this.addBillVisible = false;  
            },
            cancelAddBill(str){
                this.addBillVisible = false;  
            },
            addBill(){
                this.addBillVisible = true;  
            },
            confirmChangeReceipt(){
                this.receiptVisible = false;
            },
            cancelChangeReceipt(){
                this.receiptVisible = false;
            },
            confirmEditTime(){
                this.editDateVisible = false;
                console.log(this.billDate);
            },
            cancelEditTime(){
                this.editDateVisible = false;
                this.billDate = '';
            },
            confirmReceipt(row ){
                console.log('confirmReceipt',row );  
                this.receiptVisible = true;
            },
            editTime( row ){
                console.log( row );
                this.editDateVisible = true;
            },            
            handleSizeChange1(val){
                this.current1 = 1;
                this.size1 = val;
            },
            handleCurrentChange1(val){
                this.current1 = val;
            },
            checkDetail( row ){
                console.log( row );
                this.detailShow = true;
            },
            dateTableFocus(){
                console.log(this.dateTableVisible);
            },
            preventImmediately(form,item){
                this[form][item] = '';
                this.StoreJs.remove('remListExpiryDateFir');
            },
            dateTableClick(val,form,item){
                console.log( 'val',val );
                this.dateTableActiveIndex = val;
                this.dateTableVisible = false;
                this[form][item] = val;
                this.inputChange(val,form,item);
            },
			queryNowSp(){
//				this.statementStatus
//				this.timeSp
				let data = {
				};
			},
			generateExcel(buffer){				
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );				
				this.excelHref =  url;
				let now = Date.now();			
				let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
				this.excelDownload = `testtestme${format}.xls`;				
				URL.revokeObjectURL(url);
			},
			handleSizeSpChange(val){
				console.log(val);
			},
			handleCurrentSpChange(val){
				console.log(val);
			},
			resetSp(){
				this.statementStatus = '';
				this.timeSp = '';
			},
			withdrawalClick(){
				this.withdrawShow = true;
			},
			downloadExcel(){					
			},
			handleCommand(command) {
				switch (command) {
					case "a":
						this.queryNow();
						break;
					case "b":	
						this.downloadExcel();
						break;
				}
			},
			initTable(){
                this.Digital.tableWidthController.bind(this)(290,'computed');  
			},
			initSearch(){		
                let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
                this.runSearch(finalData);
                console.log( 'finalData',finalData );
			},
            inputChange(val,form,item){
                if(val){
                   this.StoreJs.set( this.storeMap[item],val );
                }else{
                    this.StoreJs.remove( this.storeMap[item] );
                }
			},            
			saveEdit3(){
				this.editVisible3 = false;
			},
			cancelEdit3(){
				this.editVisible3 = false;
			},
			saveEdit1(){
				this.editVisible1 = false;
			},
			cancelEdit1(){
				this.editVisible1 = false;
			},
			edit1(row){
				this.editVisible1 = true;
			},
			edit3(row){
				this.editVisible3 = true;
			},
			sizeChange(val){
				this.pageSize = val;
			},		
			popMultipleDelete(){
				if(this.delAble){
					this.showDelete = true;
				}
			},
            popMultipleDelete2(){              
				if(this.delAble2){
					this.showDelete2 = true;
				}
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
            quitCancel2(){
                this.showDelete2 = false;
            },
            quitConfirm2(){
                this.showDelete2 = false;
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
            handleSelectionChange2(val){
                this.multipleSelection2 = val;
            },
			runSearch(data){
//				console.log(data);
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
    .cusDateTitle {
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        padding-bottom: 10px;
        border-bottom:1px #EBEEF5 solid;
    }
    .amountTitle {
        color: #a4aabc;
    }
    .amountSub {
        margin-right: 20px;
    }
    .amountValue {
        font-weight: 600;
    }
    .amountSummary {
        justify-content: flex-start;
        height: 50px;
        font-size: 13px;
    }
    .batteryAnalysisCon {
		background-color: $bgGrey;
		box-sizing: border-box;
		padding: 20px;
	}
    .searchConList {
        justify-content: flex-end;
        margin-bottom: 20px;
    }
    .marRight {
        margin-right: 20px;
    }
    .addBg {
		background-color: #2a2f48 !important;
		margin-left: 20px;
		box-shadow: 0px 2px 10px 5px #dadbe1 !important;
	}
    .marBottom {
        margin-bottom: 20px;
    }
    .dateTableActive {
        background-color: $mainRed;
        color: #fff;
    }
    .dateSolo {
        cursor: pointer;
        height: 20px;
        width: 20px;
        line-height: 20px;
        margin: 0 auto;
        border-radius: 10px;
    }
    .cusDatePicker {
        width: 100%;
        font-size: 12px;
        text-align: center;        
        td{     
            height: 50px;
            &:hover {
                color: $mainRed;
            }
        }
    }
	.greyBgCon {
		background-color: #f5f6fd;
		padding: 20px;
	}
	.sameWidth {
		width: 170px;
	}
    .spWidth {
        width: 220px;
    }
	.lightLeft {
		width: 120px;
		cursor: pointer;
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
    .tableTopRightSp {
		height: 30px;
		width: 30px;
		background-color: $mainRed;
		border-radius: 15px;
		line-height: 30px;
		text-align: center;
		color: #fff;
		box-shadow: $redShadow;
		margin-left: 20px;
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
	.tableTop {
		height: 40px;
		flex-wrap: nowrap;
		justify-content:space-between;
		margin-bottom: 20px;
	}
	.diagBtnCon {
		padding-right: 5%;
		margin-top: 20px;
		margin-bottom: 20px;
		flex-wrap: nowrap;
		justify-content: flex-end;
		.marLeft {
            margin-left: 20px;
		}
	}
	.remindListContainer {
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
			height: 780px;
			background-color: #fff;
			border-radius: 10px;
			padding: 14px;
			box-sizing: border-box;			
		}
		.tableOuterSp {
			height: 500px;
			background-color: #fff;
			border-radius: 10px;
			padding: 8px;
			box-sizing: border-box;		
		}
		.searchCon {
			flex-wrap:wrap;
			justify-content:flex-start;
		}
		.btnCon {
			width: 200px;
			flex-wrap: nowrap;
			justify-content: space-between;
		}		
	}
</style>
<style  lang="scss">
.remindListContainer {    
    .diagCon {
        .el-dialog {		
            width: 540px !important;
            height: 400px !important;
        }
        .el-select {
            width: 100%;
        }        
    }    
    .receiptCon {
        .el-dialog__body { 
            padding: 20px !important;
        }
    }
    .addBillCon {
        .el-dialog {
            width: 540px !important;
            height: 470px !important;
        }
        .el-dialog__body { 
            padding: 20px !important;
        }
        .el-select {
            width: 100%;
        }   
        .el-date-editor {
            width: 100%;
        }
    }
    .receiptCon .el-date-editor {
        width: 100%;
    }
	.paddingInput {
		width: 90%;
		margin-top: 20px;
		margin-left:  5%;
	}	
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
	.el-dialog__body {
		padding: 0 !important;
	}   
    .addDiagCon .el-dialog {
		height: 250px !important;
		.scrollContainer {
            height: 100px !important;
            text-align: center;
            line-height: 100px;
            .el-date-editor {
                width: 400px;
            }
		}
        .specialScrollContainer {
            padding: 20px;
        }
	}
    .breachDetailCon {
        .el-select {
            width: 100%;
        }  
        .el-dialog {
            width: 540px !important;
            height: 560px !important;
        }
        .scrollContainer {
            overflow-y: scroll;
            height: 400px;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 20px;
        }
    }
}
</style>
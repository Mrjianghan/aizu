<template>
  <div class="illegalDetailContainer">	 
	  <div class="tableShow" v-show="tableShow">	
            <div id="illegalDetailPrintContainer">                
                <table>
                    <caption class="tablePrintHeader">违约到期流转单</caption>
                    <thead>
                        <tr>
                            <th colspan="8">基本信息</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>合同号</td>
                            <td>{{ firstPart.contractNo }}</td>
                            <td>登记人</td>
                            <td>{{ firstPart.consumerName  }}</td>
                            <td>小区</td>
                            <td>{{ firstPart.communityName  }}</td>
                            <td>地址</td>
                            <td>{{ firstPart.houseName  }}</td>
                        </tr>
                        <tr>
                            <td>业务员</td>
                            <td>{{ firstPart.salesmanName  }}</td>
                            <td>房东/租客姓名</td>
                            <td>{{ firstPart.renterName  }}</td>
                            <td>房东/租客电话</td>
                            <td>{{ firstPart.renterMobile}}</td>
                            <td>房租</td>
                            <td>{{ firstPart.amount | formatMoneyValueWithMark  }}</td>
                        </tr>
                        <tr>
                            <td>情况</td>
                            <td>{{ typeArr[firstPart.type] }}</td>
                            <td>说明</td>
                            <td colspan="5"></td>                            
                        </tr>
                        <tr>
                            <td>违约专员</td>
                            <td colspan="3">{{ firstPart.breachConsumerName }}</td>
                            <td>办结时间</td>
                            <td colspan="3">{{ firstPart.gmtFinish }}</td>                            
                        </tr>
                        <tr>
                            <td>违约专员说明</td>
                            <td colspan="7">{{ firstPart.otherMemo }}</td> 
                        </tr>
                        <tr>
                            <td class="removeBottom" style="width:8%">合同开始时间</td>
                            <td class="removeBottom">{{firstPart.gmtAgentBegin}}</td>
                            <td class="removeBottom" style="width:8%">合同结束时间</td>
                            <td class="removeBottom">{{firstPart.gmtAgentEnd}}</td>
                            <td class="removeBottom" style="width:8%">到期房屋回收时间</td>
                            <td class="removeBottom">{{firstPart.gmtAgentEnd}}</td>
                            <td class="removeBottom" style="width:8%">违约房屋回收时间</td>
                            <td class="removeBottom">{{firstPart.gmtBreachCallback}}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th colspan="9">水、电、煤气、其他</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>水（度数）</th>
                            <th>电（度数）</th>
                            <th>煤气（度数）</th>
                            <th>空调</th>
                            <th>电视费</th>
                            <th>电梯费</th>
                            <th>公用电费</th>
                            <th>其他（度数）</th>
                        </tr>
                        <template v-for="(row) in printStartTable1">
                            <tr>
                                <td class="removeBottom" style="width:10%">{{row.title}}</td>
                                <td class="removeBottom" style="width:11%">{{row.water}}</td>
                                <td class="removeBottom" style="width:11%">{{row.electricity}}</td>
                                <td class="removeBottom" style="width:11%">{{row.gas}}</td>
                                <td class="removeBottom" style="width:11%">{{row.airCondition}}</td>
                                <td class="removeBottom" style="width:11%">{{row.tv}}</td>
                                <td class="removeBottom" style="width:11%">{{row.elevator}}</td>
                                <td class="removeBottom" style="width:11%">{{row.public}}</td>
                                <td class="removeBottom" style="width:13%">{{row.other}}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th colspan="12">结算费用</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width:8.3%">项目</td>
                            <td style="width:8.3%">违约</td>
                            <td style="width:8.3%">财务</td>
                            <td style="width:8.3%">项目</td>
                            <td style="width:8.3%">违约</td>
                            <td style="width:8.3%">财务</td>
                            <td style="width:8.3%">项目</td>
                            <td style="width:8.3%">违约</td>
                            <td style="width:8.3%">财务</td>
                            <td style="width:8.3%">项目</td>
                            <td style="width:8.3%">违约</td>
                            <td style="width:8.7%">财务</td>
                        </tr>
                        <tr v-for="(val,index) in printArr" :key="index">                                
                            <template v-for="(subVal) in val">
                                <template v-for="(thirdVal) in subVal">
                                    <td class="removeBottom">{{thirdVal.type}}</td>
                                    <td class="removeBottom">{{thirdVal.breachAmount}}</td>
                                    <td class="removeBottom">{{thirdVal.financeAmount}}</td>   
                                </template>
                            </template>
                        </tr>
                    </tbody>
                </table>
                <table> 
                    <tr>
                        <td colspan="3" style="width:30%">总计</td>
                        <td colspan="3">{{summary1 | formatMoneyValueWithMark}}</td>
                        <td colspan="4">{{summary2 | formatMoneyValueWithMark}}</td>
                    </tr>
                    <tr>
                        <td colspan="3">备注</td>
                        <td colspan="7">{{ firstPart.memo | emptyProcessor }}</td>
                    </tr>
                    <tr>
                        <td colspan="3">房租结算时间</td>
                        <td colspan="3">{{ firstPart.gmtRentSettlement | emptyProcessor }}</td>
                        <td colspan="4">{{ firstPart.gmtRentSettlement1 | emptyProcessor }}</td>
                    </tr>
                </table>
                <table>
                    <caption class="printBottom" style="margin-top:10px;margin-bottom:10px;">财务办理:名字</caption>
                    <tr class="printBottom"><img v-show="true" src="http://erp.52zu.com:8080/aizuwang/upload/app/zhuanzhan.png"></tr>
                </table> 
            </div>
		</div>





	<div class="inner">
		<div class="top">
			<div class="topHeader flex">
				<div class="topHeadLeft flex">
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
						<div class="repairInfoFirst flex">
							<div class=" repairInfoDetailTitle special">合同</div>
							<span class="repairInfoStatus">[状态：{{ firstPart.status | emptyProcessor }}]</span>
						</div>
						<div class="repairInfoDetailCon">
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">合同号</div>
								<div class="repairInfoDetailContent">{{ firstPart.contractNo | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">违约类型</div>
								<div class="repairInfoDetailContent">{{ typeArr[firstPart.type] | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">登记人</div>
								<div class="repairInfoDetailContent">{{ firstPart.consumerName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">出租业务员</div>
								<div class="repairInfoDetailContent">{{ firstPart.salesmanName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">小区</div>
								<div class="repairInfoDetailContent">{{ firstPart.communityName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">地址</div>
								<div class="repairInfoDetailContent">{{ firstPart.houseName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">房东/租客姓名</div>
								<div class="repairInfoDetailContent">{{ firstPart.renterName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">房东/租客电话</div>
								<div class="repairInfoDetailContent">{{ firstPart.renterMobile | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">银行卡号</div>
								<div class="repairInfoDetailContent">{{ firstPart.bankCardNo | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">持卡人姓名</div>
								<div class="repairInfoDetailContent">{{ firstPart.accountName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">开户银行</div>
								<div class="repairInfoDetailContent">{{ firstPart.bankName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">合同开始时间</div>
								<div class="repairInfoDetailContent">{{ firstPart.gmtAgentBegin | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">合同结束时间</div>
								<div class="repairInfoDetailContent">{{ firstPart.gmtAgentEnd | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">房租</div>
								<div class="repairInfoDetailContent">{{ firstPart.amount | formatMoneyValueWithMark | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">到期房屋回收时间</div>
								<div class="repairInfoDetailContent">{{ firstPart.gmtAgentEnd | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">房租付至日</div>
								<div class="repairInfoDetailContent">{{ firstPart.gmtBreachCallback | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">说明/备注</div>
								<div class="repairInfoDetailContent">{{ firstPart.description | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">违约单开始时间</div>
								<div class="repairInfoDetailContent">{{ firstPart.gmtCreate | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">违约单结束时间</div>
								<div class="repairInfoDetailContent">{{ firstPart.gmtFinish | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">违约专员</div>
								<div class="repairInfoDetailContent">{{ firstPart.breachConsumerName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">房源责任人</div>
								<div class="repairInfoDetailContent">{{ firstPart.princpleName | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">违约专员说明</div>
								<div class="repairInfoDetailContent">{{ firstPart.otherMemo | emptyProcessor }}</div>
							</div>
                            <div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitleSp">图片</div>
								<div class="repairInfoPics flex">
                                    <div v-for="(img,i) in imgArr"  :key="i" class="picsItem" :style="{backgroundImage: 'url('+img.url+')'}" @click.stop="pickPic(i,'imgArr')">
<!--                                        <div class="blackBar"><i @click.stop="deleteThisPic(i)" class="icon-shanchu- iconfont"></i></div>-->
                                    </div>
                                </div>
							</div>
						</div>
					</div>
					</div>
				  <div class="right">
					  <div class="repairStaffInfo">						  
						  <div class="repairInfoFirst flex">
							<span class="repairInfoTitle">财务备注信息</span>
						  </div>
						  <div class="repairStaffInfoLists flex">
							<div class="repairStaffInfoTitle">维修记录</div>
							  <el-input	maxlength="200" class="textarea"  type="textarea"  :rows="4"  placeholder="请输入维修记录" v-model.trim="repairStaffTextValue"	:resize="'none'"></el-input>
								<div class="topHeadLeft flex specialConfirm" @click="recordsConfirm('repairStaffTextValue')"><span>确认</span></div>
							</div>
                          <div class="remarksContainer">
							  <template v-for="(val,i) in remarkArr">
									<div class="flexBetween flex">
										<div class="timelineTail"></div>
										<div class="flexLeftSide">
											<div>{{ val.gmtCreate ? val.gmtCreate.split(' ')[0] : '' }}</div>
											<div>{{ val.gmtCreate ? val.gmtCreate.split(' ')[1] : ''}}</div>
										</div>
										<div class="flexRightSide">
											<div class="top">{{val.name}}</div>
											<div class="bottom">{{val.description}}</div>
										</div>
								  </div>
							  </template>	
						  </div>
					   </div>
					  <div class="repairStaffInfo">						  
						  <div class="repairInfoFirst flex">
							<span class="repairInfoTitle">流程</span>
						  </div>
						  <div class="progressDetails">
                              <template v-for="(val,i) in processArr">
									<div class="flexBetween flex">
										<div class="timelineTail"></div>
										<div class="flexLeftSide">
											<div>{{ val.gmtCreate ? val.gmtCreate.split(' ')[0] : '' }}</div>
											<div>{{ val.gmtCreate ? val.gmtCreate.split(' ')[1] : '' }}</div>
										</div>
										<div class="flexRightSide">
											<div class="top">{{val.name}}</div>
											<div class="bottom">{{val.description}} [已办结 ]</div>
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
			  <div class="tableContent" :style="{width:computed}">
                      <el-table :data="startTable"  tooltip-effect="dark"  style="width: 100%"  stripe>
                      
                      <el-table-column  label="物品名称" show-overflow-tooltip>
                          <template slot-scope="scope">{{ scope.row.name }}</template>
                      </el-table-column>
                      <el-table-column  label="新旧程度" show-overflow-tooltip>
                          <template slot-scope="scope">{{ scope.row.degree | emptyProcessor  }}</template>
                      </el-table-column>
                      <el-table-column  label="规格型号" show-overflow-tooltip>
                          <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
                      </el-table-column>
						<el-table-column  label="品牌" show-overflow-tooltip>
							  <template slot-scope="scope">{{  | emptyProcessor  }}</template>
							</el-table-column>
						<el-table-column  label="产品类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.type | emptyProcessor  }}</template>
							</el-table-column>
						<el-table-column  label="数量" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.number | emptyProcessor  }}</template>
							</el-table-column>
						<el-table-column  label="归属" show-overflow-tooltip>
							  <template slot-scope="scope">{{  | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="备注" show-overflow-tooltip>
							  <template slot-scope="scope">{{  | emptyProcessor }}</template>
							</el-table-column>
                          <el-table-column  label="房东承担" show-overflow-tooltip>
							  <template slot-scope="scope">{{  scope.row.needLandlordBear === true ? '是' : '否'    | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="价格" show-overflow-tooltip>
							  <template slot-scope="scope">{{  scope.row.amount | formatMoneyValueWithMark | emptyProcessor}}</template>
							</el-table-column>
<!--
					  <el-table-column  label="赔偿费" show-overflow-tooltip>
							  <template slot-scope="scope">{{   scope.row.amount | formatMoneyValueWithMark | emptyProcessor }}</template>
							</el-table-column>
-->
					  <el-table-column  label="违约专员确认栏" show-overflow-tooltip>
							  <template slot-scope="scope">{{  | emptyProcessor }}</template>
							</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="middle middle1">
			  <div class="middleTitle">水电、煤气、其他</div>
			  <div class="tableContent" :style="{width:computed}">                      
                <el-table :data="startTable1"  tooltip-effect="dark"  style="width: 100%"    stripe>      
						<el-table-column  label="" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.title }}</template>
							</el-table-column>
						<el-table-column  label="水（度数）" show-overflow-tooltip  v-if="analyseItem('WATER')">
							  <template slot-scope="scope">
                                    <el-popover	placement="bottom"	trigger="hover" v-if="( true )&&( scope.row.line === 2  )">
                                        <div class="popperInner popperSpecial" @click="popModify(scope.row,'water','水（度数）')"><i class="iconfont icon-bianji-"></i> <span> 编辑</span> </div>
                                        <div  class="operate" slot="reference">{{ scope.row.water | emptyProcessor }}</div>
                                    </el-popover>
                                    <div v-else>{{ scope.row.water | emptyProcessor }}</div>
                                </template>
							</el-table-column>
						<el-table-column  label="电（度数）" show-overflow-tooltip v-if="analyseItem('POWER')">
							  <template slot-scope="scope">
                                    <el-popover	placement="bottom"	trigger="hover" v-if="( true )&&( scope.row.line === 2  )">
                                        <div class="popperInner popperSpecial" @click="popModify(scope.row,'electricity','电（度数）')"><i class="iconfont icon-bianji-"></i> <span> 编辑</span> </div>
                                        <div  class="operate" slot="reference">{{ scope.row.electricity | emptyProcessor }}</div>
                                    </el-popover>
                                    <div v-else>{{ scope.row.electricity | emptyProcessor }}</div>
                                </template>
							</el-table-column>
						<el-table-column  label="煤气（度数）" show-overflow-tooltip v-if="analyseItem('COAL')">
							  <template slot-scope="scope">    
                                    <el-popover	placement="bottom"	trigger="hover" v-if="( true )&&( scope.row.line === 2  )">
                                        <div class="popperInner popperSpecial" @click="popModify(scope.row,'gas','煤气（度数）')"><i class="iconfont icon-bianji-"></i> <span> 编辑</span> </div>
                                        <div  class="operate" slot="reference">{{ scope.row.gas | emptyProcessor }}</div>
                                    </el-popover>
                                    <div v-else>{{ scope.row.gas | emptyProcessor }}</div>
                                </template>
							</el-table-column>
						<el-table-column  label="空调" show-overflow-tooltip v-if="analyseItem('AIR_CONDITION_FEE')">
							  <template slot-scope="scope"> 
                                    <el-popover	placement="bottom"	trigger="hover" v-if="( true )&&( scope.row.line === 2  )">
                                        <div class="popperInner popperSpecial" @click="popModify(scope.row,'airCondition','空调')"><i class="iconfont icon-bianji-"></i> <span> 编辑</span> </div>
                                        <div  class="operate" slot="reference">{{ scope.row.airCondition | emptyProcessor }}</div>
                                    </el-popover>
                                    <div v-else>{{ scope.row.airCondition | emptyProcessor }}</div>
                                </template>
							</el-table-column>
						<el-table-column  label="电视费" show-overflow-tooltip v-if="analyseItem('TV')">
							  <template slot-scope="scope">
                                    <el-popover	placement="bottom"	trigger="hover" v-if="( true )&&( scope.row.line === 2  )">
                                        <div class="popperInner popperSpecial" @click="popModify(scope.row,'tv','电视费')"><i class="iconfont icon-bianji-"></i> <span> 编辑</span> </div>
                                        <div  class="operate" slot="reference">{{ scope.row.tv | emptyProcessor }}</div>
                                    </el-popover>
                                    <div v-else>{{ scope.row.tv | emptyProcessor }}</div>
                                </template>
							</el-table-column>
						<el-table-column  label="电梯费" show-overflow-tooltip v-if="analyseItem('ELEVATOR')">
							  <template slot-scope="scope">      
                                <el-popover	placement="bottom"	trigger="hover" v-if="( true )&&( scope.row.line === 2  )">
                                        <div class="popperInner popperSpecial" @click="popModify(scope.row,'elevator','电梯费')"><i class="iconfont icon-bianji-"></i> <span> 编辑</span> </div>
                                        <div  class="operate" slot="reference">{{  scope.row.elevator | emptyProcessor }}</div>
                                    </el-popover>
                                    <div v-else>{{ scope.row.elevator | emptyProcessor }}</div>
                                </template>
							</el-table-column>
						<el-table-column  label="公用电费" show-overflow-tooltip v-if="analyseItem('PUBLIC_APPORTIONMENT_FEE')">
							  <template slot-scope="scope">
                                <el-popover	placement="bottom"	trigger="hover" v-if="( true )&&( scope.row.line === 2  )">
                                        <div class="popperInner popperSpecial" @click="popModify(scope.row,'public','公用电费')"><i class="iconfont icon-bianji-"></i> <span> 编辑</span> </div>
                                        <div  class="operate" slot="reference">{{ scope.row.public  | emptyProcessor }}</div>
                                    </el-popover>
                                    <div v-else>{{ scope.row.public  | emptyProcessor }}</div>
                                </template>
							</el-table-column>
					  <el-table-column  label="其他（度数）" show-overflow-tooltip v-if="analyseItem('OTHER')">
                           <template slot-scope="scope">    
                                <el-popover	placement="bottom"	trigger="hover" v-if="( true )&&( scope.row.line === 2  )">
                                        <div class="popperInner popperSpecial" @click="popModify(scope.row,'other','其他（度数）')"><i class="iconfont icon-bianji-"></i> <span> 编辑</span> </div>
                                        <div  class="operate" slot="reference">{{ scope.row.other | emptyProcessor }}</div>
                                    </el-popover>
                                    <div v-else>{{ scope.row.other | emptyProcessor }}</div>
                           </template>
					   </el-table-column>
				</el-table>
			</div>
		</div>
		  <div class="bottom">
			  <div class="bottomFlex">
				  <div class="bottomTitle">费用结算</div>
			  </div>
			  <div class="hundredPercent">
				  <div class="thirdTitleCon flex">
					  <div class="thirdTitle flex">
						  <div class="first">项目</div>
						  <div class="second">违约</div>
						  <div class="third">财务</div>
					  </div>
					  <div class="thirdTitle flex">
						  <div class="first">项目</div>
						  <div class="second">违约</div>
						  <div class="third">财务</div>
					  </div>
					  <div class="thirdTitle flex">
						  <div class="first">项目</div>
						  <div class="second">违约</div>
						  <div class="third">财务</div>
					  </div>
				  </div>
				  <div class="itemCon flex">
					  <template v-for="(item,index) in itemArr">
                            <div class="thirdTitle flex">
								<div class="first darker">{{item.type}}</div>
								  <div class="second darker">{{item.breachAmount | formatMoneyValueWithMark }}</div>
								  <div class="third darker">
									  <div class="borderStyle" v-if="item.editAble">
										  <span>￥</span> 
										  <input  placeholder="请输入" @focus="arrayInputFocus(item.id,item.financeAmount,index)" @change="arrayInputChange(item.id,item.financeAmount,index)" v-model.number.trim="item.financeAmount">
						  			  </div>
									  <span v-else class="darker">{{item.financeAmount | formatMoneyValueWithMark }}&nbsp;<i v-show="true" class="iconfont icon-bianji-" @click="editIconClick(index)"></i></span>
						  			</div>
						  	</div>
					  </template>
				  </div>
				  <div>
					  <div class="thirdTitleLike flex">
						  <div class="first darker">总计</div>
						  <div class="second darker">{{summary1 | formatMoneyValueWithMark}}</div>
						  <div class="third darker">{{summary2 | formatMoneyValueWithMark}}</div>
					  </div>
				  </div>
				  <div>
					  <div class="thirdTitleLike flex">
						  <div class="first darker">备注</div>
                          <div class="specialDarker darker">{{ firstPart.memo | emptyProcessor }}</div>
					  </div>
				  </div>
				  <div>
					  <div class="thirdTitleLike flex">
						  <div class="first darker">房租结算时间</div>
						  <div class="third darker">{{ firstPart.gmtRentSettlement | emptyProcessor }}</div>
                          <div class="third darker">{{ firstPart.gmtRentSettlement1 | emptyProcessor }}</div>
					  </div>
				  </div>
			  </div>
		</div>
		</div>
        <el-dialog :title="`修改-${bindTitle}`" :visible.sync="modifyVisible" class="smallDiagConCopy" :close-on-click-modal="false">
            <el-form ref="modifyForm" :model="modifyForm" label-width="0"  :rules="modifyRules">
                <div class="scrollContainer"> 
                    <el-form-item prop="number">
						<el-input  v-model.trim="modifyForm.number" @change="modifyFormChange('modifyForm','number')"></el-input>
                    </el-form-item>
                </div>
                <div class="diagBtnCon flex">
                    <RedBtn @click.native="saveModify('modifyForm')"></RedBtn>
                    <GreyBtn class="marLeft" @click.native="cancelModify('modifyForm')"></GreyBtn>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog  title="确认修改" class="smallDiagCon"  :visible.sync="dialogVisible2" :close-on-click-modal="false">
		  <span>确认修改？</span>
		  <span slot="footer" class="dialog-footer">
			  <div class="diagBtnConSpecial flex">
			  		<RedBtn @click.native="confirmDialogVisible2"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelDialogVisible2"></GreyBtn>
				</div>
		  </span>
		</el-dialog>  
    <transition name="popDel">
			<div class="imgBgContainer" v-if="imgPreviewShow">
				<div class="imgCenter">
					<div class="upper">
						<img class="leftArrow" :src="leftArrowSrc":class="{btnDisable:leftUnable}" @click="leftRoll">
						<div class="currentCon flex">
							<img class="currentPic" :src="currentSrc">
						</div>
						<img class="rightArrow" :src="rightArrowSrc" :class="{btnDisable:rightUnable}" @click="rightRoll">
					</div>                    
					<img class="shut" :src="shutSrc" @click="shut">			
				</div>
			</div>
		</transition>
        <el-dialog title="输入备注" :visible.sync="editVisible1" class="diagCon editDiagCon" :close-on-click-modal="false">		
            <el-input type="textarea" v-model.trim="textarea1" rows="11" :resize="'none'" class="paddingInput"></el-input>
            <div class="diagBtnCon flex">
                <RedBtn :text="'保存'" @click.native="saveEdit1"></RedBtn>
                <GreyBtn class="marLeft" @click.native="cancelEdit1"></GreyBtn>
            </div>
        </el-dialog>
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
		},
        data(){
			return {
                bindTitle:'',
                summary1:0,
                summary2:0,
                editVisible1:false,
                textarea1:'',
                computed:'auto',
                firstPart:{},
				total:'',
                modifyVisible:false,
				dialogVisible2:false,
                printStartTable1:[],
                processArr:[
					{
						description: "备注啊",
						gmtCreate: "2019-03-29 09:29:52",
						name: "戎磊"
					},
					{
						description: "备注啊",
						gmtCreate: "2019-03-29 09:29:52",
						name: "戎磊"
					},				
				],
                remarkArr:[
					{
						description: "备注超级多啊备注超级多啊备注超级多啊备啊",
						gmtCreate: "2019-03-29",
						name: "根"
					},
					{
						description: "备注啊备注超级多啊",
						gmtCreate: "09:29:52",
						name: "根"
					},
				],
				lockImgArrName:'imgArr',
                imgArr:[
                    { url:require('../../../../public/imgs/sfz2.png'), },
                    { url:require('../../../../public/imgs/sfz2.png'), },
                    { url:require('../../../../public/imgs/sfz2.png'), },
                    { url:require('../../../../public/imgs/sfz2.png'), },
                  			
                ],		
				itemArr:[],
				startTable1:[
//					{name:'me',status:false},
//					{name:'me',status:true}
				],
				startTable:[	
//					{name:'me'},					
				],
                modifyForm:{
                    number:'',
                },       
                modifyRules:{
                    number:[
                        { required: true, message: '请输入.', trigger: ['blur', 'change'] },
                        { pattern: /^\d+(\.\d+)?$/, message: '请输入正确格式', trigger: ['blur', 'change'] },
                    ],
                },
				editVisible:false,
				addVisible:false,
				form:{},
				rules:{},
				addform:{},
				addrules:{},
				repairStaffTextValue:'',
				tableShow:false,
                printArr:[],
                routeQuery:{},                
                imgPreviewShow:false,
                picIndex:0,
                leftArrowSrc:require('../../../../public/imgs/leftAble.png'),
                rightArrowSrc:require('../../../../public/imgs/leftAble.png'),
                shutSrc:require('../../../../public/imgs/shutPic.png'),
                leftUnable:false,
                rightUnable:false,
                currentSrc:'',
                trackArr:[],
                trackfeeSettlementObj:{},
                typeArr:[],
			}
		},
		mounted(){
            this.initRequest();
            this.initTable();               
            this.initTypeArr();
		},
		methods:{
            initTypeArr(){ 
                let obj = {};
                this.StateData.breachTypeArr.forEach(ele=>{
                    obj[ele.value] = ele.label;
                });
                this.typeArr = obj;  
            },
            initTable(){
                this.Digital.tableWidthController.bind(this)(310,'computed');
			},
            shut(){
				this.imgPreviewShow = false;
			},	
            leftRoll(){
                this.Digital.repackLeftRoll.bind(this)();                
			},
			rightRoll(){
                this.Digital.repackRightRoll.bind(this)();
			},
            pickPic(i,str){
				this.lockImgArrName = str;
				this.Digital.repackPicThisPic.bind(this)(i);
			},
            initRequest(){
                this.Digital.aesDecrypt.bind(this)();
                let data1 = {
                    id:this.routeQuery.id
                };  
                this.ApiLists[10023](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { data,message,success } = layer1;
                    if( success ){
                        this.firstPart = data;
                        this.firstPart.gmtBreachCallback = this.DayJs(data.gmtBreachCallback).format('YYYY-MM-DD');  
                        this.startTable = data.deployLinks ? data.deployLinks : [] ;
                        let cusArr =[
                            { title:'已付至度数',line:1,   },
                            { title:'目前度数',line:2,    }
                        ];
                        let IntegrationArr = [
                            { label:'WATER',value:'water' },
                            { label:'POWER',value:'electricity' },
                            { label:'COAL',value:'gas' },
                            { label:'AIR_CONDITION_FEE',value:'airCondition' },
                            { label:'TV',value:'tv' },
                            { label:'ELEVATOR',value:'elevator' },
                            { label:'PUBLIC_APPORTIONMENT_FEE',value:'public' },
                            { label:'OTHER',value:'other' },
                        ];                         
                        IntegrationArr.forEach((ele,index)=>{
                            let bridge = data.charges ? data.charges : [];
                            bridge.forEach(subValue=>{
                                if( subValue.name === ele.label ) {
                                    cusArr[0][ele.value] = subValue.deliveredDegree;
                                    cusArr[1][ele.value] = subValue.endCallMark;
                                    cusArr[1][ `${ele.value}Id` ] = subValue.id;    
                                    this.trackArr.push(subValue);
                                }
                            });        
                        });                                
                        this.startTable1 = cusArr;                          
                        this.printStartTable1 = this.startTable1.length ? this.startTable1 : [{title:'无'}];
                        if( data.breachFees ){
                           this.itemArr = data.breachFees;
                        }else{
                           this.itemArr = [];
                        }                        
                        this.itemArr.forEach(ele=>{
                            ele.editAble = false;    
                        });
                        this.summary1 = this.itemArr.reduce((acc,current)=>{
                            return acc+current.breachAmount;
                        },0);
                        this.summary2 = this.itemArr.reduce((acc,current)=>{
                            return acc+current.financeAmount;
                        },0);
                        console.log( 'itemArr',this.itemArr );
                        this.initPrint();
                    }else{
                        this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            analyseItem(item){
                let testBoolean = this.trackArr.some((ele)=>{
                    return ele.name === item;    
                });
                return testBoolean;
            },
            arrayInputFocus(id,financeAmount,index){
				this.focusValue = financeAmount;
			},
            editIconClick(index){
                this.itemArr[index].editAble = true;
                this.itemArr = [...this.itemArr];
            },
            confirmDialogVisible2(){
				this.dialogVisible2 = false;
                let data = {
                    breachId:this.firstPart.id,
                    financeAmount:this.trackfeeSettlementObj.financeAmount,
                    id:this.trackfeeSettlementObj.itemId,
                    type:this.trackfeeSettlementObj.type,
                };
                this.ApiLists[10022](data).then(res=>{
                    let { data:layer1 } = res;
                    let { data,success,message } = layer1;
                    if(success){
                        this.Success.saveSuccess(); 
                        this.initRequest();  
                    }else{
                       this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err);
                })
			},
			cancelDialogVisible2(){
				this.dialogVisible2 = false;
                this.itemArr[this.trackIndex].financeAmount = this.focusValue;                
			},
            arrayInputChange(id,financeAmount,index){
				if( typeof(financeAmount) === 'number' ){
                    console.log( '是数字' );
				    this.dialogVisible2 = true;
                    let fixResult = this.Digital.roundValue(+parseFloat(financeAmount),2);
					this.itemArr[index].financeAmount = fixResult;	
                    this.trackfeeSettlementObj = {
                        itemId:id,
                        type:this.itemArr[index].type,
                        financeAmount:fixResult,
                    };
					this.trackId = id;
					this.trackIndex = index;
					this.trackValue = fixResult;
				}else{
				    this.$message.error('需要输入数字。');
					this.itemArr[index].financeAmount = '';
				}      
			},
            popModify(row,str,chinese){
                this.modifyVisible = true;
                this.bindTitle = chinese;
                this.bridgeTableElement = row;
                this.modifyForm.number = row[str];
                this.modifyForm.id = row[`${str}Id`];                
                console.log( 'this.modifyForm',this.modifyForm );
            },
            cancelModify(str){
                this.modifyVisible = false;
//                this.$refs[str].resetFields();
            },
            saveModify(str){  
                let condition = this.Digital.shorterValidate.bind(this)(str);
                if(condition){
                    let data = {
                        endCallMark:this.modifyForm.number,
                        id:this.modifyForm.id
                    };
                    this.ApiLists[10027](data).then(res=>{
                        console.log(res);
                        let { data:layer1 } =res;
                        let { success,message } = layer1;
                        if( success ){
                            this.Success.saveSuccess(); 
                            this.modifyVisible = false;
                            this.initRequest();
                        }else{
                           this.$message.error(message);  
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    this.$message.error('请检查表单数据。');  
                }
            },
            modifyFormChange(form,item){                
                this[form][item] = this.Digital.roundValue( this[form][item],2 );                
            },			
			recordsConfirm(str){
				let length = this[str].length;
				console.log('length',length);
				if( length ){
				   this.Success.saveSuccess();
    //				this.Err.netErr();
				}else{
				   this.$message.error('内容不能为空。');
                }
			},
			saveAdd(){
				this.addVisible = false;
			},
			cancelAdd(){
				this.addVisible = false;
			},
			popDelete(row){
			},
			goBack(){
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/illegalProcess');
			},
            saveEdit1(){
                if( this.textarea1 ){
                    let data = {
                        id:this.firstPart.id,
                        memo:this.textarea1,
                    };
                    this.ApiLists[10026](data).then(res=>{
                        let { data:layer1 } = res;
                        let { data,message,success } = layer1;
                        if( success ){
                            this.editVisible1 = false;
                            this.Success.saveSuccess();
                        }else{
                           this.$message.error(message);
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }else{
                    this.$message.error('请输入备注。');
                }
            },
            cancelEdit1(){
                this.editVisible1 = false;
                this.textarea1 = '';
            },
			fallBack(){			
                this.editVisible1 = true;
			},
            initPrint(){
                let assemblyArr = [];
                let copyItemArr = [];
                let deepClone = this._.cloneDeep( this.itemArr );
                if( this.itemArr.length ){
                    if( this.itemArr.length < 4 ){
                        function repeat (number){
                            for ( let i = 0; i < number;i++ ){
                                deepClone.push( { type:'无',breachAmount:'无',financeAmount:'无' } );
                            }
                        };
                        repeat( 4 - this.itemArr.length );
                    }else{
                        copyItemArr = deepClone;
                    }
                    copyItemArr = deepClone;
                    let layer = Math.ceil(copyItemArr.length/4);  
                    for( let i=0; i < layer; i++ ){
                        console.log( 'index',i );
                        assemblyArr.push({
                            item:copyItemArr.splice(0,4)
                        });
                    }   
                }else{
                    assemblyArr = [{item:[
                        { type:'无',breachAmount:'无',financeAmount:'无' },
                        { type:'无',breachAmount:'无',financeAmount:'无'},
                        { type:'无',breachAmount:'无',financeAmount:'无' },
                        { type:'无',breachAmount:'无',financeAmount:'无'},
                    ]}]
                }
                console.log( 'assemblyArr',assemblyArr );
                this.printArr = assemblyArr; 
            },
			print(){	                
                printJS( { printable: 'illegalDetailPrintContainer', type: 'html',
                          style:` #illegalDetailPrintContainer {width: 100%;}
                                 .tablePrintHeader {
                                    margin-top: 18px;
                                    margin-bottom: 10px;
                                    font-size: 16px;
                                } 
                                table {
                                    width: 100%;
                                    border-collapse: collapse;
                                    margin: 0 auto; 
                                    font-size: 12px;                                    
                                }
                                .removeBottom { 
                                    border-bottom: none !important;
                                }
                                .printBottom {
                                    text-align: right;
                                }
                                th,td {
                                    border: 1px solid #bbc1d5;
                                    text-align: center;
                                    vertical-align: middle;
                                    word-break: break-all;
                                }
                            ` 
                        } );
                
			},
		},
    }
</script>
<style scoped lang="scss">
    .btnDisable {
		cursor: not-allowed !important;
	}	
    .imgBgContainer {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
		z-index: 200;
		.imgCenter {
			width: 1000px;
			height: 620px;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			text-align: center;
			.upper {
				position: relative;
				.leftArrow {
					width: 34px;
					height: 34px;
					position: absolute;
					left: 0;
					top: 280px;
					cursor: pointer;
				}
				.currentCon {
					height: 570px;
					position: absolute;
					left: 30px;
					width: 940px;
					overflow: hidden;
					justify-content: center;
					.currentPic {
						max-height: 570px;
					}
				}
				.rightArrow {
					position: absolute;
					right: 0;
					top: 280px;
					width: 34px;
					height: 34px;
					transform: rotateY(180deg);
					cursor: pointer;
				}
			}
			.shut {
				height: 44px;
				width: 44px;
				position: absolute;
				bottom: 0;
				cursor: pointer;
				left: 478px;
			}
		}
	}
.picsItem {
	margin-right: 18px;
	height: 100px;
	width: 140px;
	text-align: center;
	line-height: 100px;
	margin-bottom: 20px;
	cursor: pointer;
	border-radius: 5px;
	box-sizing: border-box;
	position: relative;
	background-position: center center;
	background-size:cover;
	background-repeat: no-repeat;
    overflow: hidden;
}
.operate { 
    width: 50%;
	color: $mainRed;
	margin: 0 auto;
	border-radius: 15px;
     cursor: pointer;
	font-size: 13px;
}
    .flexBetween {
        flex-wrap: nowrap;
        justify-content:flex-start;
        position: relative;
        margin-bottom: 20px;
        &:last-child .timelineTail{
            display: none;
        }
        .timelineTail {
            height: 100%;
            position: absolute;
            border-left: 2px dashed #ffefef;
            left: 120px;
            top: 20px;
        }
        .flexLeftSide {
			color: #a4aabc;
			font-size: 13px;
			width: 96px;
			text-align: right;
			margin-right: 60px;
        }
    .flexRightSide {
        width: 200px;
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
            margin-bottom: 5px;
        }
        .bottom {
            color: #a4aabc;
            font-size: 13px;
        }
        }
    }
	.tableShow {
		position: absolute;
		width: 790px;
		height: 700px;
		background-color: #eee;
		left: 700px;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.hundredPercent {
		width: 100%;
		.thirdTitleCon {
			width: 100%;
			flex-wrap: nowrap;
			justify-content:flex-start;
		}
		.itemCon {
			width: 100%;
			flex-wrap:wrap;
			justify-content:flex-start;
		}
		.darker {
			color: #464b60;
			font-weight: 600;
		}
		.thirdTitleLike {
			width: 33.333%;
			height: 20px;
			flex-wrap: nowrap;
			justify-content:flex-start;
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
            .specialDarker {
                width: 67%;
            }
			.third {
				width: 40%;                
				input {
					height: 30px;
					width: 100px;
					border: 2px solid #efeef3;
					box-sizing: border-box;
					padding-left: 20px;
				}
			}
		}
		.thirdTitle {
			width: 33.333%;
			height: 20px;
			flex-wrap: nowrap;
			justify-content:flex-start;
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
                .iconfont {
                    color: $mainRed !important;
                    cursor: pointer !important;
                    font-weight: 300;
                }
				input {
					height: 30px;
					width: 100px;
					border: 2px solid #efeef3;
					box-sizing: border-box;
					padding-left: 20px;
				}
			}
		}
	}
	.illegalDetailContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.inner {
			background-color: #fff;
			border-radius: 10px;
			padding: 24px;
		}
		.top {
			.topHeadLeft {
				justify-content: flex-start;
				border-radius: 20px;
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
				justify-content: flex-start;
				margin-bottom: 20px;
			}
			.progressDetails {
				margin-top: 24px;
			}	
				.repairInfoFirst {
					justify-content: flex-start;
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
						justify-content: flex-start;
						margin-bottom: 20px;
					}
                    .repairInfoDetailTitleSp{
                        height: 100px;
                        line-height: 100px;
                        width: 140px;
                        color: #a4aabc;
						font-size: 13px;
                        text-align: right;
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
                        width: calc( 100% - 140px );
					}
                    .repairInfoPics {
						margin-left: 20px;
                        width: calc( 100% - 140px );
                        flex-wrap: wrap;
					}
				}			
			.topHeader {
				height: 40px;
				margin-bottom: 24px;
				flex-wrap: nowrap;
				justify-content: space-between;
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
			flex-wrap: nowrap;
			justify-content: flex-end;
			.marLeft {
				margin-left: 20px;
			}
		}
		.scrollContainer {
			overflow-y: scroll;
			height: 370px;
		}
		.bottom {
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
		}
		.special {
			width: 140px;
			text-align: right;
			font-weight: 600;
		}
	}
</style>
<style  lang="scss">
	.illegalDetailContainer {		
        .smallDiagConCopy .el-dialog {
			height: 240px !important;
			width: 540px !important;			
            .scrollContainer {
                height: 63px;
            }
		}
		.smallDiagCon .el-dialog {			
			width: 540px !important;
			height: 200px !important;
		}
		.diagBtnConSpecial {
			justify-content: flex-end;
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
    .diagCon {
        .el-dialog {		
            width: 540px !important;
            height: 420px !important;
        }     
    }   
	@media all {
        @page {
            margin: 8mm;
            margin-top: 12mm;
        }
        #illegalDetailPrintContainer {
            .tablePrintHeader {
                margin-top: 18px;
                margin-bottom: 10px;
                font-size: 16px;
            }             
            table {
                font-size: 12px;
                border-collapse: collapse;
                width: 90%;  
                margin: 0 auto;                   
                th,td {
                    border: 1px solid #bbc1d5;
                    text-align: center;
                    vertical-align: middle;
                    white-space:pre-wrap;
                }
            }    
            .twoOfTen {
                width: 20%;
            }
            .eightOfTen {
                width: 80%;
            }
             .removeBottom { 
                border-bottom: none !important;
            }
            .printBottom {
                text-align: right;
            }
        }
	}
</style>
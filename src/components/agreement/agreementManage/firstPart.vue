<template>
  <div class="firstPartContainer"> 
	<div  v-if="tenantsShow" class="outer">
		<div class="firstBase flex">
			<div class="firstBaseLeft ">
				<div class="heightFourty between marBottom flex">
					<div class="leftFlex flex">
						<div class="leftFlex flex limitWidth">								
							<div class="title">合同编号</div><input type="text" v-model.trim="firstBlock.contractNo" placeholder="无" @change="inputChange('firstBlock','contractNo')" @focus="storeTemp('firstBlock','contractNo')">	
						</div>
                        <div class="marLeft leftFlex flex limitWidth specialTop">
                            <div class="title">合同状态</div>
                            <el-select v-model="firstBlock.agreementStatus" placeholder="请选择" @change="inputChange('firstBlock','agreementStatus')">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>                                        
						</div>
					</div>
					<div class="toRight flex">
						<RedBtn class="pinkCus" :text="'回退'" @click.native="pullBack"></RedBtn>
						<RedBtn class="blueCus" :text="'转委托'" @click.native="popSalesman('salesmanForm')"></RedBtn>
						<el-dropdown @command="handleCommand">
							<RedBtn :text="'电子合同'" class="dropCus" showArrow></RedBtn>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="a">重新生成电子合同</el-dropdown-item>
								<el-dropdown-item command="b">查看电子合同</el-dropdown-item>	
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<div class="leftFlex marBottom flex">
					<div class="title">合同类型</div><div class="content">{{  statusArr1[firstBlock.contractType] | emptyProcessor}}</div>
				</div>
				<div class="leftFlex marBottom flex">
					<div class="title">业务员</div><div class="content">{{firstBlock.salesmanName | emptyProcessor}}</div>
				</div>
				<div class="leftFlex marBottom flex">
					<div class="title">创建日期</div><div class="content">{{firstBlock.time | emptyProcessor}}</div>
				</div>
				<div class="leftFlex marBottom flex">
					<div class="title">合同最后下载时间</div><div class="content">{{firstBlock.time | emptyProcessor}}</div>
				</div>
				<div class="leftFlex marBottom flex">
					<div class="title">业务员提交时间</div><div class="content">{{firstBlock.time | emptyProcessor}}</div>
				</div>							
				<div class="leftFlex marBottom flex">
					<div class="title">前置免租月数</div>
                    <div class="content">
                        <input class="setInputHeight" type="text" @change="inputChange('firstBlock','beforeFree1')" v-model.trim="firstBlock.beforeFree1" placeholder="无"><span>月</span>
					</div>
				</div>	
				<div class="leftFlex marBottom flex">
					<div class="title">后置免租月份</div>
					<div class="content">
						<input class="setInputHeight" type="text" @change="inputChange('firstBlock','afterFree1')" v-model.trim="firstBlock.afterFree1" placeholder="无"><span>月</span>
					</div>
				</div>
				<div class="leftFlex limitWidth marBottom flex">								
					<div class="title">其他约定</div><input type="text" @change="inputChange('firstBlock','anotherPromise1')" v-model.trim="firstBlock.anotherPromise1" placeholder="无">	
				</div>
				<div class="leftFlex marBottom flex">
					<div class="title">审核人</div><div class="content">{{firstBlock.time | emptyProcessor}}</div>
				</div>
				<div class="leftFlex marBottom flex">
				<div class="title">审核时间</div><div class="content">{{firstBlock.time | emptyProcessor}}</div>
				</div>
				<div class="leftFlex marBottom flex">
				<div class="title">审核备注</div><div class="content">{{firstBlock.time | emptyProcessor}}</div>
				</div>
				<div class="repairInfoFirst flex">
                <span class="repairInfoTitle">流程</span>
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
				</div>
				<div class="secondBase flex">					
					<div class="secondBaseLeft">
							<div class="header">承租人信息&nbsp;&nbsp;<i class="iconfont icon-daibanshixiang-" @click="popTenants"></i></div>
							<div class="leftFlex marBottom flex">
								<div class="title">姓名</div><div class="content">{{secondBlock.time | emptyProcessor}}</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">联系电话</div><div class="content">{{secondBlock.time | emptyProcessor}}</div>
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title">证件类型</div>
								<el-select v-model="secondBlock.tenantsType1" placeholder="请选择" @change="inputChange('secondBlock','tenantsType1')">
								  <el-option label="区域一" value="shanghai"></el-option>
								  <el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title">证件号码</div><input type="text" v-model.trim="secondBlock.tenantsTypeNo1" placeholder="无" @change="inputChange('secondBlock','tenantsTypeNo1')">	
							</div>
						</div>
						<div class="secondBaseRight">	
							<div class="header">租金及押金</div>
							<div class="marBottom speWidth flex">
								<div class="leftFlex limitWidth flex">								
									<div class="title">起始日期</div>
									<el-date-picker
										@change="inputChange('thirdBlock','rentDate1')"			
									  v-model="thirdBlock.rentDate1"
									  type="daterange"
									  align="right"
									  unlink-panels
									  range-separator="至"
									  start-placeholder="开始日期"
									  end-placeholder="结束日期"
									  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
									</el-date-picker>
								</div>
								<div class="leftFlex secLimitWidth flex">
									<div class="title speTitle">金额</div>
									<input  type="text" v-model.trim="thirdBlock.rentMoney1" placeholder="无" @change="inputChange('thirdBlock','rentMoney1','moneyMark')">
								</div>	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title">租金金额</div><input type="text" v-model.trim="rentGold1" @change="inputChange('rentGold1','moneyMark')" placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title">押金金额</div><input type="text" v-model.trim="depositGold1" placeholder="无" @change="inputChange('depositGold1','moneyMark')">	
							</div>
							<div class="leftFlex limitWidth marBottom flex">		
								<el-select v-model="documentsType1" placeholder="请选择证件类型" @change="inputChange('documentsType1')">
								  <el-option label="区域一" value="shanghai"></el-option>
								  <el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</div>
							<div class="leftFlex limitWidth marBottom flex">
								<el-date-picker
								  v-model="partyDate1"
								  align="right"
								  type="date"
									@change="inputChange('partyDate1')"
								  placeholder="甲方交房日期"
								  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
								</el-date-picker>
							</div>
						</div>
					</div>
					<div class="thirdBase flex">					
						<div class="thirdBaseLeft">
							<div class="header">租金支付方式</div>
							<div class="leftFlex limitWidth marBottom payType flex">								
								<div class="title">支付时间</div>每
								<input type="text" v-model.trim="rentTypeMonth1" @change="inputChange('rentTypeMonth1')" placeholder="无">个月的	
								<input type="text" v-model.trim="rentTypeDay1" @change="inputChange('rentTypeDay1')" placeholder="无">日	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
                                <div class="title longTitle">甲方账户名</div><input type="text" v-model.trim="partyName1" @change="inputChange('partyName1')" placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title longTitle">甲方开户银行</div><input type="text" v-model.trim="partyBankName1" @change="inputChange('partyBankName1')" placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title longTitle">甲方银行账号</div><input type="text" v-model.trim="partyBankNo1" @change="inputChange('partyBankNo1')"  placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom payType flex">								
								<div class="title">支付周期</div>押
								<input type="text" v-model.trim="payCycleBet1" @change="inputChange('payCycleBet1')" placeholder="无">付	
								<input type="text" v-model.trim="payCyclePay1" @change="inputChange('payCyclePay1')" placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title longTitle">首次支付备注</div><input type="text" v-model.trim="payNote1" placeholder="无" @change="inputChange('payNote1')">	
							</div>
						</div>
						<div class="thirdBaseRight">	
							<div class="header">代理期限</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title">起始日期</div>
								<el-date-picker
								  v-model="agentDate1"
									@change="inputChange('agentDate1')"
								  type="daterange"
								  align="right"
								  unlink-panels
								  range-separator="至"
								  start-placeholder="开始日期"
								  end-placeholder="结束日期"
								  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
								</el-date-picker>
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title">总计月数</div><input type="text" v-model.trim="agengMonths1" placeholder="无" @change="inputChange('agengMonths1')">	
							</div>						
							<div class="leftFlex limitWidth marBottom flex">
								<el-date-picker
								  v-model="agentDeliveryDate1"
									@change="inputChange('agentDeliveryDate1')"
								  align="right"
								  type="date"
								  placeholder="甲方交房日期"
								  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
								</el-date-picker>
							</div>
						</div>

					</div>
				</div>
				<div v-else class="outer">
					<div class="firstBase flex">
						<div class="firstBaseLeft ">
							<div class="heightFourty between marBottom flex">
								<div class="leftFlex flex">
									<div class="leftFlex limitWidth flex">								
										<div class="title">合同编号</div><input type="text" v-model.trim="contractNumber2" placeholder="无" @change="inputChange('contractNumber2')" >	
									</div>
                                    <div class="marLeft leftFlex limitWidth specialTop flex">
										<div class="title">合同状态</div>
                                        <el-select v-model="paymentType" placeholder="请选择证件类型" @change="inputChange('paymentType')">
                                          <el-option label="区域一" value="shanghai"></el-option>
                                          <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>                                        
									</div>
								</div>
								<div class="toRight flex">
									<RedBtn class="pinkCus" :text="'回退'"></RedBtn>
									<RedBtn class="blueCus" :text="'转委托'" @click.native="popSalesman('salesmanForm')"></RedBtn>
									<el-dropdown @command="handleCommand">
										<RedBtn :text="'电子合同'" class="dropCus" showArrow></RedBtn>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item command="a">重新生成电子合同</el-dropdown-item>
											<el-dropdown-item command="b">查看电子合同</el-dropdown-item>	
										  </el-dropdown-menu>
									</el-dropdown>
								</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">合同类型</div><div class="content">出租续约</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">业务员</div><div class="content">朱伟</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">创建日期</div><div class="content">2018-09-03 10:44:29</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">合同最后下载时间</div><div class="content">2018-09-03 10:44:29</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">业务员提交时间</div><div class="content">2018-09-03 10:44:29</div>
							</div>
							<div class="leftFlex marBottom limitWidth specialTop flex">	
								<div class="title">打款方式</div>
								<el-select v-model="paymentType" placeholder="请选择证件类型" @change="inputChange('paymentType')">
								  <el-option label="区域一" value="shanghai"></el-option>
								  <el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">前置免租月数</div><div class="content">
									<input class="setInputHeight"  @change="inputChange('beforeFree2')" v-model.trim="beforeFree2" placeholder="无"><span>月</span>
								</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">后置免租月份</div><div class="content">
									<input class="setInputHeight"  @change="inputChange('afterFree2')" v-model.trim="afterFree2" placeholder="无"><span>月</span>
								</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">前置免租天数</div><div class="content">
									<input class="setInputHeight"  @change="inputChange('afterFreeDay2')" v-model.trim="afterFreeDay2" placeholder="无"><span>天</span>
								</div>
							</div>	
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title">其他约定</div><input type="text"  placeholder="无" @change="inputChange('anotherAgreement2')" v-model.trim="anotherAgreement2">	
							</div>                            
                            <div class="repairInfoFirst flex">
                                <span class="repairInfoTitle">流程</span>
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
					</div>
					<div class="secondBase flex">					
						<div class="secondBaseLeft">
							<div class="header">委托人信息&nbsp;&nbsp;<i class="iconfont icon-daibanshixiang-" @click="popClient('anotherTenantsForm')"></i></div>
							<div class="leftFlex marBottom flex">
								<div class="title">姓名</div><div class="content">2018-09</div>
							</div>
							<div class="leftFlex marBottom flex">
								<div class="title">联系电话</div><div class="content">12345678901</div>
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title">证件类型</div>
								<el-select v-model="tenantsType2" @change="inputChange('tenantsType2')" placeholder="请选择证件类型">
								  <el-option label="区域一" value="shanghai"></el-option>
								  <el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
										<div class="title">证件号码</div><input type="text" v-model.trim="tenantsTypeNo2" placeholder="无" @change="inputChange('tenantsTypeNo2')">	
							</div>
						</div>
						<div class="secondBaseRight">	
							<div class="header">收益人信息&nbsp;&nbsp;<i class="iconfont icon-daibanshixiang-" @click="popBeneficiary('tenantsForm')"></i></div>							
							<div class="leftFlex  marBottom flex">								
										<div class="title">姓名</div><div class="content">12345678901</div>
							</div>
							<div class="leftFlex  marBottom flex">								
										<div class="title">联系电话</div><div class="content">12345678901</div>
							</div>							
						</div>
					</div>
					<div class="thirdBase flex">					
						<div class="thirdBaseLeft">
							<div class="header">租金及押金</div>
							<div class="marBottom speWidth flex">
								<div class="leftFlex limitWidth flex">								
									<div class="title">出租期限</div>
									<el-date-picker
									  v-model="rentTerm"
										@change="inputChange('rentTerm')"
									  type="daterange"
									  align="right"
									  unlink-panels
									  range-separator="至"
									  start-placeholder="开始日期"
									  end-placeholder="结束日期"
									  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
									</el-date-picker>
								</div>
								<div class="leftFlex secLimitWidth flex">
									<div class="title speTitle">金额</div>
									<input  type="text" v-model.trim="rentMoney2" @change="inputChange('rentMoney2','moneyMark')" placeholder="无">
								</div>	
							</div>	
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title ">租金总额</div><input type="text" v-model.trim="rentTotal2" @change="inputChange('rentTotal2','moneyMark')"  placeholder="无">	
							</div>	
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title ">押金金额</div><input type="text" v-model.trim="depositGold2" placeholder="无" @change="inputChange('depositGold2','moneyMark')">	
							</div>
							<div class="leftFlex limitWidth marBottom specialSetWidth flex">								
								<div class="title longTitle">乙方是否向甲方垫付押金</div>
								<el-select v-model="advanceDeposit" @change="inputChange('advanceDeposit')" placeholder="请选择证件类型">
								  <el-option label="区域一" value="shanghai"></el-option>
								  <el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title longTitle">乙方划入甲方账户日期</div>	
								<el-date-picker
								  v-model="incomeDate"
									@change="inputChange('incomeDate')"
								  align="right"
								  type="date"
								  placeholder="日期"
								  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
								</el-date-picker>
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title ">违约金倍数</div><input type="text" v-model.trim="penalty" placeholder="无" @change="inputChage('penalty',penalty)">	
							</div>
						</div>
						<div class="thirdBaseRight">
							<div class="header">租金支付方式</div>
							<div class="leftFlex limitWidth marBottom payType flex">								
								<div class="title">支付时间</div>每
								<input type="text"  v-model.trim="rentTypeMonth2" @change="inputChange('rentTypeMonth2')" placeholder="无">个月的	
								<input type="text"  v-model.trim="rentTypeDay2" @change="inputChange('rentTypeDay2')" placeholder="无">日	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title longTitle">甲方账户名</div><input type="text" v-model.trim="partyName2" @change="inputChange('partyName2')" placeholder="无">	
							</div>	
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title longTitle">甲方开户行</div><input type="text"v-model.trim="partyBankName2" @change="inputChange('partyBankName2')"  placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title longTitle">甲方银行账号</div><input type="text" v-model.trim="partyBankNo2" @change="inputChange('partyBankNo2')" placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom payType flex">								
								<div class="title">支付周期</div>押
								<input type="text" v-model.trim="payCycleBet2" @change="inputChange('payCycleBet2')" placeholder="无">付	
								<input type="text" v-model.trim="payCyclePay2" @change="inputChange('payCyclePay2')"  placeholder="无">	
							</div>							
						</div>
					</div>
					<div class="fourthBase flex">					
						<div class="fourthBaseLeft">
							<div class="header">代理期限</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title">起始日期</div>
								<el-date-picker
								  v-model="agentDate2"
         							@change="inputChange('agentDate2')"
								  type="daterange"
								  align="right"
								  unlink-panels
								  range-separator="至"
								  start-placeholder="开始日期"
								  end-placeholder="结束日期"
								  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
								</el-date-picker>
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title ">总计月数</div><input type="text" v-model.trim="agengMonths2" 
																	 @change="inputChange('agengMonths2')" placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title">甲方交房日期</div>
								<el-date-picker
								  v-model="agentDeliveryDate2"
         							@change="inputChange('agentDeliveryDate2')" 
								  align="right"
								  type="date"
								  placeholder="日期"
								  :picker-options="pickerOptions2" value-format="yyyy-MM-dd">
								</el-date-picker>
							</div>
						</div>
						<div class="thirdBaseRight">
							<div class="header">预付款</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title ">预付款</div><input type="text" v-model.trim="prepaid" @change="inputChange('prepaid','moneyMark')" placeholder="无">	
							</div>
							<div class="leftFlex limitWidth marBottom flex">								
								<div class="title ">备注</div><input type="text" v-model.trim="prepaidNote" @change="inputChange('prepaidNote')" placeholder="无">	
							</div>
						</div>	
					</div>
				</div>	
	  
	  <el-dialog title="电子合同" :visible.sync="pdfVisible" class="diagCon pdfDiagCon" :close-on-click-modal="false" >
			  <div class="controlPanel flex">
				  <div class="topRight flex">
					  <el-tooltip content="打印" placement="bottom" effect="light">
						  <div class="tableTopRightSp" @click="printPdf">
							  <i class="icon-dayin- iconfont"></i>
							</div>
					   </el-tooltip>
					  <el-tooltip content="下载" placement="bottom" effect="light">
						   <div class="tableTopRight" @click="downLoadNow">
								<i class="iconfont icon-xiazai-" ></i>
							</div>
					   </el-tooltip>
				  </div>
			  </div>
			  <div class="pdfContainer">
				  <pdf :src="pdfSrc" ref="pdf"  :page="page" :rotate="0"  @progress="process($event)" @error="error" @num-pages="numPageFun" @link-clicked="page = $event" style="width:99.5%"></pdf>  
			  </div>
			  <div class="pagOuter">
					<el-pagination
					  @current-change="handleCurrentChange"
					  :current-page="current"
					  :page-sizes="[10, 20, 30, 50]"
					  :page-size="size"
					  layout="total, prev, pager, next, jumper"
					  :total="total">
					</el-pagination>
				</div>
		  </el-dialog>

	  <el-dialog title="编辑" :visible.sync="editClientVisible" class="diagCon  allDiagCon" :close-on-click-modal="false" >
			<el-form :model="anotherTenantsForm"  label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="输入手机号">
						<el-input v-model="anotherTenantsForm.no"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'查询'" @click.native="confirmClient('anotherTenantsForm')"></RedBtn>
				</div>
			</el-form>
		</el-dialog>

	  <el-dialog title="编辑" :visible.sync="editClientShow" class="diagCon higherDiagCon" :close-on-click-modal="false">
			<el-form :model="editClientForm" :rules="editClientRules" ref="editClientForm" label-width="130px">
				<div class="scrollContainer">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="手机号" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="身份证号码" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="微信号" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="地址" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="收件人" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="邮政编码" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="联系电话" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡号" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡银行" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡支行" prop="name">
						<el-input v-model="editClientForm.name"></el-input>
					  </el-form-item>
					 <el-form-item label="修改委托人/收益人" >
						  <el-select v-model="editClientForm.type" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						  </el-select>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveClient('editClientForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelClient('editClientForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>	

	  <el-dialog title="业务员号码" :visible.sync="salesmanVisible" class="diagCon  allDiagCon" :close-on-click-modal="false">
			<el-form :model="salesmanForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="业务员号码">
						<el-input v-model="salesmanForm.no"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">					
					<RedBtn  @click.native="confirmSalesman('salesmanForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelSalesman('salesmanForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>	

	  <el-dialog title="编辑" :visible.sync="editBeneficiaryVisible" class="diagCon  allDiagCon" :close-on-click-modal="false">
			<el-form :model="tenantsForm"  ref="tenants" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="输入手机号">
						<el-input v-model="tenantsForm.no"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'查询'" @click.native="confirmBeneficiary('tenantsForm')"></RedBtn>
				</div>
			</el-form>
		</el-dialog>	  

	  <el-dialog title="编辑" :visible.sync="editBeneficiaryShow" class="diagCon higherDiagCon" :close-on-click-modal="false">
			<el-form :model="editBeneficiaryForm" :rules="editBeneficiaryRules" ref="editBeneficiaryForm" label-width="130px">
				<div class="scrollContainer">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="手机号" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="身份证号码" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="微信号" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="地址" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="收件人" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="邮政编码" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="联系电话" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡号" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡银行" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡支行" prop="name">
						<el-input v-model="editBeneficiaryForm.name"></el-input>
					  </el-form-item>
					 <el-form-item label="修改委托人/收益人" >
						  <el-select v-model="editBeneficiaryForm.type" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						  </el-select>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveBeneficiary('editBeneficiaryForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelBeneficiary('editBeneficiaryForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog> 

	  <el-dialog  title="确认修改"	class="firstDiagCon"  :visible.sync="dialogChangeVisible" :close-on-click-modal="false">
			  <span>确认修改？</span>
			  <span slot="footer" class="dialog-footer">
				  <div class="diagBtnConSpecial">
						<RedBtn @click.native="confirmDialogVisible(inputFormBridge,inputItemBridge)"></RedBtn>
						<GreyBtn class="marLeft" @click.native="cancelDialogVisible(inputFormBridge,inputItemBridge)"></GreyBtn>
					</div>
			  </span>
		</el-dialog>

	  <el-dialog title="编辑" :visible.sync="dialogVisible2" class="diagCon  allDiagCon" :close-on-click-modal="false">
			<el-form :model="phoneForm"  ref="tenants" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="输入手机号">
						<el-input v-model="phoneForm.no"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'查询'" @click.native="confirmDialogVisible2('phoneForm')"></RedBtn>
				</div>
			</el-form>
		</el-dialog>	

	  <el-dialog title="编辑" :visible.sync="editShow2" class="diagCon higherDiagCon" :close-on-click-modal="false">
			<el-form :model="lesseeForm" ref="lesseeForm" :rules="lesseeRules"  label-width="130px">
				<div class="scrollContainer">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="lesseeForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="lesseeForm.phone"></el-input>
					  </el-form-item>
					<el-form-item label="身份证号码" prop="identificationNo">
						<el-input v-model="lesseeForm.identificationNo"></el-input>
					  </el-form-item>
					<el-form-item label="微信号" prop="wxNo">
						<el-input v-model="lesseeForm.wxNo"></el-input>
					  </el-form-item>
					<el-form-item label="地址" prop="address">
						<el-input v-model="lesseeForm.address"></el-input>
					  </el-form-item>
					<el-form-item label="收件人" prop="recipient">
						<el-input v-model="lesseeForm.recipient"></el-input>
					  </el-form-item>
					<el-form-item label="邮政编码" prop="postalCode">
						<el-input v-model="lesseeForm.postalCode"></el-input>
					  </el-form-item>
					<el-form-item label="联系电话" prop="contactNumber">
						<el-input v-model="lesseeForm.contactNumber"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡号" prop="bankCardNo">
						<el-input v-model="lesseeForm.bankCardNo"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡银行" prop="bankName">
						<el-input v-model="lesseeForm.bankName"></el-input>
					  </el-form-item>
					<el-form-item label="绑定银行卡支行" prop="bankBranch">
						<el-input v-model="lesseeForm.bankBranch"></el-input>
					  </el-form-item>
					 <el-form-item label="修改委托人/收益人" >
						  <el-select v-model="lesseeForm.principal" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						  </el-select>
					  </el-form-item>
				</div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="saveEdit2('lesseeForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEdit2('lesseeForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
  </div>
</template>
<script>
    import pdf from 'fixprintvue-pdf';
	import { required,numeric,helpers,maxValue,minValue,minLength,integer,decimal } from 'vuelidate/lib/validators';	
	const strNum = helpers.regex('alpha', /^[a-zA-Z0-9]*$/);
    export default {
		components: {
			pdf
		},
		validations: { 
            firstBlock:{
                contractNo:{
                    required,
				    strNum
                },
                agreementStatus:{
                    required
                },
                beforeFree1:{
                    required,
                    integer,
                    minValue:minValue(0),
                },
                afterFree1:{
                    required,
                    integer,
                    minValue:minValue(0),
                },
                anotherPromise1:{
                    required,
                },
            },
            secondBlock:{
                tenantsType1:{
                    required,
                },
                tenantsTypeNo1:{
                    required,
                    strNum
                },
            },
            thirdBlock:{
                rentDate1:{
                    required,
                },
                rentMoney1:{
                    required,
                    decimal,
                    minValue:minValue(0),
                },
            },

            
            
            
            phoneForm:{
              no:{
                  required,
                  numeric,
                  minLength:minLength(7)
              }  
            },         
//            tenantsForm:{
//                no:{
//                  required,
//                  numeric,
//                  minLength:minLength(7)
//              }  
//            },
//            anotherTenantsForm:{
//                no:{
//                  required,
//                  numeric,
//                  minLength:minLength(7)
//              }  
//            },
//            salesmanForm:{
//                no:{
//                  required,
//                  numeric,
//                  minLength:minLength(7)
//              } 
//            },
//			contractNumber1:{
//				required,
//				strNum
//			},
//			anotherPromise1:{
//				required,
//			},
//			rentGold1:{
//				required,
//				positiveNum
//			},
//			depositGold1:{
//				required,	
//				positiveNum
//			},
//			documentsType1:{
//				required,
//			},
//			partyDate1:{
//				required,
//			},
//			rentTypeMonth1:{
//				required,
//				numeric
//			},
//			rentTypeDay1:{
//				required,
//				minValue:minValue(1),
//				maxValue:maxValue(31),
//			},
//			partyName1:{
//				required,
//				strNum
//			},
//			partyBankName1:{
//				required,
//			},
//			partyBankNo1:{
//				required,
//				numeric
//			},
//			payCycleBet1:{
//				required,
//				numeric
//			},
//			payCyclePay1:{
//				required,
//				numeric
//			},
//			payNote1:{
//				required,
//			},
//			agentDate1:{
//				required,
//			},
//			agengMonths1:{
//				required,
//				numeric
//			},
//			agentDeliveryDate1:{
//				required,
//			},
//			contractNumber2:{
//				required,
//				strNum
//			},
//			paymentType:{
//				required,
//			},
//			beforeFree2:{
//				required,
//				numeric,
//				minValue:minValue(1),
//			},
//			afterFree2:{
//				required,
//				numeric,
//				minValue:minValue(1),
//			},
//			afterFreeDay2:{
//				required,
//				numeric,
//				minValue:minValue(1),
//			},
//			anotherAgreement2:{
//				required,
//				strNum
//			},
//			tenantsType2:{
//				required,
//			},
//			tenantsTypeNo2:{
//				required,
//				strNum
//			},
//			rentTerm:{
//				required,
//			},
//			rentMoney2:{
//				required,
//				positiveNum
//			},
//			rentTotal2:{
//				required,
//				positiveNum
//			},
//			depositGold2:{
//				required,
//				positiveNum
//			},
//			advanceDeposit:{
//				required,
//			},
//			incomeDate:{
//				required,
//			},
//			penalty:{
//				required,
//				numeric
//			},
//			rentTypeMonth2:{
//				required,
//				numeric
//			},
//			rentTypeDay2:{
//				required,
//				minValue:minValue(1),
//				maxValue:maxValue(31),
//			},
//			partyName2:{
//				required,
//			},
//			partyBankName2:{
//				required,
//			},
//			partyBankNo2:{
//				required,
//				numeric
//			},
//			payCycleBet2:{
//				required,
//				numeric
//			},
//			payCyclePay2:{
//				required,
//				numeric
//			},
//			agentDate2:{
//				required,
//			},
//			agengMonths2:{
//				required,
//				numeric
//			},
//			agentDeliveryDate2:{
//				required,
//			},
//			prepaid:{
//				required,
//				positiveNum
//			},
//			prepaidNote:{
//				required,
//			},
		},
        data(){
			return {
                anotherTenantsForm:{
                    no:''
                },
                remarkArr:[
					{
						description: "备注超级多啊备注超级多啊备注超级多啊备注超级多啊备注超级多啊备注超级多啊备注超级多啊",
						gmtCreate: "2019-03-29",
						name: "根"
					},				
				],
                lesseeRules:{
                    name:[                        
                    ],
                    phone:[                        
                    ],
                    identificationNo:[                        
                    ],
                    wxNo:[                        
                    ],
                    address:[                        
                    ],
                    recipient:[                        
                    ],
                    postalCode:[                        
                    ],
                    contactNumber:[                        
                    ],
                    bankCardNo:[                        
                    ],
                    bankName:[                        
                    ],
                    bankBranch:[                        
                    ],
                },
                lesseeForm:{
                    name:'',
                    phone:'',
                    identificationNo:'',
                    wxNo:'',
                    address:'',
                    recipient:'',
                    postalCode:'',
                    contactNumber:'',
                    bankCardNo:'',
                    bankName:'',
                    bankBranch:'',
                    principal:'',
                },
                inputFormBridge:null,
                inputItemBridge:null,
                phoneForm:{},
                tempStoreData:'',
                localToServerParams:{
                    firstBlock:{    
                        contractNo:'contractNo',
                        agreementStatus:'pagreementStatus',
                        beforeFree1:'pbeforeFree1',
                        afterFree1:'pafterFree1',
                        anotherPromise1:'panotherPromise1'
                    },   
                    secondBlock:{
                        tenantsType1:'ptenantsType1',
                        tenantsTypeNo1:'ptenantsTypeNo1',
                    },
                    thirdBlock:{
                        rentDate1:'prentDate1',
                        rentMoney1:'prentMoney1'
                    },
                    fourthBlock:{
                    },
                    fifthBlock:{
                    },
                    sixthBlock:{
                    },
                },
				dialogChangeVisible:false,											
				editBeneficiaryForm:{                    
                },
				editBeneficiaryRules:{                    
                },
				salesmanForm:{},
				editClientVisible:false,
				size:1,
				total:1,
				current:1,
				loadedRatio:0,
				page: 1,
				pdfVisible:false,
				pdfSrc:'',
				tenantsShow:true,
                firstBlock:{},   
                secondBlock:{},
                thirdBlock:{},
                fourthBlock:{},
                fifthBlock:{},
                sixthBlock:{},			
				pickerOptions2: this.DatePick.range, 
				rentGold1:'',				
				depositGold1:'',				
				documentsType1:'',				
				partyDate1:'',
				rentTypeMonth1:'',				
				rentTypeDay1:'',				
				partyName1:'',				
				partyBankName1:'',				
				partyBankNo1:'',				
				payCycleBet1:'',				
				payCyclePay1:'',				
				payNote1:'',				
				agentDate1:'',				
				agengMonths1:'',				
				agentDeliveryDate1:'',				
				contractNumber2:'',				
				paymentType:'',
				beforeFree2:'',
				afterFree2:'',				
				afterFreeDay2:'',			
				anotherAgreement2:'',				
				tenantsType2:'',			
				tenantsTypeNo2:'',			
				rentTerm:'',
				rentMoney2:'',
				rentTotal2:'',
				depositGold2:'',
				advanceDeposit:'',
				incomeDate:'',
				penalty:'',
				rentTypeMonth2:'',
				rentTypeDay2:'',
				partyName2:'',
				partyBankName2:'',
				partyBankNo2:'',
				payCycleBet2:'',
				payCyclePay2:'',
				agentDate2:'',
				agengMonths2:'',
				agentDeliveryDate2:'',
				prepaid:'',
				prepaidNote:'',
				editClientShow:false,
				editClientForm:{},
				editClientRules:{},
				salesmanVisible:false,
				editBeneficiaryVisible:false,
				editBeneficiaryShow:false,
				tenantsForm:{},
				dialogVisible2:false,
				editShow2:false,
                statusArr1:[],
			}
		},
		mounted(){	
            this.getAgreementInfo();
            this.initStatusArr1();
		},
		methods:{	
            initStatusArr1(){
                let obj = {};
                this.StateData.agreementContractTypeArr.forEach(ele=>{
                    obj[ele.value] = ele.label;
                });
                this.statusArr1 = obj; 
            },
            getAgreementInfo(){
                this.Digital.aesDecrypt.bind(this)();
                let data1 = {
                    id:this.routeQuery.id
                };             
                this.ApiLists[10028](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { message,data,success  } = layer1;
                    if( success ){
//                        console.log(data);
                        this.firstBlock = data;
                    }else{
                       this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            pullBack(){
                this.$message({
                  message: '回退弹出。',
                  type: 'success'
                });
            },
			saveEdit2( str ){				
                console.log( str );
                console.log( this[str] );  
                this.$refs[str].validate((valid)=>{
                   console.log(' 追踪到这里 ',valid);
                });   
                this.$refs[str].resetFields();    
                this.editShow2 = false;
			},
			cancelEdit2( str ){
				this.editShow2 = false;
                this.$refs[str].resetFields();                
			},
			confirmDialogVisible2(str){
                this.$v[str].no.$touch();                
                let judge = this.$v[str].no.$error;
                console.log( judge );
                if( judge ){
                    this.$message.error('输入格式错误。');
                    this[str].no = '';
                }else{
                    this.dialogVisible2 = false;
				    this.editShow2 = true;  
                }    
			},	
			inputChange(form,item,moneyMark){   
                console.log( 'inputChange',form,item,this[form][item] );
                let ableValidate = this.$v[form][item];   
                if( ableValidate ){
                    if( moneyMark ){
                        this[form][item] = this.Digital.roundValue(+parseFloat(this[form][item]),2);
                        ableValidate.$touch();
                        let error = ableValidate.$error;
                        console.log( 'error',error );
                        if( !error ){
                            this.inputFormBridge = form;
                            this.inputItemBridge = item;
                            this.dialogChangeVisible = true;    
                            
                        }else{
                            this.$message.error('输入格式错误。');
                            this[form][item] = '';
                        }
                        
                        
                        
                        
                    }else{
                        ableValidate.$touch();
                        let error = ableValidate.$error;
                        console.log( 'error',error );
                        if( !error ){
                            this.inputFormBridge = form;
                            this.inputItemBridge = item;
                            this.dialogChangeVisible = true;    
                            
                        }else{
                            this.$message.error('输入格式错误。');
                            this[form][item] = '';
                        }
                        
                        
                        
                    }
                }else{
                    if( moneyMark ){
                        this[form][item] = this.Digital.roundValue(+parseFloat(this[form][item]),2);
                        
                    }else{
                       
                    }
                }
			},	
            storeTemp(form,item){
                this.tempStoreData = this[form][item];
            },
			confirmDialogVisible(form,item){
				this.dialogChangeVisible = false;      
                this.Success.saveSuccess();
                console.log(form,item,this[form][item],this.localToServerParams[form][item]);
			},
			cancelDialogVisible(form,item){
				this.dialogChangeVisible = false;   
                this[form][item] = this.tempStoreData;
			},
			popTenants(){
				this.dialogVisible2 = true;
                this.phoneForm = {};
			},	
			saveBeneficiary(str) {
				this.editBeneficiaryShow = false;
                this.$refs[str].validate((valid)=>{
                   console.log('',valid);
                });               
			},
			cancelBeneficiary(str) {
				this.editBeneficiaryShow = false;
                this.$refs[str].resetFields(); 
                console.log('now',str);
			},
			saveClient(str){                
                 this.$refs[str].validate((valid)=>{
                   console.log('',valid);
                });   
                this.$refs[str].resetFields();    
                this.editClientShow = false;                
			},
			cancelClient(str){
				this.editClientShow = false;
                this.$refs[str].resetFields(); 
                console.log('now',str);
			},			
			confirmClient(str){	
                this.$v[str].no.$touch();                
                let judge = this.$v[str].no.$error;
                console.log( judge );
                if( judge ){
                    this.$message.error('输入格式错误。');
                    this[str].no = '';
                }else{
                    this.editClientVisible = false;
				    this.editClientShow = true;
                }                 
			},
			error(err){
				console.log(err);	
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			numPageFun($event) {
                if( $event ){
                    this.numPages = $event;
                    console.log($event);
                    this.current = this.page;
				    this.total = this.numPages;
                }
			},
			process($event) {
				this.loadedRatio = $event;
				console.log("process", $event);
			},
			downLoadNow(){				
			},
			printPdf() {
				this.$refs.pdf.print();
			},		
			popClient(str){
				this.editClientVisible = true;
                this[str] = {};
			},
			popBeneficiary(str){
				this.editBeneficiaryVisible = true;
                this[str] = {};
			},
			confirmBeneficiary(str) {      
                this.$v[str].no.$touch();                
                let judge = this.$v[str].no.$error;
                console.log( judge );
                if( judge ){
                    this.$message.error('输入格式错误。');
                    this[str].no = '';
                }else{
                    this.editBeneficiaryVisible = false;
				    this.editBeneficiaryShow = true;
                }   
			},            
			popSalesman(str){
                this[str] = {};
				this.salesmanVisible = true;
                console.log( str );
			},
			cancelSalesman(str) {
				this.salesmanVisible = false;
                console.log( str );                
			},
			confirmSalesman(str) {
                console.log( str );
                this.$v[str].no.$touch();                
                let judge = this.$v[str].no.$error;
                console.log( judge );
                if( judge ){
                    this.$message.error('输入格式错误。');
                    this[str].no = '';
                }else{
                    this.salesmanVisible = false;
                }  
			},            
			handleCommand(command) {
				switch (command) {
					case "a":
						this.$message({
							message: "生成pdf成功。",
							type: "success"
						});
						break;
					case "b":
						this.pdfVisible = true;
                        this.$nextTick(()=>{
                            this.pdfSrc = pdf.createLoadingTask("md.pdf");                            
                        });                        
						break;
				}
			},
		},
    }
</script>
<style scoped lang="scss">
    .repairInfoFirst {
		justify-content: flex-start;
        margin-bottom: 30px;
        margin-top: 30px;
    }
    .repairInfoTitle {
		font-weight: 600;
		font-size: 16px;
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
    .marLeft {
        margin-left: 20px;
    }
	.span {
		background-color: firebrick;
		color: #fff;
		cursor: pointer;
	}
	.firstBase {
		flex-wrap: nowrap;
		justify-content: space-between;
		margin-bottom: 40px;
		.heightFourty {
			height: 40px;
		}
		.between {
			flex-wrap: nowrap;
			justify-content: space-between;
		}
		.toRight {
			flex-wrap: nowrap;
			justify-content: flex-end;
		}
		.firstBaseLeft {
			width: 100%;
		}
	}
	.pinkCus {
		background-color: #ffecec;
		color: #fc6565;
		box-shadow: none;
	}
	.blueCus {
		margin-left: 20px;
		margin-right: 20px;
		background-color: #eafafe;
		color: #07aedb;
		box-shadow: none;
	}
	.dropCus {
		background-color: #fef6e9;
		color: #f9aa2b;
		box-shadow: none;
	}
	.marBottom {
		margin-bottom: 16px;
	}
	.leftFlex {
		flex-wrap: nowrap;
		justify-content: flex-start;
		.speTitle {
			width: 30px !important;
		}
		.title {
			color: #a4aabc;
			font-size: 13px;
			width: 60px;
			margin-right: 10px;
			margin-left: 10px;
		}
	}
	.limitWidth {
		width: 320px;
		border: 2px solid #efeef3;
		height: 40px;
		box-sizing: border-box;
		input {
			border: none;
			height: 34px;
			width: 200px;
		}
	}
	.content {
		color: #2a2f48;
		font-size: 14px;
		input {
			width: 40px;
			margin-right: 10px;
			border: 1px solid #efeef3;
			text-align: center;
		}
	}
	.secondBase {
		flex-wrap: nowrap;
		justify-content: flex-start;
		margin-bottom: 40px;
		.header {
			font-size: 16px;
			color: #2a2f48;
			font-weight: 600;
			margin-bottom: 20px;
			.iconfont {
				color: $mainRed;
				font-weight: normal !important;
				cursor: pointer;
			}
		}
		.secondBaseLeft {
			width: 50%;
		}
		.secondBaseRight {
			width: 50%;
		}
	}
	.thirdBase {
		flex-wrap: nowrap;
		justify-content: flex-start;
		.header {
			font-size: 16px;
			color: #2a2f48;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.thirdBaseLeft {
			width: 50%;
		}
		.thirdBaseRight {
			width: 50%;
		}
	}
	.fourthBase {
		margin-top: 40px;
		flex-wrap: nowrap;
		justify-content: flex-start;
		.header {
			font-size: 16px;
			color: #2a2f48;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.fourthBaseLeft {
			width: 50%;
		}
		.thirdBaseRight {
			width: 50%;
		}
	}
	.speWidth {
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.secLimitWidth {
		margin-left: 20px;
		width: 150px;
		border: 2px solid #efeef3;
		height: 40px;
		box-sizing: border-box;
		input {
			border: none;
			height: 34px;
			width: 70px;
		}
	}
	.longTitle {
		text-align: center;
		width: 80px !important;
		margin-left: 0 !important;
	}
	.payType {
		font-size: 14px;
		input {
			width: 30px !important;
			text-align: center;
			border: 1px solid #efeef3 !important;
		}
	}
	.setInputHeight {
		height: 30px;
	}
	.controlPanel {
		flex-wrap: nowrap;
		justify-content: flex-end;
	}
	.topRight {
		height: 40px;
		flex-wrap: nowrap;
		justify-content: flex-end;
		margin-bottom: 10px;
	}
	.pdfContainer {
		overflow-y: scroll;
		height: 500px;
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
		margin-left: 20px;
		margin-right: 20px;
	}
	.tableTopRightSp {
		height: 30px;
		width: 30px;
		border-radius: 15px;
		line-height: 30px;
		text-align: center;
		color: #fff;
		margin-left: 20px;
		background-color: #2a2f48 !important;
		box-shadow: 0px 2px 10px 5px #dadbe1 !important;
		cursor: pointer;
	}
	.pagOuter {
		text-align: center;
	}
</style>
<style  lang="scss">
	.firstDiagCon {
        .el-dialog {
            width: 540px;
            height: 210px !important;
        }		
		.scrollContainer {
		  height: 70px !important;
		}
		.diagBtnConSpecial {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-content: center;
            align-items: center;
		}
	}
	.secondBaseRight {
		.el-select {
			width: 100%;
		}
	}
	.pdfDiagCon {
		.el-dialog {
			width: 1100px !important;
			height: 650px;
		}
		.el-dialog__body {
			padding: 0 !important;
		}
		.pagOuter {
			margin-top: 10px;
		}
	}
	.diagCon {
		.el-dialog__body {
			padding: 30px 20px;
		}
	}
	.firstPartContainer {
		.el-date-editor--daterange.el-input__inner {
			width: 230px !important;
		}		
		.outer {
			.el-input__inner {
				border: none !important;
				height: 36px;
			}
		}
		.diagCon {
			.el-dialog {
				width: 540px;
			}
			.el-select {
				width: 100%;
			}
		}
		.allDiagCon {
			.el-input__inner {
				border: 1px solid #dcdfe6;
				height: 36px;
			}
			.el-dialog {
				height: 220px;
			}
			.scrollContainer {
				height: 70px !important;
			}
			.diagBtnCon {
				display: flex;
				flex-direction: row;
				align-content: center;
				align-items:center;
				justify-content: flex-end;
			}
		}
		.higherDiagCon {
			.el-dialog {
				height: 550px;
				.scrollContainer {
					height: 370px;
					overflow-y: scroll;
				}
				.diagBtnCon {
					margin-top: 30px;
					display: flex;
					flex-direction: row;
					align-content: center;
					align-items: center;
					justify-content: flex-end;
				}
			}
		}
	}
</style>
<template>
  <div class="deliveryOrderDetail">	  
	    <div class="tableShow" v-show="tableShow">
                  <div id="deliveryOrderDetailPrintContainer" ref="easyPrint">                      
                      <table>
                          <caption class="tablePrintHeader">配送单 （出租）</caption>
                          <tr>
                              <td colspan="8">基本信息</td>
                            </tr>
                            <tr>
                                <td>合同号</td>
                                <td>usgywerwerfh</td>
                                <td>登记人</td>
                                <td>fsdfsdfsd</td>
                                <td >登记时间</td>
                                <td colspan="3"></td>
                            </tr>
                            <tr>
                                <td>审核人</td>
                                <td></td>
                                <td>审核时间</td>
                                <td></td>
                                <td>完成时间</td>
                                <td colspan="3"></td>
                            </tr>
                            <tr>
                                <td>小区</td>
                                <td colspan="3">sdfhsjdhfjshdjfs</td>
                                <td>地址</td>
                                <td colspan="3">fsdfsdfsdfsdf</td>
                            </tr>
                            <tr>
                                <td >业务员</td>
                                <td class="specialOne">sdfsdfsdfs</td>
                                <td >业务员电话</td>
                                <td class="specialOne">sdfsdf</td>
                                <td >租客</td>
                                <td class="specialOne">sdfsdf</td>
                                <td >租客电话</td>
                                <td class="specialOne">sdfsdf</td>
                            </tr>
                            <tr>
                                <td>二次添置理由</td>
                                <td colspan="7"></td>                                
                            </tr>
                            <tr>
                                <td  class="removeBottom">备注</td>
                                <td  class="removeBottom" colspan="7"></td>                                
                            </tr>                          
                        </table>  
                      <table>
                          <td colspan="10">原有物资</td>
                          <tr>
                              <td style="width:10%">序号</td>
                              <td style="width:10%">物品名称</td> 
                              <td style="width:7%">新旧程度</td> 
                              <td style="width:10%">规格型号</td> 
                              <td style="width:10%">品牌</td>                               
                              <td style="width:10%">产品类型</td>
                              <td style="width:10%">数量</td> 
                              <td style="width:10%">房东承担</td> 
                              <td style="width:10%">价格</td> 
                              <td style="width:13%">备注</td>
                            </tr>
                            <template v-for="val in 2">                                
                                <tr >
                                    <td  class="removeBottom">{{val}}</td>
                                    <td  class="removeBottom">hello</td> 
                                    <td  class="removeBottom">新</td> 
                                    <td  class="removeBottom">erwerwsdfsdasd345</td> 
                                    <td  class="removeBottom">手动阀</td>                               
                                    <td  class="removeBottom">阿萨萨撒旦萨撒旦发</td>
                                    <td  class="removeBottom">1</td> 
                                    <td  class="removeBottom">是</td> 
                                    <td  class="removeBottom">23423423</td> 
                                    <td  class="removeBottom">上的</td>
                                </tr>
                            </template>
                        </table>
                        <table>
                          <td colspan="16">新增物资</td>
                            <tr>
                                <td style="width:6.25%">序号</td>
                                <td style="width:6.25%">类型</td>
                                <td style="width:6.25%">物品名称</td>
                                <td style="width:6.25%">新旧程度</td>                                
                                <td style="width:6.25%">规格型号</td>
                                <td style="width:6.25%">品牌</td>
                                <td style="width:6.25%">产品类型</td>
                                <td style="width:6.25%">数量</td>                                
                                <td style="width:6.25%">归属</td>
                                <td style="width:6.25%">备注</td>
                                <td style="width:6.25%">预计单价</td>
                                <td style="width:6.25%">责任人</td>                                
                                <td style="width:6.25%">固资编号</td>
                                <td style="width:6.25%">配送日期</td>
                                <td style="width:6.25%">预计金额</td>
                                <td style="width:6.25%">采购总额</td>
                            </tr>
                            <template v-for="val in 20">
                                <tr>
                                    <td>{{val}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>                                
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>                                
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>                                
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </template>
                        </table>
                    </div>
		</div>	  
	  <div class="inner">
		  <div class="top">
			   <div class="topHeader flex">
				  <div class="topHeadLeft" @click="goBack">
					  <i class="icon-fanhui- iconfont"></i>&nbsp;&nbsp;<span>返回</span>
					</div>
				  <div class="topHeadRight">
					  <div class="print" @click="print">打印</div>
					</div>
				</div>
		  <div class="flexCon flex">
				  <div class="left">
					  <div class="repairInfoCon">
						<div class="repairInfoFirst flex">
							<span class="repairInfoTitle">配送单信息</span>
							<span class="repairInfoStatus">[状态：{{ firstPartForm.status | emptyProcessor }}]</span>
						</div>
						<div class="repairInfoDetailCon">
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">合同号</div>
								<div class="repairInfoDetailContent">{{ routeQuery.contractNo | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">类型</div>
								<div class="repairInfoDetailContent">{{firstPartForm.deliveryType | emptyProcessor}}</div>                                  
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">登记人</div>
								<div class="repairInfoDetailContent">{{  | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">登记人号码</div>
								<div class="repairInfoDetailContent">{{  | emptyProcessor}}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">登记时间</div>
								<div class="repairInfoDetailContent">{{ firstPartForm.gmtCreate | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">审核人</div>
								<div class="repairInfoDetailContent">{{  | emptyProcessor}}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">审核时间</div>
								<div class="repairInfoDetailContent">{{ firstPartForm.gmtAudit | emptyProcessor }}</div>
							</div>
                            <div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">完成时间</div>
								<div class="repairInfoDetailContent">{{ firstPartForm.gmtFinish | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">小区</div>
								<div class="repairInfoDetailContent">{{ firstPartForm.communityName | emptyProcessor}}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">地址</div>
								<div class="repairInfoDetailContent">{{ firstPartForm.address | emptyProcessor}}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">租客</div>
								<div class="repairInfoDetailContent">{{  | emptyProcessor}}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">租客电话</div>
								<div class="repairInfoDetailContent">{{  | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">业务员</div>
								<div class="repairInfoDetailContent">{{  | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">业务员电话</div>
								<div class="repairInfoDetailContent">{{  | emptyProcessor }}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">二次添置理由</div>
								<div class="repairInfoDetailContent">{{firstPartForm.reason | emptyProcessor}}</div>
							</div>
							<div class="repairInfoDetailLists flex">
								<div class="repairInfoDetailTitle">备注</div>
								<div class="repairInfoDetailContent">{{ firstPartForm.memo | emptyProcessor }}</div>
							</div>
						</div>
					</div>
					</div>
				  <div class="right">
					  <div class="repairStaffInfo">						  
						  <div class="repairInfoFirst flex">
							<span class="repairInfoTitle progressTitle">流程</span>
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
							  <div class="flexBetween flex">
								  <div class="flexLeftSide">
								  </div>
								  <div class="flexRightSide">
											<div class="top">消耗时间2天3小时  </div>
									</div>
							  </div>
						  </div>
					   </div>
					</div>
				</div>                 
		</div>

		  <div class="middle">
			  <div class="middleTitle">原有物资</div>
			  <div class="tableContent"  :style="{width:computed}">
				  <el-table :data="startTable"  tooltip-effect="dark"  style="width: 100%" stripe key="middle">
						  <el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
						<el-table-column  label="物品名称" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name | emptyProcessor}}</template>
							</el-table-column>
						<el-table-column  label="新旧程度" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.degree | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="规格型号" show-overflow-tooltip>
							  <template slot-scope="scope">{{ | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="品牌" show-overflow-tooltip>
							  <template slot-scope="scope">{{ | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="产品类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.type | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="数量" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.number | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="房东承担" show-overflow-tooltip>
							  <template slot-scope="scope">{{ undertakeArr.get( scope.row.needLandlordBear )  | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="价格" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.amount | formatMoneyValueWithMark | emptyProcessor}}</template>
							</el-table-column>
						<el-table-column  label="备注" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.remark | emptyProcessor}}</template>
							</el-table-column>
				</el-table>
			</div>
		</div>
		  <div class="bottom" v-if="firstPartForm.deliveryType === '新增'">
			  <div class="bottomFlex">
				  <div class="bottomTitle">新增物资</div>
				  <div class="addBg" @click="showAdd"><i class="icon-tianjia- iconfont" ></i></div>
			  </div>
			  <div class="tableContent" :style="{width:computed}">
			  		<el-table :data="newTable"  tooltip-effect="dark"  style="width: 100%"  stripe key="bottomAdd">
						  <el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
                            <el-table-column  label="物品名称" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.deployName | emptyProcessor }}</template>
							</el-table-column>
						  <el-table-column  label="新旧程度" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.degree | emptyProcessor }}</template>
							</el-table-column>
						  <el-table-column  label="规格型号" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.specification | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="品牌" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.trademark | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="产品类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.type | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="数量" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.amount | emptyProcessor}}</template>
							</el-table-column>
					  <el-table-column  label="归属" show-overflow-tooltip >
                          <template slot-scope="scope">{{ attributionMap.get(scope.row.belongedTo) | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="备注" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.memo | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="预计单价" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.singlePrice | formatMoneyValueWithMark | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="责任人" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="固资编号" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.fixedAssetsNo | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="配送日期" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.gmtDelivery | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="预计总额" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.totalAmount | formatMoneyValueWithMark | emptyProcessor }}</template>
							</el-table-column>
					       <el-table-column  label="采购总额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.purchasingPrice | formatMoneyValueWithMark | emptyProcessor }}</template>
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
			</div>
			  <div class="total">合计:<span>{{totalPrice}}</span>元</div>
		</div>


<!--          <div class="bottom">-->
          <div class="bottom" v-else>
			  <div class="bottomFlex">
				  <div class="bottomTitle">撤离物资</div>
				  <div class="addBg" @click="showEvacuationAction"><i class="icon-tianjia- iconfont" ></i></div>
			  </div>
			  <div class="tableContent" :style="{width:computed}">
			  		<el-table :data="newTable"  tooltip-effect="dark"  style="width: 100%" stripe key="bottomEvacuation">
						  <el-table-column  label="序号" show-overflow-tooltip type="index"></el-table-column>
						<el-table-column  label="物品名称" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.deployName | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="新旧程度" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.degree | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="规格型号" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.specification | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="品牌" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.trademark | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="产品类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.type | emptyProcessor }}</template>
							</el-table-column>
						<el-table-column  label="数量" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.amount | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="归属" show-overflow-tooltip >
							  <template slot-scope="scope">{{ attributionMap.get(scope.row.belongedTo) | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="备注" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.memo | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="预计单价" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.singlePrice | emptyProcessor }}</template>
							</el-table-column>
                        <el-table-column  label="供应商" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name | emptyProcessor  }}</template>
							</el-table-column>
					  <el-table-column  label="责任人" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.name | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="固资编号" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.fixedAssetsNo | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="配送日期" show-overflow-tooltip min-width="100">
							  <template slot-scope="scope">{{ scope.row.gmtDelivery | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="预计总额" show-overflow-tooltip >
							  <template slot-scope="scope">{{ scope.row.totalAmount | emptyProcessor }}</template>
							</el-table-column>
					  <el-table-column  label="采购总额" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.purchasingPrice | emptyProcessor }}</template>
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
			</div>
			  <div class="total">合计:<span>{{totalPrice}}</span>元</div>
		</div>          
		</div>
		<el-dialog title="编辑" :visible.sync="editVisible" class="diagCon trackInput" :close-on-click-modal="false" >
			<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px">
				<div class="scrollContainer">
					 <el-form-item label="物品名称"  prop="name">
						 <el-select v-model="editForm.name" placeholder="请选择" disabled>                            
                             <el-option
                            v-for="item in selectFurnitureArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option> 
						  </el-select>
						</el-form-item>
					<el-form-item label="产品类型" prop="type">
						<el-select v-model="editForm.type" placeholder="请选择">                            
                            <el-option
                            v-for="item in linkageArr3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>                            
						  </el-select>
					  </el-form-item>                    
                    <el-form-item label="供应商" prop="supplier">
						<el-select v-model="editForm.supplier" placeholder="请选择">
                            <el-option
                            v-for="item in supplierArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>                               
						  </el-select>
					  </el-form-item>                    
					<el-form-item label="产品规格" prop="productSpecifications">
						<el-input v-model.trim="editForm.productSpecifications"></el-input>
					  </el-form-item>
					<el-form-item label="品牌" prop="brand">
						<el-input v-model.trim="editForm.brand"></el-input>
					  </el-form-item>
					<el-form-item label="新旧程度" prop="degree">
						<el-radio-group v-model="editForm.degree">
							<el-radio :label="'优'">优</el-radio>
							<el-radio :label="'良'">良</el-radio>
							<el-radio :label="'劣'">劣</el-radio>
						  </el-radio-group>
					  </el-form-item>
					<el-form-item label="归属" prop="ascription">
						<el-radio-group v-model="editForm.ascription">
							<el-radio :label="'LANDLORD'">房东</el-radio>
							<el-radio :label="'COMPANY'">公司</el-radio>
						  </el-radio-group>
					  </el-form-item>
					<el-form-item label="数量" prop="number">
						<el-input v-model.trim="editForm.number" @change="unifiedNumberChange('editForm','number')"></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" :rows="3" resize="none" v-model.trim="editForm.remark"></el-input>
					  </el-form-item>					
					<el-form-item label="预计单价" prop="price">
						<el-input v-model.trim="editForm.price" @change="unifiedNumberChange('editForm','price')"></el-input>
					  </el-form-item>
					<el-form-item label="固资编号" prop="serialNo">
						<el-input v-model.trim="editForm.serialNo"></el-input>
					  </el-form-item>
					<el-form-item label="配送日期" prop="date">						
						<el-date-picker
						  v-model="editForm.date"
						  align="right"
						  type="date"
						  placeholder="选择日期"
                            value-format="yyyy-MM-dd" 
						  :picker-options="pickerOptions2">
						</el-date-picker>
					  </el-form-item>
					<el-form-item label="预计总额" prop="totalAmount">
						<el-input v-model.trim="editForm.totalAmount" disabled></el-input>
					  </el-form-item>
					<el-form-item label="采购总额" prop="purchasePrice">
						<el-input v-model.trim="editForm.purchasePrice" @change="unifiedNumberChange('editForm','purchasePrice')"></el-input>
					  </el-form-item>
					<el-form-item label="责任人" prop="owner">
						<el-input v-model.trim="editForm.owner" disabled></el-input>
					  </el-form-item>					
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveEdit('editForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEdit('editForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="新增" :visible.sync="addVisible" class="diagCon trackInput" :close-on-click-modal="false">
			<el-form :model="addform" :rules="addrules" ref="addform" label-width="100px">
				<div class="scrollContainer">
					 <el-form-item label="物品名称" class="specialForm" prop="name">
						  <el-input v-model.trim="addform.name" placeholder="请输入物品名称" v-if="showNormal" class="specialSet"></el-input>
						 <el-select v-model="addform.name" placeholder="请选择" @change="addformFurnitureChange(addform.name)" v-else>
                             <el-option
                            v-for="item in selectFurnitureArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>                              
						  </el-select>
						 <span class="addOther" @click="changeNormal('addform')" v-text="normalText"></span>
						</el-form-item>
					<el-form-item label="产品类型" prop="type">
						<el-select v-model="addform.type" placeholder="请选择">
                             <el-option
                            v-for="item in linkageArr1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>                             
						  </el-select>
					  </el-form-item>					
                    <el-form-item label="供应商" prop="supplier">
                        <el-select v-model="addform.supplier" placeholder="请选择">                            
                            <el-option
                            v-for="item in supplierArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>                             
						  </el-select>
					  </el-form-item>
                    <el-form-item label="产品规格" prop="productSpecifications">
						<el-input v-model.trim="addform.productSpecifications"></el-input>
					  </el-form-item>
					<el-form-item label="品牌" prop="brand">
						<el-input v-model.trim="addform.brand"></el-input>
					  </el-form-item>
					<el-form-item label="新旧程度" prop="degree">
						<el-radio-group v-model="addform.degree">
							<el-radio :label="'优'">优</el-radio>
							<el-radio :label="'良'">良</el-radio>
							<el-radio :label="'劣'">劣</el-radio>
						  </el-radio-group>
					  </el-form-item>
					<el-form-item label="归属" prop="ascription">
						<el-radio-group v-model="addform.ascription">
							<el-radio :label="'LANDLORD'">房东</el-radio>
							<el-radio :label="'COMPANY'">公司</el-radio>
						  </el-radio-group>
					  </el-form-item>
					<el-form-item label="数量" prop="number">
						<el-input v-model.trim="addform.number" @change="unifiedNumberChange('addform','number')"></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" :rows="3" resize="none" v-model.trim="addform.remark"></el-input>
					  </el-form-item>					
					<el-form-item label="预计单价" prop="price">
						<el-input v-model.trim="addform.price" @change="unifiedNumberChange('addform','price')"></el-input>
					  </el-form-item>
					<el-form-item label="固资编号" prop="serialNo">
						<el-input v-model.trim="addform.serialNo"></el-input>
					  </el-form-item>
					<el-form-item label="配送日期" prop="date">						
						<el-date-picker
						  v-model="addform.date"
						  align="right"
						  type="date"
						  placeholder="选择日期"
                            value-format="yyyy-MM-dd"             
						  :picker-options="pickerOptions2">
						</el-date-picker>
					  </el-form-item>
					<el-form-item label="预计总额" prop="totalAmount">
						<el-input v-model.trim="addform.totalAmount" @change="unifiedNumberChange('addform','totalAmount')"></el-input>
					  </el-form-item>
					<el-form-item label="采购总额" prop="purchasePrice">
						<el-input v-model.trim="addform.purchasePrice" @change="unifiedNumberChange('addform','purchasePrice')"></el-input>
					  </el-form-item>
					<el-form-item label="责任人" prop="owner">
						<el-input v-model.trim="addform.owner"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveAdd('addform')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd('addform')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
        <el-dialog title="撤离" :visible.sync="evacuationVisible" class="diagCon trackInput" :close-on-click-modal="false">
			<el-form :model="evacuationform" :rules="evacuationrules" ref="evacuationform" label-width="100px">
				<div class="scrollContainer">
					 <el-form-item label="物品名称" class="specialForm" prop="name">
						  <el-input v-model.trim="evacuationform.name" placeholder="请输入物品名称" v-if="showEvacuation" class="specialSet"></el-input>
						 <el-select v-model="evacuationform.name" placeholder="请选择活动区域" @change="evacuationFurnitureChange(evacuationform.name)" v-else>
                             <el-option
                            v-for="item in selectFurnitureArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option> 
						  </el-select>
						 <span class="addOther" @click="changeEvacuation('evacuationform')" v-text="evacuationText"></span>
						</el-form-item>
					<el-form-item label="产品类型" prop="type">
						<el-select v-model="evacuationform.type" placeholder="请选择">                            
                             <el-option
                            v-for="item in linkageArr2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>     
						  </el-select>
					  </el-form-item>
                    <el-form-item label="供应商" prop="supplier">
						<el-select v-model="evacuationform.supplier" placeholder="请选择">
                            <el-option
                            v-for="item in supplierArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option> 
						  </el-select>
					  </el-form-item>
					<el-form-item label="产品规格" prop="productSpecifications">
						<el-input v-model.trim="evacuationform.productSpecifications"></el-input>
					  </el-form-item>
					<el-form-item label="品牌" prop="brand">
						<el-input v-model.trim="evacuationform.brand"></el-input>
					  </el-form-item>
					<el-form-item label="新旧程度" prop="degree">
						<el-radio-group v-model="evacuationform.degree">
							<el-radio :label="'优'">优</el-radio>
							<el-radio :label="'良'">良</el-radio>
							<el-radio :label="'劣'">劣</el-radio>
						  </el-radio-group>
					  </el-form-item>
					<el-form-item label="归属" prop="ascription">
						<el-radio-group v-model="evacuationform.ascription">
							<el-radio :label="'LANDLORD'">房东</el-radio>
							<el-radio :label="'COMPANY'">公司</el-radio>
						  </el-radio-group>
					  </el-form-item>
					<el-form-item label="数量" prop="number">
						<el-input v-model.trim="evacuationform.number" @change="unifiedNumberChange('evacuationform','number')"></el-input>
					  </el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" :rows="3" resize="none" v-model.trim="evacuationform.remark"></el-input>
					  </el-form-item>					
					<el-form-item label="预计单价" prop="price">
						<el-input v-model.trim="evacuationform.price" @change="unifiedNumberChange('evacuationform','price')"></el-input>
					  </el-form-item>
					<el-form-item label="固资编号" prop="serialNo">
						<el-input v-model.trim="evacuationform.serialNo"></el-input>
					  </el-form-item>
					<el-form-item label="配送日期" prop="date">						
						<el-date-picker
						  v-model="evacuationform.date"
						  align="right"
						  type="date"
						  placeholder="选择日期"
                            value-format="yyyy-MM-dd"            
						  :picker-options="pickerOptions2">
						</el-date-picker>
					  </el-form-item>
					<el-form-item label="预计总额" prop="totalAmount">
						<el-input v-model.trim="evacuationform.totalAmount" :disabled="true"></el-input>
					  </el-form-item>
					<el-form-item label="采购总额" prop="purchasePrice">
						<el-input v-model.trim="evacuationform.purchasePrice" @change="unifiedNumberChange('evacuationform','purchasePrice')"></el-input>
					  </el-form-item>
					<el-form-item label="责任人" prop="owner">
						<el-input v-model.trim="evacuationform.owner" :disabled="true"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveEvacuation('evacuationform')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEvacuation('evacuationform')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<transition name="popDel">
			<Del v-if="showSingleDelete"  :delCon="quitSingleConfirm" :delCancel="quitSingleCancel"></Del>
		</transition>
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
                undertakeArr: new Map([
                    [true,'是'],
                    [false,'否']
                ]) ,
                attributionMap: new Map([
                    ['LANDLORD','房东'],
                    ['COMPANY','公司']
                ]),
                supplierArr:this.StateData.supplierArr,
                linkageArr3:[],
                linkageArr2:[],
                linkageArr1:[],
                selectFurnitureArr:[],
                firstPartForm:{
                },
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
					}
				],
                evacuationVisible:false,
				computed:'auto',
				normalText:'添加其他',                
                evacuationText:'添加其他',                
				showNormal:false,
                showEvacuation:false,
				holder1:'12345678901',
				tableShow:false,
				showSingleDelete:false,
				startTable:[],
				newTable:[		
				],
				pickerOptions2: this.DatePick.date, 				
				editVisible:false,
				addVisible:false,
				editForm:{
                    name:'电视机',
                },
				editRules:{                    
                },                
				addform:{},
				addrules:{
					name:[
						{ required: true, message: '请输入活动名称', trigger: 'change' },
					],
                    number:[                        
                    ],
				},
                evacuationform:{},
                evacuationrules:{},
				totalPrice:0,
                routeQuery:{},
			}
		},
		mounted(){
			this.initTable();
            this.initRequest();
            this.initselectFurnitureArr();
		},
		methods:{   
            unifiedNumberChange(form,item){
                this.Digital.formatPrice.bind(this)( `${form}.${item}` );
            },
            addformFurnitureChange(val){
                this.linkageArr1 = this.StateData.matchFurniture[val];
                console.log(val,this.linkageArr1);
            },
            evacuationFurnitureChange(val){
                this.linkageArr2 = this.StateData.matchFurniture[val];
                console.log(val,this.linkageArr1);
            },
            initselectFurnitureArr(){
                this.selectFurnitureArr  = this.StateData.furnitureArr;
            },
            initRequest(){                
                this.Digital.aesDecrypt.bind(this)();                
                let data1 = {
                    id:this.routeQuery.id
                };                
                this.ApiLists[10012](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { data,message,success } = layer1;
                    if( success ){
                        this.firstPartForm = data;
                    }else{       
                        this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err); 
                });                 
                this.ApiLists[10025](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { data,message,success } = layer1;
                    if( success ){
                        this.newTable = data.deliveryItems;
                        this.newTable.forEach(ele=>{
                            ele.gmtDelivery = this.DayJs(ele.gmtDelivery).format('YYYY-MM-DD');
                        });                         
                        this.totalPrice = data.totalAmount;
                    }else{       
                        this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err); 
                });                 
                let data2 = {
                    contractId:this.routeQuery.contractId
                };                
                this.ApiLists[10013](data2).then(res=>{
                    let { data:layer1 } = res;
                    let { data,message,success } = layer1;
                    if( success ){
                        this.startTable =data;                        
                    }else{     
                        this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err); 
                }); 
            },
			initTable(){
                this.Digital.tableWidthController.bind(this)(310,'computed');
			},
			changeNormal(str){		
                function clear(){
                    this.linkageArr1 = []; 
                    this[str].name='';
                    this[str].type='';
                };
				if(this.showNormal){
					this.showNormal = false;
					this.normalText = '添加其他';
                    clear.bind(this)();
				}else{
					this.showNormal = true;
					this.normalText = '返回';
                    clear.bind(this)();
				}
			},
            changeEvacuation(str){    
                function clear(){
                    this.linkageArr2 = []; 
                    this[str].name='';
                    this[str].type='';
                };
                if(this.showEvacuation){
					this.showEvacuation = false;
					this.evacuationText = '添加其他';
                    clear.bind(this)();
				}else{
					this.showEvacuation = true;
					this.evacuationText = '返回';
                    clear.bind(this)();
				}
            },
			quitSingleConfirm(){
				this.showSingleDelete = false;
				this.Success.deleteSuccess();
//				this.Err.netErr();
			},
			quitSingleCancel(){
				this.showSingleDelete = false;
			},
            saveEvacuation(str){
                console.log( str );
//                this.evacuationVisible = false;
            },
            cancelEvacuation(str){
                console.log( str );
//                this.evacuationVisible = false;
            },
			saveAdd(str){
                
                console.log( this[str] );
                
//				this.addVisible = false;	
//				this.Success.saveSuccess();
                
                
                this.$refs[str].validate((valid) => {
                  if (valid) {
                      
                      console.log('验证成功',);
                      
//                    alert('submit!');
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
                
                
                
                
//				this.Err.netErr();
			},
			cancelAdd(){
				this.addVisible = false;
			},
			showAdd(){
				this.addform = {};
				this.addVisible = true;		
                
			},
            showEvacuationAction(){
                this.evacuationform = {};
				this.evacuationVisible = true;	
            },
			editInfo(row){
				this.editForm = {};
				this.editVisible = true;
                this.editForm.name = '电视机'; 
                let getName = this.editForm.name;  
                let targetIndex = this.StateData.furnitureArr.findIndex((val,index)=>{
                    return val.label === getName;
                }) 
                let finalIndex = this.StateData.furnitureArr[targetIndex].value;
                this.linkageArr3 = this.StateData.matchFurniture[finalIndex];  
			},
			saveEdit(str){
				this.editVisible = false;
				this.Success.saveSuccess();             
                console.log( '侦测',this[str] );
//                let data = this[str];                
//                this.ApiLists[](data).then(res=>{
//                    
//                    console.log(res);
//                    this.$refs[str].resetFields();  
//                    
//                }).catch(err=>{
//                    console.log(err);
//                })
			},
			cancelEdit(str){
                this.$refs[str].resetFields();                
				this.editVisible = false;
			},
			popDelete(row){
				this.showSingleDelete = true;
			},
			goBack(){                
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/deliveryOrderManage');                  
			},
			print(){
                printJS( { printable: 'deliveryOrderDetailPrintContainer', type: 'html',
                          style:` #deliveryOrderDetailPrintContainer {width: 100%;}
                                 .tablePrintHeader {
                                    margin-top: 18px;
                                    margin-bottom: 10px;
                                    font-size: 16px;
                                } 
                                .specialOne {
                                    width: 15%;
                                }
                                .limitWidth {
                                    width: 20%;
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
	.addOther {
		margin-left: 10px;
		color: $mainRed;
		cursor: pointer;
	}
	.total {
		text-align: right;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		color: #a4aabc;
		span {
			font-size: 16px !important;
			color: $mainRed;
		}
	}
	.deliveryOrderDetail {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.inner {
			background-color: #fff;
			border-radius: 10px;
			padding: 24px;
		}
		.top {
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
                width: calc( 100% - 80px );
			}
		}
		.topHeader {
			height: 40px;
			margin-bottom: 24px;
			flex-wrap: nowrap;
			justify-content: space-between;
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
			flex-wrap: nowrap;
			justify-content:flex-start;
			.left {
				width: 50%;
			}
			.right {
				width: 50%;
				.progressDetails {
					margin-top: 24px;
				}	
				.progressTitle {
					width: 96px;
					text-align: right;
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
					height: 30px;
					width: 30px;
					background-color: $mainRed;
					border-radius: 15px;
					line-height: 30px;
					text-align: center;
					color: #fff;
					box-shadow: $redShadow;
					cursor: pointer;
					box-shadow: 0px 2px 10px 5px #ffecec !important;
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
		.tableShow {
			position: absolute;
			width: 790px;
			height: 600px;
			background-color: aquamarine;
			left: 200px;
			right: 0;
			top: 0;
			bottom: 0;
		}
	}
</style>
<style  lang="scss">
	.deliveryOrderDetail {
		.el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
		.el-dialog__body { 
			padding: 30px 20px !important;
		}	
		.diagCon .el-dialog {
			width: 540px  !important;
			height: 560px  !important;
		}
		.diagCon .el-select {
			width: 100%;
		}
		.specialForm .el-select  {
			width: 80% !important;
		}
		.specialSet {
			width: 80% !important;
		}
        .trackInput .el-date-editor.el-input {
			width: 100% !important;
		}
	}
</style>
<style  lang="scss">
    @media all  {  
        #deliveryOrderDetailPrintContainer {
            width: 100%;
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 0 auto; 
                font-size: 12px;
                th,td {
                    border: 1px solid #bbc1d5;
                    text-align: center;
                    vertical-align: middle;
                    word-break: break-all;
                }
            }
            .tablePrintHeader {
                margin-top: 18px;
                margin-bottom: 10px;
                font-size: 16px;
            } 
            .specialOne {
                width: 15%;
            }
            .removeBottom { 
                border-bottom: none !important;
            }
            .limitWidth {
                width: 20%;
            }
        }
    }
</style>
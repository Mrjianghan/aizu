<template>	
  	<div class="fifthPartContainer"> 
		<div class="top">
		  	<div class="topHeader1 flex">
			  	<div class="topHeadRight flex">
					<div class="turn" @click="turn">变为<span v-show="ableRent">不</span>可出租</div>
	          	</div>
		   	</div>
	 		<div class="formCon1">
				<div class="eachMarginBottom">
					<div class="roomManager greyBorder  inputFlex animated flex" :class={borderWarn:$v.mainForm.roomManager.$error,shake:$v.mainForm.roomManager.$error}>
<!--                    <div class="roomManager greyBorder  inputFlex animated">    -->
						<div class="title">房源责任人</div>
						<input class="hiddenInput" type="text" placeholder="输入房源责任人" v-model.trim="mainForm.roomManager" @change="mainFormChange('mainForm','roomManager')">
					</div>
				</div>
				<div class="eachMarginBottom">
					<div class="roomName greyBorder  inputFlex animated flex" :class={borderWarn:$v.mainForm.roomName.$error,shake:$v.mainForm.roomName.$error}>
<!--                    <div class="roomName greyBorder  inputFlex animated">    -->
						<div class="title">房源名称</div>
						<input class="hiddenInput" type="text" placeholder="输入房源名称" v-model.trim="mainForm.roomName" @change="mainFormChange('mainForm','roomName')">
					</div>
				</div>
					  <div class="eachMarginBottom">
						  <div class="selectCon flex">
							  <div class="greyBorder selectSame flexCon flex animated" :class={borderWarn:$v.mainForm.roomType.$error,shake:$v.mainForm.roomType.$error}>
<!--                            <div class="greyBorder selectSame flexCon animated">-->
								  <el-select v-model.trim="mainForm.roomType" placeholder="房源类型" @change="mainFormChange('mainForm','roomType')">
									  <el-option label="全新" value="NEW"></el-option>
									  <el-option label="二手" value="SECOND"></el-option>
									</el-select>
								</div>
							  <div class="greyBorder selectSame flexCon flex animated" :class={borderWarn:$v.mainForm.roomPutAway.$error,shake:$v.mainForm.roomPutAway.$error}>
<!--                            <div class="greyBorder selectSame flexCon animated">-->
								  <el-select v-model.trim="mainForm.roomPutAway" placeholder="是否上架" @change="mainFormChange('mainForm','roomPutAway')">
									  <el-option label="上架" value="1"></el-option>
									  <el-option label="下架" value="0"></el-option>
									</el-select>
								</div>
							</div>
					  </div>
					  <div class="eachMarginBottom">
<!--						  <div class="CommunityName greyBorder  flexCon animated" >-->
                        <div class="CommunityName greyBorder  flexCon flex animated"  :class={borderWarn:$v.mainForm.community.$error,shake:$v.mainForm.community.$error}>
							  <div class="title">小区名称</div>
							  <input class="hiddenInput" type="text" placeholder="输入小区名称" v-model.trim="mainForm.community" @change="mainFormChange('mainForm','community')">
							</div>
					  </div>
					  <div class="eachMarginBottom">				
						  <div class="priceCon  flex">
<!--								  <div class="greyBorder thirdSame flexCon animated" >-->
                                <div class="greyBorder thirdSame flexCon flex animated" :class={borderWarn:$v.mainForm.minPrice.$error,shake:$v.mainForm.minPrice.$error}>
								  <div class="title">最低价格</div>
									<input class="hiddenInput" type="text" placeholder="￥" v-model.trim="mainForm.minPrice" @change="mainFormChange('mainForm','minPrice','numberMark')">
								</div>
<!--							  <div class="greyBorder thirdSame flexCon animated">-->
                            <div class="greyBorder thirdSame flexCon flex animated" :class={borderWarn:$v.mainForm.incomePrice.$error,shake:$v.mainForm.incomePrice.$error}>      
								  <div class="title">收进价格</div>
									<input class="hiddenInput" type="text" placeholder="￥" v-model.trim="mainForm.incomePrice" @change="mainFormChange('mainForm','incomePrice','numberMark')">
								</div>
<!--							  <div class="greyBorder thirdSame flexCon animated">-->
                            <div class="greyBorder thirdSame flexCon flex animated" :class={borderWarn:$v.mainForm.layerPrice.$error,shake:$v.mainForm.layerPrice.$error}>      
								  <div class="title">显示价格</div>
									<input class="hiddenInput" type="text" placeholder="￥" v-model.trim="mainForm.layerPrice" @change="mainFormChange('mainForm','layerPrice','numberMark')">
								</div>
							</div>							 
					  </div>
					  <div class="eachMarginBottom">
<!--						  <div class="roomAddress greyBorder  flexCon animated">-->
                        <div class="roomAddress greyBorder  flexCon flex animated" :class={borderWarn:$v.mainForm.address.$error,shake:$v.mainForm.address.$error}>      
							  <div class="title">房源地址</div>
									<input class="hiddenInput" type="text" placeholder="输入房源地址" v-model.trim="mainForm.address" @change="mainFormChange('mainForm','address')">
							</div>
						</div>
					  <div class="eachMarginBottom">
						  <div class="roomInfo  flexCon flex">
							  <div class="greyBorder fourSame flexCon flex animated" :class={borderWarn:($v.mainForm.roomNo.$error)||($v.mainForm.hallNo.$error)||($v.mainForm.toiletNo.$error),shake:($v.mainForm.roomNo.$error)||($v.mainForm.hallNo.$error)||($v.mainForm.toiletNo.$error)}>
                                  
<!--                            <div class="greyBorder fourSame flexCon animated">-->
								  <div class="title configTitle">屋内配置</div>
								  <div class="hiddenInput roomConfig flex">
									  <div><input class="roomNumber" type="text"  v-model.trim="mainForm.roomNo" @change="mainFormChange('mainForm','roomNo')"></div>
									  <div class="roomConfigText">室</div>
									  <div><input class="roomNumber" type="text"  v-model.trim="mainForm.hallNo" @change="mainFormChange('mainForm','hallNo')"></div>
									  <div class="roomConfigText">厅</div>
                                      <div><input class="roomNumber" type="text"  v-model.trim="mainForm.kitchenNo" @change="mainFormChange('mainForm','kitchenNo','numberMark')"></div>
									  <div class="roomConfigText">厨</div>    
									  <div><input class="roomNumber" type="text"  v-model.trim="mainForm.toiletNo" @change="mainFormChange('mainForm','toiletNo')"></div>
									  <div class="roomConfigText">卫</div>                                      
									</div>
								</div>
<!--							  <div class="greyBorder fourSame flexCon animated">-->
                            <div class="greyBorder fourSame flexCon flex animated" :class={borderWarn:$v.mainForm.direction.$error,shake:$v.mainForm.direction.$error}>
								  <div class="title">房屋朝向</div>
									<input class="hiddenInput" type="text" maxlength="2" v-model.trim="mainForm.direction" placeholder="请输入" @change="mainFormChange('mainForm','direction')">
								</div>
<!--							  <div class="greyBorder fourSame flexCon animated">-->
                            <div class="greyBorder fourSame flexCon flex animated" :class={borderWarn:$v.mainForm.floor.$error,shake:$v.mainForm.floor.$error}>
								  <div class="title">房屋楼层</div>
									<input class="hiddenInput" maxlength="2" type="text"  v-model.trim="mainForm.floor" placeholder="请输入" @change="mainFormChange('mainForm','floor')">
								</div>
							  <div class="greyBorder fourSame flexCon flex animated" :class={borderWarn:$v.mainForm.area.$error,shake:$v.mainForm.area.$error}>
<!--                            <div class="greyBorder fourSame flexCon animated">  -->
								  <div class="title">房屋面积</div>
									<input class="hiddenInput" type="text" maxlength="2" placeholder="m²"  v-model.trim="mainForm.area" @change="mainFormChange('mainForm','area')">
								</div>
							</div>
					  </div>
					  <div class="eachMarginBottom">
						  <div class="roomDescribe greyBorder  flexCon flex animated"  :class={borderWarn:$v.mainForm.describe.$error,shake:$v.mainForm.describe.$error}>
<!--                         <div class="roomDescribe greyBorder  flexCon animated">     -->
								<div class="title">房源简介</div>
									<input class="hiddenInput" type="text" placeholder="输入房源简介" v-model.trim="mainForm.describe" @change="mainFormChange('mainForm','describe')">
							</div>
					  </div>
					  <div class="dragMaster flex">
						  <div class="imgTitle title">房源照片</div>
									<div v-for="(element,i) in imgArr" :key="element.id" class="item" :style="{backgroundImage: 'url('+element+')'}" @click.stop="pickPic(i,'imgArr')">
										<div class="blackBar"><i @click.stop="deleteThisPic" class="icon-shanchu- iconfont"></i></div>
									</div>
							<div class="slotFooter" slot="footer" v-show="imgArr.length < 10" @click="addPeople">
								<i class="icon-jia- iconfont"></i>
								<input type="file" ref="roomPic"  accept="image/x-png,image/jpeg" @change="uploadLogo">
							</div>
						</div>
				  </div>
			  </div>
				<div class="bottom">
				  <div class="bottomHeader flex">
					  <div class="bottomHeaderTitle" @click="tempClick">屋内配置</div>
					  <div class="bottomHeaderIconCon flex">
						  <el-tooltip content="新增" placement="bottom" effect="light">
                              <div class="addIconCon" @click="addNewFurniture">
				                <i class="icon-tianjia- iconfont" ></i>
				              </div>
						</el-tooltip>
						  <el-tooltip content="多选删除" placement="bottom" effect="light">
							  <div class="delIconCon delDisable" :class="{delAble}" @click="delFurniture">
								  <i class="icon-shanchu- iconfont"></i>
								</div>
							</el-tooltip>
						</div>
					</div>
				  <div class="bottomListCon">
					  <el-table  ref="multipleTable"  :data="tableData3"  tooltip-effect="dark"  style="width: 99%"   :height="tableHeight"     
								@selection-change="handleSelectionChange">
						  <el-table-column   type="selection"> </el-table-column>
							<el-table-column  label="配置类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="新旧程度" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="产品类型" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="数量" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="房东承担" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column  label="费用" show-overflow-tooltip>
							  <template slot-scope="scope">{{ scope.row.name }}</template>
							</el-table-column>
						<el-table-column label="编辑">
							  <template slot-scope="scope">
								<div class="editIconCon">
									<i class="iconfont icon-bianji-" @click="popEditForm"></i>
								</div>
							  </template>
						</el-table-column>
						<el-table-column label="删除">
							  <template slot-scope="scope">
								<div class="deleteIconCon" >
									<i class="iconfont icon-shanchu-" @click="delSingle"></i>
								</div>
							  </template>
						</el-table-column>
						</el-table>
					</div>
				</div>
		<transition name="popDel">
			<div class="imgBgContainer" v-if="imgPreviewShow">
				<div class="imgCenter">
					<div class="upper">
						<img class="leftArrow" :src="leftArrowSrc":class="{btnDisable:leftUnable}" @click="leftRoll">
						<div class="currentCon">
							<img class="currentPic" :src="currentSrc">
						</div>
						<img class="rightArrow" :src="rightArrowSrc" :class="{btnDisable:rightUnable}" @click="rightRoll">
					</div>
					<img class="shut" :src="shutSrc" @click="shut">			
				</div>
			</div>
		</transition>
		<transition name="popDel">
			<Del v-if="picDelShow"   :delCon = "picDelConfirm" :delCancel = "picDelCancel"></Del>
		</transition>
		<transition name="popDel">
			<Del v-if="singleDelShow"   :delCon = "singleDelConfirm" :delCancel = "singleDelCancel"></Del>
		</transition>
		<transition name="popDel">
			<Del v-if="multipleDelShow"   :delCon = "multipleDelConfirm" :delCancel = "multipleDelCancel"></Del>
		</transition>
		<el-dialog title="新增屋内配置" :visible.sync="dialogFormVisible" class="diagCon newDiagCon" :close-on-click-modal="false" >
			<el-form :model="ruleDynamicForm2"  label-width="100px">      
                <div class="configFormScrollCon1">
                    <el-form-item label="配置类型" class="specialForm">
                          <el-input v-model.trim="ruleDynamicForm2.configType" placeholder="请输入物品名称" v-if="showNormal" class="specialSet"></el-input>
                         <el-select v-model.trim="ruleDynamicForm2.configType" placeholder="请选择活动区域" v-else>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                         <span class="addOther" @click="changeNormal" v-text="normalText"></span>
                    </el-form-item>
                    <el-form-item label="新旧程度" >
                          <el-select v-model="ruleDynamicForm2.degree" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="产品类型">
                        <el-input v-model="ruleDynamicForm2.productType"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="ruleDynamicForm2.count"></el-input>
                    </el-form-item>
                    <el-form-item label="房东承担" >
                          <el-select v-model="ruleDynamicForm2.landlord" placeholder="请选择活动区域">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="费用" v-show="+(ruleDynamicForm2.landlord)">
                        <el-input v-model="ruleDynamicForm2.fee"></el-input>
                    </el-form-item>
                </div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="addNewFurnitureAction('ruleDynamicForm2')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="shutAddNewFurniture('ruleDynamicForm2')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="编辑屋内配置" :visible.sync="dialogEditFormVisible" class="diagCon diagEditCon" :close-on-click-modal="false">            
			<el-form :model="ruleDynamicForm"  label-width="100px">
                <div class="configFormScrollCon2">
                    <el-form-item label="配置类型">
                        <el-input v-model="ruleDynamicForm.configType" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="新旧程度" >
                          <el-select v-model="ruleDynamicForm.degree" placeholder="请选择活动区域" @change="ruleDynamicFormChange('ruleDynamicForm','degree')">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                    <el-form-item label="产品类型">
                        <el-input v-model="ruleDynamicForm.productType" @change="ruleDynamicFormChange('ruleDynamicForm','productType')"></el-input>
                      </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="ruleDynamicForm.count" @change="ruleDynamicFormChange('ruleDynamicForm','count','numberMark')"></el-input>
                      </el-form-item>
                    <el-form-item label="房东承担" >
                          <el-select v-model="ruleDynamicForm.landlord" placeholder="请选择活动区域" @change="ruleDynamicFormChange('ruleDynamicForm','landlord')">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                    <el-form-item label="费用" v-if="+(ruleDynamicForm.landlord)">
                        <el-input v-model="ruleDynamicForm.fee" @change="ruleDynamicFormChange('ruleDynamicForm','fee','numberMark')"></el-input>
                      </el-form-item>
                </div>
				<div class="diagBtnCon">
					<RedBtn :text="'保存'" @click.native="editNewFurnitureAction('ruleDynamicForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="shutEditNewFurniture('ruleDynamicForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
  </div>
</template>
<script>
	import { required,numeric,helpers } from 'vuelidate/lib/validators';	
    const positiveNum =  helpers.regex('alpha', /^\d+(\.\d+)?$/);	
    export default {
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
                showNormal:false,
                normalText:'添加其他',
				imgPreviewShow: false,
				imgPreviewShow1: false,
				tableHeight:100,
				tableData3:[
					{name:'merere'},
				],
				delAble:false,
				ableRent:false,
				mainForm:{},
				lockImgArrName:'imgArr',
				imgArr:[
                    { url:require('../../../../public/imgs/sfz2.png')  },
                    { url:require('../../../../public/imgs/sfz2.png')  },
                    { url:require('../../../../public/imgs/sfz2.png')  },
                    { url:require('../../../../public/imgs/sfz2.png')  },
				],	
				multipleSelection:[],
				waitDeleteArr:[],
				shutSrc: require("../../../../public/imgs/shutPic.png"),
				picDelShow:false,
				singleDelShow:false,
				multipleDelShow:false,
				ruleDynamicForm2:{},
				dialogFormVisible:false,
				ruleDynamicForm:{},
				dialogEditFormVisible:false,
				rightUnable:false,
				picIndex:0,
				currentSrc:'',
				leftArrowSrc:require('../../../../public/imgs/leftAble.png'),
				rightArrowSrc:require('../../../../public/imgs/leftAble.png'),
				leftUnable:false,
			}
		},
		validations(){   
            let validateObj = {};
            validateObj.mainForm = {                    
                    roomManager: {
                        required,
                    },
                    roomName: {
                        required,
                    },
                    roomType:{
                        required,
                    },
                    roomPutAway:{
                        required,
                    },
                    community:{
                        required,
                    },
                    minPrice:{
                        required,
                        positiveNum,
                    },
                    incomePrice:{
                        required,
                        positiveNum,
                    },
                    layerPrice:{
                        required,
                        positiveNum,
                    },
                    address:{
                        required,
                    },
                    roomNo:{
                        required,
                    },
                    hallNo:{
                        required,
                    },
                    toiletNo:{
                        required,
                    },
    //                kitchenNo:{
    //                },
                    direction:{
                        required,
                    },
                    floor:{
                        required,
                    },
                    area:{
                        required,
                    },
                    describe:{
                        required,
                    }
                };   
            
            if( +(this.ruleDynamicForm.landlord) ){                
                validateObj.ruleDynamicForm = {                    
                    degree:{
                    },
//                    productType:{
//                    },
                    count:{
                        positiveNum,
                        required
                    },
                    landlord:{                    
                    },
                    fee:{     
                        positiveNum,
                        required
                    },   
                };                      
            }else{               
                validateObj.ruleDynamicForm = {                    
                    degree:{
                    },
//                    productType:{
//                    },
                    count:{
                        positiveNum,
                        required
                    },
                    landlord:{                    
                    },
                };  
            };  
            
            if( +(this.ruleDynamicForm2.landlord) ){                
                validateObj.ruleDynamicForm2 = {    
                    configType:{
                        required
                    },
                    degree:{
                    },
//                    productType:{
//                    },
                    count:{
                        positiveNum,
                        required
                    },
                    landlord:{                    
                    },
                    fee:{     
                        positiveNum,
                        required
                    },   
                };                      
            }else{               
                validateObj.ruleDynamicForm2 = {  
                    configType:{
                        required
                    },
                    degree:{
                    },
//                    productType:{
//                    },
                    count:{
                        positiveNum,
                        required
                    },
                    landlord:{                    
                    },
                };  
            };  
            
            
            
            
            return validateObj;
		},
		mounted(){	            
		},
		methods:{
            mainFormChange(form,item,numberMark){
                console.log( this.$v[form][item],numberMark );      
                let ableValidate = this.$v[form][item];  
                if( ableValidate ){
                    ableValidate.$touch();
                    let validateResult = ableValidate.$error;
                    if( validateResult ){
                       console.log('验证非法');
                        this[form][item] = '';
                    }else{
                        console.log('验证合法');                        
                        if(numberMark){   
                            this[form][item] = this.Digital.roundValue(+parseFloat(this[form][item]),2);
                        }                        
                    }                    
                }else{                   
                    if(numberMark){      
                        this[form][item] = this.Digital.roundValue(+parseFloat(this[form][item]),2);
                    }
                }
            },
            changeNormal(){				
				if(this.showNormal){
					this.showNormal = false;
					this.normalText = '添加其他';
				}else{
					this.showNormal = true;
					this.normalText = '返回';
				}
			},
			editNewFurnitureAction(form){				
                let short = this.$v[form]; 
                short.$touch();                
                console.log(short.$error);
                if( short.$error ){
                   this.$message.error('请检查表单。');
                }else{
                   this.dialogEditFormVisible = false;
                } 
			},
			shutEditNewFurniture(form){
				this.dialogEditFormVisible = false;
                console.log( form,this[form] );
                this[form] = {};
			},
            ruleDynamicFormChange(form,item,numberMark){   
                let ableValidate = this.$v[form][item]; 
                if( ableValidate ){
                    ableValidate.$touch();
                    let validateResult = ableValidate.$error;
                    if( validateResult ){
                        console.log('验证非法');
                        this.$message.error('输入错误。');
                        this[form][item] = '';
                    }else{
                        console.log('验证合法'); 
                        if(numberMark){   
                            this[form][item] = this.Digital.roundValue(+parseFloat(this[form][item]),2);
                        }    
                    }
                }else{
                    if(numberMark){   
                        this[form][item] = this.Digital.roundValue(+parseFloat(this[form][item]),2);
                    }   
                }                
            },
			addNewFurnitureAction(form){
//				this.dialogFormVisible = false;
                console.log(form);
                let short = this.$v[form]; 
                short.$touch();                
                console.log('addNewFurnitureAction',short.$error);
//                if( short.$error ){
//                   this.$message.error('请检查表单。');
//                }else{
//                   this.dialogEditFormVisible = false;
//                } 
			},
			shutAddNewFurniture(form){
				this.dialogFormVisible = false;
                console.log(form);
			},
			multipleDelConfirm(){
				this.multipleDelShow = false;
                this.Success.deleteSuccess();
			},
			multipleDelCancel(){
				this.multipleDelShow = false;
			},
			singleDelConfirm(){
				this.singleDelShow = false;
                this.Success.deleteSuccess();
			},
			singleDelCancel(){
				this.singleDelShow = false;
			},
			picDelConfirm(){
				this.picDelShow = false;
                this.Success.deleteSuccess();
			},
			picDelCancel(){
				this.picDelShow = false;
			},		
			shut(){
				this.imgPreviewShow = false;
			},	
			delSingle(){
				this.singleDelShow = true;
			},
			popEditForm(){
				this.dialogEditFormVisible = true;
			},
			handleSelectionChange(val){
				console.log(val);
				this.multipleSelection = val;
			},
			turn(){
				if( this.ableRent ){
				   this.ableRent = false;
				}else{
				   this.ableRent = true;
				}
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
			deleteThisPic(){
				this.picDelShow = true;
			},
			addPeople(){
			},
			uploadLogo(){              
            },	
			tempClick(){
				this.tableData3 = [
					{name:'meeere'},
					{name:'merre'},
					{name:'meerre'},
				];
				this.tableHeight = (this.tableData3.length + 1)*50;
			},
			addNewFurniture(){
				this.dialogFormVisible = true;
			},
			delFurniture(){
				if(this.delAble){
					this.multipleDelShow = true;
				}
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
    .configFormScrollCon1 {
        height: 372px;
    }
     .configFormScrollCon2 {
        height: 372px;
    }
    .specialSet {
		width: 80% !important;
	}
	.borderWarn {
		border-color: $redBorderColor !important;
	}	    
    .fourSame {
		width: 220px !important;
        box-sizing: border-box;
	}
	.eachMarginBottom {
		margin-bottom: 20px;
	}
	.leftArrow {
		width: 34px;
		height: 34px;
		position: absolute;
		left: 0;
		top: 280px;
		cursor: pointer;
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
	.imgBgContainer {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 200;
	}
	.upper {
		position: relative;
	}
	.shut {
		height: 44px;
		width: 44px;
		position: absolute;
		bottom: 0;
		cursor: pointer;
		left: 478px;
	}
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
	}
	.currentCon {
		height: 570px;
		position: absolute;
		left: 30px;
		width: 940px;
		overflow: hidden;
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: center;
		.currentPic {
			max-height: 570px;
		}
	}
	.imgTitle {
		height: 100px;
		line-height: 100px;
		box-sizing: border-box;
	}
	.bottomListCon {
		width: 990px;
		.icon-bianji- {
			cursor: pointer;
		}
		.icon-shanchu- {
			color: $mainRed;
			cursor: pointer;
		}
	}	
	.bottomHeader {
		justify-content: space-between;
		.bottomHeaderIconCon {
			width: 100px;
			justify-content: space-between;				
		}
	}
	.addIconCon {
		background-color: #2a2f48;
		height: 40px;
		width: 40px;
		border-radius: 20px;
		color: #fff;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		box-shadow: 0px 2px 10px 5px #dadbe1;
	}
	.delIconCon {
		height: 40px;
		width: 40px;
		border-radius: 20px;
		background-color: $mainRed;
		color: #fff;
		line-height: 40px;
		text-align: center;
		box-shadow: $redShadow;
	}
	.bottomHeaderTitle {
		font-size: 16px;
		font-weight: 600;
	}
	.explain {
		width: 100%;
		text-align: right;
		color: #a4aabc;
		font-size: 12px;
		margin-top: 20px;
		margin-bottom: 20px;
		span {
			color: $mainRed;
		}
	}
	.dragMaster {
		flex-wrap: wrap;
		.slotFooter {
			height: 100px;
			width: 140px;
			border-radius: 10px;
			position: relative;
			background-color: #fafafc;
			line-height: 100px;
			text-align: center;
			cursor: pointer;
			box-sizing: border-box;
			input {
				position: absolute;
				left: 0;
				width: 140px;
				height: 100px;
				z-index: 10;
				cursor: pointer;
				opacity: 0;
			}
			.iconfont {
				font-size: 50px;
				color: #c8cad7;
			}
		}
		.imgTitle {
			height: 100px;
			line-height: 100px;
			box-sizing: border-box;
		}
	}
	.dragMaster .item {
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
		&:hover {
			.blackBar { 
				z-index: 2;
			}
		}
		.blackBar {
			height: 30px;
			background-color: rgba(0,0,0,0.3);
			position: absolute;
			bottom: 0;
			left: 0;
			line-height: 30px;
			color: #fff;
			text-align: center;
			width: 100%;
			z-index: -1;
			.iconfont {
				font-size: 22px;
				&:hover {
					color: $mainRed;
				}
			}
		}
	}
	.formCon1 {
		width: 900px;
		.roomManager {
		}
		.configTitle {
			width: 90px !important;
		}
		.roomNumber {
			width: 18px;
			border: none;
			outline: none;
			height: 44px;
			line-height: 42px;
			padding-left: 4px;
			box-sizing: border-box;
		}
		.roomConfig {
			flex-wrap: nowrap;
			justify-content: flex-start;
			width: calc(100% - 90px ) !important;
			.roomConfigText {
				font-size: 12px;					
			}
		}
		.hiddenInput {
			height: 44px;
			width: calc(100% - 106px );
			border: none;
			outline: none;
			color: #55596d;					
		}
		.title {
			width: 106px;
			font-size: 13px;
			color: #a4aabc;
			padding-left: 26px;
			box-sizing: border-box;
		}
		.inputFlex {
			width: 100%;
			flex-wrap: nowrap;
			justify-content: flex-start;
		}
		.flexCon {
			width: 100%;
			flex-wrap: nowrap;
			justify-content:space-between;
		}
		.roomInfo {
			justify-content: space-between;
		}
		.selectCon {
			justify-content: space-between;
			.selectSame {
				width: 430px;
			}
		}
		.priceCon {
			flex-wrap: nowrap;
			justify-content: space-between;
			.thirdSame {
				width: 280px;
			}
		}
	}
	.greyBorder {
		border: 2px solid #efeef3;
		box-sizing: border-box;
		height: 50px;
	}
	.topHeader1 {
		height: 40px;
		margin-bottom: 24px;
		justify-content:flex-end;
		.topHeadRight {
			flex-wrap: nowrap;
			justify-content: flex-end;
			width: 210px;
			.turn {
				width: 100px;
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
			.save {
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
				margin-left: 20px;
			}
		}
	}
</style>
<style  lang="scss">
	.fifthPartContainer {	
        .specialForm .el-select  {
			width: 80% !important;
		}
        .top {
            input {
                &::-webkit-input-placeholder { /* WebKit browsers */
                   color:    #a4aabc;
                }
                &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                   color:    #a4aabc;
                }
                &::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color:    #a4aabc;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10+ */
                    color:    #a4aabc;
                }
            }
            .el-select {
                width: 96%;
                margin-left: 2%;
            }
            .el-select .el-input.is-focus .el-input__inner {
                 border-color: #fff !important; 
            } 	
        }        
		.diagCon {
			.el-dialog {
				width: 540px;
			}	
		}
		.diagEditCon .el-dialog{
			height: 520px !important;
		}
		.newDiagCon .el-dialog{
			height: 520px !important;
		}
		.bottomListCon {
			.el-table__header-wrapper .has-gutter {
				th {
					background-color: #fff !important;
					color: #a4aabc !important;
					font-weight: normal;
				}
			}
			.el-table td, .el-table th.is-leaf {
				border-color: #fff;
			}
		}
		.top  {
			.el-input__inner {
				border: none !important;
				height: 36px;
			}
		}
		.el-select {
			width: 100%;
		}
		.diagBtnCon {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-content: center;
			align-items: center;
			.marLeft {
				margin-left: 20px;
			}
		}
	}	
</style>
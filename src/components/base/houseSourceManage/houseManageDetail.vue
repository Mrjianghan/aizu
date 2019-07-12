<template>
  <div class="houseManageDetailContainer"> 
	  <div class="top whiteBg">
		  <div class="topHeader flex">
			  <div class="topHeadLeft flex">				  
				  <div class="goBack" @click="goBack">
					  <i class="icon-fanhui- iconfont"></i>&nbsp;&nbsp;<span>返回</span>
					</div>
				  <el-dropdown @command="handleCommand">
						<RedBtn :text="'授权码'" class="dropCus" showArrow></RedBtn>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="a">添加授权码</el-dropdown-item>
							<el-dropdown-item command="b">删除授权码</el-dropdown-item>	
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			  <div class="topHeadRight flex">	
				  <div class="turn" @click="rentalChange">出租变换</div>				  
				  <div class="save" @click="saveFormContent">保存</div>
				</div>
			</div>
		  <div class="formCon">	
			  <div>
				  <div class="roomManager greyBorder  inputFlex animated flex">
					  <div class="title">房源责任人</div>
					  <input class="hiddenInput" type="text" placeholder="输入房源责任人" v-model.trim="firstPartForm.roomManager" @change="">
					</div>
					  <div class="errorLimitHeight"><span  v-show="$v.form.roomManager.$error">请输入房源责任人</span></div>
			  </div>
			  <div>
				  <div class="roomName greyBorder  inputFlex animated flex">
					  <div class="title">房源名称</div>
					  <input class="hiddenInput" type="text" placeholder="输入房源名称" v-model.trim="form.roomName" @change="">
					</div>
				  <div class="errorLimitHeight"><span  v-show="$v.form.roomName.$error">请输入房源名称</span></div>
			  </div>              
              <div>
				  <div class="selectCon flex">
					  <div class="greyBorder fourSame flexCon animated flex">
                          <div class="title">所属部门</div>
						  <el-select v-model.trim="form.roomType" placeholder="" @change="">
                              <el-option
                                  v-for="item in departmentOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
							</el-select>
						</div>
					  <div class="greyBorder fourSame flexCon animated flex">
                          <div class="title">违约专员</div>
						  <el-select v-model.trim="form.roomPutAway" placeholder="" @change="">
                              <el-option
                                  v-for="item in defaultHandlerOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>      
							</el-select>
						</div>
                      <div class="greyBorder fourSame flexCon animated flex">
                          <div class="title">维修师傅</div>
						  <el-select v-model.trim="form.roomPutAway" placeholder="" @change="">
                              <el-option
                                  v-for="item in repairOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>  
							</el-select>
						</div>
                      <div class="greyBorder fourSame flexCon animated flex">
                          <div class="title">空房检查师傅</div>
						  <el-select v-model.trim="form.roomPutAway" placeholder="" @change="">
							  <el-option
                                  v-for="item in repairOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>  
							</el-select>
						</div>
					</div>
				  <div class="errorLimitHeight"><span  v-show="$v.form.roomType.$error || $v.form.roomPutAway.$error">请检查选项</span></div>
			  </div>
			  <div>
				  <div class="selectCon flex">
					  <div class="greyBorder selectSame flexCon animated flex">
                          <div class="title">房源类型</div>
						  <el-select v-model.trim="form.roomType" placeholder="" @change="">
							  <el-option label="全新" value="NEW"></el-option>
							  <el-option label="二手" value="SECOND"></el-option>
							</el-select>
						</div>
					  <div class="greyBorder selectSame flexCon animated flex">
                          <div class="title">是否上架</div>
						  <el-select v-model.trim="form.roomPutAway" placeholder="" @change="">
							  <el-option label="上架" value="1"></el-option>
							  <el-option label="下架" value="0"></el-option>
							</el-select>
						</div>
					</div>
				  <div class="errorLimitHeight"><span  v-show="$v.form.roomType.$error || $v.form.roomPutAway.$error">请检查选项</span></div>
			  </div>
              <div>
				  <div class="CommunityName greyBorder  flexCon animated flex" >
					  <div class="title">小区名称</div>
					  <input class="hiddenInput" type="text" placeholder="输入小区名称" v-model.trim="form.community" @change="" disabled>
					</div>
				  <div class="errorLimitHeight"><span  v-show="$v.form.community.$error">请输入小区名称</span></div>
			  </div>
			  <div>				
				  <div class="priceCon  flex">
						  <div class="greyBorder fourSame  flexCon animated flex" >
						  <div class="title">最低价格</div>
							<input class="hiddenInput" type="text" placeholder="￥" v-model.trim="form.minPrice" @change="">
						</div>
					  <div class="greyBorder fourSame  flexCon animated flex">
						  <div class="title">收进价格</div>
							<input class="hiddenInput" type="text" placeholder="￥" v-model.trim="form.incomePrice" @change="">
						</div>
					  <div class="greyBorder fourSame  flexCon animated flex" >
						  <div class="title">显示价格</div>
							<input class="hiddenInput" type="text" placeholder="￥" v-model.trim="form.layerPrice" @change="">
						</div>
					  <div class="greyBorder fourSame  flexCon animated flex" >
						  <div class="title">授权价格</div>
							<input class="hiddenInput" type="text" placeholder="￥" v-model.trim="form.authorizedPrice" @change="">
						</div>
					  
					</div>	
				  <div class="errorLimitHeight"><span  v-show="($v.form.minPrice.$error)||($v.form.incomePrice.$error)||($v.form.layerPrice.$error)">请输入价格</span></div>
			  </div>
			  <div>
				  <div class="roomAddress greyBorder  flexCon animated flex" >
					  <div class="title">房源地址</div>
							<input class="hiddenInput" type="text" placeholder="输入房源地址" v-model.trim="form.address" @change="">
					</div>
					  <div class="errorLimitHeight"><span  v-show="$v.form.address.$error">请输入房源地址</span></div>
				</div>
			  <div>
				  <div class="  flexCon flex">
					  <div class="greyBorder fourSame flexCon animated flex" >
						  <div class="title configTitle">屋内配置</div>
						  <div class="hiddenInput roomConfig flex">
							  <div><input class="roomNumber" type="text"  v-model.trim="form.room" @change=""></div>
							  <div class="roomConfigText">室</div>
							  <div><input class="roomNumber" type="text"  v-model.trim="form.hall" @change=""></div> 
							  <div class="roomConfigText">厅</div>
							  <div><input class="roomNumber" type="text"  v-model.trim="form.toilet" @change=""></div>
							  <div class="roomConfigText">厨</div>
							  <div><input class="roomNumber" type="text"  v-model.trim="form.toilet" @change=""></div>
							  <div class="roomConfigText">卫</div>
							</div>
						</div>
					  <div class="greyBorder fourSame flexCon animated flex" >
						  <div class="title">房屋朝向</div>
							<input class="hiddenInput" type="text" maxlength="2" v-model.trim="form.direction" placeholder="请输入" @change="">
						</div>
					  <div class="greyBorder fourSame flexCon animated flex">
						  <div class="title">房屋楼层</div>
							<input class="hiddenInput" maxlength="2" type="text"  v-model.trim="firstPartForm.floor" placeholder="请输入" @change="">
						</div>
					  <div class="greyBorder fourSame flexCon animated flex" >
						  <div class="title">房屋面积</div>
							<input class="hiddenInput" type="text" maxlength="2" placeholder="m²"  v-model.trim="firstPartForm.area" @change="">
						</div>
					</div>
					  <div class="errorLimitHeight"><span  v-show="($v.form.room.$error)||($v.form.hall.$error)||($v.form.toilet.$error)||($v.form.direction.$error)||($v.form.floor.$error)||($v.form.area.$error)">请检查输入</span></div>

			  </div>
			  <div>
				  <div class="roomDescribe greyBorder  flexCon animated flex" >
						<div class="title">房源简介</div>
							<input class="hiddenInput" type="text" placeholder="输入房源简介" v-model.trim="form.describe" @change="">
					</div>
				  <div class="errorLimitHeight"><span  v-show="$v.form.describe.$error">请输入房源简介</span></div>
			  </div>
			  <div class="dragMaster flex">
				  <div class="imgTitle title">房源照片</div>
					<div v-for="(img,i) in imgArr"  :key="i" class="picsItem" :style="{backgroundImage: 'url('+img.url+')'}" @click.stop="pickPic(i,'imgArr')">
						<div class="blackBar"><i @click.stop="deleteThisPic(i)" class="icon-shanchu- iconfont"></i></div>
					</div>
					<div class="slotFooter"  v-show="imgArr.length < 10" @click="addPeople">
						<i class="icon-jia- iconfont"></i>
						<input type="file" ref="houseManageRoomPic" multiple  accept="image/x-png,image/jpeg" @change="uploadLogo">
					</div>
				  <div class="explain"><span>※</span>最多可上传10张图片。</div>
				</div>
		  </div>
	  </div>
	  <div class="bottom whiteBg">
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
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 99%"   :height="tableHeight"     
						@selection-change="handleSelectionChange">
				  <el-table-column   type="selection"> </el-table-column>
				  <el-table-column   type="index" label="序号"> </el-table-column>
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
			<Del v-if="multipleDelShow"   :delCon = "delConfirm" :delCancel = "delCancel"></Del>
		</transition>
		<transition name="popDel">	
			<Del v-if="singleDelShow"   :delCon = "singleDelConfirm" :delCancel = "singleDelCancel"></Del>
		</transition>
		<transition name="popDel">
			<Del v-if="picDelShow"   :delCon = "picDelConfirm" :delCancel = "picDelCancel"></Del>
		</transition>
		<el-dialog title="新增屋内配置" :visible.sync="dialogFormVisible" class="diagCon" :close-on-click-modal="false">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
<!--
				 <el-form-item label="配置类型" >
					  <el-select v-model.trim="ruleForm.type" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					  </el-select>
					</el-form-item>
-->
				<el-form-item label="物品名称" class="specialForm" prop="special">
				  <el-input v-model.trim="ruleForm.type" placeholder="请输入物品名称" v-if="showNormal" class="specialSet"></el-input>
				 <el-select v-model.trim="ruleForm.type" placeholder="请选择活动区域" v-else>
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				  </el-select>
				 <span class="addOther" @click="changeNormal" v-text="normalText"></span>
				</el-form-item>
				<el-form-item label="新旧程度" >
				  <el-select v-model.trim="ruleForm.type" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="产品类型" prop="name">
					<el-input v-model.trim="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="数量" prop="name">
					<el-input v-model.trim="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="房东承担" >
				  <el-select v-model.trim="ruleForm.type" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="费用" prop="">
					<el-input v-model.trim="ruleForm.name" :disabled="ableEditMoney"></el-input>
				</el-form-item>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="addNewFurnitureAction"></RedBtn>
					<GreyBtn class="marLeft" @click.native="shutAddNewFurniture"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
		<el-dialog title="编辑屋内配置" :visible.sync="dialogEditFormVisible" class="diagCon diagEditCon" :close-on-click-modal="false">
			<el-form :model="ruleEditForm" :rules="editRules" ref="ruleEditForm" label-width="100px">
				<el-form-item label="新旧程度" >
				  <el-select v-model.trim="ruleEditForm.type" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="产品类型" prop="name">
					<el-input v-model.trim="ruleEditForm.name"></el-input>
				</el-form-item>
				<el-form-item label="数量" prop="name">
					<el-input v-model.trim="ruleEditForm.name"></el-input>
				</el-form-item>
				<el-form-item label="房东承担" >
				  <el-select v-model.trim="ruleEditForm.type" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="费用" prop="">
					<el-input v-model.trim="ruleEditForm.name" :disabled="ableEditMoney"></el-input>
				</el-form-item>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="editNewFurnitureAction"></RedBtn>
					<GreyBtn class="marLeft" @click.native="shutEditNewFurniture"></GreyBtn>
				</div>
			</el-form>
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
		<transition name="popDel">
			<Del v-if="authShow"   :delCon = "authDelConfirm" :delCancel = "authDelCancel"></Del>
		</transition>
		<el-dialog title="输入授权码" :visible.sync="authShowDialogue" class="diagCon diagAuthCon" :close-on-click-modal="false">
					<el-input v-model.trim="authCode"></el-input>
				<div class="diagBtnCon flex">
					<RedBtn  @click.native="saveAuth"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAuth"></GreyBtn>
				</div>
		</el-dialog>
		<el-dialog title="确认上传图片" :visible.sync="uploadShow" class="diagCon diagAuthCon" :close-on-click-modal="false">
				<div class="uploadInfoText">确认是否上传图片？</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'确定'" @click.native="confirmUpload"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelUpload"></GreyBtn>
				</div>
		</el-dialog>
		<el-dialog title="切换" :visible.sync="rentalChangeShow" class="diagCon diagAuthCon" :close-on-click-modal="false">
            <div class="rentalContainer flex">
                <RedBtn class="setUnableRent" :text="'变为可出租'" @click.native="setAbleRent"></RedBtn>
                <RedBtn class="setUnableRent" :text="'变为不可出租'"  @click.native="setUnableRent"></RedBtn>
            </div>
		</el-dialog>
  </div>
</template>
<script>
	import { required,numeric } from 'vuelidate/lib/validators';	
	import { mapGetters } from 'vuex'	  
    export default {
		name:'duplicate',
		computed: {
			...mapGetters([
                'tagsLists',
				'tagActive'
			])
		  },
        data(){
			return {
                repairOptions:[],
                defaultHandlerOptions:[],
                departmentOptions:[],
				rentalChangeShow:false,
				normalText:'添加其他',
				showNormal:false,
				uploadShow:false,
				authCode:'',
				authShowDialogue:false,
				authShow:false,
				imgPreviewShow:false,
				leftArrowSrc:require('../../../../public/imgs/leftAble.png'),
				rightArrowSrc:require('../../../../public/imgs/leftAble.png'),
				shutSrc:require('../../../../public/imgs/shutPic.png'),
				leftUnable:false,
				rightUnable:false,
				currentSrc:'',
				picIndex:0,
				deepImgArr:[],
				blobArr:[],
				lockImgArrName:'imgArr',
				imgArr:[
                    { url:require('../../../../public/imgs/sfz2.png') },
                    { url:require('../../../../public/imgs/sfz2.png') },
                    { url:require('../../../../public/imgs/sfz2.png') },
//                    { url:require('../../../../public/imgs/sfz2.png') },
//                    { url:require('../../../../public/imgs/sfz2.png') },
//                    { url:require('../../../../public/imgs/sfz2.png') },
//                    { url:require('../../../../public/imgs/sfz2.png') },
				],				
				form:{
					roomManager:'',
					roomName:'',
					roomType:'',
					roomPutAway:'',
					community:'',
					minPrice:'',
					incomePrice:'',
					layerPrice:'',
					address:'',
					direction:'',
					floor:'',
					area:'',
					room:'',
					hall:'',
					toilet:'',
					describe:'',
				},
				dialogEditFormVisible:false,
				ruleEditForm:{},
				editRules:{},
				tableData3:[
					{name:'merere'},
				],
				tableHeight:100,
				multipleSelection:[],
				delAble:false,
				multipleDelShow:false,
				singleDelShow:false,
				picDelShow:false,
				dialogFormVisible:false,
				ableEditMoney:true,
				ableRent:true,
				trackDelIndex:null,
				ruleForm:{
					name:'test',
					type:'',
				},
				rules:{
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' }
					  ],
				},
                firstPartForm:{},
			}
		},
		mounted(){			
            this.initDepartmentOptions();
            this.initDefaultHandlerOptions();
            this.initRepairOptions();
            this.initRequest();
		},
		watch:{
			"tableData3":function(newval,val){
                this.Digital.setTableHeight.bind(this)('tableHeight',(newval.length+1)*50);
			},
			"multipleSelection":function(nval,val){
				console.log(nval.length);
				if(nval.length) {
					this.delAble = true;
				}else{
					this.delAble = false;
				}
			},
		},
		validations: {
			form:{
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
					numeric,
				},
				incomePrice:{
					required,
					numeric,
				},
				layerPrice:{
					required,
					numeric,
				},
				address:{
					required,
				},
				room:{
					required,
				},
				hall:{
					required,
				},
				toilet:{
					required,
				},
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
				},
			},
		
		  },
		methods:{	
            initRequest(){
                this.Digital.aesDecrypt.bind(this)();                
                let data1 = {
                    id:this.routeQuery.id
                };                  
                this.ApiLists[10032](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { message,success,data }=layer1;
                    if( success ){
                        console.log( data );     
                        this.firstPartForm = data;  
                    }else{
                       this.$message.error(message);
                    }  
                }).catch(err=>{
                    console.log(err); 
                });   
            },
            initDepartmentOptions(){
                let interfaceArr = [1,2,3,4,5,6,7,8];
                let final =this.StateData.departmentArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                        return val;
                    }
                });
                this.departmentOptions = final;
            },            
            initDefaultHandlerOptions(){
                let interfaceArr = [0,1,2,3,4,5,6,7,8];
                let final =this.StateData.defaultHandlerArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                        return val;
                    }
                });
                this.defaultHandlerOptions = final;
            },
            initRepairOptions(){
                let interfaceArr = [0,1,2,3,4,5,6,7,8];
                let final =this.StateData.repairerArr.filter((val,index)=>{
                    if( interfaceArr.includes(index) ){
                        return val;
                    }
                });
                this.repairOptions = final;
            },
			setAbleRent(){
				this.rentalChangeShow = false;
				this.Success.normalSuccess();
			},
			setUnableRent(){
				this.rentalChangeShow = false;
				this.Success.normalSuccess();
			},
			rentalChange(){
				this.rentalChangeShow = true;
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
			confirmUpload(){
//				this.uploadShow = false;
				console.log( this.blobArr );	
			},
			cancelUpload(){
				this.uploadShow = false;
				this.imgArr = this.deepImgArr;
				this.blobArr = [];
			},
			saveAuth(){
				if(this.authCode.length){
				   
				}
//				this.authShowDialogue = false;
			},
			cancelAuth(){
				this.authShowDialogue = false;
			},
			authDelConfirm(){
				this.authShow = false;
                this.Success.deleteSuccess();
			},
			authDelCancel(){
				this.authShow = false;
			},
			handleCommand(command) {
				switch (command) {
					case "a":
						this.authShowDialogue = true;
						break;
					case "b":	
						this.authShow = true;
						break;
				}
			},
			authorizedPriceBlur(){				
			},
			pickPic(i,str){
				this.lockImgArrName = str;
				this.Digital.repackPicThisPic.bind(this)(i);
			},
			leftRoll(){
				this.Digital.repackLeftRoll.bind(this)();    
			},
			rightRoll(){
				this.Digital.repackRightRoll.bind(this)();
			},
			shut(){
				this.imgPreviewShow = false;
			},			
			uploadLogo(){
				this.blobArr = [];
                let tar = this.$refs.houseManageRoomPic;
				let fileGenerate =  Array.from(tar.files);	
				let selectLength = fileGenerate.length;
				let typeDetection = fileGenerate.every(ele=>{
					let fun = (ele.type == "image/jpeg")||(ele.type == "image/png");
					return fun;
				});
				if(typeDetection){	
					let existLength = this.imgArr.length;
					if( (existLength + selectLength)>10 ){
						this.$message.error(`图片个数不能超过10张，还可再上传${ 10-existLength }张图片。`);
						tar.value = '';						
					}else{	
						this.deepImgArr = JSON.parse(JSON.stringify(this.imgArr));
						let empArr = [];
						let bridge = [];
						let initOrder = existLength;						
						let now = fileGenerate.map((ele)=>{							
							let reader = new FileReader();
							reader.onload = ()=>{								
								initOrder +=1;									
								let obj = {
									order:initOrder,
									img:reader.result 
								};
								empArr.push(obj);
								this.imgArr.push(obj);
								let imgObj = new Image();
								imgObj.src = reader.result;	
								let canvas = document.createElement('canvas');
								let context = canvas.getContext('2d');				
								setTimeout(()=>{
									let imgHeight = imgObj.naturalHeight;
									let imgWidth = imgObj.naturalWidth;	
									let picOriginalSize = imgHeight*imgWidth;
									let ratio = picOriginalSize/(2000 * 2000);
									let canvasWidth = 0;
									let canvasHeight = 0;
									if( ratio > 1 ){											
										canvasWidth = parseInt( imgWidth/ratio );
										canvasHeight = parseInt( imgHeight/ratio );		
									}else{
										canvasWidth = imgWidth;
										canvasHeight = imgHeight;
									}	
									canvas.width = canvasWidth;
									canvas.height = canvasHeight;									
									context.fillStyle = '#fff';
									context.fillRect(0,0,canvasWidth,canvasHeight);										
									function convertBase64UrlToBlob(urlData){
										var bytes=window.atob(urlData.split(',')[1]);   
										var ab = new ArrayBuffer(bytes.length);
										var ia = new Uint8Array(ab);
										for (var i = 0; i < bytes.length; i++) {
											ia[i] = bytes.charCodeAt(i);
										}
										return new Blob( [ab] , {type : 'image/jpeg'});
									}									
									context.drawImage( imgObj,0,0,canvasWidth,canvasHeight );	
									let url = canvas.toDataURL("image/jpeg", 0.6);
									let blob = convertBase64UrlToBlob(url);
									console.log('blob',blob);									
									this.blobArr.push(blob);									
									console.log( 'this.blobArr',this.blobArr );									
								},500);								
							};
							reader.readAsDataURL( ele );
						});		
						this.uploadShow = true;
						tar.value = '';						
					}
				}else{
				   this.$message.error('只支持jpg，png');
					tar.value = '';
				}			
            },
			editNewFurnitureAction(){
				this.dialogEditFormVisible = false;
			},
			shutEditNewFurniture(){
				this.dialogEditFormVisible = false;
			},
			popEditForm(){
				this.dialogEditFormVisible = true;
			},
			turn(){
				if(this.ableRent){
					this.ableRent = false;
					this.Success.normalSuccess();
				}else{
					this.ableRent = true;
					this.Success.normalSuccess();
				}
			},
			saveFormContent(){	
				let grabArr = Object.keys(this.$v.form);	
				let filterArr = grabArr.filter((ele)=>{
					return ele.indexOf('$') < 0;					
				});
				console.log(filterArr);
				filterArr.forEach((ele)=>{
					this.$v.form[ele].$touch();
				});
				let judgeCondition = filterArr.some((ele)=>{
					return this.$v.form[ele].$invalid === true;
				});
				console.log( judgeCondition );				
				if(  judgeCondition  ){
				   this.$message.error('检查内容。');	
				}else{
				   this.Success.saveSuccess();
//				this.Err.netErr();
				}
			},
			addNewFurnitureAction(){
				this.dialogFormVisible = false;
			},
			shutAddNewFurniture(){
				this.dialogFormVisible = false;
			},
			addNewFurniture(){
				this.dialogFormVisible = true;
			},
			delSingle(){
				this.singleDelShow = true;
			},
			singleDelConfirm(){
				this.singleDelShow = false;
//				this.Success.deleteSuccess();
				this.Err.netErr();
			},
			singleDelCancel(){
				this.singleDelShow = false;
			},
			delCancel(){
				this.multipleDelShow = false;
			},
			delConfirm(){
				this.multipleDelShow = false;
				this.Success.deleteSuccess();
//				this.Err.netErr();
			},
			delFurniture(){
				if(this.delAble){
					this.multipleDelShow = true;
				}
			},
			picDelConfirm(){
				console.log( this.trackDelIndex );
				this.picDelShow = false;	
                this.Success.deleteSuccess();
				this.imgArr.splice( this.trackDelIndex,1 );				
			},
			picDelCancel(){
				console.log( this.trackDelIndex );
				this.picDelShow = false;
				this.trackDelIndex = null;
			},
			tempClick(){
				this.tableData3 = [
					{name:'meeere'},
					{name:'merre'},
					{name:'meerre'},
				];
//				this.tableHeight = (this.tableData3.length + 1)*50;
			},
			handleSelectionChange(val){
				console.log(val);
				this.multipleSelection = val;
			},
			deleteThisPic(i){
				this.picDelShow = true;				
				this.trackDelIndex = i;
			},
			addPeople(){
			},
			goBack(){                
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/houseManage');                 
			},
		},
    }
</script>
<style scoped lang="scss">
	.setUnableRent {
		width: 100px !important;
	}
    .selectSame {
		width: 446px;
	}
	.rentalContainer {
		width: 250px;
		margin: 0 auto;
		margin-top: 10px;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
	.addOther {
		margin-left: 10px;
		color: $mainRed;
		cursor: pointer;
	}
	.uploadInfoText {
		height: 40px;
		line-height: 40px;
	}
	.fourSame {
		width: 220px;
	}
	.btnDisable {
		cursor: not-allowed !important;
	}	
	.dropCus {
		margin-left: 20px;
		margin-right: 20px;
		background-color: #eafafe;
		color: #07aedb;
		box-shadow: none;
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
	.houseManageDetailContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.errorLimitHeight {
			height: 20px;
			color: $mainRed ;
			font-size: 12px;
			box-sizing: border-box;
			padding-left: 50px;
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
		.bottom {
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
				.bottomHeaderTitle {
					font-size: 16px;
					font-weight: 600;
				}
				.bottomHeaderIconCon {
					width: 100px;
					justify-content: space-between;
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
				}
			}
		}
		.top {
			margin-bottom: 24px;
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
                    margin-bottom: 20px;
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
			.formCon {
				width: 900px;
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
					flex-wrap: nowrap;
					justify-content:space-between;
				}
				.selectCon {
					justify-content: space-between;
				}
				.priceCon {
					flex-wrap: nowrap;
					justify-content: space-between;
					.thirdSame {
						width: 280px;
					}
				}
			}
		}
		.greyBorder {
			border: 2px solid #efeef3;
			box-sizing: border-box;
			height: 50px;
		}
		.whiteBg {
			box-sizing: border-box;
			padding: 24px;
			background-color: #fff;
			border-radius: 10px;
		}
		.topHeader {
			height: 40px;
			margin-bottom: 24px;
			flex-wrap: nowrap;
			justify-content: space-between;
			.topHeadLeft {
				flex-wrap: nowrap;
				justify-content: flex-start;
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
			.topHeadRight {
				flex-wrap: nowrap;
				justify-content: space-between;
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
				}
			}
		}
	}
</style>
<style lang="scss">
	.houseManageDetailContainer {
		.top .el-select {
			width: 80%;
			margin-left: 2%;
		}       
		.specialSet {
			width: 80% !important;
		}
		.specialForm .el-select  {
			width: 80% !important;
		}
		.formCon  .el-input__inner {
			border-color: #fff;
		}
	    .formCon  .el-select .el-input.is-focus .el-input__inner {
			 border-color: #fff !important; 
		} 
		.top input  {
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
		table {
			border: none;
		}
		.el-table thead {
			color: #a4aabc;
			font-weight: 400;
			font-size: 13px;
			th {
				font-weight: normal;
			}
		}
		.el-table td, .el-table th.is-leaf {
			border-color: #fff;
		}
        .diagCon  {
            .el-dialog {
                width: 540px !important;
                height: 540px !important;
            }
            .el-select {
                width: 100%;
            }
        }
		.diagEditCon .el-dialog{
			height: 480px !important;
		}		
		.diagAuthCon .el-dialog {
			height: 220px !important;
		}
		.el-dialog__body { 
			padding: 30px 20px !important;
		}
	}
</style>
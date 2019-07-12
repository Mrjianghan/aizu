<template>
  <div class="repairOrderDetailContainer">  
	  <div class="tableShow" v-show="tableShow">                 
				  <div id="repairOrderDetailPrintContainer">
                      <table>
                          <caption class="tablePrintHeader">工程维修单 合同号NB107674</caption>
                          <thead>
                              <tr>
                                  <td>小区名</td>
                                  <td>{{holder1}}</td>
                                  <td>住宅地址</td>
                                  <td>{{holder2}}</td>
                                  <td>报修时间</td>
                                  <td>{{holder3}}</td>
                                </tr>
                            </thead>
                          <tbody>
                              <tr>
                                  <td>客户姓名</td>
                                  <td>{{holder4}}</td>
                                  <td>联系电话</td>
                                  <td>{{holder5}}</td>
                                  <td>维修类型</td>
                                  <td>{{holder6}}</td>
                                </tr>
                              <tr>
                                  <td>维修项目</td>
                                  <td colspan="5">{{holder7}}</td>
                                </tr>
                              <tr>
                                  <td>报修内容</td>
                                  <td colspan="5">{{holder8}}</td>
                                </tr>
                              <tr>
                                  <td>维修人</td>
                                  <td>{{holder9}}</td>
                                  <td class="specialOne">维修人电话</td>
                                  <td>{{holder10}}</td>
                                  <td class="specialOne">预计完成时间</td>
                                  <td>{{firstPartForm.gmtReserve | emptyProcessor}}</td>
                                </tr>
                              <tr>
                                  <td class="specialOne">维修记录</td>
                                  <td colspan="5">{{holder12}}</td>
                                </tr>
                            </tbody>                          
                        </table>                      
					</div>
		</div>	  
	  <div class="safeCon">
		  <div class="topHeader flex">
			  <div class="topHeadLeft" @click="goBack">
				  <i class="icon-fanhui- iconfont"></i>&nbsp;&nbsp;<span>返回</span>
				</div>
			  <div class="topHeadRight flex">
				  <RedBtn :text="'分配'" @click.native="showSet"></RedBtn>
				  <div class="print" @click="print">打印</div>
				</div>
			</div>		  
		  <div class="horizonCon flex">
			  <div class="left">				  
				<div class="repairInfoCon">
					<div class="repairInfoFirst flex">
						<span class="repairInfoTitle">维修单信息</span>
						<span class="repairInfoStatus">[状态：{{tableArr1[firstPartForm.status] | emptyProcessor}}]</span>
					</div>
					<div class="repairInfoDetailCon">
						<div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">合同号</div>
							<div class="repairInfoDetailContent">{{firstPartForm.contractNo | emptyProcessor}}</div>
						</div>
						<div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">小区</div>
							<div class="repairInfoDetailContent">{{ | emptyProcessor}}</div>
						</div>
						<div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">登记时间</div>
							<div class="repairInfoDetailContent">{{firstPartForm.gmtCreate | emptyProcessor}}</div>
						</div>
						<div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">地址</div>
							<div class="repairInfoDetailContent">{{ | emptyProcessor}}</div>
						</div>
                        <div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">联系人</div>
							<div class="repairInfoDetailContent">{{ | emptyProcessor}}</div>
						</div>
                        <div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">联系电话</div>
							<div class="repairInfoDetailContent">{{ | emptyProcessor}}</div>
						</div>
						<div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">费用承担</div>
							<div class="repairInfoDetailContent">{{ | emptyProcessor}}</div>
						</div>
						<div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">维修项目</div>
							<div class="repairInfoDetailContent">{{tableArr2[firstPartForm.repairItem] | emptyProcessor}}</div>
						</div>
						<div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">维修类型</div>
                            <div class="repairInfoDetailContent">{{ new Map( [ [true,'外包'],[false,'内部维修'] ] ).get( firstPartForm.outsourcing )  | emptyProcessor}}</div>  
						</div>
						<div class="repairInfoDetailLists flex">
							<div class="repairInfoDetailTitle">报修说明</div>
							<div class="repairInfoDetailContent">{{firstPartForm.repairContent | emptyProcessor}}</div>
						</div>						
					</div>
				</div>
				  <div class="noteInfoCon">
					  <div class="noteInfoHead ">客服备注信息</div>
					  <div class="limit">
						   <div class="textCon flex">
							  <div class="title">客服备注</div>
							  <div>
								  <el-input	maxlength="200" class="textarea"  type="textarea"  :rows="4"  placeholder="请输入内容"  v-model.trim="textareaValue"	:resize="'none'">
									</el-input>
								  <div class="des"><span>※</span>仅客服可见，200字以内</div>
							</div>
						</div>
						  <div class="topHeadLeft specialConfirm" @click="confirmNote"><span>确认</span></div>
					</div>
					</div>
				</div>
			  <div class="right">
				  <div class="repairStaffInfo">
					  <div class="repairStaffInfoFirst flex">维修人员信息</div>
					  <div class="repairStaffInfoLists flex">
							<div class="repairStaffInfoTitle">负责人</div>
							<div class="repairStaffInfoContent">上话</div>
						</div>
					  <div class="repairStaffInfoLists flex">
							<div class="repairStaffInfoTitle">联系电话</div>
							<div class="repairStaffInfoContent">18067303981</div>
						</div>
					  <div class="repairStaffInfoLists flex">
							<div class="repairStaffInfoTitle">预计完成时间</div>
							<div class="repairStaffInfoContent">{{firstPartForm.gmtReserve | emptyProcessor}}</div>
						</div>
					  <div class="repairStaffInfoLists flex">
							<div class="repairStaffInfoTitle">维修记录</div>
						  <el-input	maxlength="200" class="textarea"  type="textarea"  :rows="4" placeholder="请输入维修记录"  v-model.trim="repairStaffTextValue"	:resize="'none'"></el-input>
						  	<div class="topHeadLeft specialConfirm" @click="recordsConfirm"><span>确认</span></div>
						</div>
					  <div class="repairStaffInfoLists flex">
							<div class="repairStaffInfoTitle">报修图片</div>
							<div class="imgCon flex">
								<template v-for="(val,i) in imgArr">
									<div class="img" @click="pickPic(i,'imgArr')" :style="{backgroundImage: 'url('+val.url+')'}"></div>									
								</template>
                                <div class="repairStaffInfoContent" v-show="!imgArr.length">无</div>
<!--
                                <div class="slotFooter" slot="footer" v-show="imgArr.length < 4" @click="addPeople">
                                    <i class="icon-jia- iconfont"></i>
                                    <input type="file" ref="repairOrderDetailPics" multiple  accept="image/x-png,image/jpeg" @change="uploadLogo">
                                </div>
-->
							</div>
						</div>
                        <div class="repairStaffInfoLists flex">
							<div class="repairStaffInfoTitle">维修图片</div>
							<div class="imgCon flex">
								<template v-for="(val,i) in imgArr2">
									<div class="img" @click="pickPic(i,'imgArr2')" :style="{backgroundImage: 'url('+val.url+')'}"></div>									
								</template>
                                <div class="repairStaffInfoContent" v-show="!imgArr2.length">无</div>
<!--
                                <div class="slotFooter" slot="footer" v-show="imgArr2.length < 4" @click="addPeople">
                                    <i class="icon-jia- iconfont"></i>
                                </div>
-->
							</div>
						</div>

					</div>
				  <div class="progressContainer">
					  <div class="progressTitle">流程</div>
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
	  <el-dialog title="分配" :visible.sync="setVisible" class="diagCon  coverDiagCon" :close-on-click-modal="false">
			<el-form :model="setForm"  ref="setForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="维修人号码">
						<el-input v-model.trim="setForm.no"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'确定'" @click.native="confirmSet"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelSet"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
	<transition name="popDel">
		<div class="imgBgContainer" v-if="imgPreviewShow" @keyup="keyUpHandler($event)" tabindex="0" ref="imgBgContainer">
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
	<el-dialog title="确认上传图片" :visible.sync="uploadShow" class="diagCon diagAuthCon" :close-on-click-modal="false">
				<div class="uploadInfoText">确认是否上传图片？</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'确定'" @click.native="confirmUpload"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelUpload"></GreyBtn>
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
        data(){
			return {
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
					},
					{
						description: "备注啊",
						gmtCreate: "2019-03-29 09:29:52",
						name: "戎磊"
					}
				],
                uploadShow:false,
				textareaValue:'',
				repairStaffTextValue:'',
				tableShow:false,
				holder1:' ',	
				holder2:' ',	
				holder3:' ',	
				holder4:' ',	
				holder5:' ',	
				holder6:' ',	
				holder7:' ',	
				holder8:' ',	
				holder9:' ',	
				holder10:' ',	
				holder11:' ',	
				holder12:' ',	
				setVisible:false,
				setForm:{},
                blobArr:[],
                imgArr2:[],
				imgArr:[
//                    require('../../../../public/imgs/sfz2.png'),            
                ],	
                lockImgArrName:'imgArr',
                deepImgArr:[],
				leftArrowSrc:require('../../../../public/imgs/leftAble.png'),
				rightArrowSrc:require('../../../../public/imgs/leftAble.png'),
				shutSrc:require('../../../../public/imgs/shutPic.png'),
				leftUnable:false,
				rightUnable:false,
				imgPreviewShow:false,
				currentSrc:'',
				picIndex:0,
                routeQuery:{},
                tableArr1:{},
                tableArr2:{},
			}
		},		
		mounted(){		
            this.initRequest();  
            this.initTableArr1();
            this.initTableArr2();
		},
		methods:{
            keyUpHandler($event){
                let shutDown = ()=>{
                    this.imgPreviewShow = false;
                }
                let map = new Map([
                    [27,shutDown],
                    [37,this.leftRoll],
                    [39,this.rightRoll]
                ]);
                let condition = map.has( $event.keyCode );
                if( condition ){
                    map.get( $event.keyCode )();
                }
            },
            initTableArr2(){ 
                let obj = {};
                this.StateData.repairOrderFurnitureArr.forEach(ele=>{
                    obj[ele.value] = ele.label;
                });
                this.tableArr2 = obj;  
            },
            initTableArr1(){
                let obj = {};
                this.StateData.repairOrderStatusArr.forEach(ele=>{
                    obj[ele.value] = ele.label;
                });
                this.tableArr1 = obj;  
            },
            initRequest(){
                this.Digital.aesDecrypt.bind(this)();                
                let data1 = {
                    id:this.routeQuery.id
                };  
                this.ApiLists[10005](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { message,success,data }=layer1;
                    if( success ){
                        this.firstPartForm = data;                        
                    }else{
                       this.$message.error(message);
                    }  
                }).catch(err=>{
                    console.log(err); 
                });   
                
                
                let data2 = {
                    objectId:this.routeQuery.id,
                    type:'RENT_REPAIR_PIC'
                };  
                this.ApiLists[10031](data2).then(res=>{
                    let { data:layer1 } = res;
                    let { message,success,data }=layer1;
                    if( success ){
                        this.imgArr = data;                        
                    }else{
                       this.$message.error(message);
                    }  
                }).catch(err=>{
                    console.log(err); 
                }); 
                
                let data3 = {
                    objectId:this.routeQuery.id,
                    type:'SALESMAN_REPAIR_PIC'
                };  
                this.ApiLists[10031](data3).then(res=>{
                    let { data:layer1 } = res;
                    let { message,success,data }=layer1;
                    if( success ){
                        this.imgArr2 = data;                        
                    }else{
                       this.$message.error(message);
                    }  
                }).catch(err=>{
                    console.log(err); 
                }); 
                
                
                
//                this.ApiLists[10014]().then(res=>{
//                    let { data } = res;
//                    console.log( data );                    
//                    if( data.success ){
//                    }else{
//                    }
//                }).catch(err=>{
//                    console.log(err); 
//                }); 
            },
            addPeople(){                
            },
            uploadLogo(){
				this.blobArr = [];
                let tar = this.$refs.repairOrderDetailPics;
				let fileGenerate =  Array.from(tar.files);	
				let selectLength = fileGenerate.length;
				let typeDetection = fileGenerate.every(ele=>{
					let fun = (ele.type == "image/jpeg")||(ele.type == "image/png");
					return fun;
				});
                if( typeDetection ){
                    let existLength = this.imgArr.length;
					if( (existLength + selectLength)>4 ){
						this.$message.error(`图片个数不能超过4张，还可再上传${ 4-existLength }张图片。`);
						tar.value = '';	
                    }else{
                        this.deepImgArr = JSON.parse(JSON.stringify(this.imgArr));
                        let empArr = [];
						let bridge = [];
						let initOrder = existLength;
                        let now = fileGenerate.map((ele)=>{
                            let reader = new FileReader();
                            reader.onload = ()=>{
                                let obj = reader.result;
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
            confirmUpload(){
				this.uploadShow = false;
				console.log( this.blobArr );
			},
			cancelUpload(){
				this.uploadShow = false;
				this.imgArr = this.deepImgArr;
				this.blobArr = [];
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
            pickPic(i,str){
				this.lockImgArrName = str;
				this.Digital.repackPicThisPic.bind(this)(i);                
                this.$nextTick(()=>{
                    this.$refs.imgBgContainer.focus();
                });
			},
			recordsConfirm(){
				if(this.repairStaffTextValue){
                    this.Success.saveSuccess();
		//				this.Err.netErr();
				}else{
					this.$message.error('不能为空。');
				}
			},
			confirmNote(){
				if(this.textareaValue){
					if(this.textareaValue.length<=200){
					   this.Success.saveSuccess();
		//				this.Err.netErr();
					}else{
						this.$message.error('200字以内。');
					}
				}else{
					this.$message.error('不能为空。');
				}
			},
			showSet(){
				this.setForm = {};
				this.setVisible = true;
			},
			confirmSet(){
				if(this.setForm.no){
					if(this.setForm.no.length>4){
						this.setVisible = false;	
						this.Success.success();
		//				this.Err.netErr();
					}else{
						this.$message.error('检查输入。');
					}
				}else{
				   this.$message.error('检查输入。');
				}
			},
			cancelSet(){
				this.setVisible = false;	
			},
			goBack(){                
                this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/repairOrderManage');                 
			},
			print(){


			},
		},        
    }
</script>
<style scoped lang="scss">
    .imgCon .repairStaffInfoContent {
        margin-left: 0 !important;
    }
    .uploadInfoText {
		height: 40px;
		line-height: 40px;
	}
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
	.btnDisable {
		cursor: not-allowed !important;
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
					display: flex;
					align-content: center;
					align-items: center;
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
	.repairOrderDetailContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.diagBtnCon {
			margin-top: 30px;
			margin-bottom: 30px;
			flex-wrap: nowrap;
			justify-content: flex-end;
			.marLeft {
				margin-left: 20px;
			}
		}
		.tableShow {
			position: absolute;
			width: 750px;
			height: 400px;
			background-color: aquamarine;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
		}
		.safeCon {
			background-color: #fff;
			border-radius: 10px;
			padding: 24px;
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
			.topHeader {
				height: 40px;
				margin-bottom: 24px;
				flex-wrap: nowrap;
				justify-content: space-between;
				.topHeadRight {
					flex-wrap: nowrap;
					justify-content: flex-end;
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
						margin-left: 20px;
					}
				}
			}
			.horizonCon {
				justify-content: space-between;
				flex-wrap: nowrap;
				.left {
					width: 50%;
					.noteInfoCon {
                        margin-top: 30px;
						.specialConfirm {
							width: 70px !important;
							margin: 0 auto;
							margin-top: 20px;
						}
						.limit {
							width: 350px;
						}
						.noteInfoHead {
							font-size: 16px;
							font-weight: 600;
							margin-bottom: 30px;
						}
						.textCon {
				            justify-content: flex-start;
							.title {
								color: #a4aabc;
								font-size: 13px;
								width: 80px;
								text-align: right;
							}
							.des {
								text-align: right;
								color: #d5d7e0;
								font-size: 12px;
								span {
									color: $mainRed;
								}
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
						}
					}
					.repairInfoCon {
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
					}					
				}
				.right {
					width: 50%;
					.repairStaffInfo {
						.repairStaffInfoFirst {
							font-size: 16px;
							font-weight: 600;
				            justify-content: flex-start;
							margin-bottom: 30px;
						}
						.repairStaffInfoLists {
								justify-content: flex-start;
								margin-bottom: 20px;
							.imgCon {
/*								width: 300px;*/
								flex-wrap: wrap;
								justify-content: flex-start;
								margin-left: 20px;		
                                width: calc( 100% - 96px );
								.img {
									cursor: pointer;
									border-radius: 5px;
									width: 140px;
									height: 100px;
									margin-right: 10px;
									margin-bottom: 10px;
									background-repeat: no-repeat;
									background-position: center center;
									background-size: cover;
								}
							}							
							.specialConfirm{
								margin-left: 20px;
								width: 70px !important;
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
							.repairStaffInfoContent {
								font-weight: 600;
								font-size: 14px;
								margin-left: 20px;
							}
						}
					}
					.progressContainer {
						.progressTitle {
							font-size: 16px;
							font-weight: 600;
						}
						.progressDetails {
							margin-top: 24px;
						}
					}
				}
			}
		}
	}
</style>
<style  lang="scss">
	.repairOrderDetailContainer {
		.diagCon .el-select {
			width: 100%;
		}
		.el-dialog__body { 
			padding: 30px 20px !important;
		}
		.coverDiagCon .el-dialog{
			width: 540px !important;
			height: 250px !important;
			.scrollContainer {
				height: 70px !important;
			}
		}
        .diagAuthCon .el-dialog {
			height: 220px !important;
		}
        .diagCon .el-dialog {			
			width: 540px !important;
		}        
	}
</style>
<style  lang="scss">
	@media print  {
        @page {
            margin: 8mm;
            margin-top: 12mm;
        }
    }
    @media all  {  
        #repairOrderDetailPrintContainer {
            width: 100%;
            table {
                width: 90%;
                border-collapse: collapse;
                margin: 0 auto; 
                font-size: 12px;
                th,td {
                    border: 1px solid #bbc1d5;
                    text-align: center;
                    vertical-align: middle;
                    white-space:pre-wrap;
                }
            }
            .tablePrintHeader {
                margin-top: 18px;
                margin-bottom: 10px;
                font-size: 16px;
            } 
            .specialOne {
                width: 12%;
            }
        }
    }
</style>
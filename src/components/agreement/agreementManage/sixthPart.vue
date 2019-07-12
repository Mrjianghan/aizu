<template>	
  	<div class="sixthPartContainer"> 
		<div class="header idTopHeader">上传身份证</div>
		<div class="idTopContainer flex">
			<div class="idTopLeft">
				<div class="inputFileCon">
					<div v-if="!serverPic1" class="idTopTrueCon">
						<input type="file" ref="frontPic1" accept="image/x-png,image/jpeg" @change="upLoadFrontSide('frontPic1')">
						<img :src="idPic1">
					</div>
					<div v-else class="idTopFalseCon">
						<el-popover	placement="bottom"	trigger="hover">									
							<div class="checkOriginal1" @click="popImgPreview1">查看大图</div>
							<div class="btnInput1">
										<input type="file" ref="frontPic2" accept="image/x-png,image/jpeg" @change="upLoadFrontSide('frontPic2')">
										<div class="replacePic1">替换上传</div>
							</div>									
							<div class="delPic1" @click="popDelPic1">删除</div>
                            <img :src="serverPic1" slot="reference">
						</el-popover>
					</div>
				</div>
				<div class="bottomText">上传身份证正面</div>
			</div>
			<div class="idTopRight">
				<div class="inputFileCon">							
					<div v-if="!serverPic2" class="idBottomTrueCon">
						<input type="file" ref="backPic1" accept="image/x-png,image/jpeg" @change="upLoadBackSide('backPic1')">
						<img :src="idPic2">
					</div>
					<div v-else class="idBottomFalseCon">
						<el-popover	placement="bottom"	trigger="hover">									
							<div class="checkOriginal2" @click="popImgPreview2">查看大图</div>
							<div class="btnInput2">
								<input type="file" ref="backPic2" accept="image/x-png,image/jpeg" @change="upLoadBackSide('backPic2')">
								<div class="replacePic2">替换上传</div>
							</div>									
							<div class="delPic2" @click="popDelPic2">删除</div>
							<img :src="serverPic2" slot="reference">
						</el-popover>
					</div>
				</div>
				<div class="bottomText">上传身份证反面</div>
			</div>
		</div>
		<div class="header idBottomHeader">拍摄照片要求</div>
		<div class="idBottomContainer flex">
			<div class="guard">
				<img :src="idSample1">
				<div class="bottomText"><i class="iconfont icon-zhengque-"></i> 标准拍摄</div>
			</div>
			<div class="guard">
				<img :src="idSample2">
				<div class="bottomText"><i class="iconfont icon-cuowu-"></i> 边框缺失</div>
			</div>
			<div class="guard">
				<img :src="idSample3">
				<div class="bottomText"><i class="iconfont icon-cuowu-"></i> 照片模糊</div>
			</div>
			<div class="guard">
				<img :src="idSample4">
				<div class="bottomText"><i class="iconfont  icon-cuowu-"></i> 闪光强烈</div>
			</div>
		</div>
		<transition name="popDel">
			<Del v-if="picDelShow"   :delCon = "picDelConfirm" :delCancel = "picDelCancel"></Del>
		</transition>		
		<transition name="popDel">
			<div class="imgContainer" v-show="imgConshow" >
				<img  class="shutImg" :src="delSrc" @click="shutImgContainer" >
				<div class="viewerOuter" :style="{height:initHeight+'px',transform:'rotate('+initRotate+'deg)',width:initWidth+'px',top:initTop+'px',left:initLeft+'px'}"  :class="{trans:transOn}" @mousedown="downImg"   @mouseup="upImg" @mousemove="moveImg" @mouseleave="leaveImg"  draggable="false" @wheel="wheelNow">
					<img ref="trackImg" class="idImg" :src="idPicSrc" draggable="false">
					<div class="imgControllerCon flex">
						<span class="multiControlerCon flex">
							<i class="icon-fangda- iconfont" :class="{trans:transOn}" :style="{transform:'rotate('+(iconRotate)+'deg)'}" @click="zoomOut"></i>
							<i class="icon-suoxiao- iconfont" :class="{trans:transOn}" :style="{transform:'rotate('+(iconRotate)+'deg)'}" @click="zoomIn"></i>
							<i class="icon-nishizhenxuanzhuan- iconfont" :class="{trans:transOn}" :style="{transform:'rotate('+(iconRotate)+'deg)'}" @click="leftRotate"></i>
							<i class="icon-shunshizhenxuanzhuan- iconfont" :class="{trans:transOn}" :style="{transform:'rotate('+(iconRotate)+'deg)'}" @click="rightRotate"></i>
							<i class="icon-quanping-1 iconfont" :class="{trans:transOn}" :style="{transform:'rotate('+(iconRotate)+'deg)'}" @click="setFullScreen"></i>
						</span>
					</div>
				</div>	
			</div>
		</transition>
  	</div>
</template>
<script>
    export default {
        data(){
			return {	
                serverPic2:'',
                serverPic1:'',
				idPic1: require("../../../../public/imgs/sfz1.png"),
				idPic2: require("../../../../public/imgs/sfz2.png"),
				idSample1: require("../../../../public/imgs/sfz_1.png"),
				idSample2: require("../../../../public/imgs/sfz_2.png"),
				idSample3: require("../../../../public/imgs/sfz_3.png"),
				idSample4: require("../../../../public/imgs/sfz_4.png"),
				picDelShow:false,
				picTrack:'',				
				idPicSrc:'',
				imgConshow:false,
				delSrc:require("../../../../public/imgs/shutPic.png"),				
				initRotate:0,	
				iconRotate:0,
				transOn:false,
				moveAble:false,				
				initLeft:100,
				initTop:20,	
				copyInitLeft:100,
				copyInitTop:20,					
				downPositionX:0,
				downPositionY:0,				
				upPositionX:0,
				upPositionY:0,				
				initWidth:100,
				initHeight:600,
                timer:null,
                timerOn:true,
                routeQuery:{},
			}
		},
		mounted(){	
			window.addEventListener('resize',this.resizeImgPreviewer);
			window.addEventListener('keyup',this.keyUpEvent);		
            this.initAnalyse();
		},
		beforeDestroy(){
			window.removeEventListener('resize',this.resizeImgPreviewer);
			window.removeEventListener('keyup',this.keyUpEvent);
		},
		methods:{
            initAnalyse(){
                this.Digital.aesDecrypt.bind(this)();
                console.log( 'routeQuery',this.routeQuery );
                let data1 = {
                    objectId:this.routeQuery.id,
                    type:'ID_CARD',
                };        
                this.ApiLists[10031](data1).then(res=>{
                    let { data:layer1 } = res;
                    let { message,data,success  } = layer1;
                    if( success ){
                        console.log('data',data);
                        this.serverPic1 = data[0].url;
                        this.serverPic2 = data[1].url;
                        
                    }else{
                       this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
			keyUpEvent(e){
				console.log('keyup');
				if(e.keyCode == 27){
					if(this.imgConshow){
					   this.imgConshow = false;
					}
				}
			},
			resizeImgPreviewer(){	
//				console.log('resizing');
				this.initLeft = (window.innerWidth-this.initWidth)/2;
				this.initTop = (window.innerHeight - this.initHeight)/2;
			},
			wheelNow(event){
				let delta = 1;
				if (event.deltaY) {
				  delta = event.deltaY > 0 ? 1 : -1;
				} else if (event.wheelDelta) {
				  delta = -event.wheelDelta / 120;
				} else if (event.detail) {
				  delta = event.detail > 0 ? 1 : -1;
				}				
//				console.log('滚动中',delta);
				let img = this.$refs.trackImg;	
				let ratio = img.naturalHeight/img.naturalWidth;
//				console.log( ratio );
				if(delta == -1){				   
					this.initHeight = this.initHeight + 50;
					this.transOn = true;
					this.initWidth = this.initHeight/ratio;					
				}else{
                    if(this.initWidth > 380){
                        this.initHeight = this.initHeight - 50;
                        this.transOn = true;
                        this.initWidth = this.initHeight/ratio;		
                    }else{
                        if( this.timerOn ){
                            this.timerOn = false;
                            this.timer = setTimeout(()=>{
                                this.timerOn = true;
                                this.timer = null;
                                this.$notify.error({
                                  title: '错误',
                                  message: '图片不能缩放更小。'
                                });
                            },1000)
                        }
                    }
				}                
			},
			downImg(e){	
				this.moveAble = true;				
				this.downPositionX = e.pageX;
				this.downPositionY = e.pageY;
//				console.log( 'down',e );
				this.copyInitLeft = this.initLeft;
				this.copyInitTop = this.initTop;
			},	
			moveImg(e){		
				if( this.moveAble ){					
					this.movePositionX = e.pageX;
					this.movePositionY = e.pageY;	
					this.initLeft = this.copyInitLeft + ( e.pageX - this.downPositionX );
					this.initTop = this.copyInitTop + ( e.pageY - this.downPositionY );
					this.transOn = false;
				}
			},
			upImg(e){
				this.moveAble = false;
				this.copyInitLeft = this.initLeft;
				this.copyInitTop = this.initTop;
			},
			leaveImg(){
				this.moveAble = false;
			},
			zoomOut(){
				this.initHeight = this.initHeight + 50;
				this.transOn = true;				
				let img = this.$refs.trackImg;	
				let ratio = img.naturalHeight/img.naturalWidth;
				console.log( ratio );
				this.initWidth = this.initHeight/ratio;
			},
			zoomIn(){
				if(this.initWidth > 380){
					this.initHeight = this.initHeight - 50;
					this.transOn = true;
					let img = this.$refs.trackImg;	
					let ratio = img.naturalHeight/img.naturalWidth;
					console.log( ratio );
					this.initWidth = this.initHeight/ratio;
				}else{  
                    this.$notify.error({
                      title: '错误',
                      message: '图片不能缩放更小。'
                    });
				}
			},
			leftRotate(){
				this.initRotate = this.initRotate - 90;
				this.transOn = true;
				this.iconRotate = 0 - this.initRotate;
			},
			rightRotate(){
				this.initRotate = this.initRotate + 90;
				this.transOn = true;
				this.iconRotate = 0 - this.initRotate;
			},
			setFullScreen(){
				let img = this.$refs.trackImg;	
				if( img.requestFullscreen ){
				   img.requestFullscreen();
				}	
			},
			shutImgContainer(){				
				this.imgConshow = false;		
				this.initRotate = 0;
				this.initWidth = 500;
				this.initHeight = 600;
			},
			picDelConfirm(){
				this.picDelShow = false;
				this.picTrack = '';
			},
			picDelCancel(){
				this.picDelShow = false;
				this.picTrack = '';
			},
			upLoadFrontSide(ref){
				let tar = this.$refs[ref];
				if (
					tar.files[0].type == "image/jpeg" ||
					tar.files[0].type == "image/png"
				) {
					if (tar.files[0].size / 1024 / 1024 > 1) {
						this.$message.error("图片大小不超过1M。");
						tar.value = "";
					} else {
						let fd = new FormData();
						fd.append("file", tar.files[0]);
                        fd.append("bucketName",'aizu-file'); 
                        let config = {
                            headers: { "Content-Type": "multipart/form-data" }
                        };    
                        this.Axios.post('http://47.111.26.59:7778/third/upload/uploadByBucketName',fd,config).then(res=>{
                            let { data:layer1 } = res;
                            let { message,data,success  } = layer1;
                            if( success ){
                                console.log( 'data',data );
                                let data1 = {
                                    objectId:this.routeQuery.id,
                                    url:data,
                                    type:'ID_CARD',
                                };
                                this.ApiLists[10017](data1).then(res=>{
                                    let { data:layer1 } = res;
                                    let { message,data,success  } = layer1;
                                    if( success ){
                                        console.log('data',data);
                                    }else{
                                       this.$message.error(message);
                                    }
                                }).catch(err=>{
                                    console.log(err);
                                })
                            }else{
                                this.$message.error(message);
                            }
                        }).catch(err=>{
                            console.log(err);
                        })    
					}
				} else {
					tar.value = "";
					this.$message.error("只支持jpg，png");
				}
			},
			popImgPreview1(){
                if( this.serverPic1 ){                   
                    this.imgConshow = true;					
                    let img = this.$refs.trackImg;		
                    this.idPicSrc = this.serverPic1;
                    this.$nextTick(()=>{
                        let compuStyle = img.getBoundingClientRect();				
                        let comWidth = parseInt(compuStyle.width);
                        let comHeight = parseInt(compuStyle.height);
                        console.log( comWidth,comHeight );
                        this.initWidth = comWidth;
                        this.initHeight = comHeight;
                        this.initLeft = (window.innerWidth-this.initWidth)/2;
                        this.initTop = (window.innerHeight - this.initHeight)/2;
                        this.iconRotate = 0;
                        
                        console.log('img',this.serverPic1)
                        
                        
                        
                    });
                }   
			},
			popImgPreview2(){
                if( this.serverPic2 ){
                   this.imgConshow = true;	
                }
			},
			popDelPic1(){
				this.picDelShow = true;
				this.picTrack = '';
			},
			upLoadBackSide(ref){
				let tar = this.$refs[ref];
				if (
					tar.files[0].type == "image/jpeg" ||
					tar.files[0].type == "image/png"
				) {
					if (tar.files[0].size / 1024 / 1024 > 1) {
						this.$message.error("图片大小不超过1M。");
						tar.value = "";
					} else {
						let fd = new FormData();
						fd.append("file", tar.files[0]);
						console.log(tar.files[0]);
					}
				} else {
					tar.value = "";
					this.$message.error("只支持jpg，png");
				}
			},
			popDelPic2(){
				this.picDelShow = true;
				this.picTrack = '';
			},
		},
    }
</script>
<style scoped lang="scss">
	.trans {
		transition-property: all;
		transition-duration: 0.3s;	
		transition-timing-function:ease-out;
	}
	.sixthPartContainer {
		.imgContainer {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: rgba(0,0,0,0.4);
			z-index: 200;
			overflow: hidden;
			.viewerOuter {
				cursor: pointer;
				position: absolute;	
			}
			.idImg {
				&:-webkit-full-screen {
				  background-color: #fff;
				}
				height: 100%;
			}			
			.shutImg {
				width: 60px;
				cursor: pointer;
				position: absolute;
				right: 50px;
				top: 50px;
				z-index: 20;
			}
			.imgControllerCon {
				background-image: linear-gradient(to top,rgba(65,70,98,0.2)  0% ,rgba(256,256,256,0) 50% ,rgba(256,256,256,0) 100% );
				box-sizing: border-box;
				justify-content:center;
				color: #fff;
				position: absolute;
				bottom: 0;
				height: 60px;
				width: 100%;
				text-align: center;
				left: 0;				
				.multiControlerCon {
					width: 50%;
					justify-content: space-between;
				}
				.iconfont {
					font-size: 30px;
					cursor: pointer;
					&:hover {
						color: $mainRed;
					}
				}
			}			
		}
		.idBottomContainer {
			justify-content: flex-start;
			.guard {
				margin-right: 60px;
				img {
					width: 140px;
				}
			}
		}
		.idBottomHeader {
			margin-bottom: 50px !important;
			margin-top: 50px !important;
		}
		.header {
			font-size: 16px;
			color: #2a2f48;
			font-weight: 600;
			margin-bottom: 20px;
		}
		.idTopHeader {
			margin-bottom: 50px !important;
		}
		.idTopContainer {
			justify-content: flex-start;
			img {
				width: 220px;
			}
		}
		.inputFileCon {
			.idBottomTrueCon {
				position: relative;
				width: 220px;
				height: 140px;
				input {
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
					width: 220px;
					height: 140px;
					cursor: pointer;
				}
			}
			.idTopTrueCon {
				position: relative;
				width: 220px;
				height: 140px;
				input {
					position: absolute;
					left: 0;
					top: 0;
					opacity: 0;
					width: 220px;
					height: 140px;
					cursor: pointer;
				}
			}
		}
		.bottomText {
			text-align: center;
			color: #a4aabc;
			font-size: 13px;
			margin-top: 20px;
			.iconfont {
				font-size: 13px;
			}
			.icon-zhengque- {
				color: #02c528;
			}
			.icon-cuowu- {
				color: $mainRed;
			}
		}
		.idTopRight {
			margin-left: 66px;
		}
	}
    .btnInput1 {
        height: 50px;
        border-bottom: 1px solid #efeef3;
        border-top: 1px solid #efeef3;
        box-sizing: border-box;
        line-height: 50px;
        position: relative;
        width: 100%;
        &:hover {
            color: $mainRed;
        }
        input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 40px;
            cursor: pointer;
            opacity: 0;
        }
        .replacePic1 {
            width: 100%;
            text-align: center;
        }
    }
	.checkOriginal1 {
        height: 50px;
        box-sizing: border-box;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        &:hover {
            color: $mainRed;
        }
	}
	.delPic1 {
        height: 50px;
        box-sizing: border-box;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        &:hover {
            color: $mainRed;
        }
	}
	.checkOriginal2 {
        height: 50px;
        box-sizing: border-box;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        &:hover {
            color: $mainRed;
        }
	}
	.btnInput2 {
        position: relative;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #efeef3;
        border-top: 1px solid #efeef3;
        box-sizing: border-box;
        line-height: 50px;
        &:hover {
            color: $mainRed;
        }
        input {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 40px;
            cursor: pointer;
            opacity: 0;
        }
        .replacePic2 {
            width: 100%;
            text-align: center;
        }
	}    
	.delPic2 {
        height: 50px;
        box-sizing: border-box;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        &:hover {
            color: $mainRed;
        }
	}   
</style>
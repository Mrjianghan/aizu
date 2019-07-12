<template>
  <div class="main">
      <div class="leftCon" :class={collapseOn:Collapse,collapseOff:!Collapse}>
		  <logo></logo>
		  <menuCus></menuCus>
      </div>
      <div class="rightCon">
		  	<div class="topContainer">
				<div class="leftHeadCon">
					<div class="switchStatus" @click="switchStatus" :class="{rotateOn:leftOn,rotateOff:!leftOn}"><i class="iconfont icon-daohanglan-liebiao-" ></i></div>
					<div @click="leftClick" class="leftClick">
                        <i class="iconfont icon-xiangqian-" v-show="tagArrowShow"></i>
					</div>
					<div class="tagContainer" ref="tagContainer">
                        <div class="moveTagCon" ref="moveTagCon" :style="{left:setLeft+'px'}" :class="{moveAni:aniOn}">
                            <div v-for="(tag,index) in tagsLists" class='everyTags'  :class="{tagActive: index == tagActive }" :key="index">
                                <span @click.stop="tagClick(tag,index)">{{ tag.name }}</span>		
								<i class="iconfont icon-cuowu-" v-if="tag.delete" @click.stop="deleteTag(tag,index)"></i>
                            </div>
                        </div>
					</div>
					<div @click="rightClick" class="rightClick"  >
                        <i class="iconfont icon-arrowback" v-show="tagArrowShow"></i>
					</div>
				</div>
				<div class="rightHeadCon">
					<el-tooltip content="待领任务" placement="bottom" effect="light">
                        <i class="iconfont icon-dailingrenwu-" @click="showToRecieveDialog"></i>
					</el-tooltip>	
						<el-tooltip content="待办事项" placement="bottom" effect="light">
						<i class="iconfont icon-daibanshixiang-" @click="showForProcessingDialog"></i>
						</el-tooltip>
					<el-tooltip content="未读消息" placement="bottom" effect="light">
						<span class="msgNumber" @click="showMessageDialog">
							<i class="iconfont icon-weiduxiaoxi-" ></i>
						<span class="markNumber" v-if="true">12</span>
						</span>		
						</el-tooltip>
				</div>
			</div>
		  <div class="fit">
			  <router-view></router-view>
		  </div>
      </div>
	  <el-dialog title="待领事务" :visible.sync="toRecieveVisible" class="largeDialog " :close-on-click-modal="false">
		  <toRecieve></toRecieve>
		</el-dialog>
	  <el-dialog title="待办事项" :visible.sync="forProcessingVisible" class="largeDialog" :close-on-click-modal="false">
		  <forProcessing></forProcessing>
		</el-dialog>
	  <el-dialog title="未读消息" :visible.sync="messageVisible" class="largeDialog" :close-on-click-modal="false">
		  <message></message>
		</el-dialog>
  </div>
</template>
<script>
    import menuCus from '@/components/menu'
	import logo from '@/components/logo'
	import toRecieve from '@/components/standAloneCom/toRecieve'
	import forProcessing from '@/components/standAloneCom/forProcessing'
	import message from '@/components/standAloneCom/message'
	import { mapGetters } from 'vuex'    
    export default {
		computed: {			
			...mapGetters({
                Collapse:'Collapse',
				tagsLists:"tagsLists",
				tagArrowShow:"tagArrowShow",
				tagActive:"tagActive",
				setLeft:"storeLeft",	
				aniOn:'tagAniOn',
				copyLeft:"copyLeft",
			})			
		},
      components:{
      		menuCus,
			logo,
			toRecieve,
			forProcessing,
			message
        },
        data(){
            return {		
				leftOn:false,
				showArrow:true,
				saveCon:'',
				saveInside:'',
				toRecieveVisible:false,
				forProcessingVisible:false,
				messageVisible:false,
            }
        },
		watch:{
			"Collapse"(val,nval){
				if(val){
				}else{
				}
			},			
			'$route'(val,nval){	
				this.$nextTick(()=>{					
					let con = this.$refs.tagContainer;
					let inside = this.$refs.moveTagCon;
                    function excution1(val){
                        this.$store.commit('setTagInsideWidth',val);
                        this.StoreJs.set('tagInsideWidth',val);
                    }
                    excution1.bind(this)(inside.offsetWidth);
                    function excution2(val){
                        this.$store.commit('setTagConWidth',val);
                        this.StoreJs.set('tagConWidth',val);
                    }
                    excution2.bind(this)(con.offsetWidth);					
				});
			},
		},
		mounted(){	
			window.addEventListener('resize',this.resizeHandler);
		},
		beforeDestroy(){
			window.removeEventListener('resize',this.resizeHandler);
		},
		methods:{
			resizeHandler(){
				this.saveCon = this.$refs.tagContainer;
				this.saveInside = this.$refs.moveTagCon;                  
                function excution1(val){
                    this.StoreJs.set('tagInsideWidth',val);	
                    this.$store.commit('setTagInsideWidth',val);
                }
                excution1.bind(this)(this.saveInside.offsetWidth);
                function excution2(val){
                    this.StoreJs.set('tagConWidth',val);
                    this.$store.commit('setTagConWidth',val);
                }
                excution2.bind(this)(this.saveCon.offsetWidth); 
				if(  this.saveInside.offsetWidth - this.saveCon.offsetWidth < 0  ){
                    function excution1(val){
                        this.$store.commit('changeTagShow',val);
                        this.StoreJs.set('tagArrowShow',val);	
                        this.$store.commit('setTagAniOn',!val);
                    }
                    excution1.bind(this)(false);
                    function excution2(){
                        this.$store.commit('setStoreLeft',0);
                        this.$store.commit('setCopyLeft',0);
                    }
					excution2.bind(this)();                    
				}else{
                    function excution3(val){
                        this.$store.commit('changeTagShow',val);
                        this.StoreJs.set('tagArrowShow',val);	
                    }
					excution3.bind(this)(true); 
				}	
			},
			showToRecieveDialog(){
				this.toRecieveVisible = true;
			},
			showForProcessingDialog(){
				this.forProcessingVisible = true;
			},
			showMessageDialog(){
				this.messageVisible = true;
			},
			deleteTag(tag,index){    
				this.StoreMap[tag.path].forEach((ele)=>{
					this.StoreJs.remove(ele);
				});	
				this.$store.commit('deleteTag',index);
				this.StoreJs.set('tagsLists',this.tagsLists);                  
				this.saveCon = this.$refs.tagContainer;
				this.saveInside = this.$refs.moveTagCon;	                
                function excution1(val){
                    this.$store.commit('setTagInsideWidth',val);
				    this.StoreJs.set('tagInsideWidth',val);	
                }
                excution1.bind(this)(this.saveInside.offsetWidth-150);   
				this.$nextTick( ()=>{
					if( this.tagArrowShow ){
					   if(  this.saveInside.offsetWidth - this.saveCon.offsetWidth < 0  ){
                           function excution1(val){
                               this.$store.commit('changeTagShow',val);
                               this.StoreJs.set('tagArrowShow',val);
                               this.$store.commit('setTagAniOn',!val);
                           }
                           excution1.bind(this)(false);
                           function excution2(){
                               this.$store.commit('setStoreLeft',0);
                               this.$store.commit('setCopyLeft',0);
                           }
                           excution2.bind(this)();
						}else{
                            function excution3(val){
                                this.$store.commit('changeTagShow',val);
                                this.StoreJs.set('tagArrowShow',val);
                           }
                           excution3.bind(this)(true);
						}
					}
					if(  index === this.tagsLists.length  ){
//						console.log( '关闭的最后一个' );
						if( this.tagActive ==  index ){
//						    console.log('最后一个处于激活状态。');
							let rebuild = this.tagsLists.length - 1;
                            function excution1(val){
                                this.$store.commit('changeTagActive',val)
                                this.StoreJs.set('tagActive',val);
                            }
                            excution1.bind(this)(rebuild);
                            function excution2(val){
                                this.$store.commit('changeActiveIndex',val);
                                this.StoreJs.set('activeIndex',val);
                            }                            
                            let short = this.tagsLists[ rebuild ];                            
                            excution2.bind(this)(short.index);                            
							this.$router.push({
                                path : short.path,
                                query : short.query
                            });
						}else{
						}
					}else{
//						console.log('关闭的不是最后');
						if( this.tagActive ==  this.tagsLists.length ){
//						    console.log('但是最后一个处于激活状态。');
							let rebuild = this.tagsLists.length - 1;
                            function excution1(val){
                                this.$store.commit('changeTagActive',val)
                                this.StoreJs.set('tagActive',val);
                            }
                            excution1.bind(this)(rebuild);                            
							this.$router.push({
                                path:this.tagsLists[rebuild].path,
                                query:this.tagsLists[rebuild].query
                            });
						}else{
							let bridge = this.tagsLists[this.tagActive];
                            function excution2(index){
                                this.$store.commit('changeActiveIndex',index);
                                this.StoreJs.set('activeIndex',index);
                            }
							excution2.bind(this)(bridge.index);                            
							this.$router.push({
                                path:bridge.path,
                                query:bridge.query                                
                            });
						}
					}
				});	                
			},
			leftClick(){
				let con = this.$refs.tagContainer;
				let inside = this.$refs.moveTagCon;                
				if( inside.offsetLeft<0 ){
					if(inside.offsetLeft>-150){						
						let distance = Math.abs(inside.offsetLeft); 
						let storeDis = this.copyLeft;									
						let dis = storeDis + distance;							
						if( dis>=0 ){    
                            function excution1(val){
                                this.$store.commit('setStoreLeft',val);
                                this.$store.commit('setCopyLeft',val);
                                this.$store.commit('setTagAniOn',true);	
                            };
                            excution1.bind(this)(0);
						}else{
                            function excution2(){
                                this.$store.commit('setStoreLeft',dis);							
                                this.$store.commit('setCopyLeft',storeDis + distance);
                                this.$store.commit('setTagAniOn',true);	
                            };
							excution2.bind(this)();                            
						}
					}else{
                        function excution1(){
                            let distance = 160; 
                            let storeDis =  inside.offsetLeft;	
                            let dis = storeDis + distance;
                            this.$store.commit('setCopyLeft',dis);						
                            this.$store.commit('setStoreLeft',dis);
                            this.$store.commit('setTagAniOn',true);	
                        };
                        excution1.bind(this)();                        
					}
				}				
			},
			rightClick(){
				let con = this.$refs.tagContainer;
				let inside = this.$refs.moveTagCon;
				if(  inside.offsetWidth -  con.offsetWidth > 0  ){                    
					if( inside.offsetLeft + inside.offsetWidth - con.offsetWidth>=0  ){                        
						if( ( inside.offsetWidth+inside.offsetLeft )>( con.offsetWidth+ 150 )   ){	
						    let distance = 160; 
							let storeDis = this.copyLeft;
							let dis = storeDis - distance;
                            function excution1(val){
                                this.$store.commit('setTagAniOn',true);
                                this.$store.commit('setStoreLeft',val);	
                                this.$store.commit('setCopyLeft',val);
                            }
                            excution1.bind(this)(dis);
						}else{														
							let distance = Math.abs( (con.offsetWidth) - (inside.offsetWidth+inside.offsetLeft) ); 
							let storeDis = this.copyLeft;                            
							let dis = storeDis - distance;	
                            function excution2(val){
                                this.$store.commit('setTagAniOn',true);
                                this.$store.commit('setStoreLeft',val);	
                                this.$store.commit('setCopyLeft',val);	
                            };
                            excution2.bind(this)(dis);   
						}
					}
				}				
			},
			tagClick(tag,index){
//				console.log('tag点击',tag);
                function excution1(index){
                    this.$store.commit('changeTagActive',index);
				    this.StoreJs.set('tagActive',index);
                }
                excution1.bind(this)(index);
                function excution2(index){
                    this.$store.commit('changeActiveIndex',index);
				    this.StoreJs.set('activeIndex',index);
                }
                excution2.bind(this)(tag.index);                
				this.$router.push({
                    path:tag.path,
                    query:tag.query
                });
			},
			switchStatus(){
				let getStatus = this.Collapse;	
                function excution(val){
                    this.$store.commit('changeCollapse',val);
                    this.StoreJs.set('Collapse',val);
                    this.leftOn = val;
                }                
				if( getStatus ){                    
                    excution.bind(this)(false);					
				 }else{
					 excution.bind(this)(true);
				 }
			},
		}
    }
</script>
<style lang="scss" scoped>
	.rotateOn {
		transition-property: all;
		transition-duration: 0.3s;
		transform: rotateY(180deg);
	}
	.moveAni {
		transition-property: left;
		transition-duration: 0.1s;
		transition-timing-function: ease-in-out;
	}
	.rotateOff {
		transition-property: all;
		transition-duration: 0.3s;
		transform: rotateY(0deg);
	}
    .main {
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
		.collapseOn {
			transition-property: width;
			transition-duration: 0.3s;
			width: 64px !important;
		}
		.collapseOff {
			transition-property: width;
			transition-duration: 0.3s;
			width: 230px;
		}
		.fit {
			background-color: $bgGrey;
			height: calc( 100vh - 62px );
			overflow-y: scroll;
		}
        .leftCon {
			border-right: 1px solid #eee;
			box-shadow: 1px 1px 10px 5px #dfe3fc;
			overflow-y: scroll;
			overflow-x: hidden;
			box-sizing: border-box;
        }
        .rightCon {
			width: 100%;
        }
		.topContainer {
			height: 62px;
			z-index: 2;
			position: relative;
			display: flex;			
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			background-color: #2a2f48;		
			box-sizing: border-box;
			.iconfont {
				color: $mainRed !important;
				font-size: 20px !important;
			}
			.switchStatus {
				cursor: pointer;
				color: #fff;
				margin-left: 18px;
				margin-right: 20px;
			}
			.rightHeadCon {
				color: #fff;
				height: 100%;
				line-height: 62px;
				width: 200px;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: flex-end;
				align-content: center;
				align-items: center;
				padding-right: 20px;
				box-sizing: border-box;
				.iconfont {
					margin-left: 20px;
					margin-right: 20px;
					cursor: pointer;
				}
				.msgNumber {
					position: relative;
				}
				.markNumber {
					background-color: #f9aa2b;					
					height: 18px;
					width: 28px;
					border-radius: 9px;
					position: absolute;
					right: 0px;
					top: 13px;
					line-height: 18px;
					font-size: 12px;
					color: #fff;
					text-align: center;
					font-weight: 700;
				}
				.icon-dailingrenwu- {
				}
				.icon-daibanshixiang- {
				}
				.icon-weiduxiaoxi- {
				}
			}
			.tagActive {
				color:#fff !important;
				::after{
					content: "";
					background-color: $mainRed;
					height: 6px;
					width: 30px;
					position: absolute;
					left: calc( 50% - 15px );
					bottom: 0;
				}
                .iconfont {
                    display: inline !important;
                }
			}
			.leftHeadCon {
				height: 100%;
				width: 80%;
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: flex-start;
				align-content: center;
				align-items: center;
				line-height: 62px;				
				.tagContainer {
					overflow: hidden;
					width: 90%;
					height: 100%;
					position: relative;
					.moveTagCon {
						height: 100%;
						position: absolute;
						left: 0;
						white-space: nowrap;
						.iconfont {
							font-size: 14px !important;
							color: #fff !important;
							padding: 5px;
                            &:hover {
                                 color: $mainRed !important;
                            }
						}
						.everyTags {
							font-weight: 700;
							width: 160px;
							display: inline-block;
							cursor: pointer;
							color: rgb(153, 163, 186);
							text-align: center;
							position:relative;	
							span {
								padding: 10px;
							}
                            .iconfont {
                                display: none;
                                position: absolute;
                                top: -4px;
                                right: -3px;
                            }
                            &:hover {
                                color: #fff;
                                .iconfont {
                                    display: inline;
                                }
                            }
						}						
					}					
				}
			}
		}		
		.leftClick{
			border-left: 2px solid #1f2538;
			min-width: 1px;
			height: 70%;
			line-height: 300%;
			padding-left: 16px;
			margin-right: 10px;
			.iconfont {
				cursor: pointer;
				color: #fff !important;
				font-size: 14px !important;
				vertical-align: 1px;
				line-height: 0 !important;
			}
		}
		.rightClick{
			border-right: 2px solid #1f2538;
			min-width: 1px;
			height: 70%;
			line-height: 300%;
			padding-right: 16px;
			margin-left: 10px;
			.iconfont {
				cursor: pointer;
				color: #fff !important;
				font-size: 14px !important;
				line-height: 0 !important;
				vertical-align: 1px;
			}
		}		
    }
</style>
<style lang="scss">
	.main {
		.largeDialog .el-dialog {
			width: 1100px !important;
			height: 650px !important;
			overflow: hidden;
		}
		.largeDialog  .el-dialog__body {
			padding: 0;
		}
	}
</style>
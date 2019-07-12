<template>
  <div class="menuContainer">        
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened mode="vertical"  text-color="#a5acbc"     active-text-color="#2a2f48">
		<div v-for="menu in menus" :key="menu.index">
			<div v-if="!menu.children.length">
				<el-menu-item :index="menu.index" @click="pushTo(menu)">
					 <i :class="menu.icon" class="iconfont"></i>
					  <span class="title" slot="title" >{{menu.title}}</span>
				</el-menu-item>
			</div>
			<div v-else>
				<el-submenu :index="menu.index">
					<template slot="title">
					  <i :class="menu.icon" class="iconfont"></i>
					  <span slot="title" v-show="!isCollapse" class="title">{{menu.title}}</span>
					</template>
					<template v-for="subMenu in menu.children" >
						<el-menu-item :index="subMenu.index"  :key="subMenu.index" @click="pushSub(subMenu)">
								<i :class="subMenu.icon" class="iconfont little"></i>
					  		<span class="littleTitle" slot="title">{{subMenu.title}}</span>
						</el-menu-item>
					</template>
				</el-submenu>
			</div>
		</div>
        </el-menu>
  </div>
</template>
<script>
	import { mapGetters } from 'vuex'    
    export default {
		computed: {
			...mapGetters({
				isCollapse:'Collapse',
				tagsLists:'tagsLists',
				activeIndex:'activeIndex',
				tagArrowShow:"tagArrowShow",
				tagConWidth:'tagConWidth',
				tagInsideWidth:'tagInsideWidth'
			})
		},
        data() {
            return {
					menus:[
						{
							index:'1',
							icon:'icon-daohanglan-shouye-',
							path:'/main',
							title:'首页',
							children:[
							]
						},
						{
							index:'2',
							icon:'icon-daohanglan-jichuguanli-',
							title:'基础管理',
							children:[
								{
									index:'2-1',
									icon:'icon-weixuanzhong-',
									title:'房源管理',
									path:'/main/houseManage',
								},
								{
									index:'2-2',
									icon:'icon-weixuanzhong-',
									title:'房源列表',
									path:'/main/houseResourceList',
								},                                
                                {
									index:'2-3',
									icon:'icon-weixuanzhong-',
									title:'小区出租率',
									path:'/main/rentRate',
								},
								{
									index:'2-4',
									icon:'icon-weixuanzhong-',
									title:'房源预定',
									path:'/main/housePreOrder',
								},
								{
									index:'2-5',
									icon:'icon-weixuanzhong-',
									title:'用户管理',
									path:'/main/userManage',
								},
								{
									index:'2-6',
									icon:'icon-weixuanzhong-',
									title:'表格下载',
									path:'/main/excelDownload',
								},
								{
									index:'2-7',
									icon:'icon-weixuanzhong-',
									title:'委托管理',
									path:'/main/entrustManage',
								},
								{
									index:'2-8',
									icon:'icon-weixuanzhong-',
									title:'小区管理',
									path:'/main/communityManage',
								},
								{
									index:'2-9',
									icon:'icon-weixuanzhong-',
									title:'应收催款列表',
									path:'/main/reminderList',
								},
								{
									index:'2-10',
									icon:'icon-weixuanzhong-',
									title:'生活缴费列表',
									path:'/main/dailyPayment',
								},
								{
									index:'2-11',
									icon:'icon-weixuanzhong-',
									title:'维修单管理',
									path:'/main/repairOrderManage',
								},
								{
									index:'2-12',
									icon:'icon-weixuanzhong-',
									title:'配送单管理',
									path:'/main/deliveryOrderManage',
								},
							]
						},
						{
							index:'3',
							icon:'icon-daohanglan-caiwuguanli-',
							title:'财务管理',
							children:[		
								{
									index:'3-1',
									icon:'icon-weixuanzhong-',
									title:'提前支取',
									path:'/main/earlyWithdrawal',
								},
								{
									index:'3-2',
									icon:'icon-weixuanzhong-',
									title:'采购计划单',
									path:'/main/shoppingList',
								},
                                {
									index:'3-3',
									icon:'icon-weixuanzhong-',
									title:'违约单打款',
									path:'/main/defaultBillRemittance',
								},
                                {
									index:'3-4',
									icon:'icon-weixuanzhong-',
									title:'违约单记账凭证',
									path:'/main/defaultBillCertificate',
								},                                
                                
								{
									index:'3-5',
									icon:'icon-weixuanzhong-',
									title:'房东账单',
									path:'/main/houseOwnerBill',
								},
								{
									index:'3-6',
									icon:'icon-weixuanzhong-',
									title:'账单计划',
									path:'/main/billPlan',
								},
								{
									index:'3-7',
									icon:'icon-weixuanzhong-',
									title:'抵扣账单',
									path:'/main/deductionBill',
								},
								{
									index:'3-8',
									icon:'icon-weixuanzhong-',
									title:'收据管理',
									path:'/main/receiptsManage',
								},
                                {
									index:'3-9',
									icon:'icon-weixuanzhong-',
									title:'收据汇总',
									path:'/main/receiptsSummary',
								},
							]
						},
						{
							index:'4',
							icon:'icon-daohanglan-hetongguanli-',
							title:'合同管理',
							children:[
								{
									index:'4-1',
									icon:'icon-weixuanzhong-',
									title:'合同管理',
									path:'/main/agreementManage',
								},
                                {
									index:'4-2',
									icon:'icon-weixuanzhong-',
									title:'违约流程',
									path:'/main/illegalProcess',
								}, 
							]
						},   
					]
                };
            },
            methods: {		
				pushTo(menu){					
					this.$router.push({path:menu.path});	                                        
					if( menu.title === '首页' ){
						let obj = {
							name:menu.title,
							path:menu.path,
							delete:false,
							index:menu.index,
						};
                        let trackNo = this.tagsLists.findIndex( (ele)=>{
                            return ele.name === menu.title;
                        });		
                        if( trackNo > -1 ){
                            function excution1( val ){                                
                                this.$store.commit('changeTagActive',val);
                                this.StoreJs.set('tagActive',val); 
                            };
                            excution1.bind(this)(trackNo);   
                            function excution2( index ){                                
                                this.$store.commit('changeActiveIndex',index);
                                this.StoreJs.set('activeIndex',index);	
                            };
                            excution2.bind(this)(obj.index);    
                            
                            function excution3( val ){                                
                                this.$store.commit('setStoreLeft',val);
                                this.$store.commit('setCopyLeft',val);
                                this.$store.commit('setTagAniOn',true);
                            };
                            excution3.bind(this)(0);
                        }
                    }                    
                    /*
                    *  else存在意义低，暂时保留                   
                    */                    
                    else{
//						let obj = {
//							name:menu.title,
//							path:menu.path,
//							delete:true,
//							index:menu.index							
//						};
//						let trackNo = this.tagsLists.findIndex( (ele)=>{
//							return ele.name === menu.title;
//						} );
//						console.log('trackNo',trackNo);
//						if( trackNo > -1 ){
//							this.$store.commit('changeTagActive',trackNo);
//							this.StoreJs.set('tagActive',trackNo);
//							this.$store.commit('changeActiveIndex',obj.index);
//							this.StoreJs.set('activeIndex',obj.index);
//						}else{
//						   this.$store.commit('addTag',obj);							
//							this.StoreJs.set('tagsLists',this.tagsLists);
//							this.$store.commit('changeTagActive',this.tagsLists.length - 1);
//							this.StoreJs.set('tagActive',this.tagsLists.length - 1);
//							this.$store.commit('changeActiveIndex',obj.index);
//							this.StoreJs.set('activeIndex',obj.index);
//						}
					}	 
                    
                    
				},
				pushSub(submenu){	
					this.$router.push({path:submenu.path});
					let obj = {
						name:submenu.title,
						path:submenu.path,
						delete:true,
						index:submenu.index,
						query:{}
					};
					let trackNo = this.tagsLists.findIndex( (ele)=>{
						return ele.name === submenu.title;
					});                    
					if(  trackNo > -1 ){
                        this.SimplifiedVerRouter.push(this.tagsLists,trackNo,submenu.path);
                        function excution1(val){
                            this.$store.commit('changeTagActive',val);
						    this.StoreJs.set('tagActive',val);
                        }
                        excution1.bind(this)(trackNo);      
                        
                        function excution2(index){
                            this.$store.commit('changeActiveIndex',index);
                            this.StoreJs.set('activeIndex',index);    
                        }
                        excution2.bind(this)(submenu.index);
                        
                        function excutionBelow(val){
                            this.$store.commit('changeTagShow',val);
						    this.StoreJs.set('tagArrowShow',val);
                        }
						if( this.tagInsideWidth - this.tagConWidth> 0  ){
                            /*
                            *主tab栏，出现左右移动图标
                            */
                            excutionBelow.bind(this)(true); 
						}else{
						    excutionBelow.bind(this)(false); 
						}	
					}else{						
						//导航栏内没有	
						let judge = this.tagConWidth - this.tagInsideWidth;
                        
						if(judge<0){	
                            function excution1(val){
                                 this.$store.commit('setStoreLeft',-( val ) );
							     this.$store.commit('setCopyLeft',-( val ) );
							     this.$store.commit('setTagAniOn',true);		
                            };
                            excution1.bind(this)((this.tagsLists.length+1)*150 - this.tagConWidth); 
						}
                        
						this.$store.commit('addTag',obj);							
						this.StoreJs.set('tagsLists',this.tagsLists);
                        
                        function excution2(val){
                            this.$store.commit('changeTagActive',val);
						    this.StoreJs.set('tagActive',val);
                        }
                        excution2.bind(this)(this.tagsLists.length - 1);
						
                        function excution3(index){
                            this.$store.commit('changeActiveIndex',index);
						    this.StoreJs.set('activeIndex',index);	
                        }
                        excution3.bind(this)(obj.index);
                        
                        function excutionBelow(val){
                            this.$store.commit('changeTagShow',val);
                            this.StoreJs.set('tagArrowShow',val);
                        }
						if( !this.tagConWidth ){
                            excutionBelow.bind(this)(false);                             
                            function excution4(val){
                                this.$store.commit('setTagInsideWidth',val);
							     this.StoreJs.set('tagInsideWidth',val);	
                            }
                            excution4.bind(this)(150);
						}else{
							if( this.tagInsideWidth+150 - this.tagConWidth> 0  ){
								excutionBelow.bind(this)(true); 
							}else{
								excutionBelow.bind(this)(false); 
							}
						}
					}					
				},
              handleOpen(key, keyPath) {
              },
              handleClose(key, keyPath) {
              }
            }
    }
</script>
<style scoped lang="scss">
	.menuContainer {		
		.iconfont {
		    margin-right: 5px;
			width: 24px;
			text-align: center;
			font-size: 18px;
			vertical-align: middle;
		}
		.little {
			font-size: 8px !important;
		}
		.title {
			margin-left: 10px !important;
		}
		.littleTitle {
			margin-left: 3px !important;
		}
	}
</style>
<style lang="scss">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	.menuContainer {
		.el-menu {
			border-right: none; 
		}
		.el-submenu__icon-arrow {
			margin-right: 10px;
		}
		.el-menu-item.is-active i{
			color: $mainRed;
		}
		.el-menu-item.is-active {
			background-color: rgba(246,184,184,0.3);
			border-top-left-radius: 30px;
			border-bottom-left-radius: 30px;
			border-right: 10px solid $mainRed;
		}
		.el-submenu__title:hover {
			background-color: rgba(246,184,184,0.3);
		}
		.el-menu-item,.el-submenu span {
			font-weight: 700;
			letter-spacing: 3px;
		}
	}
	.el-menu-item:hover {
		background-color: rgba(246,184,184,0.3);
	}	
</style>
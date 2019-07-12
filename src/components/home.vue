<template>
  <div class="homeContainer">  	  
	  <div class="switchCon">
		  <div class="subDivide subOne " :class="{ switchActive:(switchIndex == 1) ?  true : false }" @click="subOneClick">主页</div>
		  <div class="subDivide sunTwo"  :class="{ switchActive:(switchIndex == 2) ? true : false }" @click="subTwoClick">数据监控</div>
	  </div>	  
	  <div v-if="showLeft">
		  <leftHome></leftHome>
	  </div>
	  <div v-else>
		  <rightHome></rightHome>
	  </div>
  </div>
</template>
<script>	
	import leftHome from '@/components/standAloneCom/leftHome';
	import rightHome from '@/components/standAloneCom/rightHome';
    import { mapGetters } from 'vuex'      
    export default {
        computed: {
			...mapGetters({
				tagsLists:'tagsLists'
			})
		},
		components:{
			leftHome,
			rightHome
		},
        data(){
			return {
				showLeft:true,
				switchIndex:1,
			}
		},
		mounted(){	
            this.initAction();
		},
		methods:{		
            initAction(){
                let trackNo = this.tagsLists.findIndex( (ele)=>{
                    return ele.name === '首页';
                });	                
                function excution1( val ){                                
                    this.$store.commit('changeTagActive',val);
                    this.StoreJs.set('tagActive',val); 
                };
                excution1.bind(this)(trackNo); 
                
                function excution2( index ){                                
                    this.$store.commit('changeActiveIndex',index);
                    this.StoreJs.set('activeIndex',index);	
                };
                excution2.bind(this)('1'); 
            },
			subOneClick(){
				this.showLeft = true;
				this.switchIndex = 1;
			},
			subTwoClick(){
				this.showLeft = false;
				this.switchIndex = 2;
			},
		},	
    }
</script>
<style scoped lang="scss">
	.subDivide {
		width: 50%;
		height: 100%;
		line-height: 40px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		box-sizing: border-box;
		cursor: pointer;
		color: #a4aabc;
	}	
	.subOne {
		border-bottom-left-radius: 5px;
		border-top-left-radius: 5px;
		border-right: none;
		background-color: #fff;
	}
	.sunTwo {
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
		border-left: none;
		background-color: #fff;
	}
	.switchActive {
		background-color: $mainRed !important;
		color: #fff !important;
	}
	.switchCon {
		display: flex;
		box-sizing: border-box;
		overflow: hidden;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		height: 40px;
		width: 240px;
		margin-top: 24px;
		margin-left: 24px;
		border-radius: 5px;
	}
</style>
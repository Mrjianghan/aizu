<template>
  <div class="logoContainer">  
	  <transition name="fade" mode="out-in">
		  <div class="showStatus" v-if="!Collapse" key="show">
			  <img :src="companyLogo">
			  <div class="dropCon">
				  <el-dropdown @command="handleCommand">
					  <span class="el-dropdown-link">{{name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
					  <el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="a">修改密码</el-dropdown-item>
						  <el-dropdown-item command="b">退出</el-dropdown-item>
					  </el-dropdown-menu>
					</el-dropdown>
				</div>
		  </div>
		  <div class="hideStatus" v-if="Collapse" key="hide">
			  <img :src="companyLogo">
			  <div class="name">{{name}}</div>
		  </div>
	  </transition>	  
  </div>
</template>
<script>
	import { mapGetters } from 'vuex'
    export default {
		computed: {
			...mapGetters([
			  'Collapse',			  
			])
		},
        data(){
			return {
				companyLogo:require('../../public/imgs/aizulogo.png'),
				name:'用户名',
			}
		},
		mounted(){			
		},
		methods:{
			handleCommand(command){
				console.log(command);	
				switch(command){
					   case 'a':
                        
					   break;
					   case 'b':	
						this.$store.commit('initState');	
						this.StoreJs.clearAll();
						this.$router.push({path:'/'});
					   break;
				}
			},
		},
    }
</script>
<style scoped lang="scss">
	.showStatus  {
		text-align: center;
		padding-top: 40px;
		padding-bottom: 60px;
        img {
            width: 64px;
            margin-bottom: 30px;
        }
	}
	.dropCon {
		width: 100px;
		margin: 0 auto;
		height: 30px;
		box-shadow: 0px 2px 14px 6px #f2f2f5;
		border-radius: 6px;
		line-height: 30px;
		cursor: pointer;
	}
	.hideStatus {
		padding-top: 45px;
		padding-bottom: 76px;
		img {
			width: 44px;
			margin-left: 10px;
			margin-bottom: 40px;
		}
		.name {
			text-align: center;
			font-size: 14px;
			color: #2a2f48;
		}
	}
	.fade-enter {
		opacity: 0;
	}
	.fade-enter-active {
		transition-property: opacity;
		transition-duration: 0.2s;
	}
	.fade-enter-to {
		opacity: 1;
	}
	.fade-leave {
		opacity: 1;
	}
	.fade-leave-active {
		transition-property: opacity;
		transition-duration: 0.2s;
	}
	.fade-leave-to {
		opacity: 0;
	}
</style>
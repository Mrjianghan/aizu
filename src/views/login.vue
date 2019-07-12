<template>
	<div class="home" @keyup.enter="enterEvent">    
	  <img class="logo" :src="logoIcon">	
	  <div class="formContainer" v-if="showLogin">
		  <div class="loginContainer">		  
			  <div class="inputEachCon" :class="{select:accountSelect}">
				  <i class="iconfont icon-zhanghao-" :class="{cusRed:accountSelect}"></i>
				  <input type="text" class="common" v-model.trim="loginForm.account" maxlength="11"  placeholder="请输入账号" @focus="accountFocus" @blur="accountBlur">
			  </div>
			  <div class="inputEachCon" :class="{select:pswSelect}" >
				  <i class="iconfont icon-mima-" :class="{cusRed:pswSelect}"></i>
				  <input type="password" class="common" v-model.trim="loginForm.password"  placeholder="请输入密码" @focus="pswFocus" @blur="pswBlur">
			  </div>
			  <div class="inputEachCon nonBorder">
				  <div class="shortBorder" :class="{select:codeSelect}">
					  <i class="iconfont icon-yanzhengma-" :class="{cusRed:codeSelect}"></i>
					  <input type="text" class="special" maxlength="4"   placeholder="请输入验证码" @focus="codeFocus" @blur="codeBlur" v-model.trim="loginForm.codeValue">
				  </div>
				  <div class="imgCodeCon">
					  <img class="imgCode" :src="imgCode" @click="refreshImgCode">
					</div>
			  </div>
			  <div class="btnContainer firstScreenCon">
				  <button  @click="loginAction" :class={localDisable}>登&nbsp;&nbsp;&nbsp;录</button>
				</div>
		  </div>
	  </div>
	  <div v-else class="forgetCon">
	  	<div class="inputEachCon" :class="{select:pswInputSelect}">
		  <i class="iconfont icon-mima-" :class="{cusRed:pswInputSelect}"></i>
		  <input type="text" class="common"  placeholder="请输入修改密码" @focus="pswInputFocus" @blur="pswInputBlur" v-model.trim="forgetForm.rePassword">
	  	</div>
		<div class="inputEachCon" :class="{select:pswInputAgainSelect}" >
		  <i class="iconfont icon-mima-" :class="{cusRed:pswInputAgainSelect}"></i>
		  <input type="password" class="common"   placeholder="再次输入修改密码" @focus="pswInputAgainFocus" @blur="pswInputAgainBlur" v-model.trim="forgetForm.reAgainPassword">
		</div>
		<div class="btnContainer forgetBtnCon">
		  <button @click="modifyAction">确&nbsp;&nbsp;&nbsp;定</button>
		</div>
	  </div>
	  <div class="bottomCon">
	  	<div class="fixed" @click="rightClick">{{fixedText}}</div>
	  </div>
  </div>
</template>
<script>  
    import { mapGetters } from 'vuex'   
    import { required, minLength, maxLength,sameAs  } from 'vuelidate/lib/validators'    
    export default {
        computed: {
            ...mapGetters({
                tagsLists:'tagsLists',
            })
        },
        validations:{
            loginForm:{
                account:{
                    required,
                    minLength: minLength(11)
                },
                password:{
                    required,
                    minLength: minLength(6)
                },     
                codeValue:{
                    required,
                    minLength: minLength(4)
                }
            },
            forgetForm:{
              rePassword:{
                  required,
                  minLength: minLength(6),
              },
		      reAgainPassword:{
                  required,
                  sameAs: sameAs('rePassword')
              },
            },
        },
data(){
	  return {
          localDisable:false,
		  logoIcon:require('../../public/imgs/logo.png'),
          imgCode:'',
		  accountSelect:false,
		  pswSelect:false,
		  codeSelect:false,
		  fixedText:'忘记密码',
		  showLogin:true,
		  pswInputSelect:false,
		  pswInputAgainSelect:false,          
          loginForm:{
              account:'',
              password:'',
              codeValue:'',
          },
          forgetForm:{
              rePassword:'',
		      reAgainPassword:'',
          },
		  accountJudge:false,
		  pswJudge:false,
		  codeJudge:false,
          timer:null,
	  }
       },
       mounted(){
          this.start();
       },
       methods:{
           enterEvent(){
               if(this.showLogin){
                   this.loginAction();
               }else{
                   this.modifyAction();
               }
		   },
           modifyAction(){
               this.$v.forgetForm.$touch();
               let judge = this.$v.forgetForm.$error;
               if( judge ){
                  this.$message.error('密码输入错误，请检查表单。'); 
                }else{
                }
           },
           loginAction(){  
               function removeAllMenus(){
                   this.$store.commit('resetTag');
                   this.StoreJs.set('tagsLists',[] );
               }
               removeAllMenus.bind(this)();
               this.$v.loginForm.$touch(); 
               let formError = this.$v.loginForm.$error;
               if( formError ){
                  this.$message.error('请检查表单，重新登录。'); 
               }else{
                   if(this.localDisable){                  
                   }else{   
                        this.localDisable = true;
                        this.timer = setTimeout(()=>{
                            this.localDisable = false;
                            this.timer = null;
                        },7000);
                   }  
                    let data = {
                       username:this.loginForm.account,
                       password:this.loginForm.password
                    };	
                   
                   
                    this.ApiLists[10001]( data ).then(res=>{
                        let { data } = res;    
                        if( data.success ){
                            this.StoreJs.set('loadingString',data.data);   
                            let decoded = this.Jwt.decode(data.data, {complete: true});
                            this.StoreJs.set('tokenDecoded',decoded);  
                 
                   
                   
                            let obj = {
                                name:'首页',
                                path:'/main',
                                delete:false,
                                index:'1',
                            };	
                   
                   
                   
                            this.ApiLists[10002]().then(res=>{
                                let { data } = res;
                                if( data.success ){
                   
                   
                   
                                    this.StoreJs.set('userInfo',data.data);   
                                    function excution1(number,obj){
                                        this.$store.commit('changeTagActive',number);
                                        this.StoreJs.set('tagActive',number);
                                        this.$store.commit('changeActiveIndex',obj.index);
                                        this.StoreJs.set('activeIndex',obj.index);
                                        this.$store.commit('addTag',obj);
                                        this.StoreJs.set('tagsLists',[obj] );
                                    }
                                    excution1.bind(this)(0,obj);
                                    this.$router.push({ path:'/main' });
                   
                   
                   
                                }else{
                                    this.$message.error(data.message); 
                                }
                            }).catch(err=>{
                                console.log(err);    
                            })
                        }else{
                            this.$message.error(data.message); 
                        }
                   }).catch(err=>{
                        console.log(err);
                        this.Err.netErr();
                   })	 
                   
                   
               }
			},
			refreshImgCode(){
                this.getPicVerificationCode();
			},
			pswInputFocus(){
				this.pswInputSelect = true;
				this.pswInputAgainSelect = false;
			},
			pswInputBlur(){
                this.$v.forgetForm.rePassword.$touch();
                let judge = this.$v.forgetForm.rePassword.$error;                
                console.log( '这里',judge );  
                if( judge ){
                    this.pswInputSelect = true;
                    this.$message.error('请检查密码。');
                }else{
                    this.pswInputSelect = false;
                }
			},
			pswInputAgainFocus(){
				this.pswInputSelect = false;
				this.pswInputAgainSelect = true;
			},
			pswInputAgainBlur(){
                this.$v.forgetForm.reAgainPassword.$touch();
                let judge = this.$v.forgetForm.reAgainPassword.$error;
                console.log('下面input',judge);
                if( judge ){
                    this.pswInputAgainSelect = true;
                    this.$message.error('请确保两个密码一致。');
                }else{
                    this.pswInputAgainSelect = false;
                }
            },
           rightClick(){
				if( this.showLogin ){
				   this.showLogin = false;
					this.fixedText = '返回登录';
				}else{
				   	this.showLogin = true;
					this.fixedText = '忘记密码';
				}
			},
			accountFocus(){
				this.accountSelect = true;
				this.pswSelect = false;
				this.codeSelect = false;
			},
			accountBlur(){
                this.$v.loginForm.account.$touch();
                let judge = this.$v.loginForm.account.$error;
                if( judge ){
                    this.accountSelect = true;
                    this.$message.error('请检查登录名。');
                }else{
                    this.accountSelect = false;
                }
			},
			pswFocus(){
				this.accountSelect = false;
				this.pswSelect = true;
				this.codeSelect = false;
			},
			pswBlur(){
                this.$v.loginForm.password.$touch();
                let judge = this.$v.loginForm.password.$error;
                console.log( judge );
                if( judge ){
                    this.pswSelect = true;
                    this.$message.error('请检查密码。');
                }else{
                    this.pswSelect = false;
                }
			},
			codeFocus(){
				this.accountSelect = false
				this.pswSelect = false;
				this.codeSelect = true;
			},
			codeBlur(){ 
                this.$v.loginForm.codeValue.$touch();
                let judge = this.$v.loginForm.codeValue.$error;
                console.log( judge );
                if( judge ){
                    this.codeSelect = true;
                    this.$message.error('请检查验证码。');
                }else{
                    this.codeSelect = false;
                }
            },
           getPicVerificationCode(){
               let data = Date.now();
               this.ApiLists[10000](data).then(res=>{
                   let { data } = res;
                   var blob = new Blob([data], {type: "image/jpeg"});
                   var url = URL.createObjectURL(blob);   
                   this.imgCode = url;
               }).catch(err=>{
                   console.log(err);
               });
           },
           start(){
//               this.loginForm.account = '18203817038';
//               this.loginForm.password = '123456';
               this.getPicVerificationCode();
           }
       },
    }
</script>
<style lang="scss" scoped>
    .localDisable {
        cursor: not-allowed !important;
        background-color: #c8cad7 !important;
    }
	.cusRed  {
		color: $mainRed !important;
	}
	.home {
		height: 100%;
		width: 100%;
		min-height: 760px;
		background-image: url(../../public/imgs/login.png);
		background-position: center center;
		background-repeat: no-repeat;
		background-size:cover;
		padding-left: 85px;
		box-sizing: border-box;
		padding-top: 70px;
		.logo {
			width: 170px;
		}
		.firstScreenCon {
			margin-bottom: 70px;
		}
		.inputEachCon {
			height: 60px;
			width: 430px;
			box-sizing: border-box;
			margin-bottom: 35px;
			border: 1px solid #cfd3e2;
			border-radius: 5px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:flex-start;
			align-content: center;
			align-items: center;
		}
		input {
			border: none;
			outline: none;
			font-size: 16px;
			margin-left: 20px;
			color: #a4aabc;
			height: 92%;
			width: 80%;
		}
		.formContainer {
			margin-top: 130px;
		}
		.iconfont {
			font-size: 20px;
			margin-left: 20px;
			color: #a4aabc;
		}
		.nonBorder {
			border: none!important;
		}
		.shortBorder {
			border: 1px solid #cfd3e2;
			border-radius: 5px;
			height: 60px;
			width: 260px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:flex-start;
			align-content: center;
			align-items: center;
		}
		.imgCode {
			margin-top: 15px;
            cursor: pointer;
		}
		.select {
			border-color: $mainRed !important;
		}
		.imgCodeCon {
			background-color: #cfd3e2;
			height: 62px;
			width: 150px;
			margin-left: 20px;
			border-radius: 5px;
		}
		.btnContainer{
			width: 430px;
			height: 60px;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:space-between;
			align-content: center;
			align-items: center;
			box-sizing: border-box;
			button {
				border: none;
				background-color: $mainRed;
				width: 100%;
				height: 62px;
				border-radius: 30px;
				color: #fff;
				cursor: pointer;
				font-size: 18px !important;
				outline: none;
			}
		} 
		.bottomCon {
			display: flex;
			justify-content: flex-end;
			margin-right: 70px;
		}
		.fixed {
			width: 200px;
			height: 60px;
			border: 1px solid $mainRed;
			border-radius: 30px;
			text-align: center;
			line-height: 60px;
			color: #fff;
			cursor: pointer;
		}
		.forgetCon {
			margin-top: 130px;
		}
		.forgetBtnCon {
			margin-bottom: 165px;
		}
	}
</style>
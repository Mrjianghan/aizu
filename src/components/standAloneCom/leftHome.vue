 <template>
  <div class="leftHomeContainer">  	  
	  <div class="topCon">
		  <el-row :gutter="20">
			  <el-col :xs="8" :sm="8" :md="8"  :lg="8" :xl="8">
				  <div class="whiteBg topOne borderRa betweenFlex">
				  	<div id="chartPieOne" style="width:120px;height:120px"></div>
					  <div class="listCon">						  
						  <div class="betweenFlex thirtyPx">
							  <div class="ChartText">爱租房源总数</div>
							  <div class="specialBold">{{redValue1 | formatMoneyValue}}</div>
							</div>
						  <div class="listConMiddle betweenFlex thirtyPx">
							  <div class="ChartText"><span class="drakColor littleBlock"></span>总出租房源</div>
							  <div class="specialBold">{{redValue2 | formatMoneyValue}}</div>
							</div>
						  <div class="betweenFlex thirtyPx">
							  <div class="ChartText"><span class="blockRed littleBlock"></span>总空余房源</div>
							  <div class="specialBold">{{redValue3 | formatMoneyValue}}</div>
							</div>						  
						</div>
					</div>
				</el-col>
			  <el-col :xs="8" :sm="8"  :md="8" :lg="8" :xl="8">
				  <div class="whiteBg topTwo borderRa betweenFlex">
				  	<div id="chartPieTwo" style="width:120px;height:120px"></div>
					  <div class="listCon">
						   <div class="betweenFlex thirtyPx">
							  <div class="ChartText">房东款总金额</div>
							  <div class="specialBold">{{blueValue1 | formatMoneyValue}}</div>
							</div>
						  <div class="listConMiddle betweenFlex thirtyPx">
							  <div class="ChartText"><span class="drakColor littleBlock"></span>房东款金额</div>
							  <div class="specialBold">{{blueValue2 | formatMoneyValue}}</div>
							</div>
						  <div class="betweenFlex thirtyPx">
							  <div class="ChartText"><span class="blockBlue littleBlock"></span>房东款收益 </div>
							  <div class="specialBold">{{blueValue3 | formatMoneyValue}}</div>
							</div>
						</div>
					</div>
				</el-col>
			  <el-col :xs="8" :sm="8"  :md="8" :lg="8" :xl="8">
				  <div class="whiteBg topThree borderRa betweenFlex">
					  <div id="chartPieThree" style="width:120px;height:120px"></div>
					  <div class="listCon">
						   <div class="betweenFlex thirtyPx">
							  <div class="ChartText">租客房租总金额</div>
							  <div class="specialBold">{{yellowValue1 | formatMoneyValue}}</div>
							</div>
						  <div class="listConMiddle betweenFlex thirtyPx">
							  <div class="ChartText"><span class="drakColor littleBlock"></span>线上支付总额</div>
							  <div class="specialBold">{{yellowValue2 | formatMoneyValue}}</div>
							</div>
						  <div class="betweenFlex thirtyPx">
							  <div class="ChartText"><span class="blockYellow littleBlock"></span>线下支付总额</div>
							  <div class="specialBold">{{yellowValue3 | formatMoneyValue}}</div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
	  </div>
	  <div class="middleCon whiteBg borderRa">
		  <div class="middleConInner">
			  <div class="middleTitle">
				  <div class="titleText titleBold">留存金额（单位：万元）</div>
				  <div class="titleSelectCon">
					  <div class="datePickerCon">
						  <div v-if="showMiddleTimer" class="nameSpecial">
							  <el-date-picker	v-model="retentionAmount1"	@change="changeDate1(retentionAmount1)"	type="date" prefix-icon="''"  :clearable= "false"  placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>                              
						  </div>
					  	  <div v-else class="nameSpecial">
							  <el-date-picker	v-model="retentionAmount2"	@change="changeDate2(retentionAmount2)"	type="month"  :clearable = "false"   prefix-icon="''"	placeholder="选择月" value-format="yyyy-MM"></el-date-picker>
						   </div>
					  </div>
					  <div class="every" :class="{everyActive:!showMiddleTimer}" @click="middleClickMonth">每月</div>
					  <div class="every" :class="{everyActive:showMiddleTimer}" @click="middleClickDay">每日</div>
					</div>
				</div>
			  <div id="middleChart" style="width:92%;height:300px;margin:0 auto;"></div>
		 </div>
	  </div>
	  <div class="bottomCon">
		  <el-row :gutter="20">
			  <el-col :xs="12" :sm="12" :md="12"  :lg="12" :xl="12">
				  <div class="whiteBg renterCon sameFour borderRa">
					  <div class="rentTitle">
						  <div class="rentTitleText titleBold">租客续租率（%）</div>
						  <div class="rentTitleSelectCon">
							  <div class="datePickerCon">
								  <div v-if="showRentTimer" class="nameSpecial">
									  <el-date-picker	v-model="rentRenewal1"	@change="changeDate3(rentRenewal1)"	type="date"  prefix-icon="''"  :clearable= "false"	placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker >
								  </div>
								  <div v-else class="nameSpecial">
									  <el-date-picker	v-model="rentRenewal2"	@change="changeDate4(rentRenewal2)"	type="month"  :clearable = "false" prefix-icon="''"	placeholder="选择月" value-format="yyyy-MM"></el-date-picker>
								  </div>
							  </div>
							  <div class="every" :class="{everyActive:!showRentTimer}" @click="rentClickMonth">每月</div>
							  <div class="every" :class="{everyActive:showRentTimer}" @click="rentClickDay">每日</div>
							</div>
						</div>
					  <div id="rentChart" style="width:100%;height:290px"></div>
					</div>
				</el-col>
			  <el-col :xs="12" :sm="12" :md="12"  :lg="12" :xl="12">
				  <div class="whiteBg renterCon sameFour borderRa">
					  <div class="rentTitle ownerTitle">
						  <div class="rentTitleText titleBold">房东款留存率（%）</div>
						  <div class="rentTitleSelectCon ownerTitleSelectCon">
							  <div class="datePickerCon">
							  <div v-if="ownerRentTimer" class="nameSpecial">
								  <el-date-picker	v-model="landLordRetention1"	@change="changeDate5(landLordRetention1)"	type="date" prefix-icon="''"  :clearable= "false"	placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
								</div>
							  <div v-else class="nameSpecial">
								  <el-date-picker	v-model="landLordRetention2"	@change="changeDate6(landLordRetention2)"	type="month" :clearable = "false" prefix-icon="''"	placeholder="选择月" value-format="yyyy-MM"></el-date-picker>
								</div>
							  </div>
							  <div class="every" :class="{everyActive:!ownerRentTimer}" @click="ownerClickMonth">每月</div>
							  <div class="every" :class="{everyActive:ownerRentTimer}" @click="ownerClickDay">每日</div>
							</div>
						</div>
					  <div id="ownerChart" style="width:100%;height:290px"></div>
					</div>
				</el-col>
		  </el-row>
		  <el-row :gutter="20" class="maTop">
			  <el-col :xs="12" :sm="12" :md="12"  :lg="12" :xl="12">
				  <div class="whiteBg renterCon sameFour borderRa">
					  <div class="rentTitle">
						  <div class="rentTitleText titleBold">收房率（%）</div>
						  <div class="rentTitleSelectCon getTitleSelectCon">
							  <div class="datePickerCon">
							  <div v-if="showGetTimer" class="nameSpecial">
								  <el-date-picker	v-model="roomCollectionRate1" @change="changeDate7(roomCollectionRate1)"	type="date" prefix-icon="''"  :clearable= "false"	placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
								</div>
							  <div v-else class="nameSpecial">
								  <el-date-picker	v-model="roomCollectionRate2"	@change="changeDate8(roomCollectionRate2)"	type="month"  :clearable = "false"  prefix-icon="''"	placeholder="选择月" value-format="yyyy-MM"></el-date-picker>
								</div>
							  </div>
							  <div class="every" :class="{everyActive:!showGetTimer}" @click="getClickMonth">每月</div>
							  <div class="every" :class="{everyActive:showGetTimer}" @click="getClickDay">每日</div>
							</div>
						</div>
					  <div id="getChart" style="width:100%;height:290px"></div>
					</div>
			</el-col>
			  <el-col :xs="12" :sm="12" :md="12"  :lg="12" :xl="12">
				  <div class="whiteBg renterCon sameFour borderRa">
					  <div class="rentTitle">
						  <div class="rentTitleText titleBold">出租额（%）</div>
						  <div class="rentTitleSelectCon soldTitleSelectCon">
							  <div class="datePickerCon">
							  <div v-if="showSoldTimer" class="nameSpecial">
								  <el-date-picker	v-model="rentalAmount1"	@change="changeDate9(rentalAmount1)"	type="date" prefix-icon="''" :clearable= "false"	placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
								</div>
							  <div v-else class="nameSpecial">
								  <el-date-picker	v-model="rentalAmount2"	@change="changeDate10(rentalAmount2)"	type="month"  :clearable = "false"  prefix-icon="''"	placeholder="选择月" value-format="yyyy-MM"></el-date-picker>
								</div>
							  </div>
							  <div class="every" :class="{everyActive:!showSoldTimer}" @click="soldClickMonth">每月</div>
							  <div class="every" :class="{everyActive:showSoldTimer}" @click="soldClickDay">每日</div>
							</div>
						</div>
					  <div id="soldChart" style="width:100%;height:290px"></div>
					</div>
				</el-col>
		  </el-row>
	  </div>
  </div>
</template>
<script>   
	import echarts from 'echarts';	
    export default {
    	data(){
			return {
                retentionAmount1:new Date(),
				retentionAmount2:new Date(),
				rentRenewal1:new Date(),
				rentRenewal2:new Date(),
				landLordRetention1:new Date(),
				landLordRetention2:new Date(),
				roomCollectionRate1:new Date(),
				roomCollectionRate2:new Date(),
				rentalAmount1:new Date(),
				rentalAmount2:new Date(),
				chartPieOne:null,
				chartPieTwo:null,
				chartPieThree:null,
				showMiddleTimer:true,				
				middleChart:null,
				showRentTimer:true,
				rentChart:null,
				ownerChart:null,
				getChart:null,
				soldChart:null,
				showGetTimer:true,
				showSoldTimer:true,
				ownerRentTimer:true,
				redValue1:0,
				redValue2:'0',
				redValue3:0,
				blueValue1:0,
				blueValue2:0,
				blueValue3:0,
				yellowValue1:0,
				yellowValue2:0,
				yellowValue3:0,
			}
		},	
		mounted(){
			this.initChart(); 
            let data = this.StoreJs.get('loadingString');            
            let decoded = this.Jwt.decode(data, {complete: true});
            console.log( decoded );              
		},
		beforeDestroy(){
			window.removeEventListener('resize', ()=>{
				this.resizeEvent();
			});
		},
		methods:{
			initChart(){
				this.chartPieOne = echarts.init(document.getElementById('chartPieOne'));
				this.chartPieTwo = echarts.init(document.getElementById('chartPieTwo'));
				this.chartPieThree = echarts.init(document.getElementById('chartPieThree'));
				this.middleChart = echarts.init(document.getElementById('middleChart'));
				this.rentChart =  echarts.init(document.getElementById('rentChart'));
				this.ownerChart = echarts.init(document.getElementById('ownerChart'));
				this.getChart = echarts.init(document.getElementById('getChart'));
				this.soldChart = echarts.init(document.getElementById('soldChart'));
				this.setChartPieOne();
				this.setChartPieTwo();
				this.setChartPieThree();
				this.setChartMiddle();
				this.setChartRent();
				this.setChartOwner();
				this.setChartGet();
				this.setChartSold();				
				window.addEventListener('resize', ()=>{
					this.resizeEvent();
				});
			},
			resizeEvent(){
				this.chartPieOne.resize();
				this.chartPieTwo.resize();
				this.chartPieThree.resize();
				this.middleChart.resize();
				this.rentChart.resize();
				this.ownerChart.resize();
				this.getChart.resize();
				this.soldChart.resize(); 
			},
			setChartPieOne(){	
				this.redValue1 = 999999;
				this.redValue2 = 999999;
				this.redValue3 = 999999;
				let option = {
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)",
							confine:true,
						},
						color:[						
							'#021014',
							'#fc6565',
						],
						series : [
							{
								name:'爱租房源',
								type:'pie',
								radius : ['50%', '80%'],
								center: ['50%', '50%'],
								data:[
									{value:335, name:'总出租房源'},
									{value:100, name:'总空余房源'},									
								].sort(function (a, b) { return a.value - b.value; }),
								roseType: 'radius',
								label: {
									normal: {
										textStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										}
									}
								},
								labelLine: {
									normal: {
										lineStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										},
										smooth: 0.2,
										length: 10,
										length2: 20
									}
								},
								animationType: 'scale',
								animationEasing: 'elasticOut',
								animationDelay: function (idx) {
									return Math.random() * 200;
								},
							},
						],	
				};				
				this.chartPieOne.setOption(option);
			},
			setChartPieTwo(){
				this.blueValue1 = 9999990;
				this.blueValue2 = 99999990;
				this.blueValue3 = 9999990;
				let option = {
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)",
							confine:true,
						},
						color:[						
							'#021014',
							'#30caf6',
						],
						series : [
							{
								name:'房东款总金额',
								type:'pie',
								radius : ['50%', '80%'],
								center: ['50%', '50%'],
								data:[
									{value:335, name:'房东款金额'},
									{value:100, name:'房东款收益'},
									
								].sort(function (a, b) { return a.value - b.value; }),
								roseType: 'radius',
								label: {
									normal: {
										textStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										}
									}
								},
								labelLine: {
									normal: {
										lineStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										},
										smooth: 0.2,
										length: 10,
										length2: 20
									}
								},	
								animationType: 'scale',
								animationEasing: 'elasticOut',
								animationDelay: function (idx) {
									return Math.random() * 200;
								},
							},
						],		
				};
				this.chartPieTwo.setOption(option);
			},
			setChartPieThree(){
				this.yellowValue1 = 9999990;
				this.yellowValue2 = 9999990;
				this.yellowValue3 = 9999990;
				let option = {
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)",
							confine:true,
						},
						color:[						
							'#021014',
							'#f9aa2b',
						],
						series : [
							{
								name:'租客房租总金额',
								type:'pie',
								radius : ['50%', '80%'],
								center: ['50%', '50%'],
								data:[
									{value:335, name:'线上支付金额'},
									{value:100, name:'线下支付金额'},
									
								].sort(function (a, b) { return a.value - b.value; }),
								roseType: 'radius',
								label: {
									normal: {
										textStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										}
									}
								},
								labelLine: {
									normal: {
										lineStyle: {
											color: 'rgba(255, 255, 255, 0.3)'
										},
										smooth: 0.2,
										length: 10,
										length2: 20
									}
								},
								animationType: 'scale',
								animationEasing: 'elasticOut',
								animationDelay: function (idx) {
									return Math.random() * 200;
								},
							},
						],		
				};
				this.chartPieThree.setOption(option);
			},
			setChartMiddle(data){
//				console.log(data);
				let option = {
                     color: ['#fc6565'],
                     tooltip : {
                           trigger: 'axis',
                           axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                               type : 'line',       // 默认为直线，可选为：'line' | 'shadow'
                           },
                     },
                     xAxis : [
                          {
                             type : 'category',
                             data : [1,2,3,4,5,6,7,8,9,10],
                             axisTick: {
                                 alignWithLabel: true
                             },
                             axisLine:{
                                 lineStyle :{
                                    color:'#d5d9e6'
                                }
                            }
                          }
                      ],
                      yAxis : [
                         {
                           type : 'value',
                           axisLine:{
                                lineStyle :{
                                  color:'#d5d9e6',
                                  width : 0,
                                }
                            }
                         },
					],
				    series : [
                        {
                               name:'留存金额',
                               type:'bar',
                               barWidth: '20%',
                               data:['100','200','300','400','500','600','700','800','900','500'],
                               itemStyle:{
                                    barBorderRadius:[4, 4, 4, 4],
                               },
                               markPoint:{
                                    label:{
                                        color:'red'
                                    }
                               }
                           }
                     ]
				};
				this.middleChart.setOption(option);
			},
			setChartRent(data){
//				console.log(data);
				var option = {
							color:['#1fc984'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
							 xAxis: {
								type: 'category',
								data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
								  axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLine:{
                                        lineStyle :{
                                            color:'#c5c7d3'
                                        }
                                    }
							},
							yAxis: {
								type: 'value',
								axisLine:{
                                        lineStyle :{
                                            color:'#c5c7d3',
                                            width : 0,
                                        }
                                    }
							},
							series: [{
								data: [820, 932, 901, 934, 1290, 1330, 1320],
								type: 'line'
							}],
                        };
                     this.rentChart.setOption(option);
			},
			setChartOwner(data){
//				console.log(data);
				var option = {
							color:['#30caf6'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
							 xAxis: {
								type: 'category',
								data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
								  axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLine:{
                                        lineStyle :{
                                            color:'#c5c7d3'
                                        }
                                    }
							},
							yAxis: {
								type: 'value',
								axisLine:{
                                        lineStyle :{
                                            color:'#c5c7d3',
                                            width : 0,
                                        }
                                    }
							},
							series: [{
								data: [820, 932, 901, 934, 1290, 1330, 10],
								type: 'line'
							}],
                        };
                     this.ownerChart.setOption(option);
			},
			setChartGet(data){
//				console.log(data);
				var option = {
							color:['#897eef'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
							 xAxis: {
								type: 'category',
								data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
								  axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLine:{
                                        lineStyle :{
                                            color:'#c5c7d3'
                                        }
                                    }
							},
							yAxis: {
								type: 'value',
								axisLine:{
                                        lineStyle :{
                                            color:'#c5c7d3',
                                            width : 0,
                                        }
                                    }
							},
							series: [{
								data: [820, 932, 901, 934, 1290, 1330, 1320],
								type: 'line'
							}],
                        };
                     this.getChart.setOption(option);
			},
			setChartSold(data){
//				console.log(data);
				var option = {
							color:['#f9aa2b'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
							 xAxis: {
								type: 'category',
								data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
								  axisTick: {
                                        alignWithLabel: true
                                    },
                                    axisLine:{
                                        lineStyle :{
                                            color:'#c5c7d3'
                                        }
                                    }
							},
							yAxis: {
								type: 'value',
								axisLine:{
                                        lineStyle :{
                                            color:'#c5c7d3',
                                            width : 0,
                                        }
                                    }
							},
							series: [{
								data: [820, 932, 901, 934, 1290, 1330, 1320],
								type: 'line'
							}],
                        };
                this.soldChart.setOption(option);
			},
			changeDate1(val){
				let data = {};
				this.setChartMiddle(data);
                console.log(val);
			},
			changeDate2(val){
				let data = {};
				this.setChartMiddle(data);
                console.log(val);
			},
			changeDate3(val){
				let data = {};
				this.setChartRent(data);
			},
			changeDate4(val){
				let data = {};
				this.setChartRent(data);
			},
			changeDate5(val){
				let data = {};
				this.setChartOwner(data);
			},
			changeDate6(val){
				let data = {};
				this.setChartOwner(data);
			},
			changeDate7(val){
				let data = {};
				this.setChartGet(data);
			},
			changeDate8(val){
				let data = {};
				this.setChartGet(data);
			},
			changeDate9(val){
				let data = {};
				this.setChartSold(data);
			},
			changeDate10(val){
				let data = {};
				this.setChartSold(data);
			},
			middleClickMonth(){
				this.showMiddleTimer = false;
				let data = {};				
				this.setChartMiddle(data);
			},
			middleClickDay(){
				this.showMiddleTimer = true;				
				let data = {};				
				this.setChartMiddle(data);
			},
			rentClickMonth(){
				this.showRentTimer = false;
				let data = {};
				this.setChartRent(data);
			},
			rentClickDay(){
				this.showRentTimer = true;
				let data = {};
				this.setChartRent(data);
			},
			getClickMonth(){
				this.showGetTimer = false;
				let data = {};
				this.setChartGet(data);
			},
			getClickDay(){
				this.showGetTimer = true;
				let data = {};
				this.setChartGet(data);
			},
			soldClickMonth(){
				this.showSoldTimer = false;
				let data = {};
				this.setChartSold(data);
			},
			soldClickDay(){
				this.showSoldTimer = true;
				let data = {};
				this.setChartSold(data);
			},
			ownerClickMonth(){
				this.ownerRentTimer = false;
				let data = {};
				this.setChartOwner(data);
			},
			ownerClickDay(){
				this.ownerRentTimer = true;
				let data = {};
				this.setChartOwner(data);
			},
		},
    }
</script>
<style scoped lang="scss">	
	.leftHomeContainer {	
		box-sizing: border-box;
		padding: 24px;
	}
	.every {
		font-size: 12px;
		padding-bottom: 10px;
		border-bottom: 3px solid #fff;
		color: $greyText;
		margin-left: 30px;
		cursor: pointer;
	}
	.titleBold {
		font-weight: 600;
	}
	.everyActive {
		border-bottom-color: $mainRed;
		color: #292e47;
	}
	.maTop {
		margin-top: 24px;
	}
	.littleBlock {
		display: inline-block;
		height: 6px;
		width: 6px;
		vertical-align: middle;
		margin-right: 6px;
	}
	.blockRed {
		background-color: #fc6565;
	}
	.blockBlue {
		background-color: #30caf6;
	}
	.blockYellow {
		background-color: #f9aa2b;
	}
	.drakColor {
		background-color: #021014;
	}
	.thirtyPx {
		height: 30px;
	}
	.listConMiddle {
		margin-top: 15px;
		margin-bottom: 15px;
	}
	.topCon {
		width: 100%;
		.betweenFlex {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content:space-between;
			align-content: center;
			align-items: center;
		}
		.topOne {
			height: 180px;
			padding: 26px;
			box-sizing: border-box;
		}
		.topTwo {
			height: 180px;
			padding: 26px;
			box-sizing: border-box;
		}
		.topThree {
			height: 180px;
			padding: 26px;
			box-sizing: border-box;
		}
	}
	.listCon {
		height: 120px;
		width: 60%;
	}
	.specialBold {
		font-size: 20px;
		font-family: Helvetica !important;
		font-weight: 600;
	}
	.ChartText {
		color: $greyText;
		font-size: 14px;
	}
	.middleCon {
		margin-top: 20px;
		margin-bottom: 20px;
		height: 340px;
		.middleConInner {
			padding: 26px;
			box-sizing: border-box;
			.middleTitle {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				height: 30px;
				box-sizing: border-box;
				.titleText {
					color: $greyText;
					font-size: 14px;
				}
				.titleSelectCon {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: flex-end;
					align-content: center;
					align-items: center;
					margin-right: 60px;
				}
			}
		}
	}
	.bottomCon {
		height: 690px;
	}
	.whiteBg {
		background-color: #fff;
	}
	.borderRa {
		border-radius: 5px;
	}
	.sameFour {
		height: 330px;
		padding: 26px;
		box-sizing: border-box;
	}
	.rentTitle {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		height: 30px;
	}
	.rentTitleText {
		color: $greyText;
		font-size: 14px;
	}
	.rentTitleSelectCon {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
		align-content: center;
		align-items: center;
	}	
</style>
<style  lang="scss">
    .datePickerCon {
        position: relative;		
        .nameSpecial {
            position: absolute;
            right: 0;
            top: -16px;
        }
        .el-picker-panel {
            z-index: 1000;
        }
    }
    .leftHomeContainer {
        .middleCon .el-date-editor.el-input {
            width: 140px;
        }
        .el-input--prefix .el-input__inner {
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-weight: 600;
        }   
        .bottomCon {
            .soldTitleSelectCon .el-input--prefix .el-input__inner {            
                border-color: #fef6e9 !important;
                background-color: #fef6e9 !important;
                color: #f9aa2b !important;
            }
            .getTitleSelectCon .el-input--prefix .el-input__inner {
                border-color: #f3f2fd !important;
                background-color: #f3f2fd !important;
                color: #897eef !important;
            }
            .ownerTitleSelectCon .el-input--prefix .el-input__inner {
                border-color: #eafafe !important;
                background-color: #eafafe !important;
                color: #07aedb !important;
            }	
            .rentTitleSelectCon .el-input--prefix .el-input__inner {
                border-color: #f3fef5;
                background-color: #f3fef5;
                color: #1fc984;
            }
            .el-date-editor.el-input {
                width: 140px;
            }
        }
        .middleCon .el-input--prefix .el-input__inner {
            border-color: #ffefef;
            background-color: #ffefef;
            color: #fc6e6e;
        }
    }
</style>
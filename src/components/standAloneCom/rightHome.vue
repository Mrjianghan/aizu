 <template>
  <div class="rightHomeContainer">  	  
	   <div class="first">
		   <div class="same">
			   <div class="iconCon"><i class="icon-shouye_zongfangjian- iconfont"></i></div>
			   <div class="number">{{numOne | formatMoneyValue }}</div>
			   <div class="topTitle">总房间（间）</div>
	 		</div>
		   <div class="same">
			   <div class="iconCon"><i class="icon-shouye_yichuzu- iconfont"></i></div>
			   <div class="number">{{numTwo | formatMoneyValue }}</div>
			   <div class="topTitle">已入住（间）</div>
	 		</div>
		   <div class="same">
			   <div class="iconCon"><i class="icon-shouye_kongzhi- iconfont"></i></div>
			   <div class="number">{{numThree | formatMoneyValue }}</div>
			   <div class="topTitle">空置（间）</div>
	 		</div>
		   <div class="same">
			   <div class="iconCon"><i class="icon-shouye_lixian- iconfont"></i></div>
			   <div class="number">{{numFour | formatMoneyValue }}</div>
			   <div class="topTitle">离线（户）</div>
	 		</div>
		   <div class="same">
			   <div class="iconCon"><i class="icon-shouye_yichang- iconfont"></i></div>
			   <div class="number">{{numFive | formatMoneyValue }}</div>
			   <div class="topTitle">异常数据（户）</div>
	 		</div>
	   </div>
	  <div class="second">
		  <div class="leftCon">
			  <div class="flexTitle">
				  <div>电费充值</div>
				  <div class="listCon">
					  <div class="sameBlock sameBlock1"><span class="littleBlock darkBlock"></span>已用</div>
					  <div class="sameBlock sameBlock2"><span class="littleBlock redBlock"></span>剩余</div>
	 				</div>
	 			</div>
			  <div class="echartConOne">
				  <div id="chartPieOne" style="width:100%;height:100%"></div>
	 			</div>
			  <div class="leftInfo">
				  <div class="textCon">
					  <div>剩余电量（度）</div>
					  <div class="leftNumber">{{ 234234 | formatMoneyValue }}</div>
	 				</div>
				  <div class="textCon">
					  <div>当天充值（度）</div>
					  <div class="leftNumber">{{ 234234 | formatMoneyValue }}</div>
	 				</div>
				  <div class="textCon">
					  <div>本周充值（度）</div>
					  <div class="leftNumber">{{ 234234 | formatMoneyValue }}</div>
	 				</div>				  
	 			</div>
	 		</div>
		  <div class="rightCon">
			  <div class="flexTitle">
				  <div>充值统计</div>
				  <div class="listCon">
					  <div class="sameBlock sameBlock1"><span class="littleBlock redBlock"></span>线下</div>
					  <div class="sameBlock sameBlock2"><span class="littleBlock blueBlock"></span>微信</div>
					  <div class="sameBlock sameBlock3"><span class="littleBlock greenBlock"></span>支付宝</div>
	 				</div>
	 			</div>	
			  <div class="echartConTwo">				  
				  <div class="secondSwitchCon">
					  <div class="monthSelect" @click="monthClick" :class="{selectActive:(trackIndex==1) ? true : false}">当月充值</div>
					  <div class="daySelect" @click="dayClick" :class="{selectActive:(trackIndex==2) ? true : false}">当天充值</div>
	 				</div>
				  <div class="chartTwoCon">	 				
				  	<div id="chartPieTwo" style="width:91%;height:100%;margin:0 auto;"></div>
				  </div>
	 			</div>
	 		</div>
	 </div>	 
  </div>
</template>
<script>
	import echarts from 'echarts';	  
    export default {
        data(){
			return {
				numOne:999999999,
				numTwo:999999999,
				numThree:999999999,
				numFour:999999999,
				numFive:999999999,
				chartPieOne:null,
				chartPieTwo:null,
				trackIndex:1,
			}
		},
		mounted(){
			this.initChart();
		},
		beforeDestroy(){
			window.removeEventListener('resize', ()=>{
				this.resizeEvent();					
			});	
		},
		methods:{
			monthClick(){
				this.trackIndex = 1;
				this.setChartPieTwo();
			},
			dayClick(){
				this.trackIndex = 2;
				this.anotherSetChartPieTwo();
			},
			resizeEvent(){
				this.chartPieOne.resize();
				this.chartPieTwo.resize();
			},
			initChart(){
				this.chartPieOne = echarts.init(document.getElementById('chartPieOne'));
				this.chartPieTwo = echarts.init(document.getElementById('chartPieTwo'));
				this.setChartPieOne();
				this.setChartPieTwo();
				window.addEventListener('resize', ()=>{
					this.resizeEvent();					
				});				
			},
			anotherSetChartPieTwo(){	
				let option = {					
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一','周二','周三','周四','周五','周六','周日'],
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
					color:[
						'#fc6565',
						'#88f49c',
						'#30caf6'
					],
					series: [
						{
							name:'线下',
							type:'line',
							stack: '总量',
							smooth: true,
							data:[20, 132, 101, 134, 90, 230, 210]
						},
						{
							name:'微信',
							type:'line',
							stack: '总量',
							smooth: true,
							data:[220, 18, 191, 234, 290, 330, 310]
						},
						{
							name:'支付宝',
							type:'line',
							stack: '总量',
							smooth: true,
							data:[150, 23, 201, 154, 190, 330, 410]
						},
					]					
				};				
				this.chartPieTwo.setOption(option);
			},	
			setChartPieTwo(){	
				let option = {					
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['周一','周二','周三','周四','周五','周六','周日'],
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
					color:[
						'#fc6565',
						'#88f49c',
						'#30caf6'
					],
					series: [
						{
							name:'线下',
							type:'line',
							stack: '总量',
							smooth: true,
							data:[120, 132, 101, 134, 90, 230, 210]
						},
						{
							name:'微信',
							type:'line',
							stack: '总量',
							smooth: true,
							data:[220, 182, 191, 234, 290, 330, 310]
						},
						{
							name:'支付宝',
							type:'line',
							stack: '总量',
							smooth: true,
							data:[150, 232, 201, 154, 190, 330, 410]
						},
					]					
				};				
				this.chartPieTwo.setOption(option);
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
		},
    }
</script>
<style scoped lang="scss">
	.rightHomeContainer {
		padding: 24px;
		box-sizing:border-box;
	}
	.chartTwoCon {
		height: 470px;
	}
	.secondSwitchCon {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		margin-top: 20px;
		font-size: 12px;
		font-weight: 600;
	}
	.monthSelect {
		margin-right: 40px;
		padding-bottom: 10px;
		border-bottom: 3px solid #fff;
		cursor: pointer;
	}
	.selectActive {
		color: #292e47 !important;
		border-color: $mainRed !important;
	}
	.daySelect {
		padding-bottom: 10px;
		border-bottom: 3px solid #fff;
		cursor: pointer;
	}
	.leftNumber {
		font-size: 20px;
		color: #292e47;
		font-weight: 600;
		font-family: Helvetica;
	}
	.echartConOne {
		width: 100%;
		height: 360px;
	}
	.echartConTwo {
		height: 500px;
	}
	.leftInfo {
		font-size: 14px;
	}
	.textCon {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-content: center;
		align-items: center;
		padding-top: 15px;
		padding-bottom: 15px;
	}
	.sameBlock {
		width: 50px;
		font-size: 14px;
	}
	.sameBlock1 {
		margin-right: 30px;
	}
	.sameBlock3 {
		margin-left: 30px;
		width: 60px !important;
	}
	.listCon {		
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
		align-content: center;
		align-items: center;
	}
	.flexTitle {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-content: center;
		align-items: center;	
		font-size: 14px;
	}
	.first {		
		background-color: #fff;
		padding: 30px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content:flex-start;
		align-content: center;
		align-items: center;
		border-radius: 10px;
	}
	.iconCon {
		.iconfont {
			font-size: 32px;
			color: $mainRed;
		}
	}
	.same {
		width: 20%;
	}
	.number {
		font-size: 30px;
		margin-top: 5px;
		margin-bottom: 10px;
		font-family: Helvetica;
		font-weight: 600;
		letter-spacing: 1px;
	}
	.topTitle {
		font-size: 14px;
		color: #a4aabc;
	}
	.littleBlock {
		display: inline-block;
		height: 6px;
		width: 6px;
		vertical-align: middle;
		margin-right: 6px;
	}
	.darkBlock {
		background-color: #2a2f48;
	}
	.redBlock {
		background-color: $mainRed;
	}
	.blueBlock {
		background-color: #88f49c;
	}
	.greenBlock {
		background-color: #30caf6;
	}
	.second {
		width: 100%;
		margin-top: 16px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-content: center;
		align-items: center;
	}
	.leftCon {
		background-color: #fff;
		border-radius: 10px;
		border-radius: 10px;
		width: 30%;
		padding: 30px;
		box-sizing: border-box;
		color: #a4aabc;
	}
	.rightCon {
		color: #a4aabc;
		background-color: #fff;
		border-radius: 10px;
		border-radius: 10px;
		width: 68%;
		padding: 30px;
		box-sizing: border-box;
	}
</style>
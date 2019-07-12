<template>
  <div class="communityManageContainer"> 
	  <div class="searchCon flex">
		  <div class="sameWidth marBottom marRight">
			  <el-input placeholder="输入小区名称"  v-model.trim="searchMaster.communityName" clearable @change="inputChange(searchMaster.communityName,'searchMaster','communityName')"></el-input>
		 </div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.city" placeholder="请选择" @change="inputChange(searchMaster.city,'searchMaster','city')">			
				  <el-option label="城市（全部）" value=""></el-option>
				</el-select>
			</div>
		  <div class="timerCon marBottom marRight">
			  <el-date-picker	prefix-icon="''"  v-model.trim="searchMaster.time" type="daterange" align="right" unlink-panels  range-separator="至"  start-placeholder="开始日期"  end-placeholder="结束日期"  :picker-options="pickerOptions2" @change="inputChange(searchMaster.time,'searchMaster','time')"></el-date-picker>
			</div>
		  <div class="sameWidth marBottom marRight">
			  <el-select v-model.trim="searchMaster.status" placeholder="请选择" @change="inputChange(searchMaster.status,'searchMaster','status')">			
				  <el-option label="审核状态（全部）" value=""></el-option>
				  <el-option label="已审核" value="1"></el-option>
				  <el-option label="未审核" value="0"></el-option>
				</el-select>
			</div>
		  <div class="btnCon flex marBottom">			  
			  <RedBtn :text="'查询'" @click.native="queryNow"></RedBtn>
			<GreyBtn :text="'重置'" class="marLeft" @click.native="reset"></GreyBtn>
			</div>		  
		</div>
	   <div class="tableOuter">
		   <div class="tableTop flex">	
			   <el-tooltip content="新增" placement="bottom" effect="light">
			   <div class="tableTopRight addBg" @click="addUserPop">
				   <i class="icon-tianjia- iconfont" ></i></div>
				</el-tooltip>
			   <el-tooltip content="多选删除" placement="bottom" effect="light">
				  <div class="tableTopRightSp  delDisable" :class="{delAble}" @click="popMultipleDelete">
					  <i class="icon-shanchu- iconfont"></i></div>
				</el-tooltip>
			</div>
		  <div class="tableContent" :style="{width:computed}">
			  <el-table :data="tableData3"  tooltip-effect="dark"  style="width: 100%"   height="600"  stripe   
						@selection-change="handleSelectionChange" v-loading="loading">
				  <el-table-column  type="selection"></el-table-column>
				<el-table-column  type="index" label="序号"  show-overflow-tooltip></el-table-column>
				<el-table-column  label="小区名" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.communityName | emptyProcessor }}</template>
					</el-table-column>
				<el-table-column  label="小区状态" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.enabled === 1 ? '已审核' :'未审核' }}</template>
					</el-table-column>
				<el-table-column  label="描述" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.description | emptyProcessor }}</template>
					</el-table-column>
				<el-table-column  label="经度" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.longitude | emptyProcessor }}</template>
					</el-table-column>
				<el-table-column  label="纬度" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.latitude | emptyProcessor }}</template>
					</el-table-column>
				<el-table-column  label="区" show-overflow-tooltip>
					  <template slot-scope="scope">{{ scope.row.districtName | emptyProcessor }}</template>
					</el-table-column>
				<el-table-column  label="位置" show-overflow-tooltip min-width="150">
					  <template slot-scope="scope">
							<span>{{ scope.row.place | emptyProcessor }}</span>
					</template>
					</el-table-column>
				<el-table-column label="操作">
                      <template slot-scope="scope">
                        <div >
							<el-popover	placement="bottom"	trigger="hover">
								<div class="popperInner popperEdit" @click="editInfo(scope.row)"><i class="iconfont icon-bianji-"></i> <span> 编辑</span>  </div>
								<div class="popperInner popperDelete" @click="popDelete(scope.row)"><i class="iconfont icon-shanchu-"></i> <span> 删除</span></div>
								<div  class="operate" slot="reference">操作</div>
							  </el-popover>
                        </div>
                      </template>
                </el-table-column>
				</el-table>
				<div class="pagOuter">
                    <el-pagination
						  @size-change="handleSizeChange"
						  @current-change="handleCurrentChange"
						  :current-page="current"
						  :page-sizes="[10, 20, 30, 50]"
						  :page-size="size"
						  layout="total, sizes, prev, pager, next, jumper"
						  :total="total">
                    </el-pagination>
				</div>
			</div>
	</div>	  
	<transition name="popDel">
		<Del v-if="showDelete"  :delCon="quitConfirm" :delCancel="quitCancel"></Del>
	</transition>
	<transition name="popDel">
		<Del v-if="showSingleDelete"  :delCon="quitSingleConfirm" :delCancel="quitSingleCancel"></Del>
	</transition>
	<el-dialog title="编辑" :visible.sync="editVisible" class="diagCon editDiagCon" :close-on-click-modal="false">
			<div class="triggerCon flex">
				<div class="mapTrigger" @click="mapTrigger">打开地图</div>
			</div>
			<el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px">
				<div class="scrollContainer triggerContainer">
					<el-form-item label="小区名称" prop="name">
						<el-input v-model.trim="editForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="小区位置" prop="name">
						<el-input v-model.trim="editForm.name"></el-input>
					  </el-form-item>
					 <el-form-item label="审核状态" >
						  <el-select v-model.trim="editForm.type" placeholder="请选择">
							<el-option label="未审核" value="0"></el-option>
							<el-option label="已审核" value="1"></el-option>
						  </el-select>
						</el-form-item>
					<el-form-item label="所属区域" prop="area">						
                        <el-select v-model.trim="editForm.area" placeholder="请选择">
							
						  </el-select>
						</el-form-item>
					  </el-form-item>					
					<el-form-item label="经度" prop="name">
						<el-input v-model.trim="editForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="纬度" prop="name">
						<el-input v-model.trim="editForm.name"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveEdit('editForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelEdit('editForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
    <el-dialog title="新增" :visible.sync="newVisible" class="diagCon newDiagCon" :close-on-click-modal="false">
			<el-form :model="newForm" :rules="newRules" ref="newForm" label-width="100px">
				<div class="scrollContainer triggerContainer">
					<el-form-item label="小区名称" prop="name">
						<el-input v-model.trim="newForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="小区位置" prop="name">
						<el-input v-model.trim="newForm.name"></el-input>
					  </el-form-item>
					 
					<el-form-item label="所属区域" prop="area">						
                        <el-select v-model.trim="newForm.area" placeholder="请选择">
							
						  </el-select>
						</el-form-item>
					  </el-form-item>					
					<el-form-item label="经度" prop="name">
						<el-input v-model.trim="newForm.name"></el-input>
					  </el-form-item>
					<el-form-item label="纬度" prop="name">
						<el-input v-model.trim="newForm.name"></el-input>
					  </el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveNew('newForm')"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelNew('newForm')"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>

<!--
	<el-dialog title="新增" :visible.sync="addVisible" class="diagCon addDiagCon" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
				<div class="scrollContainer">
					<el-form-item label="手机号" prop="name">
						<el-input v-model.trim="addForm.name"></el-input>
					  </el-form-item>
					 <el-form-item label="身份" >
						  <el-select v-model.trim="addForm.type" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						  </el-select>
						</el-form-item>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveAdd"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelAdd"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
-->
	<el-dialog title="坐标编辑" :visible.sync="mapVisible" class="diagCon triggerDiagCon" :close-on-click-modal="false">
			<el-form :model="mapForm" :rules="mapRules" ref="mapForm">
				<div class="scrollContainer">
					<div class="mapFormCon flex">
						<div class="itemCon flex">
							<div class="itemTitle">区域</div>
							<input type="text" v-model.trim="map.area" disabled>
						</div>
						<div class="itemCon flex">
							<div class="itemTitle">经度</div>
							<input type="text" v-model.trim="map.lng" disabled>
						</div>
						<div class="itemCon flex">
							<div class="itemTitle">纬度</div>
							<input type="text" v-model.trim="map.lat" disabled>
						</div>
						<div class="itemCon flex">
							<div class="itemTitle detailTitle">详细地址</div>
							<input class="detailInput" type="text" v-model.trim="map.detail" disabled>
						</div>
					</div>
					<div class="mapContainer">
						<div id="cusmap"></div>
						<div class="inputSearch">
							<el-autocomplete
								  v-model.trim="searchContent"
								  :fetch-suggestions="querySearchAsync"
								  placeholder="请输入内容"
								  @select="handleSelect"
								></el-autocomplete>
						</div>
					</div>
				</div>
				<div class="diagBtnCon flex">
					<RedBtn :text="'保存'" @click.native="saveMap"></RedBtn>
					<GreyBtn class="marLeft" @click.native="cancelMap"></GreyBtn>
				</div>
			</el-form>
		</el-dialog>
  </div>
</template>
<script>
    export default {
		watch:{
			'multipleSelection':function(nval,val){
				if(nval.length){
					this.delAble = true;
				}else{
					this.delAble = false;
				}
			},
		},
        data(){
			return {
                loading:true,
                searchMaster:{
                    status:'',				
                    time:'',
                    communityName:'',
                    city:'',
                },
				computed:'auto',
				storeMap:{
					time:'cmTime',
					status:'cmStatus',
					communityName:'cmCommunityName',
					city:'cmCity',
				},
				storeArr:[					
					'time',
					'status',
					'communityName',
					'city',
				],
				storeArrMatchParam:[
					'ptime',
					'communityStatus',
					'communityName',
					'cityId',
				],
				timeParams:{
					ptime:[
						'gmtCreateStart',
						'gmtCreateEnd',
					],
				},	
        		timeout:  null,
				keyword:'',
				searchContent:'',	
				location:'',
				map:{
					area:'',
					lng:1,
					lat:1,
					detail:'',
				},
				mapVisible:false,
				mapForm:{},
				mapRules:{},
				editVisible:false,
				addVisible:false,
                editRules:{},
                editForm:{},
				addForm:{},
				addRules:{},				
				delAble:false,
				showDelete:false,
				showSingleDelete:false,
				multipleSelection:[],
				current:1,
				size:10,
				total:0,
				pickerOptions2: this.DatePick.range,
				tableData3:[
//					{name:'me'},
//					{name:'me'}
				],
				center:{
					lat:116.404, 
					lng:39.915,
				},	
				mapInstance:null,	
                multipleDeleteArr:[],
                deleteSingleId:'',
                newVisible:false,
                newForm:{},
                newRules:{},
                
                
			}
		},
		mounted(){	
			this.initSearch();
            this.initTable();
		},
		methods:{	
            initTable(){                
                this.Digital.tableWidthController.bind(this)(290,'computed'); 
			},
			initSearch(){
				let data = this.Digital.getParams.bind(this)(); 
                let finalData = this.Digital.setTimersParams.bind(this)(data);  
                this.runSearch(finalData);
			},            
			inputChange(val,form,item){
                if(val){
                   this.StoreJs.set( this.storeMap[item],val );
                }else{
                    this.StoreJs.remove( this.storeMap[item] );
                }
			},            
			saveMap(){
				this.mapVisible = false;
			},
			cancelMap(){
				this.mapVisible = false;
			},
			querySearchAsync(queryString, cb) {
				let that = this;
				var final =  [] ;
				var options = {
					onSearchComplete: function(results){
							// 判断状态是否正确
						if (local.getStatus() == BMAP_STATUS_SUCCESS){
							var arr = [];
							for (var i = 0; i < results.getCurrentNumPois(); i ++){
								let obj ={
									"value":results.getPoi(i).title,
									"address":results.getPoi(i).address
								};
								arr.push( obj );
							}
							final = arr.length ? arr : [];
						}
					}
				};
				var local = new BMap.LocalSearch(this.mapInstance, options);
				local.search(this.searchContent);
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
				  cb(final);
				}, 2000 * Math.random());
			  },
			  handleSelect(item) {
				console.log(item);
				  this.mapInstance.clearOverlays();
				  let that = this;
				  var myGeo = new BMap.Geocoder();
					// 将地址解析结果显示在地图上,并调整地图视野
					myGeo.getPoint(item.value, function(point){
						if (point) {
							that.mapInstance.centerAndZoom(point, 16);
							var myIcon = new BMap.Icon(require('../../../public/imgs/marker.png'), new BMap.Size(38,38));
							var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
							that.mapInstance.addOverlay(marker);
							marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
							marker.enableDragging();
							marker.addEventListener('dragging',(e)=>{
								that.map.lng = e.point.lng;
								that.map.lat = e.point.lat;
							});
							marker.addEventListener('dragend',(e)=>{
								var geoc = new BMap.Geocoder();    
								var pt = e.point;
								geoc.getLocation(pt, function(rs){
									var addComp = rs.addressComponents;
									that.map.detail =  rs.address;
									that.map.area = rs.addressComponents.district;
								}); 
							});
						}else{
							alert("您选择地址没有解析到结果!");
						}
					},'');
			  },
			saveAdd(){
				this.addVisible = false;
			},
			cancelAdd(){
				this.addVisible = false;
			},
			addUserPop(){
				this.addForm ={};
                this.newVisible = true;
			},
			popMultipleDelete(){
				if(this.delAble){
					this.showDelete = true;
                    this.multipleDeleteArr = this.multipleSelection.map((ele,index)=>{
                        return ele.id;
                    });
                    console.log( 'multipleDeleteArr',this.multipleDeleteArr );
				}
			},
            saveNew(){
                this.newVisible = false;
            },
            cancelNew(){
                this.newVisible = false;
            },
			saveEdit(){
				this.editVisible = false;
			},
			cancelEdit(){
				this.editVisible = false;
			},
			editInfo(row){
				this.editForm = {};
				this.editVisible = true;
                console.log( row.id );
                
			},
			popDelete(row){				
				this.showSingleDelete = true;
                this.deleteSingleId = row.id;
                console.log( this.deleteSingleId );
			},	
			quitSingleConfirm(){
				this.showSingleDelete = false;
				this.Success.deleteSuccess();
                console.log( this.deleteSingleId );
//				this.Err.netErr();
			},
			quitSingleCancel(){
				this.showSingleDelete = false;
			},
			quitConfirm(){
				this.showDelete = false;
				this.Success.deleteSuccess();
                console.log('等待删除id数组',this.multipleDeleteArr); 
//				this.Err.netErr();
			},
			quitCancel(){
				this.showDelete = false;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
                this.current = 1;
                this.size = val;
                this.initSearch();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
                this.current = val;
                this.initSearch();
			},			
			handleSelectionChange(val) {
                this.multipleSelection = val;
            },
			runSearch(data){
                data.size = this.size;
                data.current = this.current;
                this.ApiLists[10007](data).then(res=>{
                    let { data:layer1 } = res;
                    let { success,message,data } = layer1; 
                    if(success){
                        this.tableData3 = data.records;
                        this.total = data.total;
                        this.loading = false;
                    }else{
                       this.$message.error(message);
                    }
                }).catch(err=>{
                    console.log(err); 
                }); 
			},
			queryNow(){
				this.initSearch();
			},
			reset(){	
                this.Digital.reset.bind(this)(); 
				this.runSearch({});
			},
			mapTrigger(){
				this.mapVisible = true;
				this.$nextTick(()=>{
					let map =new BMap.Map('cusmap');
					this.mapInstance = map;
					var point = new BMap.Point(this.center.lat,this.center.lng);					
					map.centerAndZoom(point,14);
					
					var scaleCtrl = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT,offset: new BMap.Size(10,40)});
					map.addControl(scaleCtrl);
					
					map.enableScrollWheelZoom(true);
					
					var geoc = new BMap.Geocoder();    
					let that = this;
					map.addEventListener("click", function(e){ 
						let pt = e.point;
						geoc.getLocation(pt, function(rs){
							var addComp = rs.addressComponents;						
						});        
					});
					
					var overView = new BMap.OverviewMapControl();
					var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
					
					map.addControl(overView);          //添加默认缩略地图控件
					map.addControl(overViewOpen);      //右下角，打开
					var myIcon = new BMap.Icon(require('../../../public/imgs/marker.png'), new BMap.Size(38,38));
					var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
					map.addOverlay(marker);  
					marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
					marker.enableDragging();
					
					marker.addEventListener('dragging',(e)=>{
						this.map.lng = e.point.lng;
						this.map.lat = e.point.lat;
					});
					marker.addEventListener('dragend',(e)=>{
						var geoc = new BMap.Geocoder();    
						var pt = e.point;
						geoc.getLocation(pt, function(rs){
							var addComp = rs.addressComponents;
							that.map.detail =  rs.address;
							that.map.area = rs.addressComponents.district;
						}); 
					});
				})
			},
		},
    }
</script>
<style scoped lang="scss">
    .marBottom  {
        margin-bottom: 20px;
    }
    .marRight {
        margin-right: 20px;
    }
	.tableTop {
		height: 40px;
		flex-wrap: nowrap;
		justify-content:flex-end;
		margin-bottom: 20px;
		.tableTopRight {
			height: 30px;
			width: 30px;
			background-color: $mainRed;
			border-radius: 15px;
			line-height: 30px;
			text-align: center;
			color: #fff;
			box-shadow: $redShadow;
			cursor: pointer;
		}
		.tableTopRightSp {
			height: 30px;
			width: 30px;
			background-color: $mainRed;
			border-radius: 15px;
			line-height: 30px;
			text-align: center;
			color: #fff;
			box-shadow: $redShadow;
			margin-left: 20px;
		}
	}
	.triggerCon {
		justify-content: flex-end;
	}
	#cusmap {
		width: 100%;
		height: 390px;
	}
	.mapTrigger {
		cursor: pointer;
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: $mainRed;
	}
	.mapContainer {
		height: 390px;
		width: 100%;
		margin-top: 20px;
		position: relative;
		.inputSearch {
			position: absolute;
			left: 0;
			top: 0;
		}
	}
	.mapFormCon {
		flex-wrap: wrap;
		justify-content: flex-start;
		.itemCon {
			flex-wrap: wrap;
			justify-content: flex-start;
			.itemTitle {
				width: 60px;
				color: #4c5269;
				font-size: 15px;
				text-align: center;
			}
			.detailTitle {
				margin-left: 15px;
				margin-right: 15px;
			}
			input {
				border: none;
				width: 120px;
				height: 30px;
				border: 2px solid #eee;
				box-sizing: border-box;
				padding-left: 10px;
				cursor: not-allowed;
			}
			.detailInput {
				width: 240px;
			}
		}
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
	.communityManageContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.addBg {
			background-color: #2a2f48 !important;
			margin-left: 20px;
			box-shadow: 0px 2px 10px 5px #dadbe1 !important;
		}
		.pagOuter {
			text-align: right;
			padding-top: 10px;
			box-sizing: border-box;
		}
		.operate {
			width: 60px;
			height: 30px;
			color: $mainRed;
			margin: 0 auto;
			line-height: 30px;
			background-color: $specialBgRed;
			border-radius: 15px;
			cursor: pointer;
			font-size: 13px;
		}
		.tableOuter {
			height: 730px;
			background-color: #fff;
			border-radius: 10px;
			padding: 14px;
			box-sizing: border-box;
		}
		.searchCon {
			flex-wrap:wrap;
			justify-content:flex-start;
		}
		.btnCon {
			width: 200px;
			flex-wrap: nowrap;
			justify-content: space-between;
		}
		.timerCon {
			width: 280px;
		}
		.sameWidth {
			width: 170px;
		}
		.scrollContainer {
			height: 370px;
			overflow-y: scroll;
		}
	}
</style>
<style  lang="scss">
	.communityManageContainer {
		.diagCon .el-dialog {
			width: 540px !important;
			height: 560px !important;
		}
		.triggerDiagCon .el-dialog {
			width: 980px !important;
			height: 590px !important;
			.scrollContainer {
				height: 440px !important;
			}
		}
        .newDiagCon .el-dialog {
            height: 500px !important;
            .scrollContainer {
				height: 320px !important;
			}
        }
		.addDiagCon .el-dialog{
			height: 320px !important;
			.scrollContainer {
				height: 130px !important;
			}
		}
		.diagCon .el-select {
			width: 100%;
		}
		.searchCon .el-input__inner {
			border: none;
			border-radius: 20px;
		}
		.searchCon .el-date-editor--daterange {
			width: 280px;
		}
		.el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
		.el-dialog__body { 
			padding: 30px 20px !important;
		}
		.editDiagCon .el-dialog__body { 
			padding-top: 0 !important;
		}
		.triggerDiagCon .el-dialog__body { 
			padding-top: 0 !important;
		}
		.map {
			width: 100%;
			height: 390px;
		}
	}
</style>
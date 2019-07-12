<template>
  <div class="excelContainer">
      <div class="tableOuter">
          <div class="tableTop flex">
              <el-tooltip content="多选下载" placement="bottom" effect="light">
              <div class="tableTopRight"  @click="multipleDownLoad" :class="{delAble}"><i class="iconfont icon-xiazai-" ></i></div>
                </el-tooltip>
            </div>
          <div class="tableCon"  :style="{width:computed}">
              <el-table  :data="tableData3"  tooltip-effect="dark" height="730" width="100%" stripe @selection-change="handleSelectionChange">
                  <el-table-column type="selection"></el-table-column>
                  <el-table-column label="表格下载"  show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip>
                        <template slot-scope="scope">
                            <a :ref="scope.row.index" :href="scope.row.src" :download="scope.row.download">
                                <div class="download" @click="download(scope.row)">下载</div>
                            </a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
    </div>
  </div>
</template>
<script>
    export default {
        data(){
			return {
                computed:'auto',
				tableData3:[],
                multipleSelection: [],
                delAble:false,
			}
		},
        watch:{
			'multipleSelection':function(nval,val){
				console.log(nval);
				if(nval.length){
				   this.delAble = true;
				}else{
				   this.delAble = false;
				}
			},
		},
		mounted(){		
            this.initTable();
            this.initArray();
		},
		methods:{
            initArray(){
                let responseArr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'];    
                let completeArr = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'];
                let matchObj = {
                    1 : '用户出租合同信息汇总表',
                    2 : '用户收房合同信息汇总表',
                    3 : '房东款增减汇总表',
                    4 : '房东款明细汇总表',
                    5 : '出租合同信息汇总',
                    6 : '收房合同信息汇总',
                    7 : '房源明细信息汇总表',
                    8 : '本期应付明细表',
                    9 : '垫付款扣回明细表',
                    10 : '租客费用明细表',
                    11 : '房东费用明细表',
                    12 : '本期应收明细表',                    
                    13 : '员工出租率',
                    14 : '电费充值记录下载',
                    15 : '出租未收款下载',
                    16 : '租客收据凭证号下载',                    
                    17 : '租客用电量下载',
                    18 : '房源预定记录下载',
                };
                let fixArr = [];                
                async function batchProcess(sourceArr,finalArr,matchObj,code,index){
                    if( sourceArr.includes(code) ){
//                        let outArr = await this.ApiLists[10002]().then(res=>{
//                            let { data } = res;
//                            return data;
//                        }).catch(err=>{
//                            console.log(err); 
//                            return null;
//                        });
                        let buffer = [];
//                        if(outArr){
//                           buffer = outArr;
//                        }           
                        let blob = new Blob([ buffer ]);
                        let url = URL.createObjectURL( blob );	
                        let now = Date.now();		
                        let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
                       finalArr.push({
                           name : matchObj[code],
                           download:`${matchObj[code]}${format}.xls`,
                           src:url,
                           index:`anchor${index+1}`,
                       })
                        URL.revokeObjectURL(url);   
                    }
                };                
                completeArr.forEach((ele,index)=>{
                    batchProcess.bind(this)( responseArr,fixArr,matchObj,ele,index );
                }); 
                console.log( 'fixArr',fixArr );                
                this.tableData3 = fixArr;
            },
            multipleDownLoad(){
              if(this.multipleSelection.length){
                  this.multipleSelection.forEach(ele=>{
                      this.$refs[ele.index].click();
                  });
              }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
            },
            generateExcel(buffer){							
				let blob = new Blob([ buffer ]);
				let url = URL.createObjectURL( blob );	
				this.excelHref =  url;
				let now = Date.now();		
                let format = this.DayJs(now).format("YYYY年MM月DD日HH时mm分");
                this.excelDownload = `testtestme${format}.xls`;	
				URL.revokeObjectURL(url);
			},
			download(row){
				console.log(row);
			},
            initTable(){                
                this.Digital.tableWidthController.bind(this)(290,'computed');                 
			},
		},
    }
</script>
<style scoped lang="scss">
    .tableOuter {
		background-color: #fff;
		border-radius: 10px;
		padding: 14px;
        box-sizing: border-box;
    }
    .tableTop {
        flex-wrap: nowrap;
        justify-content: flex-end;
        margin-bottom: 20px;
    }
    .tableTopRight {
		height: 30px;
		width: 30px;
		background-color: $mainRed;
		border-radius: 15px;
		line-height: 30px;
		text-align: center;
		color: #fff;
		box-shadow: $redShadow;
		cursor:not-allowed;
	}
	.excelContainer {
		box-sizing: border-box;
		padding: 24px;
		padding-bottom: 50px;
		.tableCon {
			border-radius: 10px;
			background-color: #fff;
			overflow: hidden;
		}
		.download {
			color: $mainRed;
			background-color: $specialBgRed;
			height: 30px;
			line-height: 30px;
			width: 60px;
			margin: 0 auto;
			border-radius: 15px;
			cursor:pointer;
		}
	}
</style>
<style  lang="scss">
	.excelContainer {
        .el-table__header-wrapper .has-gutter {			
			th{
				background-color:$tableHeadBg;
				color: #fff;
			}
		}
		.tableCon {
			.el-table thead {
				color: #a4aabc;
				font-weight: 400;
				font-size: 13px;
				th {
					font-weight: normal;
				}
			}
		}
	}
</style>
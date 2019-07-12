<template>
  <div class="clodopAlertContainer"> 
      <el-dialog title="Clodop下载提示"  :visible.sync="show" :show-close="false"  :close-on-click-modal="false">
          <div class="scrollContainer">
              <div class="describe"><a :href="exeFilePath"  download>请点击此处下载Clodop{{officalVersion()}}安装包{{fileName}}安装并刷新浏览器。</a></div>
              <div class="diagBtnCon">
                  <RedBtn @click.native="shutAction" :text="'确定'" class="marLeft" ></RedBtn>
                </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
    import { officalVersion } from '@/tools/lodop.js'; 
    export default {
        data(){
            return {
                show:true,
                exeFilePath:'../../../CLodop_Setup_for_Win32NT_https_3.083Extend.zip',
                fileName:'CLodop_Setup_for_Win32NT_https_3.083Extend.zip'
            }
        },
		props:{
			action:Function,
		},
		computed:{
			shutAction:function(){
				return this.action;
			},
            officalVersion:function(){
                return officalVersion;
            }
		},
    }
</script>
<style scoped lang="scss">
    .diagBtnCon {
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-content: center;
        align-items: center;
    }
    .describe {
        margin-top: 10px;
    }
    a {
        color: #105398;
        font-size: 14px;
    }
</style>
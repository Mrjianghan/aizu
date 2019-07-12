<template>
  <div class="agreementDetailContainer">
    <div class="inner">
      <div class="top">
        <div class="topHeader">
          <div class="topHeadLeft" @click="goBack">
            <i class="icon-fanhui- iconfont"></i>&nbsp;
            <span>返回</span>
          </div>
          <div class="topHeadRight"></div>
        </div>
      </div>
      <div class="selectContainer">
        <template v-for="(val,i) in selectArr">
          <div class="item"	:key="i" :class="{itemActive:(trackIndex == i) ? true : false }"  @click="itemClick(i,val)">{{val.title}}</div>
        </template>
      </div>
    </div>
    <div class="bottomCon">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["tagsLists", "tagActive", "agreementTrackIndex"])
  },
  data() {
    return {
      selectArr: [],
      trackIndex: 0,
    };
  },
  mounted() {
    this.trackIndex = this.agreementTrackIndex;
    this.initGetInfo();
  },
  methods: {
    initGetInfo() {
      this.selectArr = [
        { title: "基本信息", index: "first" },
        { title: "房屋信息", index: "second" },
        { title: "收费项目", index: "third" },
        { title: "通告送达", index: "fourth" },
        { title: "房源管理", index: "fifth" },
        { title: "相关图片", index: "sixth" }
      ];
    },
    goBack(){        
        this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/agreementManage');   
    },
    itemClick(i, val) {
        function excution(index){
            this.trackIndex = index;
            this.StoreJs.set("agreementTrackIndex", index);
            this.$store.commit("setAgreementTrackIndex",index);
        };
        excution.bind(this)(i);
        let index = val.index; 
        let route = this.$route; 
        let path = route.path;                
        let theOne = this.StoreJs.get('tagsLists').find((ele,index)=>{
            return ele.path == path;
        });
        let query = theOne.query;   
          this.$nextTick(() => {
              if( index === this.selectArr[0].index ){
                 this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,'/main/agreementManage/detail',query); 
              }else{  
                  this.SimplifiedVerRouter.push(this.tagsLists,this.tagActive,`/main/agreementManage/detail/${index}`,query); 
              }          
          });
    }
  }
};
</script>
<style scoped lang="scss">
.agreementDetailContainer {
    box-sizing: border-box;
    padding: 24px;
    padding-bottom: 50px;
    .inner {
        background-color: #fff;
        border-radius: 10px;
        padding: 24px;
        height: 100px;
        margin-bottom: 26px;
        position: relative;
    }
  .bottomCon {
    background-color: #fff;
    border-radius: 10px;
    padding: 24px;
  }
  .top {
    .topHeader {
      height: 40px;
      margin-bottom: 24px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      .topHeadLeft {
        padding-left: 30px;
        padding-right: 30px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        background-color: #ffefef;
        color: $mainRed;
        text-align: center;
        cursor: pointer;
        span {
          vertical-align: 1px;
          font-size: 12px;
          font-weight: 600;
        }
      }
      .topHeadRight {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-content: center;
        align-items: center;
      }
    }
  }
  .selectContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    position: absolute;
    bottom: -2px;
    .item {
      width: 90px;
      margin-right: 20px;
      color: #a4aabc;
      font-size: 16px;
      cursor: pointer;
      padding-bottom: 20px;
      text-align: center;
      box-sizing: border-box;
      font-weight: 600;
    }
    .itemActive {
      color: #444;
      position: relative;
      &:after {
        content: "";
        background-color: $mainRed;
        height: 6px;
        width: 40px;
        position: absolute;
        bottom: -1px;
        left: 25px;
      }
    }
  }
}
</style>
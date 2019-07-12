import _ from 'lodash'
import $store from '@/store'
import $router from '@/router'
import StoreJs from '@/tools/cusStorejs'
import { getLodop,officalVersion } from '@/tools/lodop.js'; 	
let obj = {
    /**
    *路由推送整合
    *@function
    *@name push
    *@param { array }  tagsLists  存储在storage和vuex中路由标签列表的数组
    *@param { string } tagActive 存储在storage和vuex中路由标签激活索引
    *@param { string } path 推送路由的路径
    *@param { object } query 路由查询参数，默认空对象
    ***/
	push: (tagsLists,tagActive,path,query={})=>{
        let copy = _.cloneDeep(tagsLists); 
//        console.log('独立封装deep',copy);        
        copy[tagActive].path = path;
        copy[tagActive].query = query;
        StoreJs.set('tagsLists',copy);        
        $store.commit('modeifyTag',{
            normalIndex: tagActive,
            path:path,
            query:query 
        });
        $router.push({ path:path,query:query });
	},
    lodopVersionCheck:()=>{
        if( getLodop().VERSION ===  officalVersion() ){
            return true;
        }else{
            console.log('版本号不一致',`官方最新版本号为: ${officalVersion()}`,`本地版本号为:${getLodop().VERSION}`);
            return false;
        }
    },
};
export default {
  	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'SimplifiedVerRouter' , { value: obj });
	 }	
}
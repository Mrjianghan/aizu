	import Vue from 'vue'
	import App from './App.vue'
	import router from './router'
	import store from './store'
	import "@babel/polyfill";
	import ElementUI from 'element-ui';
	import 'element-ui/lib/theme-chalk/index.css';
	Vue.use(ElementUI);
	import Vuelidate from 'vuelidate'
	Vue.use(Vuelidate);	
	import Axios from '@/tools/axios'
	Vue.use(Axios);
    import ApiLists from '@/tools/apiLists'
	Vue.use(ApiLists);
    import _ from '@/tools/lodash'
	Vue.use(_);
    import Jwt from '@/tools/jsonWebToken'
	Vue.use(Jwt);
	import Err from '@/tools/error'
	Vue.use(Err);
	import Success from '@/tools/success'
	Vue.use(Success);
	import StoreMap from '@/tools/storeMap'
	Vue.use(StoreMap);
    import StateData from '@/tools/stateData'
	Vue.use(StateData);
	import StoreJs from '@/tools/storejs'
	Vue.use(StoreJs);
	import DayJs from '@/tools/day'
	Vue.use(DayJs);	
    import Digital from '@/tools/digital'
	Vue.use(Digital);
    import AES from '@/tools/crypto'
	Vue.use(AES);
    import SimplifiedVerRouter from '@/tools/routerPackage'
	Vue.use(SimplifiedVerRouter);
    import DatePick from '@/tools/datePick'
	Vue.use(DatePick);
    Vue.filter('formatMoneyValue', function (value) {   
        if( typeof value !== 'number' ){
           return '无';
        } 
        let fix = Math.round(+value + 'e' + 2) / Math.pow(10, 2);
        return fix.toLocaleString('zh-CN');
    });
    Vue.filter('formatMoneyValueWithMark', function (value) {   
        if( typeof value !== 'number' ){
           return '无';
        } 
        let fix = Math.round(+value + 'e' + 2) / Math.pow(10, 2);
        return fix.toLocaleString('zh-CN',{ style: 'currency', currency: 'CNY' });
    });
    Vue.filter('formatAreaValue', function (value,precision=1) {  
        if( typeof value !== 'number' ){
           return '无';
        }       
        if( typeof precision !== 'number' ){
           console.error(`过滤器formatAreaValue精度值参数precision必须是Boolean类型。当前设定值为${precision}`)
        }   
        let round = Math.round(+value + 'e' + precision) / Math.pow(10, precision);
        return `${round.toFixed(precision)}m²`;
    });
    Vue.filter('emptyProcessor', function (value) { 
        let isNull = (typeof (value) === 'object')&&(value === null);
        let isUndefined = typeof value === 'undefined';
        let empty = Boolean(!String(value).length);
        if( (isNull) || (isUndefined) || (empty) ){
            return '无';
        }else{
            return value;
        }
    });
	import Del from '@/cusCom/delComponent'
	Vue.component('Del',Del);
	import GreyBtn from '@/cusCom/greyBtn'
	Vue.component('GreyBtn',GreyBtn);
	import RedBtn from '@/cusCom/mainRedBtn'
	Vue.component('RedBtn',RedBtn);
    import clodopAlert from '@/cusCom/clodopAlert'
	Vue.component('ClodopAlert',clodopAlert);
	Vue.config.productionTip = false
	new Vue({
	  router,
	  store,
	  render: h => h(App)
	}).$mount('#app')
	// @ is an alias to /src
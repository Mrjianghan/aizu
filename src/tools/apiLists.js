import qs from 'qs';
const axios = require('axios');
//let reqHead = '/api';
let reqHead = '';
import storejs from './cusStorejs.js';
import { Message } from 'element-ui';
axios.defaults.baseURL = 'http://47.111.26.59:7778';
axios.defaults.timeout = 10000;
axios.interceptors.request.use(function (config) {   
    if( storejs.get('loadingString') ){
        config.headers.common['Authorization'] = `Bearer ${storejs.get('loadingString')}`;
    }    
    return config;
    },function(err){    
    return Promise.reject(err);
});
axios.interceptors.response.use(function(res){    
    return res;
    }, function (err) {
    Message({
        message: '网络异常，请联系技术部。',
		type: 'error'
    });
    return Promise.reject(err);
});
const req = {	
    '10000': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + `/code/${data}`,
            responseType: 'arraybuffer'
		})
	},	
    '10001':function( data ){
		return 	axios({
			method: 'post',
			url: reqHead + '/auth/erp/auth/login',		
			data:qs.stringify(data)
		})
	},	    
	'10002': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/user/erp/user/info',		
			params:data
		})
	},	
    '10003': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/user/erp/user/pageQueryUserList',		
			params:data
		})
	},	
    '10004': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/repairList/pageQueryRepairList',		
			params:data
		})
	},
    '10005': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/repairList/detail',		
			params:data
		})
	},
    '10006': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/deliveryList/pageQueryDeliveryLis',		
			params:data
		})
	},
    '10007': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/community/communityList',		
			params:data
		})
	},
    '10008':function( data ){
		return 	axios({
			method: 'post',
			url: reqHead + '/house/erp/repairList/delete',		
			data:qs.stringify(data)
		})
	},	
    '10009': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/houseresource/houseList',		
			params:data
		})
	},
    '10010': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/houseresource/houseManageList',		
			params:data
		})
	},
    '10011': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/breach/pageQueryRentBreachList',		
			params:data
		})
	},
    '10012': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/deliveryList/detail',		
			params:data
		})
	},
    '10013': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/deliveryList/queryDeployByContractId',		
			params:data
		})
	},
    '10014': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/repairList/operatorList',		
			params:data
		})
	},
    '10015': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/contract/pageQueryContractList',		
			params:data
		})
	},   
    '10016': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/third/upload/uploadByBucketName',		
			data:qs.stringify(data),            
		})
	},  
    '10017': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/third/upload/save',		
			data:qs.stringify(data)
		})
	},  
    '10018': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/third/upload/remove',		
			data:qs.stringify(data)
		})
	},    
    '10019': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/house/erp/breach/audit',		
			data:qs.stringify(data)
		})
	}, 
    '10020': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/house/erp/breach/banjie',		
			data:qs.stringify(data)
		})
	}, 
    '10021': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/house/erp/breach/createBreach',		
			data:qs.stringify(data)
		})
	}, 
    '10022': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/house/erp/breach/feeSettlement',		
			data:qs.stringify(data)
		})
	}, 
    '10023': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/breach/breachDetail',		
			params:data
		})
	}, 
    '10024': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/house/erp/breach/createBreach',		
			data:qs.stringify(data)
		})
	}, 
    '10025': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/deliveryItem/detail',		
			params:data
		})
	},     
    '10026': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/house/erp/breach/breachRollBack',		
			data:qs.stringify(data)
		})
	}, 
    '10027': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/house/erp/breach/chargeEdit',		
			data:qs.stringify(data)
		})
	},     
    '10028': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/contract/getContractInfo',		
			params:data
		})
	},  
    '10029': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/breach/getBreachContractInfo',		
			params:data
		})
	},  
    '10030': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/user/erp/user/getRoleUserList',		
			params:data
		})
	},  
    '10031': function( data ){		
		return 	axios({
			method: 'post',
			url: reqHead + '/third/upload/queryListByIdAndType',		
			data:qs.stringify(data)
		})
	},  
    '10032': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/houseresource/detail',		
			params:data
		})
	},  
    '10033': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/houseresource/detail',		
			params:data
		})
	},     
    '10034': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/ownership/detail',		
			params:data
		})
	},  
    '10035': function( data ){		
		return 	axios({
			method: 'get',
			url: reqHead + '/house/erp/charges/detail',		
			params:data
		})
	},  
    
    
}
export default {
	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'ApiLists' , { value: req });
	 }	
};
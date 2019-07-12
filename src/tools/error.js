import { Message } from 'element-ui';
let obj = {
	netErr:()=>{
	  	Message({
			message: '网络异常，请联系技术部。',
			type: 'error'
	  });
  	},
    tokenErr:()=>{
	  	Message({
			message: '请重新登录。',
			type: 'error'
	  });
  	}
};
export default {
	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'Err' , { value: obj });
	 }	
}
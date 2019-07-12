import { Message } from 'element-ui';
let obj = {
	saveSuccess: ()=>{
		Message({
			message: '保存成功。',
			type: 'success'
		});
	},
	deleteSuccess: ()=>{
		Message({
			message: '删除成功。',
			type: 'success'
		});
	},
	normalSuccess:()=>{
		Message({
			message: '变更成功。',
			type: 'success'
		});
	},
	success:()=>{
		Message({
			message: '成功。',
			type: 'success'
		});
	}
};
export default {
  	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'Success' , { value: obj });
	 }	
}
import store from './cusStorejs.js';
export default {
	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'StoreJs' , { value: store });
	 }	
}
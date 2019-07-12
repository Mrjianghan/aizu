import jwt from 'jsonwebtoken';
export default {
	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'Jwt' , { value: jwt });
	 }	
}
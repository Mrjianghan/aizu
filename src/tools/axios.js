import instance from 'axios';
//import storejs from './cusStorejs.js';
//instance.defaults.baseURL = 'http://47.111.26.59:7778';
instance.defaults.timeout = 6000;
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//instance.interceptors.request.use(function (config) {    
//    return config;
//    },function(err){
//    return Promise.reject(err);
//});
//instance.interceptors.response.use(function(res){    
//    return res;
//    }, function (err) {
//    return Promise.reject(err);
//})
export default {
	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'Axios' , { value: instance });
	 }
}

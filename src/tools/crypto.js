import CryptoJS from 'crypto-js';
let obj = {
    encrypt:function(obj){
        return CryptoJS.AES.encrypt(JSON.stringify(obj),'HUJIE').toString();  
    },
    decrypt:function(str){
        let bytes  = CryptoJS.AES.decrypt(str,'HUJIE');
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    },
};
export default {
	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'AES' , { value: obj });
	 }	
}
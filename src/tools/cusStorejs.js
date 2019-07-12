export default {
	get:function(key){
		return JSON.parse( window.sessionStorage.getItem( key ) );
	},
	set:function(key,val){
		window.sessionStorage.setItem(key, JSON.stringify(val) );
	},
	remove:function(key){
		window.sessionStorage.removeItem(key);
	},
	clearAll:function(){
		window.sessionStorage.clear();
	}
}
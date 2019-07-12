import day from 'dayjs';
export default {
	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'DayJs' , { value: day });
	 }	
}
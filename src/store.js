import Vue from 'vue'
import Vuex from 'vuex'
import storejs from './tools/cusStorejs.js'
Vue.use(Vuex)
export default new Vuex.Store({
	  state: {
		  Collapse: storejs.get('Collapse') ? storejs.get('Collapse') : false,
		  tagsLists:storejs.get('tagsLists') ? storejs.get('tagsLists') : [],
		  tagArrowShow:storejs.get('tagArrowShow') ? storejs.get('tagArrowShow'):false,
		  tagActive:storejs.get('tagActive') ? storejs.get('tagActive'):0,
		  activeIndex:storejs.get('activeIndex') ? storejs.get('activeIndex'):'1',
		  tagConWidth: storejs.get('tagConWidth') ? storejs.get('tagConWidth'):0,
		  tagInsideWidth: storejs.get('tagInsideWidth') ? storejs.get('tagInsideWidth'):0,
		  agreementTrackIndex:storejs.get('agreementTrackIndex') ? storejs.get('agreementTrackIndex') : 0,
		  storeLeft:0,
		  copyLeft:0,
		  tagAniOn:false,
          agreementInitShow:true,
	  },
	  getters: {
          agreementInitShow:state=>{
              return state.agreementInitShow;
          },
		  tagAniOn:state=>{
			  return state.tagAniOn;
		  },
		  copyLeft:state=>{
			return state.copyLeft;
		  },
		  storeLeft:state=>{
			  return state.storeLeft;
		  },
		  agreementTrackIndex:state=>{
			  return state.agreementTrackIndex;
		  },
		  tagInsideWidth: state => {
			  return state.tagInsideWidth;
		  },
		  tagConWidth: state => {
			  return state.tagConWidth;
		  },
		  Collapse: state => {
			  return state.Collapse;
		  },
		  tagsLists:state =>{
			  return state.tagsLists;
		  },
		  tagArrowShow:state=>{
			  return state.tagArrowShow;
		  },
		  tagActive:state=>{
			  return state.tagActive;
		  },
		  activeIndex:state=>{
			  return state.activeIndex;
		  },
	  },
	  mutations: {	
          setAgreementInitShow(state,payLoad){
              state.agreementInitShow = payLoad;
          },
		  setTagAniOn(state,payLoad){
			  state.tagAniOn = payLoad;
		  },
		  setCopyLeft(state,payLoad){
			state.copyLeft = payLoad;
		  },
		  setStoreLeft(state,payLoad){
			  state.storeLeft = payLoad;
		  },
		  initState(state){
			state.Collapse = false;
			state.tagsLists = [];
			state.tagArrowShow = false;
			state.tagActive = 0;
			state.activeIndex = '1';
			state.tagConWidth = '';
			state.tagInsideWidth = ''; 
			state.agreementTrackIndex = 0;
		  },
		  setAgreementTrackIndex(state,payLoad){
			  state.agreementTrackIndex = payLoad;
		  },
		  setTagInsideWidth(state,payLoad){
			  state.tagInsideWidth = payLoad;
		  },
		  setTagConWidth(state,payLoad){
			  state.tagConWidth = payLoad;
		  },
		  changeCollapse(state,payLoad){
			  state.Collapse = payLoad;
		  },
		  resetTag(state){
			  state.tagsLists = [];
		  },
          addTag(state,payLoad){
			  state.tagsLists.push(payLoad);
		  },
		  deleteTag(state,payLoad){
			  state.tagsLists.splice(payLoad,1);
		  },
		  modeifyTag(state,payLoad){
			  state.tagsLists[payLoad.normalIndex].path = payLoad.path;
			  state.tagsLists[payLoad.normalIndex].query = payLoad.query;
		  },
		  changeTagShow(state,payLoad){
			  state.tagArrowShow = payLoad;
		  },
		  changeTagActive(state,payLoad){
			  state.tagActive = payLoad;
		  },
		  changeActiveIndex(state,payLoad){
			  state.activeIndex = payLoad;
		  },
	  },
	  actions: {
	  }
})

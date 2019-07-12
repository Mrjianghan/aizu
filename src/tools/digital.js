let obj = {
    /** 
    消除js自身四舍五入的Bug。
    *@function
    *@name roundValue
    *@param { number } number  需要计算的数值
    *@param { number } precision 精准度，小数点之后的位数
    */
    roundValue : (number, precision) => {
        return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
    }, 
    /** 
    格式化金额输入，用于input的change事件。
    *@function
    *@name formatPrice
    *@param { itemString } string  需要计算的状态名称
    */
    formatPrice: function (itemString){        
        let detector = itemString.split('.');
        let length = detector.length;
        let parseResult = '';
        let nanOrNot = '';     
        switch(length){
            case 1:
            parseResult = parseFloat(this[itemString]);
            nanOrNot = Number.isNaN(parseResult);   
            if( nanOrNot ){
               this[itemString] = '';
            }else{
               this[itemString] = this.Digital.roundValue(parseResult,2);
            }   
            break;
            case 2:
            parseResult = parseFloat(this[detector[0]][detector[1]]);
            nanOrNot = Number.isNaN(parseResult);   
            if( nanOrNot ){
               this[detector[0]][detector[1]] = '';
            }else{
               this[detector[0]][detector[1]] = this.Digital.roundValue(parseResult,2);
            }   
            break;
        };
    },
    /** 
    正则匹配检查合同号是否合法，不合法则清空。
    *@function
    *@name formatAgreementNo
    *@param { agreementNo } string  输入的合同号
    */
    formatAgreementNo(agreementNo){
        let exp = /^[a-zA-Z0-9]*$/g;
        let testBoolean = exp.test(agreementNo);
        if( testBoolean ){
           return agreementNo;
        }else{
           return '';
        }
    },
    /** 
    正则匹配检查手机号是否合法，不合法则清空。
    *@function
    *@name formatPhone
    *@param { phone } string  输入的手机号
    */
    formatPhone(phone){
        let exp = /^1\d{10}$/g;
        let testBoolean = exp.test(phone);
        if( testBoolean ){
           return phone;
        }else{
           return '';
        }
    },
     /** 
    批量处理表单验证。
    *@function
    *@name shorterValidate
    *@param { form } string  等待验证的表单名称
    */
    shorterValidate(form){   
        let boolean;  
        this.$refs[form].validate(res=>{
            boolean = res;
        });
        return boolean;
    },
    /** 
    用于element-ui表格宽度设置。消除视口调整大小时表格宽度不能变化的bug。
    *@function
    *@name tableWidthController
    *@param { number } number  设置数字值，范围以300为基准进行调整
    *@param { string } componentState Vue组件内Element-ui的表格宽度状态名称
    */
    tableWidthController : function(number,componentState){
        let type = typeof number;
        let isNumber = (( type==='number' )||( type==='string' ))&&( isFinite(number) ) ;
        let isString = typeof componentState === 'string';
        if( arguments.length<2 ){
            throw new Error(`this function requires two arguments,current count ${ arguments.length }`);
        }else{
            if( !isNumber ){
               throw new Error(`the first argument must be a number type,got ${type}`);
            }
            if( !isString ){
               throw new Error(`the second argument must be a number type,got ${typeof componentState}`);
            }
            if( isNumber&&isString ){
                let generateArr = Object.keys( this._data );
                let existState = generateArr.includes(componentState);
                let excution = ()=>{
                    let app = document.querySelector('#app');
                    this[componentState] = ( app.offsetWidth   -   +(number) ) + 'px'; 
                };
                if( existState ){
                    excution();
                    window.addEventListener('resize',()=>{
                        excution();
                    });
                }else{
                   throw new Error( `make sure your argument exists in your component` );
                }                
            }            
        }
    },
    /**
    动态设置element 表格的高度
    *@function
    *@name setTableHeight
    *@param { string } heightState  组件内表格高度的状态名称
    *@param { number } newValue 给定的高度指
    **/
    setTableHeight : function(heightState,newValue){
        if( arguments.length < 2 ){
           throw new Error(`this function requires two arguments,current count ${ arguments.length }`);
        }
        if( typeof heightState !== 'string' ){
            throw new Error(`the first argument must be a number type,got ${ typeof heightState }`);
        }
        if( typeof newValue !== 'number' ){
            throw new Error(`the second argument must be a number type,got ${typeof newValue}`);
        }      
        this[heightState] = newValue;
    },
    getParams : function(){
        let getArr=[];    
        this.storeArr.forEach((ele,index)=>{
            this.searchMaster[ele] = this.StoreJs.get(  this.storeMap[ele] ) ? this.StoreJs.get(  this.storeMap[ele] ) : '';
            if(this.searchMaster[ele]){
				let obj = {};
				obj.index=index;
				obj.text = ele;
				getArr.push(obj);
			}
        });
        let data = {};
        getArr.forEach((ele)=>{
            if(ele){  
                data[this.storeArrMatchParam[ele.index]] = this.searchMaster[ele.text]; 
            }
        })
        return data;
    },
    setTimersParams : function(data){
        let datePickerLength = document.querySelector(`.${ this.$el.classList[0] }`).querySelectorAll('.timerCon').length;
        let timersArr = this.storeArrMatchParam.slice(0,datePickerLength);
        timersArr.forEach((ele)=>{            
            if(data[ele]){
                data[this.timeParams[ele][0]] = data[ele][0];
				data[this.timeParams[ele][1]] = data[ele][1];
				delete data[ele];
            }
        });
        return data;
    },
    reset : function(){
        this.storeArr.forEach((ele)=>{
			this.searchMaster[ele] = '';
        });	
        this.StoreMap[this.$route.path].forEach((ele)=>{
			this.StoreJs.remove(ele);
        });	
    },
    aesDecrypt:function(){
        let route = this.$route; 
        let path = route.path;                
        let theOne = this.StoreJs.get('tagsLists').find((ele,index)=>{
            return ele.path == path;
        });
        let query = theOne.query;  
        this.routeQuery = this.AES.decrypt(query.AES);
    },
    repackLeftRoll:function(){
        if(this.leftUnable){
        }else{
            let minus = this.picIndex-1;
            this.currentSrc = this[this.lockImgArrName][minus].url; 
            this.picIndex = minus;
            this.rightArrowSrc = require('../../public/imgs/leftAble.png');
            this.rightUnable = false;
            if(this.picIndex){
            }else{
                this.leftArrowSrc = require('../../public/imgs/leftUnable.png');
                this.leftUnable = true;
            }
        }	
    },
    repackRightRoll:function(){
        if(this.rightUnable){
        }else{
            let plus = this.picIndex+1;      
            this.currentSrc = this[this.lockImgArrName][plus].url; 
            this.picIndex = plus;
            this.leftArrowSrc = require('../../public/imgs/leftAble.png');
            this.leftUnable = false;
            if(this.picIndex === (this[this.lockImgArrName].length - 1) ){
                this.rightArrowSrc = require('../../public/imgs/leftUnable.png');
                this.rightUnable = true;
            }
        }
    },
    repackPicThisPic:function(i){
        this.imgPreviewShow = true;
        this.picIndex = i;
        this.leftArrowSrc = require('../../public/imgs/leftAble.png');
        this.rightArrowSrc = require('../../public/imgs/leftAble.png');
        this.leftUnable = false;
        this.rightUnable = false;
        this.currentSrc = this[this.lockImgArrName][i].url;
        let imgLength = this[this.lockImgArrName].length;		
        if(i){
            if(  i ===  (imgLength-1) ){
                this.rightArrowSrc = require('../../public/imgs/leftUnable.png');
                this.rightUnable = true;
            }
        }else{
            this.leftArrowSrc = require('../../public/imgs/leftUnable.png');
            this.leftUnable = true;
            if(imgLength === 1){
                this.rightArrowSrc = require('../../public/imgs/leftUnable.png');
                this.rightUnable = true;
            }
        }  
    },    
}
export default {
  	install: function(Vue) {
	   Object.defineProperty(Vue.prototype, 'Digital' , { value: obj });
	 }	
}
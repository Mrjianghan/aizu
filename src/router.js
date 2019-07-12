import Vue from 'vue'
import Router from 'vue-router'
const baseSrc = './components/base/';
const financeSrc = './components/finance/';
const agreementSrc =  './components/agreement/';
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      component: () =>import('./views/login.vue'),
        meta:{ title:'登录' },
    },		
    {
      path: '/main',   
      component:() =>import('./views/main.vue'),  
      children:[
            {
                path:'',
                component:() => import('./components/home.vue'),     
                meta:{ title:'首页' },
            },
	  		{
                path:'houseManage',
                component:() => import(baseSrc+'houseSourceManage/houseManageCon.vue'), 
				children:[
					{
						path:'',
						component:() => import(baseSrc+'houseSourceManage/houseManage.vue'),   
                        meta:{ title:'房源管理' },
					},
					{
						path:'detail',
						component:() => import(baseSrc+'houseSourceManage/houseManageDetail.vue'),
                        meta:{ title:'房源管理详情' },
					},
				]
            },
			{
                path:'houseResourceList',
                component:() => import(baseSrc+'houseResourceList.vue'), 
                meta:{ title:'房源列表' },
            },
            {
                path:'rentRate',
                component:() => import(baseSrc+'rentRate.vue'), 
                meta:{ title:'小区出租率' },
            },
	  		{
                path:'housePreOrder',
                component:() => import(baseSrc+'housePreOrder.vue'), 
                meta:{ title:'房源预定' },
            },
	  		{
                path:'userManage',
                component:() => import(baseSrc+'userManage.vue'), 
                meta:{ title:'用户管理' },
            },
	  		{
                path:'excelDownload',
                component:() => import(baseSrc+'excelDownload.vue'), 
                meta:{ title:'表格下载' },
            },
	  		{
                path:'entrustManage',
                component:() => import(baseSrc+'entrustManage.vue'), 
                meta:{ title:'委托管理' },
            },
	  		{
                path:'communityManage',
                component:() => import(baseSrc+'communityManage.vue'), 
                meta:{ title:'小区管理' },
            },
			{
                path:'reminderList',
                component:() => import(baseSrc+'reminderList.vue'), 
                meta:{ title:'应收催款列表' },
            },	
			{
                path:'dailyPayment',
                component:() => import(baseSrc+'dailyPayment.vue'), 
                meta:{ title:'生活缴费列表' },
            },					  
	  		{
                path:'repairOrderManage',
                component:() => import(baseSrc+'repairOrder/repairOrderCon.vue'), 
				children:[
					{
						path:'',
						component:() => import(baseSrc+'repairOrder/repairOrder.vue'),   
                        meta:{ title:'维修单管理' },
					},
					{
						path:'detail',
						component:() => import(baseSrc+'repairOrder/repairOrderDetail.vue'),  
                        meta:{ title:'维修单管理详情' },
					},
				]
            },
	  		{
                path:'deliveryOrderManage',
                component:() => import(baseSrc+'deliveryOrder/deliveryOrderCon.vue'), 
				children:[
					{
						path:'',
						component:() => import(baseSrc+'deliveryOrder/deliveryOrder.vue'), 
                        meta:{ title:'配送单管理' },
					},
					{
						path:'detail',
						component:() => import(baseSrc+'deliveryOrder/deliveryOrderDetail.vue'),    
                        meta:{ title:'配送单管理详情' },
					},
					{
						path:'new',
						component:() => import(baseSrc+'deliveryOrder/newDeliveryOrder.vue'),     
                        meta:{ title:'新建配送单' },
					},
				]
            },					
			{
                path:'earlyWithdrawal',
                component:() => import(financeSrc+'earlyWithdrawal/earlyWithdrawalCon.vue'), 
				children:[
					{
						path:'',
						component:() => import(financeSrc+'earlyWithdrawal/earlyWithdrawal.vue'),   
                        meta:{ title:'提前支取' },
					},
					{
						path:'detail',
						component:() => import(financeSrc+'earlyWithdrawal/earlyWithdrawalDetail.vue'), 
                        meta:{ title:'提前支取详情' },
					},
				]
            },
			{
                path:'shoppingList',
                component:() => import(financeSrc+'shoppingList/shoppingListCon.vue'), 
				children:[
					{
						path:'',
						component:() => import(financeSrc+'shoppingList/shoppingList.vue'),   
                        meta:{ title:'采购计划单' },
					},
					{
						path:'detail',
						component:() => import(financeSrc+'shoppingList/shoppingListDetail.vue'),    
                        meta:{ title:'采购计划单详情' },
					},
				]
            },
			{
                path:'defaultBillRemittance',
                component:() => import(financeSrc+'defaultBillRemittance.vue'), 
                meta:{ title:'违约单打款' },
            },
            {
                path:'defaultBillCertificate',
                component:() => import(financeSrc+'defaultBillCertificate.vue'), 
                meta:{ title:'违约单记账凭证' },    
            },
	  		{
                path:'houseOwnerBill',
                component:() => import(financeSrc+'houseOwnerBill.vue'), 
                meta:{ title:'房东账单' },    
            },
	  		{
                path:'offlineBill',
                component:() => import(financeSrc+'offlineBill.vue'), 
                meta:{ title:'线下账单' }, 
            },
			{
                path:'billPlan',
                component:() => import(financeSrc+'billPlan/billPlanCon.vue'), 
				children:[
					{
						path:'',
						component:() => import(financeSrc+'billPlan/billPlan.vue'),   
                        meta:{ title:'账单计划' }, 
					},
					{
						path:'detail',
						component:() => import(financeSrc+'billPlan/billPlanDetail.vue'), 
                        meta:{ title:'账单计划详情' }, 
					},
				]
            },
			{
                path:'deductionBill',
                component:() => import(financeSrc+'deductionBill.vue'), 
                meta:{ title:'抵扣账单' }, 
            },
			{
                path:'renterBill',
                component:() => import(financeSrc+'renterBill.vue'), 
                meta:{ title:'租客账单' }, 
            },
			{
                path:'receiptsManage',
                component:() => import(financeSrc+'receiptsManage.vue'), 
                meta:{ title:'收据管理' }, 
            },
            {
                path:'receiptsSummary',
                component:() => import(financeSrc+'receiptsSummary.vue'),
                meta:{ title:'收据汇总' }, 
            },
			{
                path:'agreementManage',
                component:() => import(agreementSrc+'agreementManage/agreementCon.vue'), 
				children:[
					{
						path:'',
						component:() => import(agreementSrc+'agreementManage/agreement.vue'), 
                        meta:{ title:'合同管理' }, 
					},
					{
						path:'detail',
						component:() => import(agreementSrc+'agreementManage/agreementDetail.vue'),     
						children:[
							{
								path:'',
								component:() => import(agreementSrc+'agreementManage/firstPart.vue'),   
                                meta:{ title:'合同基本信息' }, 
							},
							{
								path:'second',
								component:() => import(agreementSrc+'agreementManage/secondPart.vue'),   
                                meta:{ title:'合同房屋信息' }, 
							},
							{
								path:'third',
								component:() => import(agreementSrc+'agreementManage/thirdPart.vue'),   
                                meta:{ title:'合同收费项目' }, 
							},
							{
								path:'fourth',
								component:() => import(agreementSrc+'agreementManage/fourthPart.vue'),   
                                meta:{ title:'合同通告送达' }, 
							},
							{
								path:'fifth',
								component:() => import(agreementSrc+'agreementManage/fifthPart.vue'),   
                                meta:{ title:'合同房源管理' }, 
							},
							{
								path:'sixth',
								component:() => import(agreementSrc+'agreementManage/sixthPart.vue'),   
                                meta:{ title:'合同相关图片' }, 
							},
						]
					},
				]
            },
            {
                path:'illegalProcess',
                component:() => import(agreementSrc+'illegalProcess/illegalProcessCon.vue'), 
				children:[
					{
						path:'',
						component:() => import(agreementSrc+'illegalProcess/illegalProcess.vue'), 
                        meta:{ title:'违约流程' }, 
					},
					{
						path:'detail',
						component:() => import(agreementSrc+'illegalProcess/illegalProcessDetail.vue'),   
                        meta:{ title:'违约流程详情' }, 
					},
				]
            }, 		
        ]        
    },	
	{
      path: "*", 
	  redirect:'/main'        
    },
  ]
})
router.beforeEach((to, from, next) => {
    if( to.meta.title ){
        document.title = `爱租网-${to.meta.title}`;
    }else{
        document.title = `爱租网`;
    }
	next();
})
export default router;
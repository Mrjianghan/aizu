const  CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
//    baseUrl:'',
	filenameHashing:true,
    productionSourceMap:false, 
	css: {
		loaderOptions: {
		  sass: {
			data: `@import '@/global.scss';`
		  }
		}
	  },	
     devServer: {
		 open: true,
         proxy:{
             '/api':{
                 target: 'http://47.111.26.59:7778',
                 changeOrigin: true,
                 pathRewrite: {
                        '^/api' : '',
                 }
             },
         }  
     },
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
		  // 为生产环境修改配置...
			return {				
//				plugins: [
//				  new CompressionWebpackPlugin({
//					  deleteOriginalAssets: true,
//					  threshold: 81920,
//					  test:/\.js$|\.html$|\.css/,
//					  algorithm: 'gzip',
//				  })
//				]				
			}	
		} else {
		  // 为开发环境修改配置...
			
		}
	  }
}
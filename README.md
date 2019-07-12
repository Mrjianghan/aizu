# aizu

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



# 文件目录

## 文件结构基于vue2.6官方结构。

### public 文件夹



#### public/imgs 此目录下文件，经过打包后一部分会转为base64，生成新文件夹img,上线时保留img下图片，移除imgs下文件。

#### clodop为批量打印依赖工具安装包，需要减小前端文件体积时，请部署该文件到服务端，并修改页面内引用路径代码。

#### animate.css请自行选择是否使用、保留。

#### md.pdf 为pdf测试文件，请自行调试删除。

#### print.js print.css 为依赖文件，不建议删除。

#### stamp为调试文件，请自行删除。



### src 文件夹

#### cusCom 为自定义封装复用组件

#### store.js Vuex

#### router.js Vue-Router

#### main.js 自行查询全局过滤器，以及全局插件

#### global.scss 全局样式

### src/tools 文件夹

#### src/tools/apiLists 请求接口封装，打包时请注意内部变量reqHead和baseURL的调整。

#### src/tools/crypto  AES加密封装

#### src/tools/cusStorejs  sessionStorage封装

#### src/tools/datePick Element时间选择参数封装

#### src/tools/digital 部分函数封装

#### src/tools/stateData 公共数据封装

#### src/tools/storeMap 路由对应sessionStorage条目封装
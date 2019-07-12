<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">	
* {
    margin: 0;
    padding: 0;
}
::selection {
	background:#9b52bf; 
	color:#fff;
}
::-moz-selection {
	background:#9b52bf; 
	color:#fff;
}
::-webkit-selection {
	background:#9b52bf; 
	color:#fff;
}
::-webkit-scrollbar-track-piece {
	background-color: rgba(1,1,1,0); 
}
 ::-webkit-scrollbar {
	width: 10px;
	height: 10px;
	background-color: rgba(1,1,1,0); 
}
::-webkit-scrollbar-thumb { 
	border-radius: 7px;
	background-color: rgba(247,153,153,0.3);
}
html,body {
	height: 100%;
	width: 100%;
    font-family: PingFang SC,Microsoft YaHei,BlinkMacSystemFont,Helvetica Neue,Hiragino Sans GB, 'Avenir',  Arial, sans-serif;
/*    font-family: 'Open Sans', sans-serif;*/
       -webkit-font-smoothing: antialiased;
       -moz-osx-font-smoothing: grayscale;
}
#app {   
    height: 100%;
    width: 100%;
	min-width: 1300px;
}
</style>
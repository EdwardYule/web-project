<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family:'Microsoft YaHei';
}
#app{
  background: #f5f5f5;
}
body{
  overflow-y: auto !important;
  padding-right: 0 !important;
  overflow-x: hidden;
}
@media screen and (max-width:768px){
  #app{
    background: #fff; 
  }
}
</style>

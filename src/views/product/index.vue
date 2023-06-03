<template>
  <div class='product'>
    <BreadCrumb></BreadCrumb>
    <div class='content'>
      <div class='content-title'>产品知识</div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/layout/breadCrumb.vue'
export default {
  components:{
    BreadCrumb
  }
}
</script>
<style lang='less' scoped>
@theme-gray-color:rgba(38,38,38,0.8);
.product{
   max-width: 1200px;
    width: 80%;
    margin: 0 auto;
    padding: 64px 0 20px;
    min-height: calc(100vh - 160px);
    .content{
      background: #fff;
      padding: 20px;
      min-height:calc(100vh - 298px); 
      .content-title{
        font-size: 24px;
        text-align: center;
        color:rgb(38,38,38);
        position: relative;
      }
      .content-title::after{
        position: absolute;
        left: 50%;
        bottom: -15px;
        width: 20px;
        height: 2px;
        margin-left: -10px;
        background:#7d7d7d;
        content: "";
        border-radius: 2px;
      }
    }
}
@media screen and (max-width:1200px){
  .product {
    width:90%;
  }
}
@media screen and (max-width:1024px){
  .product {
    min-height: calc(100vh - 100px);
         .content .content-title{
          font-size: 20px;
        }
    }
}
@media screen and (max-width:768px){
  .product {
    width: calc(100% - 20px);
    min-height: calc(100vh - 56px);
  }
}
</style>
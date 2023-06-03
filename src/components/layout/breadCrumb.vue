<template>
  <div class='bread'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for='(item,index) in breadList' :key='index'
        :to="{ path: item.path }"
        >
          {{item.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data(){
    return{
      breadList:[]
    }
  },
   beforeMount () {
      this.init(this.$route.matched)
    },
   watch: {
      "$route": function (e) {
        const tabList = e.matched
        this.init(tabList)
      }
    },
    methods: {
      init(tabList){
         this.breadList = []
          tabList.map((item,idx)=>{
            if(idx>0){
                this.breadList.push({
                path: item.path,
                title: item.meta.title
              })
            }
          })
      }
    },
}
</script>

<style lang='less' scoped>
@theme-gray-color:rgba(38,38,38,0.8);
.bread{
       margin: 20px 0;
      /deep/.el-breadcrumb__inner{
          color:@theme-gray-color;
      }
    }
@media screen and (max-width:768px){
  .bread{
    margin: 10px 0;
    font-size: 14px;
  }
}
</style>
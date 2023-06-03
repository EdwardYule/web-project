<template>
  <div class='searh-box'>
    <BreadCrumb></BreadCrumb>
    <div class='content' v-loading="loading">
      <div class='content-title'>搜索:<span class='hasmaringLeft'>{{searchVal}}</span></div>
      <div v-if="listArr.length">
        <listItem v-for='(item,index) in listArr' :key='index' :itemData='item'></listItem>
        <div class='load-more-wrap'>已经到底啦</div>
      </div>
      <NoData v-else></NoData>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/layout/breadCrumb.vue'
import listItem from '@/components/listItem/list.vue'
import NoData from '@/components/empty/nodata'
export default {
  components:{
    BreadCrumb,
    NoData,
    listItem
  },
  data(){
    return{
      searchVal:'',
      page: 1,
      pageSize: 10,
      totalPages: 0,
      flag: true,
      loading: false,
      listArr: []
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    '$route':'getSerchList'
  },
  mounted(){
    this.getSerchList()
    window.addEventListener('scroll', this.loadMore) // 监听页面滚动
  },
  beforeDestroy () {
     window.removeEventListener('scroll', this.loadMore)
  },
  methods: {
    // 获取搜索的列表
    async getSerchList(type) {
      if(type){
        this.page = 1
      }
      this.searchVal = this.$route.query.val
      this.flag = true
      this.loading = true
      let obj = {
        page: this.page,
        pageSize: this.pageSize,
        searchWord: this.searchVal
      }
      let res = await this.$api.article.getArticleList(obj)
      
      if(type){
        this.listArr = res.object.result
      } else {
        this.listArr = this.listArr.concat(res.object.result)
      }
      this.totalPages = res.object.pages
      this.loading = false
    },
    // 加载更多
    loadMore() {
      const clientHei = document.documentElement.clientHeight || document.body.clientHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

      if (parseInt(scrollHeight - clientHei  - scrollTop) <= 500 && this.flag && this.page<this.totalPages) {
       this.flag = false
       setTimeout(() => {
          this.page++
          this.getSerchList(false);
        }, 200);
      }
    },
  }
}
</script>
<style lang='less' scoped>
@theme-gray-color:rgba(38,38,38,0.8);
.searh-box{
   max-width: 1200px;
    width: 80%;
    margin: 0 auto;
    padding: 64px 0 20px;
    .content{
      background: #fff;
      min-height:calc(100vh - 298px); 
      .content-title{
        padding-bottom:20px;
        font-size: 20px;
        padding: 20px;
        color:rgb(38,38,38)
      }
      .hasmaringLeft{
        margin-left: 10px;
      }
    } 
    .load-more-wrap{
      text-align: center;
      font-size: 13px;
      color: rgba(38, 38, 38, 0.8);
      position: relative;
      z-index: 1;
      padding: 30px 0;
    }
    .load-more-wrap::before {
        position: absolute;
        top: 50%;
        left: calc(50% - 60px);
        width: 16px;
        height: 1px;
        content: "";
        background: rgba(38, 38, 38, 0.7);
    }
    .load-more-wrap::after {
        position: absolute;
        top: 50%;
        right: calc(50% - 60px);
        width: 16px;
        height: 1px;
        content: "";
        background: rgba(38, 38, 38, 0.7);
    }
}
@media screen and (max-width:1200px){
  .searh-box {
    width:90%;
    .content .content-title{
      padding:15px 20px;
    }
  }
}
@media screen and (max-width:768px){
  .searh-box {
    width: 100%;
    .bread{
      margin: 10px;
    }
    .content .content-title{
      padding:10px;
      font-size: 17px;
    }
  }
}
</style>
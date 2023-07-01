<template>
  <div class='home'>
    <div class='wrap'>
      <div class='wrap-banner' v-loading="loading1">
        <div class='banner-left'>
           <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in bannerList" :key="item.articleId">
                <div class='banner-wrap' @click="gotoPage(item.articleId)">
                  <img :src='item.articleThumbImg'/>
                  <div class='banner-left-p'>{{item.articleTitle}}</div>
                </div>
              </el-carousel-item>
            </el-carousel>
        </div>
        <!-- <div  class='banner-right'>
            <div class='sub-foot-item sub_wid1'>
              <a>
                <img src='@/assets/intro.jpg'/>
                <p class='banner-right-p'>关于我们</p>
              </a>
            </div>
            <div class='sub-foot-item sub_wid1'>
              <a>
                <img src='@/assets/intro.jpg'/>
                <p class='banner-right-p'>联系我们</p>
              </a>
            </div>
        </div> -->
      </div>

        <!-- 专题start -->
        <!-- <div class='sub-intro'>
          <div class='sub-intro-head'>
            <span class='sub-intro-title'>专题介绍 </span>
            <a class='sub-intro-all' href='#'>全部专题 </a>
          </div>
          <div class='sub-intro-foot'>
            <div v-for='(item,index) in selectTitle' :key='index' class='sub-foot-item sub_wid4'>
              <a>
                <img :src='item.articleTypeImg'/>
                <p>{{item.articleTypeName}}</p>
              </a>
            </div>
          </div>
        </div> -->
        <!-- 专题end -->

        <div class='main-list' v-loading="loading2">
          <el-tabs v-model="activeName"  @tab-click='tabArticle'>
            <el-tab-pane v-for='(item,index) in selectType' 
                :key='item.articleTypeId'
                :label="item.articleTypeName" :name="`tab${index}`">
                <div v-if="listBox.length">
                  <listItem v-for='(item,index) in listBox' :key='index' :itemData='item'></listItem>
                  <div class='load-more-wrap'>已经到底啦</div>
                </div>
                <NoData v-else></NoData>

            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
  </div>
</template>

<script>
import listItem from '@/components/listItem/list.vue'
import NoData from '@/components/empty/nodata'
export default {
  components:{
    listItem,
    NoData
  },
  data(){
    return {
      activeName: 'tab0',
      bannerList: [],
      selectType: [{
        articleTypeId:'0',
        articleTypeName: '最新文章',
      }],
      selectTitle: [],

      listQuery: {
        page: 1,
        pageSize: 10,
      },
      flag:true,
      loading1: false,
      loading2: false,
      totalPage: 0,
      listBox: [],

      params:{
        articleTypeId:0
      }
    }
  },
  created() {
    this.getBanner()
    this.init(true)
  },
  watch:{
    '$store.state.selectType':{
      immediate:true,
      handler:function(val){
        if(val.length<=0||!val) return
        this.selectType =[
            ...this.selectType,
            ...val
            ]
        this.selectTitle = val
      }
    }
  },
  mounted(){
    console.log(this.$router)
    window.addEventListener('scroll', this.onScroll) // 监听页面滚动
  },
  beforeDestroy () {
     window.removeEventListener('scroll', this.onScroll)
  },
  methods:{
     onScroll() {
      this.loadMore()
    },
    loadMore() {
      const clientHei = document.documentElement.clientHeight || document.body.clientHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

      if (parseInt(scrollHeight - clientHei  - scrollTop) <= 500 && this.flag && this.listQuery.page<this.totalPage) {
       this.flag = false
       setTimeout(() => {
          this.listQuery.page++
          this.init();
        }, 200);
      }
    },
    async getBanner() {
      this.loading1 = true
      let res = await this.$api.home.getBanner()
      this.bannerList = res.object.banners || [
        {articleThumbImg: require('@/assets/banner1.jpg')},
        {articleThumbImg: require('@/assets/banner2.jpg')},
      ]
      this.loading1 = false
    },
    async init(type){
      this.loading2 = true
      const obj = {
        ...this.params,
        ...this.listQuery
      }
      let res = await this.$api.article.getArticleList(obj)
      const {result,pages} = res.object
      this.flag = true
      const arr = result||[]
      this.totalPage = pages
      if(type) {
        this.listBox = []
      }
      this.listBox = [...this.listBox, ...arr]
      this.loading2 = false
    },
    tabArticle(e){
      this.listQuery.page = 1
      let current = this.selectType[e.index].articleTypeId*1
      this.params.articleTypeId = current
      this.init(true)
    },
     // 跳转
    gotoPage(val){
      this.$router.push({name:'detail',query: {id:val}})
    }
  }
}
</script>

<style scoped lang='less'>
@theme-color:#206be7;
.home{
  padding-top: 64px;
  .wrap{
    max-width: 1200px;
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
    .banner-wrap{
      height: 320px;
      cursor: pointer;
    }
    .wrap-banner{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .banner-left{
        width: 100%;
        height: 320px;
        overflow: hidden;
        background: #fff;
        /deep/.el-carousel__item:hover img{
          transform: scale(1.02);
        }
        /deep/.el-carousel__container{
          height: 320px;
        }
        .banner-left-p{
            position: absolute;
            z-index: 1;
            width: 100%;
            bottom: 0;
            left: 0;
            padding: 40px 20px 16px;
            margin: 0;
            font-size: 18px;
            line-height: 26px;
            font-weight: 500;
            color: #fff;
        }
        img{
          width: 100%;
          transition: all .3s ease-out 0s;
          object-fit: cover;
          height: 100%;
        }
        /deep/.el-carousel__indicators--outside{
          position: absolute;
          right: 0;
          text-align: right;
          padding-right: 20px;
        }
        /deep/.el-carousel__indicator--horizontal{
          padding:0;
        }
        /deep/.el-carousel__indicator--horizontal button{
          height: 6px;
          width: 8px;
          margin: 0 3px!important;
          border-radius: 6px!important;
          background-color: rgba(255,255,255,.8);
          vertical-align: top;
          opacity: 1;
        }
        /deep/.el-carousel--horizontal .el-carousel__arrow{
          background-color:rgba(38,38,38,0.5)
        }
        /deep/.el-carousel__indicator--horizontal.is-active button{
          background: @theme-color;
          width: 18px;
          height: 6px;
        }
      }
      .banner-right{
        width: 226px;
        padding: 0;
        margin: 0 0 0 14px;
        list-style: none;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .banner-right-p{
          text-align: left;
          padding: 10px 15px;
          line-height: 20px;
        }
      }
    }
    .main-list{
      margin-bottom: 20px;
       background: #fff;
        /deep/ .el-tabs__header{
          margin: 0;
          padding: 0 20px;
       }
       /deep/ .el-tabs__nav-scroll{
        height: 60px;
       }
       /deep/ .el-tabs__nav,/deep/.el-tabs__item{
        height: 100%;
        line-height: 60px;
        font-weight: 500;
        font-size: 16px;
       }
       /deep/ .el-tabs__active-bar{
        background-color: @theme-color;
       }
       /deep/.el-tabs__item.is-active{
          color:@theme-color;
       }
       /deep/ .el-tabs__nav-wrap::after{
        background: #fff;
       }
    }
    .sub-intro{
      margin-bottom: 20px;
      background: #fff;
      .sub-intro-head{
        padding: 20px 20px 0;
        margin-bottom: 0;
        .sub-intro-title{
          font-size: 18px;
          color:rgb(38,38,38);
        }
        .sub-intro-small{
          font-size: 14px;
          margin-left: 10px;
          color:rgba(38,38,38,0.8);
        }
        .sub-intro-all{
          text-decoration: none;
          float: right;
          font-size: 14px;
          color:rgba(38,38,38,0.6);
        }
      }
      .sub_wid4{
         width: 25%;
        margin-right:15px;
      }
    }
      .sub_wid1{
        width: 100%;
        height: 153px;
        background: #fff;
        border-radius: 4px;
      }
      .sub-intro-foot,.banner-right{
        padding: 20px;
        display: flex;
        .sub-foot-item{
         
          a{
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            text-decoration: none;
            border-radius: 4px;
            overflow: hidden;
          }
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            vertical-align: top;
          }
          p{
              font-size: 16px;
              line-height: 40px;
              position: absolute;
              z-index: 9;
              bottom: 0;
              color: #fff;
              text-align: center;
              width: 100%;
          }
        }
        .sub-foot-item:hover img{
            transform: scale(1.05);
            transition: transform .3s ease-out 0s,-webkit-transform .3s ease-out 0s;
        }
        .sub-foot-item:last-child{
          margin-right:0;
        }
      }
  }
}
.load-more-wrap{
  text-align: center;
    font-size: 13px;
    color: rgba(38, 38, 38, 0.8);
    position: relative;
    padding: 20px;
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
@media screen and (max-width:1200px){
  // 今日修改
  .home .wrap {
    width:90%;
  }
}
@media screen and (max-width:1024px){
  .home .wrap {
     .wrap-banner{
      flex-direction: column;
      .banner-left{
        width: 100%;
        height: auto;
      }
      .banner-right{
        width: 100%;
        margin-top: 20px;
        margin-left: 0;
        flex-direction: row;
      }
      .sub_wid1{
        width: calc(50% - 5px);
        height: auto;
      }
    }
  }
}
@media screen and (max-width:768px){
  .home .wrap{
    width: 100%;
    padding: 0;
     .main-list {
      /deep/.el-tabs__header{
        padding: 0 10px;
        font-size: 16px;
        .el-tabs__nav-next, .el-tabs__nav-prev{
          line-height: 60px;
        }
      }
      /deep/.el-tabs__item{
            font-size: 14px;
            padding:0 10px;
      }
      /deep/.el-tabs--top .el-tabs__item.is-top:nth-child(2){
        padding-left: 0;
      }
      /deep/.el-tabs__nav-scroll{
        height: 50px;
      }
     }
    .wrap-banner .banner-right{
      padding:0 10px;
      .banner-right-p{
        font-size: 14px;
      }
    }
    .sub-intro-foot{
      flex-wrap: wrap;
      justify-content: space-between;
      .sub-foot-item p{
        font-size: 14px;
      }
    }
    .sub-intro {
      padding:0 10px;
      .sub-intro-head{
        padding: 10px 0;
      }
       .sub-intro-head .sub-intro-title{
        font-size: 16px;
      }
    .sub-intro-head .sub-intro-small{
      display: none;
    }
      .sub-intro-foot{
        padding: 0;
      }
      .sub_wid4{
        width:calc(50% - 5px);
        margin: 0;
      }
      .sub_wid4:nth-child(1),.sub_wid4:nth-child(2){
        margin-bottom: 10px;
      }
    }
  }
}
</style>
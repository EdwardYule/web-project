<template>
  <div class='item' @click="gotoPage('detail')">
    <div class='item-inner'>
      <div class='item-img'>
        <a class='item-thumb'>
          <img :src='listItem.article.articleThumbImg'/>
        </a>
        <span class='item-category'>{{listItem.articleType.articleTypeName}}</span>
      </div>
      <div class='item-title'>
        <a>{{listItem.article.articleTitle}}</a>
      </div>
      <div class='item-meta-items'>
         <span>
                <i class="iconfont icon-eyes"></i>
                {{listItem.article.viewCount||0}}
              </span>
              <span>
                <i class="iconfont icon-comments"></i>
                 {{listItem.article.commentCount||0}}
              </span>
              <span>
                <i class="iconfont icon-star2"></i>
                {{listItem.article.collectCount||0}}
              </span>
              <span>
                <i class="iconfont icon-dianzan"></i>
                {{listItem.article.thumbUpCount||0}}
              </span>
      </div>
      <div class='item-meta-author'>
          <div>
            <img :src="listItem.userInfo.avatarUrl+''" :onerror='errorImg'/>
            <span>{{listItem.userInfo.userName}}</span>
          </div>
          <div  class='item-meta-author-time'>{{$utils.getDateDiff(listItem.article.createTime)}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    listItem:{
      type:Object,
      default:()=>{}
    }
  },
   data(){
      return{
        errorImg:'this.src="'+require('@/assets/icon.jpg')+'"'
      }
    },
    methods:{
      // 跳转
      gotoPage(name){
        this.$router.push({name,query: {id:this.listItem.article.articleId}})
      }
    }
}
</script>

<style lang='less' scoped>
@theme-light-color:rgba(38,38,38,0.6);
@font-color:rgba(38,38,38,0.8);
.item{
    width: 25%;
    position: absolute;
    top: 0px;
    left: 0px;
    .item-inner{
      background: #fff;
      border-radius: 4px;
      overflow: hidden;
      -webkit-box-shadow: 0 0 1px 0 rgba(0,0,0,0.3);
      box-shadow: 0 0 1px 0 rgba(0,0,0,0.3);
      -webkit-transition: all .2s ease-out 0s;
      -o-transition: all .2s ease-out 0s;
      transition: all .2s ease-out 0s;
      cursor: pointer;
    }
    .item-inner:hover{
      -webkit-box-shadow: 0 2px 10px 3px rgba(0,0,0,0.15);
      box-shadow: 0 2px 10px 3px rgba(0,0,0,0.15);
      -webkit-transform: translateY(-3px);
      -ms-transform: translateY(-3px);
      transform: translateY(-3px);
      -webkit-transition: all .2s ease-in 0s;
      -o-transition: all .2s ease-in 0s;
      transition: all .2s ease-in 0s;
    }
    .item-meta-author{
      display: flex;
      justify-content: space-between;
      padding: 15px;
      font-size: 12px;
      color:@font-color;
      img{
          width: 20px;
        height: 20px;
        margin-right: 3px;
        border-radius: 50%;
        display: inline-block;
        vertical-align: top;
      }
    }
    .item-meta-items{
        font-size: 12px;
        color:@theme-light-color;
        display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;
          padding: 0 15px 15px;
          border-bottom: 1px solid rgb(240,240,240);
          white-space: nowrap;
          overflow: hidden;
        span{
          display: inline-block;
        }
        .iconfont{
          vertical-align: text-bottom;
        }
    }
    .item-title{
      margin: 0;
      padding: 15px;
      font-size: 16px;
      font-weight: 500;
      a{
        line-height: 1.4;
        color: rgb(38,38,38);
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        text-decoration: none;
      }
    }
    .item-img{
      position: relative;
      overflow: hidden;
      .item-category{
        position: absolute;
        left: 10px;
        top: 15px;
        padding: 4px 8px;
        font-size: 12px;
        line-height: 14px;
        color: #fff;
        background: rgba(0,0,0,.6);
        border-radius: 3px;
      }
      .item-thumb{
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: relative;
        img{
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
    }
}
@media screen and (max-width:768px){
   .item .item-meta-author,.item .item-title {
    padding: 15px 10px;
  }
  .item .item-meta-items {
    padding: 0 10px 15px;
  }
}
@media screen and (max-width:640px){
   .item .item-meta-author,.item .item-title {
    padding: 15px 8px;
  }
  .item .item-meta-author-time{
    display: none;
  }
  .item .item-meta-items {
    padding: 0 5px 15px;
  }
}
</style>
<template>
  <!-- 一篇文章样式 -->
  <div class='list-box' @click="gotoPage('detail')">
      <div v-if="isUpdate" @click.stop="gotoPage('contribute')" class="edit">
        <el-button type="primary" size="mini">编辑</el-button>
      </div>
      <div v-if="itemData.article.articleThumbImg" class='item-img'>
        <div class='item-img-inner' >
          <div class='item-category'>{{itemData.articleType.articleTypeName}}</div>
           <img :src='itemData.article.articleThumbImg' />
        </div> 
      </div>
      <div class='item-content'>
        <div class='item-title'>{{itemData.article.articleTitle}}</div>
        <div class='item-excerpt'>{{itemData.article.articleDesc}}</div>
        <div class='item-meta'>
          <div class='item-meta-left'>
            <span class='item-meta-avatar'>
              <img v-if="!itemData.userInfo.avatarUrl" src="@/assets/icon.jpg" class='userImg'/>
              <img v-else :src="itemData.userInfo.avatarUrl" class='userImg'/>
              <span>{{itemData.userInfo.userName}}</span>
            </span>
            <div class='item-meta-date'>{{$utils.getDateDiff(itemData.article.createTime)}}</div>
          </div>
          <div class='item-meta-right'>
              <span>
                <i class="iconfont icon-eyes"></i>
                {{itemData.article.viewCount}}
              </span>
              <span>
                <i class="iconfont icon-comments"></i>
                {{itemData.article.commentCount}}
              </span>
              <span>
                <i v-if="itemData.article.collectStatus" class="iconfont icon-star1" style="font-size:14px;"></i>
                <i v-else class="iconfont icon-star2"></i>
                {{itemData.article.collectCount}}
              </span>
              <span>
                <i v-if="itemData.article.thumbUpStatus" class="iconfont icon-dianzan_kuai"></i>
                <i v-else class="iconfont icon-dianzan"></i>
                {{itemData.article.thumbUpCount}}
              </span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    // 传进来的是单个的列表数据
    itemData:{
      type:Object,
      default:()=>{}
    },
    // 是否可编辑
    isUpdate:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    
  },
  methods:{
    // 跳转
    gotoPage(name){
      this.$router.push({name,query: {id:this.itemData.article.articleId}})
    }
  }
}
</script>

<style scoped lang='less'>
@theme-gray-color:rgba(38,38,38,0.8);
@theme-light-color:rgba(38,38,38,0.6);
.list-box{
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #f5f5f5;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  .edit{
    display: none;
  }
  .item-content{
    position: relative;
    width: 70%;
    flex:1;
    .item-title{
      margin: 0 0 10px;
      font-size: 20px;
      line-height: 1.5;
      font-weight: 500;
      overflow:hidden; 
      text-overflow:ellipsis; 
      white-space:nowrap; 
    }
    .item-excerpt{
      height: 52px;
      margin-bottom: 34px;
      line-height: 1.625;
      color: @theme-gray-color;
      font-size: 16px;
    }
    .item-meta{
      display: flex;
      justify-content: space-between;
      position: absolute;
      width: calc(100% - 20px);
      bottom: 0;
      .item-meta-date{
        font-size: 12px;
        color:@theme-light-color
      }
      .item-meta-left{
        font-size: 12px;
        color:@theme-light-color;
        display: flex;
        align-items: center;
        .item-meta-avatar{
          margin-right: 15px;
          display: flex;
          align-items: center;
          img{
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 3px;
            border-radius: 50%;
            background: #f5f5f5;
            vertical-align: top;
          }
        }
      }
      .item-meta-right{
        font-size: 12px;
        color:@theme-light-color;
        display: flex;
          align-items: center;
        span{
          display: inline-block;
          margin-right: 15px;
        }
        .iconfont{
          vertical-align: text-bottom;
        }
      }
    }
  
  }
  .item-img{
       position: relative;
    width: 30%;
    max-width: 250px;
    overflow: hidden;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    .item-img-inner{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      padding-right: 20px;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
      .item-category{
          position: absolute;
          left: 10px;
          top: 15px;
          padding: 4px 8px;
          font-size: 12px;
          line-height: 14px;
          color: #fff;
          background-color: #000;
          filter: alpha(opacity=60);
          background: rgba(0,0,0,.6);
          border-radius: 3px;
          text-decoration: none;
          z-index: 9;
      }
    }
  }
  .item-img:before{
    content: "";
    display: block;
    padding-top: 62.5%;
  }
  .item-img:hover{
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.3);
    transition: box-shadow .3s ease 0s,-webkit-box-shadow .3s ease 0s;
  }
  .item-img:hover img{
    transform: scale(1.03);
    transition: all .3s ease-out 0s;
  }
}
.list-box:hover{
  background-color: #f5f5f5;
  transition: all .5s;
  .edit{
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
  }
}
@media screen and (max-width:768px){
  .list-box {
        padding: 10px;
      .item-img{
        width: 35%;
        .item-img-inner .item-category{
          left:5px;
          top:5px;
          padding: 3px 5px;
        }
      }
  .item-content {
    width: 65%;
    .item-title{
      font-size: 15px;
    }
    .item-excerpt{
      margin-bottom: 20px;
      font-size: 14px;
      height: 40px;
    }
    .item-meta {
      width: 100%;
      .item-meta-left{
        .item-meta-avatar{
            display: none;
        }
      }
      .item-meta-right {
        text-align: right;
      }
      .item-meta-right span:nth-child(1),
      .item-meta-right span:nth-child(2),
      .item-meta-right span:nth-child(3){
          display: none;
      }
    } 
  }
  }
}
</style>
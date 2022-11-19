<template>
  <div class='detail-wrap'>
    <div class='detail-bread'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      
      <!-- 内容 -->
      <div class='wrap-content'>
          <div class='content-left'>
            <div class='content-entry-box'>
            <div class='entry-title'>三扽森扽三扽森扽三扽森扽</div>
            <div class='entry-info'>
              <span class='nickname'>鱼乐月下</span>
              <span class='dot'>•</span>
              2天前
              <span class='dot'>•</span>
              2天前
              <span class='dot'>•</span>
              2天前
            </div>
            <div class='entry-content'>
              <div>
                 <img src='@/assets/logo.jpg'/>
                 <div>222222222</div>
              </div>
            </div>
            <!-- 按钮 -->
            <div class='entry-action'>
              <el-button>
                <i class="iconfont icon-dianzan_kuai"></i>赞(0)
              </el-button>
              <el-button>
                <i class="iconfont icon-dashang"></i>打赏
              </el-button>
            </div>
            <!-- 按钮 -->
            <div class='entry-bar'>
              <div class='entry-bar-inner'>
                <img src='@/assets/icon.jpg' class='entry-author'/>
                <span class='author-name'>鱼乐月下</span>
              </div>
              <div class='entry-bar-inner'>
                <div class='entry-bar-comments'>
                  <div><i class="iconfont icon-star"></i>0</div>
                  <div><i class="iconfont icon-comments"></i>0</div>
                </div>
                <div class='entry-wx'><i class="iconfont icon-weixin"></i></div>
              </div>
            </div>
            </div>
            <!-- 上一页下一页 -->
            <div class='entry-page'>
              <div class='entry-page-item'>
                <p>测试一下</p>
                <div class='entry-page-time'>
                  <span>上一篇</span>
                  <span>2022年 11月 6日 下午7:24</span>
                </div>
              </div>
              <div class='entry-page-item active'>
                <p>测试一下</p>
                <div class='entry-page-time'>
                  <span>2022年 11月 6日 下午7:24</span>
                  <span>下一篇</span>  
                </div>
              </div>
            </div>
            <!-- 上一页下一页 -->
            <!-- 评论 -->
            <div class='detail-comment'>
              <div class='detail-comment-title'>发表回复</div>
              <div>

              </div>
            </div>
            <!-- 评论 -->
          </div>

          <div class='content-right'>
            <div  class='content-right-infoBox'>
              <img src='@/assets/iconbg.jpg' class='content-right-bg'/>
              <div class='content-right-icon'>
                <div class='content-info-icon'><img src='@/assets/icon.jpg' /></div>
              </div>
              <div class='content-right-info'>
                  <p class='author-name'>edward</p>
                  <p class='author-description'>edward</p>
                  <div class='profile-stats-inner'>
                    <div class='user-stats-item'>
                      <div>2</div>
                      <div>文章</div>
                    </div>
                    <div class='user-stats-item'>
                      <div>0</div>
                      <div>评论</div>
                    </div>
                     <div class='user-stats-item'>
                      <div>0</div>
                      <div>粉丝</div>
                    </div>
                  </div>
                  <!-- 关注私信 -->
                  <div class='attention-btn'>
                    <el-button>
                      <i class='el-icon-plus'></i>
                      关注</el-button>
                    <el-button>
                       <i class='el-icon-message'></i>
                      私信</el-button>
                  </div>
              </div>
               <!-- 关注私信 -->
                <div class='profile-posts'>
                    <div class='widget-title'>最近文章</div>
                    <ul class='moreArticle'>
                      <li>
                        <i class='el-icon-caret-right'/>
                        <div>标题标题标题标题标题标题标题标题标题</div>
                      </li>
                       <li>
                        <i class='el-icon-caret-right'/>
                        <div>标题标题标题标题标题标题标题标题标题</div>
                      </li>
                    </ul>
                </div>
          </div>
          </div>
      </div>
      <!-- 内容 -->
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
@theme-gray-color:rgba(38,38,38,0.8);
@theme-light-color:rgba(38,38,38,0.6);
@font-size:rgb(38,38,38);
@theme-color:rgb(32,107,231);
.detail-wrap{
    max-width: 1200px;
    width: 80%;
    margin: 0 auto;
    padding: 64px 0 20px;
    .detail-bread{
      margin: 20px 0;
      /deep/.el-breadcrumb__inner{
          color:@theme-gray-color;
      }
    }
    .wrap-content{
      display: flex;
      justify-content: space-between;
      .content-right{
        .content-right-infoBox{
          background: #fff;
        }
        .content-right-bg{
          width: 100%;
        }
        .profile-posts{
          padding: 20px 15px 15px;
          .moreArticle {
            li{
              list-style: none;
              font-size: 14px;
              padding: 5px 0 10px 0;
              display: flex;
              div{
                color:@theme-gray-color;
                width: calc(100% - 20px);
                display: inline-block;
              }
              div:hover{
                color:@theme-color;
                cursor: pointer;
              }
            }
            .el-icon-caret-right{
              color:@theme-light-color;
              margin-top: 3px;
            }
          }
          .widget-title{
              margin: 2px 0 15px;
              padding: 0 0 0 12px;
              font-size: 16px;
              font-weight: 500;
              font-size: 14px;
              color:@font-size;
              position: relative;
              line-height: 14px;
          }
          .widget-title::before{
              position: absolute;
              left: 0;
              top: 0;
              width: 3px;
              height: 100%;
              content: "";
              background-color:@theme-color;
              background-image: -o-linear-gradient(top,rgba(255,255,255,.15),transparent);
              background-image: linear-gradient(180deg,rgba(255,255,255,.15),transparent);
              border-radius: 3px;
          }
        }
        .attention-btn{
          button{
            background: @theme-color;
            color:#fff;
            padding:6px 15px;
            border: 1px solid  @theme-color;
            margin-top:20px;
          }

        }
        .content-right-info{
          padding: 10px 15px 20px;
          text-align: center;
          border-bottom: 1px solid #f2f2f2;
          .author-name{
              display: inline-block;
              font-size: 16px;
              line-height: 22px;
              font-weight: 500;
              overflow: hidden;
              max-width: 180px;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              white-space: nowrap;
              vertical-align: top;
          }
          .author-description{
            margin-top: 10px;
            margin-bottom: 20px;
            font-size: 14px;
            color:@theme-gray-color
          }
          .profile-stats-inner{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .user-stats-item{
              padding: 6px 0;
              flex: 1;
              div:first-child{
                font-size: 16px;
                color:@font-size;
              }
               div:last-child{
                font-size: 12px;
                color:@theme-gray-color
              }
            }
          }
        }
        .content-right-icon{
         margin-top: -40px;
          .content-info-icon{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 0;
            display: block;
            position: relative;
            overflow: hidden;
            border: 2px solid #fff;
            img{
              max-width: 100%;
            }
          }
        }
      }
      .content-left{
        width: 100%;
        margin-bottom: 20px;
        flex:1;
        .detail-comment{
          background: #fff;
          padding: 20px;
          .detail-comment-title{
              font-size: 18px;
              margin: 0 0 20px;
              font-weight: 500;
              position: relative;
              padding: 0 0 0 12px;
          }
          .detail-comment-title::before{
                position: absolute;
                left: 0;
                top: 1px;
                width: 3px;
                height: calc(100% - 2px);
                content: "";
                background-color: @theme-color;
                background-image: -o-linear-gradient(top,rgba(255,255,255,.15),transparent);
                background-image: linear-gradient(180deg,rgba(255,255,255,.15),transparent);
                border-radius: 3px;
          }
        }
        .entry-page{
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          .entry-page-item{
            padding: 10px 15px;
            // background: @theme-color;
            // background-image: linear-gradient(90deg,rgba(255,255,255,.3),transparent);
            border-radius: 4px;
            color: #fff;
            width: 49%;
            background-size: cover;
            background-position: 50%;
            background-image:url('../../assets/banner1.jpg');
            cursor: pointer;
            position: relative;
            overflow: hidden;
            p{
                  display: block;
                  height: 50px;
                  line-height: 20px;
                  overflow: hidden;
                  -o-text-overflow: ellipsis;
                  text-overflow: ellipsis;
                  -webkit-box-orient: vertical;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                      z-index: 2;
                      position: relative;
            }
            .entry-page-time{
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              z-index: 2;
              position: relative;
            }
          }
          .entry-page-item.active{
              background-color:@theme-color;
              background-image: -o-linear-gradient(left,rgba(255,255,255,.3),transparent);
              background-image: linear-gradient(90deg,rgba(255,255,255,.3),transparent);
          }
          .entry-page-item.active::before{
            background:transparent
          }
          .entry-page-item::before{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            content: "";
            z-index: 1;
          }
        }
        .content-entry-box{
          background: #fff;
          margin-bottom: 20px;
        }
        .entry-bar{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 20px;
          border-top: 1px solid #f2f2f2;
          .author-name{
            color:@theme-color;
            font-size: 14px;
          }
          .entry-bar-inner{
            height: 36px;
            display: flex;
            align-items: center;
            color:@theme-light-color;
            .entry-wx{
              padding: 0 20px;
              border-left: 1px solid @theme-light-color;
            }
            .entry-bar-comments{
              width: 74px;
              margin-right:30px;
              display: flex;
              justify-content: space-between;
              .iconfont{
                margin-right: 3px;
              }
            }
            .entry-info{
              margin-right: 20px;
            }
          }
          .entry-author{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
        .entry-title{
          margin-bottom: 20px;
          font-size: 24px;
          color:@font-size;
          padding:20px 20px 0;
        }
        .entry-action{
          margin: 30px 0;
          text-align: center;
          .iconfont{
            margin-right: 5px;
          }
          button{
            padding:4px 30px;
            line-height: 30px;
            font-size:18px;
            color:@theme-color;
            border: 1px solid @theme-color;
          }
        }
        .entry-info{
          padding:0px 20px  30px 20px;
          color: @theme-light-color;
          font-size: 14px;
          .dot{
            margin: 0 5px;
             color: @theme-light-color;
          }
          .nickname{
            color:@theme-color;
          }
        } 
        .entry-content{
          text-align: center;
          color:@theme-gray-color;
          font-size: 14px;
          padding:0 20px;
          img {
            max-width: 100%;
            display: block;
            margin: 0 auto 5px;
          }
        }
      }
      .content-right{
        width: 300px;
        margin-left: 20px;
      }
    }
  
}
</style>
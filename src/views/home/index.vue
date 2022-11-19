<template>
  <div class='home'>
    <div class='wrap'>
      <div class='wrap-banner'>
        <div class='banner-left'>
           <el-carousel indicator-position="outside" height="320px">
              <el-carousel-item v-for="item in 4" :key="item">
                <div>
                  <img src='@/assets/banner1.jpg'>
                  <div class='banner-left-p'>用户体验</div>
                </div>
              </el-carousel-item>
            </el-carousel>
        </div>
        <div  class='banner-right'>
            <div class='sub-foot-item sub_wid1'>
              <a>
                <img src='@/assets/intro.jpg'/>
                <p class='banner-right-p'>用户体验</p>
              </a>
            </div>
            <div class='sub-foot-item sub_wid1'>
              <a>
                <img src='@/assets/intro.jpg'/>
                <p class='banner-right-p'>用户体验</p>
              </a>
            </div>
        </div>
      </div>

        <!-- 专题start -->
        <div class='sub-intro'>
          <div class='sub-intro-head'>
            <span class='sub-intro-title'>专题介绍 </span>
            <span class='sub-intro-small'>专题模块标题旁边的描述文字 </span>
            <a class='sub-intro-all' href='#'>全部专题 </a>
          </div>
          <div class='sub-intro-foot'>
            <div v-for='i in 4' :key='i' class='sub-foot-item sub_wid4'>
              <a>
                <img src='@/assets/intro.jpg'/>
                <p>用户体验</p>
              </a>
            </div>
          </div>
        </div>
        <!-- 专题end -->

        <div class='main-list'>
          <el-tabs v-model="activeName">
            <el-tab-pane label="最新文章" name="1">
              <listItem v-for='item in 4' :key='item' ></listItem>
            </el-tab-pane>
            <el-tab-pane label="科学" name="2">科学</el-tab-pane>
            <el-tab-pane label="人文" name="3">人文</el-tab-pane>
            <el-tab-pane label="生活" name="4">定时任务补偿</el-tab-pane>
            <el-tab-pane label="综合" name="5">定时任务补偿</el-tab-pane>
          </el-tabs> 
        </div>
    </div>
  </div>
</template>

<script>
import listItem from '@/components/listItem/list.vue'
export default {
  components:{
    listItem
  },
  data(){
    return {
      activeName: '1'
    }
  },
  methods:{
  
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
    .wrap-banner{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .banner-left{
        width: 100%;
        height: 320px;
        overflow: hidden;
        /deep/.el-carousel__item:hover img{
          transform: scale(1.02);
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
       padding: 0 20px;
        /deep/ .el-tabs__header{
          margin: 0;
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
         flex: 25%;
        margin-right:15px;
      }
    }
      .sub_wid1{
        width: 100%;
        height: 153px;
        background: rgba(38,38,38,0.05);
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
            text-decoration: none;
            border-radius: 4px;
            overflow: hidden;
          }
          img{
            width: 100%;
            height: auto;
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
</style>
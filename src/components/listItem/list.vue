<template>
  <!-- 一篇文章样式 -->
  <div class='list-box' @click='gotoDetail'>
      <div class='item-img'>
        <div class='item-img-inner' >
          <div class='item-category'>科学</div>
           <img src='@/assets/intro.jpg' />
        </div> 
      </div>
      <div class='item-content'>
        <div class='item-title'>三扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽三扽森扽森扽</div>
        <div class='item-excerpt'>三扽森扽</div>
        <div class='item-meta'>
          <div class='item-meta-left'>
            <span class='item-meta-avatar'>
              <img src='@/assets/icon.jpg' />
              <span>娱乐了</span>
            </span>
            <div class='item-meta-date'>2天前</div>
          </div>
          <div class='item-meta-right'>
              <span>
                <i class="iconfont icon-eyes"></i>
                10
              </span>
              <span>
                <i class="iconfont icon-comments"></i>
                10
              </span>
              <span>
                <i class="iconfont icon-star"></i>
                10
              </span>
              <span>
                <i class="iconfont icon-dianzan"></i>
                10
              </span>
            </div>
          
        </div>
      </div>
  </div>
</template>

<script>
export default {
  methods:{
    gotoDetail(){
      this.$router.push({name:'detail'})
    }
  }
}
</script>

<style scoped lang='less'>
@theme-gray-color:rgba(38,38,38,0.8);
@theme-light-color:rgba(38,38,38,0.6);
.list-box{
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #f5f5f5;
  overflow: hidden;
  cursor: pointer;
  .item-content{
    position: relative;
    width: 70%;
    padding-left: 20px;
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
    border-radius: 4px;
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
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
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
</style>
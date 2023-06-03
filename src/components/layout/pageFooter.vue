<template>
    <div class='footer'>
      <div class='footer-box'>
        <div class='footer-left'>
          <img src='@/assets/logo-footer.png' class='footer-left-logo'/>
          <div>
               <ul class='footer-nav'>
                <li>
                  <a href='#'>首页</a>
                </li>
                <li>
                  知识分类
                </li>
                <li>分类产品</li>
                <li>关于我们</li>
                <li>联系我们</li>
              </ul>

              <div class='copyright'>
                Copyright © 2018 WPCOM 版权所有 
                <a herf='#'>粤ICP备000000000号</a>
                Powered by 
                <a href='#'>WordPress</a>
              </div>
          </div>
        </div>
                
        <div class='footer-right'>
          <div>
            <i class="iconfont icon-iphone"></i>
          </div>
           <div>
            <i class="iconfont icon-android"></i>
          </div>
           <div>
            <i class="iconfont icon-weixin"></i>
          </div>
           <div>
            <i class="iconfont icon-weibo"></i>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
@font-size: 14px;
@font-color: rgba(255,255,255,.7);
@hover-color: rgba(255,255,255,.9);
@theme-color:#206be7;
.footer{
  padding: 50px 0;
  color: @font-color;
  text-align: center;
  background:#2d3236;
  .footer-box{
    max-width: 1200px;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-left{
     display: flex;
     .footer-left-logo{
        display: block;
        max-width: 160px;
        max-height: 60px;
        height: auto;
        margin-right: 32px;
     }
  }
  .footer-right{
    display: flex;
    div{
      display: inline-block;
      position: relative;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 50%;
      text-align: center;
      background: rgba(255,255,255,.1);
      color: rgba(255,255,255,.8);
      z-index: 0;
      margin-left: 20px;
      .iconfont{
        font-size: 20px;
        
      }
      .iconfont::after{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: @theme-color;
        border-radius: 50%;
        content: "";
        opacity: 0;
        -webkit-transform: scale(0);
        -ms-transform: scale(0);
        transform: scale(0);
        z-index: -1;
      }
    }
  }
  .footer-right div:hover .iconfont::after{
    webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
    -webkit-transition: all .5s cubic-bezier(.3,0,0,1.3) 0s;
    -o-transition: all .5s cubic-bezier(.3,0,0,1.3) 0s;
    transition: all .5s cubic-bezier(.3,0,0,1.3) 0s;
  }
  a{
    text-decoration: none;
    color: @font-color;
  }
  .footer-nav{
    margin: 0 0 12px;
    font-size: @font-size;
    text-align: left;
    li{
        padding: 0 10px;
        display: inline-block;
        cursor: pointer;
        position: relative;
    }
    li::after{
      display: inline-block;
      font-size: 12px;
      line-height: 18px;
      opacity: .8;
      content: "|";
      vertical-align: top;
      position: absolute;
      right:0;
    }
    li:last-child::after{
      display: none;
    }
    li:hover,a:hover{
     color: @hover-color;
    }
  }
  .copyright{
    text-align: left;
    font-size: @font-size;
    a:hover{
      color: @hover-color;
    }
  }
}
@media screen and (max-width:1200px){
  // 今日修改
  .footer{
    .footer-box{
      width: 90%;
    }
  }
}
@media screen and (max-width:1024px){
  .footer{
    padding: 25px 10px;
    .footer-right{
      display: none;
    }
    .footer-left{
      width: 100%;
      div{
        width: 100%;
      }
      .footer-left-logo{
        display: none;
      }
      .footer-nav,.copyright{
        text-align: center;
      }
    }
  }
}
@media screen and (max-width:768px){
  .footer{
    padding: 20px 0;
    .footer-nav{
      display: none;
    }
    .copyright{
      font-size: 12px;
    }
  }
}
</style>
<template>
  <div class='noLogin-box'>
    <div class='gotoBack' @click="gotoBack"><i class='el-icon-s-home'></i>返回首页</div>
      <Login 
      ref='loign' 
      @goToRegister="goToRegister" 
      @isLogin="gotoRouter('contribute')"
      :isShowClose='false'
      :isModal='false'
      >
      </Login>
      <Register ref='register' @goToLogin="goToLogin" @isLogin="gotoRouter('contribute')"></Register>
      <div class='noLogin-foot'>
               <ul class='footer-nav'>
                <li @click="gotoRouter('knowledge')">知识分类</li>
                <li @click="gotoRouter('product')">产品知识</li>
                <li @click="gotoRouter('aboutUs')">关于我们</li>
                <li @click="gotoRouter('contactUs')">联系我们</li>
              </ul>

              <div class='copyright'>
                Copyright © 2018 WPCOM 版权所有 
                <a herf='#'>粤ICP备000000000号</a>
                Powered by 
                <a href='#'>WordPress</a>
              </div>
      </div>
  </div>
</template>
<script>
import Login from '@/views/system/login'
import Register from '@/views/system/register'
export default {
  components:{
    Login,
    Register
  },
  mounted(){
    this.goToLogin()
  },
  methods:{
    gotoBack(){
      this.$router.push({name:'index'})
    },
    // 跳转到注册
    goToRegister(){
        this.$refs.register.handleOpen()
    },
    // 跳转到登录
    goToLogin(){
      this.$refs.loign.handleOpen()
    },
    gotoRouter(name){
      this.$router.push({name})
    }
  }
}
</script>
<style scoped lang='less'>
@font-size: 14px;
@font-color: #fff;
@hover-color: #fff;
.noLogin-box{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image:url('../../assets/nologin.jpg') ;
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
  background-color: #fff;
  .noLogin-foot{
    color: #fff;
    position: fixed;
    bottom: 0;
    padding: 30px 0;
    width: 100vw;
    z-index: 3001;
     .footer-nav{
    margin: 0 0 12px;
    font-size: @font-size;
    text-align: center;
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
    text-align: center;
    font-size: @font-size;
    a{
      color: #fff;
      text-decoration: none;
    }
    a:hover{
      color: @hover-color;
    }
  }
  }
  .gotoBack{
    position: fixed;
    right: 30px;
    top: 30px;
    color: #fff;
    background: #1162e8;
        padding: 9px 20px;
    font-size: 14px;
    border-radius: 4px;
    z-index: 4000;
    cursor: pointer;
    .el-icon-s-home{
      margin-right: 4px;
    }
  }
}
@media screen and (max-width:768px){
  .noLogin-foot{
    display: none;
  }
}
</style>
<template>
  <div class='page-header'>
    <div class='navbar'>
      <div class='navbar-left'>
        <div class='logo'>
          <router-link to="/home">
          <img :src='logoImg+" "' :onerror='errorLogo'  class='navbar-img'>
          </router-link>
        </div>

        <div class='navbar-menu' v-show='!isShowSearch'>
          <el-menu router :default-active="$router.path" class="el-menu-demo" mode="horizontal"
          >
            <el-menu-item index='/'>首页</el-menu-item>
            <el-submenu index='' popper-class='head-submenu'>
              <template slot="title">知识分类</template>
                  <el-menu-item :index='`/knowledge/${item.articleTypeId}`' v-for='item in selectType' :key='item.articleTypeId'>
                  <a class='navbar-menu-a'>
                    <img :src='item.articleTypeImg'/>
                   </a>
                    <div class='nabar-menu-name'>{{item.articleTypeName}}</div>
                 
                  </el-menu-item>
            </el-submenu>
            <!-- <el-menu-item index="/product">产品知识</el-menu-item> -->
            <el-menu-item index="/aboutUs">关于我们</el-menu-item>
            <el-menu-item index="/contactUs">联系我们</el-menu-item>
          </el-menu>
        </div>
      </div>

      <!-- 搜索start -->
        <div class='navbar-search' v-show='isShowSearch'>
          <i class='el-icon-close' @click='isShowSearch=false'/>
          <el-input placeholder="请输入关键词搜索" v-model="searchVal" @keyup.native.enter="gotoSearh"></el-input>
          <i class="el-icon-search" @click='gotoSearh'  ></i>
        </div>
        <!-- 搜索end -->

      <div class='navbar-action'>
        <i class="el-icon-search" v-show='!isShowSearch' @click='isShowSearch=true'></i>
        <div v-if="isShow">
          <el-button size='mini' class='btn-common btn-login' @click='goToLogin'>登录</el-button>
          <el-button size='mini' class='btn-common' @click='goToRegister'>注册</el-button>
        </div>
        <div v-else class='navbar-user'>
          <el-menu router :default-active="$router.path" class="el-menu-demo" mode="horizontal" popper-class='navbar-user-box'>
              <el-submenu index=''>
                <template slot="title">
                  <div @click="jumpCenter">
                     <img class='userImg' :src="$store.state.userInfo.avatarUrl+''" :onerror='errorImg'/>
                    <span class='username'>{{$store.state.userInfo.userName}}</span>
                  </div>
                </template>
                <el-menu-item index="/infoCenter">个人中心</el-menu-item>
                <el-menu-item index="/basicInfo?index=2">系统通知</el-menu-item>
                <el-menu-item index="/basicInfo?index=1">账号设置</el-menu-item>
                <el-menu-item index='' @click="logout">退出登录</el-menu-item>
              </el-submenu>
          </el-menu>
        </div>
        <el-button size='mini' class='btn-send' @click='isHasLogin'>
          <i class='el-icon-edit-outline'></i>投稿
        </el-button>
      </div>

      <!-- 移动端按钮S -->
      <div class='navbar-toggle' :class='{active:inShowMobile}' @click='showMobile'>
        <span class="icon-bar icon-bar-1"></span>
        <span class="icon-bar icon-bar-2"></span>
        <span class="icon-bar icon-bar-3"></span>
      </div>
       <!-- 移动端按钮E -->

    </div>
    <Login ref='loign' @goToRegister="goToRegister"></Login>
    <Register ref='register' @goToLogin="goToLogin"></Register>
    
    <!-- 移动端侧边栏S -->
    <MobileNav 
      ref='navMobile' 
      @goToLogin='goToLogin' 
      @isHasLogin='isHasLogin'
      @gotoSearh="gotoNavSearh"
      @goToRegister="goToRegister">
    </MobileNav>
    <!-- 移动端侧边栏E -->
  </div>
</template>

<script>
import Login from '@/views/system/login'
import Register from '@/views/system/register'
import MobileNav from './mobileNav.vue'
import { mapActions } from "vuex"
export default {
  components:{
    Login,
    Register,
    MobileNav
  },
  data(){
    return {
      activeIndex: '1',
      isShow: true,
      isAvatarUrl: true,
      userInfo: {},
      selectType:[],

      isShowSearch:false,
      searchVal: '',
      inShowMobile: false,

      logoImg:'',

      errorImg:'this.src="'+require('@/assets/icon.jpg')+'"',
      errorLogo: 'this.src="'+require('@/assets/logo.jpg')+'"'
    }
  },
  watch:{
    '$route':{
      handler:function(){
        this.isUserData()
      },
      immediate:true,
      deep:true
    }
  },
  mounted(){
    this.getType()
     // 请求获取logo地址
    this.getLogo()
  },
  methods:{
    ...mapActions(['getClassfig']),
    getType(){
      //获取分类列表
      this.getClassfig().then((res)=>{
          this.selectType = res
      })
    },
    jumpCenter(){
      if('basicInfo' == this.$route.name){
        return
      }else{
        this.$router.push('basicInfo')
      }
    },
        // 主页查询是否存在用户信息
    isUserData() {
      if(localStorage.userInfo) {
        let userInfo = JSON.parse(localStorage.userInfo)
        let userToken = localStorage.userToken
        let Logo = localStorage.userToken
        this.$store.commit('setUserInfo', userInfo)
        this.$store.commit('setToken', userToken)
        this.$store.commit('setLogo', Logo)
        this.isAvatarUrl = !userInfo.avatarUrl
        this.isShow = false
      }else{
        this.isShow = true
      }
    },
    showMobile(){
      this.$refs.navMobile.open()
    },
    async getLogo() {
      let res = await this.$api.system.getLogo()
      const _that = res.object.configs[0].value
      this.$store.commit('setLogo', _that)
      localStorage.Logo = _that
      this.logoImg = _that
    },
    gotoNavSearh(val){
      this.searchVal = val
      this.gotoSearh()
    },
    gotoSearh(){
      this.$router.push({name:'search',query:{
        val:this.searchVal
      }})
      this.isShowSearch=false
      this.searchVal = ''
    },
    // 跳转到登录
    goToLogin(){
      this.$refs.loign.handleOpen(2)
    },
    // 跳转到注册
    goToRegister(){
        this.$refs.register.handleOpen(2)
        this.$refs.loign.handleClose()
    },
    // 路由跳转
    gotoRouter(name){
      this.$router.push({name})
    },
    isHasLogin(){
      if(this.isShow){
        this.$router.push({name:'noLogin',query:{
          type: 1
        }})
      }else{
        this.gotoRouter('contribute')
      }
    },
    // 退出登录
    async logout() {
      let res = await this.$api.system.logout()
      if(res.code == 0) {
          localStorage.removeItem('userInfo')
          localStorage.removeItem('userToken')
          this.$router.push('home')
          setTimeout(function () {
            window.location.reload();
          }, 100);
        }
    }
  }
}
</script>
<style lang='less'>
.head-submenu{
  max-width: 1200px;
  width: 80%;
  left: 0 !important;
  right: 0 !important;
  margin: auto;
  top: 59px !important;
  .el-menu.el-menu--popup{
    display: flex;
    padding:20px 30px;
    text-align: center;
    .el-menu-item{
      flex: 25%;
      height: auto;
      padding: 0 10px;
      color:rgb(38,38,38);
      font-size: 16px;
      font-weight: 600;
      img{
        display: block;
        width: 100%;
        height: auto;
        margin: 0 auto;
        max-height: none;
        border-radius: 3px;
        margin-bottom: 10px;
      }
    }
    .el-menu-item:hover{
      color:#206be7;
    }
  }
}
</style>
<style scoped lang='less'>
@font-color: #206be7;
@theme-black-color:rgb(38,38,38);
@theme-gray-color:rgba(38,38,38,0.8);
@font-size: 14px;
.page-header{
  position: fixed;
  left: 0;
  z-index: 99;
  width: 100%;
  border: 0;
  background: #fff;
  -webkit-box-shadow: 0 0 3px 1px rgba(0, 0 ,0 ,0.05);
  box-shadow: 0 0 3px 1px rgba(0, 0 ,0 ,0.05);
  height: 64px;
}
  .navbar-search{
    display: flex;
    align-items: center;
    max-width: 360px;
    width: 30%;
    margin: 0 auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    font-size: 14px;
    color:rgba(38,38,38,0.8);
    z-index: 9;
    i{
      cursor: pointer;
    }
    /deep/.el-input__inner{
     border-top: 0;
      border-right: 0;
      border-bottom: 0;
      border-radius: 0;
      margin-left: 10px;
      box-sizing: border-box;
      width: calc(100% - 60px);
      height: 20px;
      border-left:1px solid  rgb(38,38,38);
    }
  }
.logo{
  height: 64px;
  display: flex;
  align-items: center;
}
.navbar-img{
  max-height: 36px;
}
.navbar{
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .navbar-action{
    display: flex;
    align-items: center;
    .el-icon-search{
      margin-right: 15px;
      cursor: pointer;
    }
    .btn-common{
        border: none;
        color:@theme-black-color;
        font-size: @font-size;
        margin: 0;
        padding: 0 5px;
        border-radius: 0
    }
    .btn-common:hover{
      border: none;
      color: @font-color;
      background: #fff;
    }
    .btn-login,.btn-common.btn-login:hover{
      border-right:1px solid @theme-black-color;
    }
    .btn-send{
      background: @font-color;
      color: #fff;
       border: 1px solid @font-color;
       margin-left: 20px;
       .el-icon-edit-outline{
        margin-right: 5px;
       }
    }
    .btn-send:hover{
      opacity: 0.8;
    }
  }
  .navbar-menu{
      margin-left: 40px;
  }
  .navbar-menu,.navbar-user{
    float: left;
    /deep/.el-submenu .el-submenu__title{
      display: flex;
      align-items: center;
    }
    .el-menu.el-menu--horizontal{
      border:0;
    }
    .username{
      color:@theme-gray-color;
    }
    .userImg{
      width: 26px;
      height: 26px;
      margin-right: 5px;
      border-radius: 100%;
    }
    /deep/.el-menu--horizontal>.el-submenu .el-submenu__title{
        border-bottom: 0;
      }
      .el-menu-item,.el-submenu{
        padding: 0 12px;
        border-top:none;
      }
      .el-submenu /deep/.el-submenu__title,
      .el-menu-item{
        color:@theme-black-color;
         font-size: @font-size;
         border-bottom-color: transparent;
         line-height: 64px;
         height: 64px;
      }
      .el-submenu /deep/.el-submenu__title{
        padding:0
      }
      .el-menu-item.is-active,
      .el-submenu.is-active {
        color:@font-color;
        border-bottom: 2px solid #fff;
        line-height: 64px;
        height: 64px;
      }
      .el-menu-item:hover,.el-submenu:hover{
        color:@font-color;
      }
  }
  .navbar-left{
    display: flex;
    align-items: center;
  }
}
.navbar-toggle{
  display: none;
  padding: 9px 10px;
  cursor: pointer;
  transition: all .3s ease-out 0s;
  .icon-bar{
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 1px;
    background: rgb(38,38,38);
  }
  .icon-bar-2,.icon-bar-3{
    margin-top: 5px;
  }
}
.navbar-menu-a{
  position: relative;
    display: block;
    width: 100%;
    height: 70%;
    text-decoration: none;
    border-radius: 4px;
    overflow: hidden;
}
.nabar-menu-name{
  margin-top:10px;
}
@media screen and (max-width:1200px){
  .navbar {
    width:90%;
  }
}
@media screen and (max-width:1024px){
  .navbar {
    .navbar-menu,.navbar-action,.navbar-search{
      display: none;
    }
  }
  .navbar-toggle{
    display: block;
  }
  .navbar-toggle.active{
      .icon-bar-1{
        -webkit-transform: rotate(-45deg) translate(-5px,5px);
        -ms-transform: rotate(-45deg) translate(-5px,5px);
        transform: rotate(-45deg) translate(-5px,5px);
      }
      .icon-bar-2{
        opacity: 0;
      }
      .icon-bar-3{
        -webkit-transform: rotate(45deg) translate(-5px,-5px);
        -ms-transform: rotate(45deg) translate(-5px,-5px);
        transform: rotate(45deg) translate(-5px,-5px);
      }
  }
}
@media screen and (max-width:768px){
.navbar {
    width:calc(100% - 20px);
  }
}
</style>
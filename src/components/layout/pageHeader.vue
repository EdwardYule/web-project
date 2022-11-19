<template>
  <div class='page-header'>
    <div class='navbar'>
      <div class='navbar-left'>
        <div class='logo'>
          <a href='#'>
          <img src='@/assets/logo.jpg' class='navbar-img'>
          </a>
        </div>

        <div class='navbar-menu'>
        <el-menu router :default-active="$router.path" class="el-menu-demo" mode="horizontal">
          <el-menu-item index='/'>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">知识分类</template>
                <el-menu-item index="2-1">科学</el-menu-item>
                <el-menu-item index="2-2">天文</el-menu-item>
                <el-menu-item index="2-3">地理</el-menu-item>
                <el-menu-item index="2-4">科技</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">分类产品</el-menu-item>
          <el-menu-item index="4">关于我们</el-menu-item>
          <el-menu-item index="5">联系我们</el-menu-item>
        </el-menu>
        </div>
      </div>

      <div class='navbar-action'>
        <i class="el-icon-search"></i>
        <div>
          <el-button size='mini' class='btn-common btn-login' @click='goToLogin'>登录</el-button>
          <el-button size='mini' class='btn-common' @click='goToRegister'>注册</el-button>
        </div>
        <div class='navbar-user'>
          <el-menu class="el-menu-demo" mode="horizontal" popper-class='navbar-user-box'>
              <el-submenu index="1">
                <template slot="title">
                  <img src='@/assets/icon.jpg' class='userImg'/>
                  <span class='username'>我的工作台</span>
                </template>
                <el-menu-item index="1-1">个人中心</el-menu-item>
                <el-menu-item index="1-2">退出登录</el-menu-item>
              </el-submenu>
          </el-menu>
        </div>
        <el-button size='mini' class='btn-send' @click="submitContribute">
          <i class='el-icon-edit-outline'></i>投稿
        </el-button>
      </div>

    </div>
    <Login ref='loign'></Login>
    <Register ref='register'></Register>
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
  data(){
    return {
      activeIndex: '1'
    }
  },
  methods:{
    goToLogin(){
        this.$refs.loign.handleOpen()
    },
    goToRegister(){
        this.$refs.register.handleOpen()
    },
    submitContribute(){
      this.$router.push({path: '/contribute'})
    }
  }
}
</script>
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

</style>
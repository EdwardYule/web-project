<template>
  <div class='basic-box'>
    <div class='member-account-nav'>
        <div class='member-account-user'>
          <img class='member-account-avatar' :src="$store.state.userInfo.avatarUrl+''" :onerror='errorImg'/>
          <div class='member-account-name'>{{$store.state.userInfo.userName}}</div>
          <div class='member-account-dio'>{{$store.state.userInfo.desc}}</div>
          <el-button class='member-account-tg' size='medium' @click='gotoRouter("contribute")'><i class="iconfont icon-yongyan" style="margin-right: 10px;"></i> 投稿</el-button>
        </div>
        <div class='member-account-menu'>
          <el-tabs v-model="activeName" tab-position="left" @tab-click="tabClick" style="height: 200px;">
            <el-tab-pane name='1'>
               <span slot="label">
                <i class="iconfont icon-xiugaitouxiang styleIconfont"></i>
                基本资料
              </span>
            </el-tab-pane>
            <el-tab-pane name='2'>
              <span slot="label"><i class="iconfont icon-tongzhi styleIconfont"></i>系统通知</span>
            </el-tab-pane>
            <el-tab-pane name='3'>
              <span slot="label"><i class="iconfont icon-xiugaimima styleIconfont"></i>修改密码</span>
            </el-tab-pane>
            <el-tab-pane name='4'>
              <span slot="label"><i class="iconfont icon-tuichu styleIconfont"></i>退出登录</span>
            </el-tab-pane>
          </el-tabs>
        </div>
    </div>
    <div class='member-account-content'>
        <step1 v-show='activeName==1'></step1>
        <step2 v-show='activeName==2'></step2>
        <step3 v-show='activeName==3'></step3>
    </div>
  </div>
</template>

<script>
import step1 from './components/basic.vue'
import step2 from './components/notice.vue'
import step3 from './components/changePwd.vue'
export default {
  components:{
    step1,
    step2,
    step3
  },
  data(){
    return{
      activeName:'1',
      errorImg:'this.src="'+require('@/assets/icon.jpg')+'"'
    }
  },
  watch: {
    '$route':'routeChange'
  },
  mounted() {
    this.routeChange()
  },
  methods:{
    // 监听路由方法
    routeChange(){
      this.activeName = this.$route.query.index||'1'
    },
    // 路由跳转
    gotoRouter(name){
      this.$router.push({name})
    },
    // tab点击
    async tabClick() {
      if(this.activeName == 4) {
        let res = await this.$api.system.logout()
        if(res.code == 0) {
          localStorage.removeItem('userInfo')
          localStorage.removeItem('userToken')
          this.$router.push('home')
          window.location.reload()
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
@member-el-bg-color:#fff;
@font-color:rgb(38,38,38);
.basic-box{
   max-width: 1200px;
    width: 80%;
    margin: 0 auto;
    padding: 84px 0 20px;
    display: flex;
    min-height: calc(100vh - 160px);
    .member-account-nav{
      width: 300px;
      flex-shrink: 0;
      .member-account-menu{
          background: #fff;
          /deep/.el-tabs__header{
            width: 100%;
            .el-tabs__active-bar{
              right: auto;
              left: 0;
              height: 50px !important;
            }
            .el-tabs__item{
              text-align: left;
              height: 50px;
              line-height: 50px;
              padding: 0 24px;
              border-bottom:1px solid rgba(38,38,38,0.07);
              box-sizing: border-box;
            }
          }
          .styleIconfont{
            margin-right:15px;
            font-weight: 900;
          }
      }
      .member-account-user{
        padding: 50px 40px;
        margin-bottom: 20px;
        background: #fff;
        text-align: center;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
        .member-account-avatar{
            width: 88px;
            height: 88px;
            border-radius: 50%;
            margin: 0 auto 15px;
        }
        .member-account-name{
            color:@font-color;
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            margin-bottom: 10px;
        }
        .member-account-dio{
          font-size: 14px;
          color:rgba(38,38,38,0.6);
        }
        .member-account-tg{
          width: 100%;
          background: rgb(32,107,231);
          color: #fff;
          border:1px solid rgb(32,107,231);
            margin-top:30px;
        }
      }
    }
    .member-account-content{
      width: 100%;
      // padding: 20px 40px;
      margin-left: 20px;
      background: @member-el-bg-color;
      -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,6%);
      box-shadow: 0 0 0 1px rgba(0,0,0,6%);
      font-size: 14px;
    
    }
}
@media screen and (max-width:1200px){
  .basic-box  {
    width:90%;
  }
}
@media screen and (max-width:1024px){
  .basic-box  {
    .member-account-nav{
      width: 250px;
    }
  }
}
@media screen and (max-width:768px){
  .basic-box  {
   width: 100%;
   .member-account-content{
    margin-left: 0;
   }
   .member-account-nav{
    width: 80px;
    .styleIconfont{
      display: none;
    }
    .member-account-menu{
        /deep/.el-tabs__header {
          .el-tabs__item{
            padding: 10px 10px 10px 12px;
            font-size: 13px;
            line-height: 21px;
            white-space: nowrap;
            height: auto;
          }
          .el-tabs__active-bar{
            height: 42px !important;
          }
        }
        /deep/.el-tabs__nav-wrap.is-left{
          margin-right: -5px;
        }
    }
    .member-account-user{
      padding: 20px 10px;
      margin-bottom: 0;
      box-shadow: none;
      background: 0 0;
      .member-account-avatar{
        width: 48px;
        height: 48px;
        margin: 0 auto 6px;
      }
      .member-account-name{
        font-size: 13px
      }
      .member-account-dio,.member-account-tg{
        display: none;
      }
    }
   }
  }
}
</style>
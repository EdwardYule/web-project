<template>
  <div class='basic-box'>
    <div class='member-account-nav'>
        <div class='member-account-user'>
          <img src='@/assets/icon.jpg' class='member-account-avatar'/>
          <div class='member-account-name'>xxxxxxxxxxx</div>
          <div class='member-account-dio'>这个人很懒，什么都没有留下～</div>
          <el-button class='member-account-tg' size='medium'>投稿</el-button>
        </div>
        <div class='member-account-menu'>
          <el-tabs v-model="activeName" tab-position="left" style="height: 200px;">
            <el-tab-pane label="基本资料" name='1'></el-tab-pane>
            <el-tab-pane label="系统通知" name='2'></el-tab-pane>
            <el-tab-pane label="修改密码" name='3'></el-tab-pane>
            <el-tab-pane label="退出登录" name='4'></el-tab-pane>
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
      activeName:'1'
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
    .member-account-nav{
      width: 300px;
      flex-shrink: 0;
      .member-account-menu{
          background: #fff;
      }
      .member-account-user{
        padding: 50px 40px;
        margin-bottom: 20px;
        background: #fff;
        text-align: center;
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
      padding: 20px 40px;
      margin-left: 20px;
      background: @member-el-bg-color;
      -webkit-box-shadow: 0 0 0 1px rgba(0,0,0,6%);
      box-shadow: 0 0 0 1px rgba(0,0,0,6%);
      font-size: 14px;
    
    }
}
</style>
<template>
<div>
  <div class='member-account-title'>帐号绑定</div>
  <div class='member-account-step'>
    <el-steps :active="active">
      <el-step title="验证方式"></el-step>
      <el-step title="安全验证"></el-step>
      <el-step title="绑定账号"></el-step>
    </el-steps>

    <div class="form-wrapper">
        <!-- 验证方式 -->
        <el-form label-position="left" label-width="120px" :model="formLabelAlign">
          <div v-if="active == 0" >
            <el-form-item label="选择验证方式">
                <el-select v-model="formLabelAlign.way" placeholder="请选择验证方式">
                   <el-option v-for="(item, index) in selectData" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
          </div>
          <!-- 验证方式 -->

          <!-- 安全验证 -->
          <div  v-if="active == 1" >
            <div v-if="isShowMes" class='member-account-alert'>
              <i class="el-icon-error"></i>
              <span>{{mesContent}}</span>
              <i class='el-icon-close' @click="(isShowMes = !isShowMes)" style="cursor: pointer;" />
            </div>
            <el-form-item label="电子邮箱">
                <div>{{userInfo.email}}</div>
                <div class='form-email-box'>
                  <el-input v-model="formLabelAlign.code" placeholder="请输入验证码"></el-input>
                  <el-button class='send-code' :loading="loading" :disabled="isDisabled" @click="sendEmail()">{{codeContent}}</el-button>
                </div>
            </el-form-item>
          </div>
          <!-- 安全验证 -->

          <!-- 绑定账号 -->
          <div v-if="active == 2">33</div>
          <!-- 绑定账号 -->
        </el-form>
    </div>

    <el-button class='next-btn' @click="next">下一步</el-button>
  </div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        userInfo: JSON.parse(localStorage.userInfo),
        mesContent: '验证码错误',
        isShowMes: false,
        isDisabled: false,
        loading: false,
        codeContent: '发送验证码',
        selectData: [{label: '电子邮箱', value: 0}], 
        formLabelAlign:{
          way:0
        }
      };
    },

    methods: {
      async next() {
        // 验证码验证
        if(this.active == 1) {
          if(this.formLabelAlign.code == null || this.formLabelAlign.code == '') {
            this.isShowMes = true
            this.mesContent = '验证码不能为空'
            return;
          }
          let params = {
            code: this.formLabelAlign.code,
            email: this.userInfo.email,
            scene: 'change_bind'
          }
          let res = await this.$api.basicInfo.verificationCode(params)
          if(!res.object){
            this.isShowMes = true
            this.mesContent = '验证码错误'
            return 
          } else {
            this.isShowMes = false
          }
        }
        if (this.active++ > 2) this.active = 0;
      },
      // 发送邮箱验证码
      async sendEmail() {
        this.loading = true
        let params = {
          email: this.userInfo.email,
          scene: 'change_bind'
        }
        let res = await this.$api.basicInfo.emailVerification(params)
        this.loading = false
        if(res.object.result == 1) {
          this.isDisabled = true
          this.countDown()
        } else {
          this.$message.error('邮箱验证码发送失败');
        }
      },
      countDown() {
        let index = 60
        let countDown = setInterval(() => {
          --index
          this.codeContent = index + 's 后重试'
          if(index == 0) {
            clearInterval(countDown)
            this.codeContent = '发送验证码'
            this.isDisabled = false
          }
        }, 1000)
        
      }
    }
  }
</script>
<style scoped lang='less'>
.member-account-title{
  padding:20px 40px;
  font-size: 18px;
  border-bottom:1px solid #f0f0f0;
}
.member-account-step{
  padding: 30px 40px;
  /deep/ .el-step__head{
    .el-step__icon{
      width: 34px;
      height: 34px;
      background: #bdbdbd;
      color:#fff;
      border: 2px solid #b2b2b2;
    }
    .el-step__line{
      top:15px;
    }
  }
  /deep/ .el-step__head.is-finish .el-step__line{
    background: rgb(32,107,231);
  }
   /deep/ .el-step__main{
      .el-step__title{
        font-size: 14px;
        font-weight: 500;
        color:rgba(38,38,38,0.6)
      }
      .el-step__title.is-process,
      .el-step__title.is-finish{
        color:rgb(32,107,231)
      }
   }
 
  /deep/ .el-step__head.is-process,
  /deep/ .el-step__head.is-finish{
    .el-step__icon{
      background: rgb(32,107,231);
      border: 2px solid #2166da;
    }
  }
  .form-wrapper{
    margin-top:30px;
    .member-account-alert{
      background-color: #fee;
      border-color: #ffe9e9;
      color: #fa5555;
      font-size: 14px;
      padding: 12px 15px;
      border-radius: 4px;
      margin-bottom: 20px;
      .el-icon-error{
        margin-right: 5px;
      }
      .el-icon-close{
        float: right;
        line-height: 20px;
      }
    }
    /deep/ .el-input__inner,
    /deep/ .el-form-item__label{
      line-height:40px;
      height:40px;
    }
    /deep/.el-select {
      width: 100%;
    }
    .form-email-box{
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
    }
    .send-code{
      width: 120px;
      margin-left: 15px;
    }
  }
  .next-btn{
    background: #206be7;
    color:#fff;
    margin-left: 120px;
  }
}
@media screen and (max-width:768px){
   .member-account-title{
      padding: 20px 15px;
      font-size: 18px;
    }
    .member-account-step{
      padding: 20px 15px;
      /deep/ .el-step__head{
      .el-step__icon{
          width: 30px;
          height: 30px;
        }
      }
      /deep/.el-step__main {
        .el-step__title{
            font-size: 12px;
        }
        
      }
      .el-form-item{
      margin-bottom: 15px;
      /deep/.el-form-item__label{
        width: 100%;
      }
      /deep/.el-form-item__content{
        margin-left: 0 !important;
      }
      
     }
    }
    
}
</style>
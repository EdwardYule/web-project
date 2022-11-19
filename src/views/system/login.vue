<template>
  <div class='login-box'>
    <el-dialog
        :visible.sync="dialogVisible"
        width="410px"
        :show-close='false'
        class='login-dialog'
        :modal-append-to-body='false'
        :before-close="handleClose">
        <div>
          <div class='login-close' @click='handleClose'>
            <i class="el-icon-close"></i>
          </div>
          <img src='@/assets/logo.jpg' class='member-form-head'/>
          <div class='member-form-title'>
            <span class='login-word'>登录</span>
            <span>还没有帐号？立即注册</span>
          </div>
          <div>
            <el-form :model="formLabelAlign" ref='formLabelAlign' size="large" :rules="rules">
                <el-form-item prop='userName'>
                  <el-input
                    v-model="formLabelAlign.userName"
                    placeholder="请输入用户名/电子邮箱"
                  >
                  <template slot="prepend">
                    <i class="el-icon-user"></i>
                  </template>
                  </el-input>
                </el-form-item>
                <el-form-item class='login-password' prop='pass'>
                  <el-input
                    v-model="formLabelAlign.pass"
                    placeholder="请输入登录密码"
                    type="password"
                  >
                  <template slot="prepend">
                    <i class="el-icon-lock"></i>
                  </template>
                  <template slot="append">
                    <i class="el-icon-view"></i>
                  </template>
                  </el-input>
                </el-form-item>
                <div class='login-forget'>
                  <span>
                    <el-checkbox v-model="checked">记住我的登录状态</el-checkbox>
                    </span>
                  <span class='forget-word'>忘记密码？</span>
                </div>
                <el-button class='login-btn' type="primary" @click="onSubmit('formLabelAlign')">登录</el-button>
        </el-form>
          </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
       dialogVisible:false,
       formLabelAlign:{},
       checked:false,
       rules:{
        userName:[{required: true, trigger: "blur",message:'请输入' }],
        pass: [{required: true, trigger: "blur" ,message:'请输入'}]
       }
    }
  },
  methods:{
    handleOpen(){
       this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible = false
    },
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
}
</script>

<style scoped lang='less'>
.login-box{
  .login-dialog{
    /deep/.el-dialog__header{
        padding:0;
    }
    /deep/.el-dialog__body{
          padding: 50px 25px;
    }
    /deep/.el-input-group__prepend,/deep/.el-input-group__append{
      background: #fff;
      padding:0 5px;
      font-size: 16px;
      width: 46px;
      text-align: center;
    }
    /deep/.el-form-item.is-error .el-input-group__prepend,
    /deep/.el-form-item.is-error .el-input-group__append{
      border-color: #F56C6C;
    }
    /deep/.el-input__inner{
      border-left: 0;
      padding:0
    }
    /deep/.el-checkbox__input.is-checked+.el-checkbox__label{
      color:rgb(96,98,102)
    }
    .login-close{
       position: absolute;
      top: -30px;
      color: #fff;
      font-size: 20px;
      right: 0;
      width: 50px;
      height: 20px;
      cursor: pointer;
      text-align: right;
    }
    .member-form-head{
      width: 40px;
      margin: 0 auto 40px;
      display: block;
    }
    .login-password /deep/.el-input__inner{
      border-right:0 ;
    }
    .login-btn{
      height: 40px;
      background:rgb(32,107,231);
      width: 100%;
      font-size: 14px;
    }
    .login-forget{
      margin: 10px 0 20px;
      display: flex;
      justify-content: space-between;
      .forget-word{
        color:rgb(32,107,231)
      }
    }
    .member-form-title{
        margin: 0 0 30px;
        justify-content: space-between;
        display: flex;
        .login-word{
            font-size: 16px;
        }
    }
  }
}
</style>
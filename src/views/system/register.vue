<template>
  <div class='login-box'>
    <el-dialog
        :visible.sync="dialogVisible"
        width="410px"
        :show-close='false'
        class='login-dialog'
         :modal-append-to-body='false'
         :close-on-click-modal="false"
        :before-close="handleClose">
        <div>
          <div class='login-close' @click='handleClose'>
            <i class="el-icon-close"></i>
          </div>
          <div class='no-register'>目前暂未开放用户注册</div>
          <img :src='$store.state.logo' class='member-form-head'/>
          <div class='member-form-title'>
            <span class='login-word'>注册</span>
            <span>已经有账号？<span  @click='goToLogin' class='forget-word'>马上登录</span></span>
          </div>
          
          <div>
            <div>
              <el-alert v-if="isShowError" :title="contentTitle"  type="error"  style="margin: 15px 0px;" show-icon></el-alert>
            </div>
            <el-form :model="formLabelAlign" ref='formLabel' size="large" :rules="rules">
                <el-form-item prop='userName'>
                  <el-input
                    v-model="formLabelAlign.userName"
                    placeholder="请输入用户名"
                  >
                  <template slot="prepend">
                    <i class="el-icon-user"></i>
                  </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop='email'>
                  <el-input
                    v-model="formLabelAlign.email"
                    placeholder="请输入电子邮箱"
                  >
                  <template slot="prepend">
                    <i class="el-icon-message"></i>
                  </template>
                  </el-input>
                </el-form-item>
                <el-form-item class='login-password' prop='pass'>
                  <el-input
                    v-model="formLabelAlign.pass"
                    placeholder="请输入登录密码"
                    :type="passType ? 'password': 'text'"
                  >
                  <template slot="prepend">
                    <i class="el-icon-lock"></i>
                  </template>
                  <template slot="append">
                    <i class="el-icon-view" @click="(passType = !passType)" :style="{cursor: 'pointer',color: passType?'#909399': '#206be7'}"></i>
                  </template>
                  </el-input>
                </el-form-item>
                 <el-form-item class='login-password' prop='confirmPass'>
                  <el-input
                    v-model="formLabelAlign.confirmPass"
                    placeholder="请确认登录密码"
                    :type="confirmPassType ? 'password': 'text'"
                  >
                  <template slot="prepend">
                    <i class="el-icon-lock"></i>
                  </template>
                  <template slot="append">
                    <i class="el-icon-view" @click="(confirmPassType = !confirmPassType)" :style="{cursor: 'pointer',color: confirmPassType?'#909399': '#206be7'}"></i>
                  </template>
                  </el-input>
                </el-form-item>
                <el-button class='login-btn' type="primary" @click="onSubmit('formLabel')">提交注册</el-button>
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
       formLabelAlign:{
        userName:'',
        email: '',
        pass: '',
        confirmPass: ''
       },
       checked:false,
       contentTitle: '',
       isShowError: false,
       passType: true,
       confirmPassType: true,
       rules:{
        userName:[{required: true, trigger: "blur",message:'请输入用户名' }],
        email:[
          {required: true, trigger: "blur" ,message:'请输入电子邮箱'},
          { required: true, validator: this.checkEmail, trigger: "blur" }
        ],
        pass: [{required: true, trigger: "blur" ,message:'请输入登录密码'}],
        confirmPass:  [{required: true, trigger: "blur" ,message:'请确认登录密码'}]
       },

       isHead: 0
    }
  },
  methods:{
    // 打开当前组件
    handleOpen(val){
      this.isHead = val

      this.formLabelAlign = {}
       this.dialogVisible = true
    },
    // 关闭当前组件
    handleClose(){
      this.$refs.formLabel.resetFields()
      this.dialogVisible = false
    },
    // 跳转到登录
    goToLogin(){
      this.dialogVisible = false
      this.$emit('goToLogin', true)
    },
    // 校验邮箱
    checkEmail(rule, value, callback) {
        let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;            
        if (emailReg.test(value) || value == '') {
              return callback();                
        } else {
              callback(new Error("邮箱格式错误"));
        }
    },
    // 提交注册
    onSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 校验密码是否一致
            const {pass,confirmPass, email, userName} = this.formLabelAlign
            if(pass == confirmPass){
              // 校验密码长度
              if(pass.length >= 6 && pass.length <= 32) {
                // 发送注册请求
                let params = {
                  email,
                  password: pass,
                  userName
                }
                let res = await this.$api.system.register(params)

                const _that =  res.object
                this.$store.commit('setUserInfo', _that)
                this.$store.commit('setToken', _that.userToken)
                localStorage.userToken = _that.userToken
                localStorage.userInfo = JSON.stringify(_that)
                this.handleClose()

                 // 几种不同登录情况
                // this.isHead == 2 //头部打开
                // type == 1 //头部投稿点击
                // path //其他需要返回页面
                const {path, query, type} = this.$route.query
                if(this.isHead == 2) {
                  this.$router.go(0)
                }else if(path){
                  this.$router.push({path,query}) 
                }else if(type == 1){
                  this.$router.push('/contribute') 
                }else{
                  this.$router.push('/home') 
                }

              } else {
                this.isShowError = true
                this.contentTitle = '密码必须为6~32个字符'
              }
            } else {
              this.isShowError = true
              this.contentTitle = '两次密码输入不一致'
            }
          } else {
            return false;
          }
        });
    }
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
    .no-register{
      background-color: #fff6e6;
      border-color: #fff4e1;
      color: #ffa400;
      padding: 12px 15px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 3px;
      overflow: hidden;
      text-align: center;
    }
    /deep/.el-input-group__prepend,/deep/.el-input-group__append{
      background: #fff;
      padding:0 5px;
      font-size: 16px;
      width: 46px;
      text-align: center;
    }
    /deep/.el-form-item.is-error .el-input-group__prepend,
    /deep/.el-form-item.is-error .el-input-group__append,
    /deep/.el-form-item.is-error .el-input__inner:focus{
      border-color: #F56C6C;
    }
    /deep/.el-input__inner{
      border-left: 0;
      padding:0
    }
     /deep/.el-input__inner:focus{
      border-color: #DCDFE6
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
    .forget-word{
        color:rgb(32,107,231);
        cursor: pointer;
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
@media screen and (max-width:768px){
  .login-box {
  .login-dialog{
    /deep/.el-dialog{
      width: calc(100vw - 40px) !important;
      max-width: 410px;
      margin-top: 10vh !important;
       .el-dialog__body{
          padding: 20px;
        }
      .member-form-head{
        margin: 0 auto 15px;
      }
      .member-form-title{
        margin: 0 0 15px;
      }
      /deep/.el-form{
        .el-form-item{
          margin-bottom: 15px;
        }
      }
    
    }}
  }
}
</style>
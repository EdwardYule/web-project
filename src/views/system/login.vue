<template>
  <div class='login-box'>
    <el-dialog
        :visible.sync="dialogVisible"
        width="410px"
        :show-close='false'
        class='login-dialog'
        :modal-append-to-body='false'
        :close-on-click-modal="false"
        :modal='isModal'
        top='20vh'
        :before-close="handleClose">
        <div>
          <div class='login-close' @click='handleClose' v-if='isShowClose'>
            <i class="el-icon-close"></i>
          </div>
          <img :src='$store.state.logo' class='member-form-head'/>
          <div class='member-form-title'>
            <span class='login-word'>登录</span>
            <span>还没有帐号？<span @click="goToRegister" class='forget-word'>立即注册</span></span>
          </div>
          <div>
            <el-form :model="formLabelAlign" ref='formLabelAlign' size="large" :rules="rules">
                <el-form-item prop='userName'>
                  <el-input
                    v-model="formLabelAlign.userName"
                    placeholder="请输入电子邮箱"
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
  props:{
    isShowClose:{
      type:Boolean,
      default:true
    },
    isModal:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
       dialogVisible:false,
       formLabelAlign:{
        userName: '',
        pass: ''
       },
       checked:false,
       confirmPassType: true,
       rules:{
        userName:[
          {required: true, trigger: "blur" ,message:'请输入电子邮箱'},
          { required: true, validator: this.checkEmail, trigger: "blur" }
        ],
        pass: [{required: true, trigger: "blur" ,message:'请输入登录密码'}]
       },

       isHead: 0
    }
  },
  mounted() {
    
  },
  methods:{
    // 打开当前组件
    handleOpen(val){
      this.isHead = val
      this.formLabelAlign = {
        userName: '',
        pass: ''
      }
      this.dialogVisible = true
      if(localStorage.accountPassword) {
        let accountPassword = JSON.parse(localStorage.accountPassword)
        this.formLabelAlign = accountPassword
        this.checked = true
      }
    },
    // 关闭当前组件
    handleClose(){
      this.$refs.formLabelAlign.resetFields()
      this.dialogVisible = false
    },
    // 跳转到注册
    goToRegister(){
      this.$emit('goToRegister', true)
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
    // 登录
    onSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const {userName, pass} = this.formLabelAlign
            let params = {
              email:userName,
              password: pass
            }
            let res = await this.$api.system.login(params)

            const _obj = res.object
            this.$store.commit('setUserInfo', _obj)
            this.$store.commit('setToken', _obj.token)
            localStorage.userToken = _obj.token
            localStorage.userInfo = JSON.stringify(_obj)
            if(this.checked) {
              localStorage.accountPassword = JSON.stringify({
                userName,
                pass
              })
            } else {
              localStorage.removeItem('accountPassword')
            }
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
    /deep/.el-form-item.is-error .el-input-group__append,
    /deep/.el-form-item.is-error .el-input__inner:focus{
      border-color: #F56C6C;
    }
    /deep/.el-input__inner{
      border-left: 0;
      padding:0
    }
    //
    /deep/.el-input__inner:focus,/deep/.el-input-group__prepend{
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
    .login-forget{
      margin: 10px 0 20px;
      display: flex;
      justify-content: space-between;
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
  .login-dialog{
    overflow: hidden;
    /deep/.el-dialog{
      width: 100vw !important;
      height: 100vh !important;
      margin-top:0 !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    /deep/.el-dialog__body{
      width: 100%;
    }
  }
}
</style>
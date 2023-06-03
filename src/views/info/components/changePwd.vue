<template>
  <div>
    
      <div class='member-account-title'>修改密码</div>
      <div class='member-account-form'>
        <div v-if="isShowMes" class='member-account-alert'>
          <i class="el-icon-circle-check"></i>
          <span>更新成功</span>
          <i class='el-icon-close' @click="(isShowMes = !isShowMes)" style="cursor: pointer;" />
        </div>
        <el-form label-position="top" label-width="80px" ref='formLabelAlign' :model="formLabelAlign" :rules="rules">
          <el-form-item label="原密码" prop="oldPsd">
            <el-input v-model="formLabelAlign.oldPsd" type="password" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="newPsd">
            <el-input v-model="formLabelAlign.newPsd" type="password" placeholder="请输入新密码"></el-input>
            <span class='member-remark'>密码长度为6～32位</span>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confimNewPass">
            <el-input v-model="formLabelAlign.confimNewPass" type="password" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
        <el-button class='save' @click="saveSetting">保存设置</el-button>
      </div>
   
  </div>
</template>

<script>
export default {
  data(){
    return{
      formLabelAlign: {
          oldPsd: '',
          newPsd: '',
          confimNewPass: ''
      },
      isShowMes: false,
      rules:{
        oldPsd:[{required: true, trigger: "blur",message:'请输入原密码' }],
        newPsd: [
          {required: true, trigger: "blur" ,message:'确认新密码不能为空'},
          { required: true, validator: this.checkPass, trigger: "blur" }
          
        ],
        confimNewPass:  [
          {required: true, trigger: "blur" ,message:'确认新密码不能为空'},
          { required: true, validator: this.checkPass, trigger: "blur" }
        ]
       }
    }
  },
  mounted() {

  },
  methods: {
    // 保存设置
    async saveSetting() {
      this.$refs['formLabelAlign'].validate(async (valid) => {
        if (valid) {
            let params = {
              newPassword: this.formLabelAlign.newPsd,
              oldPassword: this.formLabelAlign.oldPsd
            }
            let res = await this.$api.basicInfo.updataPass(params)
            if(res.object){
              this.isShowMes = true
              this.formLabelAlign = {
                  oldPsd: '',
                  newPsd: '',
                  confimNewPass: ''
              }
            }
        } else {
            return false;
          }
      })
    },
    // 校验密码长度
    checkPass(rule, value, callback) {  
        if(value.length >= 6 && value.length <= 32) {   
          return callback();                 
        } else {
            callback(new Error("密码必须为6~32个字符"));
        }
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
.member-account-alert{
    background-color: #eaf7e6;
    border-color: #e7f6e2;
    color: #29ad00;
    font-size: 14px;
    padding: 12px 15px;
    border-radius: 4px;
    margin-bottom: 20px;
    .el-icon-circle-check{
      margin-right: 5px;
    }
    .el-icon-close{
      float: right;
      line-height: 20px;
    }
  }
.member-account-form{
  padding: 30px 40px;
  .save{
    background: #206be7;
    color:#fff;
  }
  /deep/.el-form-item{
    margin-bottom: 30px;
  }
   /deep/ .el-input__inner{
    line-height:40px;
    height:40px;
  }
   .member-remark{
    color:rgba(38,38,38,0.6);
    font-size: 14px;
  }
}
@media screen and (max-width:768px){
    .member-account-title{
      padding: 20px 15px;
      font-size: 18px;
    }
    .member-account-form{
      padding: 20px 15px;
    
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
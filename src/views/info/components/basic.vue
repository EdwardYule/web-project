<template>
  <div>
    <div v-if='isShow'>
    <div class='member-account-title'>基本资料</div>
    <div class='member-account-form'>
      <div v-if="isShowMes" class='member-account-alert'>
        <i class="el-icon-circle-check"></i>
        <span>更新成功</span>
        <i class='el-icon-close' @click="(isShowMes = !isShowMes)" style="cursor: pointer;"/>
      </div>
      <el-form label-position="left" label-width="120px" :model="formLabelAlign">
        <el-form-item label="电子邮箱">
          <div>
              {{formLabelAlign.email}}
               <span class='edit-email' @click='edit'>编辑</span>
              <span class='member-remark'>仅自己可见</span>
          </div>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="个人说明">
          <el-input type="textarea" resize='none' v-model="formLabelAlign.desc"></el-input>
          <span class='member-remark'>可选，个人说明不超过200个字符</span>
        </el-form-item>
        <el-form-item>
          <el-button class='save' @click="saveSetting()">保存设置</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
     <BindAccount v-else></BindAccount>
  </div>
</template>

<script>
import BindAccount from './bindAccount.vue'
export default {
  components:{
    BindAccount
  },
  data(){
    return{
      isShow:true,
      formLabelAlign: {
          email: '',
          name: '',
          desc: ''
      },
      isShowMes: false,
      userInfo: JSON.parse(localStorage.userInfo)||{},
    }
  },
  mounted() {
    if(this.userInfo){
      const {email, userName, desc } = this.userInfo
       this.formLabelAlign = {
          email,
          name: userName,
          desc
       }
    }
   
  },
  methods:{
    edit(){
      this.isShow=false
    },
    // 保存设置
    async saveSetting() {
      const {name, desc} = this.formLabelAlign
      let params = {
        userName: name,
        desc
      }
      let res = await this.$api.basicInfo.updateUserInfo(params)
      if(res.object){
        this.userInfo.userName = name
        this.userInfo.desc = desc
        this.$store.commit('setUserInfo', this.userInfo)
        localStorage.userInfo = JSON.stringify(this.userInfo)
      }
      this.isShowMes = true
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
.member-account-form{
  padding: 30px 40px;
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
  /deep/ .el-input__inner{
    line-height:40px;
    height:40px;
  }
  /deep/.el-form-item{
    margin-bottom: 30px;
  }
  .edit-email{
    color:rgb(32,107,231);
    margin:0 20px;
    cursor: pointer;
  }
  .save{
    background: #206be7;
    color:#fff;
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
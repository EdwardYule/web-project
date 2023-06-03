<template>
  <el-upload
  class="avatar-uploader"
  :action="uploadAction"
  :show-file-list="false"
  :headers='headers'
  :on-success="handleAvatarSuccess"
  accept=".jpg,.jpeg,.png"
  :before-upload="beforeAvatarUpload">
    <img v-if="showImgUrl && showImgUrl != ''" :src="showImgUrl" class="avatar">
    <slot></slot>
</el-upload>
</template>
<script>
  export default {
    props:{
      isLtM:{
        type:Number,
        default:2
      },
      imageUrl:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        uploadAction:'',
        headers:{},

        showImgUrl: ''
      };
    },
    mounted(){
      this.showImgUrl = this.imageUrl || ''
      this.uploadAction = process.env.VUE_APP_API_BASE_URL + '/file/upload'
      this.headers = {userToken: localStorage.userToken}
    },
    methods: {
      handleAvatarSuccess(res) {
        if(res.code == 0){
          this.showImgUrl = res.object.imgUrl
          this.$emit('handleSuccess',this.showImgUrl)
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < this.isLtM;

        if (!isLt2M) {
          this.$message.error(`上传图片大小不能超过${this.isLtM}MB!`);
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    cursor: pointer;
    width: 100%;
  }
  .avatar {
    width: 142px;
    height: 142px;
    display: block;
  }
</style>

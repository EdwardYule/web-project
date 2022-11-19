<template>
  <div class='contribute'>
    <div class='wrap-box'>
       <el-form :model="ruleForm" status-icon :rules="rules" size='medium' ref="ruleForm" label-width="80px" class="demo-ruleForm">
         <div class='wrap-box-left'>
              <el-form-item label="标题" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" placeholder="在此输入标题"></el-input>
              </el-form-item>
              <el-form-item label="摘要" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" placeholder="摘要可选填"></el-input>
              </el-form-item>
              <el-form-item label="正文" prop="desc1">
                <QuillEditor></QuillEditor>
              </el-form-item>
         </div>
        <div class='wrap-box-right'>
          <el-button type="primary" class='btn-primary' @click="submitForm('ruleForm')">提交发布</el-button>
          <div class='box-right-item'>
            <div class='box-right-item-title'>分类</div>
            <div class='box-right-item-content'>
              <div>222222</div>
              <div>222222</div>
              <div>222222</div>
              <div>222222</div>
            </div>
          </div>
          <div class='box-right-item'>
            <div class='box-right-item-title'>标签</div>
            <div class='box-right-item-content'>
              <el-form-item label="" prop="desc1" class='no-has-label'>
                <el-input type="textarea" v-model="ruleForm.desc1" resize='none'></el-input>
                <div class="box-right-item-notice">即文章关键词，使用回车换行键确定，可选填</div>
              </el-form-item>
            </div>
          </div>
          <div class='box-right-item'>
            <div class='box-right-item-title'>缩略图</div>
            <div class='box-right-item-content'>
              <div class='box-right-set'>设置缩略图片</div>
              <div class="box-right-item-notice">文章缩略图会显示在文章列表，建议设置一下缩略图</div>
            </div>
          </div>
        </div>
         </el-form>
    </div>
  </div>
</template>

<script>
import QuillEditor from './components/quillEditor.vue'
export default {
  components:{
    QuillEditor
  },
  data(){
    return{
      ruleForm:{},
      rules:{}
    }
  },
  methods:{
    submitForm(){}
  }
}
</script>

<style scoped lang='less'>
@theme-color:rgb(32,107,231);
  .contribute{
    padding-top: 64px;
    .wrap-box{
      min-height: calc(100vh - 264px);
      max-width: 1200px;
      width: 80%;
      margin: 20px auto;
      padding: 20px 20px 20px 0;
      background: #fff;
      .demo-ruleForm{
        display: flex;
      }
      .wrap-box-left{
        width: 100%;
        /deep/.el-input__inner{
          border: 1px solid rgba(38,38,38,0.2);
        }
      }
      .wrap-box-right{
        width: 260px;
        margin-left: 20px;
        flex-shrink: 0;
        .btn-primary{
          background: @theme-color;
          border-color: @theme-color; 
          width: 100%;
          padding: 11px 20px;
          font-size: 14px;
          margin-bottom: 20px;
        }
        .box-right-item{
            margin-bottom: 20px;
            border: 1px solid rgba(38,38,38,0.07);
            .box-right-item-title{
                margin: 0;
                padding-left: 10px;
                font-size: 15px;
                font-weight: 400;
                line-height: 30px;
                color:rgb(38,38,38);
                background: rgba(38,38,38,0.07);
            }
            .box-right-item-content{
              padding: 15px;
              .box-right-item-notice{
                margin: 5px 0 0;
                font-size: 13px;
                color: rgba(38,38,38,0.6);
                line-height: 25px;
              }
              .box-right-set{
                color:rgb(32,107,231);
                font-size: 14px;
              }
            }
            .no-has-label{
               margin-bottom:0;
              /deep/.el-form-item__content{
                margin-left: 0 !important;
               
              }
            }
        }
      }
    }
  }
</style>
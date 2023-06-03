<template>
  <div class='contribute'>
    <div class='wrap-box'>
      <!-- <div class='success-alert' v-if='pulicSuccess'>
        <div>提交成功！您可以<a @click='gotoRouter("detail")'>点击此处</a>查看预览或者<a @click='gotoRouter("infoCenter")'>返回我的文章列表</a>。</div>
        <i class="el-icon-close" @click='pulicSuccess=false'></i>
      </div> -->
       <el-form :model="ruleForm" status-icon :rules="rules" size='medium' 
       :hide-required-asterisk='true'
       ref="ruleForm" label-width="40px" class="demo-ruleForm">
         <div class='wrap-box-left'>
              <el-form-item label="标题" prop="articleTitle">
                <el-input type="text" v-model="ruleForm.articleTitle" placeholder="在此输入标题"></el-input>
              </el-form-item>
              <el-form-item label="摘要" prop="articleDesc">
                <el-input type="textarea" v-model="ruleForm.articleDesc" placeholder="摘要可选填"></el-input>
              </el-form-item>
              <el-form-item label="正文" prop="articleContent">
                  <quill-editor
                  class="editor"
                    ref="myQuillEditor"
                    v-model="ruleForm.articleContent"
                  />
              </el-form-item>
         </div>
        <div class='wrap-box-right'>
          <el-button type="primary" class='btn-primary pc-btn' @click="submitForm('ruleForm')">{{isUpdate ? '提交更新' : '提交发布'}}</el-button>
          <div class='box-right-item'>
            <div class='box-right-item-title'>分类</div>
            <div class='box-right-item-content box-right-select'>
              <div v-for='(item,index) in selectType' 
              :key='index'
              @click='getClassify(index,item.articleTypeId)'
              :class='{active:item.flag}'
              >{{item.articleTypeName}}</div>
            </div>
          </div>
          <div class='box-right-item'>
            <div class='box-right-item-title'>标签</div>
            <div class='box-right-item-content'>
              <el-form-item label="" prop="desc1" class='no-has-label'>
                <ul class='tagHandlerContainer'>
                <li class='tagItem' v-for='(item,index) in signList' :key='index'>{{item}}</li>
                  <li class="tagInput">
                    <input class="tagInputField" v-model="sign" type="text" @keyup.enter="keyUp">
                  </li>
                </ul>
              </el-form-item>
                <div class="box-right-item-notice">即文章关键词，使用回车换行键确定，可选填</div>
            </div>
          </div>
          
          <div class='box-right-item'>
            <div class='box-right-item-title'>缩略图</div> 
            <div class='box-right-item-content'>
              <UploadImg @handleSuccess='handleSuccess' :imageUrl="ruleForm.articleThumbImg">  
                <div class='box-right-set'>设置缩略图片</div>
              </UploadImg>
              <div class="box-right-item-notice">文章缩略图会显示在文章列表，建议设置一下缩略图</div>
            </div>
          </div>
           <el-button type="primary" class='btn-primary moblie-btn' @click="submitForm('ruleForm')">{{isUpdate ? '提交更新' : '提交发布'}}</el-button>
        </div>
         </el-form>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import UploadImg from '@/components/upload/uploadImg.vue'
export default {
   components: {
    quillEditor,
    UploadImg
  },
  data(){
    return{
      sign:'',
      signList:[],
      selectType:[],
      ruleForm:{},
      isUpdate: false,
      pulicSuccess: false,
      rules:{
        articleTitle:[
          {required: true, message: "请输入", trigger: "blur" }
        ],
        articleContent:[
          {required: true, message: "请输入", trigger: "blur" }
        ]
      },

      articleId: ''
    }
  },
  watch:{
    '$store.state.selectType':{
      immediate:true,
      handler:function(val){
        if(val.length<=0||!val) return
        this.$nextTick(()=>{
         this.selectType = val
          this.getType()
       })  
      }
    }
  },
  mounted(){
    // 判断如果路由有ID那么就是编辑状态，如果没有ID那就是新增
    let id = this.$route.query.id
    if(id){
      this.getArticleDetail(id)
      this.isUpdate = true
    }
  },
  methods:{
    keyUp(){
      if(!this.sign){
        return
      }
      let isHasSame =(n,arr)=> arr.some(num=> num === n)
      if(isHasSame(this.sign,this.signList)){
        return
      }
      this.signList.push(this.sign)
      this.sign = ''
    },
     // 获取文章详情
    async getArticleDetail(id) {
        // 判断当前路由是否有携带参数，如果有那么就获取文章详情
        let res = await this.$api.article.getArticleDetail({articleId: id, scene: 1})

        const {article,articleType} = res.object
        this.ruleForm = article
        this.ruleForm.articleTypeId = articleType.articleTypeId
        //
        this.articleId = article.articleId
        this.signList = article.articleLabels
    },
    submitForm(){
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if(this.isUpdate){
            this.updateArticle()
          } else {
            this.subPublic()
          }
        } else {
          return false
        }
      })
    },
    //提交发布
    subPublic(){
      const obj = {
        ...this.ruleForm,
        articleLabel: this.signList.join(',')
      }
       this.$api.article.subPubilc(obj).then((res)=>{
          this.articleId = res.object.articleId
          this.successMessage()
       })
    },
    // 修改文章
    updateArticle() {
      const {articleContent,
            articleDesc,
            articleId,
            articleThumbImg,
            articleTitle,
            articleTypeId} = this.ruleForm
            
      const obj = {
        articleContent,
        articleDesc,
        articleId,
        articleThumbImg,
        articleTitle,
        articleTypeId,
        articleLabel:this.signList.join(',')
      }
       this.$api.article.updateArticle(obj).then((res)=>{
          this.articleId = res.object.articleId
          this.successMessage()
       })
    },
    successMessage(){
        this.$message({
          message: `${this.isUpdate? '更新成功！' : '发布成功！'}`,
          type: 'success'
        });
        this.gotoRouter('detail')
    },
    handleSuccess(val){
      this.ruleForm.articleThumbImg = val
    },
    gotoRouter(name){
      if(name == 'detail') {
        this.$router.push({name, query: {id: this.articleId}})
      } else {
        this.$router.push({name})
      }
    },
    getType(){
      //获取分类列表
       this.selectType.map((item,index)=>{
        if(this.ruleForm.articleTypeId) {

          if(this.ruleForm.articleTypeId == item.articleTypeId){
            item.flag = true
          }
        } else {
          index==0?item.flag = true:item.flag = false
        }
        })
        this.ruleForm.articleTypeId = this.selectType[0].articleTypeId
    },
    getClassify(idx,val){
      this.selectType=this.selectType.map((item,index)=>{
        index==idx?item.flag = true:item.flag = false
        return item
      })
      this.ruleForm.articleTypeId = val
    },
  }
}
</script>

<style scoped lang='less'>
@theme-color:rgb(32,107,231);
  .contribute{
    padding-top: 64px;
    .success-alert{
      background-color: #eaf7e6;
      border-color: #e7f6e2;
      color: #29ad00;
      margin: 0 0px 20px 20px;
      padding: 10px 20px 10px 15px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      a{
        color:@theme-color;
        cursor: pointer;
      }
    }
    .editor{
        // height: 465px;
        /deep/.ql-container{
          height: 340px;
          border-radius: 0px 0px 4px 4px;
          border: 1px solid rgba(38,38,38,0.2);
        }
        /deep/.ql-toolbar{
          border-radius: 4px 4px 0 0;
          border: 1px solid rgba(38,38,38,0.2);
        }
      }
      .tagHandlerContainer{
        border: 1px solid #DCDFE6 ;
        border-radius: 3px;
        min-height: 56px;
        padding: 5px;
        overflow: hidden;
        padding: 0 5px;
        li{
          list-style: none;
          border-radius: 15px;
          line-height: 14px;
          display: block;
          float: left;
          font-size: 12px;
          margin: 5px 5px 5px 0;
          white-space: nowrap;
        }
        .tagInput{
          width: 100%;
          input,input:focus,input:focus-visible{
            width: 100%;
            border: 0;
            outline: none;
          }
        }
        .tagItem{
          box-sizing: content-box;
          background-color: @theme-color;
          color: #fff;
          padding: 3px 8px;
          cursor: pointer;
          line-height: 14px;
        }
      }
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
        padding-left:40px;
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
             .box-right-select{
                font-size: 14px;
                color: rgb(38,38,38);
                div{
                  cursor: pointer;    
                  line-height: 28px;    
                   padding-left: 5px; 
                }
                div.active{
                  background: rgb(206,206,206);
                }
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
                text-align: left;
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
    .moblie-btn{
    display: none;
  }
  .pc-btn{
    display: block;
  }
 @media screen and (max-width:1200px){
  .contribute .wrap-box  {
    width:90%;
  }
}
@media screen and (max-width:1024px){
  .contribute .wrap-box {
    padding: 20px;
        .demo-ruleForm{
          flex-wrap: wrap;
        }
        .wrap-box-left{
          padding-left: 0;
        }
        .wrap-box-right{
          width: 100%;;
          margin:0;
        }
        .moblie-btn{
           display: block;
        }
        .pc-btn{
          display: none;
        }
        .success-alert{
          margin:0 0 20px 0;
        }
    }
}
@media screen and (max-width:768px){
   .contribute .wrap-box {
    width: calc(100% - 20px);
    padding:0
   }
}
</style>
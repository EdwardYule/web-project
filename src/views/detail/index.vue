<template>
  <div class='detail-wrap'>
    <BreadCrumb></BreadCrumb>
      
      <!-- 内容 -->
      <div class='wrap-content'>
          <div v-if="detailInfo.article" class='content-left'>
            <div class='content-entry-box'>
            <div class='entry-title'>{{detailInfo.article.articleTitle}}</div>
            <div class='entry-info'>
              <span @click="gotoRouter(detailInfo.userInfo.userId)" class='nickname'>{{detailInfo.userInfo.userName}}</span>
              <span class='dot'>•</span>
              {{$utils.getDateDiff(detailInfo.article.createTime)}}
              <span class='dot'>•</span>
              {{detailInfo.articleType.articleTypeName}}
              <span class='dot'>•</span>
              阅读{{detailInfo.article.viewCount||0}}
            </div>
            <div v-if="detailInfo.article.articleDesc" class="entry-excerpt">
              {{detailInfo.article.articleDesc}}
            </div>
            <div class='entry-content'>
              <div v-html='detailInfo.article.articleContent'>
              </div>
            </div>
            <!-- 按钮 -->
            <div class='entry-action'>
              <el-button @click="dianzan" :class="{'active': isDianzan}">
                <i  class="iconfont icon-dianzan_kuai"></i>赞({{detailInfo.article.thumbUpCount}})
              </el-button>
              <el-button @click="collect" :class="{'active': isCollect}">
                <i class="iconfont icon-star1"></i>收藏({{detailInfo.article.collectCount}})
              </el-button>
            </div>
            <!-- 按钮 -->
            <div class='entry-bar'>
              <div @click="gotoRouter(detailInfo.userInfo.userId)" class='entry-bar-inner cursor'>
                <img class='entry-author' :src="detailInfo.userInfo.avatarUrl+''" :onerror='errorImg'/>
                <span class='author-name'>{{detailInfo.userInfo.userName}}</span>
              </div>
              <div class='entry-bar-inner'>
                <!-- <div class='entry-bar-comments'>
                  <div @click="collect" :class="{'active': isCollect, 'cursor': true}"><i  class="iconfont icon-star2"></i>{{detailInfo.article.collectCount}}</div>
                  <div class="cursor"><i class="iconfont icon-comments"></i>{{detailInfo.article.commentCount}}</div>
                </div> -->
                <div class='entry-wx'>
                  <i class="iconfont icon-weixin"></i>
                  <div class="wx-Img">
                    <img src="@/assets/wx.jpg" alt="">
                    <span>微信扫码分享</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <!-- 上一页下一页 -->
            <div class='entry-page' v-if='detailInfo.preArticle&&detailInfo.nextArticle'>
              <div @click="updateDetail(detailInfo.preArticle.articleId)" v-if="detailInfo.preArticle" class='entry-page-item' :style="{'background-image':'url('+detailInfo.preArticle.articleThumbImg+')'}">
                <p>{{detailInfo.preArticle.articleTitle}}</p>
                <div class='entry-page-time'>
                  <span>上一篇</span>
                  <span>{{$utils.getDateDiff(detailInfo.preArticle.createTime)}}</span>
                </div>
              </div>
              <div @click="updateDetail(detailInfo.nextArticle.articleId)" v-if="detailInfo.nextArticle" class='entry-page-item active' :style="{'background-image':'url('+detailInfo.nextArticle.articleThumbImg+')'}">
                <p>{{detailInfo.nextArticle.articleTitle}}</p>
                <div class='entry-page-time'>
                  <span>{{$utils.getDateDiff(detailInfo.nextArticle.createTime)}}</span>
                  <span>下一篇</span>  
                </div>
              </div>
            </div>
            <!-- 上一页下一页 -->
            <!-- 评论 -->
            <div class='detail-comment'>
              <div class='detail-comment-title'>发表回复</div>
              <div class='form-box'>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >
                  <el-form-item prop="textarea">
                    <el-input
                      type="textarea"
                      style="width:100%;"
                      :rows="3"
                      placeholder="写下您的评论..."
                      resize="none"
                      v-model="ruleForm.textarea">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div class="commontBox">
                  <div>
                    <img v-if="$store.state.userInfo.userName" class='entry-author' :src="$store.state.userInfo.avatarUrl+''" :onerror='errorImg'/>
                    <span v-if="$store.state.userInfo.userName" class='author-name'>{{$store.state.userInfo.userName}}</span>
                  </div>
                  <el-button @click="sendComment('ruleForm', ruleForm.textarea, 0, 0)" type="primary">提交</el-button>
                </div>
              </div>
              <!-- 评论 -->
              <div v-if="commentArr.length" v-loading="loading">
                <div class='detail-comment-title hasMarginTop'>评论列表({{commentCount}}条)</div>
                <div class='comment-item' v-for='(item,index) in commentArr' :key='index'>
                  <img class='comment-icon' :src="item.author.avatarUrl+''" :onerror='errorImg'/>
                  <div class='comment-item-content'>
                    <div class="comment-item-content-box">
                      <div @click="gotoRouter(item.author.userId)" class='comment-item-name cursor'>{{item.author.userName}}</div>
                      <div class='comment-item-time'>{{$utils.getDateDiff(item.commentTime)}}</div>
                      <div class='comment-item-desc'>{{item.content}}</div>
                      <div @click="replyFn(0, index)" class="replyBtn">
                        <i class="el-icon-s-comment"></i>
                        回复
                      </div>
                    </div>

                    <!-- 第一层回复S -->
                    <div v-if="item.isShowReply">
                      <div class="reply">
                        回复给<span style="font-weight: 900;">{{item.author.userName}}</span>
                        <i @click="(item.isShowReply=false)" class="el-icon-close"></i>
                      </div>
                      <div class='form-box'>
                        <el-form :model="replyForm" :rules="replyRules" ref="replyRules1" >
                          <el-form-item prop="textarea">
                            <el-input
                              type="textarea"
                              style="width:100%;"
                              :rows="3"
                              placeholder="写下您的评论..."
                              resize="none"
                              v-model="replyForm.textarea">
                            </el-input>
                          </el-form-item>
                        </el-form>
                        <div class="commontBox">
                          <div>
                            <img v-if="$store.state.userInfo.userName" class='entry-author' :src="$store.state.userInfo.avatarUrl+''" :onerror='errorImg'/>
                            <span v-if="$store.state.userInfo.userName" class='author-name'>{{$store.state.userInfo.userName}}</span>
                          </div>
                          <el-button @click="sendComment('replyRules1', replyForm.textarea, item.commentId, item.replyRootCommentId)" type="primary">提交</el-button>
                        </div>
                      </div>
                    </div>
                     <!-- 第一层回复E -->
                    
                    <!-- 第二层回复S -->
                    <div v-if="item.childComments" class="replyBox">
                      <div class='comment-item' v-for='(e,i) in item.childComments' :key='i'>
                        <span class="jiantou">▲</span>
                        <img class='comment-icon' :src="e.author.avatarUrl+''" :onerror='errorImg'/>
                        <div class='comment-item-content'>
                          <div class="comment-item-content-box">
                            <div @click="gotoRouter(e.author.userId)" class='comment-item-name cursor'>{{e.author.userName}}</div>
                            <div class='comment-item-time'>{{$utils.getDateDiff(e.commentTime)}}</div>
                            <div class='comment-item-desc'>
                              <span v-if="e.replyToAuthor" @click="gotoRouter(e.replyToAuthor.userId)" class="comment-item-name cursor">@{{e.replyToAuthor.userName}}</span>
                              {{e.content}}
                            </div>
                            <div @click="replyFn(1, index, i)" class="replyBtn">
                              <i class="el-icon-s-comment"></i>
                            </div>
                          </div> 

                          <div v-if="e.isShowReply">
                            <div class="reply">
                              回复给<span style="font-weight: 900;">{{e.author.userName}}</span>
                              <i @click="(e.isShowReply=false)" class="el-icon-close"></i>
                            </div>
                            <div class='form-box'>
                              <el-form :model="replyForm" :rules="replyRules" ref="replyRules2" >
                                <el-form-item prop="textarea">
                                  <el-input
                                    type="textarea"
                                    style="width:100%;"
                                    :rows="3"
                                    placeholder="写下您的评论..."
                                    resize="none"
                                    v-model="replyForm.textarea">
                                  </el-input>
                                </el-form-item>
                              </el-form>
                              <div class="commontBox">
                                <div>
                                  <img v-if="$store.state.userInfo.userName" class='entry-author' :src="$store.state.userInfo.avatarUrl+''" :onerror='errorImg'/>
                                  <span v-if="$store.state.userInfo.userName" class='author-name'>{{$store.state.userInfo.userName}}</span>
                                </div>
                                <el-button @click="sendComment('replyRules2', replyForm.textarea, e.commentId, e.replyRootCommentId)" type="primary">提交</el-button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 第二层回复E -->

                    
                  </div>
                </div>
                <div class='load-more-wrap'>已经到底啦</div>
              </div>
              <!-- 评论 -->
            </div>
            <!-- 评论 -->
          </div>

          <div v-if="detailInfo.userInfo" class='content-right'>
            <div  class='content-right-infoBox'>
              <img src='@/assets/iconbg.jpg' class='content-right-bg'/>
              <div class='content-right-icon'>
                <div @click="gotoRouter(detailInfo.userInfo.userId)" class='cursor content-info-icon'>
                  <img :src="detailInfo.userInfo.avatarUrl+''" :onerror='errorImg'/></div>
              </div>
              <div class='content-right-info'>
                  <p @click="gotoRouter(detailInfo.userInfo.userId)" class='cursor author-name'>{{detailInfo.userInfo.userName}}</p>
                  <p @click="gotoRouter(detailInfo.userInfo.userId)" class='cursor author-description'>{{detailInfo.userInfo.desc}}</p>
                  <div class='profile-stats-inner'>
                    <div class='user-stats-item'>
                      <div>{{detailInfo.userInfo.articleCount||0}}</div>
                      <div>文章</div>
                    </div>
                    <div class='user-stats-item'>
                      <div>{{detailInfo.userInfo.commentCount||0}}</div>
                      <div>评论</div>
                    </div>
                     <div class='user-stats-item'>
                      <div>{{detailInfo.userInfo.fensCount||0}}</div>
                      <div>粉丝</div>
                    </div>
                  </div>
                  <!-- 关注私信 -->
                  <!-- <div class='attention-btn'>
                    <el-button>
                      <i class='el-icon-plus'></i>
                      关注</el-button>
                    <el-button>
                       <i class='el-icon-message'></i>
                      私信</el-button>
                  </div> -->
              </div>
               <!-- 关注私信 -->
                <div class='profile-posts'>
                    <div class='widget-title'>最近文章</div>
                    <ul class='moreArticle'>
                      <li v-for='(item,index) in newArtcle' :key='index' @click="updateDetail(item.articleId)">
                        <i class='el-icon-caret-right'/>
                        <div>{{item.articleTitle}}</div>
                      </li>
                    </ul>
                </div>
          </div>
          </div>
      </div>
      <!-- 内容 -->
  </div>
</template>

<script>
import BreadCrumb from '@/components/layout/breadCrumb.vue'
export default {
  components:{
    BreadCrumb
  },
  data(){
    return{
      errorImg:'this.src="'+require('@/assets/icon.jpg')+'"',
      currentUserInfo: {},
      pageSize: 10,
      currentPage: 1,
      totalPages: 0,
      commentCount: 0,
      loading: false,
      loadingDetail: false,
      flag: true,
      commentArr: [],
      detailInfo: {},
      replyForm: {
        textarea: ''
      },
      ruleForm: {
        textarea: ''
      },
      replyRules:{
        textarea:[{required: true, trigger: "blur",message:'请输入评论内容' }]
      },
      rules:{
        textarea:[{required: true, trigger: "blur",message:'请输入评论内容' }]
      },
      isDianzan: false,
      isCollect: false,
      newArtcle: []
    }
  },
  mounted(){
    let id = this.$route.query.id
    this.getArticleDetail(id)
    this.getCommentData(id, true)
    window.addEventListener('scroll', this.loadMore) // 监听页面滚动
  },
  beforeDestroy () {
     window.removeEventListener('scroll', this.loadMore)
  },
  methods:{
    // 路由跳转
    gotoRouter(id){
      this.$router.push('infoCenter?id='+id)
    },
    // 点击更新路由信息以及详情数据
    updateDetail(articleId) {
      let id = articleId
      this.$router.replace({ name: 'detail',  query:{ id: id } })
      this.getArticleDetail(id)
      this.getCommentData(id, true)
    },
    // 获取文章详情数据
    async getArticleDetail(id) {
      this.loadingDetail = true
      let res = await this.$api.article.getArticleDetail({articleId: id})
      this.detailInfo = res.object||{}
      //
      const {thumbUpStatus,collectStatus } =  res.object.article
      this.isDianzan = thumbUpStatus == 1
      this.isCollect = collectStatus == 1
      this.getUserInfo()
    },
    // 获取当前博主的信息
    async getUserInfo() {
      let res = await this.$api.infoCenter.getUserInfo({userId: this.detailInfo.userInfo.userId})
      this.detailInfo.userInfo = res.object
      this.getNewArticle()
    },
    // 获取当前文章的评论
    async getCommentData(id, type) {
      this.flag = true
      this.loading = true
      if(type) {
        this.currentPage = 1
      }
      let params = {
        articleId: id,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      let res = await this.$api.article.getCommentData(params)
      const _that = res.object
      if(type) {
        this.commentArr = []
      }
      this.commentArr = this.commentArr.concat(_that.pageResponse.result)
      this.commentCount = _that.commentCount
      //
      this.commentArr.forEach((item) => {
        item.isShowReply = false
        if(item.childComments) {
          item.childComments.forEach((e) => {
            e.isShowReply = false
          })
        }
      })
      this.totalPages = _that.pages
      this.loading = false
    },
    // 回复
    replyFn(level, index1, index2) {
      this.commentArr.forEach((item) => {
        item.isShowReply = false
        if(item.childComments) {
          item.childComments.forEach((e) => {
            e.isShowReply = false
          })
        }
      })
      if(!level){
        this.$delete(this.commentArr[index1], 'isShowReply')
        this.$set(this.commentArr[index1], 'isShowReply', true)
      } else {
        this.$delete(this.commentArr[index1].childComments[index2], 'isShowReply')
        this.$set(this.commentArr[index1].childComments[index2], 'isShowReply', true)
      }
        
    },
    // 发表评论
    async sendComment(name, content, id, replyId) {
      if(this.$store.state.userInfo.userName) {
        let flag = false
        let params = {
          articleId: this.detailInfo.article.articleId,
          content: content,
          replyCommentId: id
        }
        if(name == 'replyRules1' || name == 'replyRules2') {
          this.$refs[name][0].validate((valid) => {
          if (valid) {
              flag = true
              if(name == 'replyRules1') {
                params.replyRootCommentId = id
              } else {
                params.replyRootCommentId = replyId
              }
            }
          })
        } else {
          this.$refs[name].validate((valid) => {
          if (valid) {
            flag = true
            params.replyRootCommentId = id
            }
          })
        }
        if(flag) {
          await this.$api.article.sendComment(params)
          this.ruleForm.textarea = ''
          this.replyForm.textarea = ''
          this.getCommentData(this.detailInfo.article.articleId, true)
        }
      } else {
        const {path,query} = this.$route
        this.$router.push({name:'noLogin',query:{
          path,
          query
        }})
      }
    },
    // 获取最近10篇文章
    async getNewArticle(){
      let res = await this.$api.article.getNewArticle({userId: this.detailInfo.userInfo.userId})
      this.newArtcle = res.object.articles || []
      this.loadingDetail = false
    },
    // 点赞
    async dianzan() {
      await this.$api.article.dianzan({articleId: this.detailInfo.article.articleId})
      if(this.isDianzan) {
        this.detailInfo.article.thumbUpCount -= 1
      } else {
        this.detailInfo.article.thumbUpCount += 1
      }
      this.isDianzan = !this.isDianzan
    },
    // 收藏
    async collect() {
      await this.$api.article.collect({articleId: this.detailInfo.article.articleId})
      if(this.isCollect) {
        this.detailInfo.article.collectCount -= 1
      } else {
        this.detailInfo.article.collectCount += 1
      }
      this.isCollect = !this.isCollect
    },
    // 加载更多
    loadMore() {
      const clientHei = document.documentElement.clientHeight || document.body.clientHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

      if (parseInt(scrollHeight - clientHei  - scrollTop) <= 500 && this.flag && this.currentPage<this.totalPages) {
       this.flag = false
       setTimeout(() => {
          this.currentPage++
          this.getCommentData(this.detailInfo.article.articleId, false);
        }, 200);
      }
    },
    
  }
}
</script>

<style lang='less' scoped>
@theme-gray-color:rgba(38,38,38,0.8);
@theme-light-color:rgba(38,38,38,0.6);
@font-size:rgb(38,38,38);
@theme-color:rgb(32,107,231);
.detail-wrap{
    max-width: 1200px;
    width: 80%;
    margin: 0 auto;
    padding: 64px 0 20px;
    .comment-item{
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(38,38,38,0.07);
      .comment-icon{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 15px;
        float: left;
      }
      .comment-item-name{
        font-size: 14px;
        color:#262626;
        margin-bottom: 5px;
        font-weight: 900;
        display: inline-block;
      }
      .comment-item-name:hover{
        color: #206be7;
      }
      .comment-item-time{
          margin-bottom: 10px;
          color:#bfbfbf;
          font-size: 12px;
      }
      .comment-item-content{
          width:calc(100% - 55px);
          display: inline-block;
          .comment-item-content-box{
            position: relative;
            .replyBtn{
              position: absolute;
              right: 0px;
              top: 0;
              font-size: 13px;
              font-weight: 900;
              cursor: pointer;
              color: #777;
              display: none;
              .el-icon-s-comment{
                font-size: 15px;
              }
            }
          }
          .comment-item-content-box:hover{
          .replyBtn{
            display: block;
          }
        }
        .replyBox{
          background-color: #f6f6f6;
          padding: 20px;
          border-radius: 5px;
          margin-top: 20px;
          position: relative;
          .jiantou{
            position: absolute;
            top: -17px;
            left: 30px;
            color: #f6f6f6;
          }
        }
      }
      .comment-item-desc{
        font-size: 14px;
        margin-bottom: 20px;
        word-wrap: break-word;
      }
      .reply{
        font-size: 15px;
        margin: 15px 0;
        color: #555;
        .el-icon-close{
          float: right;
          font-size: 20px;
          cursor: pointer;
          font-weight: 900;
        }
      }
    }
    .comment-item:last-child{
      padding: 0;
      margin: 0;
      border: 0;
    }
    
    .form-box{
       border: 1px solid rgba(38,38,38,0.07);
       .form-name{
          border-top: 1px solid rgba(38,38,38,0.07);
          display: flex;
          justify-content: space-between;
          padding:15px 15px 0;
       }
       /deep/.el-textarea__inner{
        border: none;
       }
       .form-box-comments{
         padding:8px 12px;
         /deep/.el-textarea__inner{
          padding:0;
         }
        /deep/.el-form-item__content{
          width: 100%;
        }
       }
       .form-box-comments{
          width: 100%;
          box-sizing: border-box;
          margin-right: 0;
       }
       .form-button{
          padding:10px 15px;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          line-height: 32px;
          color:@theme-gray-color
       }
    }
    .wrap-content{
      display: flex;
      justify-content: space-between;
      min-height: 650px;
      .entry-excerpt{
        padding: 15px;
        font-size: 16px;
        line-height: 1.8;
        border-radius: 3px;
        background-color: #f3f3f3;
        margin: 0 20px 20px;
        color: #747474;
        border: 1px solid #e3e3e3;
      }
      .content-right{
        .content-right-infoBox{
          background: #fff;
        }
        .content-right-bg{
          width: 100%;
        }
        .profile-posts{
          padding: 20px 15px 15px;
          .moreArticle {
            li{
              list-style: none;
              font-size: 14px;
              padding: 5px 0 10px 0;
              display: flex;
              div{
                color:@theme-gray-color;
                width: calc(100% - 20px);
                display: inline-block;
              }
              div:hover{
                color:@theme-color;
                cursor: pointer;
              }
            }
            .el-icon-caret-right{
              color:@theme-light-color;
              margin-top: 3px;
            }
          }
          .widget-title{
              margin: 2px 0 15px;
              padding: 0 0 0 12px;
              font-size: 16px;
              font-weight: 500;
              font-size: 14px;
              color:@font-size;
              position: relative;
              line-height: 14px;
          }
          .widget-title::before{
              position: absolute;
              left: 0;
              top: 0;
              width: 3px;
              height: 100%;
              content: "";
              background-color:@theme-color;
              background-image: -o-linear-gradient(top,rgba(255,255,255,.15),transparent);
              background-image: linear-gradient(180deg,rgba(255,255,255,.15),transparent);
              border-radius: 3px;
          }
        }
        .attention-btn{
          button{
            background: @theme-color;
            color:#fff;
            padding:6px 15px;
            border: 1px solid  @theme-color;
            margin-top:20px;
          }

        }
        .content-right-info{
          padding: 10px 15px 20px;
          text-align: center;
          border-bottom: 1px solid #f2f2f2;
          .author-name{
            font-weight: 900;
            color: #262626;
          }
          .author-name:hover{
            color: #206be7;
          }
          .author-description{
            margin-top: 10px;
            margin-bottom: 20px;
            font-size: 14px;
            color:@theme-gray-color
          }
          .profile-stats-inner{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .user-stats-item{
              padding: 6px 0;
              flex: 1;
              div:first-child{
                font-size: 16px;
                color:@font-size;
              }
               div:last-child{
                font-size: 12px;
                color:@theme-gray-color
              }
            }
          }
        }
        .content-right-icon{
         margin-top: -40px;
          .content-info-icon{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 0;
            display: block;
            position: relative;
            overflow: hidden;
            border: 2px solid #fff;
            img{
              max-width: 100%;
            }
          }
        }
      }
      .content-left{
        width: 100%;
        margin-bottom: 20px;
        flex:1;
        .detail-comment{
          background: #fff;
          padding: 20px;
          .detail-comment-title.hasMarginTop{
              margin-top:20px;
          }
          .detail-comment-title{
              font-size: 18px;
              margin: 0 0 20px;
              font-weight: 500;
              position: relative;
              padding: 0 0 0 12px;
          }
          .detail-comment-title::before{
                position: absolute;
                left: 0;
                top: 1px;
                width: 3px;
                height: calc(100% - 2px);
                content: "";
                background-color: @theme-color;
                background-image: -o-linear-gradient(top,rgba(255,255,255,.15),transparent);
                background-image: linear-gradient(180deg,rgba(255,255,255,.15),transparent);
                border-radius: 3px;
          }
          .commontBox{
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-top: 1px solid #26262612;
            .entry-author{
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 5px;
            }
            .author-name{
              color: #206be7;
            }
          }
        }
        .entry-page{
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          .entry-page-item{
            padding: 10px 15px;
            border-radius: 4px;
            color: #fff;
            width: 49%;
            background-size: cover;
            background-position: 50%;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            p{
                  display: block;
                  height: 50px;
                  line-height: 20px;
                  overflow: hidden;
                  -o-text-overflow: ellipsis;
                  text-overflow: ellipsis;
                  -webkit-box-orient: vertical;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                      z-index: 2;
                      position: relative;
            }
            .entry-page-time{
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              z-index: 2;
              position: relative;
            }
          }
          .entry-page-item.active{
              background-color:@theme-color;
              background-image: -o-linear-gradient(left,rgba(255,255,255,.3),transparent);
              background-image: linear-gradient(90deg,rgba(255,255,255,.3),transparent);
          }
          .entry-page-item.active::before{
            background:transparent
          }
          .entry-page-item::before{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.5);
            content: "";
            z-index: 1;
          }
        }
        .content-entry-box{
          background: #fff;
          margin-bottom: 20px;
        }
        .entry-bar{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 20px;
          border-top: 1px solid #f2f2f2;
          .entry-author{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 5px;
          }
          .author-name{
            color:@theme-color;
            font-size: 14px;
          }
          .entry-bar-inner{
            height: 36px;
            display: flex;
            align-items: center;
            color:@theme-light-color;
            .entry-wx{
              padding: 0 20px;
              border-left: 1px solid #9b9b9b99;
              position: relative;
              cursor: pointer;
              .wx-Img{
                padding: 15px;
                background-color: #fff;
                box-shadow: 0 0 3px 2px #0000000d;
                position: absolute;
                top: -210px;
                left: -95px;
                text-align: center;
                font-size: 12px;
                color: #ccc;
                display: none;
              }
            }
            .entry-bar-comments{
              width: 74px;
              margin-right:30px;
              display: flex;
              justify-content: space-between;
              .iconfont{
                margin-right: 3px;
              }
              .active{
                color:#206be7;
              }
            }
            .entry-info{
              margin-right: 20px;
            }
            .entry-wx:hover{
              color: rgb(7, 214, 7);
              .wx-Img{
                display: block;
              }
            }
          }
        }
        .entry-title{
          margin-bottom: 20px;
          font-size: 24px;
          color:@font-size;
          padding:20px 20px 0;
        }
        .entry-action{
          margin: 30px 0;
          text-align: center;
          .iconfont{
            margin-right: 5px;
          }
          button{
            padding:4px 30px;
            line-height: 30px;
            font-size:14px;
            color:@theme-color;
            border: 1px solid @theme-color;
          }
          .active{
            background-color: #206be7;
            color: #fff;
          }
        }
        .entry-info{
          padding:0px 20px  30px 20px;
          color: @theme-light-color;
          font-size: 14px;
          .dot{
            margin: 0 5px;
             color: @theme-light-color;
          }
          .nickname{
            color:@theme-color;
            cursor: pointer;
          }
        } 
        .entry-content{
          color:@theme-gray-color;
          font-size: 14px;
          padding:0 20px;
          img {
            max-width: 100%;
            display: block;
            margin: 0 auto 5px;
          }
        }
      }
      .content-right{
        width: 300px;
        margin-left: 20px;
      }
    }
    
    .author-name{
        display: inline-block;
        font-size: 14px;
        overflow: hidden;
        max-width: 180px;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: super;
    }
    .cursor{
      cursor: pointer;
    }
    .load-more-wrap{
      text-align: center;
        font-size: 13px;
        color:rgba(38,38,38,0.8);
        position: relative;
    }
    .load-more-wrap::before {
        position: absolute;
        top: 50%;
        left: calc(50% - 60px);
        width: 16px;
        height: 1px;
        content: "";
        background: rgba(38, 38, 38, 0.7);
    }
    .load-more-wrap::after {
        position: absolute;
        top: 50%;
        right: calc(50% - 60px);
        width: 16px;
        height: 1px;
        content: "";
        background: rgba(38, 38, 38, 0.7);
    }
}
@media screen and (max-width:1200px){
  .detail-wrap {
     width: 90%;
     .wrap-content{
      .content-right{
        width: 250px;
      }
     }
  }
}
@media screen and (max-width:1024px){
  .detail-wrap {
    width: 90%;
    .wrap-content{
      .content-right{
        display: none;
      }
    }
  }
}
@media screen and (max-width:768px){
  .detail-wrap{
    width: calc(100% - 20px);
    .wrap-content {
      .content-left{
        .detail-comment{
          padding:0;
        }
        .entry-title{
            margin-bottom: 10px;
            font-size: 22px;
            padding: 10px 0px 0;
        }
        .entry-bar{
          padding:11px 0;
        }
        .entry-info{
            padding: 0px 0px 20px 0;
        }
        .entry-excerpt{
              margin: 0 0px 20px;
        }
        .entry-content{
          padding:0;
        }
        .content-entry-box{
          margin-bottom: 0;
        }
        .entry-action button{
          padding: 4px 10px;
          line-height: 20px;
        }
        .entry-page {
          flex-direction: column;
          .entry-page-item{
            width: 100%;
                margin-bottom: 10px;
          }
        }
      }
    } 
  }
}
</style>
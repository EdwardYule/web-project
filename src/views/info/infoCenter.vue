<template>
  <div class='info-box' >
    <div class='info-left'>
      <div class='profile-head'> 
        <div class='ph-bg' >
           <img src='@/assets/iconbg.jpg'/>
        </div> 
        <div class='ph-inner'>
          <div class="avatarBox">
            <img class='ph-avatar' :src="userInfo.avatarUrl+''" :onerror='errorImg'/>
            <!-- <UploadImg @handleSuccess='handleSuccess'>
              <i class="uploadAvatar el-icon-camera-solid"></i>
            </UploadImg> -->
          </div>
          
          <div class='ph-name'>{{userInfo.userName}}</div>
          <div class='ph-desc'>{{userInfo.desc}}</div>
          <div class='stats-inner'>
            <div class='stats-item'>
              <b>{{userInfo.articleCount}}</b>文章
            </div>
            <div class='stats-item'><b>{{userInfo.commentCount}}</b>评论</div>
            <!-- <div class='stats-item'><b>{{(userInfo.fensCount || 0)}}</b>粉丝</div> -->
          </div>
        </div>
      </div>
      <div class='profile-tab' v-loading="loading" element-loading-background="rgba(255,255,255, 0.2)">
          <el-tabs v-model="activeName" @tab-click="getArticleList(true)">
            <el-tab-pane label="文章" name="1">
              <div v-if="dataList.length">
                <listItem v-for='(item,index) in dataList' :key='index' :itemData="item" :isUpdate="$store.state.userInfo.userId == item.userInfo.userId"></listItem>
                <div class='load-more-wrap'>已经到底啦</div>
              </div>
              <NoData v-else></NoData>
            </el-tab-pane>
            <el-tab-pane label="评论" name="2">
              <div v-if="dataList.length">
                <listItem v-for='(item,index) in dataList' :key='index' :itemData="item" :isUpdate="($store.state.userInfo.userId == item.userInfo.userId)"></listItem>
                <div class='load-more-wrap'>已经到底啦</div>
              </div>
              <NoData v-else></NoData>
            </el-tab-pane>
            <!-- <el-tab-pane label="关注" name="4">
              <div v-if="dataList.length">
                <listItem v-for='(item,index) in dataList' :key='index' :itemData="item" :isUpdate="($store.state.userInfo.userId == item.userInfo.userId)"></listItem>
                <div class='load-more-wrap'>已经到底啦</div>
              </div>
              <NoData v-else></NoData>
            </el-tab-pane> -->
            <el-tab-pane label="收藏" name="3">
              <div v-if="dataList.length">
                <listItem v-for='(item,index) in dataList' :key='index' :itemData="item" :isUpdate="($store.state.userInfo.userId == item.userInfo.userId)"></listItem>
                <div class='load-more-wrap'>已经到底啦</div>
              </div>
              <NoData v-else></NoData>
            </el-tab-pane>
          </el-tabs>
      </div>

    </div>
    <div class='info-right'>
      <!-- 热门标签 -->
      <div class='hot-tag right-item-box'>
        <div class='tag-title'>热门标签</div>
        <div class='tag-content'>
          <el-tag @click='goSearch(item)' v-for="item in tagArr" :key="item" effect="dark">{{ item }}</el-tag>
        </div>
      </div>
      <!-- 7天贡献 -->
       <div class='right-item-box'>
        <div class='tag-title'>投稿贡献榜前10名</div>
        <div class='tag-content'>
          <div v-for="(item, index) in rankingArr" :key="index" class="listBox">
            <div class='hasflex' @click='gotoCenter(item.userId)'>
            <i style="color: #fdda55;" v-if="(index == 0)" class="iconfont icon-jiangbei rankingIcon"></i>
            <i style="color: #c3c3c3;" v-else-if="(index == 1)" class="iconfont icon-jiangbei rankingIcon"></i>
            <i style="color: #d5a800;" v-else-if="(index == 2)" class="iconfont icon-jiangbei rankingIcon"></i>
            <i v-else class='rank-number'>{{index+1}}</i>
            <span class='hasflex'>
              <img class='userAvatar' :src="item.avatarUrl+''" :onerror='errorImg'/>
              <span class='username'>{{item.userName}}</span>
            </span>
            </div>
            <span class="articleCount">+{{item.articleCount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import listItem from '@/components/listItem/list.vue'
import NoData from '@/components/empty/nodata'
// import UploadImg from '@/components/upload/uploadImg.vue'
export default {
  components:{
    listItem,
    NoData,
    // UploadImg
  },
 data() {
      return {
        activeName: '1',
        pageSize: 10,
        currentPage: 1,
        loading: false,
        totalPages: 0,
        flag: false,
        tagArr: [],
        rankingArr: [],
        userInfo: {},
        dataList: [],
        errorImg:'this.src="'+require('@/assets/icon.jpg')+'"',
      };
    },
    watch:{
      '$route': 'isSelf'
    },
  mounted() {
    this.isSelf()
    this.getHotTags()
    this.rankingContributions()
    window.addEventListener('scroll', this.loadMore) // 监听页面滚动
  },
  beforeDestroy () {
     window.removeEventListener('scroll', this.loadMore)
  },
  methods:{
    // 判断当前是自己还是别人的个人中心
    isSelf() {
      this.getArticleList(true)
      let userId = this.$route.query.id
      if(userId) {
        this.getUserInfo(userId)
      } else {
        this.userInfo = localStorage.userInfo?JSON.parse(localStorage.userInfo):{}
      }
    },
    gotoCenter(id){
      this.$router.push('infoCenter?id='+id)
    },
    goSearch(val){
       this.$router.push('search?val='+val)
    },
    // 获取文章列表
    async getArticleList(type){
      this.flag = true
      this.loading = true
      if(type) {
        this.currentPage = 1
      }
      let userId = this.$route.query.id
      let res = {}
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize,
        type: Number(this.activeName)
      }
      if(userId) {
        params.userId = userId
        // 获取别人的文章列表
        res = await this.$api.infoCenter.getOtherList(params)
      } else {
        // 获取自己的文章列表
        res = await this.$api.infoCenter.getWritingList(params)
      }
      if(type){
        this.dataList = []
      }
      this.dataList = this.dataList.concat(res.object.result)
      this.totalPages = res.object.pages
      this.loading = false
    },
    // 获取当前博主的信息
    async getUserInfo(userId) {
      let res = await this.$api.infoCenter.getUserInfo({userId})
      this.userInfo = res.object
      
    },
    // 获取热门标签
    async getHotTags() {
      let res = await this.$api.infoCenter.getHotTags()
      this.tagArr = res.object.labels
    },
    // 投稿贡献榜前10名
    async rankingContributions() {
      let res = await this.$api.infoCenter.rankingContributions()
      this.rankingArr = res.object.contributors
    },
    // 上传图片
    handleSuccess(val){
      this.userInfo.avatarUrl = val
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
          this.getArticleList(false);
        }, 200);
      }
    }
  }
}
</script>

<style lang='less' scoped>
.info-box{
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;
  padding: 84px 0 20px;
  display: flex;
  min-height: calc(100vh - 160px);
  display: flex;
  .info-right{
    .right-item-box{
      background: #fff;
      padding: 15px 15px;
      margin-bottom: 20px;
      cursor: pointer;
      .articleCount{
        font-size: 14px;
        color: rgb(38,38,38);
      }
      .username{
        color: rgb(38,38,38);
        margin-left: 10px;
        font-size: 14px;
      }
      .hasflex{
          display: flex;
          align-items: center;
      }
      .rankingIcon{
        font-size: 22px;
        margin-right: 10px;
        width: 22px;
      }
      .listBox{
        width: 100%;
        line-height: 20px;
          padding: 5px;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // cursor: pointer;
      }
      // .listBox:hover{
      //   background-color: #eee;
      // }
    }
    .tag-title{
      margin: 2px 0 15px;
      padding: 0 0 0 12px;
      font-size: 16px;
      font-weight: 500;
      font-size: 16px;
      color: #262626;
      position: relative;
      line-height: 14px;
    }
    .tag-title::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      content: "";
      background-color: #206be7;
      background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.15), transparent);
      border-radius: 3px;
    }
    .tag-content{
      display: flex;
      flex-wrap: wrap;
      .el-tag{
          margin: 5px;
      }
    }
  }
  .userAvatar{
    width: 27px;
    height: 27px;
    border: 1px solid #fff;
    border-radius: 50%;
  }
  .info-left{
    width: calc(100% - 320px);
    .profile-tab{
      background: #fff;
      min-height: 470px;
      /deep/.el-tabs__header{
        line-height: 50px;
        margin:0;
      }
      /deep/.el-tabs__nav-wrap {
        display: flex; 
        justify-content: center;
      }
      /deep/.el-tabs__nav-wrap::after{
        height: 1px;
      }
      /deep/.el-tabs__item{
        padding:0 30px;
      }
      /deep/.el-tabs__active-bar{
        background-color: #409EFF;
      }
      /deep/.el-tabs__item.is-active{
        color: #409EFF;
      }
    }
    .profile-head{
      position: relative;
      margin-bottom: 20px;
          padding-top: 37%;
          height: 0;
      text-align: center;
      background-color: rgba(38,38,38,0.03);
      overflow: hidden;
      .ph-inner{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .avatarBox{
      position: relative;
      margin: 0 auto 20px;
      .ph-avatar{
        width: 80px;
        height: 80px;
        border:2px solid #fff;
        border-radius: 100%;
      }
      .uploadAvatar{
        display: none;
        text-align: center;
        line-height: 80px;
        font-size: 40px;
        width: 80px;
        left: 0;
        color: #fff;
        position: absolute;
        background-color: #666666;
        opacity: .8;
        border-radius: 50%;
        cursor: pointer;
        }
    }
    .avatarBox:hover{
      .uploadAvatar{
        display: block;
        position: absolute;
        top: 0;
      }
    }
      .ph-bg{
        position: absolute;
        left: 0;
        top:0;
        z-index: 0;
        img{
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      .ph-bg::before{
            position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        content: "";
        opacity: .3;
      }
      .ph-name{
        color:#fff;
        font-size: 24px;
        margin-bottom: 10px;
            z-index: 1;
        position: relative;
      }
      .ph-desc{
        color:#fff;
        margin-bottom: 20px;
        font-size: 14px;
        z-index: 1;
        position: relative;
      }
      .stats-inner{
        z-index: 1;
        position: relative;
        display: flex;
        justify-content: center;
        color:#fff;
        .stats-item{
          padding:0 8px;
          b{
            margin-right: 5px;
          }
        }
      }
    }
  }
  .info-right{
    width: 300px;
    margin-left: 20px;
    flex-shrink: 0;
  }
  .load-more-wrap{
    text-align: center;
    font-size: 13px;
    color: rgba(38, 38, 38, 0.8);
    position: relative;
    z-index: 1;
    padding: 30px;
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
.rank-number{
  width: 22px;
  margin-right: 10px;
  text-align: center;
}
@media screen and (max-width:1200px){
  .info-box {
     width: 90%;
    .info-right{
      width: 250px;
    }
    .info-left{
      width: calc(100% - 270px);
    }
  }
}
@media screen and (max-width:1024px){
  .info-box {
    width: 90%;
    .info-right{
      display: none;
    }
    .info-left{
      width: 100%
    }
  }
}
@media screen and (max-width:768px){
   /* 今日修改 */
  .info-box {
    width: 100%;
     padding: 64px 0 20px;
    
    .info-left {
      margin: 0 10px;
      .profile-tab{
      min-height:350px;
    }
      .profile-head {
          height: auto;
        margin-left: -10px;
        margin-right: -10px;
        padding-top: 37vw;
        background: 0 0;
        min-height: auto;
        .avatarBox .ph-avatar{
          width: 70px;
          height: 70px;
        }
       .ph-bg{
        height: 37vw;
        min-height: auto;
        img{
          min-height: auto;
        }
       }
      .ph-inner{
        position: relative;
        height: auto;
        padding: 0 15px 15px;
        margin-top: -40px;
        color: rgb(38,38,38);
        .ph-name,.ph-desc,.stats-inner{
            color: rgb(38,38,38);
        }
        .stats-inner{
          font-size: 14px; 
          b{
            font-weight: 500;
          }
        }
    }
    }
    }
  }
}
</style>
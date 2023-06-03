<template>
  <div>
    <div class='member-account-title'>系统通知</div>
    <div class='notify-list' v-loading="loading">
        <el-collapse v-if="noticeArr.length" v-model="activeNames" @change="handleChange" accordion>
          <el-collapse-item v-for="(item, index) in noticeArr" :key="index" :name="index">
            <template slot="title">
              <div class='notify-item' >
                <div class='flex-box-item'>
                  <div v-if="(item.messageType == 2)" class='notify-item-title'>文章《{{item.title}}》有新评论</div>
                  <span v-if="(item.isRead == 0)" class="isRead">·</span>
                  <div class='notify-item-time'>{{$utils.getDateDiff(item.createTime)}}</div>
              </div>
              </div>
            </template>
            <a class="skip" :href="item.targetUrl">{{item.content}}</a>
          </el-collapse-item>
        </el-collapse>
        <NoData v-else></NoData>
    </div>
  </div>
</template>

<script>
import NoData from '@/components/empty/nodata'
export default {
  components:{
    NoData
  },
  data(){
    return {
      noticeArr: [],
      activeNames: [],
      loading: false
    }
  },
  mounted() {
    this.getSystemNotice()
  },
  methods:{
    // 获取系统通知列表
    async getSystemNotice() {
      this.loading = true
      let res = await this.$api.basicInfo.getSystemNotice()
      this.noticeArr = res.object.messages
      this.loading = false
    },
    // 点击消息触发事件
    async handleChange(i) {
      if(this.noticeArr[i].isRead == 0) {
        await this.$api.basicInfo.messageRead({messageId: this.noticeArr[i].messageId})
        this.$set(this.noticeArr[i], 'isRead', 1)
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
.notify-list{
  padding: 10px 40px 30px;
  .notify-item{
    width: 100%;
  }
  /deep/.el-collapse-item__header{
    height: auto;
    line-height: 30px;
    padding: 15px 0;
    align-items: baseline;
  }
  .notify-item-title{
    font-size: 16px;
    color:rgba(38,38,38,0.6);
    width: calc(100% - 170px);

  }
  .flex-box-item{
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .notify-item-time{
      font-size: 14px;
    color:rgba(38,38,38,0.6);
    margin-right: 15px;
  }
  /deep/.el-collapse{
    border-top:0;
  }
  /deep/.el-collapse-item__content{
    padding-bottom: 20px;
  }
  .notify-item:hover .notify-item-title,
  .notify-item:hover .notify-item-time{
    color:#206be7
  }
  .skip{
    color: #3a3a3a;
    text-decoration: none;
  }
  .skip:hover{
    color:#206be7;
  }
  .isRead{
    font-size: 50px;
    color: red;
    position: absolute;
    right: 0;
    top: -4px;
  }
}
  // 今日修改
  @media screen and (max-width:768px){
     .member-account-title{
      padding: 20px 15px;
      font-size: 18px;
    }
    .notify-list{
      padding: 0px 15px;
      /deep/.el-collapse-item__header{
         line-height: 22px;
      }
      .flex-box-item{
        flex-direction: column;
      }
      .notify-item-time{
        font-size: 12px;
      }
      .notify-item-title{
        width: calc(100% - 10px);
        font-size: 14px;  
      }
      /deep/.el-collapse-item__header{
        padding: 8px 0;
      }
    }
  }
</style>
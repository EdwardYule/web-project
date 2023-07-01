<template>
  <div class="contact-us">
    <BreadCrumb></BreadCrumb>
    <div class="content">
      <div class="content-title">联系我们</div>
      <div class="context" v-html="context"></div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/layout/breadCrumb.vue";
export default {
  name: "contactUs",
  components: {
    BreadCrumb,
  },
  data() {
    return {
      context: `
        如果你对我们感兴趣，欢迎通过以下方式联系我们：
        1. 邮箱：787322353@qq.com
        2. 微信：
        3. QQ：787322353
        4. 电话：15820578799
        5. 地址：
      `,
    };
  },
};
</script>
<style lang='less' scoped>
@theme-gray-color:rgba (38,38,38,0.8);
.contact-us {
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;
  padding: 64px 0 20px;
  min-height: calc(100vh - 160px);
  .content {
    background: #fff;
    padding: 20px;
    min-height: calc(100vh - 298px);
    .content-title {
      font-size: 24px;
      text-align: center;
      color: rgb(38, 38, 38);
      position: relative;
    }
  }
  .context {
    white-space: pre-wrap;
    line-height: 32px;
  }
}
@media screen and (max-width: 1200px) {
  .contact-us {
    width: 90%;
  }
}
@media screen and (max-width: 1024px) {
  .contact-us {
    min-height: calc(100vh - 100px);
    .content .content-title {
      font-size: 20px;
    }
  }
}
@media screen and (max-width: 768px) {
  .contact-us {
    width: calc(100% - 20px);
    min-height: calc(100vh - 56px);
  }
}
</style>
<template>
  <div class="about-us">
    <BreadCrumb></BreadCrumb>
    <div class="content">
      <div class="content-title">关于我们</div>
      <div class="context" v-html="context"></div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/layout/breadCrumb.vue";
export default {
  name: "aboutUs",
  components: {
    BreadCrumb,
  },
  data() {
    return {
      context: `
        我们是一群认真的年轻人，在做一件有趣的事情。
        我们希望通过我们的努力，让更多的人了解到我们的产品，了解到我们的公司，了解到我们的团队。
        科技是冰冷的，但是我们的产品是有温度的，我们的团队也是有温度的。
        希望能得到你们的喜欢。`,
    };
  },
};
</script>
<style lang='less' scoped>
@theme-gray-color:rgba (38,38,38,0.8);
.about-us {
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
  .about-us {
    width: 90%;
  }
}
@media screen and (max-width: 1024px) {
  .about-us {
    min-height: calc(100vh - 100px);
    .content .content-title {
      font-size: 20px;
    }
  }
}
@media screen and (max-width: 768px) {
  .about-us {
    width: calc(100% - 20px);
    min-height: calc(100vh - 56px);
  }
}
</style>
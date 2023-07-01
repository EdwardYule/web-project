<template>
  <el-drawer
  title=""
  :visible.sync="drawer"
  custom-class='mobile-nav-box'
  direction="ltr"
  size='80%'
  :append-to-body='true'
  :before-close="handleClose">
  <div>
      <el-menu
      mode='vertical'
       router :default-active="$router.path" class="el-menu-demo"
       @select='handleClose'
          >
            <el-menu-item index='/'>首页</el-menu-item>
            <el-submenu index="">
                  <template slot="title">知识分类</template>
                  <el-menu-item-group>
                    <el-menu-item :index='`/knowledge/${item.articleTypeId}`' v-for='item in selectType' :key='item.articleTypeId'>
                    <img :src='item.articleTypeImg'/>
                    <div>{{item.articleTypeName}}</div>
                  </el-menu-item>
                  </el-menu-item-group>
            </el-submenu>
            <!-- <el-menu-item index="/product">产品知识</el-menu-item> -->
            <el-menu-item index="/aboutUs">关于我们</el-menu-item>
            <el-menu-item index="/contactUs">联系我们</el-menu-item>
            <el-menu-item index="/infoCenter">个人中心</el-menu-item>
          </el-menu>

        <div class='btn-box'>
          <div class='hasflexBtn'>
            <el-button v-if='isShow' class='btn-common wid_48' @click='goToPage("goToLogin")'>登录</el-button>
            <el-button v-if='isShow' class='btn-common  wid_48' @click='goToPage("goToRegister")'>注册</el-button>
          </div>
          <el-button class='btn-common  wid_100' @click='goToPage("isHasLogin")'>投稿</el-button>
        </div>

        <div class='search-box'>
          <el-input
              placeholder="请输入关键词搜索"
              suffix-icon="el-icon-search"
              v-model="searchVal"
              @keyup.native.enter="gotoSearh"
              >  
            </el-input>
            <el-button  class='btn-common  wid_100 btn-search' @click='gotoSearh'>搜索</el-button>
        </div>
  </div>
</el-drawer>
</template>
<script>
  export default {
    data() {
      return {
        drawer: false,

        selectType: [],
        searchVal:'',
        
        isShow:true
      };
    },
    watch:{
      '$store.state.selectType':{
        immediate:true,
        handler:function(val){
          if(val.length<=0||!val) return
          this.$nextTick(()=>{
            this.selectType = val
          })
        }
      }
    },
    mounted(){
      if(localStorage.userInfo) {
        this.isShow = false
      }
    },
    methods: {
      goToPage(val){
        this.$emit(val)
        this.handleClose()
      },
       gotoSearh(){
        this.$emit('gotoSearh', this.searchVal)
        this.searchVal = ''
        this.handleClose()
      },
      open(){
        this.drawer = true
      },
      handleClose() {
        this.drawer = false
      }
    }
  };
</script>
<style lang='less'>
.mobile-nav-box{
  background: #206be7;
  .el-drawer__header{
    color:#fff;
  }
}
</style>
<style lang='less' scoped>
.el-menu-demo{
  background: transparent;
  border-right: 0;
  /deep/.el-submenu__title{
    background: transparent;
    i{
      color:#fff;
    }
  }
  /deep/.el-menu-item,/deep/.el-submenu__title{
      color: #fff;
      font-size: 14px;
      line-height: 40px;
      height: 40px;
      border-bottom: 1px solid rgba(0,0,0,.05);
  }
  /deep/.el-menu-item.is-active,/deep/.el-menu-item:hover{
        background: rgba(255,255,255,.1);
  }
  /deep/.el-submenu .el-menu-item-group__title{
      display: none;
    }
  /deep/.el-submenu .el-menu{
    background: transparent;
    
    .el-menu-item{
      padding: 0 20px !important;
      display: flex;
      align-items: center;
      img{
        width: 50px;
        height: auto;
        max-height: 50px;
        margin-right: 5px;
      }
    }
  }
}
.btn-common{
    padding: 8px 30px!important;
    line-height: 22px;
    text-align: center;
    color: rgba(255,255,255,.8);
    background: rgba(255,255,255,.1);
    border: none;
}
.btn-common:hover{
  background: rgba(255, 255, 255, 0.2);
}
.hasflexBtn{
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.btn-box{
  margin: 10px 20px;
}
.wid_48{
  width: 48%
}
.wid_100{
  width: 100%;
}
.btn-search{
  margin-top:10px;
}
.search-box{
      margin: 0px 20px;
}
</style>
<template>
  <div class="knowledge waterfall wf-wrap" ref="waterfall">
    <BreadCrumb></BreadCrumb>
      <div class='wrap'>
        <div class='wrap-head'>
          <div class='multi-filter-cat hasBorder'>
            <div class='multi-filter-title'>分类</div>
            <ul class='multi-filter-ul'>
              <li v-for='item in selectType' 
              :key='item.articleTypeId' 
              :class='{active:item.articleTypeId==params.articleTypeId}'
              @click='selClassfiy(item.articleTypeId)'
              >
                {{item.articleTypeName}}
              </li>
            </ul>
          </div>
          <div class='multi-filter-order'>
            <div class='multi-filter-title'>排序</div>
            <ul class='multi-filter-ul'>
              <li v-for='(item,index) in orderArr' 
              :key='index' 
              :class='{active:item.value==params.orderBy}'
              @click='selOrder(item.value)'
              >
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
       <div v-if='waterfallList.length>0' >
        <div class='wrap-foot' :style="`height:${this.loopListHei}px`">
          <!-- <transition-group name="list"> -->
            <LoopItem
              v-for="item in waterfallList"
              :key="item.article.articleId"
              class="wf-item"
              :listItem='item'
              :style="{top:item.top+ 'px',left:item.left+'px', width:item.width+'px', height:item.height+'px'}"
            >
            </LoopItem>
          <!-- </transition-group> -->
        </div>
        <div class='load-more-wrap'>已经到底啦</div>
      </div>
      <NoData v-if='waterfallList.length==0'/>
  </div>
</template>
<script>
import BreadCrumb from '@/components/layout/breadCrumb.vue'
import NoData from '@/components/empty/nodata.vue'
import LoopItem from './components/loopItem.vue'
import article from '@/api/modules/article'
String.prototype.pxWidth = function(font) {
  var canvas = String.prototype.pxWidth.canvas || (String.prototype.pxWidth.canvas = document.createElement("canvas")),
      context = canvas.getContext("2d"); 
 
  font && (context.font = font);
  var metrics = context.measureText(this);
 
  return metrics.width;
}
export default {
  name: "Waterfall",
  components:{
    BreadCrumb,
    LoopItem,
    NoData
  },
  data() {
    return {
      waterfallList: [],

      waterfallCol: 4,
      colWidth: 236,
      marginRight: 15,
      marginBottom: 15,
      colHeights: [],
      loopListHei: 0,

      listQuery: {
        page: 1,
        pageSize: 10
      },
      totalPage: 0,
      loadFlag: false,

      selectType: [],
      params:{
        articleTypeId:'',
        orderBy:''
      },
      orderArr:[
        {name:'默认',value: ''},
        {name:'阅读数',value: 'viewCount'},
        {name:'评论数',value: 'commentCount'},
        {name:'点赞数',value: 'thumbUpCount'},
        {name:'收藏数',value: 'collectCount'}
        ],

        screenWidth:null
    };
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll) // 监听页面滚动
    window.addEventListener('resize',  this.$utils.debounce(this.resetList,300))
  },
  watch:{
    '$route.params.id':{
       immediate:true,
       handler:function(newVal,oldVal){
          if(newVal != oldVal){
          this.getType()
          this.selClassfiy(newVal)
        }
       }
    },
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$utils.debounce(this.resetList,300))
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    //
    async getType(){
      const res = await article.getTypeList({scene:1})
      this.selectType = res.object.articleTypes || []
    },
    //点击分类
    selClassfiy(val){
      this.params.articleTypeId = val||this.selectType[0].articleTypeId
      this.resetList()
    },
    //点击排名
    selOrder(val){
      this.params.orderBy = val
      this.resetList()
    },
    resetList(){
      //重置
      this.listQuery.page = 1
      this.waterfallList = []
      this.loopListHei = 0
      this.init();
    },
    onScroll() {
      this.loadMore()
    },
    loadMore() {
      const clientHei = document.documentElement.clientHeight || document.body.clientHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (parseInt(scrollHeight - clientHei  - scrollTop) <= 500 &&!this.loadFlag && this.listQuery.page<this.totalPage) {
        this.loadFlag = true;
        setTimeout(() => {
          this.listQuery.page++
          this.loadImgs();
        }, 200);
      }
    },
    init() {
      //
      let waterWid = this.judgeScreen()
      // 初始化时，每栏高度都为0
      this.colHeights = new Array(this.waterfallCol);
      for (let i = 0; i < this.colHeights.length; i++) {
        this.colHeights[i] = 0;
      }
      this.colWidth = ((waterWid - (this.waterfallCol - 1) * this.marginRight) / this.waterfallCol)
      this.colWidth = this.colWidth.toFixed(2)*1
      this.loadImgs();
    },
    judgeScreen(){
       const clientWid = document.body.clientWidth
       
       // 根据不同屏幕限制不同的元素个数
        let wid = 0
        if(clientWid > 1500){
          wid = 1200
          this.waterfallCol = 4

        }else if(clientWid < 1500 && clientWid >= 1200){
          this.waterfallCol = 4
          wid = clientWid*0.8

        }else if(clientWid < 1200 && clientWid >=1024) {
          this.waterfallCol = 3
          wid = clientWid*0.9

        }else if(clientWid <1024 && clientWid >=768){
          this.waterfallCol = 3
          wid = clientWid - 20

        }else{
          this.waterfallCol = 2
          wid = clientWid - 20
        }
        return wid
    },
    async loadImgs() {
      this.loadFlag = true;
      const obj = {
        ...this.params,
        ...this.listQuery
      }
      let res = await this.$api.article.getArticleList(obj)
      let objArr = res.object.result||[]
      this.totalPage = res.object.pages
        let promiseAll = [],
          imgs = [],
          total = objArr.length;

        let newArr = []
        for (let i = 0; i < total; i++) {
          promiseAll[i] = new Promise(resolve => {

            let _that = objArr[i]
            const {articleTitle,articleThumbImg} = _that.article
            //先计算文字的高度--start
            if(articleTitle&&(articleTitle.pxWidth('normal 15px Microsoft YaHei')+30)>this.colWidth){
              _that.wordHei = 75
            }else{
              _that.wordHei = 53
            }
            //先计算文字的高度--end
            _that.index = i

            if(!articleThumbImg){
              _that.height = 82+_that.wordHei;
              _that.width = this.colWidth;
              
              newArr.push(_that);
              resolve(_that);
            }else{
                imgs[i] = new Image();
                imgs[i].src = articleThumbImg;
                imgs[i].onload = () => {
                  _that.height = (imgs[i].height * this.colWidth) / imgs[i].width + 82 + _that.wordHei;
                  _that.width = this.colWidth;
                   newArr.push(_that)
                    resolve(_that);
                  }
            }
          });
      }
       Promise.all(promiseAll).then(() => {
        //先排序S
        
        newArr.sort((a, b) => {
          return a.index - b.index
        })
        //先排序E

         newArr.forEach((item)=>{
            this.rankImgs(item)
            const {top, height} = item
            const hei = top  + height + this.marginBottom
            this.loopListHei = Math.max(hei,this.loopListHei)
         })
         this.waterfallList.push(...newArr)

          this.loadFlag = false;
        });
      
    },

    rankImgs(val) {
      let min = this.filterMin();
     
      val.top = min.minHeight ;
      val.left = min.minIndex * (this.colWidth + this.marginRight);  
      this.colHeights[min.minIndex] += val.height + this.marginBottom;
    },

    filterMin() {
      let minHeight = Math.min.apply(null, this.colHeights);
      return {
        minHeight: minHeight,
        minIndex: this.colHeights.indexOf(minHeight)
      };
    }
  }
};
</script>

<style scoped lang='less'>
@theme-gray-color:rgba(38,38,38,0.8);
@theme-black-color:rgb(38,38,38);
@theme-light-color:rgb(240,240,240);
@theme-color:rgb(32,107,231);
ul li {
  list-style: none;
}

.wf-wrap {
  position: relative;
  // width: 100%;
  // height: 100vh;
  // overflow: scroll;
}
.load-more-wrap{
  text-align: center;
    font-size: 13px;
    color:@theme-gray-color;
    position: relative;
    background: #f5f5f5;
    position: relative;
    z-index: 1;
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
.wf-item {
  position: absolute;
  z-index: 2;
}
.wf-item img {
  width: 100%;
  height: 100%;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.knowledge{
  max-width: 1200px;
  width: 80%;
  margin: 0 auto;
  padding: 64px 0 20px;
  // overflow: hidden;
  min-height: calc(100vh - 160px);
  .wrap-foot{
    position: relative;
  }
  .wrap-head{
      padding: 20px;
      margin-bottom: 20px;
      background: #fff;
      font-size: 14px;
      .multi-filter-cat{
        margin-bottom: 20px;
        padding-bottom: 20px;
      }
      .multi-filter-cat,.multi-filter-order{
          display: flex;
          width: 100%;          
          font-size: 14px;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
        .multi-filter-title{
          width: 90px;
          margin: 0 10px 0 0;
          font-size: inherit;
          -ms-flex-negative: 0;
          flex-shrink: 0;
          line-height: 24px;
          color:@theme-black-color
        }
        .multi-filter-ul{
          width: 100%;
          padding: 0;
          margin: 0 0 -10px;
          list-style: none;
          li{
            display: inline-block;
            vertical-align: top;
            margin-right: 10px;
            margin-bottom: 10px;
            padding: 0 8px;
            color: @theme-gray-color;
            line-height: 24px;
            cursor: pointer;
          }
          .active{
            border-radius: 2px;
            color: #fff;
            background:@theme-color
          }
        }
      }
      .hasBorder{
        border-bottom: 1px solid @theme-light-color;
      }
  }
}
@media screen and (max-width:1500px){
  .knowledge  {
    width:80%;
  }
}
@media screen and (max-width:1200px){
  .knowledge  {
    width:90%;
  }
}
@media screen and (max-width:1024px){
  .knowledge  {
    width:calc(100% - 20px);
    min-height: calc(100vh - 100px);
    .wrap-head{
      padding:10px 0;
      margin-bottom: 10px;
      background: transparent;
      .multi-filter-cat{
        margin-bottom: 10px;
        padding-bottom: 10px;
        .multi-filter-title{
          width: 40px;
        }
        .multi-filter-ul li{
          margin-right: 5px;
          margin-bottom: 5px;
        }
      }
      .multi-filter-order{
         .multi-filter-title{
          width: 40px;
        }
        .multi-filter-ul li{
          margin-right: 5px;
          margin-bottom: 5px;
        }
      }
      
    }
  }
}
@media screen and (max-width:768px){
   .knowledge  {
    width: calc(100% - 20px);
    min-height: calc(100vh - 56px);
  }
  .load-more-wrap{
    background: #fff;
  }
}
</style>
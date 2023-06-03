import httpRes from '@/request/request'
const article = {
  subPubilc (parameter) {
    return httpRes({
      url: '/article/add_article',  //投稿
      method: 'post',
      data: parameter
    })
  },
  //修改投稿
  updateArticle (parameter) {
    return httpRes({
      url: '/article/update_article',
      method: 'post',
      data: parameter
    })
  },
  getTypeList(parameter={scene:''}){
    return httpRes({
      url: '/article/type_list',  //知识分类列表
      method: 'get',
      params: parameter
    })
  },
  getArticleList(parameter){
    return httpRes({
      url: '/article/article_list',  //文章列表
      method: 'post',
      data: parameter
    })
  },
  // 获取文章详情
  getArticleDetail(parameter){
    return httpRes({
      url: '/article/article_detail',
      method: 'get',
      params: parameter
    })
  },
  getNewArticle(parameter){
    return httpRes({
      url: '/user/new_article_list',  //获取最新10条
      method: 'get',
      params: parameter
    })
  },
  // 点赞
  dianzan(parameter) {
    return httpRes({
      url: '/article/thumbUp_article', 
      method: 'post',
      data: parameter
    })
  },
  // 收藏
  collect(parameter) {
    return httpRes({
      url: '/article/collect_article', 
      method: 'post',
      data: parameter
    })
  },
  // 获取评论数据
  getCommentData(parameter) {
    return httpRes({
      url: '/article/article_comments', 
      method: 'post',
      data: parameter
    })
  },
  // 发布评论
  sendComment(parameter) {
    return httpRes({
      url: '/article/add_comment', 
      method: 'post',
      data: parameter
    })
  }
}
export default article
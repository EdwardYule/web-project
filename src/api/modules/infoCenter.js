import httpRes from '@/request/request'

const api = {
    // 获取自己的文章列表
    getWritingList (parameter) {
      return httpRes({
        url: '/user/personal/article_list',
        method: 'post',
        data: parameter
      })
    },
    // 获取别人的文章列表
    getOtherList (parameter) {
      return httpRes({
        url: '/user/get_article_list',
        method: 'post',
        data: parameter
      })
    },
    // 获取热门标签
    getHotTags() {
        return httpRes({
            url: '/article/label_list',
            method: 'get'
        })
    },
    // 投稿贡献榜前10名
    rankingContributions(){
        return httpRes({
            url: '/user/top_contributors',
            method: 'get'
        })
    },
    // 获取用户信息
    getUserInfo(parameter){
        return httpRes({
            url: '/user/get_user_info',
            method: 'get',
            params: parameter 
        })
    }
    
  }

  export default api
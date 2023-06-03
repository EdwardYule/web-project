import httpRes from '@/request/request'
const home = {
    getBanner () {
      return httpRes({
        url: '/article/banner_list',  //获取banner
        method: 'get'
      })
    },
}
export default home
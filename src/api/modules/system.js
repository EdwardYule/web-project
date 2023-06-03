import httpRes from '@/request/request'
const api = {
  // 获取logo
  getLogo () {
    return httpRes({
      url: '/config/get_global_config',
      method: 'get'
    })
  },
  // 登录请求
  login (parameter) {
    return httpRes({
      url: '/user/email_login',
      method: 'post',
      data: parameter
    })
  },
  // 退出登录
  logout () {
    return httpRes({
      url: '/user/account/logout',
      method: 'post'
    })
  },
  // 注册请求
  register (parameter) {
    return httpRes({
      url: '/user/email_register',
      method: 'post',
      data: parameter
    })
  }
}






export default api

import httpRes from '@/request/request'

const api = {
    // 更新用户信息
    updateUserInfo (parameter) {
      return httpRes({
        url: '/user/update_user_info',
        method: 'post',
        data: parameter
      })
    },
    // 邮箱验证
    emailVerification (parameter) {
        return httpRes({
          url: '/user/account/send_email_code',
          method: 'post',
          data: parameter
        })
      },
    //   验证验证码
    verificationCode(parameter) {
        return httpRes({
            url: '/user/account/verify_email_code',
            method: 'post',
            data: parameter
        })
    },
    // 获取系统通知
    getSystemNotice() {
        return httpRes({
            url: '/message/get_message_list',
            method: 'get'
        })
    },
    // 设置是否已读未读
    messageRead(parameter) {
      return httpRes({
          url: '/message/set_message_read',
          method: 'post',
          data: parameter
      })
    },
    // 修改密码
    updataPass(parameter) {
        return httpRes({
            url: '/user/update_password',
            method: 'post',
            data: parameter
        })
    }
  }

  export default api
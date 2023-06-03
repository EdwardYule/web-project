import router from './router'

const whiteList = [
  '/contribute',
  '/basicInfo' // 进入需要登录的页面
]

router.beforeEach((to, from, next) => {

  const hasToken = localStorage.userToken

  if(hasToken){
    next()
  }else{
    if (whiteList.indexOf(to.path) > -1) { 
      next(`/home`)
      return
    } else { 
      next()
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import article from '@/api/modules/article'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {},
        logo: '',
        userToken: '',
        selectType: []
    },
    mutations: {
        setUserInfo(state, userInfo){
            state.userInfo = userInfo
        },
        setToken(state, token){
            state.userToken = token
        },
        setLogo(state, logo){
            state.logo = logo
        },
        setClassfiy(state, selectType){
            state.selectType = selectType
        },
    },
    actions:{
        getClassfig({ commit }){
            return new Promise((resolve, reject) => {
                article.getTypeList().then((res)=>{
                    if(res.code == 0) {
                        const selectType = res.object.articleTypes || []
                        commit('setClassfiy', selectType)
                        localStorage.ClassfiyList = JSON.stringify(selectType)
                        resolve(selectType)
                    }else{
                        reject(res)
                    }          
                })
                .catch(error => {
                    reject(error)
                  })
            })  
        }
    }
})

export default store
import axios from 'axios'
import router from '@/router'
import { Message } from "element-ui";

console.log(process.env)
const instance = axios.create({
    baseURL: 'https://test.yulyx.com/api/',
    timeout: 60000
})

function genOpts() {
    let headers = {}
    if (localStorage.userToken) {
        headers = {
            'userToken': localStorage.userToken
        }
    }
    return {
        method: 'get',
        url: '',
        data: null,
        params: null,
        headers
    }
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    if (response.data.code != 0) {
        if(response.data.code == 403) {
            router.push('/home')
            Message.error({
                message: '用户未登录,请选登录!'||response.data.message,
                grouping: true
            });
        }else{
            Message.error({
                message: response.data.message,
                grouping: true
            });
        }
        return Promise.reject(response.data)
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default async function httpRes(options) {
    var opts = {
        ...genOpts(),
        ...options,
    };
    let res = await instance(opts)
    if (res && res.status == 200) {
        return res.data
    } else {
        return Promise.reject(res)
    }
}
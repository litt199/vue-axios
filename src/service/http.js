import axios from 'axios'
import service from './contactApi'
import { config } from 'shelljs';

//service 遍历不同输出不同的请求方法
let instance = axios.create({
    baseURL:'http://localhost:9000/api',
    timeout:1000
})
const Http = {};//包裹请求方法的容器
//请求格式或参数的统一
for(let key in service){
    let api = service[key];//url method
    //async 作用：避免进入回调地域,以下写很多
    // axios.get().then(res=>{
    //     axios.get().then(res=>{})
    // })
    Http[key] = async function(
        params,//请求参数get:url,put,post,patch,delete:url
        isFormData=false,//标识是否是form-data请求
        config={}//配置参数
    ){
        let newParams = {}
        //content-type是否是form-data的判断
        if(params && isFormData){
            newParams = new FormData()
            for(let i in params){
                newParams.append(i,params[i]);
            }
        }else{
            newParams = params;
        }
        //不同请求的判断
        let response = {}//请求的返回值
        if(api.method === "put" || api.method === "post" || api.method === "patch"){
            try{
                response = await instance[api.method](api.url,newParams.config);
            }catch(err){
                response = err;
            }

        }else if(api.method === "delete" || api.method === "get"){
            config.params = newParams;
            try{
                response = await instance[api.method](api.url.config);
            }catch(err){
                response = err;
            }
        }
        return response;
    }
}
//请求拦截器的添加
instance.interceptors.request.use(config=>{
    //请求前做些什么
},err=>{
    //请求失败
    console.log("请求错误，请稍后重试")
})
instance.interceptors.response.use(res=>{
    return res.data
},()=>{
    console.log("请求错误，请稍后重试")
})
export default Http;

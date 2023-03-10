import axios, {AxiosRequestConfig} from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

axios.defaults.timeout = 5000;
let windows = "127.0.0.1";
let liunx = "101.42.34.131";
const service = axios.create({
  baseURL: `http://${liunx}:3000/`,
  timeout: 6000,
  headers: {
    "Content-type": "application/json",
  },
});

const httpObj = {
  async get<t = any>(url: string, config?: any): Promise<t> {
    return await service.get(url, config);
  },
  async post<t = any>(url: string, data?: object, config?: any): Promise<t> {
    return await service.post(url, data, config);
  },
  async put<t = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<t> {
    return await service.put(url, data, config);
  },

  async delete<t = any>(url: string, data: any): Promise<t> {

    return await axios.request({

      url: `http://${liunx}:3000/${url} `,
      method: "delete",
      data: { id: data.id },
      headers: {
        token: data.token,
      },
    });
  },
};

service.interceptors.request.use(req =>{
  return req;
},error =>{
console.log(error)
} )

service.interceptors.response.use(function (response) {
  console.log(response)
  if (response.data.code == "401" ){
    ElMessage.error('登录信息过期！请重新登录！')
    localStorage.clear();
    router.push({path:'/backstage/login'})
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default { httpObj, service };

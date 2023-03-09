import axios, {AxiosRequestConfig} from "axios";

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
      url: `http://127.0.0.1:3000/${url} `,
      method: "delete",
      data: { id: data.id },
      headers: {
        token: data.token,
      },
    });
  },
};
export default { httpObj, service };

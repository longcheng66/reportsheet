import axios from 'axios';


// 创建axios实例
export const request = axios.create({
  baseURL: 'http://192.168.110.80:8809', // 基础URL
  timeout: 100000, // 请求超时时间
});


// 添加请求拦截器
request.interceptors.request.use(
        config => {
          // 在发送请求之前做些什么
          // 例如：添加token认证
          const token = localStorage.getItem('token');
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
          return config;
        },
        error => {
          // 对请求错误做些什么
          return Promise.reject(error);
        }
      );
      
      // 添加响应拦截器
      request.interceptors.response.use(
        response => {
          // 对响应数据做点什么
          if (response.data) {
            return response;
          }
          return Promise.reject(new Error('响应数据为空'));
        },
        error => {
          // 对响应错误做点什么
          if (error.response && error.response.status === 401) {
            // token已失效，清除本地存储的token
            localStorage.removeItem('token');
            // 可以根据需要重定向到登录页面
            window.location.href = '/';
            return Promise.reject(new Error('token已失效，请重新登录'));
          }
          return Promise.reject(error);
        }
      );
      
      
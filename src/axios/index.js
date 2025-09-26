import axios from 'axios';

// 默认基础地址
axios.defaults.baseURL = '/';

// 默认超时时间（毫秒）
axios.defaults.timeout = 10000000;

// 请求拦截
axios.interceptors.request.use(
    (config) => {
        console.log(config);
        return config;
    },
    (err) => {
        err = new Error(err);
        console.error(err);
        return Promise.reject(err);
    }
);

// 响应拦截
axios.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        err = new Error(err);
        console.error(err);
        return Promise.reject(err);
    }
);

export default axios;

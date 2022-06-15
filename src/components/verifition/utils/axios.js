import axios from 'axios';

// axios.defaults.baseURL = 'https://captcha.anji-plus.com/captcha-api';
const baseURL = `/api`

const service = axios.create({
    baseURL: baseURL,
    timeout: 40000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
    },
})

axios.defaults.withCredentials = true;  //让ajax携带cookie

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        return res
    },
    error => {
    }
)
export default service

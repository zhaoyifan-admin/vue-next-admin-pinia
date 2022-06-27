import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import {getStore, Session} from '/@/utils/storage';
const baseURL = `/api`
// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: baseURL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
	(config:any) => {
		// 在发送请求之前做些什么 token
		const language = getStore({name: 'language'});
		const tenant_Id = getStore({ name: 'tenantId' });
		if (tenant_Id) {
			config.headers['TENANT-ID'] = tenant_Id;
		}
		if (language) {
			config.headers['rtdp-language'] = language;
		} else {
			config.headers['rtdp-language'] = 'zh-CN';
		}
		if (getStore({name: "access_token"})) {
			(<any>config.headers).common['Authorization'] = 'Bearer' + getStore({name: "access_token"});
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response) => {
		// 对响应数据做点什么
		const res = response.data;
		if (res.code && res.code !== 0) {
			// `token` 过期或者账号已在别处登录
			if (res.code === 401 || res.code === 4001) {
				Session.clear(); // 清除浏览器全部临时缓存
				window.location.href = '/'; // 去登录页
				ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
					.then(() => {})
					.catch(() => {});
			}
			return Promise.reject(service.interceptors.response);
		} else {
			return response.data;
		}
	},
	(error) => {
        console.log(error)
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络连接请求超时，请重试。');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else if (error.message.indexOf('503') != -1) {
			ElMessage.error('服务不可用，请联系管理员	');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

// 导出 axios 实例
export default service;

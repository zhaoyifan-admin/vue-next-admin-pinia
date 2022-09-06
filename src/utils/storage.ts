import Cookies from 'js-cookie';
import {validatenull} from "/@/utils/util";
const StorageKeyName = 'tjeh_'
/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
	// 设置永久缓存
	set(key: string, val: any) {
		window.localStorage.setItem(key, JSON.stringify(val));
	},
	// 获取永久缓存
	get(key: string) {
		let json: any = window.localStorage.getItem(key);
		return JSON.parse(json);
	},
	// 移除永久缓存
	remove(key: string) {
		window.localStorage.removeItem(key);
	},
	// 移除全部永久缓存
	clear() {
		window.localStorage.clear();
	},
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置临时缓存
	set(key: string, val: any) {
		if (key === 'token') return Cookies.set(key, val);
		window.sessionStorage.setItem(key, JSON.stringify(val));
	},
	// 获取临时缓存
	get(key: string) {
		if (key === 'token') return Cookies.get(key);
		let json: any = window.sessionStorage.getItem(key);
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key: string) {
		if (key === 'token') return Cookies.remove(key);
		window.sessionStorage.removeItem(key);
	},
	// 移除全部临时缓存
	clear() {
		Cookies.remove('token');
		window.sessionStorage.clear();
	},
};
/**
 * document.cookie 浏览器临时缓存
 * @author zyf
 * @method setCookie 设置临时缓存
 * @method getCookie 获取临时缓存
 * @method removeCookie 移除临时缓存
 * @method getAllCookie 获取全部临时缓存
 * @method clearCookie 移除全部临时缓存
 */
export const setCookie = (params:any = {}) => {
	let {name, content} = params;
	name = StorageKeyName + name;
	Cookies.set(name, content);
}
export const getCookie = (params:any = {}) => {
	let {name} = params;
	name = StorageKeyName + name;
	return Cookies.get(name);
}
export const clearCookie = (params:any = {}) => {
	let {name, content} = params;
	name = StorageKeyName + name;
	Cookies.remove("access_token");
}
/**
 * window.sessionStorage 浏览器临时缓存
 * @author zyf
 * @method setStore 设置临时缓存
 * @method getStore 获取临时缓存
 * @method removeStore 移除临时缓存
 * @method getAllStore 获取全部临时缓存
 * @method clearStore 移除全部临时缓存
 */
export const setStore = (params:any = {}) => {
	let {name, content, type} = params;
	name = StorageKeyName + name
	const obj = {
		dataType: typeof (content),
		content: content,
		type: type,
		datetime: new Date().getTime()
	}
	if (type) {
		window.sessionStorage.setItem(name, JSON.stringify(obj))
	} else {
		window.localStorage.setItem(name, JSON.stringify(obj))
	}
}
export const getStore = (params:any = {}) => {
	let name: any, debug: any;
	({name, debug} = params);
	name = StorageKeyName + name
	let obj: any = {}
	let content
	obj = window.sessionStorage.getItem(name)
	if (validatenull(obj)) obj = window.localStorage.getItem(name)
	if (validatenull(obj)) return
	try {
		obj = JSON.parse(obj)
	} catch (e) {
		return obj
	}
	if (debug) {
		return obj
	}
	if (obj.dataType === 'string') {
		content = obj.content
	} else if (obj.dataType === 'number') {
		content = Number(obj.content)
	} else if (obj.dataType === 'boolean') {
		content = eval(obj.content)
	} else if (obj.dataType === 'object') {
		content = obj.content
	}
	return content
}
export const removeStore = (params:any = {}) => {
	let name: any, type: any;
	({name, type} = params);
	name = StorageKeyName + name
	if (type) {
		window.sessionStorage.removeItem(name)
	} else {
		window.localStorage.removeItem(name)
	}
}
export const getAllStore = (params:any = {}) => {
	const list = []
	let type: any;
	({type} = params);
	if (type) {
		for (let i = 0; i <= window.sessionStorage.length; i++) {
			list.push({
				name: window.sessionStorage.key(i),
				content: getStore({
					name: window.sessionStorage.key(i),
					type: 'session'
				})
			})
		}
	} else {
		for (let i = 0; i <= window.localStorage.length; i++) {
			list.push({
				name: window.localStorage.key(i),
				content: getStore({
					name: window.localStorage.key(i)
				})
			})
		}
	}
	return list
}
export const clearStore = (params:any = {}) => {
	let type: any;
	({type} = params);
	if (type) {
		window.sessionStorage.clear()
	} else {
		window.localStorage.clear()
	}
}

import request from '/@/utils/request';
// @ts-ignore
import qs from 'qs';

/**
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function useLoginApi() {
	return {
		signIn: (params: object) => {
			return request({
				url: '/user/signIn',
				method: 'post',
				data: params,
			});
		},
		signOut: (params: object) => {
			return request({
				url: '/user/signOut',
				method: 'post',
				data: params,
			});
		},
	};
}
export const loginByUsername = ({username, password, code, randomStr}: { username: any, password: any, code: any, randomStr: any }) => {
	let grant_type = 'password'
	let dataObj = qs.stringify({ 'username': username, 'password': password })
	const headers = {
		isToken: false,
		'TENANT-ID': '1',
		'Authorization': 'Basic cGlnOnBpZw==',
		'Content-Type': 'application/x-www-form-urlencoded'
	}
	return request({
		url: '/auth/oauth/token',
		headers: headers,
		method: 'post',
		params: {randomStr, code, grant_type},
		data: dataObj
	})
}
/** 测试 */
export function getMenuAdmin(params?: object) {
	return request({
		url: '/admin/language/config/1',
		method: 'get',
		params,
	});
}

/** 租户 */
export function tenantCode(params?: string) {
	return request({
		url: '/admin/tenant/tenantCode/' + params,
		method: 'get',
	});
}

export function getParamByKey(key?: any) {
	return request({
		url: '/admin/param/publicValue/' + key,
		method: 'get'
	})
}
//单点登陆
export function authLogin(token?: any) {
	return request({
		url: '/auth/oauth/check_token',
		headers: {
			isToken: false,
			'TENANT-ID': '1',
			'Authorization': 'Basic cGlnOnBpZw=='
		},
		method: 'get',
		params: { token: token }
	})
}
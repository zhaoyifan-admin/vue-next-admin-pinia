import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { UserInfosStates } from './interface';
import {getStore, Session} from '/@/utils/storage';
import { encryption } from '/@/utils/util';
import {authLogin, loginByUsername} from '/@/api/login/index';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosStates => {
		return ({
			userInfo: getStore({ name: 'userInfo' }) || {},
			isLock: getStore({ name: 'isLock' }) || false,
			tenant_code: getStore({name: 'tenant_code'}) || '',
			access_token: getStore({name: 'access_token'}) || '',
			refresh_token: getStore({name: 'refresh_token'}) || '',
			expires_in: getStore({name: 'expires_in'}) || '',
			employee: getStore({name: 'employee'}) || {},
			opcard: getStore({name: 'opcard'}) || {},
			permissions: getStore({name: 'permissions'}) || {},
			systemlist: getStore({name: 'system_list'}),
			userInfos: {
				userName: '',
				photo: '',
				time: 0,
				roles: [],
				authBtnList: [],
			},
		});
	},
	actions: {
		async setUserInfos() {
			// 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
			const userName = Cookies.get('userName');
			// 模拟数据
			let defaultRoles: Array<string> = [];
			let defaultAuthBtnList: Array<string> = [];
			// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let adminRoles: Array<string> = ['admin'];
			// admin 按钮权限标识
			let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
			// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
			let testRoles: Array<string> = ['common'];
			// test 按钮权限标识
			let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
			// 不同用户模拟不同的用户权限
			if (userName === 'admin') {
				defaultRoles = adminRoles;
				defaultAuthBtnList = adminAuthBtnList;
			} else {
				defaultRoles = testRoles;
				defaultAuthBtnList = testAuthBtnList;
			}
			// 用户信息模拟数据
			const userInfos = {
				userName: userName,
				photo: userName === 'admin'
						? 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg'
						: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=317673774,2961727727&fm=26&gp=0.jpg',
				time: new Date().getTime(),
				roles: defaultRoles,
				authBtnList: defaultAuthBtnList,
			};
			// 存储用户信息到浏览器缓存
			Session.set('userInfo', userInfos);

			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				this.userInfos = userInfos;
			}
		},
		// 根据用户名登录
		LoginByUsername: async function (userInfo: any) {
			const user = encryption({
				data: userInfo,
				key: 'pigxpigxpigxpigx',
				param: ['password']
			})
			console.log(user)
			return new Promise<void>((resolve, reject) => {
				loginByUsername({
					username: user.userName,
					password: user.password,
					code: user.code,
					randomStr: user.randomStr
				}).then(response => {
					const data:any = response;
					Session.set('userInfo', JSON.stringify(data))
					const list:any = {};
					for (let i = 0; i < data.user_info.authorities.length; i++) {
						list[data.user_info.authorities[i].authority] = true
					}
					this.tenant_code = user.tenantCode;
					this.access_token = data.access_token;
					this.refresh_token = data.refresh_token;
					this.expires_in = data.expires_in;
					this.employee = data.employee_info;
					this.opcard = data.opcard_info || {};
					this.permissions = list;
					this.systemlist = data.system_info || {};
					this.userInfo = data.user_info || {};
					// commit('CLEAR_LOCK')
					resolve();
				}).catch(error => {
					reject(error);
				})
			})
		},
		// //单点登录
		// async authLoginByUsername({ commit }, token) {
		// 	return new Promise<void>((resolve, reject) => {
		// 		authLogin(token).then(response => {
		// 			const data = response
		// 			commit('SET_ACCESS_TOKEN', token)
		// 			commit('SET_EXPIRES_IN', data.expires_in)
		// 			commit('SET_USER_INFO', data.user_info)
		// 			commit('SET_EMPLOYEE_INFO', data.employee_info || {})
		// 			commit('SET_PERMISSIONS', data.user_info.authorities || [])
		// 			commit('SET_SYSTEM_LIST', data.system_info || [])
		// 			commit('CLEAR_LOCK')
		// 			resolve();
		// 		}).catch((error) => {
		// 			console.log(error)
		// 			reject("用户凭证已失效")
		// 		})
		// 	})
		// },
	},
});

import request from '/@/utils/request';
import {useUserInfo} from "/@/stores/userInfo";
import {getStore} from "/@/utils/storage";

/**
 * 后端控制菜单模拟json，路径在 https://gitee.com/lyt-top/vue-next-admin-images/tree/master/menu
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 * @method getMenuAdmin 获取后端动态路由菜单(admin)
 * @method getMenuTest 获取后端动态路由菜单(test)
 */
export function useMenuApi() {
    return {
        getMenuAdmin: (params: any) => {
            let systemId = 3;
            if (params) {
                systemId = params
            }
            return request({
                url: '/admin/menu?systemId=' + systemId,
                method: 'get'
            });
        }
    };
}

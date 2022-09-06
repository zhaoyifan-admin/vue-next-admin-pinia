import {RouteRecordRaw} from 'vue-router';
import {storeToRefs} from 'pinia';
import pinia from '/@/stores/index';
import {useUserInfo} from '/@/stores/userInfo';
import {useRequestOldRoutes} from '/@/stores/requestOldRoutes';
import {getCookie, getStore, Session} from '/@/utils/storage';
import {NextLoading} from '/@/utils/loading';
import {dynamicRoutes, notFoundAndNoPower} from '/@/router/route';
import {formatTwoStageRoutes, formatFlatteningRoutes, router} from '/@/router/index';
import {useRoutesList} from '/@/stores/routesList';
import {useTagsViewRoutes} from '/@/stores/tagsViewRoutes';
import {useMenuApi} from '/@/api/menu/index';

const menuApi = useMenuApi();

const layouModules: any = import.meta.glob('../layout/routerView/*.{vue,tsx}');
const viewsModules: any = import.meta.glob('../views/**/*.{vue,tsx}');

// 后端控制路由

/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.glob
 * @link 参考：https://cn.vitejs.dev/guide/features.html#json
 */
const dynamicViewsModules: Record<string, Function> = Object.assign({}, {...layouModules}, {...viewsModules});

/**
 * 后端控制路由：初始化方法，防止刷新时路由丢失
 * @method NextLoading 界面 loading 动画开始执行
 * @method useUserInfo().setUserInfos() 触发初始化用户信息 pinia
 * @method useRequestOldRoutes().setRequestOldRoutes() 存储接口原始路由（未处理component），根据需求选择使用
 * @method setAddRoute 添加动态路由
 * @method setFilterMenuAndCacheTagsViewRoutes 设置路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 */
export async function initBackEndControlRoutes(params?:number) {
    // 界面 loading 动画开始执行
    if (window.nextLoading === undefined) NextLoading.start();
    // 无 token 停止执行下一步
    if(!getCookie({name:'access_token'})) return false;
    // 触发初始化用户信息 pinia
    // https://gitee.com/lyt-top/vue-next-admin/issues/I5F1HP
    await useUserInfo().setUserInfos();
    // 获取路由菜单数据
    const res = await getBackEndControlRoutes(params);
    if (res.data.length != 0) {
        res.data.forEach((v: any) => {
            v.component = `() => import('/@/views` + v.path +`.vue')`;
            v.meta = Object.assign({
                title: v.label,
                isLink: '',
                isHide: false,
                isKeepAlive: true,
                isAffix: false,
                isIframe: false,
            });
        })
    } else {
        return false;
    }
    // 存储接口原始路由（未处理component），根据需求选择使用
    useRequestOldRoutes().setRequestOldRoutes(JSON.parse(JSON.stringify(res.data)));
    // 处理路由（component），替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
    dynamicRoutes[0].children = await backEndComponent(res.data);
    // 添加动态路由
    await setAddRoute();
    // 设置路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
    await setFilterMenuAndCacheTagsViewRoutes();
}

/**
 * 设置路由到 vuex routesList 中（已处理成多级嵌套路由）及缓存多级嵌套数组处理后的一维数组
 * @description 用于左侧菜单、横向菜单的显示
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export function setFilterMenuAndCacheTagsViewRoutes() {
    const storesRoutesList = useRoutesList(pinia);
    storesRoutesList.setRoutesList(dynamicRoutes[0].children as any);
    setCacheTagsViewRoutes();
}

/**
 * 缓存多级嵌套数组处理后的一维数组
 * @description 用于 tagsView、菜单搜索中：未过滤隐藏的(isHide)
 */
export function setCacheTagsViewRoutes() {
    const storesTagsView = useTagsViewRoutes(pinia);
    storesTagsView.setTagsViewRoutes(formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes))[0].children);
}

/**
 * 处理路由格式及添加捕获所有路由或 404 Not found 路由
 * @description 替换 dynamicRoutes（/@/router/route）第一个顶级 children 的路由
 * @returns 返回替换后的路由数组
 */
export function setFilterRouteEnd() {
    let filterRouteEnd: any = formatTwoStageRoutes(formatFlatteningRoutes(dynamicRoutes));
    filterRouteEnd[0].children = [...filterRouteEnd[0].children, ...notFoundAndNoPower];
    return filterRouteEnd;
}

/**
 * 添加动态路由
 * @method router.addRoute
 * @description 此处循环为 dynamicRoutes（/@/router/route）第一个顶级 children 的路由一维数组，非多级嵌套
 * @link 参考：https://next.router.vuejs.org/zh/api/#addroute
 */
export async function setAddRoute() {
    await setFilterRouteEnd().forEach((route: RouteRecordRaw) => {
        router.addRoute(route);
    });
}

/**
 * 请求后端路由菜单接口
 * @description isRequestRoutes 为 true，则开启后端控制路由
 * @returns 返回后端路由菜单数据
 */
export function getBackEndControlRoutes(params:any) {
    return menuApi.getMenuAdmin(params)
}

/**
 * 重新请求后端路由菜单接口
 * @description 用于菜单管理界面刷新菜单（未进行测试）
 * @description 路径：/src/views/system/menu/component/addMenu.vue
 */
export function setBackEndControlRefreshRoutes() {
    getBackEndControlRoutes(getStore({name:'systemId'}));
}

/**
 * 后端路由 component 转换
 * @param routes 后端返回的路由表数组
 * @returns 返回处理成函数后的 component
 */
export function backEndComponent(routes: any) {
    if (!routes) return;
    return routes.map((item: any) => {
        if (item.component) item.component = dynamicImport(dynamicViewsModules, item.component as string);
        item.children && backEndComponent(item.children);
        return item;
    });
}

/**
 * 后端路由 component 转换函数
 * @param dynamicViewsModules 获取目录下的 .vue、.tsx 全部文件
 * @param component 当前要处理项 component
 * @returns 返回处理成函数后的 component
 */
export function dynamicImport(dynamicViewsModules: Record<string, Function>, component: string) {
    const keys = Object.keys(dynamicViewsModules);
    const matchKeys = keys.filter((key) => {
        const k = key.replace(/..\/views|../, '');
        return k.startsWith(`${component}`) || k.startsWith(`/${component}`);
    });
    if (matchKeys?.length === 1) {
        const matchKey = matchKeys[0];
        return dynamicViewsModules[matchKey];
    }
    if (matchKeys?.length > 1) {
        return false;
    }
}

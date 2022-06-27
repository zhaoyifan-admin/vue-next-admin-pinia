import request from '/@/utils/request';

export function fetchList(params?: any) {
    return request({
        url: '/basic/busmodelinfo/page',
        method: 'get',
        params,
    })
}
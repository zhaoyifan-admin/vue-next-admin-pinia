import request from '/@/utils/request';

export function fetchList(params?: any) {
    return request({
        url: '/center/basicopcardinfo/page',
        method: 'get',
        params,
    })
}
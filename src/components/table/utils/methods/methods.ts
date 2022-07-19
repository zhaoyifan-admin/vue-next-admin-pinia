export function visibleChange (val: any) {
    console.log(val)
};

/**
 * 将多维数组递归为一维数组
 */
export function getFlatArr(arr: Array<any>){
    return arr.reduce((a, item) => {
        let flatArr = [...a, item];
        if (item.children) {
            flatArr = [...flatArr, ...getFlatArr(item.children)];
        }
        return flatArr;
    }, []);
};
export function getcolFlatArr(arr: Array<any>){
    return arr.reduce((a, item) => {
        let flatArr = [...a, item];
        if (item.colitem.children) {
            flatArr = [...flatArr, ...getFlatArr(item.colitem.children)];
        }
        return flatArr;
    }, []);
};
/**
 * Created by liudonghui on 2017/11/4.
 */

import axios from 'axios';

/**
 * 生成netApi对象
 * @param config api配置
 * @param useInterceptors 全局拦截器
 * @return {AxiosInstance}
 */
export function generateNet(netConfig, useInterceptors) {
    const netApi = axios.create(netConfig);
    useInterceptors(netApi);
    return netApi;
}

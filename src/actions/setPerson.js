import { netApi as api } from 'network';

export const actions = {
    GETPERSONLIST: 'quotelist/reducer/GETPERSONLIST',
    GETPERSONLIST_PENDING: 'quotelist/reducer/GETPERSONLIST_PENDING',
    GETPERSONLIST_SUCCESS: 'quotelist/reducer/GETPERSONLIST_SUCCESS',
    GETPERSONLIST_ERROR: 'quotelist/reducer/GETPERSONLIST_ERROR',
};
/**
 * 获取人员列表
 */
export function getPersonList(params) {
    return {
        type: actions.GETPERSONLIST,
        payload: {
            promise: api.post('/output/PeopleManagerINfo/getInfo', {
                ...params,
            }),
        },
    };
}

import { netApi as api } from 'network';

export const actions = {
    GETINFO: 'login/reducer/GETINFO',
    GETINFO_SUCCESS: 'login/reducer/GETINFO_SUCCESS',
    GETINFO_ERROR: 'login/reducer/GETINFO_ERROR',
};

export function getInfo(data) {
    return {
        type: actions.GETINFO,
        payload: {
            promise: api.post('/output/PlaceMinitorINfo/getInfo', {
                ...data,
            }),
        },
    };
}

import { netApi as api } from 'network';

export const actions = {
    GETALLPLACE: 'chart/reducer/GETALLPLACE',
    GETALLPLACE_SUCCESS: 'chart/reducer/GETALLPLACE_SUCCESS',
};

export function getAllPlace() {
    return {
        type: actions.GETALLPLACE,
        payload: {
            promise: api.post('/output/PlaceManager/getAllPlace', { test: '12' }),
        },
    };
}

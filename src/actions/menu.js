/**
 * Created by liudonghui on 2018/3/16.
 */

export const actions = {
    UPDATE_COLLAPSED: 'menu/reducer/UPDATE_COLLAPSED',
};

export function updateCollapsed(collapsed) {
    return {
        type: actions.UPDATE_COLLAPSED,
        payload: {
            collapsed,
        },
    };
}


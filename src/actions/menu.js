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


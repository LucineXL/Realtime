import { actions } from 'actions/menu';
import { ReducerFactory } from 'utils/reducerUtil';
import { getPermissions, getMenus } from 'utils/menu';

const permissions = [
    { mark: 'menu_base', name: '总权限' },
];
const codes = getPermissions(permissions || []);
const menus = getMenus(codes || []);

const initialState = {
    menus: menus,
    collapsed: false,
};

const menu = ReducerFactory(initialState, 'menu');

menu.action(actions.UPDATE_COLLAPSED, function (state, action) {
    return Object.assign({}, state, {
        collapsed: action.payload.collapsed,
    });
});

export default menu;

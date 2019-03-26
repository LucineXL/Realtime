/**
 * Created by liudonghui on 2018/3/16.
 */
import { actions } from 'actions/menu';
import { ReducerFactory } from 'utils/reducerUtil';
import { getPermissions, getMenus } from 'utils/menu';

const permissions = [
    { mark: 'menu_base', name: '一级菜单_点检管理' },
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

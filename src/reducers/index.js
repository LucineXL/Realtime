import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import load from './load';
import menu from './menu';
import login from './login';
import chart from './chart';

const rootReducer = combineReducers({
    router: routerReducer,
    load,
    menu,
    login,
    chart,
});

export default rootReducer;

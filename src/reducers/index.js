import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import load from './load';
import menu from './menu';
import login from './login';
import chart from './chart';
import setPerson from './setPerson';

const rootReducer = combineReducers({
    router: routerReducer,
    load,
    menu,
    login,
    chart,
    setPerson,
});

export default rootReducer;

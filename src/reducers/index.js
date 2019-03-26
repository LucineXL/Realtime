import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import load from './load';
import menu from './menu';
import login from './login';

const rootReducer = combineReducers({
    router: routerReducer,
    load,
    menu,
    login,
});

export default rootReducer;

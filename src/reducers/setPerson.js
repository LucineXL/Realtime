import { actions } from 'actions/setPerson';
import { ReducerFactory } from 'utils/reducerUtil';

const initialState = {
    personList: [],
};

const setPerson = ReducerFactory(initialState, 'setPerson');

setPerson.action(actions.GETPERSONLIST_PENDING, function (state, action) {
    return Object.assign({}, state, {
        loading: true,
    });
});

setPerson.action(actions.GETPERSONLIST_SUCCESS, function (state, action) {
    return Object.assign({}, state, {
        personList: (action.payload.data && action.payload.data.data) || [],
        loading: false,
    });
});

setPerson.action(actions.GETPERSONLIST_ERROR, function (state, action) {
    return Object.assign({}, state, {
        loading: false,
    });
});

export default setPerson;

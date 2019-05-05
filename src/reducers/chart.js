import { actions } from 'actions/chart';
import { ReducerFactory } from 'utils/reducerUtil';

const initialState = {
    allPlace: [],
};

const chart = ReducerFactory(initialState, 'chart');

chart.action(actions.GETALLPLACE_SUCCESS, function (state, action) {
    const resData = (action.payload.data && action.payload.data.data) || [];
    return Object.assign({}, state, {
        allPlace: resData.map(item => ({
            id: item.placeId,
            name: item.placeName,
        })),
    });
});

export default chart;

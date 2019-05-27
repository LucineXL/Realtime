import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { getAllPlace } from 'actions/chart';

export default {
    mapStateToProps: state => ({
        allPlace: state.chart.allPlace,
    }),
    mapDispatchToProps: dispatch => ({
        push: bindActionCreators(push, dispatch),
        getAllPlace: bindActionCreators(getAllPlace, dispatch),
    }),
};

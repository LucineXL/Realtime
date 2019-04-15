import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { getInfo } from 'actions/chart';

export default {
    mapStateToProps: state => ({
    }),
    mapDispatchToProps: dispatch => ({
        push: bindActionCreators(push, dispatch),
        getInfo: bindActionCreators(getInfo, dispatch),
    }),
};

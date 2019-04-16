import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

export default {
    mapStateToProps: state => ({
    }),
    mapDispatchToProps: dispatch => ({
        push: bindActionCreators(push, dispatch),
    }),
};

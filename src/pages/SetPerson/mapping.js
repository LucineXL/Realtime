import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { getPersonList } from 'actions/setPerson';

export default {
    mapStateToProps: state => ({
        personList: state.setPerson.personList,
    }),
    mapDispatchToProps: dispatch => ({
        push: bindActionCreators(push, dispatch),
        getPersonList: bindActionCreators(getPersonList, dispatch),
    }),
};

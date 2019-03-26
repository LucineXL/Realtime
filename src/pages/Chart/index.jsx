import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapToProps from './mapping';
import styles from './index.less';

@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class Chart extends React.PureComponent {
    static propTypes = {
        location: PropTypes.object,
        login: PropTypes.func,
        form: PropTypes.object,
        loginStatus: PropTypes.string,
        push: PropTypes.func,
    }

    componentDidMount() {
    }

    render() {
        // const { } = this.props;
        return (
            <div className={styles.chartWrapper}>
                哈哈哈
            </div>
        );
    }
}

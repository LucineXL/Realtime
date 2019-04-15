import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
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
        getInfo: PropTypes.func,
    }

    componentDidMount() {
        this.props.getInfo({
            placeNam: '西安电子科技大学',
        });
    }

    render() {
        // const { } = this.props;
        const option = {
            title: {
                text: '公共地点人流量云监管数据图表',
            },
            // width: '100%',
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {},
            }],
        };
        return (
            <div className={styles.chartWrapper}>
                <ReactEcharts option={option} style={{ width: '100%' }}/>
            </div>
        );
    }
}

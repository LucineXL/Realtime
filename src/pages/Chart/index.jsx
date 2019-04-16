import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import { netApi as api } from 'network';
import mapToProps from './mapping';
import styles from './index.less';

@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class Chart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                xAxis: [],
                yAxis: [],
                place: '',
            },
        };
    }
    static propTypes = {
        location: PropTypes.object,
        login: PropTypes.func,
        form: PropTypes.object,
        loginStatus: PropTypes.string,
        push: PropTypes.func,
        getInfo: PropTypes.func,
    }

    componentDidMount() {
        this.getPlaceInfo();
        this.getInfo();
        this.timer = setInterval(() => {
            this.getInfo();
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getPlaceInfo = async () => {
        await api.post('/output/PeopleManagerINfo/getInfo', { 
            placeName: '东泽园',
        }).then((res) => {
            if (res && res.data && res.data.code === 0 && res.data.data) {
                console.log(res);
            }
        }).catch((err) => {});
    }

    getInfo = async () => {
        const now = new Date().getTime();
        await api.post('/output/PlaceMinitorINfo/getInfo', { 
            placeName: '西安电子科技大学',
            from: now - 1000 * 60 * 60,
            to: now,
        }).then((res) => {
            const xAxis = []; 
            const yAxis = [];
            let place = '';
            if (res && res.data && res.data.code === 0 && res.data.data) {
                res.data.data.forEach((item) => {
                    const { placeTime, peopleTotalNum, placeName } = item;
                    xAxis.push(placeTime);
                    yAxis.push(peopleTotalNum);
                    place = placeName;
                });
                this.setState({
                    chartData: { xAxis, yAxis, place },
                });
            }
        }).catch((err) => {});
    }
    

    render() {
        const { chartData } = this.state;
        const option = {
            title: {
                text: '公共地点人流量云监管数据图表',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartData.xAxis || [],
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                data: chartData.yAxis || [],
                type: 'line',
                areaStyle: {},
            }],
        };
        return (
            <div className={styles.chartWrapper}>
                <ReactEcharts option={option} style={{ width: '100%' }}/>
                <div>监管地点： {chartData.place}</div>
            </div>
        );
    }
}

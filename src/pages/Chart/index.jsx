import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { netApi as api } from 'network';
import { Select } from 'antd';
import mapToProps from './mapping';
import styles from './index.less';

const { Option } = Select;
@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class Chart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            place: 'test1',
            chartData: {
                xAxis: [],
                peopleTotalNumAxis: [],
                redPeopleNumAxis: [],
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
        this.getChartData();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    /**
     * 获取页面所需数据
     */
    getChartData = () => {
        clearInterval(this.timer);
        this.getPlaceInfo();
        this.getInfo();
        this.timer = setInterval(() => {
            this.getInfo();
        }, 5000);
    }

    /**
     * 获取地点信息
     */
    getPlaceInfo = async () => {
        const { place } = this.state;
        await api.post('/output/PeopleManagerINfo/getInfo', { 
            placeName: '东泽园',
            place,
        }).then((res) => {
            if (res && res.data && res.data.code === 0 && res.data.data) {
                console.log(res);
            }
        }).catch((err) => {});
    }

    /**
     * 获取流量信息
     */
    getInfo = async () => {
        const { place } = this.state;
        const now = new Date().getTime();
        await api.post('/output/PlaceMinitorINfo/getInfo', { 
            from: now - 1000 * 60 * 60,
            to: now,
            place,
        }).then((res) => {
            const xAxis = []; 
            const peopleTotalNumAxis = [];
            const redPeopleNumAxis = [];
            let place = '';
            if (res && res.data && res.data.code === 0 && res.data.data) {
                res.data.data.forEach((item) => {
                    const { placeTime, peopleTotalNum, redPeopleNum, placeName } = item;
                    xAxis.push(placeTime ? moment(placeTime).format('YYYY-MM-DD HH:mm:ss') : placeTime);
                    peopleTotalNumAxis.push(peopleTotalNum);
                    redPeopleNumAxis.push(redPeopleNum);
                    place = placeName;
                });
                this.setState({
                    chartData: { xAxis, peopleTotalNumAxis, redPeopleNumAxis, place },
                });
            }
        }).catch((err) => {});
    }
    
    /**
     * 切换地点
     */
    changePlace = (value) => {
        this.setState({
            place: value,
        }, () => {
            this.getChartData();
        });
    }

    render() {
        const { chartData, place } = this.state;
        const option = {
            title: {
                text: '公共地点人流量云监管数据图表',
            },
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,250,0.2)',
            },
            legend: {
                data: ['peopleTotalNum', 'redPeopleNum'],
                itemGap: 5,
                right: 0,
            },
            grid: {
                top: '12%',
                left: '3%',
                right: '4%',
                bottom: '13%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartData.xAxis || [],
            },
            yAxis: {
                type: 'value',
            },
            dataZoom: [{
                type: 'slider',
                show: true,
                start: 94,
                end: 100,
                handleSize: 8,
                bottom: -10,
            }],
            series: [{
                name: 'peopleTotalNum',
                data: chartData.peopleTotalNumAxis || [],
                type: 'line',
                areaStyle: {},
            }, {
                name: 'redPeopleNum',
                data: chartData.redPeopleNumAxis || [],
                type: 'line',
                areaStyle: {},
            }],
        };
        return (
            <div className={styles.chartWrapper}>
                <div className={styles.chartHead}>
                    地点：<Select style={{ width: '120px' }} value={place}
                        onChange={this.changePlace}>
                        {
                            ['test1', 'test2'].map(item => (
                                <Option value={item} key={item}>{item}</Option>
                            ))
                        }
                    </Select>
                </div>
                <ReactEcharts option={option} style={{ width: '100%', height: '80%' }}/>
                <div style={{ marginTop: '20px' }}>监管地点： {chartData.place}</div>
            </div>
        );
    }
}

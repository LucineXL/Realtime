import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { netApi as api } from 'network';
import { Select, Row, Col } from 'antd';
import { getSelectOptions } from 'utils';
import mapToProps from './mapping';
import styles from './index.less';

@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class Chart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            place: undefined,
            sort: '0',
            sortPlace: [],
            securityPersonnelName: '',
            chartData: {
                xAxis: [],
                peopleTotalNumAxis: [],
                redPeopleNumAxis: [],
                place: '',
            },
        };
    }
    static propTypes = {
        push: PropTypes.func,
        getInfo: PropTypes.func,
        getAllPlace: PropTypes.func,
        allPlace: PropTypes.array,
    }

    componentWillReceiveProps(nexrProps) {
        const { allPlace } = nexrProps;
        const { place } = this.state;
        if (!place && JSON.stringify(allPlace) !== JSON.stringify(this.props.allPlace)) {
            this.setPlace(allPlace);
        }
    }

    componentDidMount() {
        const { allPlace, getAllPlace } = this.props;
        if (allPlace && allPlace.length) {
            this.setPlace(allPlace);
        } else {
            getAllPlace();
        }
    }


    componentWillUnmount() {
        clearInterval(this.timer);
    }

    /**
     * 时间参数; { placeTimeFrom: 一小时前时间戳，placeTimeTo： 现在时间戳 }
     */
    getTime = () => {
        const now = new Date().getTime();
        return {
            placeTimeFrom: now - 1000 * 60 * 60,
            placeTimeTo: now,
        };
    }

    /**
     * 设置选中地点
     */
    setPlace = (allPlace) => {
        this.setState({
            place: allPlace && allPlace[0] ? { key: allPlace[0].id, label: allPlace[0].name } : undefined,
        }, () => {
            this.getChartData();
        });
    }
    /**
     * 获取页面所需数据
     */
    getChartData = () => {
        this.timer && clearInterval(this.timer);
        this.getPlaceInfo();
        this.getPlaceSort();
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
        if (!place) {
            return;
        }
        await api.post('/output/PeopleManagerINfo/getInfo', {
            placeName: place.label,
            placeId: place.key ? Number(place.key) : undefined,
        }).then((res) => {
            if (res && res.data && res.data.code === 0 && res.data.data) {
                console.log(res);
                const securityPersonnelName = res.data.data && res.data.data[0] && res.data.data[0].securityPersonnelName || '';
                const securityPersonnelPhone = res.data.data && res.data.data[0] && res.data.data[0].securityPersonnelPhone || '';
                const securityPersonnelAddress = res.data.data && res.data.data[0] && res.data.data[0].securityPersonnelAddress || '';
                const securityPersonnelMail = res.data.data && res.data.data[0] && res.data.data[0].securityPersonnelMail || '';
                this.setState({
                    securityPersonnelName, securityPersonnelPhone, securityPersonnelAddress, securityPersonnelMail,
                });
            }
        }).catch((err) => {});
    }

    /**
     * 获取流量信息
     */
    getInfo = async () => {
        const { place } = this.state;
        if (!place) {
            return;
        }
        const timeParam = this.getTime();
        await api.post('/output/PlaceMinitorINfo/getInfo', {
            ...timeParam,
            placeName: place.label,
            placeId: place.key ? Number(place.key) : undefined,
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
     * 获取地点排序信息
     */
    getPlaceSort = async () => {
        const { sort } = this.state;
        const timeParam = this.getTime();
        await api.post('/output/PlaceMinitorINfo/sort', {
            sortType: Number(sort),
            ...timeParam,
        }).then((res) => {
            if (res && res.data && res.data.code === 0 && res.data.data) {
                const sortPlace = res.data.data.slice(0, 3);
                this.setState({ sortPlace });
            }
        });
    }

    /**
     * 切换排序方式
     */
    changeSort = (sort) => {
        this.setState({
            sort,
        }, () => {
            this.getPlaceSort();
        });
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
        const { allPlace } = this.props;
        const { chartData, place, securityPersonnelName, securityPersonnelPhone, sort, sortPlace } = this.state;
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
                top: 25,
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
                    地点：<Select style={{ width: '120px' }} value={place} labelInValue
                        onChange={this.changePlace}>
                        {getSelectOptions(undefined, allPlace, undefined)}
                    </Select>
                </div>
                <ReactEcharts option={option} style={{ width: '100%', height: '80%' }}/>
                <Row className={styles.footerCon}>
                    <Col md={12} sm={24} className={styles.leftFooter}>
                        <div style={{ marginTop: '20px' }}>监管地点： {chartData.place || '-'}</div>
                        <div style={{ marginTop: '20px' }}>推荐保安组织人员： {securityPersonnelName}</div>
                        <div style={{ marginTop: '20px' }}>推荐人员联系方式： {securityPersonnelPhone}</div>
                    </Col>
                    <Col md={12} sm={24} className={styles.rightFooter}>
                        <Row className={''}>
                            <Col md={16} sm={24} className={styles.sortSelect}>
                            一小时内排序：
                                <Select style={{ width: '150px' }} value={sort} onChange={this.changeSort}>
                                    {getSelectOptions(undefined, [
                                        { id: 0, name: '人流异常爆发' },
                                        { id: 1, name: '人流量较大' },
                                    ], undefined)}
                                </Select>
                            </Col>
                            <Col md={8} sm={24} className={styles.sortPlace}>
                                {
                                    sortPlace && sortPlace.length ? sortPlace.map(({ placeId, placeName }, index) => (
                                        <div key={placeId}>{`${index + 1}: ${placeName}`}</div>
                                    )) : null
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

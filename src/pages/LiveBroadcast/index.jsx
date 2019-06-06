import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { getSelectOptions } from 'utils';
import globalConfig from '../../globalConfig';
import mapToProps from './mapping';
import styles from './index.less';


@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class LiveBroadcast extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            place: undefined,
            videoData: null,
        };
    }

    static propTypes = {
        push: PropTypes.func,
        getAllPlace: PropTypes.func,
        allPlace: PropTypes.array,
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { video: nextVideo } = nextState.videoData || {};
        const { video } = this.state.videoData || {};
        return video !== nextVideo;
    }

    componentWillReceiveProps(nextProps) {
        const { allPlace } = nextProps;
        const { place } = this.state;
        if (!place && JSON.stringify(allPlace) !== JSON.stringify(this.props.allPlace)) {
            this.setState({
                place: allPlace && allPlace[0] ? { key: allPlace[0].id, label: allPlace[0].name } : undefined,
            }, () => {
                this.setWebsocket();
            });
        }
    }

    componentDidMount() {
        const { allPlace, getAllPlace } = this.props;
        allPlace && allPlace.length <= 0 && getAllPlace();
        if (allPlace && allPlace.length) {
            this.setState({
                place: allPlace && allPlace[0] ? { key: allPlace[0].id, label: allPlace[0].name } : undefined,
            }, () => {
                this.setWebsocket();
            });
        }
    }

    setWebsocket = () => {
        if ('WebSocket' in window) {
            console.log('您的浏览器支持 WebSocket!');
            let ws = new WebSocket(globalConfig.socketUrl); // 创建websocket连接
            ws.onopen = function (evt) {
                console.log('连接打开。。。');
            };
            ws.onmessage = evt => this.getMessage(evt);
            ws.onclose = function (e) {
                // 关闭 websocket
                console.log('连接已关闭...');
                console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean);
            };
            this.ws = ws;
        }

    }

    /**
     * 接收到数据的回调
     */
    getMessage = (evt) => {
        const { data } = evt;
        const { place } = this.state;
        console.log('收到的信息：' + data);
        if (data === 'ready') {
            // this.ws.send(place.key);
        } else {
            const videoData = data ? JSON.parse(data) : null;
            this.setState({
                videoData: videoData,
            });
        }
        setTimeout(() => {
            this.ws.send(place.key);
        }, 100);
    }

    changePlace = (value) => {
        this.setState({
            place: value,
        }, () => {
            this.ws.send(value.key);
        });
    }

    render() {
        const { allPlace } = this.props;
        const { place, videoData = {} } = this.state;
        const { video, redPeopleNum, peopleTotalNum } = videoData || {};
        return (
            <div className={styles.videoWrapper}>
                <div className={styles.chartHead}>
                    地点：<Select style={{ width: '120px' }} value={place} labelInValue
                        onChange={this.changePlace}>
                        {getSelectOptions(undefined, allPlace, undefined)}
                    </Select>
                </div>
                {peopleTotalNum && <div className={styles.textRow}>当前人流总数：{peopleTotalNum}</div>}
                {redPeopleNum && <div className={styles.textRow}>当前拥挤总数：{JSON.stringify(redPeopleNum)}</div>}
                {video && <img src={`data:image/jpeg;base64,${video}`} alt="" className={styles.videoImg}/>}
            </div>
        );
    }
}

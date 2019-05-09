import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { netApi as api } from 'network';
import { Select } from 'antd';
import { getSelectOptions } from 'utils';
import mapToProps from './mapping';
import styles from './index.less';


@connect(mapToProps.mapStateToProps, mapToProps.mapDispatchToProps)
export default class Video extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            place: undefined,
            videoList: [],
        };
    }
    static propTypes = {}

    static propTypes = {
        push: PropTypes.func,
        getAllPlace: PropTypes.func,
        allPlace: PropTypes.array,
    }

    componentWillReceiveProps(nexrProps) {
        const { allPlace } = nexrProps;
        const { place } = this.state;
        if (!place && JSON.stringify(allPlace) !== JSON.stringify(this.props.allPlace)) {
            this.setState({
                place: allPlace && allPlace[0] ? { key: allPlace[0].id, label: allPlace[0].name } : undefined,
            }, () => {
                this.getVideo();
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
                this.getVideo();
            });
        }
    }


    getVideo = async () => {
        const { place } = this.state;
        if (!place) {
            return;
        }
        await api.post('/output/video/getVideoList', {
            // test: '12',
            placeName: place.label,
            placeId: place.key ? Number(place.key) : undefined,
        }).then((res) => {
            if (res && res.data && res.data.code === 0 && res.data.data) {
                this.setState({
                    videoList: res.data.data,
                });
            }
        }).catch((err) => {});
    }

    render() {
        const { allPlace } = this.props;
        const { place, videoList } = this.state;
        return (
            <div className={styles.videoWrapper}>
                <div className={styles.chartHead}>
                    地点：<Select style={{ width: '120px' }} value={place} labelInValue
                        onChange={this.changePlace}>
                        {getSelectOptions(undefined, allPlace, undefined)}
                    </Select>
                </div>
                {
                    videoList && videoList.length ? (
                        videoList.map(({ videoPath }, index) => (
                            <div className={styles.videoItem} key={index} >
                                <embed src={`http://39.96.216.17:8085${videoPath}`}
                                    width="480" height="400" type="video/mp4">
                                </embed>
                            </div>
                        ))
                    ) : null
                }
            </div>
        );
    }
}

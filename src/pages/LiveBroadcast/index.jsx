import React from 'react';
import { connect } from 'react-redux';
import styles from './index.less';


@connect(null, null)
export default class LiveBroadcast extends React.PureComponent {
    static propTypes = {}

    render() {
        return (
            <div className={styles.videoWrapper}>更多内容敬请期待</div>
        );
    }
}

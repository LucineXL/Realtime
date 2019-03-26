import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import { history } from '../store/configureStore';
import AuthorizedRoute from 'components/Authorized/AuthorizedRoute';
import BasicLayout from 'layouts/BasicLayout';

export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static propTypes = {
        store: PropTypes.object,
    }

    render() {
        const { store } = this.props;
        console.log('root container');
        return (
            <Provider store={ store }>
                <div>
                    <LocaleProvider locale={zhCN}>
                        <ConnectedRouter history={history}>
                            <Switch>
                                <AuthorizedRoute
                                    component={BasicLayout}
                                    path='/'
                                    authority={true}
                                />
                            </Switch>
                        </ConnectedRouter>
                    </LocaleProvider>
                </div>
            </Provider>
        );
    }
}

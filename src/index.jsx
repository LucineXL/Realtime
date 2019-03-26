import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import store from './store';
import './index.less';
import Root from './containers/Root';
import FastClick from 'fastclick';

render(
    <AppContainer>
        <Root
            store={ store }
        />
    </AppContainer>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept();
}

FastClick.attach(document.body);

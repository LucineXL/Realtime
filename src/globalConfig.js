let apiHost = 'http://39.96.216.17:80/api';

if (CODE_ENV === 'online') {
    apiHost = 'http://127.0.0.1:80/api';
}

export default {
    apiHost,
};

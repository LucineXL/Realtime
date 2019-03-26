let apiHost = '//xx.xx.com';

if (CODE_ENV === 'qa') {
    apiHost = '//xx.xx.com';
} else if (CODE_ENV === 'online') {
    apiHost = '//xx.xx.com';
}

export default {
    apiHost,
};

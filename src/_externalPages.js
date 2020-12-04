import React from 'react';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Login = React.lazy(() => import('./app/externalPages/Authentication'));
const TesT = React.lazy(() => import('./app/externalPages/Test'));

const _externalPages = [
    { path: '/auth/login', exact: true, name: 'Login', component: Login },
    { path: '/test', exact: true, name: 'TEST', component: TesT },
];

export default _externalPages;
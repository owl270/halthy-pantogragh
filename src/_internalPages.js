import React from 'react';


const Home = React.lazy(() => import('./app/internalPages/Home'));
const Customization = React.lazy(() => import('./app/internalPages/Customization'));

const Points = React.lazy(() => import('./app/internalPages/Points'));
const Ways = React.lazy(() => import('./app/internalPages/Ways'));
const Pantographs = React.lazy(() => import('./app/internalPages/Pantographs'));

const NewSimulation = React.lazy(() => import('./app/internalPages/Simulation/New'));
const OpenSimulation = React.lazy(() => import('./app/internalPages/Simulation/OpenSimulation'));
const Triggers = React.lazy(() => import('./app/internalPages/Triggers'));

const Settings = React.lazy(() => import('./app/internalPages/Settings'));
const Help = React.lazy(() => import('./app/internalPages/Help'));



const _internalPages = [
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/customization', exact: true, name: 'Customization', component: Customization },

    { path: '/archive/points', exact: true, name: 'Points', component: Points },
    { path: '/archive/ways', exact: true, name: 'Ways', component: Ways },
    { path: '/archive/pantographs', exact: true, name: 'Pantographs', component: Pantographs },

    { path: '/empowerment/simulation/:token', exact: true, name: 'Simulation', component: OpenSimulation },
    { path: '/empowerment/simulation', exact: true, name: 'Simulation', component: NewSimulation },

    { path: '/empowerment/triggers', exact: true, name: 'Triggers', component: Triggers },

    { path: '/settings', exact: true, name: 'Settings', component: Settings },
    { path: '/help', exact: true, name: 'Get Help', component: Help },
    { path: '/help/:ticket_token', exact: true, name: 'Get Help', component: Help },

];

export default _internalPages;
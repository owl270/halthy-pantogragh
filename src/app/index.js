import '../assets/styles/default.scss';


import React, {Component, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './components/PantoLoader'
import Aux from "./components/_Aux";
import ScrollToTop from './components/ScrollToTop';
import _externalPages from "../_externalPages";



const PanelLayout = Loadable({
    loader: () => import('./panelLayout'),
    loading: Loader
});




class App extends Component {

    render() {

        // all externalPages
        const external_pages = _externalPages.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                        // <div/>
                        <route.component {...props} />
                    )}/>
            ) : null;
        });

        // base of app
        return (
            <Aux>
                <div id="panto-overlay"/>
                {(process.env.NODE_ENV !== 'production') ? <div className="panto-development"/> : null}
                <ScrollToTop>
                    <Suspense fallback={<Loader/>} >
                        <Switch>
                            {external_pages}
                            <Route path="/" component={PanelLayout}/>
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }


}

export default App;

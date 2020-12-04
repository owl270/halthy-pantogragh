import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import windowSize from 'react-window-size';
import NavContent from './NavContent'

import Aux from '../../components/_Aux'
import * as actionTypes from '../../../dataHandler/actions';
import navigation from '../../../navigationMenu';


class Navigation extends Component {


    state = {
        nav_bottom: 0
    }


    handleScroll = (event) => {
        let scrollTop = event.srcElement.scrollingElement.scrollTop;

        this.setState({
            nav_bottom: -scrollTop
        });
    }




    componentDidMount() {
        // this.resize();
        // window.addEventListener('resize', this.resize)
        window.addEventListener('scroll', this.handleScroll)
        // window.addEventListener("beforeunload", this.closeTab);
    }


    componentWillUnmount() {
        // window.removeEventListener('resize', this.resize)
        window.removeEventListener('scroll', this.handleScroll);
    }


    render() {

        let navClass = ['panto-navigation',]

        return (
            <Aux>
                <nav className={navClass.join(" ")} style={{"bottom": this.state.nav_bottom + "px"}}>
                    <div className={'navigation-content hide-scrollbar'}>
                        <NavContent navigation={navigation.items}/>
                    </div>
                </nav>
            </Aux>
        )

    }

}



export default withRouter((windowSize(Navigation)));

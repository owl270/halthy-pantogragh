import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import 'react-perfect-scrollbar/dist/css/styles.css';
import windowSize from 'react-window-size';

import Aux from "../../../components/_Aux";
import NavGroup from './navGroup';


import { Scrollbars } from 'react-custom-scrollbars';
import NavItem from "./navItem";

class NavContent extends Component {


    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: '#FBB040',
            width: '5px',
            padding: 0,
            borderRadius: '5px'
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    renderThumbX({ style, ...props }) {
        const thumbStyle = {
            display: "none"
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    renderView({style, ...props}) {
        const thumbStyle = {
            marginRight: "-30px",
            marginBottom: "-30px",
            paddingRight: "13px",
            paddingBottom: "13px",
        };
        return (
            <div
                style={{...style, ...thumbStyle}}
                {...props}/>
        );
    }


    render() {
        const navItems = this.props.navigation.map(item => {
                switch (item.type) {
                    case 'group':
                        return <NavGroup key={item.id} group={item}/>;
                    default:
                        return <NavItem key={item.id} item={item}/>
                }
            }
        );



        return (
            <Aux>
                <Scrollbars
                    ref="scrollbars"
                    renderThumbVertical={this.renderThumb}
                    renderView={this.renderView}
                    renderThumbHorizontal={this.renderThumbX}
                    autoHide>
                    <ul className="nav navigation-inner-nav-bar">
                        {navItems}
                    </ul>
                </Scrollbars>
            </Aux>
        );
    }
}



export default NavContent;

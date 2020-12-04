import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import windowSize from 'react-window-size';

import Aux from "../../../components/_Aux";
import NavIcon from "./navIcon";
import NavBadge from "./navBadge";


class NavItem extends Component {

    render() {

        let itemBadge = this.props.nav_badges[this.props.item.id];
        itemBadge = <NavBadge badge={itemBadge}/>


        let itemTitle = this.props.item.title;
        if (this.props.item.icon) {
            itemTitle = <span className="navigation-menu-text">{this.props.item.title}{itemBadge}</span>;
        }

        let itemTarget = '';
        if (this.props.item.target) {
            itemTarget = '_blank';
        }

        let subContent;
        if(this.props.item.external) {
            subContent = (
                <a href={this.props.item.url} target='_blank' rel='noopener noreferrer'>
                    <NavIcon items={this.props.item}/>
                    {itemTitle}
                </a>
            );
        }
        else {
            let _exact = true
            if(this.props.item.url==="/empowerment/simulation") _exact = false

            subContent = (
                <NavLink to={this.props.item.url} className="navigation-link" exact={_exact} target={itemTarget}>
                    <div className="navigation-bg"/>

                    <NavIcon items={this.props.item}/>
                    {itemTitle}
                </NavLink>
            );
        }

        return (
            <Aux>
                <li className={'navigation-item navigation-sub' + (this.props.item.classes || '')} >{subContent}</li>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        nav_badges: state.nav_badges
    }
};

const mapDispatchToProps = dispatch => {
    return {

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (windowSize(NavItem)));

import React from 'react';
import Aux from "../../../components/_Aux";

import NavItem from './navItem';

const NavGroup = (props) => {
    let navItems = '';
    if (props.group.children) {
        const groups = props.group.children;
        navItems = Object.keys(groups).map(item => {
            item = groups[item];
            switch (item.type) {
                case 'item':
                    return <NavItem key={item.id} item={item} />;
                default:
                    return false;
            }
        });
    }

    return (
        <Aux>
            <li key={props.group.id} className="navigation-item navigation-menu-caption">
                <hr/>
                <label>{props.group.title}</label>
            </li>
            {navItems}
        </Aux>
    );
};

export default NavGroup;
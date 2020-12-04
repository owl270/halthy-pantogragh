import React from 'react';

const navIcon = (props) => {
    let navIcons = false;
    if (props.items.icon) {
        navIcons = <span className="navigation-menu-icon"><i className={props.items.icon}/></span>;
    }
    return navIcons;
};

export default navIcon;
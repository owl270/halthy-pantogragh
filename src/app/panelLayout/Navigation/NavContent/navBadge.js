import React from 'react';

const NavBadge = (props) => {
    let navBadges = false;
    if (props.badge) {
        navBadges = (
            <span className="item-badge">{props.badge}</span>
        )
    }
    return navBadges;
};

export default NavBadge;
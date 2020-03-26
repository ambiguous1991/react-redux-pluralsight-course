import { NavLink } from 'react-router-dom';
import React from 'react';

const Header = () => {
    const activeStyle = { color: '#F15B2A' };

    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact>
                Home
            </NavLink>
            {' | '}
            <NavLink to="/courses" activeStyle={activeStyle}>
                Courses
            </NavLink>
            {' | '}
            <NavLink to="/about" activeStyle={activeStyle}>
                About
            </NavLink>
        </nav>
    );
};

export default Header;

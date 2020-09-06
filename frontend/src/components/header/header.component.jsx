import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <div className="header-container">
                <Link to='/' className='header-logo'><span className='diff'>Stress</span> Friends</Link>
                <nav className="header-nav">
                    <Link to='/signin' className="header-nav-item">Sign In</Link>
                    {/* <Link to='/account' className="header-nav-item">
                        <img src="/me.jpg" alt="Profile Image" className='header-nav-img' />
                        <span>Alluysios</span>
                    </Link>
                    <Link to='/settings' className="header-nav-item">Settings</Link>
                    <Link to='#!' className="header-nav-item">Logout</Link> */}
                </nav>
            </div>
        </header>
    )
}

export default Header;
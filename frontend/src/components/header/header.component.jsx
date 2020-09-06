import React, { Fragment } from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../../actions/auth.action';

const Header = ({ auth, signOut }) => {
    return (
        <header className='header'>
            <div className="header-container">
                <Link to='/' className='header-logo'><span className='diff'>Stress</span> Friends</Link>
                <nav className="header-nav">
                    {
                        !auth.isAuthenticated ? <Link to='/auth' className="header-nav-item">Sign In</Link> 
                        :
                        <Fragment>
                            <Link to='/account' className="header-nav-item">
                                <img src={`/uploads/users/${auth.user.image}`} alt="Profile Image" className='header-nav-img' />
                                <span>{auth.user.firstname}</span>
                            </Link>
                            <Link to='/settings' className="header-nav-item">Settings</Link>
                            <Link to='/auth' onClick={signOut} className="header-nav-item">Logout</Link>
                        </Fragment>
                    }
                </nav>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { signOut })(Header);
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div className="navbar-fixed">
            <nav className="teal">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center">
                        TimeSlot
                    </Link>
                </div>
            </nav>
        </div>
    );
}

export default withRouter(Navbar);

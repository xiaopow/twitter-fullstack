import React from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const Layout = (props) => {

return (
    <>
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">language: <strong>English </strong><span className="caret"></span></a>
                        <ul className="dropdown-menu row text-center" id="navMenu" role="menu">
                            <li className="col-xs-12"><a href="#">Bahasa Malaya</a></li>
                            <li className="col-xs-12"><a href="#">Dansk</a></li>
                            <li className="col-xs-12"><a href="#">English</a></li>
                            <li className="col-xs-12"><a href="#">Suomi</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        {props.children}
    </>
);
}

export default Layout;
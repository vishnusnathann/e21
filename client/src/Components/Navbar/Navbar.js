import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="logo-container">
                <img className="logo" src={"/kerala.png"}/>
                <h1>
                    Virtual Election 
                    <br/>
                    <small>കേരളം 2021</small>
                    
                </h1>
            </div>
            <span className="branding">
                <a href="https://rsoclabs.com/">
                    Powered by <b>RSOC Labs</b>
                </a>
            </span>
        </div>
    )
}

export default Navbar

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import './Header.css'
const Header = () => {
    const count = (a) =>{
      console.log(a);
}
    return (
        <div>
            <nav>
                  <div className="container">
               <Link to='#'>
                  <img src={logo} className="logo" alt="" />
               </Link>
               <ul className="navbar-nav">
                  <li>
                      <Link to='/'>
                         Home
                      </Link>
                  </li>
                  <li>
                      <Link to="/order">
                         Order
                      </Link>
                  </li>
                   <li>
                      <Link to="/review">
                         Order Review
                      </Link>
                  </li>
                   <li>
                      <Link to="/inventory">
                        Manage Inventory
                      </Link>
                  </li>
                   <li>
                      <Link to="/login">
                         Login
                      </Link>
                  </li>
               </ul>
            </div>
            </nav>
        </div>
    );
};

export default Header;
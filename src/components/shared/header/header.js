import React, { useContext, useEffect, useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import Dropdown from './HeaderAcc';
import './header.css';
import AuthContext from '../../auth/AuthContext';


function Header (props) {
    const history = useHistory();
    const {user , setUser} = useContext(AuthContext);

    function handleLogOut(e){
        e.preventDefault();        
        setUser(null);
        localStorage.removeItem('storageUser');
        history.push('/');
    }  

    return (
        <header>
            <nav className = "js-nav">            
                <div className = "js-logo">
                    <img src="https://img.icons8.com/cotton/45/000000/beach-cocktail--v1.png"/>
                    <img src="https://img.icons8.com/cotton/64/000000/wine.png"/>
                    <img src="https://img.icons8.com/cotton/64/000000/tea-cup.png"/>
                    <img src="https://img.icons8.com/cotton/64/000000/beer-glass.png"/>
                </div>
                    <div className = "menu-buttons">
                        <ul className = "js-nav-links">  
                        <li>
                            <NavLink className = "nav-link" activeClassName = "active" exact to ='/searchDrink'>  
                                <img src="https://img.icons8.com/cotton/40/000000/search--v1.png"/>
                            </NavLink>
                        </li>                  
                            <li>
                                <NavLink className = "nav-link" activeClassName = "active" exact to ='/'>  
                                    Home 
                                </NavLink>
                            </li>
                            <li>
                                { user ? <NavLink className = "nav-link" activeClassName = "active" exact to ='/favorits'>
                                    My favorites</NavLink> : null }                        
                            </li>
                            <li>
                                { user ? 
                                    <>
                                        <div className = "logo">
                                            <div>
                                                <img  src="https://img.icons8.com/wired/35/ffffff/user.png"/>
                                            </div>
                                            <div className = "nav-link-user">
                                                Hello {user.username}!
                                            </div>
                                        </div>
                                    </>
                                : null }
                            </li>
                            <li>
                                {( user ? <NavLink className = "nav-link" exact to ='/login' onClick = {handleLogOut} > Log out  </NavLink>
                                    :<>   
                                        <NavLink  className = "nav-link" activeClassName = "active" exact to ='/register'> Register  </NavLink>
                                        <NavLink className = "nav-link" activeClassName = "active" exact to ='/login'> Log in  </NavLink>
                                    </>
                                )}
                            </li>                                                  
                        </ul> 
                    </div>                          
                 </nav>  
            <Dropdown /> 
            
        </header>
        
    )
}




export default Header;

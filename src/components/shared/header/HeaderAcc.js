import React, { useState, useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import AuthContext from '../../auth/AuthContext';

import './header.css';

function Dropdown ({title, items = [] }){
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    const {user , setUser} = useContext(AuthContext);

    function handleLogOut(e){
        e.preventDefault();        
        setUser(null);
        localStorage.removeItem('storageUser');
        history.push('/');
    };

    Dropdown.handleClickOutside = () => setOpen(false);

    function displayNon(){
        setOpen(false);
    };

    return(
        <div className = "phone-nav">
            <div className = "js-navdoi">
                <div className = "nav-two-logo">
                    <button
                    className ="js-burger"
                    onKeyPress = {() => toggle(!open)}
                    onClick = {() => toggle(!open)} 
                    >
                        <div className = 'js-line-one'>                            
                        </div>
                        <div className = "js-line-two">                            
                        </div>
                        <div className = "js-line-tree">                            
                        </div>                           
                    </button>                    
                    <div className = "js-logodoi">
                        <NavLink className = "" activeClassName = "active" exact to ='/'>  
                            <img src="https://img.icons8.com/dotty/40/ffffff/cocktail-shaker.png"/>
                        </NavLink>                    
                    </div> 
                </div>
                <div className = "js-logo" >
                    <div>
                        <NavLink className = "nav-link" activeClassName = "active" exact to ='/searchDrink'>  
                            <img src="https://img.icons8.com/cotton/40/000000/search--v1.png"/>
                        </NavLink>
                    </div>
                    { user ? 
                        <div className = "logo">
                            <div>
                                <NavLink  activeClassName = "active" exact to ='/favorits'>
                                    <img  src="https://img.icons8.com/wired/35/ffffff/user.png"/>
                                </NavLink>
                            </div>
                            <div className = "nav-link-user">
                                Hello {user.username}!
                            </div>
                        </div>
                    : null }
                </div>
            </div>
            { open && (
                <div className = "ul-nav-doi" onClick = {displayNon}  >
                   <div  className = "nav-two-logout">
                        <NavLink className = "li-nav-doi" activeClassName = "active" exact to ='/'>  
                            Home 
                        </NavLink>
                   </div>
                   <div>
                        { user ? <NavLink className = "li-nav-doi" activeClassName = "active" exact to ='/favorits'>
                            My favorites</NavLink> : null }                      
                    </div>
                    <div className = "nav-two-logout">
                        {( user ? <NavLink className = "li-nav-doi" exact to ='/login' onClick = {handleLogOut} > Log out  </NavLink>
                            :<>   
                                <NavLink  className = "li-nav-doi" activeClassName = "active" exact to ='/register'> Register  </NavLink>
                                <NavLink className = "li-nav-doi" activeClassName = "active" exact to ='/login'> Log in  </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )

};

const onClickOutsideConfig = {
    handleClickOutside : () => Dropdown.handleClickOutside,
};


export default onClickOutside ( Dropdown , onClickOutsideConfig);
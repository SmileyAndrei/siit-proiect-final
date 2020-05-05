import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavCard from './FavCard';

import AuthContext from '../auth/AuthContext';
import './fav.css';
import {apiLocal} from '../config';



function DrinkFav(){

    const {user} = useContext(AuthContext);
    let [drink , setDrinks] = useState([]);

    

    async function getDrinkByUser() {
        if(!user) {
            return;
        }

        const res = await axios(apiLocal + '/favorites?userId='+ user.id);
        setDrinks(res.data);          
    };

    useEffect(() =>{
        getDrinkByUser();
    },[user]);
 

    return (
         
        <div  className= "container">
            <div  className= "cont2">
                <div className = "fav-header">
                    <h1 className = "new-fav-title">
                        My favorites
                    </h1>
                    <div className = "fav-header">
                        <Link to = "./newDrink">
                        <button className = 'new-fav-button'>
                            <img alt=''  src="https://img.icons8.com/wired/41/d4674c/add--v2.png"/>
                        </button>
                        </Link>
                        <p>
                            Create a new favorite drink
                        </p>
                    </div>
                </div>
                {drink.length ? 
                    drink.map(drink => <FavCard favorits
                         = {drink}  key = {drink.id} />)
                         : (
                            <div className = "empty">
                                <div>
                                <img alt=''  src="https://img.icons8.com/dusk/200/000000/fragile.png"/>
                                </div>
                                <h2>
                                It's empty in here.
                                </h2>
                                <p>
                                    Ooops! Seems like there's nothing in this folder yet.
                                </p>
                                <p>
                                    Tap Create to make your first.
                                </p>
                            </div>
                         )}
            </div>      
        </div>
    
    )

};

export default DrinkFav;
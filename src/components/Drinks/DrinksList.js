import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import DrinkCards from './DrinksCards';
import './CSS/cards.css'
import {apiPublic} from '../config';


function DrinkList(){
    let [drinks, setDrinks] = useState([]);
    const {category} = useParams()

    useEffect ( () => {
        getDrinks();        
    }, []);

    async function getDrinks (){
        const res = await axios(apiPublic + '/filter.php?c=' +category);
        setDrinks(res.data.drinks);
    };
    
    return(
        <div  className= "container">
            <div  className= "cont2">
                {drinks.length ? 
                    drinks.map(drink => <DrinkCards withalcool 
                    = {drink}  key = {drink.idDrink} />)
                    : 'Loading ...'}
            </div>

        </div>
    );
};

export default DrinkList;
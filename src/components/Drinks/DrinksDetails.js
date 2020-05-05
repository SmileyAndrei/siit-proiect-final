import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import DrinkContainer from './DrinkContainer';
import {apiPublic} from '../config';


function DrinksDetails () {

    const {drinkId} =  useParams();
    const [drink , setDrinks] = useState()

   async function getDrinksById(id) {
        const res = await Axios(apiPublic + '/lookup.php?i=' +id);   //   aici ar trebuii sa fac cumva sa mi le vada si pe cele de pe local
        setDrinks(res.data.drinks);  
        
    }
    
    useEffect(() =>{ 
        getDrinksById(drinkId);
    },[drinkId]);

  
    if(drink) {
        //  console.log(drink);
    return (     
        <div>
            {drink.length ?
            drink.map(contain => <DrinkContainer container 
                = {contain} key = {contain.idDrink}/>) 
                : ''}
        </div>
    );
    } else {
        return (
            <h2 className = "auth-error">
                Something was rong please try another drink
            </h2>
        )
    }
    

};


export default DrinksDetails;
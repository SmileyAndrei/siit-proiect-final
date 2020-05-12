import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import {apiPublic} from '../config';
import SearchDrinks from './SearchDrinks'


function Search(){
    const {drinkId} =  useParams();
    const [drink , setDrinks] = useState();
    const [formData, setFormData] = useState({
        strDrink : ''
    });

   async function getDrinksById(id) {
        const res = await Axios(apiPublic + '/search.php?s=' +formData.strDrink); 
        setDrinks(res.data.drinks);
    };
    
    useEffect(() =>{ 
        getDrinksById(drinkId);
    },[formData.strDrink]);

    function inputChange(e){
        setFormData ({
            [e.currentTarget.id] : e.currentTarget.value,
        });
    };

  
    if(drink) {
        return (  
            <>   
                <div className = "cont2">
                    <input 
                        type = "text" 
                        className =  "inputbox-search"  
                        id = "strDrink" 
                        onChange = {inputChange}  
                        value = {formData.password}
                        placeholder = "Search your drink By name....."
                    />
                </div>
                <div className = "cont2">
                    {drink.length ?
                    drink.map(item => <SearchDrinks item
                        = {item} key = {item.idDrink}/>) 
                        : ''}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className = "cont2">
                    <input 
                    type = "text" 
                    className =  "inputbox-search"  
                    id = "strDrink" 
                    onChange = {inputChange}  
                    value = {formData.password}
                    placeholder = "Search your drink By name....."
                    />
                </div>
                <div className = "cont2 empty">
                    <h2>Sorry we don't have this drink .....</h2>
                </div>
                <div className = "cont2 empty">
                    <img alt=''  src="https://img.icons8.com/color/280/000000/nothing-found.png"/>
                </div>
            </>
        );
    };
};

export default Search;
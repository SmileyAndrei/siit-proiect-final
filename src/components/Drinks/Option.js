import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import OptCard from './OptCard';

import '../Drinks/CSS/cards.css'
import {apiPublic} from '../config';




function OptionList(){
    const {drinkCategory} = useParams();
    let [category, setCategory] = useState([]);

    useEffect ( () => {
        getOption();        
    }, []);

    async function getOption (){
        const res = await axios(apiPublic + '/list.php?c=list');
        setCategory(res.data.drinks);
    }

    console.log(category);
    
    return(
        <div  className= "big-contain">
            <h1 className = "category-title"> WHAT IS IN YOUR CUP?
                <p className = "paragraf"> ...the choice is yours</p>
            </h1>
            <div  className= "small-contain">
                {category.length ? 
                    category.map(categ => <OptCard option 
                    = {categ}  key = {categ.strCategory} />)
                    : 'Loading ...'}
            </div>

        </div>
    )
}

export default OptionList;
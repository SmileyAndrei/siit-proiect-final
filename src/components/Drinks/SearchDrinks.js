import React from 'react'
import {Link} from 'react-router-dom';

import './CSS/cards.css';




function SearchDrink({item}){


    return(
        <div className = "cardContainer">
            <div className = "card">
                <div className ="card-media">
                    <div className = "cardText">
                        {item.strDrink}
                    </div>
                    <div>
                        <img  className = "drinkPic" src = {item.strDrinkThumb}></img>
                    </div>
                    
                    <Link to={'/drinks/' + item.idDrink }>
                         <button className="buttonRecip" type="button">Recipe</button>
                    </Link >
                    
                </div>
            </div>
        </div>
    )
}


export default SearchDrink;
import React from 'react'
import {Link} from 'react-router-dom';

import './CSS/cards.css';




function BookCards({withalcool}){


    return(
        <div className = "cardContainer">
            <div className = "card">
                <div className ="card-media">
                    <div className = "cardText">
                        {withalcool.strDrink}
                    </div>
                    <div>
                        <img  className = "drinkPic" src = {withalcool.strDrinkThumb}></img>
                    </div>
                    
                    <Link to={'/drinks/' + withalcool.idDrink }>
                         <button className="buttonRecip" type="button">Recipe</button>
                    </Link >
                    
                </div>
            </div>
        </div>
    )
}


export default BookCards;
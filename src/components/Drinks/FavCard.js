import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import './CSS/cards.css';
import {apiLocal} from '../config';

function FavCards({favorits}){
    const [redirect, setRedirect] = useState(false);

    async function handleDeleteFAv(e){    
        e.preventDefault();
        const res = await axios(apiLocal + '/favorites/' + favorits.id, {
                method : 'DELETE',
            }); 
        setRedirect(true);
    };

    if (redirect) {
        return <Redirect to = "/favorits" />
    };
    return(
        <div className = "cardContainer">            
            <div className = "card-fav">
                <h1 className = "card-fav-title">
                    {favorits.strDrink}
                </h1>
                <div>
                    {/* <Link to={'/drinks/' + favorits.idDrink}> */}
                        <img  className = "drinkPic-fav"
                            src = {favorits.strDrinkThumb}>
                        </img>
                    {/* </Link> */}
                </div>
                <div className = "card-fav-text">
                   <span>Category:</span>  {favorits.strCategory}
                </div>
                <div className = "card-fav-text">
                   <span>Type of glass:</span>  {favorits.strGlass}
                </div>
                <div className = "card-fav-text">
                   <span>Type of drink:</span> {favorits.strAlcoholic}
                </div>
                <div className = "iconFavorit" >                    
                    <div  className = "buttondelete"  onClick = {handleDeleteFAv}>
                        <img src="https://img.icons8.com/windows/32/000000/delete-forever.png"/>
                    </div>                        
                    <Link className = "buttonEdit" to = {'/favorits/' + favorits.id} >                             
                        <img src="https://img.icons8.com/pastel-glyph/30/000000/edit.png"/>                        
                    </Link>                    
                </div>                    
            </div>                        
        </div>
    );
};


export default FavCards;
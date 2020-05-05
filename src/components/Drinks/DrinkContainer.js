import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


import './CSS/cards.css';
import AuthContext from '../auth/AuthContext';
import {apiLocal} from '../config';

function DrinkContainer({container}){
    const {user, setUser} = useContext(AuthContext);
    const [succesMess, setSuccesMess] = useState(false);
    const [error, setError] = useState('');

    async function AddToFav(e) {
        e.preventDefault();
        const already = await validateDrink();

        if (already) {
        const res = await axios(apiLocal + '/favorites/' + '' , {
               method : 'POST',
               data : { ...container ,
               userId : user.id }
            });
            setSuccesMess(true);
        }
    };


    async function validateDrink(){
        
        const check = await axios.get(apiLocal + '/favorites?strDrink=' + container.strDrink)
                                .then(res => res.data);
        if (check.length) {
            setError(true);
            return false;
        }
        return true;            
     };


    return(

        <>
        
        <div className ="drink-recipe">
            <div className = "recipe-title">
                <h1>____{container.strDrink}____</h1>
            </div>
            <div className = "ing-recipe">
                <div>
                    <img  className = "pic-card" src = {container.strDrinkThumb}></img>
                    <div>
                        { user ?
                        <button className = "recip-button" onClick = {AddToFav} >
                            <div>
                                <img src="https://img.icons8.com/emoji/19/ffff00/star-emoji.png"/>
                            </div>
                            <div>
                                Click and add drink to My favorites
                            </div> 
                        </button>  : 
                        <div className = "recip-button">
                            <div>
                                <img src="https://img.icons8.com/pastel-glyph/30/ffff00/error.png"/>
                            </div>
                            <div>
                                <Link className = 'recipe-link' to = '/login' >                            
                                    You must login to add this drink to your favorites
                                </Link> 
                            </div>
                        </div>
                        }
                    </div>
                    <div>
                        {(succesMess ?   <div className = "succes-add" > This drink it's one of your favorites now 
                                         </div> : null)}
                        {(error ?   <div className = "succes-add" > Drink already to you favorites 
                        </div> : null)}
                    </div>
                </div>
                <div className = "ingredient-small">
                    <div>
                        <h3>----Ingredients----</h3>
                        <p>{container.strMeasure1} {container.strIngredient1} </p>
                        <p>{container.strMeasure2} {container.strIngredient2} </p>
                        <p>{container.strMeasure3} {container.strIngredient3} </p>
                        <p>{container.strMeasure4} {container.strIngredient4} </p>
                        <p>{container.strMeasure5} {container.strIngredient5} </p>
                        <p>{container.strMeasure6} {container.strIngredient6} </p>
                        <p>{container.strMeasure7} {container.strIngredient7} </p>
                        <p>{container.strMeasure8} {container.strIngredient8} </p>
                        <p>{container.strMeasure9} {container.strIngredient9} </p>
                        <p>{container.strMeasure10} {container.strIngredient10} </p>
                    </div>
                    <div>
                        <h3>----Instructions----</h3> 
                        {container.strInstructions}
                    </div>
                    <div>
                        <h3>----Category----</h3>
                        {container.strCategory}
                    </div>
                     <div>
                        <h3>----Type----</h3> 
                        {container.strAlcoholic}
                    </div>
                    <div>
                         <h3>----Glass----</h3>
                         {container.strGlass}
                    </div>
            
                </div>
                
            </div>
            
                             
        </div>
        
        
    

        </>
        
)
}


export default DrinkContainer;
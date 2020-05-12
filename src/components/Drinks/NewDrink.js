import React, { useState, useContext } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

import AuthContext from '../auth/AuthContext';
import './CSS/newDrink.css';
import {apiLocal} from '../config';

function NewDrink() {
    const [succesMess, setSuccesMess] = useState(false);
    const {user} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        strDrink : '',
        strDrinkThumb : '',
        strGlass : '' ,
        strAlcoholic : '',
        strCategory : '',
    });

    function inputChange(e){
        setFormData ({
            ...formData,
            [e.currentTarget.id] : e.currentTarget.value,
        });
    };

    async function AddToFav(e) {
        e.preventDefault();
        const res = await Axios(apiLocal + '/favorites/' + '' , {
               method : 'POST',
               data : { ...formData ,
               userId : user.id,
               idDrink : '2568'
             }
            });  
        setSuccesMess(true);
    };

    function deleteError(e){
        setSuccesMess(false);
        setFormData ({
            [e.currentTarget] : e.currentTarget.value,
        });
    };
    return(
        <div className = "form-create">
            {(succesMess ?
            <div className = "auth-succes" onClick = {deleteError} >
                <div>
                    <img src="https://img.icons8.com/flat_round/48/000000/circled-left-2--v1.png"/>
                </div>
                <div>
                    Your drink has been created successfully!
                </div>            
            </div> : 
            <>
                <div className = "new-drink-title">
                    <h1>
                        Create your drink 
                    </h1>
                </div>
                <form  className = "form-new-drink" onSubmit = {AddToFav}>
                    <div>
                        <input 
                            type = "text" 
                            className = "input-new-drink" 
                            id = "strDrink" 
                            onChange = {inputChange} 
                            value = {formData.strDrink}
                            placeholder = " Name of drink "
                            name = "Name of Drink" 
                            required
                        />
                    </div>
                    <div >
                        <input 
                            type = "text" 
                            className = "input-new-drink" 
                            id = "strCategory" 
                            onChange = {inputChange} 
                            value = {formData.strCategory}
                            placeholder = " Category "
                            name = "Category" 
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type = "url" 
                            className = "input-new-drink" 
                            id = "strDrinkThumb" 
                            onChange = {inputChange} 
                            value = {formData.strDrinkThumb}
                            placeholder = " Photo URL "
                            name = "Photo URL" 
                            required
                    />
                    </div>
                    <div>
                        <input 
                            type = "text" 
                            className = "input-new-drink" 
                            id = "strGlass"
                            onChange = {inputChange}  
                            value = {formData.strGlass} 
                            placeholder = " Type of glass "
                            name = "Type of glass" 
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type = "text" 
                            className = "input-new-drink" 
                            id = "strAlcoholic"
                            onChange = {inputChange}  
                            value = {formData.strAlcoholic}
                            placeholder = " Type of drink "
                            name = "Type of Drink" 
                            required
                        />
                    </div>                    
                    <footer className = "footer-new-drink">
                        <button className = "button-new-drink" type = "submit" >
                            Add to My favorites
                        </button>
                        <Link to ='/favorits'>
                            <button className = "button-drink"  >
                                Back to My favorites >
                            </button>
                        </Link>
                    </footer>
                </form>
            </>
            )};
        </div>
    );
};

export default NewDrink;


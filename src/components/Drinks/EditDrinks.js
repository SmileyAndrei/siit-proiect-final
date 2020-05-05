import React, { useState, useEffect, useContext } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../auth/AuthContext';
import {apiLocal} from '../config';


// !!!!!!!!!!!!!!!!!  de aici modifici !!!!!!!!!!!!!!!!!!!!!!

function FavDrinkId(){
    const {user , setUser} = useContext(AuthContext);
    const {idFav} = useParams();
    const [opt, setOpt] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() =>{ 
        getDrinkByUser();
    },[user]);



    

    // const [formEdit, setFormEdit] = useState({
    //     strDrink : '',
    //     strDrinkThumb : '',
    //     strGlass : '',
    //     strAlcoholic : '',
    // });

    function handleChange (e) {        
        setOpt ({
            ...opt,
            [e.currentTarget.id] : e.currentTarget.value
        });
    }


    async function getDrinkByUser(){
        const res = await axios(apiLocal + '/favorites/' + idFav);
        setOpt(res.data);
    };

    async function handleEditFav(e){
        e.preventDefault();
        const res = await axios(apiLocal + '/favorites/'  + idFav, {
            method : 'PUT',
            data : {
                    ...opt,}
        }); 
        setRedirect(true);
    }


    if (redirect) {
        return <Redirect to="/favorits" />
    }
    return (
        <div className = "allform" >
            <div className = "formedittop">
                <h1 className = "formtitle" > personalize your own drink!</h1>

                <form  className = "form" onSubmit = {handleEditFav}>

                <div>
                    <label htmlFor="strDrink">DRINK NAME</label>
                    <input                    
                        type = "text" 
                        className = "inputbox" 
                        id = "strDrink" 
                        onChange = {handleChange}  
                        value = {opt.strDrink}  
                        placeholder = {opt.strDrink}
                    />
                </div>

                <div>
                    <label htmlFor="strDrinkThumb">URL PHOTO </label>
                    <input 
                    type = "url" 
                    className = "inputbox" 
                    id = "strDrinkThumb" 
                    onChange = {handleChange}  
                    value = {opt.strDrinkThumb} 
                    placeholder = {opt.strDrinkThumb}
                />  
                </div>

                <div>
                    <label htmlFor="strGlass"> TYPE OF GLASS </label>
                    <input 
                        type = "text" 
                        className = "inputbox" 
                        id = "strGlass" 
                        onChange = {handleChange}  
                        value = {opt.strGlass} 
                        placeholder = {opt.strGlass}
                    />
                </div>

                <div>
                    <label htmlFor = "strAlcoholic"> DRINK TYPE</label>
                    <input 
                        type = "text" 
                        className = "inputbox" 
                        id = "strAlcoholic" 
                        onChange = {handleChange}  
                        value = {opt.strAlcoholic} 
                        placeholder = {opt.strAlcoholic}
                    />
                </div>

                <div>
                    <label htmlFor = "strCategory"> DRINK CATEGORY</label>
                    <input 
                        type = "text" 
                        className = "inputbox" 
                        id = "strCategory" 
                        onChange = {handleChange}  
                        value = {opt.strCategory} 
                        placeholder = {opt.strCategory}
                    />
                </div>


                <button  className = "buttonsubmit" type = "submit" >
                    UPDATE  >
                </button>
                </form>

                
            </div>

        </div>
    )
};



export default FavDrinkId;
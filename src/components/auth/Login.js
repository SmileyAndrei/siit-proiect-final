import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';

import AuthContext from './AuthContext';
import {apiLocal} from '../config';
import '../Drinks/CSS/editdrinks.css';
import { useHistory } from 'react-router-dom';


 const errorMessages = {
    username: ' Please enter a username!',
    password: 'Please enter a password!'
    
 }

function Register(){

    const [formData, setFormData] = useState ({
        username: '',
        password: ''
    });

    const [formError, setFormError] = useState ({
        username: '',
        password: ''
    });

    const [globalError, setGlobalError] = useState('');
    const [succesMess, setSuccesMess] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const { setUser } = useContext(AuthContext);
    const history = useHistory();
    let timeout = null;
  

async function handleSubmit(e) {
        e.preventDefault();
        const invalidForm = validateData();
        const invalidUser = await validateUser();
        const invalidPass = await validateUserPass();

        if(!invalidForm && invalidUser && invalidPass) {
            try {
                const res =  await axios(apiLocal + '/users?username='  + formData.username);
                setSuccesMess(true);
                localStorage.setItem('storageUser' , JSON.stringify(res.data[0]));
                setUser(res.data[0]);
                timeout = setTimeout((e) => history.push('/'),2000)
            } catch (e) {
                //    setGlobalError(e.response.statusText);
            }        
       }   
    };

     async function validateUser(){
            const check = await axios.get(apiLocal + '/users?username=' + formData.username)
                                   .then(res => res.data);
            if (!check.length) {
                setGlobalError(" Please enter a valid username!");
                return false;
            }
            return true;            
     };

     async function validateUserPass(){
        const checkPas = await axios.get(apiLocal + '/users?password=' + formData.password)
                               .then(res => res.data);
        if (!checkPas.length && await validateUser(false)) {
            setGlobalError(" Please enter a valid password!");
            return false;
        }
        return true;
        
 };

   


    function validateData() {

        setIsPressed(false);

        const inputs = ['username' , 'password'];
        const allErrors = {...formError};
        let invalidForm = false;
        

        for ( const input of inputs) {
            if(!formData[input]) {
                allErrors[input] = errorMessages[input];
                invalidForm = true;
            } 
        }  
        
        setFormError(allErrors);
        return invalidForm;
    }

    function handleInputChange(e) {

        setIsPressed(true);
        
      setFormData({
          ...formData , 
          [e.currentTarget.id]: e.currentTarget.value
      });

      const allErrors = {
          ...formError, 
          [e.currentTarget.id] : '', 
        };


      setFormError(allErrors);
    }

    function deleteError(e){
        setGlobalError('');
        setSuccesMess(false);

    };

    return(

        <div className = "formauth">
            <div>
                 <img src="https://img.icons8.com/pastel-glyph/80/515561/groups.png"/>
                <h1 className = "title-login">  MEMBER LOGIN </h1>
            </div>
        
        {(globalError ?
        <div className = "auth-error" onClick = {deleteError} >
            <div>
                <img src="https://img.icons8.com/color/50/000000/close-window.png"/>
            </div>
            <div>
                {globalError}
            </div>
        </div>
        : null)}

        {(succesMess ?
            <div className = "auth-succes" onClick = {deleteError} >
                <div>
                <img src="https://img.icons8.com/color/48/000000/checked-radio-button.png"/>
                </div>
                <div>
                You have successfully signed in!
                </div>
            </div>
        : null)}

        
        {(globalError ||succesMess ? null :
        <form className = "form" onSubmit = { handleSubmit } >
            <div className = "form-align">
            <div className = "auth-logo">
            <img src="https://img.icons8.com/material-sharp/30/000000/user.png"/>
            </div>
                <input 
                    type = "text" 
                    className = {'' + (formError.username ? 'input-box-error' : 'inputbox')} 
                    id = "username" 
                    onChange = {handleInputChange}  
                    value = {formData.username} 
                    placeholder = "Username"
                />
                {/* <div className = "" >
                {formError.username}
                {formError['no-caracters']}
                </div> */}
            </div>
            <div className = "form-align" >
                <div className = "auth-logo">
                    <img src="https://img.icons8.com/metro/24/000000/lock.png"/>
                 </div>
                <input 
                    type = "password" 
                    className = {'' + (formError.password ? 'input-box-error' : 'inputbox')}  
                    id = "password" 
                    onChange = {handleInputChange}  
                    value = {formData.password}
                    placeholder = "Password"
                />
                {/* <div className = "" >
                {formError.password}
                </div> */}
            </div>

            {/* <FormControl  
            type = "password" 
            name = "password" 
            label = "Password" 
            validation = {{
                required : true  , 
                minLength : 6 , 
                maxLength: 9, 
                messages: {
                    required : 'The password is required!',
                    minLength : 'Your password needs to be beetwin 6 and 9  caracters long'
                }
            }} 
            needValidate = {false}
            /> */}
            
            
            <button 
                type = "submit" 
                className = {'' + (!isPressed ? 'buttonsubmitblock' : 'buttonsubmit')} 
                 disabled = {!isPressed} 
                >
                SIGN IN
            </button>   
     

        </form>
        )}
        </div>
    );

};

export default Register;
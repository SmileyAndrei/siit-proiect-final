import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import AuthContext from './AuthContext';
import {apiLocal} from '../config';



 const errorMessages = {
    username: ' Please enter your username!',
    password: 'Please enter your password!',
    're-password': 'Please retype the password!',
    'dif-passwords' : 'The passwords do not match!',
    age : 'Please enter your age!',
    'min-age' : 'You must have over 18 years to register!',
    'no-caracters' : 'The input contains invalid caracters!',
    'user-taken' : 'This username is already taken!'
 }


function Register(){
    const [formData, setFormData] = useState ({
        username: '',
        password: '',
        're-password': '',
        age : '',
    });

    const [formError, setFormError] = useState ({
        username: '',
        password: '',
        're-password': '',
        'dif-passwords': '',
        age : '',
        'min-age' : '',
        'no-caracters' : '',
        'user-taken' : ''        
    });

    const [globalError, setGlobalError] = useState('');
    const [succesMess, setSuccesMess] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    let { user, setUser } = useContext(AuthContext);
    const history = useHistory();
    let timeout = null;
    

  async function handleSubmit(e) {
        e.preventDefault();

       const invalidForm = await validateData();

       if(!invalidForm) {
            try {
            const res =  await axios(apiLocal + '/users' , {
                method : 'POST',
                data : formData  
            });
           
            setSuccesMess(true);
            timeout = setTimeout((e) => history.push('/'),2000)  

            const ress =  await axios(apiLocal + '/users?username=' + formData.username);
            localStorage.setItem('storageUser' , JSON.stringify(res.data));           
            
            setUser(res.data);
            setSuccesMess(true);
            

            console.log(localStorage);
            

        } catch (e) {
        //    setGlobalError(e.response.statusText);
        }        
       }
    };

    async function validateData() {

        setIsPressed(false);

        const inputs = ['username' , 'password' , 're-password', 'age'];
        const allErrors = {...formError};
        let invalidForm = false;

        const check = await axios.get(apiLocal + '/users?username=' + formData.username)
                               .then(res => res.data); 
        
        if (check.length) {
            allErrors['user-taken'] = errorMessages['user-taken']
            invalidForm = true;
        }

        for ( const input of inputs) {
            if(!formData[input]) {
                allErrors[input] = errorMessages[input];
                invalidForm = true;
            } 
        }  
        
        if(!(/^[a-z ]+$/i.test(formData.username))){
            allErrors['no-caracters'] = errorMessages['no-caracters']
            invalidForm = true;
        }

        if(formData.password !== formData['re-password']){
            allErrors['dif-passwords'] =  errorMessages['dif-passwords']
            invalidForm = true;

        } if (formData.age < 18){
            allErrors['min-age'] = errorMessages['min-age']
            invalidForm = true;

        }

        
        setFormError(allErrors);
        return invalidForm;
    };

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
        if(e.currentTarget.id === 'password' || e.currentTarget.id === 're-password') {
          allErrors['dif-passwords'] = ''
        };
        if(e.currentTarget.id === 'age' || e.currentTarget.id === 'min-age') {
          allErrors['min-age'] = ''
        };
        if(!allErrors.username ){
        allErrors['no-caracters'] = ''
        }
        if(!allErrors.username ){
        allErrors['user-taken'] = ''
        }

        setFormError(allErrors);
    }

    function deleteError(){
        setGlobalError('');
    };

    return(

        <div className = "formauth">
            <div>
                 <img src="https://img.icons8.com/windows/100/515561/add-user-male--v1.png"/>
                <h1 className = "title-login">  CREATE ACCOUNT </h1>
            </div>
        
        {(globalError ?
            <div className = "" onClick = {deleteError} >
                Server {globalError}
            </div>
        : null)}

        {(succesMess ?
            <div className = "auth-succes" onClick = {deleteError} >
                <div>
                    <img src="https://img.icons8.com/color/48/000000/checked-radio-button.png"/>
                </div>
                <div>
                    You have signed up successfully!
                </div>
            </div>
        : null)}

        
        {(globalError ||succesMess ? null :
            <form className = "form" onSubmit = { handleSubmit } >
                <div>
                    <input
                        type = "text" 
                        className = {'' + (formError.username || formError['no-caracters'] || formError['user-taken'] ? 'input-box-error' : 'inputbox')}
                        id = "username" 
                        onChange = {handleInputChange}  
                        value = {formData.username} 
                        placeholder = "Username"
                    />
                    <div className = "error-message" >
                    {formError.username}
                    {formError.username ? '' : formError['no-caracters']}
                    {formError.username || formError['no-caracters'] ? '' : formError['user-taken']}
                    </div>
                </div>
                <div>
                    <input
                        type = "password" 
                        className = {'' + (formError.password ? 'input-box-error' : 'inputbox')} 
                        id = "password" 
                        onChange = {handleInputChange}  
                        value = {formData.password}
                        placeholder = "Password"
                    />
                    <div className = "error-message" >
                    {formError.password}
                    </div>
                </div>
                <div>
                    <input 
                        type = "password" 
                        className = {'' + (formError['re-password'] || formError['dif-passwords']   ? 'input-box-error' : 'inputbox')}  
                        id = "re-password" 
                        onChange = {handleInputChange}  
                        value = {formData['re-password']}
                        placeholder = "Retype password"
                    />
                    <div className = "error-message" >
                        {formError['re-password']}
                        {formError['re-password'] ? '' : formError['dif-passwords']}
                    </div>
                </div>
                <div>
                    <input 
                        type = "number"
                        min = '0'
                        max = '100' 
                        className = {'' + (formError.age ? 'input-box-error' : 'inputbox')}  
                        id = "age" 
                        onChange = {handleInputChange}  
                        value = {formData.age}
                        placeholder = "Age"
                    />
                    <div className = "error-message" >
                    {formError.age}
                    {formError.age ? <br /> : formError['min-age']}
                    
                    </div>
                </div>
                <button type = "submit" 
                    className = {'' + (!isPressed ? 'buttonsubmitblock' : 'buttonsubmit')}
                    disabled = {!isPressed}>
                    SIGN UP
                </button> 
            </form>
        )}
        </div>
    );

};

export default Register;
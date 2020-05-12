import React, { useState, useEffect } from 'react';
import Header from './shared/header/header';
import {BrowserRouter, Route} from 'react-router-dom';


import DrinkList from './Drinks/DrinksList';
import DrinksDetails from './Drinks/DrinksDetails';
import Register from '../components/auth/Register';
import Login from './auth/Login';
import AuthContext from './auth/AuthContext';
import EditDrink from './Drinks/EditDrinks';
import NewDrink from './Drinks/NewDrink';
import DrinkFav from './Drinks/DrinkFav';
import Option from './Drinks/Option';
import Search from './Drinks/Search';



function App () { 
   const [user, setUser] = useState(null);

   useEffect(() => {
         const user = localStorage.getItem('storageUser');
         if(user){
            setUser(JSON.parse(user));
         }
   }, []);
   
   return (
      <AuthContext.Provider value={{user, setUser}} >            
         <BrowserRouter style = {{height :'100%'}}>
            <Header />
            <Route exact path = "/option/:category">
               <DrinkList />
            </Route>
            <Route exact path = "/drinks/:drinkId">
               <DrinksDetails />
            </Route>
            <Route exact path = "/">
               <Option />
            </Route>
            <Route exact path = "/register">
               <Register />
            </Route>
            <Route exact path = "/login">
               <Login />
            </Route>
            <Route exact path = "/favorits">
               < DrinkFav />
            </Route>
            <Route exact path = "/favorits/:idFav">
               < EditDrink />
            </Route>
            <Route exact path = "/newDrink">
               < NewDrink />
            </Route>
            <Route exact path = "/searchDrink">
               < Search/>
            </Route>
         </BrowserRouter>
      </AuthContext.Provider>
   )
};

export default App;
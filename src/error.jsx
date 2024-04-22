import logo from './logo.svg';
import  React, { useEffect, useState } from 'react';


import  './styles.css';
import mascot from './assets/Cat astronaut (3).gif';

import './App.css';


const ErrorPage = (movieQuery) => {

    
   
        return ( 
          
        <div className='row errorContainer'>
            <div className='col'>
            <img src={mascot}/>
            </div>
            <div className='col'>
            <h2> The galaxy has infinite possibilities...</h2>
            <p> But we do not. Try taking a cat nap and coming back later. </p>
            </div>
        </div>         
         
              
          );
      
      
      

  }
export default ErrorPage; 
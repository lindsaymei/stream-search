import logo from './logo.svg';
import React, { useEffect, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ErrorPage from './error.jsx';
import  './styles.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import './App.css';
import mascot from './assets/Cat astronaut (3).gif';
import Carousel from './carousel';
import {config} from './config.js';
import Search from './search.jsx';
import ShowMovie from './showMovie.jsx';
import  './styles.css';

const SearchPage = (movieQuery) => {
    const [query, setQuery] = useState("");
    const [currentMovie, setCurrentMovie] = useState("");
    const [movie, setMovie] = useState("");

    const [open, setOpen] = React.useState(false);
    const anchor = 'bottom';
    const location = useLocation();
    const isMovieSet = location.state?.isMovieSet;
    const movieFromSearch = location.state?.movie;
    const secret = config.SECRET;
    const [selectedMovie, setSelectedMovie] = useState(location.state?.movie);


    const fetchMovie = async (movieData) => {    
      const movid = movieData.id;
      const secret = config.SECRET;
      const url = `https://api.watchmode.com/v1/title/${movid}/details/?apiKey=${secret}&append_to_response=sources`;
      if(movid !== undefined) {
          try {
              const res = await fetch(url);
              const response = await res.json();
              if (response && typeof response === 'object') {
                  setCurrentMovie(response);
                  console.log( "Movie Details", response);
              } else {
                  setCurrentMovie(null);
              }
          } catch (error) {
              return <ErrorPage />;
          }
      }
    }


// useEffect(() => {
//     setSelectedMovie(location.state?.movie);
// }, [location.state?.movie]);
//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen);
//     if (newOpen && selectedMovie !== undefined) {
//         console.log("Location", selectedMovie);
//         fetchMovie(selectedMovie);
//     }
// };
    
      var placeholder = 
      <div className='row errorContainer'>
        <div className='col'>
          <img src={mascot}/>
        </div>
        <div className='col'>
          <h2> The galaxy has infinite possibilities...</h2>
          <p> But we do not. Try taking a cat nap and coming back later. </p>
        </div>
        

      </div>; 

      try{
        if(isMovieSet){
          return(
            <div className='searchPageCont'>
              <Search  className="searchBar"/>
{/*             
              <Button onClick={toggleDrawer(true)}>Show details</Button>
              <Drawer open={open} onClose={toggleDrawer(false)} anchor='bottom'>
                  {open && <ShowMovie movie={currentMovie} />}
              </Drawer> */}
            </div>
  
          )

        } else{
          return(
            <div className='searchPageCont'>
                <Search  className="searchBar"/>
                <Carousel />
            </div>
            
          )
        }
       
        // if(movieQuery) {
        //   return(
        //     <Button onClick={toggleDrawer(true)}>Show details</Button>

        //   )
          
          
        // }else{
        //   return (
          
        //     <div> 
        //       <Search  className="searchBar"/>

        //       {(!movieQuery || movieQuery === "") ?  placeholder: <Carousel />} 
              
              
                      
        //     </div>
                
        //     );
        // }
       
      }catch( e){
        return ( 
          <div> 
            {placeholder}           
          </div>
              
          );
      }
      
      

  }
export default SearchPage; 
import logo from './logo.svg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './App.css';
import {config} from './config.js';
import ShowMovie from './showMovie.jsx';
import  React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import mascot from './assets/Cat astronaut (3).gif';
import Search from './search.jsx';
import SearchPage from './searchPage.jsx';
import { useNavigate } from "react-router-dom";
import  './styles.css';

function LandingPage() {
  const secret = config.SECRET;
  const [data, setData] = useState({});
  const [movie, setMovie] = useState(false);
const navigate = useNavigate();
  const handleMovieSearch = async (selectedMovie) => {
      const {name} = selectedMovie;
  }

  return (
   
      <div className='bgContainer'>
        <div className='header'>
        <Link to="/search">
            <button>Search</button>
          </Link>
        </div>
      <div className='hero landingPage'>
        <div className='row'>
          <div className='col'>

          </div>
          <div className='col'>
            <h1> Movie Explorer</h1>
            <Link to="/search">
                <Search  className="searchBar"/>

            </Link>
          </div>
       
        </div>
        
      </div>
     
    
      </div>
      
    
  );
}

export default LandingPage;
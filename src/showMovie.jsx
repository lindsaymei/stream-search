import React, { useEffect, useState } from 'react';
import {config} from './config.js'; 
import { useLocation } from "react-router-dom";
import ErrorPage from './error.jsx';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import  './styles.css';
import mascot from './assets/magictree.svg';
import GetPoster from './getposter.jsx';


const ShowMovie = (movieDetails) => {
    const logoKey = config.LOGO;
    movieDetails = movieDetails.movie; 
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const isMovieSet = location.state?.isMovieSet;
   
    
      
      useEffect(() => {
        if (isMovieSet && location) {
            const currmovie = location.state.movie;

            
        }
    }, [isMovieSet, location]);
    const sources = movieDetails.sources;

const reducesources = () => {
    if (!sources) {
        return [];
    }
    return sources.reduce((grouped, source) => {
        const existingSource = grouped.find(s => s.name === source.name);
        if (existingSource) {
            if (!existingSource.types.some(t => t.type === source.type)) {
                existingSource.types.push({ type: source.type, price: source.price });
            }
        } else {
            grouped.push({ ...source, types: [{ type: source.type, price: source.price }] });
        }
        return grouped;
    }, []);
}
const groupedSources = reducesources().reduce((acc, source) => {
    source.types.forEach((type) => {
      if (type.type === 'free') {
        acc.free.push({ name: source.name, value: 'Free' });
      } else if (type.type === 'sub') {
        acc.sub.push({ name: source.name, value: 'Subscription' });
      } else if (type.type === 'rent' || type.type === 'buy') {
        acc.rentOrBuy.push({ name: source.name, value: type.type === 'rent' ? `Rent ${type.price}` : `Buy ${type.price}` });
      }
    });
    return acc;
  }, { free: [], sub: [], rentOrBuy: [] });
  
    
    return (
        <div className='row movieDetails'>
            <div className='col '>
                <div className='movieTitle'>
                    <GetPoster movid={movieDetails.imdb_id} />
                </div>
            </div>
            <div className='col movieInfo'>
    <h2 className='row'>{movieDetails.original_title}</h2>
    <div className='sourcesCont col'>
    {Object.entries(groupedSources).map(([type, sources]) => (
  sources.length > 0 && (
    <div key={type} className='col'>
      <h4>{type === 'sub' ? 'Subscription' : type.split(/(?=[A-Z])/).join(' ')}</h4>      
      <ul className='sources col'>
        {sources.map((source, index) => (
          <li key={index}>
            <img src={`https://logo.clearbit.com/${source.name === 'MAX' ? 'hbo' : source.name.split(' ')[0].toLowerCase()}.com`} alt={source.name} className='logo' />
            <div className='sourceDetails'>
              <h2>{source.name}</h2>
              <p>{type === 'rentOrBuy' ? source.value : ''}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
))}
    </div>
    
    <p className='row plot'> {movieDetails.plot_overview}</p>
  </div>
        </div>
    );
}
export default ShowMovie;
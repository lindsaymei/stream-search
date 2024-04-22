import  React, { useEffect, useState } from 'react';

import  './styles.css';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import './App.css';
import Paper from '@mui/material/Paper';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import movies from './moviesuggs.json';
import mascot from './assets/Cat astronaut (2).gif';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Stepper from '@mui/material/Stepper';
import IconButton from '@mui/material/IconButton';
import { config } from './config';
import ErrorPage from './error';
import Drawer from '@mui/material/Drawer';
import ShowMovie from './showMovie.jsx';
const Carousel = (props) => {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = movies.length;
  const [nextMovie, setNextMovie] = React.useState(movies[0].poster);
  const [lastMovie, setLastMovie] = React.useState(movies[maxSteps - 1].poster);
  const [checked, setChecked] = React.useState(true);
  const [currentMovie, setCurrentMovie] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
        const newActiveStep = prevActiveStep + 1 === maxSteps ? 0 : prevActiveStep + 1;
        return newActiveStep;
    });
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => {
      const newActiveStep = prevActiveStep - 1 < 0 ? maxSteps - 1 : prevActiveStep - 1;
      return newActiveStep;
  });
};

  const handleStepChange = (step) => {
    setActiveStep(step);
    const nextIndex = (step + 1) % maxSteps;
    const prevIndex = (step - 1 + maxSteps) % maxSteps;
    setNextMovie(movies[nextIndex].poster);
    setLastMovie(movies[prevIndex].poster);
  };

  React.useEffect(() => {
    const nextIndex = (activeStep + 1) % maxSteps;
    const prevIndex = (activeStep - 1 + maxSteps) % maxSteps;
    setNextMovie(movies[nextIndex].poster);
    setLastMovie(movies[prevIndex].poster);
  }, [activeStep]);
  const handleScroll = (event) => {
    if (open) {
      return;
    }
    if (event.deltaY < 0) {
        handleBack();
    } else {
        handleNext();
    }
};
const handleKeyDown = (event) => {
  if (event.key === 'ArrowUp') {
      handleBack();
  } else if (event.key === 'ArrowDown') {
      handleNext();
  }
};
const toggleDrawer = (newOpen, movieData) => {
  setOpen(newOpen);
  if (newOpen && movieData !== undefined) {
      setLoading(true);
      fetchMovie(movieData).then(() => setLoading(false));
  }
};
const fetchMovie = async (movieData) => {    
  const movid = movieData;
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
  return (
    <div className='col picksCont' onWheel={handleScroll}  onScroll={handleScroll}  onKeyDown={handleKeyDown} tabIndex="0"> 
    
    <div className='picks row'>
      <div className='suggSum col'>
      <div className='row searchAbout'>
      <h1> Our astronauts' pick: </h1>
      
    </div>
        <h2>{movies[activeStep].name}</h2>
        <p >{movies[activeStep].summary}</p>
        <button className='findDetailsBtn' onClick={() => toggleDrawer(true, movies[activeStep].id)}> Where in the world is it?</button>        
        <img src={mascot} className='searchMascot' alt="mascot" />
      </div>
      <Drawer open={open} onClose={() => toggleDrawer(false)} className='drawer' anchor='bottom'>        
      { open && <ShowMovie movie={currentMovie} />}

        </Drawer>
      <div className='scrollContainer'> 
        <div className="suggContent">
        <IconButton onClick={handleBack}>
              <ArrowDropUpIcon />
        </IconButton>
        <img src={lastMovie} className='lastMovie moviePrev' />
          
        
        <Box
            component="img"
            className='carouselImage col'
            src={movies[activeStep].poster}
            alt={movies[activeStep].name}
        />
     
                  
          <img src={nextMovie} className='nextMovie moviePrev' />
          <IconButton onClick={handleNext}>
            <ArrowDropDownIcon />
        </IconButton>
        </div>
        
      </div>
      
    
      <Box sx={{ maxWidth: 800, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            variant="progress"

            className='stepProgress'
            sx={{ maxWidth: 700, flexGrow: 1 }}
          >
            
          </Stepper>
          </Paper>
          
          
        </Box>
      </div>
    </div>
    
  );
}

export default Carousel;

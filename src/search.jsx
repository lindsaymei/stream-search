import logo from './logo.svg';
import  React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';
import ShowMovie from './showMovie.jsx';
import  './styles.css';
import Box from '@mui/material/Box';
import './App.css';
import {config} from './config.js';
import { formToJSON } from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from "react-router-dom";
import ErrorPage from './error.jsx';
import GetPoster from './getposter.jsx';
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

const Search = (event) => {
    const location = useLocation();

    const secret = config.SECRET;
    const searchKey = config.SECRET_SEARCH;
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isMovieSet, setIsMovieSet] = useState(false); 
    const [searchMade, setSearchMade] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [selectedMovie, setSelectedMovie] = useState(movie);

    const [selectedOption, setSelectedOption] = useState(null);
    const [sources, setSources] = useState([]);
    const [currentMovie, setCurrentMovie] = useState("");

    const [suggestions, setSuggestions] = useState([]);
    const url = `https://omdbapi.com/?apikey=${searchKey}&s=${query}`;
    const navigate =  useNavigate();
    const fetchSources = async (movieData) => {    
        const movid = movieData.id;
        const secret = config.SECRET;
        console.log("Search?" , searchMade)

        const url = `https://api.watchmode.com/v1/title/${movid}/sources/?apiKey=${secret}`;
        if(movid !== undefined) {
            try {
                const res = await fetch(url);
                const response = await res.json();
                if (response && typeof response === 'object') {
                   
                    setSources(response);
                } else {
                    setIsMovieSet(null);
                }
            } catch (error) {
                return <ErrorPage />;
            }
        }
      }
      useEffect(() => {
        if (suggestions.length > 0) {
            setSearchMade(true);
            fetchSources(suggestions[0]);
        }
    }, [suggestions]);
      useEffect(() => {
        const fetchAndSetSources = async () => {
            if (suggestions.length > 0) {
            
                setLoading(false);
            }
        };
    
        fetchAndSetSources();
    }, [suggestions]);
    const handlesearch = (searchTerm) => {
        setLoading(true);

        const url = `https://api.watchmode.com/v1/search/?apiKey=${searchKey}&search_field=name&search_value=${searchTerm}`;
        try {
            fetch(url)
            .then((res) =>  res.json())
            .then((response) => {
                if (response && Array.isArray(response.title_results)) {
                    const validSuggestions = response.title_results.filter(movie => movie.title !== null);
                    setSuggestions(validSuggestions);
                    setSearchMade(true);
                    console.log("SEARCH", suggestions);

                } else {
                    setSuggestions([]);
                }                   
            });
        }
        catch(error){
            ;
        }
    }
   
    const fetchMovie = async (movieData) => {  
        setLoading(true);
  
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
                    setLoading(false);
                } else {
                    setCurrentMovie(null);
                }
            } catch (error) {
                return <ErrorPage />;
            }
        }
      }
  

      const toggleDrawer = (newOpen, movieData) => async () => {
        setOpen(newOpen);
        if (newOpen && movieData !== undefined) {
            setLoading(true);
            await fetchMovie(movieData);
            setLoading(false);
        }
    };
       
        // try {
        //     const response = await fetch(url);
        //     const data = await response.json();
        //     console.log("DATA", data);
        //     setSuggestions(data.results);
        // }catch(error){
        //     console.error(error);
        // }
    // }
   

    const handleOnChange = async (event, value, reason) => {

        if( reason === "selectOption") {
            setMovie(value);
            console.log("Setting movie state:", value);
            setIsMovieSet(true)
            // navigate("/search", { state: { movie: value } });
            // console.log("Navigating to /search-page with movie state:", value);


            
             
        }
        else{
            console.log("error:", reason)
        }
    }
    const handleOnClick = async (movie) => {

        if( movie !== undefined) {
            setMovie(movie);
            setIsMovieSet(true)
            navigate("/search", { state: { movie: movie } });
             
        }
        else{
            console.log("error")
        }
    }
    useEffect(() => {
        setIsMovieSet(true)
    }, [movie]);

    // const fetchMovie = async (movie) => {    
    //     const movid = movie.id;
    //     const secret = config.SECRET;
    //     const url = `https://api.watchmode.com/v1/title/${movid}/details/?apiKey=${secret}&append_to_response=sources`;
    //     if(movid !== undefined) {
    //         try {
    //             const res = await fetch(url);
    //             const response = await res.json();
    //             if (response && typeof response === 'object') {
    //                 setMovie(response);
    //                 console.log( "Movie Details", response);
    //             } else {
    //                 setMovie(null);
    //             }
    //         } catch (error) {
    //             console.error("failure");
    //         }
    //     }
    // }
    // useEffect(() => {
    //     if (movie) {
    //         navigate("/show-movie", { state: { movie: movie } });
    //     }
    // }, [movie, navigate]);
    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            
            handlesearch(inputValue);
        }
    };
    const onInputChange = (event, value, reason) => {
        if (reason === 'input') {
            setInputValue(value);
            
        }
    };
    useEffect(() => {
        if (movie !== undefined) {
            fetchMovie(movie);
        }
    }, [movie]);
    return (
        <div> 
             
            <Autocomplete
                id="combo-box-demo"
                disableClearable={true}	
                clearOnBlur={false}
                size="large"
                options={suggestions.slice(0, 12)} // Limit the list length to 12
                onChange={handleOnChange}            
                getOptionLabel={(option) => option.name ? `${option.name} ${option.year ? `(${option.year})` : ''}` : ''}                
                isOptionEqualToValue={(option, value) => option.id === value.id}                
                inputValue={inputValue}
                onInputChange={onInputChange}
                popupIcon={<SearchIcon/>}
                open={false}
                renderOption={(props, option, { selected }) => (
                    <li {...props} key={option.id} onClick={() => setSelectedOption(option)}>
                        {option.name} {option.year ? `(${option.year})` : ''}
                    </li>
                )}
                renderInput={(params) => (
                    <div className='inputContainer'> 
                        <TextField
                        {...params}
                        label="Search the Galaxy"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            disableUnderline: true,
                        }}
                        onKeyDown={onKeyDown}
                        variant="filled"
                    />
                    </div>
                    
                )}
            />
             {!loading && searchMade && (
                <>
                <div className='searchSuggs row'>
                    <div className='bestGuess'>
                        <div className='guessTitle col'>
                    
                        <h3> Top Result: <span className='highlight'>{suggestions[0].name} ({suggestions[0].year})</span></h3> 
                        </div>
                       <div className='row'>
                       <div className='col'>
                            <GetPoster movid={suggestions[0].imdb_id} />
                        </div>
                        <div className='col guessDetails'>
                        
                            {sources && sources.length > 0 && sources.slice(0, 2).map((source, index) => (
                                <div key={source.id}>
                                    <img src={`https://logo.clearbit.com/${source.name === 'MAX' ? 'hbo' : source.name.split(' ')[0].toLowerCase()}.com`} alt={source.name} className='logo' />
                                    
                                </div>
                            ))}
                            
                            
                            <div className='seeMore'>
                            <Button onClick={toggleDrawer(true,suggestions[0]) }> <AddIcon/></Button>
                                
                            {/* <p> See More</p>
                            <div onClick={() => toggleDrawer(false)} style={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0}}></div>
                            <Drawer open={open} onClose={() => toggleDrawer(false)} anchor='bottom' >
                            <IconButton onClick={() => toggleDrawer(false)}>
        <CloseIcon />
    </IconButton>
                            </Drawer> */}
                            </div>
                                        </div>
                       </div>
                       
                            
                        

                        </div>
                        <div className='col suggestions'>
                            <h3> Other Results:</h3>
                        <ul className='suggestionsGrid'>
                        
                            {suggestions.slice(1,13).map((suggestion, index) => (
                                
                                <li key={suggestion.id}  >
                                   
                                    <div className='suggPoster' onClick={toggleDrawer(true,suggestion)}> 
                                        <GetPoster movid={suggestion.imdb_id}/>
                                        
                                    </div>
                                   
                                     
                                    {suggestion.name} {suggestion.year ? `(${suggestion.year})` : ''}
                                
                                </li>
                            ))}
                        </ul>
                        </div>
                        <Drawer open={open} onClose={toggleDrawer(false)} className='drawer' anchor='bottom'>
                        {loading ? <p>Loading...</p> : open && <ShowMovie movie={currentMovie} />}

                        </Drawer>
                        
                </div>
                    
                </>
            )}   
            </div>
            
        );
    

}
export default Search; 
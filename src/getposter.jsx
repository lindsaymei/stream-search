import  React, { useEffect, useState } from 'react';
import { config } from './config';
import { set } from 'react-hook-form';

const GetPoster = ({ movid }) => {
    const [poster, setPoster] = useState(null);
    const key = config.ombd;
        if (movid !==undefined) {

            fetch(`https://omdbapi.com/?apikey=${key}&i=${movid}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPoster(data.Poster);

                })
                
        }else{
            
                console.log("No movie ID");
            
        }
   // This effect will run whenever movid changes

    return (
        // Render your poster here
        <div>
           
            {movid && <img src={poster} alt="Movie Poster" className='guessPoster'/>}        
        </div>
    );
};

export default GetPoster;
import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from '../../axios'
import { API_KEY,imageUrl } from '../../utils/constants'
import {FaPlay} from 'react-icons/fa'

function Banner() {
    const [movie, setMovie] = useState();
  
    useEffect(() => {
      axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`)
        .then((response) => {
          const results = response.data.results;
          const randomIndex = Math.floor(Math.random() * results.length);
          console.log(results[randomIndex]);
          setMovie(results[randomIndex]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
    
    
  return (
    <div className='banner' style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`    }}>
       <div className='content'>
        <h1 className='title'>{movie ? (movie.title || movie.name ) : " "} </h1>
        <div className='flex banner_button'>
            <button className='flex items-center button'><FaPlay/><span>Play</span></button>
            <button className='button'>My List</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : " " }</h1>
        </div> 
        <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner
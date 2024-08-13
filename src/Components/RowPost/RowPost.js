import React, { useEffect, useState } from 'react';
import './RowPost.css';
import axios from '../../axios';
import { imageUrl, API_KEY } from '../../utils/constants';
import Youtube from 'react-youtube';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios.get(props.url).then(response => {
      console.log(response.data);
      setMovies(response.data.results);
    }).catch(err => {
      alert('Network Error');
    });
  }, [props.url]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (movie) => {
    setUrlId('');
    setSelectedMovie(movie);

    axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        console.log(response.data);
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          console.log('No trailers available');
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found');
        } else {
          console.error('An error occurred:', error.message);
        }
      });
  };

  return (
    <div className='row'>
      <h2 className='rowtitle'>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj) =>
          <img 
            key={obj.id}
            onClick={() => handleMovie(obj)} 
            className={props.isSmall ? 'smallPoster' : 'poster'}
            src={`${imageUrl + obj.poster_path}`} 
            alt="poster" 
          />
        )}
      </div>

      {selectedMovie && (
        <div className='movieDetails'>
          <div className='trailerAndContent'>
            {urlId && <div className='trailer'><Youtube opts={opts} videoId={urlId.key} /></div>}
            <div className='content'>
              <h1 className='title'>{selectedMovie.title || selectedMovie.name}</h1>
              <div className='banner_button'>
                <button className='button'>Play</button>
                <button className='button'>My List</button>
              </div>
              <h1 className='description'>{selectedMovie.overview}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RowPost;

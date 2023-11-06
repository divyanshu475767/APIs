import React from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
 async function fetchMoviesHandler(){

  const movieData = await fetch('https://swapi.dev/api/films');
 
   const jsonData =await  movieData.json();
   console.log(jsonData);
   const transformedMovies = jsonData.results.map(movieData=>{
    return {
      id:movieData.episode_id,
      title:movieData.title,
      openingText:movieData.opening_crawl,
      releaseDate:movieData.release_date

    };
   })

 setMovies(transformedMovies);



}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error , setError] = useState(null);


  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try{
      const movieData = await fetch("https://swapi.dev/api/fims");

      if(!movieData.ok){
        throw new Error('Something went wrong')
      }

    const jsonData = await movieData.json();
    console.log(jsonData);

    
    const transformedMovies = jsonData.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });

    setMovies(transformedMovies);
    }

    catch (err) {

      setError(err.message);
      setTimeout(()=>{
        fetchMoviesHandler();
      },5000)


    }
    setIsLoading(false);
    
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>

      <section>
        {isLoading && (
          <div className="loader-container">
            <div class="loader"></div>
          </div>
        )}

        {!isLoading && <MoviesList movies={movies} />}

        {!isLoading && error && <p>{error}...Retrying</p>}
      </section>
    </React.Fragment>
  );
}

export default App;




import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState , useEffect , useCallback } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error , setError] = useState(null);

     

  const fetchMoviesHandler= useCallback(async()=> {
    setIsLoading(true);
    setError(null);
    try{
      const movieData = await fetch("https://swapi.dev/api/films");

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
    
    }
    setIsLoading(false);
    
  },[])

  useEffect(()=>{
    fetchMoviesHandler();
},[fetchMoviesHandler])


 
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button >Cancel trying</button>
        
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




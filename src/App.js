import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState, useEffect, useCallback } from "react";
import Form from "./components/Form";
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const movieData = await fetch(
        "https://reacthttp-1e5a7-default-rtdb.firebaseio.com/movies.json"
      );

      if (!movieData.ok) {
        throw new Error("Something went wrong");
      }

      const jsonData = await movieData.json();

      const loadedMovies = [];

      for (const key in jsonData) {
        loadedMovies.push({
          id: key,
          title: jsonData[key].title,
          openingText: jsonData[key].text,
          releaseDate: jsonData[key].date,
        });
      }

      setMovies(loadedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const getDataHandler = async (formData) => {
    const response = await fetch(
      "https://reacthttp-1e5a7-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
    const newMovie = {
      id: data.name,
      ...formData,
    };
    console.log(newMovie);

    setMovies((prev) => [...prev, newMovie]);
  };

  const deleteHandler = async (id) => {
    console.log(id);
    setMovies((prev) => {
      const updatedMovies = prev.filter((value) => {
        if (value.id !== id) return value;
      });

      return updatedMovies;
    });
    const response = await fetch(
      `https://reacthttp-1e5a7-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log("item deleted successfully");
    } else {
      console.log("item not deleted successfully");
    }
  };

  return (
    <React.Fragment>
      <Form getData={getDataHandler} />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>

      <section>
        {isLoading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}

        {!isLoading && <MoviesList movies={movies} onDelete={deleteHandler} />}

        {!isLoading && error && <p>{error}...Retrying</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

import React, { useEffect } from "react";
import Search from "./components/Search";
import { useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce, useStateList } from "react-use";
import { updateSearchCount } from "./appwrite";
import { getTrendingMovies } from "./appwrite";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTION = {
  method: "GET",
  headers: { 
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [debounced, setdebounced] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [trendingMovies, settrendingMovies] = useState([])

  useEffect(() => {
    fetchmovies(debounced);
  }, [debounced]);

  useEffect(() => {
   loadTrendingMovies();
  }, []);
  

  useDebounce(() => setdebounced(SearchTerm), 700, [SearchTerm]);

  const fetchmovies = async (query) => {
    seterrorMessage("");
    setisLoading(true);

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?=sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTION);

      if (!response.ok) {
        throw new Error("Error fetching movies");
      }

      const data = await response.json();

      if (data.Response == "false") {
        seterrorMessage(data.Error || "faild to fetch movies");
        setmovieList([]);
        return;
      }

      setmovieList(data.results || []);

      if (query && data.results.length>0){
        await updateSearchCount(query , data.results[0]);
      }

      console.log(data);
    } catch (error) {
      console.log("erro no movies with this name was found");
      seterrorMessage(`erro no movies with this name was found ${error}`);
    } finally {
      setisLoading(false);
    }
  };

  const loadTrendingMovies = async () => {

    try {

      const movies = await getTrendingMovies();
      settrendingMovies(movies);
      
    } catch (error) {
      console.log('error fetching movies');
    }

  }

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length >0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie,index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />

                </li>
              ))}
            </ul>
          </section>
        )}
        
        <section className="all-movies">
          <h2>All movies</h2>

          {isLoading ? (
            <Spinner></Spinner>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}>
                  {" "}
                </MovieCard>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;

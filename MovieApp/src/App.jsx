import React, { useEffect } from "react";
import Search from "./components/Search";
import { useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce, useStateList } from "react-use";

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

  useEffect(() => {
    fetchmovies(debounced);
  }, [debounced]);

  useDebounce(() => setdebounced(SearchTerm), 600, [SearchTerm]);

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

      setmovieList(data.results);

      console.log(data);
    } catch (error) {
      console.log("erro no movies with this name was found");
      seterrorMessage(`erro no movies with this name was found ${error}`);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
        </header>
        <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm} />
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

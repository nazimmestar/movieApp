import React, { useEffect } from "react";
import Search from "./components/Search";
import { useState } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_OPTION = {
  method: 'GET',
  headers : {
    accept : 'application/json',
Authorization : `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {}, []);
  const [errorMessage, seterrorMessage] = useState('')

  const fetchmovies= async() =>{

    try {
      
    } catch (error) {

      console.log('erro no movies with this name was found')
      seterrorMessage('erro no movies with this name was found')

      
    }

  }

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
      </div>
    </main>
  );
};

export default App;

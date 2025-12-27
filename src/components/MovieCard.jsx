import React from "react";

const MovieCard = ({
  movie: { poster_path, title, vote_average, original_language, release_date },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt=""
      />
      <div className="mt-4">
        <h3>{title}</h3>
      </div>
      <div className="content">
        <div className="rating">
          <img className="img" src="./star.svg" alt="" />
          <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">{release_date.split('-')[0]}</p>


        </div>
      </div>
    </div>
  );
};

export default MovieCard;

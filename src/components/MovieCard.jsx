import React from "react";

const MovieCard = ({ movie, onDelete, onLike, onUnlike, showLikeButton }) => {
  const { imdbID, id, Year, Poster, image, Title, title, Type, description, isFirebaseMovie } = movie;

  return (
    <div className="movie" key={imdbID || id}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img src={Poster || image} alt={Title || title} />
      </div>

      <div>
        <span>{Type || "Movie"}</span>
        <h3>{Title || title}</h3>
        {description && <p>{description}</p>}
        
        {isFirebaseMovie && (
          <div className="buttons">
            <button>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
          </div>
        )}
        {showLikeButton ? (
          <button onClick={() => onLike(movie)}>Like</button>
        ) : (
          <button onClick={() => onUnlike(movie)}>Unlike</button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

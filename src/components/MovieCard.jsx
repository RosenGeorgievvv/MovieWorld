import React from "react";

const MovieCard = ({ movie, onEdit, onDelete, onLike, onUnlike, showLikeButton }) => {
  const { imdbID, id, Year, Poster, image, Title, title, Type, description, isFirebaseMovie } = movie;

  return (
    <div className="movie" key={imdbID || id}>
      <div>
        <p>{Year || "Unknown Year"}</p>
      </div>

      <div>
        <img src={Poster !== "N/A" ? Poster : image || "https://via.placeholder.com/400"} alt={Title || title} />
      </div>

      <div>
        <span>{Type || "Movie"}</span>
        <h3>{Title || title}</h3>
        {description && <p>{description}</p>}
        {isFirebaseMovie && (
          <div className="buttons">
            <button onClick={() => onEdit(movie)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
          </div>
        )}
        {showLikeButton && (
          <button onClick={() => onLike(movie)}>Like</button>
        )}
        {!showLikeButton && (
          <button onClick={() => onUnlike(movie)}>Unlike</button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

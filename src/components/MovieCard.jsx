import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authentication";

const MovieCard = ({ movie, onDelete, onLike, onDislike, showLikeButton }) => {
  const { imdbID, id, Year, Poster, image, Title, title, Type, description, isFirebaseMovie } = movie;
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

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

        {currentUser && (
          <div className="buttons">
            {showLikeButton ? (
              <button onClick={() => onLike(movie)}>Like</button>
            ) : (
              <button onClick={() => onDislike(movie)}>Dislike</button>
            )}
            {isFirebaseMovie && (
              <>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "favorites"));
      const favoritesList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setFavorites(favoritesList);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    }
  };

  const handleDislike = async (movie) => {
    try {
      await deleteDoc(doc(db, "favorites", movie.id));
      fetchFavorites();
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  return (
    <div className="app">
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <div className="container">
          {favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDislike={handleDislike}
              showLikeButton={false}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No favorites found</h2>
        </div>
      )}
    </div>
  );
};

export default Favorites;

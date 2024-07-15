import React, { useState, useEffect } from "react";
import { API_URL } from "../services/api.js";
import { db } from '../services/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import MovieCard from "./MovieCard";
import SearchIcon from "../assets/search.svg";


const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
    fetchFavorites();
  }, []);

  const searchMovies = async (title) => {
    const apiMovies = await fetchMoviesFromAPI(title);
    const firebaseMovies = await fetchFirebaseMovies();
    setMovies([...apiMovies, ...firebaseMovies]);
  };

  const fetchMoviesFromAPI = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    return data.Search || [];
  };

  const fetchFirebaseMovies = async () => {
    const querySnapshot = await getDocs(collection(db, 'movies'));
    const firebaseMovies = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      isFirebaseMovie: true 
    }));
    return firebaseMovies;
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'movies', id));
    searchMovies(searchTerm);
  };

  const handleLike = async (movie) => {
    try {
      await addDoc(collection(db, "favorites"), movie);
      fetchFavorites();
    } catch (err) {
      console.error("Failed to add favorite", err);
    }
  };

  const handleUnlike = async (movie) => {
    try {
      const favoriteMovie = favorites.find(fav => fav.imdbID === movie.imdbID || fav.id === movie.id);
      if (favoriteMovie) {
        await deleteDoc(doc(db, "favorites", favoriteMovie.id));
        fetchFavorites();
      }
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

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

  const isFavorite = (movie) => {
    return favorites.some(fav => fav.imdbID === movie.imdbID || fav.id === movie.id);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for movies" />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID || movie.id}
              movie={movie}
              onDelete={handleDelete}
              onLike={handleLike}
              onUnlike={handleUnlike}
              isFavorite={isFavorite(movie)}
              showLikeButton={!isFavorite(movie)}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default Movies;

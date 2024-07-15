import React, { useState, useEffect } from "react";
import { API_URL } from "../services/api.js";
import { db } from '../services/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import MovieCard from "./MovieCard";
import SearchIcon from "../assets/search.svg";

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
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

  const handleEdit = async (movie) => {
    const newTitle = prompt("Edit title", movie.title || movie.Title);
    if (newTitle) {
      const movieDoc = doc(db, 'movies', movie.id);
      await updateDoc(movieDoc, { title: newTitle });
      searchMovies(searchTerm); 
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'movies', id));
    searchMovies(searchTerm);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id || movie.imdbID}
              movie={movie}
              onEdit={handleEdit}
              onDelete={handleDelete}
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

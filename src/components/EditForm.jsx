import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import '../styles/Edit.css';

const EditForm = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, 'movies', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMovie({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such record!');
      }
    };

    fetchMovie();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'movies', id);
    await updateDoc(docRef, movie);
    alert('Movie updated successfully');
    navigate('/')
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="main-form">
      <div className="main-wrapper">
        <h2 className="title">Edit Movie</h2>
        <form onSubmit={handleSave}>
          <div className="form-details">
            <label>Title</label>
            <input type="text" value={movie.title} onChange={(e) => setMovie({ ...movie, title: e.target.value })} />
          </div>
          <div className="form-details">
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={(e) => setMovie({ ...movie, image: e.target.value })} />
          </div>
          <div className="form-details">
            <label>Description:</label>
            <textarea value={movie.description} onChange={(e) => setMovie({ ...movie, description: e.target.value })} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;

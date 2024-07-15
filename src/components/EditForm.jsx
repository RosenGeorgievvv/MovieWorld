import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const EditForm = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, 'movies', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMovie({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such movie!');
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Movie</h1>
      <form>
        <div>
          <label>Title</label>
          <input type="text" value={movie.title} onChange={(e) => setMovie({ ...movie, title: e.target.value })} />
        </div>
        <div>
          <label>Image</label>
          <input type="text" value={movie.image} onChange={(e) => setMovie({ ...movie, Image: e.target.value })} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={movie.description} onChange={(e) => setMovie({ ...movie, Description: e.target.value })} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditForm;

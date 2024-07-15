import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../services/firebase';
import '../styles/Edit.css';

const EditForm = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, 'movies', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMovie({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchMovie();
  }, [id]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'movies', id);

    if (imageFile) {
      const storage = getStorage();
      const imageRef = ref(storage, `movies/${id}/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      await updateDoc(docRef, { ...movie, image: imageUrl });
    } else {
      await updateDoc(docRef, movie);
    }

    alert('Movie updated successfully');
    navigate('/');
  };

  if (!movie) return <div className='loading'>Loading...</div>;

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
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="form-details">
            <label>Description</label>
            <textarea value={movie.description} onChange={(e) => setMovie({ ...movie, description: e.target.value })} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;

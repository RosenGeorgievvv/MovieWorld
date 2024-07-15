import React, { useState } from 'react';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/Create.css';

const Create = () => { 
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);

      console.log('image url:', url);

      try {
        await addDoc(collection(db, 'movies'), {
          title,
          image: url,
          description,
        });

        setTitle('');
        setImage(null);
        setDescription('');

        navigate('/')
      } catch (err) {
        console.error('Failed to add movie', err);
      }
    }
  };

  return (
    <div className="main-form">
      <div className="main-wrapper">
        <h1 className="title">Add a New Movie</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-details">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-details">
            <label>Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required />
          </div>
          <div className="form-details">
            <label>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default Create;

import React, { useEffect } from 'react';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import '../styles/Create.css';

const Create = () => {
  const { register, handleSubmit, formState: { errors }, setFocus, reset, setValue } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setValue('image', e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    const { title, image, description } = data;

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

        reset();
        navigate('/');
      } catch (err) {
        console.error('Failed to add movie', err);
      }
    }
  };

  return (
    <div className="main-form">
      <div className="main-wrapper">
        <h1 className="title">Add a New Movie</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-details">
            <label>Title:</label>
            <input
              type="text"
              {...register('title', {
                required: 'Title is required',
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Title must contain only letters and no numbers'
                }
              })}
              autoFocus
            />
            {errors.title && <span className="error-message">{errors.title.message}</span>}
          </div>
          <div className="form-details">
            <label>Image:</label>
            <input
              type="file"
              accept=".png, .jpeg"
              {...register('image', {
                required: 'Image is required',
                validate: value => 
                  value && (value.type === 'image/png' || value.type === 'image/jpeg')
                  || 'Image must be a .png or .jpeg file'
              })}
              onChange={handleImageChange}
            />
            {errors.image && <span className="error-message">{errors.image.message}</span>}
          </div>
          <div className="form-details">
            <label>Description:</label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 20,
                  message: 'Description must be at least 20 letters'
                }
              })}
            />
            {errors.description && <span className="error-message">{errors.description.message}</span>}
          </div>
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default Create;

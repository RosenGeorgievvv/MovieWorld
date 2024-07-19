import React, { useRef, useEffect } from 'react';
import { db } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useForm } from 'react-hook-form';
import '../styles/Create.css';

const Create = () => {
  const { register, handleSubmit, setFocus, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  const onSubmit = async (data) => {
    const { title, description, image } = data;

    if (image && image[0]) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image[0].name}`);
      await uploadBytes(storageRef, image[0]);
      const url = await getDownloadURL(storageRef);

      console.log('image url:', url);

      try {
        await addDoc(collection(db, 'movies'), {
          title,
          image: url,
          description,
        });

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
                minLength: {
                  value: 3,
                  message: 'Title must have at least 3 characters',
                },
                validate: {
                  noLeadingWhitespace: value => value.trim().length === value.length || 'Title cannot start with a blank space'
                }
              })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div className="form-details">
            <label>Image:</label>
            <input type="file" accept="image/*" {...register('image', { required: 'Image is required' })} />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <div className="form-details">
            <label>Description:</label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 20,
                  message: 'Description must have at least 20 characters',
                },
                validate: {
                  noLeadingWhitespace: value => value.trim().length === value.length || 'Description cannot start with a blank space'
                }
              })}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
};

export default Create;

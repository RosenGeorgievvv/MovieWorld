import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../styles/Register.css';
import { auth } from '../services/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';    

const Register = () => {

  const { register, handleSubmit, watch, formState: { errors }, setFocus } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const signUp = async (data) => {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log(credentials);
      navigate('/');
    } catch (error) {
      console.log(error);   
    }
  };

  const password = watch("password", "");

  return (
    <div className='main-form'>
      <div className='main-wrapper'>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit(signUp)}>
          <input
            type='text'
            placeholder='Username'
            {...register('username', { required: 'Username is required' })}
            ref={useRef()}
          />
          {errors.username && <span className='error-message'>{errors.username.message}</span>}
          <input
            type='email'
            placeholder='Email'
            {...register('email', { 
              required: 'Email is required', 
              validate: value => 
                value.includes('@') && value.includes(',') 
                ? true 
                : 'Email must contain both "@" and ","'
            })}
          />
          {errors.email && <span className='error-message'>{errors.email.message}</span>}
          <input
            type='password'
            placeholder='Password'
            {...register('password', { 
              required: 'Password is required', 
              minLength: { 
                value: 6, 
                message: 'Password must be at least 6 characters' 
              },
              validate: value => !/\s/.test(value) || 'Password cannot contain spaces'
            })}
          />
          {errors.password && <span className='error-message'>{errors.password.message}</span>}
          <input
            type='password'
            placeholder='Confirm Password'
            {...register('repass', { 
              required: 'Confirm Password is required', 
              validate: value => value === password || 'Passwords do not match'
            })}
          />
          {errors.repass && <span className='error-message'>{errors.repass.message}</span>}
          <button type='submit'>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;

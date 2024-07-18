import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "../styles/Login.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const Login = () => {

  const { register, handleSubmit, formState: { errors }, setFocus } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    // Focus on the email input field when the component mounts
    setFocus('email');
  }, [setFocus]);

  const handleSignIn = async (data) => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log(credentials);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main-form'>
      <div className='main-wrapper'>
        <span className='title'>Login</span>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <input
            type='email'
            placeholder='email'
            {...register('email', { 
              required: 'Email is required', 
              validate: value => 
                value.includes('@') && value.includes('.') 
                ? true 
                : 'Incorrect email format!'
            })}
          />
          {errors.email && <span className='error-message'>{errors.email.message}</span>}
          <input
            type='password'
            placeholder='password'
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
          <button type='submit'>Sign in</button>
        </form>
        <p>You do not have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;

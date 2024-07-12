import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import {auth} from '../services/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';    

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repass, setRepass] = useState(''); 
   
  const clearInput = useRef(''); 
  const navigate = useNavigate();

  const signUp = (e) =>{
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password).then((credentials) =>{
      console.log(credentials);
      navigate('/');
    }).catch((error) =>{
      console.log(error);   
    })
  }


  return (
    <div className='main-form'>
      <div className='main-wrapper'>
        <span className='title'>Register</span>
        <form onSubmit={signUp} ref={clearInput}> 
          <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type='password' placeholder='Confirm Password' value={repass} onChange={(e) => setRepass(e.target.value)}/>
          <button>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;

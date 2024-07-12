import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../services/firebase';

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate();

const signIn = (e) =>{
  e.preventDefault();
  signInWithEmailAndPassword(auth, email, password).then((credentials) =>{
    console.log(credentials);
    navigate('/');
  }).catch((error) =>{
    console.log(error);
  })
}

  return (
    <div className='main-form'>
        <div className='main-wrapper'>
            <span className='title'>Login</span>
            <form onSubmit={signIn}>
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Sign in</button>
            </form>
            <p>You do not have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login
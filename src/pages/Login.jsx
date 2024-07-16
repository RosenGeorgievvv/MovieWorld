import React, { useState, useRef, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../services/firebase';

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const emailRef = useRef();
const navigate = useNavigate();

useEffect(() => {
  // Focus on the email input field when the component mounts
  emailRef.current.focus();
}, []);

const handleSignIn = (e) =>{
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
            <form onSubmit={handleSignIn}>
                <input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} ref={emailRef} />
                <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button>Sign in</button>
            </form>
            <p>You do not have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login
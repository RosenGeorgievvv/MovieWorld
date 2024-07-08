import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  return (
    <div className='main-form'>
      <div className='main-wrapper'>
        <span className='title'>Register</span>
        <form>
          <input type='text' placeholder='Username' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <input type='password' placeholder='Confirm Password' />
          <button>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;

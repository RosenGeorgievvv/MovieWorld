import React from 'react';
import "../styles/Login.css";

const Login = () => {
  return (
    <div className='main-form'>
        <div className='main-wrapper'>
            <span className='title'>Login</span>
            <form>
                <input type='email' placeholder='email'/>
                <input type='password' placeholder='password'/>
                <button>Sign in</button>
            </form>
            <p>You do not have an account? <a href="/register">Register</a></p>
        </div>
    </div>
  )
}

export default Login
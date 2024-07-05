import React from 'react'

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
            <p>You do not have an account? Register</p>
        </div>
    </div>
  )
}

export default Login
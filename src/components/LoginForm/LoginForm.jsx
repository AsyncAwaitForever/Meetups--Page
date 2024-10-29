import React from 'react';
import FormButton from '../Button/Button'
import { TextField, } from '@mui/material';
import "./LoginForm.scss";

const handleLogin = () => {
    console.log(clicked, "logged in");
  };


const LoginForm = () => {
  return (
    
    <div className='loginForm-container'>
        <FormButton text="Login" className="login-button" onClick={handleLogin} />
    </div>
  )
}

export default LoginForm
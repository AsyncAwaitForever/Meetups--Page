import React from 'react';
import { Button } from '@mui/material'; 
import './button.scss'

const FormButton = ({ text, onClick, type = 'button', className= '', id},) => {
  return (
    <button type= {type} className={`form-button ${className}`} >
        {text}
    </button>
  )
}

export default FormButton;
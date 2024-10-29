import React from 'react';
import FormButton from '../Button/Button';
import "./signUpForm.scss";
 
const handleSignUp = () => {
    console.log(clicked, "Sign Up");
    
}

const SignUpForm = () => {
  return (
    <div className='signupForm-container'>
            <FormButton text="SignUp" className="signup-button" onClick={handleSignUp} />
    </div>

  )
}

export default SignUpForm
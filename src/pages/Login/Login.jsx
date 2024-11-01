/*import React, { useState } from 'react';
import './login.scss';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import FormButton from '../../components/Button/Button';

const Login = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    console.log('Toggling overlay');
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <Header />
      <div className="loginPage">
        <LoginForm toggleOverlay={toggleOverlay} />
        {showOverlay && (
          <div className="overlay">
            <div className="overlayContent">
              <FormButton
                type="button"
                text="To Login"
                className="closeButton"
                onClick={toggleOverlay}
              />
              <SignUpForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
*/

import React, { useState } from 'react';
import './login.scss';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import FormButton from '../../components/Button/Button';

const Login = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    console.log('Toggling overlay');
    setShowOverlay((prevState) => !prevState);
  };

  return (
    <>
      <Header />
      <div className="loginPage">
        <LoginForm toggleOverlay={toggleOverlay} />
        {showOverlay && (
          <div className="overlay">
            <div className="overlayContent">
              <FormButton
                type="button"
                text="To Login"
                className={`toLoginButton ${
                  showOverlay ? 'overlayActive' : ''
                }`} // Dynamisk klass
                onClick={toggleOverlay}
              />
              <SignUpForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;

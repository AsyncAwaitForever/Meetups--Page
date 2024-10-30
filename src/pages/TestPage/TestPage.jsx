import React from "react";
import useAuth from "../../hooks/useAuth/useAuth";

const TestPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Welcome to the Protected Page!</h1>
          <p>You are logged in and can access this page.</p>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
};

export default TestPage;

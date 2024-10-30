import React from "react";
import useAuth from "../hooks/useAuth/useAuth";
import "../hooks/useAuth/useAuth.scss"

const TestPage = () => {
  const { isAuthenticated, isBlurred } = useAuth();

  return (
    <div>
      {isBlurred && <div className="blur" />} {/* Aggiungi la classe blur */}
      <div style={{ position: "relative", zIndex: 1 }}> {/* Contenuto sopra il blur */}
        {isAuthenticated ? (
          <>
            <h1>Welcome to the Protected Page!</h1>
            <p>You are logged in and can access this page.</p>
          </>
        ) : (
          <p>Redirecting to login...</p>
        )}
      </div>
    </div>
  );
};

export default TestPage;

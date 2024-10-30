import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      if (!isBlurred) {
        setIsBlurred(true);
        setTimeout(() => {
          alert("You must login to access this page.");
          setIsBlurred(false);
          navigate("/login");
        }, 500); 
      }
    } else {
      setIsAuthenticated(true);
      setIsBlurred(false);
    }
  }, [navigate, isBlurred]);

  return { isAuthenticated, isBlurred };
};

export default useAuth;

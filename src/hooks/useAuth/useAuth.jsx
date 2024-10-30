import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const alertShown = useRef(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      if (!alertShown.current) {
        alertShown.current = true; 
        alert("You must login to access this page.");
        navigate("/login");
      }
    } else {
      setIsAuthenticated(true);
      alertShown.current = false; 
    }
  }, [navigate]);

  return { isAuthenticated };
};

export default useAuth;

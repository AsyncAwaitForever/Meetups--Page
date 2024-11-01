import { useEffect, useState } from 'react';

const useSimpleAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return token;
};

export default useSimpleAuth;
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from './context.js';

const PrivateRoute = ({ children }) => {

  const { username } = useContext(UserContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, []);

  return username ? children : null;
};

export default PrivateRoute;
import { request } from '../utils/api';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const [isVerified, setIsVerified] = useState(undefined);
  useEffect(() => {
    request({
        url: 'api/verify-token/',
        method: 'get',
      })
        .then(res => setIsVerified(true))
        .catch(err => setIsVerified(false));
  }, [])

  if(isVerified == true){
    return children
  } if(isVerified == false){
    return <Navigate to={"/login/"}/>
  }
};

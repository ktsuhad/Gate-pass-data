import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isVerified, setIsVerified] = useState(false);
  const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem('profileData'))); // Retrieve profileData from localStorage


  return (
    <AuthContext.Provider value={{ token, setToken , isVerified , setIsVerified , profileData ,setProfileData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

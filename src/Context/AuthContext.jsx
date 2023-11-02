import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isVerified, setIsVerified] = useState(false);
  const [profileData, setProfileData] = useState(JSON.parse(localStorage.getItem('profileData')) || null); // Retrieve profileData from localStorage

  useEffect(() => {
    // Whenever token or isVerified changes, update local storage
    localStorage.setItem('token', token);
  }, [token, isVerified]);

  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  return (
    <AuthContext.Provider value={{ token, setToken , isVerified , setIsVerified , profileData ,setProfileData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

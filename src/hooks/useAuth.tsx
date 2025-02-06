import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define a type for the user data (if available)
interface UserData {
  username: string;
  email: string;
  // Add other fields depending on your backend response
}

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    navigate('/')
  }

  useEffect(() => {
    // Check if the token exists in localStorage
    console.log('getting token')
    const token = localStorage.getItem('authToken');
    console.log(token)
    
    if (token) {
      // If token exists, consider the user as authenticated
      setIsAuthenticated(true);
      
      // Optional: Fetch or parse user data if needed from the token (JWT, for example)
      try {
        // Here we can decode the token (if it's a JWT token) or call an API to get user details
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        console.log(decodedToken, 'token')
        setUserData({
          username: decodedToken.username,
          email: decodedToken.email,
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      // If no token is found, user is not authenticated
      setIsAuthenticated(false);
      setUserData(null);
    }
  }, [localStorage.getItem('authToken')]); // Runs once on component mount

  return { isAuthenticated, userData, handleLogout };
};

export default useAuth;

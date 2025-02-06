import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json'
  }
})


// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to headers if present
    const token = localStorage.getItem('authToken'); // Example: get token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response (e.g., log response data, modify it, etc.)
    return response;
  },
  (error) => {
    // Handle the response error (e.g., handle expired token, show global error message)
    if (error.response?.status === 401) {
      // Token expired or unauthorized error
      console.error('Unauthorized! Redirecting to login...');
      // You can redirect to login page here if necessary
      // For example: window.location.href = '/login';
    } else if (error.response?.status === 500) {
      console.error('Server error, please try again later.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance
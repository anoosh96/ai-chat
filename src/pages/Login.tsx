
import { GoogleLogin } from '@react-oauth/google';
import React, { FormEvent, useState } from 'react';
import axios from '../api/axios.js'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleLogin = async (response: any) => {
    console.log(response)
    try {
      const googleToken = response.credential; // This is the Google ID token
      
      // Send token to the backend for verification and authentication
      const res = await axios.post('/api/users/auth/google-signin', {
        token: googleToken
      });

      // Handle the response from the backend (JWT or user data)
      localStorage.setItem('authToken', res.data.token);
      console.log('User logged in successfully');
      navigate('/chat')
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login Failed')} />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center text-sm text-gray-500 mt-4">
            <a href="#" className="hover:text-blue-500">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Import the external CSS file

const Login = () => {
    const navigate=useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation
    if (!username || !password) {
      setMessage('Both fields are required.');
      return;
    }

    try {
      const { data } = await axios.post('https://video-management-app-1-ch6j.onrender.com/user/Login', {
        Email: username,
        Password: password,
      });
      
if(data.res=='login successful'){
    setMessage('Login successful!');
      alert('Login successful!');
    navigate('/videos')
}else{
    alert('wrong credentials')
}
      
      // Perform further actions upon successful login, e.g., redirecting the user
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
       
      <form onSubmit={handleLogin} className="login-form">
      <h2>
            Login User
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Login
        </button>
        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;

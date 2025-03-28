import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Sign = () => {
    const navigate=useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [useremail, setUseremail] = useState('');

  const handleLogin = async () => {
    const { data } = await axios.post('http://localhost:2200/user/Register', {
      Name: username,
      Email: useremail,
      Password: password,
    });
    console.log(username, useremail, password);
    console.log(data);
    navigate('/login')
    
  };

  return (
    <div className="sign-container">
        <h2>Register user</h2>
      <input
        className="sign-input"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="sign-input"
        onChange={(e) => setUseremail(e.target.value)}
        placeholder="User Email"
      />
      <input
        className="sign-input"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="sign-button" onClick={handleLogin}>
        Sign in
      </button>
    </div>
  );
};

export default Sign;

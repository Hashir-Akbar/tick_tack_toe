"use client";

import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    
    if (username.trim() === '') {
      setError('Username is required');
    } else if (password.length < 3) {
      setError('Password is too short');
    } else {
      setError('');
      console.log('Logging in:', { username, password });

      const res = await fetch("http://localhost:8080/users?username=" + username, { cache: 'no-store' });

      const data = await res.json();

      console.log(data);

      if (data.length > 0 && data[0].password === password) {
        window.location.href = '/services';
      } else {
        alert("This is incorrect");
      }
    }
  };

  return (
    <form onSubmit={(e: any) => handleSubmit(e)}>
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
import React, { useState } from 'react';
import './Signup.css'; // Import the CSS
import axios from 'axios'
import { Link ,useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate =useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post ("http://localhost:3001/register",{name ,email,password})
    .then (res =>{ Navigate ('/login')

    }).catch (err => console.log(err))

  }


  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an Account</p>
      <Link  to ='/login'>Login</Link>
    </div>
  );
};

export default Signup;

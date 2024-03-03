import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import signupimg from "../component/image/signupimg.jpg";

const Signup = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [secondAddress, setSecondAddress] = useState('');
  const navigate = useNavigate();

  const checkEmail = async () => {
    // Add logic to check if email is already in use
  }

  const validatePhone = (phone) => {
    const phoneRegex = /^(97|98)\d{8}$/;
    return phoneRegex.test(phone);
  }

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z\s]{3,}$/;
    return usernameRegex.test(username);
  }

  const validatePassword = (password) => {
    return password.length >= 5;
  }

  const validateAddress = (address) => {
    return address.length >= 5;
  }
  const validateSecondAddress = (secondAddress) => {
    return address.length >= 5;
  }

  const signUp = async (e) => {
    e.preventDefault();

    if (!validateUsername(name)) {
      alert('Username should be at least 3 characters and contain only alphabets.');
      return;
    } else if (!validateAddress(address)) {
      alert('Address should be at least 5 characters.');
      return;
    }
    else if (!validateSecondAddress(secondAddress)) {
      alert(' Address should be at least 5 characters.');
      return;
    } else if (!validatePhone(phone)) {
      alert('Phone number should be 10 digits and start with 97 or 98.');
      return;
    } else if (!userEmail) {
      alert('Email is missing');
      return;
    } else if (!validatePassword(password)) {
      alert('Password should be at least 5 characters.');
      return;
    }

    const result = await checkEmail();
    if (result === 1) {
      alert('Email you are trying to use is in use, please select another');
      return;
    }

    const body = {
      "name": name,
      "address": address,
      "userEmail": userEmail,
      "password": password,
      "phone": phone,
      "second_address": secondAddress,
    }

    await axios.post("http://localhost:4500/users/createUser", body).then(async (result) => {
      if (result.status === 200 && result.data.message === 'User Data inserted.') {
        alert(result.data.message);
        await axios.get(`http://localhost:4500/users/getUserbyEmail?email=${userEmail}`).then(async (userData) => {
          console.log(`http://localhost:4500/users/getUserbyEmail?email=${userEmail}`, userData.data[0], 'userData');
          if (userData.data.length > 0) {
            navigate('/', { replace: true });
            window.location.reload();
          } else {
            alert(result.data.message);
            navigate('/login', { replace: true });
          }
        })
      } else {
        alert(result.data.message);
        localStorage.clear();
        navigate('/signup', { replace: true });
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userInfo'));

    if (userData) {
      navigate('/', { replace: true });
    }
  }, [navigate])

return (
    <>
      <div style={containerStyle}>
        <div className="signup-image">
          <img src={signupimg} alt="Login Image" style={imageStyle} />
        </div>
        <div style={signupFormStyle}>
          <form autoComplete='off' className='form-group' onSubmit={signUp}>
            <h3>Signup</h3>
            <div className="form-group">
        <label htmlFor="name" style={inputLabelStyle}>Username:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => { setName(e.target.value) }}
          style={inputFieldStyle}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address" style={inputLabelStyle}>Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          required
          onChange={(e) => { setAddress(e.target.value) }}
          style={inputFieldStyle}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" style={inputLabelStyle}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => { setUserEmail(e.target.value) }}
          style={inputFieldStyle}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" style={inputLabelStyle}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => { setPassword(e.target.value) }}
          style={inputFieldStyle}
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone" style={inputLabelStyle}>Phone No:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          onChange={(e) => { setPhone(e.target.value) }}
          style={inputFieldStyle}
        />
      </div>

      <div className="form-group">
        <label htmlFor="second_address" style={inputLabelStyle}>Second Address:</label>
        <input
          type="text"
          id="second_address"
          name="second_address"
          required
          onChange={(e) => { setSecondAddress(e.target.value) }}
          style={inputFieldStyle}
        />
      </div>

                  <button type="submit" style={submitButtonStyle}>Sign Up</button>
                </form>
              </div>
            </div>
          <br />
      <Footer />
    </>
  );
}

// Styles
const containerStyle = {
  display: 'flex',
  width: '60%', // Take up 75% of the screen width
  height: '40%',
  marginTop: '1%',
  margin: '0 auto',
  borderRadius:'5%',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const signupFormStyle = {
  backgroundColor: '#89ccdc', // White background color
  padding: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle lift
  width: '55%',
};

const submitButtonStyle = {
  backgroundColor: '#4CAF50', // Green button color
  color: 'white', // White text color
  padding: '10px',
  marginTop: '10px', // Add spacing from the top
  cursor: 'pointer',
  borderRadius:'8px'
};

const inputLabelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const inputFieldStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

export default Signup;



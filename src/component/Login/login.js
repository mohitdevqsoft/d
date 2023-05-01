import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/login.css'
// Define a secret key for signing JWT tokens
//const secretKey = 'mysecretkey';

// A mock user object for testing purposes
const user = {
  id: 123,
  username: 'johndoe',
  password: 'mypassword'
};

function Login() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (event) => {
    console.log(event)
    event.preventDefault();

    axios
      .post('http://localhost:5500/login', {
        username: event.target.username.value,
        password: event.target.password.value
      })
      .then((res) => {
        //navigate('/success');
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        setLoggedIn(true)


      })
      .catch((e) => {
        console.error(e);
        navigate('/goodbye');
      })

    // // Check if the username and password are correct
    // if (user.username === event.target.username.value &&
    //     user.password === event.target.password.value) {

    //   // Create a JWT token with the user ID and sign it with the secret key
    //   //const token = jwt.sign({ userId: user.id }, secretKey);

    //   // Store the token in the browser's localStorage
    //   //localStorage.setItem('token', token);

    //   // Set the logged in state to true
    //   setLoggedIn(true);
    // } else {
    //   // Display an error message if the username or password is incorrect
    //   setErrorMessage('Invalid username or password');
    // }
  };

  const handleLogout = () => {
    // Remove the token from the browser's localStorage
    localStorage.removeItem('token');

    // Set the logged in state to false
    setLoggedIn(false);
  };

  // Check if the user is logged in by looking for the JWT token in localStorage
  //const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       // Verify the token's signature and decode the payload
  //       //const decoded = jwt.verify(token, secretKey);

  //       // Set the logged in state to true
  //       setLoggedIn(true);
  //     } catch (err) {
  //       // Remove the invalid token from localStorage and display an error message
  //       localStorage.removeItem('token');
  //       setErrorMessage('Failed to verify authentication token');
  //     }
  //   }

  return (
    <div>
      {loggedIn ?
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          {navigate('/success')}
        </div>
        :
        <div className="auth-inner">
          <form onSubmit={handleLogin}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name='username'
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name='password'
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            {errorMessage && <div>{errorMessage}</div>}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      }
    </div>
  );
}

export default Login;
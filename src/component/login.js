import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    event.preventDefault();

    axios
        .post('http://localhost:5500/login', {
            username: event.target.username.value,
            password: event.target.password.value
        })
        .then((res)=>{
            //navigate('/success');
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            setLoggedIn(true)

            
        })
        .catch((e)=>{
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
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" />
          </div>
          {errorMessage && <div>{errorMessage}</div>}
          <button type="submit">Login</button>
        </form>
      }
    </div>
  );
}

export default Login;
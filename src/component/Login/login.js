import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/login.css'
import { postDatatoServer } from '../../Utils/Axios';
import ContextHelper from '../../ContextHooks/ContextHelper';
// Define a secret key for signing JWT tokens
//const secretKey = 'mysecretkey';

// A mock user object for testing purposes
const user = {
  id: 123,
  username: 'johndoe',
  password: 'mypassword'
};

function Login() {
  //---------- state, veriable, context and hooks
  const {
    currentUser,

    setCurrentUser,
    storeDataInLocalStorage
  } = ContextHelper()
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState({})

  console.log("-----", currentUser);
  //---------- life cycles

  React.useEffect(() => {
    if (currentUser?.token) {
      if (currentUser?.isadmin) {
        navigate('/add-report')
      }
      //  else {
      //     navigate('/view-report')
      // }
    }

  }, [])

  //--------- user Login

  const handleLogin = (event) => {
    event.preventDefault();
    let data = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    if (!data?.username) {
      setErrorMessage({
        username: "Please provide a valid username."
      });
      return;
    }
    if (!data?.password) {
      setErrorMessage({
        password: "Please provide a valid password.",
      });
      return;
    } else {
      setErrorMessage()
    }
    postDatatoServer({ end_point: "login", body: data, call_back: handleResponse })
  };

  // success

  const handleResponse = (res) => {
    if (res?.response && res?.status === "success") {
      console.log("++++++>>>> res", res);

      storeDataInLocalStorage({ key: 'current_user', value: res?.response })

      setCurrentUser(res?.response)

      navigate('/view-report');

    } else {
      if (res?.error?.response?.data?.authrised === 'false') {

        setErrorMessage({
          error: "Please Enter Valid Details",
        });
      } else {

        setErrorMessage({
          error: res?.error?.message,
        });
      }
    }
  }



  const handleLogout = () => {
    localStorage.removeItem('token');

    setLoggedIn(false);
  };

  return (
    <div className='main_containar'>
      {loggedIn ?
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
          {navigate('/success')}
        </div>
        :
        <div className="auth-inner">
          <form onSubmit={handleLogin}>
            {errorMessage?.error && <div className='errorMassage'>{errorMessage?.error}</div>}

            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email</label>
              <input
                // type="email"
                name='username'
                className="form-control"
                placeholder="Enter email"
              />
              {errorMessage?.username && <div className='errorMassage'>{errorMessage?.username}</div>}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name='password'
                className="form-control"
                placeholder="Enter password"
              />
              {errorMessage?.password && <div className='errorMassage'>{errorMessage?.password}</div>}

            </div>
            {/* 
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
            </div> */}
            <div className="d-grid mt-4">
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
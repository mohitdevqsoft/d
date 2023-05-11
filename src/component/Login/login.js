import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";
import { postDatatoServer } from "../../Utils/Axios";
import ContextHelper from "../../ContextHooks/ContextHelper";

function Login() {
  //---------- state, veriable, context and hooks
  const {
    currentUser,

    setCurrentUser,
    storeDataInLocalStorage,
  } = ContextHelper();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});

  //---------- life cycles

  React.useEffect(() => {
    if (currentUser?.token) {
      if (currentUser?.isadmin) {
        navigate("/add-report");
      } else {
        navigate("/view-report");
      }
    }
  }, [currentUser]);

  //--------- user Login

  const handleLogin = (event) => {
    event.preventDefault();
    let data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    if (!data?.username) {
      setErrorMessage({
        username: "Please provide a valid username.",
      });
      return;
    }
    if (!data?.password) {
      setErrorMessage({
        password: "Please provide a valid password.",
      });
      return;
    } else {
      setErrorMessage();
    }
    postDatatoServer({
      end_point: "login",
      body: data,
      call_back: handleResponse,
    });
  };

  // success

  const handleResponse = (res) => {
    if (res?.response && res?.status === "success") {
      console.log("++++++>>>> res", res);

      storeDataInLocalStorage({ key: "current_user", value: res?.response });

      setCurrentUser(res?.response);

      navigate("/view-report");
    } else {
      if (res?.error?.response?.data?.authrised === "false") {
        setErrorMessage({
          error: "Please Enter Valid Details",
        });
      } else {
        setErrorMessage({
          error: res?.error?.message,
        });
      }
    }
  };

  return (
    <div className="main_containar">
      <div className="auth-inner">
        <form onSubmit={handleLogin}>
          {errorMessage?.error && (
            <div className="errorMassage">{errorMessage?.error}</div>
          )}

          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email</label>
            <input
              // type="email"
              name="username"
              className="form-control"
              placeholder="Enter email"
            />
            {errorMessage?.username && (
              <div className="errorMassage">{errorMessage?.username}</div>
            )}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
            />
            {errorMessage?.password && (
              <div className="errorMassage">{errorMessage?.password}</div>
            )}
          </div>
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
    </div>
  );
}

export default Login;

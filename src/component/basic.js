import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Success from './success';

function BasicExample() {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({})
  const [errorMessage, setErrorMessage] = useState('');

  // const handelclick = (e) => {
  //     console.log(e.target.value) 
  // };

  const handelSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.elements.name.value)
    console.log(e.target.elements.password.value)

    axios
      .post('http://pacs.iotcom.io:5500/login', {
        username: e.target.elements.name.value,
        password: e.target.elements.password.value
      })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.name);
        //navigate('/success');
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
        //navigate('/goodbye'); 
        setErrorMessage('Invalid username or password');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000); // hide the error message after 5 seconds                 
      })

  }

  const handleLogout = () => {
    // Remove the token from the browser's localStorage
    localStorage.removeItem('token');

    // Set the logged in state to false
    setLoggedIn(false);
  };

  return (
    <div> {
      loggedIn ?
        <div>
          <p>Welcome, {user}!</p>
          <Button onClick={handleLogout}>Logout</Button>
          <Success />
        </div>
        :
        <div>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="mb-2 col-4" controlId="formBasicEmail">
              <Form.Control type="text" name="name" placeholder="Enter Name " />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2 col-4" controlId="formBasicPassword">
              <Form.Control type="password" name="password" placeholder="Password" />
              <Form.Text className="text-muted">
                We'll never share your password with anyone else.
              </Form.Text>
            </Form.Group>
            <Button variant="primary col-4" type="submit"> Submit </Button>
            {errorMessage && <div className=" mb-2 col-4 alert alert-warning" role="alert">{errorMessage}</div>}
          </Form>
        </div>}
    </div>

  );
}

export default BasicExample;

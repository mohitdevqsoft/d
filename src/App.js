import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { GlobalContextProvide } from './ContextHooks/GlobalContextProvide';

import Routes from './Routes/Routes';

// import BasicExample from "./component/basic"
// import { Container } from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Goodbye from './component/goodbye';
// import Success from './component/success';
// import Login from './component/login';


const App = () => {

  return (
    <GlobalContextProvide>

      <Routes />

    </GlobalContextProvide>
  )
}

// const App = () => (

// <Router>
//     <Routes>

//       <Route exact path="/" element={
//       <Container className="p-5">
//          <BasicExample className="p-2"/>
//       </Container>} />

//       <Route path="/goodbye" element={<Goodbye />} />
//       <Route path="/success" element={<Success />} />
//       <Route path="/login" element={<Login />} />


//     </Routes>
//   </Router>
// );

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { GlobalContextProvide } from "./ContextHooks/GlobalContextProvide";

import Routes from "./Routes/Routes";

const App = () => {
  return (
    <GlobalContextProvide>
      <Routes />
    </GlobalContextProvide>
  );
};

export default App;

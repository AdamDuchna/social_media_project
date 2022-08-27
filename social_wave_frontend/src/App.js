import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from './ui/login_screen/LoginScreen';
import useToken from './useToken';
function App() {
  const {token, setToken} = useToken()
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path='/' element={<LoginScreen setToken={setToken}/>}></Route>
            </Routes>
        </Router>

    </div>
  );
}

export default App;

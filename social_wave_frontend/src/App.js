import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from './ui/login_screen/LoginScreen';
import useToken from './useToken';
import { useState } from 'react';
function App() {
  const {token, setToken} = useToken()
  const [user,setUser] = useState()
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path='/' element={<LoginScreen setToken={setToken} setUser={setUser} />}></Route>
            </Routes>
        </Router>

    </div>
  );
}

export default App;

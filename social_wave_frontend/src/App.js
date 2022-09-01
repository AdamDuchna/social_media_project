import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from './ui/login_screen/LoginScreen';
import useToken from './useToken';
import { useState } from 'react';
import MainPage from './ui/main_page/MainPage';
function App() {
  const {token, setToken} = useToken()
  const [user,setUser] = useState()
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path='/login' element={<LoginScreen setToken={setToken} setUser={setUser} />}></Route>
              <Route path='/' element={<MainPage user={user}/> }></Route>
            </Routes>
        </Router>

    </div>
  );
}

export default App;

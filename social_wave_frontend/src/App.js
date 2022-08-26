import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from './ui/login_screen/LoginScreen';
import useToken from './useToken';
function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path='/' element={<LoginScreen/>}></Route>
            </Routes>
        </Router>

    </div>
  );
}

export default App;

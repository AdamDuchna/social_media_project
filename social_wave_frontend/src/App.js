import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginScreen from './ui/login_screen/LoginScreen';


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

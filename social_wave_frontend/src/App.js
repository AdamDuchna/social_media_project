import React, { Component, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import LoginScreen from './ui/login_screen/LoginScreen';
import useToken from './useToken';
import { useState } from 'react';
import MainPage from './ui/main_page/MainPage';
import Posts from './ui/posts/Posts';
function App() {
  const [user,setUser] = useState()
  const [posts,setPosts] = useState()
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path='/login' element={<LoginScreen setUser={setUser} setPosts={setPosts} />}></Route>
              <Route path='/' element={<MainPage user={user} setUser={setUser} Component={Posts}/>}></Route>
            </Routes>
        </Router>

    </div>
  );
}

export default App;

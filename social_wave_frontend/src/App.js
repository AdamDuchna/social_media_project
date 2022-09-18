import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginScreen from './ui/login_screen/LoginScreen';
import { useState } from 'react';
import MainPage from './ui/main_page/MainPage';
import Posts from './ui/posts/Posts';
import Profile from './ui/profile/Profile';
import './styling/main_page/navbar/Navbar.css';
import './styling/App.css';
import Navbar from './ui/main_page/Navbar';

function App() {
  const [user,setUser] = useState()
  const [posts,setPosts] = useState()

  return (
    <div className="App">
        <Router>
            <div className="nav-wrapper"><Navbar setUser={setUser} /></div>
            <Routes>
              <Route path='/login' element={<LoginScreen setUser={setUser} setPosts={setPosts} />}></Route>
              <Route path='/' element={<MainPage posts={posts} setPosts={setPosts} user={user} setUser={setUser} Component={Posts}/>}></Route>
              <Route exact path="/:username" element={<Profile user={user} setUser={setUser}/>}></Route>
            </Routes>
        </Router>

    </div>
  );
}

export default App;

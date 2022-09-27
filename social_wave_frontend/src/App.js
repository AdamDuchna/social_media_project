import React, { useEffect } from 'react';
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
import './styling/App.css';
import Cookies from "js-cookie"
import Friends from './ui/friends/Friends';

function App() {
  const [user,setUser] = useState()
  const [posts,setPosts] = useState()
  useEffect(()=>{ if(user){ Cookies.set('user', JSON.stringify(user), { expires: 3, secure: true }) } }, [user])
  useEffect(()=>{ if(!user){ 
    const cookieUser = Cookies.get('user');
    if(cookieUser){
    const jsonUser = JSON.parse(cookieUser);
    setUser(jsonUser)}
  }},[])
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route path='/login' element={<LoginScreen setUser={setUser} setPosts={setPosts} />}></Route>
              <Route path='/' element={<MainPage posts={posts} setPosts={setPosts} user={user} setUser={setUser} Component={Posts}/>}></Route>
              <Route exact path='/friends' element={<Friends setUser={setUser} user={user}/>}></Route>
              <Route exact path="/:username" element={<Profile user={user} setUser={setUser}/>}></Route>
            </Routes>
        </Router>

    </div>
  );
}

export default App;

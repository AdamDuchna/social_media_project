import React, { useState } from "react";
import '../../styling/login_screen/LoginScreen.css';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginScreen = ({setToken ,setUser, setPosts}) => {
    const [error,setError] = useState();
    const [isLogging,setIsLogging] = useState(true)
    const [filling,setFilling] = useState('nofilling')
    const navigate = useNavigate()
    const handleChange=()=>{ setIsLogging(!isLogging); setError();}
    const loginSuccess = ()=>{ 
        setFilling('filling')
        setTimeout( ()=>{navigate('/')},6000)
        axios
        .get('http://localhost:5000/posts/get')
        .then(res=>setPosts(res.data))
        .catch(err=>console.log(err))
      }
    return (
        <div className="login-screen">
            <div className="left-box">
                <div className="label">
                    <img className="logo" src="/logo.png" ></img>
                    <img className="name" src="/name.png" ></img>
                </div>
            </div>
            <div className="right-wrapper">
                { error ? <div className="error">{error}</div> :  <div className="noerror"></div> } 
                <div className="right-box">
                    { isLogging ? 
                    <LoginForm 
                    handleChange={handleChange} 
                    setUser={setUser} 
                    setError={setError} 
                    loginSuccess={loginSuccess}/> 
                    : 
                    <RegisterForm 
                    handleChange={handleChange} 
                    setError={setError}/> }
                </div>
            </div>
            <section>
            <div className="creator">@adam_duchna</div>
            <div className={`wave wave1 ${filling}`}></div>
            <div className={`wave wave2 ${filling}`}></div>
            <div className={`wave wave3 ${filling}`}></div>
            <div className={`box ${filling}`}></div>
            </section>
        </div>
    )
}

export default LoginScreen;
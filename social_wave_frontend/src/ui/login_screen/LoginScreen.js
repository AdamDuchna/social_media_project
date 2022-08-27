import React, { useState } from "react";
import '../../styling/login_screen/LoginScreen.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const LoginScreen = ({setToken}) => {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState()
    const [isLogging,setIsLogging] = useState(true)

    const loginUser = (values) => {
        axios
        .post('http://localhost:5000/user/login',{...values})
        .then(res=>{console.log(res)})
        .catch(err=>{console.log(err)})
    }

    const handleLogin = () => {
        loginUser({ username: username, password: password})
    }
    const handleChange=()=>{setIsLogging(!isLogging)}

    return (
        <div className="login-screen">
            <div className="left-box">
                <div className="label">
                    <img className="logo" src="/logo.png" ></img>
                    <img className="name" src="/name.png" ></img>
                </div>
            </div>
            <div className="right-box">
                { isLogging ? 
                <div className="login">
                <input type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)} ></input>
                <input autoComplete="current-password" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
                <button onClick={handleLogin}>Log In</button>
                <div className="line"></div>
                <button onClick={handleChange} className="register-button">Register new account</button>
                </div>
                :
                    <RegisterForm handleChange={handleChange}/>
                }
            </div>
            <section>
            <div className="creator">@adam_duchna</div>
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            </section>
        </div>
    )
}

export default LoginScreen;
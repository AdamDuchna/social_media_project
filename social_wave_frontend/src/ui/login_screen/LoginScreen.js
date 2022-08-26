import React, { useState } from "react";
import '../../styling/login_screen/LoginScreen.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginScreen = ({setToken}) => {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState()

    const loginUser = (credentials) => {
        axios
        .post()
        .then()
        .catch((error)=>{setError(error)})
    }

    const handleLogin = () => {
        console.log("LOGIN")
    }

    return (
        <div className="login-screen">
            <div className="left-box">
                <div className="label">
                    <img className="logo" src="/logo.png" ></img>
                    <img className="name" src="/name.png" ></img>
                </div>
            </div>
            <div className="right-box">
                <div className="login">
                <input type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)} ></input>
                <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}></input>
                <button onClick={handleLogin}>Log In</button>
                <div className="line"></div>
                <button>Register new account</button>
                </div>
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
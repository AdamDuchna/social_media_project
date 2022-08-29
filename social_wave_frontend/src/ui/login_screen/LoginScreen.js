import React, { useState } from "react";
import '../../styling/login_screen/LoginScreen.css';
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const LoginScreen = ({setToken ,setUser}) => {
    const [error,setError] = useState();
    const [isLogging,setIsLogging] = useState(true)
    const handleChange=()=>{
        setIsLogging(!isLogging)
        setError()}

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
                    { isLogging ? <LoginForm handleChange={handleChange} setUser={setUser} setError={setError} /> 
                    : <RegisterForm handleChange={handleChange} setError={setError}/> }
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
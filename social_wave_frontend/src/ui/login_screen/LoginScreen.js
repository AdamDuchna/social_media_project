import React from "react";
import '../../styling/login_screen/LoginScreen.css';

const LoginScreen = () => {
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
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <button>Log In</button>
                <div className="line"></div>
                <button>Register new account</button>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;
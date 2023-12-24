import { useState } from "react";
import { login, signUp } from "../api/axiosConfig";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (email) => {
        setEmail(email.target.value);
    }

    const handlePasswordChange = (password) => {
        setPassword(password.target.value);
    }

    const handleLogin = (event) => {
        //Calling auth-service authenticate API
        event.preventDefault();
        const authRequest = { email, password };

        login(authRequest)
            .then((response) => {
                const jwtToken = response.data.jwt;
                alert(jwtToken);
            })
            .catch((error) => {
                console.error("Login Failed: " + JSON.stringify(error.response.data));
            });
    }

    const handleSignUp = (event) => {
        //Call auth-service register API
        event.preventDefault();
        const authRequest = { email, password };

        signUp(authRequest)
            .then((response) => {
                console.log("Signup Success: " + JSON.stringify(response.data));
            })
            .catch((error) => {
                console.error("Signup Failed: " + JSON.stringify(error.response.data));
            });
    }

    return (
        <div className="login-page">
            <h1>Welcome To Notifications</h1>
            <h3>Sign up and add your subscribers list to your template to notify them anytime</h3>
            <form>
                <label>
                    Email:
                    <input type="email" value={ email } name="email" onChange={handleEmailChange}></input>
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} name="password" onChange={handlePasswordChange}></input>
                </label>
                <br/>
                <button type="submit" onClick={handleLogin}>Log In</button>
                <br />
                <h5>Do not have an acoount? </h5>
                <button type="submit" onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
}